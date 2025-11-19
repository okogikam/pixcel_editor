class gScholar{
    constructor(conf){
        this.dom = conf.dom;
        this.user = conf.user;
    }
    async getArtiketLists(){
        let respons
        try{
            respons =  await fetch(`./data_artikel.json`).then(r => r.json())
        }catch{
            // respons = this.updateArtikelLists();
        }
        this.artikel =  respons;        
    }
    async updateArtikelLists(){
        let respons =  await fetch(`./get_artikel.php?user=${this.user}`).then(r => r.json())
        this.artikel =  respons;
        this.draw();
    }
    draw(){
        this.dom.innerHTML = "";
        Object.values(this.artikel).forEach((item,i) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${i+1}</td>
            <td>${item.judul}</td>
            <td>${item.sitasi}</td>
            <td>${item.tahun}</td>
            <td><a href="${item.link}">Link</a></td>
            `
            this.dom.appendChild(tr);
        });
    }
    async start(){
        await this.getArtiketLists();
        this.draw();
    }
}