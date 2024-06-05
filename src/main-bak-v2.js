// Create a class ChatLib which can be invoked from script tag
import anime from "animejs";

class ChatLib {
    constructor(bot_id, base_url, ws_url) {
        this.BOT_ID = bot_id;
        this.BASE_URL = base_url;
        this.WS_URL = ws_url;

        document.body.insertAdjacentHTML('beforeend', this.chatbotButtonHTML);

        this.chatbotButton = document.querySelector('#open-chatbot');

        this.chatbotButton.addEventListener('click', this.toggleChatbot.bind(this));
    }

    chatbotButtonHTML = `
        <button id="open-chatbot" class="iq-chatbot-button">Chat iQ</button>
    `

    emailVerificationWrapper = `
        <div class="email-verification-wrapper">
            <div class="flex items-center justify-between">
                <h2>Let's get to know!</h2>
                <button id="close-email-verification">Close</button>
            </div>
            
            <div class="email-verification-body">
                <p>Please enter your name: </p>
                <input type="text" placeholder="Enter your name" />
            
                <p>Please enter your email: </p>
                <input type="email" placeholder="Enter your email address" />
                <button>Submit</button>
            </div>
        </div>
    `

    contentWrapper = `
        <div class="content-wrapper fixed bottom-0 right-0 w-56 h-4 p-12"></div>
    `

    chatbotWrapper = `
        <div class="chatbot-wrapper">
            <div class="chatbot-header">
                <h2>Chat iQ</h2>
                <button id="close-chatbot">Close</button>
            </div>
            
            <div class="chatbot-body">
                <div class="chatbot-messages">
                    <div class="chatbot-message">
                        <p>Hi! I'm Chat iQ, your friendly chatbot. How can I help you today?</p>
                    </div>
                </div>
            </div>
            
            <div class="chatbot-input">
                <input type="text" placeholder="Type your message here..." />
                <button>Send</button>
            </div>
        </div>
    `;


    init() {
        // Init the bot
        this.preflight().then(r => {
            // append the chatbot wrapper to the body
            document.body.insertAdjacentHTML('beforeend', this.contentWrapper);
            // insert the chatbot wrapper into content wrapper
            this.contentWrapperElement = document.querySelector('.content-wrapper');
            this.contentWrapperElement.insertAdjacentHTML('beforeend', this.emailVerificationWrapper);
        });
    }

    toggleChatbot() {
        this.chatbotWrapperElement.classList.toggle('hidden');
    }


    // Function to init bot
    async preflight() {

        let formData = new FormData();
        formData.append('bot_id', this.BOT_ID);
        formData.append('whitelisted_domain', window.location.origin);

        return fetch(`${this.BASE_URL}/api/v1/init/`, {method: 'POST', body: formData})
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(data => {
                // console.log(data);
                return data;
            });
    }
}

// Export the class to the window
window.ChatLib = ChatLib;

// Templates

// Init chatbot function


/*
 * This function is responsible for initializing the chatbot.
 * Strategy:
 * Init the chatbot to check with server if the bot can be initialized.
 * If the server responds with a success, then the chatbot is initialized.
 * If the server responds with a failure, then the chatbot is not initialized.
 * Show the email and name form to the user.
 * The user can fill in the form and click on the submit button.
 * Once done, the chatbot's history will be retrieved from the server.
 * Allow the customer to chat with the bot.
 */

// Export the library to the window
