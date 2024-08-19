import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';
export const NewAssessment = () => {

  const { handleSubmit, register } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return (
    <Form>
      <label htmlFor="catName">Cat Name</label>
      <input placeholder="Cat Name" />
      <label htmlFor="CatDob">Cat Date of birth</label>
      <input placeholder="Cat Date of birth" />
      <br />
      <label htmlFor="prevContact">Previous contact with the Cat Judical System</label>
      <br />
      <input type="radio" id="yes" />
      <label htmlFor="yes">Yes</label>
      <input type="radio" id="No" />
      <label htmlFor="No">No</label>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );

};
