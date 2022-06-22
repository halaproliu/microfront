#!/bin/bash
docker build -t singlereact .
docker run -d --network microapp -p 9003:80 singlereact