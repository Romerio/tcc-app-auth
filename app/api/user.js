import ROUTES from './Routes'
import fetchData, { mekeUrl } from './fetchData'

export const login = async ({ payload }) => {
    try {
        let url = mekeUrl(ROUTES.LOGIN.PATH)

        const responseData = await fetchData({ 
            url,
            method: ROUTES.LOGIN.METHOD,
            payload
        })

        return responseData
    } catch (e) {
        throw e
    }
}

export const signUp = async ({ payload }) => {
    try {
        let url = mekeUrl(ROUTES.SIGIN_UP.PATH)

        const responseData = await fetchData({ 
            url,
            method: ROUTES.SIGIN_UP.METHOD,
            payload
        })

        return responseData
    } catch (e) {
        throw e
    }
}

export const getMyServices = async ({ payload }) => {
    try {
        let url = mekeUrl(ROUTES.USERS.GET_MY_SERVICES.PATH)

        const responseData = await fetchData({ 
            url,
            method: ROUTES.USERS.GET_MY_SERVICES.METHOD,
            payload
        })

        return responseData
    } catch (e) {
        throw e
    }
}

export const addService = async ({ payload }) => {
    try {
        let url = mekeUrl(ROUTES.USERS.ADD_SERVICES.PATH)

        const responseData = await fetchData({ 
            url,
            method: ROUTES.USERS.ADD_SERVICES.METHOD,
            payload
        })

        return responseData
    } catch (e) {
        throw e
    }
}

export const deleteService = async ({ payload }) => {
    try {
        let url = mekeUrl(ROUTES.USERS.DELETE_SERVICES.PATH)

        const responseData = await fetchData({ 
            url,
            method: ROUTES.USERS.DELETE_SERVICES.METHOD,
            payload
        })

        return responseData
    } catch (e) {
        throw e
    }
}