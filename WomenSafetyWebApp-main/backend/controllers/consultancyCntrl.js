const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');
const { ConsultancyChat } = require('../models/consultancyChatModel');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const sendConsultancyMessage = asyncHandler(async (req, res) => {
    const { userId, message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        // Generate response using OpenAI
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful consultant for women's safety. Provide supportive, informative advice on safety, emergency situations, and general well-being." },
                { role: "user", content: message }
            ],
            max_tokens: 150,
        });

        const aiResponse = completion.choices[0].message.content;

        // Save chat to database
        const chat = await ConsultancyChat.create({
            user: userId,
            message: message,
            response: aiResponse
        });

        res.status(201).json({
            message: "Consultancy message sent successfully",
            response: aiResponse,
            chatId: chat._id
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ message: "Failed to get AI response" });
    }
});

const getConsultancyChats = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const chats = await ConsultancyChat.find({ user: userId }).sort({ timestamp: -1 });

    res.status(200).json(chats);
});

module.exports = { sendConsultancyMessage, getConsultancyChats };
