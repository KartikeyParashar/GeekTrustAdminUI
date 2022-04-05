//MUI Imports
import { TextField } from "@mui/material";
//React Imports
import { useState } from "react";


export default function Search({searchHandler}) {
    const [searchValue, setSearchValue] = useState("");
    const [timerId, setTimerId] = useState(null);

    const debounceSearch = (event, debounceTimeout) => {
        setSearchValue(event.target.value);
        if(debounceTimeout) {
            clearInterval(timerId);
        }
        const debounceId = setTimeout(() => {
            searchHandler(event.target.value);
        }, 300)
        setTimerId(debounceId);
    }

    return (
        <TextField 
        value={searchValue}
        onChange={(event) => debounceSearch(event, timerId)}
        sx={{width: "90vw", margin: "20px auto"}}
        variant="outlined" 
        label="Search by email, name or role" />
    )
}