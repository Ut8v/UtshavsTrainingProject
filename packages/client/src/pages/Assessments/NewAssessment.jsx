
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
export const NewAssessment = () => {
  const [ displayResponse, setDisplayResponse ] = useState();
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

    // console.log(finalData);
    const response = await AssessmentService.submit(finalData);
    setDisplayResponse(response.message);
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

  const style = {
    color: `black`,
    fontSize: `30px`,
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="instrument">{instrumentType}</h2>

      <div className="input">
        <Form.Label>Cat Name</Form.Label>
        <Form.Control
          className="input-fields"
          required type="text"
          placeholder="Cat Name"
          name="Cat Name"{...register(`catName`)} />

        <Form.Label >Cat Date of Birth</Form.Label>
        <Form.Control
          className="input-fields"
          required type="date"
          placeholder="Cat Date of Birth"
          name="Cat Date of Birth" {...register(`catDateOfBirth`)} />
      </div>

      <Form.Text style={style}>Previous Contact with the Cat Judical System</Form.Text>
      <div>
        <Form.Check
          label="Yes"
          {...register(`PreviousContact`)}
          type="radio"
          id="prevContact"
          value="1"
          required />

        <Form.Check
          label="No"
          {...register(`PreviousContact`)}
          type="radio"
          id="prevContact"
          value="0"
          required />

      </div>

      <Form.Text style={style}>Physical Altercations with other cats</Form.Text>
      <div>
        <Form.Check
          label="Yes"
          {...register(`PhysicalAltercationsWithCats`)}
          type="radio"
          id="altercations-cat"
          value={1}
          required />

        <Form.Check
          label="No"
          {...register(`PhysicalAltercationsWithCats`)}
          type="radio"
          id="altercations-cat"
          value={0}
          required />

      </div>

      <Form.Text style={style}>Physical Altercations with owner (scratching,biting,etc...)</Form.Text>
      <div>
        <Form.Check
          label="0-3"
          {...register(`PhysicalAltercationsWithOwner`)}
          type="radio"
          id="altercations-owner"
          value={0}
          required />
        <Form.Check
          label="3+"
          {...register(`PhysicalAltercationsWithOwner`)}
          type="radio"
          id="altercations-owner"
          value={1}
          required />
      </div>

      <Form.Text style={style}>Plays well with dogs</Form.Text>
      <div>
        <Form.Check
          label="Yes"
          {...register(`PlaysWellWithDogs`)}
          type="radio"
          id="plays-well"
          value={0}
          required />

        <Form.Check
          label="No"
          {...register(`PlaysWellWithDogs`)}
          type="radio"
          id="plays-well"
          value={1}
          required />
      </div>

      <Form.Text style={style}>Hisses at strangers</Form.Text>
      <div>
        <Form.Check
          label="yes"
          {...register(`HissesAtStrangers`)}
          type="radio"
          id="hisses"
          value={1}
          required />

        <Form.Check
          label="No"
          {...register(`HissesAtStrangers`)}
          type="radio"
          id="hisses"
          value={1}
          required />
      </div>
      <Button variant="primary" style={ { marginLeft: `50%` } } type="submit">Submit</Button>
      <span className="response-display">{displayResponse}</span>
    </Form>
  );

};
