const BranchTree = require('./BranchTree');


const btree = new BranchTree('master');

btree.get('master')
    .add('chloe')
    .add('sg11')
    .add('sg24')
    .add('sg26')
    .add('sg2')
    .add('sg37')
    .add('sg14')
    .add('sg1')
    .add('sg28')
    .add('sg34')
    .add('sg10')
    .add('sg12')
    .add('sg6')
    .add('sg19')
    .add('sg22')
    .add('sg18')
    .add('sg21')
    .add('sg3')
    .add('sg25')
    .add('sg13')
    .add('sg31')
    .add('sg9')
    .add('sg30')
    .add('sg27')
    .add('sg40')
    .add('sg5')
    .add('sg29')
    .add('sg43')
    .add('sg51')
    .add('sg7')
    .add('sg41')
    .add('sg45')
    .add('sg0')
    .add('sg4')
    .add('sg8')
    .add('sg39')
    .add('sg32')
    .add('dev');

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
    });


// btree.addGet('Cross_day')
//     .add('sg15')
//     .add('sg16')
//     .add('sg33');
//     .add('2018-redis-cross_day')
//     .get('2018-redis-cross_day')
//         .add('sg36')
//         .add('2018-redis-cross_day-newCasino')
//         .get('2018-redis-cross_day-newCasino')
//             .add('new_user_edit')
//             .add('edit')
//             .get('edit')
//                 .add('sg17')
//                 .add('sg46')
//                 .add('sg49')
//                 .add('sg35')
//                 .add('sg47')
//                 .add('sg42');

module.exports = btree;
