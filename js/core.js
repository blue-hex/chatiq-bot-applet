


export function initChat() {

  const chatTemplate = `
  <div class="fixed bottom-4 right-4">
  <button id="toggle-chatbot-button"
      class="bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
      <img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full scale-125">
  </button>

  <!-- Chatbot Form -->
  <div class="max-w-md mx-auto p-4">
      <div id="chatbot-form"
          class="bg-white hidden w-96 absolute bottom-16 right-4 p-4 rounded-3xl shadow-lg border border-neutral-200">
          <div class="rounded-full align-left cursor-pointer alert-del">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="w-6 h-6 text-black">
                  <path fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clip-rule="evenodd" />
              </svg>
          </div>
          <div class="md:container md:mx-auto ">
              <div class="max-w-sm bg-white rounded-lg">
                  <a href="#">
                      <div class="flex justify-center items-center bg-white">

                          <img class="h-16 w-16 " src="https://iqsuite.io/assets/iq.png" alt="" width="40px"
                              height="30px" />
                      </div>
                  </a>
                  <div class="p-5 bg-white">
                      <a href="#">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-black">Chat iQ</h5>
                      </a>
                      <p class="text-center mb-3 font-normal text-black">Transform any business and deploy a custom
                          solution with our cutting edge AI. </p>
                  </div>
                  <div class="px-5 pb-5 text-center bg-white" id="start-conversation-button">
                      <div id="chat:FCxvu7NgcI" class="text-white rounded-lg text-bl bg-blue-950 py-4 px-4 w-full">
                          <button type="button"> Start Conversation </button>
                      </div>
                  </div>

              </div>
          </div>
          <!-- Email Verification Form -->
          <div id="email-verification" class="hidden mt-4 w-96 ">
              <form id="email-form" class="space-y-4">
                  <label for="email" class="block font-semibold text-white">Verify Your Email:</label>
                  <input type="email" name="email" id="email"
                      class="p-2 rounded-md bg-neutral-100 border border-neutral-200" placeholder="Enter your email">
                  <button id="email-button" type="submit" class="bg-blue-950 text-white p-2 rounded-md">Start
                      Chat</button>
              </form>
          </div>
          <div id="chat-conversation1" class="msg-bubble chat-conversation1  mb-4 hidden">

          </div>
          <!-- Chat Conversation Form -->
          <div id="chat-conversation" class="hidden mt-4">
              <form id="chat-form" class=" space-y-4 ">
                  <div class="mt-4 flex">
                      <input type="text" id="user-input"
                          class=" flex-1 w-full rounded-lg p-2 bg-neutral-100 border border-neutral-200"
                          placeholder="Type your query" />
                      <button type="submit" id="send-button"
                          class="bg-blue-950 hover:bg-blue-900 text-white rounded-lg p-2 ml-2 inline-flex justify-center items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                              class="w-6 h-6 text-white">
                              <path
                                  d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                          </svg>
                      </button>
              </form>
          </div>
      </div>
  </div>`;


  // Create a div element to hold the chat UI
  const chatDiv = document.createElement("div");
  chatDiv.innerHTML = chatTemplate;

  // Attach the chat UI to the document body
  document.body.appendChild(chatDiv);

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
  const startConversationButton = document.getElementById("start-conversation-button");
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
    // API Call Here !!
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

  // Email API
  document.getElementById("email-button").addEventListener("click", () => {
    const inputData = document.getElementById("email").value;
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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
