import "@/styles/TableComponent.css"

interface DataCol<T> {
  label: string;
  key: keyof T;
  render: (data: T) => React.ReactNode;
}

interface TableComponentProps<T> {
  columns: string[] | React.ReactNode[]
  data: T[]
  dataCols: DataCol<T>[];
}

const TableComponent = <T,>(props: TableComponentProps<T>) => {
  return (
    <div className="table-container">
      <table className="modern-table">
        {
          props.columns && (
            <thead>
              <tr>
                {
                  props.columns.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))
                }
              </tr>
            </thead>
          )
        }
        <tbody>
          {props.data &&
            props.data.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {props.dataCols.map((col, colIndex) => (
                  <td key={colIndex}>{col.render(rowData)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent