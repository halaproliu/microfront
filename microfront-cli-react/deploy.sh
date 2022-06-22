#!/bin/bash
docker build -t singlereact .
docker run -d --network microapp -p 9002:80 singlereact