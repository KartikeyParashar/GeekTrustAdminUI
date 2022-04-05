//MUI Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Checkbox, IconButton, Stack } from "@mui/material";
// React Imports
import React, { useEffect, useState } from "react";
//CSS Imports
import "../css/adminTable.css";
import AlertDialog from "./dialogs/AlertDialog";
import FormDialog from './dialogs/FormDialog';

export default function AdminTable({
  tableDetails,
  checkBoxHandler,
  checkHandlerForAllRowsOfCurrentPage,
  deleteByIDHandler,
  updateDetailHandler
}) {
  const [allChecked, setAllChecked] = useState(false);
  const [openAlert, setAlertDialog] = useState(false);
  const [openForm, setFormDialog] = useState(false);
  const [formData, setFormData] = useState({id: null, name: "", role: "'", email: ""})
  const [id, setID] = useState(null);

  useEffect(() => {
    setAllChecked(
      tableDetails.filter((row) => row.checked === true).length ===
        tableDetails.length
        ? true
        : false
    );
  }, [tableDetails]);

  const deleteHandler = (id) => {
      setAlertDialog(true);
      setID(id);
  }

  const openOrCloseAlertDialog = () => {
    setAlertDialog(!openAlert);
  }

  const openOrCloseFormHandler = () => {
    setFormDialog(!openForm);
  }

  const editDetailHandler = (id, name, email, role) => {
    setFormDialog(true);
    setFormData({...formData, id: id, name: name, 
        email: email, role: role})
  }

  const allCheckedHandler = () => {
    setAllChecked(!allChecked);
    checkHandlerForAllRowsOfCurrentPage(tableDetails, allChecked);
  };

  return (
    <Box sx={{ minHeight: "39rem" }}>
      <table className="content-table">
        <thead>
          <tr>
            <th>
              <Checkbox
                color="default"
                checked={allChecked}
                onChange={allCheckedHandler}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableDetails.map((row) => (
            <tr
              key={row.id}
              style={{ background: row.checked ? "lightgrey" : "white" }}
            >
              <td>
                <Checkbox
                  color="default"
                  checked={row.checked}
                  onChange={() => checkBoxHandler(row.id, row.checked)}
                />
              </td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td className="role">{row.role}</td>
              <td>
                <Stack direction="row" spacing={2}>
                    <IconButton disabled={row.checked ? false : true}
                        onClick={() => editDetailHandler(row.id, row.name, row.email, row.role)}
                    >
                        <EditIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                    <IconButton disabled={row.checked ? false : true} 
                        onClick={() => deleteHandler(row.id)}
                    >
                        <DeleteIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDialog 
        open={openAlert} 
        openOrCloseAlertDialog={openOrCloseAlertDialog} 
        deleteRecords={deleteByIDHandler} 
        paramsForDeletion={id}
      />
      <FormDialog 
       open={openForm} 
       openOrCloseFormHandler={openOrCloseFormHandler}
       form={formData}
       editDetailHandler={editDetailHandler}
       updateDetailHandler={updateDetailHandler}
       />
    </Box>
  );
}
