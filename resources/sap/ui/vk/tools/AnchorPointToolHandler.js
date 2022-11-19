sap.ui.define(["sap/ui/base/EventProvider","sap/m/Menu","sap/m/MenuItem","../getResourceBundle","../thirdparty/three"],function(E,M,a,g,t){"use strict";var A=E.extend("sap.ui.vk.tools.AnchorPointToolHandler",{metadata:{},constructor:function(c){this._priority=10;this._tool=c;this._gizmo=c.getGizmo();this._rect=null;this._rayCaster=new THREE.Raycaster();this._handleIndex=-1;this._gizmoIndex=-1;this._handleAxis=new THREE.Vector3();this._gizmoOrigin=new THREE.Vector3();this._gizmoScale=1;this._matrixOrigin=new THREE.Matrix4();this._rotationOrigin=new THREE.Matrix4();this._mouse=new THREE.Vector2();this._mouseOrigin=new THREE.Vector2();}});A.prototype._updateMouse=function(e){var s=this.getViewport().getRenderer().getSize(new THREE.Vector2());this._mouse.x=((e.x-this._rect.x)/s.width)*2-1;this._mouse.y=((e.y-this._rect.y)/s.height)*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef());};A.prototype._updateHandles=function(e,h){var p=this._handleIndex;this._handleIndex=-1;if(e.n===1||(e.event&&e.event.type==="contextmenu")){for(var i=0,l=this._gizmo.getGizmoCount();i<l;i++){var c=this._gizmo.getTouchObject(i);var f=this._rayCaster.intersectObject(c,true);if(f.length>0){this._handleIndex=c.children.indexOf(f[0].object);if(this._handleIndex>=0){this._gizmoIndex=i;this._gizmoOrigin.setFromMatrixPosition(c.matrixWorld);this._matrixOrigin.copy(c.matrixWorld);this._gizmoScale=c.scale.x;this._rotationOrigin.extractRotation(c.matrixWorld);if(this._handleIndex<3){this._handleAxis.setFromMatrixColumn(c.matrixWorld,this._handleIndex).normalize();}else if(this._handleIndex<6){this._handleAxis.setFromMatrixColumn(c.matrixWorld,this._handleIndex-3).normalize();}else if(this._handleIndex<9){this._handleAxis.setFromMatrixColumn(c.matrixWorld,this._handleIndex-6).normalize();}}}}}this._gizmo.highlightHandle(this._handleIndex,h||this._handleIndex===-1);if(p!==this._handleIndex){this.getViewport().setShouldRenderFrame();}};A.prototype.hover=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);e.handled|=this._handleIndex>=0;}};A.prototype.click=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);this._gizmo.selectHandle(this._handleIndex);e.handled|=this._handleIndex>=0;}};var d=new THREE.Vector3();A.prototype._getAxisOffset=function(){var r=this._rayCaster.ray;var c=this._handleAxis.clone().cross(r.direction).cross(r.direction).normalize();d.copy(r.origin).sub(this._gizmoOrigin);return c.dot(d)/c.dot(this._handleAxis);};A.prototype._getPlaneOffset=function(){var r=this._rayCaster.ray;d.copy(this._gizmoOrigin).sub(r.origin);var c=this._handleAxis.dot(d)/this._handleAxis.dot(r.direction);return r.direction.clone().multiplyScalar(c).sub(d);};A.prototype._getMouseAngle=function(){var r=this._rayCaster.ray;var d=this._rotationPoint.clone().sub(r.origin);var c=this._rotationAxis.dot(d)/this._rotationAxis.dot(r.direction);var m=r.direction.clone().multiplyScalar(c).sub(d).normalize();return Math.atan2(m.dot(this._axis2),m.dot(this._axis1));};A.prototype.beginGesture=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,false);if(this._handleIndex>=0){e.handled=true;this._gesture=true;this._mouseOrigin.copy(e);this._gizmo.selectHandle(this._handleIndex);this._gizmo.beginGesture();if(this._handleIndex<3){this._dragOrigin=this._getAxisOffset();}else if(this._handleIndex<6){this._dragOrigin=this._getPlaneOffset();}else if(this._handleIndex<9){this._axis1=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+1)%3).normalize();this._axis2=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+2)%3).normalize();this._rotationAxis=new THREE.Vector3().crossVectors(this._axis1,this._axis2).normalize();this._rotationPoint=new THREE.Vector3().setFromMatrixPosition(this._matrixOrigin);if(Math.abs(this._rayCaster.ray.direction.dot(this._rotationAxis))<Math.cos(Math.PI*85/180)){var m=this.getViewport().getCamera().getCameraRef().matrixWorld;this._axis1.setFromMatrixColumn(m,0).normalize();this._axis2.setFromMatrixColumn(m,1).normalize();this._rotationAxis.setFromMatrixColumn(m,2).normalize();}var l=this._axis1.clone();var c=2;for(var i=0;i<3;i++){var f=new THREE.Vector3().setComponent(i,1);var h=this._rotationAxis.dot(f);if(c>h){c=h;l.copy(f);}}l.sub(this._rotationAxis.clone().multiplyScalar(l.dot(this._rotationAxis))).normalize();this._levelAngle=Math.atan2(l.dot(this._axis2),l.dot(this._axis1));this._startAngle=this._getMouseAngle();this._prevDeltaAngle=0;}}}};A.prototype._setOffset=function(o){if(this._tool.getEnableStepping()){var s=Math.pow(10,Math.round(Math.log10(this._gizmoScale)))*0.1;var m=new THREE.Matrix4().getInverse(this._rotationOrigin);var c=this._gizmoOrigin.clone().applyMatrix4(m);var p=this._gizmoOrigin.clone().add(o).applyMatrix4(m);for(var i=0;i<3;i++){var e=p.getComponent(i);if(Math.abs(e-c.getComponent(i))>s*1e-5){var f=Math.round(e/s)*s;d.setFromMatrixColumn(this._rotationOrigin,i).multiplyScalar(f-e);o.add(d);}}}this._gizmo._setOffset(o,this._gizmoIndex);};A.prototype.move=function(e){if(this._gesture){e.handled=true;this._updateMouse(e);if(this._handleIndex<3){if(isFinite(this._dragOrigin)){this._setOffset(this._handleAxis.clone().multiplyScalar(this._getAxisOffset()-this._dragOrigin));}}else if(this._handleIndex<6){if(isFinite(this._dragOrigin.x)&&isFinite(this._dragOrigin.y)&&isFinite(this._dragOrigin.z)){this._setOffset(this._getPlaneOffset().sub(this._dragOrigin));}}else if(this._handleIndex<9){var c=this._startAngle;var f=this._getMouseAngle()-c;if(f>Math.PI){f-=Math.PI*2;}else if(f<-Math.PI){f+=Math.PI*2;}if(Math.abs(this._prevDeltaAngle)>Math.PI/4){if(this._prevDeltaAngle*f<0){f+=Math.PI*2*Math.sign(this._prevDeltaAngle);}}f=f%(Math.PI*2);var h=c+f;if(this._tool.getEnableStepping()){var s=THREE.Math.degToRad(5);var i=h-c-this._levelAngle;h+=Math.round(i/s)*s-i;}this._prevDeltaAngle=h-c;if(isFinite(c)&&isFinite(h)){this._gizmo._setRotationAxisAngle(this._handleIndex-6,c,h);}}}};A.prototype.endGesture=function(e){if(this._gesture){this._gesture=false;e.handled=true;this._updateMouse(e);this._gizmo.endGesture();this._dragOrigin=undefined;this._updateHandles(e,true);this.getViewport().setShouldRenderFrame();}};function b(v){var s=[];if(v){v.enumerateSelection(function(n){s.push(n);});}return s;}A.prototype.contextMenu=function(e){if(!this._tool.getAllowContextMenu()){return;}if(this._inside(e)){this._updateMouse(e);this._updateHandles(e,true);if(this._handleIndex>=0){e.handled=true;var v=this.getViewport();var m=new M({items:[new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_WORLD_ORIGIN")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SELECTION_CENTER")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SCENE_CENTER")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SELECTED_OBJECTS_ORIGIN")})],itemSelected:function(e){var i=e.getParameters("item").item;var c=e.getSource().indexOfItem(i);var p=new THREE.Vector3();switch(c){default:case 0:break;case 1:this._tool.moveTo(b(v._viewStateManager),false);return;case 2:var s=v.getScene()?v.getScene().getSceneRef():null;if(s){var f=new THREE.Box3();s._expandBoundingBox(f,null,true);f.getCenter(p);}break;case 3:this._tool.moveTo(b(v._viewStateManager),true);return;}this._gizmo.setPosition(p);v.setShouldRenderFrame();}.bind(this)});m.openAsContextMenu(e.event,v);}}};A.prototype.getViewport=function(){return this._tool._viewport;};A.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};A.prototype._inside=function(e){if(this._rect===null||true){var i=this._tool._viewport.getIdForLabel();var c=document.getElementById(i);if(c===null){return false;}var o=this._getOffset(c);this._rect={x:o.x,y:o.y,w:c.offsetWidth,h:c.offsetHeight};}return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};return A;});
