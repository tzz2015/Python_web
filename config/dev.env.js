'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"/api/"',
  // 3D相册地址
  ALUM_HOST: '"http://localhost:8290/Alum3D?key="',
})
