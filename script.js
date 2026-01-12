document.addEventListener("DOMContentLoaded", () => {
  // Планеталар
  const planets = [
    { id: 'mercury', name: 'Меркурий', img: 'assets/mercury.png', projectId: 'p1' },
    { id: 'venus',   name: 'Шолпан',   img: 'assets/venus.png',   projectId: 'p2' },
    { id: 'earth',   name: 'Жер',      img: 'assets/earth.png',   projectId: 'p3' },
    { id: 'mars',    name: 'Марс',     img: 'assets/mars.png',    projectId: 'p4' },
  ];

  // Жобалар
  const projects = [
    { id: 'p1', title: 'Фронтенд — UI Kit', category: 'frontend', desc: 'Компоненттер кітапханасы, адаптивті дизайн.' },
    { id: 'p2', title: 'Дизайн — Брендинг', category: 'design',   desc: 'Логотип, түстер палитрасы, гайдлайн.' },
    { id: 'p3', title: 'Фронтенд — SPA',    category: 'frontend', desc: 'Маршрутизация, күйді басқару, API.' },
    { id: 'p4', title: 'Ойындар — Mini Game', category: 'games',  desc: 'Canvas, анимациялар, физика.' },
  ];

  const track = document.getElementById('carouselTrack');
  const cards = document.getElementById('projectCards');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  // Карусель
  function renderPlanets() {
    track.innerHTML = '';
    planets.forEach(p => {
      const item = document.createElement('button');
      item.className = 'planet';
      item.innerHTML = `<img src="${p.img}" alt="${p.name}" /><div>${p.name}</div>`;
      item.addEventListener('click', () => openProjectModal(p.projectId));
      track.appendChild(item);
    });
    // Бесконечная прокрутка
    let offset = 0;
    function tick() {
      offset += 0.3;
      track.scrollLeft = offset;
      if (offset >= track.scrollWidth / 2) offset = 0;
      requestAnimationFrame(tick);
    }
    tick();
  }

  // Карточки
  function renderCards(list) {
    cards.innerHTML = '';
    list.forEach(pr => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${pr.title}</h3>
        <p>${pr.desc}</p>
        <button data-id="${pr.id}">Толығырақ</button>
      `;
      card.querySelector('button').addEventListener('click', () => openProjectModal(pr.id));
      cards.appendChild(card);
    });
  }

  // Модалка
  function openProjectModal(id) {
    const pr = projects.find(p => p.id === id);
    if (!pr) return;
    modalTitle.textContent = pr.title;
    modalDesc.textContent = pr.desc;
    if (document.startViewTransition) {
      document.startViewTransition(() => modal.showModal());
    } else {
      modal.showModal();
    }
  }
  modalClose.addEventListener('click', () => modal.close());

  // Фильтр
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      const filtered = cat === 'all' ? projects : projects.filter(p => p.category === cat);
      renderCards(filtered);
    });
  });

  // Параллакс эффект
  document.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.stars');
    if (!stars) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    stars.style.backgroundPosition = `${x}px ${y}px`;
  });

  // Навигация секций
