const colors = require('colors/safe');
const node = {
    execSync: require('child_process').execSync,
    path: require('path'),
    fs: require('fs'),
};
let unzip = require('../src/UnZip');

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

    checkout (name, callback) {
        // return this.exec(`git checkout -b ${name}`, callback);
        try {
            let {output, error} = this.execResult(`git checkout ${name}`);
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

    hash (name, callback) {
        return this.execResult(`git rev-parse ${name}`, callback);
    }

    merge (name, callback) {
        try {
            let {output, stdout, error} = this.execResult(`git merge ${name}`);
            if (error) {
                console.info(colors.red(`FAIL : ${error}`));
            } else {
                callback(output || stdout || 'merge finish');
            }
        } catch (err) {
            console.info(err.message);
        }
        return this;
    }

    push (callback = null) {
        let name = `origin ${this.branchName}`;
        return this.exec(`git push ${name}`, callback);
    }

    pull (callback = null) {
        let name = `origin ${this.branchName}`;
        return this.exec(`git pull ${name}`, callback);
    }

    listSHA () {
        return this.execResult(`git log --pretty=oneline`);
    }

    diff (a, b) {
        return this.execResult(`git diff --name-status ${a} ${b}`);
    }

    exportDiff({baseSHA, newSHA, outpath, dirname, exceStatus = null}) {
        this.checkout(newSHA, () => {
            let hasExce = Array.isArray(exceStatus);
            let files = this.diff(baseSHA, newSHA).split('\n')
                .filter(s => s)
                .map(s => ({
                    status: s.substr(0, 1),
                    path: s.substr(1).trim(),
                }))
                .filter(o => (! hasExce) || (exceStatus.indexOf(o.status) >= 0))
                .map(o => `"${o.path}"`)
                .join(' ');
            let out = node.path.resolve(outpath, dirname || this.branchName());
            let outzip = `${out}.zip`;
            let result = this.exec(`git archive --format zip -o "${outzip}" ${newSHA} ${files}`);

            unzip(outzip, out)
                .then(() => {
                    node.fs.unlinkSync(outzip);
                });
            console.info(`git archive --format zip -o "${outzip}" ${newSHA} ${files}`);
        });
    }
    test (sha) {
        this.execResult(`git archive --format zip -o "D:/test/file.zip" ${sha} "pub/6411.php"`);
    }
}

module.exports = GitCommand;
