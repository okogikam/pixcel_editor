<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$id_author = $_GET['user'];
$id_artikel = $_GET['id_artikel'];
$url = "https://scholar.google.com/citations?view_op=view_citation&hl=id&oe=ASCII&user=$id_author&citation_for_view=$id_author:$id_artikel";
// https://scholar.google.com/citations?view_op=view_citation&hl=id&oe=ASCII&user=-NsFG-gAAAAJ&citation_for_view=-NsFG-gAAAAJ:lvd772isFD0C
// https://scholar.google.com/citations?view_op=view_citation&hl=id&oe=ASCII&user=-NsFG-gAAAAJ&citation_for_view=-NsFG-gAAAAJ:wKETBy42zhYC
?>