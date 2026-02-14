const container = document.getElementById("articles-container");

articles.forEach(article => {

  const articleHTML = `
    <article class="book">
      <img 
        src="${article.imgSrc}" 
        alt="${article.imgAlt}"
      >

      <section class="book-info">
        <h2>${article.title}</h2>
        <p><strong>Author:</strong> ${article.author}</p>
        <p><strong>Genre:</strong> ${article.genre}</p>
        <p><strong>Published:</strong> ${article.published}</p>
        <p class="description">
          ${article.description}
        </p>
        <p class="stars">${article.stars}</p>
      </section>
    </article>
  `;

  container.innerHTML += articleHTML;

});
