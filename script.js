// Login + Carrusel + Hoteles + Reserva/Pago (limpio, sin juegos ni avatar)

const PLACES = [
  { title: 'Cartagena, Colombia', img: 'images/paises/cartagena-colombia.jpg', desc: 'Destino Caribeño con historia colonial, playas y vida nocturna vibrante.' },
  { title: 'París, Francia', img: 'images/paises/paris-francia.jpg', desc: 'La ciudad del amor, famosa por la Torre Eiffel, museos y su gastronomía.' },
  { title: 'Madrid, España', img: 'images/paises/madrid-españa.jpg', desc: 'Capital española con arte, plazas y vida cultural de primer nivel.' },
  { title: 'Bangkok, Tailandia', img: 'images/paises/bangkok-tailandia.jpg', desc: 'Ciudad de templos, mercados flotantes y gastronomía callejera.' },
  { title: 'Londres, Reino Unido', img: 'images/paises/londres-reino_unido.jpg', desc: 'Metrópoli histórica con iconos como el Big Ben, museos y teatros.' },
  { title: 'Istanbul, Turquía', img: 'images/paises/estambul-turquia.jpg', desc: 'Puente entre Asia y Europa, con bazares, palacios y mezquitas majestuosas.' }
];

// DOM
const loadingView = document.getElementById('loading-view');
const appView = document.getElementById('app-view');
const loginModal = document.getElementById('login-modal');
const closeLoginBtn = document.getElementById('close-login');
const loginForm = document.getElementById('login-form');
const loginHeaderBtn = document.getElementById('login-header-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting = document.getElementById('greeting');
const year = document.getElementById('year');
const authMessage = document.getElementById('auth-message');
const brandHome = document.getElementById('brand-home');
const tabLoginBtn = document.getElementById('tab-login');
const tabRegisterBtn = document.getElementById('tab-register');
const showRegisterBtn = document.getElementById('show-register');
const showForgotBtn = document.getElementById('show-forgot');
const showLoginBtn = document.getElementById('show-login');
const showLogin2Btn = document.getElementById('show-login-2');
const registerForm = document.getElementById('register-form');
const forgotForm = document.getElementById('forgot-form');

const slidesEl = document.getElementById('slides');
const descriptionEl = document.getElementById('description');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
let autoplayId = null;

// Initialize app: show loading page, then app after 2 seconds
function initializeApp(){
  if(loadingView) loadingView.classList.remove('hidden');
  if(appView) appView.classList.add('hidden');
  
  setTimeout(()=>{
    if(loadingView) loadingView.classList.add('hidden');
    if(appView) appView.classList.remove('hidden');
    startAutoplay();
  }, 2000);
}

// Handle login modal
function openLoginModal(){
  if(loginModal) loginModal.classList.remove('hidden');
  showLoginSection();
}

function closeLoginModal(){
  if(loginModal) loginModal.classList.add('hidden');
  setAuthMessage('');
}

function setAuthMessage(message, type='info'){
  if(!authMessage) return;
  authMessage.textContent = message || '';
  authMessage.style.color = type === 'error' ? '#c92d39' : type === 'success' ? '#0b7b3f' : 'var(--brand)';
}

function showAuthSection(section){
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');
  const forgotSection = document.getElementById('forgot-section');
  if(loginSection) loginSection.classList.toggle('hidden', section !== 'login');
  if(registerSection) registerSection.classList.toggle('hidden', section !== 'register');
  if(forgotSection) forgotSection.classList.toggle('hidden', section !== 'forgot');
  if(tabLoginBtn) tabLoginBtn.classList.toggle('active', section === 'login');
  if(tabRegisterBtn) tabRegisterBtn.classList.toggle('active', section === 'register');
}

function showLoginSection(){
  showAuthSection('login');
  setAuthMessage('');
}

function showRegisterSection(){
  showAuthSection('register');
  setAuthMessage('');
}

function showForgotSection(){
  showAuthSection('forgot');
  setAuthMessage('');
}

if(closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
if(loginHeaderBtn) loginHeaderBtn.addEventListener('click', openLoginModal);
if(tabLoginBtn) tabLoginBtn.addEventListener('click', showLoginSection);
if(tabRegisterBtn) tabRegisterBtn.addEventListener('click', showRegisterSection);
if(showRegisterBtn) showRegisterBtn.addEventListener('click', showRegisterSection);
if(showForgotBtn) showForgotBtn.addEventListener('click', showForgotSection);
if(showLoginBtn) showLoginBtn.addEventListener('click', showLoginSection);
if(showLogin2Btn) showLogin2Btn.addEventListener('click', showLoginSection);

// Close modal when clicking outside
if(loginModal){
  loginModal.addEventListener('click', (e)=>{
    if(e.target === loginModal) closeLoginModal();
  });
}

function renderSlides(){
  if(!slidesEl) return;
  slidesEl.innerHTML = '';
  PLACES.forEach(p => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.style.backgroundImage = `url('${p.img}')`;
    div.innerHTML = `<div class="caption"><strong>${p.title}</strong></div>`;
    slidesEl.appendChild(div);
  });
}

function showSlide(idx){
  const n = PLACES.length;
  currentIndex = ((idx % n) + n) % n;
  if(slidesEl) slidesEl.style.transform = `translateX(${-currentIndex * 100}%)`;
  const p = PLACES[currentIndex];
  if(descriptionEl) descriptionEl.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
}

function startAutoplay(){
  stopAutoplay();
  autoplayId = setInterval(()=> showSlide(currentIndex + 1), 4000);
}

function stopAutoplay(){
  if(autoplayId) clearInterval(autoplayId);
  autoplayId = null;
}

function setupNav(){
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = a.dataset.section;
      if(!target) return;
      showSection(target);
    });

    a.addEventListener('mouseenter', ()=>{
      if(a.dataset.section) hoverTopbarTheme(a.dataset.section);
    });
    a.addEventListener('mouseleave', ()=>{
      const active = document.querySelector('.nav-link.active');
      if(active && active.dataset.section) setTopbarTheme(active.dataset.section);
      else setTopbarTheme('home-view');
    });
  });
}

