import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('lapurane_cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('lapurane_cart', JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cart]);
  
  const addToCart = useCallback((item) => {
    setCart(prev => {
      const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === key);
      
      if (existing) {
        return prev.map(i => 
          `${i.id}-${i.selectedSize}-${i.selectedColor}` === key 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      
      return [...prev, { ...item, addedAt: Date.now() }];
    });
  }, []);
  
  const updateCartItem = useCallback((item, quantity) => {
    if (quantity <= 0) {
      removeFromCart(item);
      return;
    }
    
    const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
    setCart(prev => prev.map(i => 
      `${i.id}-${i.selectedSize}-${i.selectedColor}` === key 
        ? { ...i, quantity } 
        : i
    ));
  }, []);
  
  const removeFromCart = useCallback((item) => {
    const key = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
    setCart(prev => prev.filter(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` !== key));
  }, []);
  
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);
  
  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);
  
  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      getCartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}