import { Typography } from 'antd';

const { Text } = Typography;

interface TextContainerProps {
  content: string;
}

export default function QuestContainer({ content }: TextContainerProps) {
  return (
    <div style={{ width: '354px', height: '140px', padding: '16px', backgroundColor: 'var(--primary-container)', borderRadius: '10px', boxShadow: 'var(--shadow)' }}>
      <Text className="title">{content}</Text>
    </div>
  );
}
