const Remuneratives = (sequelize, Sequelize) => {
  const Remuneratives = sequelize.define("remuneratives", {
    year: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    member: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    rewarded_content: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    issued_by: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    decision_number: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Remuneratives;
};

export default Remuneratives;