function showSection(target){
  document.querySelectorAll('.app-section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const selected = document.querySelector(`.nav-link[data-section="${target}"]`);
  if(selected) selected.classList.add('active');
  const el = document.getElementById(target);
  if(el) el.classList.remove('hidden');
  setTopbarTheme(target);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if(target === 'transport-view' && typeof renderTransportModels === 'function') renderTransportModels();
  if(target === 'flights-view' && typeof renderAirlines === 'function') renderAirlines();
}

function setTopbarTheme(section){
  const topbar = document.querySelector('.topbar');
  if(!topbar) return;
  topbar.classList.remove('topbar-theme-home','topbar-theme-hotels','topbar-theme-transport','topbar-theme-flights','topbar-theme-pets');
  if(section === 'hotels-view') topbar.classList.add('topbar-theme-hotels');
  else if(section === 'transport-view') topbar.classList.add('topbar-theme-transport');
  else if(section === 'flights-view') topbar.classList.add('topbar-theme-flights');
  else if(section === 'pets-view') topbar.classList.add('topbar-theme-pets');
  else topbar.classList.add('topbar-theme-home');
}

function hoverTopbarTheme(section){
  const topbar = document.querySelector('.topbar');
  if(!topbar) return;
  if(section === 'hotels-view') topbar.style.background = 'linear-gradient(90deg, #1870b1, #4db0ed)';
  else if(section === 'transport-view') topbar.style.background = 'linear-gradient(90deg, #0c7b6f, #64dfc6)';
  else if(section === 'flights-view') topbar.style.background = 'linear-gradient(90deg, #8f43e5, #9ad7ff)';
  else if(section === 'pets-view') topbar.style.background = 'linear-gradient(90deg, #e7517b, #ffcad4)';
  else topbar.style.background = 'linear-gradient(90deg, #0b76ff, #70d1ff)';
  topbar.style.boxShadow = '0 20px 60px rgba(0,0,0,0.18)';
  setTimeout(()=>{
    const active = document.querySelector('.nav-link.active');
    if(active && active.dataset.section){
      topbar.style.background = '';
      setTopbarTheme(active.dataset.section);
    }
  }, 300);
}

// --- Hotels ---
const HOTEL_DATA = {
  'Colombia': {
    img: 'paises/colombia/colombia-bogota.jpg',
    cities: {
        'Bogotá': [
          { name: 'Grand Hyatt Bogotá', imgs: ['images/hoteles/grandhyatt-hotel1.jpg','images/hoteles/grand-hyatt-hotel2.jpg','images/hoteles/grand-hyatt-hotel3.jpg'], desc: 'Hotel cinco estrellas en la zona financiera, con spa y vistas urbanas.', price:210, reviews:[{user:'Laura',rating:5,text:'Excelente servicio y ubicación.'},{user:'Carlos',rating:4,text:'Habitaciones cómodas y desayuno delicioso.'}] },
          { name: 'Hotel de la Opera', imgs: ['images/hoteles/hotel-de-la-opera-bogota1.jpg','images/hoteles/hotel-de-la-opera-bogota2.jpg','images/hoteles/hotel-de-la-opera-bogota3.jpg'], desc: 'Estilo clásico en el centro histórico con acceso a museos y restaurantes.', price:150, reviews:[{user:'Ana',rating:5,text:'Hermosa decoración y atención amable.'},{user:'Juan',rating:4,text:'Muy bien ubicado para turismo cultural.'}] }
        ],
      'Cartagena': [
        { name: 'Sofitel Santa Clara', img: 'paises/colombia/departamentos/cartagena/hoteles/sofitel-santa-clara.jpg', desc: 'Resort colonial dentro de la ciudad amurallada con piscinas y gastronomía.', price:280, reviews:[{user:'Mariana',rating:5,text:'Un lugar perfecto para descansar junto al mar.'},{user:'Diego',rating:4,text:'Servicio impecable y ambiente romántico.'}] },
        { name: 'Hotel Charleston Santa Teresa', img: 'paises/colombia/departamentos/cartagena/hoteles/charleston-santa-teresa.jpg', desc: 'Hotel boutique de lujo con jardines y acceso directo al casco antiguo.', price:300, reviews:[{user:'Sofia',rating:5,text:'Experiencia inolvidable en la ciudad vieja.'},{user:'Mateo',rating:4,text:'Instalaciones excelentes y muy buen desayuno.'}] }
      ]
    }
  },
  'Francia': {
    img: 'paises/francia/francia-paris.jpg',
    cities: {
      'París': [
        { name: 'Le Meurice', img: 'paises/francia/departamentos/paris/hoteles/le-meurice.jpg', desc: 'Palacio parisino con servicio Michelin y cercanía al Louvre.', price:450, reviews:[{user:'Claire',rating:5,text:'Lujo francés en su máxima expresión.'},{user:'Pierre',rating:4,text:'Ubicación fantástica y atención elegante.'}] },
        { name: 'Hôtel Plaza Athénée', img: 'paises/francia/departamentos/paris/hoteles/plaza-athenee.jpg', desc: 'Hotel de alta costura en la Avenida Montaigne con vistas a la Torre Eiffel.', price:520, reviews:[{user:'Sophie',rating:5,text:'Hermoso hotel para una estancia de ensueño.'},{user:'Marc',rating:4,text:'Decoración impecable y servicios exclusivos.'}] }
      ],
      'Niza': [
        { name: 'Hotel Negresco', img: 'paises/francia/departamentos/niza/hoteles/hotel-negresco.jpg', desc: 'Icono frente al mar Mediterráneo con galería de arte privada.', price:320, reviews:[{user:'Claire',rating:5,text:'Un clásico lleno de encanto.'},{user:'Loic',rating:4,text:'Vistas geniales y ubicación perfecta.'}] }
      ]
    }
  },
  'España': {
    img: 'paises/espana/espana-madrid.jpg',
    cities: {
      'Madrid': [
        { name: 'Hotel Ritz Madrid', img: 'paises/espana/departamentos/madrid/hoteles/hotel-ritz-madrid.jpg', desc: 'Hotel de lujo con jardines históricos junto al Parque del Retiro.', price:420, reviews:[{user:'Lucía',rating:5,text:'Servicio impecable y elegancia clásica.'},{user:'Pablo',rating:4,text:'Ubicación ideal para museos y compras.'}] },
        { name: 'NH Collection Madrid', img: 'paises/espana/departamentos/madrid/hoteles/nh-collection-madrid.jpg', desc: 'Hotel moderno con excelentes instalaciones para ocio y trabajo.', price:200, reviews:[{user:'Marta',rating:4,text:'Muy cómodo y céntrico.'},{user:'Andrés',rating:4,text:'Buen precio y buena calidad.'}] }
      ],
      'Barcelona': [
        { name: 'W Barcelona', img: 'paises/espana/departamentos/barcelona/hoteles/w-barcelona.jpg', desc: 'Hotel icónico junto al mar con diseño contemporáneo.', price:330, reviews:[{user:'Nuria',rating:5,text:'Ideal para una escapada urbana y playa.'},{user:'Rafael',rating:4,text:'Vista espectacular al Mediterráneo.'}] }
      ]
    }
  },
  'Estados Unidos': {
    img: 'paises/eeuu/eeuu-nyc.jpg',
    cities: {
      'Nueva York': [
        { name: 'The Plaza', img: 'paises/eeuu/departamentos/nueva-york/hoteles/the-plaza.jpg', desc: 'Clásico hotel de lujo frente a Central Park.', price:650, reviews:[{user:'John',rating:5,text:'Un ícono con servicio excepcional.'},{user:'Emma',rating:4,text:'Perfecto para una experiencia neoyorquina.'}] },
        { name: 'The Standard', img: 'paises/eeuu/departamentos/nueva-york/hoteles/the-standard.jpg', desc: 'Hotel moderno con rooftop y ambiente creativo en el Meatpacking District.', price:280, reviews:[{user:'Mia',rating:4,text:'Buena energía y ubicacion.'},{user:'Oliver',rating:4,text:'Ambiente moderno y cómodo.'}] }
      ],
      'Miami': [
        { name: 'Fontainebleau Miami Beach', img: 'paises/eeuu/departamentos/miami/hoteles/fontainebleau-miami.jpg', desc: 'Resort frente al mar con piscinas y vida nocturna.', price:400, reviews:[{user:'Isabel',rating:5,text:'Gran resort con todo incluido.'},{user:'Diego',rating:4,text:'Perfecto para una estancia de playa.'}] }
      ]
    }
  },
  'China': {
    img: 'paises/china/china-beijing.jpg',
    cities: {
      'Beijing': [
        { name: 'Aman Summer Palace', img: 'paises/china/departamentos/beijing/hoteles/aman-summer-palace.jpg', desc: 'Retiro de lujo junto al Palacio de Verano.', price:520, reviews:[{user:'Li',rating:5,text:'Relajante y sofisticado.'},{user:'Wang',rating:4,text:'Hermoso entorno histórico.'}] }
      ],
      'Shanghái': [
        { name: 'The Peninsula Shanghai', img: 'paises/china/departamentos/shanghai/hoteles/the-peninsula-shanghai.jpg', desc: 'Lujo frente al Bund con servicio de primera clase.', price:480, reviews:[{user:'Mei',rating:5,text:'Impresionante atención y vistas.'},{user:'Chen',rating:4,text:'Excelente ubicación.'}] }
      ]
    }
  },
  'Italia': {
    img: 'paises/italia/italia-roma.jpg',
    cities: {
      'Roma': [
        { name: 'Hotel Hassler', img: 'paises/italia/departamentos/roma/hoteles/hotel-hassler.jpg', desc: 'Hotel legendario junto a la Plaza de España.', price:450, reviews:[{user:'Giulia',rating:5,text:'Clásico y elegante.'},{user:'Marco',rating:4,text:'Excelentes vistas de la ciudad.'}] }
      ],
      'Venecia': [
        { name: 'Belmond Hotel Cipriani', img: 'paises/italia/departamentos/venecia/hoteles/belmond-cipriani.jpg', desc: 'Lujo veneciano en la isla de Giudecca.', price:550, reviews:[{user:'Luca',rating:5,text:'Maravilloso servicio y ubicación.'},{user:'Francesca',rating:4,text:'Romántico y elegante.'}] }
      ]
    }
  },
  'México': {
    img: 'paises/mexico/mexico-cdmx.jpg',
    cities: {
      'Ciudad de México': [
        { name: 'Four Seasons Ciudad de México', img: 'paises/mexico/departamentos/ciudad-de-mexico/hoteles/four-seasons-cdmx.jpg', desc: 'Hotel de lujo con jardín y spa en Polanco.', price:360, reviews:[{user:'Alejandra',rating:5,text:'Servicio de primera y excelente ubicación.'},{user:'Luis',rating:4,text:'Muy cómodo y elegante.'}] }
      ],
      'Cancún': [
        { name: 'Nizuc Resort & Spa', img: 'paises/mexico/departamentos/cancun/hoteles/nizuc-resort.jpg', desc: 'Resort frente al mar con villas privadas y spa.', price:410, reviews:[{user:'Marisol',rating:5,text:'Exclusivo y relajante.'},{user:'Diego',rating:4,text:'Una experiencia maravillosa en la playa.'}] }
      ]
    }
  },
  'Turquía': {
    img: 'paises/turquia/turquia-estambul.jpg',
    cities: {
      'Estambul': [
        { name: 'Ciragan Palace Kempinski', img: 'paises/turquia/departamentos/estambul/hoteles/ciragan-palace.jpg', desc: 'Palacio otomano de lujo a orillas del Bósforo.', price:470, reviews:[{user:'Selin',rating:5,text:'Sublime y lleno de historia.'},{user:'Ahmet',rating:4,text:'Impresionantes vistas y atención.'}] }
      ],
      'Antalya': [
        { name: 'Maxx Royal Belek', img: 'paises/turquia/departamentos/antalya/hoteles/maxx-royal.jpg', desc: 'Resort cinco estrellas con campos de golf y playas privadas.', price:430, reviews:[{user:'Aylin',rating:5,text:'Ideal para unas vacaciones de lujo.'},{user:'Kerem',rating:4,text:'Instalaciones excelentes y buen servicio.'}] }
      ]
    }
  },
  'Alemania': {
    img: 'paises/alemania/alemania-berlin.jpg',
    cities: {
      'Berlín': [
        { name: 'Hotel Adlon Kempinski', img: 'paises/alemania/departamentos/berlin/hoteles/hotel-adlon.jpg', desc: 'Clásico hotel de lujo frente a la Puerta de Brandeburgo.', price:420, reviews:[{user:'Anna',rating:5,text:'Todo perfecto y muy bien situado.'},{user:'Thomas',rating:4,text:'Experiencia de lujo en el centro.'}] }
      ],
      'Múnich': [
        { name: 'Hotel Bayerischer Hof', img: 'paises/alemania/departamentos/munich/hoteles/bayerischer-hof.jpg', desc: 'Hotel icónico con spa y vistas a la ciudad bávara.', price:390, reviews:[{user:'Sabine',rating:5,text:'Encantador y lleno de estilo.'},{user:'Stefan',rating:4,text:'Excelente ubicación y servicio.'}] }
      ]
    }
  },
  'Tailandia': {
    img: 'paises/tailandia/tailandia-bangkok.jpg',
    cities: {
      'Bangkok': [
        { name: 'Mandarin Oriental Bangkok', img: 'paises/tailandia/departamentos/bangkok/hoteles/mandarin-oriental.jpg', desc: 'Hotel histórico en el río Chao Phraya con jardines exóticos.', price:470, reviews:[{user:'Nathida',rating:5,text:'Una experiencia de lujo tradicional.'},{user:'Krit',rating:4,text:'Perfecto para explorar la ciudad.'}] }
      ],
      'Phuket': [
        { name: 'Amanpuri Phuket', img: 'paises/tailandia/departamentos/phuket/hoteles/amanpuri.jpg', desc: 'Resort exclusivo en la playa con villas privadas.', price:520, reviews:[{user:'Chara',rating:5,text:'Impresionante entorno y tranquilidad total.'},{user:'Pong',rating:4,text:'Servicio impecable y gran privacidad.'}] }
      ]
    }
  },
  'Reino Unido': {
    img: 'paises/reinounido/reinounido-londres.jpg',
    cities: {
      'Londres': [
        { name: 'The Savoy', img: 'paises/reinounido/departamentos/londres/hoteles/the-savoy.jpg', desc: 'Clásico hotel londinense junto al río Támesis.', price:540, reviews:[{user:'Olivia',rating:5,text:'Un icono en el corazón de Londres.'},{user:'Henry',rating:4,text:'Servicio de primer nivel y ubicación fantástica.'}] }
      ],
      'Edimburgo': [
        { name: 'The Balmoral', img: 'paises/reinounido/departamentos/edimburgo/hoteles/the-balmoral.jpg', desc: 'Hotel legendario junto al castillo de Edimburgo.', price:430, reviews:[{user:'Fiona',rating:5,text:'Encantador y elegante en plena ciudad antigua.'},{user:'Ian',rating:4,text:'Excelente para conocer la ciudad histórica.'}] }
      ]
    }
  }
};

const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');
const hotelGallery = document.getElementById('hotel-gallery');
const hotelList = document.getElementById('hotel-list');
const hotelDetails = document.getElementById('hotel-details');
const hotelSearch = document.getElementById('hotel-search');
const hotelSearchBtn = document.getElementById('hotel-search-btn');

// Background images for hotel hero (loaded from images/hoteles)
const HOTEL_BGS = [
  'images/hoteles/isla-clara-antioquia.jpg',
  'images/hoteles/isla-clara-antioquia2.jpg'
];
let _hotelBgIndex = 0;
let _hotelBgIntervalId = null;

function rotateHotelBackground(){
  const el = document.getElementById('hotel-hero');
  if(!el || HOTEL_BGS.length === 0) return;
  _hotelBgIndex = (_hotelBgIndex + 1) % HOTEL_BGS.length;
  const next = HOTEL_BGS[_hotelBgIndex];
  el.style.backgroundImage = `url('${next}')`;
}

function startHotelBackgroundRotation(intervalMs = 5000){
  const el = document.getElementById('hotel-hero');
  if(!el) return;
  // set initial image
  el.style.backgroundImage = `url('${HOTEL_BGS[_hotelBgIndex]}')`;
  if(_hotelBgIntervalId) clearInterval(_hotelBgIntervalId);
  _hotelBgIntervalId = setInterval(rotateHotelBackground, intervalMs);
}

function stopHotelBackgroundRotation(){ if(_hotelBgIntervalId) clearInterval(_hotelBgIntervalId); _hotelBgIntervalId = null; }

const COUNTRIES = ['Colombia','Francia','España','Estados Unidos','China','Italia','México','Turquía','Alemania','Tailandia','Reino Unido'];

function getCountryCities(country){
  const data = HOTEL_DATA[country];
  return data && data.cities ? Object.keys(data.cities) : [];
}

function populateCountries(){
  if(!countrySelect) return;
  countrySelect.innerHTML = '';
  const defaultCountry = 'Colombia';
  COUNTRIES.forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
    if(c === defaultCountry) opt.selected = true;
    countrySelect.appendChild(opt);
  });
  countrySelect.value = defaultCountry;
  populateCities(defaultCountry);
}

