import { Layout, Typography, Row, Col, Card } from 'antd';
import axios from 'axios';
import { Egg } from '../models/egg';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ButterflyContainerPage: React.FC = () => {
  const [eggList, setEggList] = useState<Egg[]>([]);
  const username = localStorage.getItem('username');

  const fetchEggList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/egg/get-butterflies?`, {
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

  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate('/butterfly', { state: { eddIg: id } });
  };

  return (
    <Layout className="layout">
      <div className="text-center" style={{ paddingBottom: '24px' }}>
        <Typography.Title level={3} className="mb-0">
          나비 보관함
        </Typography.Title>
      </div>
      <Row gutter={[34, 34]} justify="center">
        {eggList.map((egg, _) => (
          <Col key={egg.id} flex="none">
            <button
              onClick={() => handleCardClick(egg.id)}
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
                  src="/assets/butterfly.png"
                  alt="Egg"
                  style={{
                    transform: 'scale(1.8) translateY(-22%)',
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

export default ButterflyContainerPage;
