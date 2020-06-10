import React, { useState, useEffect } from 'react';


export default props => {
    const [state, setState] = useState({
        drawerWidth: 0
    });

    useEffect(() => {
        const drawerWidth = document.querySelector('.makeStyles-drawerClose-11').clientWidth;
        if (state.drawerWidth !== drawerWidth) {
            setState({ ...state, drawerWidth: drawerWidth });
        }
    }, []);

    return(
        <div style={{ width: `calc(100vw - ${state.drawerWidth}px)` }}>
          {props.children}
        </div>
    );
}