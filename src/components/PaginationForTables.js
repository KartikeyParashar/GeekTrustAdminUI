import { Button, Stack } from "@mui/material";
import React from "react";


export default function PaginationForTables({ rowsPerPage, totalRows, paginate, currentPage }) {
    const pageNumbers = [];

    for ( let index = 1; index <= Math.ceil(totalRows / rowsPerPage); index++ ) {
        pageNumbers.push(index);
    }

    return (
        <Stack direction="row" spacing={1}>
            {pageNumbers.map(number => (
                <div key={number}>
                    <Button size="small" color="secondary" variant={number === currentPage ? "contained" : "outlined"} onClick={() => paginate(number)}>
                    {number}
                    </Button>
                </div>
            ))}
        </Stack>
    )
}

