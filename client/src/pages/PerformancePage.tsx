import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import Spacer from '../components/common/Spacer';
import CustomButton from '../components/common/CustomButton';
import { Performance } from '../models/performance';
import { formatDate } from '../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

const PerformancePage = () => {
  const { id } = useParams<{ id: string }>();

  const [performance, setPerformance] = useState<Performance | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/performance/get?eventId=${id}`)
      .then(res => setPerformance(res.data))
      .catch(err => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/art`, { state: { artId: 0 } });
  };

  return (
    <Layout className="layout">
      <img src={performance?.poster} style={{ width: '354px', height: 'auto', objectFit: 'cover' }} />
      <Spacer height={40} />
      <p className="title self-start" color="var(--black)">
        {performance?.prfNm}
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        일시: {formatDate(performance?.prfStart)} ~ {formatDate(performance?.prfEnd)}
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        장소: {performance?.placeNm}
      </p>{' '}
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        장소: {performance?.genreNm}
      </p>
      <Spacer height={32} />
      <CustomButton text="기록하기" onClick={handleButtonClick} />
    </Layout>
  );
};

export default PerformancePage;
