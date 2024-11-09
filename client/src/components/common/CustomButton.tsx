import { Button } from 'antd';

interface CustomButtonProps {
  text: string;
  onClick: () => Promise<void> | (() => void);
}

export default function CustomButton({ text, onClick }: CustomButtonProps) {
  return (
    <Button
      type="primary"
      onClick={onClick}
      style={{
        height: '48px',
        width: '354px',
        backgroundColor: 'var(--primary)',
        borderRadius: '10px',
        boxShadow: 'var(--shadow)',
      }}
    >
      <span className="subtitle" style={{ color: 'white' }}>
        {text}
      </span>
    </Button>
  );
}
