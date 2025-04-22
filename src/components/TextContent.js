import React from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TextContent = ({ content, onCopy, copied }) => {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        multiline
        fullWidth
        rows={12}
        value={content}
        variant="outlined"
        InputProps={{
          readOnly: true,
          className: 'modern-textfield'
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
        <IconButton
          onClick={() => onCopy(content)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'rgba(144, 202, 249, 0.1)'
            }
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TextContent; 