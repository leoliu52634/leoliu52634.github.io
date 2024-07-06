$(document).ready(function(){
  var openUrl= "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";
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
      t.row.add([data[i].sna.replace("YouBike2.0_",""),data[i].sarea + data[i].ar,data[i].total,data[i].available_rent_bikes>0?`<p1>${data[i].available_rent_bikes}</p1>`:`<p2>${data[i].available_rent_bikes}</p2>`,data[i].available_return_bikes,data[i].mday]).draw(); 
    }
  }};
});