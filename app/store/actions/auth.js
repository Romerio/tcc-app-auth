import { AsyncStorage } from 'react-native'

import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionsTypes'
import { uiSStopLoading, uiStartLoading } from './index'
// import startMainTabs from '../../screens/MainTabs/startMainTabs'
import App from '../../../App'

const apiKey = 'AIzaSyBAjd5C23JbMiLZBcycWUhuKJUltg1DKSk'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        console.log('- authMode', authMode)
        dispatch(uiStartLoading())
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`

        if(authMode !== 'login') {
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => {
            alert("tryAuth - Something went wrong, sorry :/ - " + err);
            console.log(err);
            dispatch(uiSStopLoading())
        })
        .then(res => res.json())
        /*.catch(err => {
            alert("error 4xx - 5xx");
            console.log(err);
        })*/
        .then(parsedRes => {
            dispatch(uiSStopLoading())
            console.log(parsedRes)
            if(parsedRes.error || !parsedRes.idToken) {
                alert("tryAuth - Erro de autenticação - " + parsedRes.error ? parsedRes.error.message: '');
            } else {
                dispatch(authStoreToken(
                    parsedRes.idToken, 
                    parsedRes.expiresIn, 
                    parsedRes.refreshToken)
                )
                // startMainTabs()
            }
        });
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000

        dispatch(authSetToken(token, expiryDate))

        AsyncStorage.setItem('ap:auth:token', token)
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString())
        AsyncStorage.setItem('ap:auth:refreshToken', refreshToken)
    }
}

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token,
        expiryDate
    }
}

export const authGetToken = () => {
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
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then((token) => {
                // startMainTabs()
            })
            .catch(e => {
                console.log('Fail to fetch authAutoSignIn')
            })
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('ap:auth:token')
        AsyncStorage.removeItem('ap:auth:expiryDate')
        return AsyncStorage.removeItem('ap:auth:refreshToken')
    }
}

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                App()
            })

        dispatch(authRemoveToken())
    }
}

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
}