import AsyncStorage from '@react-native-async-storage/async-storage';
const storage_key = 'auth:credentials'

class Storage {

    // FETCH CREDENTAILS
    async fetch() {
        const rawProducts = await AsyncStorage.getItem(storage_key)
        return rawProducts ? JSON.parse(rawProducts) : undefined;
    }

    // SAVE CREDENTIALS
    async save(credentials) {
        await AsyncStorage.setItem(storage_key, JSON.stringify(credentials))
    }

    // REMOVE CREDENTIALS
    async remove() {
        await AsyncStorage.removeItem(storage_key)
    }
}

export default Storage;