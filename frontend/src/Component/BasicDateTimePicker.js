import {TextField} from "@mui/material"
import { AdapterDateFns, LocalizationProvider, DateTimePicker } from '@mui/lab';

export default function BasicDateTimePicker(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={props.dateTime}
        onChange={(newValue) => {
          props.setDateTime(newValue);
        }}
      />
    </LocalizationProvider>
  );
}