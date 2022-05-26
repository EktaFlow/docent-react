FROM node:10.19.0-buster
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apt-get update &&\
    apt-get install -y python jq
RUN npm install && \ 
    npm install styled-components && \
    jq '.browser["fs"]=false' node_modules/react-export-excel/node_modules/xlsx/package.json > browser-fs.json && \
    cp browser-fs.json node_modules/react-export-excel/node_modules/xlsx/package.json && \
    npm run build
FROM nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=0 /usr/src/app/build ./
VOLUME /usr/share/nginx/html
