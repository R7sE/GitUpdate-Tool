const BranchTree = require('./BranchTree');


const btree = new BranchTree('root');

btree.addGet('master')
    .add('chloe')
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
    .add('sg11')
    .add('sg12')
    .add('sg13')
    .add('sg14')
    .add('sg18')
    .add('sg19')
    .add('sg21')
    .add('sg22')
    .add('sg24')
    .add('sg26')
    .add('sg27')
    .add('sg28')
    .add('sg29')
    .add('sg30')
    .add('sg31')
    .add('sg32')
    .add('sg37')
    .add('sg40')
    .add('sg41')
    .add('sg43')
    .add('sg45')
    .add('sg51')
    .add('dev');

btree.get('master')
    .add('offset_odds')
    .addGet('new_Log')
        .add('sg84');

btree.get('master')
    .addGet('ext_agent')
        .add('sg81')
        .add('sg82')
        .add('sg84');


btree.get('root')
    .addGet('Cross_day')
        .add('sg16')
        .addGet('2018-redis-cross_day')
            .add('sg36')
            .addGet('Casino_4in1')
                .add('sg10')
                .add('sg17')
                .add('sg20')
                .add('sg35')
                .add('sg39')
                .add('sg42')
                .add('sg46')
                .add('sg47')
                .add('sg49')
                .addGet('offset')
                    .add('sg88');

module.exports = btree;