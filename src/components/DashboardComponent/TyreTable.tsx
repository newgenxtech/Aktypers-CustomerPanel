import React from "react";

export const TyreTable: React.FC = () => {
  const data = [
    {
      registration_number: "ABC1234",
      brand: "Apollo",
      position: "Front Right",
      fitment_km: 1500,
      removal_km: 35000,
    },
    {
      registration_number: "XYZ5678",
      brand: "Bridgestone",
      position: "Rear Left",
      fitment_km: 2000,
      removal_km: 40000,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Tyre Details</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Reg. Number</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Position</th>
            <th className="p-2">Fitment KM</th>
            <th className="p-2">Removal KM</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tyre, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{tyre.registration_number}</td>
              <td className="p-2">{tyre.brand}</td>
              <td className="p-2">{tyre.position}</td>
              <td className="p-2">{tyre.fitment_km}</td>
              <td className="p-2">{tyre.removal_km}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
