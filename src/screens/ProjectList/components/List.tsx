import { User } from "./SearchPanel";
import { Table, TableProps } from "antd";
import dayjs from 'dayjs'
export interface Project {
    id: string;
    name: string;
    personId: string;
    star: boolean;
    organization: string;
    created: number;
}
interface ListProps extends TableProps<Project> {
    users: User[];

}


export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table
            pagination={false}
            columns={[{
                title: '名称',
                dataIndex: 'name',
                sorter: (a, b) => a.name.localeCompare(b.name)
            },
            {
                title: "部门",
                dataIndex: "organization"
            },
            {
                title: '负责人',
                render: (text, project) => <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
            }, {
                title: "创建时间",
                render: (text, project) => (
                    <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : "无"}
                    </span>
                )
            }]}
            {...props}
        >




        </Table>
    )
    //  <Table pagination={false} columns={[{
    //     title: '名称',
    //     dataIndex: 'name',
    //     sorter: (a, b) => a.name.localeCompare(b.name)
    // },
    // {
    //     title: "部门",
    //     dataIndex: "organization"
    // },
    // {
    //     title: '负责人',
    //     render: (text, project) => <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
    // }, {
    //     title: "创建时间",
    //     render: (text, project) => (
    //         <span>
    //             {project.created ? dayjs(project.created).format('YYYY-MM-DD') : "无"}
    //         </span>
    //     )
    // }

    // ]} dataSource={list}>

    // </Table>
}