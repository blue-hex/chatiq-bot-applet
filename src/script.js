function chatiQApplet() {
    return {
        count: 0,
        closeChatMainScreen: function () {
            window.parent.postMessage({event: 'close-iframe', message: 'collapsing the iframe'}, '*');
            this.showChatbotMainScreen = !this.showChatbotMainScreen;
            let userId = sessionStorage.getItem('userId');
            if (userId != null) {
                this.closeSession(userId);
            }
        },
        showChatBotToggleButton: false,
        emailVerified: false,
        chatHistory: sessionStorage.getItem("chat_history") ? JSON.parse(sessionStorage.getItem("chat_history") || "[]") : [],
        showEmailVerification: false,
        suggestions: [],
        showChatScreen: false,
        showChatbotMainScreen: false,
        isSoundDisabled: sessionStorage.getItem("isSoundDisabled") ? sessionStorage.getItem("isSoundDisabled") : false,
        show_phone_field: sessionStorage.getItem("show_phone_field") ? sessionStorage.getItem("show_phone_field") || "" : false,
        isErrored: false,
        isLoading: false,
        isInitSuccess: false,
        base_url: sessionStorage.getItem("base_url"),
        domain: sessionStorage.getItem("domain"),
        ws_url: sessionStorage.getItem("ws_url"),
        bot_id: sessionStorage.getItem("bot_id"),
        welcome_message: sessionStorage.getItem("welcome_message") ? sessionStorage.getItem("welcome_message") || "" : "👋🏼 Hey There! What can I help you with today? I am a Gen AI powered chatbot trained to help customers with their queries.",
        name: null,
        email: null,
        phone: null,
        message: "",
        theme_hex: "ffffff",
        ongoingStream: null,
        chat_ui_frame: null,
        body_ui_frame: null,
        ws: null,
        botBranding: {
            name: "Pyaw", logo: "https://chatiq.blob.core.windows.net/static-files/pyaw-chat-logo.png",
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
                let domain = this.domain;
                this.body_ui_frame.style.display = "flex";
                this.chat_ui_frame.style.display = "none";

                fetch(`${base_url}/api/v1/init/`, {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({
                        bot_id: bot_id, whitelisted_domain: domain,
                    }),
                })
                    .then((response) => response.ok ? response.json() : Promise.reject(response))
                    .then((r) => {
                        this.generateUserId();
                        this.showChatBotToggleButton = true;
                        this.showChatbotMainScreen = false;
                        this.chat_ui_frame.style.display = "none";
                        this.isInitSuccess = true;
                        this.send_alerts();

                        if (this.email == null || this.name == null) {
                            this.showChatScreen = false;
                            this.body_ui_frame.style.display = "flex";
                            this.chat_ui_frame.style.display = "none";
                            this.showEmailVerification = true;
                        } else {
                            this.fetch_chat_history();
                            this.showChatScreen = true;
                            this.body_ui_frame.style.display = "none";

                            this.chat_ui_frame.classList.remove('show');
                            this.chat_ui_frame.style.display = "flex";

                            // Force reflow
                            void this.chat_ui_frame.offsetWidth;

                            this.chat_ui_frame.classList.add('show');

                            this.showEmailVerification = false;
                            this.scrollToBottom();
                        }


                        this.botBranding.welcome_message = r.bot_branding.welcome_message;
                        this.show_phone_field = r.bot_branding.show_phone_field;
                        sessionStorage.setItem("show_phone_field", this.show_phone_field);

                        if (this.isSoundDisabled == null) {
                            sessionStorage.setItem("isSoundDisabled", false);
                        } else {
                            sessionStorage.setItem("isSoundDisabled", this.isSoundDisabled);
                        }

                        if (r.bot_branding.theme_hex !== null) {
                            this.theme_hex = r.bot_branding.theme_hex;
                        }

                        if (r.bot_branding.name !== null) {
                            this.botBranding.name = r.bot_branding.brand_name;
                        }

                        if (r.bot_branding.logo) {
                            this.botBranding.logo = this.base_url + r.bot_branding.logo;
                        }

                        this.welcome_message = r.bot_branding.welcome_message;

                        sessionStorage.setItem("welcome_message", r.bot_branding.welcome_message);
                        sessionStorage.setItem("logo_url", this.base_url + r.bot_branding.logo);
                        sessionStorage.setItem("brand_name", r.bot_branding.brand_name);
                    })
                    .catch((error) => {
                        console.error("Error initializing chatbot:", error);
                    });
            } catch (error) {
                console.error("Error in initChatbot:", error);
            }
        },

        generateUserId: function () {
            if (!sessionStorage.getItem("userId")) {
                sessionStorage.setItem("userId", 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000));
            }
            return sessionStorage.getItem("userId");
        },

        toggleChatbotButton: function () {
            window.parent.postMessage({event: 'open-iframe', message: 'opening the iframe'}, '*');
            this.showChatbotMainScreen = !this.showChatbotMainScreen;
            this.scrollToBottom();
        },

        collectClicks: function () {
            let base_url = this.base_url;
            let userId = sessionStorage.getItem("userId");
            /*if (userId && this.email === "") {
                console.log("Unique click detected", userId);
            }*/

            const formdata = new FormData();
            formdata.append("deployment_code", this.bot_id);
            formdata.append("user_id", userId)

            const requestOptions = {
                method: "POST", body: formdata, redirect: "follow"
            };

            fetch(`${base_url}/api/v1/collect-visitors/`, requestOptions)
                .then((response) => this.startSession(userId))
                .catch((error) => console.error(error));

        },

        upAccurate: function () {
            let base_url = this.base_url;
            const formdata = new FormData();
            formdata.append("deployment_code", this.bot_id);
            formdata.append("is_positive", "true");
            formdata.append("customer_email", this.email);

            const requestOptions = {
                method: "POST", body: formdata,
            };

            fetch(`${base_url}/api/v1/collect-feedback/`, requestOptions)
                .then((response) => {
                    // console.log("Feedback collected");
                    document.querySelectorAll('#feedback-btn')[document.querySelectorAll('#feedback-btn').length - 1].style.display = "none";
                    document.querySelectorAll('#feedback-div')[document.querySelectorAll('#feedback-div').length - 1]?.appendChild(Object.assign(document.createElement('div'), {
                        textContent: 'Thanks for your feedback!', className: 'text-sm font-light text-black'
                    }));

                })
                .catch((error) => {
                    console.error("Error collecting feedback:", error);
                });
        },


        downAccurate: function () {
            let base_url = this.base_url;
            const formdata = new FormData();
            formdata.append("deployment_code", this.bot_id);
            formdata.append("is_negative", "true");
            formdata.append("customer_email", this.email);

            const requestOptions = {
                method: "POST", body: formdata,
            };

            fetch(`${base_url}/api/v1/collect-feedback/`, requestOptions)
                .then((response) => {
                    // console.log("Feedback collected");
                    document.querySelectorAll('#feedback-btn')[document.querySelectorAll('#feedback-btn').length - 1].style.display = "none";
                    document.querySelectorAll('#feedback-div')[document.querySelectorAll('#feedback-div').length - 1]?.appendChild(Object.assign(document.createElement('div'), {
                        textContent: 'Thanks for your feedback!', className: 'text-sm font-light text-black'
                    }));

                })
                .catch((error) => {
                    console.error("Error collecting feedback:", error);
                });
        },

        startSession: function (userId) {
            // console.log("Starting session", userId);
            // Create a unique session ID and store it in sessionStorage
            let sessionId = 'session_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
            sessionStorage.setItem("sessionId", sessionId);

            // Get current date and time
            let currentDate = new Date();
            let startDate = currentDate.toISOString().split('T')[0];
            let startTime = currentDate.toTimeString().split(' ')[0];

            // Initialize the session object
            let session = JSON.parse(sessionStorage.getItem("sessionData")) || {};
            session[userId] = session[userId] || {};
            session[userId][sessionId] = {
                "start_date": startDate, "start_time": startTime
            };

            // Save the session data back to sessionStorage
            sessionStorage.setItem("sessionData", JSON.stringify(session));
            this.send_session_data();
        },

        send_session_data: function () {
            let base_url = this.base_url;
            let session_dict = sessionStorage.getItem("sessionData");
            const formdata = new FormData();
            formdata.append("deployment_code", this.bot_id);
            formdata.append("customer_email", this.email);
            formdata.append("session_dict", session_dict);

            const requestOptions = {
                method: "POST", body: formdata,
            };

            fetch(`${base_url}/api/v1/collect-session/`, requestOptions)
                .then((response) => console.log(""))
                .catch((error) => console.error(error));
        },

        closeSession: function (userId) {
            //console.log("closing session")
            // Retrieve the current session ID from sessionStorage
            let sessionId = sessionStorage.getItem("sessionId");
            if (!sessionId) {
                console.error("No session found to close.");
                return;
            }

            let currentDate = new Date();
            let endDate = currentDate.toISOString().split('T')[0];
            let endTime = currentDate.toTimeString().split(' ')[0];

            let session = JSON.parse(sessionStorage.getItem("sessionData")) || {};
            if (session[userId] && session[userId][sessionId]) {
                session[userId][sessionId]["end_date"] = endDate;
                session[userId][sessionId]["end_time"] = endTime;

                sessionStorage.setItem("sessionData", JSON.stringify(session));
            } else {
                console.error("Session data not found for this user.");
            }

            sessionStorage.removeItem("sessionId");
            this.send_session_data();
        },


        handleEmailVerificationSubmit: function (e) {
            e.preventDefault();
            this.isLoading = true;

            if (this.email && this.name) {
                fetch(this.base_url + "/api/v1/bot-get-or-create/", {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify({
                        email: this.email, name: this.name, phone_number: this.phone, bot_id: this.bot_id,
                    }),
                })
                    .then((response) => response.ok ? response.json() : Promise.reject(response))
                    .then((r) => {
                        this.emailVerified = true;
                        this.showEmailVerification = false;
                        this.showChatScreen = true;
                        this.body_ui_frame.style.display = "none";
                        this.chat_ui_frame.style.display = "flex";
                        this.suggestions = r.user_data.suggestions;
                        this.chatHistory = r.chat_history;
                        sessionStorage.setItem("name", r.user_data.name);
                        sessionStorage.setItem("email", r.user_data.email);

                        if (r.chat_history.length > 0) {
                            this.chatHistory.push({
                                type: "divider", message: "",
                            });

                            this.chatHistory.forEach((ch) => {
                                if (ch.type == "iq") {
                                    ch.message = marked.parse(ch.message);
                                }
                            });
                            sessionStorage.setItem("chat_history", JSON.stringify(r.chat_history));
                        }

                        this.isLoading = false;
                        this.setupSocketIO();
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
            }
        },

        setupSocketIO: function () {
            try {
                this.socket = io.connect(`${this.ws_url}`, {
                    query: {
                        bot_id: this.bot_id,
                        email: this.email,
                        source: 'applet'
                    },
                    transports: ['websocket'],
                    reconnectionAttempts: 5,
                    timeout: 20000
                });

                this.socket.on('connect', () => {
                    console.log("Data Connection Active");
                });

                this.socket.on('response_start', (data) => {
                    if (data.event === "on_chat_model_start") {
                        this.ongoingStream = {id: data.run_id, content: ""};
                        this.chatHistory.push({
                            type: "iq", id: data.run_id, message: "", created_at: new Date().toISOString(),
                        });
                        this.scrollToBottom();
                    }
                });

                this.socket.on('response_chunk', (data) => {
                    if (data.event === "on_chat_model_stream" && this.ongoingStream && data.run_id === this.ongoingStream.id) {
                        const chObject = this.chatHistory.find((ch) => ch.id === data.run_id);

                        if (chObject) {
                            this.ongoingStream.content += data.message;
                            chObject.message = marked.parse(this.ongoingStream.content);
                        } else {
                            this.chatHistory.push({
                                type: "iq",
                                id: data.run_id,
                                message: marked.parse(data.message),
                                created_at: new Date().toISOString(),
                            });
                        }
                        this.scrollToBottom();
                    }
                });

                this.socket.on('response_end', (data) => {
                    if (data.event === "is_llm_refused") {
                        this.playsound();

                        const feedbackIndex = this.chatHistory.findIndex((item) => item.type === "feedback-ui");

                        if (feedbackIndex !== -1) {
                            this.chatHistory.splice(feedbackIndex, 1);
                        }

                        if (this.chatHistory.findIndex((item) => item.type === "feedback-ui") === -1) {
                            this.chatHistory.push({
                                type: "feedback-ui", message: "",
                            });
                            this.scrollToBottom();
                        }
                    }
                });

                this.socket.on('disconnect', (reason) => {
                    console.log(`Socket disconnected: ${reason}`);
                });

                this.socket.on('connect_error', (error) => {
                    console.error("Socket.IO error observed:", error);
                });
            } catch (error) {
                console.error("Error setting up socket.io:", error);
            }
        },

        handleChatbotFormSubmit: function (e) {
            e.preventDefault();
            this.chatHistory.push({
                type: "user", message: this.message, created_at: new Date().toISOString(),
            });
            this.playsound();

            this.isLoading = true;
            try {
                //this.ws.send(JSON.stringify({message: this.message}));
                if (this.socket && this.socket.connected) {
                    // Emit the message to the server
                    this.socket.emit('message', {message: this.message});
                    //console.log('Message sent:', this.message);
                } else {
                    console.error('Socket is not connected. Cannot send message.');
                }
            } catch (error) {
                console.error("Error sending message through websocket:", error);
            }
            this.message = null;
            this.isLoading = false;
            this.scrollToBottom();
        },

        scrollToBottom: function () {
            this.$nextTick(() => {
                const container = this.$refs.messagesContainer;
                if (container) {
                    const targetScroll = container.scrollHeight;
                    const currentScroll = container.scrollTop;

                    const distance = targetScroll - currentScroll;
                    const duration = 1000;
                    let startTime = null;

                    function scrollStep(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const scrollAmount = Math.min(progress / duration, 1) * distance;
                        container.scrollTop = currentScroll + scrollAmount;

                        if (progress < duration) {
                            requestAnimationFrame(scrollStep);
                        }
                    }

                    requestAnimationFrame(scrollStep);
                }

            });
        },


        playsound: function () {
            if (sessionStorage.getItem("isSoundDisabled") === "false") {
                const audio = new Audio("https://chatiq.blob.core.windows.net/static-files/chatiq-message-alert.mp3");
                audio.play();
            }
        },

        enableSound: function () {
            sessionStorage.setItem("isSoundDisabled", false);
            this.isSoundDisabled = false;
        },

        disableSound: function () {
            sessionStorage.setItem("isSoundDisabled", true);
            this.isSoundDisabled = true;
        },

        send_suggestion: function (suggestion_string) {
            this.chatHistory.push({
                type: "user", message: suggestion_string, created_at: new Date().toISOString(),
            });
            this.playsound();

            this.isLoading = true;
            try {
                //this.ws.send(JSON.stringify({message: suggestion_string}));
                if (this.socket && this.socket.connected) {
                    // Emit the message to the server
                    this.socket.emit('message', {message: suggestion_string});
                    //console.log('Message sent:', this.message);
                } else {
                    console.error('Socket is not connected. Cannot send message.');
                }
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
            setTimeout(() => {
                this.render_alert("😊 Welcome! Do you need any help or assistance?");
            }, 3000);
        },

        clear_local_storage: function () {
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("chat_history");
            sessionStorage.removeItem("logo_url");
            sessionStorage.removeItem("brand_name");
            sessionStorage.removeItem("welcome_message");
            sessionStorage.setItem("isSoundDisabled", false);
            this.showChatScreen = false;
            this.showEmailVerification = true;
            location.reload();
        },

        fetch_chat_history: function () {
            fetch(this.base_url + "/api/v1/bot-get-or-create/", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    email: this.email, name: this.name, bot_id: this.bot_id,
                }),
            })
                .then((response) => response.ok ? response.json() : Promise.reject(response))
                .then((r) => {
                    this.chatHistory = r.chat_history;
                    this.suggestions = r.user_data.suggestions;

                    if (r.chat_history.length > 0) {
                        this.chatHistory.push({
                            type: "divider", message: "",
                        });

                        this.chatHistory.forEach((ch) => {
                            if (ch.type == "iq") {
                                ch.message = marked.parse(ch.message);
                            }
                        });
                        sessionStorage.setItem("chat_history", JSON.stringify(r.chat_history));
                    }
                    this.setupSocketIO();
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
                weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "numeric", hour12: true,
            };

            const formattedDate = date.toLocaleDateString("en-US", options);
            const time = date.toLocaleTimeString("en-US", {
                hour: "numeric", minute: "numeric", hour12: true,
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
