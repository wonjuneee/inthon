import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import poster from '../assets/poster.png';
import Spacer from '../components/common/Spacer';
import CustomButton from '../components/common/CustomButton';
import { Performance } from '../models/performance';
import { formatDate } from '../utils/utils';
import { useParams } from 'react-router-dom';

const PerformancePage = () => {
  const performance: Performance = {
    eventId: '0',
    prfNm: 'MJ 매직 쇼',
    prfStart: new Date('2024-12-01'),
    prfEnd: new Date('2024-12-31'),
    placeNm: '송파어린이문화회관 아이소리홀',
    poster: poster,
    genreNm: 'Drama',
  };

  // const { id } = useParams<{ id: string }>();

  // const [performance, setPerformance] = useState<Performance | null>(null);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.SERVER_URL}/performance/get?eventId=${id}`)
  //     .then(res => setPerformance(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  return (
    <Layout className="layout">
      <img src={performance.poster} style={{ width: '354px', height: 'auto' }} />
      <Spacer height={40} />
      <p className="title self-start" color="var(--black)">
        {performance?.prfNm}
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        일시: {formatDate(performance?.prfStart!)} ~ {formatDate(performance?.prfEnd!)}
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        장소: {performance?.placeNm}
      </p>
      <Spacer height={24} />
      <CustomButton text="기록하기" />
    </Layout>
  );
};

export default PerformancePage;
