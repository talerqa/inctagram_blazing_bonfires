import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const registrationSchema = (t: TFunction) =>
  yup.object().shape({
    userName: yup
      .string()
      .trim()
      .required(t('Error.RequiredField'))
      .min(6, t('Error.MinCharacters6'))
      .max(30, t('Error.MaxCharacters30'))
      .matches(/^[a-zA-Z0-9_-]*$/, t('Error.UserNameValidationError')),
    email: yup
      .string()
      .trim()
      .required(t('Error.RequiredField'))
      .email(t('Error.EmailValidationError'))
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, t('Error.EmailValidationError')),
    password: yup
      .string()
      .trim()
      .required(t('Error.RequiredField'))
      .min(6, t('Error.MinCharacters6'))
      .max(20, t('Error.MaxCharacters20'))
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
        t('Error.PasswordValidationError')
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], t('Error.PasswordsMustMatch'))
      .trim()
      .required(t('Error.RequiredField')),
    agreement: yup.bool().oneOf([true], t('Error.RequiredField')),
  })
