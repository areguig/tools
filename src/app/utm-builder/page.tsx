'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

const UTM_SOURCES = ['google', 'facebook', 'twitter', 'linkedin', 'email', 'other'];
const UTM_MEDIUMS = ['cpc', 'social', 'email', 'banner', 'referral', 'other'];

export default function UTMBuilder() {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const generateUrl = () => {
    try {
      const url = new URL(baseUrl);
      
      if (source) url.searchParams.append('utm_source', source);
      if (medium) url.searchParams.append('utm_medium', medium);
      if (campaign) url.searchParams.append('utm_campaign', campaign);
      if (term) url.searchParams.append('utm_term', term);
      if (content) url.searchParams.append('utm_content', content);
      
      setGeneratedUrl(url.toString());
    } catch (error) {
      setGeneratedUrl('Error: Please enter a valid URL');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          UTM Campaign URL Builder
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website URL"
              variant="outlined"
              placeholder="https://example.com"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Campaign Source</InputLabel>
              <Select
                value={source}
                label="Campaign Source"
                onChange={(e) => setSource(e.target.value)}
              >
                {UTM_SOURCES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Campaign Medium</InputLabel>
              <Select
                value={medium}
                label="Campaign Medium"
                onChange={(e) => setMedium(e.target.value)}
              >
                {UTM_MEDIUMS.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Campaign Name"
              variant="outlined"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Campaign Term (Optional)"
              variant="outlined"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Campaign Content (Optional)"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={generateUrl}
              disabled={!baseUrl}
              sx={{ mx: 1 }}
            >
              Generate URL
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Generated URL"
              variant="outlined"
              value={generatedUrl}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button
              variant="outlined"
              startIcon={<ContentCopy />}
              onClick={copyToClipboard}
              disabled={!generatedUrl}
            >
              Copy URL
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}
