import React, { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon, Row, Col, Menu, notification } from 'antd'
import { withCookies } from 'react-cookie'
import axios from 'axios'

import styles from './styles/Header.module.scss'

const Header = React.memo(props => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { cookies } = props
  const { pathname } = useLocation()
  const isLogin = cookies.get('isLogin') === '1'
  const logout = useCallback(async () => {
    setIsLoggingOut(true)
    try {
      await axios.post('/api/v1/logout')
      notification.success({
        message: 'Success',
        description: 'You have logged out!',
      })
    } catch (e) {
      notification.error({
        message: 'Error',
        description: 'Failed to log out!',
      })
    } finally {
      setIsLoggingOut(false)
    }
  }, [setIsLoggingOut])
  return (
    <header className={styles.header}>
      <Row type="flex" gutter={20}>
        <Col span={5}>
          <Icon type="apple" className={styles.logo} />
          <label className={styles.siteLabel}>BuyBuyBuy</label>
        </Col>
        <Col span={14} className={styles.navBar}>
          <Menu
            mode="horizontal"
            className={styles.nav}
            selectedKeys={[pathname]}
          >
            <Menu.Item key="/">
              <Link to="/">iPhone</Link>
            </Menu.Item>
            <Menu.Item key="/shopping/ipad">
              <Link to="/shopping/ipad">iPad</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={5}>
          <div className={styles.tools}>
            <Link to="/cart" title="Shopping Cart">
              <Icon type="shopping-cart" />
            </Link>
            {!isLogin ? (
              <Link to="/login" title="Logg in">
                <Icon type="login" />
              </Link>
            ) : (
              <Icon
                type="logout"
                onClick={logout}
                className={isLoggingOut ? styles.isLoggingOut : ''}
                title="Logg out"
              />
            )}
          </div>
        </Col>
      </Row>
    </header>
  )
})

export default withCookies(Header)
