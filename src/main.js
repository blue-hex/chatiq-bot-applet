const chatbotButton = `
    <button id="toggle-chatbot-button" style="border: 0; background: transparent;" class="fixed bottom-10 right-10 active:scale-95">
        <img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full">
    </button>
`;

const chatWrapper = `
    <div class="fixed bg-white rounded-lg shadow-xl border border-slate-100 bottom-16 right-16 px-0 py-0" style="width: 440px; height: 390px;">
        <header class="flex w-full items-center justify-between px-3 py-3 border-b border-slate-100 bg-slate-50">
            <h3 class="text-xl">Chat iQ</h3>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </header>

        <div id="chabot-wrapper-body"></div>
    </div>
`

const chatEmailVerification = `
    <div id="email-verification" class="mx-0 my-1 px-3 py-3">

        <div class="px-0 py-0 welcome-wrapper">
            <p class="mb-3 font-normal text-black text-xs" id="welcome-message">
                Please enter your name and email to continue. This helps me remember if we've had a conversation before.
            </p>									
        </div>	

        <form id="email-verification-form" class="">
            <div class="flex flex-col space-y-1.5">
                <div class="error-message block mb-3">
                    <p class="text-red-500 text-xs">Oops, something went wrong, please try again.</p>
                </div>
            
                <input type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="John Doe" />
                
                <input type="email" name="email" id="email" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="john.doe@acme.org" />
                
                <button id="email-submit-btn" type="submit" class="bg-black hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2">Continue</button>
                
                <button id="email-loading-btn" type="button" disabled class="bg-black hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2 flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>
            </div>
        </form>
    </div>
`

const iQChatbot = `
    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="">
        <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10">
            <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="active:scale-95">
                <img :src="botBranding.logo ? botBranding.logo : 'https://iqsuite.io/assets/iq.png'" class="w-12 h-12 rounded-full">
            </button>
        </div>

        <div class="fixed bottom-16 right-16 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden" style="width: 510px;" x-show="showChatbotMainScreen" x-transition>
            <header class="px-3 py-3 bg-slate-50 border-b border-slate-50">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl" x-text="botBranding.name"></h3>
                    <img :src="botBranding.logo" class="w-9 h-9" />
                </div>
            </header>

            <main class="flex flex-col h-full border-t border-slate-100 px-3 py-3 overflow-hidden">
                <div x-show="showEmailVerification">

                    <p class="text-left mb-3 font-normal text-black text-xs" id="welcome-message">
                        Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!
                    </p>

                    <form id="email-verification-form" class="" x-on:submit="handleEmailVerificationSubmit">
                        <div class="flex flex-col space-y-1.5">
                            <div class="error-message block mb-3" x-show="isErrored">
                                <p class="text-red-500 text-xs text-left">Oops, something went wrong, please try again.</p>
                            </div>
                        
                            <input x-model="name" type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="John Doe" />
                            <input x-model="email" type="email" name="email" id="email" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="john.doe@acme.org" />
                            
                            <button id="email-submit-btn" :disabled="isLoading" type="submit" class="bg-black text-center hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2">
                                <span x-show="!isLoading">Continue</span>
                                <svg x-show="isLoading" class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>


                <div x-show="showChatScreen" class="">
                    <div class="flex-none flex flex-col h-full space-y-4 px-3 py-3 max-w-lg mx-auto rounded-lg mt-0 mb-0 overflow-y-auto w-full" style="overflow-y: auto; max-height: 50vh;" x-ref="messagesContainer">
                        <!-- AI Message -->
                        <template x-for="message in chatHistory">
                            <div class="flex flex-col">
                                <div x-show="message.type == 'iq'" class="block mr-auto shadow px-3 py-2 rounded-md" style="max-width: 75%; background-color: #DFFFEA;">
                                    <div x-html="message.message" class="text-sm font-sans text-green-900 iq-message-wrapper"></div>
                                </div>

                                <div x-show="message.type == 'user'" class="block ml-auto bg-gray-500 shadow px-3 py-2 rounded-md chat-message-user" style="max-width: 75%; background-color: #E9F3FF;">
                                    <span x-text="message.message" class="text-sm font-sans"></span>
                                </div>

                                <div class="relative" x-show="message.type == 'divider'">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div class="relative flex justify-center">
                                        <span class="bg-white px-2 text-sm text-gray-500">Continue</span>
                                    </div>
                                </div>

                            </div>
                        </template>
                    </div>
                    
                    <form id="chat-form" class="space-y-4 mt-auto" x-on:submit="handleChatbotFormSubmit">
                        <div class="mt-4 flex">
                            <input x-model="message" type="text" id="user-input" class="w-full border border-slate-200 rounded-3xl px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="Type your query" required />
                            
                            <button :disabled="isLoading" type="submit" id="send-button" class="bg-transparent text-white rounded-xl px-3 py-1 ml-2 inline-flex justify-center items-center disabled:text-gray-400 disabled:cursor-not-allowed">
                                <svg x-show="!isLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-black hover:text-blue-500 hover:drop-shadow-md transition-all duration-150">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                                
                                <div class="isLoading loader self-start" x-show="isLoading"></div>
                            </button>
                        </div>
                    </form>
                </div>

                <a href="https://iqsuite.io" target="_blank" class="text-xs my-3 text-center text-gray-300">&copy; <span x-text="currentYear"></span> | Powered by iQ Suite</a>
            </main>
        </div>
    </div>
`

// Setting up the preflight
class ChatLib {
    constructor(bot_id, base_url, ws_url) {
        this.bot_id = bot_id;
        this.base_url = base_url;
        this.ws_url = ws_url;

        localStorage.setItem('bot_id', bot_id);
        localStorage.setItem('base_url', base_url);
        localStorage.setItem('ws_url', ws_url);
    }
}
// ----------------------------
window.ChatLib = ChatLib;

