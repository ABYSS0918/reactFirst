import { Form, Button, Input } from "antd";
import { useAuth } from "context/auth-context";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { FormEvent } from "react";


// const apiUrl = process.env.REACT_APP_API_URL;


export const Login = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    // const login = (param: { username: string; password: string }) => {
    //     fetch(`${apiUrl}/login`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(param),
    //     }).then(async (res) => {
    //         if (res.ok) {

    //         }
    //     })
    // }


    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    //     const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    //     login({ username, password });
    // };
    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            // login(values).catch(e => onError(e));
            await run(login(values))
        } catch (e: Error | any) {
            onError(e)
        }
    }
    return (

        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>

            <Form.Item>
                <LongButton loading={isLoading} htmlType="submit" type="primary">
                    登录
                </LongButton>
            </Form.Item>

        </Form>
    )
};
export const LongButton = styled(Button)`
  width: 100%
`