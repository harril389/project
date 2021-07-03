const Functions = (sequelize, Sequelize) => {
  const Functions = sequelize.define("functions", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    object: Sequelize.STRING,
    method: Sequelize.STRING,
    path: Sequelize.STRING,
    description: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Functions;
};
export default Functions;
