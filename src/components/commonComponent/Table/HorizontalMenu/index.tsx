import React from "react";
import { IconButton, Tooltip } from "@mui/material";

import classnames from "classnames";
import useStyles from "./style";
import { useState } from "react";

export interface IOptionsHrtl {
    id: string;
    actionIcon: React.ReactNode;
    actionName: string;
    onClickHndlr?: any;
}

export interface IMenuOptionHrtl {
    actionOptions: Array<IOptionsHrtl>;
    rowId?: string;
}


export default function HorizontalMenu({
    actionOptions,
    rowId = "",
}: IMenuOptionHrtl) {
    const classes = useStyles();
    return (
        <ul className={classes.hrMenuOptionContainer}>
            {actionOptions.map((item) => (
                <React.Fragment key={item.id}>
                    <li
                        className="list-inline-item"
                        data-id={rowId}
                        onClick={item.onClickHndlr}
                        id={`${item.id}${rowId}`}
                    >
                        <Tooltip title={item.actionName}>
                            <IconButton style={{ padding: "4px" }}>
                                {item.actionIcon}
                            </IconButton>
                        </Tooltip>
                    </li>

                    {/* <UncontrolledTooltip placement="bottom" target={`${item.id}${rowId}`}>
                        {item.actionName}
                    </UncontrolledTooltip> */}
                </React.Fragment>
            ))}
        </ul>
    );
};
