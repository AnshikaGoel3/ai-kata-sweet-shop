import { 
  Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Box, Tooltip, IconButton 
} from "@mui/material";
import { Edit, Delete, ShoppingCart, Add, Remove, Inventory } from "@mui/icons-material";

const SweetCard = ({ sweet, role, onBuy, onEdit, onDelete, onRestock }) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <Card 
      sx={{ 
        maxWidth: 340, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        position: 'relative',
        overflow: 'visible',
        bgcolor: '#fff',
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        "&:hover": { 
          transform: "translateY(-8px)", 
          boxShadow: "0 20px 40px rgba(233, 30, 99, 0.2)" 
        }
      }}
    >
    
      <Box sx={{ position: 'relative', height: 200, overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
      <CardMedia
        component="img"
        height="200"
        // CHECK BOTH: If "imageUrl" is missing, try "image". If both missing, use default.
        image={sweet.imageUrl || sweet.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"}
        alt={sweet.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop";
        }}
        sx={{ 
          transition: "transform 0.5s ease",
          "&:hover": { transform: "scale(1.1)" }
        }}
      />
        <Chip 
          label={sweet.category} 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12, 
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            fontWeight: 700,
            color: '#E91E63',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
      

      <CardContent sx={{ flexGrow: 1, pt: 3, px: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight="800" sx={{ lineHeight: 1.2 }}>
            {sweet.name}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="h5" color="primary" fontWeight="900">
            ₹{sweet.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ mt: 0.5 }}>
             / kg
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" gap={1}>
          <Inventory fontSize="small" color={isOutOfStock ? "error" : "action"} />
          <Typography variant="body2" color={isOutOfStock ? "error.main" : "text.secondary"} fontWeight="600">
            {isOutOfStock ? "Out of Stock" : `${sweet.quantity} kg available`}
          </Typography>
        </Box>
      </CardContent>


      <CardActions sx={{ p: 3, pt: 0 }}>
        {role === "USER" ? (
          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            startIcon={<ShoppingCart />}
            disabled={isOutOfStock}
            onClick={() => onBuy(sweet)}
            sx={{ 
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              background: isOutOfStock 
                ? 'grey' 
                : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Beautiful Gradient
              boxShadow: isOutOfStock ? 'none' : '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
          >
            {isOutOfStock ? "Sold Out" : "Order Now"}
          </Button>
        ) : (
      
          <Box 
            sx={{ 
              display: 'flex', 
              width: '100%', 
              justifyContent: 'space-between', 
              bgcolor: '#F5F5F5', 
              p: 1, 
              borderRadius: 3 
            }}
          >
            <Tooltip title="Restock">
              <IconButton size="small" onClick={() => onRestock(sweet.id)} sx={{ color: '#4CAF50', bgcolor: 'white', boxShadow: 1 }}>
                <Add />
              </IconButton>
            </Tooltip>
            
            <Box display="flex" gap={1}>
              <Tooltip title="Edit">
                <IconButton size="small" onClick={() => onEdit(sweet)} sx={{ color: '#2196F3', bgcolor: 'white', boxShadow: 1 }}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => onDelete(sweet.id)} sx={{ color: '#F44336', bgcolor: 'white', boxShadow: 1 }}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default SweetCard;