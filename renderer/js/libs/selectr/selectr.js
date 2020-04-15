!function(e,t){var i="Selectr";"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e[i]=t()}(this,function(e){"use strict";function s(){}s.prototype={on:function(e,t){this._events=this._events||{},this._events[e]=this._events[e]||[],this._events[e].push(t)},off:function(e,t){this._events=this._events||{},e in this._events!=!1&&this._events[e].splice(this._events[e].indexOf(t),1)},emit:function(e){if(this._events=this._events||{},e in this._events!=!1)for(var t=0;t<this._events[e].length;t++)this._events[e][t].apply(this,Array.prototype.slice.call(arguments,1))}},s.mixin=function(e){for(var t=["on","off","emit"],i=0;i<t.length;i++)"function"==typeof e?e.prototype[t[i]]=s.prototype[t[i]]:e[t[i]]=s.prototype[t[i]];return e};var g={escapeRegExp:function(e){var t=/[\\^$.*+?()[\]{}|]/g,i=new RegExp(t.source);return e&&i.test(e)?e.replace(t,"\\$&"):e},extend:function(e,t){for(var i in t)if(t.hasOwnProperty(i)){var s=t[i];s&&"[object Object]"===Object.prototype.toString.call(s)?(e[i]=e[i]||{},g.extend(e[i],s)):e[i]=s}return e},each:function(e,t,i){if("[object Object]"===Object.prototype.toString.call(e))for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.call(i,s,e[s],e);else for(var n=0,a=e.length;n<a;n++)t.call(i,n,e[n],e)},createElement:function(e,t){var i,s=document.createElement(e);if(t&&"[object Object]"===Object.prototype.toString.call(t))for(i in t)i in s?s[i]=t[i]:"html"===i?s.innerHTML=t[i]:s.setAttribute(i,t[i]);return s},hasClass:function(e,t){if(e)return e.classList?e.classList.contains(t):!!e.className&&!!e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:function(e,t){g.hasClass(e,t)||(e.classList?e.classList.add(t):e.className=e.className.trim()+" "+t)},removeClass:function(e,t){g.hasClass(e,t)&&(e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," "))},closest:function(e,t){return e&&e!==document.body&&(t(e)?e:g.closest(e.parentNode,t))},isInt:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e},debounce:function(s,n,a){var l;return function(){var e=this,t=arguments,i=a&&!l;clearTimeout(l),l=setTimeout(function(){l=null,a||s.apply(e,t)},n),i&&s.apply(e,t)}},rect:function(e,t){var i=window,s=e.getBoundingClientRect(),n=t?i.pageXOffset:0,a=t?i.pageYOffset:0;return{bottom:s.bottom+a,height:s.height,left:s.left+n,right:s.right+n,top:s.top+a,width:s.width}},includes:function(e,t){return-1<e.indexOf(t)},startsWith:function(e,t){return e.substr(0,t.length)===t},truncate:function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},textEquals:function(e,t){return e.toLowerCase()===t.toLowerCase()}};function r(e,t){return e.hasOwnProperty(t)&&(!0===e[t]||e[t].length)}function v(e,t,i,s){var n=s?t.prepend:t.appendChild;e.parentNode?e.parentNode.parentNode||n.apply(t,[e.parentNode]):n.apply(t,[e]),g.removeClass(e,"excluded"),i||(e.textContent=e.textContent)}function a(){if(this.items.length){var i=document.createDocumentFragment();if(this.config.pagination){var e=this.pages.slice(0,this.pageIndex);g.each(e,function(e,t){g.each(t,function(e,t){v(t,i,this.customOption)},this)},this)}else g.each(this.items,function(e,t){v(t,i,this.customOption)},this);i.childElementCount&&(g.removeClass(this.items[this.navIndex],"active"),this.navIndex=(i.querySelector(".selectr-option.selected")||i.querySelector(".selectr-option")).idx,g.addClass(this.items[this.navIndex],"active")),this.tree.appendChild(i)}}function d(e,t){t=t||e;var i={class:"selectr-option",role:"treeitem","aria-selected":!1};this.customOption?i.html=this.config.renderOption(t):i.textContent=e.textContent;var s=g.createElement("li",i);return s.idx=e.idx,this.items.push(s),e.defaultSelected&&this.defaultSelected.push(e.idx),e.disabled&&(s.disabled=!0,g.addClass(s,"disabled")),s}function l(){(this.config.searchable||this.config.taggable)&&(this.input.value=null,this.searching=!1,this.config.searchable&&g.removeClass(this.inputContainer,"active"),g.hasClass(this.container,"notice")&&(g.removeClass(this.container,"notice"),g.addClass(this.container,"open"),this.input.focus()),g.each(this.items,function(e,t){g.removeClass(t,"excluded"),this.customOption||(t.textContent=t.textContent)},this))}function t(e,t){if(!e)throw new Error("You must supply either a HTMLSelectElement or a CSS3 selector string.");if("string"==typeof(this.el=e)&&(this.el=document.querySelector(e)),null===this.el)throw new Error("The element you passed to Selectr can not be found.");if("select"!==this.el.nodeName.toLowerCase())throw new Error("The element you passed to Selectr is not a HTMLSelectElement.");this.render(t)}var o=function(){var e=this.tree,t=e.scrollTop;if(e.scrollHeight-e.offsetHeight<=t&&this.pageIndex<this.pages.length){var i=document.createDocumentFragment();g.each(this.pages[this.pageIndex],function(e,t){v(t,i,this.customOption)},this),e.appendChild(i),this.pageIndex++,this.emit("selectr.paginate",{items:this.items.length,total:this.data.length,page:this.pageIndex,pages:this.pages.length})}};return t.prototype.render=function(e){if(!this.rendered){(this.el.selectr=this).config=g.extend({defaultSelected:!0,width:"auto",disabled:!1,disabledMobile:!1,searchable:!0,clearable:!1,sortSelected:!1,allowDeselect:!1,closeOnScroll:!1,nativeDropdown:!1,nativeKeyboard:!1,placeholder:"Select an option...",taggable:!1,tagPlaceholder:"Enter a tag...",messages:{noResults:"No results.",noOptions:"No options available.",maxSelections:"A maximum of {max} items can be selected.",tagDuplicate:"That tag is already in use.",searchPlaceholder:"Search options..."}},e),this.originalType=this.el.type,this.originalIndex=this.el.tabIndex,this.defaultSelected=[],this.originalOptionCount=this.el.options.length,(this.config.multiple||this.config.taggable)&&(this.el.multiple=!0),this.disabled=r(this.config,"disabled"),this.opened=!1,this.config.taggable&&(this.config.searchable=!1),this.navigating=!1,this.mobileDevice=!1,!this.config.disabledMobile&&/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)&&(this.mobileDevice=!0),this.customOption=this.config.hasOwnProperty("renderOption")&&"function"==typeof this.config.renderOption,this.customSelected=this.config.hasOwnProperty("renderSelection")&&"function"==typeof this.config.renderSelection,this.supportsEventPassiveOption=this.detectEventPassiveOption(),s.mixin(this),function(){this.requiresPagination=this.config.pagination&&0<this.config.pagination,r(this.config,"width")&&(g.isInt(this.config.width)?this.width=this.config.width+"px":"auto"===this.config.width?this.width="100%":g.includes(this.config.width,"%")&&(this.width=this.config.width)),this.container=g.createElement("div",{class:"selectr-container"}),this.config.customClass&&g.addClass(this.container,this.config.customClass),this.mobileDevice?g.addClass(this.container,"selectr-mobile"):g.addClass(this.container,"selectr-desktop"),this.el.tabIndex=-1,this.config.nativeDropdown||this.mobileDevice?g.addClass(this.el,"selectr-visible"):g.addClass(this.el,"selectr-hidden"),this.selected=g.createElement("div",{class:"selectr-selected",disabled:this.disabled,tabIndex:0,"aria-expanded":!1}),this.label=g.createElement(this.el.multiple?"ul":"span",{class:"selectr-label"});var e=g.createElement("div",{class:"selectr-options-container"});if(this.tree=g.createElement("ul",{class:"selectr-options",role:"tree","aria-hidden":!0,"aria-expanded":!1}),this.notice=g.createElement("div",{class:"selectr-notice"}),this.el.setAttribute("aria-hidden",!0),this.disabled&&(this.el.disabled=!0),this.el.multiple?(g.addClass(this.label,"selectr-tags"),g.addClass(this.container,"multiple"),this.tags=[],this.selectedValues=this.config.defaultSelected?this.getSelectedProperties("value"):[],this.selectedIndexes=this.getSelectedProperties("idx")):(this.selectedValue=null,this.selectedIndex=-1),this.selected.appendChild(this.label),this.config.clearable&&(this.selectClear=g.createElement("button",{class:"selectr-clear",type:"button"}),this.container.appendChild(this.selectClear),g.addClass(this.container,"clearable")),this.config.taggable){var t=g.createElement("li",{class:"input-tag"});if(this.input=g.createElement("input",{class:"selectr-tag-input",placeholder:this.config.tagPlaceholder,tagIndex:0,autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:"false",role:"textbox",type:"search"}),t.appendChild(this.input),this.label.appendChild(t),g.addClass(this.container,"taggable"),this.tagSeperators=[","],this.config.tagSeperators){this.tagSeperators=this.tagSeperators.concat(this.config.tagSeperators);for(var i=[],s=0;s<this.tagSeperators.length;s++)i.push(g.escapeRegExp(this.tagSeperators[s]));this.tagSeperatorsRegex=new RegExp(i.join("|"),"i")}else this.tagSeperatorsRegex=new RegExp(",","i")}this.config.searchable&&(this.input=g.createElement("input",{class:"selectr-input",tagIndex:-1,autocomplete:"off",autocorrect:"off",autocapitalize:"off",spellcheck:"false",role:"textbox",type:"search",placeholder:this.config.messages.searchPlaceholder}),this.inputClear=g.createElement("button",{class:"selectr-input-clear",type:"button"}),this.inputContainer=g.createElement("div",{class:"selectr-input-container"}),this.inputContainer.appendChild(this.input),this.inputContainer.appendChild(this.inputClear),e.appendChild(this.inputContainer)),e.appendChild(this.notice),e.appendChild(this.tree),this.items=[],this.options=[],this.el.options.length&&(this.options=[].slice.call(this.el.options));var n,a=!1,l=0;if(this.el.children.length&&g.each(this.el.children,function(e,t){"OPTGROUP"===t.nodeName?(a=g.createElement("ul",{class:"selectr-optgroup",role:"group",html:"<li class='selectr-optgroup--label'>"+t.label+"</li>"}),g.each(t.children,function(e,t){t.idx=l,a.appendChild(d.call(this,t,a)),l++},this)):(t.idx=l,d.call(this,t),l++)},this),this.config.data&&Array.isArray(this.config.data)){var o,h=!(this.data=[]);a=!1,l=0,g.each(this.config.data,function(e,s){if(r(s,"children"))h=g.createElement("optgroup",{label:s.text}),a=g.createElement("ul",{class:"selectr-optgroup",role:"group",html:"<li class='selectr-optgroup--label'>"+s.text+"</li>"}),g.each(s.children,function(e,t){(o=new Option(t.text,t.value,!1,t.hasOwnProperty("selected")&&!0===t.selected)).disabled=r(t,"disabled");var i=s["data-search-params"];i&&(o["data-search-params"]=i),this.options.push(o),h.appendChild(o),o.idx=l,a.appendChild(d.call(this,o,t)),this.data[l]=t,l++},this),this.el.appendChild(h);else{(o=new Option(s.text,s.value,!1,s.hasOwnProperty("selected")&&!0===s.selected)).disabled=r(s,"disabled");var t=s["data-search-params"];t&&o.setAttribute("data-search-params",t),this.options.push(o),o.idx=l,d.call(this,o,s),this.data[l]=s,l++}},this)}this.setSelected(!0);for(var c=this.navIndex=0;c<this.items.length;c++)if(n=this.items[c],!g.hasClass(n,"disabled")){g.addClass(n,"active"),this.navIndex=c;break}this.requiresPagination&&(this.pageIndex=1,this.paginate()),this.container.appendChild(this.selected),this.container.appendChild(e),this.placeEl=g.createElement("div",{class:"selectr-placeholder"}),this.setPlaceholder(),this.selected.appendChild(this.placeEl),this.disabled&&this.disable(),this.el.parentNode.insertBefore(this.container,this.el),this.container.appendChild(this.el)}.call(this),this.bindEvents(),this.update(),this.optsRect=g.rect(this.tree),this.rendered=!0,this.el.multiple||(this.el.selectedIndex=this.selectedIndex);var t=this;setTimeout(function(){t.emit("selectr.init")},20)}},t.prototype.getSelected=function(){return this.el.querySelectorAll("option:checked")},t.prototype.getSelectedProperties=function(t){var e=this.getSelected();return[].slice.call(e).map(function(e){return e[t]}).filter(function(e){return null!=e})},t.prototype.detectEventPassiveOption=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("test",null,t)}catch(e){}return e},t.prototype.bindEvents=function(){var n=this;if(this.events={},this.events.dismiss=function(e){var t=e.target;this.container.contains(t)||!this.opened&&!g.hasClass(this.container,"notice")||this.close()}.bind(this),this.events.navigate=function(e){if(e=e||window.event,this.items.length&&this.opened&&g.includes([13,38,40],e.which)){if(e.preventDefault(),13===e.which)return!(this.noResults||this.config.taggable&&0<this.input.value.length)&&this.change(this.navIndex);var t,i=this.items[this.navIndex],s=this.navIndex;switch(e.which){case 38:(t=0)<this.navIndex&&this.navIndex--;break;case 40:t=1,this.navIndex<this.items.length-1&&this.navIndex++}for(this.navigating=!0;g.hasClass(this.items[this.navIndex],"disabled")||g.hasClass(this.items[this.navIndex],"excluded");){if(!(0<this.navIndex&&this.navIndex<this.items.length-1)){this.navIndex=s;break}if(t?this.navIndex++:this.navIndex--,this.searching){if(this.navIndex>this.tree.lastElementChild.idx){this.navIndex=this.tree.lastElementChild.idx;break}if(this.navIndex<this.tree.firstElementChild.idx){this.navIndex=this.tree.firstElementChild.idx;break}}}var n=g.rect(this.items[this.navIndex]);t?(0===this.navIndex?this.tree.scrollTop=0:n.top+n.height>this.optsRect.top+this.optsRect.height&&(this.tree.scrollTop=this.tree.scrollTop+(n.top+n.height-(this.optsRect.top+this.optsRect.height))),this.navIndex===this.tree.childElementCount-1&&this.requiresPagination&&o.call(this)):0===this.navIndex?this.tree.scrollTop=0:n.top-this.optsRect.top<0&&(this.tree.scrollTop=this.tree.scrollTop+(n.top-this.optsRect.top)),i&&g.removeClass(i,"active"),g.addClass(this.items[this.navIndex],"active")}else this.navigating=!1}.bind(this),this.events.reset=this.reset.bind(this),this.config.nativeDropdown||this.mobileDevice){this.container.addEventListener("touchstart",function(e){e.changedTouches[0].target===n.el&&n.toggle()},!!this.supportsEventPassiveOption&&{passive:!0}),this.container.addEventListener("click",function(e){e.target===n.el&&n.toggle()});this.el.addEventListener("change",function(e){if(!e.__selfTriggered)if(n.el.multiple){var t=n.getSelectedProperties("idx"),i=function(e,t){for(var i,s=[],n=e.slice(0),a=0;a<t.length;a++)-1<(i=n.indexOf(t[a]))?n.splice(i,1):s.push(t[a]);return[s,n]}(n.selectedIndexes,t);g.each(i[0],function(e,t){n.select(t)},n),g.each(i[1],function(e,t){n.deselect(t)},n)}else-1<n.el.selectedIndex&&n.select(n.el.selectedIndex)})}if(this.config.nativeDropdown&&this.container.addEventListener("keydown",function(e){"Enter"===e.key&&n.selected===document.activeElement&&(n.toggle(),setTimeout(function(){n.el.focus()},200))}),this.selected.addEventListener("click",function(e){n.disabled||n.toggle(),e.preventDefault()}),this.config.nativeKeyboard){var i="";this.selected.addEventListener("keydown",function(e){if(!(n.disabled||n.selected!==document.activeElement||e.altKey||e.ctrlKey||e.metaKey)){if(" "===e.key||!n.opened&&-1<["Enter","ArrowUp","ArrowDown"].indexOf(e.key))return n.toggle(),e.preventDefault(),void e.stopPropagation();if(e.key.length<=2&&String[String.fromCodePoint?"fromCodePoint":"fromCharCode"](e.key[String.codePointAt?"codePointAt":"charCodeAt"](0))===e.key){if(n.config.multiple)n.open(),n.config.searchable&&(n.input.value=e.key,n.input.focus(),n.search(null,!0));else{null,i+=e.key;var t=n.search(i,!0);t&&t.length&&(n.clear(),n.setValue(t[0].value)),setTimeout(function(){i=""},1e3)}return e.preventDefault(),void e.stopPropagation()}}}),this.container.addEventListener("keyup",function(e){n.opened&&"Escape"===e.key&&(n.close(),e.stopPropagation(),n.selected.focus())})}this.label.addEventListener("click",function(e){g.hasClass(e.target,"selectr-tag-remove")&&n.deselect(e.target.parentNode.idx)}),this.selectClear&&this.selectClear.addEventListener("click",this.clear.bind(this)),this.tree.addEventListener("mousedown",function(e){e.preventDefault()}),this.tree.addEventListener("click",function(e){var t=g.closest(e.target,function(e){return e&&g.hasClass(e,"selectr-option")});t&&(g.hasClass(t,"disabled")||(g.hasClass(t,"selected")?(n.el.multiple||!n.el.multiple&&n.config.allowDeselect)&&n.deselect(t.idx):n.select(t.idx),n.opened&&!n.el.multiple&&n.close())),e.preventDefault(),e.stopPropagation()}),this.tree.addEventListener("mouseover",function(e){g.hasClass(e.target,"selectr-option")&&(g.hasClass(e.target,"disabled")||(g.removeClass(n.items[n.navIndex],"active"),g.addClass(e.target,"active"),n.navIndex=[].slice.call(n.items).indexOf(e.target)))}),this.config.searchable&&(this.input.addEventListener("focus",function(e){n.searching=!0}),this.input.addEventListener("blur",function(e){n.searching=!1}),this.input.addEventListener("keyup",function(e){n.search(),n.config.taggable||(this.value.length?g.addClass(this.parentNode,"active"):g.removeClass(this.parentNode,"active"))}),this.inputClear.addEventListener("click",function(e){n.input.value=null,l.call(n),n.tree.childElementCount||a.call(n)})),this.config.taggable&&this.input.addEventListener("keyup",function(e){if(n.search(),n.config.taggable&&this.value.length){var t=this.value.trim();if(t.length&&(13===e.which||n.tagSeperatorsRegex.test(t))){var i,s=t.replace(n.tagSeperatorsRegex,"");(s=(s=g.escapeRegExp(s)).trim()).length&&(i=n.add({value:s,textContent:s,selected:!0},!0)),i?(n.close(),l.call(n)):(this.value="",n.setMessage(n.config.messages.tagDuplicate))}}}),this.update=g.debounce(function(){n.opened&&n.config.closeOnScroll&&n.close(),n.width&&(n.container.style.width=n.width),n.invert()},50),this.requiresPagination&&(this.paginateItems=g.debounce(function(){o.call(this)},50),this.tree.addEventListener("scroll",this.paginateItems.bind(this))),document.addEventListener("click",this.events.dismiss),window.addEventListener("keydown",this.events.navigate),window.addEventListener("resize",this.update),window.addEventListener("scroll",this.update),this.on("selectr.destroy",function(){document.removeEventListener("click",this.events.dismiss),window.removeEventListener("keydown",this.events.navigate),window.removeEventListener("resize",this.update),window.removeEventListener("scroll",this.update)}),this.el.form&&(this.el.form.addEventListener("reset",this.events.reset),this.on("selectr.destroy",function(){this.el.form.removeEventListener("reset",this.events.reset)}))},t.prototype.setSelected=function(e){if(this.config.data||this.el.multiple||!this.el.options.length||(0===this.el.selectedIndex&&(this.el.options[0].defaultSelected||this.config.defaultSelected||(this.el.selectedIndex=-1)),this.selectedIndex=this.el.selectedIndex,-1<this.selectedIndex&&this.select(this.selectedIndex)),this.config.multiple&&"select-one"===this.originalType&&!this.config.data&&this.el.options[0].selected&&!this.el.options[0].defaultSelected&&(this.el.options[0].selected=!1),g.each(this.options,function(e,t){t.selected&&t.defaultSelected&&this.select(t.idx)},this),this.config.selectedValue&&this.setValue(this.config.selectedValue),this.config.data){!this.el.multiple&&this.config.defaultSelected&&this.el.selectedIndex<0&&0<this.config.data.length&&this.select(0);var i=0;g.each(this.config.data,function(e,t){r(t,"children")?g.each(t.children,function(e,t){t.hasOwnProperty("selected")&&!0===t.selected&&this.select(i),i++},this):(t.hasOwnProperty("selected")&&!0===t.selected&&this.select(i),i++)},this)}},t.prototype.destroy=function(){this.rendered&&(this.emit("selectr.destroy"),"select-one"===this.originalType&&(this.el.multiple=!1),this.config.data&&(this.el.innerHTML=""),g.removeClass(this.el,"selectr-hidden"),this.container.parentNode.replaceChild(this.el,this.container),this.rendered=!1,delete this.el.selectr)},t.prototype.change=function(e){var t=this.items[e],i=this.options[e];i.disabled||(i.selected&&g.hasClass(t,"selected")?this.deselect(e):this.select(e),this.opened&&!this.el.multiple&&this.close())},t.prototype.select=function(s){var e=this.items[s],t=[].slice.call(this.el.options),i=this.options[s];if(this.el.multiple){if(g.includes(this.selectedIndexes,s))return!1;if(this.config.maxSelections&&this.tags.length===this.config.maxSelections)return this.setMessage(this.config.messages.maxSelections.replace("{max}",this.config.maxSelections),!0),!1;this.selectedValues.push(i.value),this.selectedIndexes.push(s),function(e){var c,r=this,i=document.createDocumentFragment(),t=this.options[e.idx],s=this.data?this.data[e.idx]:t,n={class:"selectr-tag"};this.customSelected?n.html=this.config.renderSelection(s):n.textContent=t.textContent;var a=g.createElement("li",n),l=g.createElement("button",{class:"selectr-tag-remove",type:"button"});if(a.appendChild(l),a.idx=e.idx,a.tag=t.value,this.tags.push(a),this.config.sortSelected){var o=this.tags.slice();c=function(e,s){e.replace(/(\d+)|(\D+)/g,function(e,t,i){s.push([t||1/0,i||""])})},o.sort(function(e,t){var i,s,n=[],a=[];for(!0===r.config.sortSelected?(i=e.tag,s=t.tag):"text"===r.config.sortSelected&&(i=e.textContent,s=t.textContent),c(i,n),c(s,a);n.length&&a.length;){var l=n.shift(),o=a.shift(),h=l[0]-o[0]||l[1].localeCompare(o[1]);if(h)return h}return n.length-a.length}),g.each(o,function(e,t){i.appendChild(t)}),this.label.innerHTML=""}else i.appendChild(a);this.config.taggable?this.label.insertBefore(i,this.input.parentNode):this.label.appendChild(i)}.call(this,e)}else{var n=this.data?this.data[s]:i;this.customSelected?this.label.innerHTML=this.config.renderSelection(n):this.label.textContent=i.textContent,this.selectedValue=i.value,this.selectedIndex=s,g.each(this.options,function(e,t){var i=this.items[e];e!==s&&(i&&g.removeClass(i,"selected"),t.selected=!1,t.removeAttribute("selected"))},this)}if(g.includes(t,i)||this.el.add(i),e.setAttribute("aria-selected",!0),g.addClass(e,"selected"),g.addClass(this.container,"has-selected"),i.selected=!0,i.setAttribute("selected",""),this.emit("selectr.change",i),this.emit("selectr.select",i),"createEvent"in document){var a=document.createEvent("HTMLEvents");a.initEvent("change",!0,!0),a.__selfTriggered=!0,this.el.dispatchEvent(a)}else this.el.fireEvent("onchange")},t.prototype.deselect=function(e,t){var i=this.items[e],s=this.options[e];if(this.el.multiple){var n=this.selectedIndexes.indexOf(e);this.selectedIndexes.splice(n,1);var a=this.selectedValues.indexOf(s.value);this.selectedValues.splice(a,1),function(i){var s=!1;g.each(this.tags,function(e,t){t.idx===i.idx&&(s=t)},this),s&&(this.label.removeChild(s),this.tags.splice(this.tags.indexOf(s),1))}.call(this,i),this.tags.length||g.removeClass(this.container,"has-selected")}else{if(!t&&!this.config.clearable&&!this.config.allowDeselect)return!1;this.label.innerHTML="",this.selectedValue=null,this.el.selectedIndex=this.selectedIndex=-1,g.removeClass(this.container,"has-selected")}if(this.items[e].setAttribute("aria-selected",!1),g.removeClass(this.items[e],"selected"),s.selected=!1,s.removeAttribute("selected"),this.emit("selectr.change",null),this.emit("selectr.deselect",s),"createEvent"in document){var l=document.createEvent("HTMLEvents");l.initEvent("change",!0,!0),l.__selfTriggered=!0,this.el.dispatchEvent(l)}else this.el.fireEvent("onchange")},t.prototype.setValue=function(i){var s=Array.isArray(i);if(s||(i=i.toString().trim()),!this.el.multiple&&s)return!1;g.each(this.options,function(e,t){(s&&-1<i.indexOf(t.value)||t.value===i)&&this.change(t.idx)},this)},t.prototype.getValue=function(e,t){var s;if(this.el.multiple)e?this.selectedIndexes.length&&(s={values:[]},g.each(this.selectedIndexes,function(e,t){var i=this.options[t];s.values[e]={value:i.value,text:i.textContent}},this)):s=this.selectedValues.slice();else if(e){var i=this.options[this.selectedIndex];s={value:i.value,text:i.textContent}}else s=this.selectedValue;return e&&t&&(s=JSON.stringify(s)),s},t.prototype.add=function(i,s){if(i){if(this.data=this.data||[],this.items=this.items||[],this.options=this.options||[],Array.isArray(i))g.each(i,function(e,t){this.add(t,s)},this);else if("[object Object]"===Object.prototype.toString.call(i)){if(s){var n=!1;if(g.each(this.options,function(e,t){t.value.toLowerCase()===i.value.toLowerCase()&&(n=!0)}),n)return!1}var e=g.createElement("option",i);return this.data.push(i),this.mobileDevice&&this.el.add(e),this.options.push(e),e.idx=0<this.options.length?this.options.length-1:0,d.call(this,e),i.selected&&this.select(e.idx),this.setPlaceholder(),e}return this.config.pagination&&this.paginate(),!0}},t.prototype.remove=function(e){var s,i=[];Array.isArray(e)?g.each(e,function(e,t){g.isInt(t)?i.push(this.getOptionByIndex(t)):"string"==typeof t&&i.push(this.getOptionByValue(t))},this):g.isInt(e)?i.push(this.getOptionByIndex(e)):"string"==typeof e&&i.push(this.getOptionByValue(e)),i.length&&(g.each(i,function(e,t){s=t.idx,this.el.remove(t),this.options.splice(s,1);var i=this.items[s].parentNode;i&&i.removeChild(this.items[s]),this.items.splice(s,1),g.each(this.options,function(e,t){t.idx=e,this.items[e].idx=e},this)},this),this.setPlaceholder(),this.config.pagination&&this.paginate())},t.prototype.removeAll=function(){this.clear(!0),g.each(this.el.options,function(e,t){this.el.remove(t)},this),g.truncate(this.tree),this.items=[],this.options=[],this.data=[],this.navIndex=0,this.requiresPagination&&(this.requiresPagination=!1,this.pageIndex=1,this.pages=[]),this.setPlaceholder()},t.prototype.search=function(r,e){if(!this.navigating){var d=!1;r||(r=this.input.value,d=!0,this.removeMessage(),g.truncate(this.tree));var p=[],u=document.createDocumentFragment();if(0<(r=r.trim().toLowerCase()).length){var f=e?g.startsWith:g.includes;if(g.each(this.options,function(e,t){var i=this.items[t.idx],s=t.textContent.trim().toLowerCase().replace(/-|\s/g,""),n=r.replace(/-|\s/g,"");if(f(s,n)&&!t.disabled){var a=g.textEquals(s,n),l=t.getAttribute("data-search-params");if(!a&&l)for(var o=l.split(","),h=0;h<o.length&&!(a=g.textEquals(o[h],n));h++);var c={text:t.textContent,value:t.value};a?p.unshift(c):p.push(c),d&&(v(i,u,this.customOption,a),g.removeClass(i,"excluded"),this.customOption||function(e,t){var i=t.textContent,s=new RegExp(e,"ig"),n=s.exec(i);if(n){t.innerHTML="";var a=document.createElement("span");return a.classList.add("selectr-match"),a.textContent=n[0],t.appendChild(document.createTextNode(i.substring(0,n.index))),t.appendChild(a),t.appendChild(document.createTextNode(i.substring(s.lastIndex)))}}(r,i))}else d&&g.addClass(i,"excluded")},this),d){if(u.childElementCount){var t=this.items[this.navIndex],i=u.querySelector(".selectr-option:not(.excluded)");this.noResults=!1,g.removeClass(t,"active"),this.navIndex=i.idx,g.addClass(i,"active")}else this.config.taggable||(this.noResults=!0,this.setMessage(this.config.messages.noResults));this.tree.appendChild(u)}}else a.call(this);return p}},t.prototype.toggle=function(){this.disabled||(this.opened?this.close():this.open())},t.prototype.open=function(){var e=this;return!!this.options.length&&(this.opened||this.emit("selectr.open"),this.opened=!0,this.mobileDevice||this.config.nativeDropdown?(g.addClass(this.container,"native-open"),void(this.config.data&&0===this.el.options.length&&g.each(this.options,function(e,t){this.el.add(t)},this))):(g.addClass(this.container,"open"),a.call(this),this.invert(),this.tree.scrollTop=0,g.removeClass(this.container,"notice"),this.selected.setAttribute("aria-expanded",!0),this.tree.setAttribute("aria-hidden",!1),this.tree.setAttribute("aria-expanded",!0),void(this.config.searchable&&!this.config.taggable&&setTimeout(function(){e.input.focus(),e.input.tabIndex=0},10))))},t.prototype.close=function(){if(this.opened&&this.emit("selectr.close"),this.opened=!1,this.navigating=!1,this.mobileDevice||this.config.nativeDropdown)g.removeClass(this.container,"native-open");else{var e=g.hasClass(this.container,"notice");this.config.searchable&&!e&&(this.input.blur(),this.input.tabIndex=-1,this.searching=!1),e&&(g.removeClass(this.container,"notice"),this.notice.textContent=""),g.removeClass(this.container,"open"),g.removeClass(this.container,"native-open"),this.selected.setAttribute("aria-expanded",!1),this.tree.setAttribute("aria-hidden",!0),this.tree.setAttribute("aria-expanded",!1),g.truncate(this.tree),l.call(this)}},t.prototype.enable=function(){this.disabled=!1,this.el.disabled=!1,this.selected.tabIndex=this.originalIndex,this.el.multiple&&g.each(this.tags,function(e,t){t.lastElementChild.tabIndex=0}),g.removeClass(this.container,"selectr-disabled")},t.prototype.disable=function(e){e||(this.el.disabled=!0),this.selected.tabIndex=-1,this.el.multiple&&g.each(this.tags,function(e,t){t.lastElementChild.tabIndex=-1}),this.disabled=!0,g.addClass(this.container,"selectr-disabled")},t.prototype.reset=function(){this.disabled||(this.clear(),this.setSelected(!0),g.each(this.defaultSelected,function(e,t){this.select(t)},this),this.emit("selectr.reset"))},t.prototype.clear=function(e,t){if(this.el.multiple){if(this.selectedIndexes.length){var i=this.selectedIndexes.slice();t?this.deselect(i.slice(-1)[0]):g.each(i,function(e,t){this.deselect(t)},this)}}else-1<this.selectedIndex&&this.deselect(this.selectedIndex,e);this.emit("selectr.clear")},t.prototype.serialise=function(e){var s=[];return g.each(this.options,function(e,t){var i={value:t.value,text:t.textContent};t.selected&&(i.selected=!0),t.disabled&&(i.disabled=!0),s[e]=i}),e?JSON.stringify(s):s},t.prototype.serialize=function(e){return this.serialise(e)},t.prototype.setPlaceholder=function(e){e=e||this.config.placeholder||this.el.getAttribute("placeholder"),this.options.length||(e=this.config.messages.noOptions),this.placeEl.innerHTML=e},t.prototype.paginate=function(){if(this.items.length){var i=this;return this.pages=this.items.map(function(e,t){return t%i.config.pagination==0?i.items.slice(t,t+i.config.pagination):null}).filter(function(e){return e}),this.pages}},t.prototype.setMessage=function(e,t){t&&this.close(),g.addClass(this.container,"notice"),this.notice.textContent=e},t.prototype.removeMessage=function(){g.removeClass(this.container,"notice"),this.notice.innerHTML=""},t.prototype.invert=function(){var e=g.rect(this.selected),t=this.tree.parentNode.offsetHeight,i=window.innerHeight;e.top+e.height+t>i?(g.addClass(this.container,"inverted"),this.isInverted=!0):(g.removeClass(this.container,"inverted"),this.isInverted=!1),this.optsRect=g.rect(this.tree)},t.prototype.getOptionByIndex=function(e){return this.options[e]},t.prototype.getOptionByValue=function(e){for(var t=!1,i=0,s=this.options.length;i<s;i++)if(this.options[i].value.trim()===e.toString().trim()){t=this.options[i];break}return t},t});