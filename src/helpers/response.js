module.exports = (response, status, message, aditionalData = {}, success = true) => {
  return response.status(status).send({
    success,
    message: message || 'Success',
    ...aditionalData
  })
}
