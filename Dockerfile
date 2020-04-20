## Builder
FROM gliderlabs/herokuish:master as builder
COPY . /tmp/app
ARG BUILDPACK_URL
ENV USER=herokuishuser
RUN /bin/herokuish buildpack build

## Runner
FROM gliderlabs/herokuish
COPY --chown=herokuishuser:herokuishuser --from=builder /app /app
ENV USER=herokuishuser
ARG APP_PORT=5000
ENV PORT ${APP_PORT}
ENV APP_PORT ${APP_PORT}

# Quasar settings
ARG NODE_ENV="development"
ENV NODE_ENV "${NODE_ENV}"

EXPOSE ${APP_PORT}

CMD ["/bin/herokuish", "procfile", "start", "web"]
