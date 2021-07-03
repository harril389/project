import path from "path";
import fs from "fs";
import moment from "moment";
import schedule from "node-schedule";
import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
import replaceString from "replace-string";
const Background = database.Model.background;
const LogImage = database.Model.logimage;
const Op = database.Sequelize.Op;

export const CreateBackground = async (req, res) => {
  try {
    const processedFile = req.file || {};
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    const fullPathInServ = processedFile.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    let fileString = path.basename(newFullPath);
    let filePath = `${process.env.SERVER_HOST}/background/` + fileString;
    let backgrounds = await Background.findOne({
      where: {
        [Op.and]: [
          {
            program_name: req.body.program_name,
          },
          {
            program_link: req.body.program_link,
          },
          {
            image_link: filePath,
          },
          {
            started_at: req.body.started_at,
          },
          {
            ended_at: req.body.ended_at,
          },
          {
            place: req.body.place,
          },
        ],
      },
    });
    if (!backgrounds) {
      console.log(1)
      const background = await Background.create({
        program_name: req.body.program_name,
        program_link: req.body.program_link,
        image_link: filePath,
        started_at: req.body.started_at,
        ended_at: req.body.ended_at,
        place: req.body.place,
      })
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: background }));
    } else {
      console.log(2)
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Background is exist!" }));
    }
  } catch (error) {
    console.log(error)
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const ViewBackground = async (req, res) => {
  try {
    let backgrounds = await Background.findAll({
      order: [["id", "DESC"]],
    });
    res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: backgrounds }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const ViewBackgroundByUid = async (req, res) => {
  try {
    let background = await Background.findOne({
      where: {
        id: req.params.background_id,
      },
    });
    res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: background }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const SlideShowBackground = async (req, res) => {
  try {
    let backgrounds = Background.findAll({
      where: {
        ended_at: {
          [Op.gte]: moment().format("YYYY-MM-DD"),
        },
      },
    });
    res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: backgrounds }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const EditBackground = async (req, res) => {
  try {
    let backgrounds = await Background.findOne({
      where: {
        id: req.params.background_id,
      },
    });
    if (!backgrounds)
    res
      .status(AppConstant.STATUS_NOT_FOUND)
      .json(responseFormat({ message: "Result is not exist!" }));
    else {
      await Background.update(
        {
          program_name: req.body.program_name,
          program_link: req.body.program_link,
          started_at: req.body.started_at,
          ended_at: req.body.end_at,
          place: req.body.place,
        },
        {
          where: {
            id: req.params.background_id,
          },
        }
      );
      let data = await Background.findOne({
        where: {
          id: req.params.background_id,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const DeleteBackground = async (req, res) => {
  try {
    let backgrounds = await Background.findOne({
      where: {
        id: req.params.background_id,
      },
    });
    const linkanh = {};
    linkanh.image_link = background.image_link;
    new LogImage(image_link).save();
    let destroyBackground = Background.destroy({
      where: {
        id: req.params.background_id,
      },
    });
    if (destroyBackground !== 0) {
      res.status(AppConstant.STATUS_OK).json(responseFormat());
    } else {
      res
        .status(AppConstant.STATUS_FORBIDDEN)
        .json(responseFormat({ message: "An error occurred!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
var x = "!!!!!!";
var j = schedule.scheduleJob(
  {
    hour: 3,
    minute: 30,
    dayOfWeek: 0,
  },
  function DeleteImageSystem() {
    LogImage.findAll({}).then((data) => {
      const host = `${process.env.SERVER_HOST}/background`;
      data.map((y) => {
        let a = y.image_link;
        if (a == null) return false;
        let x = replaceString(a, host, "./images");
        fs.unlink(x, (err) => {
          if (err) {
          }
          LogImage.destroy({
            where: {
              image_link: a,
            },
          }).then((result) => {});
        });
      });
    });
  }.bind(null, x)
);
