import React from 'react';

import { Card, Typography, Grid } from '@material-ui/core';

export default props => {
    
    return (
        <Grid container justify='center'>
            <Grid item xs={11}>
                <Card>
                    <Typography variant="h4" align='center'>Welcome to FS Notes</Typography>
                    <Typography variant="body1">
                        This app uses Next.js, powered by Express.js, connected using Apollo and styled with Material-UI
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    );
}