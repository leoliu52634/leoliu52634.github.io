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
      t.row.add([data[i].sna,data[i].sarea + data[i].ar,data[i].tot,data[i].sbi,data[i].bemp,data[i].mday]).draw(); 
    }
  }};
});