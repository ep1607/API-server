// main.js
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("pages-list")) {
    // This code only runs on pages with <ul id="pages-list">
    // Fetch pages from the server
    // fetch function sends a GET request to the /pages URL
    fetch("/pages")
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById("pages-list");

        // Render the pages
        data.forEach(page => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = `http://localhost:3000/pages/${page.id}`;
          a.textContent = `${page.title}: ${page.content}`;
          li.appendChild(a);
          list.appendChild(li);
        });
      })
      .catch(err => console.error("Error fetching pages:", err));
  }

  if (document.getElementById("page-content")) {
    // This code only runs on pages with <form id="page-content">
    const path = window.location.pathname;
    fetch(path, {
        headers: { 
            "Accept": "application/json" 
        }
    })
        .then(response => response.json())
        .then(data => {
            const div = document.getElementById("page-content");
            const h = document.createElement("h1");
            const p = document.createElement("p");
            h.textContent = data.title;
            p.textContent = data.content;
            div.insertBefore(h, parent.firstChild);
            div.appendChild(p, parent.firstChild);
           
        })
        .catch(err => console.error("Error fetching page:", err));  
  }
});
