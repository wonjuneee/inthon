interface SpacerProps {
  height: number;
}

const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <div style={{ height: `${height}px` }} />;
};

export default Spacer;
