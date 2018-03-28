const BranchTree = require('./BranchTree');


const btree = new BranchTree('master');

([
    'sg3',
    'sg30',
    'sg2',
    'sg31',
    'sg12',
    'sg1',
    'sg18',
    'sg42',
    'sg17',
    'sg0',
    'sg22',
    'sg11',
    'sg21',
    'sg6',
    'sg40',
    'sg46',
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
    'Cross_day',
    'offset_odds',
    'new_Log',
]).forEach(name => {
    btree.add('master', name);
});

btree.add('2018-redis', '2018-Casino');
btree.add('2018-redis', '2018-redis-cross_day');
btree.add('2018-redis-cross_day', 'sg36');

btree.add('Cross_day', '2018-redis-cross_day');
btree.add('Cross_day', 'sg15');
btree.add('Cross_day', 'sg16');
btree.add('Cross_day', 'sg33');

btree.add('offset_odds', 'sg88');
btree.add('new_Log', 'sg84');

module.exports = btree;
