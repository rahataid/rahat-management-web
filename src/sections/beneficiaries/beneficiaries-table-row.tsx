// @mui
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
//
import Label from '@components/label/label';
import { IBeneficiariesItem } from 'src/types/beneficiaries';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: IBeneficiariesItem;
  onViewRow: VoidFunction
};

export default function BeneficiariesTableRow({
  row,
  selected,
  onViewRow
}: Props) {
  const { name, cnicNumber, hasInternetAccess, status, tokensAssigned, tokensClaimed } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
      <TableRow hover selected={selected}>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>       

          <ListItemText
            primary={name}           
            primaryTypographyProps={{ typography: 'body2' }}            
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{hasInternetAccess}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'ACTIVE' && 'success') ||
              (status === 'INACTIVE' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{tokensAssigned}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{tokensClaimed}</TableCell>

        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View Details" placement="top" arrow>
              <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
                <Iconify color='#118D57' icon="iconamoon:eye-light" />
              </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
  );
}
