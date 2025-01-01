import { TyresMaster } from '@/pages/Tyres/Tyres';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { CustomCellRendererProps } from 'ag-grid-react';
// import type {
//     IAfterGuiAttachedParams,
//     IDoesFilterPassParams,
// } from "ag-grid-community";
// import type { CustomFilterProps } from "ag-grid-react";
// import { useGridFilter } from "ag-grid-react";
// import { useCallback, useRef } from 'react';
// import { Select } from 'antd';



// const CustomFilter = ({ model, onModelChange, getValue }: CustomFilterProps) => {
//     const refInput = useRef<HTMLInputElement>(null);

//     const doesFilterPass = useCallback(
//         (params: IDoesFilterPassParams) => {
//             const { node } = params;
//             const filterText: string[] = model || [];
//             const value: string = getValue(node).toString().toLowerCase();
//             return filterText.every((filterWord) => value.indexOf(filterWord.toLowerCase()) >= 0);
//         },
//         [getValue, model],
//     );

//     const afterGuiAttached = useCallback((params?: IAfterGuiAttachedParams) => {
//         if (!params || !params.suppressFocus) {
//             refInput.current?.focus();
//         }
//     }, []);

//     useGridFilter({
//         doesFilterPass,
//         afterGuiAttached,
//     });

//     const options = [
//         { value: 'New', label: 'New' },
//         { value: 'Re-Used', label: 'Re-Used' },
//         { value: 'Old', label: 'Old' },
//     ];

//     return (
//         <div className="person-filter">
//             <div>Custom Tyre Condition Filter</div>
//             <div>
//                 {/* <Select
//                     isMulti
//                     options={options}
//                     value={options.filter(option => model?.includes(option.value))}
//                     onChange={(selectedOptions) => onModelChange(selectedOptions.map(option => option.value))}
//                     placeholder="Select conditions..."
//                 /> */}
//                 <Select
//                     mode="multiple"
//                     options={options}
//                     value={options.filter((option) => model?.includes(option.value))}
//                     onChange={(selectedOptions) => onModelChange(selectedOptions.map((option) => option.value))}
//                     placeholder="Select conditions..."
//                     className='w-full'
//                 />
//             </div>
//         </div>
//     );
// };

const TyresColumns = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentTyres: React.Dispatch<React.SetStateAction<TyresMaster | null>>,
): (ColDef | ColGroupDef)[] => [
        {
            headerName: 'S.No',
            field: 'key',
            width: 80,
            minWidth: 0,
            flex: 0,
            autoHeight: false,
            valueGetter: 'node.rowIndex + 1'
        },
        {
            headerName: 'Serial Number',
            field: 'Tyre_Serial_Number',
            cellRenderer: (params: CustomCellRendererProps) => (
                <span
                    className="text-[#00008B] font-semibold cursor-pointer text-base"
                    onClick={() => {
                        setOpen(true);
                        setIsEdit(true);
                        setCurrentTyres(params.data);
                    }}
                >
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Wheeler Type',
            field: 'Wheeler_Type',
            cellRenderer: (params: CustomCellRendererProps) => <span className="text-base">{params.value}</span>
        },
        {
            headerName: 'Manufacturer',
            field: 'Manufacturer'
        },
        {
            headerName: 'Brand',
            field: 'Brand'
        },
        {
            headerName: 'Fitment KM',
            field: 'Fitment_KM'
        },
        {
            headerName: 'Removal KM',
            field: 'Removal_KM'
        },
        {
            headerName: 'Total Covered KM',
            field: 'Total_Covered_KM'
        },
        {
            headerName: 'Re Used',
            field: 'Retread_Yes_No',
        },
        {
            headerName: 'Tyre Condition',
            field: 'Tyre_Condition',
            // filter: CustomFilter,
            // filterParams: {
            //     values: ['New', 'Re-Used', 'Old']
            // }
        },
        {
            headerName: 'Reason for Removal Month',
            field: 'Reason_for_Removal_MONTH'
        },
        {
            headerName: 'Date',
            field: 'Date'
        },
        {
            headerName: 'Position',
            field: 'position'
        },
        {
            headerName: 'Registration Number',
            field: 'registration_number'
        }
    ];

export default TyresColumns;