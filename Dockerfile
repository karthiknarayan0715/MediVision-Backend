FROM node:18

WORKDIR /usr/medivision

COPY ./ /usr/medivision

RUN npm install

CMD ["npm","start"]