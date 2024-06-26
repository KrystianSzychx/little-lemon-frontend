import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../../context/hooks/AuthProvider';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const defaultTheme = createTheme();

export default function SignIn() {
  
  const [input, setInput]  = useState({
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Stan dla Snackbar

  const auth = useAuth(); 
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      fetch('https://littlelemonwebapi.azurewebsites.net/api/Account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: input.email,
          password: input.password
        }),
      })
      .then(response => {
        if (response.ok) {
          const data = response.json();
          auth.loginAction(data); // Ensure this line uses the proper method to set the user state
          navigate('/');
        }        
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setOpenSnackbar(true);
      });
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInput}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs>
                  <Link href="#" variant="body2" justifyContent="space-between" sx={{ mb: 2 }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
          </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <div>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              Invalid email or password. Please try again.
            </Alert>
          </div>
        </Snackbar>
        <Box mt={8}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}