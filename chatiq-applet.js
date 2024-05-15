require("./chatiq-applet.css");
var $hzDL5$jquery = require("jquery");
var $hzDL5$animejs = require("animejs");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



(0, ($parcel$interopDefault($hzDL5$jquery)))(function() {
    let BASE_URL = "";
    let BOT_ID = "";
    let chatHistory = [];
    let name = "";
    let email = "";
    let isLoading = false;
    const loader = `<div class="isLoading loader self-start"></div>`;
    let initSuccess = false;
    let bot_config = {};
    // setupChatWidget();
    //
    (0, ($parcel$interopDefault($hzDL5$jquery)))("#toggle-chatbot-button").click(function() {
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#chatbot-form").toggle();
    });
    (0, ($parcel$interopDefault($hzDL5$jquery)))("#close-start-conversation").click(function() {
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#chatbot-form").hide();
    });
    function showLogoHeader() {
        (0, ($parcel$interopDefault($hzDL5$jquery)))(".pre-logo-wrapper").hide();
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#welcome-message").hide();
        (0, ($parcel$interopDefault($hzDL5$jquery)))(".post-logo-wrapper").show();
        (0, ($parcel$interopDefault($hzDL5$animejs)))({
            targets: ".post-logo-wrapper",
            translateY: [
                -10,
                0
            ],
            // translateX: [-100, 0],
            opacity: [
                0,
                1
            ],
            duration: 600
        });
    }
    function setupChatWidget(brand_name, logo, welcome_message) {
        const chatTemplate = `
			<div class="fixed bottom-4 right-4">
				<button id="toggle-chatbot-button" style="border: 0; background: transparent;">
					<img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full">
				</button>
				
				<div class="max-w-md mx-auto p-4">
					<div id="chatbot-form" class="flex flex-col w-96 absolute bottom-16 right-4 p-4 rounded-3xl shadow-lg border border-slate-200 bg-white" style="max-height: 50vh;">
						<div class="flex items-center justify-end w-full cursor-pointer"  id="close-start-conversation">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="6 h-6">
								<path fill-rule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
									clip-rule="evenodd" />
							</svg>
						</div>
						
						<div class="md:container md:mx-auto m-0" id="chat-mast">
							<div class="max-w-sm backdrop-blur-2xl rounded-lg">
								<div class="pre-logo-wrapper flex items-center justify-center space-x-2">
									<img class="inline-block rounded-lg" src="${logo ? BASE_URL + logo : "https://iqsuite.io/assets/iq.png"}" alt="" width="60px" id="logo" />
									<h1 class="text-2xl font-bold tracking-tight text-black">
									    ${brand_name ? brand_name : "Chat iQ"}
                                    </h1>
								</div>
								
								<div class="post-logo-wrapper flex items-center space-x-2">
									<img class="inline-block rounded-lg" src="${logo ? BASE_URL + logo : "https://iqsuite.io/assets/iq.png"}" alt="" width="60px" id="logo" />
									<h1 class="text-2xl font-bold tracking-tight text-black">${brand_name ? brand_name : "Chat iQ"}</h1>
								</div>
								
								<div class="px-3 py-3 welcome-wrapper">
									<p class="text-center mb-3 font-normal text-black text-xs" id="welcome-message"></p>									
								</div>						
							</div>
						</div>
						
						<!-- Email Verification Form -->
						<div id="email-verification" class="hidden mx-0 my-1">
							<form id="email-verification-form" class="">
								<div class="flex flex-col space-y-1.5">
									<div class="error-message block mb-3">
										<p class="text-red-500 text-xs text-center">Oops, something went wrong, please try again.</p>
									</div>
								
									<input type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="John Doe" />
									<input type="email" name="email" id="email" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="john.doe@acme.org" />
									<button id="email-submit-btn" type="submit" class="bg-black hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2 ">Continue</button>
									<button id="email-loading-btn" type="button" disabled class="bg-black hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2 flex items-center justify-center">
									  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									  </svg>
									</button>
								</div>
							</form>
						</div>

						<!-- Chat Conversation Form -->
						<div id="chat-conversation" class="overflow-auto">
						
							<div class="flex flex-col space-y-4 p-6 max-w-lg mx-auto rounded-lg mt-10 overflow-y-auto" id="conversations-wrapper">
								<!-- AI Message -->
								<div class="hidden self-end items-center bg-green-500 shadow justify-end px-3 py-2 rounded-md" style="max-width: 75%;">
									<p class="text-green-100 text-sm">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium fugit hic modi placeat quo reprehenderit similique veniam, vitae. At beatae cupiditate deserunt esse inventore quaerat quod repellendus veritatis? Quis, quo!
									</p>
								</div>
								
								<!-- User Message -->
								<div class="hidden self-start items-center bg-gray-300 px-3 py-2 rounded-md max-w-1/2" style="max-width: 75%;">
									<p class="text-gray-800 text-sm">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto asperiores assumenda corporis ea eos ex inventore itaque magni nisi non numquam, praesentium quo, sit soluta tempora, tenetur velit voluptatem!
									</p>
								</div>
							</div>
						</div>
						
						<form id="chat-form" class="space-y-4">
							<div class="mt-4 flex">
								<input type="text" id="user-input" class="w-full border border-slate-200 rounded-3xl px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="Type your query" required />
								<button type="submit" id="send-button" class="bg-transparent text-white rounded-xl px-3 py-1 ml-2 inline-flex justify-center items-center">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-black hover:text-blue-500 hover:drop-shadow-md transition-all duration-150">
										<path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		`;
        // Add the chat widget to the body
        const chatDiv = document.createElement("div");
        chatDiv.innerHTML = chatTemplate;
        document.body.appendChild(chatDiv);
        // Store bot information
        const botElement = document.createElement("p");
        botElement.innerHTML = BOT_ID;
        botElement.id = "botiq_id";
        botElement.hidden = true;
        document.body.appendChild(botElement);
        // Greet the user when the page is loaded
        // document.getElementById("welcome-message").innerText = `Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!`;
        (0, ($parcel$interopDefault($hzDL5$animejs)))({
            targets: ".welcome-wrapper",
            translateY: [
                -30,
                0
            ],
            opacity: [
                0,
                1
            ],
            duration: 1500,
            update: ()=>{
                // let options = {
                // 	strings: ["Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!"],
                // 	typeSpeed: 6,
                // 	showCursor: false,
                // };
                //
                // let welcomeMessage = new Typed("#welcome-message", options);
                //
                // welcomeMessage.start();
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#welcome-message").text(`Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!`);
            }
        });
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-verification").removeClass("hidden");
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-conversation").hide();
        (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-form").hide();
        (0, ($parcel$interopDefault($hzDL5$animejs)))({
            targets: "#email-verification",
            translateY: [
                -10,
                0
            ],
            opacity: [
                0,
                1
            ]
        });
    }
    // CHAT FORM
    const chatLib = {};
    chatLib.initChatiQ = function(botId = "", baseUrl = "") {
        BASE_URL = baseUrl;
        BOT_ID = botId;
        let formData = new FormData();
        formData.append("bot_id", BOT_ID);
        formData.append("whitelisted_domain", window.location.origin);
        fetch(BASE_URL + "/api/v1/init/", {
            method: "POST",
            body: formData
        }).then((response)=>{
            if (response.ok) return response.json();
            else throw new Error("Something went wrong");
        }).then((data)=>{
            console.log(data);
            initSuccess = true;
            const { brand_name: brand_name, logo: logo, welcome_message: welcome_message } = data.bot_branding;
            setupChatWidget(brand_name, logo, welcome_message);
            (0, ($parcel$interopDefault($hzDL5$jquery)))("#toggle-chatbot-button").click(function() {
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#chatbot-form").toggle();
            });
            (0, ($parcel$interopDefault($hzDL5$jquery)))("#close-start-conversation").click(function() {
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#chatbot-form").hide();
            });
            (0, ($parcel$interopDefault($hzDL5$jquery)))(".post-logo-wrapper").hide();
            (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-loading-btn").hide();
            (0, ($parcel$interopDefault($hzDL5$jquery)))(".error-message").hide();
            (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-form").submit(function(e) {
                e.preventDefault();
                const userMessage = (0, ($parcel$interopDefault($hzDL5$jquery)))("#user-input").val();
                // 	scroll to bottom
                // $('#chat-conversation').animate({
                // 	scrollTop: $('#chat-conversation').get(0).scrollHeight
                // }, 500);
                addMessage(userMessage, true);
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#user-input").val("");
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#conversations-wrapper").append(loader);
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#send-button").prop("disabled", true);
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#send-button").addClass("cursor-not-allowed");
                query(userMessage).then((response)=>{
                    addMessage(response.response, false);
                    (0, ($parcel$interopDefault($hzDL5$jquery)))(".isLoading").remove();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#send-button").prop("disabled", false);
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#send-button").removeClass("cursor-not-allowed");
                }).catch((error)=>{
                    console.log(error);
                });
            });
            function query(userMessage) {
                return fetch(BASE_URL + "/api/v1/query/", {
                    method: "POST",
                    body: JSON.stringify({
                        "customer_email": email,
                        "bot_id": BOT_ID,
                        "query": userMessage
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response)=>{
                    if (response.ok) return response.json();
                    else throw new Error("Something went wrong");
                });
            }
            (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-verification-form").submit(function(e) {
                e.preventDefault();
                const customerName = (0, ($parcel$interopDefault($hzDL5$jquery)))("#customer_name").val();
                const customerEmail = (0, ($parcel$interopDefault($hzDL5$jquery)))("#email").val();
                name = customerName;
                email = customerEmail;
                let formData = new FormData();
                formData.append("name", customerName);
                formData.append("email", customerEmail);
                formData.append("bot_id", BOT_ID);
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-submit-btn").hide();
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-loading-btn").show();
                fetch(BASE_URL + "/api/v1/bot-get-or-create/", {
                    method: "POST",
                    body: formData
                }).then((response)=>{
                    if (response.ok) return response.json();
                    else throw new Error("Something went wrong");
                }).then((data)=>{
                    showLogoHeader();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-verification").hide();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-conversation").show();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-form").slideDown();
                    name = customerName;
                    email = customerEmail;
                    // addGreetingMessage("Hello there! How can I help you today?");
                    chatHistory = data.chat_history;
                    if (chatHistory.length > 0) {
                        chatHistory.forEach((chat)=>{
                            if (chat.type === "iq") addMessage(chat.message, false);
                            else addMessage(chat.message, true);
                        });
                        (0, ($parcel$interopDefault($hzDL5$jquery)))("#conversations-wrapper").append(`
                                    <div class="relative">
                                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div class="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div class="relative flex justify-center">
                                            <span class="bg-white px-2 text-sm text-gray-500">Continue</span>
                                        </div>
                                    </div>
                                `);
                        addGreetingMessage(`${welcome_message ? welcome_message : "Hello there! How can I help you today?"}`);
                    } else addGreetingMessage(`${welcome_message ? welcome_message : "Hello there! How can I help you today?"}`);
                }).catch((error)=>{
                    console.error(error);
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-submit-btn").show();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))("#email-loading-btn").hide();
                    (0, ($parcel$interopDefault($hzDL5$jquery)))(".error-message").show();
                });
                console.log(customerName, customerEmail);
            // hide the email form and show the chat conversation area
            });
            function addGreetingMessage(greetingMessage) {
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#conversations-wrapper").append(`
                            <div class="self-end inline-flex space-x-1 items-center justify-end" style="max-width: 75%;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-500 flex-none">
                                  <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                                </svg>
                                <div class="bg-green-500 text-green-100 text-sm shadow px-3 py-3 rounded-md">
                                    <p>${greetingMessage}</p>
                                </div>
                            </div>
                        `);
            }
            function addMessage(message, isUser = false) {
                let $message = null;
                if (isUser) $message = (0, ($parcel$interopDefault($hzDL5$jquery)))(`
                            <div class="message self-start inline-flex space-x-1 items-center justify-end" style="max-width: 75%;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-400 flex-none drop-shadow-lg">
                                  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                                </svg>
            
                                <div class="bg-blue-400 text-blue-100 text-sm shadow px-3 py-3 rounded-md">
                                    <p>${message}</p>
                                </div>
                            </div>
                        `);
                else $message = (0, ($parcel$interopDefault($hzDL5$jquery)))(`
                            <div class="message self-end inline-flex space-x-1 items-center justify-end" style="max-width: 75%;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-500 flex-none drop-shadow-lg">
                                    <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                                </svg>
                                <div class="bg-green-500 text-green-100 text-sm shadow px-3 py-3 rounded-md">
                                    <p>${message}</p>
                                </div>
                            </div>
                        `);
                (0, ($parcel$interopDefault($hzDL5$jquery)))("#conversations-wrapper").append($message);
                // Animate the message using anime.js
                (0, ($parcel$interopDefault($hzDL5$animejs)))({
                    targets: $message[0],
                    translateY: [
                        -10,
                        0
                    ],
                    // opacity: [0, 1],
                    duration: 300,
                    easing: "easeOutQuad",
                    complete: ()=>{
                        // Scroll to the bottom of the container after the animation is complete
                        const $chatConversation = (0, ($parcel$interopDefault($hzDL5$jquery)))("#chat-conversation");
                        $chatConversation.animate({
                            scrollTop: $chatConversation.get(0).scrollHeight
                        }, 500);
                    }
                });
            }
        });
    };
    window.chatLib = chatLib;
});


//# sourceMappingURL=chatiq-applet.js.map
