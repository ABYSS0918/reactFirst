import { SearchPanel } from './components/SearchPanel'
import { List } from "./components/List"
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import * as qs from 'qs';


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

    useEffect(() => {
        fetch(
            //name=${parma.name}&personId=${parma.personId}
            `${apiUrl}/project?${qs.stringify(cleanObject(param))}`
        ).then(async (res) => {
            if (res.ok) {
                setList(await res.json());
            }
        })
    }, [lastParam]);

    //传空数组，相当于只在挂载时执行一次 mounted
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (res) => {
            if (res.ok) {
                setUsers(await res.json());
            }
        })
    });
    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    );


}