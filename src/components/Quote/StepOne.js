import React, { useEffect } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';

export const StepOne = ({
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  setNextDisabled
}) => {
  useEffect(() => {
    if (values.city && values.email && values.firstName && values.lastName) {
      setNextDisabled(false);
    }
  }, [values]);

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyDrsJWP5s5qn3mUPIaCCNbh60xLoluYxRI',
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
          className={`flex-1 rounded border py-1 px-2 mx-2 ${
            touched.email && errors.email ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {touched.name && errors.city && <span className="text-red-400">{errors.city}</span>}
      </div>
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">My business email is </p>
        <input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          className={`flex-1 rounded border py-1 px-2 mx-2 ${
            touched.email && errors.email ? 'border-red-400' : 'border-gray-300'
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && <span className="text-red-400">{errors.email}</span>}
      </div>
      <div className="flex flex-wrap items-center mb-2">
        <p className="mx-2">and the person of contact is </p>
        <input
          placeholder="First Name"
          type="text"
          name="firstName"
          id="firstName"
          className={`flex-1 rounded border py-1 px-2 mx-2 min-w-max max-w-xs ${
            touched.firstName && errors.firstName ? 'border-red-400' : 'border-gray-300'
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName && (
          <span className="text-red-400">{errors.firstName}</span>
        )}
        <input
          placeholder="Last Name"
          type="text"
          name="lastName"
          id="lastName"
          className={`flex-1 rounded border py-1 px-2 mx-2 min-w-max max-w-xs ${
            touched.lastName && errors.lastName ? 'border-red-400' : 'border-gray-300'
          }`}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
        />
        {touched.lastName && errors.lastName && (
          <span className="text-red-400">{errors.lastName}</span>
        )}
      </div>
    </div>
  );
};
