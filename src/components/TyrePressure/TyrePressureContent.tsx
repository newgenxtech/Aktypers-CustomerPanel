import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ITyrePressure } from '@/pages/TyprePressure/Tyre.d';
import { DatePicker, Input, message, Select, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from "axios";
import { routes } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { useGetTruckData } from "@/hooks/GetHooks";
import { GetApiResponse } from "@/Interfaces/interface";
import TruckCanvas from "@/pages/TyprePressure/TruckCanvas";
import { getTyreLayout } from "@/lib/utils";

export interface TyrePressureProps {
    wheels: string;
    axtyre: string;
    total_tyres: string;
    total_axles: string;
    config: string;
}

const TyrePressureContent: React.FC = () => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const { data: TruckListData } = useGetTruckData('1001');
    const [SelectedTruckId, setSelectedTruckId] = useState<string | undefined>();
    const [SelectedTyre, setSelectedTyre] = useState<TyrePressureProps>();

    const { data: TyrePressureData, isLoading: TyrePressureDataLoading } = useQuery<GetApiResponse<ITyrePressure>>({
        queryKey: ['TyrePressure', fromDate, toDate, SelectedTruckId],
        queryFn: async () => {
            try {
                const res = await axios.post(routes.backend.tyre.getLatestTyrePressureDetails + SelectedTruckId, {
                    from_date: fromDate,
                    to_date: toDate
                });
                return res.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Error fetching data");
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!SelectedTruckId
    });

    const { data: TruckDemensionDetails, isLoading: TruckDemensionDetailLoading } = useQuery<GetApiResponse<TyrePressureProps>>({
        queryKey: ['TruckDemensionDetails', SelectedTruckId],
        queryFn: async () => {
            try {
                const res = await axios.get(routes.backend.tyre.getTyreDetails + SelectedTruckId);
                return res.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                message.error("Error fetching data");
            }
        },
        refetchOnWindowFocus: false,
        enabled: !!SelectedTruckId
    });

    useEffect(() => {
        if (TruckListData?.body[0].id) {
            setSelectedTruckId(TruckListData.body[0].id);
        }
    }, [TruckListData]);

    useEffect(() => {
        if (TruckDemensionDetails && TruckDemensionDetailLoading === false) {
            setSelectedTyre(TruckDemensionDetails.body[0]);
        }
    }, [TruckDemensionDetailLoading, TruckDemensionDetails]);

    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const columns: TableProps<ITyrePressure>['columns'] = useMemo(() => [
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Tyre Position',
            dataIndex: 'tyre_position',
            key: 'tyre_position',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Tyre Pressure',
            dataIndex: 'tyre_pressure',
            key: 'tyre_pressure',
            render: (text: string) => <span>{text}</span>,
        },
        // depth 
        {
            title: 'Depth',
            dataIndex: 'Depth',
            key: 'Depth',
            render: (text: string) => <span>{text}</span>,
        },
        // Toberun
        {
            title: 'To be Run',
            dataIndex: 'Toberun',
            key: 'Toberun',
            render: (text: string) => <span>{text}</span>,
        },
        {
            title: 'Recorded At',
            dataIndex: 'recorded_at',
            key: 'recorded_at',
            render: (text: string) => <span>{text}</span>,
        },
    ], []);

    return (
        <div className='warehouse'>
            <div className="flex flex-col md:flex-row items-center mt-2">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full p-4">
                    <label className="font-bold text-lg md:text-xl">Tyre Pressure Master</label>
                    <Input
                        placeholder="Search Driver"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                </div>
                <Button
                    onClick={() => {
                        // setOpen(true)
                    }}
                    className="flex justify-center md:justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white mx-2 mt-2 md:mt-0"
                    disabled={true}
                >
                    <Plus className="mr-1" />
                    Add Tyre Pressure
                </Button>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col md:flex-row justify-center gap-4 my-4 mx-2">
                        <div className="flex items-center justify-center gap-2">
                            <label>Truck</label>
                            <Select

                                className="w-64"
                                onChange={(value) => {
                                    setSelectedTruckId(value);
                                }}
                                options={TruckListData?.body.map((item) => ({
                                    value: item.id,
                                    label: item.registration_number,
                                }))}
                                placeholder="Select Truck"
                                allowClear
                                filterOption={(inputValue, option) =>
                                    option!.label!.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                showSearch

                            />
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <label>From Date</label>
                            <DatePicker
                                onChange={(_date, dateString) => {
                                    setFromDate(dateString as string);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <label>To Date</label>
                            <DatePicker
                                onChange={(_date, dateString) => {
                                    setToDate(dateString as string);
                                }}
                            />
                        </div>
                    </div>
                    <Table<ITyrePressure>
                        columns={columns}
                        dataSource={
                            TyrePressureData?.body.map((item, index) => ({
                                ...item,
                                key: index,
                            })) ?? []
                        }
                        loading={TyrePressureDataLoading}
                        pagination={{
                            position: ['bottomRight'],
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30', '40', '50'],
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        size="middle"
                        scroll={{ x: '100%', y: '100%' }}
                        className=" p-2 border border-gray-200 rounded-md mx-2"

                    />
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center"
                    style={{
                        height: "70vh"
                    }}
                >
                    {TyrePressureDataLoading ? (
                        <div className="loader">Loading...</div>
                    ) : (
                        TruckDemensionDetails &&
                        SelectedTyre && (
                            <TruckCanvas
                                TyreData={getTyreLayout(
                                    Number(SelectedTyre!.total_tyres!),
                                    Number(SelectedTyre!.total_axles!),
                                    SelectedTyre!.axtyre!
                                )}
                                TyreDetailData={SelectedTyre}
                                TyrePressureData={TyrePressureData!.body!}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default TyrePressureContent;
