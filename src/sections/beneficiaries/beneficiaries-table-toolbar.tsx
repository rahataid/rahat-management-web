import { useCallback } from 'react';
// @mui
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// types
import { BeneficiariesTableFilters, BeneficiariesTableFilterValue } from 'src/types/beneficiaries';
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: BeneficiariesTableFilters;
  onFilters: (name: string, value: BeneficiariesTableFilterValue) => void;
  distributionPointOptions: string[];
  statusOptions: string[];
  tokenAssignedOptions: string[];
  tokenClaimedOptions: string[];
};

export default function BeneficiariesTableToolbar({
  filters,
  onFilters,
  distributionPointOptions,
  statusOptions,
  tokenAssignedOptions,
  tokenClaimedOptions
}: Props) {

  // console.log('token assigned option',tokenAssignedOptions);
  // console.log( 'token claimed option', tokenClaimedOptions);
  
  const popover = usePopover();

  const handleFilterCnicNumber = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('cnicNumber', event.target.value);
    },
    [onFilters]
  );

  const handleFilterDistributionPoint = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'distributionPoint',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterStatus = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'status',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterTokenClaimedStatus = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'tokenClaimedStatus',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterTokenAssignedStatus = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'tokenAssignedStatus',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Distribution Point</InputLabel>

          <Select
            multiple
            value={filters.distributionPoint}
            onChange={handleFilterDistributionPoint}
            input={<OutlinedInput label="Distribution Point" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {distributionPointOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.distributionPoint.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            multiple
            value={filters.status}
            onChange={handleFilterStatus}
            input={<OutlinedInput label="Status" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {statusOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.status.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Token Assigned Status</InputLabel>

          <Select
            multiple
            value={filters.tokenAssignedStatus}
            onChange={handleFilterTokenAssignedStatus}
            input={<OutlinedInput label="Token Assigned Status" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {tokenAssignedOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.tokenAssignedStatus.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Token Claimed Status</InputLabel>

          <Select
            multiple
            value={filters.tokenClaimedStatus}
            onChange={handleFilterTokenClaimedStatus}
            input={<OutlinedInput label="Token Claimed Status" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {tokenClaimedOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.tokenClaimedStatus.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.cnicNumber}
            onChange={handleFilterCnicNumber}
            placeholder="Enter CNIC Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
