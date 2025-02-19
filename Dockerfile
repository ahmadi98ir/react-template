FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat git

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install react-quill@latest

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]