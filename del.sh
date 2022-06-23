#!/bin/bash
. log.sh
function handleresult(){
  if [ $? -eq 0 ];
  then
    log 6 $1;
  else
    exit 0;
  fi
}
appname=$1
if [ $appname == 'reactutils' ];
then
  folder='microfront-cli-react-utils'
elif [ $appname == 'singlereact' ];
then
  folder='microfront-cli-react'
else
  folder=microfront-cli-$appname
fi
# 获取containerId
containerid=`docker ps -a | grep $appname | awk '{print $1}'`
if [ ! $containerid ];
then
  echo "$appname is not exists"
  cd $folder
  # 编译镜像
  npm run image
  handleresult '编译镜像成功'
  # 发布容器
  npm run deploy
  handleresult "${appname}:容器发布成功"
else
  # 获取镜像ID
  # imageid=docker images | grep reactutils | awk '${print $3}'
  # 停止容器
  docker stop $containerid
  handleresult "停止容器${appname}成功，容器id:${containerid}"
  # 删除容器
  docker rm $containerid
  handleresult "删除容器${appname}成功，容器id:${containerid}"
  # 删除镜像
  docker images | grep ${appname} | awk '{print $3}' | xargs docker rmi
  handleresult "删除镜像${appname}成功"
  cd $folder
  # 编译镜像
  npm run image
  handleresult '编译镜像成功'
  # 发布容器
  npm run deploy
  resid=$(docker ps -a | grep $appname | awk '{print $1}')
  handleresult "${appname}:容器发布成功,容器id:${resid}"
fi