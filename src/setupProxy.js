const express = require('express')
const uuidv1 = require('uuid/v1')

module.exports = app => {
  app.use(express.json())
  const apiRouter = express.Router()

  apiRouter
    .post('/login', (req, res) => {
      const { body: data } = req
      const { email, password } = data
      if (email === 'test@gmail.com' && password === '123') {
        res.cookie('sessionID', uuidv1(), {
          path: '/',
          sameSite: true,
          httpOnly: true,
        })
        res.cookie('isLogin', '1', { path: '/', sameSite: true })
        res.json({ success: true })
      } else {
        res.clearCookie('sessionID', { path: '/' })
        res.clearCookie('isLogin', { path: '/' })
        res.status(401).json({ success: false })
      }
    })
    .post('/Register', (req, res) => {
      const { body: data } = req
      console.log(data)
      res.cookie('sessionID', uuidv1(), {
        path: '/',
        sameSite: true,
        httpOnly: true,
      })
      res.cookie('isLogin', '1', { path: '/', sameSite: true })
      res.json({ success: true })
    })
    .post('/logout', (req, res) => {
      res.clearCookie('sessionID', { path: '/' })
      res.clearCookie('isLogin', { path: '/' })
      res.json()
    })
    .get('/commodity/:category', (req, res) => {
      const { category } = req.params
      switch (category) {
        case 'iphone': {
          const itemList = [
            {
              id: 1,
              price: 35900,
              currency: 'NT',
              name: 'iPhone 11 Pro Gold 64G',
              img: 'iphone-11-pro-gold-select-2019.png',
            },
            {
              id: 2,
              price: 35900,
              currency: 'NT',
              name: 'iPhone 11 Pro Mid Night Green 64G',
              img: 'iphone-11-pro-midnight-green-select-2019.png',
            },
            {
              id: 3,
              price: 35900,
              currency: 'NT',
              name: 'iPhone 11 Pro Silver 64G',
              img: 'iphone-11-pro-silver-select-2019.png',
            },
            {
              id: 4,
              price: 35900,
              currency: 'NT',
              name: 'iPhone 11 Pro Space 64G',
              img: 'iphone-11-pro-space-select-2019.png',
            },
            {
              id: 5,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR Black 64G',
              img: 'iphone-xr-black-select-201809.png',
            },
            {
              id: 6,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR Blue 64G',
              img: 'iphone-xr-blue-select-201809.png',
            },
            {
              id: 7,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR Coral 64G',
              img: 'iphone-xr-coral-select-201809.png',
            },
            {
              id: 8,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR Red 64G',
              img: 'iphone-xr-red-select-201809.png',
            },
            {
              id: 9,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR White 64G',
              img: 'iphone-xr-white-select-201809.png',
            },
            {
              id: 10,
              price: 21500,
              currency: 'NT',
              name: 'iPhone XR Yellow 64G',
              img: 'iphone-xr-yellow-select-201809.png',
            },
          ]
          res.json({
            itemList,
          })
          break
        }
        case 'ipad': {
          const itemList = [
            {
              id: 'ipad-1',
              price: 26900,
              currency: 'NT',
              name: 'iPad Pro 11 Sliver 32G',
              img: 'ipad-pro-11-select-cell-silver-201810.png',
            },
            {
              id: 'ipad-2',
              price: 26900,
              currency: 'NT',
              name: 'iPad Pro 11 SpaceGray 32G',
              img: 'ipad-pro-11-select-cell-spacegray-201810.png',
            },
            {
              id: 'ipad-3',
              price: 10900,
              currency: 'NT',
              name: 'iPad Wi-Fi Gold 32G',
              img: 'ipad-wifi-select-gold-201909_GEO_TW.png',
            },
            {
              id: 'ipad-4',
              price: 10900,
              currency: 'NT',
              name: 'iPad Wi-Fi Silver 32G',
              img: 'ipad-wifi-select-silver-201909_GEO_TW.png',
            },
            {
              id: 'ipad-5',
              price: 10900,
              currency: 'NT',
              name: 'iPad Wi-Fi Space 32G',
              img: 'ipad-wifi-select-space-201909_GEO_TW.png',
            },
          ]
          res.json({
            itemList,
          })
          break
        }
        default: {
          res.status(404).json()
        }
      }
    })

  app.use('/api/v1', apiRouter)
}
