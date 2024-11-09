import { Col, Layout, Row } from 'antd';
import Spacer from '../components/common/Spacer';

const ButterflyPage = () => {
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
          {Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} flex="none">
              <button
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
              ></button>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ButterflyPage;
