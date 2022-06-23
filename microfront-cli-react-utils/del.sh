#!/bin/bash
# 获取containerId
containerid=`docker ps -a | grep reactutils | awk '{print $1}'`
# 获取镜像ID
# imageid=docker images | grep reactutils | awk '${print $3}'
# 停止容器
docker stop $containerid
# 删除容器
docker rm $containerid
# 删除镜像
docker images | grep reactutils | awk '${print $3}' | xargs docker rmi
# 编译镜像
npm run image
# 发布容器
npm run deploy