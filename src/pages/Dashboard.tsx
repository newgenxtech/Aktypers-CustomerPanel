import React, { useMemo, Suspense } from "react";
import { Bar } from "react-chartjs-2";
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
import {
  useGetTruckData,
  useGetDriverData,
  useGetTyreData,
  useGetPaymentAnalytics,
  useGetTyreAnalytics,
  useGetTruckIdsAndGroupByBrand,
  useGetInsuranceData,
  useGetComplaintsData,
  useGetTruckMakers,
  useGetTyreAnalyticsByCustomer,
  useGetAnalyticsByCustomer,
} from "@/hooks/GetHooks";
import { Spin } from "antd";
import InsuranceExpiryTable from "@/components/DashboardComponent/InsuranceExpiryTable";
import RecentComplaintsTable from "@/components/DashboardComponent/RecentComplaintsTable";
import TyreConditionTable from "@/components/DashboardComponent/TyreConditionTable";
import AktyrePurchasedTable from "@/components/DashboardComponent/AktyrePurchasedTable";
import TyresMaintainanceTable from "@/components/DashboardComponent/TyresMaintainanceTable";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, ArcElement);

const Dashboard: React.FC = () => {
  const { data: truckData } = useGetTruckData(
    localStorage.getItem("customer_id") || ""
  );
  const { data: driverData } = useGetDriverData(
    localStorage.getItem("customer_id") || ""
  );

  const { data: tyresData } = useGetTyreData();

  const {
    data: tyreAnalyticsData,
    isLoading: tyreAnalyticsLoading,
  } = useGetTyreAnalytics(localStorage.getItem("customer_id") || "");

  const { data: paymentAnalyticsData } = useGetPaymentAnalytics(
    localStorage.getItem("customer_id") || ""
  );

  const { data: insuranceData } = useGetInsuranceData(
    localStorage.getItem("customer_id") || ""
  );

  const { data: truckMakers } = useGetTruckMakers(
    localStorage.getItem("customer_id") || ""
  );

  const { data: truckIdsGroupByBrand } = useGetTruckIdsAndGroupByBrand(
    localStorage.getItem("customer_id") || ""
  );

  const { data: complaintsData } = useGetComplaintsData(
    localStorage.getItem("customer_id") || ""
  );

  const { data: tyreAnalyticsByCustomer } = useGetTyreAnalyticsByCustomer(
    localStorage.getItem("customer_id") || ""
  )

  const {
    data: analyticsByCustomer,
  } = useGetAnalyticsByCustomer(
    localStorage.getItem("customer_id") || ""
  );

  // Prepare chart data for Bar chart
  const makers = [
    ...new Set(truckMakers?.body.map((truck) => truck.make) || []),
  ];
  const makersCount = truckMakers?.body.map((truck) =>
    parseInt(truck.count)
  ) || [];

  // Calculate the balance
  const balance = useMemo(() => {
    let credit = 0;
    let debit = 0;
    paymentAnalyticsData?.body.flat().forEach((item) => {
      if (item.Credit) credit += parseInt(item.Credit);
      if (item.Debit) debit += parseInt(item.Debit);
    });
    return credit - debit;
  }, [paymentAnalyticsData]);

  const barData = {
    labels: makers,
    datasets: [
      {
        label: "Trucks",
        data: makersCount,
        backgroundColor: "#19305A",
        borderWidth: 1,
      },
    ],
  };

  const totalTrucks = useMemo(() => truckData?.body.length || 0, [truckData]);
  const totalDrivers = useMemo(
    () => driverData?.body.length || 0,
    [driverData]
  );

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        {/* <h1 className="text-2xl font-semibold">Dashboard</h1> */}
        {/* <div className="flex flex-col md:flex-row gap-2">
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
        </div> */}
      </header>

      {/* Metrics Row */}
      <div className="metrics-row">
        <Suspense fallback={<Spin size="large" />}>
          <div className="metric-card">
            <h2>Tyres purchased - AKTyres</h2>
            <p className="text-2xl font-bold">{analyticsByCustomer?.body.quantity.reduce((acc, item) => acc + (item.name), 0) ?? 0}</p>
          </div>
        </Suspense>
        <Suspense fallback={<Spin size="large" />}>
          <div className="metric-card">
            <h2>Pending Balance To Pay</h2>
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
            <p className="text-2xl font-bold">{tyresData?.body.length ?? 0}</p>
          </div>
        </Suspense>
      </div>

      {/* Charts and List Section */}
      <div className="chart-and-list">
        {/* Bar Chart */}
        <div className="chart-container">
          <h3>Truck Makers</h3>
          <Suspense fallback={<Spin size="large" />}>
            <Bar
              data={barData}
              width={window.innerWidth < 768 ? "100%" : undefined}
              height={window.innerWidth < 768 ? "100%" : undefined}
            />
          </Suspense>
        </div>

        {/* Tyres Brand Distribution */}
        <div className="chart-container">
          <h3>Tyres Brand Distribution</h3>
          <Suspense fallback={<Spin size="large" />}>
            <Bar
              data={{
                labels:
                  truckIdsGroupByBrand?.body.map(
                    (truck) => truck.tyre_brand
                  ) || [],
                datasets: [
                  {
                    label: "Tyres",
                    data:
                      truckIdsGroupByBrand?.body.map((truck) =>
                        parseInt(truck.tyre_count)
                      ) || [],
                    backgroundColor: "#EF8927",
                    borderWidth: 1,
                  },
                ],
              }}
              width={window.innerWidth < 768 ? "100%" : undefined}
              height={window.innerWidth < 768 ? "100%" : undefined}
            />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <Suspense fallback={<Spin size="large" />}>
          {!tyreAnalyticsLoading && tyreAnalyticsData && (
            <div className="my-6">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 h-[690px] transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Tyre Maintenance Trends
                </h2>
                <div className="w-full h-[550px]">
                  <Bar
                    data={{
                      labels: tyreAnalyticsByCustomer?.analytics?.map((item) => item.name) || [],
                      datasets: [{
                        label: 'Tyre Condition Distribution',
                        data: tyreAnalyticsByCustomer?.analytics?.map((item) => item.value) || [],
                        backgroundColor: [
                          'rgba(75, 192, 192, 0.6)',  // 100-80: Good (Green)
                          'rgba(255, 206, 86, 0.6)',  // 80-60: Warning (Yellow)
                          'rgba(255, 159, 64, 0.6)',  // 60-40: Caution (Orange)
                          'rgba(255, 99, 132, 0.6)',  // 40-20: Critical (Red)
                          'rgba(169, 169, 169, 0.6)'  // 20-0: Danger (Gray)
                        ],
                        borderWidth: 1,
                        borderColor: [
                          'rgb(75, 192, 192)',
                          'rgb(255, 206, 86)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 99, 132)',
                          'rgb(169, 169, 169)'
                        ]
                      }]
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Tyres'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top'
                        },
                        title: {
                          display: true,
                          text: 'Tyre Condition Distribution'
                        }
                      }
                    }}
                    width={window.innerWidth < 768 ? "100%" : undefined}
                    height={window.innerWidth < 768 ? "100%" : undefined}
                  />
                </div>
              </div>
            </div>
          )}
        </Suspense>
        <Suspense fallback={<Spin size="large" />}>
          {!tyreAnalyticsLoading && tyreAnalyticsData && (
            <TyresMaintainanceTable data={tyreAnalyticsData?.body} />
          )}
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        {complaintsData && (
          <RecentComplaintsTable data={complaintsData?.body} thresholdDays={60} />
        )}
        {complaintsData && (
          <AktyrePurchasedTable data={analyticsByCustomer?.body ?? {
            quantity: [],
            product: [],
            rate: []
          }} />
        )}

        {insuranceData && (
          <InsuranceExpiryTable data={insuranceData.body} thresholdDays={60} />
        )}

        {/* {
          !tyreAnalyticsLoading && tyreAnalyticsData && (
            <TyreConditionTable data={tyreAnalyticsData.body} />
          )
        } */}
      </div>
    </div>
  );
};

export default Dashboard;