import React, { useState } from 'react';

interface Option {
  id: string;
  title: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  classNames?: string[];
}

const ReactDropdown: React.FC<DropdownProps> = ({ options, onSelect, classNames = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${classNames.join(' ')}`}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="px-2">Move to:</p>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-200"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-600" aria-labelledby="dropdownDefaultButton">
            {options.map((option) => (
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