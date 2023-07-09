// @mui
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { ITransactionItem } from 'src/types/transactions';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: ITransactionItem;
  onViewRow: VoidFunction;
};

export default function TransactionTableRow({ row, selected, onViewRow }: Props) {
  const { hash, timestamp, method } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <ListItemText primary={timestamp} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={hash} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (method === 'Method 1' && 'success') ||
            (method === 'Method 2' && 'warning') ||
            (method === 'Method 3' && 'error') ||
            'default'
          }
        >
          {method}
        </Label>
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify color='#118D57' icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
