#!/bin/bash

cd microfront-cli-$1
docker build -t $1 .
docker run -d --network microapp -p 9000:80 $1