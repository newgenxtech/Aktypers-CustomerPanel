import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const CompliantListPageContent = lazy(() => import('@/components/CompliantComponent/CompliantListPage'));

const CompliantListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <CompliantListPageContent />
        </Suspense>
    );
};

export default CompliantListPage;
