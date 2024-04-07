import { ReactNode } from "react";

export interface ButtonProps
{
    children: ReactNode,
    variant: string,
    onClick: (e)=>{},
    classNames: string[];
}

const Button = ({ children, variant, onClick, classNames }: ButtonProps) => {
  let buttonClasses = `px-4 py-2 rounded-md ${classNames?.join(' ')}`;
  if (variant === 'primary') {
    buttonClasses += ' bg-blue-500 text-white hover:bg-blue-600';
  } else if (variant === 'secondary') {
    buttonClasses += ' bg-gray-500 text-white hover:bg-gray-600';
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;



