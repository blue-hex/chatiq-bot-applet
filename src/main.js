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
`;

const iQChatbot = `
    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="font-redhat">
      <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10" style="z-index: 999 !important;">
        <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="relative">
            <img :src="botBranding.logo ? botBranding.logo : 'https://iqsuite.io/assets/iq.png'" class="w-16 h-16 rounded-full shadow-xl">
            <!-- Green circle indicator for online status -->
            <span class="absolute bottom-0 right-1 block w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      </div>


        <div class="fixed bottom-16 right-16 bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden" style="width: 450px; z-index:9999;" x-show="showChatbotMainScreen" x-transition>
            <div class="flex flex-col justify-between">
              <header class="px-4 py-4 flex justify-between w-full items-center">
                  <div class="flex items-center gap-3">
                    <div class="relative">
                      <img :src="botBranding.logo ? botBranding.logo : 'https://iqsuite.io/assets/iq.png'" class="w-14 h-14 shadow-sm rounded-full">
                      <!-- Green circle indicator for online status -->
                      <span class="absolute bottom-0 right-0 block w-3 h-3 bg-emerald-500 rounded-md border-2 border-white"></span>
                    </div>
                    <div>
                      <h4 class="text-xl font-medium font-redhat" x-text="botBranding.name"></h4>
                      <p class="font-light text-sm font-redhat">Gen AI-Powered Chatbot</p>
                    </div>
                  </div>
                  <button type="button" @click="showChatbotMainScreen = false"> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </header>
                <main class="flex flex-col overflow-hidden">
                  <div x-show="showEmailVerification" class="p-4 flex flex-col justify-between">
                       <div>
                         <p class="text-left my-2 text-black font-redhat font-medium text-3xl" id="welcome-message">
                            👋🏼 Welcome <br/> We're happy to assist you.
                        </p>
                        <p class="text-neutral-600 text-lg font-light my-4 font-redhat"> To personalize your experience and ensure we can connect you with the most relevant information, could you please share a few details. </p>
                       </div>
    
                        <form id="email-verification-form" x-on:submit="handleEmailVerificationSubmit">
                            <div class="flex flex-col space-y-2 mt-16">
                                <div class="error-message block mb-3" x-show="isErrored">
                                    <p class="text-red-500 text-xs text-left">Oops, something went wrong, please try again.</p>
                                </div>
                            
                                <input x-model="name" type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full font-redhat border px-3 py-3 bg-neutral-50 text-base focus:outline-none font-normal" placeholder="Full Name" />
                                <input x-model="email" type="email" name="email" id="email" required class="w-full border font-redhat px-3 py-3 text-base focus:outline-none bg-neutral-50 font-normal" placeholder="E-Mail Address" />
                                
                                <button id="email-submit-btn" :disabled="isLoading" type="submit" class="bg-black text-center text-white py-3 px-8 font-redhat font-medium rounded-md text-base hover:bg-neutral-950 transition duration-300 ease-in bt-wid my-2">
                                    <span x-show="!isLoading">Continue</span>
                                    <svg x-show="isLoading" class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </button>
                                <p class="text-center text-xs font-redhat inline-flex justify-center items-center font-light mt-4 gap-1 mb-2"> Powered By <a href="https://chat.iqsuite.io/" style="text-decoration: none !important;" class="text-blue-950 inline-flex justify-center items-center gap-1 font-redhat" target="_blank" class="!no-underline"> Chat <img class="h-5 w-5" src="https://iqsuite.io/assets/iq.png"/></a></p>
                            </div>
                        </form>
                    </div>
    
                    <div x-show="showChatScreen" class="flex flex-col p-2 justify-between items-middle">
                        <div style="height: 28rem;" class="flex-none flex flex-col h-full space-y-2 max-w-lg mx-auto mt-0 mb-0 overflow-y-auto w-full" sty x-ref="messagesContainer">
                            <template x-for="message in chatHistory">
                                <div class="flex flex-col px-2.5 py-2">
                                  <!-- AI Message -->
                                   <div x-show="message.type == 'iq'">
                                        <div class="inline-flex flex-col justify-start items-start gap-2">
                                            <!-- Avatar for IQ message -->
                                            <img :src="botBranding.logo" class="w-8 h-8 rounded-full" />
                                            <div x-html="message.message" style="font-family: "Red Hat Display", sans-serif !important; white-space: pre-wrap; word-wrap: break-word; text-align: start; overflow-wrap: break-word;" class="text-sm text-black bg-neutral-200 font-redhat font-light rounded-2xl p-3 iq-message-wrapper"></div>
                                        </div>
                                    </div>
    
                                     <!-- User Message -->
                                    <div x-show="message.type == 'user'" class="flex flex-row justify-end items-end gap-2">
                                        <div class="inline-flex flex-col justify-start items-end gap-2">
                                            <!-- Avatar for User message -->
                                            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                                <span class="text-blue-600 font-light text-sm uppercase" x-text="name.charAt(0)"></span>
                                            </div>
                                            <span x-text="message.message" class="text-sm text-white font-redhat bg-neutral-900 font-light rounded-2xl p-3"></span>
                                        </div>
                                    </div>
    
                                    <div class="relative" x-show="message.type == 'divider'">
                                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div class="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div class="relative flex justify-center">
                                            <span class="px-2 text-sm bg-white text-gray-300 font-redhat">Today</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        
                        <form id="chat-form" x-on:submit="handleChatbotFormSubmit" class="relative">
                         <div class="my-2 inline-flex justify-center items-center align-center w-full relative">
                            <input x-model="message"  
                                 required="" id="user-input" 
                                 type="text" 
                                 class="w-full font-redhat border border-slate-200 rounded-md px-3 py-3 text-sm focus:outline-none font-normal pr-16 resize-none overflow-hidden" 
                                 placeholder="Ask your query here" />
                               
                                 <button :disabled="isLoading"
                                  type="submit" 
                                  id="send-button" 
                                  class="px-4 bg-transparent text-white rounded-r-md disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                                  <svg x-show="!isLoading" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="currentColor" 
                                    class="w-8 h-8 text-black">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"></path>
                                  </svg>
                                  <div class="isLoading loader" x-show="isLoading" style="display: none;"></div>
                                </button>
                          </div>
                        
                          <div class="flex justify-center items-center">
                             <p class="text-center text-xs inline-flex font-redhat justify-center items-center font-light mt-4 gap-1 mb-2"> Powered By <a href="https://chat.iqsuite.io/" style="text-decoration: none !important;" class="text-blue-950 inline-flex justify-center items-center gap-1 font-redhat" target="_blank" class="!no-underline"> Chat <img class="h-5 w-5" src="https://iqsuite.io/assets/iq.png"/></a></p>
                          </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    </div>
