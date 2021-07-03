const Activity_Associations = (sequelize, Sequelize) => {
  const Activity_Associations = sequelize.define("activity_associations", {
    year: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    member: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    volunteer: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    number_place_donate_blood: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    number_blood_unit_invited: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    number_blood_unit: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    rank: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Activity_Associations;
};

export default Activity_Associations;