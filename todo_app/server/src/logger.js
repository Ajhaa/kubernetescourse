
const logger = (req, res, next) => {
  let logString = `${new Date().toISOString()} - ${req.method} ${req.path} - ${JSON.stringify(req.body)}`
  console.log(logString)

  next()
}

module.exports = logger