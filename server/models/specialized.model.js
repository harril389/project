const Specializeds = (sequelize, Sequelize) => {
  const Specializeds = sequelize.define("specializeds", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    professional_level: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    number_drop_blood: Sequelize.STRING,
  });
  return Specializeds;
};

export default Specializeds;