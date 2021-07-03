const UserExams = (sequelize, Sequelize) => {
  const UserExams = sequelize.define("user_exams", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    score: Sequelize.INTEGER,
    total_question_correct: Sequelize.INTEGER,
    total_question_incorrect: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
  });
  return UserExams;
};

export default UserExams;
