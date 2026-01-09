<?php
$url = 'https://vpsn8n.anhlaptrinh.vn/webhook/registration-notification11111mmmmm11'; // URL n8n anh đang gọi
$data = ['test' => 'from_hostinger'];
$ch = curl_init($url);
curl_setopt_array($ch, [
CURLOPT_POST => true,
CURLOPT_RETURNTRANSFER => true,
CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
CURLOPT_POSTFIELDS => json_encode($data),
]);
$res = curl_exec($ch);
$err = curl_error($ch);
$info = curl_getinfo($ch);
curl_close($ch);
var_dump($info, $err, $res);