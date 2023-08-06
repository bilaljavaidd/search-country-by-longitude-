const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const Countrty = document.querySelector(".Countrty");
const submited = document.querySelector(".Countrty");
console.log(latitude)
console.log(longitude)
Countrty.addEventListener("click", () => {
  location.reload();
  console.log("page reload")
});

function getLocation() {
  console
  fetch(
    `https://geocode.xyz/${latitude.value},${longitude.value}?geoit=json`
  )
    .then((response) => {
      console.log("response mil gaya",response);

      if (!response.ok)
        throw new Error(`Geocoding throw an error (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data.country);
      const country = data.country;

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then((response) => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then((data) => {
      console.log(data);
      showContent(data[0]);
    })
    .catch((error) => {
      console.log(error)
      errorDetect(error);
    });
}
submited.addEventListener('click', getLocation)

const mainCountry = document.querySelector(".mainCountry");
const countryData = document.querySelector(".countryData");

const errorDetect = (err) => {
  mainCountry.style.display = "none";
  countryData.style.display = "block";
  mainCountry.innerText = `Something went wrong ${err}, Try Again!`;
};

const population = document.querySelector(".population");
const language = document.querySelector(".language");
const capital = document.querySelector(".capital");
const googleMap = document.querySelector(".googleMap");
const currency = document.querySelector(".curreny");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".subRegion");
const countryFlag = document.querySelector(".countryFlag");


const showContent = (cD) => {
  console.log(cD)
  mainCountry.style.display = "none";
  countryData.style.display = "block";
  const currencySub = Object.values(cD.currencies)[0]

  countryFlag.src = cD.flags.png;
  population.innerHTML = cD.population;
  language.innerHTML = Object.values(cD.languages)
  capital.innerHTML = cD.capital;
  currency.innerHTML =Object.values(currencySub)  ;
  region.innerHTML = cD.region;
  subRegion.innerHTML = cD.subregion;
  googleMap.innerHTML = cD.maps.googleMaps;
};
