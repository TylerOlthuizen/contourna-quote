import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

export const StepTwo = ({ errors, handleChange, handleBlur, values, setFieldValue }) => {
  const industryList = [
    'Accommodation Services',
    'Food services and drinking places',
    'Beverage and tobacco product manufacturing',
    'Food Manufacturing',
    'Motor vehicle and parts dealers',
    'Furniture and home furnishings stores',
    'Electronics and appliance stores',
    'Building material and garden equipment and supplies dealers',
    'Food and beverage stores',
    'Health and personal care stores',
    'Gasoline stations',
    'Clothing and clothing accessories stores',
    'Sporting goods, hobby, book and music stores',
    'General merchandise stores',
    'Miscellaneous store retailers',
    'Non-store retailers',
    'Industry References/Resources'
  ];

  const goalOptions = [
    {
      label: 'Employee Onboarding',
      value: 'Employee Onboarding',
      price: 0
    },
    {
      label: 'Ongoing learning and training',
      value: 'Ongoing learning and training',
      price: 250
    },
    {
      label: 'Organization expectations and company policies',
      value: 'Organization expectations and company policies',
      price: 0
    },
    {
      label: 'Meeting guidelines from government or other bodies of influence.',
      value: 'Meeting guidelines from government or other bodies of influence.',
      price: 500
    },
    {
      label: 'Improving Existing Product or Service',
      value: 'Improving Existing Product or Service',
      price: 500
    },
    {
      label: 'Checking Compliance with Internal Requirements',
      value: 'Checking Compliance with Internal Requirements',
      price: 250
    },
    {
      label: 'Selling my business or meeting certificate requirements.',
      value: 'Selling my business or meeting certificate requirements.',
      price: 500
    }
  ];

  const [selectedGoals, setSelectedGoals] = useState([]);

  const changeGoals = (values) => {
    setSelectedGoals(values);
    setFieldValue('goals', values);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">My business industry is</p>
        <select
          name="industry"
          id="industry"
          className={`flex-1 py-1 px-2 min-w-0`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.industry}>
          <option>Select industry</option>
          {industryList.map((option) => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">and the number of employees, including myself are</p>
        <select
          name="size"
          id="size"
          className={`flex-1 py-1 px-2`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.size}>
          <option>Select size</option>
          <option value="1-9">1-9</option>
          <option value="10-24">10-24</option>
          <option value="25-50">25-50</option>
          <option value="51+">51+</option>
        </select>
      </div>
      <div className="flex items-center mb-2">
        <p className="mx-2  min-w-fit">I am looking to improve my</p>
        <MultiSelect
          options={goalOptions}
          value={selectedGoals}
          onChange={changeGoals}
          labelledBy="Select Goals"
          className="multiSelect min-w-0"
          overrideStrings={{
            selectSomeItems: 'Select Goals'
          }}
          closeOnChangedValue={false}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="mx-2">and I currently have documentation available </p>

        <input
          type="checkbox"
          name="documentation"
          id="documentation"
          className={`flex-0 ml-2 rounded border py-1 px-2`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.documentation}
        />
      </div>

      <div className="errors flex flex-col flex-1 text-left my-4 mt-8">
        {errors.industry && <span className="text-red-400">{errors.industry}</span>}
        {errors.size && <span className="text-red-400">{errors.size}</span>}
        {errors.goals && <span className="text-red-400">{errors.goals}</span>}
      </div>
    </div>
  );
};
