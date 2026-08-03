import React from 'react';
import './SkipNav.css';

interface SkipNavProps {
  targetId: string;
  label?: string;
}

export const SkipNav = ({
  targetId,
  label = 'Skip to main content',
}: SkipNavProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);

    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();

      // Remove tabindex after blur so it doesn't
      // interfere with normal page tab order
      target.addEventListener(
        'blur',
        () => target.removeAttribute('tabindex'),
        { once: true }
      );
    }
  };

return (
    
      <a href={`#${targetId}`}
      className="skip-nav"
      onClick={handleClick}
    >
      {label}
    </a>
  )};