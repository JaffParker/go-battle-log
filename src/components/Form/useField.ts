import { useFormContext } from './FormContext'
import { useEffect } from 'react'

export interface FieldConfig {
  name: string
  initialValue?: any
  validate?: (value: any, values: any) => string | undefined
}

export interface Field {
  props: {
    name: string
    checked?: boolean
    onChange: (event: React.ChangeEvent<any>) => void
    onBlur: () => void
    value: any
    multiple?: boolean
  }
  value: any
  error: string | undefined
  touched: boolean
  setValue: (value: any) => void
  setError: (value: any) => void
  setTouched: (value: any) => void
}

export default function useField(config: FieldConfig): Field {
  const {
    registerField,
    deregisterField,
    getValue,
    setError,
    setValue,
    touch,
    getError,
    getTouched,
  } = useFormContext()

  useEffect(() => {
    registerField(config)
    return () => {
      deregisterField(config.name)
    }
  }, [config, deregisterField, registerField])

  return {
    value: getValue(config.name) ?? '',
    error: getError(config.name),
    touched: getTouched(config.name),
    setError: setError.bind(null, config.name),
    setValue: setValue.bind(null, config.name),
    setTouched: touch.bind(null, config.name),
    props: {
      name: config.name,
      value: getValue(config.name) ?? '',
      onBlur: touch.bind(null, config.name),
      onChange(event) {
        setValue(config.name, event.target.value)
      },
    },
  }
}
