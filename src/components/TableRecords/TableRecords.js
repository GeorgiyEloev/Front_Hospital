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
<<<<<<< HEAD
import ModalEdit from "../ModalForm/ModalEdit";
import ModalDelet from "../ModalForm/ModalDelet";
import "./TableRecords.scss";

const TableRecords = ({
  allRecords,
  setAllRecords,
  snackbarParams,
  doctors,
}) => {
  const [open, setOpen] = useState(false);

  const [idDelete, setIdDelete] = useState("");
  const [recordEdit, setRecordEdit] = useState({
    _id: "",
    patient: "",
    doctor: "",
    date: new Date(),
    symptoms: "",
  });
  const [whoOpen, setWhoOpen] = useState();

  const openModal = (who) => {
    setOpen(!open);
    setWhoOpen(who);
  };
=======
import ModalDelet from "../ModalForm/ModalDelet";
import "./TableRecords.scss";

const TableRecords = ({ allRecords, setAllRecords, snackbarParams }) => {
  const [open, setOpen] = useState(false);

  const [idDelete, setIdDelete] = useState("");

  const openModal = () => setOpen(!open);
>>>>>>> 8ca0525db320afa82e29da89ab5efe82467cf006

  const headerNames = ["Имя", "Врач", "Дата", "Жалобы", ""];

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow className="table-row">
              {headerNames.map((headerName, index) => (
                <TableCell key={index} align="center">
                  {headerName}
                </TableCell>
              ))}
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
<<<<<<< HEAD
                      openModal(true);
                    }}
                  />
                  <Edit
                    onClick={() => {
                      setRecordEdit({ ...row });
                      setIdDelete(row._id);
                      openModal(false);
                    }}
                  />
=======
                      openModal();
                    }}
                  />
                  <Edit />
>>>>>>> 8ca0525db320afa82e29da89ab5efe82467cf006
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
<<<<<<< HEAD
      {whoOpen ? (
        <ModalDelet
          open={open}
          openModal={openModal}
          idDelete={idDelete}
          setAllRecords={setAllRecords}
          snackbarParams={snackbarParams}
        />
      ) : (
        <ModalEdit
          open={open}
          openModal={openModal}
          idEdit={idDelete}
          recordEdit={recordEdit}
          setAllRecords={setAllRecords}
          snackbarParams={snackbarParams}
          doctors={doctors}
          setRecordEdit={setRecordEdit}
        />
      )}
=======
      <ModalDelet
        open={open}
        openModal={openModal}
        idDelete={idDelete}
        setAllRecords={setAllRecords}
        snackbarParams={snackbarParams}
      />
>>>>>>> 8ca0525db320afa82e29da89ab5efe82467cf006
    </>
  );
};

export default TableRecords;
