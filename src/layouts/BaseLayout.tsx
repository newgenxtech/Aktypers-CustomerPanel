import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import '@/styles/BaseLayout.css';
import BreadCrumb from '@/components/BreadcrumbComponent';

const BaseLayout: React.FC = () => {
    return (
        <div className="base-layout">
            <SideBar />
            <div className="main-content">
                <BreadCrumb />
                <Outlet />
            </div>
        </div>
    );
};

export default BaseLayout;