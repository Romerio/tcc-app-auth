import { Constants } from 'expo'

const baseUrl = Constants.appOwnership === 'expo' ? 'http://192.168.0.5:3000' : 'https://auth-back.herokuapp.com'

export default {
    LOGIN: `${baseUrl}/api/users/login`,
    SIGIN_UP: `${baseUrl}/api/users/signup`,
}