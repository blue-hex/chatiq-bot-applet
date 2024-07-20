function chatiQApplet() {
  return {
    count: 0,
    showChatBotToggleButton: false,
    emailVerified: false,
    chatHistory: localStorage.getItem("chat_history")
      ? JSON.parse(localStorage.getItem("chat_history") || "[]")
      : [],
    showEmailVerification: false,
    suggestions: [],
    showChatScreen: false,
    showChatbotMainScreen: false,
    isSoundDisabled: localStorage.getItem("isSoundDisabled")
      ? localStorage.getItem("isSoundDisabled")
      : false,
    show_phone_field: localStorage.getItem("show_phone_field")
      ? localStorage.getItem("show_phone_field") || ""
      : false,
    isErrored: false,
    isLoading: false,
    base_url: localStorage.getItem("base_url"),
    ws_url: localStorage.getItem("ws_url"),
    bot_id: localStorage.getItem("bot_id"),
    welcome_message: localStorage.getItem("welcome_message")
      ? localStorage.getItem("welcome_message") || ""
      : "👋🏼 Hey There! What can I help you with today? I am a Gen AI powered chatbot trained to help customers with their queries.",
    name: localStorage.getItem("name")
      ? localStorage.getItem("name") || ""
      : "",
    email: localStorage.getItem("email")
      ? localStorage.getItem("email") || ""
      : "",
    phone: null,
    message: "",
    theme_hex: "ffffff",
    ongoingStream: null,
    chat_ui_frame: null,
    body_ui_frame: null,
    ws: null,
    botBranding: {
      name: localStorage.getItem("brand_name")
        ? localStorage.getItem("brand_name") || "Pyaw AI"
        : "",
      logo: localStorage.getItem("logo_url")
        ? localStorage.getItem("logo_url") || ""
        : "https://iqsuite.io/assets/iq.png",
    },
    currentYear: new Date().getFullYear(),

    initChatbot: function () {
      try {
        this.chat_ui_frame = document.getElementById("chat-ui");
        this.body_ui_frame = document.getElementById("body-ui");

        if (!this.chat_ui_frame || !this.body_ui_frame) {
          throw new Error("Required elements not found");
        }

        let base_url = this.base_url;
        let bot_id = this.bot_id;
        this.body_ui_frame.style.display = "flex";
        this.chat_ui_frame.style.display = "none";
        this.send_alerts();

        fetch(`${base_url}/api/v1/init/`, {
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
            this.chat_ui_frame.style.display = "none";

            if (localStorage.getItem("email") == null) {
              this.showChatScreen = false;
              this.body_ui_frame.style.display = "flex";
              this.chat_ui_frame.style.display = "none";
              this.showEmailVerification = true;
            } else {
              this.fetch_chat_history();
              this.showChatScreen = true;
              this.body_ui_frame.style.display = "none";
              this.chat_ui_frame.style.display = "flex";
              this.showEmailVerification = false;
              this.scrollToBottom();
            }

            this.botBranding.name = r.bot_branding.brand_name;
            this.botBranding.welcome_message = r.bot_branding.welcome_message;
            this.show_phone_field = r.bot_branding.show_phone_field;
            localStorage.setItem("show_phone_field", this.show_phone_field);

            if (this.isSoundDisabled == null) {
              localStorage.setItem("isSoundDisabled", false);
            } else {
              localStorage.setItem("isSoundDisabled", this.isSoundDisabled);
            }

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
            localStorage.setItem(
              "logo_url",
              this.base_url + r.bot_branding.logo
            );
            localStorage.setItem("brand_name", r.bot_branding.brand_name);
          })
          .catch((error) => {
            console.error("Error initializing chatbot:", error);
          });
      } catch (error) {
        console.error("Error in initChatbot:", error);
      }
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
          phone_number: this.phone,
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
          this.body_ui_frame.style.display = "none";
          this.chat_ui_frame.style.display = "flex";
          this.suggestions = r.user_data.suggestions;
          this.chatHistory = r.chat_history;
          localStorage.setItem("name", r.user_data.name);
          localStorage.setItem("email", r.user_data.email);

          if (r.chat_history.length > 0) {
            this.chatHistory.push({
              type: "divider",
              message: "",
            });

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
          console.error("Error verifying email:", error);
          this.isLoading = false;
          this.isErrored = true;
        });
    },

    setupWebsocket: function () {
      try {
        this.ws = new WebSocket(
          this.ws_url + `${this.bot_id}/${this.email}/applet/`
        );

        this.ws.onopen = () => {
          console.log("Data Connection Active");
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
            let chObject = this.chatHistory.find((ch) => ch.id == data.run_id);

            if (data.message) {
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
      } catch (error) {
        console.error("Error setting up websocket:", error);
      }
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
      try {
        this.ws.send(JSON.stringify({ message: this.message }));
      } catch (error) {
        console.error("Error sending message through websocket:", error);
      }
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

    send_suggestion: function (suggestion_string) {
      this.chatHistory.push({
        type: "user",
        message: suggestion_string,
        created_at: new Date().toISOString(),
      });
      this.playsound();

      this.isLoading = true;
      try {
        this.ws.send(JSON.stringify({ message: suggestion_string }));
      } catch (error) {
        console.error("Error sending suggestion through websocket:", error);
      }
      this.message = null;
      this.isLoading = false;
      this.scrollToBottom();
    },

    render_alert: function (message) {
      const alertContainer = document.getElementById("alert-container");
      const alert = document.createElement("div");
      alert.className = "alert";
      alert.innerHTML = `
            ${message}
            <button class="close-btn">&times;</button>
        `;
      alert.querySelector(".close-btn").addEventListener("click", function () {
        alert.classList.remove("show");
        setTimeout(() => {
          alertContainer.removeChild(alert);
        }, 500);
      });
      alertContainer.appendChild(alert);
      setTimeout(() => {
        alert.classList.add("show");
      }, 10);
    },

    send_alerts: function () {
      this.playsound();
      setTimeout(() => {
        this.render_alert("😊 Welcome! Do you need any help or assistance?");
      }, 6000);
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

    fetch_chat_history: function () {
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
          this.suggestions = r.user_data.suggestions;

          if (r.chat_history.length > 0) {
            this.chatHistory.push({
              type: "divider",
              message: "",
            });

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
          console.error("Error fetching chat history:", error);
        });
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        weekday: "short",
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
