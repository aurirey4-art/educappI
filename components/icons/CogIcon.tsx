import React from 'react';

const CogIcon: React.FC<{width?: number, height?: number}> = ({width=24, height=24}) => (
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
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    <path d="M12 2v2" />
    <path d="M12 22v-2" />
    <path d="m17 20.66-1-1.73" />
    <path d="m7 3.34 1 1.73" />
    <path d="m22 12h-2" />
    <path d="M4 12H2" />
    <path d="m20.66 7-1.73 1" />
    <path d="m3.34 17 1.73-1" />
  </svg>
);

export default CogIcon;
