<<<<<<< HEAD
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n(2),r=function(){function e(e){this._canvas=document.getElementById(e),this._engine=new BABYLON.Engine(this._canvas,!0),this._scene=new BABYLON.Scene(this._engine)}return e.prototype.initialise=function(){var e=this,t={};this._scene.actionManager=new BABYLON.ActionManager(this._scene),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),o.GUI.create(),i.World.initialise(this._scene,this._canvas);var n=new BABYLON.AssetsManager(this._scene),r=n.addMeshTask("block_instance","","assets/geometry/","jet_rxtz.babylon");n.load();this._scene.registerBeforeRender((function(){var n;e._delta=e._engine.getDeltaTime(),i.World.update(e._delta),r.onSuccess=function(o){(n=o.loadedMeshes[0]).position.x=0,n.position.y=-1,n.position.z=-14,n.scaling.x=100,n.scaling.y=100,n.scaling.z=100,e._scene.registerBeforeRender((function(){n.position.z+=.8,(t.a||t.A)&&(n.position.x-=.3,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,.5),.1)),t.d||t.D?(n.position.x+=.3,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,-.5),.1)):n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,0),.1),i.World.camera.camObj.position.x=n.position.x}))}}))},e.prototype.playLoop=function(){var e=this,t=this;this._engine.runRenderLoop((function(){e._scene.clearColor=new BABYLON.Color4(1,.9,.8,1),t._scene.render()})),window.addEventListener("resize",(function(){t._engine.resize()}))},e}();window.addEventListener("DOMContentLoaded",(function(){var e=new r("renderCanvas");e.initialise(),e.playLoop()}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.create=function(){var e=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");this.distance_travelled=new BABYLON.GUI.TextBlock,this.distance_travelled.text="0m",this.distance_travelled.color="black",this.distance_travelled.fontSize=50,this.distance_travelled.alpha=.5,this.distance_travelled.top=-350,e.addControl(this.distance_travelled)},e}();t.GUI=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(4),r=function(){function e(){}return e.initialise=function(t,n){var r=new BABYLON.AssetsManager(t);this.camera=new o.PerspCamera(new BABYLON.Vector3(0,8,-30),t,n),new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,-.5),t).intensity=1,t.fogMode=BABYLON.Scene.FOGMODE_LINEAR,t.fogDensity=.03,t.fogStart=5,t.fogEnd=150,t.fogColor=new BABYLON.Color3(1,.9,.8),i.BlockGenerator.Initialise(t,r,e.blocks),r.load()},e.update=function(e){this.camera.camObj.position.z+=.8},e}();t.World=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,n){this.camObj=new BABYLON.FreeCamera("cam1",e,t),this.camObj.setTarget(new BABYLON.Vector3(0,6,0)),this.camObj.attachControl(n,!0),this.camObj.inputs.clear(),this.camObj.fov=-80}return e.prototype.update=function(e){},e}();t.PerspCamera=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.probability=function(e){return!!e&&Math.random()<=e},e.BlockWithinRangeZ=function(e,t,n){return Math.floor(Math.abs(t-e))<=n},e.Initialise=function(e,t,n){t.addMeshTask("piano task","","assets/geometry/","block.babylon").onSuccess=function(t){var n=t.loadedMeshes[0];n.position.x=-20,n.position.y=0,n.position.z=100,n.setPivotPoint(new BABYLON.Vector3(0,-.005,0)),n.scaling.x=500,n.scaling.y=500,n.scaling.z=500;for(var o=0;o<10;o++)(void 0).push(n.instantiateHierarchy()),(void 0)[o].position.x=(void 0)[o].position.x+5;e.registerBeforeRender((function(){n.scaling.y+=10}))}},e.GenerateBlocksRealtime=function(t,n,o,i,r,a,c,s,u){if(e.BlockWithinRangeZ(o,s,t))for(var l=0;l<i;l++);},e}();t.BlockGenerator=o}]);
=======
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n(2),r=function(){function e(e){this._canvas=document.getElementById(e),this._engine=new BABYLON.Engine(this._canvas,!0),this._scene=new BABYLON.Scene(this._engine)}return e.prototype.initialise=function(){var e=this,t={};this._scene.actionManager=new BABYLON.ActionManager(this._scene),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),o.GUI.create(),i.World.initialise(this._scene,this._canvas);var n=new BABYLON.AssetsManager(this._scene),r=n.addMeshTask("block_instance","","assets/geometry/","jet_rxtz.babylon");n.load();this._scene.registerBeforeRender((function(){var n;e._delta=e._engine.getDeltaTime(),i.World.update(e._delta),r.onSuccess=function(o){(n=o.loadedMeshes[0]).position.x=0,n.position.y=-1,n.position.z=-14,n.scaling.x=100,n.scaling.y=100,n.scaling.z=100,e._scene.registerBeforeRender((function(){n.position.z+=.8,(t.a||t.A)&&(n.position.x-=.5,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,.5),.15)),t.d||t.D?(n.position.x+=.5,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,-.5),.15)):n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,0),.15),i.World.camera.camObj.position.x=n.position.x}))}}))},e.prototype.playLoop=function(){var e=this,t=this;this._engine.runRenderLoop((function(){e._scene.clearColor=new BABYLON.Color4(1,.9,.8,1),t._scene.render()})),window.addEventListener("resize",(function(){t._engine.resize()}))},e}();window.addEventListener("DOMContentLoaded",(function(){var e=new r("renderCanvas");e.initialise(),e.playLoop()}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.create=function(){var e=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");this.distance_travelled=new BABYLON.GUI.TextBlock,this.distance_travelled.text="0m",this.distance_travelled.color="black",this.distance_travelled.fontSize=50,this.distance_travelled.alpha=.5,this.distance_travelled.top=-350,e.addControl(this.distance_travelled)},e}();t.GUI=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(4),r=function(){function e(){}return e.initialise=function(t,n){var r=new BABYLON.AssetsManager(t);this.camera=new o.PerspCamera(new BABYLON.Vector3(0,8,-30),t,n),new BABYLON.HemisphericLight("light",new BABYLON.Vector3(0,1,-.5),t).intensity=1,t.fogMode=BABYLON.Scene.FOGMODE_LINEAR,t.fogDensity=.03,t.fogStart=5,t.fogEnd=150,t.fogColor=new BABYLON.Color3(1,.9,.8),i.BlockGenerator.Initialise(t,r,e.blocks),r.load()},e.update=function(e){this.camera.camObj.position.z+=.8},e}();t.World=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,n){this.camObj=new BABYLON.FreeCamera("cam1",e,t),this.camObj.setTarget(new BABYLON.Vector3(0,6,0)),this.camObj.attachControl(n,!0),this.camObj.inputs.clear(),this.camObj.fov=-80}return e.prototype.update=function(e){},e}();t.PerspCamera=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.probability=function(e){return!!e&&Math.random()<=e},e.BlockWithinRangeZ=function(e,t,n){return Math.floor(Math.abs(t-e))<=n},e.Initialise=function(e,t,n){t.addMeshTask("piano task","","assets/geometry/","block.babylon").onSuccess=function(t){var n=t.loadedMeshes[0];n.position.x=-20,n.position.y=0,n.position.z=100,n.setPivotPoint(new BABYLON.Vector3(0,-.005,0)),n.scaling.x=500,n.scaling.y=500,n.scaling.z=500;for(var o=0;o<10;o++)(void 0).push(n.instantiateHierarchy()),(void 0)[o].position.x=(void 0)[o].position.x+5;e.registerBeforeRender((function(){n.scaling.y+=10}))}},e.GenerateBlocksRealtime=function(t,n,o,i,r,a,c,s,u){if(e.BlockWithinRangeZ(o,s,t))for(var l=0;l<i;l++);},e}();t.BlockGenerator=o}]);
>>>>>>> 8dc95830141285e29f78e2acd6727f439f479582
