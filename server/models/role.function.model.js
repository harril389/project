const RoleFunctions = (sequelize, Sequelize) => {
  const RoleFunctions = sequelize.define("role_functions", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  });
  return RoleFunctions;
};
export default RoleFunctions;
