FROM golang:1.22.4-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o server

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/server .
COPY --from=builder /app/.env .

EXPOSE 80
CMD ["./server"]