// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';
// types
import { IBeneficiariesTableFilterValue, IBeneficiaryApiFilters } from 'src/types/beneficiaries';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IBeneficiaryApiFilters;
  onFilters: (name: string, value: IBeneficiariesTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function BeneficiariesTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveInternetAccess = () => {
    onFilters('internetStatus', '');
  };

  const handleRemovePhoneStatus = () => {
    onFilters('phoneStatus', '');
  };

  const handleRemoveBankStatus = () => {
    onFilters('bankStatus', '');
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.internetStatus && (
          <Block label="Internet Access:">
            <Chip
              key={filters.internetStatus}
              label={filters.internetStatus}
              size="small"
              onDelete={() => handleRemoveInternetAccess()}
            />
          </Block>
        )}
        {!!filters.phoneStatus && (
          <Block label="Phone Status:">
            <Chip
              key={filters.phoneStatus}
              label={filters.phoneStatus}
              size="small"
              onDelete={() => handleRemovePhoneStatus()}
            />
          </Block>
        )}
        {!!filters.bankStatus && (
          <Block label="Bank Status:">
            <Chip
              key={filters.bankStatus}
              label={filters.bankStatus}
              size="small"
              onDelete={() => handleRemoveBankStatus()}
            />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
