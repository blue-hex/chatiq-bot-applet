// simple-chat.js

// Function to initialize the chat UI and event handlers
export function initChat() {
    // Your HTML template
    const chatTemplate = `
    <section class="msger">
    <header class="msger-header">
        <div class="msger-header-title">
            <i class="fas fa-comment-alt"></i> SimpleChat
        </div>
        <div class="msger-header-options">
            <span><i class="fas fa-cog"></i></span>
        </div>
    </header>

    <main class="msger-chat">
        <div class="msg left-msg">
            <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)">
            </div>

            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">BOT</div>
                    <div class="msg-info-time">12:45</div>
                </div>

                <div class="msg-text">
                    Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                </div>
            </div>
        </div>

        <div class="msg right-msg">
            <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)">
            </div>

            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">Sajad</div>
                    <div class="msg-info-time">12:46</div>
                </div>

                <div class="msg-text">
                    You can change your name in JS section!
                </div>
            </div>
        </div>
    </main>

    <form class="msger-inputarea">
        <input type="text" class="msger-input" placeholder="Enter your message...">
        <button type="submit" class="msger-send-btn">Send</button>
    </form>
</section>
    `;

    // Create a div element to hold the chat UI
    const chatDiv = document.createElement('div');
    chatDiv.innerHTML = chatTemplate;

    // Attach the chat UI to the document body
    document.body.appendChild(chatDiv);

    // Add event listeners and logic here
    // For example, handle form submission and display user messages
    const form = document.querySelector('.msger-inputarea');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.querySelector('.msger-input');
        const message = input.value;
        displayUserMessage(message);
        input.value = '';
        // Call a function to generate a response and display it
        // generateBotResponse(message);
    });
}

// Function to display a user message in the chat
function displayUserMessage(message) {
    const chat = document.querySelector('.msger-chat');
    const userMsg = `
    <div class="msg right-msg">
    <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)">
    </div>

    <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-info-name">Sajad</div>
            <div class="msg-info-time">12:46</div>
        </div>

        <div class="msg-text">
            You can change your name in JS section!
        </div>
    </div>
</div>
    `;
    const userMsgDiv = document.createElement('div');
    userMsgDiv.innerHTML = userMsg;
    chat.appendChild(userMsgDiv);
}

// Function to generate and display a bot response
function generateBotResponse(userMessage) {
    const chat = document.querySelector('.msger-chat');
    const botMsg = `
    <div class="msg left-msg">
    <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)">
    </div>

    <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-info-name">BOT</div>
            <div class="msg-info-time">12:45</div>
        </div>

        <div class="msg-text">
            Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
        </div>
    </div>
</div>
    `;
    const botMsgDiv = document.createElement('div');
    botMsgDiv.innerHTML = botMsg;
    chat.appendChild(botMsgDiv);
}