function populateCities(country){
  if(!citySelect) return;
  const cities = getCountryCities(country);
  citySelect.innerHTML = '';
  cities.forEach(city => {
    const opt = document.createElement('option'); opt.value = city; opt.textContent = city;
    citySelect.appendChild(opt);
  });
  if(cities.length > 0) citySelect.value = cities[0];
}

function renderHotelsFor(country, city, filter=''){
  const data = HOTEL_DATA[country];
  let hotelListData = [];
  if(data && data.cities && data.cities[city]){
    hotelListData = data.cities[city];
  } else if(data && data.cities){
    const defaultCity = Object.keys(data.cities)[0];
    hotelListData = data.cities[defaultCity] || [];
    if(citySelect) citySelect.value = defaultCity;
    city = defaultCity;
  }
  const filtered = hotelListData.filter(h => h.name.toLowerCase().includes(filter.toLowerCase()));

  if(hotelGallery) hotelGallery.innerHTML = '';
  filtered.forEach(h => {
    const previewImg = Array.isArray(h.imgs) && h.imgs.length ? h.imgs[0] : (h.img || '');
    const div = document.createElement('div'); div.className = 'thumb'; div.style.backgroundImage = `url('${previewImg}')`; div.title = h.name;
    div.addEventListener('click', ()=> showHotelDetail(h));
    if(hotelGallery) hotelGallery.appendChild(div);
  });

  if(hotelList) hotelList.innerHTML = '';
  filtered.forEach(h => {
    const card = document.createElement('div'); card.className = 'hotel-card';
    const previewImg = Array.isArray(h.imgs) && h.imgs.length ? h.imgs[0] : (h.img || '');
    const img = document.createElement('img'); img.src = previewImg; img.alt = h.name;
    const meta = document.createElement('div'); meta.className = 'meta';
    const avg = h.reviews && h.reviews.length ? (h.reviews.reduce((s,r)=>s+r.rating,0)/h.reviews.length).toFixed(1) : '—';
    meta.innerHTML = `<h4>${h.name}</h4><p>${h.desc}</p><p class="rating">⭐ ${avg} (${h.reviews ? h.reviews.length : 0} reseñas)</p>`;
    const actions = document.createElement('div'); actions.className = 'actions';
    const btn = document.createElement('button'); btn.textContent = 'Ver'; btn.addEventListener('click', ()=> showHotelDetail(h));
    actions.appendChild(btn);
    card.appendChild(img); card.appendChild(meta); card.appendChild(actions);
    hotelList.appendChild(card);
  });

  if(filtered.length === 0){
    if(hotelList) hotelList.innerHTML = '<p>No se encontraron hoteles para esta búsqueda.</p>';
    if(hotelGallery) hotelGallery.innerHTML = '';
    if(hotelDetails) hotelDetails.innerHTML = '';
  }
}

