import React from 'react';
import { Layout, theme, Image, Button } from 'antd';
import QuestContainer from '../components/common/QuestContainer';
import { STEP } from '../models/egg';

const step_images = {
  [STEP.egg]: '/assets/egg.png',
  [STEP.caterpillar]: '/assets/catepillar.png',
  [STEP.pupa]: '/assets/pupa.png',
  [STEP.butterfly]: '/assets/butterfly.png',
};

interface HomepageProps {
  step: STEP;
}
const HomePage: React.FC<HomepageProps> = ({ step }) => {
  const imageSrc = step_images[step as 0 | 1 | 2 | 3] || '/assets/egg.png';
  const { token } = theme.useToken();

  const handleQuestClick = () => {
    alert('QuestContainer 버튼이 클릭되었습니다!');
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Layout style={{ width: 402, height: 874, background: token.colorBgBase, position: 'relative', overflow: 'hidden' }}>
        <img src={'/assets/leaf.png'} className="bg-img" />
        <img src={'/assets/egg.png'} className="bg-img" />
        <div className="flex justify-center items-center relative z-10">
          <div className="p-16">
            <button onClick={handleQuestClick} className="flex justify-center items-center">
              <QuestContainer content="빨강, 주황, 노랑, 초록이 모두 있는 단풍 사진을 찍어보세요." />
            </button>
          </div>
        </div>
        <Button
          type="primary"
          shape="circle"
          className="absolute shadow-lg"
          style={{
            width: '60px',
            height: '60px',
            bottom: '570px',
            right: '24px',
            backgroundColor: '#F9F9F9',
          }}
        >
          +
        </Button>
      </Layout>
    </div>
  );
};

export default HomePage;
