const BranchTree = require('./BranchTree');


const btree = new BranchTree('master');

btree.append('master', () => {
    ([
        'sg3',
        'sg30',
        'sg2',
        'sg31',
        'sg12',
        'sg1',
        'sg18',
        'sg42',
        'sg0',
        'sg22',
        'sg11',
        'sg21',
        'sg6',
        'sg40',
        'sg9',
        'sg81',
        'sg19',
        'sg4',
        'sg14',
        'sg32',
        'sg43',
        'sg8',
        'sg25',
        'sg24',
        'sg45',
        'sg39',
        'sg41',
        'sg27',
        'sg37',
        'sg7',
        'sg29',
        'sg51',
        'sg5',
        'sg10',
        'sg13',
        'sg26',
        'sg82',
        'sg34',
        'sg28',
        '2018-redis',
    ]).forEach(name => {
        btree.add(name);
    });
});

btree.append('2018-redis', () => {
    btree.add('2018-redis-cross_day');
});

btree.get('2018-redis-cross_day')
    .add('sg36')
    .add('2018-redis-cross_day-newCasino');
btree.append('2018-redis-cross_day-newCasino', () => {

    btree.add('sg17');
    btree.add('sg46');
    btree.add('sg49');

});

btree.get('master');

module.exports = btree;
