
document.getElementById('mobile-menu').addEventListener('click', function() {
    console.log('Menu burger cliqué !');  // Ligne de test
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('mobile-menu');
    
    // Basculer l'état actif du menu burger et des liens de navigation
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Configuration API Airtable
const ACCESS_TOKEN = "patCXkaXvHjOSWG5v.7052af79bbd1295ba884789d8ab9376e3d79c71d9b571435ac21cff7d3bdb661"; // Votre jeton d'accès
const BASE_ID = "appAeViTSpJmhQouZ"; // ID de la base Dizale
const TABLE_PROJECTS_BR = "tblodjfRsgIxTfiAr"; // ID pour Projets récents
const TABLE_NEWS_BR = "tblbhphtTU2WpJWRt"; // ID pour Actualités

// Fonction pour charger les projets récents
async function loadProjects() {
    const url = "https://api.airtable.com/v0/appAeViTSpJmhQouZ/tblodjfRsgIxTfiAr"; // L'URL complète pour les projets récents
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer patCXkaXvHjOSWG5v.7052af79bbd1295ba884789d8ab9376e3d79c71d9b571435ac21cff7d3bdb661`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.querySelector('.project-grid');
        container.innerHTML = ""; // Réinitialiser le contenu

        data.records.forEach((record, index) => {
            const fields = record.fields;
            const projectHTML = `
                <article class="project-item${index + 1}">
                    <h3>${fields.Type || "Catégorie non spécifiée"}</h3>
                    <img src="${fields.Image ? fields.Image[0].url : 'img/default-project.jpg'}" alt="${fields.Titre || "Image indisponible"}" loading="lazy">
                    <p class="project-description">${fields.Description || "Pas de description disponible."}</p>
                    <p class="projects">${fields.Titre || "Titre non spécifié"}</p>
                </article>
            `;
            container.innerHTML += projectHTML;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Fonction pour charger les actualités
async function loadNews() {
    const url = "https://api.airtable.com/v0/appAeViTSpJmhQouZ/tblbhphtTU2WpJWRt"; // L'URL complète pour les actualités
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer patCXkaXvHjOSWG5v.7052af79bbd1295ba884789d8ab9376e3d79c71d9b571435ac21cff7d3bdb661`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const container = document.querySelector('.news-content');
        container.innerHTML = ""; // Réinitialiser le contenu

        data.records.forEach((record, index) => {
            const fields = record.fields;
            const newsHTML = `
                <article class="news-item${index + 1}">
                    <h3>${fields.Titre || "Titre non spécifié"}</h3>
                    <img src="${fields.Image ? fields.Image[0].url : 'img/default-news.jpg'}" alt="${fields.Titre || "Image indisponible"}" loading="lazy">
                    <p class="project-description">${fields.Description || "Pas de description disponible."}</p>
                    <p class="news">${fields.Type || "Type non spécifié"}</p>
                </article>
            `;
            container.innerHTML += newsHTML;
        });
    } catch (error) {
        console.error("Erreur lors du chargement des actualités :", error);
    }
}

// Charger les données au démarrage
loadProjects();
loadNews();
