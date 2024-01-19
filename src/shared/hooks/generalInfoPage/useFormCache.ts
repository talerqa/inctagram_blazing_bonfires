import { Dispatch, SetStateAction } from 'react'

import { UseFormGetValues } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../providers/storeProvider'
import { setGeneralInfo } from '../../providers/storeProvider/slices/profileSettings/generalInfoReducer'

import { ProfileUserType, AvatarsType } from '@/shared/api'

type Props = {
  getValues: UseFormGetValues<any>
  setIsFormChanged: Dispatch<SetStateAction<boolean>>
  profileData: ProfileUserType | undefined
  photo: Blob | null
}

export const useFormCache = ({ getValues, setIsFormChanged, photo, profileData }: Props) => {
  const dispatch = useDispatch()
  const formStore: string =
    useSelector(state => (state as RootState).profileSetting.generalInfo) ?? ''

  const formCache: ProfileUserType = !!formStore && JSON.parse(formStore)

  const cacheForm = () => {
    setIsFormChanged(true)
    const currentForm: ProfileUserType = getValues()

    currentForm.dateOfBirth = new Date(currentForm.dateOfBirth as number).toISOString()

    let avatars: AvatarsType = []

    if (photo) {
      avatars.push({
        url: URL.createObjectURL(photo as Blob),
        fileSize: photo.size,
      })
    } else if (profileData && profileData?.avatars?.length > 0) {
      avatars = profileData.avatars
    }
    currentForm.avatars = avatars

    dispatch(setGeneralInfo(JSON.stringify(currentForm)))
  }

  return { formCache, cacheForm }
}
