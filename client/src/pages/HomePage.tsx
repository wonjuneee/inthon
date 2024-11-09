import React from 'react';
import { Layout, Button } from 'antd';
import QuestContainer from '../components/common/QuestContainer';
import { STEP, Egg } from '../models/egg';
import { Art } from '../models/art';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const navigate = useNavigate();

  useEffect(() => {
    // const username = localStorage.getItem('username');

    // async function fetchEggData() {
    //   try {
    //     const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-current`, {
    //       params: { username: username },
    //     });
    //     if (response.status === 200) {
    //       setEggData(response.data.egg);
    //       setArtData(response.data.art);
    //     }
    //   } catch (error) {
    //     console.error('데이터 정보를 가져오는데 오류가 생겼습니다.', error);
    //   }
    // }

    // fetchEggData();
    const egg: Egg = {
      id: 0,
      step: 3,
      color: 0,
      currArt: 0,
      totalArt: null,
    };
    const art: Art = {
      id: 0,
      questionIdx: 0,
      imagePath: null,
      description: null,
      createdAt: null,
      updatedAt: null,
    };

    setEggData(egg);
    setArtData(art);
  }, []);

  const imageSrc = eggData?.step !== undefined && eggData?.step !== null ? step_images[eggData.step as STEP] : '/assets/egg.png';
  const backgroundImageSrc = eggData?.step === STEP.butterfly ? '/assets/flower.png' : '/assets/leaf.png';
  const questContent = artData && artData.questionIdx != null ? questions[artData.questionIdx] : '질문 데이터 불러오는 중...';

  const handleQuestClick = () => {
    navigate('/art', { state: { artId: artData?.id } });
  };

  const handleImageClick = () => {
    if (eggData?.step === STEP.butterfly) {
      navigate('/butterfly', { state: { eggId: eggData.id } });
    }
  };

  const handleButtonClick = () => {
    navigate('/performance-list');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Layout style={{ width: 402, height: 874, background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <img src={backgroundImageSrc} className="bg-img" />
        <img src={imageSrc} className="bg-img" />
        <button
          onClick={handleImageClick}
          disabled={eggData?.step !== STEP.butterfly}
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
            backgroundColor: 'transparent',
          }}
          onClick={handleButtonClick}
        >
          <img
            src="/assets/egg.png"
            style={{
              transform: 'scale(1.8) translateY(-17%)',
              position: 'relative',
              width: '60px', // 이미지 확대
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Button>
      </Layout>
    </div>
  );
};

export default HomePage;
