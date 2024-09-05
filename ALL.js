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
    console.log(data);
    data = data.slice(0,300);
    for (var i = 0; i < data.length; i++) {   
      t.row.add([data[i].sna.replace("YouBike2.0_",""),data[i].sarea + data[i].ar,data[i].total,data[i].available_rent_bikes>0?`<p1>${data[i].available_rent_bikes}</p1>`:`<p2>${data[i].available_rent_bikes}</p2>`,data[i].available_return_bikes,data[i].mday]).draw(); 
    }
  }};
}
function Taichung(){
  var openUrl= "https://datacenter.taichung.gov.tw/swagger/OpenData/86dfad5c-540c-4479-bb7d-d7439d34eeb1";
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
        t.row.add([data[i].sna.replace("YouBike2.0_",""),data[i].sarea + data[i].ar,data[i].tot,data[i].sbi>0?`<p1>${data[i].sbi}</p1>`:`<p2>${data[i].sbi}</p2>`,data[i].bemp ,Dateformat.substr(0,4) + "-" + Dateformat.substr(4,2) + "-" 
          + Dateformat.substr(6,2) + " " + Dateformat.substr(8,2) + ":" +  Dateformat.substr(10,2) + ":" + Dateformat.substr(12,2) ]).draw(); 
      }
    }
  }};
}