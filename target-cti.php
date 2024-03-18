<?php

	$token = ['client_id' => "nbsApi", 'client_secret' => "sandi", 'grant_type' => "client_credentials"];
	function post1($path, $opt, $auth = null) {
		$ch = curl_init($path);
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => $opt,
			CURLOPT_HTTPHEADER => [isset($auth) ? "Authorization: Bearer $auth" : ""],
		]);
		return curl_exec($ch);
	}
	
	header('Content-Type: application/json; charset=utf-8');
	
	echo post1('http://10.62.175.156/telkom/api/target-cti-get',
		[
			'year' => date("Y"),
		],
		json_decode(post1('http://10.62.175.156/api/token-get', $token))->access_token);
	
?>