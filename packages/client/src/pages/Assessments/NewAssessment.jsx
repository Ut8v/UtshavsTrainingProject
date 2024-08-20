import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
export const NewAssessment = () => {

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
    const RiskLevel = calculateRiskLevel(score);
    const currentTimeDate = new Date();
    const GetCurrentTime = currentTimeDate.getTimezoneOffset();

    // eslint-disable-next-line sort-keys
    const finalData = { ...data, score, RiskLevel, GetCurrentTime };

    console.log(finalData);
    await AssessmentService.submit(data);
  };

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
      <h2>Cat Behavioral Instrument</h2>
      <div>
        <label htmlFor="Cat Name">Cat Name</label>
        <input type="text" placeholder="Cat Name" name="Cat Name"{...register(`CatName`)} />
        <label htmlFor="Cat Date of Birth">Cat Date of Birth</label>
        <input type="text"
          placeholder="Cat Date of Birth"
          name="Cat Date of Birth" {...register(`CatDateOfBirth`)} />
      </div>
      <h1>Previous Contact with the Cat Judical System</h1>
      <div>
        <input {...register(`PreviousContact`)}
          type="radio" id="prevContact" value="1" />
        <label htmlFor="Yes">Yes</label>
        <input {...register(`PreviousContact`)}
          type="radio" id="prevContact" value="0" />
        <label htmlFor="prevContact">No</label>
      </div>

      <h1>Physical Altercations with other cats</h1>
      <div>
        <input {...register(`PhysicalAltercationsWithCats`)} type="radio" id="altercations-cat" value={1} />
        <label htmlFor="altercations-cat">Yes</label>
        <input {...register(`PhysicalAltercationsWithCats`)} type="radio" id="altercations-cat" value={0} />
        <label htmlFor="altercations-cat">No</label>
      </div>

      <h1>Physical Altercations with owner (scratching,biting,etc...)</h1>
      <div>
        <input {...register(`PhysicalAltercationsWithOwner`)} type="radio" id="altercations-owner" value={0} />
        <label htmlFor="altercations-owner">0-3 (score = 0)</label>
        <input {...register(`PhysicalAltercationsWithOwner`)} type="radio" id="altercations-owner" value={1} />
        <label htmlFor="altercations-owner">3+ (score = 1)</label>
      </div>

      <h1>Plays well with dogs</h1>
      <div>
        <input {...register(`PlaysWellWithDogs`)} type="radio" id="plays-well" value={0} />
        <label htmlFor="plays-well">Yes</label>
        <input {...register(`PlaysWellWithDogs`)} type="radio" id="plays-well" value={1} />
        <label htmlFor="plays-well">No</label>
      </div>

      <h1>Hisses at strangers</h1>
      <div>
        <input {...register(`HissesAtStrangers`)} type="radio" id="hisses" value={0} />
        <label htmlFor="hisses">Yes</label>
        <input {...register(`HissesAtStrangers`)} type="radio" id="hisses" value={1} />
        <label htmlFor="hisses">No</label>
      </div>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );

};
