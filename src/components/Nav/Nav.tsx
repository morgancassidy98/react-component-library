import React, { useState } from 'react';
import './Nav.css';

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

interface NavBrandProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

interface NavItemsProps {
  children: React.ReactNode;
  className?: string;
}

interface NavItemProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface NavActionsProps {
  children: React.ReactNode;
  className?: string;
}

// ── Sub-components ──

const NavBrand = ({ href = '/', children, className }: NavBrandProps) => (
  <a
    href={href}
    className={['nav__brand', className ?? ''].filter(Boolean).join(' ')}
  >
    {children}
  </a>
);

const NavItems = ({ children, className }: NavItemsProps) => (
  <ul
    className={['nav__items', className ?? ''].filter(Boolean).join(' ')}
    role="list"
  >
    {children}
  </ul>
);

const NavItem = ({
  href,
  active = false,
  disabled = false,
  children,
  className,
}: NavItemProps) => (
  <li className="nav__item-wrapper">
    
     <a href={disabled ? undefined : href}
      className={[
        'nav__item',
        active ? 'nav__item--active' : '',
        disabled ? 'nav__item--disabled' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </a>
  </li>
);

const NavActions = ({ children, className }: NavActionsProps) => (
  <div
    className={['nav__actions', className ?? ''].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

// ── Main Nav Component ──

export const Nav = ({ children, className, ...rest }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={['nav-header', className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <nav
        className="nav"
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          {/* Render brand separately from other children */}
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            if (child.type === NavBrand) return child;
            return null;
          })}

          {/* Mobile toggle */}
          <button
            className={['nav__toggle', isOpen ? 'nav__toggle--open' : ''].filter(Boolean).join(' ')}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="nav-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>

          {/* Nav menu — items + actions */}
          <div
            id="nav-menu"
            className={['nav__menu', isOpen ? 'nav__menu--open' : ''].filter(Boolean).join(' ')}
          >
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;
              if (child.type === NavBrand) return null;
              return child;
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

// Attach sub-components
Nav.Brand   = NavBrand;
Nav.Items   = NavItems;
Nav.Item    = NavItem;
Nav.Actions = NavActions;