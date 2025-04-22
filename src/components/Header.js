import React from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ user, onLogout, isMobile }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 4,
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 2 : 0
    }}>
      <Typography variant="h3" component="h1" sx={{ 
        color: 'primary.main',
        fontWeight: 600,
        letterSpacing: '-0.5px'
      }}>
        Audix
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: isMobile ? 'center' : 'flex-end'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          backgroundColor: 'background.paper',
          padding: '8px 16px',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Avatar 
            src={user.photoURL} 
            alt={user.displayName}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {user.email}
          </Typography>
        </Box>
        <Tooltip title="Logout">
          <IconButton
            onClick={onLogout}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'rgba(144, 202, 249, 0.1)'
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header; 