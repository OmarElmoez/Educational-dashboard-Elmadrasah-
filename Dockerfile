# Base lv
# development
# build
# production

# FROM node:22.12-alpine3.21

# # setup system user
# RUN addgroup app && adduser -S app -G app
# WORKDIR /app
# RUN chown -R app:app /app
# USER app

# ARG VITE_URL_SERVER

# ENV VITE_URL_SERVER=$VITE_URL_SERVER

# COPY package*.json ./
# RUN npm ci

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# =========== Base lv ===========
FROM node:22.12-alpine3.21 AS base
WORKDIR /app
ARG VITE_URL_SERVER
ENV VITE_URL_SERVER=$VITE_URL_SERVER
RUN addgroup app && adduser -S app -G app


# =========== Development lv ===========
FROM base AS development
RUN chown -R app:app /app
USER app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# =========== Build lv ===========
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# =========== Production lv ===========
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

