import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { QuoteContext } from '../../context/QuoteContext';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { Audio } from 'react-loader-spinner';
// import * as yup from 'yup';

export const Quote = () => {
  const { step } = useContext(QuoteContext);
  const { setStep } = useContext(QuoteContext);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [showEstimate, setShowEstimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      city: '',
      email: '',
      first_name: '',
      last_name: '',
      industry: '',
      size: '',
      goals: [],
      documentation: ''
    },
    onSubmit: function (values) {
      alert(`You are registered! Name: ${values.name}. Email: ${values.email}. Profession: ${values.profession}. 
        Age: ${values.age}`);
    }
    // validationSchema: yup.object.shape({
    //   city: yup.string().label('City').required(),
    //   email: yup.string().email().required(),
    //   first_name: yup.string().label('First Name').required(),
    //   industry: yup.string.label('Industry').required(),
    //   size: yup.string.label('Size').required(),
    //   goals: yup.object.label('Goals').required()
    // })
  });

  function getQuotePrice() {
    const basePrice = 1500;
    let priceTotal = basePrice;

    switch (formik.values.size) {
      case '10-24':
        priceTotal += 500;
        break;
      case '25-50':
        priceTotal += 750;
        break;
      case '51':
        priceTotal += 1500;
        break;
      default:
    }

    for (const goal of formik.values.goals) {
      priceTotal += goal.price;
    }

    if (!formik.values.documentation) {
      priceTotal += 1000;
    }

    return `${priceTotal} CAD`;
  }

  function getGoalsString(value, breaks = false) {
    let goalsString = '';
    for (const goal of value) {
      goalsString += breaks ? `<span>${goal.label}</br></span>` : goal.label;
    }
    return goalsString;
  }

  function submitQuote() {
    setStep('finished');
    setLoading(true);
    let formData = new FormData();
    for (const [key, value] of Object.entries(formik.values)) {
      if (key === 'goals') {
        formData.append(key, getGoalsString(value));
      } else if (key === 'documentation') {
        formData.append(key, value ? 'Yes' : 'No');
      } else {
        formData.append(key, value);
      }
    }

    formData.append('price', getQuotePrice());

    fetch('https://getform.io/f/9e640968-32ef-4b36-8aa7-71019259266e', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          setShowEstimate(true);
        }, 4000);
      })
      .catch((error) => console.log(error));
  }

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
        {loading && (
          <>
            <h1 className="mb-8 font-bold">Just a second...</h1>
          </>
        )}
        {showEstimate && (
          <>
            <h1 className="mb-8 font-bold">
              Here is your Quote <span className="font-normal">{formik.values.first_name}!</span>{' '}
            </h1>
            <p>
              We will email you a copy of the quote. Please contact us if you have any other
              qestions
            </p>
          </>
        )}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-3xl bg-white rounded-xl shadow shadow-inner m-auto  my-8 mb-24 p-8">
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
            <button className="primary" onClick={submitQuote} disabled={nextDisabled}>
              Get My Quote
            </button>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center flex-col">
            <h3 className="font-bold mb-10 uppercase text-lg">Generating your quote</h3>
            <Audio height="100" width="100" color="#fdb913" ariaLabel="loading" />
          </div>
        )}

        {showEstimate && (
          <div className="quoteEstimate">
            {Object.entries(formik.values).map((item) => {
              const [key, value] = item;
              return key === 'goals' ? (
                <div
                  key={key}
                  className="quoteLine flex flex-col md:flex-row justify-between items-center my-6 border-b pb-4">
                  <span className="font-bold capitalize label">{key.replace('_', ' ')}</span>
                  <span className="value">
                    <div
                      className="goals"
                      dangerouslySetInnerHTML={{
                        __html: getGoalsString(value, true)
                      }}
                    />
                  </span>
                </div>
              ) : (
                <div
                  key={key}
                  className="quoteLine flex flex-col md:flex-row justify-between items-center my-6 border-b pb-4">
                  <span className="font-bold capitalize label">{key.replace('_', ' ')}</span>
                  <span className="value">
                    {key === 'documentation' ? (value ? 'Yes' : 'No') : value}
                  </span>
                </div>
              );
            })}
            <div className="quoteLine flex justify-between flex-col md:flex-row items-center my-6 mt-12">
              <span className="text-xl font-bold label">Total</span>
              <span stlye={{ color: '#fdb913' }} className="value font-bold">
                {getQuotePrice()}
              </span>
            </div>
            <div>
              <p className="text-xs text-left mt-8">
                Total subject to change depending on location or change in scope.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
