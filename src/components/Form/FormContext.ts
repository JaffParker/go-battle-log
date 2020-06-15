import { createContext, useContext } from 'react'
import { FieldConfig } from './useField'

export interface FormContextValue {
  values: any
  errors: any
  touched: any

  getValue: (name: string) => any
  getError: (name: string) => string | undefined
  getTouched: (name: string) => boolean

  registerField: (config: FieldConfig) => void
  touch: (name: string) => void
  setValue: (name: string, value: any) => void
  setError: (name: string, error: string | undefined) => void

  deregisterField: (name: string) => void
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined,
)

export function useFormContext(): FormContextValue {
  const form = useContext(FormContext)

  if (!form) throw new Error('FormContext has not been previously defined')

  return form
}
