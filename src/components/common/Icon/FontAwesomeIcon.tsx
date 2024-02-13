import React from 'react';
import * as icons from 'react-icons/fa';

export type FontAwesomeIconName = keyof typeof icons;

export interface FontAwesomeIconProps {
    icon: FontAwesomeIconName;
    className?: string;
    'data-testid'?: string;
}

const FontAwesomeIcon = ({ icon, className = '', 'data-testid': testId }: FontAwesomeIconProps) => {
    const IconTag = icons[icon];

    return <IconTag className={className} data-testid={testId} />;
}

export default FontAwesomeIcon;