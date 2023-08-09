import { User } from "screens/ProjectList/components/SearchPanel"

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

//本地保存token
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

//登录
export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        } else {
            return Promise.reject(await res.json())
        }
    })
}

//注册
export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (res) => {
        if (res.ok) {
            return handleUserResponse(await res.json())
        } else {
            return Promise.reject(await res.json())
        }
    })
}

//退出清除token
export const logout = async () => window.localStorage.removeItem(localStorageKey);