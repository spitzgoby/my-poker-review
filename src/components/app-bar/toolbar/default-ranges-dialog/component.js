import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import defaultRanges from 'lib/default-ranges'
import React from 'react'

const DefaultRangesDialog = (props) => {

    const handleClose = () => {
        const setSelectRangeDialogOpen = props.actions.setSelectRangeDialogOpen

        if (setSelectRangeDialogOpen) {
            setSelectRangeDialogOpen()
        }
    }

    const getProps = () => ({
        onClose: handleClose,
        open: props.open   
    })

    const renderDefaultRange = (defaultRange) => (
        <ListItem>
            {defaultRange.name}
        </ListItem>
    )

    return (
        <Dialog {...getProps()}>
            <DialogTitle>
                Select a Default Range
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose from one of the predefined ranges below
                </DialogContentText>
                <List>
                    {defaultRanges.map(renderDefaultRange)}
                </List>
                <DialogActions>
                    <Button>
                        Select
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default DefaultRangesDialog