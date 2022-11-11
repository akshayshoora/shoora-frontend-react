import {
  createTheme,
  ThemeProvider,
  ThemeOptions,
  Palette,
  PaletteOptions,
} from "@mui/material/styles";
import { COLORS } from "./constants/colors";
declare module "@mui/material/styles" {
  interface Theme {
    palette: Palette;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: PaletteOptions;
  }
}

const HEADING_DEFAULT_PROPERTIES = {
  color: COLORS.PRIMARY_FONT,
  fontWeight: "bold",
};

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: COLORS.PRIMARY_COLOR,
    },
    secondary: {
      main: COLORS.PRIMARY_COLOR,
    },
    text: {
      primary: COLORS.PRIMARY_FONT,
    },
  },
  typography: {
    fontFamily: "Satoshi",
    h1: {
      fontSize: 32,
      lineHeight: "43px",
      ...HEADING_DEFAULT_PROPERTIES,
    },
    h2: {
      fontSize: "24px",
      lineHeight: "32px",
      ...HEADING_DEFAULT_PROPERTIES,
    },
    h3: {
      fontSize: 20,
      lineHeight: "27px",
      ...HEADING_DEFAULT_PROPERTIES,
    },
    h4: {
      fontSize: 18,
      lineHeight: "24px",
      ...HEADING_DEFAULT_PROPERTIES,
    },
    subtitle1: {
      color: COLORS.SECONDARY_FONT,
      fontSize: 16,
      lineHeight: "21.6px",
    },
    subtitle2: {
      color: COLORS.SECONDARY_FONT,
      fontSize: 14,
      lineHeight: "18.9px",
    },
    body2: {
      color: COLORS.SECONDARY_FONT,
      fontSize: 12,
      lineHeight: "18px",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            boxShadow: "none",
            color: COLORS.WHITE,
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontFamily: "satoshi-medium",
          },
        },
        {
          props: { color: "secondary", variant: "contained", fullWidth: true },
          style: {
            background: COLORS.WHITE,
            color: COLORS.PRIMARY_FONT,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: COLORS.WHITE,
              boxShadow: "none",
            },
          },
        },
      ],
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: COLORS.PRIMARY_FONT,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
        },
      },
    },
    MuiTextField: {
      variants: [{ props: { variant: "outlined" }, style: {} }],
    },
  },
};

const theme = createTheme(themeOptions);

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
