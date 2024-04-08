import React from 'react';
import { FaHistory } from 'react-icons/fa';
import { HistoryOfChangesBoard } from '../../types/Board';

export interface SidebarProps {
  history: HistoryOfChangesBoard[];
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ history, toggleSidebar }) => {
  return (
    <div style={{ width: "400px", backgroundColor: "#f0f0f0", borderLeft: "1px solid #ccc", position: "fixed", right: 0, top: 64, bottom: 0, zIndex: 999 }}>
      <button className="float-right mx-4 my-2 z-40" onClick={toggleSidebar}><FaHistory /></button>
      <br />
      <ul className="list-disc pl-5">
        {history.map((change, index) => (
          <li key={index}>{change.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;