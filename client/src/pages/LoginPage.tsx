import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContent';
import { Layout, Typography, Form, Input } from 'antd';
import CustomButton from '../components/common/CustomButton';

const LoginPage: React.FC = () => {
  return (
    <Layout className="relative flex flex-col items-center justify-center" style={{ width: '402px', height: '874px', margin: 'auto', overflow: 'hidden' }}>
      <img src={'/assets/butterfly.png'} className="bg-img" />
      <div className="relative z-10 flex flex-col items-center " style={{ marginTop: '-350px' }}>
        <Typography.Title level={4} className="mb-6"></Typography.Title>
        <Typography.Title level={4}>애벌레키우기</Typography.Title>
        <Form name="login" layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: 'Username을 입력해 주세요!' }]}>
            <Input style={{ height: '48px', width: '354px' }} placeholder="username 입력" />
          </Form.Item>
        </Form>
        <CustomButton text="로그인" />
      </div>
    </Layout>
  );
};

export default LoginPage;
