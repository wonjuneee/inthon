import React from 'react';
import { Layout, theme } from 'antd';
import CustomButton from '../components/common/CustomButton';
import QuestContainer from '../components/common/QuestContainer';

const HomePage = () => {
  const { token } = theme.useToken();
  return (
    <Layout style={{ width: 402, height: 874, margin: 'auto', background: token.colorBgBase }}>
      <QuestContainer content="빨강, 주황, 노랑, 초록이 모두 있는 단풍 사진을 찍어보세요." />
      <CustomButton text="저장" />
    </Layout>
  );
};

export default HomePage;
