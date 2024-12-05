import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const TruckListPageContent = lazy(() => import('@/components/TruckComponent/TruckListPage'));

const TruckListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <TruckListPageContent />
        </Suspense>
    );
};

export default TruckListPage;
