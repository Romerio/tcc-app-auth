import ROUTES from './Routes'
import fetchData, { mekeUrl } from './fetchData'

export const getAllServices = async ({ query }) => {
    try {
        let url = mekeUrl(ROUTES.SERVICES.ALL.PATH, query || {})

        const responseData = await fetchData({ 
            url,
            method: ROUTES.SERVICES.ALL.METHOD,
        })

        return responseData
    } catch (e) {
        throw e
    }
}