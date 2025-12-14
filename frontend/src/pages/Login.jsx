import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Link, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff, Email, Lock, Storefront } from "@mui/icons-material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Invalid credentials", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Paper 
        elevation={24} 
        sx={{ 
          p: 5, 
          width: 420, 
          borderRadius: 4, 
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)' 
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ p: 2, bgcolor: '#FFF0F5', borderRadius: '50%', color: '#E91E63' }}>
            <Storefront fontSize="large" />
          </Box>
        </Box>

        <Typography variant="h4" fontWeight="800" gutterBottom color="textPrimary">
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={4}>
          Kata Sweet Shop
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField 
            label="Username" 
            variant="outlined" 
            fullWidth 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField 
            label="Password" 
            type={showPassword ? "text" : "password"} 
            variant="outlined" 
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            fullWidth
            sx={{ 
              py: 1.8, 
              fontSize: '1rem',
              boxShadow: '0 8px 16px rgba(233, 30, 99, 0.24)' 
            }}
          >
            Sign In
          </Button>
        </Box>

        <Box mt={4}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link 
              component={RouterLink} 
              to="/register" 
              fontWeight="bold" 
              sx={{ color: '#E91E63', textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;