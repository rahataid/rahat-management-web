'use client';

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
import { ICampaignItemApiResponse } from 'src/types/campaigns';

type AudienceAccordionViewProps = {
  audience: ICampaignItemApiResponse['audiences'];
  handleRemoveAudience: (audienceId: number) => void;
};

const AudienceAccordionView = ({ audience, handleRemoveAudience }: AudienceAccordionViewProps) => (
  <Card>
    <CardContent>
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
              {audience?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.details?.name}</TableCell>
                  <TableCell>{item.details?.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="soft"
                      color="secondary"
                      onClick={() => handleRemoveAudience(item?.id)}
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

export default AudienceAccordionView;
