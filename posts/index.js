const postEl = document.getElementById('post')

const loadPost = async () => {
    const url = new URL(window.location.href)
    const id = url.searchParams.get('id')

    if (!id) {
        throw new Error('Не передан id поста')
    }

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!res.ok) {
        throw new Error('Не удалось загрузить пост')
    }

    const post = await res.json()

    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    if (!commentsRes.ok) {
        throw new Error('Не удалось загрузить комментарии')
    }

    const comments = await commentsRes.json()

    postEl.innerHTML = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>

        <h2>Комментарии</h2>
        <div>
            ${comments.map(comment => `
                <div>
                    <h3>${comment.name}</h3>
                    <p>${comment.email}</p>
                    <p>${comment.body}</p>
                </div>`).join('')}
        </div>`
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPost)
} else {
    loadPost()
}
