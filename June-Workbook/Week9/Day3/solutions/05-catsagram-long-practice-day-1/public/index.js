// Your code here
// creating an async function that is responsible for fetching
// an image and returning the image url after being parsed
// this function is async meaning wherever we call it we must handle
// it like a promise. (.then or await)
const fetchImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");

  const data = await response.json();
  console.log("data from the response.json ", data);
  // the data comes back as an array so we must index in to get the url
  const catImageUlr = data[0].url;
  console.log("cat image url ", catImageUlr);

  // this function should do its job of fetching an image and returning
  // the url
  return catImageUlr;
};

const buildPage = () => {
  // selecting the body element from the DOM to append any newly created elements
  const body = document.querySelector("body");
  // creating the heading element to  render our cat image title
  const heading = document.createElement("h1");
  heading.innerText = "Kitten Pic";

  // giving our body some styling
  body.style.width = "100&";
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.alignItems = "center";

  // appending the created heading element to the body
  body.appendChild(heading);

  // Calling build image container here in the order I want the elements to display (TOP DOWN)
  buildImageContainer();
};

const createImage = (imageUrl) => {
  // select the container to append the image to
  const imageContainer = document.getElementById("cat-image-container");

  // checking to see if I already have an image within the container
  // this will prevent adding multiple children to the image container
  if (!imageContainer.children[0]) {
    // creating an image element and setting an id and src attribute
    const imageElement = document.createElement("img");
    imageElement.setAttribute("id", "cat-image");

    // giving our image some styling
    imageElement.style.width = "300px";
    imageElement.style.height = "300px";

    // setting the image url coming from our fetch as the source of our image element
    imageElement.setAttribute("src", imageUrl);
    // appending the newly created image element to our image container
    imageContainer.appendChild(imageElement);
  } else {
    // this shouldn't run for now since we don't have any listeners triggering another fetch call yet
    // a good hint though on how to approach only fetching once.
    alert("Cat Image Already Created, Refresh For New Cat :)");
  }
};

const buildImageContainer = () => {
  // selecting a live element in the DOM to append the container to
  const body = document.querySelector("body");

  //creating a div to hold the cat image as its container
  const catImageContainer = document.createElement("div");

  //giving the cat image container an id for easy selection
  catImageContainer.setAttribute("id", "cat-image-container");

  //appending image element to the body element
  body.appendChild(catImageContainer);
};

// using async to await the fetching of the image before giving content to
// the create image function
const loadPage = async () => {
  buildPage();
  const imageUrl = await fetchImage();
  createImage(imageUrl);
};

window.onload = loadPage;
