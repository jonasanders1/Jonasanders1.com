import "./tag.css";

type TagProps = {
  tech: string;
  onClick?: () => void;
};

const Tag = ({ tech, onClick }: TagProps) => {
  return (
    <div className="tag" onClick={onClick}>
      <span className="tag__text">{tech}</span>
    </div>
  );
};

export default Tag;
