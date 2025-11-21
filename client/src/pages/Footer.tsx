import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          LifeCare Inc.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
