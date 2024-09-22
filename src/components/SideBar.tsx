import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Package, Warehouse, ShoppingCart, CreditCard } from "lucide-react";
import WareHouseIcon from '@/assets/icons8-warehouse-96.png';
import DocsIcon from '@/assets/icons8-open-book-96.png';
import Logo from '@/assets/logo.png';
import '@/styles/SideBar.css';


type MenuItem = {
    label: string;
    icon?: React.ReactNode;
    path: string;
};

const menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <Home /> },
    { label: 'Product', path: '/product', icon: <Package /> },
    { label: 'Warehouse', path: '/warehouse', icon: <Warehouse /> },
    // { label: 'Purchaser', path: '/purchaser' },
    // { label: 'Contracts', path: '/contracts' },
    // { label: 'RFP', path: '/rfp' },
    // { label: 'WRO', path: '/wro' },
    // { label: 'Inventory', path: '/inventory' },
    { label: 'Order', path: '/order', icon: <ShoppingCart /> },
    // { label: 'Work Order', path: '/work-order' },
    { label: 'Billing', path: '/billing', icon: <CreditCard /> },
];

const Sidebar = () => {
    const naviagte = useNavigate();

    const [active, setActive] = useState<string>('home');
    const [activeItem, setActiveItem] = useState<string>('/warehouse');

    const handleItemClick = (path: string) => {
        setActiveItem(path);
        naviagte(path);
    };


    const handleIconClick = (icon: string) => {
        setActive(icon);
        console.log(`${icon} icon clicked`);
        // You can add functionality to navigate or perform actions here
    };

    return (
        <>
            <div className="sidebar-parent">
                <header>
                    <img src={Logo} alt="dashboard" className="logo" style={{
                        width: '50%',
                        marginLeft: '1rem',
                        marginBottom: '2rem',
                    }} />
                    <div
                        className={`sidebar-parent-icon ${active === 'home' ? 'active' : ''}`}
                        onClick={() => handleIconClick('home')}
                    >
                        <img src={WareHouseIcon} alt="dashboard" style={{
                            width: '25px',
                            height: '25px',
                        }} />
                    </div>
                    <div
                        className={`sidebar-parent-icon ${active === 'file' ? 'active' : ''}`}
                        onClick={() => handleIconClick('file')}
                    >
                        <i className="fas fa-file"></i> {/* Replace with file icon */}
                    </div>
                    <div
                        className={`sidebar-parent-icon ${active === 'user' ? 'active' : ''}`}
                        onClick={() => handleIconClick('user')}
                    >
                        <i className="fas fa-user"></i> {/* Replace with user icon */}
                    </div>
                </header>
                <footer>
                    <a href='https://stockarea.io/quick-guides' target="_blank">
                        <img src={DocsIcon} alt="docs" className="icon" style={{
                            width: '30px',
                            height: '30px',
                            marginBottom: '1rem',
                            marginLeft: '1.2rem',
                        }} />
                    </a>

                </footer>
            </div>
            <div className="sidebar">
                <p className="sidebar-title">Digital Warehouse</p>
                <ul className="menu-list">
                    {menuItems.map((item) => (
                        <li
                            key={item.path}
                            className={`menu-item ${activeItem === item.path ? 'active' : ''}`}
                            onClick={() => handleItemClick(item.path)}
                        >
                            {item.icon && <span className="menu-icon">{item.icon}</span>}
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
                {/* <div className="get-started">
                    <p>Follow this step-by-step guide to get on board with Digital Warehouse.</p>
                    <button className="start-setup-btn">Start Setup</button>
                </div> */}
            </div>
        </>
    );
};

export default Sidebar;
