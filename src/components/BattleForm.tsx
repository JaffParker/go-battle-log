import React, { FC } from 'react'
import { Form } from './Form/Form'
import { Input } from './Form/Input'
import { Button } from '@material-ui/core'

export const BattleForm: FC = () => (
  <Form onSubmit={console.log}>
    <Input
      name="test.child"
      validate={(value) => (!value ? 'Cannot be empty' : undefined)}
    />{' '}
    <Button variant="contained" color="primary" type="submit">
      submit
    </Button>
  </Form>
)
