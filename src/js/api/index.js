
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm'

const getBaseUrl = (path) => {
    return 'https://api-ulbi.karismatech.net'+"/"+path
}


const post = (api) => (data, param='') => {
    return axios.post(`${getBaseUrl(api)}${param}`, data, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
};
const postMultipartParam = (api) => (data, param="") => {
    return axios.post(`${getBaseUrl(api)}${param}`, data, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
};

// const get = (api) => (param = "") => {
//     return axios(`${getBaseUrl(api)}${param}`, {
//       method: "GET",
//       headers: {
//         "Access-Control-Allow-Origin": `${CONFIG.origin}`,
//         "Content-type": "application/json",
//         "Authorization": `bearer ${TokenAPIM}`
//       }
//     });
//   };

export const postLogin = postMultipartParam('api/v1/login')

const API = {
    postLogin
}

export default API