// --- Transporte: modelos y alquiler ---
let selectedTransportModelId = null;
const TRANSPORT_MODELS = [
  { id: 'car-compact', type: 'Auto', model: 'Compact Plus', img: 'images/transporte/compact-plus.jpg', pricePerDay: 25 },
  { id: 'car-sedan', type: 'Auto', model: 'Sedan Comfort', img: 'images/transporte/sedan-comfort.jpg', pricePerDay: 40 },
  { id: 'car-suv', type: 'Auto', model: 'SUV Traveler', img: 'images/transporte/SUV-traveler.jpg', pricePerDay: 65 },
  { id: 'moto-125', type: 'Moto', model: 'Moto 125cc', img: 'images/transporte/motos-123cc.jpg', pricePerDay: 15 },
  { id: 'moto-500', type: 'Moto', model: 'Moto 500cc', img: 'images/transporte/moto-500cc.jpg', pricePerDay: 28 }
];

function renderTransportModels(){
  const grid = document.getElementById('transport-grid');
  if(!grid) return;
  grid.innerHTML = '';
  TRANSPORT_MODELS.forEach(m => {
    const card = document.createElement('div'); card.className = 'transport-card';
    card.innerHTML = `
      <img src="${m.img}" alt="${m.model}" />
      <div class="t-meta"><strong>${m.model}</strong><div class="t-type">${m.type}</div><div class="t-price">$${m.pricePerDay}/día</div></div>
      <div style="margin-top:8px;display:flex;gap:8px;">
        <button class="secondary select-btn" data-id="${m.id}">Seleccionar</button>
        <button class="primary rent-btn" data-id="${m.id}">Alquilar</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // attach listeners
  grid.querySelectorAll('.select-btn').forEach(b => b.addEventListener('click', (ev)=>{
    const id = b.dataset.id; selectTransportModel(id);
  }));
  grid.querySelectorAll('.rent-btn').forEach(b => b.addEventListener('click', ()=>{
    const id = b.dataset.id; openRentalForm(id);
  }));
}

function openRentalForm(modelId){
  const model = TRANSPORT_MODELS.find(m=>m.id===modelId);
  if(!model) return;
  const rentalArea = document.getElementById('rental-area');
  if(!rentalArea) return;
  document.getElementById('renter-model').value = `${model.model} (${model.type})`;
  document.getElementById('rental-model-title').textContent = `Alquilar: ${model.model}`;
  rentalArea.style.display = 'block';
  rentalArea.scrollIntoView({ behavior: 'smooth' });
  // attach submit listener once
  const form = document.getElementById('rental-form');
  if(form && !form.dataset.bound){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('renter-name').value.trim();
      const modelTxt = document.getElementById('renter-model').value;
      const days = parseInt(document.getElementById('rental-days').value,10) || 1;
      const start = document.getElementById('rental-start').value;
      const payment = document.getElementById('rental-payment').value;
      if(!name || !start){ document.getElementById('rental-result').textContent = 'Completa los campos requeridos.'; return; }
      // extract model id by matching model text
      const selected = TRANSPORT_MODELS.find(m => `${m.model} (${m.type})` === modelTxt) || TRANSPORT_MODELS[0];
      const total = selected.pricePerDay * days;
      document.getElementById('rental-result').innerHTML = `<div>Reserva confirmada para <strong>${name}</strong>: ${selected.model} x ${days} días. Total: <strong>$${total}</strong>. Pago: ${payment}.</div>`;
    });
    form.dataset.bound = '1';
  }
}

function selectTransportModel(modelId){
  // deselect previous
  if(selectedTransportModelId){
    const prev = document.querySelector(`.transport-card .select-btn[data-id="${selectedTransportModelId}"]`);
    if(prev && prev.closest('.transport-card')) prev.closest('.transport-card').classList.remove('selected');
  }
  selectedTransportModelId = modelId;
  const btn = document.querySelector(`.select-btn[data-id="${modelId}"]`);
  if(btn && btn.closest('.transport-card')) btn.closest('.transport-card').classList.add('selected');
  // prefill rental form and show it
  const model = TRANSPORT_MODELS.find(m=>m.id===modelId);
  if(model){
    const rentalArea = document.getElementById('rental-area');
    if(rentalArea){
      document.getElementById('renter-model').value = `${model.model} (${model.type})`;
      document.getElementById('rental-model-title').textContent = `Alquilar: ${model.model}`;
      rentalArea.style.display = 'block';
      rentalArea.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// --- Vuelos: aerolíneas, destinos y formulario ---
const AIRLINES = [
  { id: 'aeromexico', name: 'Aeroméxico', logo: 'images/aerolineas/aeromexico-logo.png', plane: 'images/aerolineas/aeromexico-avion.jpg', description: 'Vuela con estilo desde México hacia destinos internacionales.' },
  { id: 'air-canada', name: 'Air Canada', logo: 'images/aerolineas/air-canada-logo.png', plane: 'images/aerolineas/air-canada-avion.jpg', description: 'La aerolínea canadiense con conexiones globales y excelente servicio.' },
  { id: 'air-europa', name: 'Air Europa', logo: 'images/aerolineas/aire-europa-logo.png', plane: 'images/aerolineas/air-europa-avion.jpg', description: 'Rutas entre Europa y América con una flota moderna y cómoda.' },
  { id: 'americano', name: 'Americano Airlines', logo: 'images/aerolineas/americano-logo.png', plane: 'images/aerolineas/americano-avion.jpg', description: 'Vuelos ágiles para itinerarios dinámicos por todo el continente.' },
  { id: 'andes-air', name: 'Andes Air', logo: 'images/aerolineas/andes-air-logo.png', plane: 'images/aerolineas/andesair-helicoptero.jpg', description: 'Opciones flexibles con servicios regionales y exclusivos.' },
  { id: 'avianca', name: 'Avianca', logo: 'images/aerolineas/avianca-logo.png', plane: 'images/aerolineas/avianca-avion.png', description: 'La aerolínea latina que conecta a América con calidez y tradición.' },
  { id: 'copa-airlines', name: 'Copa Airlines', logo: 'images/aerolineas/copa-airlines.png', plane: 'images/aerolineas/copa-airlines.avion.jpg', description: 'Puerta de conexión entre América del Norte, Centro y Suramérica.' },
  { id: 'delta', name: 'Delta Airlines', logo: 'images/aerolineas/delta-airlines-logo.png', plane: 'images/aerolineas/delta-airlines-avion.jpg', description: 'Amplia red de vuelos globales con servicio premium y cómodo.' },
  { id: 'jetblue', name: 'JetBlue Airways', logo: 'images/aerolineas/jet-blue-airways-logo.png', plane: 'images/aerolineas/jet-blue-airways-avion.png', description: 'Experiencia moderna en cabina con entretenimiento y buen precio.' },
  { id: 'latam', name: 'LATAM Airlines', logo: 'images/aerolineas/latam-airlines-logo.png', plane: 'images/aerolineas/latam-airlines-avion.png', description: 'La mayor red de vuelos de Latinoamérica para tus destinos favoritos.' },
  { id: 'turkish', name: 'Turkish Airlines', logo: 'images/aerolineas/turkish-airlines-logo.png', plane: 'images/aerolineas/turkish-airlines-avion.png', description: 'Conexiones entre Europa, Asia y América con servicio de alta calidad.' },
  { id: 'united', name: 'United Airlines', logo: 'images/aerolineas/unido-logo.png', plane: 'images/aerolineas/unido-avion.jpeg', description: 'Alcance global y opciones de viaje para todos los pasajeros.' }
];

const FLIGHT_DESTINATIONS = ['Francia','Italia','EE. UU.','Japón','España','México','Argentina','Colombia','Chile'];

function showSelectedAirlinePreview(airline){
  const preview = document.getElementById('selected-airline-preview');
  if(!preview) return;
  preview.innerHTML = `
    <div class="selected-airline-preview-card">
      <div class="selected-airline-meta">
        <img class="selected-airline-logo" src="${airline.logo}" alt="Logo ${airline.name}" />
        <div>
          <strong>${airline.name}</strong>
          <p>${airline.description}</p>
        </div>
      </div>
      <img class="selected-airline-plane" src="${airline.plane}" alt="Avión ${airline.name}" />
    </div>
  `;
}

function renderAirlines(){
  const grid = document.getElementById('airlines-grid');
  const toSelect = document.getElementById('flight-to');
  const airlineSelect = document.getElementById('flight-airline');
  if(toSelect) { toSelect.innerHTML = ''; FLIGHT_DESTINATIONS.forEach(d=> { const o=document.createElement('option'); o.value=d; o.textContent=d; toSelect.appendChild(o); }); }
  if(airlineSelect) { airlineSelect.innerHTML = ''; AIRLINES.forEach(a=>{ const o=document.createElement('option'); o.value=a.id; o.textContent=a.name; airlineSelect.appendChild(o); }); }
  if(!grid) return;
  grid.innerHTML = '';
  AIRLINES.forEach(a => {
    const card = document.createElement('div'); card.className = 'airline-card';
    card.innerHTML = `
      <div class="airline-media">
        <img class="airline-logo" src="${a.logo}" alt="Logo ${a.name}" />
        <img class="airline-plane" src="${a.plane}" alt="Avión ${a.name}" />
      </div>
      <div class="airline-name">${a.name}</div>
      <div class="airline-desc">${a.description}</div>
      <button class="primary choose-air" data-id="${a.id}">Seleccionar</button>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('.choose-air').forEach(b => b.addEventListener('click', ()=>{
    const id = b.dataset.id;
    const airline = AIRLINES.find(x => x.id === id);
    const sel = document.getElementById('flight-airline'); if(sel) sel.value = id;
    if(airline) showSelectedAirlinePreview(airline);
    const formPanel = document.getElementById('flight-form-panel'); if(formPanel) formPanel.style.display = 'block';
    const panel = document.getElementById('flight-date'); if(panel) panel.scrollIntoView({ behavior: 'smooth' });
  }));
}

// Attach flight form handler: when ticket details are submitted show payment options
const flightForm = document.getElementById('flight-ticket-form');
if(flightForm){
  flightForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('flight-name').value.trim();
    const doc = document.getElementById('flight-doc').value.trim();
    const from = document.getElementById('flight-from').value.trim();
    const to = document.getElementById('flight-to').value;
    const airlineId = document.getElementById('flight-airline').value;
    const cabin = document.getElementById('flight-cabin').value;
    const date = document.getElementById('flight-date').value;
    const result = document.getElementById('flight-ticket-result');
    if(!name || !doc || !from || !to || !date){ if(result) result.textContent = 'Completa los campos requeridos.'; return; }
    // store temporary ticket data in a small object on window for payment step
    const ticket = { name, doc, from, to, airlineId, cabin, date };
    window._pendingFlightTicket = ticket;
    if(result) result.innerHTML = `Billete para <strong>${name}</strong> a ${to} con ${airlineId}. Procede al pago.`;
    // reveal payment panel
    const paymentPanel = document.getElementById('flight-payment'); if(paymentPanel) paymentPanel.style.display = 'block';
    const paymentArea = document.getElementById('flight-payment-area'); if(paymentArea) paymentArea.innerHTML = '';
    // attach payment method buttons
    document.querySelectorAll('.flight-pay-method').forEach(btn=> btn.addEventListener('click', ()=>{
      const method = btn.dataset.method;
      renderFlightPaymentForm(method, ticket);
    }));
    // scroll to payment
    const payPanel = document.getElementById('flight-payment'); if(payPanel) payPanel.scrollIntoView({ behavior: 'smooth' });
  });
}

