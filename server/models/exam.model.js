const Exams = (sequelize, Sequelize) => {
  const Exams = sequelize.define("exams", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    start_time: Sequelize.INTEGER,
    end_time: Sequelize.INTEGER,
    time: Sequelize.INTEGER,
    password: Sequelize.STRING,
    status: Sequelize.INTEGER,
    description: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    role_view_uid: Sequelize.STRING,
  });
  return Exams;
};

export default Exams;
