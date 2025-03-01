import mongoose from "mongoose";
import Conversation from "../models/conversational-model.js";
import Message from "../models/message-model.js";
import { getReceiverSocketId, io } from "../SocketIO/socket.js";

const SendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // Extract receiverId
    const senderId = req.user._id; // Get senderId from authorized middleware

    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Validate ObjectIds
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ message: "Invalid participant ID(s)" });
    }

    // Convert receiverId to ObjectId
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    console.log("Query:", {
      participants: { $all: [senderId, receiverObjectId] },
    });

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverObjectId] },
    });

    if (!conversation) {
      console.log("No existing conversation found. Creating a new one...");
      conversation = await Conversation.create({
        participants: [senderId, receiverObjectId],
      });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId: receiverObjectId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Save both conversation and message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSocketId = getReceiverSocketId(receiverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: newMessage.message });
  } catch (error) {
    console.error("Error in Sending message for message-controller:", error);
    res.status(500).json({
      message: "Internal server error during send message for message-controller",
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const chatUser = req.params.id.trim();
    const sendId = req.user._id;
    const senderId = sendId.toString().trim();

    console.log("Sender ID to get allMessage : ", senderId);
    console.log("Chat User ID to get allMessage : ", chatUser);

    // Validate ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(chatUser) ||
      !mongoose.Types.ObjectId.isValid(senderId)
    ) {
      console.log("Invalid participant ID(s)");
      return res.status(400).json({ message: "Invalid participant ID(s)" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");
    
    if (!conversation) {
      return res.status(201).json([]);
    }
    const Messages = conversation.messages;
    res.status(201).json(Messages);
  } catch (error) {
    console.log("Error in getting message " + error);
    res.status(500).json({ message: "Internal server error during getting message" });
  }
};

export { SendMessage, getMessage };