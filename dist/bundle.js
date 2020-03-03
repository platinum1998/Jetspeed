!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(2),o=n(3),a=n(5),c=function(){function e(e){this._canvas=document.getElementById(e),this._engine=new BABYLON.Engine(this._canvas,!0),this._scene=new BABYLON.Scene(this._engine)}return e.prototype.initialise=function(){var e=this,t={};this._scene.actionManager=new BABYLON.ActionManager(this._scene),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),i.GUI.create(),this._cam=new r.PerspCamera(new BABYLON.Vector3(0,8,-30),this._scene,this._canvas),new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,0),this._scene).intensity=.7,this._player=new o.Player(this._scene,.03);var n=new BABYLON.ParticleSystem("particles",1100,this._scene);n.particleTexture=new BABYLON.Texture("assets/flare.png",this._scene),n.emitter=this._player.playerCharacter,n.minEmitBox=new BABYLON.Vector3(-1,0,0),n.maxEmitBox=new BABYLON.Vector3(1,0,0),n.minSize=.5,n.maxSize=.7,n.minLifeTime=.3,n.maxLifeTime=.4,n.emitRate=1500,n.blendMode=BABYLON.ParticleSystem.BLENDMODE_ONEONE,n.direction1=new BABYLON.Vector3(0,0,-3),n.direction2=new BABYLON.Vector3(0,0,-3),n.minAngularSpeed=0,n.maxAngularSpeed=Math.PI,n.minEmitPower=1,n.maxEmitPower=3,n.updateSpeed=.03,n.start(),a.World.generate(this._scene,this._player);this._scene.registerBeforeRender((function(){e._delta=e._engine.getDeltaTime(),e._player.update(e._delta),e._cam.camObj.position.x=e._player.playerCharacter.position.x,e._cam.camObj.position.z+=.08*e._delta,t.a||t.A?e._player.setCurrentDirection(-1):t.d||t.D?e._player.setCurrentDirection(1):e._player.setCurrentDirection(0)}))},e.prototype.playLoop=function(){var e=this,t=this;this._engine.runRenderLoop((function(){e._scene.clearColor=new BABYLON.Color4(1,.9,.8,1),t._scene.render()})),window.addEventListener("resize",(function(){t._engine.resize()}))},e}();window.addEventListener("DOMContentLoaded",(function(){var e=new c("renderCanvas");e.initialise(),e.playLoop()}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t,n){this.camObj=new BABYLON.FreeCamera("cam1",e,t),this.camObj.setTarget(new BABYLON.Vector3(0,6,0)),this.camObj.attachControl(n,!0),this.camObj.inputs.clear()}return e.prototype.update=function(e){},e}();t.PerspCamera=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.create=function(){var e=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");this.distance_travelled=new BABYLON.GUI.TextBlock,this.distance_travelled.text="0m",this.distance_travelled.color="black",this.distance_travelled.fontSize=50,this.distance_travelled.alpha=.5,this.distance_travelled.top=-350,e.addControl(this.distance_travelled)},e}();t.GUI=r},function(e,t,n){"use strict";var r,i=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,n){var r=e.call(this,new BABYLON.Vector3(0,-1,10))||this;return r.speed=n,r.currentDirection=0,r.playerCharacter=r.mesh,r.playerCharacter=BABYLON.MeshBuilder.CreateBox("player",{width:2.25,height:.8,depth:9},t),r.playerCharacter.position.x=0,r.playerCharacter.position.y=-1,r.playerCharacter.position.z=10,r}return i(t,e),t.prototype.setCurrentDirection=function(e){this.currentDirection=e},t.prototype.update=function(e){this.playerCharacter.position.z+=.08*e,-1==this.currentDirection&&(this.playerCharacter.position.x-=this.speed*e,this.playerCharacter.rotation=BABYLON.Vector3.Lerp(this.playerCharacter.rotation,new BABYLON.Vector3(0,0,.5),.01*e)),1==this.currentDirection?(this.playerCharacter.position.x+=this.speed*e,this.playerCharacter.rotation=BABYLON.Vector3.Lerp(this.playerCharacter.rotation,new BABYLON.Vector3(0,0,-.5),.015*e)):0==this.currentDirection&&(this.playerCharacter.rotation=BABYLON.Vector3.Lerp(this.playerCharacter.rotation,new BABYLON.Vector3(0,0,0),.01*e))},t}(n(4).Entity);t.Player=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){this.type=0};t.Entity=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t,n,r,i){this.min=r,this.max=t;var o=BABYLON.MeshBuilder.CreateBox("tower",{width:5,height:5,depth:5},i);o.position.x=0,o.position.y=0,o.position.z=100,o.scaling.y=n;for(var a=0;a<e;a++){var c=o.createInstance("tower"+a);c.position.x=BABYLON.Scalar.RandomRange(r,100),c.position.z=BABYLON.Scalar.RandomRange(-100,t),c.scaling.y=BABYLON.Scalar.RandomRange(500,1e3)}},i=function(){function e(){}return e.generate=function(e,t){e.fogMode=BABYLON.Scene.FOGMODE_LINEAR,e.fogDensity=.03,e.fogStart=5,e.fogEnd=150,e.fogColor=new BABYLON.Color3(1,.9,.8),this._chunks.push(new r(200,1e3,1e3,-100,e))},e._chunks=new Array,e}();t.World=i}]);