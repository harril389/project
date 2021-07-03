const Learns = (sequelize, Sequelize) => {
    const Learns = sequelize.define("learns", {
      uid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      learn_school_year: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      learn_semester: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      learn_reason: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    });
    return Learns;
  };
  
  export default Learns;