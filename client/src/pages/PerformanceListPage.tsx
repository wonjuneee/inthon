import { Layout, Row, Col } from 'antd';

import poster from '../assets/poster.png';
import Spacer from '../components/common/Spacer';

const PerformanceListPage: React.FC = () => {
  const handleCardClick = (index: number) => {
    alert(`공연 ${index + 1}을 선택하셨습니다.`);
  };
  return (
    <Layout className="layout">
      <Spacer height={24} />
      <p className="heading" color="var(--black)">
        공연 정보
      </p>
      <Spacer height={24} />

      <Row gutter={[24, 24]} justify="center">
        {Array.from({ length: 6 }).map((_, index) => (
          <Col key={index} style={{ padding: '0' }}>
            <button onClick={() => handleCardClick(index)}>
              <img src={poster} style={{ width: '160px', height: '231px', objectFit: 'contain' }} />
              <Spacer height={16} />
              <p className="subtitle" color="var(--black)">
                MJ 매직 쇼
              </p>
            </button>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default PerformanceListPage;
