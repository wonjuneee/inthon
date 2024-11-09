import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface TextContainerProps {
  content: string;
}

export default function QuestContainer({ content }: TextContainerProps) {
  return (
    <div style={{ width: '354px', height: '140px', padding: '16px', backgroundColor: '#F2F6F0', borderRadius: '8px', boxShadow: '0px 0px 16px rgba(37, 37, 37, 0.1)' }}>
      <Text className="title">{content}</Text>
    </div>
  );
}