function renderFlightPaymentForm(method, ticket){
  const area = document.getElementById('flight-payment-area');
  const res = document.getElementById('flight-payment-result');
  if(!area) return;
  if(method === 'Tarjeta'){
    area.innerHTML = `
      <form id="flight-pay-form">
        <label>Moneda<select id="flight-pay-currency"><option value="USD">USD</option><option value="EUR">EUR</option><option value="MXN">MXN</option></select></label>
        <label>Número tarjeta<input id="flight-card-num" type="text" required /></label>
        <label>Nombre en tarjeta<input id="flight-card-name" type="text" required /></label>
        <button type="submit" class="primary">Pagar y emitir billete</button>
      </form>
    `;
    const f = document.getElementById('flight-pay-form'); if(f) f.addEventListener('submit', (e)=>{ e.preventDefault(); finalizeFlightPayment(ticket, 'Tarjeta'); });
  } else if(method === 'PayPal'){
    area.innerHTML = `<div style="padding:8px;">Inicia sesión en PayPal (simulado). <button id="flight-paypal-btn" class="primary">Pagar con PayPal</button></div>`;
    const b = document.getElementById('flight-paypal-btn'); if(b) b.addEventListener('click', ()=> finalizeFlightPayment(ticket, 'PayPal'));
  } else {
    area.innerHTML = `<div style="padding:8px;">Sigue las instrucciones de transferencia. <button id="flight-transfer-confirm" class="primary">He realizado la transferencia</button></div>`;
    const b = document.getElementById('flight-transfer-confirm'); if(b) b.addEventListener('click', ()=> finalizeFlightPayment(ticket, 'Transferencia'));
  }
  if(res) res.textContent = '';
}

function finalizeFlightPayment(ticket, method){
  const payRes = document.getElementById('flight-payment-result');
  const ticketRes = document.getElementById('flight-ticket-result');
  if(payRes) payRes.textContent = `Procesando pago con ${method}...`;
  setTimeout(()=>{
    if(payRes) payRes.innerHTML = `Pago realizado. Billete emitido para <strong>${ticket.name}</strong> a ${ticket.to} en ${ticket.cabin}. Método: ${method}.`;
    if(ticketRes) ticketRes.innerHTML = `Billete: <strong>${ticket.name}</strong> — ${ticket.from} → ${ticket.to} — ${ticket.date}`;
    // clear pending ticket
    window._pendingFlightTicket = null;
  }, 1100);
}

