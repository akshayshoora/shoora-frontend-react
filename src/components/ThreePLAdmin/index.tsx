import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import classnames from "classnames";
//Style
import useStyles from "./style";
import COLORS from "../../constants/colors";
//Icon
import AddIcon from "@mui/icons-material/Add";
//Custom component
import Heading from "components/commonComponent/Heading";
//Helper
import { menuOptions } from "./helper";
import { Typography } from "@mui/material";

//Component
import Company from "./Company";
export default function ThreePLAdmin() {
    const classes = useStyles();
    const [activeMenuId, setActiveMenuId] = useState("companies");

    function clickMenuHandler(event: React.MouseEvent<HTMLElement>) {
        const { currentTarget } = event,
            menuId = currentTarget.getAttribute("data-id");
        if (menuId)
            setActiveMenuId(menuId);
    }
    return (
        <Box className={classes.adminContainer}>
            <Heading>3 PL's Admin</Heading>
            <Box className={classes.gridBoxContainer}>
                <Grid container spacing={2}
                    columns={{ xs: 12, lg: 15, xl: 12 }}
                >
                    <Grid item xs={4} lg={3} xl={2}>
                        <Card>
                            <CardContent className={classes.menuCardContent}>
                                <Box component="ul" className={classes.leftMenuSection}>
                                    {menuOptions.map((item) => {
                                        return (
                                            <Box component="li"
                                                data-id={item.id}
                                                onClick={clickMenuHandler}
                                                key={item.id}
                                                className={classnames(
                                                    { active: item.id === activeMenuId }
                                                )}
                                            >
                                                {item.labelName}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={8} lg={12} xl={10}>
                        <Company />
                        {/* <Card>
                            <CardContent className={classes.menuCardContent}>
                                <Box className={classes.menuContentHeader}>
                                    <Typography component="h4" sx={{ fontWeight: "bold" }}>
                                        Companies
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        style={{ color: COLORS.WHITE }}
                                        onClick={() => { }}
                                        size="small"
                                    >
                                        <AddIcon />
                                        Add Company
                                    </Button>
                                </Box>
                                <Box className={classes.menuContentBody}>
                                    This is the job details
                                </Box>
                            </CardContent>
                        </Card> */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}