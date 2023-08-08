import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { User } from 'screens/ProjectList/components/SearchPanel'
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
    username: string,
    password: string
}

const initUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        // 由于要自定义 token ，这里使用 http 而非 useHttp
        const data = await http('me', { token })
        user = data.user
    }
    return user
}


//上下文赋值 
const AuthContext = React.createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,

} | undefined>(undefined)


AuthContext.displayName = 'AuthContext'
//泛型
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
    const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
    const logout = () => auth.logout().then(() => setUser(null))
    useMount(() => initUser().then(setUser))

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />

}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth 必须在 AuthProvider 中使用')
    }
    return context
}
