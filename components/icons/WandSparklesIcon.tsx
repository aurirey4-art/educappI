import React from 'react';

const WandSparklesIcon: React.FC<{width?: number, height?: number}> = ({width=24, height=24}) => (
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
        <path d="m5 3-3 3 3 3 3-3-3-3zM19 13l-3 3 3 3 3-3-3-3zM3 19l3-3 3 3-3 3-3-3zM13 5l3 3-3 3-3-3 3-3z" />
        <path d="m21 21-8.5-8.5" />
    </svg>
);

export default WandSparklesIcon;
