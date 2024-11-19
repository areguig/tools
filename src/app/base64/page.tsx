'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Base64Tool = dynamic(() => import('./Base64Tool'), { ssr: false });

export default function Base64Page() {
  return (
    <Box sx={{ p: 2 }}>
      <Base64Tool />
    </Box>
  );
}