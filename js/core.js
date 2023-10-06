// simple-chat.js

// Function to initialize the chat UI and event handlers
export function initChat() {
  // Your HTML template
  const chatTemplate = `
    <div class="fixed bottom-4 right-4">
    <!-- Open/Close Button -->


    <button id="toggle-chatbot-button"
        class="bg-yellow-600 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 focus:outline-none">
        <img src="1540869642.svg" width="40px" height="30px">



    </button>
   
    <!-- Chatbot Form -->
    <div class="max-w-md mx-auto p-4">

    <div id="chatbot-form" class="bg-yellow-600 hidden w-96 absolute bottom-16 right-4 p-4 rounded-lg shadow-lg">
 
    <strong class="text-white text-xl align-left cursor-pointer alert-del">&times;</strong>

    
    <div class="md:container md:mx-auto ">
            <div class="max-w-sm bg-white border border-yellow-600 rounded-lg shadow dark:bg-white dark:border-yellow-600">
                <a href="#">
                    <div class="flex justify-center items-center bg-yellow-600">

                        <img class="rounded-t-lg " src="milo-image.png" alt="" width="40px" height="30px" />
                    </div>
                </a>
                <div class="p-5  bg-yellow-600">
                    <a href="#">
                        <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Awshad Ai
                            Chatbox</h5>
                    </a>
                    <p class="text-center mb-3 font-normal text-white dark:text-gray-400">Seach are Knowledge base or start a
                        chat. We are happy to help you </p>
                </div>
                <div class="p-5 text-center bg-white" id="start-conversation-button">

        
                <div id="chat:FCxvu7NgcI" class="h-16 text-white pt-4 rounded-lg text-bl bg-yellow-600 tawk-card tawk-card-inverse tawk-card-small card--chat tawk-box-shadow-xsmall"><button type="button" class="tawk-button-hover tawk-custom-color tawk-custom-border-color tawk-button"><i class="tawk-icon tawk-icon-mobile-send"></i> New Conversation </button></div>                </div>

            </div>
        </div>

        <!-- Email Verification Form -->
        <div id="email-verification" class="hidden mt-4 w-96 ">
            <form id="email-form" class="space-y-4">
              
    
                <label for="email" class="block font-semibold text-white">Verify Your Email:</label>
                <input type="email" name = "email" id="email" class="p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email">
                <button id="email-button" type="submit" class="bg-yellow-700	 text-white p-2 rounded-md">Start Chat</button>
            </form>
        </div>
        <div id="chat-conversation1" class="msg-bubble chat-conversation1  mb-4 hidden">
        <!-- Chat messages go here -->
    </div>
  

        <!-- Chat Conversation Form -->
        <div id="chat-conversation" class="hidden mt-4">
            <form id="chat-form" class=" space-y-4 ">


            <div class="mt-4 flex">
                    <input type="text" id="user-input" class=" flex-1 w-full rounded-lg p-2 border"
                        placeholder="Type your message..." />
                    <button type="submit" id="send-button"
                        class="bg-yellow-600 hover:bg-yellow-600 text-white rounded-lg p-2 ml-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5l7 7-7 7" />
                        </svg>
                    </button>


            </form>
        </div>
    

    </div>
    
    
</div>


    `;

  // Create a div element to hold the chat UI
  const chatDiv = document.createElement("div");
  chatDiv.innerHTML = chatTemplate;

  // Attach the chat UI to the document body
  document.body.appendChild(chatDiv);

  // For example, handle form submission and display user messages
  var alert_del = document.querySelectorAll(".alert-del");
  alert_del.forEach((x) =>
    x.addEventListener("click", function () {
      x.parentElement.classList.add("hidden");
    })
  );

}



// Function to generate and display a bot response

document.addEventListener("DOMContentLoaded", function () {
  const toggleChatbotButton = document.getElementById("toggle-chatbot-button");
  const chatbotForm = document.getElementById("chatbot-form");
  const startConversationButton = document.getElementById(
    "start-conversation-button"
  );
  const emailVerification = document.getElementById("email-verification");
  const chatConversation = document.getElementById("chat-conversation");
  const emailForm = document.getElementById("email-form");
  const chatForm = document.getElementById("chat-form");
  const sendButton = document.getElementById("send-button");
  const chatConversation1 = document.getElementById("chat-conversation1");
  const userInput = document.getElementById("user-input");
  toggleChatbotButton.addEventListener("click", function () {
    if (chatbotForm.classList.contains("hidden")) {
      chatbotForm.classList.remove("hidden");
    } else {
      chatbotForm.classList.add("hidden");
    }
  });

  startConversationButton.addEventListener("click", function () {
    startConversationButton.style.display = "none";
    emailVerification.style.display = "block";
  });
  startConversationButton.addEventListener("click", function () {
    startConversationButton.style.display = "none";
    emailVerification.style.display = "block";
  });
  

  emailForm.addEventListener("submit", function (e) {
    e.preventDefault();
    emailVerification.style.display = "none";
    chatConversation.style.display = "block";
  });

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();

    const userMessage = userInput.value;

    // Append user's message to the chat conversation
    appendMessage("user", userMessage);

    const botResponse = getBotResponse(userMessage);

    // Append chatbot's response to the chat conversation
    // appendMessage('bot', botResponse);

    // Clear the input field
    userInput.value = "";

    // Show the chat conversation container
    chatConversation1.style.display = "block";
  });

  function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(
      "message",
      sender === "left" ? "left-msg" : "right-msg"
    );

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("msg-bubble");
    messageBubble.textContent = message;

    if (sender === "left") {
      messageBubble.style.background = "#d69e2e";
      messageBubble.style.color = "#fff";
      messageBubble.style.borderBottomRightRadius = "0";
    }

    // Calculate the width based on the message content, but limit it to a maximum of 450px
    const maxBubbleWidth = "450px";
    const messageWidth =
      Math.min(
        message.length <= 5 ? message.length * 25 : message.length * 10,
        parseInt(maxBubbleWidth)
      ) + "px";

    messageBubble.style.width = messageWidth;
    messageDiv.appendChild(messageBubble);
    chatConversation1.appendChild(messageDiv);
  }

  function getBotResponse(userMessage) {
    // Make a POST request to the Flask API
    fetch("http://127.0.0.1:5000/milo_chat", {
      method: "POST",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({ msg: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data
        const responseElement = document.getElementById("chat-conversation1");
        const chat = document.querySelector(".msg-bubble");

        const userMsg = `<div class="msg right-msg">
                                <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)">
                                </div>
                                <div class="msg-bubble ">
                                    <div class="msg-info">
                                        <div class="msg-info-name">AI Bot:</div>
                                        <div class="msg-info-time">12:46</div>
                                    </div>
                                    <div class="msg-text">
                                    ${data.result}
                                    </div>
                                </div>
                            </div>
                                `;
        const userMsgDiv = document.createElement("div");
        userMsgDiv.innerHTML = userMsg;
        chat.appendChild(userMsgDiv);
      })
      .catch((error) => console.error(error));
  }
  document.getElementById("email-button").addEventListener("click", () => {
    const inputData = document.getElementById("email").value;

    // Make a POST request to the Flask API
    fetch("http://127.0.0.1:5000/milo_chat", {
      method: "POST",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify({ email: inputData }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST request failed");
        }
      })
      .then((data) => {
        // Handle the API response data
        console.log(data);
      })
      .catch((error) => {
        // Handle errors, including non-JSON responses
        console.error("Error:", error);
      });
  });
});
