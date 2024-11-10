import React from 'react';
import { Layout, Button } from 'antd';
import QuestContainer from '../components/common/QuestContainer';
import { STEP, Egg } from '../models/egg';
import { Art } from '../models/art';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { questions } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import Spacer from '../components/common/Spacer';

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
    const username = localStorage.getItem('username');

    async function fetchEggData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-current?username=${username}`);
        if (response.status === 200) {
          setEggData(response.data.egg);
          setArtData(response.data.art);
        }
      } catch (error) {
        console.error('데이터 정보를 가져오는데 오류가 생겼습니다.', error);
      }
    }

    fetchEggData();
    // const egg: Egg = {
    //   id: 0,
    //   step: 3,
    //   color: 0,
    //   currArt: 0,
    //   totalArt: null,
    // };
    // const art: Art = {
    //   id: 0,
    //   questionIdx: 0,
    //   imagePath: null,
    //   description: null,
    //   createdAt: null,
    //   updatedAt: null,
    // };

    // setEggData(egg);
    // setArtData(art);
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

  const handleButterflyClick = () => {
    navigate('/butterfly-container');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Layout style={{ width: 402, height: 874, background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
        <Spacer height={80} />
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
        <Spacer height={40} />
        <div className="flex justify-center items-center relative z-10">
          <button onClick={handleQuestClick} className="flex justify-center items-center">
            <QuestContainer content={questContent} animate={artData?.questionIdx != null} />
          </button>
        </div>
        <Button
          type="primary"
          shape="circle"
          className="absolute shadow-lg"
          style={{
            width: '60px',
            height: '60px',
            bottom: '530px',
            right: '24px',
            backgroundColor: 'transparent',
            padding: 0, // 버튼의 내부 여백을 0으로 설정하여 이미지가 버튼에 맞도록 합니다.
            overflow: 'hidden', // 버튼 영역 밖으로 이미지가 나가지 않도록 설정
            borderRadius: '50%', // 원형 버튼을 만들기 위해 borderRadius 설정
          }}
          onClick={handleButtonClick}
        >
          <img
            src="/assets/egg.png"
            style={{
              transform: 'scale(1.8) translateY(-17%)', // 이미지 크기 확대 및 위치 조정
              width: '60px', // 이미지 크기를 버튼에 맞게 100%로 설정
              height: 'auto',
              objectFit: 'cover', // 이미지가 버튼 크기에 맞게 잘리도록 설정
              objectPosition: 'center', // 이미지의 중심을 버튼의 중심에 맞추기
            }}
          />
        </Button>

        {/* 나비 버튼 */}
        <Button
          type="primary"
          shape="circle"
          className="absolute shadow-lg"
          style={{
            width: '60px',
            height: '60px',
            bottom: '530px',
            left: '24px',
            backgroundColor: 'transparent',
            padding: 0, // 버튼의 내부 여백을 0으로 설정하여 이미지가 버튼에 맞도록 합니다.
            borderRadius: '50%', // 원형 버튼을 만들기 위해 borderRadius 설정
          }}
          onClick={handleButterflyClick}
        >
          <img
            src="/assets/butterfly.png"
            style={{
              transform: 'scale(1.8) translateY(-8%)', // 이미지 크기 확대 및 위치 조정
              width: '60px', // 이미지 크기를 버튼에 맞게 100%로 설정
              height: 'auto',
              objectFit: 'cover', // 이미지가 버튼 크기에 맞게 잘리도록 설정
              objectPosition: 'center', // 이미지의 중심을 버튼의 중심에 맞추기
            }}
          />
        </Button>
      </Layout>
    </div>
  );
};

export default HomePage;
