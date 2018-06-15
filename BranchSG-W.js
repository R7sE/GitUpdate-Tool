const BranchTree = require('./BranchTree');

const btree = new BranchTree('master');

btree.get('master')
    .add('sg0')
    .add('sg1')
    .add('sg2')
    .add('sg3')
    .add('sg4')
    .add('sg5')
    .add('sg6')
    .add('sg7')
    .add('sg8')
    .add('sg9')
    .add('sg10')
    .add('sg11')
    .add('sg12')
    .add('sg13')
    .add('sg14')
    .add('sg18')
    .add('sg19')
    .add('sg21')
    .add('sg22')
    .add('sg24')
    .add('sg25')
    .add('sg26')
    .add('sg27')
    .add('sg28')
    .add('sg29')
    .add('sg30')
    .add('sg31')
    .add('sg32')
    .add('sg34')
    .add('sg37')
    .add('sg39')
    .add('sg40')
    .add('sg41')
    .add('sg43')
    .add('sg45')
    .add('sg51')
    .add('sg81')
    .add('sg82')
    .add('dev')
    .add('closeCasino')
    .add('Cross_day')
    .add('chloe')
    .add('2018-redis')
    .add('enableSet')
    .add('ext_agent')
    .add('offset');

btree.get('offset')
    .add('sg88');


btree.get('ext_agent')
    .add('sg81')
    .add('sg82')
    .add('sg84');

btree.get('2018-redis')
    .add('2018-Casino')
    .add('2018-redis-cross_day');

btree.get('Cross_day')
    .add('sg15')
    .add('sg16')
    .add('sg33')
    .addGet('2018-redis-cross_day')
        .add('sg36')
        .addGet('2018-redis-cross_day-newCasino')
            .add('sg17')
            .add('sg35')
            .add('sg42')
            .add('sg46')
            .add('sg47')
            .add('sg49');

module.exports = btree;
