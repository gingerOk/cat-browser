import axios from 'axios';

const CUSTOM_KEY = 'db4d729b-5f39-46c1-8e1c-c9b661369c27';

// load all cats breeds
export async function getCatsBreeds(params) {
  try {
    axios.defaults.headers.common['x-api-key'] = CUSTOM_KEY;
    let response = await axios.get('https://api.thecatapi.com/v1/breeds/', { params });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// load cats breeds by name
export async function getCatsBreedsById(id) {
  try {
    let reqParams = {
      breed_ids: id,
      limit: 5,
      page: 0,
    };
    let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      params: reqParams,
    });
    return response.data;
  } catch (err) {}
}

// load all dogs breeds
export async function getDogsBreeds(params) {
  try {
    axios.defaults.headers.common['x-api-key'] = CUSTOM_KEY;
    let response = await axios.get('https://api.thedogapi.com/v1/breeds', { params });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// load dogs breeds by name
export async function getDogsBreedsById(id) {
  try {
    let reqParams = {
      breed_ids: id,
      limit: 5,
      page: 0,
    };
    let response = await axios.get('https://api.thedogapi.com/v1/images/search', {
      params: reqParams,
    });
    return response.data;
  } catch (err) {}
}
