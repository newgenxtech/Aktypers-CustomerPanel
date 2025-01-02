import { useRef, useCallback } from 'react';
import { Button, message } from 'antd';
import { FileText, Sheet } from 'lucide-react';
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { useMediaQuery } from 'react-responsive';
import { AgGridReact } from 'ag-grid-react';

interface AgGridTableProps<T> {
    columns: (ColDef | ColGroupDef)[];
    data: T[];
    isLoading: boolean;
    defaultColDef?: ColDef;
}

import { themeQuartz } from 'ag-grid-community';

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz
    .withParams({
        browserColorScheme: "light",
        headerFontSize: 14
    });

const AgGridTable = <T,>({ columns, data, isLoading, defaultColDef }: AgGridTableProps<T>) => {
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
    });

    return (
        <div className="ag-theme-quartz mx-2" style={{ height: '60vh', width: 'auto' }}>
            <div className="flex justify-end gap-2">
                <Button
                    icon={<FileText />}
                    onClick={() => {
                        message.info('Feature not available');
                    }}
                    className='mb-2'
                />
                <Button
                    icon={<Sheet />}
                    onClick={onBtnExport}
                    className='mb-2'
                />
            </div>
            <AgGridReact
                theme={myTheme}
                ref={gridRef}
                columnDefs={columns}
                rowData={data}
                className="scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-300 hover:scrollbar-thumb-blue-700"
                loadingOverlayComponent={'Loading...'}
                overlayNoRowsTemplate={'<span class="ag-overlay-loading-center">No rows to show</span>'}
                pagination={isMobile ? false : true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50, 100, 200, 500, 1000]}
                domLayout='autoHeight'
                loading={isLoading}
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    resizable: true,
                    sortable: true,
                    filter: true,
                    ...defaultColDef
                }}
                enableCellTextSelection={true}
            />
            {isMobile && (
                <div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        Swipe left to see more columns
                    </p>
                </div>
            )}
        </div>
    );
};

export default AgGridTable;