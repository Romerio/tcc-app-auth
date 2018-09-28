import {
    AsyncStorage,
} from 'react-native';
import queryString from 'query-string'

export const mekeUrl = (url = '', query = {}) => {
    try {
        const stringified = queryString.stringify(query);

        return `${url}?${stringified || ''}`
    }catch(e) {
        throw e
    }
}

export default fetchData = async ({url = '', method = 'GET', payload = {}, headers = {}}) => {
    try {
        const token = await AsyncStorage.getItem('ap:auth:token')

        const requestData = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
                ...headers,
            }
        }

        if(method !== 'GET') {
            requestData.body = JSON.stringify(payload)
        }

        const response = await fetch(url, requestData)
    
        const parsedRes = await response.json()

        if(parsedRes.error || !parsedRes.data) {
            throw {
                description: parsedRes.error && parsedRes.error.description ? parsedRes.error.description : 'An error ocurred',
                title: parsedRes.error && parsedRes.error.title ? parsedRes.error.title : 'An error ocurred',
            }
        }
    
        return  parsedRes.data
    } catch(e) {
        console.log('# error fetchData')
        console.log(e)
        throw {
            description: e.description || 'An error has catched',
            title: e.title || 'An error has catched',
        }
    }
}