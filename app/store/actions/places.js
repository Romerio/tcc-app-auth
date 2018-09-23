import { 
    SET_PLACES,
    REMOVE_PLACE,
    PLACE_ADDED,
    START_ADD_PLACE
} from './actionsTypes'

import { uiSStopLoading, uiStartLoading } from './index'
import { authGetToken } from './index'

import image from '../../assets/background-1.jpg'

export const startAddPlace = () => {
    return {
        type: START_ADD_PLACE
    }
}

export const addPlace = (placeName, location) => {
    return dispatch => {
        dispatch(uiStartLoading())

        const placeData = {
            name: placeName,
            location,
            image: '../../assets/background-1.jpg'
        }

        dispatch(authGetToken())
            .catch(() => {
                alert("deletePlace - No valid token");
                dispatch(uiSStopLoading())
            })
            .then(token => {
                return fetch(`https://rn-course-back.firebaseio.com/places.json?auth=${token}`, {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                dispatch(uiSStopLoading())
                dispatch(placeAdded())
            })
            .catch(err2 => {  // catches all 4xx and 5xx errors
                console.log('- erro 4xx- 5xx')
                alert('- erro 4xx- 5xx')
                dispatch(uiSStopLoading())
            })
    }
}

export const placeAdded = () => {
    return {
        type: PLACE_ADDED
    }
}

export const getPlaces = () => {
    return dispatch => {

        fetch(`https://rn-course-back.firebaseio.com/places.json`)
            .catch((err) => {
                console.log('## erro na requisicao ' + err)
                console.log(err)
                console.log('##')
            })
            .then(res => {
                return res.json()
            })
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: image,
                        key: key
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert("getPlaces - Something went wrong, sorry :/ - " + err);
                console.log('### getPlaces error')
                console.log(err);
            })

        /*dispatch(authGetToken())
            .then(token => {
                //return fetch(`https://rn-course-back.firebaseio.com/places.json?auth=${token}`)
                return fetch(`https://rn-course-back.firebaseio.com/places.json`)
            })
            .catch((err) => {
                console.log('## token invalido ' + err)
                console.log(typeof err)
                console.log('##')
                alert("getPlaces - No valid token");
            })
            .then(res => {
                console.log('### Resposta: ')
                console.log(res)
                res.json()
            })
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: image,
                        key: key
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert("getPlaces - Something went wrong, sorry :/ - " + err);
                console.log('### getPlaces error')
                console.log(err);
            })*/
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places
    };
};

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));        

        dispatch(authGetToken())
            .catch(() => {
                alert("deletePlace - No valid token");
            })
            .then(token => {
                return fetch(`https://rn-course-back.firebaseio.com/places/${key}.json?auth=${token}`, {
                    method: "DELETE"
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("Done!");
            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key
    };
};