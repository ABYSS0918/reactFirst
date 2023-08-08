import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
    data?: object,
    token?: string
}

export const http = async (funcPath: string, { data, token, headers, ...customConfig }: HttpConfig = {}) => {
    const httpConfig = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (httpConfig.method.toUpperCase() === 'GET') {
        funcPath += `?${qs.stringify(data)}`
    } else {
        httpConfig.body = JSON.stringify(data || {})
    }

    // axios 和 fetch 不同，axios 会在 状态码 不为 2xx 时，自动抛出异常，fetch 需要 手动处理
    return window.fetch(`${apiUrl}/${funcPath}`, httpConfig).then(async res => {
        if (res.status === 401) {
            // 自动退出 并 重载页面
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: '请重新登录！' })
        }
        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const { user } = useAuth()
    // TODO 学习 TS 操作符
    return (...[funcPath, customConfig]: Parameters<typeof http>) => http(funcPath, { ...customConfig, token: user?.token })
}
