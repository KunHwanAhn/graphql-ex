const axios = require('axios')

const BASE_URL = 'https://github.com'
const BASE_API_URL = 'https://api.github.com'

const requestGithubToken = async credentials => {
  const { data } = await axios.post(`${BASE_URL}/login/oauth/access_token`, credentials, {
    headers: {
      Accept: 'application/json',
    },
  })

  return data
}

const requestGithubUserAccount = async token => {
  const { data } = await axios.get(`${BASE_API_URL}/user`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })

  return data
}

const authorizeWithGithub = async credentials => {
  const { access_token: accessToken } = await requestGithubToken(credentials)
  const githubUser = await requestGithubUserAccount(accessToken)

  return {
    accessToken,
    ...githubUser,
  }
}

module.exports = {
  authorizeWithGithub,
}
