import { Layout, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { Egg } from '../models/egg';
import React, { useEffect, useState } from 'react';

const EggPage: React.FC = () => {
  const [eggList, setEggList] = useState<Egg[]>([]);
  const [user, setUser] = useState<{ username: string; currEgg: number } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const fetchEggList = async () => {
    if (!user) {
      console.warn('User information is not available');
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-eggs`, {
        params: { username: user.username },
      });
      if (response.status === 200) {
        const filteredEggs = response.data.eggs.filter((egg: Egg) => egg.step === 0 && egg.id !== user?.currEgg);
        setEggList(filteredEggs);
      }
    } catch (error) {
      console.error('알 데이터를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEggList();
    }
  }, [user]);

  const handleCardClick = async (index: number) => {
    if (!user) return;

    const selectedEgg = eggList[index];
    try {
      await axios.patch(`${import.meta.env.VITE_SERVER_URL}/user/update-curr-egg`, {
        username: user.username,
        id: selectedEgg.id,
      });
      setUser(prev => (prev ? { ...prev, currEgg: selectedEgg.id } : null));
      localStorage.setItem('user', JSON.stringify({ ...user, currEgg: selectedEgg.id }));
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
