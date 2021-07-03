const QuestionExams = (sequelize, Sequelize) => {
  const QuestionExams = sequelize.define("question_exams", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  });
  return QuestionExams;
};
export default QuestionExams;
