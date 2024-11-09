import React from 'react';
import { Layout, theme, Button } from 'antd';
import QuestContainer from '../components/common/QuestContainer';
import { STEP, Egg } from '../models/egg';
import { Art } from '../models/art';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/context/AuthContent';
import { questions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const step_images: Record<STEP, string> = {
  [STEP.egg]: '/assets/egg.png',
  [STEP.caterpillar]: '/assets/caterpilar.png',
  [STEP.pupa]: '/assets/pupa.png',
  [STEP.butterfly]: '/assets/butterfly.png',
};

const HomePage: React.FC = () => {
  const [eggData, setEggData] = useState<Egg | null>(null);
  const [artData, setArtData] = useState<Art | null>(null);
  const { user, isLoggedIn } = useAuth();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEggData() {
      if (!user || !isLoggedIn) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-current`, {
          params: { username: user.username },
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

  const imageSrc = eggData?.step !== undefined && eggData?.step !== null ? step_images[eggData.step as STEP] : '/assets/egg.png';
  const backgroundImageSrc = eggData?.step === STEP.butterfly ? '/assets/flower.png' : '/assets/leaf.png';
  const questContent = artData && artData.questionIdx != null ? questions[artData.questionIdx] : '질문 데이터 불러오는 중...';

  const handleQuestClick = () => {
    alert('QuestContainer 버튼이 클릭되었습니다!');
    navigate('/art');
  };
  const handleImageClick = () => {
    if (eggData?.step === STEP.butterfly) {
      navigate('/butterfly');
    } else {
      alert('이동은 나비 단계에서만 가능합니다.');
    }
  };

  const handleButtonClick = () => {
    navigate('/performance-list');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Layout style={{ width: 402, height: 874, background: token.colorBgBase, position: 'relative', overflow: 'hidden' }}>
        <img src={backgroundImageSrc} className="bg-img" />
        <img src={imageSrc} className="bg-img" />
        <button
          onClick={handleImageClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: eggData?.step === STEP.butterfly ? 'pointer' : 'not-allowed',
            pointerEvents: eggData?.step === STEP.butterfly ? 'auto' : 'none',
          }}
        ></button>
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
