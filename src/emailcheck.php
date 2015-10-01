<?php
function emailCheck() {
	$q = "SELECT * FROM users WHERE email=:email";
	$sql = $conn->prepare($q);
	$sql->BindParam(":email", $email);
	print_r($_POST['password']);
	if ($sql->execute()) {
		return true;
	} else {
		return false;
	}
}

?>