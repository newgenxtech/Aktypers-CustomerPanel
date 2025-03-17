import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Profile = lazy(() => import('@/components/ProfileComponent/ProfileListPage'));

const ProfileMasterListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <Profile />
        </Suspense>
    );
};

export default ProfileMasterListPage;