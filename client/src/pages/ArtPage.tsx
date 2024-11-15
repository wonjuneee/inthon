import { Layout } from 'antd';
import { FaCamera, FaCircle } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { keywords, questions } from '../utils/constants';
import QuestContainer from '../components/common/QuestContainer';
import CustomButton from '../components/common/CustomButton';
import Spacer from '../components/common/Spacer';
import { Art } from '../models/art';

const ArtPage = () => {
  const location = useLocation();
  const artId: number = location.state.artId;

  const [art, setArt] = useState<Art | null>(null);
  const [description, setDescription] = useState<string>('');

  const [imgError, setImgError] = useState<string>('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/art/get-art/${artId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    // setArt(
    //   arts.find(art => art.id === artId) ?? {
    //     id: 0,
    //     questionIdx: 0,
    //     imagePath: null,
    //     description: null,
    //     createdAt: null,
    //     updatedAt: null,
    //   }
    // );
  }, []);

  const arts: Art[] = [
    {
      id: 0,
      questionIdx: 0,
      imagePath: null,
      description: null,
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 1,
      questionIdx: 0,
      imagePath: 'https://github.com/user-attachments/assets/9c2529b1-2719-4dae-aa68-edaea3a9328e',
      description: '단풍이 예뻤다.',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 2,
      questionIdx: 1,
      imagePath: 'https://github.com/user-attachments/assets/2f6b6b7f-3c22-4a74-9b74-500343e73fdd',
      description: '너무 예뻤다.',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 3,
      questionIdx: 2,
      imagePath: 'https://github.com/user-attachments/assets/4de52fc4-9850-4c87-a134-90ce41acb974',
      description: '빨간 머리 엔',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 4,
      questionIdx: 3,
      imagePath: 'https://github.com/user-attachments/assets/929bd706-e2dc-484b-b2fc-08616efbe38b',
      description: '나는 아름다운 나비~~',
      createdAt: null,
      updatedAt: null,
    },
    {
      id: 5,
      questionIdx: 4,
      imagePath: 'https://github.com/user-attachments/assets/3b021c31-f1d4-43f4-8eec-95ef830970eb',
      description: '책책책책 노잼.',
      createdAt: null,
      updatedAt: null,
    },
    // {
    //   id: 6,
    //   questionIdx: 5,
    //   imagePath: 'https://github.com/user-attachments/assets/b3e2e3f8-9abe-4d71-b1f1-6fbc595f16a3',
    //   description: '펑펑 눈이옵니다',
    //   createdAt: null,
    //   updatedAt: null,
    // },
  ];
  // const art: Art = { id: 0, questionIdx: 0, imagePath: null, description: null, createdAt: null, updatedAt: null };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    // if (!image) return;

    // const byteString = atob(image.split(',')[1]);
    // const mimeString = image.split(',')[0].split(':')[1].split(';')[0];

    // const arrayBuffer = new ArrayBuffer(byteString.length);
    // const uintArray = new Uint8Array(arrayBuffer);

    // for (let i = 0; i < byteString.length; i++) {
    //   uintArray[i] = byteString.charCodeAt(i);
    // }

    // const blob = new Blob([arrayBuffer], { type: mimeString });
    // const file = new File([blob], 'image.png', { type: mimeString });
    // const formData = new FormData();
    // formData.append('image', file);

    // try {
    //   const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/art/upload`, { id: artId, image: formData, description: description }, { headers: { 'Content-Type': 'application/json' } });

    //   if (response.status === 201) {
    //     // ai 호출
    //     const imgUrl = response.data.imagePath;
    //     const response1 = await axios.post(
    //       `${import.meta.env.VITE_SERVER_URL}/art/send-detection`,
    //       { imagePath: imgUrl, keyword: keywords[art?.questionIdx!] },
    //       { headers: { 'Content-Type': 'application/json' } }
    //     );

    //     if (response1.status == 201) {
    //       if (art?.questionIdx === 6) {
    //         navigate('/egg');
    //       }
    //       navigate('/');
    //     } else {
    //       setImgError('질문과 연관된 사진을 찍으세요!');
    //     }
    //   }
    //   navigate('/');
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
    navigate('/');
  };

  /* 카메라 관련 */
  const [image, setImage] = useState<string | null>(null);
  const [isShowCamera, setIsShowCamera] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCameraClick = () => {
    setIsShowCamera(true);
  };

  useEffect(() => {
    if (isShowCamera && videoRef.current) {
      const constraints = { video: true, audio: false };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          if (videoRef) {
            videoRef.current!.srcObject = stream;
          }
        })
        .catch(error => {
          console.error('Error accessing camera:', error);
        });
    }
  }, [isShowCamera]);

  const handleCaptureClick = () => {
    if (videoRef) {
      videoRef.current!.pause();
      saveImage();
    }
  };

  const saveImage = () => {
    // 1. canvas Element 생성
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current!.videoWidth;
    canvas.height = videoRef.current!.videoHeight;

    // 2. canvas에 video 이미지 그리기
    const context = canvas.getContext('2d');
    if (context != null) {
      context.drawImage(videoRef.current!, 0, 0);
    }

    // 3. canvas 를 Data URL로 변경
    const dataUrl = canvas.toDataURL('image/png');

    // 4. Image 저장
    setImage(dataUrl);

    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      videoRef.current!.srcObject = null;
    }

    setIsShowCamera(false);
  };

  return isShowCamera ? (
    <Layout>
      <video ref={videoRef} autoPlay={true} style={{ objectFit: 'cover', height: '874px' }}></video>
      <button
        onClick={handleCaptureClick}
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '10',
        }}
      >
        <FaCircle size={64} color="var(--primary)" style={{ boxShadow: 'var(--shadow' }} />
      </button>
    </Layout>
  ) : (
    <Layout className="layout">
      <QuestContainer content={questions[art?.questionIdx!]} />
      <Spacer height={40} />

      <p className="title self-start" color="var(--black)">
        사진을 찍어주세요
      </p>
      <Spacer height={16} />

      {art?.imagePath ? (
        <img
          src={art.imagePath}
          className="flex justify-center items-center"
          style={{
            width: '354px',
            height: '354px',
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : image ? (
        <button
          onClick={handleCameraClick}
          className="flex justify-center items-center"
          style={{
            width: '354px',
            height: '354px',
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: 0,
          }}
        />
      ) : (
        <button
          onClick={handleCameraClick}
          className="flex justify-center items-center"
          style={{
            width: '354px',
            height: '354px',
            backgroundColor: 'var(--primary-container)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <FaCamera size={64} color="var(--primary)" />
        </button>
      )}
      <p className="sub-body self-start" style={{ color: 'red' }}>
        {imgError}
      </p>
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

      {art?.imagePath ? <div /> : <CustomButton text="저장" onClick={handleSaveClick} />}
    </Layout>
  );
};

export default ArtPage;
