// Login + Carrusel + Hoteles + Reserva/Pago (limpio, sin juegos ni avatar)

const PLACES = [
  { title: 'París, Francia', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop', desc: 'La ciudad del amor, famosa por la Torre Eiffel, museos y su gastronomía.' },
  { title: 'Roma, Italia', img:"david-kohler-VFRTXGw1VjU-unsplash.jpg", desc: 'Capital histórica con el Coliseo, el Vaticano y calles llenas de historia.' },
  { title: 'Nueva York, EE. UU.', img: 'luca-bravo-TaCk3NspYe0-unsplash.jpg', desc: 'La ciudad que nunca duerme: rascacielos, Broadway y Central Park.' },
  { title: 'Kioto, Japón', img: 'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1600&auto=format&fit=crop', desc: 'Templos, jardines y tradición. Famosa por los cerezos en flor.' }
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
}

function closeLoginModal(){
  if(loginModal) loginModal.classList.add('hidden');
}

if(closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
if(loginHeaderBtn) loginHeaderBtn.addEventListener('click', openLoginModal);

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
      document.querySelectorAll('.app-section').forEach(s => s.classList.add('hidden'));
      const el = document.getElementById(target);
      if(el) el.classList.remove('hidden');
      // If transport section was requested, ensure models are rendered
      if(target === 'transport-view' && typeof renderTransportModels === 'function'){
        renderTransportModels();
      }
      // If flights section was requested, ensure airlines and destinations are rendered
      if(target === 'flights-view' && typeof renderAirlines === 'function'){
        renderAirlines();
      }
    });
  });
}

