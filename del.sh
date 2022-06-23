#!/bin/bash
appname=$1
if [ $appname == 'reactutils' ];
then
  folder='microfront-cli-react-utils'
elif [ $appname == 'singlereact' ];
then
  folder='microfront-cli-react'
else
then
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
  # 发布容器
  npm run deploy
else
  # 获取镜像ID
  # imageid=docker images | grep reactutils | awk '${print $3}'
  # 停止容器
  docker stop $containerid
  # 删除容器
  docker rm $containerid
  # 删除镜像
  docker images | grep reactutils | awk '{print $3}' | xargs docker rmi
  cd $folder
  # 编译镜像
  npm run image
  # 发布容器
  npm run deploy
fi