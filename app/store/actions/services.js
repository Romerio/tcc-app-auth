import { AsyncStorage, Alert } from 'react-native'

import { uiSStopLoading, uiStartLoading } from './index'
import { SET_SERVICES } from './actionsTypes'
import { getAllServices, getMyServices, addService } from '../../api/index'

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
            dispatch(uiStartLoading())

            let parsedRes = await getAllServices({ query })

            const services = [];

            for (let key in parsedRes) {
                services.push({
                    ...parsedRes[key],
                    key: parsedRes[key]._id
                });
            }

            dispatch(setServices(services))
            await dispatch(uiSStopLoading())

            return null
        } catch (e) {
            alertError(e)
            await dispatch(uiSStopLoading())
            return null
        }
    }
}

export const getUserServices = (query = {}) => {
    return async dispatch => {
        try {
            dispatch(uiStartLoading())

            let parsedRes = await getMyServices({ query })

            const services = [];

            for (let key in parsedRes) {
                services.push({
                    ...parsedRes[key],
                    key: parsedRes[key]._id
                });
            }

            dispatch(setServices(services)) // talvez fazer setUserServices
            await dispatch(uiSStopLoading())
            return null
        } catch (e) {
            alertError(e)
            await dispatch(uiSStopLoading())
            return null
        }
    }
}

const addNewServiceToLocalStorage = async (serviceData) => {
    //console.log('\n[addNewServiceToLocalStorage]')
    //console.log(serviceData)
    const userId = await AsyncStorage.getItem('ap:user:_id')
    const servicesString = await AsyncStorage.getItem(`ap:${userId}:services`)
    const newService = {
        name: serviceData.name,
        token: serviceData.token,
    }
    let services = null

    if(!serviceData || !userId) return null;

    if(servicesString) {
        services = JSON.parse(servicesString)
        const serviceAlreadyExists = services.findIndex(s => s.name == serviceData.name)
    
        if(serviceAlreadyExists > -1) {
            //console.log('- substituindo')
            services[serviceAlreadyExists] = newService
        } else {
            //console.log('- adicionando')
            services.push(newService)
        }
    } else {
        services = [newService]
    }

    await AsyncStorage.removeItem(`ap:${userId}:services`)
    await AsyncStorage.setItem(`ap:${userId}:services`, JSON.stringify(services))

    //console.log('\n[Services]')
    //console.log(services)
}

const handleAssociation = async (qrCodeData) => {
    const payload = { serviceName: qrCodeData.service }

    // Adiciona serviço para usuário 
    // no banco de dados do Authenticator Manager
    await addService({ payload })

    await addNewServiceToLocalStorage({
        name: qrCodeData.service,
        token: qrCodeData.token
    })
    /// setar token do servico
}

export const processCodeService = (qrCodeData) => {
    return async (dispatch, getState) => {
        try {
            if(!qrCodeData) return null;

            await dispatch(uiStartLoading())

            if(qrCodeData.token) { // adicionar/associar servico
                await handleAssociation(qrCodeData)
            } else {
                console.log('- #TO-DO: autenticar')
            }

            await dispatch(uiSStopLoading())
            return null
        } catch (e) {
            alertError(e)
            await dispatch(uiSStopLoading())
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