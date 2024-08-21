/* eslint-disable sort-keys */
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  try {
    Assessment.create({
      catName: assessment.catName,
      catDateOfBirth: assessment.catDateOfBirth,
      score: assessment.score,
      riskLevel: assessment.riskLevel,
      currentTimeDate: new Date(),
      instrumentType: 1,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  // const assessments = [ ];
  const assessments = await Assessment.findAll();
  // console.log(assessments);
  return assessments;
};
