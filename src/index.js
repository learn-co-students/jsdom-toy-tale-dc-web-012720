let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  document.addEventListener("submit", processNewToy)
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
  .then(resp => resp.forEach(resp => renderToys(resp)))
}

function renderToys(element) {
  let toyCollectDiv = document.getElementById('toy-collection')

    let newDiv = document.createElement('div')

    newDiv.dataset.id = element.id
    let toyName = document.createElement('h2')
      toyName.innerText = element.name

    let toyImgSrc = document.createElement('img')
      toyImgSrc.src = element.image
      toyImgSrc.className = 'toy-avatar'

    let toyLikeP = document.createElement('p')
      toyLikeP.innerText = `${element.likes}`

    let toyLikeBtn = document.createElement('button')
      toyLikeBtn.dataset.id = element.id
      toyLikeBtn.className = 'like-btn'
      toyLikeBtn.innerText = "Like <3"
      toyLikeBtn.addEventListener("click", increaseLikes)

    newDiv.classList += 'card'
    newDiv.append(toyName, toyImgSrc, toyLikeP, toyLikeBtn)
    toyCollectDiv.append(newDiv);
}

function processNewToy(event) {
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": event.target.name.value,
      "image": event.target.image.value,
      "likes": 0
    }
    )}).then(resp => resp.json())
    .then(resp => renderToys(resp))
    event.target.reset()
}

function increaseLikes(event) {

  let toyLikeId = event.currentTarget.dataset.id
  // document.getElementById("myDIV").querySelectorAll(".example")
  let element = event.target.parentElement
  let newLikes = parseInt(element.children[2].innerText)
  newLikes += 1
  fetch(`http://localhost:3000/toys/${toyLikeId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then(resp => resp.json())
  .then(resp => addLikes(resp))//renderToys(resp))
}

function addLikes(element) {

  console.log(element.likes)

  let divChoice = document.querySelectorAll('div.card')[element.id - 1]

  divChoice.children[2].innerText = element.likes
}
