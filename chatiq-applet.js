(function () {
	const chatLib = {};

	function initChat(bot_id, base_url) {
		document.addEventListener("DOMContentLoaded", function () {
			const botiq_id = bot_id;
			const BASE_URL = base_url ? base_url : "https://chat.iqsuite.in";

			const chatTemplate = `
          <div class="fixed bottom-4 right-4">
          <button id="toggle-chatbot-button"
              class="bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
              <img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full scale-125">
          </button>
      
        <!-- Chatbot Form -->
        <div class="max-w-md mx-auto p-4 bg-white-40">
            <div id="chatbot-form"
                class=" backdrop-blur-2xl hidden w-96 absolute bottom-16 right-4 p-4 rounded-3xl shadow-lg border border-neutral-200">
                <div class="alert-del" style="margin-top: 10px;margin-left: 10px;" id="close-start-conversation">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="" >
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="md:container md:mx-auto mt-4 ">
                    <div class="max-w-sm backdrop-blur-2xl rounded-lg">
                        <a href="#">
                            <div class="flex justify-center items-center backdrop-blur-2xl">
      
                                <img class="img" src="https://iqsuite.io/assets/iq.png" alt="" width="40px"
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
                            <div id="chat:FCxvu7NgcI" class="text-white rounded-lg text-black bg-black py-4 px-4 w-full">
                                <button type="button" class="custom-button" id="activation-status"> Start Conversation </button>
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
                            class="p-2 rounded-md bg-neutral-100 border border-neutral-200 w-8/12 my-2" placeholder="Enter your email">
                        <button id="email-button" type="submit" class="w-8/12 bg-black text-white p-2 rounded-md text-sm bt-wid my-2 ">Continue</button>
                    </form>
                </div>
                <div id="chat-conversation1" class="msg-bubble chat-conversation1  mb-4 hidden h-96 overflow-y-auto">
      
                </div>
                <!-- Chat Conversation Form -->
                <div id="chat-conversation" class="hidden mt-4">
                    <form id="chat-form" class="space-y-4">
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
			const closeStartConversation = document.getElementById("close-start-conversation")
			const activationStatus = document.getElementById("activation-status")
			const statusBG = document.getElementById("chat:FCxvu7NgcI")

			// access display property of chatbotForm

			//tailwind to css
			if (closeStartConversation) {
				closeStartConversation.addEventListener("click", function () {
					chatbotForm.style.display = "none";

				});
			}
			if (toggleChatbotButton) {
				toggleChatbotButton.addEventListener("click", function () {
					const botIQId = document.getElementById("botiq_id").innerHTML
					const formdata = new FormData();
					formdata.append("bot_id", botIQId);

					fetch("http://localhost:8014/app/bot-create-or-fetch/", {
						method: "POST",
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
							console.log("inside block none1")
							const computedStyle = window.getComputedStyle(chatbotForm);
							const displayProperty = computedStyle.getPropertyValue("display");

							activationStatus.innerHTML = "Start Conversation"
							activationStatus.disabled = false;
							statusBG.classList.add("bg-black");
							statusBG.classList.remove("bg-red");
							activationStatus.style.backgroundColor = "#000";

							if (result["status"] === "success") {
								console.log("display", displayProperty)
								if (displayProperty === "none") {
									chatbotForm.style.display = "block";
								} else {
									chatbotForm.style.display = "none";
								}

							} else {
								console.log("inside block none2")
								chatbotForm.style.display = "block";
								activationStatus.innerHTML = "Your IQ Bot has deactivated."
								activationStatus.disabled = true;
								statusBG.classList.remove("bg-black");
								statusBG.classList.add("bg-red");
								activationStatus.style.backgroundColor = "#dc2626";
							}
						})
						.catch((error) => {
							console.error("Error:", error);
						});

				});
			}

			if (activationStatus) {
				activationStatus.addEventListener("click", function () {
					startConversationButton.style.display = "none";
					emailVerification.style.display = "block";
				});
			}

			if (emailForm) {
				emailForm.addEventListener("submit", function (e) {
					e.preventDefault();
					emailVerification.style.display = "none";
					chatConversation1.style.display = "block";
					chatConversation.style.display = "block";
				});
			}

			if (sendButton) {
				sendButton.addEventListener("click", function (e) {
					e.preventDefault();

					const userMessage = userInput.value.trim();

					// Validate if user message is not empty
					if (userMessage.length === 0) {
						//alert("Please enter a message to send.");
						return;
					}

					appendMessage("user", userMessage);
					const botResponse = getBotResponse(userMessage);

					userInput.value = "";

					chatConversation1.style.display = "block";
				});
			}


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
				//console.log("user_email inside bot response", document.getElementById("botiq_id").innerHTML)
				//console.log("bot_id from main")
				const formdata = new FormData();
				formdata.append("user_query", userMessage);
				formdata.append("chatbot_id", document.getElementById("botiq_id").innerHTML);
				formdata.append("user_email", user_email1);

				try {
					const response = await fetch(BASE_URL + "/app/bot-query/", {
						method: "POST",
						body: formdata,
					});
					const result = await response.json();

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
				const customerEmail = document.getElementById("email").value;
				const customerName = document.getElementById("customer_name").value
				const botIQId = document.getElementById("botiq_id").innerHTML
				const formdata = new FormData();
				formdata.append("customer_name", customerName);
				formdata.append("customer_email", customerEmail);
				formdata.append("bot_id", botIQId);

				fetch(BASE_URL + "/app/bot-create-or-fetch/", {
					method: "POST",
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
						if (result["status"] === "success") {
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
						} else {
							alert("Associated bot has been deactivated. Contact to site owner")
						}
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			});

			// Auto close Alert
			function closeModal() {
				const alertElement = document.getElementById('my_modal_3');
				setTimeout(function () {
					console.log("close alert")
					alertElement.close()
				}, 3000);
			}
		})
	}


	chatLib.initChat = initChat;

	window.chatLib = chatLib;

	// chatLib.initChat("your_bot_id", "https://your_base_url");

})();