const btnAgregar =document.getElementById("btnAgregar");
const btnClear =document.getElementById("btnClear");
const txtName=document.getElementById("Name"); //Acceder a los campos a través del Id
const txtNumber=document.getElementById("Number");
const alertValidaciones=document.getElementById("alertValidaciones");
const alertValidacionesTexto=document.getElementById("alertValidacionesTexto");
const tablaListaCompras=document.getElementById("tablaListaCompras"); //Definir tabla
const cuerpoTabla=tablaListaCompras.getElementsByTagName("tbody").item(0); //Definir cuerpo de la tabla

const contadorProductos=document.getElementById("contadorProductos");
// const totalPrecio=document.getElementById("totalPrecio");
const productosTotal=document.getElementById("productosTotal");
const precioTotal=document.getElementById("precioTotal");

let cont=0;
let costoTotal=0;
let totalEnProductos=0;
let datos=new Array();

function validarCantidad(){

    if(txtNumber.value.length<=0){ //Valida que se ingrese algo al campo,que el campo no este vacio
      return false;
    } //length<=0
  if(isNaN(txtNumber.value)){ //Valida que el valor ingresado sea un numero.
    return false;
  }//isNan

  if(Number(txtNumber.value)<=0){ //Valida que la cantidad ingresada sea mayor a cero
    return false;
  }
    return true;

}

function getPrecio(){
 return Math.round (Math.random()*100000)/100; //redondear a dos decimales el precio random
}//getPrecio

btnAgregar.addEventListener("click",function(event){ //Validar campos Name y Number
    event.preventDefault();
    let isValid=true; //Bandera ,al ser true permite agregar los datos a la tabla
    //Cada que presione el boton se limpia 
    txtName.value=txtName.value.trim(); //Elimina los epsacios en blanco al principio y al final de un campo
    txtNumber.value=txtNumber.value.trim();
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";



if(txtName.value.length<3){
//1.Mostrar la alerta con el error
//2.Borde de color rojo
txtName.style.border="solid red medium"; //2
alertValidacionesTexto.innerHTML="<strong> El nombre del producto no es correcto.</strong> ";
alertValidaciones.style.display="block";
isValid=false; //Bandera

}
if(! validarCantidad()){ //Si regresa false ,si no se cumple alguna(s) de las validaciones de la funcion validarCantidad
    txtNumber.style.border="solid red medium"; //El borde se pone de color rojo
    alertValidacionesTexto.innerHTML+="<br/> <strong> La cantidad  no es correcta.</strong> "; //Mensaje de error
    alertValidaciones.style.display="block";
    isValid=false;//Bandera,no se podra agregar a la tabla
} /// !validarCantidad
//length
//1.Length
//2.>=0
if (isValid){  //Agregar los datos a la tabla 
    cont++;
    let precio=getPrecio();

   let row=`<tr>
             <td>${cont}</td> 
             <td>${txtName.value}</td> 
             <td>${txtNumber.value}</td> 
             <td>${precio}</td> 
         </tr>`;
      let elemento ={"cont":cont,
          "nombre":txtName.value,
          "cantidad":txtNumber.value,
          "precio":precio
           };
        datos.push(elemento); //meter el ultimO renglon de la tabla en el arreglo
        localStorage.setItem("datos", JSON.stringify(datos));
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
         costoTotal+=precio *Number(txtNumber.value); //Convertir la cantidad en numero
         precioTotal.innerText= "$" +costoTotal.toFixed(2); 
         contadorProductos.innerText=cont; //Resumen 
         totalEnProductos+=Number(txtNumber.value); 
         productosTotal.innerText=totalEnProductos;
         localStorage.setItem("costoTotal", costoTotal); //Alamcenar los datos en el navegador
         localStorage.setItem("totalEnProductos" , totalEnProductos);
         localStorage.setItem("cont", cont);
         txtName.style.border=" ";
         txtNumber.style.border=" ";
         txtName.focus();

} //isValid

}); //btAgregar click

btnClear.addEventListener("click",function(event){
  event.preventDefault();
  txtName.value=""; //Elimina los espacios en blanco al principio y al final de un campo
  txtNumber.value="";
  cont=0;
  costoTotal=0;
  totalEnProductos=0;
  precioTotal.innerText="$" +costoTotal;
  contadorProductos.innerText=cont;
  productosTotal.innerText=totalEnProductos;
  cuerpoTabla.innerHTML="";
  txtName.style.border="";
  txtNumber.style.border="";
  alertValidacionesTexto.innerHTML="";
  alertValidaciones.style.display="none";


}); //btnClear click

window.addEventListener("load",function(event){

   if(this.localStorage.getItem("costoTotal")!=null){
   costoTotal= Number(this.localStorage.getItem("costoTotal"));
   }
   if(this.localStorage.getItem("totalEnProductos")!=null){
   totalEnProductos=Number(this.localStorage.getItem("totalEnProductos"));
   }
   if(this.localStorage.getItem("cont")!=null){
    cont=Number(this.localStorage.getItem("cont"));
    }
    if(this.localStorage.getItem("datos")!=null){
      datos=JSON.parse(this.localStorage.getItem("datos"));
      }
     datos.forEach((r)=>{
      let row=`<tr>
             <td>${r.cont}</td> 
             <td>${r.nombre}</td> 
             <td>${r.cantidad}</td> 
             <td>${r.precio}</td> 
         </tr>`;
         cuerpoTabla.insertAdjacentHTML("beforeend",row);

     });
    precioTotal.innerText= "$" +costoTotal.toFixed(2); 
    contadorProductos.innerText =cont;
    productosTotal.innerText=totalEnProductos;

}); //window load