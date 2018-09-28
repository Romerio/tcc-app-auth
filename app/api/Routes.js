import { Constants } from 'expo'

const baseUrl = Constants.appOwnership === 'expo' ? 'http://192.168.0.5:3000' : 'https://auth-back.herokuapp.com'

export default {
    LOGIN: {
        PATH: `${baseUrl}/api/users/login`,
        METHOD: 'POST'
    },
    SIGIN_UP: {
        PATH: `${baseUrl}/api/users/signup`,
        METHOD: 'POST'
    },
    SERVICES: {
        ALL: {
            PATH: `${baseUrl}/api/services/all`,
            METHOD: 'GET'
        }
    }
}