// --- Hotels ---
const HOTEL_DATA = {
  'Francia': [
    { name: 'Hotel Le Parisien', img: 'https://images.unsplash.com/photo-1505691723518-34f7b5e0d0b1?q=80&w=1200&auto=format&fit=crop', desc: 'Hotel boutique cerca de la Torre Eiffel, con vistas y desayuno incluido.', price:120, reviews: [ { user:'Ana', rating:5, text:'Excelente ubicación y trato impecable.' }, { user:'Luis', rating:4, text:'Buena relación calidad/precio.' } ] },
    { name: 'Alojamiento Rive Gauche', img: 'https://images.unsplash.com/photo-1501117716987-c8e5b7d2f0f2?q=80&w=1200&auto=format&fit=crop', desc: 'Encantador hotel en el barrio latino con estilo clásico parisino.', price:95, reviews: [ { user:'María', rating:4, text:'Muy acogedor y limpio.' }, { user:'Pablo', rating:3, text:'Habitación pequeña pero bien ubicada.' } ] }
  ],
  'Italia': [
    { name: 'Colosseo Suites', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', desc: 'A pasos del Coliseo, ideal para quienes aman la historia.', price:110, reviews: [ { user:'Carla', rating:5, text:'Inmejorable ubicación.' }, { user:'Roberto', rating:4, text:'Personal muy atento.' } ] },
    { name: 'Trastevere Inn', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', desc: 'Acogedor y con acceso a la vida nocturna romana.', price:90, reviews: [ { user:'Lucía', rating:4, text:'Ambiente auténtico.' }, { user:'Diego', rating:3, text:'Ruidoso por la noche.' } ] }
  ],
  'EE. UU.': [
    { name: 'Manhattan Grand Hotel', img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop', desc: 'Céntrico, cerca de Times Square y theaters.', price:220, reviews: [ { user:'John', rating:5, text:'Perfecto para ver Broadway.' }, { user:'Emma', rating:4, text:'Habitaciones cómodas.' } ] },
    { name: 'Central Park View', img: 'https://images.unsplash.com/photo-1519821172147-3f1b9d8c3f58?q=80&w=1200&auto=format&fit=crop', desc: 'Habitaciones con vista al parque y servicios de lujo.', price:300, reviews: [ { user:'Oliver', rating:5, text:'Vistas increíbles.' }, { user:'Mia', rating:4, text:'Servicio excelente.' } ] }
  ],
  'Japón': [
    { name: 'Ryokan Tradicional', img: 'https://images.unsplash.com/photo-1530629013299-6cb69a9d3e36?q=80&w=1200&auto=format&fit=crop', desc: 'Experiencia japonesa tradicional con onsen y tatami.', price:180, reviews: [ { user:'Yuki', rating:5, text:'Auténtico y relajante.' }, { user:'Hiro', rating:5, text:'Servicio impecable.' } ] },
    { name: 'Jardines de Kioto Hotel', img: 'https://images.unsplash.com/photo-1501117716987-c8e5b7d2f0f2?q=80&w=1200&auto=format&fit=crop', desc: 'Ubicado cerca de templos y jardines zen.', price:140, reviews: [ { user:'Sakura', rating:4, text:'Hermosos jardines.' }, { user:'Taro', rating:4, text:'Buena ubicación.' } ] }
  ]
};

const countrySelect = document.getElementById('country-select');
const hotelGallery = document.getElementById('hotel-gallery');
const hotelList = document.getElementById('hotel-list');
const hotelDetails = document.getElementById('hotel-details');
const hotelSearch = document.getElementById('hotel-search');
const hotelSearchBtn = document.getElementById('hotel-search-btn');

const COUNTRIES = [
  'Afganistán','Albania','Argelia','Andorra','Angola','Antigua y Barbuda','Argentina','Armenia','Australia','Austria','Azerbaiyán',
  'Bahamas','Baréin','Bangladés','Barbados','Bielorrusia','Bélgica','Belice','Benín','Bután','Bolivia','Bosnia y Herzegovina','Botsuana','Brasil','Brunéi','Bulgaria','Burkina Faso','Burundi',
  'Cabo Verde','Camboya','Camerún','Canadá','República Centroafricana','Chad','Chile','China','Colombia','Comoras','Congo','Costa Rica','Costa de Marfil','Croacia','Cuba','Chipre','República Checa',
  'República Democrática del Congo','Dinamarca','Yibuti','Dominica','República Dominicana','Ecuador','Egipto','El Salvador','Guinea Ecuatorial','Eritrea','Estonia','Esuatini','Etiopía',
  'Fiyi','Finlandia','Francia','Gabón','Gambia','Georgia','Alemania','Ghana','Grecia','Granada','Guatemala','Guinea','Guinea-Bisáu','Guyana','Haití','Honduras','Hungría','Islandia','India','Indonesia',
  'Irán','Iraq','Irlanda','Israel','Italia','Jamaica','Japón','Jordania','Kazajistán','Kenia','Kiribati','Corea del Norte','Corea del Sur','Kosovo','Kuwait','Kirguistán','Laos','Letonia','Líbano','Lesoto','Liberia',
  'Libia','Liechtenstein','Lituania','Luxemburgo','Madagascar','Malaui','Malasia','Maldivas','Malí','Malta','Islas Marshall','Mauritania','Mauricio','México','Estados Federados de Micronesia','Moldavia','Mónaco','Mongolia','Montenegro','Marruecos','Mozambique','Myanmar',
  'Namibia','Nauru','Nepal','Países Bajos','Nueva Zelanda','Nicaragua','Níger','Nigeria','Macedonia del Norte','Noruega','Omán','Pakistán','Palaos','Panamá','Papúa Nueva Guinea','Paraguay','Perú','Filipinas','Polonia','Portugal','Catar',
  'Rumanía','Rusia','Ruanda','San Cristóbal y Nieves','Santa Lucía','San Vicente y las Granadinas','Samoa','San Marino','Santo Tomé y Príncipe','Arabia Saudita','Senegal','Serbia','Seychelles','Sierra Leona','Singapur','Eslovaquia','Eslovenia','Islas Salomón','Somalia','Sudáfrica','Sudán del Sur',
  'España','Sri Lanka','Sudán','Surinam','Suecia','Suiza','Siria','Tayikistán','Tanzania','Tailandia','Timor Oriental','Togo','Tonga','Trinidad y Tobago','Túnez','Turquía','Turkmenistán','Tuvalu','Uganda','Ucrania','Emiratos Árabes Unidos','Reino Unido','Estados Unidos','Uruguay','Uzbekistán','Vanuatu','Ciudad del Vaticano','Venezuela','Vietnam','Yemen','Zambia','Zimbabue'
];

function populateCountries(){
  if(!countrySelect) return;
  countrySelect.innerHTML = '';
  const defaultWithData = Object.keys(HOTEL_DATA)[0] || COUNTRIES[0];
  COUNTRIES.forEach(c => {
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
    if(c === defaultWithData) opt.selected = true;
    countrySelect.appendChild(opt);
  });
  countrySelect.value = defaultWithData;
}

// --- Transporte: modelos y alquiler ---
let selectedTransportModelId = null;
const TRANSPORT_MODELS = [
  { id: 'car-compact', type: 'Auto', model: 'Compact Plus', img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop', pricePerDay: 25 },
  { id: 'car-sedan', type: 'Auto', model: 'Sedan Comfort', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop', pricePerDay: 40 },
  { id: 'car-suv', type: 'Auto', model: 'SUV Traveler', img: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200&auto=format&fit=crop', pricePerDay: 65 },
  { id: 'moto-125', type: 'Moto', model: 'Moto 125cc', img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop', pricePerDay: 15 },
  { id: 'moto-500', type: 'Moto', model: 'Moto 500cc', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop', pricePerDay: 28 }
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
  { id: 'air-econo', name: 'EconoAir', logo: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop' },
  { id: 'air-azul', name: 'AzulVuelos', logo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop' },
  { id: 'air-libre', name: 'LibreFly', logo: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?q=80&w=800&auto=format&fit=crop' },
  { id: 'air-global', name: 'GlobalAir', logo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop' }
];

const FLIGHT_DESTINATIONS = ['Francia','Italia','EE. UU.','Japón','España','México','Argentina','Colombia','Chile'];

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
    card.innerHTML = `<img src="${a.logo}" alt="${a.name}" /><div style="margin-top:8px;font-weight:700;">${a.name}</div><div style="margin-top:8px;"><button class="primary choose-air" data-id="${a.id}">Seleccionar</button></div>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll('.choose-air').forEach(b => b.addEventListener('click', ()=>{
    const id = b.dataset.id;
    const sel = document.getElementById('flight-airline'); if(sel) sel.value = id; // select airline in form
    // reveal the flight form panel so user can fill ticket details
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

// Flights UI and handlers removed (restored pets section to previous state)

function renderHotelsFor(country, filter=''){
  if(!HOTEL_DATA[country]){
    const sample = [];
    const nameTemplates = ['Hotel {country} Plaza','Gran {country} Resort','Residencia {country}','{country} Inn','Palacio {country}','Posada {country}'];
    for(let i=1;i<=4;i++){
      const tpl = nameTemplates[(i-1) % nameTemplates.length];
      const name = tpl.replace('{country}', country);
      const img = `https://source.unsplash.com/800x600/?hotel,${encodeURIComponent(country)}&sig=${i}`;
      const desc = `Alojamiento de ejemplo en ${country}. Ideal para visitantes que exploran la zona.`;
      const reviews = [
        { user: 'Usuario1', rating: Math.floor(Math.random()*2)+4, text: 'Muy buen lugar para quedarse.' },
        { user: 'Usuario2', rating: Math.floor(Math.random()*2)+3, text: 'Buena ubicación y servicio.' }
      ];
      sample.push({ name, img, desc, reviews });
    }
    HOTEL_DATA[country] = sample;
  }

  const list = HOTEL_DATA[country] || [];
  const filtered = list.filter(h => h.name.toLowerCase().includes(filter.toLowerCase()));

  if(hotelGallery) hotelGallery.innerHTML = '';
  filtered.forEach(h => {
    const div = document.createElement('div'); div.className = 'thumb'; div.style.backgroundImage = `url('${h.img}')`; div.title = h.name;
    div.addEventListener('click', ()=> showHotelDetail(h));
    if(hotelGallery) hotelGallery.appendChild(div);
  });

  if(hotelList) hotelList.innerHTML = '';
  filtered.forEach(h => {
    const card = document.createElement('div'); card.className = 'hotel-card';
    const img = document.createElement('img'); img.src = h.img; img.alt = h.name;
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

  hotelDetails.innerHTML = `
    <img src="${h.img}" alt="${h.name}" />
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
  countrySelect.addEventListener('change', ()=> renderHotelsFor(countrySelect.value, hotelSearch ? hotelSearch.value : ''));
}

if(hotelSearchBtn){
  hotelSearchBtn.addEventListener('click', ()=> {
    const country = countrySelect ? countrySelect.value : Object.keys(HOTEL_DATA)[0];
    const q = hotelSearch ? hotelSearch.value : '';
    renderHotelsFor(country, q);
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  populateCountries();
  const first = countrySelect ? countrySelect.value : Object.keys(HOTEL_DATA)[0];
  renderHotelsFor(first);
});

if(loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if(!username || !password){ alert('Por favor ingresa nombre y contraseña.'); return; }
    sessionStorage.setItem('voyara_user', username);
    loginUser();
  });
}

function loginUser(){
  const user = sessionStorage.getItem('voyara_user') || 'Usuario';
  if(greeting) greeting.textContent = `Hola, ${user}`;
  if(loginHeaderBtn) loginHeaderBtn.style.display = 'none';
  if(logoutBtn) logoutBtn.style.display = 'block';
  closeLoginModal();
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
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
});

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
