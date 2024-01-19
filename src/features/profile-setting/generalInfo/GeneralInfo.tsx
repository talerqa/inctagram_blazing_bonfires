import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { ProfilePhoto } from '../ui/profilePhoto/ProfilePhoto'

import { AutocompletionOfCities } from './autocompletion-of-cities/AutocompletionOfCities'
import styles from './GeneralInfo.module.scss'
import { schema } from './yupSchema/schema'

import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { useChangeRoute } from '@/shared/hooks/generalInfoPage/useChangeRoute'
import { useFormCache } from '@/shared/hooks/generalInfoPage/useFormCache'
import { useServerRequest } from '@/shared/hooks/generalInfoPage/useServerRequest'
import { setGeneralInfo } from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'
import { Modal, LinearLoader, Input, InputType, Button } from '@/shared/ui'
import { Calendar } from '@/widgets/calendar/ui/Calendar'

export const GeneralInfo = () => {
  const router = useRouter()

  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [forwardURL, setForwardURL] = useState('')
  const [isLeftPage, setIsLeftPage] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)

  const dispatch = useDispatch()

  const {
    profileData,
    updateProfile,
    updateAvatar,
    deleteAvatar,
    currentIsLoading,
    isLoadingProfileData,
    currentErrorHandler,
  } = useServerRequest({
    translate: {
      notAuthorization: tError('NotAuthorization'),
      serverNotAvailable: tError('ServerNotAvailable'),
      networkError: tError('NetworkError'),
    },
  })

  const schemaGeneralInfo = schema({
    translate: {
      minCharacters6: tError('MinCharacters6'),
      maxCharacters30: tError('MaxCharacters30'),
      minCharacters1: tError('MinCharacters1'),
      minCharacters2: tError('MinCharacters2'),
      maxCharacters50: tError('MaxCharacters50'),
      maxCharacters200: tError('MaxCharacters200'),
      requiredField: tError('RequiredField'),
      userNameValidationError: tError('UserNameValidationError'),
      startLatterNotSpecial: tError('StartLatterNotSpecial'),
      minAge: tError('MinAge'),
    },
  })

  const {
    control,
    reset,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isDirty },
  } = useForm<ProfileUserType | any>({
    mode: 'onChange',
    resolver: yupResolver(schemaGeneralInfo),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      city: '',
      dateOfBirth: '',
      aboutMe: '',
    },
  })
  const { formCache, cacheForm } = useFormCache({
    getValues,
    setIsFormChanged,
    photo,
    profileData,
  })

  useEffect(() => {
    if (formCache) {
      reset(formCache)
    } else if (profileData) {
      reset(profileData)
    }
  }, [isLoadingProfileData, profileData])

  useEffect(() => {
    const checkValidation = async () => {
      await trigger()
    }

    if (profileData || formCache) {
      checkValidation()
    }
  }, [trigger])

  useChangeRoute({
    router,
    isDirty,
    isLeftPage,
    isFormChanged,
    formCache,
    setIsModal,
    setForwardURL,
  })

  const settingsSaved = () => {
    setIsModal(true)
    setIsSaved(true)
    setIsFormChanged(false)
  }

  const handleUpdateAvatar = () => {
    if (isDeleteAvatar) {
      deleteAvatar()
        .unwrap()
        .then(() => {
          settingsSaved()
        })
        .catch(error => currentErrorHandler(error))
    } else if (photo) {
      const formData = new FormData()

      formData.set('file', photo as Blob)
      updateAvatar(formData)
        .unwrap()
        .then(() => {
          settingsSaved()
        })
        .catch(error => currentErrorHandler(error))
    } else {
      settingsSaved()
    }
  }

  const handleLeftPageWithoutSave = () => {
    dispatch(setGeneralInfo(''))
    setIsLeftPage(true)
    setIsModal(false)
    router.push(forwardURL)
  }
  const handleCloseModal = () => {
    setIsModal(false)
    setIsSaved(false)
  }
  const handleDeleteAvatar = (data: boolean) => {
    setIsDeleteAvatar(data)
    setIsFormChanged(true)
  }
  const handleChangedAvatar = (data: Blob) => {
    setPhoto(data as Blob)
    setIsFormChanged(true)
  }

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        handleUpdateAvatar()
      })
      .then(() => {
        dispatch(setGeneralInfo(''))
      })
      .catch(error => currentErrorHandler(error))
  }

  return (
    <>
      {currentIsLoading && <LinearLoader />}
      <Toaster position="top-right" />

      {!!profileData && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <div className={styles.photoContent}>
              <Controller
                name="avatars"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <ProfilePhoto
                    outsideOnChange={data => handleChangedAvatar(data)}
                    deleteAvatar={data => handleDeleteAvatar(data)}
                    value={formCache ? formCache.avatars : profileData.avatars}
                    {...args}
                  />
                )}
              />
            </div>
            <div className={styles.textFieldsContent}>
              <Controller
                name="userName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('UserName')}
                    type={InputType.TEXT}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).userName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('FirstName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).firstName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('LastName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { ref, value, onChange, ...args } }) => (
                  <>
                    <label>{t('City')}</label>
                    <AutocompletionOfCities
                      error={(errors as FieldErrors<ProfileUserType>).city?.message}
                      callbackValue={onChange}
                      city={profileData.city || ''}
                      {...args}
                    />
                  </>
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value, ref, ...args } }) => (
                  <div>
                    <label>{t('DateBirthday')}</label>
                    <Calendar
                      data={formCache ? formCache.dateOfBirth : profileData.dateOfBirth}
                      outsideOnChange={onChange}
                      classNameWrap={styles.calendar}
                      {...args}
                    />
                    {(errors as FieldErrors<ProfileUserType>).dateOfBirth && (
                      <p className={styles.errorCalendar}>
                        {(errors as FieldErrors<ProfileUserType>).dateOfBirth?.message}{' '}
                        <Link
                          href={{
                            pathname: `${RoutersPath.authPrivacyPolicy}`,
                            query: { previousPage: `${RoutersPath.profileGeneralInformation}` },
                          }}
                          className={styles.agreementLink}
                          onClick={() => cacheForm()}
                        >
                          {tRoot('PrivacyPolicy')}
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              />

              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                <Controller
                  name="aboutMe"
                  control={control}
                  render={({ field: { ref, value, ...args } }) => (
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder=""
                      className={styles.aboutMeTextarea}
                      value={value ?? ''}
                      {...args}
                    />
                  )}
                />
                {errors && (
                  <p className={styles.errorTextarea}>
                    {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <Button className={styles.button}>{tRoot('SaveChanges')}</Button>
        </form>
      )}

      {isModal && (
        <Modal
          title={tRoot('Notification')}
          callBackCloseWindow={handleCloseModal}
          extraButtonCB={handleLeftPageWithoutSave}
          mainButtonCB={handleCloseModal}
          extraButton={isSaved ? undefined : tRoot('Yes')}
          mainButton={isSaved ? tRoot('Ok') : tRoot('No')}
        >
          {isSaved ? tRoot('SaveChanges') : tRoot('LeftWithoutSave')}
        </Modal>
      )}
    </>
  )
}
