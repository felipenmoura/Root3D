<?php
	session_start();
	if(!isset($_SESSION['id'])){
		?>
			<script>
				var o= window.opener;
				o.focus();
				alert("You can try it with no problems, but you will not be able to save or load projects");
				o.$('#welcomeScreen').dialog('destroy');
				o.$("#mustAuthMessage").dialog("destroy");
				window.close();
			</script>
		<?php
	}else{
		if(!file_exists('projects/'.$_SESSION['id']))
			mkdir('projects/'.$_SESSION['id']);
		?>
			<script>
				var o= window.opener;
				o.focus();
				o.root3D.sessionInitialized("<?php echo $_SESSION['name_first']; ?>", "<?php echo $_SESSION['name_last']; ?>", "<?php echo $_SESSION['email']; ?>");
				window.close();
			</script>
		<?php
	}