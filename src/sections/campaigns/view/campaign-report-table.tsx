import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const CampaignReportTable = ({ data = [] }: any) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>SN</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Date of Birth</TableCell>
          <TableCell>Gender</TableCell>
          <TableCell>Street</TableCell>
          <TableCell>Ward</TableCell>
          <TableCell>City</TableCell>
          <TableCell>District</TableCell>
          <TableCell>Province</TableCell>
          <TableCell>Call Date</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Billsec</TableCell>
          <TableCell>Disposition</TableCell>
          <TableCell>Hangup Cause</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{row?.SN}</TableCell>
            <TableCell>{row?.phoneNumber}</TableCell>
            <TableCell>{row?.name}</TableCell>
            <TableCell>{row?.dob}</TableCell>
            <TableCell>{row?.gender}</TableCell>
            <TableCell>{row?.street}</TableCell>
            <TableCell>{row?.ward}</TableCell>
            <TableCell>{row?.city}</TableCell>
            <TableCell>{row?.distric}</TableCell>
            <TableCell>{row?.province}</TableCell>
            <TableCell>{row?.callDate}</TableCell>
            <TableCell>{row?.duration}</TableCell>
            <TableCell>{row?.billSec}</TableCell>
            <TableCell>{row?.disposition}</TableCell>
            <TableCell>{row?.hangupCase}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CampaignReportTable;
