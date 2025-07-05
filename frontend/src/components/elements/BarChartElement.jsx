// Renders a bar chart using Recharts.

import React from "react";
import ElementWrapper from "./ElementWrapper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { sampleChartData } from "../../../data/sampleData";

function BarChartElement({ element, onUpdate, onDelete }) {
  return (
    <ElementWrapper element={element} onDelete={onDelete}>
      <div className="p-2">
        <input
          type="text"
          value={element.title}
          onChange={(e) => onUpdate(element.id, { title: e.target.value })}
          className="w-full bg-transparent text-xl font-bold text-center text-gray-200 mb-4 p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:ring-0"
        />
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={sampleChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  border: "1px solid #4a5568",
                }}
              />
              <Legend />
              <Bar dataKey="Sales" fill="#4299e1" />
              <Bar dataKey="Revenue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ElementWrapper>
  );
}

export default BarChartElement;
