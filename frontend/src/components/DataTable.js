import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);

  const getData = () => {
    axios
      .get(`http://127.0.0.1:8000/web-scrap/scrap-data`)
      .then((res) => {
        setRows(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        alert(err);
      });
  };

  useEffect(() => {
    //  setInterval(getData,6000);
     getData()
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">h&nbsp;1%</TableCell>
              <TableCell align="right">h&nbsp;24%</TableCell>
              <TableCell align="right">d&nbsp;d%</TableCell>
              <TableCell align="right">MArket Cap</TableCell>
              <TableCell align="right">Volume(24h)</TableCell>
              <TableCell align="right">Circulating Supply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.h1}</TableCell>
                <TableCell align="right">{row.h24}</TableCell>
                <TableCell align="right">{row.d7}</TableCell>
                <TableCell align="right">{row.market_cap}</TableCell>
                <TableCell align="right">{row.market_cap}</TableCell>
                <TableCell align="right">{row.circulating_supply}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loader ? <CircularProgress /> : null}
      {rows.length === 0 && !loader ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error"> SORRY THERE IS NO DATA FOUND! </Alert>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
}
