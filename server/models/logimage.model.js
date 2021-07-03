const LogImages = (sequelize, Sequelize) => {
  const LogImages = sequelize.define("logImages", {
    image_link: Sequelize.STRING,
  });
  return LogImages;
};

export default LogImages;