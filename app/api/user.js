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

export const getServices = async ({ query }) => {
    try {
        let url = mekeUrl(ROUTES.USERS.SERVICES.PATH, query || {})

        const responseData = await fetchData({ 
            url,
            method: ROUTES.USERS.SERVICES.METHOD,
        })

        return responseData
    } catch (e) {
        throw e
    }
}