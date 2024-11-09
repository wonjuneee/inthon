import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContent';
import { Layout, Button } from 'antd';

export function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  async function handleLogin() {
    try {
      //Join post user/login
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, inputs, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }, // 요청 header 가 json 타입
      });

      if (response.status === 200) {
        //create
        login();
        navigate('/');
      }
    } catch (e) {}
  }
  return (
    <Layout>
      <Button type="primary" color="default" onClick={handleLogin}>
        로그인
      </Button>
      <Button type="default" color="default" onClick={() => navigate('/join')}>
        회원가입
      </Button>
    </Layout>
  );
}
