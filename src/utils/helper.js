import EncryptedStorage from 'react-native-encrypted-storage';
import { Linking } from 'react-native';
import showToast from './toast';



const saveUser = async user => {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        user: user,
      }),
    );
  } catch (error) {
    //handle error
  }
};


const getUser = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    const user = JSON.parse(session).user;
    if (user !== null) {
      return user;
    }
  } catch (error) {
    return null;
    //handle error
  }
};

const saveUserToken = async token => {
  try {
    await EncryptedStorage.setItem(
      'user_token',
      JSON.stringify({
        token: token,
      }),
    );
  } catch (error) {
    //handle error
  }
};

const setAppLanguage = async (data) => {
  try {
    await EncryptedStorage.setItem('lang', JSON.stringify(data));
  } catch (error) {
    throw new Error(error)
  }
};

const getAppLanguage = async () => {
  const defaultLang = { "id": 1, "code": "en" };

  try {
    const lang = await EncryptedStorage.getItem('lang');
    if (!!lang) {
      const langObj= JSON.parse(lang);
      return langObj?.id?langObj:defaultLang
    }
    else {
      return defaultLang
    }
  } catch (error) {
    return defaultLang; // Return default language in case of an error
  }
};

const getUserToken = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_token');
    const token = JSON.parse(session).token;
    if (token !== null) {
      return token;
    }
  } catch (error) {
    return null;
    //handle error
  }
};

const resetUser = async () => {
  try {
    await EncryptedStorage.removeItem('user_session');
  } catch (error) {
    //handle error
  }
};

// Dummy async function
const simulateAsyncOperation = () => {
  return new Promise((resolve, reject) => {
    // Simulating an async operation that takes 2 seconds
    setTimeout(() => {
      // Simulate success
      const success = true;

      if (success) {
        resolve('Async operation completed successfully!');
      } else {
        reject('Async operation failed!');
      }
    }, 2000); // Simulating a 2-second delay
  });
};


const openUrl = async (url) => {
  try {
    await Linking.openURL(url)
  } catch (error) {
    showToast(error.message)
  }

}

const renderValidData = (data) => {
  if (data === null || data === "null" || data === "") {
    return "";
  }
  return data;
};

const getExtensionFromMime = (mime) => {
  if (!mime) return 'jpg'; // Default to 'jpg' if no mime type is provided
  const mimeParts = mime.split('/');
  return mimeParts[mimeParts.length - 1] || 'jpg'; // Get the last part as extension, or 'jpg'
};

function formatDate(date) {
  if (!date) return false;
  
  const dateString = new Date(date);
  
  const day = String(dateString.getDate()).padStart(2, '0');
  const month = String(dateString.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = dateString.getFullYear();
  
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}



function isValidPhoneNumber(phone) {
  // Regular expression to match only digits and ensure length is at least 10
  const regex = /^[0-9]{10,}$/;
  // Check if the phone number matches the regular expression
  return regex.test(phone);
 }


export { simulateAsyncOperation, getUserToken, saveUserToken,
   resetUser, getAppLanguage, setAppLanguage, saveUser, getUser,
    openUrl, renderValidData ,getExtensionFromMime,formatDate,isValidPhoneNumber};
