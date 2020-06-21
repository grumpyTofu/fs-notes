import React from 'react';
import Link from 'next/link';
import { Card, Typography, CardHeader, CardContent, IconButton } from '@material-ui/core';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    noteCard : {
        '& .MuiTypography-root': {
            overflowWrap: 'break-word'
        },
        '& .MuiCardActionArea-root': {
            padding: '1rem'
        }
    },
}));

export default props => {
    const classes = useStyles();

    const handleDelete = () => {
        fetch(`/api/notes/${props.data._id}`, {method: 'DELETE'}).then(res => res.json()).then(res => {
            console.log(res);
            props.resetDashboard();
        }).catch(error => {
            console.log(res, error);
        })
    }

    return(
        <Card className={classes.noteCard}>
            <CardHeader
                title={props.data.title && props.data.title}
                subheader={props.data.created && props.data.created}
                action={
                    <>
                        <Link href='/notes/[slug]' as={`/notes/${props.data._id}`}>
                            <IconButton aria-label="view note" component='a'>
                                <VisibilityTwoToneIcon/>
                            </IconButton>
                        </Link>
                        <IconButton aria-label='delete note' onClick={handleDelete}>
                            <DeleteTwoToneIcon/>
                        </IconButton>
                    </>
                }
            />                        
            <CardContent>
                <Typography>{props.data.content}</Typography>
            </CardContent>
        </Card>
    );
}