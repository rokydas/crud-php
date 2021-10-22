const setInsertFormToModal = () => {
    document.getElementById("modal-title").innerText = "Insert Blog"

    const modalBody = document.getElementById("modal-body")
    modalBody.innerHTML = `
        <h5 class="mb-2">Blog title</h5>
        <input class="form-control" id="blog-title" placeholder="Enter blog title" />
        <br />
        <h5 class="mb-2">Author</h5>
        <input class="form-control" id="author" placeholder="Enter author name" />
        <br />
        <h5 class="mb-2">Blog body</h5>
        <textarea class="form-control" rows="5" id="blog-body" placeholder="Enter blog body" />
    `
    const modalFooter = document.getElementById("modal-footer")
    modalFooter.innerHTML = `
        <button type="button" id="blog-title" onclick="insertBlog()" class="btn btn-primary">Submit</button>
        <button type="button" id="blog-body" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    `

}

const insertBlog = () => {
    const title = document.getElementById("blog-title").value
    const body = document.getElementById("blog-body").value
    const author = document.getElementById("author").value
    
    console.log(title, body, author)
}

const getSinglePostForUpdate = (id) => {

    fetch(baseUrl + '/api/post/read_single.php?id=' + id)
        .then(res => res.json())
        .then(data => setUpdateFormToModal(data))
}

const setUpdateFormToModal = (data) => {
    document.getElementById("modal-title").innerText = "Update Blog"

    const modalBody = document.getElementById("modal-body")
    modalBody.innerHTML = `
        <h5 class="mb-2">Blog title</h5>
        <input class="form-control" id="blog-title" placeholder="Enter blog title" />
        <br />
        <h5 class="mb-2">Author</h5>
        <input class="form-control" id="author" placeholder="Enter author name" />
        <br />
        <h5 class="mb-2">Blog body</h5>
        <textarea class="form-control" rows="5" id="blog-body" placeholder="Enter blog body" />
    `
    document.getElementById('blog-title').setAttribute("value", data.title);
    document.getElementById('author').setAttribute("value", data.author);
    document.getElementById('blog-body').value = data.body;

    const modalFooter = document.getElementById("modal-footer")
    modalFooter.innerHTML = `
        <button type="button" onclick="updateBlog('${data.id}')" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
    `
}

const updateBlog = (id) => {
    const title = document.getElementById("blog-title").value
    const body = document.getElementById("blog-body").value
    const author = document.getElementById("author").value

    fetch(baseUrl + '/api/post/update.php', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify( {id, title, body, author, category_id: "2"})                                        
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("alert-image").src = "images/done.jpg"
            document.getElementById("alert-text").innerText = "Your blog is updated successfully"
            document.getElementById("alert-button").click()
            loadBlogs();
        })
        .catch(error => {
            document.getElementById("alert-image").src = "images/not_done.jpg"
            document.getElementById("alert-text").innerText = "Sorry, something went wrong."
            document.getElementById("alert-button").click()
        })
}