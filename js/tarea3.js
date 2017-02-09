//Declaracion de variables
var cedula = document.getElementById("cd_txt");
var nombre = document.getElementById("nom_txt");
var apellido = document.getElementById("ap_txt");
var xp = document.getElementById("xp_txt");
var table_pkm = document.getElementById("table_pkm");
var table_scroll = document.getElementById("table-scroll");
var nv_btn = document.getElementById("nv_button");
var sv_btn = document.getElementById("sv_button");
var add_pkmn_btn = document.getElementById("add_pkmn");
var nom_pkmn = document.getElementById("nom_pkmn");
var nivel_pkmn = document.getElementById("nivel_pkmn");
var xp_pkmn = document.getElementById("xp_pkmn");
var dt_button = document.getElementById("button_batch");
var table_prof = document.getElementById("table_prof");
var data = [];
var dataPkmn = [];
var indx = 0;
var indxPkmn = 0;
var btn_edit_td = document.getElementById("btn_edit_td");
var btn_edit_pkmn = document.getElementById("edit_pkmn_btn");
var n;

//Metodos o funciones
function dce(e){
  return document.createElement(e);
}
function maestros(cd, nom, ap, xp,pkmn,tpokmn){
  this.cedula = cd;
  this.nombre = nom;
  this.apellido = ap;
  this.pokemonNum = pkmn;
  this.pokemon = tpokmn;
  t = parseInt(xp);
  if(isNaN(t)){
    t = 0;
  }
  this.experiencia = t;


}
function pokemones(nomPkmn, nivelPkmn, xp){
  this.nombrePkmn= nomPkmn;
  this.nivelPkmn = nivelPkmn;
  this.xpPkmn = xp;
}

function addMaestro(){
  var ced = cedula.value;
  var nom = nombre.value;
  var ap = apellido.value;
  var xpMaestro = xp.value;

  var pkm = table_pkm.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length - 1;
  var pokmns = dataPkmn;
  if(ced!=""&& nom!=""&&ap!=""&&xpMaestro!=0)
  {
    ms = new maestros(ced,nom,ap,xpMaestro,pkm,pokmns);
    data.push(ms);
    outputMaestro();
    limpiarCamposMaestros();
    limpiarCamposPkmn();
    save();
    readOnlyProfTrue();
    table_pkm.style.display = "none";
    table_scroll.style.display = "none";
    location.reload();
  }
  else{
    alert("Hay campos vacios por favor llenelos");
  }
}


function outputMaestro(){
  destino = document.getElementById("tb_insert_prof");
  for (var i = indx; i < data.length; i++) {
    var registro = data[i];
    row = destino.insertRow();
    row.id = "prof_row"+i;
    row.setAttribute("index",i);
    console.log(row.id);
    cell = row.insertCell(-1);
    cell.id = "ced_cell"+ i;
    cell.innerHTML = registro.cedula;
    cell = row.insertCell(-1);
    cell.id = "nombreProf_cell"+ i;
    cell.innerHTML = registro.nombre;
    cell = row.insertCell(-1);
    cell.id = "apProf_cell"+i;
    cell.innerHTML = registro.apellido;
    cell = row.insertCell(-1);
    cell.id = "xpProf_cell"+i;
    cell.innerHTML = registro.experiencia;
    cell = row.insertCell(-1);
    cell.id = "numPkmn_cell"+ i;
    cell.innerHTML = registro.pokemonNum;
    cell= row.insertCell(-1);
    btn1 = dce("button");
    btn1.id = "edit_btn"+i;
    btn1.setAttribute("class","btn btn-default");
    btn1.innerHTML = "editar";
    btn1.setAttribute("onclick","updateRegistro(this)");
    cell.appendChild(btn1);
    cell= row.insertCell(-1);
    btn2 = dce("button");
    btn2.id = "del_btn"+i;
    btn2.setAttribute("class","btn btn-default");
    btn2.innerHTML = "X";
    cell.appendChild(btn2);
    btn2.setAttribute("onclick","borrarMaestro(this)");

  }
  indx = i;
}
function updateRegistro(btn){
  tr = btn.parentNode.parentNode;
  if(confirm("Seguro que desea editar esta fila?")){
    tr.setAttribute("class","warning");
    var len = table_prof.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    for(i=0; i < len; i++){
      var et_btn = document.getElementById("edit_btn"+i);
      var dlt_btn = document.getElementById("del_btn"+i);
      et_btn.disabled = true;
      dlt_btn.disabled = true;
    }

    index = tr.getAttribute("index");
    table_pkm.style.display="inline-block";
    table_scroll.style.display = "inline-block";
    readOnlyProfFalse();
    dataPkmn = data[index].pokemon;
    outputPkmn();
    //variables
    cedula.value = data[index].cedula;
    nombre.value = data[index].nombre;
    apellido.value = data[index].apellido;
    xp.value = data[index].experiencia;
    nv_btn.disabled = true;
    sv_btn.disabled = true;

    btn_edit_td.style.display="inline-block";
    btn_edit_td.setAttribute("onclick","svData_upd(this)");
  }
}

