import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const Schedule = () => {
  return (
    <Box
      sx={{
        margin: "30px",
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        Schedule
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {[...Array(8)].map((_, index) => (
          <Chip
            key={index}
            label="Outlined Chip"
            variant="outlined"
            sx={{
              padding: '10px 20px',
              borderRadius: '16px',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Schedule;
