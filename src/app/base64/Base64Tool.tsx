'use client';

import { useCallback, useEffect } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, IconButton, Alert, Tooltip } from '@mui/material';
import { ContentCopy, SwapVert } from '@mui/icons-material';
import { useToolsStore } from '../providers/ToolsStoreProvider';

export default function Base64Tool() {
  const { toolStates, updateToolState } = useToolsStore();
  const { input, output, mode } = toolStates.base64;

  const handleEncode = useCallback(() => {
    try {
      const base64 = window.btoa(encodeURIComponent(input));
      updateToolState('base64', { input, output: base64, mode });
    } catch (err) {
      console.error('Encode error:', err);
      updateToolState('base64', { 
        input, 
        output: 'Failed to encode text. Make sure your input contains valid characters.', 
        mode 
      });
    }
  }, [input, mode, updateToolState]);

  const handleDecode = useCallback(() => {
    try {
      const text = decodeURIComponent(window.atob(input));
      updateToolState('base64', { input, output: text, mode });
    } catch (err) {
      console.error('Decode error:', err);
      updateToolState('base64', { 
        input, 
        output: 'Failed to decode Base64. Make sure your input is valid Base64.', 
        mode 
      });
    }
  }, [input, mode, updateToolState]);

  const handleSwap = useCallback(() => {
    updateToolState('base64', {
      input: output,
      output: '',
      mode: mode === 'encode' ? 'decode' : 'encode'
    });
  }, [output, mode, updateToolState]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Copy error:', err);
    }
  }, [output]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3, position: 'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}
          </Typography>
          <IconButton onClick={handleSwap} color="primary" title="Swap mode">
            <SwapVert />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Input"
              multiline
              rows={4}
              value={input}
              onChange={(e) => updateToolState('base64', { input: e.target.value, output, mode })}
              fullWidth
              variant="outlined"
              placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={mode === 'encode' ? handleEncode : handleDecode}
              fullWidth
              disabled={!input}
            >
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </Button>
          </Grid>

          {output && (
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  label="Result"
                  multiline
                  rows={4}
                  value={output}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    onClick={handleCopy}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