document.body.insertAdjacentHTML('beforeend', iQChatbot);

function chatiQApplet() {
    return {
        count: 0,
        showChatBotToggleButton: false,
        emailVerified: false,
        chatHistory: [],
        showEmailVerification: false,
        showChatScreen: false,
        showChatbotMainScreen: false,
        isErrored: false,
        isLoading: false,
        base_url: localStorage.getItem('base_url'),
        ws_url: localStorage.getItem('ws_url'),
        bot_id: localStorage.getItem('bot_id'),
        welcome_message: "",
        
        name: "",
        email: "",
        message: "",

        ongoingStream: null,
        ws: null,
        
        botBranding: {
            name: 'Chat iQ',
            logo: 'https://iqsuite.io/assets/iq.png',
        },

        currentYear: new Date().getFullYear(),

        initChatbot: function() {
            let base_url = localStorage.getItem('base_url');
            let bot_id = localStorage.getItem('bot_id');

            fetch(base_url + '/api/v1/init/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bot_id: bot_id, whitelisted_domain: window.location.origin }),
            }).then(response => response.ok ? response.json() : Promise.reject(response))
            .then(r => {
                this.showChatBotToggleButton = true;
                this.showChatbotMainScreen = true;
                
                // NOTE change this 
                this.showChatScreen = false;
                this.showEmailVerification = true;

                this.botBranding.name = r.bot_branding.brand_name;
                this.botBranding.welcome_message = r.bot_branding.welcome_message;

                if ( r.bot_branding.logo ) {
                    this.botBranding.logo = this.base_url + r.bot_branding.logo;
                }

                this.welcome_message = r.bot_branding.welcome_message;
            })

        },

        toggleChatbotButton: function() {
            this.showChatbotMainScreen = !this.showChatbotMainScreen;
        },

        handleEmailVerificationSubmit: function(e) {
            e.preventDefault();

            this.isLoading = true;

            fetch(this.base_url + '/api/v1/bot-get-or-create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: this.email,
                    name: this.name,
                    bot_id: this.bot_id,
                }),
            })
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(r => {
                this.emailVerified = true;
                this.showEmailVerification = false;

                this.showChatScreen = true;

                this.chatHistory = r.chat_history;

                if (r.chat_history.length > 0) {
                    this.chatHistory.push({
                        type: 'divider',
                        message: ""
                    })

                    // loop through the chat history and parse the markdown
                    this.chatHistory.forEach(ch => {
                        if (ch.type == 'iq') {
                            ch.message = marked.parse(ch.message);
                        }
                    })
                }

                this.isLoading = false;

                this.setupWebsocket();

                this.chatHistory.push({
                    type: 'iq',
                    message: this.welcome_message,
                    tag: 'welcome_message'
                })

                setTimeout(() => {
                    this.scrollToBottom();
                }, 200);
            })
            .catch(error => {
                console.error(error);
                this.isLoading = false;
                this.isErrored = true;
            })

        },

        setupWebsocket: function() {
            this.ws = new WebSocket(this.ws_url + `${this.bot_id}/${this.email}/applet/`);

            this.ws.onopen = () => {
                // this.reconnectAttempt = 0;
                console.log('Websocket connected');
            }

            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if ( data.event === 'on_chat_model_start' ) {
                    
                    this.ongoingStream = { id: data.run_id, }

                    this.chatHistory.push({
                        type: 'iq',
                        id: data.run_id,
                        message: "",
                    })

                } else if ( data.event === 'on_chat_model_stream' && this.ongoingStream && data.run_id == this.ongoingStream.id ) {

                    // get the message with stream_id
                    let chObject = this.chatHistory.find(ch => ch.id == data.run_id);

                    if (data.message !== "" || data.message !== null || data.message !== undefined) {
                        // strip whitespaces in the beginning and end
                        chObject.message += data.message;
                    }
                } else if ( data.event === 'on_parser_end' && this.ongoingStream && data.run_id == this.ongoingStream.id ) {
                    console.log("Parser end event");
                    
                    this.scrollToBottom();
                    this.ongoingStream = null;

                    // Get the last item of chatHistory
                    let chObject = this.chatHistory[this.chatHistory.length - 1];

                    chObject.message = marked.parse(chObject.message);
                }

                this.$nextTick(() => {
                    this.scrollToBottom();
                })
    
                // this.chatHistory.push({
                //     type: 'iq',
                //     message: message,
                // })
            }

            this.ws.onerror = (event) => {
                console.error("WebSocket error observed:", event);
            };

            this.ws.onclose = (event) => {
                console.log(`WebSocket is closed now. Code: ${event.code}, Reason: ${event.reason}`);
            };
        },

        handleChatbotFormSubmit: function(e) {
            e.preventDefault();

            // fetch(this.base_url + '/api/v1/query/', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ 
            //         query: this.message,
            //         bot_id: this.bot_id,
            //         customer_email: this.email, // NOTE change this
            //     }),
            // })
            // .then(response => response.ok ? response.json() : Promise.reject(response))
            // .then(r => {
            //     this.chatHistory.push({
            //         type: 'ai',
            //         message: r.response
            //     })
            // })

            this.chatHistory.push({
                type: 'user',
                message: this.message
            })

            this.isLoading = true;

            this.ws.send(JSON.stringify({ message: this.message }))

            this.message = null;

            this.isLoading = false;

            // this.setupWebsocket();
        },

        scrollToBottom: function() {
            console.log("Scrolling")
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
        }

    }
}

window.chatiQApplet = chatiQApplet;