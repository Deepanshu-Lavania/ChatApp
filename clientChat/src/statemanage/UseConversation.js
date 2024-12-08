import { create } from "zustand";

export const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }), // js creation of fat arrow function with object
  message: [],
  // setMessage: (message) => set({ message }),
  setMessage: (updater) =>
    set((state) => ({
      message:
        typeof updater === "function" // Check if the updater is a function
          ? updater(state.message) // If yes, apply it to the current state
          : updater, // Otherwise, replace the state directly
    })),
}));
