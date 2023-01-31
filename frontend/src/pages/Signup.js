/** @format */

import { useContext,useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import CreateIcon from "@mui/icons-material/Create";
import Success from "./Success";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [suc, setSuc] = useState(false);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [userContext, setUserContext] = useContext(UserContext);
  const url = "http://localhost:5000";

  const theme = createTheme();

  const handleFacebook = async () => {
    await axios
      .get("http://localhost:5000/auth/facebook")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogle = async () => {
    await axios
      .get("http://localhost:5000/auth/google")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(fullname, phonenumber, email, userpassword);
    console.log(userContext);

    await axios
      .post(`${url}/user/signup`, {
        fullname: fullname,
        number: phonenumber,
        username: email,
        password: userpassword,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Account created");
          setSuccess("Your account was created successfully.");
          setSuc(true);
          setIsLoggedIn(false)
          navigate("/success")
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
         setFullname("");
         setPhonenumber("");
         setEmail("");
         setUserpassword("");
        console.log(error);
        if (error.response.status === 400) {
          console.log(error.response.data);
          setErrMsg("Invalid input");
          setError(true);
        } else if (error.response.status === 401) {
          console.log(error.response.data);
          setErrMsg("User Already Exist");
          setError(true);
        } else {
          console.log("Registration failed");
          setErrMsg("Registration failed");
          setError(true);
        }
      });

    // try {
    // const response = await axios.post("http://localhost:5000/user/signup", {
    // full_name: fullname,
    // phone_number: phonenumber,
    // email: email,
    // username: username,
    // userpassword: userpassword,
    // });
    // if (response.status === 200) {
    // console.log("Account created");
    // setSuccess("Your account was created successfully.");
    // setSuc(true);
    // }
    // setFullname("");
    // setPhonenumber("");
    // setEmail("");
    // setUsername("");
    // setUserpassword("");
    // } catch (err) {
    // if (err.response?.status === 400) {
    // console.log("Invalid output");
    // setErrMsg("Invalid input");
    // setError(true);
    // } else if (err.response?.status === 401) {
    // console.log("User Already exist");
    // setErrMsg("User Already Exist");
    // setError(true);
    // } else {
    // console.log("Registration failed");
    // setErrMsg("Registration failed");
    // setError(true);
    // }
    // }
  };

  return (
    <div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}>
                <p>{error ? <Alert severity="error">{errMsg}</Alert> : null}</p>
                <p>
                  {suc ? <Alert severity="success">{success}</Alert> : null}
                </p>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="fullname"
                      required
                      fullWidth
                      id="fullname"
                      label="FullName"
                      autoFocus
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="number"
                      label="Phone Number"
                      name="number"
                      type="Number"
                      autoComplete="family-name"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={userpassword}
                      onChange={(e) => setUserpassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I agree & accept the terms and condition to create an account with this platform."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}>
                  {`${isSubmitting ? "Signing Up" : "Sign Up"}`}
                </Button>
              </Box>
              <Button
                type="submit"
                fullWidth
                onClick={handleFacebook}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up with Facebook
              </Button>
              <Button
                type="submit"
                fullWidth
                onClick={handleGoogle}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign Up With Google
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="./" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
    </div>
  );
};

export default Signup;
