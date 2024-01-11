import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useRouter } from '@routes/hook';
// types
// assets
// components
import {
  Alert,
  AlertTitle,
  Button,
  CardHeader,
  Checkbox,
  ListItemText,
  MenuItem,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import CampaignsService from '@services/campaigns';
import { useMutation } from '@tanstack/react-query';
import { interruptChainActions } from '@utils/chainActionInterrupt';
import { campaignTypeOptions } from 'src/_mock/campaigns';
import { useBeneficiaries } from 'src/api/beneficiaries';
import {
  useAudiences,
  useBulkAddAudiences,
  useCampaignAudio,
  useTransports,
} from 'src/api/campaigns';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { CAMPAIGN_TYPES, IApiResponseError, ICampaignCreateItem } from 'src/types/campaigns';

type Props = {
  currentCampaign?: ICampaignCreateItem;
};

interface FormValues extends ICampaignCreateItem {}

const CampaignForm: React.FC = ({ currentCampaign }: Props) => {
  const [formattedSelect, setFormattedSelect] = useState<any[]>([]);
  const [showSelectAudio, setShowSelectAudio] = useState(false);
  const [showSelectMessage, setShowSelectMessage] = useState(false);
  const { campaignAudio } = useCampaignAudio();
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState<any[]>([]);

  const [showAudiences, setShowAudiences] = useState(false);
  const { beneficiaries } = useBeneficiaries({
    perPage: 1000,
  });
  const bulkAddAudiences = useBulkAddAudiences();

  const handleSelectAudiencesButton = () => {
    setShowAudiences((prev) => !prev);
  };

  const router = useRouter();
  const { transports } = useTransports();
  const { enqueueSnackbar } = useSnackbar();
  const { audiences } = useAudiences();
  const { error, isLoading, mutate } = useMutation<
    ICampaignCreateItem,
    IApiResponseError,
    ICampaignCreateItem
  >({
    mutationFn: async (createData: ICampaignCreateItem) => {
      const response = await CampaignsService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error creating Campaign', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Campaign created successfully', { variant: 'success' });
      reset();
      router.back();
    },
  });

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campaign name is required')
      .min(4, 'Mininum 4 characters')
      .max(24, 'Maximum 15 characters'),
    startTime: Yup.date().nullable().required('Start date is required'),
    type: Yup.string().required('Campaign Type is required'),
    details: Yup.string().optional(),
    audienceIds: Yup.array().required('Select the audience for the campaign'),
    transportId: Yup.number().required('Select the transport for the campaign'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCampaign?.name || '',
      startTime: currentCampaign?.startTime || '',
      details: currentCampaign?.details || '',
      transportId: null,
      type: currentCampaign?.type as CAMPAIGN_TYPES,
      audienceIds: null,
    }),
    [currentCampaign]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewProjectSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  // Handle beneficiary click
  const handleBeneficiaryClick = async (beneficiary: any) => {
    setSelectedBeneficiaries((prev) => {
      let updatedBeneficiaries;
      if (prev.some((item) => item.phone === beneficiary.phone)) {
        // If already selected, remove from selected beneficiaries
        updatedBeneficiaries = prev.filter((item) => item.phone !== beneficiary.phone);
      } else {
        // If not selected, add to selected beneficiaries
        updatedBeneficiaries = [...prev, beneficiary];
      }

      // Update audienceIds in the form state
      setValue(
        'audienceIds',
        audiences
          .filter((audience: any) =>
            updatedBeneficiaries.some((ben) => ben.phone === audience.details.phone)
          )
          .map((audience: any) => audience.id)
      );

      return updatedBeneficiaries;
    });

    // here we check if the beneficiary is already in the audiences
    // if not, we add it to the audiences

    const isAlreadyInAudiences = audiences.some(
      (audience: any) => audience.details.phone === beneficiary.phone
    );

    if (!isAlreadyInAudiences) {
      await bulkAddAudiences.mutateAsync([
        {
          details: {
            phone: beneficiary.phone,
            uuid: beneficiary.uuid,
          },
        },
      ]);
    }
  };

  const handleSelectCampaignType = (value: string) => {
    const requiresAudioField = value === 'PHONE';
    const requiresMessageField = value === 'SMS';

    setShowSelectAudio(requiresAudioField);
    setShowSelectMessage(requiresMessageField);
    setValue('type', value as CAMPAIGN_TYPES);
  };

  const onSubmit = useCallback(
    (data: ICampaignCreateItem) => {
      const audienceIds = audiences
        .filter((audience: any) =>
          selectedBeneficiaries.some((beneficiary) => beneficiary.phone === audience.details.phone)
        )
        .map((audience: any) => audience.id);
      setValue('audienceIds', audienceIds);

      type AdditionalData = {
        audio?: any;
        message?: string;
      };

      const additionalData: AdditionalData = {};

      if (data?.type === 'PHONE' && data?.file) {
        additionalData.audio = data.file;
      }

      if (data?.type === 'SMS' && data?.message) {
        additionalData.message = data?.message;
      }

      const { file, message, ...dataWithoutAudioAndMessage } = data;

      const mergedDetails = {
        ...additionalData,
      };

      const formatted = {
        ...dataWithoutAudioAndMessage,
        audienceIds,
        details: mergedDetails,
      };
      // TODO:Interrupted chain actions temporarily disabled
      // mutate(formatted as ICampaignCreateItem);
      interruptChainActions(mutate, formatted as ICampaignCreateItem);
      // mutate(formatted as ICampaignCreateItem);
    },
    [audiences, mutate, selectedBeneficiaries, setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Campaign</AlertTitle>
          {error?.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack direction="column" spacing={3}>
              <Stack
                spacing={2}
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                  },
                }}
              >
                <RHFTextField name="name" label="Campaign Name" />

                <Controller
                  name="startTime"
                  control={control}
                  render={({ field, fieldState: { error: err } }) => (
                    <DateTimePicker
                      {...field}
                      label="Start Time"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!err,
                          helperText: err?.message,
                        },
                      }}
                    />
                  )}
                />

                <RHFSelect
                  name="type"
                  label="Select Campaign Types"
                  onChange={(e) => handleSelectCampaignType(e.target.value)}
                >
                  {campaignTypeOptions.map((campaign) => (
                    <MenuItem key={campaign} value={campaign}>
                      {campaign}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>

              {showSelectAudio && (
                <RHFSelect name="file" label="Select Audio">
                  {campaignAudio.map((mp3: any) => (
                    <MenuItem key={mp3?.url} value={mp3?.url}>
                      {mp3?.filename}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}

              {showSelectMessage && (
                <RHFTextField name="message" label="SMS Message" fullWidth multiline />
              )}

              {/* <RHFTextField name="details" label="Details" fullWidth multiline /> */}

              <Stack
                spacing={2}
                sx={{
                  flexDirection: {
                    xs: 'column',
                    sm: 'column',
                    md: 'row',
                  },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '100%',
                      md: '50%',
                    },
                  }}
                >
                  <RHFSelect name="transportId" label="Select Transport">
                    {transports.map((transport) => (
                      <MenuItem key={transport?.name} value={transport?.id}>
                        {transport?.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Box>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Button variant="outlined" color="primary" onClick={handleSelectAudiencesButton}>
                {!showAudiences ? 'Select' : 'Hide'} Audiences
              </Button>
              <LoadingButton type="submit" variant="contained" color="success" loading={isLoading}>
                Create Campaign
              </LoadingButton>
            </Stack>
          </Card>

          {errors.audienceIds && (
            <Alert severity="error">
              <AlertTitle>Error Creating Campaign</AlertTitle>
              {errors.audienceIds?.message}
            </Alert>
          )}

          {showAudiences && (
            <Card sx={{ p: 3, mt: 3 }} title="Select Audiences">
              <CardHeader
                title="Select Audiences"
                action={
                  <Button variant="text" color="primary" onClick={handleSelectAudiencesButton}>
                    Close
                  </Button>
                }
              />
              <Stack direction="column" spacing={2}>
                <MenuItem>
                  <Checkbox
                    checked={
                      selectedBeneficiaries.length === beneficiaries.length &&
                      beneficiaries.length > 0
                    }
                    onChange={async (e) => {
                      if (e.target.checked) {
                        setSelectedBeneficiaries(beneficiaries);
                        setValue(
                          'audienceIds',
                          audiences.map((audience: any) => audience.id)
                        );
                        const notRegistered = beneficiaries.filter(
                          (beneficiary) =>
                            !audiences.some(
                              (audience: any) => audience.details.phone === beneficiary.phone
                            )
                        );
                        if (!notRegistered.length) return;

                        bulkAddAudiences.mutate(
                          notRegistered.map((beneficiary) => ({
                            details: {
                              phone: beneficiary.phone,
                              uuid: beneficiary.uuid,
                            },
                          }))
                        );
                      } else {
                        setSelectedBeneficiaries([]);
                      }
                    }}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {beneficiaries.map((beneficiary) => (
                  <MenuItem
                    key={beneficiary.phone}
                    value={beneficiary.phone}
                    onClick={() => handleBeneficiaryClick(beneficiary)}
                  >
                    <Checkbox
                      checked={selectedBeneficiaries.some(
                        (item) => item.phone === beneficiary.phone
                      )}
                    />
                    <ListItemText primary={beneficiary.name} />
                  </MenuItem>
                ))}
              </Stack>
            </Card>
          )}
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CampaignForm);
