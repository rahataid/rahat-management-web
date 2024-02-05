import { Skeleton, Stack } from '@mui/material';

const TransactionLoadingSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rectangular" width="25%" height={250} />
        <Skeleton variant="rectangular" width="25%" height={250} />
        <Skeleton variant="rectangular" width="25%" height={250} />
        <Skeleton variant="rectangular" width="25%" height={250} />
      </Stack>
      <Skeleton variant="rectangular" width="100%" height={250} />
    </Stack>
  );
};

export default TransactionLoadingSkeleton;
