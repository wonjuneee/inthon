import { Layout, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { Egg } from '../models/egg';
import React, { useEffect, useState } from 'react';
const color_images: { [key: number]: string } = {
  1: '/assets/egg_yellow.png',
  2: '/assets/egg_orange.png',
  3: '/assets/egg_blue.png',
  4: '/assets/egg_white.png',
};
const EggPage: React.FC = () => {
  const [eggList, setEggList] = useState<Egg[]>([]);

  const username = localStorage.getItem('username');

  const fetchEggList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-eggs`, {
        params: { username: username },
      });
      if (response.status === 200) {
        setEggList(response.data);
      }
    } catch (error) {
      console.error('알 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchEggList();
  }, []);

  const handleCardClick = async (index: number) => {
    const selectedEgg = eggList[index];
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/user/update-curr-egg`, {
        username: username,
        id: selectedEgg.id,
      });
    } catch (error) {
      console.error('선택한 알을 업데이트하는 중 오류가 발생했습니다.', error);
    }
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
                  src={color_images[egg.color] || '/assets/egg.png'}
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
