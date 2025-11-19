<?php

function getDataUrl($url){
    $html = @file_get_contents($url);
    if (!$html) return "";

    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($html);
    libxml_clear_errors();

    $xpath = new DOMXPath($dom);
    return $xpath;
}

function saveData($name_file,$text){
    // ubah untuk menyimpan di google sheet nanti
    file_put_contents($name_file,json_encode($text,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
function getIdArtikel($url){
    $text = explode(":",$url);
    return $text[2];
}
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