function showHotelDetail(h){
  if(!hotelDetails) return;
  let reviewsHtml = '';
  if(h.reviews && h.reviews.length){
    reviewsHtml = '<div class="reviews"><h4>Reseñas</h4>' + h.reviews.map(r => `
      <div class="review"><div class="r-header"><strong>${r.user}</strong> <span class="r-rating">${'⭐'.repeat(r.rating)}</span></div><div class="r-body"><p>${r.text}</p></div></div>
    `).join('') + '</div>';
  } else {
    reviewsHtml = '<p>No hay reseñas aún.</p>';
  }

  const priceInfo = h.price ? `<p class="price">Precio por habitación/noche: <strong>$${h.price}</strong></p>` : '';

  // Build gallery HTML (rotating thumbnails) if multiple images present
  let galleryHtml = '';
  if(Array.isArray(h.imgs) && h.imgs.length){
    galleryHtml = `
      <div class="hotel-detail-gallery">
        <div class="hotel-main-wrap"><img id="hotel-main-img" class="hotel-main-img" src="${h.imgs[0]}" alt="${h.name}" /></div>
        <div class="hotel-thumbs">${h.imgs.map((s,i)=>`<img class="hotel-thumb" data-index="${i}" src="${s}" alt="${h.name} ${i+1}" />`).join('')}</div>
      </div>
    `;
  } else {
    const preview = h.img || '';
    galleryHtml = `<div class="hotel-main-wrap"><img id="hotel-main-img" class="hotel-main-img" src="${preview}" alt="${h.name}" /></div>`;
  }

  hotelDetails.innerHTML = `
    ${galleryHtml}
    <h3>${h.name}</h3>
    <p>${h.desc}</p>
    ${priceInfo}
    ${reviewsHtml}

    <div class="reservation">
      <h4>Reservar hospedaje</h4>
      <form id="reservation-form" class="reservation-form">
        <label>Nombre completo<input id="res-name" type="text" required placeholder="Tu nombre" /></label>
        <label>Edad<input id="res-age" type="number" min="0" required /></label>
        <label>Tipo de documento
          <select id="res-doc-type">
            <option value="DNI">DNI/ID</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Visa">Visa</option>
          </select>
        </label>
        <label>Número de documento<input id="res-doc-num" type="text" required /></label>
        <label>Forma de pago
          <select id="res-payment">
            <option>Tarjeta</option>
            <option>PayPal</option>
            <option>Transferencia</option>
          </select>
        </label>
        <label>Cant. personas<input id="res-people" type="number" min="1" value="1" required /></label>
        <label>Cant. habitaciones<input id="res-rooms" type="number" min="1" value="1" required /></label>
        <label>Noches<input id="res-nights" type="number" min="1" value="1" required /></label>
        <div style="display:flex;gap:8px;align-items:center;margin-top:8px;">
          <button type="submit" class="primary">Calcular costo y reservar</button>
          <div id="reservation-result" style="margin-left:10px;"></div>
        </div>
      </form>
    </div>
  `;

  const savedUser = sessionStorage.getItem('voyara_user');
  if(savedUser){
    const nameInput = document.getElementById('res-name'); if(nameInput) nameInput.value = savedUser;
  }

  const form = document.getElementById('reservation-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('res-name').value.trim();
      const age = parseInt(document.getElementById('res-age').value,10);
      const docType = document.getElementById('res-doc-type').value;
      const docNum = document.getElementById('res-doc-num').value.trim();
      const payment = document.getElementById('res-payment').value;
      const people = parseInt(document.getElementById('res-people').value,10) || 1;
      const rooms = parseInt(document.getElementById('res-rooms').value,10) || 1;
      const nights = parseInt(document.getElementById('res-nights').value,10) || 1;

      if(!name || !docNum || !age){ alert('Completa los campos requeridos.'); return; }

      const base = h.price || 100;
      const total = base * rooms * nights;
      const resultEl = document.getElementById('reservation-result');
      if(resultEl) resultEl.innerHTML = `<div class="reservation-summary">Total: <strong>$${total.toFixed(2)}</strong> (${rooms} hab x ${nights} noches)</div><div style="margin-left:6px;"><button id="pay-btn" class="primary">Pagar</button></div>`;

      const reservationData = { hotel: h.name, country: countrySelect ? countrySelect.value : '', name, age, docType, docNum, payment, people, rooms, nights, total };

      const payBtn = document.getElementById('pay-btn');
      if(payBtn){
        payBtn.addEventListener('click', ()=> showPaymentForm(reservationData));
      }
    });
  }

  // Setup gallery rotation and interactions
  try{
    // clear previous interval if any
    if(window._hotelGalleryInterval) { clearInterval(window._hotelGalleryInterval); window._hotelGalleryInterval = null; }
    const mainImg = document.getElementById('hotel-main-img');
    const thumbs = Array.from(document.querySelectorAll('.hotel-thumb'));
    if(mainImg && thumbs.length){
      let idx = 0;
      const imgs = thumbs.map(t=> t.src);
      function show(i){ idx = i % imgs.length; mainImg.src = imgs[idx]; thumbs.forEach(t=> t.classList.toggle('active', parseInt(t.dataset.index,10)===idx)); }
      // auto rotate
      window._hotelGalleryInterval = setInterval(()=>{ show((idx+1)%imgs.length); }, 3500);
      // thumb click
      thumbs.forEach(t=> t.addEventListener('click', ()=>{ const i = parseInt(t.dataset.index,10); show(i); if(window._hotelGalleryInterval) { clearInterval(window._hotelGalleryInterval); window._hotelGalleryInterval = setInterval(()=>{ show((idx+1)%imgs.length); }, 3500); } }));
    }
  }catch(err){ /* ignore gallery errors */ }

  window.scrollTo({ top: hotelDetails.offsetTop - 80, behavior: 'smooth' });
}

function showPaymentForm(reservation){
  if(!hotelDetails) return;
  hotelDetails.innerHTML = `<div class="payment-wrap">
    <h3>Pagar reserva - ${reservation.hotel}</h3>
    <p>Importe a pagar: <strong>$${reservation.total.toFixed(2)}</strong></p>
    <div class="payment-methods">
      <button data-method="Tarjeta" class="pay-method">Tarjeta</button>
      <button data-method="PayPal" class="pay-method">PayPal</button>
      <button data-method="Transferencia" class="pay-method">Transferencia</button>
    </div>
    <div id="payment-form-area"></div>
    <div id="payment-result"></div>
  </div>`;

  document.querySelectorAll('.pay-method').forEach(btn=> btn.addEventListener('click', ()=>{
    const method = btn.dataset.method;
    renderPaymentForm(method, reservation);
  }));
}

