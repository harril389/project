const Answers = (sequelize, Sequelize) => {
  const Answers = sequelize.define("answers", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    answer: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    status: Sequelize.BOOLEAN,
  });
  return Answers;
};

export default Answers;
