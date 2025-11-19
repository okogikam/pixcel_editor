class updateArtikel{
    constructor(conf){
        this.tbody = conf.tbody;
        this.dosens = conf.dosens;
    }
    loadDosen(){
        this.tbody.innerHTML = "";
        let no = 1;
        for(let dosen of this.dosens){
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${no++}</td>
            <td>${dosen.nama}</td>
            <td>${dosen.artikel}</td>
            <td class="text-center">${dosen.update}</td>`
             
            this.tbody.appendChild(tr);
        }
    }
    async update(){
        for(let i = 0; i < this.dosens.length; i++){
            // dosen.upadte = "progres.."
            this.dosens[i].update = `<i class="fa-solid fa-spinner fa-spin"></i>`
        }
        this.loadDosen();
        // console.log(this.dosens[0])
        for(let i = 0; i < this.dosens.length; i++){
            let update = await fetch(`./get_artikel.php?user=${this.dosens[i].id_user}`);
            let respons = await update.json();
            this.dosens[i].update = respons.status;
            this.dosens[i].artikel = respons.artikel;
            // console.log(respons);
            this.loadDosen();
            // return;
        }

    }
}