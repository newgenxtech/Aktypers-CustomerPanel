import React, { useMemo, useState } from "react";
import TableComponent, { DataCol } from "@/components/TableComponent";
import { ITyrePressure } from "@/pages/TyprePressure/Tyre";

interface TyreConditionTableProps {
    data: ITyrePressure[];
}

const TyreConditionTable: React.FC<TyreConditionTableProps> = ({ data }) => {
    // Filter for records with "Bad" pressure status.
    const filteredData = useMemo(() => data.filter((record) => record.pressure_status === "Bad"), [data]);

    // Define columns for the AG Grid table.
    const columns: DataCol<ITyrePressure>[] = [
        {
            label: "Truck ID",
            key: "truck_id",
            render: (e) => e.truck_id,
        },
        {
            label: "Tyre Position",
            key: "tyre_position",
            render: (e) => e.tyre_position,
        },
        {
            label: "Tyre Pressure",
            key: "tyre_pressure",
            render: (e) => e.tyre_pressure,
        },
        {
            label: "Recorded At",
            key: "recorded_at",
            render: (e) => e.recorded_at,
        },
        {
            label: "Pressure Status",
            key: "pressure_status",
            render: (e) => e.pressure_status,
        },
    ];

    // Manage pagination state.
    const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

    return (
        <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Bad Tyre List</h2>
                <TableComponent
                    columns={columns}
                    data={filteredData}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </div>
        </div>
    );
};

export default TyreConditionTable;