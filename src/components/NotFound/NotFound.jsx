import React from 'react'
import ParticlesBg from 'particles-bg'

import styles from './styles/NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <ParticlesBg type="fountain" bg={true} />
      <h1 className={styles.text}>404</h1>
    </div>
  )
}

export default NotFound
