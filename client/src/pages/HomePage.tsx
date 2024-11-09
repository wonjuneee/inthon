import React from 'react';
import { Layout, theme, Button } from 'antd';
import QuestContainer from '../components/common/QuestContainer';
import { STEP } from '../models/egg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/context/AuthContent';
import { questions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const step_images = {
  [STEP.egg]: '/assets/egg.png',
  [STEP.caterpillar]: '/assets/catepillar.png',
  [STEP.pupa]: '/assets/pupa.png',
  [STEP.butterfly]: '/assets/butterfly.png',
};

interface EggData {
  step: STEP;
}
interface ArtData {
  questionIdx: number;
}

const HomePage: React.FC = () => {
  const [eggData, setEggData] = useState<EggData | null>(null);
  const [artData, setArtData] = useState<ArtData | null>(null);
  const { user, isLoggedIn } = useAuth();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEggData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/egg/get-current`, {
          params: { user },
        });
        if (response.status === 200) {
          setEggData(response.data.egg);
          setArtData(response.data.art);
        }
      } catch (error) {
        console.error('데이터 정보를 가져오는데 오류가 생겼습니다.', error);
      }
    }
    fetchEggData();
  }, [user, isLoggedIn]);

  const imageSrc = eggData ? step_images[eggData.step] : '/assets/egg.png';
  const backgroundImageSrc = eggData && eggData.step === 3 ? '/assets/flower.png' : '/assets/leaf.png';
  const questContent = artData ? questions[artData.questionIdx] : '질문 데이터 불러오는 중...';

  const handleQuestClick = () => {
    alert('QuestContainer 버튼이 클릭되었습니다!');
  };
  const handleButtonClick = () => {
    navigate('/egg');
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Layout style={{ width: 402, height: 874, background: token.colorBgBase, position: 'relative', overflow: 'hidden' }}>
        <img src={backgroundImageSrc} className="bg-img" />
        <img src={imageSrc} className="bg-img" />
        <div className="flex justify-center items-center relative z-10">
          <div className="p-16">
            <button onClick={handleQuestClick} className="flex justify-center items-center">
              <QuestContainer content={questContent} />
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
          onClick={handleButtonClick}
        >
          +
        </Button>
      </Layout>
    </div>
  );
};

export default HomePage;
