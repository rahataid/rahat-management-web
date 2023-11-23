'use client';

import { useBoolean } from '@hooks/use-boolean';
import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ICampaignItemApiResponse } from 'src/types/campaigns';
import AudienceRemoveModal from './audiences-remove-modal';

type AudienceAccordionViewProps = {
  audience: ICampaignItemApiResponse['audiences'];
  handleRemoveAudience: (audienceId: string) => void;
};

const AudienceAccordionView = ({ audience, handleRemoveAudience }: AudienceAccordionViewProps) => {
  const assignCampaignDialog = useBoolean();
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>('');

  const openRemoveModal = (audienceId: string) => {
    setSelectedAudienceId(audienceId);
    assignCampaignDialog.onTrue();
  };

  const closeRemoveModal = () => {
    setSelectedAudienceId('');
    assignCampaignDialog.onFalse();
  };

  return (
    <Card>
      <CardContent>
        <AudienceRemoveModal
          onClose={closeRemoveModal}
          open={assignCampaignDialog.value}
          onOk={() => {
            handleRemoveAudience(selectedAudienceId);
          }}
        />
        <Accordion defaultExpanded>
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
                {audience?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.details?.name}</TableCell>
                    <TableCell>{item.details?.phone}</TableCell>
                    <TableCell>
                      <Button
                        variant="soft"
                        color="secondary"
                        onClick={() => openRemoveModal(item.id as unknown as string)}
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
      </CardContent>
    </Card>
  );
};

export default AudienceAccordionView;
