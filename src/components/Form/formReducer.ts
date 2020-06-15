import _, { merge, set, omit, omitBy, isPlainObject, isEmpty } from 'lodash'

enum FormActionType {
  REGISTER = 'REGISTER',
  SET = 'SET',
  DEREGISTER = 'DEREGISTER',
}
interface ActionWithPayload<T = FormActionType, P = {}> {
  type: T
  payload: P
}

type RegisterFieldAction = ActionWithPayload<
  FormActionType.REGISTER,
  { name: string; initialValue: any }
>
export const registerAction = (
  name: string,
  initialValue: any,
): RegisterFieldAction => ({
  type: FormActionType.REGISTER,
  payload: { name, initialValue },
})

type SetFieldAction = ActionWithPayload<
  FormActionType.SET,
  { name: string; value: any }
>
export const setAction = (name: string, value: any): SetFieldAction => ({
  type: FormActionType.SET,
  payload: { name, value },
})

type DeregisterFieldAction = ActionWithPayload<
  FormActionType.DEREGISTER,
  string
>
export const deregisterAction = (name: string): DeregisterFieldAction => ({
  type: FormActionType.DEREGISTER,
  payload: name,
})

type FormAction = RegisterFieldAction | SetFieldAction | DeregisterFieldAction
export function formReducer(state: any, action: FormAction) {
  switch (action.type) {
    case FormActionType.REGISTER:
      return merge(
        {},
        set({}, action.payload.name, action.payload.initialValue),
        state,
      )

    case FormActionType.SET:
      return merge(
        {},
        state,
        set({}, action.payload.name, action.payload.value),
      )

    case FormActionType.DEREGISTER:
      return deepDeleteEmpty(omit(state, action.payload))

    default:
      return state
  }
}

function deepDeleteEmpty(object: Record<string, any>): Record<string, any> {
  return _(object)
    .pickBy(isPlainObject) // pick objects only
    .mapValues(deepDeleteEmpty) // call only for object values
    .omitBy(isEmpty) // remove all empty objects
    .assign(omitBy(object, isPlainObject)) // assign back primitive values
    .value()
}
