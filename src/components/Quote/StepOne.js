import React from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

export const StepOne = ({ errors, handleChange, handleBlur, setFieldValue, values }) => {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      setFieldValue('city', place.formatted_address);
    }
  });

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">My business is located in</p>
        <input
          autoComplete="off"
          type="text"
          ref={ref}
          name="city"
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="City"
          className={`flex-1 rounded border py-1 px-2 mx-2`}
        />
      </div>
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">My business email is </p>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          className={`flex-1 rounded border py-1 px-2 mx-2`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
      </div>
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">and the person of contact is </p>
        <input
          placeholder="First Name"
          type="text"
          name="first_name"
          id="first_name"
          className={`flex-1 rounded border py-1 px-2 mx-2 min-w-max max-w-xs`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.first_name}
        />
        <input
          placeholder="Last Name"
          type="text"
          name="last_name"
          id="last_name"
          className={`flex-1 rounded border py-1 px-2 mx-2 min-w-max max-w-xs`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.last_name}
        />
      </div>
      <div className="errors flex flex-col flex-1 text-left my-4 mt-8">
        {errors.city && <span className="text-red-400">{errors.city}</span>}
        {errors.email && <span className="text-red-400">{errors.email}</span>}
        {errors.first_name && <span className="text-red-400">{errors.first_name}</span>}
      </div>
    </div>
  );
};
