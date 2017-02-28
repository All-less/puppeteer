FROM node:6.10.0

ENV DIRPATH /var/tmp

RUN cd ${DIRPATH} \
    && git clone https://github.com/All-less/puppeteer.git -b develop --single-branch \
    && cd ${DIRPATH}/puppeteer \
    && npm install \
    && NODE_ENV=production npm run compile \

EXPOSE 3000

WORKDIR /var/tmp/puppeteer

ENTRYPOINT npm run start:prod
