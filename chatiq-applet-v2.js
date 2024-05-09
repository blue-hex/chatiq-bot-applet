import './styles.css';
import $ from "jquery";
import anime from "animejs";
import Typed from 'typed.js';

$(function() {

	let BASE_URL = "";
	let BOT_ID = "";

	let chatHistory = [];

	let name = "";
	let email = "";

	setupChatWidget();
	//
	$('.post-logo-wrapper').hide();

	$('#email-loading-btn').hide();

	$('.error-message').hide();

	function showLogoHeader() {
		$('.pre-logo-wrapper').hide();
		$('#welcome-message').hide();
		$('.post-logo-wrapper').show();

		anime({
			targets: '.post-logo-wrapper',
			translateY: [-10, 0],
			// translateX: [-100, 0],
			opacity: [0, 1],
			duration: 600,
			// easing: 'easeInOutSine',
		})
	}

	function setupChatWidget() {
		const chatTemplate = `
			<div class="fixed bottom-4 right-4">
				<button id="toggle-chatbot-button" style="border: 0; background: transparent;">
					<img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full">
				</button>
				
				<div class="max-w-md mx-auto p-4">
					<div id="chatbot-form" class="flex flex-col w-96 absolute bottom-16 right-4 p-4 rounded-3xl shadow-lg border border-slate-200 bg-white" style="max-height: 50vh;">
						
						<div class="flex items-center justify-end w-full"  id="close-start-conversation">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="6 h-6">
								<path fill-rule="evenodd"
									d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
									clip-rule="evenodd" />
							</svg>
						</div>
						
						<div class="md:container md:mx-auto m-0" id="chat-mast">
							<div class="max-w-sm backdrop-blur-2xl rounded-lg">
								<div class="pre-logo-wrapper flex items-center justify-center space-x-2">
									<img class="inline-block" src="https://iqsuite.io/assets/iq.png" alt="" width="40px" id="logo" />
									<h1 class="text-2xl font-bold tracking-tight text-black">Chat iQ</h1>
								</div>
								
								<div class="post-logo-wrapper flex items-center space-x-2">
									<img class="inline-block" src="https://iqsuite.io/assets/iq.png" alt="" width="40px" id="logo" />
									<h1 class="text-2xl font-bold tracking-tight text-black">Chat iQ</h1>
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
						
							<div class="flex flex-col space-y-4 p-6 max-w-lg mx-auto rounded-lg mt-10 overflow-y-auto" style="max-height: 50vh;" id="conversations-wrapper">
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
								<input type="text" id="user-input" class="w-full border border-slate-200 rounded-3xl px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="Type your query" />
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

		anime({
			targets: '.welcome-wrapper',
			translateY: [-30, 0],
			opacity: [0, 1],
			duration: 1500,
			update: () => {
				// let options = {
				// 	strings: ["Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!"],
				// 	typeSpeed: 6,
				// 	showCursor: false,
				// };
				//
				// let welcomeMessage = new Typed("#welcome-message", options);
				//
				// welcomeMessage.start();

				$('#welcome-message').text(`Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!`);
			}
		})

		$('#email-verification').removeClass('hidden');

		$('#chat-conversation').hide();
		$('#chat-form').hide();

		anime({
			targets: '#email-verification',
			translateY: [-10, 0],
			opacity: [0, 1],
		})
	}

	$('#chat-form').submit(function(e) {
		e.preventDefault();

		const userMessage = $('#user-input').val();
		console.log(userMessage);

		// 	scroll to bottom
		// $('#chat-conversation').animate({
		// 	scrollTop: $('#chat-conversation').get(0).scrollHeight
		// }, 500);

		addMessage(userMessage, true);
	});

	$('#email-verification-form').submit(function(e) {
		e.preventDefault();

		const customerName = $('#customer_name').val();
		const customerEmail = $('#email').val();

		let formData = new FormData();
		formData.append('name', customerName);
		formData.append('email', customerEmail);
		formData.append('bot_id', BOT_ID);

		$('#email-submit-btn').hide();
		$('#email-loading-btn').show();

		fetch(BASE_URL + '/api/v1/bot-get-or-create/', { method: "POST", body: formData })
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Something went wrong');
				}
			})
			.then(data => {
				showLogoHeader();
				$('#email-verification').hide();
				$('#chat-conversation').show();
				$('#chat-form').slideDown();

				name = customerName;
				email = customerEmail;

				addGreetingMessage("Hello there! How can I help you today?");
				chatHistory = data.conversations;
			})
			.catch(error => {
				console.error(error);
				$('#email-submit-btn').show();
				$('#email-loading-btn').hide();
				$('.error-message').show();
			});

		console.log(customerName, customerEmail);

		// hide the email form and show the chat conversation area
	});

	function addGreetingMessage(greetingMessage) {
		$('#conversations-wrapper').append(
			`
				<div class="self-end inline-flex items-center bg-green-500 shadow justify-end px-3 py-2 rounded-md" style="max-width: 75%;">
					<p class="text-green-100 text-sm">
						${greetingMessage}
					</p>
				</div>
			`
		)
	}

	function addMessage(message, isUser = false) {
		const $message = $(`
			<div class="message self-${isUser ? 'start' : 'end'} inline-flex items-center bg-${isUser ? 'gray' : 'green'}-300 px-3 py-2 rounded-md max-w-1/2" style="max-width: 75%; opacity: 0;">
				<p class="text-${isUser ? 'gray-800' : 'green-100'} text-sm">
					${message}
				</p>
			</div>
		`);

		$('#conversations-wrapper').append($message);

		// Animate the message using anime.js
		anime({
			targets: $message[0],
			translateY: [-10, 0],
			opacity: [0, 1],
			duration: 300,
			easing: 'easeOutQuad',
			complete: () => {
				// Scroll to the bottom of the container after the animation is complete
				const $chatConversation = $('#chat-conversation');
				$chatConversation.animate({
					scrollTop: $chatConversation.get(0).scrollHeight
				}, 500);
			}
		});
	}

	const chatLib = {};

	chatLib.initChatiQ = function(botId = "", baseUrl = "") {
		BASE_URL = baseUrl;
		BOT_ID = botId;
	}

	window.chatLib = chatLib;
})