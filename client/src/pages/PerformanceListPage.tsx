import { Layout, Row, Col } from 'antd';

import poster from '../assets/poster.png';
import Spacer from '../components/common/Spacer';
import { Performance } from '../models/performance';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PerformanceListPage = () => {
  const [performances, setPerformances] = useState<Performance[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/performance/get-all`, { headers: { 'Content-Type': 'application/json' } })
      .then(res => setPerformances(res.data))
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handlePosterClick = (id: string) => {
    navigate(`/performance/${id}`);
  };

  return (
    <Layout className="layout">
      <Spacer height={24} />
      <p className="heading" color="var(--black)">
        공연 정보
      </p>
      <Spacer height={24} />

      <Row gutter={[24, 24]} justify="center">
        {Array.from(performances).map((performance, index) => (
          <Col key={index} style={{ padding: '0' }}>
            <button onClick={() => handlePosterClick(performance.eventId)}>
              <img src={performance.poster} style={{ width: '160px', height: '231px', objectFit: 'contain' }} />
              <Spacer height={16} />
              <p className="subtitle" color="var(--black)">
                {performance.prfNm}
              </p>
            </button>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default PerformanceListPage;
