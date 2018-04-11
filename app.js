const GitCommand = require('./src/GitCommand');
const Console = require('./src/console');
const readline = require('readline');
const branchC = require('./BranchSG-C');
// const branchC = require('./TempTree');
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

const ChooseThriesMergeFiles = [
    'control/outbet/star234.php',
    'tpl/bet_list.php',
];



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
        let promise = Promise.resolve();


        Object.keys(branch).forEach(child => {
            promise = promise.then(() => {
                return new Promise((resolve, reject) => {

                    Console.info(`merge ${child} & ${name}`);
                    cmd.checkout(child).merge(name);

                    /* 衝突檔案 */
                    const unmergeModifys = cmd.unmergeModifys();
                    const unmergePromise = new Promise((umResolve, umReject) => {
                        if (unmergeModifys.length) {
                            confirm(unmergeModifys, name).then(() => {
                                const unmergeFiles = unmergeModifys.filter(fname => {
                                    if (ChooseThriesMergeFiles.indexOf(fname) >= 0) {
                                        cmd.chooseThries(fname).added(fname);
                                        return false;
                                    }
                                    return true;
                                });

                                if (unmergeFiles.length) {
                                    umReject();
                                    throw new Error('未處理的衝突檔案 : ' + unmergeFiles.join(', '));
                                } else {
                                    Console.info(`Commit ${child}`);
                                    cmd.commit('auto merge');
                                    umResolve();
                                }
                            });
                        } else {
                            umResolve();
                        }
                    });

                    unmergePromise.then(() => {
                        const match = child.match(/^sg(\d+)$/);
                        if (match) {
                            const sg = match[1];
                            this.exportDiff(sg);
                        }
                        this.merge(child).then(resolve);
                    }, reject);
                });
            });
        });
        return promise;
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
        cmd.checkout(name);
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

function confirm (files, thries) {

    const q = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });


    return new Promise((resolve, reject) => {
        q.question(([
            `發現衝突檔案 ${files.join(', ')}`,
            `以下檔案 ${ChooseThriesMergeFiles.join(', ')} 預設以 ${thries} 分支為主合併，`,
            `是否同意 (y/n)？`
        ]).join('\r\n'), input => {
            if (input === 'y') {
                resolve();
            } else {
                Console.warning('中斷執行');
                reject();
            }
            q.close();
        });
    });
}

rl.question(`key in sg site : ${Object.keys(TYPES).join(', ')}\n`, input => {

    const app = new App(input, branchC);
    // app.pull('Cross_day');
    // app.push('Cross_day');
    app.push('master-temp');
    // app.merge('master-temp');
    // app.reset('Cross_day');
    rl.close();
});