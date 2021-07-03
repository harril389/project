import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configFile from "./config.json";
import {
  // volunteer management
  Activity_Associations,
  Associations,
  Backgrounds,
  Branchs,
  Clubs,
  LogImages,
  Members,
  Positions,
  Remuneratives,
  Specializeds,
  Schools,
  Learns,
  Activitys,

  // test
  Answers,
  Exams,
  Functions,
  Questions,
  QuestionExams,
  TypeQuestions,
  UserExams,
  Users,
  Roles,
  RoleFunctions,
  Results,
} from "../models";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

const Model = {
  // volunteer management
  activity_association: Activity_Associations(sequelize, Sequelize),
  association: Associations(sequelize, Sequelize),
  background: Backgrounds(sequelize, Sequelize),
  branch: Branchs(sequelize, Sequelize),
  club: Clubs(sequelize, Sequelize),
  logimage: LogImages(sequelize, Sequelize),
  member: Members(sequelize, Sequelize),
  position: Positions(sequelize, Sequelize),
  remunerative: Remuneratives(sequelize, Sequelize),
  specialized: Specializeds(sequelize, Sequelize),
  school: Schools(sequelize, Sequelize),
  learn: Learns(sequelize, Sequelize),
  activity: Activitys(sequelize, Sequelize),

  // test
  answer: Answers(sequelize, Sequelize),
  exam: Exams(sequelize, Sequelize),
  function: Functions(sequelize, Sequelize),
  question_exam: QuestionExams(sequelize, Sequelize),
  question: Questions(sequelize, Sequelize),
  role_function: RoleFunctions(sequelize, Sequelize),
  role: Roles(sequelize, Sequelize),
  type_question: TypeQuestions(sequelize, Sequelize),
  user_exam: UserExams(sequelize, Sequelize),
  user: Users(sequelize, Sequelize),
  result: Results(sequelize, Sequelize),
};

database.Model = Model;
// volunteer management
Model.role.hasMany(Model.user, {foreignKey:'role_uid'});
Model.user.belongsTo(Model.role, {foreignKey:'role_uid'})
Model.user.hasOne(Model.member, { foreignKey: 'user_uid'});
Model.member.belongsTo(Model.user, { foreignKey: 'user_uid'});
Model.member.hasOne(Model.school, { foreignKey: 'member_uid'});
Model.school.belongsTo(Model.member, { foreignKey: 'member_uid'});
Model.specialized.hasMany(Model.member, { foreignKey: 'specialized_uid'});
Model.member.belongsTo(Model.specialized, { foreignKey: 'specialized_uid'});
Model.position.hasMany(Model.member, { foreignKey: 'position_uid'});
Model.member.belongsTo(Model.position, { foreignKey: 'position_uid'});
Model.club.hasMany(Model.member, { foreignKey: 'club_uid'});
Model.member.belongsTo(Model.club, { foreignKey: 'club_uid'});
Model.branch.hasMany(Model.club, { foreignKey: 'branch_uid'});
Model.club.belongsTo(Model.branch, { foreignKey: 'branch_uid'});

Model.member.hasMany(Model.learn, { foreignKey: 'member_uid'});
Model.learn.belongsTo(Model.member, { foreignKey: 'member_uid'});

Model.member.hasMany(Model.activity, { foreignKey: 'member_uid'});
Model.activity.belongsTo(Model.member, { foreignKey: 'member_uid'});
// Về hội
Model.association.hasMany(Model.activity_association);
Model.activity_association.belongsTo(Model.association);
Model.association.hasMany(Model.remunerative);
Model.remunerative.belongsTo(Model.association);


// test
Model.type_question.hasMany(Model.question, { foreignKey: 'type_question_uid'});
Model.question.belongsTo(Model.type_question, { foreignKey: 'type_question_uid'});


Model.user.hasMany(Model.user_exam, { foreignKey: 'user_uid'});
Model.user_exam.belongsTo(Model.user, { foreignKey: 'user_uid'});
Model.user.hasOne(Model.answer, { foreignKey: 'user_uid'});
Model.answer.belongsTo(Model.user, { foreignKey: 'user_uid'});
Model.user.hasMany(Model.question, { foreignKey: 'user_uid'});
Model.question.belongsTo(Model.user, { foreignKey: 'user_uid'});
Model.user.hasMany(Model.exam, { foreignKey: 'user_uid'});
Model.exam.belongsTo(Model.user, { foreignKey: 'user_uid'});

Model.exam.hasMany(Model.user_exam, { foreignKey: 'exam_uid'});
Model.user_exam.belongsTo(Model.exam, { foreignKey: 'exam_uid'});
Model.exam.hasMany(Model.question_exam, { foreignKey: 'exam_uid'});
Model.question_exam.belongsTo(Model.exam, { foreignKey: 'exam_uid'});

Model.question.hasMany(Model.question_exam, { foreignKey: 'question_uid'});
Model.question_exam.belongsTo(Model.question, { foreignKey: 'question_uid'});
Model.question_exam.hasMany(Model.answer, { foreignKey: 'question_in_exam_uid'});
Model.answer.belongsTo(Model.question_exam, { foreignKey: 'question_in_exam_uid'});
Model.question.hasMany(Model.result, { foreignKey: 'question_uid'});
Model.result.belongsTo(Model.question, { foreignKey: 'question_uid'});

Model.role.hasOne(Model.user, { foreignKey: 'role_uid'});
Model.user.belongsTo(Model.role, { foreignKey: 'role_uid'});
Model.role.hasOne(Model.role_function, { foreignKey: 'role_uid'});
Model.role_function.belongsTo(Model.role, { foreignKey: 'role_uid'});

Model.function.hasOne(Model.role_function, { foreignKey: 'function_uid'});
Model.role_function.belongsTo(Model.function, { foreignKey: 'function_uid'});



export default database;
