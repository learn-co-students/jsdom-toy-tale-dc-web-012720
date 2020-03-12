let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const submitToyForm = document.getElementsByClassName("add-toy-form")[0]
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys").then(resp => resp.json()).then(toys => toys.forEach(toy => renderToy(toy)))
  submitToyForm.addEventListener("submit", processToyForm)
});

function renderToy(toy) {
  const toyContainer = document.getElementById('toy-collection')

  let card = document.createElement('div')
  card.classList.add('card')
  card.dataset.id = toy.id
  let name = document.createElement('h2')
  name.innerText = toy.name
  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.classList.add('toy-avatar')
  let likes = document.createElement('p')
  likes.innerText = toy.likes
  likes.classList.add('likes')
  let span = document.createElement('span')
  let btn = document.createElement('button')
  btn.classList.add('like-btn')
  btn.innerText = "Like <3"
  btn.addEventListener("click", likeHandler)
  let deleteBtn = document.createElement('button')
  deleteBtn.innerText = "Delete"
  btn.classList.add('delete-btn')
  deleteBtn.addEventListener("click", deleteHandler)

  span.append(btn, deleteBtn)
  card.append(name, toyImage, likes, span)
  toyContainer.append(card)
}

function processToyForm(event) {
  event.preventDefault()
  let newName = event.target.name.value
  let newImage = event.target.image.value
  let newLikes = 0
  console.log(newLikes)
  let payload = {name: newName, image: newImage, likes: newLikes}
  payload = JSON.stringify(payload)

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: payload
  }).then(resp => resp.json()).then(toy => renderToy(toy))

  event.target.reset()
}

function likeHandler(event) {
  let likes = event.target.parentNode.parentNode.getElementsByClassName('likes')[0]
  let toyId = event.currentTarget.parentNode.parentNode.dataset.id
  let likesText = parseInt(likes.innerText)
  likesText += 1
  likes.innerText = likesText
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json', Accept: "application/json"},
    body: JSON.stringify({"likes": likesText})
  })
}

function deleteHandler(event) {
  let toyId = event.currentTarget.parentNode.parentNode.dataset.id
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "DELETE"
  })
  event.currentTarget.parentNode.parentNode.remove()
}