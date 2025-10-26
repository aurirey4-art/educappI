import React from 'react';

const PresentationChartLineIcon: React.FC<{width?: number, height?: number}> = ({width=24, height=24}) => (
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
    <path d="M6 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2" />
    <path d="M12 11h.01" />
    <path d="M15.5 14h.01" />
    <path d="M8.5 14h.01" />
    <path d="M7 17h10" />
    <path d="M12 3v2" />
    <path d="m8 11 4-4 4 4" />
  </svg>
);

export default PresentationChartLineIcon;
