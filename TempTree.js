const BranchTree = require('./BranchTree');


const btree = new BranchTree('master');

btree.add('master', 'master-temp');

([


    'sg10',
    'sg11',
    'sg12',
    'sg13',
    'sg14',
    'sg15',
    'sg16',
    'sg17',
    'sg18',
    'sg19',
    'sg21',
    'sg22',
    'sg24',
    'sg25',
    'sg26',
    'sg27',
    'sg28',
    'sg29',
    'sg30',
]).forEach(name => {
    btree.add('master-temp', name);
});

module.exports = btree;
