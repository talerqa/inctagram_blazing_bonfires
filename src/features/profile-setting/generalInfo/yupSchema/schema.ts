import * as yup from 'yup'

type Props = {
  translate: {
    minCharacters6: string
    maxCharacters30: string
    minCharacters1: string
    minCharacters2: string
    maxCharacters50: string
    maxCharacters200: string
    requiredField: string
    userNameValidationError: string
    startLatterNotSpecial: string
    minAge: string
  }
}

export const schema = ({
  translate: {
    minCharacters6,
    maxCharacters30,
    minCharacters1,
    minCharacters2,
    maxCharacters50,
    maxCharacters200,
    requiredField,
    userNameValidationError,
    startLatterNotSpecial,
    minAge,
  },
}: Props) => {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .min(6, minCharacters6)
      .max(30, maxCharacters30)
      .matches(/[0-9A-Za-z_-]{6,30}$/, userNameValidationError)
      .nullable()
      .required(requiredField),
    firstName: yup
      .string()
      .min(1, minCharacters1)
      .max(50, maxCharacters50)
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, startLatterNotSpecial)
      .nullable()
      .required(requiredField),
    lastName: yup
      .string()
      .min(1, minCharacters1)
      .max(50, maxCharacters50)
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, startLatterNotSpecial)
      .nullable()
      .required(requiredField),
    city: yup
      .string()
      .min(2, minCharacters2)
      .max(30, maxCharacters30)
      .nullable()
      .matches(/^[A-ZА-Яa-zа-я-]+$/, startLatterNotSpecial),
    dateOfBirth: yup
      .date()
      .nullable()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), minAge),
    aboutMe: yup.string().nullable().max(200, maxCharacters200),
  })

  return schema
}
