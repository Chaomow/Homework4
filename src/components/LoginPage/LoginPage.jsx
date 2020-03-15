import React, { useCallback } from 'react'
import ParticlesBg from 'particles-bg'
import { Icon, Tabs } from 'antd'

import styles from './styles/LoginPage.module.scss'
import Login from '../Login'
import Register from '../Register'

const LoginPage = React.memo(props => {
  const onTabClick = useCallback((key, event) => {
    const { currentTarget } = event
    setTimeout(() => {
      document.querySelector(
        `.${styles.tabs} .ant-tabs-ink-bar`,
      ).style.transform = `translateX(${currentTarget.offsetLeft}px)`
    }, 10)
  }, [])

  return (
    <div className={styles.loginPage}>
      <div className={styles.form}>
        <div className={styles.title}>
          <Icon type="apple" className={styles.logo} />
          <div className={styles.siteLabel}>BuyBuyBuy</div>
        </div>
        <Tabs className={styles.tabs} onTabClick={onTabClick}>
          <Tabs.TabPane tab="LOG IN" key="1">
            <Login />
          </Tabs.TabPane>
          <Tabs.TabPane tab="SIGN UP" key="2">
            <Register />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ParticlesBg type="square" bg />
    </div>
  )
})

export default LoginPage
