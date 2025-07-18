#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔻 Stopping all running containers...${NC}"
docker stop $(docker ps -q) 2>/dev/null

echo -e "${GREEN}🗑 Removing all containers...${NC}"
docker rm $(docker ps -aq) 2>/dev/null

echo -e "${GREEN}🧼 Removing all images...${NC}"
docker rmi -f $(docker images -q) 2>/dev/null

echo -e "${GREEN}📦 Removing all volumes...${NC}"
docker volume rm $(docker volume ls -q) 2>/dev/null

echo -e "${GREEN}🌐 Removing all networks (except default ones)...${NC}"
docker network rm $(docker network ls | grep -v "bridge\|host\|none" | awk '{ if(NR>1) print $1 }') 2>/dev/null

echo -e "${GREEN}✅ Docker cleanup complete!${NC}"
