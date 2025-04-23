import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Modal,
  useMediaQuery,
  LinearProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import axios from 'axios';
import './App.css';

// Import components
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import TabPanel from './components/TabPanel';
import UploadArea from './components/UploadArea';
import SentimentAnalysis from './components/SentimentAnalysis';
import ContentTabs from './components/ContentTabs';
import TextContent from './components/TextContent';

// Create dark theme with modern colors
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#f48fb1',
      light: '#fce4ec',
      dark: '#f06292',
    },
    background: {
      default: '#121212',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.5px',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Get environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [jobId, setJobId] = useState('');
  const [sentimentResults, setSentimentResults] = useState(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    const savedTokens = localStorage.getItem('tokens');
    if (savedUser && savedTokens) {
      setUser(JSON.parse(savedUser));
      setShowAuthModal(false);
    }
  }, []);

  const handleEmailLogin = async (email, password) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.post(`${BACKEND_URL}/api/token/`, {
        email: email,
        password: password
      });

      if (response.data) {
        const { access, refresh, user } = response.data;
        
        // Store tokens and user data
        localStorage.setItem('tokens', JSON.stringify({ access, refresh }));
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set user state
        setUser(user);
        setShowAuthModal(false);
      }
    } catch (error) {
      setError('Authentication failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    setShowAuthModal(true);
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'audio/mpeg' || selectedFile.type === 'audio/mp3')) {
      setFile(selectedFile);
      setError('');
      setLoading(true);
      setShowResults(false);
      setSentimentResults(null);
      setSummary('');
      
      try {
        const formData = new FormData();
        formData.append('audio', selectedFile);

        const response = await axios.post(`${BACKEND_URL}/api/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data) {
          setTranscription(response.data.transcript);
          setSummary('');
          setJobId(response.data.jobid);
          setShowResults(true);
        } else {
          setError('No transcript received from the server');
        }
      } catch (err) {
        setError('Error uploading file: ' + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please upload a valid MP3 file');
      setFile(null);
    }
  };

  const handleSentimentAnalysis = async () => {
    if (!jobId) return;
    
    setLoadingSentiment(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/sentiment-analysis/?jobid=${jobId}`);
      setSentimentResults(response.data.sentiment_analysis_result);
    } catch (err) {
      setError('Error getting sentiment analysis: ' + err.message);
    } finally {
      setLoadingSentiment(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!transcription) return;
    
    setLoadingSummary(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/summary/?transcript=${encodeURIComponent(transcription)}`);
      setSummary(response.data.summary);
    } catch (err) {
      setError('Error generating summary: ' + err.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      case 'neutral':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😔';
      case 'neutral':
        return '😐';
      default:
        return '😐';
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Modal
          open={showAuthModal}
          aria-labelledby="authentication-modal"
          aria-describedby="email-sign-in-modal"
          className="modal-overlay"
        >
          <AuthModal onEmailLogin={handleEmailLogin} loading={loading} />
        </Modal>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Header user={user} onLogout={handleLogout} isMobile={isMobile} />
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {!showResults ? (
            <UploadArea 
              onFileUpload={handleFileUpload}
              file={file}
              loading={loading}
              isMobile={isMobile}
            />
          ) : (
            <Box sx={{ width: '100%' }}>
              <ContentTabs 
                activeTab={activeTab}
                onTabChange={(e, newValue) => setActiveTab(newValue)}
              />

              <TabPanel value={activeTab} index={0}>
                <TextContent 
                  content={transcription}
                  onCopy={handleCopy}
                  copied={copied}
                />
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <SentimentAnalysis 
                  sentimentResults={sentimentResults}
                  loadingSentiment={loadingSentiment}
                  onAnalyzeSentiment={handleSentimentAnalysis}
                  getSentimentColor={getSentimentColor}
                  getSentimentIcon={getSentimentIcon}
                />
              </TabPanel>

              <TabPanel value={activeTab} index={2}>
                <Box sx={{ width: '100%' }}>
                  {!summary ? (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      gap: 3,
                      py: 4
                    }}>
                      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                        Generate a summary of your audio content
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateSummary}
                        disabled={loadingSummary}
                        className="modern-button"
                        startIcon={<SummarizeIcon />}
                      >
                        {loadingSummary ? 'Generating...' : 'Generate Summary'}
                      </Button>
                      {loadingSummary && (
                        <Box sx={{ width: '100%', mt: 2 }}>
                          <LinearProgress />
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <TextContent 
                      content={summary}
                      onCopy={handleCopy}
                      copied={copied}
                    />
                  )}
                </Box>
              </TabPanel>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 3
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFile(null);
                    setTranscription('');
                    setSummary('');
                    setActiveTab(0);
                    setShowResults(false);
                    setSentimentResults(null);
                  }}
                  className="modern-button"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload New File
                </Button>
              </Box>
            </Box>
          )}

          {error && (
            <Typography 
              color="error" 
              sx={{ 
                mt: 2,
                p: 2,
                backgroundColor: 'error.dark',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'error.main'
              }}
            >
              {error}
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
