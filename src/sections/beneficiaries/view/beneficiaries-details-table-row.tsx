import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { truncateEthAddress } from '@utils/strings';

type Props = {
  selected: boolean;
  row: any;
};

export default function BeneficiaryDetailsTableRow({ row, selected }: Props) {
  const { timestamp, txHash, topic, amount, contractName, vendor } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <ListItemText
          primary={topic}
          secondary={contractName}
          primaryTypographyProps={{ typography: 'body2' }}
        />
      </TableCell>
      <TableCell>
        <ListItemText primary={vendor} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>
      <TableCell>
        <ListItemText primary={timestamp} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={truncateEthAddress(txHash, 6)}
          primaryTypographyProps={{ typography: 'body2' }}
        />
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <ListItemText primary={amount} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>
    </TableRow>
  );
}
