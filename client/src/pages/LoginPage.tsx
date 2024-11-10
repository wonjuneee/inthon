import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Input } from 'antd';
import CustomButton from '../components/common/CustomButton';
import Spacer from '../components/common/Spacer';
const LoginPage: React.FC = () => {
  const [username, setInputs] = useState('');
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
  };

  async function handleLogin() {
    try {
      // post user/login
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/login`,
        { username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        // username 저장
        localStorage.setItem('username', username);
        navigate('/');
      }
    } catch (e) {
      console.error('Login failed', e);
    }
  }

  return (
    <Layout className="relative flex flex-col items-center justify-center" style={{ width: '402px', height: '874px', margin: 'auto', overflow: 'hidden' }}>
      <img src={'/assets/butterfly.png'} className="bg-img" style={{ marginTop: '-150px' }} />
      <div className="relative z-10 flex flex-col items-center">
        <p className="heading" color="var(--black)">
          애벌레키우기
        </p>
        <Spacer height={300} />
        <Form name="login" layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: '아이디를 입력해 주세요!' }]}>
            <Input id="username" value={username} onChange={handleInput} style={{ height: '48px', width: '354px' }} placeholder="아이디" />
          </Form.Item>
          <Spacer height={8} />
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '비밀번호를 입력해 주세요!' },
              { min: 1, message: '비밀번호는 최소 1자 이상이어야 합니다.' },
            ]}
          >
            <Input id="password" type="password" style={{ height: '48px', width: '354px' }} placeholder="비밀번호" />
          </Form.Item>
        </Form>
        <Spacer height={8} />
        <CustomButton text="로그인" onClick={handleLogin} />
      </div>
    </Layout>
  );
};

export default LoginPage;
