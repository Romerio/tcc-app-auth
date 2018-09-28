export const mekeUrl = (url = '', query) => {
    return url
}

export default fetchData = async ({url = '', method = 'GET', payload = {}, headers = {}}) => {
    try {
        const token = await AsyncStorage.getItem('ap:auth:token')

        const response = await fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
                ...headers,
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