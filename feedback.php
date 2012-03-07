<?php
	if(isset($_POST['feedbackMessage']) && trim($_POST['feedbackMessage']) != ''){
	
		if(isset($_POST['name']) && trim($_POST['name']) != '')
			$fromName= $_POST['name'];
		else
			$fromName= false;
			
		if(isset($_POST['email']) && trim($_POST['email']) != '')
			$fromMail= $_POST['email'];
		else
			$fromMail= 'felipenmoura@gmail.com';
		
		$from= ($fromName)? $fromName." <".$fromMail.">": $fromMail;
		
		$m= mail("felipenmoura@gmail.com",
			 "[felipenmoura.org/root3d] - Feedback",
			 $_POST['feedbackMessage'],
			 'From: '.$from . "\r\n" .
			 'Reply-To: '.$fromMail . "\r\n");
		if($m){
			?>
				<script>
					alert('Hey, thank you for your feedback!');
				</script>
			<?php
		}else{
			?>
				<script>
					alert('Holly c***! Something went wrong and the message has not been sent! Please, try again later, and sorry for that!');
				</script>
			<?php
		}
	}else{
		?>
			<script>
				alert('Please, fill out the form correctly, so I can get in touch if required so, and read your useful feedback!');
			</script>
		<?php
	}