import { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Sidebar.css';  // Link to the CSS file

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className="sidebar-header">
                <h1 className={`sidebar-title ${isOpen ? 'show' : 'hide'}`}>Digital Warehouse</h1>
                <button onClick={toggleSidebar} className="toggle-button">
                    <span className="toggle-line"></span>
                    <span className="toggle-line"></span>
                </button>
            </div>
            <nav className="sidebar-nav">
                <Link to="/" className="sidebar-link">
                    <img src="https://img.icons8.com/ios/50/000000/warehouse.png" alt="warehouse" className="icon" />
                    <span className={`link-text ${isOpen ? 'show' : 'hide'}`}>Dashboard</span>
                </Link>
                <Link to="/contracts" className="sidebar-link">
                    <img src="https://img.icons8.com/ios/50/000000/contract.png" alt="contract" className="icon" />
                    <span className={`link-text ${isOpen ? 'show' : 'hide'}`}>Contracts</span>
                </Link>
                <Link to="/inventory" className="sidebar-link">
                    <img src="https://img.icons8.com/ios/50/000000/box.png" alt="box" className="icon" />
                    <span className={`link-text ${isOpen ? 'show' : 'hide'}`}>Inventory</span>
                </Link>
                <Link to="/billing" className="sidebar-link">
                    <img src="https://img.icons8.com/ios/50/000000/money.png" alt="money" className="icon" />
                    <span className={`link-text ${isOpen ? 'show' : 'hide'}`}>Billing</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
