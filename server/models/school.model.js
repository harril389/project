const Schools = (sequelize, Sequelize) => {
  const Schools = sequelize.define("schools", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    school: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    class: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    majors: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    gpa: {
      type: Sequelize.FLOAT,
      defaultValue: null,
    },
  });
  return Schools;
};

export default Schools;
