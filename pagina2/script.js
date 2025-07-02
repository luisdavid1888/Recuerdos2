const memories = [
    {
        photo: "familia.jpg",
        text: "Les presento a mi familia, quienes son el corazón de mi vida. Cada uno de ellos aporta amor y alegría a mis días."
    },
    {
        photo: "logro.jpg",
        text: "Este es un logro que atesoro profundamente. Representa el esfuerzo y la dedicación que he puesto en alcanzar mis metas."
    },
    {
        photo: "aniversario.jpg",
        text: "Celebrando un aniversario especial con mi pareja. Cada año juntos es un regalo que valoro inmensamente."
    },
    {
        photo: "hijos.jpg",
        text: "Mis hijos son mi mayor alegría. Cada momento con ellos es un tesoro que guardo en mi corazón."
    },
    {
        photo: "baile.jpg",
        text: "Un momento especial de baile. La música y el movimiento nos unen en una conexión única."
    },
    {
        // Galería especial
        gallery: [
            { type: "image", src: "boda.jpg", caption: "Foto de mi boda", text: "Foto de mi boda un día especial" },
            { type: "image", src: "hijo.jpg", caption: "Mi hijo", text: "El mejor momento de mi vida" },
            { type: "video", src: "galeria4.mp4", caption: "Video especial", text: "Texto para el video" }
        ],
        text: "Galería de recuerdos: explora las fotos y videos especiales."
    }
];

function showMemory(index) {
    const memory = memories[index];
    // Si es galería
    if (memory.gallery) {
        showGallery(memory.gallery, memory.text);
    } else {
        document.getElementById('memory-detail').innerHTML = `
            <div class="memory-content">
                <img src="${memory.photo}" alt="Foto recuerdo" class="memory-photo">
                <div class="memory-text">${memory.text}</div>
            </div>
        `;
    }
    document.getElementById('memory-modal').style.display = 'flex';
}

function showGallery(gallery, text) {
    let current = 0;
    renderGallery();

    function renderGallery() {
        const item = gallery[current];
        let mediaHtml = "";
        if (item.type === "image") {
            mediaHtml = `<img src="${item.src}" alt="Galería" class="memory-photo">`;
        } else if (item.type === "video") {
            mediaHtml = `<video src="${item.src}" controls class="memory-photo"></video>`;
        }
        document.getElementById('memory-detail').innerHTML = `
            <div class="memory-content gallery-layout">
                <button class="gallery-arrow left" ${current === 0 ? "disabled" : ""}>&#8592;</button>
                <div class="gallery-media">
                    ${mediaHtml}
                    <div class="gallery-caption">${item.caption || ""}</div>
                    <div class="memory-text">${item.text || text}</div>
                </div>
                <button class="gallery-arrow right" ${current === gallery.length - 1 ? "disabled" : ""}>&#8594;</button>
            </div>
        `;

        // Asignar eventos a las flechas
        document.querySelector('.gallery-arrow.left').onclick = () => {
            if (current > 0) {
                current--;
                renderGallery();
            }
        };
        document.querySelector('.gallery-arrow.right').onclick = () => {
            if (current < gallery.length - 1) {
                current++;
                renderGallery();
            }
        };
    }
}

function closeMemory() {
    document.getElementById('memory-modal').style.display = 'none';
}

// Animación al aparecer
const cards = document.querySelectorAll('.memory-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));
