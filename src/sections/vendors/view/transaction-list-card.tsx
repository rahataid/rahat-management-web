import WalletAddressButton from '@components/wallet-address-button';
import { Card, CardContent, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface ITransactionTable {
  rows: any[];
}

export default function TransactionTable({ rows = [] }: ITransactionTable) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={{ pt: 3, mb: 3 }}>
          Transaction History
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Transaction Hash</TableCell>
                <TableCell>Beneficiary</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.topic}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.timestamp}
                  </TableCell>
                  <TableCell>
                    <WalletAddressButton address={row.txHash} type="txHash" />
                  </TableCell>
                  <TableCell>{row.beneficiary}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
