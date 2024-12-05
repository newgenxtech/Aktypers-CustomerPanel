import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const DriverListPageContent = lazy(() => import('@/components/DriverComponent/DriverListPage'));

const DriverListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <DriverListPageContent />
        </Suspense>
    );
};

export default DriverListPage;
