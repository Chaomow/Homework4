import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Icon, Select, Button, notification } from 'antd'
import axios from 'axios'

import styles from './styles/Register.module.scss'

const Register = React.memo(props => {
  const [isLogging, setIsLogging] = useState()
  const [phoneCode, setPhoneCode] = useState('886')
  const { form } = props

  const onCodeChange = useCallback(event => {
    setPhoneCode(event)
  }, [])

  const onSubmit = useCallback(
    event => {
      event.preventDefault()
      form.validateFieldsAndScroll(async (error, values) => {
        if (error) {
          return
        }
        setIsLogging(true)
        try {
          await axios({
            method: 'post',
            url: '/api/v1/Register',
            data: values,
          })
          const history = useHistory()
          history.push('/')
          notification.success({
            message: 'Success!',
            description: 'Your account has been registered successfully.',
          })
        } catch (error) {
          if (error?.response?.data?.success === false) {
            notification.error({
              message: 'Error',
              description: 'Something gose wrong!',
            })
          }
        } finally {
          setIsLogging(false)
        }
      })
    },
    [setIsLogging, form],
  )

  const onClear = useCallback(() => {
    form.setFieldsValue({
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    })
  }, [form])

  const compareToFirstPassword = useCallback(
    (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    [form],
  )

  const { getFieldDecorator } = form
  return (
    <div>
      <Form
        className={styles.register}
        onSubmit={onSubmit}
        // labelCol={formItemLayout.labelCol}
        // wrapperCol={formItemLayout.wrapperCol}
      >
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
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
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              autoComplete="new"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="ConfirmPassword"
              autoComplete="new"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your Name!',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
              autoComplete="new"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please input your Phone!',
              },
            ],
          })(
            <Input
              addonBefore={
                <Select
                  value={phoneCode}
                  style={{
                    color: 'rgba(0,0,0,.25)',
                    width: 80,
                  }}
                  onChange={onCodeChange}
                >
                  <Select.Option value="886">+886</Select.Option>
                  <Select.Option value="87">+87</Select.Option>
                </Select>
              }
              prefix={
                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Phone"
            />,
          )}
        </Form.Item>

        <Button
          className={styles.btn}
          loading={isLogging}
          type="primary"
          htmlType="submit"
          block
        >
          Register
        </Button>
        <Button className={styles.btn} type="default" onClick={onClear} block>
          Clear
        </Button>
      </Form>
    </div>
  )
})

export default Form.create()(Register)
