// src/features/chat/chatSlice.js
import { createSlice } from "@reduxjs/toolkit";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{
    chapter: string;
    verse: string;
    chapterName: string;
    link: string;
  }>;
};

interface ChatState {
  messages: Message[];
}


const initialState = {
  messages: [] // each message: { id, role, text }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state: ChatState, action: { payload: Message }) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;