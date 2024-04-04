

// 
export function initChat(bot_id) {
  const botiq_id = bot_id;
  const chatTemplate = `
  <div class="fixed bottom-4 right-4">
  <button id="toggle-chatbot-button"
      class="bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
      <img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full scale-125">
  </button>

  <!-- Chatbot Form -->
  <div class="max-w-md mx-auto p-4">
      <div id="chatbot-form"
          class=" backdrop-blur-2xl hidden w-96 absolute bottom-16 right-4 p-4 rounded-3xl shadow-lg border border-neutral-200">
          <div class="rounded-full align-left cursor-pointer alert-del">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="w-6 h-6 text-black">
                  <path fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clip-rule="evenodd" />
              </svg>
          </div>
          <div class="md:container md:mx-auto ">
              <div class="max-w-sm backdrop-blur-2xl rounded-lg">
                  <a href="#">
                      <div class="flex justify-center items-center  backdrop-blur-2xl">

                          <img class="h-16 w-16 " src="https://iqsuite.io/assets/iq.png" alt="" width="40px"
                              height="30px" />
                      </div>
                  </a>
                  <div class="p-5  backdrop-blur-2xl">
                      <a href="#">
                          <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-black">Chat iQ</h5>
                      </a>
                      <p class="text-center mb-3 font-normal text-black">Transform any business and deploy a custom
                          solution with our cutting edge AI. </p>
                  </div>
                  <div class="px-5 pb-5 text-center  backdrop-blur-2xl" id="start-conversation-button">
                      <div id="chat:FCxvu7NgcI" class="text-white rounded-lg text-bl bg-black py-4 px-4 w-full">
                          <button type="button"> Start Conversation </button>
                      </div>
                  </div>

              </div>
          </div>
          <!-- Email Verification Form -->
          <div id="email-verification" class="hidden mt-4 w-96">
              <form id="email-form" class="w-full ml-12 ">
                  <input type="text" name="name" id="customer_name" required
                      class="p-2 rounded-md bg-neutral-100 border border-neutral-200 w-8/12" placeholder="Enter your name">
                  <input type="email" name="email" id="email" required
                      class="p-2 rounded-md bg-neutral-100 border border-neutral-200 w-8/12 my-1.5" placeholder="Enter your email">
                  <button id="email-button" type="submit" class="bg-black text-white p-2 rounded-md text-sm w-8/12 my-1.5">Continue</button>
              </form>
          </div>
          <div id="chat-conversation1" class="msg-bubble chat-conversation1  mb-4 hidden h-96 overflow-y-auto">

          </div>
          <!-- Chat Conversation Form -->
          <div id="chat-conversation" class="hidden mt-4">
              <form id="chat-form" class=" space-y-4 ">
                  <div class="mt-4 flex">
                      <input type="text" id="user-input"
                          class=" flex-1 w-full rounded-lg p-2 bg-neutral-100 border border-neutral-200"
                          placeholder="Type your query" />
                      <button type="submit" id="send-button"
                          class="bg-black hover:bg-blue-900 text-white rounded-lg p-2 ml-2 inline-flex justify-center items-center">
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

  // Store the bot id 
  const bot_element = document.createElement("p");
  bot_element.innerHTML = botiq_id;
  bot_element.id = "botiq_id";
  bot_element.hidden = true;
  document.body.appendChild(bot_element);

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
    chatConversation1.style.display = "block";
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

  let user_email1;

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
      messageBubble.style.background = "#059669";
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

  async function getBotResponse(userMessage) {
    console.log("user_email inside bot response", document.getElementById("botiq_id").innerHTML)
    console.log("bot_id from main")
    const formdata = new FormData();
    formdata.append("user_query", userMessage);
    formdata.append("chatbot_id", document.getElementById("botiq_id").innerHTML);
    formdata.append("user_email", user_email1); //Need to get this customer email from users application

    try {
      const response = await fetch("http://localhost:3003/app/bot-query/", {
        method: "POST",
        body: formdata,
      });
      const result = await response.json(); // Assuming the API returns JSON now

      const iqResponse = result.message_list.find(message => message.type === "iq");
      if (iqResponse) {
        const responseElement = document.getElementById("chat-conversation1");
        const chat = document.querySelector(".msg-bubble");

        const userMsg = `<div class="msg left-msg">
                                <div class="msg-bubble left-msg rounded-3xl">
                                    <div class="msg-info">
                                        <div class="msg-info-name">Chat iQ</div>
                                    </div>
                                    <div class="msg-text">
                                    ${iqResponse.text}
                                    </div>
                                </div>
                            </div>`;
        const userMsgDiv = document.createElement("div");
        userMsgDiv.innerHTML = userMsg;
        chat.appendChild(userMsgDiv);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // Customer Information API
  document.getElementById("email-button").addEventListener("click", () => {
    user_email1 = document.getElementById("email").value;
    console.log("user_email", "user_email1");
    const customerEmail = document.getElementById("email").value;
    const customerName = document.getElementById("customer_name").value
    const botIQId = document.getElementById("botiq_id").innerHTML
    console.log("inside the email registration", customerEmail, customerName);
    const formdata = new FormData();
    formdata.append("customer_name", customerName);
    formdata.append("customer_email", customerEmail);
    formdata.append("bot_id", botIQId);

    fetch("http://localhost:3003/app/bot-create-or-fetch/", {
      method: "POST",
      // headers: {
      //   mode: "cors",
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods": "POST",
      // },
      body: formdata,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();

        } else {
          throw new Error("POST request failed");
        }
      })
      .then((data) => {
        const result = data
        const conversation_list = result["conversation"]
        // Initial message from Bot
        if (result["conversation"].length === 0) {
          const responseElement = document.getElementById("chat-conversation1");
          const chat = document.querySelector(".msg-bubble");

          const userMsg = `<div class="msg left-msg">
                                  <div class="msg-bubble left-msg rounded-3xl">
                                      <div class="msg-info">
                                          <div class="msg-info-name">Chat iQ</div>
                                      </div>
                                      <div class="msg-text">
                                      What can I help you with today?
                                      </div>
                                  </div>
                              </div>`;
          const userMsgDiv = document.createElement("div");
          userMsgDiv.innerHTML = userMsg;
          chat.appendChild(userMsgDiv);
        }
        // Append History of customer bot
        for (const item of conversation_list) {
          const iqResponse = item.find(message => message.type === "iq");
          const userResponse = item.find(message => message.type === "user");

          if (userResponse) {
            appendMessage("user", userResponse.text);
          }

          if (iqResponse) {
            const responseElement = document.getElementById("chat-conversation1");
            const chat = document.querySelector(".msg-bubble");

            const userMsg = `<div class="msg left-msg">
                                  <div class="msg-bubble left-msg rounded-3xl">
                                      <div class="msg-info">
                                          <div class="msg-info-name">Chat iQ</div>
                                      </div>
                                      <div class="msg-text">
                                      ${iqResponse.text}
                                      </div>
                                  </div>
                              </div>`;
            const userMsgDiv = document.createElement("div");
            userMsgDiv.innerHTML = userMsg;
            chat.appendChild(userMsgDiv);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
