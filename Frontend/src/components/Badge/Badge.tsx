import React, { ReactNode } from 'react';
interface DropdownProps {
    classNames?: string[];
    children: ReactNode
  }

const Badge: React.FC<DropdownProps> = ( props) => {


    return (
        
        <div
            className={`block float-left rounded-full bg-secondary-100  text-center align-baseline  font-bold leading-none ${props.classNames?.join(' ')} `}>
            {props.children}
        </div>
    );
};

export default Badge;