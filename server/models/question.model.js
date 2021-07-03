const Questions = (sequelize, Sequelize) => {
  const Questions = sequelize.define("questions", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    is_many_correct: Sequelize.BOOLEAN,
    question_text: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    point: Sequelize.INTEGER,
  });
  return Questions;
};
export default Questions;
