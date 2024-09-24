import "@/styles/TableComponent.css"

interface DataCol<T> {
  label: string | React.ReactNode;
  key: string
  render: (data: T) => React.ReactNode;
  sortable?: boolean;
  onSort?: (accessor: string) => void

}

interface TableComponentProps<T> {
  columns: DataCol<T>[] | undefined;
  data: T[],
  pagination: {
    currentPage: number,
    rowsPerPage: number
  },
  setPagination: (pagination: { currentPage: number, rowsPerPage: number }) => void
}

const TableComponent = <T,>(props: TableComponentProps<T>) => {




  // Calculate the data to be displayed on the current page
  const indexOfLastRow = props.pagination.currentPage * props.pagination.rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - props.pagination.rowsPerPage;
  const currentData = props.data.slice(indexOfFirstRow, indexOfLastRow);

  // Calculate the total number of pages
  const totalPages = Math.ceil(props.data.length / props.pagination.rowsPerPage);
  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    // setCurrentPage(pageNumber);
    props.setPagination({ currentPage: pageNumber, rowsPerPage: props.pagination.rowsPerPage })
  };


  return (
    <>
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
                        onClick={() => header.sortable && header.onSort ? header.onSort(header.key) : undefined}
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
            {props.data &&
              currentData.map((rowData, rowIndex) => (
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
        </table>
        {/* implement pagination */}
      </div>
      <div className="pagination" style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "20px",
        gap: "10px"
      }}>
        <div style={{
          display: "flex",
          gap: "5px"
        }}>
          <span>Page</span>
          <span>{props.pagination.currentPage}</span>
          <span>of</span>
          <span>{totalPages}</span>
        </div>
        {/* show the first 2 and last 2 in middle 3 dot's */}
        <div style={{
          display: "flex",
          gap: "5px"
        }}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={

              props.pagination.currentPage === 1
            }
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(props.pagination.currentPage - 1)}
            disabled={props.pagination.currentPage === 1}
          >
            {"<"}
          </button>
          <button
            onClick={() => handlePageChange(props.pagination.currentPage + 1)}
            disabled={props.pagination.currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={props.pagination.currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  )
}

export default TableComponent