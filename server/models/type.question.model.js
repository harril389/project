const TypeQuestions = (sequelize, Sequelize) => {
  const TypeQuestions = sequelize.define("type_questions", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    type: Sequelize.STRING,
    description: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return TypeQuestions;
};
export default TypeQuestions;
