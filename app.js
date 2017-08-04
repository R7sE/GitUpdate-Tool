const GitCommand = require('./src/GitCommand');
const Console = require('./src/console');
// let cmd = new GitCommand('D:/work/GitHub/LatticeApp');

// let cmd = new GitCommand('D:/work/GitHub/javaserver44');
let cmd = new GitCommand('D:/work/GitHub/sg44_w');
// let cmd = new GitCommand('D:/work/GitHub/sg44_c');
// let cmd = new GitCommand('D:/work/GitHub/sg44_a');

([
    0, 1, 3, 2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 21, 22, 24,
    25, 26, 27, 28, 29,
    30, 32, 34, 35, 36, 37, 40, 41, 42, 43, 45, 46, 51,
])
.forEach(sg => {
    Console.info(`開始 sg${sg} 流程`);
    cmd.checkout(`sg${sg}`)
        // .pull()
        .push()
        // .reset(`origin/sg${sg}`)
        // .merge('master-自訂規則改成開放柱碰、連柱碰')
        // .merge('master')
        // .merge('issue55-sg44_c')
        // .merge('master-star234規則-2版');
        // .merge('master-自訂義234星規則2版');
        // .merge('master-自訂義234星規則2版-連柱碰Only');
        // .merge('master-自訂義234星規則-連柱碰only');
        // .merge('master-自訂義234星規則-2版(柱碰and連柱碰)');
        ;
    return;
    let hasMerge = false;
    // cmd.unmergeAddeds().forEach(fname => {
    //     cmd.added(fname);
    //     Console.warning(`衝突檔案: ${fname}`);
    //     hasMerge = true;
    // });

    // cmd.unmergeModifys().forEach(fname => {
    //     cmd.chooseThries(fname).added(fname);
    //     Console.warning(`衝突檔案: ${fname}`);
    //     hasMerge = true;
    // });

    if (hasMerge) {
        Console.info(`Commit sg${sg}`);
        cmd.commit('auto merge');
    }
    Console.success('合併完成');
    Console.success('==============================');
    exportDiff(sg);
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
        outpath: 'D:/work/UpdateQueue/20170727-1030',
        dirname: `javaserver${sg}`,
        // dirname: `sg${sg}_c`,
        // dirname: `sg${sg}_w`,
    });

}


