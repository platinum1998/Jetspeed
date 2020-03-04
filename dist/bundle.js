!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),i=n(2),r=function(){function e(e){this._canvas=document.getElementById(e),this._engine=new BABYLON.Engine(this._canvas,!0),this._scene=new BABYLON.Scene(this._engine)}return e.prototype.initialise=function(){var e=this,t={};this._scene.actionManager=new BABYLON.ActionManager(this._scene),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),this._scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,(function(e){t[e.sourceEvent.key]="keydown"==e.sourceEvent.type}))),o.GUI.create(),i.World.initialise(this._scene,this._canvas);var n=new BABYLON.AssetsManager(this._scene),r=n.addMeshTask("block_instance","","assets/geometry/","jet_rxtz.babylon");n.load();var a=new BABYLON.StandardMaterial("hoop_material",this._scene);a.diffuseColor=new BABYLON.Color3(1,0,1),a.emissiveColor=new BABYLON.Color3(1,0,1);var c=BABYLON.MeshBuilder.CreateTorus("hoop",{thickness:.05},this._scene);c.position.x=0,c.position.y=3,c.position.z=100,c.scaling.x=8,c.scaling.y=8,c.scaling.z=8,c.rotation=new BABYLON.Vector3(1.5,0,0),c.material=a;for(var s=0;s<3;s++){var l=c.createInstance("hoop"+s);l.position.x=BABYLON.Scalar.RandomRange(-50,50)+s,l.position.y=1,l.position.z=BABYLON.Scalar.RandomRange(-50,500)+s}var d=0;this._scene.registerBeforeRender((function(){var n;e._delta=e._engine.getDeltaTime(),i.World.update(e._delta),++d>=.5*e._delta&&(o.GUI.distance++,d=0),o.GUI.distance_travelled.text=""+o.GUI.distance,r.onSuccess=function(o){var r=new BABYLON.StandardMaterial("block_mat",e._scene);r.diffuseColor=new BABYLON.Color3(1,.98,.95),(n=o.loadedMeshes[0]).material=r,n.position.x=0,n.position.y=-1,n.position.z=-14,n.scaling.x=100,n.scaling.y=100,n.scaling.z=100,e._scene.registerBeforeRender((function(){n.position.z+=.8,t.a||t.A?(n.position.x-=1.6,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,.8),.3),i.World.camera.camObj.rotation.z=BABYLON.Scalar.Lerp(i.World.camera.camObj.rotation.z,BABYLON.Tools.ToRadians(4),.1)):t.d||t.D?(n.position.x+=1.6,n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,-.8),.3),i.World.camera.camObj.rotation.z=BABYLON.Scalar.Lerp(i.World.camera.camObj.rotation.z,BABYLON.Tools.ToRadians(-4),.1)):(n.rotation=BABYLON.Vector3.Lerp(n.rotation,new BABYLON.Vector3(0,0,0),.2),i.World.camera.camObj.rotation.z=BABYLON.Scalar.Lerp(i.World.camera.camObj.rotation.z,BABYLON.Tools.ToRadians(0),.1)),i.World.camera.camObj.position.x=n.position.x}))}}))},e.prototype.playLoop=function(){var e=this,t=this;this._engine.runRenderLoop((function(){e._scene.clearColor=new BABYLON.Color4(1,.9,.8,1),t._scene.render()})),window.addEventListener("resize",(function(){t._engine.resize()}))},e}();window.addEventListener("DOMContentLoaded",(function(){var e=new r("renderCanvas");e.initialise(),e.playLoop()}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.create=function(){var e=BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");this.distance_travelled=new BABYLON.GUI.TextBlock,this.distance_travelled.text=""+this.distance,this.distance_travelled.color="black",this.distance_travelled.fontSize=20,this.distance_travelled.alpha=.5,this.distance_travelled.top=-400,e.addControl(this.distance_travelled)},e.distance=0,e}();t.GUI=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3),i=n(4),r=function(){function e(){}return e.initialise=function(t,n){var r=new BABYLON.AssetsManager(t);this.camera=new o.PerspCamera(new BABYLON.Vector3(0,8,-30),t,n),new BABYLON.HemisphericLight("light",new BABYLON.Vector3(.5,.8,.75),t).intensity=1,i.BlockGenerator.Initialise(t,r,e.blocks),r.load(),t.fogMode=BABYLON.Scene.FOGMODE_LINEAR,t.fogDensity=.03,t.fogStart=5,t.fogEnd=30,t.fogColor=new BABYLON.Color3(1,.6,.4)},e.update=function(e){this.camera.camObj.position.z+=.8},e}();t.World=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t,n){this.camObj=new BABYLON.FreeCamera("cam1",e,t),this.camObj.setTarget(new BABYLON.Vector3(0,6,0)),this.camObj.attachControl(n,!0),this.camObj.inputs.clear(),this.camObj.fov=-80}return e.prototype.update=function(e){},e}();t.PerspCamera=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(){}return e.probability=function(e){return!!e&&Math.random()<=e},e.BlockWithinRangeZ=function(e,t,n){return Math.floor(Math.abs(t-e))<=n},e.Initialise=function(e,t,n){var o=this;t.addMeshTask("piano task","","assets/geometry/","block.babylon").onSuccess=function(t){var n=t.loadedMeshes[0];n.setPivotPoint(new BABYLON.Vector3(0,-.005,0)),n.scaling=new BABYLON.Vector3(1e3,1e3,1e3),n.position.x=-20,n.position.y=-20,n.position.z=100;for(var i=[],r=0;r<10;r++)for(var a=0;a<50;a++)i[r]=n.instantiateHierarchy(),i[r].position.x=10*r,i[r].position.z=10*a,o.probability(.99)?i[r].scaling.y=BABYLON.Scalar.RandomRange(10,1e3):i[r].scaling.y=8e3;i[i.length-1];e.registerBeforeRender((function(){n.scaling.y+=10}))}},e.GenerateBlocksRealtime=function(t,n,o,i,r,a,c,s,l){if(e.BlockWithinRangeZ(o,s,t))for(var d=0;d<i;d++);},e}();t.BlockGenerator=o}]);