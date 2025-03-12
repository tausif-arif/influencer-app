import { Platform, ToastAndroid } from "react-native"
import { Alert } from "../components";

const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message||"alert", ToastAndroid.SHORT);
    } else {
      Alert.alert(message||"alert");
    }
  };

  export default showToast
  