import { Line } from "react-chartjs-2";
import dashboardData from "./data.json";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OutletHeader from "../layout/OutletHeader";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      display: false, // This hides the legend
    },
  },
};
const dataLinearChart = {
  labels: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],

  datasets: [
    {
      label: "Steps",
      data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
      lineTension: 0,
      backgroundColor: "transparent",
      borderColor: "#007bff",
      borderWidth: 4,
      pointBackgroundColor: "#007bff",
    },
  ],
};
interface DashboardData {
  total_sales: number;
  total_orders: number;
  total_customers: number;
  revenue_growth: string;
  active_users: number;
  new_signups: number;
  refunds_issued: number;
}
interface Props {
  dashboardData: DashboardData[];
}
const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData[]>([]);

  useEffect(() => {
    // Simulate fetching data or load from JSON
    setData([dashboardData.dashboard]);
  }, []);
  const DisplayData: React.FC<Props> = ({ dashboardData }) => {
    return (
      <>
        {dashboardData.map((info: DashboardData, index) => (
          <tr key={index}>
            <td>{info.total_sales}</td>
            <td>{info.total_orders}</td>
            <td>{info.total_customers}</td>
            <td>{info.revenue_growth}</td>
            <td>{info.active_users}</td>
            <td>{info.new_signups}</td>
            <td>{info.refunds_issued}</td>
          </tr>
        ))}
      </>
    );
  };
  return (
    <>
      <OutletHeader header={"Dashboard"} showButton={true}></OutletHeader>
      <Line
        className="my-4 w-100"
        width="900"
        height="380"
        options={options}
        data={dataLinearChart}
      />

      <h2>Section title</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Total Sales</th>
              <th scope="col">Total Orders</th>
              <th scope="col">Total Customers</th>
              <th scope="col">Revenue Growth</th>
              <th scope="col">Active Users</th>
              <th scope="col">New Signups</th>
              <th scope="col">Refunds Issued</th>
            </tr>
          </thead>
          <tbody>
            <DisplayData dashboardData={data} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
