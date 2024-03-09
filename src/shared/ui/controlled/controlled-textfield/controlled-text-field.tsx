import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from '@/shared/ui/input/Input'

export type ControlledTextAreaProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<InputProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  disabled,
  name,
  ...props
}: ControlledTextAreaProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <Input
      {...(props as InputProps)}
      {...field}
      disabled={disabled}
      error={error?.message}
      id={props.label ?? name}
    />
  )
}
