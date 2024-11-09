import { useState, useEffect } from 'react';

interface TextContainerProps {
  content: string;
  animate?: boolean; // animate는 선택적 prop으로 수정
}

export default function QuestContainer({ content, animate = false }: TextContainerProps) {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    if (!animate) {
      setDisplayedContent(content);
      return;
    } // animate가 false일 경우 애니메이션 실행 안 함

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < content.length - 1) {
        setDisplayedContent(prev => prev + content[index]);
        index++;
      } else {
        clearInterval(intervalId); // 모든 문자가 표시되면 interval 종료
      }
    }, 100); // 한 글자씩 나타내는 시간 (100ms)

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 정리
  }, [content, animate]); // animate가 변경될 때마다 애니메이션 실행

  return (
    <div
      style={{
        width: '354px',
        height: '140px',
        padding: '16px',
        backgroundColor: 'var(--primary-container)',
        borderRadius: '10px',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <p className="title" style={{ color: 'var(--black)' }}>
        {displayedContent}
      </p>
    </div>
  );
}

// animate 기본값을 false로 설정
QuestContainer.defaultProps = {
  animate: false,
};
