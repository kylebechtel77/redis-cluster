let hello = require('./handler')

async function t(){
await hello.hello('',{},function(x, y){
  console.log(y);
})

}
t();