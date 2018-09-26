import ROUTES from './Routes'

const mekeUrl = (url = '', params = {}) => {
    return url
}

const fetchData = async ({url = '', method = 'GET', payload = {}, headers = {}}) => {
    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })
    
        const parsedRes = await response.json()

        if(parsedRes.error || !parsedRes.data) {
            throw {
                description: parsedRes.error && parsedRes.error.description ? parsedRes.error.description : 'An error ocurred',
                title: parsedRes.error && parsedRes.error.title ? parsedRes.error.title : 'An error ocurred',
            }
        }
    
        return  parsedRes.data
    } catch(e) {
        throw {
            description: e.description || 'An error has catched',
            title: e.title || 'An error has catched',
        }
    }
}

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
