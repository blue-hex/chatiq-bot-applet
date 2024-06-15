window.ChatLib=class{constructor(e,t,s){this.bot_id=e,this.base_url=t,this.ws_url=s,localStorage.setItem("bot_id",e),localStorage.setItem("base_url",t),localStorage.setItem("ws_url",s)}},document.body.insertAdjacentHTML("beforeend",'\n    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="">\n        <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10">\n            <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="active:scale-95">\n                <img :src="botBranding.logo ? botBranding.logo : \'https://iqsuite.io/assets/iq.png\'" class="w-12 h-12 rounded-full">\n            </button>\n        </div>\n\n        <div class="fixed bottom-16 right-16 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden" style="width: 510px;" x-show="showChatbotMainScreen" x-transition>\n            <header class="px-3 py-3 bg-slate-50 border-b border-slate-50">\n                <div class="flex items-center justify-between">\n                    <h3 class="text-xl" x-text="botBranding.name"></h3>\n                    <img :src="botBranding.logo" class="w-9 h-9" />\n                </div>\n            </header>\n\n            <main class="flex flex-col h-full border-t border-slate-100 px-3 py-3 overflow-hidden">\n                <div x-show="showEmailVerification">\n\n                    <p class="text-left mb-3 font-normal text-black text-xs" id="welcome-message">\n                        Hello! How are you doing? Please enter your details to get started!. This helps me remember if we have spoken before and provide you with better assistance!\n                    </p>\n\n                    <form id="email-verification-form" class="" x-on:submit="handleEmailVerificationSubmit">\n                        <div class="flex flex-col space-y-1.5">\n                            <div class="error-message block mb-3" x-show="isErrored">\n                                <p class="text-red-500 text-xs text-left">Oops, something went wrong, please try again.</p>\n                            </div>\n                        \n                            <input x-model="name" type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="John Doe" />\n                            <input x-model="email" type="email" name="email" id="email" required class="w-full border border-slate-200 rounded-md px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="john.doe@acme.org" />\n                            \n                            <button id="email-submit-btn" :disabled="isLoading" type="submit" class="bg-black text-center hover:bg-gray-800 text-white p-2 rounded-md text-sm bt-wid my-2">\n                                <span x-show="!isLoading">Continue</span>\n                                <svg x-show="isLoading" class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">\n                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>\n                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>\n                                </svg>\n                            </button>\n                        </div>\n                    </form>\n                </div>\n\n\n                <div x-show="showChatScreen" class="">\n                    <div class="flex-none flex flex-col h-full space-y-4 px-3 py-3 max-w-lg mx-auto rounded-lg mt-0 mb-0 overflow-y-auto w-full" style="overflow-y: auto; max-height: 50vh;" x-ref="messagesContainer">\n                        \x3c!-- AI Message --\x3e\n                        <template x-for="message in chatHistory">\n                            <div class="flex flex-col">\n                                <div x-show="message.type == \'iq\'" class="block mr-auto shadow px-3 py-2 rounded-md" style="max-width: 75%; background-color: #DFFFEA;">\n                                    <div x-html="message.message" class="text-sm font-sans text-green-900 iq-message-wrapper"></div>\n                                </div>\n\n                                <div x-show="message.type == \'user\'" class="block ml-auto bg-gray-500 shadow px-3 py-2 rounded-md chat-message-user" style="max-width: 75%; background-color: #E9F3FF;">\n                                    <span x-text="message.message" class="text-sm font-sans"></span>\n                                </div>\n\n                                <div class="relative" x-show="message.type == \'divider\'">\n                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">\n                                        <div class="w-full border-t border-gray-300"></div>\n                                    </div>\n                                    <div class="relative flex justify-center">\n                                        <span class="bg-white px-2 text-sm text-gray-500">Continue</span>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </template>\n                    </div>\n                    \n                    <form id="chat-form" class="space-y-4 mt-auto" x-on:submit="handleChatbotFormSubmit">\n                        <div class="mt-4 flex">\n                            <input x-model="message" type="text" id="user-input" class="w-full border border-slate-200 rounded-3xl px-3 py-3 shadow-sm text-sm focus:outline-none font-semibold" placeholder="Type your query" required />\n                            \n                            <button :disabled="isLoading" type="submit" id="send-button" class="bg-transparent text-white rounded-xl px-3 py-1 ml-2 inline-flex justify-center items-center disabled:text-gray-400 disabled:cursor-not-allowed">\n                                <svg x-show="!isLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-black hover:text-blue-500 hover:drop-shadow-md transition-all duration-150">\n                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />\n                                </svg>\n                                \n                                <div class="isLoading loader self-start" x-show="isLoading"></div>\n                            </button>\n                        </div>\n                    </form>\n                </div>\n\n                <a href="https://iqsuite.io" target="_blank" class="text-xs my-3 text-center text-gray-300">&copy; <span x-text="currentYear"></span> | Powered by iQ Suite</a>\n            </main>\n        </div>\n    </div>\n'),window.chatiQApplet=function(){return{count:0,showChatBotToggleButton:!1,emailVerified:!1,chatHistory:[],showEmailVerification:!1,showChatScreen:!1,showChatbotMainScreen:!1,isErrored:!1,isLoading:!1,base_url:localStorage.getItem("base_url"),ws_url:localStorage.getItem("ws_url"),bot_id:localStorage.getItem("bot_id"),welcome_message:"",name:"",email:"",message:"",ongoingStream:null,ws:null,botBranding:{name:"Chat iQ",logo:"https://iqsuite.io/assets/iq.png"},currentYear:(new Date).getFullYear(),initChatbot:function(){let e=localStorage.getItem("base_url"),t=localStorage.getItem("bot_id");fetch(e+"/api/v1/init/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({bot_id:t,whitelisted_domain:window.location.origin})}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.showChatBotToggleButton=!0,this.showChatbotMainScreen=!0,this.showChatScreen=!1,this.showEmailVerification=!0,this.botBranding.name=e.bot_branding.brand_name,this.botBranding.welcome_message=e.bot_branding.welcome_message,e.bot_branding.logo&&(this.botBranding.logo=this.base_url+e.bot_branding.logo),this.welcome_message=e.bot_branding.welcome_message}))},toggleChatbotButton:function(){this.showChatbotMainScreen=!this.showChatbotMainScreen},handleEmailVerificationSubmit:function(e){e.preventDefault(),this.isLoading=!0,fetch(this.base_url+"/api/v1/bot-get-or-create/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,name:this.name,bot_id:this.bot_id})}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.emailVerified=!0,this.showEmailVerification=!1,this.showChatScreen=!0,this.chatHistory=e.chat_history,e.chat_history.length>0&&(this.chatHistory.push({type:"divider",message:""}),this.chatHistory.forEach((e=>{"iq"==e.type&&(e.message=marked.parse(e.message))}))),this.isLoading=!1,this.setupWebsocket(),this.chatHistory.push({type:"iq",message:this.welcome_message,tag:"welcome_message"}),setTimeout((()=>{this.scrollToBottom()}),200)})).catch((e=>{console.error(e),this.isLoading=!1,this.isErrored=!0}))},setupWebsocket:function(){this.ws=new WebSocket(this.ws_url+`${this.bot_id}/${this.email}/applet/`),this.ws.onopen=()=>{console.log("Websocket connected")},this.ws.onmessage=e=>{const t=JSON.parse(e.data);if("on_chat_model_start"===t.event)this.ongoingStream={id:t.run_id},this.chatHistory.push({type:"iq",id:t.run_id,message:""});else if("on_chat_model_stream"===t.event&&this.ongoingStream&&t.run_id==this.ongoingStream.id){let e=this.chatHistory.find((e=>e.id==t.run_id));""===t.message&&null===t.message&&void 0===t.message||(e.message+=t.message)}else if("on_parser_end"===t.event&&this.ongoingStream&&t.run_id==this.ongoingStream.id){console.log("Parser end event"),this.scrollToBottom(),this.ongoingStream=null;let e=this.chatHistory[this.chatHistory.length-1];e.message=marked.parse(e.message)}this.$nextTick((()=>{this.scrollToBottom()}))},this.ws.onerror=e=>{console.error("WebSocket error observed:",e)},this.ws.onclose=e=>{console.log(`WebSocket is closed now. Code: ${e.code}, Reason: ${e.reason}`)}},handleChatbotFormSubmit:function(e){e.preventDefault(),this.chatHistory.push({type:"user",message:this.message}),this.isLoading=!0,this.ws.send(JSON.stringify({message:this.message})),this.message=null,this.isLoading=!1},scrollToBottom:function(){console.log("Scrolling"),this.$refs.messagesContainer.scrollTop=this.$refs.messagesContainer.scrollHeight}}};