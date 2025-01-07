import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const Insurance = lazy(() => import('@/components/InsuranceComponent/InsuranceMasterListPage'));

const InsuranceMasterListPage: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <Insurance />
        </Suspense>
    );
};

export default InsuranceMasterListPage;