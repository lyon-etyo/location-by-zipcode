const zipForm = document.getElementById("zip-form");
const infoDiv = document.getElementById("output");
let zipCode;
// Listen for submit
zipForm.addEventListener("submit", getLocationInfo);

infoDiv.addEventListener("click", e => {
  if (e.target.classList.contains("delete")) {
    infoDiv.firstElementChild.remove();
  }
});

function getLocationInfo(e) {
  // Prevent default behaviour of submit
  e.preventDefault();
  // Get zip value from input
  zipCode = zipForm.elements[0].value;
  // Make Request to Zippopotamus API
  fetch(`https://api.zippopotam.us/us/${zipCode}`)
    .then(response => {
      if (response.status != 200) {
        infoDiv.innerHTML = `
        <article class="message is-danger">
            <div class="message-body">Invalid Zipcode, please try again.</div>
        </article>`;
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(data => {
      infoDiv.innerHTML = `
        <article class="message is-success">
            <div class="message-header">
                <p>Location Info</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                <ul>
                    <li><strong>City: </strong>${data.places[0]["place name"]}</li>
                    <li><strong>State: </strong>${data.places[0]["state"]}</li>
                    <li><strong>Longitude: </strong>${data.places[0]["longitude"]}</li>
                    <li><strong>Latitude: </strong>${data.places[0]["latitude"]}</li>
                </ul>
            </div>
        </article>`;
    })
    .catch(err => console.log(err));
}
