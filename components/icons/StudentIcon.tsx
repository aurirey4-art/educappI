import React from 'react';

const StudentIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-brand-accent"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20v2H6.5a2.5 2.5 0 0 1 0 5H20v2H6.5A2.5 2.5 0 0 1 4 19.5z" />
    <path d="M12 2v13" />
    <path d="M19 15V2l-7 4-7-4v13" />
  </svg>
);

export default StudentIcon;