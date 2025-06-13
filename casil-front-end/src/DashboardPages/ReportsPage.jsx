import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import '../styles/Reports.css';

const ReportsPage = () => {
  const pieData = [
    { id: 0, value: 40, label: 'Electronics' },
    { id: 1, value: 30, label: 'Furniture' },
    { id: 2, value: 20, label: 'Accessories' },
    { id: 3, value: 10, label: 'Others' },
  ];
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="reports-container">
      <h2 className="reports-title">Quarterly Report</h2>

      <div className="reports-charts">
        <div className="reports-chart-box">
          <h3 className="reports-title">Sales Report</h3>
          <BarChart
            series={[
              {
                data: [35, 44, 24, 34],
                label: 'Electronics',
                showLabel: true,
              },
              {
                data: [51, 6, 49, 30],
                label: 'Furniture',
                showLabel: true,
              },
              {
                data: [15, 25, 30, 50],
                label: 'Accessories',
                showLabel: true,
              },
              {
                data: [60, 50, 15, 25],
                label: 'Others',
                showLabel: true,
              },
            ]}
            height={300}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          />
        </div>

        <div className="reports-chart-box">
          <h3 className="reports-title">Customer Count</h3>
          <LineChart
            height={300}
            series={[
              {
                data: [120, 200, 150, 250],
                label: 'Customers',
                showMark: true,
                showLabel: true,
              },
            ]}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'point' }]}
          />
        </div>
      </div>

      <div className="reports-pie-chart">
        <h3 className="reports-title">Product Category Distribution</h3>
        <PieChart
          series={[
            {
              outerRadius: 150,
              data: pieData,
              label: {
                visible: true,
                position: 'inside',
                formatter: ({ value }) => {
                  const percent = ((value / total) * 100).toFixed(1);
                  return `${value} (${percent}%)`;
                },
              },
            },
          ]}
          height={400}
        />
      </div>
    </div>
  );
};

export default ReportsPage;
