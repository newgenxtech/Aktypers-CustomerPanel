import "@/styles/TableComponent.css"
import { useDispatch, useSelector } from "react-redux";
import { sortTable } from "../services/TableSlice";
import { RootState } from "../store/store";

interface DataCol<T> {
  label: string | React.ReactNode;
  key: string
  render: (data: T) => React.ReactNode;
  sortable?: boolean;
  onSort?: (accessor: string) => boolean

}

interface TableComponentProps<T> {
  columns: DataCol<T>[] | undefined;
  data: T[]
}

const TableComponent = <T,>(props: TableComponentProps<T>) => {
  const dispatch = useDispatch();

  const sortedData = useSelector((state: RootState) => state.table.sortedData);
  const handleSort = (accessor: string) => {
    dispatch(sortTable(accessor));
  };


  return (
    <div className="table-container">
      <table className="modern-table">
        {
          props.columns && (
            <thead>
              <tr>
                {
                  props.columns.map((header, index) => (
                    <th
                      key={index}
                      onClick={() => header.sortable ? handleSort(header.key) : undefined}
                      style={{ cursor: header.sortable ? "pointer" : "default" }}
                    >
                      {header.label}
                    </th>
                  ))
                }
              </tr>
            </thead>
          )
        }
        <tbody>
          {sortedData &&
            sortedData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {
                  props.columns && props.columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {col.render(rowData)}
                    </td>
                  ))
                }
              </tr>
            ))}
        </tbody>
        {/* implement pagination */}
      </table>
    </div>
  )
}

export default TableComponent