const tech = [
    "Python",
    "Git",
    "Docker",
    "Nginx",
    "FastAPI",
    "Aiogram",
    "Aiohttp",
    "PostgreSQL",
    "Redis",
    "И другие...",
];

const projects = [
    {
        id: 1,
        title: "KV Stars (в разработке)",
        description: "Телеграм бот для приобретения Telegram Stars",
        fullDescription: "Телеграм бот, поднятый через Docker с ипользованием вебхуков. Привязан сервис интернет-эквайринга, взаимодействие с Fragment через Private API, полученный путем реверс инженеринга, а также работа с блокчейном TON.",
        technologies: ["Python", "Docker", "Nginx", "FastAPI", "Aiogram", "Aiohttp", "PostgreSQL", "Redis", "TonUtils"],
        image: null,
        url: "https://t.me/KVstars_bot",
        github: null,
    },
];

function loadTech() {
    const techGrid = document.getElementById('tech-grid');

    tech.forEach(t =>  {
        const techCard = document.createElement('div');
        techCard.className = 'tech-item';
        techCard.innerHTML = t;

        techGrid.appendChild(techCard);
    });
}

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">Изображение проекта: ${project.title}</div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
            </div>
        `;
        
        projectCard.addEventListener('click', () => openProjectModal(project.id));
        projectsGrid.appendChild(projectCard);
    });
}

function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (project) {
        modalContent.innerHTML = `
            <h2>${project.title}</h2>
            <div class="project-image">Изображение проекта: ${project.title}</div>
            <div class="project-details">
                <p>${project.fullDescription}</p>
                <h3>Использованные технологии:</h3>
                <div class="tech-grid">
                    ${project.technologies.map(tech => `<div class="tech-item">${tech}</div>`).join('')}
                </div>
                <div style="margin-top: 20px;">
                    <a href="${project.url}" class="btn" target="_blank">Демо</a>
                    <a href="${project.github}" class="btn" target="_blank" style="margin-left: 10px;">GitHub</a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    
    const url = new URL(window.location);
    url.searchParams.delete('project');
    window.history.replaceState({}, '', url);
}

document.getElementById('close-modal').addEventListener('click', closeProjectModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        openProjectModal(parseInt(projectId));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTech();
    loadProjects();
    handleUrlParams();
    
    const originalOpenProjectModal = openProjectModal;
    openProjectModal = function(projectId) {
        window.history.pushState({}, '', `?project=${projectId}`);
        originalOpenProjectModal(projectId);
    };
    
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');
        
        if (!projectId) {
            closeProjectModal();
        } else {
            openProjectModal(parseInt(projectId));
        }
    });
});