function svData_upd(btn){
  var ced = cedula.value;
  var nom = nombre.value;
  var ap = apellido.value;
  var xpMaestro = xp.value;
  var pkmNum = table_pkm.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length - 1;
  var len = table_prof.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
  for(i=0; i < len; i++){
    var et_btn = document.getElementById("edit_btn"+i);
    var dlt_btn = document.getElementById("del_btn"+i);
    et_btn.disabled = false;
    dlt_btn.disabled = false;
  }
  if(ced!=""&& nom!=""&&ap!=""&&xpMaestro!=0)
  {
    mas = new maestros(ced,nom,ap,xpMaestro,pkmNum,dataPkmn);
    nv_btn.disabled = false;
    sv_btn.disabled = false;
    btn_edit_td.style.display="none";
    btn.style.display = "none";
    console.log(indx);
    console.log(data.length);
    for(var i = 0; i < data.length; i++){
      if(i == index){
        console.log(mas);
        data[i] = mas;
      }

    }
    //var ind = index++;
    save();
    readOnlyProfTrue();
    table_pkm.style.display = "none";
    table_scroll.style.display = "none";
    limpiarCamposMaestros();
    limpiarCamposPkmn();
    location.reload();


  }
  else{
    alert("Hay campos vacios por favor llenelos");
  }

}

function borrarMaestro(btn)
{
  tr = btn.parentNode.parentNode;
  tr.setAttribute("class","danger");
  if(confirm("Seguro que desea eliminar la fila seleccionada?")){
    index = tr.getAttribute("index");
    tarr = [];
    for(i=0; i < data.length;i++){
      if(i!=index){
        tarr.push(data[i]);
      }
}
  data = tarr;
  tr.parentNode.removeChild(tr);
  save();
  limpiarCamposMaestros();
  location.reload();

}
tr.setAttribute("class","");
outputMaestro();
}
function limpiarCamposMaestros(){
  cedula.value = "";
  nombre.value = "";
  apellido.value = "";
  xp.value = "0";

}

function addPkmn(){

  var nomPkmn = nom_pkmn.value;
  var nivelPkmn = nivel_pkmn.value;
  var xpPkmn = parseInt(xp_pkmn.value);
  if(nomPkmn!=''&& nivelPkmn!=null && xpPkmn!=null)
  {
    pmon = new pokemones(nomPkmn,nivelPkmn,xpPkmn);
    dataPkmn.push(pmon);
    xp.value = parseInt(xp.value) + xpPkmn;
    outputPkmn();
    limpiarCamposPkmn();

  }
  else{
    alert("Campos vacios intente denuevo");
  }
}

function limpiarCamposPkmn(){
  nom_pkmn.value = "";
  nivel_pkmn.value = null;
  xp_pkmn.value = null;
}
function outputPkmn()
{
  destino = document.getElementById("tb_insert_pkmn");
  for(var i = indxPkmn; i < dataPkmn.length;i++)
  {
    var registro = dataPkmn[i];

    row = destino.insertRow();
    row.id = "pkmn_row"+i;
    row.setAttribute("index",i);
    cell = row.insertCell(-1);
    cell.id = "nombrePkmn_cell"+ i;
    cell.innerHTML = registro.nombrePkmn;
    cell = row.insertCell(-1);
    cell.id = "nivelPkmn_cell"+ i;
    cell.innerHTML = registro.nivelPkmn;
    cell = row.insertCell(-1);
    cell.id = "xpPkmn_cell"+i;
    cell.innerHTML = registro.xpPkmn;
    cell= row.insertCell(-1);
    btn = dce("button");
    btn.id = "del_btn_pkmn"+i;
    btn.setAttribute("class","btn btn-default");
    btn.innerHTML = "X";
    cell.appendChild(btn);
    btn.setAttribute("onclick","borrarPkmn(this)");

  }
indxPkmn = i;
}

function borrarPkmn(btn){
  tr = btn.parentNode.parentNode;
  tr.setAttribute("class","danger");
  if(confirm("Seguro que desea eliminar la fila seleccionada?")){

    index = tr.getAttribute("index");
    xPkmn = document.getElementById("xpPkmn_cell"+index);
    tarr = [];
    for(i=0; i < dataPkmn.length;i++){
      if(i!=index){
        tarr.push(dataPkmn[i]);
      }


}


  xp.value = parseInt(xp.value) - parseInt(xPkmn.innerText);
  dataPkmn = tarr;
  tr.parentNode.removeChild(tr);



}
tr.setAttribute("class","");
indxPkmn--;
outputPkmn();
}
function save(){
  var datos = JSON.stringify(data);
  localStorage.setItem('dataRegistroProf',datos);
}

function ms_data(){
  limpiarCamposMaestros();
  limpiarCamposPkmn();

  table_pkm.style.display ="inline-block";
  table_scroll.style.display = "inline-block";
  readOnlyProfFalse();

}
function readOnlyProfFalse(){
  cedula.readOnly = false;
  nombre.readOnly = false;
  apellido.readOnly = false;

}
function readOnlyProfTrue(){
  cedula.readOnly = true;
  nombre.readOnly = true;
  apellido.readOnly = true;

}
function loadDataProf(){
  var datos = localStorage.getItem('dataRegistroProf');
  if(datos != null){
    data = JSON.parse(datos);
    outputMaestro();
  }

}
//Listeners
nv_btn.addEventListener("click",ms_data);
add_pkmn_btn.addEventListener("click",addPkmn);
sv_btn.addEventListener("click",addMaestro);
window.onload = loadDataProf();
