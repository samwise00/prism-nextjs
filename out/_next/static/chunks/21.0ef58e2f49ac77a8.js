(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[21,644],{35796:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{d:function(){return BaseEvmAdapter}});var _web3auth_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(45624);class BaseEvmAdapter extends _web3auth_base__WEBPACK_IMPORTED_MODULE_0__.J5{async authenticateUser(){var _this$chainConfig;if(!this.provider||!(null!==(_this$chainConfig=this.chainConfig)&&void 0!==_this$chainConfig&&_this$chainConfig.chainId))throw _web3auth_base__WEBPACK_IMPORTED_MODULE_0__.RM.notConnectedError();let{chainNamespace,chainId}=this.chainConfig;if(this.status!==_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.MP.CONNECTED)throw _web3auth_base__WEBPACK_IMPORTED_MODULE_0__.RM.notConnectedError("Not connected with wallet, Please login/connect first");let accounts=await this.provider.request({method:"eth_accounts"});if(accounts&&accounts.length>0){let existingToken=(0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.Cb)(accounts[0],this.name);if(existingToken){let isExpired=(0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.$E)(existingToken);if(!isExpired)return{idToken:existingToken}}let payload={domain:window.location.origin,uri:window.location.href,address:accounts[0],chainId:parseInt(chainId,16),version:"1",nonce:Math.random().toString(36).slice(2),issuedAt:new Date().toISOString()},challenge=await (0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.tV)(payload,chainNamespace),signedMessage=await this.provider.request({method:"personal_sign",params:[challenge,accounts[0]]}),idToken=await (0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.rn)(chainNamespace,signedMessage,challenge,this.name,this.sessionTime);return(0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.Fr)(accounts[0],this.name,idToken),{idToken}}throw _web3auth_base__WEBPACK_IMPORTED_MODULE_0__.RM.notConnectedError("Not connected with wallet, Please login/connect first")}async disconnect(){if(this.status!==_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.MP.CONNECTED)throw _web3auth_base__WEBPACK_IMPORTED_MODULE_0__.RM.disconnectionError("Not connected with wallet");let accounts=await this.provider.request({method:"eth_accounts"});accounts&&accounts.length>0&&(0,_web3auth_base__WEBPACK_IMPORTED_MODULE_0__.qz)(accounts[0],this.name)}}},43840:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WalletConnectV1Adapter:function(){return WalletConnectV1Adapter}});var defineProperty=__webpack_require__(4942),esm=__webpack_require__(75426),dist_esm=__webpack_require__(74131);class WalletConnect extends esm.Z{constructor(connectorOpts,pushServerOpts){super({cryptoLib:dist_esm,connectorOpts,pushServerOpts})}}var base_esm=__webpack_require__(45624),baseEvmAdapter_esm=__webpack_require__(35796),ethereumProvider_esm=__webpack_require__(52062);let WALLET_CONNECT_EXTENSION_ADAPTERS=[{name:"Rainbow",chains:[base_esm.EN.EIP155],logo:"https://images.web3auth.io/login-rainbow.svg",mobile:{native:"rainbow:",universal:"https://rnbwapp.com"},desktop:{native:"",universal:""}},{name:"MetaMask",chains:[base_esm.EN.EIP155],logo:"https://images.web3auth.io/login-metamask.svg",mobile:{native:"metamask:",universal:"https://metamask.app.link"},desktop:{native:"",universal:""}}];function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}class WalletConnectV1Adapter extends baseEvmAdapter_esm.d{constructor(){let options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};super(),(0,defineProperty.Z)(this,"name",base_esm.rW.WALLET_CONNECT_V1),(0,defineProperty.Z)(this,"adapterNamespace",base_esm.yk.EIP155),(0,defineProperty.Z)(this,"currentChainNamespace",base_esm.EN.EIP155),(0,defineProperty.Z)(this,"type",base_esm.hN.EXTERNAL),(0,defineProperty.Z)(this,"adapterOptions",void 0),(0,defineProperty.Z)(this,"status",base_esm.MP.NOT_READY),(0,defineProperty.Z)(this,"adapterData",{uri:"",extensionAdapters:WALLET_CONNECT_EXTENSION_ADAPTERS}),(0,defineProperty.Z)(this,"connector",null),(0,defineProperty.Z)(this,"wcProvider",null),(0,defineProperty.Z)(this,"rehydrated",!1),this.adapterOptions=function(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){(0,defineProperty.Z)(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}return target}({},options),this.chainConfig=options.chainConfig||null,this.sessionTime=options.sessionTime||86400}get connected(){var _this$connector;return!!(null!==(_this$connector=this.connector)&&void 0!==_this$connector&&_this$connector.connected)}get provider(){var _this$wcProvider;return(null===(_this$wcProvider=this.wcProvider)||void 0===_this$wcProvider?void 0:_this$wcProvider.provider)||null}set provider(_){throw Error("Not implemented")}async init(){super.checkInitializationRequirements(),this.chainConfig||(this.chainConfig=(0,base_esm.h2)(base_esm.EN.EIP155,1)),this.connector=this.getWalletConnectInstance(),this.wcProvider=new ethereumProvider_esm.WalletConnectProvider({config:{chainConfig:this.chainConfig},connector:this.connector}),this.emit(base_esm.n2.READY,base_esm.rW.WALLET_CONNECT_V1),this.status=base_esm.MP.READY,base_esm.cM.debug("initializing wallet connect v1 adapter"),this.connector.connected&&(this.rehydrated=!0,await this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId}))}async connect(){if(super.checkConnectionRequirements(),!this.connector)throw base_esm.Ty.notReady("Wallet adapter is not ready yet");if(this.connected)return await this.onConnectHandler({accounts:this.connector.accounts,chainId:this.connector.chainId}),this.provider;if(this.status!==base_esm.MP.CONNECTING){var _this$adapterOptions$,_this$adapterOptions$2;null!==(_this$adapterOptions$=this.adapterOptions.adapterSettings)&&void 0!==_this$adapterOptions$&&_this$adapterOptions$.qrcodeModal&&(this.connector=this.getWalletConnectInstance(),this.wcProvider=new ethereumProvider_esm.WalletConnectProvider({config:{chainConfig:this.chainConfig,skipLookupNetwork:null===(_this$adapterOptions$2=this.adapterOptions.adapterSettings)||void 0===_this$adapterOptions$2?void 0:_this$adapterOptions$2.skipNetworkSwitching},connector:this.connector})),await this.createNewSession(),this.status=base_esm.MP.CONNECTING,this.emit(base_esm.n2.CONNECTING,{adapter:base_esm.rW.WALLET_CONNECT_V1})}return new Promise((resolve,reject)=>{if(!this.connector)return reject(base_esm.Ty.notReady("Wallet adapter is not ready yet"));this.connector.on("modal_closed",async()=>(this.status=base_esm.MP.READY,this.emit(base_esm.n2.READY,base_esm.rW.WALLET_CONNECT_V1),reject(Error("User closed modal"))));try{this.connector.on("connect",async(error,payload)=>(error&&this.emit(base_esm.n2.ERRORED,error),base_esm.cM.debug("connected event emitted by web3auth"),await this.onConnectHandler(payload.params[0]),resolve(this.provider)))}catch(error){base_esm.cM.error("Wallet connect v1 adapter error while connecting",error),this.status=base_esm.MP.READY,this.rehydrated=!0,this.emit(base_esm.n2.ERRORED,error),reject(error instanceof base_esm.up?error:base_esm.RM.connectionError("Failed to login with wallet connect: ".concat((null==error?void 0:error.message)||"")))}})}setAdapterSettings(options){this.status!==base_esm.MP.READY&&null!=options&&options.sessionTime&&(this.sessionTime=options.sessionTime)}async getUserInfo(){if(!this.connected)throw base_esm.RM.notConnectedError("Not connected with wallet, Please login/connect first");return{}}async disconnect(){let options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{cleanup:!1},{cleanup}=options;if(!this.connector||!this.connected)throw base_esm.RM.notConnectedError("Not connected with wallet");await super.disconnect(),await this.connector.killSession(),this.rehydrated=!1,cleanup?(this.connector=null,this.status=base_esm.MP.NOT_READY,this.wcProvider=null):this.status=base_esm.MP.READY,this.emit(base_esm.n2.DISCONNECTED)}async addChain(chainConfig){try{var _this$adapterOptions$3;if(!this.wcProvider)throw base_esm.Ty.notReady("Wallet adapter is not ready yet");let networkSwitch=null===(_this$adapterOptions$3=this.adapterOptions.adapterSettings)||void 0===_this$adapterOptions$3?void 0:_this$adapterOptions$3.networkSwitchModal;networkSwitch&&await networkSwitch.addNetwork({chainConfig,appOrigin:window.location.hostname}),await this.wcProvider.addChain(chainConfig)}catch(error){base_esm.cM.error(error)}}async switchChain(connectedChainConfig,chainConfig){var _this$adapterOptions$4;if(!this.wcProvider)throw base_esm.Ty.notReady("Wallet adapter is not ready yet");let networkSwitch=null===(_this$adapterOptions$4=this.adapterOptions.adapterSettings)||void 0===_this$adapterOptions$4?void 0:_this$adapterOptions$4.networkSwitchModal;networkSwitch&&await networkSwitch.switchNetwork({currentChainConfig:chainConfig,newChainConfig:connectedChainConfig,appOrigin:window.location.hostname}),await this.wcProvider.switchChain({chainId:chainConfig.chainId,lookup:!1,addChain:!1})}async createNewSession(){var _this$adapterOptions,_this$adapterOptions$5,_this$chainConfig;let opts=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{forceNewSession:!1};if(!this.connector)throw base_esm.Ty.notReady("Wallet adapter is not ready yet");if(opts.forceNewSession&&this.connector.pending&&await this.connector.killSession(),null!==(_this$adapterOptions=this.adapterOptions)&&void 0!==_this$adapterOptions&&null!==(_this$adapterOptions$5=_this$adapterOptions.adapterSettings)&&void 0!==_this$adapterOptions$5&&_this$adapterOptions$5.qrcodeModal){await this.connector.createSession({chainId:parseInt((null===(_this$chainConfig=this.chainConfig)||void 0===_this$chainConfig?void 0:_this$chainConfig.chainId)||"0x1",16)});return}return new Promise((resolve,reject)=>{var _this$chainConfig2;if(!this.connector)return reject(base_esm.Ty.notReady("Wallet adapter is not ready yet"));base_esm.cM.debug("creating new session for web3auth wallet connect"),this.connector.on("display_uri",async(err,payload)=>{var _this$connector2;if(err)return this.emit(base_esm.n2.ERRORED,base_esm.RM.connectionError("Failed to display wallet connect qr code")),reject(err);let uri=payload.params[0];return this.updateAdapterData({uri,extensionAdapters:WALLET_CONNECT_EXTENSION_ADAPTERS}),null===(_this$connector2=this.connector)||void 0===_this$connector2||_this$connector2.off("display_uri"),resolve()}),this.connector.createSession({chainId:parseInt((null===(_this$chainConfig2=this.chainConfig)||void 0===_this$chainConfig2?void 0:_this$chainConfig2.chainId)||"0x1",16)}).catch(error=>(base_esm.cM.error("error while creating new wallet connect session",error),this.emit(base_esm.n2.ERRORED,error),reject(error)))})}async onConnectHandler(params){if(!this.connector||!this.wcProvider)throw base_esm.Ty.notReady("Wallet adapter is not ready yet");if(!this.chainConfig)throw base_esm.Ty.invalidParams("Chain config is not set");let{chainId}=params;if(base_esm.cM.debug("connected chainId in hex"),chainId!==parseInt(this.chainConfig.chainId,16)){var _this$adapterOptions$6,_this$adapterOptions2,_this$adapterOptions3;let connectedChainConfig=(0,base_esm.h2)(base_esm.EN.EIP155,chainId)||{chainId:"0x".concat(chainId.toString(16)),displayName:"Unknown Network"},isCustomUi=null===(_this$adapterOptions$6=this.adapterOptions.adapterSettings)||void 0===_this$adapterOptions$6?void 0:_this$adapterOptions$6.qrcodeModal;if(!isCustomUi||isCustomUi&&!(null!==(_this$adapterOptions2=this.adapterOptions)&&void 0!==_this$adapterOptions2&&null!==(_this$adapterOptions3=_this$adapterOptions2.adapterSettings)&&void 0!==_this$adapterOptions3&&_this$adapterOptions3.skipNetworkSwitching))try{await this.addChain(this.chainConfig),await this.switchChain(connectedChainConfig,this.chainConfig),this.connector=this.getWalletConnectInstance()}catch(error){base_esm.cM.error("error while chain switching",error),await this.createNewSession({forceNewSession:!0}),this.emit(base_esm.n2.ERRORED,base_esm.Ty.fromCode(5e3,"Not connected to correct network. Expected: ".concat(this.chainConfig.displayName,", Current: ").concat((null==connectedChainConfig?void 0:connectedChainConfig.displayName)||chainId,", Please switch to correct network from wallet"))),this.status=base_esm.MP.READY,this.rehydrated=!0;return}}await this.wcProvider.setupProvider(this.connector),this.subscribeEvents(this.connector),this.status=base_esm.MP.CONNECTED,this.emit(base_esm.n2.CONNECTED,{adapter:base_esm.rW.WALLET_CONNECT_V1,reconnected:this.rehydrated})}subscribeEvents(connector){connector.on("session_update",async error=>{error&&this.emit(base_esm.n2.ERRORED,error)})}getWalletConnectInstance(){let walletConnectOptions=this.adapterOptions.adapterSettings||{};return walletConnectOptions.bridge=walletConnectOptions.bridge||"https://bridge.walletconnect.org",new WalletConnect(walletConnectOptions)}}},27790:function(){},88924:function(){},55024:function(){}}]);