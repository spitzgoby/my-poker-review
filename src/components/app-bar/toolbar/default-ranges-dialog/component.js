import {find} from 'lodash'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import defaultRanges from 'lib/default-ranges'
import defaultRangeTypes from 'lib/default-ranges/types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import React, {useState} from 'react'
import injectSheet from 'react-jss'
import styles from './styles'

const DefaultRangesDialog = (props) => {

    const [selectedDefaultRange, setSelectedDefaultRange] = useState('')

    const handleClose = () => {
        const setSelectRangeDialogOpen = props.actions.setSelectRangeDialogOpen

        if (setSelectRangeDialogOpen) {
            setSelectRangeDialogOpen()
        }
    }

    const handleSelectRangeClick = (defaultRange) => {
        const {
            setSelectRangeDialogOpen,
            setRanges 
        } = props.actions

        if (defaultRange.type === defaultRangeTypes.range) {
            if (setRanges) {
                setRanges([...defaultRange.range])
            }

            if (setSelectRangeDialogOpen) {
                setSelectRangeDialogOpen()
            }
        } else {
            setSelectedDefaultRange(defaultRange.name)
        }
    }

    const getProps = () => ({
        onClose: handleClose,
        open: props.open   
    })

    const renderSublistIndicator = (defaultRange) => defaultRange.type === defaultRangeTypes.list
        ? <ChevronRightIcon /> 
        : null

    const renderDefaultRange = (defaultRange) => (
        <ListItem button key={defaultRange.name} onClick={() => handleSelectRangeClick(defaultRange)}>
            {console.log(defaultRange)}
            {defaultRange.name}{renderSublistIndicator(defaultRange)}
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
                    { selectedDefaultRange 
                        ? find(defaultRanges, defaultRange => defaultRange.name === selectedDefaultRange).ranges.map(renderDefaultRange)
                        : defaultRanges.map(renderDefaultRange)}
                </List>
                <DialogActions classes={{root: props.classes.backButton}}>
                    {
                        selectedDefaultRange 
                            ? <Button onClick={() => setSelectedDefaultRange('')}><ChevronLeftIcon /> Back</Button> 
                            : null
                    }
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}

export default injectSheet(styles)(DefaultRangesDialog)