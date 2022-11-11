import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

type MenuItemType = { label: string; value: any };

interface ITextInputProps {
  onChange: (value: string) => void;
  label: string;
  style?: React.CSSProperties;
  menuItems: MenuItemType[];
  isLoading: boolean;
  value?: string;
  isRequired: boolean;
}

export default function SelectField(props: ITextInputProps) {
  const {
    label,
    style,
    onChange: valueCallBack,
    menuItems,
    isLoading,
    isRequired,
    value,
  } = props;

  const handleChange = (event: SelectChangeEvent) => {
    valueCallBack(event.target.value as string);
  };

  const selectedValue = value ? value : "";

  return (
    <Box style={{ ...style }}>
      <div style={{ display: "flex", marginBottom: 8 }}>
        <Typography fontSize={16} style={{ fontWeight: 200, marginRight: 2 }}>
          {label}
        </Typography>
        {isRequired ? "*" : null}
      </div>
      <Select
        fullWidth
        id="demo-simple-select"
        value={selectedValue}
        onChange={handleChange}
        size="small"
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select {label}
        </MenuItem>
        {isLoading ? (
          <MenuItem>
            <CircularProgress />
          </MenuItem>
        ) : menuItems.length ? (
          menuItems.map((item, index) => (
            <MenuItem style={{ fontSize: 14 }} value={item.value}>
              {item.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem>Nothing to Select</MenuItem>
        )}
      </Select>
    </Box>
  );
}
