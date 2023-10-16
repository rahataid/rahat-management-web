import Iconify from '@components/iconify/iconify';
import { Box, Button } from '@mui/material';
import { generateWalletAddress } from '@web3/utils';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { fields } from './data-points';

interface IBeneficiariesSpreedsheetImport<T extends Record<string, unknown>> {
  isOpen: boolean;
  onSubmit: (data: any, file: File) => void;
  handleOpenClose: VoidFunction;
}

const BeneficiariesSpreedsheetImport = <T extends Record<string, unknown>>({
  isOpen,
  handleOpenClose,
  onSubmit,
}: IBeneficiariesSpreedsheetImport<T>) => {
  const rowHook = (data: object) => {
    // Generate a unique wallet address for each row
    const { address } = generateWalletAddress();
    // Modify the data to set the generated walletAddress for each row
    return { ...data, walletAddress: address };
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<Iconify icon="mingcute:add-line" />}
        color="success"
        onClick={handleOpenClose}
      >
        Upload File
      </Button>

      <ReactSpreadsheetImport
        isOpen={isOpen}
        fields={fields}
        onClose={handleOpenClose}
        onSubmit={onSubmit}
        rowHook={rowHook}
        autoMapHeaders
      />
    </Box>
  );
};

export default BeneficiariesSpreedsheetImport;
