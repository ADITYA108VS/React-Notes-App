const {Pool}=require('pg')
const pool=new Pool({
    user:'postgres',
    host:5432,
    database:'full_stack_web_app',
    password:'1022',
    host:'localhost'
});
var a=1;
module.exports={pool,a};