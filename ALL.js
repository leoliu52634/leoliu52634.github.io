$(document).ready(function(){
  //first
});
function Taipei(){
  var openUrl= "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";
  $('#Main_DataTable').DataTable().clear().draw();
  $('#Main_DataTable').DataTable().destroy();
  var t = $('#Main_DataTable').DataTable({
    pageLength: 100
    });    
  var xhr = new XMLHttpRequest();
  xhr.open('GET',openUrl,true);
  xhr.send();
  xhr.onreadystatechange = function(){
  if(this.readyState === 4 && this.status === 200){
    var data = JSON.parse(this.responseText);
    data = data.slice(0,300);
    for (var i = 0; i < data.length; i++) {   
      t.row.add(
      [data[i].sna.replace("YouBike2.0_",""),
      data[i].sarea +data[i].ar,
      data[i].Quantity,
      data[i].available_rent_bikes>0?`<p1>${data[i].available_rent_bikes}</p1>`:`<p2>${data[i].available_rent_bikes}</p2>`,
      data[i].available_return_bikes,
      data[i].mday]
    ).draw(); 
     /* <th>場站中文名稱</th>
    <th>區域地址</th>
    <th>場站總停車格</th>
    <th>場站目前<p2>可借</p2>車輛數量</th>
    <th>空位數量</th>
    <th>資料更新時間</th>*/   
    }
  }};
}
function Taichung_backup(){//暫停使用
  var openUrl= "https://datacenter.taichung.gov.tw/swagger/OpenData/34a848ab-eeb3-44fd-a842-a09cb3209a7d";
  $('#Main_DataTable').DataTable().clear().draw();
  $('#Main_DataTable').DataTable().destroy();
  var t = $('#Main_DataTable').DataTable({
    pageLength: 100
    });    
  var xhr = new XMLHttpRequest();
  xhr.open('GET',openUrl,true);
  xhr.send();
  xhr.onreadystatechange = function(){
  if(this.readyState === 4 && this.status === 200){
    var data = JSON.parse(this.responseText);
    data = data.retVal;
    for (var i = 0; i < data.length; i++) {
      if(data[i].sarea =="南區" || data[i].sarea == "大里區"){
        var Dateformat = data[i].mday;
        t.row.add(
          [data[i].sna.replace("YouBike2.0_",""),
          data[i].sarea + data[i].ar,
          data[i].tot,
          data[i].sbi>0?`<p1>${data[i].sbi}</p1>`:`<p2>${data[i].sbi}</p2>`,
          data[i].bemp ,
          Dateformat.substr(0,4) + "-" + Dateformat.substr(4,2) + "-" 
          + Dateformat.substr(6,2) + " " + Dateformat.substr(8,2) + ":" +  Dateformat.substr(10,2) + ":" + Dateformat.substr(12,2) ]
        ).draw(); 
      }
    }
  }};
}
document.addEventListener("DOMContentLoaded", function() {
  const fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = evt => {
      try {
        var raw = JSON.parse(evt.target.result);
        const data = JSON.parse(raw.retVal);
        // 篩選 & 只保留需要欄位
        const filteredData = data
          .filter(item => item.sarea === "南區" || item.sarea === "大里區")
          .map(item => ({
            name: item.sna.replace("YouBike2.0_",""),
            addr: item.sarea + item.ar,
            tot: item.tot,
            sbi: item.sbi,
            bemp: item.bemp,
            mday: item.mday
          }));

        // 清空舊 DataTable
        $('#Main_DataTable').DataTable().clear().draw();
        $('#Main_DataTable').DataTable().destroy();

        // 建立新的 DataTable
        const t = $('#Main_DataTable').DataTable({
          pageLength: 100
        });

        // 分批渲染，避免大 JSON 卡住
        const chunkSize = 200;
        let index = 0;

        function renderChunk() {
          const chunk = filteredData.slice(index, index + chunkSize);
          chunk.forEach(item => {
            const Dateformat = item.mday;
            t.row.add([
              item.name,
              item.addr,
              item.tot,
              item.sbi > 0 ? `<p1>${item.sbi}</p1>` : `<p2>${item.sbi}</p2>`,
              item.bemp,
              Dateformat.substr(0,4) + "-" + Dateformat.substr(4,2) + "-" +
              Dateformat.substr(6,2) + " " + Dateformat.substr(8,2) + ":" +  
              Dateformat.substr(10,2) + ":" + Dateformat.substr(12,2)
            ]);
          });
          t.draw(false);
          index += chunkSize;
          if(index < filteredData.length) {
            setTimeout(renderChunk, 0); // 非同步渲染下一批
          }
        }

        renderChunk();

      } catch(err) {
        alert("解析 JSON 發生錯誤：" + err);
      }
    };

    reader.readAsText(file);
  });
});
