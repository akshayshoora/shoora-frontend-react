import { Typography } from "@mui/material";

import useStyles from "./style";

interface IHeadingProps {
  children?: React.ReactNode;
}

export default function Heading(props: IHeadingProps) {
  const classes = useStyles();
  return (
    <Typography component="span" className={classes.heading}>
      {props.children}
    </Typography>
  );
}
