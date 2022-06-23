#!/bin/bash
currentDir=$(dirname $0)
. $currentDir/log.sh
index=0

# 显示project列表
function getWebFileList(){
  log 5 "Please choose one project:"
  # 遍历当前web工程目录
  for file in `ls`
  do
    if [ -d $file ];
    then
      # 文件列表存入数组
      fileList[$index]=$file
      # 数组下标加1
      index=`expr $index + 1`
      # 显示数字+列表
      echo "$index.$file"
    fi
  done
}
# 选择project
function selectProject(){
  # 读取选项number
  read selectIndex
  if [ $((selectIndex)) -gt 0 ];
  then
    # 数组是从0开始，所以输入数字减1
    selectIndex=`expr $selectIndex - 1`
    # 回显选中选项提示
    log 6 "you have selected ${fileList[selectIndex]} project!"
    cd ${fileList[selectIndex]}
    npm run build
  else
    log 1 "Please Input right number!"
    exit 1;
  fi
}

getWebFileList
selectProject