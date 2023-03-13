# FROM node:14 as build
# #WORKDIR /app/
# WORKDIR /app/build

# #ENV PATH /app/node_modules/.bin:$PATH
# #COPY package.json ./
# #RUN rm package-lock.json
# #RUN npm clean
# #RUN npm install -g esbuild@0.14.38
# #RUN npm i
# #RUN npm install react-scripts@3.4.1 -g --silent
# COPY . ./
# #xRUN npm run build

# # production environment
# FROM nginx:latest
# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]