const Positions = (sequelize, Sequelize) => {
  const Positions = sequelize.define("positions", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    position: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    rank: Sequelize.INTEGER,
  });
  return Positions;
};

export default Positions;