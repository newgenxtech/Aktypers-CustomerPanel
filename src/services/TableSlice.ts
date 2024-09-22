import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TableState<T>{
  data: T[];
  sortedData: T[];
  sortDirection: "asc" | "desc";
  sortColumn: string | null;
}

const initialState: TableState<never> = {
  data: [],
  sortedData: [],
  sortDirection: "asc",
  sortColumn: null,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.sortedData = action.payload;
    },
    sortTable: (state, action: PayloadAction<string>) => {
      const { data, sortDirection } = state;
      const accessor = action.payload;
      const sorted = [...data].sort((a, b) => {
        const compareA = a[accessor];
        const compareB = b[accessor];
        if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
        if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
      state.sortedData = sorted;
      state.sortDirection = sortDirection === "asc" ? "desc" : "asc";
      state.sortColumn = accessor;
    },
    searchTable: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.sortedData = state.data.filter((row: { [s: string]: unknown; } | ArrayLike<unknown>) =>
        Object.values(row).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm);
          } else if (typeof value === 'number') {
            return value.toString().includes(searchTerm);
          }
          return false;
        })
      );
    },
  },
});

export const { setData, sortTable, searchTable } = tableSlice.actions;
export default tableSlice.reducer;
