const GitCommand = require('./src/GitCommand');
const Console = require('./src/console');
// let cmd = new GitCommand('D:/work/GitHub/LatticeApp');

// let cmd = new GitCommand('D:/work/GitHub/javaserver44');
let cmd = new GitCommand('D:/work/GitHub/sg44_c');
// let cmd = new GitCommand('D:/work/GitHub/sg44_w');
// let cmd = new GitCommand('D:/work/GitHub/sg44_a');

([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 81, 82,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 37, 39, 40, 41, 42, 43, 45, 46, 51

])
.forEach(sg => {
    Console.info(`開始 sg${sg} 流程`);
    cmd.checkout(`sg${sg}`)
        // .pull()
        .push()
        // .reset(`origin/sg${sg}`)
        // .merge('master-自訂規則改成開放柱碰、連柱碰')
        // .merge('master-new-service-no-outbet')
        // .merge('master-new-service')
        // .merge('master')
        // .merge('newsky23_six')
        // .merge('blockSky')
        ;
    return;
    // return;
    // let hasMerge = false;
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

    // if (hasMerge) {
    //     Console.info(`Commit sg${sg}`);
    //     cmd.commit('auto merge');
    // }
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
        outpath: 'D:/work/UpdateQueue/2017107-1020',
        // dirname: `javaserver${sg}`,
        dirname: `sg${sg}_c`,
        // dirname: `sg${sg}_w`,
    });

}


