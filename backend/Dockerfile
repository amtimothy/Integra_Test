# build tiny docker image
FROM alpine:latest

RUN mkdir /app

COPY backendApp /app
COPY migrations/ /migrations/


CMD [ "/app/backendApp" ]
