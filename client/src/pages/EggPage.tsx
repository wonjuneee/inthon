import { Layout, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { Egg } from '../models/egg';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/context/AuthContent';

const EggPage: React.FC = () => {
  const [eggList, setEggList] = useState<Egg[]>([]);
  const { user, isLoggedIn } = useAuth();

  // 알 더미 데이터
  //   const dummyEggs: Egg[] = [
  //     { id: 1, step: 0, color: 0xff5733, currArt: null, totalArt: null },
  //     { id: 2, step: 0, color: 0x33c4ff, currArt: null, totalArt: null },
  //     { id: 3, step: 0, color: 0x85ff33, currArt: null, totalArt: null },
  //     { id: 4, step: 0, color: 0xff33f6, currArt: null, totalArt: null },
  //     { id: 5, step: 1, color: 0x33ff57, currArt: null, totalArt: null }, // step이 1이므로 필터링되지 않음
  //   ];

  const fetchEggList = async () => {
    if (!user || !user.username) {
      console.warn('User information is not available');
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/egg/get-eggs`, {
        params: { username: user.username },
      });
      if (response.status === 200) {
        const filteredEggs = response.data.eggs.filter((egg: Egg) => egg.step === 0 && egg.id !== user?.currEgg);
        setEggList(filteredEggs);
      }
    } catch (error) {
      console.error('알 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
    // 더미 데이터 사용
    // if (user) {
    //   // user 정보 로그로 확인
    //   console.log('User data:', user);

    //   // 더미 알 데이터 필터링
    //   const filteredEggs = dummyEggs.filter(egg => egg.step === 0 && egg.id !== user.currEgg);
    //   console.log('Filtered Eggs:', filteredEggs);
    //   setEggList(filteredEggs);
    // }
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchEggList();
    }
  }, [user, isLoggedIn]);

  const handleCardClick = (index: number) => {
    alert(`알 ${index + 1}을 선택하셨습니다.`);
  };

  return (
    <Layout className="layout">
      <div className="text-center" style={{ paddingBottom: '24px' }}>
        <Typography.Title level={3} className="mb-0">
          알 보관함
        </Typography.Title>
      </div>
      <Row gutter={[34, 34]} justify="center">
        {eggList.map((egg, index) => (
          <Col key={egg.id} flex="none">
            <button
              onClick={() => handleCardClick(index)}
              style={{
                height: '160px',
                width: '160px',
                borderRadius: '10px',
                background: 'var(--primaryContainer, #F2F6F0)',
                boxShadow: '0px 0px 16px 0px rgba(37, 37, 37, 0.10)',
                flexShrink: 0,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Card style={{ height: '100%', width: '100%', borderRadius: '10px', overflow: 'hidden', background: 'transparent', boxShadow: 'none', flexShrink: 0 }}>
                <img
                  src="/assets/egg.png"
                  alt="Egg"
                  style={{
                    transform: 'scale(1.8) translateY(-33%)',
                    position: 'relative',
                    width: '400px', // 이미지 확대
                    height: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Card>
            </button>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default EggPage;
