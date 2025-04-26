
FROM node:22 AS builder
WORKDIR /app

## install the dependencies
COPY package*json .
RUN npm ci

## build the app
COPY . .
RUN npm run build

# prod
FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["./node_modules/.bin/next","start"]