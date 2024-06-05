(function(o,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(o=typeof globalThis<"u"?globalThis:o||self,i(o["iq-chat-lib"]={}))})(this,function(o){"use strict";const i=`
    <div id="chatiQ-applet" x-data="chatiQApplet()" x-init="initChatbot" class="">
        <div x-show="showChatBotToggleButton" class="fixed bottom-10 right-10">
            <button x-on:click="toggleChatbotButton" id="toggle-chatbot-button" style="border: 0; background: transparent;" class="active:scale-95">
                <img src="https://iqsuite.io/assets/iq.png" class="w-12 h-12 rounded-full">
            </button>
        </div>

        <div class="fixed bottom-16 right-16 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden" style="width: 450px;" x-show="showChatbotMainScreen" x-transition>
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
                    <div class="flex-none flex flex-col h-full space-y-4 px-3 py-3 max-w-lg mx-auto rounded-lg mt-0 mb-0 overflow-y-auto max-h-80 w-full" style="overflow-y: auto;" x-ref="messagesContainer">
                        <!-- AI Message -->
                        <template x-for="message in chatHistory">
                            <div :class="message.type == 'iq' ? 'mr-auto bg-green-500' : 'ml-auto chat-message-user' " class="block bg-green-500 shadow px-3 py-2 rounded-md" style="max-width: 75%;">
                                <p class=" text-sm" :class="message.type == 'iq' ? 'text-green-100' : 'text-gray-600'">
                                    <span x-text="message.message"></span>
                                </p>
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
            </main>
        </div>
    </div>
`;class n{constructor(e,s,a){this.bot_id=e,this.base_url=s,this.ws_url=a,localStorage.setItem("bot_id",e),localStorage.setItem("base_url",s),localStorage.setItem("ws_url",a)}}window.ChatLib=n,document.body.insertAdjacentHTML("beforeend",i);function l(){return{count:0,showChatBotToggleButton:!1,emailVerified:!1,chatHistory:[],showEmailVerification:!1,showChatScreen:!1,showChatbotMainScreen:!1,isErrored:!1,isLoading:!1,base_url:localStorage.getItem("base_url"),ws_url:localStorage.getItem("ws_url"),bot_id:localStorage.getItem("bot_id"),name:"",email:"",message:"",ongoingStream:null,ws:null,botBranding:{name:"Chat iQ",logo:"https://iqsuite.io/assets/iq.png"},initChatbot:function(){let t=localStorage.getItem("base_url"),e=localStorage.getItem("bot_id");fetch(t+"/api/v1/init/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({bot_id:e,whitelisted_domain:window.location.origin})}).then(s=>s.ok?s.json():Promise.reject(s)).then(s=>{this.showChatBotToggleButton=!0,this.showChatbotMainScreen=!0,this.showChatScreen=!1,this.showEmailVerification=!0,this.botBranding.name=s.bot_branding.brand_name,this.botBranding.welcome_message=s.bot_branding.welcome_message,this.chatHistory.push({type:"iq",message:this.botBranding.welcome_message})})},toggleChatbotButton:function(){this.showChatbotMainScreen=!this.showChatbotMainScreen},handleEmailVerificationSubmit:function(t){t.preventDefault(),this.isLoading=!0,fetch(this.base_url+"/api/v1/bot-get-or-create/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,name:this.name,bot_id:this.bot_id})}).then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{console.log(e),console.log(this.email),console.log(this.bot_id),this.emailVerified=!0,this.showEmailVerification=!1,this.showChatScreen=!0,this.chatHistory=e.chat_history,this.isLoading=!1,this.setupWebsocket(),setTimeout(()=>{this.scrollToBottom()},200)}).catch(e=>{console.error(e),this.isLoading=!1,this.isErrored=!0})},setupWebsocket:function(){this.ws=new WebSocket(this.ws_url+`${this.bot_id}/${this.email}/applet/`),this.ws.onopen=()=>{console.log("Websocket connected")},this.ws.onmessage=t=>{const e=JSON.parse(t.data);if(e.event==="on_chat_model_start")this.ongoingStream={id:e.run_id},this.chatHistory.push({type:"iq",id:e.run_id,message:""});else if(e.event==="on_chat_model_stream"&&this.ongoingStream&&e.run_id==this.ongoingStream.id){let s=this.chatHistory.find(a=>a.id==e.run_id);(e.message!==""||e.message!==null||e.message!==void 0)&&(s.message+=e.message)}this.$nextTick(()=>{this.scrollToBottom()})},this.ws.onerror=t=>{console.error("WebSocket error observed:",t)},this.ws.onclose=t=>{console.log(`WebSocket is closed now. Code: ${t.code}, Reason: ${t.reason}`)}},handleChatbotFormSubmit:function(t){t.preventDefault(),this.chatHistory.push({type:"user",message:this.message}),this.isLoading=!0,this.ws.send(JSON.stringify({message:this.message})),this.message=null,this.isLoading=!1},scrollToBottom:function(){console.log("Scrolling"),this.$refs.messagesContainer.scrollTop=this.$refs.messagesContainer.scrollHeight}}}o.chatiQApplet=l,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
