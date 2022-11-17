import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import COLORS from "constants/colors";

type RadioItemType = {
  label: string;
  value: string | number;
};
interface IRadioGroupProps {
  selected: string | number;
  options: RadioItemType[];
  onChange: (value: string) => void;
}

export default function CustomRadioGroup(props: IRadioGroupProps) {
  const { options, onChange, selected } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <RadioGroup row name="radio-buttons-group" onChange={handleChange}>
      {options.map((option) => (
        <FormControlLabel
          value={option.value}
          control={<Radio checked={selected === option.value} />}
          label={option.label}
          style={{
            textTransform: "capitalize",
            fontSize: 14,
            color: COLORS.SECONDARY_FONT,
          }}
        />
      ))}
    </RadioGroup>
  );
}
