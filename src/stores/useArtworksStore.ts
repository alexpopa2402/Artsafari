import { create } from 'zustand';
import { supabase } from '@services/supabaseClient';

interface Artwork {
    id: string;
    user_id: string;
    title: string;
    medium: string;
    year: number;
    materials: string;
    width: number;
    height: number;
    depth: number;
    notes: string;
    image_urls: string[];
    created_at: string;
}

interface ArtworksStore {
    artworks: Artwork[];
    isLoading: boolean;
    error: string | null;
    fetchArtworks: (userId?: string) => Promise<void>; // Accept optional userId
    addArtwork: (artwork: Artwork) => void;
    updateArtwork: (id: string, updates: Partial<Artwork>) => void;
    deleteArtwork: (id: string) => void;
    searchArtworks: (query: string) => Artwork[];
}

export const useArtworksStore = create<ArtworksStore>((set, get) => ({
    artworks: [],
    isLoading: false,
    error: null,

    fetchArtworks: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          let query = supabase
            .from('artworks')
            .select('*')
            .order('created_at', { ascending: false });
    
          if (userId) {
            query = query.eq('user_id', userId); // Filter by user ID if provided
          }
    
          const { data, error } = await query;
    
          if (error) throw error;
          set({ artworks: data || [], isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch artworks', isLoading: false });
          console.error(error);
        }
      },

    addArtwork: (artwork) => {
        set((state) => ({ artworks: [artwork, ...state.artworks] }));
    },

    updateArtwork: (id, updates) => {
        set((state) => ({
            artworks: state.artworks.map((artwork) =>
                artwork.id === id ? { ...artwork, ...updates } : artwork
            ),
        }));
    },

    deleteArtwork: (id) => {
        set((state) => ({
            artworks: state.artworks.filter((artwork) => artwork.id !== id),
        }));
    },

    searchArtworks: (query) => {
        const { artworks } = get();
        return artworks.filter((artwork) =>
            artwork.title.toLowerCase().includes(query.toLowerCase())
        );
    },
}));