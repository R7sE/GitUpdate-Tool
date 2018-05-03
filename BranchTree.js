

module.exports = class BranchTree {


    constructor (root = 'master') {

        this.tree = {};
        this.tree[root] = {};
        this.current = this.tree[root];
    }

    append(parent, fn) {
        if (!(parent in this.tree)) {
            throw new Error(`unknown ${parent} branch`);
        }
        const cacheBranch = this.current;
        this.current = this.tree[parent];
        fn(this);
        this.current = cacheBranch;
    }

    checkout (name) {
        if (!(name in this.tree)) {
            throw new Error(`unknown ${name} branch`);
        }
        this.current = this.tree[name];

    }

    add (branch) {
        if (!this.current) {
            throw new Error(`no set current branch, please run "obj.get({parent branch}).add(${branch});"`);
        }
        if (!(branch in this.tree)) {
            this.tree[branch] = {};
        }
        this.current[branch] = this.tree[branch];
        return this;
    }

    get (name) {
        if (!(name in this.tree)) {
            throw new Error(`not found ${name}`);
        }
        this.current = this.tree[name];
        return this;
    }
    forEach(fn) {
        Object.keys(this.current).forEach(fn);
    }

};
