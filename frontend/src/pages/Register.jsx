import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import { useSnackbar } from "notistack";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {   
      await register({ username, password, role: "USER" }); 
      enqueueSnackbar("Registration successful! Please login.", { variant: "success" });
      navigate("/login");
    } catch (err) {
      enqueueSnackbar("Registration failed. Try a different username.", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={10} sx={{ p: 4, width: 400, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Create a new account
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
          >
            Register
          </Button>
        </Box>

        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;