`;

// Setting up the preflight
class ChatLib {
  constructor(bot_id, base_url, ws_url) {
    this.bot_id = bot_id;
    this.base_url = base_url;
    this.ws_url = ws_url;

    localStorage.setItem("bot_id", bot_id);
    localStorage.setItem("base_url", base_url);
    localStorage.setItem("ws_url", ws_url);
  }
}
// ----------------------------
window.ChatLib = ChatLib;

document.body.insertAdjacentHTML("beforeend", iQChatbot);

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
    base_url: localStorage.getItem("base_url"),
    ws_url: localStorage.getItem("ws_url"),
    bot_id: localStorage.getItem("bot_id"),
    welcome_message:
      "👋🏼 Hey There! What can I help you with today. I am a Gen AI powered chatbot trained to help customers with their queries.",

    name: "",
    email: "",
    message: "",
    theme_hex: "ffffff",

    ongoingStream: null,
    ws: null,

    botBranding: {
      name: "Chat iQ",
      logo: "https://iqsuite.io/assets/iq.png",
    },

    currentYear: new Date().getFullYear(),

    initChatbot: function () {
      let base_url = localStorage.getItem("base_url");
      let bot_id = localStorage.getItem("bot_id");
      console.log(this.name);

      fetch(base_url + "/api/v1/init/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bot_id: bot_id,
          whitelisted_domain: window.location.origin,
        }),
      })
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((r) => {
          this.showChatBotToggleButton = true;
          this.showChatbotMainScreen = true;

          // NOTE change this
          this.showChatScreen = false;
          this.showEmailVerification = true;

          this.botBranding.name = r.bot_branding.brand_name;
          this.botBranding.welcome_message = r.bot_branding.welcome_message;

          if (r.bot_branding.theme_hex !== null) {
            this.theme_hex = r.bot_branding.theme_hex;
          }

          if (r.bot_branding.logo) {
            this.botBranding.logo = this.base_url + r.bot_branding.logo;
          }

          this.welcome_message = r.bot_branding.welcome_message;
        });
    },

    toggleChatbotButton: function () {
      this.showChatbotMainScreen = !this.showChatbotMainScreen;
    },

    handleEmailVerificationSubmit: function (e) {
      e.preventDefault();

      this.isLoading = true;

      fetch(this.base_url + "/api/v1/bot-get-or-create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          name: this.name,
          bot_id: this.bot_id,
        }),
      })
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((r) => {
          this.emailVerified = true;
          this.showEmailVerification = false;

          this.showChatScreen = true;

          this.chatHistory = r.chat_history;

          if (r.chat_history.length > 0) {
            this.chatHistory.push({
              type: "divider",
              message: "",
            });

            // loop through the chat history and parse the markdown
            this.chatHistory.forEach((ch) => {
              if (ch.type == "iq") {
                ch.message = marked.parse(ch.message);
              }
            });
          }

          this.isLoading = false;

          this.setupWebsocket();

          this.chatHistory.push({
            type: "iq",
            message: this.welcome_message,
            tag: "welcome_message",
          });

          setTimeout(() => {
            this.scrollToBottom();
          }, 200);
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.isErrored = true;
        });
    },

    setupWebsocket: function () {
      this.ws = new WebSocket(
        this.ws_url + `${this.bot_id}/${this.email}/applet/`
      );

      this.ws.onopen = () => {
        // this.reconnectAttempt = 0;
        console.log("Websocket connected");
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.event === "on_chat_model_start") {
          this.ongoingStream = { id: data.run_id };

          this.chatHistory.push({
            type: "iq",
            id: data.run_id,
            message: "",
          });
        } else if (
          data.event === "on_chat_model_stream" &&
          this.ongoingStream &&
          data.run_id == this.ongoingStream.id
        ) {
          // get the message with stream_id
          let chObject = this.chatHistory.find((ch) => ch.id == data.run_id);

          if (
            data.message !== "" ||
            data.message !== null ||
            data.message !== undefined
          ) {
            // strip whitespaces in the beginning and end
            chObject.message += data.message;
          }
        } else if (
          data.event === "on_parser_end" &&
          this.ongoingStream &&
          data.run_id == this.ongoingStream.id
        ) {
          console.log("Parser end event");

          this.scrollToBottom();
          this.ongoingStream = null;

          // Get the last item of chatHistory
          let chObject = this.chatHistory[this.chatHistory.length - 1];

          chObject.message = marked.parse(chObject.message);
        }

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      };

      this.ws.onerror = (event) => {
        console.error("WebSocket error observed:", event);
      };

      this.ws.onclose = (event) => {
        console.log(
          `WebSocket is closed now. Code: ${event.code}, Reason: ${event.reason}`
        );
      };
    },

    handleChatbotFormSubmit: function (e) {
      e.preventDefault();
      this.chatHistory.push({
        type: "user",
        message: this.message,
      });

      this.isLoading = true;
      this.ws.send(JSON.stringify({ message: this.message }));
      this.message = null;
      this.isLoading = false;
    },

    scrollToBottom: function () {
      console.log("Scrolling");
      this.$refs.messagesContainer.scrollTop =
        this.$refs.messagesContainer.scrollHeight;
    },
  };
}

window.chatiQApplet = chatiQApplet;
