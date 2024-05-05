import {
  isEmail,
  isPattern,
  isMaxLength,
  isMinLength,
} from "@formiz/validations";

interface IValidator {
  handler: (value: any) => boolean;
  message: string;
}

export default class Validators {
  static readonly email: IValidator = {
    handler: isEmail(),
    message: "Is Not Valid",
  };
  static readonly alphabetic: IValidator = {
    handler: isPattern(/^[a-zA-Z\s]+$/),
    message: "Must Only Contains letters and spaces",
  };
  static readonly maxLength = (maxLength: number): IValidator => {
    return {
      handler: isMaxLength(maxLength),
      message: `Must Have A Maximum Length Of ${maxLength}`,
    };
  };
  static readonly minLength = (minLength: number): IValidator => {
    return {
      handler: isMinLength(minLength),
      message: `Must Have A Minimum Length Of ${minLength}`,
    };
  };
}
