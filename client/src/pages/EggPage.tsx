import { Layout, Typography, Row, Col, Grid, Card } from 'antd';

const EggPage: React.FC = () => {
  const handleCardClick = (index: number) => {
    alert(`알 ${index + 1}을 선택하셨습니다.`);
  };
  return (
    <Layout className="layout">
      <div className="text-center" style={{ paddingBottom: '24px' }}>
        <Typography.Title level={3} className="mb-0">
          알 보관함
        </Typography.Title>
      </div>
      <Row gutter={[34, 34]} justify="center">
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} flex="none">
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
              <Card style={{ height: '100%', width: '100%', borderRadius: '10px', background: 'transparent', boxShadow: 'none', flexShrink: 0 }} />
            </button>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default EggPage;
