const BranchTree = require('./BranchTree');


const btree = new BranchTree('root');

btree.addGet('master')
    .add('chloe')
    .add('sg4')
    .add('sg27')
    .add('sg28')
    .add('sg30')
    .add('sg31')
    .add('sg40')
    .add('sg43')
    .add('sg45')
    .add('sg51')
    .add('dev');

btree.get('root')
    .addGet('Casino_4in1')
        //Redis:72
        .add('sg0')
        .add('sg1')
        .add('sg2')
        .add('sg6')
        .add('sg7')
        .add('sg10')//redisMod
        .add('sg12')
        .add('sg13')
        .add('sg17')
        .add('sg18')
        .add('sg24')
        .add('sg26')
        .add('sg19')
        .add('sg22')
        .add('sg25')
        .add('sg32')
        //Redis:71
        .add('sg3')
        .add('sg5')
        .add('sg8')
        .add('sg11')
        .add('sg14')
        .add('sg15')
        .add('sg20')
        .add('sg21')
        .add('sg35')//redisMod
        .add('sg39')
        .add('sg41')
        .add('sg42')
        //Redis:70
        .add('sg9')
        .add('sg29')
        .add('sg36')
        .add('sg37')
        // .add('sg44')
        .add('sg46')
        .add('sg47')
        .add('sg49');//redisMod

btree.get('Casino_4in1')
    .addGet('ext-4in1')
    .add('sg55')
    .add('sg81')//redisMod
    .add('sg82')//redisMod
    .add('sg84');//redisMod

btree.get('Casino_4in1')
    .addGet('offset')
    .add('sg88');
module.exports = btree;
