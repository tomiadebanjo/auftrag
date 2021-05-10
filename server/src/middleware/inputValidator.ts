import { body, checkSchema } from 'express-validator';

export default class InputValidator {
  static stringValidation(fieldName: string): any {
    return {
      exists: {
        errorMessage: `${fieldName} is required`,
        options: { checkNull: true },
        bail: true,
      },
      trim: true,
      notEmpty: {
        bail: true,
        errorMessage: `${fieldName} cannot be empty`,
      },
    };
  }

  static emailValidation(fieldName: string): any {
    return {
      exists: {
        errorMessage: `${fieldName} is required`,
        options: { checkNull: true },
        bail: true,
      },
      trim: true,
      isEmail: {
        bail: true,
        errorMessage: 'Provide a valid email address',
      },
    };
  }

  static unixTimeStampValidation(fieldName: string): any {
    return {
      exists: {
        errorMessage: `${fieldName} is required`,
        options: { checkNull: true },
        bail: true,
      },
      custom: {
        options: (value: any) => {
          const isValid = new Date(Number(value)).getTime() > 0;
          if (isValid) {
            return true;
          }
          throw new Error('Invalid unix timestamp');
        },
      },
      trim: true,
    };
  }

  static createOrder(): any {
    return checkSchema({
      bookingDate: InputValidator.unixTimeStampValidation('bookingDate'),
      title: InputValidator.stringValidation('title'),
      'address.city': InputValidator.stringValidation('address.city'),
      'address.country': InputValidator.stringValidation('address.country'),
      'address.street': InputValidator.stringValidation('address.street'),
      'address.zip': InputValidator.stringValidation('address.zip'),
      'customer.name': InputValidator.stringValidation('customer.name'),
      'customer.phone': InputValidator.stringValidation('customer.phone'),
      'customer.email': InputValidator.emailValidation('customer.email'),
    });
  }
  static updateOrder(): any {
    return checkSchema({
      id: {
        in: ['params'],
        trim: true,
        notEmpty: {
          errorMessage: 'Provide a valid id',
        },
      },
      bookingDate: InputValidator.unixTimeStampValidation('bookingDate'),
      title: InputValidator.stringValidation('title'),
    });
  }
  static getOrder(): any {
    return checkSchema({
      id: {
        in: ['params'],
        trim: true,
        notEmpty: {
          bail: true,
          errorMessage: 'Provide a valid id',
        },
      },
    });
  }
}
