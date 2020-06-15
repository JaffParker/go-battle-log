import React, { FC, useCallback } from 'react'
import { FormContext } from './FormContext'
import useForm, { UseFormParams } from './useForm'

interface FormProps extends UseFormParams {
  onSubmit: (values: any) => void
}

export const Form: FC<FormProps> = ({ children, onSubmit, ...formParams }) => {
  const form = useForm(formParams)

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit(form.values)
    },
    [form.values, onSubmit],
  )

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  )
}
