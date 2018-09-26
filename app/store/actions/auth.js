import { AsyncStorage, Alert } from 'react-native'

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionsTypes'
import { uiSStopLoading, uiStartLoading } from './index'
import { login, signUp } from '../../api/api'

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

export const tryAuth = (authData, authMode) => {
    return async dispatch => {
        dispatch(uiStartLoading())

        try {
            const payload = {
                email: authData.email,
                password: authData.password,
                name: authData.name,
            }
            let parsedRes = null

            if(authMode === 'login') {
                parsedRes = await login({ payload })
            } else {
                parsedRes = await signUp({ payload })
            }

            if(!parsedRes.token) {
                await dispatch(uiSStopLoading())

                alertError({
                    title: 'Error',
                    description: 'Falha na autenticação',
                })
                
                return false
            }

            await dispatch(authStoreToken({
                userData: {
                    _id: parsedRes._id,
                    name: parsedRes.name,
                    verificationLevel: parsedRes.verificationLevel
                },
                authData : {
                    token: parsedRes.token
                }
            }))

            await dispatch(uiSStopLoading())

            return true
        } catch (e) {
            await dispatch(uiSStopLoading())

            alertError(e)
            
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
    }
}

export const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token
    }
}

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
                // Navega para a tela de Autenticação
            })

        dispatch(authRemoveToken())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
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
