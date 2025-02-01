import React from "react";

export const TyreStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-500 text-sm">Total Tyres</h2>
        <p className="text-2xl font-bold">150</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-500 text-sm">Under Maintenance</h2>
        <p className="text-2xl font-bold">25</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-gray-500 text-sm">Replaced This Month</h2>
        <p className="text-2xl font-bold">10</p>
      </div>
    </div>
  );
};
