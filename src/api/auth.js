const ID_CREDENTIAL_KEY = 'id_credentials'

export default {
  getCredentials () {
    return JSON.parse(window.localStorage.getItem(ID_CREDENTIAL_KEY))
  },

  saveCredentials (credentials) {
    window.localStorage.setItem(ID_CREDENTIAL_KEY, JSON.stringify(credentials))
  },

  destroyCredentials () {
    window.localStorage.removeItem(ID_CREDENTIAL_KEY)
  }
}
