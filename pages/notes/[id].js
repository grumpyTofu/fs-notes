import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Backdrop, CircularProgress, Grid, Typography, Card, CardContent, CardHeader, IconButton, 
    TextField
} from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import { makeStyles } from '@material-ui/core/styles';


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
    note: null,
    error: null,
    editing: false
};

export default props => {
    const classes = useStyles();

    const [state, setState] = useState(initialState);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            if (!state.note && state.loading === true) {
                console.log('fetch data and stop loading');
                fetch(`/api/notes/${id}`).then(res => res.json()).then(res => {
                    setState({ ...state, note: res.doc, loading: false});
                }).catch(error => {
                    setState({ ...state, note: {}, error: error, loading: false});
                });                
            }
        }
    }, [id, state]);

    const handleTitleEdit = event => {
        setState({ ...state, note: { ...state.note, title: event.target.value }});
    }

    const handleContentEdit = event => {
        setState({ ...state, note: { ...state.note, content: event.target.value }});
    }

    const saveNote = () => {
        console.log('Update note and reset to initial state to reload note');
        fetch(`/api/notes/${id}`, { 
            method: 'PUT', 
            body: JSON.stringify(state.note) 
        }).then(res => res.json()).then(res => console.log(res)).catch(error => console.log(error));
        setState(initialState);
    }

    return(
        <>
            {state.loading === true ?
                <Backdrop className={classes.backdrop} open={state.loading}>
                    <CircularProgress color='inherit'/>
                </Backdrop>
            : 
                <Grid container justify='center'>
                    <Grid item xs={11}>
                        <Card>
                            <CardHeader
                                title={state.editing === true ? 
                                        <TextField 
                                            label='Title' 
                                            value={state.note.title} 
                                            fullWidth 
                                            onChange={handleTitleEdit}
                                            variant='outlined'
                                        />
                                    : 
                                        state.note.title
                                }
                                subheader={state.note.created && state.editing === false && state.note.created}
                                action={state.editing === true ?
                                        <IconButton 
                                            aria-label="edit note" 
                                            onClick={saveNote}
                                        >
                                            <SaveTwoToneIcon/>
                                        </IconButton>
                                    :
                                        <IconButton 
                                            aria-label="edit note" 
                                            onClick={() => setState({...state, editing: true})}
                                        >
                                            <EditTwoToneIcon/>
                                        </IconButton>
                                }
                            />                        
                            <CardContent>
                                {state.editing === true ? 
                                        <TextField 
                                            label='Content' 
                                            value={state.note.content} 
                                            fullWidth 
                                            multiline
                                            rows={4}
                                            onChange={handleContentEdit}
                                            variant='outlined'
                                        />
                                    : 
                                        <Typography>{state.note.content}</Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
        </>
    );
}