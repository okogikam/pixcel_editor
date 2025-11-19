<?php 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "./scholar.php";
// date_default_timezone_set('UTC+8');

$user = $_GET['user']; // ganti dengan user ID scholar kamu
$base = "https://scholar.google.com/citations?hl=id&user=$user";
$all_articles = file_exists('./data_artikel.json')
    ? json_decode(file_get_contents('./data_artikel.json'), true)
    : [];
$cstart = 0;
$pagesize = 20; // maksimal 80 artikel per halaman
$max_pages = 1; // batas agar tidak loop tanpa akhir
$count = 0;

for ($i = 0; $i < $max_pages; $i++) {
    $url = $base . "&cstart=$cstart&pagesize=$pagesize";

    $xpath = getDataUrl($url);
    if($xpath === "") break;

    $rows = $xpath->query("//tr[@class='gsc_a_tr']");
    if ($rows->length == 0) break; // sudah habis

    foreach ($rows as $row) {
        $judulNode  = $xpath->query(".//a[@class='gsc_a_at']", $row)->item(0);
	    $sitasiNode = $xpath->query(".//a[contains(@class, 'gsc_a_ac')]", $row)->item(0);
	    $tahunNode  = $xpath->query(".//span[contains(@class, 'gsc_a_h')]", $row)->item(0);

	if ($judulNode) {
	    $judul  = trim($judulNode->nodeValue);
 	    $sitasi = $sitasiNode ? trim($sitasiNode->nodeValue) : "0";
	    $tahun  = $tahunNode ? trim($tahunNode->nodeValue) : "-";
	    $link   = "https://scholar.google.com" . $judulNode->getAttribute("href");
        
        $id_artikel = getIdArtikel($link);

	    $all_articles[$id_artikel] = [
	        "judul"  => $judul,
	        "link"   => $link,
	        "sitasi" => $sitasi,
 	        "tahun"  => $tahun,
            "user" => $user,
            "id_artikel" => $id_artikel,
	    ];
		$count++;
	}
    }

    $cstart += $pagesize;
    sleep(1); // jeda agar tidak dianggap bot
}

saveData("data_artikel.json",$all_articles);

echo json_encode([
	"status" => date('d-m-Y'),
	"artikel" => $count
]);

?>