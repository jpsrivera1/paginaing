/* ============================================================
   script.js — Nutrición y Vida Saludable
   ============================================================ */

/* -------------------------------------------------------
   1. NAVBAR – scroll y hamburger
------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const btt       = document.getElementById('btt');

window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const scrollY = window.scrollY;

  /* Navbar glass effect */
  navbar.classList.toggle('scrolled', scrollY > 50);

  /* Back-to-top visibility */
  btt.classList.toggle('show', scrollY > 420);

  /* Active nav link */
  updateActiveLink();

  /* Scroll reveal animations */
  revealElements();

  /* Stat bars (once, when section enters viewport) */
  revealBars();
}

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close mobile menu on link click */
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* -------------------------------------------------------
   2. ACTIVE NAV LINK
------------------------------------------------------- */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  let current    = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });

  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* -------------------------------------------------------
   3. SCROLL REVEAL  (data-aos attribute)
------------------------------------------------------- */
function revealElements() {
  document.querySelectorAll('[data-aos]').forEach(el => {
    const rect  = el.getBoundingClientRect();
    const delay = parseInt(el.getAttribute('data-aos-delay') || '0');
    if (rect.top < window.innerHeight - 70) {
      setTimeout(() => el.classList.add('aos-animate'), delay);
    }
  });
}

/* -------------------------------------------------------
   4. STAT BARS ANIMATION
------------------------------------------------------- */
let barsAnimated = false;

function revealBars() {
  if (barsAnimated) return;
  const ejSection = document.getElementById('ejercicio');
  if (!ejSection) return;

  if (ejSection.getBoundingClientRect().top < window.innerHeight - 80) {
    barsAnimated = true;
    document.querySelectorAll('.bar-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.w + '%';
      }, i * 140);
    });
  }
}

/* -------------------------------------------------------
   5. BACK TO TOP
------------------------------------------------------- */
btt.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* -------------------------------------------------------
   6. MODAL DE PLANES
------------------------------------------------------- */
const planData = {
  balanceado: {
    ico:    'fa-balance-scale',
    titulo: 'Plan Balanceado',
    badge:  'Popular',
    desc:   'Un enfoque nutricional completo que distribuye de forma óptima todos los grupos alimenticios — cereales integrales, proteínas, grasas saludables, frutas y verduras — para garantizar tu salud general y bienestar diario.',
    beneficios: [
      { ico:'fa-leaf',          txt:'Nutrición completa'     },
      { ico:'fa-calendar-check',txt:'Fácil de seguir'        },
      { ico:'fa-carrot',        txt:'Variedad de alimentos'  },
      { ico:'fa-heart',         txt:'Digestión óptima'       },
      { ico:'fa-tint',          txt:'Hidratación adecuada'   },
      { ico:'fa-apple-alt',     txt:'Vitaminas esenciales'   },
    ],
    comidas: [
      { ico:'fa-sun',         hora:'Desayuno',  txt:'Avena con frutas del bosque, yogur natural y semillas de chía.' },
      { ico:'fa-cloud-sun',   hora:'Almuerzo',  txt:'Arroz integral con pollo a la plancha, ensalada verde y aguacate.' },
      { ico:'fa-moon',        hora:'Cena',      txt:'Sopa de verduras, lentejas salteadas y pan integral.' },
      { ico:'fa-cookie-bite', hora:'Snack',     txt:'Frutas frescas, nueces o yogur bajo en grasa.' },
    ],
    tags:  [
      { ico:'fa-seedling', txt:'Natural'      },
      { ico:'fa-star',     txt:'Equilibrado'  },
      { ico:'fa-sync',     txt:'Sostenible'   },
      { ico:'fa-smile',    txt:'Bienestar'    },
    ],
    tip: '<strong>Consejo clave:</strong> Divide tus comidas en 4-5 tomas al día y mastica despacio para favorecer la digestión y la saciedad.'
  },
  energia: {
    ico:    'fa-bolt',
    titulo: 'Plan para Energía Diaria',
    badge:  'Recomendado',
    desc:   'Potencia tu rendimiento físico y mental con carbohidratos complejos, proteínas de calidad y micronutrientes que mantienen tus niveles de energía estables desde el amanecer hasta el final del día.',
    beneficios: [
      { ico:'fa-fire-alt',   txt:'Mayor vitalidad'          },
      { ico:'fa-brain',      txt:'Concentración mejorada'   },
      { ico:'fa-bread-slice',txt:'Carbohidratos saludables' },
      { ico:'fa-fish',       txt:'Proteínas de calidad'     },
      { ico:'fa-running',    txt:'Rendimiento físico'       },
      { ico:'fa-moon',       txt:'Descanso reparador'       },
    ],
    comidas: [
      { ico:'fa-sun',         hora:'Desayuno',  txt:'Tostadas integrales con huevo revuelto, aguacate y jugo de naranja natural.' },
      { ico:'fa-cloud-sun',   hora:'Almuerzo',  txt:'Bowl de quinoa con salmón, espinacas salteadas y garbanzos.' },
      { ico:'fa-moon',        hora:'Cena',      txt:'Pechuga de pollo al horno con batata asada y brócoli al vapor.' },
      { ico:'fa-cookie-bite', hora:'Pre-entreno', txt:'Plátano con mantequilla de maní y agua de coco.' },
    ],
    tags:  [
      { ico:'fa-bolt',       txt:'Energía'     },
      { ico:'fa-dumbbell',   txt:'Activo'      },
      { ico:'fa-wheat-awn',  txt:'Avena'       },
      { ico:'fa-lemon',      txt:'Vitamina C'  },
    ],
    tip: '<strong>Consejo clave:</strong> Toma un desayuno rico en proteínas y carbohidratos complejos dentro de la primera hora después de despertar para activar tu metabolismo.'
  },
  peso: {
    ico:    'fa-weight-scale',
    titulo: 'Control de Peso',
    badge:  'Efectivo',
    desc:   'Un plan inteligente con déficit calórico moderado que prioriza la saciedad y preserva la masa muscular. Sin restricciones extremas, sin hambre. Basado en alimentos naturales, ricos en fibra y proteínas.',
    beneficios: [
      { ico:'fa-chart-line', txt:'Déficit calórico sano'      },
      { ico:'fa-ban',        txt:'Sin restricciones extremas' },
      { ico:'fa-battery-full',txt:'Saciedad duradera'        },
      { ico:'fa-fire',       txt:'Metabolismo activo'         },
      { ico:'fa-dumbbell',   txt:'Preserva músculo'           },
      { ico:'fa-chart-pie',  txt:'Control de porciones'       },
    ],
    comidas: [
      { ico:'fa-sun',         hora:'Desayuno',  txt:'Yogur griego con granola sin azúcar, fresas y semillas de lino.' },
      { ico:'fa-cloud-sun',   hora:'Almuerzo',  txt:'Ensalada grande con atún, lechuga, tomate, pepino y aceite de oliva.' },
      { ico:'fa-moon',        hora:'Cena',      txt:'Tortilla de espinacas con vegetales salteados y caldo de verduras.' },
      { ico:'fa-cookie-bite', hora:'Snack',     txt:'Manzana, zanahoria cruda o un puñado de almendras (máx. 20 g).' },
    ],
    tags:  [
      { ico:'fa-tint',       txt:'Agua'        },
      { ico:'fa-leaf',       txt:'Fibra'        },
      { ico:'fa-minus',      txt:'Sin azúcar'   },
      { ico:'fa-walking',    txt:'Caminatas'    },
    ],
    tip: '<strong>Consejo clave:</strong> Toma 500 ml de agua antes de cada comida principal. Reduce el sodio, el azúcar refinada y los ultraprocesados para potenciar los resultados.'
  },
  familiar: {
    ico:    'fa-people-roof',
    titulo: 'Plan Familiar Saludable',
    badge:  'Familiar',
    desc:   'Recetas simples, económicas y nutritivas pensadas para toda la familia. Incluye opciones aptas para niños y adultos con ingredientes accesibles, preparaciones rápidas y sabores que todos van a disfrutar.',
    beneficios: [
      { ico:'fa-child',      txt:'Apto para niños'     },
      { ico:'fa-utensils',   txt:'Recetas sencillas'   },
      { ico:'fa-piggy-bank', txt:'Económico'           },
      { ico:'fa-rainbow',    txt:'Variado y divertido' },
      { ico:'fa-clock',      txt:'Preparación rápida'  },
      { ico:'fa-heart',      txt:'Amor en cada plato'  },
    ],
    comidas: [
      { ico:'fa-sun',         hora:'Desayuno',  txt:'Pancakes de avena con miel, plátano y un vaso de leche.' },
      { ico:'fa-cloud-sun',   hora:'Almuerzo',  txt:'Pasta integral con salsa de tomate natural, carne molida y verduras.' },
      { ico:'fa-moon',        hora:'Cena',      txt:'Sopa de pollo con vegetales, arroz y pan integral.' },
      { ico:'fa-cookie-bite', hora:'Merienda',  txt:'Palitos de fruta fresca, quesillo con galletas integrales.' },
    ],
    tags:  [
      { ico:'fa-apple-alt',  txt:'Frutas'      },
      { ico:'fa-blender',    txt:'Fácil'        },
      { ico:'fa-star',       txt:'Divertido'    },
      { ico:'fa-users',      txt:'Familiar'     },
    ],
    tip: '<strong>Consejo clave:</strong> Involucra a los niños en la preparación de los alimentos. Es una forma divertida de enseñarles a comer sano desde pequeños.'
  }
};

