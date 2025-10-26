import React from 'react';

const CollectionIcon: React.FC<{width?: number, height?: number}> = ({width=24, height=24}) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <polyline points="11 3 11 21" />
    <line x1="15" y1="3" x2="15" y2="21" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </svg>
);

export default CollectionIcon;
