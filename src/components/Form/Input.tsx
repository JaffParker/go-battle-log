import React, { FC } from 'react'
import useField, { FieldConfig } from './useField'
import { TextField } from '@material-ui/core'

export const Input: FC<FieldConfig> = (fieldConfig) => {
  const { props } = useField(fieldConfig)

  return <TextField {...props} />
}
