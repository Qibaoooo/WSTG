FROM node:slim

RUN mkdir /WSTG

COPY . /WSTG
WORKDIR /WSTG

RUN ls -al
RUN npm install
RUN npm run build

EXPOSE 3333

CMD ["node", "./dist/index.js"]