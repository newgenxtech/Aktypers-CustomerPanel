import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const TyresMasterContent = lazy(() => import('@/components/TyresComponent/TyresComponent'));

const TyresMaster: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <TyresMasterContent />
        </Suspense>
    );
};

export default TyresMaster;