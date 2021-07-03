import http from "http";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port);
server.on("listening", () => {
  console.log(`Server listen on port ${port}`);
});
