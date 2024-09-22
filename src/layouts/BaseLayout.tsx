import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import '@/styles/BaseLayout.css';
import BreadCrumb from '@/components/BreadcrumbComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const BaseLayout: React.FC = () => {
    const [mainContentRef] = useAutoAnimate();

    return (
        <div className="base-layout">
            <SideBar />
            <div className="main-content" ref={mainContentRef}>
                <BreadCrumb />
                <Outlet />
            </div>
        </div>
    );
};

export default BaseLayout;