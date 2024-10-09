import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, Typography, Box, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Full Name can only contain letters, spaces, hyphens, and apostrophes")
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  profession: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Profession can only contain letters, spaces, hyphens, and apostrophes")
    .required('Profession is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // For navigating back

  const handleRegister = async (values, { resetForm }) => {
    const { fullName, email, profession, password } = values;
    setLoading(true); // Set loading to true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        profession,
      });

      // Reset form
      resetForm();
      alert('User registered successfully!');
    } catch (error) {
      console.error("Error registering user:", error);
      alert(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true); // Set loading to true
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user details in Firestore if needed
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
        profession: "Not specified" // Placeholder for profession
      }, { merge: true });
      alert('User signed in with Google!');
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert(error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        {/* Back Button */}
        <IconButton onClick={() => navigate(-1)} edge="start">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Register
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Formik
          initialValues={{ fullName: '', email: '', profession: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  value={values.fullName}
                  onChange={handleChange}
                  error={!!values.fullName && !validationSchema.isValidSync({ fullName: values.fullName })}
                />
                <ErrorMessage name="fullName" component="div" style={{ color: 'red' }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  error={!!values.email && !validationSchema.isValidSync({ email: values.email })}
                />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Profession"
                  name="profession"
                  fullWidth
                  value={values.profession}
                  onChange={handleChange}
                  error={!!values.profession && !validationSchema.isValidSync({ profession: values.profession })}
                />
                <ErrorMessage name="profession" component="div" style={{ color: 'red' }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  error={!!values.password && !validationSchema.isValidSync({ password: values.password })}
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleGoogleSignIn} disabled={loading}>
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