function renderPaymentForm(method, reservation){
  const area = document.getElementById('payment-form-area');
  if(!area) return;
  if(method === 'Tarjeta'){
    area.innerHTML = `
      <form id="pay-form">
        <label>Moneda
          <select id="pay-currency">
            <option value="USD">USD - Dólar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="ARS">ARS - Peso argentino</option>
            <option value="MXN">MXN - Peso mexicano</option>
            <option value="COP">COP - Peso colombiano</option>
            <option value="CLP">CLP - Peso chileno</option>
            <option value="DOP">DOP - Peso dominicano</option>
            <option value="UYU">UYU - Peso uruguayo</option>
            <option value="PHP">PHP - Peso filipino</option>
            <option value="OTHER">Otra moneda</option>
          </select>
        </label>

        <label>Tipo de tarjeta
          <select id="card-type">
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
            <option value="prepaid">Prepago</option>
          </select>
        </label>

        <label>Marca de tarjeta
          <select id="card-brand">
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="amex">American Express</option>
            <option value="discover">Discover</option>
            <option value="other">Otra</option>
          </select>
        </label>

        <label>Número de tarjeta<input id="card-num" type="text" placeholder="1234 5678 9012 3456" required/></label>
        <label>Nombre en tarjeta<input id="card-name" type="text" required/></label>
        <label>Expiración<input id="card-exp" type="text" placeholder="MM/AA" required/></label>
        <label>CVV<input id="card-cvv" type="text" required/></label>
        <button type="submit" class="primary">Pagar $${reservation.total.toFixed(2)} (mostrar en moneda seleccionada)</button>
      </form>
    `;
  } else if(method === 'PayPal'){
    area.innerHTML = `
      <form id="pay-form">
        <label>Email PayPal<input id="pp-email" type="email" placeholder="tu@ejemplo.com" required/></label>
        <button type="submit" class="primary">Pagar con PayPal</button>
      </form>
    `;
  } else {
    area.innerHTML = `
      <div class="transfer-info">
        <p>Instrucciones para transferencia bancaria:</p>
        <pre>Banco: Demo Bank\nCuenta: 123456789\nIBAN: DEMO000012345</pre>
        <div style="margin-top:8px;">
          <label>Moneda de la transferencia
            <select id="transfer-currency">
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="ARS">ARS - Peso argentino</option>
              <option value="MXN">MXN - Peso mexicano</option>
              <option value="COP">COP - Peso colombiano</option>
              <option value="CLP">CLP - Peso chileno</option>
              <option value="DOP">DOP - Peso dominicano</option>
              <option value="UYU">UYU - Peso uruguayo</option>
              <option value="PHP">PHP - Peso filipino</option>
              <option value="OTHER">Otra moneda</option>
            </select>
          </label>
          <button id="confirm-transfer" class="primary">He realizado la transferencia</button>
        </div>
      </div>
    `;
    const btn = document.getElementById('confirm-transfer'); if(btn) btn.addEventListener('click', ()=> {
      const txCur = document.getElementById('transfer-currency') ? document.getElementById('transfer-currency').value : 'USD';
      finalizePayment(reservation, 'Transferencia', { currency: txCur });
    });
    return;
  }

  const payForm = document.getElementById('pay-form');
  if(payForm){
    payForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      // collect extra payment metadata
      const currency = document.getElementById('pay-currency') ? document.getElementById('pay-currency').value : 'USD';
      const brand = document.getElementById('card-brand') ? document.getElementById('card-brand').value : 'other';
      const type = document.getElementById('card-type') ? document.getElementById('card-type').value : 'credit';
      const cardNum = document.getElementById('card-num') ? document.getElementById('card-num').value.replace(/\s+/g,'') : '';
      const last4 = cardNum ? cardNum.slice(-4) : '';
      const paymentMeta = { currency, brand, type, last4 };
      finalizePayment(reservation, method, paymentMeta);
    });
  }
}

function finalizePayment(reservation, method, paymentMeta){
  const result = document.getElementById('payment-result');
  if(result) result.innerHTML = `<div class="payment-confirm">Procesando pago con ${method}...</div>`;
  setTimeout(()=>{
    if(result) {
      let metaTxt = '';
      if(paymentMeta){
        const cur = paymentMeta.currency || 'USD';
        const brand = paymentMeta.brand ? paymentMeta.brand.toUpperCase() : '';
        const type = paymentMeta.type ? paymentMeta.type : '';
        const last4 = paymentMeta.last4 ? ` (**** ${paymentMeta.last4})` : '';
        metaTxt = `<div>Pagado con: ${brand} ${type}${last4} — Moneda: ${cur}</div>`;
      }
      const totalTxt = paymentMeta && paymentMeta.currency && paymentMeta.currency !== 'USD' ? `Importe mostrado en ${paymentMeta.currency}` : `Total pagado: $${reservation.total.toFixed(2)}`;
      result.innerHTML = `<div class="payment-success">Pago realizado con éxito. Reserva confirmada para <strong>${reservation.name}</strong>.<br/>${totalTxt}</div>${metaTxt}`;
    }
  }, 1200);
}

if(countrySelect){
  countrySelect.addEventListener('change', ()=>{
    const country = countrySelect.value;
    populateCities(country);
    const selectedCity = citySelect ? citySelect.value : undefined;
    renderHotelsFor(country, selectedCity, hotelSearch ? hotelSearch.value : '');
  });
}

if(citySelect){
  citySelect.addEventListener('change', ()=>{
    const country = countrySelect ? countrySelect.value : undefined;
    const city = citySelect.value;
    renderHotelsFor(country, city, hotelSearch ? hotelSearch.value : '');
  });
}

if(hotelSearchBtn){
  hotelSearchBtn.addEventListener('click', ()=> {
    const country = countrySelect ? countrySelect.value : Object.keys(HOTEL_DATA)[0];
    const city = citySelect ? citySelect.value : undefined;
    const q = hotelSearch ? hotelSearch.value : '';
    renderHotelsFor(country, city, q);
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  populateCountries();
  const firstCountry = countrySelect ? countrySelect.value : Object.keys(HOTEL_DATA)[0];
  const firstCity = citySelect ? citySelect.value : undefined;
  renderHotelsFor(firstCountry, firstCity);
});

if(loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if(!username || !password){ setAuthMessage('Por favor ingresa nombre y contraseña.', 'error'); return; }
    const storedUsers = JSON.parse(localStorage.getItem('voyara_users') || '{}');
    const matchedUser = Object.entries(storedUsers).find(([key, user]) => key.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === username.toLowerCase());
    if(matchedUser && matchedUser[1].password === password){
      sessionStorage.setItem('voyara_user', matchedUser[0]);
      setAuthMessage('Inicio de sesión correcto. Bienvenido.', 'success');
      setTimeout(()=> loginUser(), 900);
    } else {
      setAuthMessage('Usuario o contraseña incorrectos.', 'error');
    }
  });
}

if(registerForm){
  registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-password-confirm').value;
    if(!username || !email || !password || !confirm){ setAuthMessage('Completa todos los campos del registro.', 'error'); return; }
    if(password !== confirm){ setAuthMessage('Las contraseñas no coinciden.', 'error'); return; }
    const storedUsers = JSON.parse(localStorage.getItem('voyara_users') || '{}');
    const usernameTaken = Object.keys(storedUsers).some(key => key.toLowerCase() === username.toLowerCase());
    const emailTaken = Object.values(storedUsers).some(user => user.email.toLowerCase() === email);
    if(usernameTaken || emailTaken){ setAuthMessage('El usuario o correo ya están en uso.', 'error'); return; }
    storedUsers[username] = { email, password };
    localStorage.setItem('voyara_users', JSON.stringify(storedUsers));
    sessionStorage.setItem('voyara_user', username);
    setAuthMessage('Cuenta creada correctamente. Iniciando sesión...', 'success');
    setTimeout(()=> loginUser(), 900);
  });
}

function sendPasswordRecoveryRequest(email){
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, requestType: 'password_recovery', timestamp: new Date().toISOString() })
  }).then(response => {
    if(!response.ok) throw new Error('Error en la petición');
    return response.json();
  });
}

if(forgotForm){
  forgotForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim().toLowerCase();
    if(!email){ setAuthMessage('Ingresa un correo válido.', 'error'); return; }
    const storedUsers = JSON.parse(localStorage.getItem('voyara_users') || '{}');
    const foundUser = Object.entries(storedUsers).find(([, user]) => user.email.toLowerCase() === email);
    if(!foundUser){ setAuthMessage('No hay una cuenta registrada con ese correo.', 'error'); return; }
    setAuthMessage('Enviando solicitud de recuperación...', 'info');
    sendPasswordRecoveryRequest(email).then(()=>{
      setAuthMessage('Solicitud enviada. Revisa tu correo electrónico.', 'success');
    }).catch(()=>{
      setAuthMessage('No se pudo enviar la solicitud. Intenta de nuevo.', 'error');
    });
  });
}

function loginUser(){
  const user = sessionStorage.getItem('voyara_user') || 'Usuario';
  if(greeting) greeting.textContent = `Hola, ${user}`;
  if(loginHeaderBtn) loginHeaderBtn.style.display = 'none';
  if(logoutBtn) logoutBtn.style.display = 'block';
  closeLoginModal();
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  if(usernameInput) usernameInput.value = '';
  if(passwordInput) passwordInput.value = '';
}

