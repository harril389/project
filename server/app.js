import express from "express";
import cors from "cors";
import { PathConstant } from "./const";
import { database } from "./config";
import { authRouter, examRouter, managerRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(PathConstant.ROOT, authRouter);
app.use(PathConstant.ROOT, examRouter);
app.use(PathConstant.ROOT, managerRouter);
const runSequelize = async () => {
  try {
    let run = await database.sequelize.sync();
    if (run) {
      console.log("Sequelize is Running");
    }
  } catch (err) {
    console.log(err.message);
  }
};

runSequelize();

export default app;
