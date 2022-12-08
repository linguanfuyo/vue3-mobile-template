FROM node:12 as compile

WORKDIR /app

# 如果我们把package*.json和代码程序一起拷贝，如果我们只更改了代码而没有新增依赖，但docker仍然会安装依赖；但是我们如果把它单独拿出来的话，就能够提高缓存的命中率。
COPY package.json ./

RUN npm install yarn -g

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:latest as serve

COPY default.conf /etc/nginx/conf.d/

COPY --from=compile /app/dist /usr/share/nginx/html/

EXPOSE 80
