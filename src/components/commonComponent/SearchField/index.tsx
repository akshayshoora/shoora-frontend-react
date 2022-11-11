import * as React from "react";
import { debounce } from "lodash";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import COLORS from "../../../constants/colors";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    border: "1px solid #e0e0e0",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: 200,
    borderRadius: "4px",
    fontSize: 12,
  },
}));

interface ITextInputProps {
  onChangeFunc: (value: string) => void;
  style?: React.CSSProperties;
  value?: string | number | null;
  placeholder?: string;
  regex?: RegExp; 
}

export default function SearchBox(props: ITextInputProps) {
  const { style, onChangeFunc, regex, ...textFieldProps } = props;
  const debouncedSearch = React.useRef(
    debounce((value) => {
      onChangeFunc(value);
    }, 400)
  ).current;

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (event: React.ChangeEvent<{ value?: unknown }>) => {
    const textValue = String(event.target.value);
    if (regex) {
      const value = textValue.replace(regex, "");
      debouncedSearch(value);
      return;
    }
    debouncedSearch(textValue);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon fontSize="small" style={{ color: COLORS.SECONDARY_FONT }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={textFieldProps.placeholder}
        inputProps={{ "aria-label": "search" }}
        {...textFieldProps}
        value={textFieldProps.value !== null ? textFieldProps.value : ""}
        onChange={handleChange}
      />
    </Search>
  );
}
