const baseUrl = "http://localhost/php_rest_crud"

const loadBlogs = () => {
    fetch(baseUrl + "/api/post/read.php")
        .then(res => res.json())
        .then(data => setBlogs(data.data))
}

loadBlogs()

const setBlogs = (blogs) => {
    const blogContainer = document.getElementById("blog-container")
    blogContainer.innerHTML = ''
    for (const blog of blogs) {
        const blogDiv = document.createElement("div")
        const classList = ['col-md-4', 'p-3', 'border']
        blogDiv.classList.add(...classList)
        blogDiv.innerHTML = `
            <h3>Title: ${blog.title}</h3>
            <h4>Author: ${blog.author}</h4>
            <h5>Category: ${blog.category_name}</h5>
            <p>${blog.body}</p>
            
            <button onclick="getSinglePostForUpdate('${blog.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Update</button>
            <button onclick="deletePost('${blog.id}')" class="btn btn-danger">Delete</button>
        `
        blogContainer.appendChild(blogDiv)
    }
}

const deletePost = (id) => {
    fetch(baseUrl + "/api/post/delete.php", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
          body: JSON.stringify( {id})
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("alert-image").src = "images/done.jpg"
            document.getElementById("alert-text").innerText = "Your blog is deleted successfully"
            document.getElementById("alert-button").click()
            loadBlogs();
        })
        .catch(error => {
            document.getElementById("alert-image").src = "images/not_done.jpg"
            document.getElementById("alert-text").innerText = "Sorry, something went wrong."
            document.getElementById("alert-button").click()
        })
}