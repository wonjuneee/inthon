import { Layout, Row, Col } from 'antd';

import poster from '../assets/poster.png';
import Spacer from '../components/common/Spacer';
import { Performance } from '../models/performance';
import { useNavigate } from 'react-router-dom';

const PerformanceListPage = () => {
  const performances: Performance[] = [
    { eventId: 8, prfNm: 'MJ 매직 쇼 0', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 9, prfNm: 'MJ 매직 쇼 1', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 10, prfNm: 'MJ 매직 쇼 2', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 11, prfNm: 'MJ 매직 쇼 3', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 12, prfNm: 'MJ 매직 쇼 4', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 13, prfNm: 'MJ 매직 쇼 5', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 14, prfNm: 'MJ 매직 쇼 6', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
    { eventId: 15, prfNm: 'MJ 매직 쇼 7', prfStart: null, prfEnd: null, placeNm: null, poster: poster, genreNm: null },
  ];

  const navigate = useNavigate();

  const handlePosterClick = (id: number) => {
    alert(`공연 ${id}을 선택하셨습니다.`);
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
