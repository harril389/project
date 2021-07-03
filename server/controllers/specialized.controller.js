import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Specialized = database.Model.specialized;

export const ViewSpecialized = async (req, res) => {
  try {
    const specializeds = await Specialized.findAll({
      attributes: ["uid", "professional_level"],
    });
    res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: specializeds }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const CreateSpecialized = async (req, res) => {
  try {
    let specializeds = await Specialized.findOne({
      where: {
        professional_level: req.body.professional_level
      },
    });
    if (!specializeds) {
      let specialized = await Specialized.create({
        professional_level: req.body. professional_level,
        number_drop_blood: req.body.number_drop_blood
      });
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: specialized }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Specialized is exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditSpecialized = async (req, res) => {
  try {
    await Specialized.update(
      {
        professional_level: req.body.professional_level,
        number_drop_blood: req.body.number_drop_blood
      },
      {
        where: {
          uid: req.params.specialized_uid,
        },
      }
    );
    let specialized = await Specialized.findOne({
      where: {
        uid: req.params.specialized_uid
      },
    });
    res
      .status(AppConstant.STATUS_OK)
      .json(responseFormat({ data: specialized }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const DeleteSpecialized = async (req, res) => {
  try {
    await Specialized.destroy({
      where: {
        uid: req.params.specialized_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
