import { Navbar } from "../components/Navbar";
import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Original Table Code from https://mui.com/material-ui/react-table/#StickyHeadTable.js

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "comment",
    label: "Comment",
    minWidth: 170,
    //format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
    //format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "latlong",
    label: "(Lat, Long)",
    minWidth: 170,
    //format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch("https://s0ak2d9y28.execute-api.us-east-2.amazonaws.com/dev")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => ({
          name: item.name,
          address: item.address,
          comment: item.comment,
          time: item.createAt,
          latlong: `(${item.lat}, ${item.long})`,
        }));

        setRows(mappedData);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          accentColor: "black",
        }}
      >
        <TableContainer sx={{ minHeight: 500, maxHeight: 500 }}>
          <Table
            className="
              [&_.MuiTableCell-head]:!font-bold
              border border-black
            [&_.MuiTableCell-root]:!border-black
            [&_.MuiTableCell-head]:!border-black
            [&_.MuiTableRow-root]:!border-black
            "
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
}
