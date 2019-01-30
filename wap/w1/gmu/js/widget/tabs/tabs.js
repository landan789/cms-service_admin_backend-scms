(function(e,d,f){var b=1,a=function(){return b++},c=/^#(.+)$/;e.define("Tabs",{options:{active:0,items:null,transition:"slide"},template:{nav:'<ul class="ui-tabs-nav"><% var item; for(var i=0, length=items.length; i<length; i++) { item=items[i]; %><li<% if(i==active){ %> class="ui-state-active"<% } %>><a href="javascript:;"><%=item.title%></a></li><% } %></ul>',content:'<div class="ui-viewport ui-tabs-content"><% var item; for(var i=0, length=items.length; i<length; i++) { item=items[i]; %><div<% if(item.id){ %> id="<%=item.id%>"<% } %> class="ui-tabs-panel <%=transition%><% if(i==active){ %> ui-state-active<% } %>"><%=item.content%></div><% } %></div>'},_init:function(){var j=this,i=j._options,h,g=d.proxy(j._eventHandler,j);j.on("ready",function(){h=j.$el;h.addClass("ui-tabs");i._nav.on("tap",g).children().highlight("ui-state-hover")});d(window).on("ortchange",g)},_create:function(){var h=this,g=h._options;if(h._options.setup&&h.$el.children().length>0){h._prepareDom("setup",g)}else{g.setup=false;h.$el=h.$el||d("<div></div>");h._prepareDom("create",g)}},_prepareDom:function(j,n){var m=this,k,o=m.$el,l,g,i,h;switch(j){case"setup":n._nav=m._findElement("ul").first();if(n._nav){n._content=m._findElement("div.ui-tabs-content");n._content=((n._content&&n._content.first())||d("<div></div>").appendTo(o)).addClass("ui-viewport ui-tabs-content");l=[];n._nav.addClass("ui-tabs-nav").children().each(function(){var r=m._findElement("a",this),p=r?r.attr("href"):d(this).attr("data-url"),s,q;s=c.test(p)?RegExp.$1:"tabs_"+a();(q=m._findElement("#"+s)||d('<div id="'+s+'"></div>')).addClass("ui-tabs-panel"+(n.transition?" "+n.transition:"")).appendTo(n._content);l.push({id:s,href:p,title:r?r.attr("href","javascript:;").text():d(this).text(),content:q})});n.items=l;n.active=Math.max(0,Math.min(l.length-1,n.active||d(".ui-state-active",n._nav).index()||0));m._getPanel().add(n._nav.children().eq(n.active)).addClass("ui-state-active");break}default:l=n.items=n.items||[];g=[];i=[];n.active=Math.max(0,Math.min(l.length-1,n.active));d.each(l,function(p,q){h="tabs_"+a();g.push({href:q.href||"#"+h,title:q.title});i.push({content:q.content||"",id:h});l[p].id=h});n._nav=d(this.tpl2html("nav",{items:g,active:n.active})).prependTo(o);n._content=d(this.tpl2html("content",{items:i,active:n.active,transition:n.transition})).appendTo(o);n.container=n.container||(o.parent().length?null:"body")}n.container&&o.appendTo(n.container);m._fitToContent(m._getPanel())},_getPanel:function(g){var h=this._options;return d("#"+h.items[g===f?h.active:g].id)},_findElement:function(g,i){var h=d(i||this.$el).find(g);return h.length?h:null},_eventHandler:function(i){var g,h=this._options;switch(i.type){case"ortchange":this.refresh();break;default:if((g=d(i.target).closest("li",h._nav.get(0)))&&g.length){i.preventDefault();this.switchTo(g.index())}}},_fitToContent:function(i){var h=this._options,g=h._content;h._plus===f&&(h._plus=parseFloat(g.css("border-top-width"))+parseFloat(g.css("border-bottom-width")));g.height(i.height()+h._plus);return this},switchTo:function(g){var j=this,k=j._options,i=k.items,n,l,m,h,o;if(!k._buzy&&k.active!=(g=Math.max(0,Math.min(i.length-1,g)))){l=d.extend({},i[g]);l.div=j._getPanel(g);l.index=g;m=d.extend({},i[k.active]);m.div=j._getPanel();m.index=k.active;n=e.Event("beforeActivate");j.trigger(n,l,m);if(n.isDefaultPrevented()){return j}k._content.children().removeClass("ui-state-active");l.div.addClass("ui-state-active");k._nav.children().removeClass("ui-state-active").eq(l.index).addClass("ui-state-active");if(k.transition){k._buzy=true;o=d.fx.animationEnd+".tabs";h=g>k.active?"":" reverse";k._content.addClass("ui-viewport-transitioning");m.div.addClass("out"+h);l.div.addClass("in"+h).on(o,function(p){if(p.target!=p.currentTarget){return}l.div.off(o,arguments.callee);k._buzy=false;m.div.removeClass("out reverse");l.div.removeClass("in reverse");k._content.removeClass("ui-viewport-transitioning");j.trigger("animateComplete",l,m);j._fitToContent(l.div)})}k.active=g;j.trigger("activate",l,m);k.transition||j._fitToContent(l.div)}return j},refresh:function(){return this._fitToContent(this._getPanel())},destroy:function(){var h=this._options,g=this._eventHandler;h._nav.off("tap",g).children().highlight();h.swipe&&h._content.off("swipeLeft swipeRight",g);if(!h.setup){this.$el.remove()}return this.$super("destroy")}})})(gmu,gmu.$);