type TagProps = {
  tech: string;
  onClick?: () => void;
};

const Tag = ({ tech, onClick }: TagProps) => {
  return (
    <div 
      className="inline-flex items-center px-3 py-1 rounded-full bg-tag-bg-light dark:bg-tag-bg-dark text-text-light dark:text-text-dark text-sm font-medium transition-all hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <span>{tech}</span>
    </div>
  );
};

export default Tag;