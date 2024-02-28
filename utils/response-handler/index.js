const jwt = require(`jsonwebtoken`)

const userResponseHandler = (message = ``, status=false, data = null) => {
    return {
        message,
        status,
        data,
    }
}

const tokenGenerator = (dataToSign, secretkey, Expiry) => {
    token = jwt.sign(
        {
          data: {
          ...dataToSign
          },
        },
        secretkey,
        { expiresIn: `30d` }
      );

    return token
} 



module.exports = { userResponseHandler, tokenGenerator };
