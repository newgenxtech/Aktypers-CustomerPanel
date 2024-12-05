import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const TyrePressureContent = lazy(() => import('@/components/TyrePressure/TyrePressureContent'));

const TyrePressure: React.FC = () => {
    return (
        <Suspense fallback={<Spin size="large" className="loader" />}>
            <TyrePressureContent />
        </Suspense>
    );
};

export default TyrePressure;
