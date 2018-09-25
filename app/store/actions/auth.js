import { AsyncStorage } from 'react-native'

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionsTypes'
import { uiSStopLoading, uiStartLoading } from './index'
// import startMainTabs from '../../screens/MainTabs/startMainTabs'
import App from '../../../App'

const apiKey = 'AIzaSyBAjd5C23JbMiLZBcycWUhuKJUltg1DKSk'
const domain = 'http://53361843.ngrok.io'

/*export const tryAuth2 = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        let url = domain + '/api/users/login'

        if(authMode !== 'login') {
            url = domain + '/api/users/signup'
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => {
            console.log('- catch 1')
            alert("tryAuth - Something went wrong, sorry :/ - " + err);
            console.log(err);
            dispatch(uiSStopLoading())
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiSStopLoading())

            if(parsedRes.error || !parsedRes.data || !parsedRes.data.token) {
                alert(parsedRes.error.description || parsedRes.message);
            } else {
                const data = parsedRes.data

                dispatch(authStoreToken({
                    userData: {
                        _id: data._id,
                        name: data.name,
                        verificationLevel: data.verificationLevel
                    },
                    authData : {
                        token: data.token
                    }
                }))

                console.log('## Logou!')
                // startMainTabs()
            }
        })
    }
}*/

export const tryAuth = (authData, authMode) => {
    return async dispatch => {
        dispatch(uiStartLoading())

        try {
            let url = domain + '/api/users/login'
            if(authMode !== 'login') {
                url = domain + '/api/users/signup'
            }
        
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    name: authData.name,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const parsedRes = await response.json()

            if(parsedRes.error || !parsedRes.data || !parsedRes.data.token) {
                await dispatch(uiSStopLoading())

                alert(parsedRes.error.description || parsedRes.message);

                return false
            } else {
                const data = parsedRes.data

                await dispatch(authStoreToken({
                    userData: {
                        _id: data._id,
                        name: data.name,
                        verificationLevel: data.verificationLevel
                    },
                    authData : {
                        token: data.token
                    }
                }))

                await dispatch(uiSStopLoading())

                return true
            }

        } catch (e) {
            await dispatch(uiSStopLoading())

            alert('Erro ao tentar logar - ' + e);
            return false
        }
    }
}

export const authStoreToken = ({ userData, authData }) => {
    return async dispatch => {

        await dispatch(authSetToken(authData.token))
        await AsyncStorage.setItem('ap:user:_id', userData._id)
        await AsyncStorage.setItem('ap:user:name', userData.name)
        await AsyncStorage.setItem('ap:user:verificationLevel', userData.verificationLevel.toString())

        await AsyncStorage.setItem('ap:auth:token', authData.token)
        //AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString())
        //AsyncStorage.setItem('ap:auth:refreshToken', refreshToken)
    }
}

export const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token
    }
}

/*export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token
            const expiryDate = getState().auth.expiryDate

            if(!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken = null

                AsyncStorage.getItem('ap:auth:token')
                    .catch(e => reject())
                    .then((tokenFromStorage) => {
                        fetchedToken = tokenFromStorage
                        if(!tokenFromStorage) {
                            // alert('- authGetToken - nao tem token salvo')
                            return reject()
                        }

                        return AsyncStorage.getItem('ap:auth:expiryDate')
                    })
                    .then((expiryDate) => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate, 10))
                        const now = new Date()

                        if(now > parsedExpiryDate) {
                            // alert('- authGetToken - token expirou - ' + parsedExpiryDate)
                            return reject()
                        }

                        dispatch(authSetToken(fetchedToken))
                        resolve(fetchedToken)
                    })
                    .catch(e => {
                        reject()
                    })
            } else {
                resolve(token)
            }
        })

        return promise
            .catch(err => {
                return AsyncStorage.getItem('ap:auth:refreshToken')
                    .then(refreshToken => {
                        fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
                            method: 'POST',
                            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    })
                    .then((res) => res.json())
                    .then((parsedRes) => {
                        if(parsedRes.id_token) {
                            dispatch(authStoreToken(
                                parsedRes.id_token,
                                parsedRes.expires_in,
                                parsedRes.refresh_token,
                            ))

                            return parsedRes.id_token
                        } else {
                            dispatch(authClearStorage())
                        }
                    })
            })
            .then((token) => {
                if(!token) {
                    throw (new Error())
                } else {
                    return token
                }
            })
    }
}*/

/*export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then((token) => {
                // startMainTabs()
            })
            .catch(e => {
                console.log('Fail to fetch authAutoSignIn')
            })
    }
}*/

export const authClearStorage = () => {
    return dispatch => {

        AsyncStorage.removeItem('ap:user:_id')
        AsyncStorage.removeItem('ap:user:name')
        AsyncStorage.removeItem('ap:user:verificationLevel')

        return AsyncStorage.removeItem('ap:auth:token')
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                // #TO-DO: Navega para a tela de Autenticação
                // App()
            })

        dispatch(authRemoveToken())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}
