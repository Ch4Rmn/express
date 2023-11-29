const redis = require("redis");

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.on("connect", () => {
  console.log("connect with redis");
});

client.on("ready", () => {
  console.log("ready with redis and ready to Use");
});

client.on("error", (err) => {
  console.log(err.message());
});

client.on('end',() => {
    console.log("disconnect with redis");
})

process.on("SIGINT",() => {
    client.quit()
})

module.exports = client