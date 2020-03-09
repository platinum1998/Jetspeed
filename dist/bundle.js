!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.map={},e}();t.Globals=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.initialise=function(t,n,o){e.camObj=new BABYLON.FreeCamera("cam1",t,n),e.camObj.setTarget(new BABYLON.Vector3(0,6,0)),e.camObj.attachControl(o,!0),e.camObj.inputs.clear(),e.camObj.fov=-80},e.prototype.update=function(e){},e}();t.PerspCamera=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=function(){function e(){}return e.LoadContent=function(){var t=new BABYLON.AssetsManager(o.Globals._scene);e.MeshList=t.addMeshTask("ship_instance","","assets/geometry/","jet_rxtz.babylon"),e.MatList.set("Hoop Material",new BABYLON.StandardMaterial("hoopMat",o.Globals._scene)),e.MatList.set("Ship Material",new BABYLON.StandardMaterial("shipMat",o.Globals._scene)),e.MatList.get("Hoop Material").diffuseColor=new BABYLON.Color3(1,0,1),e.MatList.get("Hoop Material").emissiveColor=new BABYLON.Color3(1,0,1),e.MatList.get("Ship Material").diffuseColor=new BABYLON.Color3(1,.98,.95),e.MatList.get("Ship Material").specularColor=new BABYLON.Color3(0,0,0),t.load()},e.GetMaterialByName=function(t){return e.MatList.get(t)},e.MatList=new Map,e}();t.Content=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2),r=function(){function e(){}return e.Initialise=function(e,t,n,r){var i=BABYLON.MeshBuilder.CreateTorus("ring",{thickness:.06},r);i.position=new BABYLON.Vector3(0,-2,100),i.scaling=new BABYLON.Vector3(20,20,20),i.rotation=new BABYLON.Vector3(1.5,0,0),i.checkCollisions=!0,i.material=o.Content.GetMaterialByName("Hoop Material");for(var a=0;a<e;a++){var s=i.createInstance("hoop"+a);s.position.x=BABYLON.Scalar.RandomRange(t,50)+a,s.position.y=1,s.position.z=BABYLON.Scalar.RandomRange(-50,n)+a,s.checkCollisions=!0,this.hoops.push(s)}},e.hoops=new Array,e}();t.BonusGenerator=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=function(){function e(){}return e.UpdateInput=function(){o.Globals._scene.onKeyboardObservable.add((function(t){switch(t.type){case BABYLON.KeyboardEventTypes.KEYDOWN:"a"==t.event.key&&(e.a_key=!0),"d"==t.event.key&&(e.d_key=!0);break;case BABYLON.KeyboardEventTypes.KEYUP:e.a_key=!1,e.d_key=!1}}))},e}();t.Input=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),r=n(0),i=n(4),a=n(10),s=function(){function e(e){this._canvas=document.getElementById(e),this._engine=new BABYLON.Engine(this._canvas,!0),r.Globals._scene=new BABYLON.Scene(this._engine)}return e.prototype.initialise=function(){var e=this;r.Globals.idle=!0,i.Input.UpdateInput(),this._state_manager=new a.StateManager,o.World.initialise(r.Globals._scene,this._canvas);r.Globals._scene.registerBeforeRender((function(){e._delta=e._engine.getDeltaTime(),e._state_manager.update(e._delta),o.World.update(e._delta)}))},e.prototype.playLoop=function(){var e=this;this._engine.runRenderLoop((function(){r.Globals._scene.clearColor=new BABYLON.Color4(1,.9,.8,1),r.Globals._scene.render()})),window.addEventListener("resize",(function(){e._engine.resize()}))},e}();window.addEventListener("DOMContentLoaded",(function(){var e=new s("renderCanvas");e.initialise(),e.playLoop()}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=n(7),i=n(9),a=n(3),s=n(2),c=n(0),u=function(){function e(){}return e.initialise=function(t,n){var c=new BABYLON.AssetsManager(t);s.Content.LoadContent(),o.PerspCamera.initialise(new BABYLON.Vector3(0,8,-31),t,n),new BABYLON.HemisphericLight("light",new BABYLON.Vector3(.25,.75,-.25),t).intensity=1,this.player=new r.Player(t,2.5),i.BlockGenerator.Initialise(t,c,e.blocks),c.load(),a.BonusGenerator.Initialise(1,-50,1e3,t);new BABYLON.Sound("Soundtrack","assets/audio/SoundTrack.wav",t,null,{loop:!0,autoplay:!0});t.fogMode=BABYLON.Scene.FOGMODE_LINEAR,t.fogDensity=.05,t.fogStart=5,t.fogEnd=900,t.fogColor=new BABYLON.Color3(1,.9,.8)},e.update=function(e){c.Globals.idle?o.PerspCamera.camObj.position.z+=.3:(this.player.update(e),o.PerspCamera.camObj.position.z+=7)},e}();t.World=u},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(8),a=n(0),s=n(3),c=n(4),u=n(2),l=n(1),p=function(e){function t(t,n){var o=e.call(this,new BABYLON.Vector3(0,-1,10))||this;o.distance=0,o.speed=n,o.currentDirection=0;var r;return u.Content.MeshList.onSuccess=function(e){(r=e.loadedMeshes[0]).material=u.Content.GetMaterialByName("Ship Material"),r.position.x=0,r.position.y=-1,r.position.z=-14,r.scaling.x=100,r.scaling.y=100,r.scaling.z=100,a.Globals._scene.registerBeforeRender((function(){a.Globals.idle?(r.position.z+=.3,r.position=BABYLON.Vector3.Lerp(r.position,new BABYLON.Vector3(-10,r.position.y,r.position.z),.01),r.position.x<=-10&&(r.position=BABYLON.Vector3.Lerp(r.position,new BABYLON.Vector3(10,r.position.y,r.position.z),.01))):r.position.z+=7;for(var e=0;e<s.BonusGenerator.hoops.length;e++)r.intersectsMesh(s.BonusGenerator.hoops[e]);c.Input.a_key&&(r.position.x-=2.5,r.rotation=BABYLON.Vector3.Lerp(r.rotation,new BABYLON.Vector3(0,0,.8),.3),l.PerspCamera.camObj.rotation.z=BABYLON.Scalar.Lerp(l.PerspCamera.camObj.rotation.z,BABYLON.Tools.ToRadians(4),.1)),c.Input.d_key?(r.position.x+=2.5,r.rotation=BABYLON.Vector3.Lerp(r.rotation,new BABYLON.Vector3(0,0,-.8),.3),l.PerspCamera.camObj.rotation.z=BABYLON.Scalar.Lerp(l.PerspCamera.camObj.rotation.z,BABYLON.Tools.ToRadians(-4),.1)):(r.rotation=BABYLON.Vector3.Lerp(r.rotation,new BABYLON.Vector3(0,0,0),.2),l.PerspCamera.camObj.rotation.z=BABYLON.Scalar.Lerp(l.PerspCamera.camObj.rotation.z,BABYLON.Tools.ToRadians(0),.1)),l.PerspCamera.camObj.position.x=r.position.x}))},o}return r(t,e),t.prototype.update=function(e){},t}(i.Entity);t.Player=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){this.PLAYER=0,this.BLOCK=1,this.LOOP=2,this.PICKUP=3,this.type=0};t.Entity=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),r=function(){function e(){}return e.probability=function(e){return!!e&&Math.random()<=e},e.BlockWithinRange=function(e,t,n){return t-e<=n},e.BlockRotateFront=function(e,t,n,o){for(var r=0;r<4;r++);},e.GetBlockLeftMostX=function(e){for(var t=0;t<16;t++);},e.Initialise=function(t,n,r){var i=this;n.addMeshTask("block task","","assets/geometry/","block.babylon").onSuccess=function(n){var r=n.loadedMeshes[0];r.applyFog=!0,r.isVisible=!1,r.setPivotPoint(new BABYLON.Vector3(0,-.005,0)),r.scaling=new BABYLON.Vector3(6e3,6e3,6e3),r.position=new BABYLON.Vector3(-20,-50,100);for(var a=[],s=0;s<16;s++)for(var c=0;c<4;c++)a.push(r.instantiateHierarchy()),a[a.length-1].position.x=60*c-120,a[a.length-1].position.z=60*s,i.probability(.97)?a[a.length-1].scaling.y=BABYLON.Scalar.RandomRange(10,3e3):a[a.length-1].scaling.y=8e4;var u=0,l=a[a.length-1].position.z-60;t.registerBeforeRender((function(){var t=o.PerspCamera.camObj.position.z;o.PerspCamera.camObj.position.x;if(console.log(a.length),!0===e.BlockWithinRange(t,l,500)){for(var n=0;n<15;n++)a[n+4*u].position.z=l;l+=60,u>=16?u=0:u++}}))}},e}();t.BlockGenerator=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(11),r=n(0),i=function(){function e(){this.states=new Array,this.currentState=1,this.states.push(new o.Menu)}return e.prototype.update=function(e){switch(this.currentState){case 0:break;case 1:this.states[0].render(),this.states[0].nextState&&(this.currentState=2);break;case 2:r.Globals.idle=!1}},e}();t.StateManager=i},function(e,t,n){"use strict";var o,r=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),a=n(0),s=function(e){function t(){var t=e.call(this)||this;return t.nextState=!1,t.ui_interface=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"),t.logo=new BABYLON.GUI.TextBlock,t.logo.text="JetSpeed",t.logo.color="black",t.logo.fontSize=100,t.logo.top=-300,t.tap=new BABYLON.GUI.TextBlock,t.tap.text="TAP",t.tap.color="black",t.tap.fontSize=50,t.tap.top=320,t}return r(t,e),t.prototype.render=function(){var e=this;a.Globals._scene.onPointerObservable.add((function(t){switch(t.type){case BABYLON.PointerEventTypes.POINTERDOWN:e.nextState=!0,e.ui_interface.dispose()}})),this.ui_interface.addControl(this.logo),this.ui_interface.addControl(this.tap)},t}(i.State);t.Menu=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.prototype.update=function(){},e.prototype.render=function(){},e}();t.State=o}]);