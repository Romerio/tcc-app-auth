import React, { Component } from 'react';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux'

import { processCodeService } from '../../store/actions/index'

class CodeScanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    qrCodeData: null,
    authMode: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      // this.setState({ lastScannedUrl: result.data });

      const qrCodeData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data
      
      //console.log('- QRCode Lido: ')
      //console.log(qrCodeData)
      //console.log('--\n')
      this.setState({
        ...this.state,
        lastScannedUrl: result.data,
        qrCodeData,
        authMode: qrCodeData.token ? 'Associar' : 'Autenticar'
      })
    }
  };

  _handleProcessCode = async () => {
    try{
      const result = await this.props.onProcessCodeService(this.state.qrCodeData)

      if(result) {
        Alert.alert(
          'Sucesso',
           `Processo de ${this.state.authMode} realizado com sucesso`,
          [
            { text: 'Ok', onPress: () => {} },
          ],
          { cancellable: true }
        )
      } else {
        Alert.alert(
          'Falha',
           `Não foi possíve realizar o processo de ${this.state.authMode}`,
          [
            { text: 'Ok', onPress: () => {} },
          ],
          { cancellable: true }
        )
      }

      this.setState({
        lastScannedUrl: null,
        qrCodeData: null,
        authMode: null
      });
    } catch(e) {
      this.setState({
        lastScannedUrl: null,
        qrCodeData: null,
        authMode: null
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    //       ,
    const labelName = this.state.qrCodeData ? this.state.qrCodeData.service : '...'

    Alert.alert(
      `Deseja se ${this.state.authMode} em ${this.state.qrCodeData.service}?`,
      labelName,
      [
        {
          text: 'Yes',
          onPress: () => { this._handleProcessCode()},
         // onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({
      lastScannedUrl: null,
      qrCodeData: null,
      authMode: null
    });
  };

  _maybeRenderUrl = () => {
    if (!this.state.qrCodeData) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.qrCodeData.service}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  return {
      isLoading: state.ui.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onProcessCodeService: (data) => dispatch(processCodeService(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeScanner)