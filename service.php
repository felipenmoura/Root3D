<?php
	session_start();
	if($_SERVER['HTTP_HOST'] == 'local.felipenmoura.org'){
		$_SESSION['email']	    = "demo@demo.com";
		$_SESSION['name_first'] = "Demo";
		$_SESSION['name_last']  = "Nstration";
		$_SESSION['id']         = sha1($_SESSION['email']);
	}
	
	if(!isset($_SESSION['id'])){
		if(!(isset($_GET['srv']) && ($_GET['srv'] == 'getDemoList' || $_GET['srv'] == 'getModel'))){
			die("<strong style='color: red'>You must authenticate first!</strong>");
		}
	}
	
	$projList= 'projects/'.sha1($_SESSION['id']).'/';
	if(!file_exists($projList))
		mkdir($projList);
		
	// GET = Services for getting the list of projects or the a project's data
	if(isset($_GET['srv'])){
		switch($_GET['srv']){
			case 'getProjectList':{
				$d= dir($projList);
				$ret= Array();
				while(false !== ($entry = $d->read())) {
					if($entry == '.' || $entry == '..')
						continue;
					if(strpos($entry, '.json') !== false)
						$ret[]= preg_replace('/\.json$/', '', urldecode($entry));
				}
				$d->close();
				echo json_encode($ret);
				break;
			}
			case 'getProject': {
				if(!isset($_GET['p']))
					die("You must provide the project identification");
				//echo "aeee ".$_GET['p'];
				$f= $projList.urlencode($_GET['p']).".json";
				if(file_exists($f)){
					echo file_get_contents($f);
				}
				break;
			}
			case 'getDemoList': {
				$d= dir('projects/MODELS/');
				$ret= Array();
				while(false !== ($entry = $d->read())) {
					if($entry == '.' || $entry == '..')
						continue;
					if(strpos($entry, '.json') !== false)
						$ret[]= preg_replace('/\.json$/', '', urldecode($entry));
				}
				$d->close();
				echo json_encode($ret);
				break;
			}
			
			case 'getModel': {
				$d= dir('projects/MODELS/');
				if(!isset($_GET['m']))
					die("You must provide the model id to load");
				//echo "aeee ".$_GET['p'];
				$f= 'projects/MODELS/'.urlencode($_GET['m']).".json";
				if(file_exists($f)){
					echo file_get_contents($f);
				}else{
					echo "invalid model";
				}
				break;
			}
		}
		
		exit;
	}
	
	// POST = Service to save the project itself
    if(!isset($_POST['projectName']) || trim($_POST['projectName']) == ''){
        die("<strong style='color: red'>Project name is required!</strong>");
    }
	if(!isset($_POST['elementList']) || trim($_POST['elementList'] == '')){
		die("<strong style='color: red'>Empty list of elements!</strong>");
	}
	
	// There is the project name, the element list(with elements) and the user has authenticated
	// so, let's save it!
	try{
		//echo $_POST['elementList']."\n\n";
		$elementList= JSON_decode($_POST['elementList']);
		$elementList= JSON_encode($elementList);
	}catch(Exception $e){
		die("<strong style='color: red'>Invalid list of elements!</strong>");
	}
	
	if(@file_put_contents($projList.urlencode(trim($_POST['projectName'])).".json", $elementList)){
		echo "<strong style='color: green'>Project saved as ".$_POST['projectName']."...</strong>";
		exit;
	}else{
		die("<strong style='color: red'>Could not create the file on the server's filesystem!</strong>");
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	