import { AsyncStorage } from 'react-native';
import {Buffer} from 'buffer';
class Api {
  static headers() {
    return {
      'Purchase-Code': 12,
      'Custom-Security': 12,
      'Content-Type': 'application/json',
    }
  }
  static msg(msg) {
    return console.warn(msg);
  }
  static get(route) {
    return this.func(route, null, 'GET');
  }

  static put(route, params) {
    return this.func(route, params, 'PUT')
  }

  static post(route, params) {
    return this.func(route, params, 'POST')
  }

  static delete(route, params) {
    return this.func(route, params, 'DELETE')
  }

  static func = async(route, params, verb) => {
    
    // const host = 'http:
    const host = 'https://listing.downtown-directory.com/for-apps/wp-json/downtown/app';
    const url = `${host}/${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers()
    // console.log('URL===>>>>>',options);
    
    // getting value from asyncStorage
       const email = await AsyncStorage.getItem('email');
       const pass = await AsyncStorage.getItem('password');
    // using buffer
    if ( email !== null && pass !== null ) {
        const hash = new Buffer(`${email}:${pass}`).toString('base64');
        options.headers['Authorization'] = `Basic ${hash}`;  
    }

    return fetch(url, options).then(resp => {
      // console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      // console.log('Api response is ------------->>>>>>', json);

      return json;
    });
  }
}

export default Api;