if(logoutBtn) logoutBtn.addEventListener('click', ()=>{ 
  sessionStorage.removeItem('voyara_user'); 
  if(greeting) greeting.textContent = '';
  if(loginHeaderBtn) loginHeaderBtn.style.display = 'block';
  if(logoutBtn) logoutBtn.style.display = 'none';
});

if(prevBtn) prevBtn.addEventListener('click', ()=> { showSlide(currentIndex - 1); startAutoplay(); });
if(nextBtn) nextBtn.addEventListener('click', ()=> { showSlide(currentIndex + 1); startAutoplay(); });

[prevBtn, nextBtn, slidesEl].forEach(el => {
  if(!el) return;
  el.addEventListener('mouseenter', ()=> stopAutoplay());
  el.addEventListener('mouseleave', ()=> startAutoplay());
});

window.addEventListener('DOMContentLoaded', ()=>{
  renderSlides();
  showSlide(0);
  setupNav();
  setTopbarTheme('home-view');
  if(brandHome){
    brandHome.addEventListener('click', ()=> showSection('home-view'));
    brandHome.addEventListener('keypress', (e)=>{ if(e.key === 'Enter' || e.key === ' ') showSection('home-view'); });
  }
  initializeApp();
  if(sessionStorage.getItem('voyara_user')) {
    const user = sessionStorage.getItem('voyara_user');
    if(greeting) greeting.textContent = `Hola, ${user}`;
    if(loginHeaderBtn) loginHeaderBtn.style.display = 'none';
    if(logoutBtn) logoutBtn.style.display = 'block';
  }
  if(year) year.textContent = new Date().getFullYear();
  // transport models
  renderTransportModels();
  window.addEventListener('scroll', ()=>{
    const topbar = document.querySelector('.topbar');
    if(!topbar) return;
    const offset = window.scrollY;
    topbar.style.backdropFilter = offset > 10 ? 'blur(18px)' : 'blur(14px)';
    topbar.style.boxShadow = offset > 10 ? '0 24px 72px rgba(0,0,0,0.22)' : '0 18px 50px var(--topbar-shadow)';
  });
});

// Flight Search Form Handler
const flightSearchForm = document.getElementById('flight-search-form');
const returnDateField = document.getElementById('return-date-field');
const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');

if(tripTypeRadios.length > 0){
  tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e)=>{
      if(returnDateField){
        returnDateField.style.display = e.target.value === 'roundtrip' ? 'flex' : 'none';
        const returnInput = document.getElementById('search-return');
        if(returnInput && e.target.value === 'oneway') returnInput.removeAttribute('required');
        if(returnInput && e.target.value === 'roundtrip') returnInput.setAttribute('required', 'required');
      }
    });
  });
}

if(flightSearchForm){
  flightSearchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const origin = document.getElementById('search-origin').value.trim();
    const destination = document.getElementById('search-destination').value.trim();
    const departure = document.getElementById('search-departure').value;
    const tripType = document.querySelector('input[name="trip-type"]:checked').value;
    const returnDate = tripType === 'roundtrip' ? document.getElementById('search-return').value : null;
    const passengers = document.getElementById('search-passengers').value;
    
    if(!origin || !destination || !departure){ alert('Por favor completa los campos requeridos.'); return; }
    if(tripType === 'roundtrip' && !returnDate){ alert('Por favor selecciona fecha de vuelta.'); return; }
    
    const searchParams = { origin, destination, departure, returnDate, tripType, passengers };
    sessionStorage.setItem('voyara_flight_search', JSON.stringify(searchParams));
    alert(`Búsqueda: ${origin} → ${destination}\nIda: ${departure}\n${tripType === 'roundtrip' ? 'Vuelta: ' + returnDate : 'Solo ida'}\nPasajeros: ${passengers}`);
  });
}

// Pet flight ticket form handler (simulado)
const petFlightForm = document.getElementById('pet-flight-form');
if(petFlightForm){
  petFlightForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const from = document.getElementById('pet-flight-from').value.trim();
    const to = document.getElementById('pet-flight-to').value.trim();
    const size = document.getElementById('pet-flight-size').value;
    const mode = document.getElementById('pet-flight-mode').value;
    const date = document.getElementById('pet-flight-date').value;
    const resultEl = document.getElementById('pet-flight-result');
    if(!from || !to || !date){ if(resultEl) resultEl.textContent = 'Completa los campos requeridos.'; return; }

    // Simple pricing heuristic
    let base = 50; // base fee
    if(size === 'medium') base += 40;
    if(size === 'large') base += 90;
    if(mode === 'cargo') base += 80;

    // distance-ish factor: if country-select exists, try to boost price when crossing continents (very rough)
    let multiplier = 1;
    try{
      const countryFrom = countrySelect ? countrySelect.value : '';
      if(countryFrom && to && countryFrom !== '' && !to.toLowerCase().includes(countryFrom.split(' ')[0].toLowerCase())) multiplier = 1.4;
    }catch(err){ multiplier = 1; }

    const total = Math.max(30, Math.round(base * multiplier));
    if(resultEl) resultEl.innerHTML = `<div>Precio estimado: <strong>$${total}</strong></div><div style="margin-top:8px;"><button id="pet-flight-confirm" class="primary">Reservar ticket</button></div>`;

    const confirmBtn = document.getElementById('pet-flight-confirm');
    if(confirmBtn){
      confirmBtn.addEventListener('click', ()=>{
        if(resultEl) resultEl.innerHTML = `<div class="payment-success">Ticket reservado para ${from} → ${to} (${date}). Importe: <strong>$${total}</strong></div>`;
      });
    }
  });
}

// ===== CHATBOT FLOTANTE =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotPanel = document.getElementById('chatbot-panel');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

const botResponses = [
  '¿Qué destino te gustaría visitar?',
  'Tenemos excelentes ofertas para familias.',
  '¿Necesitas ayuda con hoteles, transporte o vuelos?',
  'Nuestros precios son los más competitivos del mercado.',
  '¿Viajas con mascotas? Tenemos servicios especiales.',
  '¿En qué puedo ayudarte hoy?',
  'Puedo asistirte con reservas de vuelos, hoteles y transporte.',
];

// Toggle chatbot
if(chatbotToggle){
  chatbotToggle.addEventListener('click', ()=>{
    chatbotPanel.classList.toggle('hidden');
  });
}

// Close chatbot
if(chatbotClose){
  chatbotClose.addEventListener('click', ()=>{
    chatbotPanel.classList.add('hidden');
  });
}

// Send message
function sendChatMessage(){
  const message = chatbotInput.value.trim();
  if(!message) return;

  // User message
  const userDiv = document.createElement('div');
  userDiv.className = 'chatbot-message user-message';
  userDiv.innerHTML = `<p>${message}</p>`;
  chatbotMessages.appendChild(userDiv);

  chatbotInput.value = '';

  // Bot response (after delay)
  setTimeout(()=>{
    const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    const botDiv = document.createElement('div');
    botDiv.className = 'chatbot-message bot-message';
    botDiv.innerHTML = `<p>${botResponse}</p>`;
    chatbotMessages.appendChild(botDiv);

    // Auto-scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 500);

  // Auto-scroll to bottom
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if(chatbotSend){
  chatbotSend.addEventListener('click', sendChatMessage);
}

if(chatbotInput){
  chatbotInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter') sendChatMessage();
  });
}

// Start hotel background rotation and wire hero search button
window.addEventListener('DOMContentLoaded', ()=>{
  try{ startHotelBackgroundRotation(); }catch(e){}
  const heroBtn = document.getElementById('hotel-hero-search-btn');
  if(heroBtn){
    heroBtn.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const q = document.getElementById('hotel-hero-search') ? document.getElementById('hotel-hero-search').value.trim() : '';
      if(q){
        // Simple behavior: set hotel search input and trigger render
        if(hotelSearch) hotelSearch.value = q;
        const country = countrySelect ? countrySelect.value : Object.keys(HOTEL_DATA)[0];
        const city = citySelect ? citySelect.value : undefined;
        renderHotelsFor(country, city, q);
      }
    });
  }
});


