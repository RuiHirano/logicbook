import axios from "axios"
const SERVER_ADDRESS: string = process.env.REACT_APP_SERVER_ADDRESS ? process.env.REACT_APP_SERVER_ADDRESS : window.location.origin
console.log("Address: ", SERVER_ADDRESS)
export default class API {

    private baseURL: string

    constructor(url: string = SERVER_ADDRESS) {
        this.baseURL = url;
    }


    getBaseURL() {
        return this.baseURL;
    }

    setBaseURL(val: string) {
        this.baseURL = val;
    }

    async get({
        url = "",
        params = {},
    }) {
        // return axios.get(this.baseURL + url);
        return axios(
            {
                url: url,
                method: 'get',
                baseURL: this.baseURL,
                params: params,
            }
        );
    }

    async delete({
        url = "",
        params = {},
    }) {
        // return axios.get(this.baseURL + url);
        return axios(
            {
                url: url,
                method: 'delete',
                baseURL: this.baseURL,
                params: params,
            }
        );
    }

    async put({
        url = "",
        data = {},
        headers = { 'Content-Type': 'application/json' },
        params = {},
        formData = new FormData(),
        responseType = "json",
    }) {
        return axios(
            {
                url: url,
                method: 'put',
                baseURL: this.baseURL,
                // headers: {'X-Requested-With': 'XMLHttpRequest',
                //   'Content-Type': 'application/json'},
                headers: headers,
                params: params,
                data: data,
                //formData: formData,
                timeout: 0, // default is `0` (no timeout)
                //responseType: responseType,
                //responseEncoding: 'utf8',
                maxContentLength: 2000, // default, bytes
            }
        );
    }

    async post({
        url = "",
        data = {},
        headers = { 'Content-Type': 'application/json' },
        params = {},
        formData = new FormData(),
        onUploadProgress = (e: ProgressEvent) => { },
        cancelTokenSource = axios.CancelToken.source(),
        responseType = "json",
    }) {
        return axios(
            {
                url: url,
                method: 'post',
                baseURL: this.baseURL,
                // headers: {'X-Requested-With': 'XMLHttpRequest',
                //   'Content-Type': 'application/json'},
                headers: headers,
                params: params,
                data: data,
                cancelToken: cancelTokenSource.token,
                //formData: formData,
                timeout: 0, // default is `0` (no timeout)
                //responseType: responseType,
                //responseEncoding: 'utf8',
                onUploadProgress: onUploadProgress,
                maxContentLength: 2000, // default, bytes
            }
        );
    }

    async getData() {
        const res: any = await this.get({
            url: '/data'
        });
        const data = res.data
        return data
    }

    async executeLogic(data: any) {
        const res: any = await this.post({
            url: '/execute/logic',
            data: data,
        });
        const result = res.data
        return result
    }

    async executeExample(data: any) {
        const res: any = await this.post({
            url: '/execute/example',
            data: data,
        });
        const result = res.data
        return result
    }

    async executeTest(data: any) {
        const res: any = await this.post({
            url: '/execute/test',
            data: data,
        });
        const result = res.data
        return result
    }

    async reload() {
        const res: any = await this.post({
            url: '/reload',
        });
        const result = res.data
        return result
    }

    async updateDocument(data: any) {
        console.log(data)
        const res: any = await this.post({
            url: '/document',
            data: data,
        });
        const result = res.data
        return result
    }

}
