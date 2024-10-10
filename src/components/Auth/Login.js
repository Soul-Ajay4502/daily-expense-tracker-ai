import React, { useState } from "react";
import {
    Button,
    Container,
    Typography,
    Box,
    TextField,
    IconButton,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const handleEmailLogin = async (values, { setSubmitting, setErrors }) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                dispatch(
                    setUser({
                        uid: user.uid,
                        fullName: userData.fullName || "Unknown",
                        email: user.email,
                        profession: userData.profession || "Unknown",
                    })
                );

                navigate("/dashboard");
            } else {
                console.error("No such user document!");
                alert("User document not found.");
            }
        } catch (error) {
            console.error("Error signing in: ", error);
            setErrors({ email: error.message });
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, uid } = result.user;
            dispatch(
                setUser({
                    uid,
                    fullName: displayName,
                    email,
                    profession: "Unknown",
                })
            );
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in: ", error);
        }
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <Container
            maxWidth="sm"
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#f0f0f0",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Welcome to Daily Expense Tracker
                </Typography>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleEmailLogin}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                margin="normal"
                                required
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                                margin="normal"
                                required
                                error={
                                    touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginBottom: "20px" }}
                                disabled={loading || isSubmitting}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    )}
                </Formik>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGoogleSignIn}
                    fullWidth
                >
                    Sign in with Google
                </Button>
                <Button
                    variant="text"
                    color="primary"
                    onClick={handleSignUp}
                    fullWidth
                    sx={{ marginTop: "10px" }}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