const overlay   = document.getElementById('planModalOverlay');
const modalInner= document.getElementById('modalInner');
const modalClose= document.getElementById('modalClose');

function openPlanModal(planKey) {
  const d = planData[planKey];
  if (!d) return;

  modalInner.innerHTML = `
    <div class="modal-hero">
      <div class="modal-hero-ico"><i class="fas ${d.ico}"></i></div>
      <div>
        <h2 id="modalTitle">${d.titulo}</h2>
        <span class="m-badge">${d.badge}</span>
      </div>
    </div>

    <p class="modal-desc">${d.desc}</p>

    <p class="modal-section-title"><i class="fas fa-check-double"></i> Beneficios principales</p>
    <div class="modal-benefits">
      ${d.beneficios.map(b => `
        <div class="m-benefit">
          <i class="fas ${b.ico}"></i> ${b.txt}
        </div>`).join('')}
    </div>

    <p class="modal-section-title"><i class="fas fa-utensils"></i> Ejemplo de menú diario</p>
    <div class="modal-meals">
      ${d.comidas.map(c => `
        <div class="m-meal">
          <div class="m-meal-head"><i class="fas ${c.ico}"></i> ${c.hora}</div>
          <p>${c.txt}</p>
        </div>`).join('')}
    </div>

    <div class="modal-tags">
      ${d.tags.map(t => `<span class="m-tag"><i class="fas ${t.ico}"></i> ${t.txt}</span>`).join('')}
    </div>

    <div class="modal-tip">${d.tip}</div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePlanModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-plan').forEach(btn => {
  btn.addEventListener('click', () => openPlanModal(btn.dataset.plan));
});

modalClose.addEventListener('click', closePlanModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closePlanModal();
});

/* -------------------------------------------------------
   MODAL DE CONSEJOS
------------------------------------------------------- */
const consejoData = {
  hidratacion: {
    ico:   'fa-tint',
    color: '#4a9eca',
    titulo:'Hidratación Diaria',
    desc:  'El agua es el nutriente más esencial del cuerpo humano. Participa en todos los procesos metabólicos, regula la temperatura corporal, transporta nutrientes y elimina toxinas. Una hidratación adecuada es la base de cualquier plan de vida saludable.',
    pasos: [
      { ico:'fa-glass-water',   txt:'Bebe 1 vaso de agua al despertar, antes de cualquier alimento.' },
      { ico:'fa-clock',         txt:'Establece recordatorios cada 2 horas para beber agua durante el día.' },
      { ico:'fa-lemon',         txt:'Agrega rodajas de limón, pepino o menta para hacer el agua más apetecible.' },
      { ico:'fa-utensils',      txt:'Bebe un vaso de agua 20 minutos antes de cada comida principal.' },
      { ico:'fa-dumbbell',      txt:'Aumenta el consumo durante y después del ejercicio físico.' },
    ],
    datos: [
      { ico:'fa-droplet',   lbl:'Agua diaria recomendada', val:'2 – 3 litros' },
      { ico:'fa-percent',   lbl:'Del cuerpo es agua',       val:'60 – 70 %'   },
      { ico:'fa-fire',      lbl:'Mejora el metabolismo',    val:'30 %'         },
    ],
    tip: '<strong>Dato clave:</strong> La sed es una señal tardía de deshidratación. Cuando la sientes ya perdiste entre el 1–2 % de tu agua corporal. ¡Bebe antes de sentir sed!'
  },
  frutas: {
    ico:   'fa-apple-alt',
    color: '#6aab3a',
    titulo:'Frutas y Verduras',
    desc:  'Las frutas y verduras son la fuente más completa de vitaminas, minerales, fibra y antioxidantes que protegen al organismo de enfermedades crónicas. La OMS recomienda consumir al menos 400 g diarios (5 porciones) para reducir el riesgo cardiovascular y metabólico.',
    pasos: [
      { ico:'fa-rainbow',     txt:'Come frutas y verduras de distintos colores: cada color aporta nutrientes únicos.' },
      { ico:'fa-leaf',        txt:'Elige verduras de hoja verde oscura como espinaca, kale y brócoli varias veces a la semana.' },
      { ico:'fa-sun',         txt:'Prefiere la fruta entera en lugar de jugos para conservar la fibra.' },
      { ico:'fa-snowflake',   txt:'Las frutas congeladas sin azúcar conservan casi todos sus nutrientes.' },
      { ico:'fa-seedling',    txt:'Agrega vegetales crudos como snack: zanahoria, apio o pepino con hummus.' },
    ],
    datos: [
      { ico:'fa-apple-alt',  lbl:'Porciones diarias recomendadas', val:'5 al día'   },
      { ico:'fa-heart',      lbl:'Reducción riesgo cardíaco',       val:'hasta 30 %' },
      { ico:'fa-shield-alt', lbl:'Antioxidantes protectores',       val:'Miles'      },
    ],
    tip: '<strong>Truco:</strong> Usa el "método del arcoíris": intenta que en cada comida haya al menos 3 colores diferentes de frutas o verduras para maximizar la variedad de nutrientes.'
  },
  horarios: {
    ico:   'fa-clock',
    color: '#e0823a',
    titulo:'Horarios de Comida',
    desc:  'El cuerpo funciona con un reloj biológico llamado ritmo circadiano. Comer a horas regulares sincroniza ese reloj y optimiza la digestión, la absorción de nutrientes, los niveles de energía y el control del peso.',
    pasos: [
      { ico:'fa-sun',          txt:'Desayuna dentro de la primera hora después de despertar para activar el metabolismo.' },
      { ico:'fa-cloud-sun',    txt:'Almuerza entre las 12:00 y 14:00, la ventana de mayor capacidad digestiva.' },
      { ico:'fa-moon',         txt:'Cena ligero al menos 2 horas antes de dormir para favorecer el descanso.' },
      { ico:'fa-cookie-bite',  txt:'Si necesitas snacks, planifícalos a media mañana y media tarde.' },
      { ico:'fa-calendar-check', txt:'Sé constante: el cuerpo se adapta mejor a rutinas de horario fijo.' },
    ],
    datos: [
      { ico:'fa-clock',        lbl:'Horas entre comidas recomendadas', val:'3 – 4 h'  },
      { ico:'fa-utensils',     lbl:'Comidas principales al día',        val:'3 – 5'    },
      { ico:'fa-moon',         lbl:'Ayuno nocturno recomendado',        val:'10 – 12 h'},
    ],
    tip: '<strong>Consejo:</strong> Apaga las pantallas 30 minutos antes de comer. Comer sin distracciones mejora la conciencia sobre las señales de saciedad y reduce el consumo calórico hasta un 25 %.'
  },
  descanso: {
    ico:   'fa-moon',
    color: '#6b5ea8',
    titulo:'Descanso Reparador',
    desc:  'Dormir bien es tan importante como comer bien y hacer ejercicio. Durante el sueño el cuerpo repara tejidos, consolida la memoria, regula las hormonas del hambre (grelina y leptina) y fortalece el sistema inmunológico.',
    pasos: [
      { ico:'fa-moon',         txt:'Acuéstate y levántate siempre a la misma hora, incluso los fines de semana.' },
      { ico:'fa-mobile-alt',   txt:'Evita pantallas (teléfono, TV, tablet) al menos 1 hora antes de dormir.' },
      { ico:'fa-thermometer-half', txt:'Mantén la habitación fresca (18–20 °C) y oscura para mejor calidad de sueño.' },
      { ico:'fa-coffee',       txt:'Evita cafeína después de las 14:00 h para no interferir con el sueño nocturno.' },
      { ico:'fa-wind',         txt:'Practica respiración profunda o meditación de 5 minutos antes de dormir.' },
    ],
    datos: [
      { ico:'fa-clock',   lbl:'Horas de sueño recomendadas (adultos)', val:'7 – 9 h'  },
      { ico:'fa-weight',  lbl:'Relación con sobrepeso si duerme poco',  val:'×2 riesgo'},
      { ico:'fa-brain',   lbl:'Mejora de memoria con buen sueño',       val:'40 %'     },
    ],
    tip: '<strong>Ritual nocturno:</strong> Una infusión de manzanilla o valeriana 30 minutos antes de dormir, combinada con lectura tranquila, puede reducir el tiempo para conciliar el sueño en un 50 %.'
  },
  azucar: {
    ico:   'fa-ban',
    color: '#d94f4f',
    titulo:'Reduce el Azúcar',
    desc:  'El azúcar refinada añadida es el principal enemigo de la salud metabólica. Su consumo excesivo eleva la glucosa en sangre, favorece la inflamación crónica, contribuye al sobrepeso, caries dental y aumenta el riesgo de diabetes tipo 2 y enfermedades cardiovasculares.',
    pasos: [
      { ico:'fa-search',       txt:'Lee las etiquetas: el azúcar se esconde con más de 50 nombres (dextrosa, fructosa, jarabe, etc.).' },
      { ico:'fa-apple-alt',    txt:'Sustituye el postre azucarado por fruta fresca: aporta dulzor natural con fibra.' },
      { ico:'fa-water',        txt:'Reemplaza refrescos y jugos industriales por agua, infusiones o agua con frutas.' },
      { ico:'fa-bread-slice',  txt:'Prefiere pan y cereales integrales que no elevan el azúcar en sangre tan rápido.' },
      { ico:'fa-cookie',       txt:'Cuando cocines, reduce la cantidad de azúcar de las recetas en un 25–30 %: casi no se nota.' },
    ],
    datos: [
      { ico:'fa-cube',   lbl:'Máximo azúcar añadida al día (OMS)', val:'25 g (6 cucharitas)'  },
      { ico:'fa-can-food', lbl:'Azúcar promedio en un refresco 350 ml', val:'35–40 g'          },
      { ico:'fa-chart-line', lbl:'Reducción de riesgo diabetes',         val:'hasta 40 %'       },
    ],
    tip: '<strong>Alternativa dulce:</strong> Usa dátiles, plátano maduro o puré de manzana para endulzar postres caseros de forma natural. Aportan fibra, potasio y no elevan la glucosa abruptamente.'
  },
  porciones: {
    ico:   'fa-utensils',
    color: '#bc7f64',
    titulo:'Controla las Porciones',
    desc:  'El tamaño de las porciones es uno de los factores más determinantes en el control del peso y la salud metabólica. Aprender a reconocer las cantidades adecuadas sin necesidad de pesar cada alimento es una habilidad que se puede desarrollar fácilmente.',
    pasos: [
      { ico:'fa-hand-paper',   txt:'Usa tu mano como medida: una palma = proteína, un puño = carbohidratos, dos puños = verduras.' },
      { ico:'fa-circle',       txt:'Usa platos más pequeños: el cerebro percibe más cantidad y reduce el consumo automáticamente.' },
      { ico:'fa-pause',        txt:'Come despacio y haz pausas entre bocados. El cerebro tarda 20 min en registrar la saciedad.' },
      { ico:'fa-ban',          txt:'Evita comer directamente del paquete: sirve siempre en un plato o cuenco pequeño.' },
      { ico:'fa-chart-pie',    txt:'Divide visualmente el plato: 50 % verduras, 25 % proteína, 25 % carbohidratos.' },
    ],
    datos: [
      { ico:'fa-percent',  lbl:'Comemos más si el plato es grande',      val:'+22 %'  },
      { ico:'fa-clock',    lbl:'Tiempo para sentir saciedad',             val:'20 min' },
      { ico:'fa-weight',   lbl:'Reducción calórica con platos pequeños', val:'15–20 %'},
    ],
    tip: '<strong>Técnica Mindful Eating:</strong> Antes de servirte más, espera 10 minutos. En la mayoría de los casos la sensación de hambre desaparece cuando el cuerpo procesa lo que ya consumió.'
  },
  ultraprocesados: {
    ico:   'fa-leaf',
    color: '#5f663b',
    titulo:'Evita los Ultraprocesados',
    desc:  'Los alimentos ultraprocesados son formulaciones industriales con múltiples ingredientes artificiales: colorantes, conservantes, potenciadores de sabor, edulcorantes y grasas trans. Su consumo habitual está asociado a obesidad, inflamación, depresión y mayor mortalidad.',
    pasos: [
      { ico:'fa-search',       txt:'Identifica ultraprocesados: si tiene más de 5 ingredientes y no reconoces alguno, evítalo.' },
      { ico:'fa-store',        txt:'Compra en el perímetro del supermercado donde están los alimentos frescos y naturales.' },
      { ico:'fa-blender',      txt:'Prepara snacks caseros: frutos secos, frutas, palomitas sin aceite o yogur natural.' },
      { ico:'fa-calendar-alt', txt:'Planifica el menú semanal para evitar el impulso de comprar comida procesada de emergencia.' },
      { ico:'fa-tag',          txt:'Lee el semáforo nutricional: prioriza bajo en sodio, azúcar y grasas saturadas.' },
    ],
    datos: [
      { ico:'fa-percent',   lbl:'De la dieta occidental son ultraprocesados', val:'50–60 %' },
      { ico:'fa-heart',     lbl:'Mayor riesgo enf. cardiovascular',            val:'+12 %'   },
      { ico:'fa-shield-alt',lbl:'Aditivos artificiales promedio por producto', val:'15–20'   },
    ],
    tip: '<strong>Regla de oro:</strong> Si no puedes preparar ese alimento en tu casa con ingredientes reconocibles, probablemente sea ultraprocesado. Cocina en casa siempre que puedas.'
  },
  ejercicio: {
    ico:   'fa-running',
    color: '#bc7f64',
    titulo:'Muévete Cada Día',
    desc:  'La actividad física diaria es la inversión más rentable para tu salud. No hace falta ir al gimnasio: caminar, bailar, subir escaleras, estirarse o andar en bicicleta cuenta. El movimiento regular reduce el riesgo de más de 35 enfermedades crónicas.',
    pasos: [
      { ico:'fa-walking',      txt:'Empieza con 30 minutos de caminata diaria a paso moderado: suficiente para comenzar.' },
      { ico:'fa-stairs',       txt:'Sube escaleras en lugar de usar el ascensor siempre que puedas.' },
      { ico:'fa-clock',        txt:'Levántate y muévete 5 minutos por cada hora que pases sentado frente al escritorio.' },
      { ico:'fa-music',        txt:'Pon música animada al cocinar o limpiar: convierte las tareas cotidianas en actividad.' },
      { ico:'fa-dumbbell',     txt:'Agrega 2–3 sesiones de ejercicio de fuerza a la semana para mantener la masa muscular.' },
    ],
    datos: [
      { ico:'fa-clock',    lbl:'Actividad moderada recomendada/semana', val:'150 min'  },
      { ico:'fa-fire',     lbl:'Calorías quemadas caminando 30 min',    val:'150 kcal' },
      { ico:'fa-heart',    lbl:'Reducción riesgo cardíaco',              val:'35 %'     },
    ],
    tip: '<strong>Motivación:</strong> No busques la perfección, busca la constancia. 20 minutos todos los días es más efectivo que 2 horas una vez a la semana. ¡El hábito construye el resultado!'
  }
};

const consejoOverlay = document.getElementById('consejoModalOverlay');
const consejoInner   = document.getElementById('consejoModalInner');
const consejoClose   = document.getElementById('consejoModalClose');

function openConsejoModal(key) {
  const d = consejoData[key];
  if (!d) return;

  consejoInner.innerHTML = `
    <div class="modal-hero">
      <div class="modal-hero-ico" style="background:${d.color}"><i class="fas ${d.ico}"></i></div>
      <div>
        <h2 id="consejoModalTitle">${d.titulo}</h2>
      </div>
    </div>

    <p class="modal-desc">${d.desc}</p>

    <p class="modal-section-title"><i class="fas fa-list-check"></i> Cómo aplicarlo en tu vida diaria</p>
    <div class="modal-meals">
      ${d.pasos.map(p => `
        <div class="m-meal">
          <div class="m-meal-head"><i class="fas ${p.ico}"></i> Acción</div>
          <p>${p.txt}</p>
        </div>`).join('')}
    </div>

    <p class="modal-section-title"><i class="fas fa-chart-bar"></i> Datos que debes saber</p>
    <div class="modal-benefits" style="grid-template-columns:repeat(3,1fr); margin-bottom:24px;">
      ${d.datos.map(dt => `
        <div class="m-benefit" style="flex-direction:column; text-align:center; gap:6px; padding:18px 12px;">
          <i class="fas ${dt.ico}" style="font-size:1.3rem; color:${d.color}"></i>
          <span style="font-size:.72rem;color:var(--hierba);font-weight:600">${dt.lbl}</span>
          <strong style="font-size:1.05rem;color:var(--cacao)">${dt.val}</strong>
        </div>`).join('')}
    </div>

    <div class="modal-tip">${d.tip}</div>
  `;

  consejoOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeConsejoModal() {
  consejoOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-consejo').forEach(btn => {
  btn.addEventListener('click', () => openConsejoModal(btn.dataset.consejo));
});

consejoClose.addEventListener('click', closeConsejoModal);

consejoOverlay.addEventListener('click', e => {
  if (e.target === consejoOverlay) closeConsejoModal();
});

/* -------------------------------------------------------
   MODAL DE RECETAS
------------------------------------------------------- */
const recetaData = {
  ensalada: {
    ico:   'fa-leaf',
    color: '#4aaa5c',
    titulo: 'Ensalada Fresca',
    tiempo: '15 min', kcal: '180 kcal', nivel: 'Fácil',
    desc: 'Una ensalada colorida y llena de nutrientes con una mezcla de vegetales frescos, garbanzos y una vinagreta ligera de limón. Perfecta como almuerzo ligero o acompañamiento para cualquier plato principal.',
    ingredientes: [
      '2 tazas de hojas verdes mixtas (espinaca, lechuga, rúgula)',
      '1 taza de garbanzos cocidos escurridos',
      '1 zanahoria rallada',
      '½ pepino en rodajas',
      '10 tomates cherry partidos a la mitad',
      '¼ de aguacate en cubos',
      '2 cdas. de aceite de oliva extra virgen',
      'Jugo de 1 limón, sal y pimienta al gusto',
    ],
    pasos: [
      'Lavar y secar bien todas las hojas verdes y colocarlas en un tazón grande.',
      'Agregar los garbanzos, zanahoria, pepino, tomates cherry y aguacate.',
      'Mezclar el aceite de oliva con el jugo de limón, sal y pimienta para preparar la vinagreta.',
      'Verter la vinagreta justo antes de servir y mezclar suavemente.',
      'Servir inmediatamente para conservar la frescura de los vegetales.',
    ],
    datos: [
      { ico:'fa-fire',       lbl:'Calorías',       val:'180 kcal' },
      { ico:'fa-drumstick-bite', lbl:'Proteínas',  val:'8 g'      },
      { ico:'fa-bread-slice',lbl:'Carbohidratos',  val:'22 g'     },
    ],
    tip: '<strong>Pro tip:</strong> Agrega semillas de girasol o nueces tostadas para sumar grasas saludables y darle un toque crujiente sin necesidad de crutones.'
  },
  avena: {
    ico:   'fa-bowl-food',
    color: '#c08b3a',
    titulo: 'Bowl de Avena con Frutas',
    tiempo: '10 min', kcal: '320 kcal', nivel: 'Fácil',
    desc: 'Un desayuno completo y energizante que combina la fibra de la avena con la dulzura natural de las frutas de temporada y el poder antioxidante de los frutos rojos. Te mantendrá saciado por horas.',
    ingredientes: [
      '½ taza de copos de avena (no instantánea)',
      '1 taza de leche vegetal o de vaca',
      '1 cucharada de miel o dátil picado',
      '½ plátano en rodajas',
      '¼ taza de arándanos o fresas picadas',
      '1 cucharada de semillas de chía',
      '2 cdas. de mantequilla de almendra',
      '1 pizca de canela en polvo',
    ],
    pasos: [
      'Calentar la leche en una olla a fuego medio hasta que empiece a hervir.',
      'Agregar la avena y cocinar 5 minutos removiendo constantemente hasta obtener una textura cremosa.',
      'Retirar del fuego, añadir la miel y la canela, mezclar bien.',
      'Verter en un bowl y decorar con el plátano, arándanos y fresas.',
      'Terminar con las semillas de chía y la mantequilla de almendra encima.',
    ],
    datos: [
      { ico:'fa-fire',       lbl:'Calorías',       val:'320 kcal' },
      { ico:'fa-drumstick-bite', lbl:'Proteínas',  val:'11 g'     },
      { ico:'fa-bread-slice',lbl:'Carbohidratos',  val:'52 g'     },
    ],
    tip: '<strong>Versión nocturna:</strong> Prepara el "overnight oats": mezcla todos los ingredientes en un frasco la noche anterior y refrigera. Al despertar tendrás el desayuno listo sin encender el fuego.'
  },
  smoothie: {
    ico:   'fa-blender',
    color: '#9b3a8a',
    titulo: 'Smoothie Natural',
    tiempo: '5 min', kcal: '210 kcal', nivel: 'Fácil',
    desc: 'Un batido denso en nutrientes con frutos rojos ricos en antioxidantes, plátano para la cremosidad y espinaca para un boost de hierro. Sabor dulce y fresco que no te hace sentir que estás comiendo saludable.',
    ingredientes: [
      '1 plátano maduro congelado',
      '1 taza de frutos rojos mixtos congelados',
      '1 puñado de espinaca fresca (opcional, sin sabor)',
      '¾ taza de leche vegetal o de almendra',
      '1 cucharada de semillas de linaza molida',
      '1 dátil sin hueso para endulzar (opcional)',
    ],
    pasos: [
      'Colocar la leche en la licuadora primero para facilitar el licuado.',
      'Agregar la espinaca y licuar 30 segundos hasta que no queden trozos verdes.',
      'Añadir el plátano congelado y los frutos rojos.',
      'Agregar la linaza y el dátil si se usa.',
      'Licuar a velocidad alta 1 minuto hasta obtener una textura muy suave. Servir de inmediato.',
    ],
    datos: [
      { ico:'fa-fire',       lbl:'Calorías',       val:'210 kcal' },
      { ico:'fa-shield-alt', lbl:'Vitamina C',      val:'85 % VD'  },
      { ico:'fa-heart',      lbl:'Antioxidantes',   val:'Alto'     },
    ],
    tip: '<strong>Truco pro:</strong> Congela el plátano cuando esté muy maduro (manchado). El plátano congelado reemplaza al hielo, da más cremosidad y es más dulce que el fresco.'
  },
  wrap: {
    ico:   'fa-bread-slice',
    color: '#bc7f64',
    titulo: 'Wrap Saludable',
    tiempo: '20 min', kcal: '380 kcal', nivel: 'Medio',
    desc: 'Un wrap equilibrado con pollo a la plancha, vegetales frescos crujientes y una salsa de yogur con hierbas. Ideal para el almuerzo cuando necesitas algo completo, rápido y que sea fácil de llevar.',
    ingredientes: [
      '1 tortilla de trigo integral grande',
      '120 g de pechuga de pollo a la plancha en tiras',
      '¼ de aguacate en láminas',
      '¼ taza de pimiento rojo en juliana',
      '¼ taza de pepino en juliana',
      'Hojas de lechuga o espinaca baby',
      '3 cdas. de yogur griego natural',
      '1 cdita. de mostaza Dijon, sal y pimienta',
    ],
    pasos: [
      'Condimentar el pollo con sal, pimienta, ajo en polvo y orégano. Cocinar a la plancha 4 minutos por lado.',
      'Mezclar el yogur griego con la mostaza Dijon, sal y una pizca de pimienta para la salsa.',
      'Calentar la tortilla 30 segundos en una sartén seca para que sea más flexible.',
      'Extender la salsa de yogur por toda la tortilla dejando 2 cm en los bordes.',
      'Colocar la lechuga, luego el pollo, el aguacate, pimiento y pepino. Enrollar bien apretado y cortar al medio.',
    ],
    datos: [
      { ico:'fa-fire',           lbl:'Calorías',     val:'380 kcal' },
      { ico:'fa-drumstick-bite', lbl:'Proteínas',    val:'34 g'     },
      { ico:'fa-bread-slice',    lbl:'Carbohidratos',val:'38 g'     },
    ],
    tip: '<strong>Para llevar:</strong> Envuelve el wrap terminado en papel film bien ajustado. Se conserva 4 horas a temperatura ambiente y hasta 24 h refrigerado sin perder su textura.'
  },
  pollo: {
    ico:   'fa-drumstick-bite',
    color: '#e0823a',
    titulo: 'Pollo con Vegetales',
    tiempo: '35 min', kcal: '420 kcal', nivel: 'Medio',
    desc: 'Pechuga de pollo jugosa marinada en especias antiinflamatorias acompañada de una colorida mezcla de vegetales salteados. Un plato completo, alto en proteínas y rico en micronutrientes esenciales.',
    ingredientes: [
      '200 g de pechuga de pollo sin hueso',
      '1 taza de brócoli en floretes',
      '1 zanahoria en rodajas',
      '½ pimiento rojo en cubos',
      '½ taza de ejotes o judías verdes',
      '2 dientes de ajo picados',
      '2 cdas. de aceite de oliva',
      'Cúrcuma, comino, sal, pimienta y paprika ahumada al gusto',
    ],
    pasos: [
      'Marinar el pollo 10 minutos con las especias, ajo y 1 cda. de aceite.',
      'Sellar el pollo en sartén a fuego alto 4 minutos por lado hasta dorar. Reservar y dejar reposar.',
      'En la misma sartén con el aceite restante, saltear zanahoria y brócoli 5 minutos a fuego medio-alto.',
      'Agregar el pimiento y ejotes, saltear 3 minutos más hasta que estén al dente.',
      'Cortar el pollo en tiras, incorporar a los vegetales, mezclar 1 minuto y servir caliente.',
    ],
    datos: [
      { ico:'fa-fire',           lbl:'Calorías',     val:'420 kcal' },
      { ico:'fa-drumstick-bite', lbl:'Proteínas',    val:'48 g'     },
      { ico:'fa-leaf',           lbl:'Fibra',        val:'7 g'      },
    ],
    tip: '<strong>Mejora el sabor:</strong> Añadir una cucharadita de cúrcuma no solo da color dorado sino que aporta curcumina, uno de los antiinflamatorios naturales más potentes conocidos.'
  },
  tostadas: {
    ico:   'fa-bread-slice',
    color: '#5f663b',
    titulo: 'Tostadas con Aguacate',
    tiempo: '10 min', kcal: '290 kcal', nivel: 'Fácil',
    desc: 'El clásico revisitado: tostadas de pan integral con aguacate cremoso sazonado, huevo pochado y una pizca de chili en copos. Desayuno o merienda completa con grasas buenas, proteína y carbohidratos de calidad.',
    ingredientes: [
      '2 rebanadas de pan integral de masa madre o multigrano',
      '1 aguacate maduro',
      '2 huevos grandes',
      'Jugo de ½ limón',
      'Sal de mar y pimienta negra recién molida',
      '1 cdita. de vinagre blanco (para el pochado)',
      'Chili en copos o páprika ahumada al gusto',
      'Hojas de cilantro o albahaca fresca para decorar',
    ],
    pasos: [
      'Tostar el pan hasta que esté dorado y crujiente.',
      'Machacar el aguacate con un tenedor, añadir jugo de limón, sal y pimienta hasta obtener una pasta gruesa.',
      'Para pochado: hervir agua con vinagre, crear un remolino y deslizar el huevo suavemente. Cocinar 3 minutos.',
      'Extender generosamente el aguacate sobre cada tostada.',
      'Colocar el huevo pochado encima, sazonar con chili en copos y decorar con hierbas frescas.',
    ],
    datos: [
      { ico:'fa-fire',       lbl:'Calorías',       val:'290 kcal' },
      { ico:'fa-drumstick-bite', lbl:'Proteínas',  val:'14 g'     },
      { ico:'fa-heart',      lbl:'Grasas saludables', val:'18 g'  },
    ],
    tip: '<strong>Elige bien el pan:</strong> Busca que el primer ingrediente sea "harina integral" (no "enriquecida"). Un pan de verdad integral tiene mínimo 3 g de fibra por rebanada.'
  }
};

const recetaOverlay = document.getElementById('recetaModalOverlay');
const recetaInner   = document.getElementById('recetaModalInner');
const recetaClose   = document.getElementById('recetaModalClose');

function openRecetaModal(key) {
  const d = recetaData[key];
  if (!d) return;

  const nivelClass = d.nivel === 'Fácil' ? 'facil' : 'medio';

  recetaInner.innerHTML = `
    <div class="modal-hero">
      <div class="modal-hero-ico" style="background:${d.color}"><i class="fas ${d.ico}"></i></div>
      <div>
        <h2 id="recetaModalTitle">${d.titulo}</h2>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;">
          <span class="receta-nivel ${nivelClass}" style="position:static;">${d.nivel}</span>
          <span style="font-size:.82rem;color:var(--hierba);font-weight:700;display:flex;align-items:center;gap:5px;"><i class="fas fa-clock" style="color:${d.color}"></i>${d.tiempo}</span>
          <span style="font-size:.82rem;color:var(--hierba);font-weight:700;display:flex;align-items:center;gap:5px;"><i class="fas fa-fire" style="color:${d.color}"></i>${d.kcal}</span>
        </div>
      </div>
    </div>

    <p class="modal-desc">${d.desc}</p>

    <p class="modal-section-title"><i class="fas fa-basket-shopping"></i> Ingredientes</p>
    <ul style="list-style:none;padding:0;margin:0 0 24px;display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;">
      ${d.ingredientes.map(ing => `
        <li style="display:flex;align-items:flex-start;gap:8px;font-size:.88rem;color:var(--cacao);">
          <i class="fas fa-circle-check" style="color:${d.color};margin-top:3px;flex-shrink:0;font-size:.75rem;"></i>${ing}
        </li>`).join('')}
    </ul>

    <p class="modal-section-title"><i class="fas fa-list-ol"></i> Preparación</p>
    <div class="modal-meals" style="margin-bottom:24px;">
      ${d.pasos.map((p, i) => `
        <div class="m-meal">
          <div class="m-meal-head" style="color:${d.color}"><span style="background:${d.color};color:#fff;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800;margin-right:6px;">${i + 1}</span> Paso ${i + 1}</div>
          <p>${p}</p>
        </div>`).join('')}
    </div>

    <p class="modal-section-title"><i class="fas fa-chart-bar"></i> Información nutricional</p>
    <div class="modal-benefits" style="grid-template-columns:repeat(3,1fr);margin-bottom:24px;">
      ${d.datos.map(dt => `
        <div class="m-benefit" style="flex-direction:column;text-align:center;gap:6px;padding:18px 12px;">
          <i class="fas ${dt.ico}" style="font-size:1.3rem;color:${d.color}"></i>
          <span style="font-size:.72rem;color:var(--hierba);font-weight:600">${dt.lbl}</span>
          <strong style="font-size:1.05rem;color:var(--cacao)">${dt.val}</strong>
        </div>`).join('')}
    </div>

    <div class="modal-tip">${d.tip}</div>
  `;

  recetaOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRecetaModal() {
  recetaOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.btn-recipe[data-receta]').forEach(btn => {
  btn.addEventListener('click', () => openRecetaModal(btn.dataset.receta));
});

recetaClose.addEventListener('click', closeRecetaModal);

recetaOverlay.addEventListener('click', e => {
  if (e.target === recetaOverlay) closeRecetaModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeConsejoModal(); closePlanModal(); closeRecetaModal(); }
});

/* -------------------------------------------------------
   7. RECETA BUTTONS – feedback visual
------------------------------------------------------- */
document.querySelectorAll('.btn-recipe').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ ¡Guardada!';
    btn.style.background = 'var(--oliva)';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 1600);
  });
});

/* -------------------------------------------------------
   8. CALCULADORA DE OBJETIVOS
------------------------------------------------------- */
const recomendaciones = {
  peso: {
    ico:   'fa-scale-balanced',
    titulo:'Bajar de Peso',
    texto: 'Prioriza alimentos naturales y controla tus porciones. Incluye más proteínas y fibra para mantener la saciedad, reduce los ultraprocesados y azúcares, toma suficiente agua y combina caminatas diarias con ejercicios de fuerza 3-4 veces por semana.',
    tags:  ['Proteínas', 'Fibra', 'Caminatas', 'Fuerza', 'Agua', 'Porciones']
  },
  mantener: {
    ico:   'fa-bullseye',
    titulo:'Mantener Peso',
    texto: 'Mantén un balance calórico adecuado consumiendo alimentos variados de todos los grupos. Combina actividad física moderada 3-5 veces por semana con horarios de comida regulares y una buena hidratación diaria.',
    tags:  ['Balance', 'Variedad', 'Moderación', 'Rutina', 'Hidratación']
  },
  energia: {
    ico:   'fa-bolt',
    titulo:'Ganar Energía',
    texto: 'Incluye carbohidratos complejos saludables como avena, arroz integral y legumbres. Suma frutas, frutos secos y proteínas magras a tu dieta. Realiza actividad física moderada por las mañanas para activar tu cuerpo y mente desde temprano.',
    tags:  ['Avena', 'Frutas', 'Frutos secos', 'Carbohidratos', 'Proteínas', 'Mañana']
  },
  habitos: {
    ico:   'fa-seedling',
    titulo:'Mejorar Hábitos',
    texto: 'Empieza con pequeños cambios consistentes: bebe 8 vasos de agua al día, agrega una porción de verduras en cada comida, reduce el azúcar y los ultraprocesados. Establece horarios regulares de comida y sueño. La constancia es la clave.',
    tags:  ['Agua', 'Verduras', 'Sin azúcar', 'Horarios', 'Sueño', 'Consistencia']
  },
  actividad: {
    ico:   'fa-person-running',
    titulo:'Aumentar Actividad Física',
    texto: 'Comienza con 30 minutos de caminata diaria y aumenta la intensidad progresivamente. Combina cardio con ejercicios de fuerza. Asegúrate de consumir suficientes proteínas e hidratos antes y después del ejercicio, y descansa adecuadamente.',
    tags:  ['Cardio', 'Fuerza', 'Proteínas', 'Hidratación', 'Progresivo', 'Descanso']
  }
};

const objBtns = document.querySelectorAll('.obj-btn');
const recBox  = document.getElementById('recBox');

objBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    objBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    mostrarRecomendacion(recomendaciones[btn.dataset.obj]);
  });
});

function mostrarRecomendacion(rec) {
  /* Fade-out */
  recBox.style.opacity = '0';
  recBox.style.transform = 'translateY(12px)';

  setTimeout(() => {
    recBox.innerHTML = `
      <div class="rec-content">
        <div class="rec-head">
          <div class="rec-ico-big"><i class="fas ${rec.ico}"></i></div>
          <h3>${rec.titulo}</h3>
        </div>
        <p class="rec-text">${rec.texto}</p>
        <div class="rec-tags">
          ${rec.tags.map(t => `<span class="rtag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    recBox.style.transition = 'opacity .4s ease, transform .4s ease, border-color .4s ease';
    recBox.style.opacity    = '1';
    recBox.style.transform  = 'translateY(0)';
    recBox.style.borderColor = 'var(--oliva)';
  }, 220);
}

/* -------------------------------------------------------
   9. NEWSLETTER
------------------------------------------------------- */
const nwInput = document.getElementById('nwInput');
const nwBtn   = document.getElementById('nwBtn');

if (nwBtn) {
  nwBtn.addEventListener('click', () => {
    const val = nwInput.value.trim();
    if (val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      nwBtn.innerHTML = '<i class="fas fa-check"></i>';
      nwBtn.style.background = 'var(--hierba)';
      nwInput.value = '';
      setTimeout(() => {
        nwBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        nwBtn.style.background = '';
      }, 2200);
    } else {
      nwInput.classList.add('shake');
      setTimeout(() => nwInput.classList.remove('shake'), 480);
    }
  });

  /* Also submit on Enter */
  nwInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') nwBtn.click();
  });
}

/* Shake keyframe injected via JS */
const shakeCSS = document.createElement('style');
shakeCSS.textContent = `
  @keyframes shakeAnim {
    0%,100%{ transform:translateX(0); }
    20%,60%{ transform:translateX(-5px); }
    40%,80%{ transform:translateX(5px); }
  }
  .shake{ animation:shakeAnim .45s ease; }
`;
document.head.appendChild(shakeCSS);

/* -------------------------------------------------------
   10. INITIAL TRIGGER ON LOAD
------------------------------------------------------- */
window.addEventListener('load', () => {
  revealElements();
  revealBars();
  updateActiveLink();
});
