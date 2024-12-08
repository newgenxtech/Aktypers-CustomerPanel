import React, { useCallback, useMemo, useRef } from 'react';
import { Tooltip, Image, Modal, Space, Button, message } from 'antd';
import { FileImage, FileText, Sheet } from 'lucide-react';
import { DriverMaster } from '@/pages/Driver/Driver.d';
import { routes } from "@/routes/routes";
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { useMediaQuery } from 'react-responsive'

interface DriverTableProps {
    data: DriverMaster[];
    isLoading: boolean;
    setOpen: (open: boolean) => void;
    setIsEdit: (isEdit: boolean) => void;
    setCurrentDriver: (driver: DriverMaster | null) => void;
}

const DriverTable: React.FC<DriverTableProps> = ({ data, isLoading, setOpen, setIsEdit, setCurrentDriver }) => {
    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'Name',
            field: 'name',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentDriver(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Cus ID',
            field: 'customerid',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'License Number',
            field: 'license_number',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'License Expiry Date',
            field: 'license_expiry_date',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Phone Number',
            field: 'phone_number',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Address',
            field: 'address',
            sortable: true,
            filter: true,
            width: 200,
            cellRenderer: (params: CustomCellRendererProps) => (
                <Tooltip title={params.value}>
                    <span>{params.value.length > 20 ? `${params.value.slice(0, 20)}...` : params.value}</span>
                </Tooltip>
            )
        },
        {
            headerName: 'Date of Birth',
            field: 'date_of_birth',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Date of Joining',
            field: 'date_of_joining',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Emergency Contact',
            field: 'emergency_contact',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Status',
            field: 'status',
            sortable: true,
            filter: true,
            width: 100
        },
        {
            headerName: 'Email',
            field: 'email',
            sortable: true,
            filter: true,
            width: 200
        },
        {
            headerName: 'Documents',
            field: 'documents',
            sortable: false,
            filter: false,
            width: 150,
            cellRenderer: (params: CustomCellRendererProps) => (
                <div className="flex justify-center items-center mt-2 ">
                    <FileImage
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => {
                            Modal.info({
                                title: "Documents",
                                width: 500,
                                content: (
                                    <Space className="my-2">
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.aadhaar_pic}`}
                                            alt={params.data?.aadhaar_pic ? 'Aadhar Card' : 'Adhar Card Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.pancard_pic}`}
                                            alt={params.data?.pancard_pic ? 'Pancard' : 'Pancard Not Uploaded'}
                                        />
                                        <Image
                                            width={100}
                                            src={`${routes.backend.file.download}/${params.data.license_pic}`}
                                            alt={params.data?.license_pic ? 'License' : 'License Not Uploaded'}
                                        />
                                    </Space>
                                )
                            });
                        }}
                    />
                </div>
            )
        }
    ], [setOpen, setIsEdit, setCurrentDriver]);

    const gridRef = useRef<AgGridReact>(null);

    const onBtnExport = useCallback(() => {
        if (!gridRef.current) {
            message.error('No data to export');
        }
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    // const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    return (

        <>

            <div
                className="ag-theme-quartz mx-2"
                style={{
                    height: '60vh', width: 'auto'
                }}>
                <div className="flex justify-end gap-2">
                    {/* <FileText /> */}
                    <Button
                        icon={<FileText />}
                        onClick={
                            () => {
                                // exportToPDF(gridRef)
                                message.info('Feature not available');
                            }
                        }
                        className='mb-2'
                    />
                    <Button
                        icon={<Sheet />}
                        onClick={onBtnExport}
                        className='mb-2'
                    />
                </div>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columns}
                    rowData={data}
                    // loadingOverlayComponentParams={{ loadingMessage: 'Loading...' }}
                    // overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'}
                    // overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">No rows to show</span>'}
                    loading={isLoading}
                    loadingOverlayComponent={'Loading...'}
                    overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">No rows to show</span>'}
                    pagination={isMobile ? false : true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={
                        [10, 25, 50, 100, 200, 500, 1000]
                    }
                    domLayout='autoHeight'
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        resizable: true,
                        sortable: true,
                        filter: true,
                    }}
                    enableCellTextSelection={true}
                />
                {/* 
                    Custom Paginator
                 */}
                <div>
                </div>
                <div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        {isMobile ? 'Swipe left to see more columns' : 'Scroll right to see more columns'}
                    </p>
                </div>
            </div>
        </>

    );
};

export default DriverTable;