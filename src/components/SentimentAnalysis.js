import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  LinearProgress 
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';

const SentimentAnalysis = ({ 
  sentimentResults, 
  loadingSentiment, 
  onAnalyzeSentiment,
  getSentimentColor,
  getSentimentIcon 
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      {!sentimentResults ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 3,
          py: 4
        }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Analyze the sentiment of your audio content
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onAnalyzeSentiment}
            disabled={loadingSentiment}
            className="modern-button"
            startIcon={<PsychologyIcon />}
          >
            {loadingSentiment ? 'Analyzing...' : 'Analyze Sentiment'}
          </Button>
          {loadingSentiment && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {sentimentResults.messages.map((message, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                sx={{ 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body1" sx={{ color: 'text.primary', flex: 1 }}>
                      {message.content}
                    </Typography>
                    <Chip
                      label={`${message.sentiment} (${(message.score * 100).toFixed(0)}%)`}
                      sx={{
                        backgroundColor: getSentimentColor(message.sentiment),
                        color: 'white',
                        ml: 2
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {getSentimentIcon(message.sentiment)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {message.ts.toFixed(2)}s - {message.end_ts.toFixed(2)}s
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SentimentAnalysis; 