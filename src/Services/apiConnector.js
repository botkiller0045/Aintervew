import axios from "axios";

export const axios_instance = axios.create({});

export const api_connector = (method, url, body_data, headers, params) => {

    return axios_instance({
        method: `${method}`,
        url: `${url}`,
        data: body_data ? body_data : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    })
}