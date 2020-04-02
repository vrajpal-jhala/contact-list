const validationObj = (value, message) => {
  return { value, message };
}

const requiredValidation = () => {
  return validationObj(true, "This field is required");
}

const patternValidation = (fieldName, pattern) => {
  return validationObj(pattern, `Enter valid ${fieldName}`);
}

const minLengthValidation = (limit) => {
  return validationObj(limit, `Enter at least ${limit} characters`);
}

const maxLengthValidation = (limit) => {
  return validationObj(limit, `Enter no more than ${limit} characters`);
}

const prepareValidations = (fields) => fields.map(({ validations, ...field }) => {
  const { name } = field;

  Object.entries(validations).forEach(([key, value]) => {
    switch (key) {
      case 'required':
        validations["required"] = requiredValidation();
        break;
      case 'pattern':
        validations["pattern"] = patternValidation(name, value);
        break;
      case 'minLength':
        validations["minLength"] = minLengthValidation(value);
        break;
      case 'maxLength':
        validations["maxLength"] = maxLengthValidation(value);
        break;
      default:
    }
  });

  return { ...field, validations };
});

export default prepareValidations;