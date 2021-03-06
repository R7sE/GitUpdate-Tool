const colors = require('colors/safe');
const Console = require('./console');
const node = {
    execSync: require('child_process').execSync,
    path: require('path'),
    fs: require('fs'),
};

class GitCommand {
    constructor (cwd) {
        this.cache = {
            cwd,
        };

    }

    get cwd () {
        return this.cache.cwd;
    }

    get branchName () {
        return this.execResult('git rev-parse --abbrev-ref HEAD');
    }

    execResult(cmd, callback) {
        return node.execSync(cmd, {cwd: this.cwd}).toString();
    }

    exec (cmd, callback) {
        let result = node.execSync(cmd, {cwd: this.cwd});
        callback && callback(result.toString());
        return this;

        // return new Promise((resolve, reject) => {
        //     node.exec(cmd, {cwd: this.cwd}, (error, stdout, stderr) => {
        //         if (error) {
        //             reject(error.toString());
        //         } else {
        //             resolve(stdout.toString(), stderr.toString());
        //         }
        //     });
        // });
    }

    branchExists (name) {
        try {
            this.execResult(`git show-branch ${name}`);
        } catch (e) {
            return false;
        }
        return true;
    }

    checkout (name, callback) {
        // return this.exec(`git checkout -b ${name}`, callback);
        try {
            let {output, error} = this.execResult(`git checkout -q ${name}`);
            if (error) {
                console.info(colors.red(error));
            } else {
                callback && callback(output);
            }
        } catch (err) {
            let msg = err.message.toString().split('\n')[1];
            if (msg !== 'error: you need to resolve your current index first') {
                console.info(colors.red(msg));
                process.exit();
            }
            let {output, error} = this.execResult(`git checkout -b ${name}`);
            if (error) {
                console.info(colors.red(error));
            } else {
                callback && callback(output);
            }
        }
        return this;

    }

    hash (_name, callback) {
        let name = _name || this.branchName;
        return this.execResult(`git rev-parse ${name}`, callback);
    }

    chooseThries(fname) {
        return this.exec(`git checkout --theirs ${fname}`);
    }

    added (fname) {
        return this.exec(`git add ${fname}`);
    }

    merge (name, callback) {
        try {
            let {output, stdout, error} = this.execResult(`git merge ${name}`);
            if (error) {
                console.info(colors.red(`FAIL : ${error}`));
            } else {
                callback && callback(output || stdout || 'merge finish');
            }
        } catch (err) {
            console.info(err.message);
        }
        return this;
    }

    instanceOf (name) {
        const sha1 = this.sha1(name);
        const baseSHA1 = this.execResult(`git merge-base HEAD ${name}`).trim();
        return sha1 === baseSHA1;
    }

    push (callback = null) {
        let name = `origin ${this.branchName}`;
        return this.exec(`git push ${name}`, callback);
    }

    sha1 (name = 'HEAD') {
        return this.execResult(`git rev-parse ${name}`).trim();
    }

    pull (callback = null) {
        let name = `origin ${this.branchName}`;
        return this.exec(`git pull ${name}`, callback);
    }

    listSHA (_num) {
        let num = _num ? `-${_num}` : '';
        return this.execResult(`git log --pretty=oneline --merges ${num}`);
    }

    diff (a, b) {
        return this.execResult(`git diff --name-status ${a} ${b}`);
    }

    unmergeAddeds() {
        let res = this.execResult('git status');
        return (res || '').split('\n').filter(_str => {
            let str = _str.trim();
            return str.indexOf('added') === 0;
        }).map(_str => {
            return _str.split(':')[1].trim();
        });
    }

    unmergeModifys() {
        let res = this.execResult('git status');
        return (res || '').split('\n').filter(_str => {
            let str = _str.trim();
            return str.indexOf('both modified') === 0;
        }).map(_str => {
            return _str.split(':')[1].trim();
        });

    }

    commit (message) {
        return this.exec(`git commit -a -m "${message}"`);
    }

    reset (name, _hard = true) {
        let hard = _hard ? '--hard' : '';
        this.exec(`git reset ${hard} ${name}`);
    }

    exportDiff({baseSHA, newSHA, outpath, dirname, exceStatus = null, exceFile = null}) {
        const dirName = dirname || this.branchName();
        const outDir = node.path.resolve(outpath, dirName);
        if (node.fs.existsSync(outDir)) {
            Console.warning(`${outDir} is already exists.`);
            return false;
        }

        this.checkout(newSHA, () => {
            let hasExceStatus = Array.isArray(exceStatus);
            let hasExceFile = Array.isArray(exceFile);
            let exceFileReg = (exceFile || []).map(reg => new RegExp(reg));
            let files = this.diff(baseSHA, newSHA).split('\n')
                .filter(s => s)
                .map(s => ({
                    status: s.substr(0, 1),
                    path: s.substr(1).trim(),
                }))
                .filter(o => {
                    return ((! hasExceStatus) || (exceStatus.indexOf(o.status) < 0)) && (
                        (! hasExceFile) || (! exceFileReg.some(reg => reg.test(o.path)))
                    );
                })
                .map(o => `"${o.path}"`);
                // .join(' ');

            if (files.length === 0) {
                return console.log(colors.green(`${dirname} > 檔案無差異`));
            }

            let outZipFile = node.path.resolve(outDir, dirName) + '.zip';
            this.exec(`mkdir ${outDir}`);

            this.exec(`git archive --format zip -o "${outZipFile}" ${newSHA} ${files.join(' ')}`);

            /* 原先使用 jszip 做 unzip 的時後 binary 檔案會錯誤, 現在改用 7z 來處理,
             * 安裝 http://www.developershome.com/7-zip
             */
            let cmd = `"C:/Program Files/7-Zip/7z.exe" x "${outZipFile}"`;
            node.execSync(cmd, {cwd: outDir});
            node.fs.unlinkSync(outZipFile);
        });
    }
    test (sha) {
        this.execResult(`git archive --format zip -o "D:/test/file.zip" ${sha} "pub/6411.php"`);
    }
}

module.exports = GitCommand;
