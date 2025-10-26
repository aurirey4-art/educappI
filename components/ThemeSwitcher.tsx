import React from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SparklesIcon from './icons/SparklesIcon';

type Theme = 'light' | 'dark' | 'soft';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const themes: { name: Theme; icon: React.ReactNode }[] = [
  { name: 'light', icon: <SunIcon /> },
  { name: 'dark', icon: <MoonIcon /> },
  { name: 'soft', icon: <SparklesIcon /> },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex items-center p-1 bg-brand-background rounded-full border border-border-color">
      {themes.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setTheme(name)}
          className={`p-2 rounded-full transition-colors duration-300 ${
            currentTheme === name ? 'bg-brand-primary text-white' : 'text-text-muted hover:bg-brand-surface'
          }`}
          aria-label={`Activar tema ${name}`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;