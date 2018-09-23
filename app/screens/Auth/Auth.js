import React, { Component } from 'react'
import { 
    View, 
    Button, 
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'

import { connect } from 'react-redux'
// import { tryAuth, authAutoSignIn } from '../../store/actions/index'

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import MainText from '../../components/UI/MainText/MainText'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'
import backgroundImage from '../../assets/background-2.jpg'
import validate from '../../utility/validation'

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 450 ? 'portrait' : 'landscape',
        authMode: 'login',
        controls: {
            email: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    maxLength: 126
                }
            },
            confirmPassword: {
                touched: false,
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            },
        }
    }

    constructor(props) {
        super(props)

        Dimensions.addEventListener('change', this.updateStyles)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles)
    }

    componentDidMount() {
        this.props.onAutoSignIn()
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 450 ? 'portrait' : 'landscape'
        })
    }

    authHandler = () => {
        const authata = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        }

        this.props.onTryAuth(authata, this.state.authMode);
        this.props.navigation.navigate('FindPlace', { data: null });
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
          const equalControl = this.state.controls[key].validationRules.equalTo;
          const equalValue = this.state.controls[equalControl].value;
          connectedValue = {
            ...connectedValue,
            equalTo: equalValue
          };
        }
        if (key === "password") {
          connectedValue = {
            ...connectedValue,
            equalTo: value
          };
        }
        this.setState(prevState => {
          return {
            controls: {
              ...prevState.controls,
              confirmPassword: {
                ...prevState.controls.confirmPassword,
                valid:
                  key === "password"
                    ? validate(
                        prevState.controls.confirmPassword.value,
                        prevState.controls.confirmPassword.validationRules,
                        connectedValue
                      )
                    : prevState.controls.confirmPassword.valid
              },
              [key]: {
                ...prevState.controls[key],
                value: value,
                valid: validate(
                  value,
                  prevState.controls[key].validationRules,
                  connectedValue
                ),
                touched: true
              }
            }
          };
        });
      };

    submitButtonIsDisabled = () => {
        const ignoreConfirmPassword = this.state.authMode === 'login'
        const keys = Object.keys(this.state.controls)
        const invalidControl = keys.findIndex(key => {
            if(ignoreConfirmPassword && key === 'confirmPassword') {
                return false
            }

            return this.state.controls[key].valid === false
        })
    
        return invalidControl > -1
    }

    render() {
        let headingTextContent = null
        let confirmPasswordControll = null
        const disabeleSubmitButton = this.submitButtonIsDisabled()

        let submitButton = (
            <ButtonWithBackground
                onPress={this.authHandler} 
                color="#2966ff"
                disabled={disabeleSubmitButton}
            >
                Submit
            </ButtonWithBackground>
        )
        
        if(this.state.viewMode === 'portrait') {
            headingTextContent = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            )
        }

        if(this.state.authMode === 'signup') {
            confirmPasswordControll = (
            <View
            style={
                this.state.viewMode === 'portrait'
                ? styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper
            }
            >
                <DefaultInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                    autoCapitalize='none'
                    autoCorrect={false}
                />
            </View>)
        }

        if(this.props.isLoading) {
            submitButton =  <ActivityIndicator />
        }

        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
            >
                <KeyboardAvoidingView style={styles.container} behavior='padding' >
                        {headingTextContent}
                        <ButtonWithBackground
                            onPress={this.switchAuthModeHandler} 
                            color="#2966ff"
                        >
                            Switch to {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
                        </ButtonWithBackground>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                            <View style={styles.inputContainer} >
                                <DefaultInput
                                    placeholder="Your E-mail Address"
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='email-address'
                                />
                                <View 
                                    style={
                                        this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                        ? styles.portraitPawwordContainer 
                                        : styles.landscapePawwordContainer
                                    }
                                >
                                    <View
                                        style={
                                            this.state.viewMode === 'portrait' || this.state.authMode === 'login'
                                            ? styles.portraitPasswordWrapper
                                            : styles.landscapePasswordWrapper
                                        }
                                    >
                                        <DefaultInput
                                            placeholder="Password"
                                            style={styles.input}
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            secureTextEntry
                                            autoCapitalize='none'
                                            autoCorrect={false}
                                        />
                                    </View>
                                    {confirmPasswordControll}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {submitButton}
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    landscapePawwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPawwordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
        width: '45%',
    },
    portraitPasswordWrapper: {
        width: '100%',
    }
})

const mapPropsToState = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: () => {}, //(authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => {} // () => dispatch(authAutoSignIn())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(AuthScreen)