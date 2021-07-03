const Members = (sequelize, Sequelize) => {
  const Members = sequelize.define("members", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    image: Sequelize.STRING,
    code_membership: Sequelize.STRING,
    full_name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    birthday: Sequelize.DATEONLY,
    sex: Sequelize.BOOLEAN,
    id_card: Sequelize.STRING,
    date_of_issue: Sequelize.DATEONLY,
    issued_by: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    phonee: Sequelize.STRING,
    email: Sequelize.STRING,
    facebook: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    native_land: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    address: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    blood_group: Sequelize.STRING,
    rh: Sequelize.BOOLEAN,
    number_blood_donate: Sequelize.INTEGER,
    date_attend: Sequelize.DATEONLY,
    time_activity: Sequelize.INTEGER,
    status_activity: Sequelize.BOOLEAN,
    information_family: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    unit: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    specific_unit: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    academic_level: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    party_union_member: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    comment: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Members;
};

export default Members;