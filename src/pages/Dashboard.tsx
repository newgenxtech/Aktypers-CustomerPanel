// src/components/Dashboard.tsx
import React, { useMemo, Suspense } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "@/styles/Dashboard.css";
import { useSelector } from "react-redux";
import { WareHouseData } from "@/Interfaces/interface";
import {
  useGetTruckData,
  useGetDriverData,
  useGetTyreData,
  useGetInvoiceData,
} from "@/hooks/GetHooks";
import { DatePicker, Spin } from "antd";
import { TyreChart } from "@/components/DashboardComponent/TyreChart";
import { TyreTable } from "@/components/DashboardComponent/TyreTable";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const Sum = (arr: WareHouseData[]): number => {
  return arr.reduce((total, warehouse) => total + warehouse.space_available, 0);
};

const Dashboard: React.FC = () => {
  const data = useSelector(
    (state: { warehouse: { data: WareHouseData[] } }) => state.warehouse.data,
  );

  const { data: truckData } = useGetTruckData(
    localStorage.getItem("customer_id") || "",
  );
  const { data: driverData } = useGetDriverData(
    localStorage.getItem("customer_id") || "",
  );

  const { data: tyresData } = useGetTyreData();

  const { data: InvoiceData } = useGetInvoiceData();

  // Prepare chart data for Bar chart (Space availability by city)
  const cities = [...new Set(data.map((warehouse) => warehouse.city))];
  const spaceByCity = cities.map((city) =>
    Sum(data.filter((warehouse) => warehouse.city === city)),
  );

  const barData = {
    labels: cities,
    datasets: [
      {
        label: "Space Available (sq. ft.)",
        data: spaceByCity,
        backgroundColor: "#42a5f5",
        borderWidth: 1,
      },
    ],
  };

  const totalTrucks = useMemo(() => {



    return truckData?.body.length || 0;
  }, [truckData]);
  const totalDrivers = useMemo(
    () => driverData?.body.length || 0,
    [driverData],
  );

  console.log('====================================');
  console.log(InvoiceData);
  console.log('====================================');
  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-2">
          {/* <span>Jan 01, 2023 - Sep 23, 2024</span> */}
          <DatePicker.RangePicker
            className="py-2 w-full md:w-auto"
            allowClear
          />
          <button
            onClick={() => {
              alert("This feature is not available yet");
            }}
            className="download-button"
          >
            Download
          </button>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="metrics-row">
        <Suspense fallback={<Spin size="large" />}>
          <div className="metric-card">
            <h2>Total Drivers</h2>
            <p className="text-2xl font-bold">{totalDrivers}</p>
          </div>
        </Suspense>
        <Suspense fallback={<Spin size="large" />}>
          <div className="metric-card">
            <h2>Total Trucks</h2>
            <p className="text-2xl font-bold">{totalTrucks}</p>
          </div>
        </Suspense>
        <Suspense fallback={<Spin size="large" />}>
          <div className="metric-card">
            <h2>Total Tyres</h2>
            <p className="text-2xl font-bold">{tyresData?.body.length ?? []}</p>
          </div>
        </Suspense>
      </div>

      {/* Overview Cards
      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card">
            <h2 className="text-gray-500 text-sm">Old tyres</h2>
            <p className="text-2xl font-bold">
              {tyresData?.body.filter((tyre) => tyre.is_old).length ?? []}
            </p>
          </div>
          <div className="metric-card">
            <h2 className="text-gray-500 text-sm">Replaced This Month</h2>
            <p className="text-2xl font-bold">10</p>
          </div>
        </div>
      </div> */}

      {/* Charts and List Section */}
      <div className="chart-and-list">
        {/* Bar Chart */}
        <div className="chart-container">
          <h3>Space Availability by City</h3>
          <Suspense fallback={<Spin size="large" />}>
            <Bar
              data={barData}
              width={window.innerWidth < 768 ? "100%" : undefined}
              height={window.innerWidth < 768 ? "100%" : undefined}
            />
          </Suspense>
        </div>

        {/* Recent Warehouse Activity */}
        <div className="recent-activity">
          <h3>
            {/* Top Warehouses by Space */}
            Pending Inovices
          </h3>

          <Suspense fallback={<Spin size="large" />}>
            <ul>
              {InvoiceData &&
                InvoiceData.length > 0 &&
                InvoiceData.filter((invoice: {
                  Credit: number,
                  Date: string,
                  Invoiceid: string,
                  Particulars: string
                }) => invoice.Credit !== 0).map((invoice, index) => {
                  const today = new Date();
                  const invoiceDate = new Date(invoice.Date);
                  const overdueDays = Math.floor(
                    (today.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <li
                      key={index}
                      className="p-4 rounded-lg mb-2 flex justify-between items-center hover:shadow-md transition-shadow duration-300"
                    >
                      <div>
                        <div className="mb-1">
                          <span className="text-sm text-gray-500">Invoice ID:</span>
                          <span className="ml-1 text-lg font-bold text-blue-600">
                            {invoice.Invoiceid ?? "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-base font-semibold">{invoice.Particulars}</span>
                          <span className="ml-2 text-sm text-gray-400">{invoice.Date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{invoice.Credit}</div>
                        <div className="mt-1">
                          {overdueDays > 0 ? (
                            <span className="text-red-500 text-sm">
                              Overdue by {overdueDays} day{overdueDays > 1 ? "s" : ""}
                            </span>
                          ) : (
                            <span className="text-green-500 text-sm">No overdue</span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Suspense>
        </div>
      </div>

      {/* Chart Section */}
      <div className="my-6">
        <TyreChart />
      </div>

      {/* Table Section */}
      <div className="my-6">
        <TyreTable />
      </div>
    </div>
  );
};

export default Dashboard;
