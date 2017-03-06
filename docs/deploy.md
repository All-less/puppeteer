### Prerequisite

- 2G+ RAM
- MongoDB

### Deployment

```
docker run -p 27017:27017 -v <db_path>:/data/db mongo:latest
docker run -p 0.0.0.0:3000:3000 -d -v /home/docker/projects/puppeteer:/var/tmp/puppeteer --network=host daocloud.io/synchronicity27/puppeteer:develop-2f76539
docker run -p 0.0.0.0:8980:8980 -dt --network=host -v /home/docker/projects/bigdatapuppet:/root/bigdatapuppet bigdatapuppet-dev:0.0.0 /bin/bash -c "cd /root/bigdatapuppet && /usr/local/sbt-launcher-packaging-0.13.13/bin/sbt run"
```

### Online Debugging

```
docker run -p 0.0.0.0:3000:3000 -it --entrypoint=/bin/bash  -v /home/docker/projects/puppeteer:/var/tmp/puppeteer --network=host daocloud.io/synchronicity27/puppeteer:develop-2f76539
docker run -p 0.0.0.0:8980:8980 -it --network=host -v /home/docker/projects/bigdatapuppet:/root/bigdatapuppet bigdatapuppet-dev:0.0.0
```

### Cleanup

```
docker container ls -a | grep Exited | awk '{ print $1 }' | xargs docker rm
```
