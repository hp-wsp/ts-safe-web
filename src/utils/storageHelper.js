import CryptoJS from 'crypto-js';

const ENCRYPT_KEY = '68da34b968da34b9';
const iv = CryptoJS.enc.Utf8.parse('68da34b968da34b9');
const encrypt = (dataToStorage) => {
    return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
};

const decrypt = (dataFromStorage) => {
    const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};

const storageHelper = {
    get: (key) => {

        try {
            const formatted = decrypt(localStorage.getItem(key));
            return formatted;
        } catch (e) {
            return undefined;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, encrypt(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
};

export default storageHelper;
