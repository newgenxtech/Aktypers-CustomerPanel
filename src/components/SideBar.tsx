import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Forklift, TruckIcon, Car, LifeBuoy, LogOut } from "lucide-react";
import WareHouseIcon from '@/assets/icons8-warehouse-96.png';
// import DocsIcon from '@/assets/icons8-open-book-96.png';
import AccountIcon from '@/assets/icons8-male-user-96.png';
// import Logo from '@/assets/logo.png';
import Logo from '@/assets/logo_for_my_company_name_ak_tyres_with_red_accent_color_in_a_realistic_style.png';

import HamburgerIcon from '@/assets/icons8-hamburger-120.png';
import '@/styles/SideBar.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';
// import { NavUser } from './nav-user';
import { message } from 'antd';
// import { motion, AnimatePresence } from "framer-motion"

type MenuItem = {
    label: string;
    icon?: React.ReactNode;
    path: string;
};

const menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: <Home /> },
    // { label: 'Product', path: '/product', icon: <Package /> },
    // { label: 'Warehouse', path: '/warehouse', icon: <Warehouse /> },
    // { label: 'Purchaser', path: '/purchaser' },
    // { label: 'Contracts', path: '/contracts' },
    // { label: 'RFP', path: '/rfp' },
    // { label: 'WRO', path: '/wro' },
    // { label: 'Inventory', path: '/inventory' },
    // { label: 'Order', path: '/order', icon: <ShoppingCart /> },
    // { label: 'Work Order', path: '/work-order' },
    // { label: 'Billing', path: '/billing', icon: <CreditCard /> },
    { label: 'Drvier', path: '/driver', icon: <Car /> },
    { label: 'Alloy', path: '/alloy', icon: <Forklift /> },
    {
        label: 'Truck',
        path: '/truck',
        icon: <TruckIcon />
    },
    {
        label: 'Type Pressure',
        path: '/type-pressure',
        icon: <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="8"></line>
        </svg>

    },
    {
        label: 'Tyres',
        path: '/tyres',
        icon: <LifeBuoy />
    }
];

const Sidebar = () => {
    const [parent] = useAutoAnimate();
    const naviagte = useNavigate();



    const [active, setActive] = useState<string>('home');
    const [activeItem, setActiveItem] = useState<string>(
        window.location.pathname === '/' ? '/dashboard' : `/${window.location.pathname.split('/')[1]}`
    );

    const [showMobileSidebar, setMobileSidebar] = useState<boolean>(false);
    const [showChildSidebar, setChildSidebar] = useState<boolean>(true);

    const handleItemClick = (path: string) => {
        setActiveItem(path);
        naviagte(path);
        setMobileSidebar(false)
    };

    const handleIconClick = useCallback((icon: string) => {
        setActive(icon);
        console.log(`${icon} icon clicked`);

        if (icon === 'home') {
            setChildSidebar((prev) => !prev);
        }
        // You can add functionality to navigate or perform actions here
    }, []);


    return (
        <>
            <div ref={parent}>
                <div className='sidebar-container'>
                    <div className="sidebar-parent">
                        <div className="sidebar-overlay">
                            <header className='sidebar-header'>
                                <img src={Logo} alt="dashboard" className="logo" />
                                <div
                                    className={`sidebar-parent-icon ${active === 'home' ? 'active' : ''}`}
                                    onClick={() => handleIconClick('home')}
                                >
                                    <img src={WareHouseIcon} alt="dashboard" style={{
                                        width: '25px',
                                        height: '25px',
                                        marginLeft: '0.650rem',
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
                            <footer className='sidebar-footer'>
                                {/* <a href='https://stockarea.io/quick-guides' target="_blank">
                                    <img src={DocsIcon} alt="docs" className="icon" style={{
                                        width: '30px',
                                        height: '30px',
                                        marginBottom: '1rem',
                                        marginLeft: '1.2rem',
                                    }} />
                                </a> */}
                                {/* <a href='https://stockarea.io' target="_blank">
                                    <img src={AccountIcon} alt="docs" className="icon" style={{
                                        width: '30px',
                                        height: '30px',
                                        marginBottom: '1rem',
                                        marginLeft: '1.2rem',
                                    }} />
                                </a> */}
                                {/* <NavUser
                                    user={{
                                        name: 'John Doe',
                                        email: '',
                                        avatar: 'https://avatars.dicebear.com/api/avataaars/john-doe.svg'
                                    }}
                                /> */}
                                <LogOut
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        marginBottom: '1rem',
                                        marginLeft: '1.2rem',
                                        cursor: 'pointer',
                                        color: 'white',
                                    }}
                                    onClick={
                                        () => {
                                            message.success("Logout Successful");
                                            localStorage.removeItem("VlimsToken")
                                            // window.location.href = "/auth/login"
                                            naviagte('/auth/login');
                                        }
                                    }
                                />
                            </footer>
                        </div>
                    </div>
                    {showChildSidebar && (
                        <div className={`sidebar`}>
                            <p className="sidebar-title">Digital Garage</p>
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

                        </div>
                    )}
                    {/* <AnimatePresence >
                        {showChildSidebar && (
                            <motion.nav className={`sidebar`}
                                initial={{ x: -300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={
                                    {
                                        ease: "easeInOut",

                                    }
                                }
                            >
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

                            </motion.nav>
                        )}
                    </AnimatePresence> */}
                </div>
                <div className='mobile-navbar'>
                    <div className='mobile-navbar-left'>
                        <div className='mobile-navbar-icon '>
                            <img src={HamburgerIcon} alt="dashboard" style={{
                                width: '25px',
                                height: '25px',
                                cursor: 'pointer',
                            }} className="mobile-navbar-logo" onClick={() => setMobileSidebar(!showMobileSidebar)} />
                        </div>
                    </div>
                    <div className='mobile-navbar-icon '>
                        <img src={Logo} alt="dashboard" className="mobile-navbar-logo"
                            onClick={
                                () => {
                                    handleItemClick('/warehouse');
                                    setActiveItem('/warehouse');
                                }
                            }

                        />
                    </div>
                    <div className='mobile-navbar-right'>
                        <div className='mobile-navbar-icon '>
                            <img src={AccountIcon} alt="docs" className="mobile-navbar-logo" style={{
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                            }} />
                        </div>
                    </div>
                </div>
                {
                    showMobileSidebar && (
                        <div className='mobile-sidebar'>
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
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default Sidebar;
