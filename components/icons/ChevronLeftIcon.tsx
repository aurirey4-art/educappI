import React from 'react';

const ChevronLeftIcon: React.FC<{width?: number, height?: number}> = ({width=20, height=20}) => (
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
    className="text-gray-600"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default ChevronLeftIcon;
