const emailValidator = val => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      val
    );
  };
  
  const minLengthValidator = (val, minLength) => {
      return val.length >= minLength;
  };
  
  const maxLengthValidator = (val, maxLength) => {
    return val.length <= maxLength;
  };

  const equalToValidator = (val, checkValue) => {
      return val === checkValue;
  };
  
  const notEmptyValidator = (val) => {
    return !!val.trim();
  };

const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for (let rule in rules) {
      switch (rule) {
        case "isEmail":
          isValid = isValid && emailValidator(val);
          break;
        case "minLength":
          isValid = isValid && minLengthValidator(val, rules[rule]);
          break;
        case "maxLength":
          isValid = isValid && maxLengthValidator(val, rules[rule]);
          break;
        case "equalTo":
          isValid = isValid && equalToValidator(val, connectedValue[rule]);
          break;
        case "notEmpty":
          isValid = isValid && notEmptyValidator(val, rules[rule]);
          break;
        default:
          isValid = true;
      }
    }
    
    return isValid;
  };
  
  export default validate;