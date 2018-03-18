import createLogger from 'vuex/dist/logger'
/* eslint-disable no-undef */
export default process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : []
