const iQChatbot = `
    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="font-redhat">
      <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10" style="z-index: 999 !important;">
        <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="relative">
            <img :src="botBranding.logo ? botBranding.logo : 'https://iqsuite.io/assets/iq.png'" class="w-16 h-16 rounded-full shadow-xl">
            <!-- Green circle indicator for online status -->
            <span class="absolute bottom-0 right-1 block w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      </div>


        <div class="fixed bottom-10 h-fill-available w-fill-available sm:h-[36rem] overflow-y-auto md:h-4/5 max-w-md w-[28rem] sm:w-[40rem] right-0 sm:right-10 bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden" style="z-index:9999;" x-show="showChatbotMainScreen" x-transition>
            <div style="display: flex; height: 100%; flex-direction: column;" id="first-screen-layout">

              <!-- Header For Branding And Logo -->
              <header class="px-3 py-2 flex justify-between w-full items-center border-b border-neutral-100">
                  <div class="flex items-center gap-2">
                    <div class="relative">
                      <img :src="botBranding.logo ? botBranding.logo : 'https://iqsuite.io/assets/iq.png'" class="w-14 h-14 shadow-sm rounded-full">
                      <!-- Green circle indicator for online status -->
                      <span class="absolute bottom-0 right-0 block w-3 h-3 bg-emerald-500 rounded-md border-2 border-white"></span>
                    </div>
                    <div>
                      <h4 class="text-base font-medium font-redhat" x-text="botBranding.name"></h4>
                      <p class="font-light text-xs font-redhat">Gen-AI Powered Chatbot</p>
                    </div>
                  </div>

                  <div class="inline-flex justify-center items-center gap-2"> 
                    <div class="inline-flex justify-center items-center gap-2" x-data="{ disable_sound: JSON.parse(localStorage.getItem('isSoundDisabled')) ?? false }">
                        <!-- Button to enable sound -->
                        <button type="button" @click="disable_sound = false; enableSound(); $nextTick(() => $el.style.transform = 'translateY(0)');">
                          <svg x-show="disable_sound" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                          </svg>
                        </button>
                        <!-- Button to disable sound -->
                        <button type="button" @click="disable_sound = true; disableSound(); $nextTick(() => $el.style.transform = 'translateY(0)');">
                          <svg x-show="!disable_sound" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                          </svg>
                        </button>
                    </div>
                    <button type="button" @click="showChatbotMainScreen = false"> 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </header>
                <!-- Closing Header For Branding And Logo -->

                <!-- Body Content And Description -->
                <main id="body-ui" style="display: flex; height: 100%; flex-direction: row;">
                    <div x-show="showEmailVerification" class="px-3 py-2 flex flex-col justify-between">
                       <div class="py-4">
                          <p class="text-left my-2 text-black font-redhat font-medium text-3xl" id="welcome-message">
                             👋🏼 Welcome <br/> We're happy to assist you.
                          </p>
                          <p class="text-neutral-600 text-lg font-light my-4 font-redhat"> To personalize your experience and ensure we can connect you with the most relevant information, could you please share a few details. </p>
                       </div>

                        <!-- E-Mail Verification Form -->
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
                                <p class="text-center text-neutral-400 text-xs font-redhat inline-flex justify-center items-center font-light mt-4 gap-1 mb-2"> Powered By <a href="https://chat.iqsuite.io/" style="text-decoration: none !important;" class="text-neutral-400 inline-flex justify-center items-center gap-1 font-redhat" target="_blank" class="!no-underline"> Chat <img class="h-5 w-5" src="https://iqsuite.io/assets/iq.png"/></a></p>
                            </div>
                        </form>
                        <!-- Closing E-Mail Verification Form -->
                  </div>
                </main>
                <!-- Closing Body Content And Description -->

                <!-- Chat UI And Form -->
                <main id="chat-ui" class="flex flex-col h-full">
                  <div x-show="showChatScreen" class="flex flex-col p-2 justify-between items-middle h-full">
                    <!-- Messages Container -->
                    <div id="messages-container" class="flex-grow overflow-y-auto max-w-lg mx-auto w-full" x-ref="messagesContainer">
                      <template x-for="message in chatHistory">
                        <div class="flex flex-col px-2.5 py-2">
                          <!-- AI Message -->
                          <div x-show="message.type == 'iq'" class="flex flex-row justify-start items-start gap-2"
                               style="transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease-in; transform: translateY(100%); opacity: 0;"
                               x-init="$nextTick(() => { $el.style.transform = 'translateY(0)'; $el.style.opacity = '1'; })">
                            <div class="inline-flex flex-col justify-start items-start gap-2">
                              <!-- Avatar for IQ message -->
                              <div class="inline-flex justify-center items-center gap-2">
                                <img :src="botBranding.logo" class="w-8 h-8 rounded-full" />
                                <small class="font-redhat text-neutral-500 text-xs font-light" x-text="formatDate(message.created_at)"></small>
                              </div>
                              <div x-html="message.message"
                                   style="font-family: 'Red Hat Display', sans-serif !important; white-space: pre-wrap; word-wrap: break-word; text-align: start; overflow-wrap: break-word;"
                                   class="text-sm text-black bg-neutral-200 font-redhat font-light rounded-2xl p-3 iq-message-wrapper">
                              </div>
                            </div>
                          </div>

                          <!-- User Message -->
                          <div x-show="message.type == 'user'" class="flex flex-row justify-end items-end gap-2"
                               style="transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.8s ease-in; transform: translateY(100%); opacity: 0;"
                               x-init="$nextTick(() => { $el.style.transform = 'translateY(0)'; $el.style.opacity = '1'; })">
                            <div class="inline-flex flex-col justify-start items-end gap-2">
                              <!-- Avatar for User message -->
                              <div class="inline-flex justify-center items-center gap-2">
                                <small class="font-redhat text-neutral-500 text-xs font-light" x-text="formatDate(message.created_at)"></small>
                                <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                                  <span class="text-blue-600 font-light text-sm uppercase" x-text="name.charAt(0)"></span>
                                </div>
                              </div>
                              <span x-text="message.message" class="text-sm max-w-xs text-white font-redhat bg-neutral-900 font-light rounded-2xl p-3"
                                    style="font-family: 'Red Hat Display', sans-serif !important; word-wrap: break-word; text-align: start; overflow-wrap: break-word;"></span>
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

                    <!-- Chat Form -->
                    <form id="chat-form" x-on:submit="handleChatbotFormSubmit" class="relative mt-4">
                      <div class="inline-flex justify-center items-center align-center w-full relative">
                        <input x-model="message" required="" id="user-input" type="text" style='margin-bottom: 0 !important;'
                               class="w-full font-redhat border border-slate-200 rounded-md px-3 py-3 text-sm focus:outline-none font-normal pr-16 resize-none overflow-hidden"
                               placeholder="Ask your query here" />
                        <button :disabled="isLoading" type="submit" id="send-button"
                                class="px-4 bg-transparent text-white rounded-r-md disabled:text-gray-400 disabled:cursor-not-allowed">
                          <svg x-show="!isLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                               class="w-8 h-8 text-black">
                            <path
                              d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"></path>
                          </svg>
                          <div class="isLoading loader" x-show="isLoading" style="display: none;"></div>
                        </button>
                      </div>
                      <div class="flex justify-center items-center gap-2 mt-2">
                        <button @click="clear_local_storage"
                                class="text-center text-xs font-redhat text-neutral-400 font-light mt-2 mb-2">Start New Conversation
                        </button>
                        <p class="text-center text-xs font-redhat text-neutral-400 font-light mt-2 mb-2">|</p>
                        <a href="https://chat.iqsuite.io/" target="_blank" style="text-decoration: none !important;"
                           class="text-center text-xs font-redhat text-neutral-400 font-light mt-2 mb-2">
                          Powered By Chat iQ
                        </a>
                      </div>
                    </form>
                  </div>
                </main>
                <!-- Chat UI And Form -->
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
    localStorage.setItem(
      "isSoundDisabled",
      localStorage.getItem("isSoundDisabled") === "true" ? "true" : "false"
    );
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
    chatHistory: localStorage.getItem("chat_history")
      ? JSON.parse(localStorage.getItem("chat_history") || "[]")
      : [],
    showEmailVerification: false,
    showChatScreen: false,
    showChatbotMainScreen: false,
    isSoundDisabled: localStorage.getItem("isSoundDisabled")
      ? localStorage.getItem("isSoundDisabled") || ""
      : false,
    isErrored: false,
    isLoading: false,
    base_url: localStorage.getItem("base_url"),
    ws_url: localStorage.getItem("ws_url"),
    bot_id: localStorage.getItem("bot_id"),
    welcome_message: localStorage.getItem("welcome_message")
      ? localStorage.getItem("welcome_message") || ""
      : "👋🏼 Hey There! What can I help you with today. I am a Gen AI powered chatbot trained to help customers with their queries.",

    name: localStorage.getItem("name")
      ? localStorage.getItem("name") || ""
      : "",
    email: localStorage.getItem("email")
      ? localStorage.getItem("email") || ""
      : "",
    message: "",
    theme_hex: "ffffff",

    ongoingStream: null,
    chat_ui_frame : document.getElementById("chat-ui"),
    body_ui_frame : document.getElementById("body-ui"),
    ws: null,

    botBranding: {
      name: localStorage.getItem("brand_name")
        ? localStorage.getItem("name") || "Chat iQ"
        : "",
      logo: localStorage.getItem("logo_url")
        ? localStorage.getItem("name") || ""
        : "https://iqsuite.io/assets/iq.png",
    },

    currentYear: new Date().getFullYear(),

    initChatbot: function () {
      let base_url = localStorage.getItem("base_url");
      let bot_id = localStorage.getItem("bot_id");
      this.body_ui_frame.style.display = 'flex';
      this.chat_ui_frame.style.display = 'none';

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
          this.showChatbotMainScreen = false;
          this.chat_ui_frame.style.display = 'none';

          if (localStorage.getItem("email") == null) {
            this.showChatScreen = false;
            this.body_ui_frame.style.display = 'flex';
            this.chat_ui_frame.style.display = 'none';
            this.showEmailVerification = true;
          } else {
            this.fetch_chat_history();
            this.showChatScreen = true;
            this.body_ui_frame.style.display = 'none';
            this.chat_ui_frame.style.display = 'flex';
            this.showEmailVerification = false;
            this.scrollToBottom();
          }

          this.botBranding.name = r.bot_branding.brand_name;
          this.botBranding.welcome_message = r.bot_branding.welcome_message;

          if (r.bot_branding.theme_hex !== null) {
            this.theme_hex = r.bot_branding.theme_hex;
          }

          if (r.bot_branding.logo) {
            this.botBranding.logo = this.base_url + r.bot_branding.logo;
          }

          this.welcome_message = r.bot_branding.welcome_message;

          localStorage.setItem(
            "welcome_message",
            r.bot_branding.welcome_message
          );
          localStorage.setItem("logo_url", this.base_url + r.bot_branding.logo);
          localStorage.setItem("brand_name", r.bot_branding.brand_name);
        });
    },

    toggleChatbotButton: function () {
      this.showChatbotMainScreen = !this.showChatbotMainScreen;
      this.scrollToBottom();
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
          this.body_ui_frame.style.display = 'none';
          this.chat_ui_frame.style.display = 'flex';
          this.chatHistory = r.chat_history;
          localStorage.setItem("name", r.user_data.name);
          localStorage.setItem("email", r.user_data.email);

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
            localStorage.setItem(
              "chat_history",
              JSON.stringify(r.chat_history)
            );
          }

          this.isLoading = false;

          this.setupWebsocket();

          this.chatHistory.push({
            type: "iq",
            message: this.welcome_message,
            tag: "welcome_message",
            created_at: new Date().toISOString(),
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
            created_at: new Date().toISOString(),
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
          this.playsound();
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
        created_at: new Date().toISOString(),
      });
      this.playsound();

      this.isLoading = true;
      this.ws.send(JSON.stringify({ message: this.message }));
      this.message = null;
      this.isLoading = false;
      this.scrollToBottom();
    },

    scrollToBottom: function () {
      this.$nextTick(() => {
        this.$refs.messagesContainer.scrollTo(
          0,
          this.$refs.messagesContainer.scrollHeight
        );
      });
    },

    playsound: function () {
      if (localStorage.getItem("isSoundDisabled") === "false") {
        const audio = new Audio(
          "https://chatiq.blob.core.windows.net/static-files/chatiq-message-alert.mp3"
        );
        audio.play();
      }
    },

    enableSound: function () {
      localStorage.setItem("isSoundDisabled", false);
      this.isSoundDisabled = false;
    },

    disableSound: function () {
      localStorage.setItem("isSoundDisabled", true);
      this.isSoundDisabled = true;
    },

    clear_local_storage: function () {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("chat_history");
      localStorage.removeItem("logo_url");
      localStorage.removeItem("brand_name");
      localStorage.removeItem("welcome_message");
      localStorage.setItem("isSoundDisabled", false);
      this.showChatScreen = false;
      this.showEmailVerification = true;
      location.reload();
    },

    fetch_chat_history: function (e) {
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
            localStorage.setItem(
              "chat_history",
              JSON.stringify(r.chat_history)
            );
          }
          this.setupWebsocket();

          this.chatHistory.push({
            type: "iq",
            message: this.welcome_message,
            tag: "welcome_message",
            created_at: new Date().toISOString(),
          });
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
          this.isErrored = true;
        });
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        weekday: "short",
        //year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const formattedDate = date.toLocaleDateString("en-US", options);
      const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const day = date.getDate();
      const suffix = this.getDaySuffix(day);

      return formattedDate.replace(/\d+/, `${day}${suffix}`);
    },
    getDaySuffix(day) {
      const suffixes = ["th", "st", "nd", "rd"];
      const relevantDigits = day < 30 ? day % 20 : day % 30;
      return relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
    },
  };
}

window.chatiQApplet = chatiQApplet;
