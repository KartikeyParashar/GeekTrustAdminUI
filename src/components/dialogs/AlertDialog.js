import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

export default function AlertDialog({open, openOrCloseAlertDialog, deleteRecords, paramsForDeletion}) {

  const deleteHandler = () => {
      openOrCloseAlertDialog();
      deleteRecords(paramsForDeletion)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={openOrCloseAlertDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the selected records permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: "black"}} onClick={openOrCloseAlertDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="success" 
            onClick={deleteHandler} 
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
