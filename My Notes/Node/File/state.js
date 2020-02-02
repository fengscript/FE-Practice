'use strict';
var fs = require('fs');

fs.stat('./a.txt', function (err, state) { 
  if(err){console.log(err);}
  else{
    console.log('是否为文件'+state.isFile());
    console.log('是否为目录'+state.isDirectory());
    if(state.isFile){
      console.log('文件大小'+state.size);
      console.log('创建时建'+state.birthtime);
      console.log('修改时间'+state.mtime);

      
    }
  }
 })