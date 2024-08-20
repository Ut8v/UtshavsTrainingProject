import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
export const NewAssessment = () => {

  const instrumentType = `Cat Behavioral Instrument`;

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  // console.log(register);
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    const dataArray =
      [ data.HissesAtStrangers,
        data.PhysicalAltercationsWithCats,
        data.PhysicalAltercationsWithOwner,
        data.PlaysWellWithDogs,
        data.PreviousContact ];
    const score = calculateScore(dataArray);
    const riskLevel = calculateRiskLevel(score);
    const currentTimeDate = new Date();
    const { catDateOfBirth, catName } = data;

    // eslint-disable-next-line sort-keys
    const finalData = { catName, catDateOfBirth, score, riskLevel, currentTimeDate, instrumentType };

    console.log(finalData);
    await AssessmentService.submit(finalData);
  };
  // takes in data and converts it to number and adds all the number and returns the score
  const calculateScore = (data) => {
    const newData = data.map(i => Number(i)).reduce((a, b) => a + b, 0);
    return newData;
  };

  const calculateRiskLevel = (score) => {
    if (score <= 1) {
      return `Low`;
    } else if (score > 1 && score <= 3) {
      return `Medium`;
    }
    return `High`;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{instrumentType}</h2>
      <div>
        <label htmlFor="Cat Name">Cat Name</label>
        <input required type="text" placeholder="Cat Name" name="Cat Name"{...register(`catName`)} />
        <label htmlFor="Cat Date of Birth">Cat Date of Birth</label>
        <input required type="date"
          placeholder="Cat Date of Birth"
          name="Cat Date of Birth" {...register(`catDateOfBirth`)} />
      </div>
      <h1>Previous Contact with the Cat Judical System</h1>
      <div>
        <input {...register(`PreviousContact`)}
          type="radio" id="prevContact" value="1" required />
        <label htmlFor="Yes">Yes</label>
        <input {...register(`PreviousContact`)}
          type="radio" id="prevContact" value="0" required />
        <label htmlFor="prevContact">No</label>
      </div>

      <h1>Physical Altercations with other cats</h1>
      <div>
        <input {...register(`PhysicalAltercationsWithCats`)} type="radio" id="altercations-cat" value={1} required />
        <label htmlFor="altercations-cat">Yes</label>
        <input {...register(`PhysicalAltercationsWithCats`)} type="radio" id="altercations-cat" value={0} required />
        <label htmlFor="altercations-cat">No</label>
      </div>

      <h1>Physical Altercations with owner (scratching,biting,etc...)</h1>
      <div>
        <input {...register(`PhysicalAltercationsWithOwner`)} type="radio" id="altercations-owner" value={0} required />
        <label htmlFor="altercations-owner">0-3 (score = 0)</label>
        <input {...register(`PhysicalAltercationsWithOwner`)} type="radio" id="altercations-owner" value={1} required />
        <label htmlFor="altercations-owner">3+ (score = 1)</label>
      </div>

      <h1>Plays well with dogs</h1>
      <div>
        <input {...register(`PlaysWellWithDogs`)} type="radio" id="plays-well" value={0} required />
        <label htmlFor="plays-well">Yes</label>
        <input {...register(`PlaysWellWithDogs`)} type="radio" id="plays-well" value={1} required />
        <label htmlFor="plays-well">No</label>
      </div>

      <h1>Hisses at strangers</h1>
      <div>
        <input {...register(`HissesAtStrangers`)} type="radio" id="hisses" value={0} required />
        <label htmlFor="hisses">Yes</label>
        <input {...register(`HissesAtStrangers`)} type="radio" id="hisses" value={1} required />
        <label htmlFor="hisses">No</label>
      </div>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );

};
