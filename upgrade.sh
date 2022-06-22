#!/bin/bash
cd microfront-cli-$2
docker cp nginx/default.conf $1:/etc/nginx/conf.d
docker cp dist $1:/usr/share/nginx/html/
docker restart $1