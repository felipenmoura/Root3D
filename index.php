<!DOCTYPE HTML>
<html>
	<head>
		<!--
			Developed by Felipe N. Moura <http://felipenmoura.org>
			Under MIT license
		-->
		<script src='scripts/jquery.js'></script>
		<script src='scripts/jquery-ui.js'></script>
		<script src='scripts/colorpicker.js'></script>
		
		<meta name="author" content="Felipe N. Moura" />
		<link type='text/css' rel='stylesheet' href='styles/default.css' />
		<link type='text/css' rel='stylesheet' href='styles/ui-darkness/jquery-ui-custom.css' />
		<link type='text/css' rel='stylesheet' href='styles/colorpicker/css/colorpicker.css' />
        
        <script type="text/javascript"> var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-1270869-17']); _gaq.push(['_setDomainName', '.felipenmoura.org']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })(); </script>
        
	</head>
	<body oncontextmenu="return false">
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>

		<div id='mustAuthMessage' title='Please, register' style='display: none;'></div>
		
		<div id='feedbackPannel' style='display: none; position: inline; z-index: 999999999' title='Feedback'>
			<form target='hiddenFrame' action='feedback.php' method='post'>
				Please, leave some information about you as well, so I can reach you to ask for more details or answer your questions :)
				<table>
					<tr>
						<td>
							Name
						</td>
						<td>
							<input type='text' name='name' />
						</td>
					</tr>
					<tr>
						<td>
							E-mail
						</td>
						<td>
							<input type='text' name='email' />
						</td>
					</tr>
					<tr>
						<td>
							Message
						</td>
						<td>
							<textarea name='feedbackMessage'></textarea>
						</td>
					</tr>
				</table>
				<input type='submit' id='feedback-btn' value='Send' style='margin: auto;'>
			</form>
			<iframe id='hiddenFrame' name='hiddenFrame' style='display: none;'></iframe>
		</div>
		
		<div id='tooltipBalloon'>
			<div id='arrow'></div>
			Use this to see useful features like save or load<br/>
			Also, see the <strong>HELP</strong> to see the shortcuts list!
		</div>
		
        <div id='welcomeScreen' title="Welcome">
			<div id='feedbackEl' style='display: none;'>
				<form target='hiddenFrame' action='feedback.php' method='post'>
					Please, leave some information about you as well, so I can reach you to ask for more details or answer your questions :)
					<table>
						<tr>
							<td>
								Name
							</td>
							<td>
								<input type='text' name='name' />
							</td>
						</tr>
						<tr>
							<td>
								E-mail
							</td>
							<td>
								<input type='text' name='email' />
							</td>
						</tr>
						<tr>
							<td>
								Message
							</td>
							<td>
								<textarea name='feedbackMessage'></textarea>
							</td>
						</tr>
					</table>
					<input type='submit' id='feedback-btn' value='Send' style='margin: auto;'>
				</form>
				<iframe id='hiddenFrame' name='hiddenFrame' style='display: none;'></iframe>
			</div>
			<div id='welcomeEl'>
				Hello! Welcome to the root3D, the CSS3 3D environment!<br/>
				Everything you see here is made only by DIV elements...<br/>
				<br/>
				Sign in to save/load projects<br/>
				<div id="login-btn" class='loading'>loading...</div>
				Or:<br/>
				<input id='giveATry-btn' type='button' value='Just give it a try' onclick="$('#welcomeScreen').dialog('close');" /><br/>
				<br/>
				<br/>
				By <a href='http://felipenmoura.org' target='_quot'>Felipe N. Moura</a>
			</div>
        </div>
		
        <div id="generalToolsMenu" style="display: none;">
            <ul>
                <li id='generalTools-new'>New project</li>
                <li id='generalTools-save'>Save project</li>
                <li id='generalTools-save-as'>Save project as</li>
                <li id='generalTools-load'>Load project</li>
				<hr/>
				<li id='generalTools-demos'>Demos/Models</li>
                <li id='generalTools-feedback'>Send feedback</li>
                <li id='generalTools-help'>Help/About</li>
            </ul>
        </div>
		
        <div id='modals'>
			<div id='helpContent' title='Help/About'>
				Hey there...welcome to Root3D, the CSS3D environment!<br/>
				Here, take a list of the available shortcuts:<br/>
				<table id='helpShortcutList'>
					<tr>
						<td>
							Ctrl+click
						</td>
						<td>
							Spins the camera
						</td>
					</tr>
					<tr>
						<td>
							Ctrl+Right click
						</td>
						<td>
							Spins the camera
						</td>
					</tr>
					<tr>
						<td>
							Scroll
						</td>
						<td>
							Zoom-in-out(only Firefox)
						</td>
					</tr>
					<tr>
						<td>
							Right click
						</td>
						<td>
							Moves the stage
						</td>
					</tr>
					<tr>
						<td>
							Arrows
						</td>
						<td>
							Moves the stage
						</td>
					</tr>
					<tr>
						<td>
							Shift+Up/Down+Arrows
						</td>
						<td>
							Zoom-in-out(only Firefox)
						</td>
					</tr>
					<tr>
						<td>
							Ctrl+Up/Down+Arrows
						</td>
						<td>
							Spin X
						</td>
					</tr>
					<tr>
						<td>
							Ctrl+Left/Right+Arrows
						</td>
						<td>
							Spin Y
						</td>
					</tr>
					<tr>
						<td>
							Shift+Left/Right+Arrows
						</td>
						<td>
							Spin Z
						</td>
					</tr>
				</table>
				Feel free to get in touch: <a href='mailto:felipenmoura@gmail.com'>felipenmoura@gmail.com</a><br/>
				Visit my website: <a href='http://felipenmoura.org'>felipenmoura.org</a><br/>
				Follow me on twitter: <a href='http://twitter.com/felipenmoura'>@felipenmoura</a><br/>
				<div style='float: left;'>Maybe you want to buy me a beer!</div>
				<!-- PAYPAL donate button -->
				<div style='float: left; margin: 2px; margin-left: 4px; height: 22px; overflow: hidden;'>
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target='_quot'>
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
					<img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1">
					</form>
				</div>
				<!-- /PAYPAL donate button -->
			</div>
			
            <div id='dialog-save' title="Save project">
				<label for='pName'>Project Name</label><br/>
				<input type='text'
					   id='pName'
					   style='width: 240px;'
					   name="pName" />
                <div id="dialog-save-msgPanel">
                </div>
            </div>
			<div id='dialog-load' title="Load project">
                Choose a project of yours:<br/>
				<div id='projectList'>loading...</div>
            </div>
			<div id='dialog-demos' title="Load project">
                Choose a demo to load:<br/>
				<div id='demoList'>loading...</div>
            </div>
        </div>
        
		<div id='tools'>
				<?php
					function createIpt($id, $type, $label, $extra, $dim=''){
						echo "<div class='verti-slider'><small><label for='".$id."_text'>$label</label></small><br/>";
						echo "<div class='range' id='$id' type='$type' $extra style='height: 125px;' ></div>";
						if($type == 'range'){
							echo "<input type='text' id='".$id."_text' class='rangeValueLabel' />";
							echo "<script>$(document).ready(function(){
								$('#".$id."_text').change(function(){
									//$('#".$id."').attr('value', this.value);
								});
								$('#".$id."').change(function(){
									$('#".$id."_text').attr('value', this.value);
								});
								$('#".$id."_text').attr('value', $('#".$id."').attr('value') - ($('#".$id."').attr('sub')||0));
							})</script>";
						}
						echo "$dim<br/></div>";
					}
				?>
			
			<div id='elementOptions'>
                <div id='generalToolsTrigger'></div>
				<div id='elementsToHideOnTop'>
					<!-- menu bar -->
					<div style='float: left;'>
						<input type='checkbox' id='spin' /> <b><label for='spin'>Spin</label></b>
						<input type='button' value='Descelect All' id='descelectAllBtn' style='display:none;' />
						<input type='button' value='Add Element' id='addElementBTN' />
						<select type='button' value='Descelect All' id='elementList'>
							<option value='' selected>Select Element</option>
						</select>
					</div>
					<!-- PAYPAL donate button --
					<div style='float: left; margin: 2px; margin-left: 4px; height: 22px; overflow: hidden;'>
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target='_quot'>
						<input type="hidden" name="cmd" value="_s-xclick">
						<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
						<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
						<img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1">
						</form>
					</div>
					<!-- /PAYPAL donate button -->
					<div class="fb-like"
						 data-href="http://felipenmoura.org"
						 data-send="true"
						 data-layout="button_count"
						 data-show-faces="true" ></div>
				</div>
				<div style='float: right; margin-top:5px;'><div style='float:right'><button id='minimizeBtn'>Minimize</button></div></div>
				<div id='elementPropertiesParent' style='clear: both;'>
					<div id='elementProperties'>
						<div id="accordion">
						
							<h3><a href="#">Element Properties</a></h3>
							<div>
								<div style='margin: auto; width: 650px; overflow: hidden;'>
									<?php
										createIpt("left",     "range", "Pos. X",   "value='1000' min='0' max='2000' step='0.1' sub='1000' ", "cm");
										createIpt("top",      "range", "Pos. Y",   "value='1000' min='0' max='2000' step='0.1' sub='1000'", "cm");
										createIpt("distance", "range", "Pos. Z",   "value='1000' min='0' max='2000' step='0.1' sub='1000'", "cm");
										createIpt("width",    "range", "Width",    "value='100' min='0' max='1000' step='0.1'", "cm");
										createIpt("height",   "range", "Height",   "value='100' min='0' max='1000' step='0.1'", "cm");
										createIpt("opacity",  "range", "Opacity",  "min='0' max='100' step='1' value='100'",    "%");
										createIpt("rotateH",  "range", "Rotate H", "min='0' max='360' step='1' value='0'",      "deg");
										createIpt("rotateV",  "range", "Rotate V", "min='0' max='360' step='1' value='0'",      "deg");
										createIpt("rotateZ",  "range", "Rotate Z", "min='0' max='360' step='1' value='0'",      "deg");
										createIpt("scale",    "range", "Scale",    "min='0' max='1000' step='1' value='100'",   "%");
									?>
								</div>
							</div>
							
							<h3><a href="#">Element Styles</a></h3>
							<div>
								<div id='elementStylesLeftPannel'>
									<ul type='none'>
										<li id='elementStyleTool-bg-trigger' class='ui-widget-header active'>Background</li>
										<li id='elementStyleTool-border-trigger' class='ui-widget-header '>Border</li>
										<li id='elementStyleTool-text-trigger' class='ui-widget-header '>Text</li>
										<li id='elementStyleTool-custom-trigger' class='ui-widget-header ' style='display: none;'>Custom</li>
									</ul>
								</div>
								<div id='elementStylesRightPannel' class='ui-widget-header'>
									<div id='elementStyleTool-bg' class='active'>
										<div style='float: right; width: 220px;'>
											Image URL<br/>
											<input type='address' value='' id='element-backgroundImage' /><br/>
											CSS Background String<br/>
											<textarea id='element-backgroundString'></textarea>
										</div>
										<div style='float: left'><div id='colorPickerBG'></div></div>
									</div>
									
									<div id='elementStyleTool-border'>
										<div style='float: right; width: 220px;'>
											Border width:<br/>
											<input type='text' id='element-borderWidth-value' value='3' />
											<div id='element-borderWidth' style='width: 150px; !IMPORTANT; float: right; margin-right: 10px;'></div><br/>
											CSS Border String<br/>
											<textarea id='element-BorderString'></textarea><br/>
											Border Radius
											<div id='element-BorderRadius'>
												<input type='text' value='0' /><small>px</small>
												<input type='text' value='0' /><small>px</small>
												<input type='text' value='0' /><small>px</small>
												<input type='text' value='0' /><small>px</small></div>
										</div>
										<div style='float: left'><div id='colorPickerBorder'></div></div>
									</div>
									
									<div id='elementStyleTool-text'>
										Text(HTML with styles are allowed)<br/>
										<textarea id='element-textString' style='width: 550px; height: 135px; margin: 10px; font-style: italic; font-size: 30px;' ></textarea>
									</div>
									
									<div id='elementStyleTool-custom'>
										BLA<br/>
										<textarea id='element-customString' style='width: 550px; height: 135px; margin: 10px;' ></textarea>
									</div>
									
								</div>
							</div>
							
							<h3><a href="#">Manage Element</a></h3>
							<div>
								Element Id<br/>
								<input type='text' id='element-id' /><br/>
								Shape<br/>
								<select id='element-shape'>
									<option value='square'>Square</option>
									<option value='triangle'>triangle</option>
									<option value='circle'>Circle</option>
									<option value='square'>Square</option>
									<option value='sphere'>Sphere</option>
									<option value='cube'>Cube</option>
									<option value='pyramide'>Pyramide</option>
								</select><small>(not yet...sorry...soon)</small><br/>
                                <br/>
								<div id='element-remove' class="red">Delete Element</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
        <div id="footer">
            By <author><a href='http://felipenmoura.org' target='_quot'>Felipe N Moura</a></author> (<a href='http://twitter.com/felipenmoura' target='_quot'>@felipenmoura</a>) | 
            under MIT license
			<div id='status'>welcome to the Root3D, the CSS3D environment!</div>
        </div>
		
		<div id='containerParent'>
			<div id='container'>
				<div id='stage'>
					<div class='Xaxis'><div class='red-triangle'></div></div>
					<div class='Xaxis'><div class='red-triangle'></div></div>
					<div class='Yaxis'><div class='blue-triangle'></div></div>
					<div class='Yaxis'><div class='blue-triangle'></div></div>
					<div class='Zaxis'><div class='green-triangle'></div></div>
					<div class='Zaxis'><div class='green-triangle'></div></div>
					<!--<div id='grade'></div>-->
				</div>
			</div>
		</div>
		
	</body>
	<script src='scripts/3Ded.js'></script>
</html>