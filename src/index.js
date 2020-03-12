let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});


function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(resp => renderToys(resp))
}

function renderToys(input) {
  let toyCollectDiv = document.getElementById('toy-collection')
  input.forEach(element => {
    let newDiv = document.createElement('div')

    let toyName = document.createElement('h2')
      toyName.innerText = element.name
      
    let toyImgSrc = document.createElement('img')
      toyImgSrc.src = element.image
      toyImgSrc.className = 'toy-avatar'

    let toyLikeP = document.createElement('p')

    let toyLikeBtn = document.createElement('button')
      toyLikeBtn.className = 'like-btn'
      toyLikeBtn.innerText = "Like <3"

    newDiv.classList += 'card'
    newDiv.append(toyName, toyImgSrc, toyLikeP, toyLikeBtn)
    toyCollectDiv.append(newDiv)
  });
}