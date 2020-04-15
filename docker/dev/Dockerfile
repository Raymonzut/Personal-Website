FROM node:lts-alpine

# where the files live
WORKDIR /app

# get the sauce
COPY /src/ /app/src/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# make sure the packages are the same
COPY package-lock.json /app/package.json

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# start app
CMD ["npm", "run", "serve"]

# allow to be peeked inside
EXPOSE 8080
