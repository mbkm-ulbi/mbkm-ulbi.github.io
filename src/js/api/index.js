
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.7/+esm'
import { getAuth } from '../libraries/cookies.js';

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
const getWithToken = (api) => async (param = "") => {
    const token = await getAuth()
    return axios(`${getBaseUrl(api)}${param}`, {
      method: "GET",
      headers: {
        // "Access-Control-Allow-Origin": `${CONFIG.origin}`,
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
};
const postWithToken = (api) => async (data, param = "") => {
    const token = await getAuth()
    return axios.post(`${getBaseUrl(api)}${param}`, data, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
};
const deleteWithToken = (api) => async (param = "") => {
    const token = await getAuth()
    return axios.delete(`${getBaseUrl(api)}${param}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
};

export const postLogin = postMultipartParam('api/v1/login')
export const postRegister = postMultipartParam('api/v1/register')
export const getListJob= getWithToken('api/v1/jobs')
export const deleteJobsById = deleteWithToken('api/v1/jobs')
export const getListCompanies  = getWithToken('api/v1/companies')
export const getListCandidate = getWithToken('api/v1/apply-jobs')
export const getUsers = getWithToken('api/v1/profile')
export const postJob = postWithToken('api/v1/jobs')
export const postApply = postWithToken('api/v1/apply-jobs')
const API = {
    postLogin,
    postRegister,
    getListJob,
    getListCompanies,
    getListCandidate,
    getUsers,
    postJob,
    postApply,
    deleteJobsById
}

export default API