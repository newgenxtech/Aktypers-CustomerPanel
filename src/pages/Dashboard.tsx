// src/components/Dashboard.tsx
import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import '@/styles/Dashboard.css';
import { useSelector } from 'react-redux';
import { WareHouseData } from '@/Interfaces/interface';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const quickSort = (arr: WareHouseData[], sortDirection: string): WareHouseData[] => {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const leftArr: WareHouseData[] = [];
    const rightArr: WareHouseData[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i].space_available < pivot.space_available) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    if (sortDirection === 'asc') {
        return [...quickSort(leftArr, sortDirection), pivot, ...quickSort(rightArr, sortDirection)];
    } else {
        return [...quickSort(rightArr, sortDirection), pivot, ...quickSort(leftArr, sortDirection)];
    }


};

const Sum = (arr: WareHouseData[]): number => {
    return arr.reduce((total, warehouse) => total + warehouse.space_available, 0);
}



const Dashboard: React.FC = () => {

    const data = useSelector((state: { warehouse: { data: WareHouseData[] } }) => state.warehouse.data);
    console.log(data);
    // Prepare chart data for Bar chart (Space availability by city)
    const cities = [...new Set(data.map((warehouse) => warehouse.city))];
    const spaceByCity = cities.map((city) =>
        Sum(data.filter((warehouse) => warehouse.city === city))
    );

    const barData = {
        labels: cities,
        datasets: [
            {
                label: 'Space Available (sq. ft.)',
                data: spaceByCity,
                backgroundColor: '#42a5f5',
                borderWidth: 1,
            },
        ],
    };

    // Memoize the calculations
    const totalWarehouses = useMemo(() => data.length, [data]);
    const totalSpaceAvailable = useMemo(
        () => Sum(data),
        [data]
    );
    const liveWarehouses = useMemo(
        () => data.filter((warehouse) => warehouse.is_live).length,
        [data]
    )
    const registeredWarehouses = useMemo(
        () => data.filter((warehouse) => warehouse.is_registered).length,
        [data]
    )

    return (
        <div className="dashboard">
            {/* Dashboard Header */}
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <div className="date-picker">
                    <span>Jan 01, 2023 - Sep 23, 2024</span>
                    <button className="download-button">Download</button>
                </div>
            </header>

            {/* Metrics Row */}
            <div className="metrics-row">
                <div className="metric-card">
                    <h2>Total Warehouses</h2>
                    <p>{totalWarehouses}</p>
                </div>
                <div className="metric-card">
                    <h2>Total Space Available</h2>
                    <p>{totalSpaceAvailable} sq. ft.</p>
                </div>
                <div className="metric-card">
                    <h2>Live Warehouses</h2>
                    <p>{liveWarehouses}</p>
                </div>
                <div className="metric-card">
                    <h2>Registered Warehouses</h2>
                    <p>{registeredWarehouses}</p>
                </div>
            </div>

            {/* Charts and List Section */}
            <div className="chart-and-list">
                {/* Bar Chart */}
                <div className="chart-container">
                    <h3>Space Availability by City</h3>
                    <Bar
                        data={barData}
                        width={
                            // on mobile devices, the chart width should be smaller
                            window.innerWidth < 768 ? "100%" : undefined
                        }
                        height={
                            // on mobile devices, the chart height should be smaller
                            window.innerWidth < 768 ? "100%" : undefined
                        }
                    />
                </div>

                {/* Recent Warehouse Activity */}
                <div className="recent-activity">
                    <h3>Top Warehouses by Space</h3>
                    <ul>
                        {data && data.length > 0 &&
                            quickSort(data, 'desc').splice(0, 8).
                                map((warehouse, index) => (
                                    <li key={index}>
                                        <div className="warehouse-details">
                                            <span className="warehouse-name">{warehouse.name}</span>
                                            <span>{warehouse.city}</span>
                                        </div>
                                        <span className="space-available">{warehouse.space_available.toLocaleString()} sq. ft.</span>
                                    </li>
                                ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
