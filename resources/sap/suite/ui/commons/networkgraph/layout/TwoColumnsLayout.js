sap.ui.define(["sap/suite/ui/commons/library","./LayoutAlgorithm","./Geometry","./LayoutTask"],function(l,L,G,c){"use strict";var d=l.networkgraph.LayoutRenderType;var e=15,S=75,C=32,f=42,g=160,h=100,j=50,m=25,n=10,o=0.6,I=20;var T=L.extend("sap.suite.ui.commons.networkgraph.layout.TwoColumnsLayout");T.prototype.getLayoutRenderType=function(){return d.TwoColumns;};T.prototype.layout=function(){return new c(function(r,R,a){var b=this.getParent(),E;if(!b){R("The algorithm must be associated with a graph.");return;}this.oGraph=b;this.oLeftColumn=undefined;this.oRightColumn=undefined;E=this._validateGraphDefinition();if(E){R(E);}this._preprocessGroupsAndNodes();E=this._validateLines();if(E){R(E);}this._calcLanesProperties();this._createNodesGrid();this._calcNodeEndingAndStartingPoints();this._setNodesCoordinates();this._setGroupCoordinates();this._setLinesCoordinates();this._cutLinesAtBoxNodeBorders();if(this.oGraph._bIsRtl){this._verticalMirror();}r();}.bind(this));};T.prototype._validateGraphDefinition=function(){var u=[];this.oGraph.getNodes().forEach(function(N){if(!N.getGroup()){u.push(N.getKey());}});if(u.length>0){return"Some nodes are missing group: "+u.join();}return null;};T.prototype._preprocessGroupsAndNodes=function(){if(this.oGraph.getGroups().some(function(a){a._oFirstNode=null;a._oLastNode=null;a._bNestedSet=false;if(!a._oParentGroup){if(!this.oLeftColumn){this.oLeftColumn=a;}else if(!this.oRightColumn){this.oRightColumn=a;}else{return true;}}return false;}.bind(this))){return"There are too many columns, ie. groups without a parent group. Expected exactly 2.";}if(!this.oRightColumn||!this.oLeftColumn){return"There are too few columns, ie. groups without a parent group. Expected exactly 2.";}this.oGraph.getNodes().forEach(function(N){N._iStartingGroupCount=0;N._iEndingGroupCount=0;});};T.prototype._validateLines=function(){var F,t;if(this.oGraph.getLines().some(function(a){F=a.getFromNode()._oGroup._oTopParentGroup;t=a.getToNode()._oGroup._oTopParentGroup;return!((F===this.oLeftColumn&&t===this.oRightColumn)||(t===this.oLeftColumn&&F===this.oRightColumn));}.bind(this))){return"For Two columns layout all lines have to go from one column to the other.";}else{return null;}};T.prototype._calcLanesProperties=function(){var a;this.aLanes=[];this.oGraph.getGroups().forEach(function(b){if(!b.getParentGroupKey()){this.aLanes.push(b.getKey());}}.bind(this));this.aLanes.sort();var M=this.aLanes.map(Number.prototype.valueOf,0);this.oGraph.getNodes().forEach(function(N){var b=N._oGroup,u=(b._oTopParentGroup&&b._oTopParentGroup.getKey())||N.getGroup();a=this.aLanes.indexOf(u);N._iGroupIndex=b._iLaneIndex=a;if(b._iNestedLevel>M[a]){M[a]=b._iNestedLevel;}}.bind(this));this.oGraph.getGroups().forEach(function(b){var u=(b._oTopParentGroup&&b._oTopParentGroup.getKey())||b.getKey();b._iLaneIndex=this.aLanes.indexOf(u);}.bind(this));this.aLaneWidths=[];this.oGraph.getNodes().forEach(function(N){if(!this.aLaneWidths[N._iGroupIndex]||this.aLaneWidths[N._iGroupIndex]<N._iWidth){this.aLaneWidths[N._iGroupIndex]=N._iWidth;}}.bind(this));this.aLaneWidths=this.aLaneWidths.map(function(w,i){var b=this.oGraph.mGroups[this.aLanes[i]],k=b.getMinWidth()||g;return Math.max(k,w);}.bind(this));this.aLaneGroupWidths=this.aLaneWidths.map(function(w,i){return w+M[i]*e*2;});var A=this.oGraph.$("innerscroller").width();A=Math.max(this.aLaneGroupWidths[0]+this.aLaneGroupWidths[1]+h+m*2,A);this.aLaneCenters=[m+(this.aLaneGroupWidths[0]/2)+(this.oGraph._bIsRtl?30:0),A-this.aLaneGroupWidths[1]/2-m*1.5];};T.prototype._createNodesGrid=function(){var a=this.oGraph.getGroups(),b=0;var t=a.filter(function(i){return i._iNestedLevel===0;});this.aGrid=this.aLanes.map(function(i){return[];});var p=function(i){i.aNodes.forEach(function(k){var q=k._oGroup._oCollapsedByParent,r=q||i;if(!i.getCollapsed()&&!q){this.aGrid[b].push(k);}else if(r.getCollapsed()){while(r._oCollapsedByParent){r=r._oCollapsedByParent;}if(!r._bNestedSet){r._bNestedSet=true;this.aGrid[b].push(k);}}}.bind(this));i.aChildGroups.forEach(function(k){p(k);});}.bind(this);t.forEach(function(k,i){k._iTopGroupIndex=i;p(k);b++;});};T.prototype._calcNodeEndingAndStartingPoints=function(){var p=function(q,N,O,s,A){var r=q._oParentGroup;while(r&&r._iNestedLevel>0){if(!r[O]||A){r[O]=N;if(!r._oCollapsedByParent&&!r.getCollapsed()){N[s]++;}}else{return;}r=r._oParentGroup;}};var P=function(q){if(!q._oGroup._oLastNode){q._oGroup._oLastNode=q;if(!q._oGroup._oCollapsedByParent&&!q._oGroup.getCollapsed()){q._iEndingGroupCount++;}p(q._oGroup,q,"_oLastNode","_iEndingGroupCount",false);}};var a=function(F){if(!F._oGroup._oFirstNode){F._oGroup._oFirstNode=F;if(!F._oGroup._oCollapsedByParent&&!F._oGroup.getCollapsed()){F._iStartingGroupCount++;}p(F._oGroup,F,"_oFirstNode","_iStartingGroupCount",false);}};for(var i=0;i<this.aGrid.length;i++){var b=null;for(var k=0;k<this.aGrid[i].length;k++){var N=this.aGrid[i][k];if(N._oGroup!==b){a(N);b=N._oGroup;}}b=null;for(var k=this.aGrid[i].length-1;k>=0;k--){var N=this.aGrid[i][k];if(N._oGroup!==b){P(N);b=N._oGroup;}}}};T.prototype._setGroupCoordinates=function(){var M=this.aLanes.map(Number.prototype.valueOf,0);var a=function(i,N){var k=N._oGroup._oCollapsedByParent||N._oGroup.getCollapsed()?0:1,p=N._oGroup._oParentGroup;if(i===N._oGroup){return k;}while(p){if(!p._oCollapsedByParent&&!p.getCollapsed()){k++;}if(i===p){break;}p=p._oParentGroup;}return k;};var b=function(i,N){var k=0,p=N._oGroup._oParentGroup;if(i===N._oGroup){return k;}while(p){if(!p._oCollapsedByParent&&!p.getCollapsed()){k++;}if(i===p){break;}p=p._oParentGroup;}return k;};this.oGraph.getGroups().forEach(function(i){M[i._iLaneIndex]=i._iNestedLevel>M[i._iLaneIndex]?i._iNestedLevel:M[i._iLaneIndex];});this.oGraph.getGroups().forEach(function(i){if(i._iNestedLevel===0){i.setX(this.aLaneCenters[i._iLaneIndex]-this.aLaneWidths[i._iLaneIndex]);i.setY(0);}else if(i._oLastNode&&i._oFirstNode){i._iWidth=this.aLaneWidths[i._iLaneIndex]+((M[i._iLaneIndex]-i._iNestedLevel)*e*2)+e*2;i.setX(this.aLaneCenters[i._iLaneIndex]-i._iWidth/2);var O=b(i,i._oLastNode),k=O*(e/2)+(e/2),p=a(i,i._oFirstNode),q=p*f;var y=i._oFirstNode.getY()-q,r=i._oLastNode._oGroup.getCollapsed()||i._oLastNode._oGroup._oCollapsedByParent?C:i._oLastNode._iHeight;i.setY(y);i._iHeight=i.getCollapsed()?C:i._oLastNode.getY()+r-y+k;}}.bind(this));};T.prototype._setNodesCoordinates=function(){this.aGrid.forEach(function(s){var y=j;s.forEach(function(N){var t=N._oGroup._oCollapsedByParent||N._oGroup;N.setX(this.aLaneCenters[N._iGroupIndex]-N._iWidth/2);y+=N._iStartingGroupCount*f;N.setY(y);y+=S/2;y+=N._iEndingGroupCount*e/2;y+=t.getCollapsed()?C:N._iHeight;}.bind(this));}.bind(this));};T.prototype._setLinesCoordinates=function(){var F,t,i,k,p=[],r=[],B=[],q=function(N){var a;if(!N._oGroup){return null;}a=N._oGroup;while(a&&a._isCollapsed()){if(!a._oParentGroup||!a._oParentGroup._isCollapsed()){return a;}a=a._oParentGroup;}return null;},s=function(a){var E;if(a._oTopParentGroup===this.oLeftColumn){E=a.getX()+a._iWidth+2*a._getBorderSize();}else{E=a.getX();}return{x:E,y:a.getY()+a._iHeight/2};},A=function(N){var v,w,x;if(N.groupDelegate){N.anchors.forEach(function(a){N.groupDelegate.anchors.push({node:N,line:a.line,oppositeY:a.oppositeY});if(N.isLeftie){B.push(a.line);}});return;}v=(N._iHeight-2*n)/(N.anchors.length-1);w=(N.anchors.length===1)?N.getCenterPosition().y:N.getY()+n;x=w;N.anchors.sort(function(a,b){return a.oppositeY-b.oppositeY;}).forEach(function(a){var b=a.line,y=N.getCenterPosition().x;if(N===b.getFromNode()){b.setSource({x:y,y:x});}else if(N===b.getToNode()){b.setTarget({x:y,y:x});}x+=v;if(N.isLeftie){B.push(b);}});},u=function(v){var w=s.bind(this)(v),x=(v._iHeight-2*n)/(v.anchors.length-1),y=(v.anchors.length===1)?s.bind(this)(v).y:v.getY()+n,z=y;v.anchors.sort(function(a,b){return a.oppositeY-b.oppositeY;}).forEach(function(a){var b=a.line;if(a.node===b.getFromNode()){b.setSource({x:w.x,y:z});}else if(a.node===b.getToNode()){b.setTarget({x:w.x,y:z});}z+=x;});},P=function(){var a=o*(this.oRightColumn.getX()-(this.oLeftColumn.getX()+this.oLeftColumn._iWidth)),b=this.oGraph.getLines().length-1,v=a/b,R=v<I?v:I,w=(p[0].getCenterPosition().x+r[0].getCenterPosition().x)/2,x=w-b*R/2,y=x;B.forEach(function(z){z.addBend({x:y,y:z.getSource().getY()});z.addBend({x:y,y:z.getTarget().getY()});y+=R;});}.bind(this);this.oGraph.getNodes().forEach(function(N){if(N._oGroup){if(N._oGroup._oTopParentGroup===this.oLeftColumn){N.isLeftie=true;p.push(N);}else if(N._oGroup._oTopParentGroup===this.oRightColumn){N.isLeftie=false;r.push(N);}}N.groupDelegate=q(N);N.anchors=[];}.bind(this));this.oGraph.getLines().forEach(function(a){F=a.getFromNode();t=a.getToNode();i=F.getCenterPosition();k=t.getCenterPosition();F.anchors.push({line:a,oppositeY:k.y});t.anchors.push({line:a,oppositeY:i.y});a.setSource({x:0,y:0});a.clearBends();});this.oGraph.getGroups().forEach(function(a){a.anchors=[];});p.sort(function(a,b){return a.getY()-b.getY();}).forEach(A);r.sort(function(a,b){return a.getY()-b.getY();}).forEach(A);this.oGraph.getGroups().sort(function(a,b){return a.getY()-b.getY();}).forEach(u.bind(this));P();};return T;});
