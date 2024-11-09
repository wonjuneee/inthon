import { Layout } from 'antd';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { questions } from '../utils/constants';
import QuestContainer from '../components/common/QuestContainer';
import CustomButton from '../components/common/CustomButton';
import Spacer from '../components/common/Spacer';
import { Art } from '../models/art';

const ArtPage = () => {
  // const location = useLocation();
  // const artId = location.state.id;

  // const [art, setArt] = useState<Art | null>(null);
  const [description, setDescription] = useState<string>('');

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.SERVER_URL}/art/get-art?id=${artId}`)
  //     .then(res => setArt(res.data))
  //     .catch(err => console.log(err));
  // }, []);

  const art: Art = { id: 0, questionIdx: 0, imagePath: null, description: null, createdAt: null, updatedAt: null };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Layout className="layout">
      <QuestContainer content={questions[art?.questionIdx!]} />
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
          readOnly={art?.description !== null}
          value={art?.description ?? description}
          onChange={handleTextChange}
        />
      </div>
      <Spacer height={8} />

      <p className="body self-end" color="var(--gray-500)">
        {description.length}/255
      </p>
      <Spacer height={24} />

      <CustomButton text="저장" />
    </Layout>
  );
};

export default ArtPage;
