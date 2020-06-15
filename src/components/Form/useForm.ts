import { useReducer, useCallback, useEffect } from 'react'
import {
  formReducer,
  registerAction,
  setAction,
  deregisterAction,
} from './formReducer'
import { FormContextValue } from './FormContext'
import { FieldConfig } from './useField'
import { get } from 'lodash'

export interface UseFormParams {
  initialValues?: any
}

export default function useForm({
  initialValues,
}: UseFormParams): FormContextValue {
  const [values, dispatchValues] = useReducer(formReducer, initialValues)
  const [errors, dispatchErrors] = useReducer(formReducer, initialValues)
  const [touched, dispatchTouched] = useReducer(formReducer, initialValues)
  const [validators, dispatchValidators] = useReducer(
    formReducer,
    initialValues,
  )

  const validate = useCallback(
    (name: string, value: any): string => {
      const validator = get(validators, name)
      if (validator) {
        return validator(value, values) ?? ''
      } else {
        return ''
      }
    },
    [validators, values],
  )

  const touch = useCallback((name: string) => {
    dispatchTouched(setAction(name, true))
  }, [])
  const setValue = useCallback(
    (name: string, value: any) => {
      dispatchValues(setAction(name, value))
      if (validate) dispatchErrors(setAction(name, validate(name, value)))
      touch(name)
    },
    [touch, validate],
  )
  const setError = useCallback(
    (name: string, error: string | undefined) => {
      dispatchErrors(setAction(name, error))
      touch(name)
    },
    [touch],
  )
  const registerField = useCallback(
    ({ initialValue = '', name, validate }: FieldConfig) => {
      dispatchValues(registerAction(name, initialValue))
      dispatchErrors(
        registerAction(name, validate ? validate(initialValue, {}) : undefined),
      )
      dispatchTouched(registerAction(name, false))
      dispatchValidators(registerAction(name, validate))
    },
    [],
  )
  const getValue = useCallback((name: string) => get(values, name), [values])
  const getError = useCallback((name: string) => get(errors, name), [errors])
  const getTouched = useCallback((name: string) => get(touched, name), [
    touched,
  ])
  const deregisterField = useCallback((name: string) => {
    dispatchValues(deregisterAction(name))
    dispatchErrors(deregisterAction(name))
    dispatchTouched(deregisterAction(name))
  }, [])

  useEffect(() => {}, [])

  return {
    values,
    errors,
    touched,
    registerField,
    setValue,
    setError,
    touch,
    getValue,
    getError,
    getTouched,
    deregisterField,
  }
}
