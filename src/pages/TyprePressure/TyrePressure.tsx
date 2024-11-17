import SearchComponent from "@/components/SearchComponent";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ITyrePressure } from './Tyre.d';
import { AutoComplete, DatePicker, message, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from "axios";
import { routes } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { useGetTruckData } from "@/hooks/GetHooks";
import { GetApiResponse } from "@/Interfaces/interface";
import TruckCanvas from "./TruckCanvas";

function getTyreLayout(totalTyres: number, totalAxles: number, axtyre: string): {
    // left: string;
    // right: string;
    // EachSideWheelCount: number;
    position: string;
}[] {

    console.log(totalTyres, totalAxles, axtyre);
    const parsedAxTyre = JSON.parse(axtyre);
    console.log(parsedAxTyre);


    const layout = [];
    console.log(totalTyres, totalAxles, axtyre);

    for (let axle = 0; axle < totalAxles; axle++) {
        const axleTyres = parsedAxTyre[axle].tyre; // Number of tyres on this axle
        for (let side = 0; side < axleTyres; side++) {
            layout.push(
                { position: `${axle + 1}L${side}` }, // Left side
                { position: `${axle + 1}R${side}` }  // Right side
                // {
                //     left: `${axle + 1}L${side}`,
                //     right: `${axle + 1}R${side}`,
                //     EachSideWheelCount: axleTyres
                // }
            );
        }
    }

    return layout;
}

const TyrePressure: React.FC = () => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const { data: TruckListData } = useGetTruckData('1001');
    const [SelectedTruckId, setSelectedTruckId] = useState<string | undefined>();
    const [SelectedTruck, setSelectedTruck] = useState<{ value: string, label: string } | undefined>();
    const [SelectedTyre, setSelectedTyre] = useState<{
        wheels: string; //!  number and its a count of the wheels
        axtyre: string; //!  array of objects and its a count of the axles
        total_tyres: string; //!  number and its a count of the total tyres
        total_axles: string; //!  number and its a count of the total axles
        config: string; //!  number and its a count of the total axles
    }>();




    const { data: TyrePressureData, isLoading: TyrePressureDataLoading } = useQuery<GetApiResponse<ITyrePressure>>(
        {
            queryKey: ['TyrePressure', fromDate, toDate, SelectedTruckId],
            queryFn: async () => {
                try {
                    const res = await axios.post(routes.backend.tyre.getLatestTyrePressureDetails + SelectedTruckId, {
                        from_date: fromDate,
                        to_date: toDate
                    });
                    const result = res.data;
                    return result;
                } catch (error) {
                    console.error("Error fetching data:", error);
                    message.error("Error fetching data");
                }
            },
            refetchOnWindowFocus: false,
            enabled: !!SelectedTruckId
        }
    )


    const { data: TruckDemensionDetails, isLoading: TruckDemensionDetailLoading } = useQuery<GetApiResponse<{
        wheels: string; //!  number and its a count of the wheels
        axtyre: string; //!  array of objects and its a count of the axles
        total_tyres: string; //!  number and its a count of the total tyres
        total_axles: string; //!  number and its a count of the total axles
        config: string; //!  number and its a count of the total axles
    }>>(
        {
            queryKey: ['TruckDemensionDetails', SelectedTruckId],
            queryFn: async () => {
                try {
                    const res = await axios.get(routes.backend.tyre.getTyreDetails + SelectedTruckId);
                    const result = res.data;
                    return result;
                } catch (error) {
                    console.error("Error fetching data:", error);
                    message.error("Error fetching data");
                }
            },
            refetchOnWindowFocus: false,
            enabled: !!SelectedTruckId
        }
    )




    useEffect(() => {
        if (TruckListData?.body[0].id) {
            setSelectedTruckId(TruckListData.body[0].id);
        }
    }, [TruckListData]);

    useEffect(() => {
        if (TruckDemensionDetails && TruckDemensionDetailLoading === false) {
            setSelectedTyre(TruckDemensionDetails.body[0]);
        }
    }, [TruckDemensionDetails]);

    const handleSearch = useCallback((data: string) => {
        console.log(data);
    }, []);

    const columns: TableProps<ITyrePressure>['columns'] = useMemo(() => [
        {
            title: 'S.N',
            dataIndex: 'id',
            key: 'id',
            render: (_, __, index) => <span>{index + 1}</span>,
            width: 'auto',
        },
        {
            title: 'Tyre Position',
            dataIndex: 'tyre_position',
            key: 'tyre_position',
            render: (text: string) => <span>{text}</span>,
            width: 'auto',
        },
        {
            title: 'Tyre Pressure',
            dataIndex: 'tyre_pressure',
            key: 'tyre_pressure',
            render: (text: string) => <span>{text}</span>,
            width: 'auto',
        },
        {
            title: 'Recorded At',
            dataIndex: 'recorded_at',
            key: 'recorded_at',
            render: (text: string) => <span>{text}</span>,
            width: 'auto',
        },
    ], []);




    return (
        <div className='warehouse'>
            <div className="container">
                <div className='flex items-center gap-8 w-full'>
                    <label className="font-bold text-xl">Tyre Pressure Master</label>
                    <SearchComponent
                        className="search-component"
                        placeholder="Search TyrePressure"
                        onHandleChange={handleSearch}
                        postfix={<i className="fa fa-search" />}
                    />
                </div>
                <Button
                    onClick={() => {
                        // setOpen(true)
                    }}
                    className='flex justify-end bg-[#D64848] text-white px-4 py-2 rounded-md hover:bg-[#D64848] hover:text-white'
                    disabled={true}
                >
                    <Plus className='mr-1' />
                    Add Tyre Pressure
                </Button>
            </div>
            <div className='flex justify-center gap-4 my-4'>
                <div className="flex items-center justify-center gap-2">
                    <label>Truck</label>
                    <AutoComplete
                        options={TruckListData?.body.map((item) => ({ value: JSON.stringify(item), label: item.registration_number }))}
                        placeholder="Select Truck"
                        onSelect={(text) => {
                            const res = JSON.parse(text);
                            setSelectedTruck({
                                value: res.id,
                                label: res.registration_number,
                            });
                            setSelectedTruckId(res.id);
                        }}
                        className="w-64"
                        value={SelectedTruck?.label}
                    />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <label>From Date</label>
                    <DatePicker
                        onChange={(date, dateString) => {
                            setFromDate(dateString as string);
                        }}
                    />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <label>To Date</label>
                    <DatePicker
                        onChange={(date, dateString) => {
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
                scroll={{ x: 'auto', y: '50vh' }}
            />
            {
                TyrePressureDataLoading ?
                    <div className="loader">
                        Loading...
                    </div> :
                    (
                        TruckDemensionDetails && SelectedTyre && (
                            <TruckCanvas
                                TyreData={
                                    getTyreLayout(
                                        Number(SelectedTyre!.total_tyres!),
                                        Number(SelectedTyre!.total_axles!),
                                        SelectedTyre!.axtyre!
                                    )
                                }
                                TyreDetailData={SelectedTyre}
                                TyrePressureData={TyrePressureData?.body!}
                            />
                        )
                    )
            }
        </div>
    );
};

export default TyrePressure;
