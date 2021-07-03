const Activitys = (sequelize, Sequelize) => {
    const Activitys = sequelize.define("activitys", {
      uid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      activity_school_year: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      activity_semester: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      activity_reason: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    });
    return Activitys;
  };
  
  export default Activitys;