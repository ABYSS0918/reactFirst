import { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";

/** @jsxImportSource @emotion/react */
export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = (
    { users, param, setParam }: SearchPanelProps
) => {
    // const [param, setParam] = useState({
    //     name: "",
    //     personId: ""
    // })
    // const [users, setUsers] = useState([])
    // const [List, setList] = useState([])

    // useEffect(() => {
    //     fetch('').then(async res => {
    //         if (res.ok) {
    //             setList(await res.json())
    //         }
    //     })
    // }, [param])

    return (
        <Form layout="inline">
            <Form.Item>
                <Input
                    type="text"
                    value={param.name}
                    onChange={(evt) =>
                        setParam({
                            ...param,
                            name: evt.target.value,
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <Select
                    value={param.personId}
                    onChange={value =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value="">负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>

    )
}