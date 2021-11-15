import axios from 'axios';

const CUSTOM_KEY = 'db4d729b-5f39-46c1-8e1c-c9b661369c27';

// load all breeds
export async function getBreeds() {
  try {
    axios.defaults.headers.common['x-api-key'] = CUSTOM_KEY;
    let response = await axios.get('https://api.thecatapi.com/v1/breeds/');
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// load images by breed
export async function getImages(breedId, page) {
  try {
    let reqParams = {
      breed_ids: breedId,
      limit: 5,
      page: page,
    };
    let response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      params: reqParams,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// load selected image
export async function loadImage(id) {
  try {
    let response = await axios.get('https://api.thecatapi.com/v1/images/' + id);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
