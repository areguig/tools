import { Box, Typography, Paper, Grid } from '@mui/material';
import { Calculate, Link, DataObject, Compare, Code } from '@mui/icons-material';

const tools = [
  {
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text to/from Base64 format',
    icon: <Calculate sx={{ fontSize: 40 }} />,
    path: '/base64'
  },
  {
    name: 'UTM Builder',
    description: 'Create and manage campaign URLs with UTM parameters',
    icon: <Link sx={{ fontSize: 40 }} />,
    path: '/utm-builder'
  },
  {
    name: 'JSON Prettifier',
    description: 'Format and beautify JSON data',
    icon: <DataObject sx={{ fontSize: 40 }} />,
    path: '/prettyjson'
  },
  {
    name: 'Diff Tool',
    description: 'Compare two texts and find differences',
    icon: <Compare sx={{ fontSize: 40 }} />,
    path: '/difftool'
  },
  {
    name: 'Wisdom',
    description: 'External tool for wisdom quotes',
    icon: <Code sx={{ fontSize: 40 }} />,
    path: 'https://areguig.github.io/wisdom',
    external: true
  }
];

export default function Home() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Welcome to Developer Tools Collection
      </Typography>
      
      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.name}>
            <Paper
              component={tool.external ? 'a' : 'a'}
              href={tool.path}
              target={tool.external ? '_blank' : undefined}
              rel={tool.external ? 'noopener noreferrer' : undefined}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              {tool.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {tool.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {tool.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
