let meal="breakfast"
let filter= document.querySelector("#filter");
filter.addEventListener("click", getMeal);
let tarjetas = document.querySelector("#cards")
tarjetas.addEventListener("input", getCard)
//funcionalidad filtro
filter.addEventListener("input",(e)=>{
    meal= e.target.value;
    if(meal === ""){
        meal = "breakfast"
    }
    getCard();
})

//filtrador
document.addEventListener("DOMContentLoaded", getMeal)
function getMeal(){
    let url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    fetch(url)
    .then(result=>{
        console.log(result);
        return result.json()
    })
    .then (date=>{
        console.log(date);
        printHTML(date.categories)
    })
}
function printHTML(filters){
    let cont = document.querySelector("#filter")
    let plantilla = ""
    filters.forEach(filter=>{
        let {idCategory, strCategory, strCategoryThumb, strCategoryDescription } = filter
        plantilla+=`
        <option value="${strCategory}">${strCategory}</option>n>
        `
    })
    cont.innerHTML = plantilla
}

//parte de las tarjetas
document.addEventListener("DOMContentLoaded", getCard)
function getCard(){
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
    fetch(url)
    .then(result=>{
        console.log(result);
        return result.json()
    })
    .then(date=>{
        console.log(date);
        showCards(date.meals)
    })
}
function showCards(cards){
    let contenido = document.querySelector("#cards")
    let plantillaa = ""
    cards.forEach(card=>{
        let{idMeal,strMeal,strCategoryDescription, strCategory,strMealThumb, strArea,strTags,strYoutube,strSource} = card
        plantillaa +=`
        <div class="card" style="width: 18rem;">
  <img src="${strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${strMeal}</h5>
    <p class="card-text">${idMeal}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${strArea}</li>
    <li class="list-group-item">${strTags}</li>
    <li class="list-group-item">${strCategory}</li>
  </ul>
  <div class="card-body">
    <a href="${strYoutube}" class="card-link">Youtube</a>
    <a href="${strSource}" class="card-link">Mas info</a>
  </div>
</div>`
    })
    contenido.innerHTML= plantillaa
}