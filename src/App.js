//MUI Imports
import { Chip, Stack } from "@mui/material";
//Axios Imports
import axios from "axios";
//React Imports
import React, { useEffect, useState } from "react";
//JS Imports
import AdminTable from "./components/AdminTable";
import AlertDialog from "./components/dialogs/AlertDialog";
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
  const [openAlert, setAlertDialog] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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
    fetchTableDetails();
  }, []);


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
    setSelectedRows(selectedRows.filter(row => row.id !== id))
  };

  const deleteMultipleRowsHandler = (rowsToBeDeleted) => {
    let copyOfTableDetails = [...tableDetails];
    rowsToBeDeleted.forEach((row) => {
      copyOfTableDetails = copyOfTableDetails.filter(rowData => rowData.id !== row.id);
    });
    setDetails(copyOfTableDetails);
    setSelectedRows([]);
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

  const openOrCloseAlertDialog = () => {
    setAlertDialog(!openAlert);
  }

  const searchHandler = async (value) => {
    const res = await axios.get(config.url);
    const dataWithCheckedStatus = [];
    res.data.forEach((row) => {
      dataWithCheckedStatus.push({ ...row, checked: false });
    });
    if ( value === "" ) {
      setDetails(dataWithCheckedStatus)
    } else {
      setDetails(dataWithCheckedStatus.filter(row => row.role.toLowerCase().includes(value.toLowerCase()) || 
                                            row.name.toLowerCase().includes(value.toLowerCase()) || 
                                            row.email.toLowerCase().includes(value.toLowerCase()) ));
    }
  }

  const updateDetailHandler = (formData) => {
    console.log(formData);
    const copyOfTableDetails = [...tableDetails];
    for ( let index = 0; index < copyOfTableDetails.length; index++ ) {
      if (copyOfTableDetails[index].id === formData.id ) {
        copyOfTableDetails[index].name = formData.name;
        copyOfTableDetails[index].email = formData.email;
        copyOfTableDetails[index].role = formData.role;
        break;
      }
    }
    setDetails(copyOfTableDetails);
  }

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!tableDetails.length) {
    return (<Stack>
      <Search searchHandler={searchHandler} />
      <h2 className="loading">No Details Found.</h2>
    </Stack>);
  }

  return (
    <Stack>
      <Search searchHandler={searchHandler} />
      <AdminTable
        tableDetails={currentRows}
        loading={loading}
        checkBoxHandler={checkBoxHandler}
        checkHandlerForAllRowsOfCurrentPage={
          checkHandlerForAllRowsOfCurrentPage
        }
        deleteByIDHandler={deleteByIDHandler}
        updateDetailHandler={updateDetailHandler}
      />
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
        spacing={8}
        className="footer"
      >
        <Chip 
        sx={{background: "#009879", 
             fontWeight: "700", 
             "&:hover": { backgroundColor: "#5f7068" }
            }}
        label="Delete Selected" 
        disableRipple
        variant="contained" 
        disabled={selectedRows.length ? false : true}
        onClick={() => setAlertDialog(true)}
        />
        <PaginationForTables
          rowsPerPage={rowsPerPage}
          totalRows={tableDetails.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Stack>
      <AlertDialog 
          open={openAlert} 
          openOrCloseAlertDialog={openOrCloseAlertDialog} 
          deleteRecords={deleteMultipleRowsHandler} 
          paramsForDeletion={selectedRows}
        />
    </Stack>
  );
}

export default App;
