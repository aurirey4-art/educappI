import React from 'react';

const BugIcon: React.FC<{width?: number, height?: number}> = ({width=24, height=24}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h-4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
    <path d="m19 16-3 3 3 3" />
    <path d="m16 19 3-3-3-3" />
    <path d="M12 16h-4" />
    <path d="M12 12h-4" />
    <path d="M16 8h-4" />
    <path d="M4 8h2" />
    <path d="M4 12h2" />
    <path d="M4 16h2" />
  </svg>
);

export default BugIcon;
