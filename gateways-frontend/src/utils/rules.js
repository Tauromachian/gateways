import { isNumber, isPhone, isEmail, isSentence } from "./regex";

export { ip } from "./rules-ip";

/**
 * This function is meant to be used as a helper in case there are optional fields.
 * @param {array} rules
 * @returns true if  no value is provided
 * @returns true if the value passes all the rules
 * @returns false if the value is provided and it does not pass all the rules
 */
export function optionalFieldHelper(rules) {
  return (v) => {
    if (!v) return true;

    for (const rule of rules) {
      const result = rule(v);

      if (result !== true) return result;
    }

    return true;
  };
}

export function required(message = "This value is required.") {
  return (v) => !!v || message;
}

export function number(message = "This field should be a number.") {
  return (v) => isNumber(v) || message;
}

export function phone(message = "The phone number is not valid.") {
  return (v) => isPhone(v) || message;
}

export function email(message = "The email is not valid") {
  return (v) => isEmail(v) || message;
}

export function sentence(message = "The format is not valid.") {
  return (v) => isSentence(v) || message;
}

export function confirm(toConfirm, message = "The value is not equal") {
  return (v) => v === toConfirm || message;
}

export function min(min = 6, message) {
  const finalMessage = message
    ? message
    : `A minimun amount of ${min} letters is required`;

  return (v) => v.length >= min || finalMessage;
}

export function password() {
  return (v) => {
    if (!v) return "Password required";

    if (v.length < 8) return "The password should have 8 or more characters";

    return true;
  };
}
