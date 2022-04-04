//MUI Imports
import { Chip, Stack } from "@mui/material";
//Axios Imports
import axios from "axios";
//React Imports
import React, { useEffect, useState } from "react";
//JS Imports
import AdminTable from "./components/AdminTable";
import PaginationForTables from "./components/PaginationForTables";
import Search from "./components/Search";
//css imports
import "./css/App.css";

export const config = {
  url: "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
};

function App() {
  const [tableDetails, setDetails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const dataWithCheckedStatus = [];
    tableDetails.forEach((row) => {
      dataWithCheckedStatus.push({ ...row, checked: false });
    });
    setDetails(dataWithCheckedStatus);
    setSelectedRows([]);
  };

  useEffect(() => {
    const fetchTableDetails = async () => {
      setLoading(true);
      const res = await axios.get(config.url);
      const dataWithCheckedStatus = [];
      res.data.forEach((row) => {
        dataWithCheckedStatus.push({ ...row, checked: false });
      });
      setDetails(dataWithCheckedStatus);
      setLoading(false);
    };

    fetchTableDetails();
  }, []);

  const checkBoxHandler = (id, isChecked) => {
    const getChangedRow = tableDetails.find((row) => row.id === id);
    if (!isChecked) {
      setSelectedRows([...selectedRows, getChangedRow]);
    }
    if (isChecked) {
      const copyOfSelectedRows = [...selectedRows]
      const index = copyOfSelectedRows.indexOf(getChangedRow);
      copyOfSelectedRows.splice(index, 1);
      setSelectedRows(copyOfSelectedRows);
    }
    const indexOFCheckedValue = tableDetails.indexOf(
      tableDetails.find((row) => row.id === id)
    );
    setDetails((vals) => {
      return [
        ...vals.slice(0, indexOFCheckedValue),
        { ...getChangedRow, checked: !isChecked },
        ...vals.slice(indexOFCheckedValue + 1),
      ];
    });
  };

  // Get Current Page Details
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableDetails.slice(indexOfFirstRow, indexOfLastRow);

  const deleteByIDHandler = (id) => {
    let copyOfTableDetails = tableDetails.filter(row => row.id !== id);
    setDetails(copyOfTableDetails);
  };

  const deleteMultipleRowsHandler = (rowsToBeDeleted) => {
    let copyOfTableDetails = [...tableDetails];
    rowsToBeDeleted.forEach((row) => {
      copyOfTableDetails = copyOfTableDetails.filter(rowData => rowData.id !== row.id);
    });
    setDetails(copyOfTableDetails);
  };

  const checkHandlerForAllRowsOfCurrentPage = (rowsList, status) => {
    if (!status) {
      setSelectedRows(rowsList);
    }
    if (status) {
      setSelectedRows([]);
    }
    const copyOfTableDetails = [...tableDetails];
    copyOfTableDetails.forEach((row) => {
      if (rowsList.includes(row)) {
        row.checked = !status;
      }
    });
    setDetails(copyOfTableDetails);
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <Stack>
      <Search />
      <AdminTable
        tableDetails={currentRows}
        loading={loading}
        checkBoxHandler={checkBoxHandler}
        checkHandlerForAllRowsOfCurrentPage={
          checkHandlerForAllRowsOfCurrentPage
        }
        deleteByIDHandler={deleteByIDHandler}
      />
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
        spacing={8}
        className="footer"
      >
        <Chip 
        label="Delete Selected" 
        variant="contained" 
        disabled={selectedRows.length ? false : true}
        onClick={() => deleteMultipleRowsHandler(selectedRows)}
        />
        <PaginationForTables
          rowsPerPage={rowsPerPage}
          totalRows={tableDetails.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Stack>
    </Stack>
  );
}

export default App;
