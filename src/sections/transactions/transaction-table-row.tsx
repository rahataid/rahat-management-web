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
import WalletAddressButton from '@components/wallet-address-button';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: any;
  onViewRow: VoidFunction;
};

export default function TransactionTableRow({ row, selected, onViewRow }: Props) {
  const { txHash, timestamp, topic, contractName, amount, beneficiary, vendor } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <ListItemText
          primary={topic || '-'}
          secondary={contractName || '-'}
          primaryTypographyProps={{ typography: 'body2' }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={beneficiary || '-'}
          primaryTypographyProps={{ typography: 'body2' }}
        />
      </TableCell>
      <TableCell>
        <ListItemText primary={amount || '-'} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={timestamp || '-'} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <WalletAddressButton address={txHash} type="txHash" />
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify color="#118D57" icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
