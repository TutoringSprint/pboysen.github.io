!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){!function(root){"use strict";function Random(engine){if(!(this instanceof Random))return new Random(engine);if(null==engine)engine=Random.engines.nativeMath;else if("function"!=typeof engine)throw new TypeError("Expected engine to be a function, got "+typeof engine);this.engine=engine}function returnValue(value){return function(){return value}}function add(generate,addend){return 0===addend?generate:function(engine){return generate(engine)+addend}}function toInteger(value){var number=+value;return 0>number?Math.ceil(number):Math.floor(number)}function convertSliceArgument(value,length){return 0>value?Math.max(value+length,0):Math.min(value,length)}function returnUndefined(){}var GLOBAL_KEY="Random",imul="function"!=typeof Math.imul||-5!==Math.imul(4294967295,5)?function(a,b){var ah=a>>>16&65535,al=65535&a,bh=b>>>16&65535,bl=65535&b;return al*bl+(ah*bl+al*bh<<16>>>0)|0}:Math.imul,stringRepeat="function"==typeof String.prototype.repeat&&"xxx"==="x".repeat(3)?function(x,y){return x.repeat(y)}:function(pattern,count){for(var result="";count>0;)1&count&&(result+=pattern),count>>=1,pattern+=pattern;return result},proto=Random.prototype;Random.engines={nativeMath:function(){return 4294967296*Math.random()|0},mt19937:function(Int32Array){function refreshData(data){for(var k=0,tmp=0;227>(0|k);k=k+1|0)tmp=2147483648&data[k]|2147483647&data[k+1|0],data[k]=data[k+397|0]^tmp>>>1^(1&tmp?2567483615:0);for(;623>(0|k);k=k+1|0)tmp=2147483648&data[k]|2147483647&data[k+1|0],data[k]=data[k-227|0]^tmp>>>1^(1&tmp?2567483615:0);tmp=2147483648&data[623]|2147483647&data[0],data[623]=data[396]^tmp>>>1^(1&tmp?2567483615:0)}function temper(value){return value^=value>>>11,value^=value<<7&2636928640,value^=value<<15&4022730752,value^value>>>18}function seedWithArray(data,source){for(var i=1,j=0,sourceLength=source.length,k=0|Math.max(sourceLength,624),previous=0|data[0];(0|k)>0;--k)data[i]=previous=(data[i]^imul(previous^previous>>>30,1664525))+(0|source[j])+(0|j)|0,i=i+1|0,++j,(0|i)>623&&(data[0]=data[623],i=1),j>=sourceLength&&(j=0);for(k=623;(0|k)>0;--k)data[i]=previous=(data[i]^imul(previous^previous>>>30,1566083941))-i|0,i=i+1|0,(0|i)>623&&(data[0]=data[623],i=1);data[0]=2147483648}function mt19937(){function next(){(0|index)>=624&&(refreshData(data),index=0);var value=data[index];return index=index+1|0,uses+=1,0|temper(value)}var data=new Int32Array(624),index=0,uses=0;return next.getUseCount=function(){return uses},next.discard=function(count){for(uses+=count,(0|index)>=624&&(refreshData(data),index=0);count-index>624;)count-=624-index,refreshData(data),index=0;return index=index+count|0,next},next.seed=function(initial){var previous=0;data[0]=previous=0|initial;for(var i=1;624>i;i=i+1|0)data[i]=previous=imul(previous^previous>>>30,1812433253)+i|0;return index=624,uses=0,next},next.seedWithArray=function(source){return next.seed(19650218),seedWithArray(data,source),next},next.autoSeed=function(){return next.seedWithArray(Random.generateEntropyArray())},next}return mt19937}("function"==typeof Int32Array?Int32Array:Array),browserCrypto:"undefined"!=typeof crypto&&"function"==typeof crypto.getRandomValues&&"function"==typeof Int32Array?function(){var data=null,index=128;return function(){return index>=128&&(null===data&&(data=new Int32Array(128)),crypto.getRandomValues(data),index=0),0|data[index++]}}():null},Random.generateEntropyArray=function(){for(var array=[],engine=Random.engines.nativeMath,i=0;16>i;++i)array[i]=0|engine();return array.push(0|(new Date).getTime()),array},Random.int32=function(engine){return 0|engine()},proto.int32=function(){return Random.int32(this.engine)},Random.uint32=function(engine){return engine()>>>0},proto.uint32=function(){return Random.uint32(this.engine)},Random.uint53=function(engine){var high=2097151&engine(),low=engine()>>>0;return 4294967296*high+low},proto.uint53=function(){return Random.uint53(this.engine)},Random.uint53Full=function(engine){for(;;){var high=0|engine();if(!(2097152&high)){var low=engine()>>>0;return 4294967296*(2097151&high)+low}if(2097152===(4194303&high)&&0===(0|engine()))return 9007199254740992}},proto.uint53Full=function(){return Random.uint53Full(this.engine)},Random.int53=function(engine){var high=0|engine(),low=engine()>>>0;return 4294967296*(2097151&high)+low+(2097152&high?-9007199254740992:0)},proto.int53=function(){return Random.int53(this.engine)},Random.int53Full=function(engine){for(;;){var high=0|engine();if(!(4194304&high)){var low=engine()>>>0;return 4294967296*(2097151&high)+low+(2097152&high?-9007199254740992:0)}if(4194304===(8388607&high)&&0===(0|engine()))return 9007199254740992}},proto.int53Full=function(){return Random.int53Full(this.engine)},Random.integer=function(){function isPowerOfTwoMinusOne(value){return 0===(value+1&value)}function bitmask(masking){return function(engine){return engine()&masking}}function downscaleToLoopCheckedRange(range){var extendedRange=range+1,maximum=extendedRange*Math.floor(4294967296/extendedRange);return function(engine){var value=0;do value=engine()>>>0;while(value>=maximum);return value%extendedRange}}function downscaleToRange(range){return isPowerOfTwoMinusOne(range)?bitmask(range):downscaleToLoopCheckedRange(range)}function isEvenlyDivisibleByMaxInt32(value){return 0===(0|value)}function upscaleWithHighMasking(masking){return function(engine){var high=engine()&masking,low=engine()>>>0;return 4294967296*high+low}}function upscaleToLoopCheckedRange(extendedRange){var maximum=extendedRange*Math.floor(9007199254740992/extendedRange);return function(engine){var ret=0;do{var high=2097151&engine(),low=engine()>>>0;ret=4294967296*high+low}while(ret>=maximum);return ret%extendedRange}}function upscaleWithinU53(range){var extendedRange=range+1;if(isEvenlyDivisibleByMaxInt32(extendedRange)){var highRange=(extendedRange/4294967296|0)-1;if(isPowerOfTwoMinusOne(highRange))return upscaleWithHighMasking(highRange)}return upscaleToLoopCheckedRange(extendedRange)}function upscaleWithinI53AndLoopCheck(min,max){return function(engine){var ret=0;do{var high=0|engine(),low=engine()>>>0;ret=4294967296*(2097151&high)+low+(2097152&high?-9007199254740992:0)}while(min>ret||ret>max);return ret}}return function(min,max){if(min=Math.floor(min),max=Math.floor(max),-9007199254740992>min||!isFinite(min))throw new RangeError("Expected min to be at least -9007199254740992");if(max>9007199254740992||!isFinite(max))throw new RangeError("Expected max to be at most 9007199254740992");var range=max-min;return 0>=range||!isFinite(range)?returnValue(min):4294967295===range?0===min?Random.uint32:add(Random.int32,min+2147483648):4294967295>range?add(downscaleToRange(range),min):9007199254740991===range?add(Random.uint53,min):9007199254740991>range?add(upscaleWithinU53(range),min):max-1-min===9007199254740991?add(Random.uint53Full,min):-9007199254740992===min&&9007199254740992===max?Random.int53Full:-9007199254740992===min&&9007199254740991===max?Random.int53:-9007199254740991===min&&9007199254740992===max?add(Random.int53,1):9007199254740992===max?add(upscaleWithinI53AndLoopCheck(min-1,max-1),1):upscaleWithinI53AndLoopCheck(min,max)}}(),proto.integer=function(min,max){return Random.integer(min,max)(this.engine)},Random.realZeroToOneInclusive=function(engine){return Random.uint53Full(engine)/9007199254740992},proto.realZeroToOneInclusive=function(){return Random.realZeroToOneInclusive(this.engine)},Random.realZeroToOneExclusive=function(engine){return Random.uint53(engine)/9007199254740992},proto.realZeroToOneExclusive=function(){return Random.realZeroToOneExclusive(this.engine)},Random.real=function(){function multiply(generate,multiplier){return 1===multiplier?generate:0===multiplier?function(){return 0}:function(engine){return generate(engine)*multiplier}}return function(left,right,inclusive){if(!isFinite(left))throw new RangeError("Expected left to be a finite number");if(!isFinite(right))throw new RangeError("Expected right to be a finite number");return add(multiply(inclusive?Random.realZeroToOneInclusive:Random.realZeroToOneExclusive,right-left),left)}}(),proto.real=function(min,max,inclusive){return Random.real(min,max,inclusive)(this.engine)},Random.bool=function(){function isLeastBitTrue(engine){return 1===(1&engine())}function lessThan(generate,value){return function(engine){return generate(engine)<value}}function probability(percentage){if(0>=percentage)return returnValue(!1);if(percentage>=1)return returnValue(!0);var scaled=4294967296*percentage;return scaled%1===0?lessThan(Random.int32,scaled-2147483648|0):lessThan(Random.uint53,Math.round(9007199254740992*percentage))}return function(numerator,denominator){return null==denominator?null==numerator?isLeastBitTrue:probability(numerator):0>=numerator?returnValue(!1):numerator>=denominator?returnValue(!0):lessThan(Random.integer(0,denominator-1),numerator)}}(),proto.bool=function(numerator,denominator){return Random.bool(numerator,denominator)(this.engine)},Random.pick=function(engine,array,begin,end){var length=array.length,start=null==begin?0:convertSliceArgument(toInteger(begin),length),finish=void 0===end?length:convertSliceArgument(toInteger(end),length);if(!(start>=finish)){var distribution=Random.integer(start,finish-1);return array[distribution(engine)]}},proto.pick=function(array,begin,end){return Random.pick(this.engine,array,begin,end)};var slice=Array.prototype.slice;Random.picker=function(array,begin,end){var clone=slice.call(array,begin,end);if(!clone.length)return returnUndefined;var distribution=Random.integer(0,clone.length-1);return function(engine){return clone[distribution(engine)]}},Random.shuffle=function(engine,array,downTo){var length=array.length;if(length){null==downTo&&(downTo=0);for(var i=length-1>>>0;i>downTo;--i){var distribution=Random.integer(0,i),j=distribution(engine);if(i!==j){var tmp=array[i];array[i]=array[j],array[j]=tmp}}}return array},proto.shuffle=function(array){return Random.shuffle(this.engine,array)},Random.sample=function(engine,population,sampleSize){if(0>sampleSize||sampleSize>population.length||!isFinite(sampleSize))throw new RangeError("Expected sampleSize to be within 0 and the length of the population");if(0===sampleSize)return[];var clone=slice.call(population),length=clone.length;if(length===sampleSize)return Random.shuffle(engine,clone,0);var tailLength=length-sampleSize;return Random.shuffle(engine,clone,tailLength-1).slice(tailLength)},proto.sample=function(population,sampleSize){return Random.sample(this.engine,population,sampleSize)},Random.die=function(sideCount){return Random.integer(1,sideCount)},proto.die=function(sideCount){return Random.die(sideCount)(this.engine)},Random.dice=function(sideCount,dieCount){var distribution=Random.die(sideCount);return function(engine){var result=[];result.length=dieCount;for(var i=0;dieCount>i;++i)result[i]=distribution(engine);return result}},proto.dice=function(sideCount,dieCount){return Random.dice(sideCount,dieCount)(this.engine)},Random.uuid4=function(){function zeroPad(string,zeroCount){return stringRepeat("0",zeroCount-string.length)+string}return function(engine){var a=engine()>>>0,b=0|engine(),c=0|engine(),d=engine()>>>0;return zeroPad(a.toString(16),8)+"-"+zeroPad((65535&b).toString(16),4)+"-"+zeroPad((b>>4&4095|16384).toString(16),4)+"-"+zeroPad((16383&c|32768).toString(16),4)+"-"+zeroPad((c>>4&65535).toString(16),4)+zeroPad(d.toString(16),8)}}(),proto.uuid4=function(){return Random.uuid4(this.engine)},Random.string=function(){var DEFAULT_STRING_POOL="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";return function(pool){null==pool&&(pool=DEFAULT_STRING_POOL);var length=pool.length;if(!length)throw new Error("Expected pool not to be an empty string");var distribution=Random.integer(0,length-1);return function(engine,length){for(var result="",i=0;length>i;++i){var j=distribution(engine);result+=pool.charAt(j)}return result}}}(),proto.string=function(length,pool){return Random.string(pool)(this.engine,length)},Random.hex=function(){var LOWER_HEX_POOL="0123456789abcdef",lowerHex=Random.string(LOWER_HEX_POOL),upperHex=Random.string(LOWER_HEX_POOL.toUpperCase());return function(upper){return upper?upperHex:lowerHex}}(),proto.hex=function(length,upper){return Random.hex(upper)(this.engine,length)},Random.date=function(start,end){if(!(start instanceof Date))throw new TypeError("Expected start to be a Date, got "+typeof start);if(!(end instanceof Date))throw new TypeError("Expected end to be a Date, got "+typeof end);var distribution=Random.integer(start.getTime(),end.getTime());return function(engine){return new Date(distribution(engine))}},proto.date=function(start,end){return Random.date(start,end)(this.engine)},"function"==typeof define&&define.amd?define(function(){return Random}):"undefined"!=typeof module&&"function"==typeof require?module.exports=Random:(!function(){var oldGlobal=root[GLOBAL_KEY];Random.noConflict=function(){return root[GLOBAL_KEY]=oldGlobal,this}}(),root[GLOBAL_KEY]=Random)}(this)},{}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function toRadians(degree){return degree*(Math.PI/180)}function randomBetween(min,max){return random.integer(min,max)}function dotProduct(ax,ay,bx,by){return ax*bx+ay*by}function activeWater(){for(var cnt=0,i=maxAtoms;i<particles.length;i++)particles[i].condensed||cnt++;return cnt}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Random=require("prosemirror/node_modules/random-js");createjs.MotionGuidePlugin.install();var maxAtoms=100,initialSpeed=2,framerate=60,startWater=2,particles=[],water_level=120,random=new Random(Random.engines.mt19937().autoSeed()),Particle=function(){function Particle(burner,r,color){_classCallCheck(this,Particle),this.burner=burner,this.r=r,this.mass=this.r*this.r,this.dot=new createjs.Shape,this.dot.graphics.beginStroke("#666").beginFill(color).setStrokeStyle(1).drawCircle(0,0,r).endStroke(),this.condensed=!1}return _createClass(Particle,[{key:"place",value:function(vapor){var ty=vapor?118:randomBetween(0,water_level);this.x=randomBetween(190-ty/2,210+ty/2),this.y=ty+120,this.dx=initialSpeed*(random.real(0,1)-.5)/this.r,vapor?this.dy=-.3:this.dy=initialSpeed*(random.real(0,1)-.5)/this.r,this.bounce(),this.move()}},{key:"move",value:function(){this.x+=this.dx,this.y+=this.dy,this.dot.x=this.x,this.dot.y=this.y}},{key:"bounce",value:function(){var dx=(this.y-120)/2;this.x<186-dx?(wall.set(184-dx,this.y),this.collide(wall)):this.x>214+dx&&(wall.set(216+dx,this.y),this.collide(wall)),this.y<=122?(this.y=122,this.dy?this.dy*=-1:this.dy=.2):this.y>=236&&(this.y=236,this.dy?this.dy*=-1:this.dy=-.2,this.burner.isOn()&&(this.dx+=this.dx>0?.2:-.2,this.dy-=.2),this.r>1&&this.condense())}},{key:"collide",value:function(that){if(!that.condensed){var dx=this.x-that.x,dy=this.y-that.y,dr=this.r+that.r,d=dx*dx+dy*dy;if(!(d>=dr*dr)){var collisionDist=Math.sqrt(d+.1),collisionVi=dx/collisionDist,collisionVj=dy/collisionDist,collisionV1=dotProduct(this.dx,this.dy,dx,dy)/collisionDist,collisionV2=dotProduct(that.dx,that.dy,dx,dy)/collisionDist,perpV1=dotProduct(this.dx,this.dy,-dy,dx)/collisionDist,perpV2=dotProduct(that.dx,that.dy,-dy,dx)/collisionDist,sumMass=this.mass+that.mass,diffMass=this.mass-that.mass,v1p=(diffMass*collisionV1+2*that.mass*collisionV2)/sumMass,v2p=(2*this.mass*collisionV1-diffMass*collisionV2)/sumMass;this.dx=v1p*collisionVi-perpV1*collisionVj,this.dy=v1p*collisionVj+perpV1*collisionVi,that.dx=v2p*collisionVi-perpV2*collisionVj,that.dy=v2p*collisionVj+perpV2*collisionVi;var overlap=dr+1-collisionDist,p1=overlap*that.mass/sumMass,p2=overlap*this.mass/sumMass;this.x+=collisionVi*p1,this.y+=collisionVj*p1,that.x-=collisionVi*p2,that.y-=collisionVj*p2}}}},{key:"condense",value:function(){this.condensed=!0,this.dot.y=1e3}},{key:"evaporate",value:function(){this.condensed=!1,this.y=234,this.x=randomBetween(130,270),this.dy=-.3,this.move()}}]),Particle}(),Wall=function(){function Wall(){_classCallCheck(this,Wall),this.x=0,this.y=0,this.dx=0,this.dy=0,this.r=1,this.mass=1e6,this.condensed=!1}return _createClass(Wall,[{key:"set",value:function(x,y){this.x=x,this.y=y,this.dx=200>x?.05:-.05,this.dy=.05}}]),Wall}(),wall=new Wall,Thermometer=function(){function Thermometer(stage,x,y){_classCallCheck(this,Thermometer),this.y=y,this.tube=new createjs.Shape,this.tube.graphics.beginStroke("#000").beginFill("#FFF").drawRect(x,y,6,100).endStroke(),this.bulb=new createjs.Shape,this.bulb.graphics.beginStroke("#000").beginFill("#F00").drawCircle(x+3,y+105,8).endStroke(),this.fluid=new createjs.Shape,this.fluid.graphics.beginStroke("#000").beginFill("#F00").drawRect(x+1,y+50,4,50).endStroke(),this.fluid.setBounds(x+1,y+50,4,50),this.warn=new createjs.Text("Overheating...please reset","14px Arial","#C00"),this.warn.x=700,this.warn.y=10,stage.addChild(this.tube),stage.addChild(this.bulb),stage.addChild(this.fluid);for(var h=0;100>h;h+=10){var hash=new createjs.Shape;hash.graphics.beginStroke("#888").setStrokeStyle(1).moveTo(x,y+h).lineTo(x+6,y+h).endStroke(),stage.addChild(hash)}stage.addChild(this.warn)}return _createClass(Thermometer,[{key:"heat",value:function(){var r=this.fluid.getBounds();this.fluid.graphics.clear().beginStroke("#000").beginFill("#F00").drawRect(r.x,r.y-1,r.width,r.height+1).endStroke(),this.fluid.setBounds(r.x,r.y-1,r.width,r.height+1)}},{key:"getTemp",value:function(){return this.fluid.getBounds().height}},{key:"overheat",value:function(){return this.fluid.getBounds().y<=this.y?(this.warn.x=100,this.warn.y=10,!0):!1}}]),Thermometer}(),Gauge=function(){function Gauge(stage,x,y){_classCallCheck(this,Gauge),this.angle=toRadians(270),this.x=x,this.y=y,this.face=new createjs.Shape,this.face.graphics.beginStroke("#000").beginFill("#FFF").drawCircle(x,y,15).endStroke(),this.tube=new createjs.Shape,this.tube.graphics.beginStroke("#000").drawRect(x-5,y,6,80).endStroke(),this.arrow=new createjs.Shape,this.arrow.graphics.beginStroke("#080").setStrokeStyle(2).moveTo(this.x,this.y).lineTo(this.x,this.y-15).endStroke(),stage.addChild(this.tube),stage.addChild(this.face);for(var i=0;360>i;i+=30){var rad=toRadians(270+i),sx=this.x+12*Math.cos(rad),sy=this.y+12*Math.sin(rad),_x=this.x+15*Math.cos(rad),_y=this.y+15*Math.sin(rad),hash=new createjs.Shape;hash.graphics.beginStroke("#000").setStrokeStyle(1).moveTo(sx,sy).lineTo(_x,_y).endStroke(),stage.addChild(hash)}stage.addChild(this.arrow)}return _createClass(Gauge,[{key:"update",value:function(){var value=Math.floor(activeWater()/2);this.angle=toRadians(270+value);var x=this.x+15*Math.cos(this.angle),y=this.y+15*Math.sin(this.angle);this.arrow.graphics.clear().beginStroke("#080").setStrokeStyle(2).moveTo(this.x,this.y).lineTo(x,y).endStroke()}}]),Gauge}(),Beaker=function(){function Beaker(stage,burner,x,y){_classCallCheck(this,Beaker),this.stage=stage,this.burner=burner,this.beaker=new createjs.Shape,this.beaker.graphics.ss(1).beginStroke("#000").beginFill("#87CEFA").mt(x-20,y).lt(x-20,y+20).arcTo(x-100,y+200,x,y+200,10).lt(x+50,y+200).arcTo(x+100,y+200,x+20,y+20,10).lt(x+20,y+20).lt(x+20,y).endStroke(),this.beaker.alpha=.6,this.water=new createjs.Shape,this.water.graphics.ss(1).beginFill("#87CEFA").mt(x-73,y+140).lt(x-80,y+160).arcTo(x-100,y+200,x,y+200,10).lt(x+50,y+200).arcTo(x+100,y+200,x+20,y+20,10).lt(x+73,y+140).endStroke(),this.stopper=new createjs.Shape,this.stopper.graphics.beginFill("#008").drawRect(x-18,y-5,36,22).endStroke(),stage.addChild(this.stopper),stage.addChild(this.beaker),stage.addChild(this.water)}return _createClass(Beaker,[{key:"addParticle",value:function(r,color,vapor){var p=new Particle(this.burner,r,color);return p.place(vapor),particles.push(p),this.stage.addChild(p.dot),p}},{key:"populate",value:function(){for(var i=0;maxAtoms>i;i++)this.addParticle(1,"#444",!1);for(var i=0;startWater>i;i++)this.addParticle(2,"#FFF",!1)}},{key:"update",value:function(){for(var i=0;i<particles.length;i++){var p=particles[i];if(!p.condensed)for(var j=i+1;j<particles.length;j++)p.collide(particles[j])}particles.forEach(function(p){p.condensed||(p.move(),p.bounce())})}}]),Beaker}(),Bunsen=function(){function Bunsen(stage,x,y){_classCallCheck(this,Bunsen),this.bunsen=new createjs.Bitmap("assets/bunsen.png"),this.bunsen.x=x,this.bunsen.y=y,this.bunsen.scaleX=.3,this.bunsen.scaleY=.15,this.flamecover=new createjs.Shape,this.flamecover.graphics.beginFill("#FFF").drawRect(x,y,100,35).endStroke(),stage.addChild(this.bunsen),stage.addChild(this.flamecover)}return _createClass(Bunsen,[{key:"toggle",value:function(){this.flamecover.alpha=this.flamecover.alpha?0:1}},{key:"isOn",value:function(){return 0==this.flamecover.alpha}}]),Bunsen}(),Buttons=function(){function Buttons(listener){_classCallCheck(this,Buttons),this.run=document.getElementById("run"),this.burner=document.getElementById("burner"),this.reset=document.getElementById("reset"),this.run.addEventListener("click",function(){return listener.press("run")}),this.burner.addEventListener("click",function(){return listener.press("burner")}),this.reset.addEventListener("click",function(){return listener.press("reset")})}return _createClass(Buttons,[{key:"disableBurner",value:function(value){this.burner.disabled=value}}]),Buttons}(),VaporSim=function(){function VaporSim(){_classCallCheck(this,VaporSim),this.mainstage=new createjs.Stage("maincanvas"),this.buttons=new Buttons(this),this.running=!1}return _createClass(VaporSim,[{key:"render",value:function(){this.gauge=new Gauge(this.mainstage,210,70),this.thermometer=new Thermometer(this.mainstage,190,30),this.bunsen=new Bunsen(this.mainstage,150,302),this.beaker=new Beaker(this.mainstage,this.bunsen,200,100),this.beaker.populate(),this.beaker.update(),this.gauge.update(),this.mainstage.update()}},{key:"getParticle",value:function(){for(var i=maxAtoms;i<particles.length;i++)if(particles[i].condensed)return particles[i];return this.beaker.addParticle(2,"#FFF",!0)}},{key:"evaporate",value:function(){for(var inc=this.thermometer.getTemp()-49,i=0;inc>i;i++)this.getParticle().evaporate()}},{key:"run",value:function(){var _this=this;this.render(),createjs.Ticker.framerate=framerate;var tick=0;createjs.Ticker.addEventListener("tick",function(e){if(_this.running){for(var i=0;2>i;i++)_this.beaker.update();_this.mainstage.update(),tick%framerate==0&&(_this.bunsen.isOn()&&_this.heat(),_this.evaporate(),_this.gauge.update()),tick++}})}},{key:"reset",value:function(){this.running=!1,this.mainstage.removeAllChildren(),particles=[],this.render(),this.buttons.disableBurner(!0)}},{key:"heat",value:function(){this.thermometer.overheat()?this.bunsen.toggle():this.thermometer.heat()}},{key:"press",value:function(cmd){"run"==cmd&&(this.running=!0,this.buttons.disableBurner(!1)),"burner"==cmd&&this.bunsen.toggle(),"reset"==cmd&&this.reset()}}]),VaporSim}();(new VaporSim).run()},{"prosemirror/node_modules/random-js":1}]},{},[2]);