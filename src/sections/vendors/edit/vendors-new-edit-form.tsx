import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'next/navigation';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateVendor, useVendor } from 'src/api/vendors';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IVendorItem } from 'src/types/vendors';

import * as Yup from 'yup';

interface FormValues extends IVendorItem {}

const BeneficiariesForm: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const params = useParams();
  const { vendor } = useVendor(params.address);

  const updateVendor = useUpdateVendor(params.address);

  useEffect(() => {
    if (vendor) {
      setIsActive(vendor?.isActive);
    }
  }, [vendor]);

  console.log(isActive, 'isActive');

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Number is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: '',
      phone: '',
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (vendor) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const vendorKeys = Object.keys(vendor) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => vendorKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = vendor[key];
        const formKey = key as keyof FormValues;

        setValue(formKey, value as string);
      });
    }
  }, [defaultValues, vendor, setValue]);

  const onSubmit = useCallback((data: IVendorItem) => updateVendor.mutate(data), [updateVendor]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField InputLabelProps={{ shrink: true }} name="name" label="Name" />
              {/* <RHFTextField InputLabelProps={{ shrink: true }} name="address" label="Address" /> */}
              <RHFTextField InputLabelProps={{ shrink: true }} name="phone" label="Phone Number" />
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="isActive"
                      color="success"
                      checked={isActive}
                      onChange={handleActivateChange}
                    />
                  }
                  label="Active"
                />
              </FormGroup> */}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="outlined"
                color="success"
                loading={updateVendor?.isLoading}
              >
                Update Vendor
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(BeneficiariesForm);
