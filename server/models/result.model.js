const Results = (sequelize, Sequelize) => {
    const Results = sequelize.define("results", {
      uid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      content: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      is_result: Sequelize.BOOLEAN,
    });
    return Results;
  };
  export default Results;