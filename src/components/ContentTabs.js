import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SummarizeIcon from '@mui/icons-material/Summarize';

const ContentTabs = ({ activeTab, onTabChange }) => {
  return (
    <Box sx={{ 
      width: '100%', 
      mb: 3,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden'
    }}>
      <Tabs 
        value={activeTab} 
        onChange={onTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none'
          },
          '& .MuiTab-root': {
            minHeight: 64,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'text.secondary',
            transition: 'all 0.2s ease',
            borderBottom: '2px solid transparent',
            '&.Mui-selected': {
              color: 'primary.main',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(144, 202, 249, 0.08)'
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }
        }}
      >
        <Tab 
          icon={<TextSnippetIcon sx={{ fontSize: 24, mb: 0.5 }} />}
          label="Transcript"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}
        />
        <Tab 
          icon={<PsychologyIcon sx={{ fontSize: 24, mb: 0.5 }} />}
          label="Sentiment"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}
        />
        <Tab 
          icon={<SummarizeIcon sx={{ fontSize: 24, mb: 0.5 }} />}
          label="Summary"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}
        />
      </Tabs>
    </Box>
  );
};

export default ContentTabs; 