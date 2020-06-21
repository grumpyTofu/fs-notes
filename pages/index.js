import React, { useState, useEffect } from 'react';

import { Backdrop, CircularProgress, Card, Typography, Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Note from '../components/Note';
import CreateNoteDialog from '../components/CreateNoteDialog';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  fab: {
    margin: theme.spacing(1),
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    '&:focus': {
        outline: 'none'
    }
  },
}));

const initialState = {
    loading: true,
    notes: [],
    error: null,
    noteDialogOpen: false
};

export default props => {

    const classes = useStyles();

    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        if (state.notes.length === 0 || (state.notes.length > 0 && state.loading === true) === true) {
            fetch('/api/notes').then(response => response.json()).then(response => {
                setState({ ...state, notes: response, loading: false });
            }).catch(error => {
                setState({ ...state, error: error, loading: false });
            });
        }
    }, [state]);

    const openNoteDialog = () => {
        setState({ ...state, noteDialogOpen: true });
    }

    const closeNoteDialog = () => {
        setState({ ...state, noteDialogOpen: false, loading: true });
    }

    return (
        <>
            {state.loading === true ? 
                <Backdrop className={classes.backdrop} open={state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            :
                <>
                    <Grid container justify='center' spacing={2}>
                        {state.notes.length > 0 && state.notes.map((note, index) => 
                            <Grid item xs={11} md={5} key={note._id + 'GridItem'}>
                                <Note 
                                    data={note} 
                                    key={note._id} 
                                    resetDashboard={() => setState(initialState)}
                                />
                            </Grid>
                        )}
                    </Grid>
                    <Fab color="secondary" aria-label="add" className={classes.fab} onClick={openNoteDialog}>
                        <AddIcon />
                    </Fab>
                    <CreateNoteDialog open={state.noteDialogOpen} closeNoteDialog={closeNoteDialog} />
                </>
            }
        </>
    );
}