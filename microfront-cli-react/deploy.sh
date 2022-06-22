#!/bin/bash
docker build -t singleReact .
docker run -d --network microapp -p 9002:80 singleReact