

module.exports = class BranchTree {


    constructor (root = 'master') {

        this.tree = {};
        this.tree[root] = {};
    }

    add (name, child) {
        if (!(name in this.tree)) {
            throw new Error(`not found ${name}`);
        }
        if (!(child in this.tree)) {
            this.tree[child] = {};
        }
        this.tree[name][child] = this.tree[child];
        return this;
    }

    get (name) {
        if (!(name in this.tree)) {
            throw new Error(`not found ${name}`);
        }
        return this.tree[name];
    }


};
