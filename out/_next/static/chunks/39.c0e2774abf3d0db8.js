(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[39],{93039:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AlchemyWebSocketProvider:function(){return AlchemyWebSocketProvider}});var index_02af91ae=__webpack_require__(18688),dist=__webpack_require__(54178),bignumber=__webpack_require__(2593),lib_esm=__webpack_require__(45710),properties_lib_esm=__webpack_require__(6881),json_rpc_provider=__webpack_require__(68783),logger_lib_esm=__webpack_require__(1581),_version=__webpack_require__(34216);let WS=null;try{if(WS=WebSocket,null==WS)throw Error("inject please")}catch(error){let logger=new logger_lib_esm.Yd(_version.i);WS=function(){logger.throwError("WebSockets not supported in this environment",logger_lib_esm.Yd.errors.UNSUPPORTED_OPERATION,{operation:"new WebSocket()"})}}var __awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):((value=result.value)instanceof P?value:new P(function(resolve){resolve(value)})).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};let logger1=new logger_lib_esm.Yd(_version.i),NextId=1;class WebSocketProvider extends json_rpc_provider.r{constructor(url,network){"any"===network&&logger1.throwError("WebSocketProvider does not support 'any' network yet",logger_lib_esm.Yd.errors.UNSUPPORTED_OPERATION,{operation:"network:any"}),"string"==typeof url?super(url,network):super("_websocket",network),this._pollingInterval=-1,this._wsReady=!1,"string"==typeof url?(0,properties_lib_esm.zG)(this,"_websocket",new WS(this.connection.url)):(0,properties_lib_esm.zG)(this,"_websocket",url),(0,properties_lib_esm.zG)(this,"_requests",{}),(0,properties_lib_esm.zG)(this,"_subs",{}),(0,properties_lib_esm.zG)(this,"_subIds",{}),(0,properties_lib_esm.zG)(this,"_detectNetwork",super.detectNetwork()),this.websocket.onopen=()=>{this._wsReady=!0,Object.keys(this._requests).forEach(id=>{this.websocket.send(this._requests[id].payload)})},this.websocket.onmessage=messageEvent=>{let data=messageEvent.data,result=JSON.parse(data);if(null!=result.id){let id=String(result.id),request=this._requests[id];if(delete this._requests[id],void 0!==result.result)request.callback(null,result.result),this.emit("debug",{action:"response",request:JSON.parse(request.payload),response:result.result,provider:this});else{let error=null;result.error?(error=Error(result.error.message||"unknown error"),(0,properties_lib_esm.zG)(error,"code",result.error.code||null),(0,properties_lib_esm.zG)(error,"response",data)):error=Error("unknown error"),request.callback(error,void 0),this.emit("debug",{action:"response",error:error,request:JSON.parse(request.payload),provider:this})}}else if("eth_subscription"===result.method){let sub=this._subs[result.params.subscription];sub&&sub.processFunc(result.params.result)}else console.warn("this should not happen")};let fauxPoll=setInterval(()=>{this.emit("poll")},1e3);fauxPoll.unref&&fauxPoll.unref()}get websocket(){return this._websocket}detectNetwork(){return this._detectNetwork}get pollingInterval(){return 0}resetEventsBlock(blockNumber){logger1.throwError("cannot reset events block on WebSocketProvider",logger_lib_esm.Yd.errors.UNSUPPORTED_OPERATION,{operation:"resetEventBlock"})}set pollingInterval(value){logger1.throwError("cannot set polling interval on WebSocketProvider",logger_lib_esm.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPollingInterval"})}poll(){return __awaiter(this,void 0,void 0,function*(){return null})}set polling(value){value&&logger1.throwError("cannot set polling on WebSocketProvider",logger_lib_esm.Yd.errors.UNSUPPORTED_OPERATION,{operation:"setPolling"})}send(method,params){let rid=NextId++;return new Promise((resolve,reject)=>{let payload=JSON.stringify({method:method,params:params,id:rid,jsonrpc:"2.0"});this.emit("debug",{action:"request",request:JSON.parse(payload),provider:this}),this._requests[String(rid)]={callback:function(error,result){return error?reject(error):resolve(result)},payload},this._wsReady&&this.websocket.send(payload)})}static defaultUrl(){return"ws://localhost:8546"}_subscribe(tag,param,processFunc){return __awaiter(this,void 0,void 0,function*(){let subIdPromise=this._subIds[tag];null==subIdPromise&&(subIdPromise=Promise.all(param).then(param=>this.send("eth_subscribe",param)),this._subIds[tag]=subIdPromise);let subId=yield subIdPromise;this._subs[subId]={tag,processFunc}})}_startEvent(event){switch(event.type){case"block":this._subscribe("block",["newHeads"],result=>{let blockNumber=bignumber.O$.from(result.number).toNumber();this._emitted.block=blockNumber,this.emit("block",blockNumber)});break;case"pending":this._subscribe("pending",["newPendingTransactions"],result=>{this.emit("pending",result)});break;case"filter":this._subscribe(event.tag,["logs",this._getFilter(event.filter)],result=>{null==result.removed&&(result.removed=!1),this.emit(event.filter,this.formatter.filterLog(result))});break;case"tx":{let emitReceipt=event=>{let hash=event.hash;this.getTransactionReceipt(hash).then(receipt=>{receipt&&this.emit(hash,receipt)})};emitReceipt(event),this._subscribe("tx",["newHeads"],result=>{this._events.filter(e=>"tx"===e.type).forEach(emitReceipt)});break}case"debug":case"poll":case"willPoll":case"didPoll":case"error":break;default:console.log("unhandled:",event)}}_stopEvent(event){let tag=event.tag;if("tx"===event.type){if(this._events.filter(e=>"tx"===e.type).length)return;tag="tx"}else if(this.listenerCount(event.event))return;let subId=this._subIds[tag];subId&&(delete this._subIds[tag],subId.then(subId=>{this._subs[subId]&&(delete this._subs[subId],this.send("eth_unsubscribe",[subId]))}))}destroy(){return __awaiter(this,void 0,void 0,function*(){this.websocket.readyState===WS.CONNECTING&&(yield new Promise(resolve=>{this.websocket.onopen=function(){resolve(!0)},this.websocket.onerror=function(){resolve(!1)}})),this.websocket.close(1e3)})}}var alchemy_provider_a776ca8a=__webpack_require__(72366);__webpack_require__(9669);var process=__webpack_require__(34155);class WebsocketBackfiller{constructor(provider){this.provider=provider,this.maxBackfillBlocks=120}getNewHeadsBackfill(isCancelled,previousHeads,fromBlockNumber){return(0,index_02af91ae._)(this,void 0,void 0,function*(){throwIfCancelled(isCancelled);let toBlockNumber=yield this.getBlockNumber();if(throwIfCancelled(isCancelled),0===previousHeads.length)return this.getHeadEventsInRange(Math.max(fromBlockNumber,toBlockNumber-this.maxBackfillBlocks)+1,toBlockNumber+1);let lastSeenBlockNumber=(0,index_02af91ae.f)(previousHeads[previousHeads.length-1].number),minBlockNumber=toBlockNumber-this.maxBackfillBlocks+1;if(lastSeenBlockNumber<=minBlockNumber)return this.getHeadEventsInRange(minBlockNumber,toBlockNumber+1);let reorgHeads=yield this.getReorgHeads(isCancelled,previousHeads);throwIfCancelled(isCancelled);let intermediateHeads=yield this.getHeadEventsInRange(lastSeenBlockNumber+1,toBlockNumber+1);return throwIfCancelled(isCancelled),[...reorgHeads,...intermediateHeads]})}getLogsBackfill(isCancelled,filter,previousLogs,fromBlockNumber){return(0,index_02af91ae._)(this,void 0,void 0,function*(){throwIfCancelled(isCancelled);let toBlockNumber=yield this.getBlockNumber();if(throwIfCancelled(isCancelled),0===previousLogs.length)return this.getLogsInRange(filter,Math.max(fromBlockNumber,toBlockNumber-this.maxBackfillBlocks)+1,toBlockNumber+1);let lastSeenBlockNumber=(0,index_02af91ae.f)(previousLogs[previousLogs.length-1].blockNumber),minBlockNumber=toBlockNumber-this.maxBackfillBlocks+1;if(lastSeenBlockNumber<minBlockNumber)return this.getLogsInRange(filter,minBlockNumber,toBlockNumber+1);let commonAncestor=yield this.getCommonAncestor(isCancelled,previousLogs);throwIfCancelled(isCancelled);let removedLogs=previousLogs.filter(log=>(0,index_02af91ae.f)(log.blockNumber)>commonAncestor.blockNumber).map(log=>Object.assign(Object.assign({},log),{removed:!0})),fromBlockInclusive=commonAncestor.blockNumber===Number.NEGATIVE_INFINITY?(0,index_02af91ae.f)(previousLogs[0].blockNumber):commonAncestor.blockNumber,addedLogs=yield this.getLogsInRange(filter,fromBlockInclusive,toBlockNumber+1);return addedLogs=addedLogs.filter(log=>log&&((0,index_02af91ae.f)(log.blockNumber)>commonAncestor.blockNumber||(0,index_02af91ae.f)(log.logIndex)>commonAncestor.logIndex)),throwIfCancelled(isCancelled),[...removedLogs,...addedLogs]})}setMaxBackfillBlock(newMax){this.maxBackfillBlocks=newMax}getBlockNumber(){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let blockNumberHex=yield this.provider.send("eth_blockNumber");return(0,index_02af91ae.f)(blockNumberHex)})}getHeadEventsInRange(fromBlockInclusive,toBlockExclusive){return(0,index_02af91ae._)(this,void 0,void 0,function*(){if(fromBlockInclusive>=toBlockExclusive)return[];let batchParts=[];for(let i=fromBlockInclusive;i<toBlockExclusive;i++)batchParts.push({method:"eth_getBlockByNumber",params:[(0,index_02af91ae.t)(i),!1]});let blockHeads=yield this.provider.sendBatch(batchParts);return blockHeads.map(toNewHeadsEvent)})}getReorgHeads(isCancelled,previousHeads){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let result=[];for(let i=previousHeads.length-1;i>=0;i--){let oldEvent=previousHeads[i],blockHead=yield this.getBlockByNumber((0,index_02af91ae.f)(oldEvent.number));if(throwIfCancelled(isCancelled),oldEvent.hash===blockHead.hash)break;result.push(toNewHeadsEvent(blockHead))}return result.reverse()})}getBlockByNumber(blockNumber){return(0,index_02af91ae._)(this,void 0,void 0,function*(){return this.provider.send("eth_getBlockByNumber",[(0,index_02af91ae.t)(blockNumber),!1])})}getCommonAncestor(isCancelled,previousLogs){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let blockHead=yield this.getBlockByNumber((0,index_02af91ae.f)(previousLogs[previousLogs.length-1].blockNumber));throwIfCancelled(isCancelled);for(let i=previousLogs.length-1;i>=0;i--){let oldLog=previousLogs[i];if(oldLog.blockNumber!==blockHead.number&&(blockHead=yield this.getBlockByNumber((0,index_02af91ae.f)(oldLog.blockNumber))),oldLog.blockHash===blockHead.hash)return{blockNumber:(0,index_02af91ae.f)(oldLog.blockNumber),logIndex:(0,index_02af91ae.f)(oldLog.logIndex)}}return{blockNumber:Number.NEGATIVE_INFINITY,logIndex:Number.NEGATIVE_INFINITY}})}getLogsInRange(filter,fromBlockInclusive,toBlockExclusive){return(0,index_02af91ae._)(this,void 0,void 0,function*(){if(fromBlockInclusive>=toBlockExclusive)return[];let rangeFilter=Object.assign(Object.assign({},filter),{fromBlock:(0,index_02af91ae.t)(fromBlockInclusive),toBlock:(0,index_02af91ae.t)(toBlockExclusive-1)});return this.provider.send("eth_getLogs",[rangeFilter])})}}function toNewHeadsEvent(head){let result=Object.assign({},head);return delete result.totalDifficulty,delete result.transactions,delete result.uncles,result}function dedupe(items,getKey){let keysSeen=new Set,result=[];return items.forEach(item=>{let key=getKey(item);keysSeen.has(key)||(keysSeen.add(key),result.push(item))}),result}let CANCELLED=Error("Cancelled");function throwIfCancelled(isCancelled){if(isCancelled())throw CANCELLED}class AlchemyWebSocketProvider extends WebSocketProvider{constructor(config,wsConstructor){var _a;let apiKey=alchemy_provider_a776ca8a.AlchemyProvider.getApiKey(config.apiKey),alchemyNetwork=alchemy_provider_a776ca8a.AlchemyProvider.getAlchemyNetwork(config.network),connection=alchemy_provider_a776ca8a.AlchemyProvider.getAlchemyConnectionInfo(alchemyNetwork,apiKey,"wss"),protocol=`alchemy-sdk-${index_02af91ae.V}`,ws=new dist.Z(null!==(_a=config.url)&&void 0!==_a?_a:connection.url,protocol,{wsConstructor:null!=wsConstructor?wsConstructor:void 0!==process&&null!=process&&null!=process.versions&&null!=process.versions.node?__webpack_require__(45840).w3cwebsocket:WebSocket}),ethersNetwork=index_02af91ae.E[alchemyNetwork];super(ws,ethersNetwork),this._events=[],this.virtualSubscriptionsById=new Map,this.virtualIdsByPhysicalId=new Map,this.handleMessage=event=>{var message;let message1=JSON.parse(event.data);if(Array.isArray(message=message1)||"2.0"===message.jsonrpc&&void 0!==message.id)return;let physicalId=message1.params.subscription,virtualId=this.virtualIdsByPhysicalId.get(physicalId);if(!virtualId)return;let subscription=this.virtualSubscriptionsById.get(virtualId);if("eth_subscribe"===subscription.method)switch(subscription.params[0]){case"newHeads":{let{isBackfilling,backfillBuffer}=subscription,{result}=message1.params;isBackfilling?addToPastEventsBuffer(backfillBuffer,result,getNewHeadsBlockNumber):physicalId!==virtualId?this.emitAndRememberEvent(virtualId,result,getNewHeadsBlockNumber):this.rememberEvent(virtualId,result,getNewHeadsBlockNumber);break}case"logs":{let{isBackfilling:isBackfilling1,backfillBuffer:backfillBuffer1}=subscription,{result:result1}=message1.params;isBackfilling1?addToPastEventsBuffer(backfillBuffer1,result1,getLogsBlockNumber):virtualId!==physicalId?this.emitAndRememberEvent(virtualId,result1,getLogsBlockNumber):this.rememberEvent(virtualId,result1,getLogsBlockNumber);break}default:if(physicalId!==virtualId){let{result:result2}=message1.params;this.emitEvent(virtualId,result2)}}},this.handleReopen=()=>{let cancelled;this.virtualIdsByPhysicalId.clear();let{cancel,isCancelled}=(cancelled=!1,{cancel:()=>cancelled=!0,isCancelled:()=>cancelled});for(let subscription of(this.cancelBackfill=cancel,this.virtualSubscriptionsById.values()))(0,index_02af91ae._)(this,void 0,void 0,function*(){try{yield this.resubscribeAndBackfill(isCancelled,subscription)}catch(error){isCancelled()||console.error(`Error while backfilling "${subscription.params[0]}" subscription. Some events may be missing.`,error)}});this.startHeartbeat()},this.stopHeartbeatAndBackfill=()=>{null!=this.heartbeatIntervalId&&(clearInterval(this.heartbeatIntervalId),this.heartbeatIntervalId=void 0),this.cancelBackfill()},this.apiKey=apiKey,this.backfiller=new WebsocketBackfiller(this),this.addSocketListeners(),this.startHeartbeat(),this.cancelBackfill=index_02af91ae.n}static getNetwork(network){return"string"==typeof network&&network in index_02af91ae.C?index_02af91ae.C[network]:(0,lib_esm.H)(network)}on(eventName,listener){return this._addEventListener(eventName,listener,!1)}once(eventName,listener){return this._addEventListener(eventName,listener,!0)}off(eventName,listener){return(0,index_02af91ae.i)(eventName)?this._off(eventName,listener):super.off(eventName,listener)}removeAllListeners(eventName){return void 0!==eventName&&(0,index_02af91ae.i)(eventName)?this._removeAllListeners(eventName):super.removeAllListeners(eventName)}listenerCount(eventName){return void 0!==eventName&&(0,index_02af91ae.i)(eventName)?this._listenerCount(eventName):super.listenerCount(eventName)}listeners(eventName){return void 0!==eventName&&(0,index_02af91ae.i)(eventName)?this._listeners(eventName):super.listeners(eventName)}_addEventListener(eventName,listener,once){if(!(0,index_02af91ae.i)(eventName))return super._addEventListener(eventName,listener,once);{(0,index_02af91ae.v)(eventName);let event=new index_02af91ae.c((0,index_02af91ae.d)(eventName),listener,once);return this._events.push(event),this._startEvent(event),this}}_startEvent(event){let customLogicTypes=[...index_02af91ae.A,"block","filter"];customLogicTypes.includes(event.type)?this.customStartEvent(event):super._startEvent(event)}_subscribe(tag,param,processFunc,event){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let subIdPromise=this._subIds[tag],startingBlockNumber=yield this.getBlockNumber();null==subIdPromise&&(subIdPromise=Promise.all(param).then(param=>this.send("eth_subscribe",param)),this._subIds[tag]=subIdPromise);let subId=yield subIdPromise,resolvedParams=yield Promise.all(param);this.virtualSubscriptionsById.set(subId,{event:event,method:"eth_subscribe",params:resolvedParams,startingBlockNumber,virtualId:subId,physicalId:subId,sentEvents:[],isBackfilling:!1,backfillBuffer:[]}),this.virtualIdsByPhysicalId.set(subId,subId),this._subs[subId]={tag,processFunc}})}emit(eventName,...args){if(!(0,index_02af91ae.i)(eventName))return super.emit(eventName,...args);{let result=!1,stopped=[],eventTag=(0,index_02af91ae.d)(eventName);return this._events=this._events.filter(event=>event.tag!==eventTag||(setTimeout(()=>{event.listener.apply(this,args)},0),result=!0,!event.once||(stopped.push(event),!1))),stopped.forEach(event=>{this._stopEvent(event)}),result}}sendBatch(parts){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let nextId=0,payload=parts.map(({method,params})=>({method,params,jsonrpc:"2.0",id:`alchemy-sdk:${nextId++}`}));return this.sendBatchConcurrently(payload)})}destroy(){return this.removeSocketListeners(),this.stopHeartbeatAndBackfill(),super.destroy()}isCommunityResource(){return this.apiKey===index_02af91ae.D}_stopEvent(event){let tag=event.tag;if(index_02af91ae.A.includes(event.type)){if(this._events.filter(e=>index_02af91ae.A.includes(e.type)).length)return}else if("tx"===event.type){if(this._events.filter(e=>"tx"===e.type).length)return;tag="tx"}else if(this.listenerCount(event.event))return;let subId=this._subIds[tag];subId&&(delete this._subIds[tag],subId.then(subId=>{this._subs[subId]&&(delete this._subs[subId],this.send("eth_unsubscribe",[subId]))}))}addSocketListeners(){this._websocket.addEventListener("message",this.handleMessage),this._websocket.addEventListener("reopen",this.handleReopen),this._websocket.addEventListener("down",this.stopHeartbeatAndBackfill)}removeSocketListeners(){this._websocket.removeEventListener("message",this.handleMessage),this._websocket.removeEventListener("reopen",this.handleReopen),this._websocket.removeEventListener("down",this.stopHeartbeatAndBackfill)}resubscribeAndBackfill(isCancelled,subscription){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let{virtualId,method,params,sentEvents,backfillBuffer,startingBlockNumber}=subscription;subscription.isBackfilling=!0,backfillBuffer.length=0;try{var events,events1;let physicalId=yield this.send(method,params);switch(throwIfCancelled(isCancelled),subscription.physicalId=physicalId,this.virtualIdsByPhysicalId.set(physicalId,virtualId),params[0]){case"newHeads":{let backfillEvents=yield withBackoffRetries(()=>withTimeout(this.backfiller.getNewHeadsBackfill(isCancelled,sentEvents,startingBlockNumber),6e4),5,()=>!isCancelled());throwIfCancelled(isCancelled);let events2=(events=[...backfillEvents,...backfillBuffer],dedupe(events,event=>event.hash));events2.forEach(event=>this.emitNewHeadsEvent(virtualId,event));break}case"logs":{let filter=params[1]||{},backfillEvents1=yield withBackoffRetries(()=>withTimeout(this.backfiller.getLogsBackfill(isCancelled,filter,sentEvents,startingBlockNumber),6e4),5,()=>!isCancelled());throwIfCancelled(isCancelled);let events3=(events1=[...backfillEvents1,...backfillBuffer],dedupe(events1,event=>`${event.blockHash}/${event.logIndex}`));events3.forEach(event=>this.emitLogsEvent(virtualId,event))}}}finally{subscription.isBackfilling=!1,backfillBuffer.length=0}})}emitNewHeadsEvent(virtualId,result){this.emitAndRememberEvent(virtualId,result,getNewHeadsBlockNumber)}emitLogsEvent(virtualId,result){this.emitAndRememberEvent(virtualId,result,getLogsBlockNumber)}emitAndRememberEvent(virtualId,result,getBlockNumber){this.rememberEvent(virtualId,result,getBlockNumber),this.emitEvent(virtualId,result)}emitEvent(virtualId,result){let subscription=this.virtualSubscriptionsById.get(virtualId);subscription&&this.emitGenericEvent(subscription,result)}rememberEvent(virtualId,result,getBlockNumber){let subscription=this.virtualSubscriptionsById.get(virtualId);subscription&&addToPastEventsBuffer(subscription.sentEvents,Object.assign({},result),getBlockNumber)}emitGenericEvent(subscription,result){let emitFunction=this.emitProcessFn(subscription.event);emitFunction(result)}startHeartbeat(){null==this.heartbeatIntervalId&&(this.heartbeatIntervalId=setInterval(()=>(0,index_02af91ae._)(this,void 0,void 0,function*(){try{yield withTimeout(this.send("net_version"),1e4)}catch(_a){this._websocket.reconnect()}}),3e4))}sendBatchConcurrently(payload){return(0,index_02af91ae._)(this,void 0,void 0,function*(){return Promise.all(payload.map(req=>this.send(req.method,req.params)))})}customStartEvent(event){if(event.type===index_02af91ae.e){let{fromAddress,toAddress,hashesOnly}=event;this._subscribe(event.tag,[index_02af91ae.h.PENDING_TRANSACTIONS,{fromAddress,toAddress,hashesOnly}],this.emitProcessFn(event),event)}else if(event.type===index_02af91ae.j){let{addresses,includeRemoved,hashesOnly:hashesOnly1}=event;this._subscribe(event.tag,[index_02af91ae.h.MINED_TRANSACTIONS,{addresses,includeRemoved,hashesOnly:hashesOnly1}],this.emitProcessFn(event),event)}else"block"===event.type?this._subscribe("block",["newHeads"],this.emitProcessFn(event),event):"filter"===event.type&&this._subscribe(event.tag,["logs",this._getFilter(event.filter)],this.emitProcessFn(event),event)}emitProcessFn(event){switch(event.type){case index_02af91ae.e:return result=>this.emit({method:index_02af91ae.h.PENDING_TRANSACTIONS,fromAddress:event.fromAddress,toAddress:event.toAddress,hashesOnly:event.hashesOnly},result);case index_02af91ae.j:return result=>this.emit({method:index_02af91ae.h.MINED_TRANSACTIONS,addresses:event.addresses,includeRemoved:event.includeRemoved,hashesOnly:event.hashesOnly},result);case"block":return result=>{let blockNumber=bignumber.O$.from(result.number).toNumber();this._emitted.block=blockNumber,this.emit("block",blockNumber)};case"filter":return result=>{null==result.removed&&(result.removed=!1),this.emit(event.filter,this.formatter.filterLog(result))};default:throw Error("Invalid event type to `emitProcessFn()`")}}_off(eventName,listener){if(null==listener)return this.removeAllListeners(eventName);let stopped=[],found=!1,eventTag=(0,index_02af91ae.d)(eventName);return this._events=this._events.filter(event=>event.tag!==eventTag||event.listener!=listener||!!found||(found=!0,stopped.push(event),!1)),stopped.forEach(event=>{this._stopEvent(event)}),this}_removeAllListeners(eventName){let stopped=[];if(null==eventName)stopped=this._events,this._events=[];else{let eventTag=(0,index_02af91ae.d)(eventName);this._events=this._events.filter(event=>event.tag!==eventTag||(stopped.push(event),!1))}return stopped.forEach(event=>{this._stopEvent(event)}),this}_listenerCount(eventName){if(!eventName)return this._events.length;let eventTag=(0,index_02af91ae.d)(eventName);return this._events.filter(event=>event.tag===eventTag).length}_listeners(eventName){if(null==eventName)return this._events.map(event=>event.listener);let eventTag=(0,index_02af91ae.d)(eventName);return this._events.filter(event=>event.tag===eventTag).map(event=>event.listener)}}function withBackoffRetries(f,retryCount,shouldRetry=()=>!0){return(0,index_02af91ae._)(this,void 0,void 0,function*(){let nextWaitTime=0,i=0;for(;;)try{return yield f()}catch(error){if(++i>=retryCount||!shouldRetry(error)||(yield function(ms){return new Promise(resolve=>setTimeout(resolve,ms))}(nextWaitTime),!shouldRetry(error)))throw error;nextWaitTime=0===nextWaitTime?1e3:Math.min(3e4,2*nextWaitTime)}})}function withTimeout(promise,ms){return Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(Error("Timeout")),ms))])}function getNewHeadsBlockNumber(event){return(0,index_02af91ae.f)(event.number)}function getLogsBlockNumber(event){return(0,index_02af91ae.f)(event.blockNumber)}function addToPastEventsBuffer(pastEvents,event,getBlockNumber){let currentBlockNumber=getBlockNumber(event),firstGoodIndex=pastEvents.findIndex(e=>getBlockNumber(e)>currentBlockNumber-10);-1===firstGoodIndex?pastEvents.length=0:pastEvents.splice(0,firstGoodIndex),pastEvents.push(event)}},284:function(module){var naiveFallback=function(){if("object"==typeof self&&self)return self;if("object"==typeof window&&window)return window;throw Error("Unable to resolve global `this`")};module.exports=function(){if(this)return this;if("object"==typeof globalThis&&globalThis)return globalThis;try{Object.defineProperty(Object.prototype,"__global__",{get:function(){return this},configurable:!0})}catch(error){return naiveFallback()}try{if(!__global__)return naiveFallback();return __global__}finally{delete Object.prototype.__global__}}()},54178:function(__unused_webpack_module,exports){"use strict";var SturdyWebSocket=function(){function SturdyWebSocket1(url,protocolsOrOptions,options){var options1,result;if(void 0===options&&(options={}),this.url=url,this.onclose=null,this.onerror=null,this.onmessage=null,this.onopen=null,this.ondown=null,this.onreopen=null,this.CONNECTING=SturdyWebSocket1.CONNECTING,this.OPEN=SturdyWebSocket1.OPEN,this.CLOSING=SturdyWebSocket1.CLOSING,this.CLOSED=SturdyWebSocket1.CLOSED,this.hasBeenOpened=!1,this.isClosed=!1,this.messageBuffer=[],this.nextRetryTime=0,this.reconnectCount=0,this.lastKnownExtensions="",this.lastKnownProtocol="",this.listeners={},null==protocolsOrOptions||"string"==typeof protocolsOrOptions||Array.isArray(protocolsOrOptions)?this.protocols=protocolsOrOptions:options=protocolsOrOptions,this.options=(options1=options,result={},Object.keys(SturdyWebSocket.DEFAULT_OPTIONS).forEach(function(key){var value=options1[key];result[key]=void 0===value?SturdyWebSocket.DEFAULT_OPTIONS[key]:value}),result),!this.options.wsConstructor){if("undefined"!=typeof WebSocket)this.options.wsConstructor=WebSocket;else throw Error("WebSocket not present in global scope and no wsConstructor option was provided.")}this.openNewWebSocket()}return Object.defineProperty(SturdyWebSocket1.prototype,"binaryType",{get:function(){return this.binaryTypeInternal||"blob"},set:function(binaryType){this.binaryTypeInternal=binaryType,this.ws&&(this.ws.binaryType=binaryType)},enumerable:!0,configurable:!0}),Object.defineProperty(SturdyWebSocket1.prototype,"bufferedAmount",{get:function(){var sum=this.ws?this.ws.bufferedAmount:0,hasUnknownAmount=!1;return this.messageBuffer.forEach(function(data){var byteLength="string"==typeof data?2*data.length:data instanceof ArrayBuffer?data.byteLength:data instanceof Blob?data.size:void 0;null!=byteLength?sum+=byteLength:hasUnknownAmount=!0}),hasUnknownAmount&&this.debugLog("Some buffered data had unknown length. bufferedAmount() return value may be below the correct amount."),sum},enumerable:!0,configurable:!0}),Object.defineProperty(SturdyWebSocket1.prototype,"extensions",{get:function(){return this.ws?this.ws.extensions:this.lastKnownExtensions},enumerable:!0,configurable:!0}),Object.defineProperty(SturdyWebSocket1.prototype,"protocol",{get:function(){return this.ws?this.ws.protocol:this.lastKnownProtocol},enumerable:!0,configurable:!0}),Object.defineProperty(SturdyWebSocket1.prototype,"readyState",{get:function(){return this.isClosed?SturdyWebSocket1.CLOSED:SturdyWebSocket1.OPEN},enumerable:!0,configurable:!0}),SturdyWebSocket1.prototype.close=function(code,reason){this.disposeSocket(code,reason),this.shutdown(),this.debugLog("WebSocket permanently closed by client.")},SturdyWebSocket1.prototype.send=function(data){if(this.isClosed)throw Error("WebSocket is already in CLOSING or CLOSED state.");this.ws&&this.ws.readyState===this.OPEN?this.ws.send(data):this.messageBuffer.push(data)},SturdyWebSocket1.prototype.reconnect=function(){if(this.isClosed)throw Error("Cannot call reconnect() on socket which is permanently closed.");this.disposeSocket(1e3,"Client requested reconnect."),this.handleClose(void 0)},SturdyWebSocket1.prototype.addEventListener=function(type,listener){this.listeners[type]||(this.listeners[type]=[]),this.listeners[type].push(listener)},SturdyWebSocket1.prototype.dispatchEvent=function(event){return this.dispatchEventOfType(event.type,event)},SturdyWebSocket1.prototype.removeEventListener=function(type,listener){this.listeners[type]&&(this.listeners[type]=this.listeners[type].filter(function(l){return l!==listener}))},SturdyWebSocket1.prototype.openNewWebSocket=function(){var _this=this;if(!this.isClosed){var _a=this.options,connectTimeout=_a.connectTimeout,wsConstructor=_a.wsConstructor;this.debugLog("Opening new WebSocket to "+this.url+".");var ws=new wsConstructor(this.url,this.protocols);ws.onclose=function(event){return _this.handleClose(event)},ws.onerror=function(event){return _this.handleError(event)},ws.onmessage=function(event){return _this.handleMessage(event)},ws.onopen=function(event){return _this.handleOpen(event)},this.connectTimeoutId=setTimeout(function(){_this.clearConnectTimeout(),_this.disposeSocket(),_this.handleClose(void 0)},connectTimeout),this.ws=ws}},SturdyWebSocket1.prototype.handleOpen=function(event){var _this=this;if(this.ws&&!this.isClosed){var allClearResetTime=this.options.allClearResetTime;this.debugLog("WebSocket opened."),null!=this.binaryTypeInternal?this.ws.binaryType=this.binaryTypeInternal:this.binaryTypeInternal=this.ws.binaryType,this.clearConnectTimeout(),this.hasBeenOpened?this.dispatchEventOfType("reopen",event):(this.dispatchEventOfType("open",event),this.hasBeenOpened=!0),this.messageBuffer.forEach(function(message){return _this.send(message)}),this.messageBuffer=[],this.allClearTimeoutId=setTimeout(function(){_this.clearAllClearTimeout(),_this.nextRetryTime=0,_this.reconnectCount=0,_this.debugLog("WebSocket remained open for "+(allClearResetTime/1e3|0)+" seconds. Resetting retry time and count.")},allClearResetTime)}},SturdyWebSocket1.prototype.handleMessage=function(event){this.isClosed||this.dispatchEventOfType("message",event)},SturdyWebSocket1.prototype.handleClose=function(event){var _this=this;if(!this.isClosed){var _a=this.options,maxReconnectAttempts=_a.maxReconnectAttempts,shouldReconnect=_a.shouldReconnect;if(this.clearConnectTimeout(),this.clearAllClearTimeout(),this.ws&&(this.lastKnownExtensions=this.ws.extensions,this.lastKnownProtocol=this.ws.protocol,this.disposeSocket()),this.dispatchEventOfType("down",event),this.reconnectCount>=maxReconnectAttempts){this.stopReconnecting(event,this.getTooManyFailedReconnectsMessage());return}var willReconnect=!event||shouldReconnect(event);"boolean"==typeof willReconnect?this.handleWillReconnect(willReconnect,event,"Provided shouldReconnect() returned false. Closing permanently."):willReconnect.then(function(willReconnectResolved){_this.isClosed||_this.handleWillReconnect(willReconnectResolved,event,"Provided shouldReconnect() resolved to false. Closing permanently.")})}},SturdyWebSocket1.prototype.handleError=function(event){this.dispatchEventOfType("error",event),this.debugLog("WebSocket encountered an error.")},SturdyWebSocket1.prototype.handleWillReconnect=function(willReconnect,event,denialReason){willReconnect?this.reestablishConnection():this.stopReconnecting(event,denialReason)},SturdyWebSocket1.prototype.reestablishConnection=function(){var _this=this,_a=this.options,minReconnectDelay=_a.minReconnectDelay,maxReconnectDelay=_a.maxReconnectDelay,reconnectBackoffFactor=_a.reconnectBackoffFactor;this.reconnectCount++;var retryTime=this.nextRetryTime;this.nextRetryTime=Math.max(minReconnectDelay,Math.min(this.nextRetryTime*reconnectBackoffFactor,maxReconnectDelay)),setTimeout(function(){return _this.openNewWebSocket()},retryTime),this.debugLog("WebSocket was closed. Re-opening in "+(retryTime/1e3|0)+" seconds.")},SturdyWebSocket1.prototype.stopReconnecting=function(event,debugReason){this.debugLog(debugReason),this.shutdown(),event&&this.dispatchEventOfType("close",event)},SturdyWebSocket1.prototype.shutdown=function(){this.isClosed=!0,this.clearAllTimeouts(),this.messageBuffer=[],this.disposeSocket()},SturdyWebSocket1.prototype.disposeSocket=function(closeCode,reason){this.ws&&(this.ws.onerror=noop,this.ws.onclose=noop,this.ws.onmessage=noop,this.ws.onopen=noop,this.ws.close(closeCode,reason),this.ws=void 0)},SturdyWebSocket1.prototype.clearAllTimeouts=function(){this.clearConnectTimeout(),this.clearAllClearTimeout()},SturdyWebSocket1.prototype.clearConnectTimeout=function(){null!=this.connectTimeoutId&&(clearTimeout(this.connectTimeoutId),this.connectTimeoutId=void 0)},SturdyWebSocket1.prototype.clearAllClearTimeout=function(){null!=this.allClearTimeoutId&&(clearTimeout(this.allClearTimeoutId),this.allClearTimeoutId=void 0)},SturdyWebSocket1.prototype.dispatchEventOfType=function(type,event){var _this=this;switch(type){case"close":this.onclose&&this.onclose(event);break;case"error":this.onerror&&this.onerror(event);break;case"message":this.onmessage&&this.onmessage(event);break;case"open":this.onopen&&this.onopen(event);break;case"down":this.ondown&&this.ondown(event);break;case"reopen":this.onreopen&&this.onreopen(event)}return type in this.listeners&&this.listeners[type].slice().forEach(function(listener){return _this.callListener(listener,event)}),!event||!event.defaultPrevented},SturdyWebSocket1.prototype.callListener=function(listener,event){"function"==typeof listener?listener.call(this,event):listener.handleEvent.call(this,event)},SturdyWebSocket1.prototype.debugLog=function(message){this.options.debug&&console.log(message)},SturdyWebSocket1.prototype.getTooManyFailedReconnectsMessage=function(){var s,maxReconnectAttempts=this.options.maxReconnectAttempts;return"Failed to reconnect after "+maxReconnectAttempts+" "+(s="attempt",1===maxReconnectAttempts?s:s+"s")+". Closing permanently."},SturdyWebSocket1.DEFAULT_OPTIONS={allClearResetTime:5e3,connectTimeout:5e3,debug:!1,minReconnectDelay:1e3,maxReconnectDelay:3e4,maxReconnectAttempts:Number.POSITIVE_INFINITY,reconnectBackoffFactor:1.5,shouldReconnect:function(){return!0},wsConstructor:void 0},SturdyWebSocket1.CONNECTING=0,SturdyWebSocket1.OPEN=1,SturdyWebSocket1.CLOSING=2,SturdyWebSocket1.CLOSED=3,SturdyWebSocket1}();function noop(){}exports.Z=SturdyWebSocket},45840:function(module,__unused_webpack_exports,__webpack_require__){if("object"==typeof globalThis)_globalThis=globalThis;else try{_globalThis=__webpack_require__(284)}catch(error){}finally{if(_globalThis||"undefined"==typeof window||(_globalThis=window),!_globalThis)throw Error("Could not determine global this")}var _globalThis,NativeWebSocket=_globalThis.WebSocket||_globalThis.MozWebSocket,websocket_version=__webpack_require__(79387);function W3CWebSocket(uri,protocols){return protocols?new NativeWebSocket(uri,protocols):new NativeWebSocket(uri)}NativeWebSocket&&["CONNECTING","OPEN","CLOSING","CLOSED"].forEach(function(prop){Object.defineProperty(W3CWebSocket,prop,{get:function(){return NativeWebSocket[prop]}})}),module.exports={w3cwebsocket:NativeWebSocket?W3CWebSocket:null,version:websocket_version}},79387:function(module,__unused_webpack_exports,__webpack_require__){module.exports=__webpack_require__(19794).version},19794:function(module){"use strict";module.exports={version:"1.0.34"}}}]);