import React, { useState } from 'react';
import { Button, Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';

const MusicComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying); 
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 3, borderRadius: 2, boxShadow: 3, fontFamily: 'Arial, sans-serif' , margin:"30px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Music</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', p: 2, mb: 2, borderRadius: 1, boxShadow: 1 }}>
        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Ronald rich playlist</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={togglePlay} sx={{ color: '#ffcc00' }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton sx={{ color: '#ccc', '&:hover': { color: '#ff0000' } }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9', p: 2, mb: 2, borderRadius: 1, boxShadow: 1 }}>
        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>Ronald rich playlist</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ color: '#ffcc00' }}>
            <PlayArrowIcon />
          </IconButton>
          <IconButton sx={{ color: '#ccc', '&:hover': { color: '#ff0000' } }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Button variant="contained" sx={{ backgroundColor: '#ffcc00', color: 'white', width: '100%', py: 1.5, borderRadius: 1, boxShadow: 3, '&:hover': { backgroundColor: '#e6b800' } }}>
        Share
      </Button>
    </Box>
  );
};

export default MusicComponent;
