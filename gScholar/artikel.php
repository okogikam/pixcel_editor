<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$max_pages = 1; // batas agar tidak loop tanpa akhir

for ($i = 0; $i < $max_pages; $i++) {
    $url = "https://scholar.google.com/citations?view_op=view_citation&hl=id&oe=ASCII&user=-NsFG-gAAAAJ&citation_for_view=-NsFG-gAAAAJ:fbc8zXXH2BUC";
    $html = @file_get_contents($url);
    if (!$html) break;

    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($html);
    libxml_clear_errors();

    $xpath = new DOMXPath($dom);
    $rows = $xpath->query("//div[@class='gs_scl']");
    if ($rows->length == 0) break; // sudah habis

    foreach ($rows as $row) {
        $judulNode  = $xpath->query(".//div[@class='gsc_oci_field']", $row)->item(0);
	$isiNode = $xpath->query(".//div[@class='gsc_oci_value']", $row)->item(0);

	if ($judulNode) {
	    $judul  = trim($judulNode->nodeValue);
 	    $isi = $isiNode ? trim($isiNode->nodeValue) : "0";
	    if($judul === "Total kutipan"){
		$all_articles[] = [
	        "$judul"  => getSitasi($xpath,$isiNode),
	        ];
	    }else{
	    $all_articles[] = [
	        "$judul"  => $isi,
	    ];
	    }
	
	}
    }

   // $cstart += $pagesize;
    sleep(1); // jeda agar tidak dianggap bot
}

file_put_contents("data_artikel.json",json_encode($all_articles,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode($all_articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

function getSitasi($path,$data){
    $rows = $path->query(".//span[@class='gsc_oci_g_t']",$data);
    $col = $path->query(".//span[@class='gsc_oci_g_al']",$data);
    if( count($rows) !== count($col)) return "0";
	
	for($i=0;$i < count($rows); $i++){
		$tahun = $rows[$i] ? trim($rows[$i]->nodeValue) : "0";
		$banyak = $col[$i] ? trim($col[$i]->nodeValue) : "0";
		$sitasi[] = [ "$tahun : $banyak "];
	}
	return $sitasi;
}

?>