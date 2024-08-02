$(document).ready(function(){
  /**
   * escucha evento submit en el form e inicia el proceso de evaluacion del dato ingresado en input
   */
  $("form").on("submit", gestionFormulario)
  
})

/**
 * 
 * @param {*} e previene la recarga del sitio al hacer busqueda con enter
 * obtiene el dato ingresado por el input a la variable heroId y lo valida
 */
const gestionFormulario = function (e){
  e.preventDefault();
  
  let heroId = $("#heroNum").val();

  
  validaSearch(heroId);
}
/**
 * 
 * @param {*} datos 
 * valida con expresion regular que el ingreso sea digito que tenga mas de 1 y que termine con digito
 * luego si cumple el ingreso con ser mayor de 0 y menor o igual a 733 permite ejecucion del plugin.
 */
function validaSearch(datos){
  const accessToken = "6eed98d57fb05a22296677b911322ecc";
  const regex = /^\d+$/;
  if(regex.test(datos) && datos >0 && datos <= 732){
    console.log(typeof datos)
    $(".hero").superHero(accessToken,datos);
  } else {
    alert('El dato ingresado no es valido recuerda buscar entre el 1 y el 733')
  }
}