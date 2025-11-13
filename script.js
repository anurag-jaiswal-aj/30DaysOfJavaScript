const PROJECTS_BASE_PATH = './projects/';

const PROJECT_FOLDERS = [
    'day01-digital-clock',
    'day02-toast-notification',
    'day03-quote-generator',
    'day04-popup',
    'day05-hide-password',
    'day06-stopwatch',
    'day07-dark-mode-toggle',
    'day08-calculator',
    'day09-password-generator',
    'day10-dropdown-menu',
    'day11-mini-calendar',
    'day12-age-calculator',
    'day13-password-strength',
    'day14-circular-progress-bar',
    'day15-coming-soon-page',
    'day16-email-subscription',
    'day17-form-validation',
    'day18-image-transition',
    'day19-product-page',
    'day20-qr-code-generator',
    'day21-todo-list',
    'day22-image-gallery',
    'day23-text-to-speech',
    'day24-notes-app',
    'day25-quiz-app',
    'day26-drag-and-drop',
    'day27-music-player',
    'day28-image-search',
    'day29-weather-app',
    'day30-crypto-website'
];
let allProjects = [];
let filteredProjects = [];

function formatFolderName(folderName) {
    return folderName
        .replace(/^day\d+-/i, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function extractProjectTitle(htmlContent, folderName) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    const titleTag = doc.querySelector('title');
    if (titleTag && titleTag.textContent.trim()) {
        return titleTag.textContent.trim();
    }
    
    const h1Tag = doc.querySelector('h1');
    if (h1Tag && h1Tag.textContent.trim()) {
        return h1Tag.textContent.trim();
    }
    
    const h2Tag = doc.querySelector('h2');
    if (h2Tag && h2Tag.textContent.trim()) {
        return h2Tag.textContent.trim();
    }
    
    return formatFolderName(folderName);
}

async function fetchProjectInfo(folderName, dayNumber) {
    try {
        const indexPath = `${PROJECTS_BASE_PATH}${folderName}/index.html`;
        const response = await fetch(indexPath);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch ${indexPath}`);
        }
        
        const htmlContent = await response.text();
        const title = extractProjectTitle(htmlContent, folderName);
        
        return {
            day: dayNumber,
            name: title,
            folder: folderName,
            path: indexPath
        };
    } catch (error) {
        console.warn(`Error fetching project ${folderName}:`, error);
        const fallbackName = formatFolderName(folderName);
        return {
            day: dayNumber,
            name: fallbackName,
            folder: folderName,
            path: `${PROJECTS_BASE_PATH}${folderName}/index.html`
        };
    }
}

async function loadAllProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    try {
        const projectPromises = PROJECT_FOLDERS.map((folder, index) => 
            fetchProjectInfo(folder, index + 1)
        );
        
        allProjects = await Promise.all(projectPromises);
        filteredProjects = [...allProjects];
        renderProjects(filteredProjects);
        updateProjectCount(filteredProjects.length, allProjects.length);
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `<div class="loading-state"><p style="color: #ef4444;">❌ Error loading projects. Please refresh the page.</p></div>`;
    }
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    const noResults = document.getElementById('noResults');
    
    if (projects.length === 0) {
        projectsGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    projectsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card">
            <div class="card-content">
                <span class="card-day">Day ${project.day}</span>
                <h3 class="card-title">${project.name}</h3>
                <a href="${project.path}" class="card-button" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.name} project">Open Project →</a>
            </div>
        </article>
    `).join('');
}

function updateProjectCount(showing, total) {
    const countElement = document.getElementById('projectCount');
    if (showing === total) {
        countElement.textContent = `Showing all ${total} projects`;
    } else {
        countElement.textContent = `Showing ${showing} of ${total} projects`;
    }
}

function filterProjects(searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) {
        filteredProjects = [...allProjects];
    } else {
        filteredProjects = allProjects.filter(project => {
            const searchableText = `${project.name} ${project.folder} day ${project.day} ${project.day}`.toLowerCase();
            return searchableText.includes(query);
        });
    }
    
    renderProjects(filteredProjects);
    updateProjectCount(filteredProjects.length, allProjects.length);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllProjects();
    
    const searchInput = document.getElementById('searchInput');
    const debouncedFilter = debounce((query) => filterProjects(query), 300);
    
    searchInput.addEventListener('input', (e) => {
        debouncedFilter(e.target.value);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterProjects('');
        }
    });
});
