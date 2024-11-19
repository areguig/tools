'use client';

import { useState, useCallback } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, IconButton, Alert, Tooltip } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useToolsStore } from '../providers/ToolsStoreProvider';

interface LineProps {
  number: number;
  content: string;
  indentation: number;
}

function colorizeJSON(content: string): string {
  return content
    .replace(/(".*?")/g, '<span style="color: #a6e22e">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span style="color: #ae81ff">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #fd971f">$1</span>');
}

function formatJSONWithLineNumbers(json: string): LineProps[] {
  const lines = json.split('\n');
  let indentLevel = 0;
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.match(/[}\]],?$/)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    const result = {
      number: index + 1,
      content: line.trim(),
      indentation: indentLevel,
    };
    if (trimmedLine.match(/[{[],?$/)) {
      indentLevel += 1;
    }
    return result;
  });
}

export default function PrettyJSON() {
  const { toolStates, updateToolState } = useToolsStore();
  const { input, output } = toolStates.json;
  const [error, setError] = useState<string | null>(null);
  const [formattedLines, setFormattedLines] = useState<LineProps[]>([]);

  const formatJSON = useCallback((minify = false) => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      const formatted = minify
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2);
      
      const lines = formatJSONWithLineNumbers(formatted);
      setFormattedLines(lines);
      updateToolState('json', { input, output: formatted });
    } catch (err) {
      setError('Invalid JSON. Please check your input.');
      setFormattedLines([]);
      updateToolState('json', { input, output: '' });
    }
  }, [input, updateToolState]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  }, [output]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          JSON Prettifier
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Input JSON"
              multiline
              rows={8}
              value={input}
              onChange={(e) => {
                setError(null);
                updateToolState('json', { input: e.target.value, output });
              }}
              fullWidth
              variant="outlined"
              placeholder="Paste your JSON here"
              error={!!error}
              helperText={error}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => formatJSON(false)}
                  fullWidth
                  disabled={!input}
                >
                  Format
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => formatJSON(true)}
                  fullWidth
                  disabled={!input}
                >
                  Minify
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {formattedLines.length > 0 && !error && (
            <Grid item xs={12}>
              <Box sx={{ position: 'relative' }}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    maxHeight: '600px',
                    overflow: 'auto',
                    fontFamily: 'monospace'
                  }}
                >
                  <Box sx={{ display: 'flex', minWidth: '100%' }}>
                    <Box 
                      sx={{ 
                        borderRight: 1,
                        borderColor: 'grey.300',
                        bgcolor: 'grey.200',
                        p: 2,
                        minWidth: 50,
                        textAlign: 'right',
                        userSelect: 'none',
                        color: 'grey.600'
                      }}
                    >
                      {formattedLines.map((line, idx) => (
                        <div key={idx}>{line.number}</div>
                      ))}
                    </Box>
                    <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
                      {formattedLines.map((line, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            paddingLeft: `${line.indentation * 20}px`,
                            whiteSpace: 'pre'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: colorizeJSON(line.content) }} />
                        </div>
                      ))}
                    </Box>
                  </Box>
                </Paper>
                {output && (
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
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
