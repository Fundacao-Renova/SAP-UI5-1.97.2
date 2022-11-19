sap.ui.define(["../thirdparty/three","sap/base/Log","./ThreeUtils"],function(t,L,T){"use strict";var O=function(o){this._outlineWidth=o;this._copyMaterial=new THREE.MeshBasicMaterial({transparent:true,fog:false});this._maskMaterial=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,fog:false});this._outlineMaterial=new THREE.ShaderMaterial({uniforms:{"mask":{value:null},"offset":{value:new THREE.Vector2(1,0,0,1)}},vertexShader:["varying vec2 vTC;","void main() {","	vTC = uv;","	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join("\n"),fragmentShader:["varying vec2 vTC;","uniform sampler2D mask;","uniform vec4 offset;","float delta(vec3 c1,  vec3 c2) {","	vec3 dc = c1 - c2;","	return dot(dc, dc);","}","void main() {","	vec3 c = texture2D(mask, vTC).rgb;","	vec3 c1 = texture2D(mask, vTC + offset.xy).rgb;","	vec3 c2 = texture2D(mask, vTC - offset.xy).rgb;","	vec3 c3 = texture2D(mask, vTC + offset.zw).rgb;","	vec3 c4 = texture2D(mask, vTC - offset.yw).rgb;","	vec4 a = vec4(delta(c, c1), delta(c, c2), delta(c, c3), delta(c, c4));","	gl_FragColor = vec4(1.0, 1.0, 1.0, sign(dot(a, a)));","}"].join("\n")});this._expandMaterial=new THREE.ShaderMaterial({uniforms:{"mask":{value:null},"offset":{value:new THREE.Vector2(1,0,0,1)}},vertexShader:["varying vec2 vTC;","void main() {","	vTC = uv;","	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join("\n"),fragmentShader:["varying vec2 vTC;","uniform sampler2D mask;","uniform vec4 offset;","void main() {","	float a = texture2D(mask, vTC).a;","	a += texture2D(mask, vTC + offset.xy).a;","	a += texture2D(mask, vTC - offset.xy).a;","	a += texture2D(mask, vTC + offset.zw).a;","	a += texture2D(mask, vTC - offset.yw).a;","	gl_FragColor = vec4(1.0, 1.0, 1.0, a * 0.5);","}"].join("\n")});this._screenCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);this._screenMesh=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2));};O.prototype.setOutlineWidth=function(w){this._outlineWidth=w;};O.prototype.render=function(r,s,c,a,o,j){if(!a||!a.length){return;}var b=r.getSize(new THREE.Vector2());var p=2;var w=b.width*p;var h=b.height*p;if(!this._renderTarget1||this._renderTarget1.width!==w||this._renderTarget1.height!==h){var d={minFilter:THREE.NearestFilter,magFilter:THREE.NearestFilter};this._renderTarget1=new THREE.WebGLRenderTarget(w,h,d);this._renderTarget1.texture.generateMipmaps=false;this._renderTarget2=new THREE.WebGLRenderTarget(w,h,d);this._renderTarget2.texture.generateMipmaps=false;}var n;var e;if(j){n=new Map();e=new Map();j.forEach(function(E){if(!E.node||!E.parent){return;}n.set(E.node,E);if(E.parent){var F=e.get(E.parent)||[];F.push(E);e.set(E.parent,F);}});}var f;var g=new Set();var k=function(E){if(E.isMesh){g.add({mesh:E,color:f});}};var i;for(i=0;i<a.length;i++){var l=a[i];f=new THREE.Color(((i+1)&255)/255,(((i+1)>>8)&255)/255,(((i+1)>>16)&255)/255);l._vkTraverseNodes(k,n,e);}if(g.size===0){return;}var m=r.getClearColor().clone();var q=r.getClearAlpha();var u=r.autoClear;r.autoClear=false;r.setClearColor(0x000000,0);var v;var x=this._renderTarget1;var y=this._renderTarget2;r.setRenderTarget(x);r.clear(true,true,false);var z=g.values();var A=z.next();while(!A.done){var B=A.value.mesh;this._maskMaterial.color=A.value.color;A=z.next();v=B.material;B.material=this._maskMaterial;r.render(B,c);B.material=v;}var C=new THREE.Vector4(1/w,0,0,1/h);v=this._outlineMaterial;v.uniforms.mask.value=x.texture;v.uniforms.offset.value=C;this._screenMesh.material=v;r.setRenderTarget(y);r.render(this._screenMesh,this._screenCamera);if(this._outlineWidth>1){v=this._expandMaterial;v.uniforms.offset.value=C;this._screenMesh.material=v;for(i=1;i<this._outlineWidth;i++){var D=x;x=y;y=D;v.uniforms.mask.value=x.texture;r.setRenderTarget(y);r.render(this._screenMesh,this._screenCamera);}}v=this._copyMaterial;v.map=y.texture;v.color=o;this._screenMesh.material=v;r.setRenderTarget(null);r.render(this._screenMesh,this._screenCamera);r.setClearColor(m,q);r.autoClear=u;};O.prototype.dispose=function(){if(this._copyMaterial){T.disposeMaterial(this._copyMaterial);this._copyMaterial=null;}if(this._maskMaterial){T.disposeMaterial(this._maskMaterial);this._maskMaterial=null;}if(this._outlineMaterial){T.disposeMaterial(this._outlineMaterial);this._outlineMaterial=null;}if(this._expandMaterial){T.disposeMaterial(this._expandMaterial);this._expandMaterial=null;}if(this._screenMesh){T.disposeObject(this._screenMesh);this._screenMesh=null;}};return O;});