import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBeneficiaries } from 'src/api/beneficiaries';
import FormProvider from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
};

const CampaignAssignBenficiariesModal = ({ open, onClose, onOk }: Props) => {
  const methods = useForm({
    // resolver: yupResolver(FormSchema),
    // defaultValues,
  });

  const { handleSubmit } = methods;

  const [beneficiary, setBeneficiary] = useState<string[]>([]);
  const { beneficiaries } = useBeneficiaries();

  const onSubmit = handleSubmit(async () => {
    try {
      console.log('submit');
    } catch (error) {
      console.error(error);
    }
  });
  const handleChange = (event: SelectChangeEvent<typeof beneficiary>) => {
    const {
      target: { value },
    } = event;
    setBeneficiary(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register Beneficiaries.</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        Register Existing Beneficiaries as audience of the campaign.
      </DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={beneficiary}
            onChange={handleChange}
            fullWidth
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {beneficiaries.map((benef) => (
              <MenuItem key={benef.name} value={benef.name}>
                {benef.name}
              </MenuItem>
            ))}
          </Select>
        </FormProvider>
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={onOk} autoFocus>
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampaignAssignBenficiariesModal;
