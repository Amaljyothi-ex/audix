import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadArea = ({ onFileUpload, file, loading, isMobile }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: 3
    }}>
      <input
        accept="audio/mpeg,audio/mp3"
        style={{ display: 'none' }}
        id="audio-file-upload"
        type="file"
        onChange={onFileUpload}
      />
      <label htmlFor="audio-file-upload">
        <Box
          className="upload-area"
          sx={{
            width: isMobile ? '100%' : '400px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            Upload Audio File
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drag and drop or click to select
          </Typography>
        </Box>
      </label>

      {file && (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Selected file: {file.name}
        </Typography>
      )}

      {loading && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          backgroundColor: 'background.paper',
          padding: '12px 24px',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <CircularProgress size={24} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Converting audio...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadArea; 