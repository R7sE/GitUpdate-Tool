const GitCommand = require('./src/GitCommand');
const Console = require('./src/console');
const readline = require('readline');
const branchC = require('./BranchSG-C');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const TYPES = {
    a: 'D:/work/GitHub/sg44_a',
    m: 'D:/work/GitHub/sg44_m',
    c: 'D:/work/GitHub/sg44_c',
    w: 'D:/work/GitHub/sg44_w',
    javaserver: 'D:/work/GitHub/javaserver44'
};

class App {

    constructor (type, branchTree) {

        if (!(type in TYPES)) {
            throw new Error(`type unknown : ${type}`);
        }
        this.branchTree = branchTree;
        this.SGType = type;
        this.now = new Date();

        this.cmd = new GitCommand(TYPES[type]);
    }

    merge (name) {

        const btree = this.branchTree;
        const cmd = this.cmd;

        const branch = btree.get(name);
        Object.keys(branch).forEach(child => {
            Console.info(`merge ${child} & ${name}`);
            cmd.checkout(child).merge(name);
            const match = child.match(/^sg(\d+)$/);
            if (match) {
                const sg = match[1];
                this.exportDiff(sg);
            }
            this.merge(child);
        });

    }

    pull (name) {
        const btree = this.branchTree;
        const cmd = this.cmd;

        const branch = btree.get(name);
        Object.keys(branch).forEach(child => {
            Console.info(`pull origin/${child}`);
            cmd.checkout(child).pull();
            this.pull(child);
        });

    }

    push (name) {
        const btree = this.branchTree;
        const cmd = this.cmd;

        const branch = btree.get(name);
        cmd.checkout(name).push();
        Object.keys(branch).forEach(child => {
            Console.info(`push origin/${child}`);
            cmd.checkout(child).push();
            this.push(child);
        });

    }

    reset (name) {
        const btree = this.branchTree;
        const cmd = this.cmd;

        const branch = btree.get(name);
        Object.keys(branch).forEach(child => {
            Console.info(`重設 ${child} 至 origin/${child}`);
            cmd.checkout(child).reset(`origin/${child}`);
            this.reset(child);
        });

    }

    exportDiff (sg) {
        // cmd.checkout(sg);
        // let baseSHA = cmd.hash('origin/' + sg).trim();
        // let newSHA = cmd.hash(sg).trim();
        // let list = cmd.listSHA(8).split('\n').map(s => s.split(' ')[0]);
        // let [baseSHA, , , , ,newSHA] = list;
        let baseSHA = this.cmd.hash(`origin/sg${sg}`).trim();
        let newSHA = this.cmd.hash().trim();

        // let folderName =
        // console.info(`>> ${baseSHA} , ${newSHA}`);
        let dirname = ({
            a: `sg${sg}_a`,
            m: `sg${sg}_m`,
            c: `sg${sg}_c`,
            w: `sg${sg}_w`,
            javaserver: `javaserver${sg}`,
        })[this.SGType];

        let step = 30;

        let date = this.now;
        let YMD = ([
            date.getFullYear(),
            `0${(date.getMonth() + 1)}`.substr(-2),
            `0${date.getDate()}`.substr(-2),
        ]).join('');
        let minute = Math.floor(date.getMinutes() / step) * step;
        let HM = ([
            `0${date.getHours()}`.substr(-2),
            `0${minute}`.substr(-2),
        ]).join('');
        this.cmd.exportDiff({
            baseSHA,
            newSHA,
            exceStatus: ['D'],
            exceFile: ['^conf', '^.git', '^\.conf', 'config\.php'],
            outpath: `D:/work/UpdateQueue/${YMD}-${HM}`,
            dirname,
        });

    }
}

rl.question(`key in sg site : ${Object.keys(TYPES).join(', ')}\n`, input => {

    const app = new App(input, branchC);
    // app.pull('Cross_day');
    app.push('Cross_day');
    // app.merge('Cross_day');
    // app.reset('Cross_day');
    rl.close();
});