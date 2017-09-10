var axios = require('axios');

axios.defaults.baseURL = 'http://zssn-backend-example.herokuapp.com/api/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function createPerson(personJson) {

  return axios.post('/people.json', personJson);
}
