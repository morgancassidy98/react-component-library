import React from 'react';
import './Card.css';

type CardVariant = 'default' | 'outlined' | 'elevated';

interface BaseCardProps {
  variant?: CardVariant;
  className?: string;
}

interface ClickableCardProps extends Omit<BaseCardProps, 'children'>, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  clickable: true;
  onClick?: () => void;
  children: React.ReactNode;
}

interface StaticCardProps extends BaseCardProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  clickable?: false;
  onClick?: never;
  children: React.ReactNode;
}

type CardProps = ClickableCardProps | StaticCardProps;

interface CardHeaderProps {
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

const CardHeader = ({ divider = false, className, children }: CardHeaderProps) => (
  <div className={['card__header', divider ? 'card__header--divider' : '', className ?? ''].filter(Boolean).join(' ')}>
    {children}
  </div>
);

const CardBody = ({ className, children }: CardBodyProps) => (
  <div className={['card__body', className ?? ''].filter(Boolean).join(' ')}>
    {children}
  </div>
);

const CardFooter = ({ className, children }: CardFooterProps) => (
  <div className={['card__footer', className ?? ''].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export const Card = ({
  variant = 'default',
  clickable = false,
  onClick,
  className,
  children,
  ...rest
}: CardProps) => {
  const classes = [
    'card',
    `card--${variant}`,
    clickable ? 'card--clickable' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (clickable) {
    return (
      <button
        className={classes}
        onClick={onClick}
        type="button"
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className={classes}
      {...(rest as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
};

// Attach sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;