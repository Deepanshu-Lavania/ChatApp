import { Schema, model } from "mongoose";
import User from "./user-model.js";
import Message from "./message-model.js";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: User,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Conversation = model("Conversation", conversationSchema);

export default Conversation;
