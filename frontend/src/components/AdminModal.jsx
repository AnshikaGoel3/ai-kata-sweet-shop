import { 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, MenuItem 
} from "@mui/material";
import { useState, useEffect } from "react";

const categories = ["Bakery", "Candy", "Chocolate", "Traditional", "Drinks"];

const AdminModal = ({ open, handleClose, handleSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "", category: "", price: "", quantity: "", imageUrl: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: "", category: "", price: "", quantity: "", imageUrl: "" });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Edit Sweet" : "Add New Sweet"}</DialogTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" fullWidth required value={formData.name} onChange={handleChange} />
          
          <TextField select label="Category" name="category" fullWidth required value={formData.category} onChange={handleChange}>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>

          <Box display="flex" gap={2}>
            <TextField label="Price" name="price" type="number" fullWidth required value={formData.price} onChange={handleChange} />
            <TextField label="Quantity" name="quantity" type="number" fullWidth required value={formData.quantity} onChange={handleChange} />
          </Box>

          <TextField label="Image URL" name="imageUrl" fullWidth required value={formData.imageUrl} onChange={handleChange} helperText="Paste a valid image link" />

          {/* Image Preview */}
          {formData.imageUrl && (
            <Box sx={{ mt: 1, height: 150, borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc' }}>
              <img src={formData.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Button onClick={() => handleSubmit(formData)} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminModal;