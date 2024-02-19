import React from 'react';
import Toast, {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';

const ToastMessage = () => {
  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'pink'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 19,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: 'normal',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    info: props => (
      <InfoToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
  };
  return <Toast config={toastConfig} />;
};

export default ToastMessage;
