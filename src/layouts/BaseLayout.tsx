import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import '@/styles/BaseLayout.css';
import BreadCrumb from '@/components/BreadcrumbComponent';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { message } from 'antd';

const BaseLayout: React.FC = () => {
    const [mainContentRef] = useAutoAnimate();
    const navigate = useNavigate();

    if (!localStorage.getItem('jwt')) {
        message.error('Unauthorized please login agian....');
        navigate('/auth/login');
    }

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