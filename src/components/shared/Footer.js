import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Developed by Ajayraj
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
