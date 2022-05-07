ARG FUNCTION_DIR="/function"

FROM node:16-buster as build-image

RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    libcurl4-openssl-dev \
    make \
    unzip

ARG FUNCTION_DIR

RUN mkdir -p ${FUNCTION_DIR}

WORKDIR ${FUNCTION_DIR}

COPY dist/* .

RUN npm install aws-lambda-ric

FROM node:16-buster-slim

ARG FUNCTION_DIR

WORKDIR ${FUNCTION_DIR}

COPY --from=build-image ${FUNCTION_DIR} ${FUNCTION_DIR}

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]

CMD ["app.handler"]
