/**
 * Author 三直
 * Description 切分支打包并push到远端再切回原来分支
 */

'use strict';

let shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

let getCurrentBranch=()=>{
  let result=shell.exec('git branch',{silent:true}).stdout;
  let item=result.split('\n').find(item=>{
    if(item.indexOf('*')>=0){
      return item;
    }
  });
  return item.substr(2);
};

let currentBranch=getCurrentBranch();

shell.exec('git checkout release');

shell.exec(`git merge ${currentBranch}`);

shell.exec('npm run release');

shell.exec('git add -A');

shell.exec('git commit -am release');

shell.exec('git push origin release');

shell.exec(`git checkout ${currentBranch}`);
