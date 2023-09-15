import { yupResolver } from '@hookform/resolvers/yup';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useRouter } from 'src/routes/hook';
// types
// assets
// components
import { useBoolean } from '@hooks/use-boolean';
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { paths } from '@routes/paths';
import CampaignsService from '@services/campaigns';
import { useMutation } from '@tanstack/react-query';
import { parseMultiLineInput } from '@utils/strings';
import { campaignTypeOptions } from 'src/_mock/campaigns';
import { useAudiences, useTransports } from 'src/api/campaigns';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { CAMPAIGN_TYPES, IApiResponseError, ICampaignCreateItem } from 'src/types/campaigns';
import axios from 'axios';
import CampaignAssignBenficiariesModal from './register-beneficiaries-modal';

type Props = {
  currentCampaign?: ICampaignCreateItem;
};

interface FormValues extends ICampaignCreateItem {}

const CampaignForm: React.FC = ({ currentCampaign }: Props) => {
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [formattedSelect, setFormattedSelect] = useState<any[]>([]);
  const [showSelectAudio, setShowSelectAudio] = useState(false);
  const [mp3Data, setMp3Data] = useState([null]);

  const { push } = useRouter();
  const { transports } = useTransports();
  const { enqueueSnackbar } = useSnackbar();
  const assignCampaignDialog = useBoolean();
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
      push(`${paths.dashboard.general.campaigns.list}`);
    },
  });

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campaign name is required')
      .min(4, 'Mininum 4 characters')
      .max(24, 'Maximum 15 characters'),
    startTime: Yup.date().nullable().required('Start date is required'),
    type: Yup.string().required('Campaign Type is required'),
    details: Yup.string().required('Enter the details for the campaign'),
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

  const { reset, handleSubmit, control, setValue } = methods;

  const handleSelectAudiences = async (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    const formattedSelected = audiences
      .filter((aud: any) => value.includes(aud.details.name))
      .map((aud: any) => +aud.id);
    setFormattedSelect(formattedSelected);
    setSelectedAudiences(value as string[]);
    setValue('audienceIds', formattedSelected);

    setShowSelectAudio(value.includes('PHONE'));
  };

  const handleSelectCampaignType = (value: string) => {
    const requiresAudioField = value === 'PHONE';
    setShowSelectAudio(requiresAudioField);
  };

  const onSubmit = useCallback(
    (data: ICampaignCreateItem) => {
      const audienceIds = formattedSelect;
      const formatted = {
        ...data,
        audienceIds,
        details: parseMultiLineInput(data?.details),
      };
      mutate(formatted);
    },
    [formattedSelect, mutate]
  );

  useEffect(() => {
    async function audioData() {
      const res = await axios.get('http://localhost:6000/listmp3');
      setMp3Data(res?.data);
    }
    audioData();
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Campaign</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <CampaignAssignBenficiariesModal
        onClose={assignCampaignDialog.onFalse}
        open={assignCampaignDialog.value}
        onOk={() => {
          console.log('Registered');
        }}
      />
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
                <RHFSelect name="type" label="Select Audio">
                  {mp3Data.map((mp3: any) => (
                    <MenuItem key={mp3?.mp3Name} value={mp3?.mp3URL}>
                      {mp3?.mp3Name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              )}

              <Stack>
                <RHFTextField name="details" label="Details" fullWidth multiline />
              </Stack>

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
                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '100%',
                      md: '50%',
                    },
                  }}
                >
                  <Stack direction="column">
                    <Select
                      name="audienceIds"
                      multiple
                      value={selectedAudiences}
                      onChange={handleSelectAudiences}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value: any) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {audiences.map((aud: any) => (
                        <MenuItem key={aud.details.name} value={aud.details.name}>
                          <Checkbox checked={selectedAudiences.indexOf(aud.details.name) > -1} />
                          <ListItemText primary={aud.details.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={assignCampaignDialog.onTrue}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Register Audiences
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Campaign
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CampaignForm);
