const Footer = () => {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-container-light dark:bg-container-dark">
      <div className="container py-8 pb-12">
        <h1 className="text-center mb-4">Jonas Andersen</h1>

        <ul className="flex justify-center gap-6 mb-8">
          <li>
            <a href="#home" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Home
            </a>
          </li>

          <li>
            <a href="#projects" className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors">
              Projects
            </a>
          </li>
        </ul>

        <div className="flex justify-center gap-5">
          <a
            href="https://github.com/jonasanders1"
            className="text-[1.125rem] p-[0.4rem] rounded-lg inline-flex bg-text-light dark:bg-text-dark text-body-light dark:text-body-dark hover:bg-primary-light hover:dark:bg-primary-dark hover:text-body-light hover:dark:text-body-dark transition-colors xl:p-1 xl:rounded xl:text-base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bx bxl-github"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/jonas-andersen-65a335262/"
            className="text-[1.125rem] p-[0.4rem] rounded-lg inline-flex bg-text-light dark:bg-text-dark text-body-light dark:text-body-dark hover:bg-primary-light hover:dark:bg-primary-dark hover:text-body-light hover:dark:text-body-dark transition-colors xl:p-1 xl:rounded xl:text-base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
        <span className="block mt-[4.5rem] text-center text-smaller">
          Copyright &#169; 2025 Jonas Andersen. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;