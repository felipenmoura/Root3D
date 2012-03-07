/*
	Developed by Felipe N. Moura <http://felipenmoura.org>
	Under MIT license.
*/
window.root3D= {
			isUnderDev: false,
			copiedElements: false,
			currentProject: null,
			DEFAULTS: {
				elementStyle:{
					'elName': '',
					width: 50,
					height: 50,
					borderStyle: 'solid',
					borderWidth: 1,
					borderColor: '#000000',
					borderRadius: [0, 0, 0, 0],
					backgroundColor: '#ff0000',
					backgroundImage: 'none',
					background: '',
					translateX: 0,
					translateY: 0,
					translateZ: 0,
					rotateX: 0,
					rotateY: 0,
					rotateZ: 0,
					scale: 1,
					opacity: 1,
					innerHTML: ''
				},
				defaultProject: 'Testing_1'
			},
			CONF: {
				session: {
					name: null,
					email: null
				}
			},
			isAuth: function(){
				if(root3D.CONF.session.name != null || root3D.isUnderDev)
					return true;
				return false;
			},
			closeDialogs: function(){
				
				$( "#dialog:ui-dialog" ).dialog( "destroy" );
				$('#welcomeScreen').dialog('destroy');
				$("#mustAuthMessage").dialog("destroy");
				$("#feedbackPannel").dialog("destroy");
				$( "#dialog-save" ).dialog("destroy");
				$( "#dialog-load" ).dialog("destroy");
				$( "#dialog-demos" ).dialog("destroy");
				
			},
			elementList: {},
			selected: {},
			editingColorOf: null,
            parseElements: function(){
                var elList= [];
                $('#elementList option').each(function(){
                    if(this.value == '')
                        return true;
                    elList.push($('#'+this.value).data());
                });
                return JSON.stringify(elList);
            },
			sessionInitialized: function(nameFirst, nameLast, email){
				root3D.closeDialogs();
				root3D.CONF.session.name= nameFirst + ' ' +nameLast;
				root3D.CONF.session.email= email;
			},
			addElement: function(type, elData){
				var el= null,
					s= document.getElementById('stage'),
					_el;
				if(!type){
					el= document.createElement('div');
					el.className= 'element';
					
					if(!elData)
						var elData= root3D.DEFAULTS.elementStyle;
						
					_el= $(el);
					_el.css({
						width: elData.width+'px',
						height: elData.height+'px',
						/*top: ((s.offsetHeight/2) - 58)+'px',
						left: ((s.offsetWidth/2))+'px',*/
						bottom: '50%',
						left: '50%',
						borderStyle: elData.borderStyle||'solid',
						borderWidth: elData.borderWidth||1,
						borderColor: elData.borderColor||'#000000',
						borderRadius: elData.borderRadius.join('px ')||'0px 0px 0px 0px',
						backgroundColor: elData.backgroundColor||'#ff0000',
						backgroundImage: elData.backgroundImage||'none',
						opacity: elData.opacity||1
					});
					if(elData.background && elData.background.replace(/ /g) != '')
						_el.css('background', elData.background);
						
					if(elData.border && elData.border.replace(/ /g) != '')
						_el.css('border', elData.border);
					
					transform=  "translateX("+(elData.translateX||0)+"px) "+
								"translateY("+(elData.translateY||0)+"px) "+
								"translateZ("+(elData.translateZ||0)+"px) "+
								"rotateX("+elData.rotateX||0+"deg) "+
								"rotateY("+elData.rotateY||0+"deg) "+
								"rotateZ("+elData.rotateZ||0+"deg) "+
								"scale("+elData.scale||1+") ";
					el.style.MozTransform= transform;
					el.style.WebkitTransform= transform;
					el.style.MsTransform= transform;
					el.style.OTransform= transform;
					el.style.transform= transform;
					
					_el.html(elData.innerHTML);
					
					var d= new Date();
					el.id= elData.elName||d.getTime();
					_el.data(elData);
                    _el.data('elName', el.id);
					/*_el.data({
						top: ((s.offsetHeight/2) - 58),
						left: ((s.offsetWidth/2))
					});*/
				}
				s.appendChild(el);
                $(el).data('noApply', true);
                $('#elementList').append("<option value='"+el.id+"' id='elListItem-"+el.id+"'>"+_el.data('elName')+"</option>");
				$(el).trigger('click');
				//root3D.setElementTextContent(elData.innerHTML);
                $(el).data('noApply', false);
				root3D.elementList[el.id]= $(el);
				//root3D.selectElement(el);
				return root3D.elementList[el.id];
				//$(el).draggable();
			},
			clearStage: function(){
				root3D.descelectAll();
				$('#stage .element').remove();
				root3D.currentProject= root3D.DEFAULTS.defaultProject;
				$('#elementList').html("<option value='' selected>Select Element</option>");
			},
			saveProjectAs: function(){
			
				root3D.closeDialogs();
				
				$('#pName').val(root3D.currentProject);
				
				$("#dialog-save").dialog({
					resizable: false,
					height:190,
					modal: false,
					buttons: {
						Cancel: function() {
							$( this ).dialog( "close" );
						},
						"Save": function() {
						
							if($('#pName').val() == root3D.currentProject)
								if(!confirm("Are you sure you want to overwrite this project?"))
									return false;

							if(!root3D.isAuth())
								return false;
							
							root3D.saveProject($('#pName').val());
							//root3D.currentProject= $('#pName').val();
							
						}
					}
				});
			},
			saveProject: function(pName){
				if(!root3D.isAuth()){
					alert("Sorry, if you want to save your project, you have to authenticate first");
					return false;
				}
				
				//$('#dialog-save-msgPanel').html("Please wait...");
				$('#status').html("<strong class='loading'>Please wait...</strong>");
				
				var elList= root3D.parseElements();

				if(!elList || elList == '[]'){
					//$('#dialog-save-msgPanel').html("No elements to save!");
					$('#status').html("<strong style='color: red'>No elements to save!</strong>");
					root3D.clearStatusBar();
					root3D.closeDialogs();
					return false;
				}
// here			
				if(pName)
					root3D.currentProject= pName;
					
				$.ajax({
					url: 'service.php',
					type: 'post',
					data:{
						projectName: root3D.currentProject,
						elementList: elList
					},
					complete: function(xhr, ret){
						//$('#dialog-save-msgPanel').html(ret);
						root3D.closeDialogs();
						$('#status').html(xhr.responseText);
						root3D.clearStatusBar();
					}
				});
				root3D.closeDialogs();
			},
			clearStatusBar: function(){
				setTimeout(function(){
					$('#status').html("");
				}, 3000);
			},
			descelectAll: function(){
				$('.selected').removeClass('selected');
				$('.selection').remove();
				root3D.selected= {};
				
				if(Object.keys(root3D.selected).length == 0)
				{
					$('#elementProperties').addClass('hiddenEl');
				}
                $('#elementList').val('');
			},
			camera: { // translateX(0px) translateY(0px) translateZ(770px) rotateX(-14deg) rotateY(-26deg) rotateZ(3deg);
				x: 0,
				y: 0,
				z: 770,
				rx: -14,
				ry: -26,
				rz: 3
			},
			getCameraTransformation: function(){
				var t=  "translateX("+root3D.camera.x+"px) "+
						"translateY("+root3D.camera.y+"px) "+
						"translateZ("+root3D.camera.z+"px) "+
						"rotateX("+root3D.camera.rx+"deg) "+
						"rotateY("+root3D.camera.ry+"deg) "+
						"rotateZ("+root3D.camera.rz+"deg) ";
				return t;
			},
			draggingMapPos: false,
			draggingMap: function(event){
				if(!root3D.draggingMapPos){
					root3D.draggingMapPos= [event.clientX, event.clientY];
					return;
				}
				
				if(event.button==0 && event.ctrlKey){
					root3D.camera.ry= (root3D.camera.ry)+(((root3D.draggingMapPos[0] - event.clientX)/10)*-1);
					root3D.camera.rx= (root3D.camera.rx)+(((root3D.draggingMapPos[1] - event.clientY)/10));
				}else if(event.button == 0 && event.shiftKey){
						/*root3D.camera.rz= (root3D.camera.rz)+(((root3D.draggingMapPos[0] - event.clientX)/300)*-1);
						//root3D.camera.y= (root3D.camera.y)+(((root3D.draggingMapPos[1] - event.clientY)/2)*-1);
						event.cancelBubble= true;
						event.stopPropagation();
						event.returnValue= false;
						return false;*/
					  }else{
							root3D.camera.x= (root3D.camera.x)+(((root3D.draggingMapPos[0] - event.clientX)/2)*-1);
							root3D.camera.y= (root3D.camera.y)+(((root3D.draggingMapPos[1] - event.clientY)/2)*-1);
							root3D.camera.z= (root3D.camera.z)+(((root3D.draggingMapPos[1] - event.clientY)/2)*-1);
						   }
				
				root3D.draggingMapPos= [event.clientX, event.clientY];
				var t= root3D.getCameraTransformation();
				document.getElementById('stage').style.MozTransform= t;
				document.getElementById('stage').style.MsTransform= t;
				document.getElementById('stage').style.OTransform= t;
				document.getElementById('stage').style.transform= t;
				document.getElementById('stage').style.WebkitTransform= t;
			},
			getProps: function(that){
				var _that= $(that);
				//_that.addClass('selected');
				var oCSS= _that.data();
				
                _that.data('noApply', true);
				$('#elementProperties').removeClass('hiddenEl');
				// AQUI
				$('#colorPickerBG').ColorPickerSetColor(oCSS.backgroundColor);
				$('#colorPickerBorder').ColorPickerSetColor(oCSS.borderColor);
				$('#element-backgroundImage').val(oCSS.backgroundImage);
				$('#element-backgroundString').val(oCSS.background);
				$('#element-borderWidth').slider('option', 'value', parseInt(oCSS.borderWidth));
				$('#element-BorderString').val(oCSS.border);
                
				var bR= $('#element-BorderRadius input');
				if(oCSS.borderRadius.split)
					oCSS.borderRadius= oCSS.borderRadius.split(' ');
				bR.eq(0).val(parseInt(oCSS.borderRadius[0]).toFixed(2)||0);
				bR.eq(1).val(parseInt(oCSS.borderRadius[1]).toFixed(2)||0);
				bR.eq(2).val(parseInt(oCSS.borderRadius[2]).toFixed(2)||0);
				bR.eq(3).val(parseInt(oCSS.borderRadius[3]).toFixed(2)||0);
				//alert(oCSS.borderRadius[1])
				
                var tmpEl= null, tmpElText= null;
                
                tmpEl= document.getElementById('left');
                tmpElText= document.getElementById('left_text');
				$(tmpEl).slider('option', 'value', (oCSS.translateX*2) + parseFloat(tmpEl.getAttribute('sub') || 0));
                tmpElText.value= (oCSS.translateX*2);
                
                tmpEl= document.getElementById('top');
                tmpElText= document.getElementById('top_text');
				$(tmpEl).slider('option', 'value', (oCSS.translateY*2)*(-1) + parseFloat(tmpEl.getAttribute('sub') || 0));
                tmpElText.value= ((oCSS.translateY*2) * (-1));
                
                tmpEl= document.getElementById('distance');
                tmpElText= document.getElementById('distance_text');
				$(tmpEl).slider('option', 'value', (oCSS.translateZ*2) + parseFloat(tmpEl.getAttribute('sub') || 0));
                tmpElText.value= (oCSS.translateZ*2);
                
                tmpEl= document.getElementById('width');
                tmpElText= document.getElementById('width_text');
				$(tmpEl).slider('option', 'value', (oCSS.width*2) + parseFloat(tmpEl.getAttribute('sub') || 0));
                tmpElText.value= (oCSS.width*2);
                
                tmpEl= document.getElementById('height');
                tmpElText= document.getElementById('height_text');
				$(tmpEl).slider('option', 'value', (oCSS.height*2) + parseFloat(tmpEl.getAttribute('sub') || 0));
                tmpElText.value= (oCSS.height*2);
                
                tmpEl= document.getElementById('opacity');
                tmpElText= document.getElementById('opacity_text');
				$(tmpEl).slider('option', 'value', (oCSS.opacity * 100));
                tmpElText.value= (oCSS.opacity*100);
                
                tmpEl= document.getElementById('rotateH');
                tmpElText= document.getElementById('rotateH_text');
				$(tmpEl).slider('option', 'value', parseFloat(oCSS.rotateX || 0));
                tmpElText.value= (oCSS.rotateX);
                
                tmpEl= document.getElementById('rotateV');
                tmpElText= document.getElementById('rotateV_text');
                $(tmpEl).slider('option', 'value', parseFloat(oCSS.rotateY));
                tmpElText.value= (oCSS.rotateY);
                
                tmpEl= document.getElementById('rotateZ');
                tmpElText= document.getElementById('rotateZ_text');
				$(tmpEl).slider('option', 'value', parseFloat(oCSS.rotateZ || 0));
                tmpElText.value= (oCSS.rotateZ);
                
                tmpEl= document.getElementById('scale');
                tmpElText= document.getElementById('scale_text');
				$(tmpEl).slider('option', 'value', (oCSS.scale * 100));
                tmpElText.value= (oCSS.scale*100);
                
				document.getElementById('element-textString').value= oCSS.innerHTML;
				document.getElementById('element-customString').value= oCSS.customString||'';
                document.getElementById('element-id').value= _that.data('elName');
                $('#elementList').val(that.id);
                    
			},
			selectElement: function(that){
			
				var _that= $(that);
				var clone= that.cloneNode(true);
				clone.id= clone.id.replace(/\-clone$/, '')+'-clone';
				root3D.selected[that.id]= {
					el: that/*,
					'clone': clone*/
				};
                
				$(clone).addClass('selection');
				//clone.innerHTML= '';
				document.getElementById('stage').appendChild(clone);
				
				root3D.getProps(that);
				
                _that.data('noApply', false);
			},
			setElementBorder: function(color, width, extra){
				var selected= Object.keys(root3D.selected),
					i= 0,
					l= selected.length,
					css= {};
					
				if(color)
					css.borderColor= '#'+color;
				if(width || width === 0)
					css.borderWidth= width+'px';
				if(extra || extra === '')
					css.border= extra;
					
				if(selected.length){
					for(; i<l; i++){
						$(root3D.selected[selected[i]].el).css(css).
							data(css);
					}
				}
			},
			setElementBg: function(color, img, extra){
				var selected= Object.keys(root3D.selected),
					i= 0,
					l= selected.length,
					css= {};
					
				if(extra || extra === '')
					css.background= extra;
				if(color)
					css.backgroundColor= "#"+color;
				if(img || img===''){
					if(img === '' || img.indexOf('http://')<0)
						css.backgroundImage= img;
					else
						css.backgroundImage= 'url('+img+')';
				}
				
				if(selected.length){
					for(; i<l; i++){
						$(root3D.selected[selected[i]].el).css(css).data(css);
					}
				}
			},
			setBorderRadius: function(_ipts){
				var br= '', brList= [];
				_ipts.each(function(){
					br+= parseFloat(this.value)+'px ';
					brList.push(parseFloat(this.value));
				});
				var selected= Object.keys(root3D.selected),
					i= 0,
					l= selected.length;
				if(selected.length){
					for(; i<l; i++){
						root3D.selected[selected[i]].el.style.borderRadius= br;
						$(root3D.selected[selected[i]].el).data('borderRadius', brList);
					}
				}
			},
			setCustomCSS: function(jsonStr, validate){
				try{
					json= JSON.parse(jsonStr);
				}catch(e){
					if(validate && jsonStr.replace(/[ \t\n]/g, '')!= '')
						alert("Invalid JSON structure");
					return false;
				}
				var selected= Object.keys(root3D.selected),
					i= 0,
					l= selected.length;
				if(selected.length){
					for(; i<l; i++){
						$(root3D.selected[selected[i]].el).css(json).data('customString', jsonStr);
						for(var x in json){
							console.log(json, x, json.hasOwnProperty(x));
							if(json.hasOwnProperty(x)){
								$(root3D.selected[selected[i]].el).data(x, json.x);
							}
						}
						root3D.getProps(root3D.selected[selected[i]].el);
					}
				}
			},
			setElementProperties: function(el){
				var keys= Object.keys(root3D.selected),
					i= keys.length,
					el= null,
					s= 1, o= 1,
					transform= null,
					props= {};
					
				if(i){
					do{
						el= root3D.selected[keys[i-1]].el;
                        
						props.scale= (document.getElementById('scale_text').value||100)/100;
						props.opacity= (document.getElementById('opacity_text').value||100)/100;
						props.translateX= (document.getElementById('left_text').value||0)/2;
						props.translateY= ((document.getElementById('top_text').value||0)/2) *(-1);
						props.translateZ= (document.getElementById('distance_text').value||0)/2;
						
						props.rotateX= (document.getElementById('rotateH_text').value||0);
						props.rotateY= (document.getElementById('rotateV_text').value||0);
						props.rotateZ= (document.getElementById('rotateZ_text').value||0);
						
						if(document.getElementById('width_text').value)
							props.width= document.getElementById('width_text').value/2;
						if(document.getElementById('height_text').value)
							props.height= document.getElementById('height_text').value/2;
                        
						if($(el).data('noApply'))
                            continue;
						
						transform=  "translateX("+props.translateX+"px) "+
									"translateY("+props.translateY+"px) "+
									"translateZ("+props.translateZ+"px) "+
									"rotateX("+props.rotateX+"deg) "+
									"rotateY("+props.rotateY+"deg) "+
									"rotateZ("+props.rotateZ+"deg) "+
									"scale("+props.scale+") ";
						el.style.MozTransform= transform;
						el.style.MsTransform= transform;
						el.style.OTransform= transform;
						el.style.transform= transform;
						el.style.WebkitTransform= transform;
						
						if(props.width)
							el.style.width= props.width+"px";
						if(props.height)
							el.style.height= props.height+"px";
						
						el.style.opacity= props.opacity;
						$(el).data(props);
					}while(--i);
				}
			},
			setElementTextContent: function(str){
				str= str.replace(/<script /ig, '');
				str= str.replace(/<style /ig, '');
				str= str.replace(/<object /ig, '');
				str= str.replace(/<link /ig, '');
				str= str.replace(/<iframe /ig, '');
				
				var keys= Object.keys(root3D.selected),
					i= keys.length,
					el= null,
					s= 1, o= 1,
					transform= null;
				if(i){
					do{
						el= root3D.selected[keys[i-1]].el;
						el.innerHTML= str;
						$(el).data('innerHTML', str)
					}while(--i);
				}
			},
			removeElements: function(){
				if(!confirm('Are you sure you want to remove the selected elements?'))
					return false;
				var keys= Object.keys(root3D.selected),
					i= keys.length,
					el= null,
					s= 1, o= 1,
					transform= null;
				if(i){
					do{
						el= root3D.selected[keys[i-1]].el;
						root3D.elementList[el.id]= false;
                        $('#elementList').remove("#elListItem-"+el.id);
						delete root3D.elementList[el.id];
						el.parentNode.removeChild(el);
					}while(--i);
				}
				root3D.descelectAll();
			},
			renameElements: function(id){
				var keys= Object.keys(root3D.selected),
					i= keys.length,
					el= null,
					s= 1, o= 1,
					transform= null;
				if(i){
					do{
						$(root3D.selected[keys[i-1]].el).data('elName', id);
                        $("#elementList #elListItem-"+root3D.selected[keys[i-1]].el.id)[0].innerHTML= id;
					}while(--i);
				}
			}
		};
		
		$(document).ready(function(){
			window.root3D.currentProject= root3D.DEFAULTS.defaultProject;
			$('#spin').bind('click', function(){
				root3D.descelectAll();
				if(this.checked)
					$('#stage').addClass('spinning');
				else
					$('#stage').removeClass('spinning');
			});
			$('#addElementBTN').click(function(){
				root3D.descelectAll();
				root3D.addElement();
			});
			$('.element').live('click', function(event){
				/*if(!event.ctrlKey)
					root3D.descelectAll();*/
				// TODO: make it work with multiple selections...then, remove this following line
				
				var _this= $(this);
				if(root3D.selected[this.id]){
					delete root3D.selected[this.id];
					$(this).removeClass('selected');
					//root3D.descelectAll();
				}else{
					root3D.descelectAll();
					root3D.selectElement(this);
				}
				
			});
			
			$(document).bind('keydown', function(event){
				if(event.target.tagName == 'INPUT' || event.target.tagName == 'TEXTAREA' || event.target.tagName == 'A' /* && (!event.ctrlKey && !event.shiftKey)*/)
					return true;
				var relevantKey= false;
				
				switch(event.keyCode){
					case 67: // C
						if(event.ctrlKey){
							var els= Object.keys(root3D.selected);
							root3D.copiedElements= els;
							$('#status').html("<strong>Object copied to memory</strong>");
							root3D.clearStatusBar();
						}
					break;
					case 86: // V
						if(event.ctrlKey && root3D.copiedElements){
							var el= false, d= new Date();
							for(var i= 0; i<root3D.copiedElements.length; i++){
								el= $("#"+root3D.copiedElements[i].replace(/\-clone$/, '')).data();
								el.elName= d.getTime();
								root3D.addElement(false, el);
							}
							$('#status').html("<strong>Object pasted</strong>");
							root3D.clearStatusBar();
						}
					break;
					case 37: // left
						if(event.ctrlKey){
							relevantKey= true;
							root3D.camera.ry++;
						}else if(event.shiftKey){
								relevantKey= true;
								root3D.camera.rz--;
							 }else
								root3D.camera.x++;
					break;
					case 38: // up
						if(event.ctrlKey){
							relevantKey= true;
							root3D.camera.rx--;
						}else if(event.shiftKey){
								relevantKey= true;
								root3D.camera.z+= 10;
							 }else
								root3D.camera.y++;
					break;
					case 39: // right
						if(event.ctrlKey){
							relevantKey= true;
							root3D.camera.ry--;
						}else if(event.shiftKey){
								relevantKey= true;
								root3D.camera.rz++;
							 }else
								root3D.camera.x--;
					break;
					case 40: // down
						if(event.ctrlKey){
							relevantKey= true;
							root3D.camera.rx++;
						}else if(event.shiftKey){
								relevantKey= true;
								root3D.camera.z-= 10;
							 }else
								root3D.camera.y--;
					break;
				}
				
				var t= root3D.getCameraTransformation();
				document.getElementById('stage').style.MozTransform= t;
				document.getElementById('stage').style.MsTransform= t;
				document.getElementById('stage').style.OTransform= t;
				document.getElementById('stage').style.transform= t;
				document.getElementById('stage').style.WebkitTransform= t;
				if(relevantKey){
					event.stopPropagation();
					return false;
				}
				return true;
			});
			$(document.body).bind('mousedown', function(event){
				if((event.target.tagName == 'INPUT' || event.target.tagName == 'TEXTAREA' || event.target.tagName == 'A') && (!event.ctrlKey && !event.shiftKey)){
                    if(event.target.tagName =='A' && event.target.getAttribute('href') != '#')
                        window.open(event.target.getAttribute('href'));
                    return true;
                }
				if((event.ctrlKey && event.button == 0) || event.button==2){
					document.body.addEventListener('mousemove', root3D.draggingMap, false);
					$(document).bind('mouseup', function(event){
						document.body.removeEventListener('mousemove', root3D.draggingMap);
						root3D.draggingMapPos= false;
                        if((event.target.tagName == 'INPUT' || event.target.tagName == 'TEXTAREA' || event.target.tagName == 'A'))
                            return true;
						event.stopPropagation();
						return false;
					});
					event.stopPropagation();
					return false;
				}
				if(event.button == 1){
					event.stopPropagation();
					return false;
				}
			});
			
			var scrolling= function (event){
			event= event.originalEvent||event;
				var delta = 0;
				if(event.wheelDelta) {
					delta = event.wheelDelta/100;
				} else if (event.detail) {
					delta = (-event.detail/3);
				}
				
				root3D.camera.z= Math.ceil(root3D.camera.z + delta *100);
				var t= root3D.getCameraTransformation();
				
				document.getElementById('stage').style.MozTransform= t;
				document.getElementById('stage').style.MsTransform= t;
				document.getElementById('stage').style.OTransform= t;
				document.getElementById('stage').style.transform= t;
				document.getElementById('stage').style.WebkitTransform= t;
				
				event.preventDefault();
				event.cancelBubble= true;
				event.returnValue= false;
				return false;
			}
			$(document).bind('DOMMouseScroll', scrolling);
			$(document).bind('mousewheel', scrolling);
			$("#accordion").accordion({
				fillSpace: true
			});
			$("#tools").draggable({
				handle: '#elementsToHideOnTop',
				containment: 'parent',
                start: function(){
                    $('#generalToolsMenu').css('display', 'none');
                }
			});
			$("#addElementBTN").button();
			$("#giveATry-btn").button();
			$("#feedback-btn").button();
			
			//$("#spin").button();
			$("#descelectAllBtn").button().click(function(){
				root3D.descelectAll();
			});
			$("#elementOptions .range").each(function(){
				$(this).slider({
					orientation: "vertical",
					range: "min",
					slide: function(event, ui){
						document.getElementById(this.id+'_text').value= ui.value - (this.getAttribute('sub')||0);
						root3D.setElementProperties(this, ui.value);
					},
					change: function(event, ui){
						root3D.setElementProperties(this, ui.value);
					},
					min: this.getAttribute('min')||0,
					max: this.getAttribute('max')||100,
					value: this.getAttribute('value')||0,
					step: parseFloat(this.getAttribute('step')||0.1)
				});
				$('#'+this.id+'_text').bind('keyup', (function(that){
					return function(){
						if(this.value && !isNaN(this.value)){
							$(that).slider('value', parseFloat(this.value) + parseFloat(that.getAttribute('sub')||0));
						}
					}
				})(this));
			});
			$('#minimizeBtn').button({
				icons: {
					primary: "ui-icon-circle-triangle-w"
				},
				text: false
			}).click(function(){
				var _this= $(this);
				_this.removeClass('ui-state-focus');
				if(!_this.data('minimized')){
					$('#elementPropertiesParent, #elementsToHideOnTop').hide();
					_this.button({
						icons: {
							primary: "ui-icon-circle-triangle-e"
						},
						text: false
					})
					_this.data('minimized', true);
					_this.css('marginTop', '-2px');
					$('#tools').animate({width: '42px'});
				}else{
					_this.button({
						icons: {
							primary: "ui-icon-circle-triangle-w"
						},
						text: false
					})
					_this.data('minimized', false);
					_this.css('marginTop', '0px');
					$('#tools').animate({width: '750px'}, function(){
						$('#elementPropertiesParent, #elementsToHideOnTop').show();
					});
				}
			});
			
			$('#elementStylesLeftPannel li').click(function(event){
				$('#elementStylesLeftPannel li.active').removeClass('active');
				$(this).addClass('active');
				$('#elementStylesRightPannel>div').css('display', 'none');
				document.getElementById(this.id.replace('-trigger', '')).style.display= 'block';
			});
			
			$('#colorPickerBG').ColorPicker({
				flat: true,
				color: '#ff0000',
				onChange: function(color, rgb){
					var selected= Object.keys(root3D.selected),
						i= 0,
						l= selected.length;
					if(selected.length){
						for(; i<l; i++){
							root3D.setElementBg(rgb);
						}
					}
				}
			});
			$('#element-backgroundImage').bind('change', function(){
				root3D.setElementBg(false, this.value);
			});
			$('#element-backgroundString').bind('change', function(){
				root3D.setElementBg(false, false, this.value);
			});
			$('#element-BorderString').bind('change', function(){
				root3D.setElementBorder(false, false, this.value);
			});
			$('#colorPickerBorder').ColorPicker({
				flat: true,
				color: '#000000',
				onChange: function(color, rgb){
					root3D.setElementBorder(rgb);
				}
			});
			$('#element-borderWidth').slider({
				min: 0,
				max: 40,
				range: "min",
				step: 1,
				value: 3,
				slide: function(event, ui){
					document.getElementById('element-borderWidth-value').value= ui.value;
					root3D.setElementBorder(false, ui.value);
				},
				change: function(event, ui){
					document.getElementById('element-borderWidth-value').value= ui.value;
					root3D.setElementBorder(false, ui.value);
				}
			});
			$('#element-borderWidth-value').bind('keyup', function(){
				if(!isNaN(this.value))
					$('#element-borderWidth').slider('value', this.value);
			});
			$('#element-BorderRadius>input').bind('change', function(){
				root3D.setBorderRadius($('#element-BorderRadius>input'));
			});
			$('#element-textString').bind('keyup', function(){
				root3D.setElementTextContent(this.value)
			});
			
			$('#element-customString').bind('keyup', function(){
				root3D.setCustomCSS(this.value);
			});
			$('#element-customString').bind('blur', function(){
				root3D.setCustomCSS(this.value, true);
				
			});
			
			$('#element-remove').button().css('backgroundColor', 'red !IMPORTANT').click(function(){
				root3D.removeElements();
			});
			$('#element-id').bind('keyup', function(){
				if(this.value.replace(/ /g, '').length)
					root3D.renameElements(this.value);
			});
            $('#elementList').bind('change', function(){
                if(this.value != '')
                    $(document.getElementById(this.value)).trigger('click');
            });
            $('#generalToolsTrigger').bind('click', function(){
                var tmp= document.getElementById('tools');
                var el= $('#generalToolsMenu');
                if(el.css('display') == 'none'){
                    el.css({
                        display: '',
                        left: (8 + tmp.offsetLeft)+'px',
                        top: (36 + tmp.offsetTop)+'px',
                        zIndex: 99999993
                    });
                }else{
                    el.css('display', 'none');
                }
            });
            $('#generalTools-save').click(function(){
				$('#generalToolsMenu').css('display', 'none');
				if(!root3D.isAuth()){
					$('#mustAuthMessage').html("Sorry, if you want to save your project, you have to authenticate first<br/>"+$('#login-btn').html()+
											   "<br/><br/><strong>After authenticating, come back here and click in SAVE again</strong>").
										  dialog({
											modal: true,
											draggable: false,
											resizable: false
										});
					return false;
				}
				
				if(root3D.currentProject == root3D.DEFAULTS.defaultProject)
					root3D.saveProjectAs();
				else
					root3D.saveProject();
            });
			
			$('#generalTools-save-as').click(function(){
				$('#generalToolsMenu').css('display', 'none');
				if(!root3D.isAuth()){
					$('#mustAuthMessage').html("Sorry, if you want to save your project, you have to authenticate first<br/>"+$('#login-btn').html()).
										  dialog({
											modal: true,
											draggable: false,
											resizable: false
										});
					return false;
				}
				
				root3D.saveProjectAs();
            });
			
            $('#generalTools-load').click(function(){
				$('#generalToolsMenu').css('display', 'none');
				if(!root3D.isAuth()){
					$('#mustAuthMessage').html("Sorry, if you want to load a project, you have to authenticate first<br/>"+$('#login-btn').html()).dialog({
						modal: true,
						draggable: false,
						resizable: false
					});
					$('#generalToolsMenu').css('display', 'none');
					return false;
				}
				
				root3D.closeDialogs();
				$('#status').html("<strong class='loading'>Listing current projects</strong>");
				
				$('#dialog-load').dialog({
					open: function(){
						$('#projectList').html('Loading...');
						$.ajax({
							type: 'get',
							url: 'service.php',
							data: 'srv=getProjectList',
							complete: function(xhr, ret){
								ret= xhr.responseText;
								if(ret == '[]'){
									$('#projectList').html("No projects saved until now");
								}else{
									ret= JSON.parse(ret);
									var str= "";
									for(var i= 0; i<ret.length; i++){
										str+= "<li class='ui-widget-content'>"+ret[i]+"</li>";
									}
									$('#projectList').html("<ol>"+str+"</ol>");
									$('#projectList>ol li').click(function(){
										$(this).siblings().removeClass('projectSelected');
										$(this).addClass('projectSelected');
									});
								}
								
								$('#status').html("");
							}
						});
					},
					buttons: {
						Cancel: function() {
							$( this ).dialog( "close" );
						},
						Load: function(){
							var selected= $('#projectList>ol .projectSelected')[0].innerHTML;
							
							if(selected.length == 0){
								alert("Please, choose a project");
								return;
							}
							
							$('#status').html("<strong class='loading'>Loading project data</strong>");
							
							root3D.currentProject= selected;
							$.ajax({
								type: 'get',
								url: 'service.php',
								data: 'srv=getProject&p='+selected,
								complete: function(xhr, ret){
									var listElements= JSON.parse(xhr.responseText);
									if(!listElements || !listElements.length){
										$('#status').html("<strong style='color: red;'>Fail opening the project!</strong>");
										return;
									}
									
									root3D.closeDialogs();
									var i= listElements.length-1,
										tmpEl= false;
									do{
										tmpEl= root3D.addElement(false, listElements[i]);
										root3D.setElementProperties(tmpEl);
									}while(i--);
									root3D.descelectAll();
									$('#status').html("<strong>Opened project "+root3D.currentProject+"</strong>");
									root3D.clearStatusBar();
								}
							})
						}
					}
				});
            });
			
			$('#generalTools-demos').click(function(){
				$('#generalToolsMenu').css('display', 'none');
				$('#dialog-demos').dialog({
					open: function(){
						$('#demoList').html('Loading...');
						$.ajax({
							type: 'get',
							url: 'service.php',
							data: 'srv=getDemoList',
							complete: function(xhr, ret){
								ret= xhr.responseText;
								if(ret == '[]'){
									$('#demoList').html("No models to load!");
								}else{
									ret= JSON.parse(ret);
									var str= "";
									for(var i= 0; i<ret.length; i++){
										str+= "<li class='ui-widget-content'>"+ret[i]+"</li>";
									}
									$('#demoList').html("<ol>"+str+"</ol>");
									$('#demoList>ol li').click(function(){
										$(this).siblings().removeClass('projectSelected');
										$(this).addClass('projectSelected');
									});
								}
								
								$('#status').html("");
							}
						});
					},
					buttons: {
						Cancel: function() {
							$( this ).dialog( "close" );
						},
						Load: function(){
							var selected= $('#demoList>ol .projectSelected')[0].innerHTML;
							
							if(selected.length == 0){
								alert("Please, choose a model to load");
								return;
							}
							
							$('#status').html("<strong class='loading'>Loading model data</strong>");
							
							root3D.currentProject= selected;
							$.ajax({
								type: 'get',
								url: 'service.php',
								data: 'srv=getModel&m='+selected,
								complete: function(xhr, ret){
									var listElements= JSON.parse(xhr.responseText);
									if(!listElements || !listElements.length){
										$('#status').html("<strong style='color: red;'>Fail opening the model!</strong>");
										return;
									}
									
									root3D.closeDialogs();
									var i= listElements.length-1,
										tmpEl= false;
									do{
										tmpEl= root3D.addElement(false, listElements[i]);
										root3D.setElementProperties(tmpEl);
									}while(i--);
									root3D.descelectAll();
									$('#status').html("<strong>Loaded model "+root3D.currentProject+"</strong>");
									root3D.clearStatusBar();
								}
							})
						}
					}
				});
			});
			
            $('#generalTools-feedback').click(function(){
				$('#generalToolsMenu').css('display', 'none');
				$('#feedbackPannel').dialog({
					modal: false,
					resizable: true
				});
            });

			$('#generalTools-help').click(function(){
				root3D.closeDialogs();
				$('#helpContent').dialog({
					width: 450
				});
                $('#generalToolsMenu').css('display', 'none');
			});
			
            $('#welcomeScreen').dialog({
                modal: true,
                height: 300,
                resizable: false,
                draggable: false,
                dialogClass: 'alert',
				zIndex: 99997,
				close: function(){
					$('#feedbackEl').css('display', '');
					$('#welcomeEl').css('display', 'none');
					root3D.isUnderDev= window.location.href.indexOf('http://local.felipenmoura.org')>=0? true: false;
					
					if(root3D.isUnderDev){
						root3D.CONF.session= {
							name: 'Developer',
							email: 'dev@dev.com'
						}
					}
					
					setTimeout(function(){
						$('#tooltipBalloon').fadeIn(function(){
							$('#tooltipBalloon').click(function(){
								$('#tooltipBalloon').fadeOut();
							});
							setTimeout(function(){
								$('#tooltipBalloon').fadeOut();
							}, 10000);
						});
					}, 1000);
				}
            });
			
            $('#containerParent').bind('mousedown', function(){
				$('#generalToolsMenu').css('display', 'none');
			});
			$('#generalTools-new').bind('click', function(){
				$('#generalToolsMenu').css('display', 'none');
				if(confirm("Are you sure? You'll loose any unsaved data"))
					root3D.clearStage();
			});
			
			$('#elementProperties').addClass('hiddenEl');
			//$(document.body).bind('mousedown', root3D.hideTooltip)
			
			$('#containerParent').delegate(':not(.element)', 'click', function(event){
				if(event.target.className == 'element')
					return true;
				else
					root3D.descelectAll();
			});
		});
				
        $.ajax({
            type: 'get',
            url: '/auth/index.php',
            data: 'landing=projects/root3d/',
            complete: function(xhr, ret){
                if(ret == 'error')
                    console.log(xhr);
                else
                    $('#login-btn').html(xhr.responseText).removeClass('loading');
            }
        });
		/*window.onscroll= function(event){
			event.preventDefault();
			event.cancelBubble= true;
			event.returnValue= false;
			return false;
		}*/
		window.onresize= function(){
			document.getElementById('stage').style.width= document.body.clientWidth+'px';
			document.getElementById('stage').style.height= document.body.clientHeight+'px';
		}
		window.onload= function(){
			document.getElementById('stage').style.width= document.body.clientWidth+'px';
			document.getElementById('stage').style.height= document.body.clientHeight+'px';
		}