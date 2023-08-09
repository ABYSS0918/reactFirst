import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { Form, Button, Input } from "antd"
import { LongButton } from "./login";
import { useAsync } from "utils/use-async";
// const apiUrl = process.env.REACT_APP_API_URL;


export const Register = ({ onError }: { onError: (error: Error) => void }) => {
    const { register, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
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
    //     register({ username, password });
    // };
    const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        if (cpassword === values.password) {
            try {
                await run(register(values))
            } catch (e: Error | any) {
                onError(e)
            }
            // register(values).catch(e => onError(e));
        } else {
            onError(new Error('请确认两次的输入密码相同'));
            return;
        }

    };
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item name='cpassword' rules={[{ required: true, message: '请确认密码' }]}>
                <Input placeholder="确认密码" type="password" id="cpassword" />
            </Form.Item>
            <Form.Item>

                <LongButton loading={isLoading} htmlType="submit" type="primary">
                    注册
                </LongButton>

            </Form.Item>
        </Form>

    )
};