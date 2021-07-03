const Associations = (sequelize, Sequelize) => {
  const Associations = sequelize.define("associations", {
    chairman: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    vice_chairman_1: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    vice_chairman_2: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    vice_chairman_3: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    vice_chairman_4: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    prestige_1: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    prestige_2: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    founded_year: Sequelize.STRING,
    traditional_day: Sequelize.STRING,
    sympathizer: Sequelize.INTEGER,
    volunteer: Sequelize.INTEGER,
    member: Sequelize.INTEGER,
    instructor: Sequelize.INTEGER,
    coach: Sequelize.INTEGER,
    staff_strengthened: Sequelize.INTEGER,
    document: Sequelize.STRING,
    document_history: Sequelize.STRING,
    link_test: Sequelize.STRING,
  });
  return Associations;
};

export default Associations;

