import { Box, TextField, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import COLORS from "../../../constants/colors";

interface ITextInputProps {
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  isRequired: boolean;
  style?: React.CSSProperties;
  value?: string | number | null;
  defaultValue?: string | number | null;
  regex?: RegExp;
  infoText?: string;
  errorMessage?: string;
  onBlur?: (value: string) => void;
  disabled?: boolean;
}

export default function TextInput(props: ITextInputProps) {

  const {
    label,
    style,
    onChange,
    onBlur,
    disabled,
    errorMessage,
    regex,
    isRequired,
    ...textFieldProps
  } = props;

  console.log(textFieldProps);

  function handleTextChange(event: React.ChangeEvent<{ value: unknown }>) {
    const textValue = String(event.target.value);

    if (regex) {
      const value = textValue.replace(regex, "");
      onChange(value);
      return;
    }

    onChange(textValue);
  }

  function handleBlur(event: React.ChangeEvent<{ value: unknown }>) {
    const textValue = String(event.target.value);

    if (regex) {
      const value = textValue.replace(regex, "");
      onChange(value.trim());
      return;
    }

    onChange(textValue.trim());
  }

  return (
    <Box style={{ ...style }}>
      <Box style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex" }}>
          <Typography fontSize={16} style={{ fontWeight: 200, marginRight: 2 }}>
            {label}
          </Typography>
          {isRequired ? "*" : null}
        </div>
        {props.infoText ? (
          <Tooltip title={props.infoText}>
            <InfoIcon
              fontSize="small"
              style={{ marginLeft: 8, color: COLORS.SECONDARY_FONT }}
            />
          </Tooltip>
        ) : null}
      </Box>
      <TextField
        fullWidth
        size="small"
        id={label}
        {...textFieldProps}
        value={textFieldProps.value!==null ? textFieldProps.value : ''}
        label=""
        onChange={handleTextChange}
        disabled={disabled}
        onBlur={handleBlur}
        error={Boolean(errorMessage)}
        helperText={errorMessage}
      />
    </Box>
  );
}
