const BranchTree = require('./BranchTree');


const btree = new BranchTree('master');

btree.append('master', () => {
    btree.add('chloe');
    btree.add('sg11');
    btree.add('sg24');
    btree.add('sg26');
    btree.add('sg2');
    btree.add('sg37');
    btree.add('sg14');
    btree.add('sg1');
    btree.add('sg28');
    btree.add('sg34');
    btree.add('sg10');
    btree.add('sg12');
    btree.add('sg6');
    btree.add('sg19');
    btree.add('sg22');
    btree.add('sg18');
    btree.add('sg21');
    btree.add('sg3');
    btree.add('sg25');
    btree.add('sg13');
    btree.add('sg31');
    btree.add('sg9');
    btree.add('sg30');
    btree.add('sg27');
    btree.add('sg40');
    btree.add('sg5');
    btree.add('sg29');
    btree.add('sg43');
    btree.add('sg51');
    btree.add('sg7');
    btree.add('sg42');
    btree.add('sg41');
    btree.add('sg45');
    btree.add('sg0');
    btree.add('sg4');
    btree.add('sg8');
    btree.add('sg39');
    btree.add('sg32');
    btree.add('dev');
});
btree.get('master')
    .add('offset_odds').append('offset_odds', () => {
        btree.add('sg88');
    })
    .add('new_Log').append('new_Log', () => {
        btree.add('sg84');
    })
    .add('ext_agent').append('ext_agent', () => {
        btree.add('sg81')
            .add('sg82')
            .add('sg84');
    })
    .add('Cross_day').append('Cross_day', () => {
        btree.add('sg15')
            .add('sg16')
            .add('sg33');
    });
btree.get('Cross_day')
    .add('2018-redis-cross_day')
    .get('2018-redis-cross_day')
        .add('sg36')
        .add('2018-redis-cross_day-newCasino')
        .get('2018-redis-cross_day-newCasino')
            .add('sg17')
            .add('sg46')
            .add('sg49')
            .add('dev-180503-percent');

module.exports = btree;
