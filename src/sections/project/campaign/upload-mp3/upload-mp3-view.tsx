'use client';

import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
// routes
import { paths } from 'src/routes/paths';
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { Button } from '@mui/material';
import { RouterLink } from '@routes/components';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function UploadView() {
  const preview = useBoolean();

  const [files, setFiles] = useState<(File | string)[]>([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  const handleUpload = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('mp3', file);
        console.log(formData, 'formData');

        // eslint-disable-next-line no-await-in-loop
        const res = await axios.post('http://localhost:6000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(res, 'res');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading="Campaign: Upload Mp3"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Campaign', href: paths.dashboard.general.campaigns.list },
            { name: 'Upload Mp3' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.general.campaigns.list}
              variant="outlined"
              startIcon={<Iconify icon="ph:list" />}
              color="success"
            >
              All Campaigns
            </Button>
          }
        />
      </Container>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader
              title="Upload MP3"
              action={
                <FormControlLabel
                  control={<Switch checked={preview.value} onClick={preview.onToggle} />}
                  label="Show Thumbnail"
                />
              }
            />
            <CardContent>
              <Upload
                multiple
                thumbnail={preview.value}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={handleUpload}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
