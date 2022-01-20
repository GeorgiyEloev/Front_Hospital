import React, { useState } from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DeleteOutlined, Edit } from "@mui/icons-material";
import ModalDelet from "../ModalForm/ModalDelet";
import "./TableRecords.scss";

const TableRecords = ({ allRecords, setAllRecords, snackbarParams }) => {
  const [open, setOpen] = useState(false);

  const [idDelete, setIdDelete] = useState("");

  const openModal = () => setOpen(!open);

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow className="table-row">
              <TableCell align="center">Имя</TableCell>
              <TableCell align="center">Врач</TableCell>
              <TableCell align="center">Дата</TableCell>
              <TableCell align="center">Жалобы</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRecords.map((row) => (
              <TableRow className="row" key={row._id}>
                <TableCell
                  className="cell-patient"
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.patient}
                </TableCell>
                <TableCell className="cell-doctor" align="center">
                  {row.doctor}
                </TableCell>
                <TableCell className="cell-date" align="center">
                  {moment(row.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="cell-symptoms" align="justify">
                  {row.symptoms}
                </TableCell>
                <TableCell className="cell-img" align="center">
                  <DeleteOutlined
                    onClick={() => {
                      setIdDelete(row._id);
                      openModal();
                    }}
                  />
                  <Edit />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDelet
        open={open}
        openModal={openModal}
        idDelete={idDelete}
        setAllRecords={setAllRecords}
        snackbarParams={snackbarParams}
      />
    </>
  );
};

export default TableRecords;
