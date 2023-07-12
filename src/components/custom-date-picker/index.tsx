import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useController } from 'react-hook-form';

type Props = {
  error: any;
  label: any;
  format?: any;
  name: string;
  control: any;
  onChange: VoidFunction;
};

const DatePicker = ({ error, label, format, name, control, onChange }: Props) => {
  const { field } = useController({ name, control });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        inputFormat={format}
        {...field}
        renderInput={({ error: inputError, ...params }) => <TextField error={error} helperText={error} {...params} />}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
