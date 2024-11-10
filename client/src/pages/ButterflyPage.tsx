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
  //     .get(`${import.meta.env.VITE_SERVER_URL}/art/get-total-art?id=${eggId}`)
  //     .then(res => setArts(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  const arts: Art[] = [
    {
      id: 1,
      questionIdx: 0,
      imagePath: 'https://github.com/user-attachments/assets/9c2529b1-2719-4dae-aa68-edaea3a9328e',
      description: '단풍이 예뻤다.',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 2,
      questionIdx: 1,
      imagePath: 'https://github.com/user-attachments/assets/2f6b6b7f-3c22-4a74-9b74-500343e73fdd',
      description: '너무 예뻤다.',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 3,
      questionIdx: 2,
      imagePath: 'https://github.com/user-attachments/assets/4de52fc4-9850-4c87-a134-90ce41acb974',
      description: '빨간 머리 엔',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 4,
      questionIdx: 3,
      imagePath: 'https://github.com/user-attachments/assets/929bd706-e2dc-484b-b2fc-08616efbe38b',
      description: '나는 아름다운 나비~~',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 5,
      questionIdx: 4,
      imagePath: 'https://github.com/user-attachments/assets/3b021c31-f1d4-43f4-8eec-95ef830970eb',
      description: '책책책책 노잼.',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 6,
      questionIdx: 5,
      imagePath: 'https://github.com/user-attachments/assets/b3e2e3f8-9abe-4d71-b1f1-6fbc595f16a3',
      description: '펑펑 눈이옵니다',
      createdAt: null,
      updatedAt: null,
    },
  ];

  const navigate = useNavigate();

  const handleArtClick = (id: number) => {
    navigate('/art', { state: { artId: id } });
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
                <img
                  src={art.imagePath!}
                  style={{
                    width: '102px',
                    height: '102px',
                    borderRadius: '10px', // Applying the round border with 10px radius
                  }}
                />
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ButterflyPage;
