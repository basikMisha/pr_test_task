<?php
include "./db_config.php";

$res = $conn->query("SELECT COUNT(*) AS count FROM leads");
$row = $res->fetch_assoc();
$count = $row['count'];
$conn->close();
echo json_encode(['count' => $count]);