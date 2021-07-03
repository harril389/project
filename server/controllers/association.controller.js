import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Association = database.Model.association;

export const ViewAssociation = async (req, res) => {
  try {
    let association = await Association.findOne({
      where: {
        id: 1,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: association }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditAssociation = async (req, res) => {
  try {
    let association = await Association.findOne({
      where: {
        id: 1,
      },
    });
    if (!association) {
      let intro_association = await Association.create({
        id: 1,
        chairman: req.body.chairman,
        vice_chairman_1: req.body.vice_chairman_1,
        vice_chairman_2: req.body.vice_chairman_2,
        vice_chairman_3: req.body.vice_chairman_3,
        vice_chairman_4: req.body.vice_chairman_4,
        prestige_1: req.body.prestige_1,
        prestige_2: req.body.prestige_2,
        founded_year: req.body.founded_year,
        traditional_day: req.body.traditional_day,
        sympathizer: req.body.sympathizer,
        volunteer: req.body.volunteer,
        member: req.body.member,
        instructor: req.body.instructor,
        coach: req.body.coach,
        staff_strengthened: req.body.staff_strengthened,
        document: null,
        document_history: null,
        link_test: null,
      });
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: intro_association }));
    } else {
      await Association.update(
        {
          chairman: req.body.chairman,
          vice_chairman_1: req.body.vice_chairman_1,
          vice_chairman_2: req.body.vice_chairman_2,
          vice_chairman_3: req.body.vice_chairman_3,
          vice_chairman_4: req.body.vice_chairman_4,
          prestige_1: req.body.prestige_1,
          prestige_2: req.body.prestige_2,
          founded_year: req.body.founded_year,
          traditional_day: req.body.traditional_day,
          sympathizer: req.body.sympathizer,
          volunteer: req.body.volunteer,
          member: req.body.member,
          instructor: req.body.instructor,
          coach: req.body.coach,
          staff_strengthened: req.body.staff_strengthened,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      let intro_association = await Association.findOne({
        where: {
          id: 1,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: intro_association }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewPDF = async (req, res) => {
  try {
    let association = await Association.findOne({
      where: {
        id: 1,
      },
      attributes: ["document", "document_history"],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: association }));
  } catch (error) {
    res
    .status(AppConstant.STATUS_SERVER_ERROR)
    .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditPDF = async (req, res) => {
  try {
    if (!req.file) {
      res
      .status(AppConstant.STATUS_OK)
      .json(responseFormat());
    }
    const processedFile = req.file || {};
    console.log(processedFile)
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    let filename = processedFile.filename || "";
    let filePath = `${process.env.SERVER_HOST}/pdf/` + filename ;
    let association = await Association.findOne({
      where: {
        id: 1,
      },
    });
    if (!association) {
       await Association.create({
        id: 1,
        chairman: null,
        vice_chairman_1: null,
        vice_chairman_2: null,
        vice_chairman_3: null,
        vice_chairman_4: null,
        prestige_1: null,
        prestige_2: null,
        founded_year: null,
        traditional_day: null,
        sympathizer:null,
        volunteer: null,
        member: null,
        instructor: null,
        coach: null,
        staff_strengthened: null,
        document: filePath,
        document_history: null,
        link_test: null,
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: association }));
    } else {
      await Association.update(
        {
          document: filePath,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      let intro_association = await Association.findOne({
        where: {
          id: 1,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: intro_association }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditPDFHistory = async (req, res) => {
  try {
    if (!req.file) {
      res
      .status(AppConstant.STATUS_OK)
      .json(responseFormat());
    }
    const processedFile = req.file || {};
    console.log(processedFile)
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    let filename = processedFile.filename || "";
    let filePath = `${process.env.SERVER_HOST}/pdf/` + filename ;
    let association = await Association.findOne({
      where: {
        id: 1,
      },
    });
    if (!association) {
      let association = await Association.create({
        id: 1,
        chairman: null,
        vice_chairman_1: null,
        vice_chairman_2: null,
        vice_chairman_3: null,
        vice_chairman_4: null,
        prestige_1: null,
        prestige_2: null,
        founded_year: null,
        traditional_day: null,
        sympathizer:null,
        volunteer: null,
        member: null,
        instructor: null,
        coach: null,
        staff_strengthened: null,
        document: null,
        document_history: filePath,
        link_test: null,
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: association }));
    } else {
      await Association.update(
        {
          document_history: filePath,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      let intro_association = await Association.findOne({
        where: {
          id: 1,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: intro_association }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditLinkTest = async (req, res) => {
  try {
    let association = await Association.findOne({
      where: {
        id: 1,
      },
    });
    if (!association) {
      let association = await Association.create({
        id: 1,
        chairman: null,
        vice_chairman_1: null,
        vice_chairman_2: null,
        vice_chairman_3: null,
        vice_chairman_4: null,
        prestige_1: null,
        prestige_2: null,
        founded_year: null,
        traditional_day: null,
        sympathizer:null,
        volunteer: null,
        member: null,
        instructor: null,
        coach: null,
        staff_strengthened: null,
        document: null,
        document_history: null,
        link_test: req.body.link_test,
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: association }));
    } else {
      await Association.update(
        {
          link_test: req.body.link_test,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      let intro_association = await Association.findOne({
        where: {
          id: 1,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: intro_association }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewLinkTest = async (req, res) => {
  try {
    let association = await Association.findOne({
      where: {
        id: 1,
      },
      attributes: ["link_test"],
    });
    res.status(200).send({ success: true, message: association });
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
