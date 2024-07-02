window.ChatLib=class{constructor(e,t,s){this.bot_id=e,this.base_url=t,this.ws_url=s,localStorage.setItem("bot_id",e),localStorage.setItem("base_url",t),localStorage.setItem("ws_url",s)}},document.body.insertAdjacentHTML("beforeend",'\n    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="font-redhat" style="z-index: 99;">\n      <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10">\n        <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="relative">\n            <img :src="botBranding.logo ? botBranding.logo : \'https://iqsuite.io/assets/iq.png\'" class="w-16 h-16 rounded-full shadow-xl">\n            \x3c!-- Green circle indicator for online status --\x3e\n            <span class="absolute bottom-0 right-1 block w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>\n        </button>\n      </div>\n\n\n        <div class="fixed bottom-16 right-16 bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden" style="width: 450px; z-index:9999;" x-show="showChatbotMainScreen" x-transition>\n            <div class="flex flex-col justify-between">\n              <header class="px-4 py-4 flex justify-between w-full items-center">\n                  <div class="flex items-center gap-3">\n                    <div class="relative">\n                      <img :src="botBranding.logo ? botBranding.logo : \'https://iqsuite.io/assets/iq.png\'" class="w-14 h-14 shadow-sm rounded-full">\n                      \x3c!-- Green circle indicator for online status --\x3e\n                      <span class="absolute bottom-0 right-0 block w-3 h-3 bg-emerald-500 rounded-md border-2 border-white"></span>\n                    </div>\n                    <div>\n                      <h4 class="text-xl font-medium font-redhat" x-text="botBranding.name"></h4>\n                      <p class="font-light text-sm font-redhat">Gen AI-Powered Chatbot</p>\n                    </div>\n                  </div>\n                  <button type="button" @click="showChatbotMainScreen = false"> \n                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">\n                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />\n                    </svg>\n                  </button>\n                </header>\n                <main class="flex flex-col overflow-hidden">\n                  <div x-show="showEmailVerification" class="p-4 flex flex-col justify-between">\n                       <div>\n                         <p class="text-left my-2 text-black font-redhat font-medium text-3xl" id="welcome-message">\n                            👋🏼 Welcome <br/> We\'re happy to assist you.\n                        </p>\n                        <p class="text-neutral-600 text-lg font-light my-4 font-redhat"> To personalize your experience and ensure we can connect you with the most relevant information, could you please share a few details. </p>\n                       </div>\n    \n                        <form id="email-verification-form" x-on:submit="handleEmailVerificationSubmit">\n                            <div class="flex flex-col space-y-2 mt-16">\n                                <div class="error-message block mb-3" x-show="isErrored">\n                                    <p class="text-red-500 text-xs text-left">Oops, something went wrong, please try again.</p>\n                                </div>\n                            \n                                <input x-model="name" type="text" name="name" id="customer_name" autofocus autocapitalize="words" required class="w-full font-redhat border border-neutral-200 rounded-md px-3 py-3 bg-neutral-50 text-base focus:outline-none font-normal" placeholder="Full Name" />\n                                <input x-model="email" type="email" name="email" id="email" required class="w-full border border-neutral-200 font-redhat rounded-md px-3 py-3 text-base focus:outline-none bg-neutral-50 font-normal" placeholder="E-Mail Address" />\n                                \n                                <button id="email-submit-btn" :disabled="isLoading" type="submit" class="bg-black text-center text-white py-3 px-8 font-redhat font-medium rounded-md text-base hover:bg-neutral-950 transition duration-300 ease-in bt-wid my-2">\n                                    <span x-show="!isLoading">Continue</span>\n                                    <svg x-show="isLoading" class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">\n                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>\n                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>\n                                    </svg>\n                                </button>\n                                <p class="text-center text-xs inline-flex justify-center items-center font-light mt-4 gap-1 mb-2"> Powered By <a href="https://chat.iqsuite.io/" class="text-blue-950 font-redhat" target="_blank" class="!no-underline"> Chat iQ </a> </p>\n                            </div>\n                        </form>\n                    </div>\n    \n                    <div x-show="showChatScreen" class="flex flex-col p-2 justify-between items-middle">\n                        <div style="height: 28rem;" class="flex-none flex flex-col h-full space-y-2 max-w-lg mx-auto mt-0 mb-0 overflow-y-auto w-full" sty x-ref="messagesContainer">\n                            <template x-for="message in chatHistory">\n                                <div class="flex flex-col px-2.5 py-2">\n                                  \x3c!-- AI Message --\x3e\n                                   <div x-show="message.type == \'iq\'">\n                                        <div class="inline-flex flex-col justify-start items-start gap-2">\n                                            \x3c!-- Avatar for IQ message --\x3e\n                                            <img :src="botBranding.logo" class="w-8 h-8 rounded-full" />\n                                            <div x-html="message.message" class="text-sm text-black bg-neutral-200 font-light rounded-2xl p-3 iq-message-wrapper"></div>\n                                        </div>\n                                    </div>\n    \n                                     \x3c!-- User Message --\x3e\n                                    <div x-show="message.type == \'user\'" class="flex flex-row justify-end items-end gap-2">\n                                        <div class="inline-flex flex-col justify-start items-end gap-2">\n                                            \x3c!-- Avatar for User message --\x3e\n                                            <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">\n                                                <span class="text-blue-600 font-light text-sm uppercase" x-text="name.charAt(0)"></span>\n                                            </div>\n                                            <span x-text="message.message" class="text-sm text-white bg-neutral-900 font-light rounded-2xl p-3"></span>\n                                        </div>\n                                    </div>\n    \n                                    <div class="relative" x-show="message.type == \'divider\'">\n                                        <div class="absolute inset-0 flex items-center" aria-hidden="true">\n                                            <div class="w-full border-t border-gray-300"></div>\n                                        </div>\n                                        <div class="relative flex justify-center">\n                                            <span class="px-2 text-sm bg-white text-gray-300">Today</span>\n                                        </div>\n                                    </div>\n                                </div>\n                            </template>\n                        </div>\n                        \n                        <form id="chat-form" x-on:submit="handleChatbotFormSubmit" class="relative">\n                          <div class="my-2 flex items-center w-full relative">\n                            <input x-model="message" required id="user-input" type="text" class="w-full border border-slate-200 rounded-md px-3 py-3 text-sm focus:outline-none font-normal pr-16 resize-none overflow-hidden" placeholder="Ask your query here" />\n                            <button :disabled="isLoading" type="submit" id="send-button" class="absolute right-0 top-0 h-full px-3 bg-transparent text-white rounded-r-md inline-flex justify-center items-center disabled:text-gray-400 disabled:cursor-not-allowed">\n                              <svg x-show="!isLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-black bg-white">\n                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />\n                              </svg>\n                              <div class="isLoading loader" x-show="isLoading"></div>\n                            </button>\n                          </div>\n                          <div class="flex justify-center items-center">\n                            <p class="text-center text-sm font-light py-4 inline-flex justify-center items-center gap-1">Powered By <img class="h-4 w-4" src="https://iqsuite.io/assets/iq.png" /> <a href="https://iqsuite.io/" class="text-blue-950" target="_blank">iQ Suite</a></p>\n                          </div>\n                        </form>\n                    </div>\n                </main>\n            </div>\n        </div>\n    </div>\n'),window.chatiQApplet=function(){return{count:0,showChatBotToggleButton:!1,emailVerified:!1,chatHistory:[],showEmailVerification:!1,showChatScreen:!1,showChatbotMainScreen:!1,isErrored:!1,isLoading:!1,base_url:localStorage.getItem("base_url"),ws_url:localStorage.getItem("ws_url"),bot_id:localStorage.getItem("bot_id"),welcome_message:"👋🏼 Hey There! What can I help you with today. I am a Gen AI powered chatbot trained to help customers with their queries.",name:"",email:"",message:"",theme_hex:"ffffff",ongoingStream:null,ws:null,botBranding:{name:"Chat iQ",logo:"https://iqsuite.io/assets/iq.png"},currentYear:(new Date).getFullYear(),initChatbot:function(){let e=localStorage.getItem("base_url"),t=localStorage.getItem("bot_id");console.log(this.name),fetch(e+"/api/v1/init/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({bot_id:t,whitelisted_domain:window.location.origin})}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.showChatBotToggleButton=!0,this.showChatbotMainScreen=!0,this.showChatScreen=!1,this.showEmailVerification=!0,this.botBranding.name=e.bot_branding.brand_name,this.botBranding.welcome_message=e.bot_branding.welcome_message,null!==e.bot_branding.theme_hex&&(this.theme_hex=e.bot_branding.theme_hex),e.bot_branding.logo&&(this.botBranding.logo=this.base_url+e.bot_branding.logo),this.welcome_message=e.bot_branding.welcome_message}))},toggleChatbotButton:function(){this.showChatbotMainScreen=!this.showChatbotMainScreen},handleEmailVerificationSubmit:function(e){e.preventDefault(),this.isLoading=!0,fetch(this.base_url+"/api/v1/bot-get-or-create/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,name:this.name,bot_id:this.bot_id})}).then((e=>e.ok?e.json():Promise.reject(e))).then((e=>{this.emailVerified=!0,this.showEmailVerification=!1,this.showChatScreen=!0,this.chatHistory=e.chat_history,e.chat_history.length>0&&(this.chatHistory.push({type:"divider",message:""}),this.chatHistory.forEach((e=>{"iq"==e.type&&(e.message=marked.parse(e.message))}))),this.isLoading=!1,this.setupWebsocket(),this.chatHistory.push({type:"iq",message:this.welcome_message,tag:"welcome_message"}),setTimeout((()=>{this.scrollToBottom()}),200)})).catch((e=>{console.error(e),this.isLoading=!1,this.isErrored=!0}))},setupWebsocket:function(){this.ws=new WebSocket(this.ws_url+`${this.bot_id}/${this.email}/applet/`),this.ws.onopen=()=>{console.log("Websocket connected")},this.ws.onmessage=e=>{const t=JSON.parse(e.data);if("on_chat_model_start"===t.event)this.ongoingStream={id:t.run_id},this.chatHistory.push({type:"iq",id:t.run_id,message:""});else if("on_chat_model_stream"===t.event&&this.ongoingStream&&t.run_id==this.ongoingStream.id){let e=this.chatHistory.find((e=>e.id==t.run_id));""===t.message&&null===t.message&&void 0===t.message||(e.message+=t.message)}else if("on_parser_end"===t.event&&this.ongoingStream&&t.run_id==this.ongoingStream.id){console.log("Parser end event"),this.scrollToBottom(),this.ongoingStream=null;let e=this.chatHistory[this.chatHistory.length-1];e.message=marked.parse(e.message)}this.$nextTick((()=>{this.scrollToBottom()}))},this.ws.onerror=e=>{console.error("WebSocket error observed:",e)},this.ws.onclose=e=>{console.log(`WebSocket is closed now. Code: ${e.code}, Reason: ${e.reason}`)}},handleChatbotFormSubmit:function(e){e.preventDefault(),this.chatHistory.push({type:"user",message:this.message}),this.isLoading=!0,this.ws.send(JSON.stringify({message:this.message})),this.message=null,this.isLoading=!1},scrollToBottom:function(){console.log("Scrolling"),this.$refs.messagesContainer.scrollTop=this.$refs.messagesContainer.scrollHeight}}};