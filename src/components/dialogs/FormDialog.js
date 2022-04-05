// MUI Imports
import {
    Button, Dialog,
    DialogActions,
    DialogContent, DialogTitle, MenuItem, Stack, TextField
} from '@mui/material';


export default function FormDialog({open, 
    openOrCloseFormHandler, 
    form, editDetailHandler, 
    updateDetailHandler}) {
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const updateFormHandler = () => {
        if ( nameRegex.test(form.name) && emailRegex.test(form.email) ) {
            openOrCloseFormHandler();
            updateDetailHandler(form);
        }
    }

    return (
        <div>
        <Dialog open={open} onClose={openOrCloseFormHandler} >
            <DialogTitle sx={{margin: "0.5rem 3rem"}}>Edit Details</DialogTitle>
            <DialogContent className="formDialog">
                <Stack spacing={4} sx={{margin: "0rem 3rem"}}>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    sx={{width: "20rem"}}
                    value={form.name}
                    onChange={(e) => editDetailHandler(form.id, e.target.value, form.email, form.role)}
                    error={nameRegex.test(form.name) ? false : true}
                    helperText={nameRegex.test(form.name) ? "Please edit Name here" : "Please enter a valid Name"}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={form.email}
                    onChange={(e) => editDetailHandler(form.id, form.name, e.target.value, form.role)}
                    error={emailRegex.test(form.email) ? false : true}
                    helperText={emailRegex.test(form.email) ? "Please edit Email here" : "Please enter a valid Email"}
                    sx={{width: "20rem"}}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Role"
                    type="email"
                    fullWidth
                    variant="outlined"
                    select
                    sx={{width: "20rem"}}
                    value={form.role}
                    onChange={(e) => editDetailHandler(form.id, form.name, form.email, e.target.value)}
                    error={false}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="member">Member</MenuItem>
                    </TextField>
                </Stack>
            
            </DialogContent>
            <DialogActions sx={{padding: "0rem 4.5rem 2.5rem 0"}}>
            <Button onClick={openOrCloseFormHandler} sx={{color: "black"}}>Cancel</Button>
            <Button variant="contained" color="success" onClick={updateFormHandler}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}