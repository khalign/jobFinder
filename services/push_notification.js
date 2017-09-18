import {Permissions, Notifications} from 'expo';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let pToken = await AsyncStorage.getItem('pToken');

    if (pToken){
        return;
    } else {
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)

        if (status !== 'granted') {
            return;
        } else {
            let token = Notifications.getExpoPushTokenAsync();
            await axios.post(PUSH_ENDPOINT, {token: {token}});
            AsyncStorage.setItem('ptoken', token);
        }
    }
}