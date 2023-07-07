const countriesElem = document.querySelector(".flag-wrapper")
const filters = document.querySelector(".filters")
const regions = document.querySelector(".regions")
const region =document.querySelectorAll(".region")
const search = document.querySelector(".find")
const countryDetail = document.querySelector(".detail-page")
const home = document.querySelector(".home")


async function getCountry(){
    const url = await fetch("./data.json")
    const res =await url.json()

    // console.log(res)

    res.forEach(element => {
        showCountry(element)
    });
}

getCountry()

function showCountry(data){
    const country = document.createElement("div")
    country.classList.add("flag-card")
    country.innerHTML = `
            <div class="flag" >
                <div class="img">
                    <img src="${data.flag}" alt="flag">
                </div>
                <div class="content">
                    <p class="md-heading countryName">${data.name}</p>
                    <p class="sm-heading">Population: <span class="sm-heading-light">${data.population}</span></p>
                    <p class="sm-heading">Region: <span class="sm-heading-light regionName">${data.region}</span></p>
                    <p class="sm-heading">Capital: <span class="sm-heading-light">${data.capital}</span></p>
                </div>
            </div>
            `;
    countriesElem.appendChild(country)   
    
    country.addEventListener("click",()=>{
        showcountryDetail(data)
    })
}



filters.addEventListener("click",()=>{
    regions.classList.toggle("show")
})

const regionName = document.getElementsByClassName("regionName")
const countryName = document.getElementsByClassName("countryName")

region.forEach(reg=>{
    reg.addEventListener("click",(e)=>{
        // console.log(e.target.innerText)
        Array.from(regionName).forEach(elem => {
            if(elem.innerHTML.includes(reg.innerText) || reg.innerHTML=="All"){
                elem.parentElement.parentNode.parentNode.parentElement.style.display = "grid"
            }else{
                elem.parentElement.parentNode.parentNode.parentElement.style.display  = "none"
            }
        });
    })
})

search.addEventListener("input",(e)=>{
    Name = e.target.value.toLowerCase();
    Array.from(countryName).forEach(elem=>{
        Cname = elem.innerText.toLowerCase().includes(Name)
        if(Cname){
            elem.parentElement.parentNode.parentNode.style.display = "grid"
        }else{
            elem.parentElement.parentNode.parentNode.style.display = "none"
        }
    })
})



function showcountryDetail(data){
    home.style.display = "none"
    countryDetail.style.display = "block"
    countryDetail.innerHTML = `
    <div class="btn">
            <a href="index.html"> <button><i class="fas fa-arrow-left"></i> Back</button></a>
        </div>
    
        <div class="flag-detail-wrapper">
            <div class="flag-details">
            <div class="img">
                <img src="${data.flag}" alt="">
            </div>
            <div class="content">
                <h1 class="heading">${data.name}</h1>
                <div class="detail">
                    <p class="sm-heading">Population: <span class="sm-heading-light">${data.population}</span></p>
                    <p class="sm-heading">Native name: <span class="sm-heading-light">${data.nativeName}</span></p>
                    <p class="sm-heading">Region: <span class="sm-heading-light">${data.region}</span></p>
                    <p class="sm-heading">Sub region: <span class="sm-heading-light">${data.subregion}</span></p>
                    <p class="sm-heading">Capital: <span class="sm-heading-light">${data.capital}</span></p>
                    <p class="sm-heading">Top Level Domain: <span class="sm-heading-light">${data.topLevelDomain}</span></p>
                    <p class="sm-heading">Currency: <span class="sm-heading-light">${data.currencies[0].name}</span> </p>
                    <p class="sm-heading">Language: <span class="sm-heading-light">${data.languages.map(e=>e.name)}</span></p>
                </div>
                ${data.borders?
                    `<div class="border-country">
                    <p class="sm-heading">Border Country  : </p>
                    ${data.borders.map(ele=>`<a href="/">${ele}</a>`)}
                </div>`:
                `<div class="border-country">
                <p class="sm-heading">No Border Country</p>

            </div>`
            }
            </div>
        </div>
        </div>
    `
    const back = document.querySelector(".btn")
    back.addEventListener("click",()=>{
        home.style.display = "block"
        countryDetail.style.display = "none"
    })
}



const mode = document.querySelector(".mode");
const current_mode = document.querySelector(".cmode");
mode.addEventListener("click", () => {
  document.documentElement.toggleAttribute("data-dark-mode");

  const moon = document.querySelector(".mode i");
  if (moon.classList.contains("fa-moon")) {
    moon.classList.replace("fa-moon", "fa-sun");
    current_mode.innerText = "Light";
  } else {
    moon.classList.replace("fa-sun", "fa-moon");
    current_mode.innerText = "Dark";
  }
});