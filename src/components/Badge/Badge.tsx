import React from 'react';
import './Badge.css';

type BadgeVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';
type BadgeShape = 'rounded' | 'square' | 'pill';

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    shape?: BadgeShape;
    children: React.ReactNode;
    className?: string;
}

export const Badge = ({
    variant = 'primary',
    size = 'medium',
    shape = 'rounded',
    children,
    className,
}: BadgeProps) => {
    const classes = [
        'badge',
        `badge--${variant}`,
        `badge--${size}`,
        `badge--${shape}`,
        className ?? '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
    <span className={classes}>{children}</span>
    );
}