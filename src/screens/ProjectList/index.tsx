import { SearchPanel } from './components/SearchPanel'
import { List } from "./components/List"
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import * as qs from 'qs';
import { useHttp } from 'utils/http';
import styled from '@emotion/styled';


const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: '',
    });
    //对param进行防抖处理
    const lastParam = useDebounce(param);
    const [list, setList] = useState([]);

    const client = useHttp();

    useEffect(() => {
        // React Hook "useHttp" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.
        client('projects', { data: cleanObject(lastParam) }).then(setList)
        // React Hook useEffect has a missing dependency: 'client'. Either include it or remove the dependency array.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastParam]);

    // useEffect(() => {
    //     client('projects', { data: cleanObject(lastParam) }).then(setList)
    // }, [lastParam])

    useMount(() => client('users').then(setUsers));
    //传空数组，相当于只在挂载时执行一次 mounted
    // useMount(() => {
    //     fetch(`${apiUrl}/users`).then(async (res) => {
    //         if (res.ok) {
    //             setUsers(await res.json());
    //         }
    //     })
    // });
    return (
        // <div>
        //     <SearchPanel users={users} param={param} setParam={setParam} />
        //     <List users={users} list={list} />
        // </div>
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </Container>
    );


}
const Container = styled.div`
    padding: 3.2rem;
`
