### Prerequisite

- 2G+ RAM
- MongoDB

### Deployment

```
docker run -p 27017:27017 -v <db_path>:/data/db mongo:latest
docker run --network="host" -p 3000:3000 puppeteer
```
