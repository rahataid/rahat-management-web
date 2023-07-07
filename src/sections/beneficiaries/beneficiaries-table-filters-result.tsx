// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack, { StackProps } from '@mui/material/Stack';
// types
import { BeneficiariesTableFilters, BeneficiariesTableFilterValue } from 'src/types/beneficiaries';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: BeneficiariesTableFilters;
  onFilters: (name: string, value: BeneficiariesTableFilterValue) => void;
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
  const handleRemoveStatus = (inputValue: string) => {
    const newValue = filters.status.filter((item) => item !== inputValue);
    onFilters('status', newValue);
  };

  const handleRemoveDistributionPoint = (inputValue: string) => {
    const newValue = filters.distributionPoint.filter((item) => item !== inputValue);
    onFilters('distributionPoint', newValue);
  };

  const handleRemoveTokenAssignedStatus = (inputValue: string) => {
    const newValue = filters.tokenAssignedStatus.filter((item) => item !== inputValue);
    onFilters('tokenAssignedStatus', newValue);
  };

  const handleRemoveTokenClaimedStatus = (inputValue: string) => {
    const newValue = filters.tokenClaimedStatus.filter((item) => item !== inputValue);
    onFilters('tokenClaimedStatus', newValue);
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

        {!!filters.distributionPoint.length && (
          <Block label="Distribution Point:">
            {filters.distributionPoint.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveDistributionPoint(item)} />
            ))}
          </Block>
        )}

        {!!filters.status.length && (
          <Block label="Distribution Point:">
            {filters.status.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveStatus(item)} />
            ))}
          </Block>
        )}

        {!!filters.tokenAssignedStatus.length && (
          <Block label="Token Assigned Status:">
            {filters.tokenAssignedStatus.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveTokenAssignedStatus(item)} />
            ))}
          </Block>
        )}

        {!!filters.tokenClaimedStatus.length && (
          <Block label="Token Claimed Status:">
            {filters.tokenClaimedStatus.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveTokenClaimedStatus(item)} />
            ))}
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