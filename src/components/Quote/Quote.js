import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { QuoteContext } from '../../context/QuoteContext';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';

export const Quote = () => {
  const { step } = useContext(QuoteContext);
  const { setStep } = useContext(QuoteContext);
  const [nextDisabled, setNextDisabled] = useState(true);
  const formik = useFormik({
    initialValues: {
      city: '',
      email: '',
      firstName: '',
      lastName: '',
      industry: '',
      size: '',
      goals: [],
      documentation: ''
    },
    onSubmit: function (values) {
      alert(`You are registered! Name: ${values.name}. Email: ${values.email}. Profession: ${values.profession}. 
        Age: ${values.age}`);
    }
  });
  console.log(formik.values);
  return (
    <div className="mt-20">
      <div className="max-w-3xl m-auto mb-8 p-4 ">
        {step === 1 && (
          <>
            <h1 className="mb-5 font-bold">Lets go over the basics</h1>
            <p>These questions gives us an idea of what we are working with</p>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="mb-5 font-bold">All about your business </h1>
            <p>Tell us about your business and what you want to achieve. </p>
          </>
        )}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-3xl bg-white rounded-xl shadow-md shadow-inner m-auto  my-8 mb-24 p-8">
        {step === 1 && (
          <StepOne
            touched={formik.touched}
            errors={formik.errors}
            handleChange={formik.handleChange}
            handleBlur={formik.onBlur}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            setNextDisabled={setNextDisabled}
          />
        )}
        {step === 2 && (
          <StepTwo
            touched={formik.touched}
            errors={formik.errors}
            handleChange={formik.handleChange}
            handleBlur={formik.onBlur}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            setNextDisabled={setNextDisabled}
          />
        )}
        {step < 2 && (
          <div className="flex justify-end mt-8">
            <button className="primary" onClick={() => setStep(2)} disabled={nextDisabled}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="flex justify-between mt-8">
            <button className="primary" onClick={() => setStep(1)}>
              Previous
            </button>
            <button
              className="primary"
              onClick={() => console.log('quote finished')}
              disabled={nextDisabled}>
              Get My Quote
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
