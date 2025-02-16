// Predefined bot responses
const botResponses = {
    "hello": "Hello! Welcome to our Skincare Assistant. How can I assist you today?",
    "how can i track my order?": "You can track your order by entering your order number on our order tracking page.",
    "what ingredients are in your products?": "Each product has a detailed list of ingredients on its page. Please let me know which product you're interested in: Bath Treats, Body Treatments, or Skin Consultations.",
    "can i speak to a customer support representative?": "Sure! I can connect you to our customer support team. How would you like to reach them—via email or chat?",
    "what promotions are currently available?": "We currently have a 20% discount on all orders over $50! You can find more details on our promotions page.",
    "what products do you recommend for sensitive skin?": "For sensitive skin, I recommend our gentle cleanser and hydrating moisturizer. They're formulated to be soothing and non-irritating.",
    "can you help me with a skincare routine?": "Absolutely! Let's start by taking a quick skincare quiz to understand your skin better.",
    "bye": "Goodbye! Have a great day!",
    "thank you": "You're welcome! If you have any more questions, feel free to ask.",
    "how do i return a product?": "You can return a product within 30 days of purchase. Please visit our returns page for more information.",
    "do you offer free samples?": "Yes, we offer free samples with every order. You can select your samples at checkout.",
    "where are your products made?": "Our products are made in the USA with high-quality ingredients sourced from around the world.",
    "how can i contact customer service?": "You can contact our customer service team via email at support@heartlea.com or call us at 1-800-123-4567.",
    "what is your shipping policy?": "We offer free shipping on orders over $50. For more details, please visit our shipping policy page.",
    "do you have a loyalty program?": "Yes, we have a loyalty program where you can earn points on every purchase. Sign up on our loyalty program page.",
    "what is your refund policy?": "We offer a full refund within 30 days of purchase. Please visit our refund policy page for more details.",
    "email": "You can reach our customer support team via email at support@heartlea.com.",
    "chat": "You can chat with our customer support team on our website. Just click the chat icon at the bottom right corner.",
    "bath treats": "Here are our Bath Treats products: <img src='path/to/bath_treats_image.jpg' alt='Bath Treats'>",
    "body treatments": "Here are our Body Treatments products: <img src='path/to/body_treatments_image.jpg' alt='Body Treatments'>",
    "skin consultations": "Here are our Skin Consultations products: <img src='path/to/skin_consultations_image.jpg' alt='Skin Consultations'>"
};

// Quiz questions and logic
const quizQuestions = [
    { question: "What is your skin type? (dry, oily, combination, normal)", options: ["dry", "oily", "combination", "normal"], answer: null }, 
    { question: "Do you have any specific skin concerns? (acne, aging, dryness, sensitivity)", options: ["acne", "aging", "dryness", "sensitivity"], answer: null },
    { question: "How often do you use sunscreen? (never, sometimes, daily)", options: ["never", "sometimes", "daily"], answer: null },
    { question: "How much water do you drink daily? (less than 1L, 1-2L, more than 2L)", options: ["less than 1L", "1-2L", "more than 2L"], answer: null }
];

let currentQuestionIndex = 0;
let inQuizMode = false;

// Function to handle chat submission
document.querySelector('.chat-input').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userInput = event.target.querySelector('input').value.toLowerCase();
    if (userInput) {
        addMessage(userInput, 'user');
        event.target.querySelector('input').value = '';

        if (inQuizMode) {
            handleQuiz(userInput);
        } else {
            processMessage(userInput);
        }
    }
});

// Function to process normal chat messages
function processMessage(userInput) {
    // Show "thinking..." message
    setTimeout(() => {
        addMessage('Thinking...', 'bot-thinking');

        // Replace "thinking..." with actual bot response after some seconds
        setTimeout(() => {
            const botResponse = botResponses[userInput] || `Sorry, I don't understand that. Maybe you can ask about one of the following:
            1. How can I track my order?
            2. What ingredients are in your products?
            3. Can I speak to a customer support representative?
            4. What promotions are currently available?
            5. What products do you recommend for sensitive skin?
            6. Where are your products made?
            7. How can I contact customer service?
            8. What is your shipping policy?
            9. Do you have a loyalty program?
            10. What is your refund policy?
            11. Do you offer free samples?
            12. Can you help me with a skincare routine?`;

            // If the user asks for skincare routine help, start the quiz
            if (userInput === "can you help me with a skincare routine?") {
                startQuiz();
            } else {
                removeThinkingMessage();
                addMessage(botResponse, 'bot');
            }
        }, 2000); // Time delay before actual response (2 seconds)
    }, 500); // Time delay before showing "thinking..." (0.5 seconds)
}

// Function to start the quiz
function startQuiz() {
    inQuizMode = true;
    currentQuestionIndex = 0;
    addMessage(quizQuestions[currentQuestionIndex].question, 'bot');
}

// Function to handle quiz progression
function handleQuiz(userInput) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (currentQuestion.options.includes(userInput)) {
        currentQuestion.answer = userInput;
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            addMessage(quizQuestions[currentQuestionIndex].question, 'bot');
        } else {
            inQuizMode = false;
            showQuizResults();
        }
    } else {
        addMessage(`Please answer with one of the following: ${currentQuestion.options.join(', ')}`, 'bot');
    }
}

// Function to show quiz results and provide recommendations
function showQuizResults() {
    let recommendations = "Based on your answers, here's a personalized skincare routine for you:\n";

    quizQuestions.forEach(question => {
        recommendations += `- For ${question.question}, you answered "${question.answer}".\n`;
    });

    recommendations += "\nWe recommend using a gentle cleanser, moisturizer, and daily sunscreen based on your skin type and needs.";

    addMessage(recommendations, 'bot');
}

// Function to add messages to the chat window
function addMessage(text, sender) {
    const chatWindow = document.querySelector('.chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerHTML = `<p>${text}</p>`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to remove the "thinking..." message
function removeThinkingMessage() {
    const thinkingMessage = document.querySelector('.chat-message.bot-thinking');
    if (thinkingMessage) {
        thinkingMessage.remove();
    }
}

// Function to display quick suggestions
function showQuickSuggestions() {
    const suggestions = [
        "How can I track my order?",
        "What ingredients are in your products?",
        "Can I speak to a customer support representative?",
        "What promotions are currently available?",
        "What products do you recommend for sensitive skin?",
        "Can you help me with a skincare routine?"
    ];
    const suggestionsContainer = document.querySelector('.suggestions-container');
    
    suggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('button');
        suggestionElement.classList.add('suggestion-button');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
            addMessage(suggestion, 'user');
            setTimeout(() => {
                const botResponse = botResponses[suggestion.toLowerCase()] || `Sorry, I don't understand that. Maybe you can ask about one of the following:
            1. How can I track my order?
            2. What ingredients are in your products?
            3. Can I speak to a customer support representative?
            4. What promotions are currently available?
            5. What products do you recommend for sensitive skin?
            6. Where are your products made?
            7. How can I contact customer service?
            8. What is your shipping policy?
            9. Do you have a loyalty program?
            10. What is your refund policy?
            11. Do you offer free samples?
            12. Can you help me with a skincare routine?`;
                
                addMessage(botResponse, 'bot');
            }, 1000);
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}

// Show quick suggestions on page load
document.addEventListener('DOMContentLoaded', showQuickSuggestions);