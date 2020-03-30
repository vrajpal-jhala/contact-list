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

  validations = Object.entries(validations).map(([key, value]) => {
    var obj = {};

    switch (key) {
      case 'required':
        obj["required"] = requiredValidation();
        break;
      case 'pattern':
        obj["pattern"] = patternValidation(name, value);
        break;
      case 'minLength':
        obj["minLength"] = minLengthValidation(value);
        break;
      case 'maxLength':
        obj["maxLength"] = maxLengthValidation(value);
        break;
      default:
    }

    return obj;
  });

  return { ...field, validations };
});

export default prepareValidations;