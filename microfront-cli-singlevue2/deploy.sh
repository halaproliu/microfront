#!/bin/bash
docker build -t singlevue2 .
docker run -d --network microapp -p 9002:80 singlevue2