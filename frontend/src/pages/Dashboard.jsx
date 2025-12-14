import { useState, useEffect } from "react";
import { 
  Grid, Container, Fab, TextField, InputAdornment, Box, CircularProgress, 
  Typography, MenuItem 
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import SweetCard from "../components/SweetCard";
import AdminModal from "../components/AdminModal";

const Dashboard = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search Filters
  const [filters, setFilters] = useState({ name: "", category: "", minPrice: "", maxPrice: "" });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);

  const fetchSweets = async () => {
  
    if (sweets.length === 0) setLoading(true);
    
    try {
    
      const params = new URLSearchParams();

      if (filters.name) params.append("name", filters.name);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const query = params.toString();
      const endpoint = query ? `/api/sweets/search?${query}` : `/api/sweets`;
      
      const res = await api.get(endpoint);
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to fetch sweets", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSweets();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };



  const handleBuy = async (sweet) => {

    const input = prompt(`How many kg of ${sweet.name} do you want to buy? (Available: ${sweet.quantity}kg)`);
  
    if (!input) return;

    const quantityToBuy = parseInt(input, 10);

    if (isNaN(quantityToBuy) || quantityToBuy <= 0) {
      enqueueSnackbar("Please enter a valid amount.", { variant: "warning" });
      return;
    }
    if (quantityToBuy > sweet.quantity) {
      enqueueSnackbar(`Only ${sweet.quantity}kg is available!`, { variant: "error" });
      return;
    }


    const totalCost = quantityToBuy * sweet.price;

    const confirmMsg = `You are buying ${quantityToBuy}kg of ${sweet.name}.\nTotal Bill: ₹${totalCost}\n\nProceed?`;
    if (!window.confirm(confirmMsg)) return;

    setSweets((prevSweets) =>
      prevSweets.map((s) =>
        s.id === sweet.id
          ? { ...s, quantity: s.quantity - quantityToBuy } 
          : s
      )
    );

    try {
     
      await api.post(`/api/sweets/${sweet.id}/purchase?quantity=${quantityToBuy}`);

      enqueueSnackbar(`Purchase Successful! Paid ₹${totalCost} for ${quantityToBuy}kg of ${sweet.name}.`, { variant: "success" });
      
    } catch (err) {

      setSweets((prevSweets) =>
        prevSweets.map((s) =>
          s.id === sweet.id ? { ...s, quantity: s.quantity + quantityToBuy } : s
        )
      );
      console.error("Buy Error:", err.response);
      enqueueSnackbar("Purchase failed. Check connection.", { variant: "error" });
    }
  };

  const handleRestock = async (id) => {

    const quantityStr = prompt("Enter quantity to add:", "10");
    
    if (!quantityStr) return; 

    const quantity = parseInt(quantityStr, 10);
    if (isNaN(quantity) || quantity <= 0) {
      enqueueSnackbar("Please enter a valid number", { variant: "warning" });
      return;
    }

    try {
   
      await api.post(`/api/sweets/${id}/restock?quantity=${quantity}`);
      
      enqueueSnackbar(`Successfully added ${quantity} items!`, { variant: "success" });
      
      fetchSweets(); 
    } catch (err) {
      console.error("Restock Error:", err.response);
      
      if (err.response?.status === 403) {
        enqueueSnackbar("Permission Denied: Only 'ADMIN' role can restock.", { variant: "error" });
      } else {
        enqueueSnackbar("Restock failed. Check backend logs.", { variant: "error" });
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await api.delete(`/api/sweets/${id}`);
      enqueueSnackbar("Sweet deleted", { variant: "info" });
      fetchSweets();
    } catch (err) {
      enqueueSnackbar("Failed to delete", { variant: "error" });
    }
  };

  const handleSaveSweet = async (data) => {
    try {
      if (currentSweet) {
        await api.put(`/api/sweets/${currentSweet.id}`, data);
        enqueueSnackbar("Sweet updated", { variant: "success" });
      } else {
        await api.post("/api/sweets", data);
        enqueueSnackbar("New sweet added", { variant: "success" });
      }
      setModalOpen(false);
      fetchSweets();
    } catch (err) {
      enqueueSnackbar("Operation failed", { variant: "error" });
    }
  };

  const openAddModal = () => {
    setCurrentSweet(null);
    setModalOpen(true);
  };

  const openEditModal = (sweet) => {
    setCurrentSweet(sweet);
    setModalOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ 
        mb: 4, 
        p: 3, 
        bgcolor: "white", 
        borderRadius: 4, 
        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", 
        display: "flex", 
        gap: 2, 
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <TextField
          label="Search Sweets"
          name="name"
          variant="outlined"
          size="small"
          value={filters.name}
          onChange={handleFilterChange}
          InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <TextField
          select
          label="Category"
          name="category"
          size="small"
          value={filters.category}
          onChange={handleFilterChange}
          sx={{ minWidth: 150 }}
        >
      
          <MenuItem value="">All</MenuItem> 
          <MenuItem value="Bakery">Bakery</MenuItem>
          <MenuItem value="Candy">Candy</MenuItem>
          <MenuItem value="Chocolate">Chocolate</MenuItem>
          <MenuItem value="Traditional">Traditional</MenuItem>
          <MenuItem value="Drinks">Drinks</MenuItem>
        </TextField>
        <TextField label="Min Price" name="minPrice" type="number" size="small" value={filters.minPrice} onChange={handleFilterChange} sx={{ width: 100 }} />
        <TextField label="Max Price" name="maxPrice" type="number" size="small" value={filters.maxPrice} onChange={handleFilterChange} sx={{ width: 100 }} />
      </Box>


      {loading && sweets.length === 0 ? (
        <Box display="flex" justifyItems="center" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : sweets.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="text.secondary" mt={5}>
          No sweets found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {sweets.map((sweet) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={sweet.id}>
              <SweetCard
                sweet={sweet}
                role={user?.role}
                onBuy={handleBuy}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onRestock={handleRestock}
              />
            </Grid>
          ))}
        </Grid>
      )}

 
      {user?.role === "ADMIN" && (
        <Fab 
          color="primary" 
          aria-label="add" 
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={openAddModal}
        >
          <Add />
        </Fab>
      )}

      <AdminModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSubmit={handleSaveSweet}
        initialData={currentSweet}
      />
    </Container>
  );
};

export default Dashboard;