import React from 'react';

import { 
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
    Slide, TextField 
} 
from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles((theme) => ({
    dialog : {
        '& .MuiDialog-paper': {
            padding: '1rem'
        },
        '& .MuiTextField-root': {
            margin: '1rem 0px',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = Yup.object({
    title: Yup.string().required("This field is required."),
    content: Yup.string().required("This field is required.")
});

export default props => {
    const classes = useStyles();
    return(
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.closeNoteDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth='lg'
            className={classes.dialog}
        >
            <DialogTitle id="alert-dialog-slide-title">Create Note</DialogTitle>
            <Formik
                initialValues={{ title: '', content: '' }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    fetch('/api/notes', { method: 'POST', body: JSON.stringify(values) }
                    ).then(res => res.json()).then(res => {
                        props.closeNoteDialog();
                    }).catch(error => {
                        console.log(error);
                    });
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <>
                        <DialogContent>
                            <TextField
                                variant='outlined'
                                onChange={handleChange}
                                value={values.title}
                                name='title'
                                label='Title'
                                required
                                error={errors.title ? true : false}
                                helperText={errors.title}
                                fullWidth
                            />
                            <TextField
                                variant='outlined'
                                onChange={handleChange}
                                value={values.content}
                                name='content'
                                label='Content'
                                required
                                error={errors.content ? true : false}
                                helperText={errors.content}
                                fullWidth
                                multiline
                                rows={4}
                            />                            
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' color='primary' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Formik>            
        </Dialog>
    );
}
