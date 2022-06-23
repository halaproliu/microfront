#!/bin/bash
containerid=$(docker ps -a | grep reactutils | awk '{print $1}')
imageid=$(docker images | grep reactutils | awk '${print $3}')
docker stop $containerid
docker rm $containerid
docker rmi $imageid
npm run image
npm run deploy