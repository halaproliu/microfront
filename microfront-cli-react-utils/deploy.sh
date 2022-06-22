#!/bin/bash
docker build -t reactutils .
docker run -d --network microapp -p 9004:80 reactutils