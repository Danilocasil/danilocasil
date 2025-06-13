import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const users = [
     { id: 1, firstname: 'Tyler', lastname: 'Blevins', age: 19, email: 'TylerBlevins@valorant.com' },
  { id: 2, firstname: 'Jett', lastname: 'Bladestorm', age: 16, email: 'JettBlade@valorant.com' },
  { id: 3, firstname: 'Olof', lastname: 'Kajbjer', age: 17, email: 'olofmeister@cs2.gg' },
  { id: 4, firstname: 'Phoenix', lastname: 'Firestarter', age: 23, email: 'phoenix@valorant.com' },
  { id: 5, firstname: 'Nikola', lastname: 'Kovač', age: 20, email: 'NiKo@cs2.gg' },
  { id: 6, firstname: 'Reyna', lastname: 'Duskborn', age: 69, email: 'reyna@valorant.com' },
  { id: 7, firstname: 'Mathieu', lastname: 'Herbaut', age: 14, email: 'ZywOo@cs2.gg' },
  { id: 8, firstname: 'Sova', lastname: 'Arrowhawk', age: 15, email: 'sova@valorant.com' },
  { id: 9, firstname: 'Marcelo', lastname: 'David', age: 18, email: 'coldzera@cs2.gg' },
  { id: 10, firstname: 'Viper', lastname: 'Toxic', age: 26, email: 'viper@valorant.com' },
];

  const totalUsers = users.length;
  const averageAge = (users.reduce((acc, curr) => acc + curr.age, 0) / totalUsers).toFixed(1);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "First Name", width: 150 },
    { field: "lastname", headerName: "Last Name", width: 150 },
    { field: "age", headerName: "Age", width: 110 },
    { field: "email", headerName: "Email", width: 220 },
  ];

  const pieData = [
    { id: 0, value: 40, label: "Aces" },
    { id: 1, value: 30, label: "Clutches" },
    { id: 2, value: 20, label: "Defuse" },
    { id: 3, value: 10, label: "Others" },
  ];

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="stat-box">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-box">
          <h3>Average Age</h3>
          <p>{averageAge}</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-box">
          <BarChart
            height={300}
            series={[
              { data: [35, 44, 24, 34], label: "Valorant Points", showLabel: true },
              { data: [51, 6, 49, 30], label: "Battlepass", showLabel: true },
              { data: [15, 25, 30, 50], label: "Valorant Skins", showLabel: true },
              { data: [60, 50, 15, 25], label: "Others", showLabel: true },
            ]}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
          />
        </div>

        <div className="chart-box">
          <PieChart
            height={300}
            series={[
              {
                outerRadius: 120,
                data: pieData,
                label: {
                  visible: true,
                  position: "inside",
                  formatter: ({ value }) => {
                    const percent = ((value / total) * 100).toFixed(1);
                    return `${value} (${percent}%)`;
                  },
                },
              },
            ]}
          />
        </div>
      </div>

      <div className="dashboard-table">
        <h3>Users Overview</h3>
          <div className="scrollable-table">
             <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
          </div>
      </div>
    </div>
  );
};

export default DashboardPage;
