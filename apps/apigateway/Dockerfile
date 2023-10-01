FROM node:16

WORKDIR /home/vikas/personalWork/nestjs-grpc/apps/apigateway
COPY package*.json ./
RUN pnpm install
COPY . .
CMD [ "pnpm", "run","start:Dev","apigateway" ]

