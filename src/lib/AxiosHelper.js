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

export const getInfectedReport = () => axios.get("report/infected.json");
export const getAverageItemsReport = () => (
  axios.get("report/people_inventory.json"));
export const getPointsLost = () => axios.get("report/infected_points.json");


export const unpackAverageReport = (data) => {
  return({
    nonInfected: data.report.average_items_quantity_per_healthy_person,
    total: data.report.average_items_quantity_per_person }
  );
}

export const unpackInfectedReport = (data) => {
  return({
    infected: data.report.average_infected,
    nonInfected: 1 - data.report.average_infected }
  )
}

export const unpackPointsLostReport = (data) => {
  return({
    total: data.report.total_points_lost }
  )
}
