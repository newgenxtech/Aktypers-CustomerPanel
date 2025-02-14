import React, { useMemo, Suspense } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from "chart.js";
import "@/styles/Dashboard.css";
import { useSelector } from "react-redux";
import { WareHouseData } from "@/Interfaces/interface";
import {
  useGetTruckData,
  useGetDriverData,
  useGetTyreData,
  useGetPaymentAnalytics,
  useGetTyreAnalytics,
} from "@/hooks/GetHooks";
import { DatePicker, Spin } from "antd";
import { TyreTable } from "@/components/DashboardComponent/TyreTable";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement);

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


  const {
    data: tyreAnalyticsData, isLoading: tyreAnalyticsLoading,
  } = useGetTyreAnalytics(localStorage.getItem("customer_id") || "");

  const {
    data: paymentAnalyticsData,
  } = useGetPaymentAnalytics(
    localStorage.getItem("customer_id") || "",
  )

  // Prepare chart data for Bar chart (Space availability by city)
  const cities = [...new Set(data.map((warehouse) => warehouse.city))];
  const spaceByCity = cities.map((city) =>
    Sum(data.filter((warehouse) => warehouse.city === city)),
  );

  // get Credit and Debit and then calculate the balance

  const balance = useMemo(() => {
    console.log(paymentAnalyticsData);
    let credit = 0;
    let debit = 0;
    paymentAnalyticsData?.body.flat().forEach((item) => {
      if (item.Credit) {
        credit += parseInt(item.Credit);
      }
      if (item.Debit) {
        debit += parseInt(item.Debit);
      }
    });
    return credit - debit;
  }, [paymentAnalyticsData]);

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
            <h2>Pending Balanace To Pay</h2>
            <p className="text-2xl font-bold">₹{balance}</p>
          </div>
        </Suspense>
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
            Overdue Insurance
          </h3>

          <Suspense fallback={<Spin size="large" />}>

          </Suspense>
        </div>
      </div>

      <Suspense fallback={<Spin size="large" />}>
        {
          !tyreAnalyticsLoading && tyreAnalyticsData && (
            <div className="my-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-[50vh] transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  Tyre Maintenance Trends
                </h2>
                <Pie
                  data={{
                    labels: Object.keys(tyreAnalyticsData?.analytics || {}),
                    datasets: [
                      {
                        label: "Tyre Status Distribution",
                        data: Object.values(tyreAnalyticsData?.analytics || {}),
                        backgroundColor: ["#ff4242", "#FF8042", "#00C49F"],
                        hoverBackgroundColor: ["#ff4242", "#FF8042", "#00C49F"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: true, text: "Tyre Maintenance Trends" },
                    },
                  }}
                  // Use a key based on your analytics data to force re‑mounting when data changes
                  key={JSON.stringify(tyreAnalyticsData?.analytics)}
                  redraw={true}
                />
              </div>
            </div>
          )
        }
      </Suspense>

      {/* Table Section */}
      <div className="my-6">
        <TyreTable />
      </div>
    </div>
  );
};

export default Dashboard;
