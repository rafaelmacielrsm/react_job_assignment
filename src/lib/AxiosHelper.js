var axios = require('axios');

axios.defaults.baseURL = 'http://zssn-backend-example.herokuapp.com/api/';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.patch['Accept'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Accept'] = 'application/json';

export const createPerson = (queryStr) => axios.post('/people.json', queryStr);

export const getPersonByUUID = uuid => axios.get(`/people/${uuid}.json`);

export const getItems = uuid => axios.get(`/people/${uuid}/properties.json`)

export const saveNewPosition = (uuid, queryStr) => (
  axios.patch(`/people/${uuid}.json`, queryStr)
)
