'use client';

import { useState } from 'react';
import { Box, TextField, Button, Stack, Paper, Typography, Alert, useTheme, Grid } from '@mui/material';

// Define types for the diff package
type DiffPart = {
  value: string;
  added?: boolean;
  removed?: boolean;
};

interface LineWithNumber {
  number: number;
  content: string;
  type: 'added' | 'removed' | 'unchanged';
}

export default function DiffTool() {
  const theme = useTheme();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<DiffPart[]>([]);
  const [diffStats, setDiffStats] = useState({ additions: 0, deletions: 0 });
  const [error, setError] = useState<string>('');

  const processLinesWithNumbers = (parts: DiffPart[], showAdded: boolean): LineWithNumber[] => {
    let lineNumber = 1;
    const result: LineWithNumber[] = [];

    parts.forEach(part => {
      const lines = part.value.split('\n');
      // Don't process the last empty line that comes from the split
      if (lines[lines.length - 1] === '') lines.pop();

      lines.forEach(line => {
        if (
          (showAdded && part.added) ||
          (!showAdded && part.removed) ||
          (!part.added && !part.removed)
        ) {
          result.push({
            number: lineNumber,
            content: line,
            type: part.added ? 'added' : part.removed ? 'removed' : 'unchanged'
          });
        }
        if (
          (showAdded && !part.removed) ||
          (!showAdded && !part.added)
        ) {
          lineNumber++;
        }
      });
    });

    return result;
  };

  const calculateDiff = async () => {
    try {
      setError('');
      const { diffLines } = await import('diff');
      const differences = diffLines(text1, text2);
      setDiff(differences);

      // Calculate diff statistics
      const stats = differences.reduce(
        (acc, part) => ({
          additions: acc.additions + (part.added ? part.value.split('\n').length - (part.value.endsWith('\n') ? 1 : 0) : 0),
          deletions: acc.deletions + (part.removed ? part.value.split('\n').length - (part.value.endsWith('\n') ? 1 : 0) : 0),
        }),
        { additions: 0, deletions: 0 }
      );
      setDiffStats(stats);
    } catch (err) {
      setError('Failed to compare texts. Please try again.');
      console.error('Diff error:', err);
    }
  };

  const leftLines = diff.length > 0 ? processLinesWithNumbers(diff, false) : [];
  const rightLines = diff.length > 0 ? processLinesWithNumbers(diff, true) : [];

  return (
    <Stack spacing={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <TextField
          label="Original Text"
          multiline
          rows={8}
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Enter or paste the original text here"
          sx={{ flex: 1 }}
        />
        <TextField
          label="Modified Text"
          multiline
          rows={8}
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Enter or paste the modified text here"
          sx={{ flex: 1 }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={calculateDiff}
        disabled={!text1 || !text2}
        fullWidth
      >
        Compare Texts
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {diff.length > 0 && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Differences</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {diffStats.additions} additions, {diffStats.deletions} deletions
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                borderRadius: 1,
                p: 2,
                width: '50%',
              }}
            >
              <pre style={{ 
                margin: 0, 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                height: 'auto',
                maxHeight: 'none',
                overflowY: 'visible'
              }}>
                {leftLines.map((line, idx) => (
                  <div key={idx} style={{
                    backgroundColor: line.type === 'removed' 
                      ? theme.palette.mode === 'dark' 
                        ? '#471b1b' 
                        : '#ffeef0'
                      : 'transparent',
                    fontFamily: 'monospace',
                    padding: '2px 0',
                  }}>
                    <span style={{ 
                      color: theme.palette.text.secondary, 
                      userSelect: 'none',
                      display: 'inline-block',
                      width: '3em',
                      marginRight: '1em',
                      textAlign: 'right'
                    }}>
                      {line.number}
                    </span>
                    {line.content}
                  </div>
                ))}
              </pre>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                flex: 1,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                borderRadius: 1,
                p: 2,
                width: '50%',
              }}
            >
              <pre style={{ 
                margin: 0, 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                height: 'auto',
                maxHeight: 'none',
                overflowY: 'visible'
              }}>
                {rightLines.map((line, idx) => (
                  <div key={idx} style={{
                    backgroundColor: line.type === 'added'
                      ? theme.palette.mode === 'dark'
                        ? '#1b4721'
                        : '#e6ffed'
                      : 'transparent',
                    fontFamily: 'monospace',
                    padding: '2px 0',
                  }}>
                    <span style={{ 
                      color: theme.palette.text.secondary, 
                      userSelect: 'none',
                      display: 'inline-block',
                      width: '3em',
                      marginRight: '1em',
                      textAlign: 'right'
                    }}>
                      {line.number}
                    </span>
                    {line.content}
                  </div>
                ))}
              </pre>
            </Paper>
          </Box>
        </>
      )}
    </Stack>
  );
}
