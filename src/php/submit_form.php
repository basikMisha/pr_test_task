<?php
include "./db_config.php";

$fio = htmlspecialchars($_POST['fio'], ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8');
$age = filter_var($_POST['age'], FILTER_VALIDATE_INT);

if (!$fio || !$phone || !$age) {
    echo json_encode(['success' => false]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO leads (fio, phone, age) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $fio, $phone, $age);
$stmt->execute();

$bitrix_webhook_url = "https://b24-w4e3u2.bitrix24.ru/rest/1/nv3nnn7ak513y83r/crm.lead.add.json";
$data = [
    'fields' => [
        'TITLE' => 'Новая заявка',
        'NAME' => $fio,
        'PHONE' => [['VALUE' => $phone, 'VALUE_TYPE' => 'WORK']],
        'COMMENTS' => 'Возраст: ' . $age
    ],
    'params' => ['REGISTER_SONET_EVENT' => 'Y']
];

$options = [
    'http' => [
        'header' => "Content-Type: application/json\r\n",
        'method' => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($bitrix_webhook_url, false, $context);

$stmt->close();
$conn->close();

echo json_encode(['success' => true]);

