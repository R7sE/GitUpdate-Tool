const GitCommand = require('./src/GitCommand');
const Console = require('./src/console');
// let cmd = new GitCommand('D:/work/GitHub/LatticeApp');

// let cmd = new GitCommand('D:/work/GitHub/javaserver44');
// let cmd = new GitCommand('D:/work/GitHub/sg44_w');
// let cmd = new GitCommand('D:/work/GitHub/sg44_c');
let cmd = new GitCommand('D:/work/GitHub/sg44_m');


([
    46
])
.forEach(sg => {
    Console.info('開始 sg46 合併');
    cmd.checkout(`sg${sg}`)
        // .pull()
        // .push()
        // .reset(`origin/sg${sg}`)
        // .merge('master-自訂規則改成開放柱碰、連柱碰')
        .merge('master')
        // .merge('issue-36')
        // .merge('master-star234規則-2版');
        // .merge('master-自訂義234星規則2版');
        // .merge('master-自訂義234星規則2版-連柱碰Only');
        // .merge('master-自訂義234星規則-連柱碰only');
        // .merge('master-自訂義234星規則-2版(柱碰and連柱碰)');
        ;
    cmd.unmergeAddeds().forEach(fname => {
        Console.warning(`衝突檔案: ${fname}`);
        cmd.added(fname);
    });

    // exportDiff(sg);
});

// exportDiff('sg21');

function exportDiff (sg) {
    // cmd.checkout(sg);
    // let baseSHA = cmd.hash('origin/' + sg).trim();
    // let newSHA = cmd.hash(sg).trim();
    // let list = cmd.listSHA(8).split('\n').map(s => s.split(' ')[0]);
    // let [baseSHA, , , , ,newSHA] = list;
    let baseSHA = cmd.hash(`origin/sg${sg}`).trim();
    let newSHA = cmd.hash().trim();

    // let folderName =
    // console.info(`>> ${baseSHA} , ${newSHA}`);
    cmd.exportDiff({
        baseSHA,
        newSHA,
        exceStatus: ['D'],
        exceFile: ['^conf', '^.git', '^\.conf', 'config\.php'],
        outpath: 'D:/work/UpdateQueue/20170503-1530',
        // dirname: `javaserver${sg}`,
        dirname: `sg${sg}_w`,
    });

}


