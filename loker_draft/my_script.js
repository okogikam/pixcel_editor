class loker{
    constructor(conf){
        this.gsheet = conf.gsheet
        this.data = [];
        this.id = conf.id? conf.id : "";
    }
    async display(){
        let conn = await this.gsheet.connect()
        this.data = conn[0].value;
        let table,thead,tbody;
        table = document.createElement("table");
        table.setAttribute("class","table table-sm table-striped");
        thead = document.createElement("thead");
        thead.innerHTML = `
        <tr class="text-center">
            <th width="100">Tanggal Post</th>
            <th>Posisi</th>
            <th>Instansi</th>
            <th width="100">Tipe</th>
            <th width="100">Status</th>
            <th width="100">Opsi</th>
        </tr>`

        tbody = document.createElement("tbody");
        for(let i = 2;i< this.data.length; i++){
            let tanggal = new Date(this.data[i][12]);
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${tanggal.toLocaleDateString('en-GB')}</td>
            <td> ${this.data[i][1]}</td>
            <td>${this.data[i][2]}</td>
            <td>
                <button class="btn btn-sm btn-secondary disabled">${this.data[i][5]} </button >
            </td>
            <td>
                <button class="btn btn-sm ${this.data[i][14].toLowerCase()} disabled">${this.data[i][14].toUpperCase()}</button>
            </td>
            <td>
                <a href="./detail.html?id=${this.data[i][0]}" class="btn btn-sm btn-success"><i class="fa-regular fa-eye"></i></a>
                <a href="${this.data[i][10]}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </td>`

            tbody.appendChild(tr);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        this.gsheet.dom.appendChild(table);

        new DataTable(table,{
            destroy: true,
            responsive: true
        })
    }

    async displayDetail(){
        let conn = await this.gsheet.connect()
        this.data = conn[0].value[this.id];
        let card = document.createElement("div");
        let tanggal_mulai = new Date(this.data[12]);
        let tanggal_selesai = new Date(this.data[13]);
        card.classList.add("card");
        card.innerHTML = `
        <div class="card-header">
            <h3 class="title">${this.data[2]}</h3>
        </div>
        <div class="card-body table-responsive">
            <table class="table table-sm">
                <tr>
                    <td style="width:100px;">Instansi</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[2]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Posisi</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[1]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Diskripsi</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[8]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Kategori</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[4]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Tipe</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[5]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Minimal Gaji</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[6]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Maksimal Gaji</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[7]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Persyaratan</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[9]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Staus</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[14]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Dibuka Tanggal</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${tanggal_mulai.toLocaleDateString('en-GB')}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Ditutup Tanggal</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${tanggal_selesai.toLocaleDateString('en-GB')}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Kontak</td>
                    <td style="width:min-content;">:</td>
                    <td><p>${this.data[11]}<p></td>
                </tr>
                <tr>
                    <td style="width:100px;">Buka Link</td>
                    <td style="width:min-content;">:</td>
                    <td><a href="${this.data[10]}" target="_blank" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                </tr>
            </table>
        </div>`
        
        this.gsheet.dom.appendChild(card);
    }
}

// 0: "id"
// ​​​​
// 1: "title"
// ​​​​
// 2: "company"
// ​​​​
// 3: "location"
// ​​​​
// 4: "category"
// ​​​​
// 5: "job_type"
// ​​​​
// 6: "salary_min"
// ​​​​
// 7: "salary_max"
// ​​​​
// 8: "description"
// ​​​​
// 9: "requirements"
// ​​​​
// 10: "source_link"
// ​​​​
// 11: "contact_email"
// ​​​​
// 12: "posted_date"
// ​​​​
// 13: "expired_date"
// ​​​​
// 14: "status"