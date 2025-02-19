import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Summary = lazy(() => import('@/components/SummaryComponent/SummaryListPage'));

const SummaryMasterListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <Summary />
        </Suspense>
    );
};

export default SummaryMasterListPage;