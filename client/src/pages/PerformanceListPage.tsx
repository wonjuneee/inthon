import { Layout, Row, Col } from 'antd';

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
    <Layout className="layout" style={{ height: '100vh', overflow: 'hidden' }}>
      <p className="heading" color="var(--black)">
        공연 정보
      </p>
      <Spacer height={24} />
      <div style={{ height: 'calc(100vh - 120px)', overflowY: 'auto', overflowX: 'hidden' }} className="custom-scroll">
        <Row
          gutter={[24, 24]}
          justify="center"
          style={{
            position: 'sticky',
          }}
        >
          {Array.from(performances).map((performance, index) => (
            <Col key={index} style={{ padding: '0' }}>
              <button onClick={() => handlePosterClick(performance.eventId)}>
                <img src={performance.poster} style={{ width: '160px', height: '231px', objectFit: 'contain' }} />
                <Spacer height={16} />
                <p className="subtitle" color="var(--black)" style={{ textAlign: 'center', margin: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '8ch' }}>
                  {performance.prfNm}
                </p>
              </button>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default PerformanceListPage;
