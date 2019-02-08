import { Platform } from 'react-native';
import store from '../source/Stores/orderStore';

 class AsyncStorage {
    asyncDelUserInfo = async() => {
        try {
          const email = await AsyncStorage.removeItem( 'email');
          const password = await AsyncStorage.removeItem( 'password');
          console.warn('refresh data=>>>',email,password);
          
        } catch (error) {
          // Error saving data
        }
        BackHandler.exitApp();
      }
}
export default AsyncStorage;
//functions
//   export const Button = () => (
//     <TouchableHighlight style={styles.container}>
//       <Text style={styles.button}>Click Me</Text>
//     </TouchableHighlight>
//   )
//   export const test = () => {
//     console.warn('tested func');
//   }
  