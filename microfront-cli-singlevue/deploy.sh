#!/bin/bash
docker build -t singlevue .
docker run -d --network microapp -p 9001:80 singlevue