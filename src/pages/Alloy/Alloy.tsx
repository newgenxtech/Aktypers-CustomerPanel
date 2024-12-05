import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const AlloyListPageContent = lazy(() => import('@/components/AlloyComponent/AlloyListPage'));

const AlloyListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <AlloyListPageContent />
        </Suspense>
    );
};

export default AlloyListPage;
