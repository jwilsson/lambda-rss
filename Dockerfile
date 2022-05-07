ARG FUNCTION_DIR="/function"

FROM node:16-alpine as build-image

RUN apk add \
    autoconf \
    automake \
    build-base \
    cmake \
    libexecinfo-dev \
    libtool \
    python3

ARG FUNCTION_DIR

RUN mkdir -p ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

COPY dist/* .

RUN npm install aws-lambda-ric

FROM node:16-alpine

ARG FUNCTION_DIR

WORKDIR ${FUNCTION_DIR}

COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "--node-options=--experimental-fetch", "aws-lambda-ric"]

CMD ["app.handler"]
