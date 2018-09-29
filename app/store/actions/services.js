import { AsyncStorage, Alert } from 'react-native'

import { SET_SERVICES } from './actionsTypes'
import { getAllServices, getMyServices } from '../../api/index'

const alertError = (e = {}) => {
    Alert.alert(
        e.message || e.title || 'Alert',
        e.description || e.message || 'Error',
        [
          { text: 'Ok', onPress: () => {} },
        ],
        { cancellable: true }
      )
}

export const getServices = (query = {}) => {
    return async dispatch => {
        try {
            let parsedRes = await getAllServices({ query })

            const services = [];

            for (let key in parsedRes) {
                services.push({
                    ...parsedRes[key],
                    key: parsedRes[key]._id
                });
            }

            dispatch(setServices(services))
            return null
        } catch (e) {
            alertError(e)
            return null
        }
    }
}

export const getUserServices = (query = {}) => {
    return async dispatch => {
        try {
            let parsedRes = await getMyServices({ query })

            const services = [];

            for (let key in parsedRes) {
                services.push({
                    ...parsedRes[key],
                    key: parsedRes[key]._id
                });
            }

            dispatch(setServices(services)) // talvez fazer setUserServices
            return null
        } catch (e) {
            alertError(e)
            return null
        }
    }
}

export const setServices = services => {
    return {
        type: SET_SERVICES,
        services
    };
};

export const setUserServices = services => {
    return {
        type: SET_USER_SERVICES,
        services
    };
};