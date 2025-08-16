import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User } from '../types';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      
      addToCart: (product: Product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { product, quantity: 1 }],
          });
        }
      },
      
      removeFromCart: (productId: string) => {
        set({
          cart: get().cart.filter(item => item.product.id !== productId),
        });
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: 'flipkart-store',
    }
  )
);