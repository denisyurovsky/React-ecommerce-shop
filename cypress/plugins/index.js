module.exports = (on, config) => {

  if (process.env.PORT) {
    config.baseUrl = `http://localhost:${process.env.PORT}`
  }

  if (process.env.REACT_APP_API_HOST) {
    config.env.apiUrl = process.env.REACT_APP_API_HOST
  }

  return config
}
