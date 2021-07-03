const Roles = (sequelize, Sequelize) => {
  const Roles = sequelize.define("roles", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    role: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Roles;
};

export default Roles;
