import React, { useState, useCallback, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Skeleton, Row, Col } from 'antd'
import axios from 'axios'

import styles from './styles/Shopping.module.scss'

const Shopping = React.memo(props => {
  const [isLoading, setIsLoading] = useState(true)
  const [itemList, setItemList] = useState([])
  const {
    match: {
      params: { category = 'iphone' },
    },
  } = props

  const dataToElements = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const rowSize = isMobile ? 3 : 4
    /*
        elements = [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
        ]
      */
    const elements = itemList.reduce((list, item, index) => {
      if (index % rowSize === 0) {
        list.push([])
      }
      const row = list[list.length - 1]
      const { id, name, price, currency, img } = item
      const src = require(`../../assets/images/${category}/${img}`)
      row.push(
        <Col key={id} lg={6} xs={8}>
          <div className={styles.item}>
            <Link to={`/commondity/${id}`} className={styles.link}>
              <img className={styles.img} src={src} alt={name} />
            </Link>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>
              ${price.toLocaleString()} {currency}
            </div>
          </div>
        </Col>,
      )
      return list
    }, [])
    return elements.map((row, index) => {
      return (
        <Row key={index} gutter={[16, 16]}>
          {row}
        </Row>
      )
    })
  }, [itemList, category])

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/api/v1/commodity/${category}`)
      const itemList = response?.data?.itemList ?? []
      setIsLoading(false)
      setItemList(itemList)
    }
    getData()
  }, [category])

  return (
    <div className={styles.products}>
      {isLoading ? <Skeleton active /> : dataToElements()}
    </div>
  )
})

export default withRouter(Shopping)
