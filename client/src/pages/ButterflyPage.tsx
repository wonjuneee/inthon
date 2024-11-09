import { Col, Layout, Row } from 'antd';
import Spacer from '../components/common/Spacer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Art } from '../models/art';

const ButterflyPage = () => {
  // const location = useLocation();
  // const eggId = location.state.eggId;

  // const [arts, setArts] = useState<Art[]>([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.SERVER_URL}/art/get-total-art?id=${eggId}`)
  //     .then(res => setArts(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  const arts: Art[] = [
    { id: 0, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
    { id: 1, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
    { id: 2, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
    { id: 3, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
    { id: 4, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
    { id: 5, questionIdx: null, imagePath: '', description: null, createdAt: null, updatedAt: null },
  ];

  const navigate = useNavigate();

  const handleArtClick = (id: number) => {
    navigate('/art', { state: { id: id } });
  };

  return (
    <Layout style={{ width: 402, height: 874, background: 'var(--secondary)', position: 'relative', overflow: 'hidden' }}>
      <img src={'/assets/flower.png'} className="bg-img" />
      <img src={'/assets/butterfly.png'} className="bg-img" />
      <div className="layout">
        <p className="title self-start" color="var(--black)">
          나비의 추억을 되돌아봐요!
        </p>
        <Spacer height={40} />

        <Row gutter={[24, 24]} justify="center">
          {Array.from(arts).map((art, index) => (
            <Col key={index} flex="none">
              <button
                onClick={() => handleArtClick(art.id)}
                style={{
                  height: '102px',
                  width: '102px',
                  borderRadius: '10px',
                  background: 'var(--primaryContainer)',
                  boxShadow: 'var(--shadow)',
                  flexShrink: 0,
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <img src={art.imagePath!} style={{ width: '102px', height: '102px' }} />
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ButterflyPage;
