import { useAuth } from "context/auth-context";
import { ProjectList } from "screens/ProjectList"
import styled from "@emotion/styled";
import { Row } from "screens/ProjectList/components/lib";
import SoftwareLogo from 'assets/software-logo.png'
import { Button, Dropdown } from "antd";
import type { MenuProps } from 'antd';


export const AuthenticatedApp = () => {
    const { logout, user } = useAuth();
    const items: MenuProps['items'] = [{
        key: 1,
        label: '登出',
        onClick: logout
    }];
    const value: any = undefined;
    return (
        <Container>
            {value.notExist}
            <Header butween={true}>
                <HeaderLeft gap={true}>
                    {/* <SoftwareLogo width='18rem' color='rgb(38,132,255)' />  */}
                    <BackgroundImg />
                    <h2>项目</h2>
                    <h2>用户</h2>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown menu={{ items }}>
                        <Button type='link' onClick={e => e.preventDefault()}>
                            Hi, {user?.name}
                        </Button>
                    </Dropdown>
                </HeaderRight>
            </Header>

            <Main>
                <ProjectList />
            </Main>
        </Container>


    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给 grid 子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;

const BackgroundImg = styled.div`
    width:18rem ;
    color:rgb(38,132,255);
    background: url(${SoftwareLogo}) no-repeat center;
  padding: 5rem 0;
  background-size: 15rem;
`