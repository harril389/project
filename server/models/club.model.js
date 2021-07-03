const Clubs = (sequelize, Sequelize) => {
  const Clubs = sequelize.define("clubs", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    code_club: Sequelize.STRING,
    name_club: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    founded_day: Sequelize.DATEONLY,
    address: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    management_unit: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    manager: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    traditional_day: Sequelize.DATEONLY,
    place_under: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    sympathizer: Sequelize.INTEGER,
    volunteer: Sequelize.INTEGER,
    member: Sequelize.INTEGER,
    instructor: Sequelize.INTEGER,
    coach: Sequelize.INTEGER,
    staff_strengthened: Sequelize.INTEGER,
    place_blood_donate: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    result_activity: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Clubs;
};

export default Clubs;
