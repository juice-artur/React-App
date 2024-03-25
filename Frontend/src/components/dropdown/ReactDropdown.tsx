import React, { ReactNode, useState } from 'react';

interface Option {
  id: string;
  title: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  classNames?: string[];
  children: ReactNode
}

const ReactDropdown: React.FC<DropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    props.onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${props.classNames?.join(' ')}`}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="inline-flex justify-center w-full rounded-md py-2 text-sm font-medium text-gray-700 "
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="px-2">{props.children}</p>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg  w-44 dark:bg-gray-200"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-600" aria-labelledby="dropdownDefaultButton">
            {props.options.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleOptionClick(option)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                >
                  {option.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReactDropdown;