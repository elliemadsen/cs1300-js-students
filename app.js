var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=DiFqIFAxwUNSqyevLPoQk5k7CK5rTTXrDo1-KTPa9-Y";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      //handleResponse(request.response);
    })
);

const getPlant = async(name) => {
  fetch(corsApiUrl + "https://trefle.io/api/v1/plants" + apiToken)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(json => filterPlants(json.data, name))
  .catch((error) => console.error("FETCH ERROR:", error));
};

const filterPlants = (data, name) => {
  clearDivs();
  const res = data.filter((arrayItem) => arrayItem.common_name.includes(name));
  console.log(res);
  res.forEach(element => {
    showPlant(element.common_name, element.image_url);
  });
};

const showPlant = (name, url) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  const header = document.createElement("h4");
  header.innerText = name;
  const image = document.createElement("img");
  image.src = url;
  image.height = "150";
  wrapper.appendChild(header);
  wrapper.appendChild(image);
  document.getElementById("plants").appendChild(wrapper);
};

const clearDivs = () => {
  const nextDiv = document.querySelector('div');
  while (nextDiv.firstChild) {
    nextDiv.removeChild(nextDiv.firstChild);
  }
};