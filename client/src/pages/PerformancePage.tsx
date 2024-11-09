import { Layout } from 'antd';

import poster from '../assets/poster.png';
import Spacer from '../components/common/Spacer';
import CustomButton from '../components/common/CustomButton';

const PerformancePage = () => {
  return (
    <Layout className="layout">
      <p className="title self-start" color="var(--black)">
        MJ 매직쇼를 다녀오세요!
      </p>
      <Spacer height={24} />
      <img src={poster} style={{ width: '354px', height: 'auto' }} />
      <Spacer height={24} />
      <p className="subtitle self-start" color="var(--black)">
        MJ 매직쇼
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        일시: 24.11.09 (토) 15시, 17시
      </p>
      <Spacer height={8} />
      <p className="subtitle self-start" color="var(--black)">
        장소: 송파어린이문화회관 아이소리홀
      </p>
      <Spacer height={40} />
      <CustomButton text="기록하기" />
    </Layout>
  );
};

export default PerformancePage;
