import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { globalStyles } from '../constants';

const KeyboardAvoidingWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={globalStyles.flex1}
      keyboardVerticalOffset={Platform.select({ios: 80, android: 100})}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.flex1}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
