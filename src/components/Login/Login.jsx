import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import axios from 'axios'

import styles from './styles/Login.module.scss'

const Login = React.memo(props => {
  const [isLogging, setIsLogging] = useState(false)
  const { form } = props

  const login = useCallback(
    event => {
      event.preventDefault()
      form.validateFieldsAndScroll(async (error, values) => {
        if (error) {
          return
        }
        setIsLogging(true)
        try {
          // test@gmail.com / 123
          await axios({
            method: 'post',
            url: '/api/v1/login',
            data: values,
          })
          const history = useHistory()
          history.push('/')
        } catch (error) {
          if (error?.response?.data?.success === false) {
            notification.error({
              message: 'Error',
              description: 'Wrong email or password!',
            })
          }
        } finally {
          setIsLogging(false)
        }
      })
    },
    [setIsLogging, form],
  )

  const { getFieldDecorator } = form
  return (
    <div>
      <Form onSubmit={login} autoComplete="off">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              autoComplete="new"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              autoComplete="new"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}

          <Button
            className={styles.btn}
            htmlType="submit"
            loading={isLogging}
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
})

export default Form.create()(Login)
