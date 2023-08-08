import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import { Card, Button, Divider } from 'antd';
import styled from "@emotion/styled"
import left from 'assets/left.png'
import logo from 'assets/logo.png'
import right from 'assets/right.png'

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <Container>
            <Header />
            <Background />
            <ShadowCard>
                <Title>
                    {isRegister ? '请注册' : '请登录'}
                </Title>
                {isRegister ? <Register /> : <Login />}
                <Divider />
                <Button type="link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
                </Button>
            </ShadowCard>
        </Container>


    )
};

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
min-height:100vh;
justify-content:center;
`
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center; 
`
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed; // 背景图片是否会随着页面滑动
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`

