import { useState } from 'react';
import { validateRequiredField } from '../utils/validation';

const useForm = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    if (validationRules[name]) {
      return validationRules[name](value) ? '' : `${name} is invalid`;
    }
    return validateRequiredField(value) ? '' : `${name} is required`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = async (callback) => {
    setIsSubmitting(true);
    try {
      await callback(values);
      setValues(initialValues);
      setErrors({});
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, errors, isSubmitting, handleChange, handleBlur, handleSubmit };
};

export default useForm;
