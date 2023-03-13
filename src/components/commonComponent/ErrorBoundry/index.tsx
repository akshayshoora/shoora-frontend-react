import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@mui/material";
import CSS from "csstype";
import { COLORS } from "../../../constants/colors";

const wrapper: CSS.Properties = {
  position: "relative",
  display: "flex",
  height: "80vh",
  justifyContent: "center",
  verticalAlign: "middle",
  width: "100%",
};

const box: CSS.Properties = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  msTransform: "translateY(-50%)",
  transform: "translateY(-50%)",
};

const firstHeading: CSS.Properties = {
  margin: "10px",
  lineHeight: "1.5rem",
};

const secondHeading: CSS.Properties = {
  margin: "10px",
  lineHeight: "2rem",
  color: COLORS.SECONDARY_FONT,
  fontWeight: "500",
};

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public state: State = {
    hasError: false,
  };

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) {
      this.setState({
        hasError: false,
      });
    }
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleClick() {
    this.setState({
      hasError: false,
    });
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={wrapper}>
          <div style={box}>
            <h2 style={firstHeading}>Oops!</h2>
            <h5 style={secondHeading}>
              An error has occured. We are looking into this.
            </h5>
            <Button
              variant="contained"
              style={{ background: COLORS.PRIMARY_COLOR }}
              onClick={this.handleClick}
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
