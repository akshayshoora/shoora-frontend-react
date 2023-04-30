import { Typography } from "@mui/material";
import classNames from "classnames";
import React from "react";

import useStyles from "./style";

interface ISpanProps {
  children?: React.ReactNode;
  fontType?: "primary" | "secondary";
  size?: "extra-small" | "small" | "medium" | "large";
  fontWeight?: number | string;
  containerClassName?: string;
}

/**
 * Span Component is created to use to define any type of font in define out application.
 */
function Span(props: ISpanProps) {
  const classes = useStyles();

  function getSizeClass() {
    switch (props.size) {
      case "extra-small":
        return classes.font_12;
      case "small":
        return classes.font_14;
      case "large":
        return classes.font_18;
      case "medium":
      default:
        return classes.font_16;
    }
  }

  function getFontTypeClass() {
    switch (props.fontType) {
      case "secondary":
        return classes.secondaryFont;
      case "primary":
      default:
        return classes.primaryFont;
    }
  }

  return (
    <Typography
      component="span"
      className={classNames(getSizeClass(), getFontTypeClass(), classes.root, props.containerClassName)}
      style={{ fontWeight: props.fontWeight }}
    >
      {props.children}
    </Typography>
  );
}

Span.defaultProps = {
  fontType: "primary",
  size: "medium",
  fontWeight: "inherit",
};

export default Span;
