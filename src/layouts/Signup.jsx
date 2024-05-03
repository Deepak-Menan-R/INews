import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

function SignUp() {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const categories = [...formData.getAll('category')];
    const countries = [...formData.getAll('country')];
  
    // Basic form validation
    const validationErrors = {};
    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (categories.length === 0) {
      validationErrors.categories = 'Please select at least one category';
    }
    if (countries.length === 0) {
      validationErrors.countries = 'Please select at least one country';
    }
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Form is valid, submit the data using Axios
        const response = await axios.post('http://localhost:5000/signup', {
          username,
          email,
          password,
          categories,
          countries,
        });
  
        console.log('Form submitted successfully');
        window.location.href = '/login';
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      // Form is invalid, update the errors state
      setErrors(validationErrors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Categories:</Typography>
                <FormControlLabel
                  control={<Checkbox id="technology" name="category" value="technology" />}
                  label="Technology"
                />
                <FormControlLabel
                  control={<Checkbox id="science" name="category" value="science" />}
                  label="Science"
                />
                <FormControlLabel
                  control={<Checkbox id="business" name="category" value="business" />}
                  label="Business"
                />
                <FormControlLabel
                  control={<Checkbox id="entertainment" name="category" value="entertainment" />}
                  label="Entertainment"
                />
                <FormControlLabel
                  control={<Checkbox id="health" name="category" value="health" />}
                  label="Health"
                />
                <FormControlLabel
                  control={<Checkbox id="sports" name="category" value="sports" />}
                  label="Sports"
                />
                <FormControlLabel
                  control={<Checkbox id="general" name="category" value="general" />}
                  label="General"
                />
                {/* Add more FormControlLabel components for other categories */}
                {errors.categories && <Typography color="error">{errors.categories}</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Countries:</Typography>
                <FormControlLabel
                  control={<Checkbox id="us" name="country" value="us" />}
                  label="United States"
                />
                <FormControlLabel
                  control={<Checkbox id="gb" name="country" value="gb" />}
                  label="United Kingdom"
                />
                <FormControlLabel
                  control={<Checkbox id="ca" name="country" value="ca" />}
                  label="Canada"
                />
                <FormControlLabel
                  control={<Checkbox id="au" name="country" value="au" />}
                  label="Australia"
                />
                <FormControlLabel
                  control={<Checkbox id="de" name="country" value="de" />}
                  label="Germany"
                />
                <FormControlLabel
                  control={<Checkbox id="fr" name="country" value="fr" />}
                  label="France"
                />
                <FormControlLabel
                  control={<Checkbox id="jp" name="country" value="jp" />}
                  label="Japan"
                />
                <FormControlLabel
                  control={<Checkbox id="in" name="country" value="in" />}
                  label="India"
                />
                <FormControlLabel
                  control={<Checkbox id="it" name="country" value="it" />}
                  label="Italy"
                />
                <FormControlLabel
                  control={<Checkbox id="br" name="country" value="br" />}
                  label="Brazil"
                />
                <FormControlLabel
                  control={<Checkbox id="mx" name="country" value="mx" />}
                  label="Mexico"
                />
                <FormControlLabel
                  control={<Checkbox id="ru" name="country" value="ru" />}
                  label="Russia"
                />
                <FormControlLabel
                  control={<Checkbox id="kr" name="country" value="kr" />}
                  label="South Korea"
                />
                <FormControlLabel
                  control={<Checkbox id="cn" name="country" value="cn" />}
                  label="China"
                />
                <FormControlLabel
                  control={<Checkbox id="za" name="country" value="za" />}
                  label="South Africa"
                />
                {/* Add more FormControlLabel components for other countries */}
                {errors.countries && <Typography color="error">{errors.countries}</Typography>}
              </Grid>

            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
