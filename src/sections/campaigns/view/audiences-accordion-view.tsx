'use client';

import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CampaignsService from '@services/campaigns';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useCampaign } from 'src/api/campaigns';

const AudienceAccordionView = () => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { campaign } = useCampaign(params.id);

  const removeCampaignAudience = useMutation({
    mutationFn: async (audienceId: string) => {
      const response = await CampaignsService.removeAudienceFromCampaign(params.id, audienceId);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error Removing Audiences', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Campaign Audience Removed Successfully', { variant: 'success' });
    },
  });

  const handleRemoveClick = (audienceId: number) => {
    removeCampaignAudience.mutate(audienceId as unknown as string);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<Icon icon="mdi:arrow-down-drop" />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography>All Audiences</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaign?.audiences?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.details.name}</TableCell>
                <TableCell>{item.details.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveClick(item?.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
};

export default AudienceAccordionView;
