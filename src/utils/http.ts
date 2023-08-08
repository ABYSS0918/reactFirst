import qs from "qs";
import * as auth from 'auth-provider';

const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
    data?: object,
    token?: string

}

export const http = async (funcPath: string, { data, token, headers, ...customConfig }: HttpConfig) => {
    const httpConfig = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (httpConfig.method.toUpperCase() === 'GET') {
        funcPath += `?${qs.stringify(data)}`
    } else {
        httpConfig.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${funcPath}`, httpConfig).then(async res => {
        if (res.status === 401) {
            //自动退出并重载页面
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: "请重新登陆" })
        }
        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}