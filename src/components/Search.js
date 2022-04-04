import { TextField } from "@mui/material";

export default function Search() {
    return (
        <TextField 
        sx={{width: "90vw", margin: "20px auto"}}
        variant="outlined" 
        label="Search by email, name or role" />
    )
}