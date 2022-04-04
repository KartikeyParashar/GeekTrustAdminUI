//MUI Imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Checkbox, IconButton, Stack } from "@mui/material";
// React Imports
import React, { useEffect, useState } from "react";
//CSS Imports
import "../css/adminTable.css";

export default function AdminTable({
  tableDetails,
  checkBoxHandler,
  checkHandlerForAllRowsOfCurrentPage,
  deleteByIDHandler
}) {
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    setAllChecked(
      tableDetails.filter((row) => row.checked === true).length ===
        tableDetails.length
        ? true
        : false
    );
  }, [tableDetails]);

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
                    <IconButton disabled={row.checked ? false : true}>
                        <EditIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                    <IconButton disabled={row.checked ? false : true} 
                        onClick={() => deleteByIDHandler(row.id)}
                    >
                        <DeleteIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
