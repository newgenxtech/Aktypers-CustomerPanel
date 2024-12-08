import React, { useMemo } from 'react';
import { FileImage } from 'lucide-react';
import { CustomCellRendererProps } from 'ag-grid-react'; // React Data Grid Component
import { AlloyMaster } from '@/pages/Alloy/Alloy.d';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import AgGridTable from '../AgGridTable';

interface AlloyTableProps {
    data: AlloyMaster[];
    isLoading: boolean;
}

const AlloyTable: React.FC<AlloyTableProps> = ({ data, isLoading }) => {
    const columns: (ColDef | ColGroupDef)[] = useMemo(() => [
        {
            headerName: 'S.N',
            field: 'id',
            sortable: true,
            filter: true,
            width: 100,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Vehicle',
            field: 'vehicle',
            sortable: true,
            filter: true,
            cellRenderer: (params: CustomCellRendererProps) => (
                <span className="text-[#00008B] font-semibold cursor-pointer text-base">
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
            headerName: 'Date',
            field: 'date',
            sortable: true,
            filter: true,
            width: 150
        },
        {
            headerName: 'Before PDF',
            field: 'before',
            sortable: false,
            filter: false,
            width: 150,
            cellRenderer: (params: CustomCellRendererProps) => (
                <a
                    href={params.value}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center"
                >
                    <FileImage className="cursor-pointer hover:text-blue-500" />
                </a>
            )
        }
    ], []);

    // const gridRef = useRef<AgGridReact>(null);

    // const onBtnExport = useCallback(() => {
    //     if (!gridRef.current) {
    //         message.error('No data to export');
    //     }
    //     gridRef.current!.api.exportDataAsCsv();
    // }, []);

    // const isMobile = useMediaQuery({
    //     query: '(max-width: 768px)'
    // });

    return (
        // <>
        //     <div className="ag-theme-quartz mx-2" style={{ height: '50vh', width: 'auto' }}>
        //         <div className="flex justify-end gap-2">
        //             <Button
        //                 icon={<FileText />}
        //                 onClick={() => {
        //                     message.info('Feature not available');
        //                 }}
        //                 className='mb-2'
        //             />
        //             <Button
        //                 icon={<Sheet />}
        //                 onClick={onBtnExport}
        //                 className='mb-2'
        //             />
        //         </div>
        //         <AgGridReact
        //             ref={gridRef}
        //             columnDefs={columns}
        //             rowData={data}
        //             loading={isLoading}
        //             loadingOverlayComponent={'Loading...'}
        //             overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">No rows to show</span>'}
        //             pagination={isMobile ? false : true}
        //             paginationPageSize={10}
        //             paginationPageSizeSelector={
        //                 isMobile ? false :
        //                     [10, 25, 50, 100, 200, 500, 1000]}
        //             domLayout='autoHeight'
        //             defaultColDef={{
        //                 flex: 1,
        //                 minWidth: 100,
        //                 resizable: true,
        //                 sortable: true,
        //                 filter: true,
        //             }}
        //             enableCellTextSelection={true}
        //         />
        //         {isMobile && (
        //             <>
        //                 {/* <div>
        //                     <Pagination
        //                         showSizeChanger
        //                         showQuickJumper
        //                         showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        //                         pageSizeOptions={['10', '25', '50', '100', '200', '500', '1000']}
        //                         className='mt-2'
        //                         total={gridRef.current?.api.getDisplayedRowCount() || 0}
        //                     />
        //                 </div> */}
        //                 <div>
        //                     <p className="text-xs text-gray-500 text-center mt-2">
        //                         Swipe left to see more columns
        //                     </p>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        // </>
        <AgGridTable
            columns={columns}
            data={data}
            isLoading={isLoading}
        />
    );
};

export default AlloyTable;