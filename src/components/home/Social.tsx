const Social = () => {
  return (
    <div className="grid grid-cols-[max-content] col-start-1 col-end-2 row-start-1 row-end-2 gap-4 lg:flex lg:gap-4 lg:items-start lg:col-start-3 lg:col-end-4">
      <a
        href="https://github.com/jonasanders1"
        className="text-[1.5rem] text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <i className="uil uil-github"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/jonas-andersen-65a335262/"
        className="text-[1.5rem] text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <i className="uil uil-linkedin"></i>
      </a>
    </div>
  );
};

export default Social;