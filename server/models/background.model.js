const Backgrounds = (sequelize, Sequelize) => {
  const Backgrounds = sequelize.define("backgrounds", {
    program_name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    program_link: Sequelize.STRING,
    image_link: Sequelize.STRING,
    started_at: Sequelize.STRING,
    ended_at: Sequelize.DATEONLY,
    place: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Backgrounds;
};

export default Backgrounds;