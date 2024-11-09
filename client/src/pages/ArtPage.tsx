import { Layout } from 'antd';
import { FaCamera } from 'react-icons/fa';

import QuestContainer from '../components/common/QuestContainer';
import { questions } from '../utils/constants';
import CustomButton from '../components/common/CustomButton';
import Spacer from '../components/common/Spacer';

const ArtPage = () => {
  return (
    <Layout className="layout">
      <QuestContainer content={questions[0]} />
      <Spacer height={40} />

      <p className="title self-start" color="var(--black)">
        사진을 찍어주세요
      </p>
      <Spacer height={16} />

      <div className="flex justify-center items-center" style={{ width: '354px', height: '354px', backgroundColor: 'var(--primary-container)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
        <FaCamera size={64} color="var(--primary)" />
      </div>
      <Spacer height={40} />

      <p className="title self-start" color="var(--black)">
        어떤 생각이 들었나요?
      </p>
      <Spacer height={16} />

      <div style={{ width: '354px', height: '140px', padding: '16px', backgroundColor: 'var(--primary-container)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
        <textarea
          maxLength={255}
          placeholder="소감을 간단하게 적어주세요"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '14px',
            resize: 'none',
          }}
        />
      </div>
      <Spacer height={8} />

      <p className="body self-end" color="var(--gray-500)">
        0/255
      </p>
      <Spacer height={24} />

      <CustomButton text="저장" />
    </Layout>
  );
};

export default ArtPage;
