#!/bin/bash
docker cp nginx/default.conf $1:/etc/nginx/conf.d
docker cp dist $1:/usr/share/nginx/html/
docker restart $1