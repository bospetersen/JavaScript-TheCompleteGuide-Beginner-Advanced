const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-posts');

const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

const postList = document.querySelector('ul');

const xhr = new XMLHttpRequest();
const methodGet = "GET";
const methodPost = "POST";
const methodDelete = "DELETE";
const url = "https://jsonplaceholder.typicode.com/posts";
const urlDelete = "https://jsonplaceholder.typicode.com/posts";

function sendHttpRequest(method, url, data) {
  // const promise = new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();

  //   xhr.responseType = "json";

  //   xhr.open(method, url);
  //   xhr.onload = function () {
  //     if (xhr.status >= 200 && xhr.status < 300) {

  //       resolve(xhr.response);
  //     } else {
  //       reject(new Error('Something went wrong!'))
  //     }
  //   }

  //   xhr.onerror = function () {
  //     console.log(xhr.response);
  //     console.log(xhr.status);
  //     reject(new Error('The request couldn´t be send!'))
  //   }

  //   xhr.send(JSON.stringify(data));
  // });
  // return promise;

  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return response.json().then(errData => {
        console.log(errData);
        throw new Error('Something went wrong: Server-side!');
      })
    }
  })
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(methodGet, url);

    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h3').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message)
  }
}

async function createPost(title, content) {
  const userId = Math.random();

  const post = {
    title: title,
    body: content,
    userId: userId

  }

  sendHttpRequest(methodPost, url, post)

}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
  event.preventDefault();

  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;
  createPost(enteredTitle, enteredContent)

});
postList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {

    const postId = event.target.closest('li').id;
    sendHttpRequest(methodDelete, urlDelete + '/' + postId)
    console.log(postId)
  }
})