export type Copy = {
  announcement: string
  address: string
  hours: string
  footer: string
  copyright: string
  seoTitle: string
  seoDescription: string
  hero: { eyebrow: string; title: string; description: string }[]
  promos: { title: string; description: string }[]
  about: { eyebrow: string; title: string; paragraphs: string[] }
  editorial: { eyebrow: string; title: string; paragraphs: string[] }
  pillars: { title: string; text: string }[]
  process: { title: string; description: string }[]
  why: { title: string; description: string }[]
  stats: string[]
  finalCta: { eyebrow: string; title: string; description: string }
  categories: { name: string; description: string }[]
  products: {
    name: string
    summary: string
    features: string[]
    specs: [string, string][]
    paragraph: string
  }[]
  services: { title: string; summary: string; features: string[]; paragraph: string }[]
  projects: { title: string; summary: string; location: string; paragraphs: string[] }[]
  posts: { title: string; excerpt: string; category: string; paragraphs: string[] }[]
  testimonials: { name: string; role: string; review: string }[]
  team: { name: string; position: string; description: string }[]
  faqs: { question: string; answer: string }[]
  partners: string[]
}

const categoriesEn: Copy['categories'] = [
  { name: 'Electric Curtains', description: 'Lined drapes on a quiet motor, opened from a switch or a schedule.' },
  { name: 'Wave Curtains', description: 'A continuous fold that falls in even waves from a discreet track.' },
  { name: 'Roller Blinds', description: 'A clean plane of cloth for rooms that want shade without volume.' },
  { name: 'Roman Blinds', description: 'Soft stacked folds that lift clear of the glass when the light is wanted.' },
  { name: 'Zebra Blinds', description: 'Alternating sheer and solid bands for privacy you can tune.' },
  { name: 'Wooden Blinds', description: 'Timber slats that filter sun and warm the line of the window.' },
  { name: 'Vertical Blinds', description: 'A practical vane for wide openings, sliding doors, and offices.' },
  { name: 'American Curtains', description: 'Tailored pleats with the weight and rhythm of classic drapery.' },
  { name: 'Custom Curtains', description: 'A heading, cloth, and lining composed for one window only.' },
]

export const en: Copy = {
  announcement: 'Complimentary atelier consultation — visits by appointment',
  address: 'Showroom visits by appointment',
  hours: 'Sunday – Thursday, 10:00 – 19:00',
  footer:
    'Merzo Crist designs, makes, and installs curtains and blinds for homes and hospitality rooms that care about light.',
  copyright: '© Merzo Crist. All rights reserved.',
  seoTitle: 'Merzo Crist — Curtains & Interior Décor',
  seoDescription:
    'Made-to-measure curtains, blinds, and installation for refined interiors. Book a complimentary consultation with Merzo Crist.',
  hero: [
    {
      eyebrow: 'Made to measure',
      title: 'Curtains shaped around the light in the room.',
      description:
        'We design, sew, and install window treatments for homes that prefer quiet luxury to decoration.',
    },
    {
      eyebrow: 'Electric curtains',
      title: 'Soft cloth. A quiet motor. A room that closes itself.',
      description:
        'Concealed tracks and lined fabric, opened from a switch or left to follow the day.',
    },
    {
      eyebrow: 'The atelier',
      title: 'From the first measurement to the final fold.',
      description:
        'We visit with cloth, not a guess. The heading, the lining, and the hardware are decided on site.',
    },
  ],
  promos: [
    {
      title: 'The cloth collection',
      description: 'Linens, wools, and sheers chosen for how they take light, not only for colour.',
    },
    {
      title: 'Cut for the window',
      description: 'Every drop, return, and heading is made for the opening it will live on.',
    },
    {
      title: 'Installed by our team',
      description: 'The people who measured the room come back to hang the work.',
    },
    {
      title: 'A consultation, without obligation',
      description: 'Tell us about the room. We will bring samples and a clear way forward.',
    },
  ],
  about: {
    eyebrow: 'The house',
    title: 'A curtain studio for rooms that are already well considered.',
    paragraphs: [
      'Merzo Crist is a house for made-to-measure curtains and blinds. We work with the architecture first: the height of the ceiling, the path of the sun, and the way a room is used.',
      'Cloth is chosen for hand and light. Hardware is kept quiet. The result should feel as if it had always belonged to the window.',
    ],
  },
  editorial: {
    eyebrow: 'Material',
    title: 'Elegance is mostly a matter of proportion.',
    paragraphs: [
      'A drape is only as good as its drop, its weight, and the shadow it throws at four in the afternoon. We spend our time on those things.',
      'Colour comes after the room has told us how much privacy, darkening, and softness it needs.',
    ],
  },
  pillars: [
    { title: 'Philosophy', text: 'Restraint, honest materials, and light treated as part of the design.' },
    { title: 'Craft', text: 'Headings, hems, and linings sewn for the life of the cloth, not a season.' },
    { title: 'Materials', text: 'Linens, wools, textured weaves, and sheers selected in the hand.' },
    { title: 'Care', text: 'One team from the visit to the installation, and a line you can call afterwards.' },
  ],
  process: [
    { title: 'Submit your request', description: 'Share the room, the window, and how you want it to feel. We confirm a time to visit.' },
    { title: 'Consultation and visit', description: 'We come with cloth and talk through light, privacy, and the architecture of the opening.' },
    { title: 'Accurate measurement', description: 'Drops, widths, and hardware are measured so the heading sits exactly where it should.' },
    { title: 'Making and installation', description: 'The work is sewn to order, then fitted and dressed by our own installers.' },
  ],
  why: [
    { title: 'Premium cloth', description: 'Fabrics chosen for drape, density, and the way they age in daylight.' },
    { title: 'Custom design', description: 'Heading, lining, and hardware composed for a single opening.' },
    { title: 'A professional team', description: 'Design, sewing, and installation stay inside the house.' },
    { title: 'A free consultation', description: 'An on-site visit to look at the room before anything is made.' },
    { title: 'Careful installation', description: 'Tracks, motors, and hems finished so the window looks resolved.' },
    { title: 'Aftercare', description: 'Advice on cleaning, adjustment, and the occasional repair.' },
  ],
  stats: ['Completed projects', 'Clients welcomed', 'Years in the atelier', 'Installations finished'],
  finalCta: {
    eyebrow: 'Begin',
    title: 'Bring the cloth to the window.',
    description: 'Book a complimentary consultation. We will measure, advise, and leave you with a clear proposal.',
  },
  categories: categoriesEn,
  products: [
    {
      name: 'Sera Wave in Oat',
      summary: 'A linen-blend wave with a low, even ripple and a soft matte face.',
      features: ['Wave heading on a ceiling or wall track', 'Optional blackout lining', 'Made to your exact drop'],
      specs: [['Heading', 'Wave'], ['Cloth', 'Linen blend'], ['Light', 'Filtered']],
      paragraph: 'Sera is for rooms that want the calm of a continuous fold. The oat tone sits quietly against stone, oak, and plaster.',
    },
    {
      name: 'Nocturne Electric',
      summary: 'A lined drape on a concealed motor, for bedrooms and formal living rooms.',
      features: ['Quiet motor and concealed track', 'Switch or scheduled control', 'Blackout or dimout lining'],
      specs: [['Heading', 'Ripple or pleat'], ['Control', 'Electric'], ['Lining', 'Blackout']],
      paragraph: 'Nocturne closes a room without theatre. The motor is specified with the track so the fabric still falls as cloth, not as a gadget.',
    },
    {
      name: 'Alba Roller in Stone',
      summary: 'A tailored roller for studies, kitchens, and windows that want a clean plane.',
      features: ['Cassette and side channels available', 'Screen or blackout cloth', 'Precise chain or motor'],
      specs: [['Style', 'Roller'], ['Cloth', 'Screen'], ['Light', 'Glare control']],
      paragraph: 'Alba keeps the glass readable. It is the right companion when a heavier drape would crowd the room.',
    },
    {
      name: 'Palazzo Roman in Sand',
      summary: 'Stacked soft folds in a warm sand cloth, lifted clear when the sun is welcome.',
      features: ['Relaxed or tailored stack', 'Lined for body', 'Cord or motor lift'],
      specs: [['Style', 'Roman'], ['Cloth', 'Textured weave'], ['Light', 'Softened']],
      paragraph: 'Palazzo suits bedrooms and dining rooms where the window should feel upholstered rather than shaded.',
    },
    {
      name: 'Linea Zebra',
      summary: 'Sheer and solid bands that shift to tune privacy through the day.',
      features: ['Dual-layer cloth', 'Day and night positions', 'Slim cassette'],
      specs: [['Style', 'Zebra'], ['Privacy', 'Adjustable'], ['Light', 'Layered']],
      paragraph: 'Linea is for apartments and street-facing rooms that need both a view and a way to close it.',
    },
    {
      name: 'Oak Slat',
      summary: 'Timber venetian blinds with a warm grain and a slim ladder.',
      features: ['Real timber slats', 'Tilt for privacy', 'Stained to the joinery'],
      specs: [['Style', 'Wooden blind'], ['Material', 'Timber'], ['Light', 'Directed']],
      paragraph: 'Oak Slat belongs beside walnut and oak furniture, where a fabric blind would feel too soft.',
    },
    {
      name: 'Gallery Vertical',
      summary: 'Wide vanes for sliding doors and long commercial openings.',
      features: ['Fabric or dimout vanes', 'Wand or cord traverse', 'Made to the full width'],
      specs: [['Style', 'Vertical'], ['Use', 'Wide openings'], ['Light', 'Controlled']],
      paragraph: 'Gallery keeps a long run of glass orderly. The vane width is chosen so the rhythm matches the mullions.',
    },
    {
      name: 'Maison Pleat',
      summary: 'An American-style tailored pleat with weight in the hem and a formal fall.',
      features: ['Double or triple pleat', 'Weighted hem', 'Optional interlining'],
      specs: [['Heading', 'Tailored pleat'], ['Cloth', 'Wool blend'], ['Light', 'Dressed']],
      paragraph: 'Maison is the formal drape: reception rooms, tall windows, and anywhere the heading should read as tailoring.',
    },
    {
      name: 'Atelier Sheer',
      summary: 'A custom sheer, alone or layered behind a heavier curtain.',
      features: ['Privacy with daylight', 'Wave or pocket heading', 'Paired with any collection drape'],
      specs: [['Heading', 'To order'], ['Cloth', 'Sheer'], ['Light', 'Diffused']],
      paragraph: 'Atelier Sheer is cut when the room needs daylight that is soft, and a second layer for evening.',
    },
  ],
  services: [
    {
      title: 'Free measurement',
      summary: 'A visit to measure the opening and look at the light before any cloth is ordered.',
      features: ['On-site measuring', 'Notes on sun and privacy', 'A written record of each window'],
      paragraph: 'We measure twice and photograph the opening so the workroom is not guessing from a number on a page.',
    },
    {
      title: 'Custom curtain design',
      summary: 'Heading, cloth, lining, and hardware chosen for the room rather than from a fixed set.',
      features: ['Samples in the room', 'Heading and proportion studies', 'A clear proposal'],
      paragraph: 'Design here means decisions: how high the track sits, how full the cloth is, and what the window does at night.',
    },
    {
      title: 'Curtain making',
      summary: 'Sewing, lining, and finishing in the workroom, to the measurements we took.',
      features: ['Patterned to your drop', 'Linings and interlinings', 'Hardware prepared with the cloth'],
      paragraph: 'Nothing is altered from a stock size. The hem, the heading tape, and the returns are made for that opening.',
    },
    {
      title: 'Professional installation',
      summary: 'Tracks, motors, and blinds fitted, then dressed so the folds sit correctly.',
      features: ['Our own installers', 'Motors commissioned on site', 'A final dress of the cloth'],
      paragraph: 'Installation is part of the making. A well-sewn curtain still fails if the track is out of level.',
    },
    {
      title: 'Maintenance and support',
      summary: 'Adjustment, cleaning advice, and repair after the work is in the room.',
      features: ['Hem and track adjustments', 'Care instructions', 'Repair of worn headings'],
      paragraph: 'Cloth moves, houses settle, and motors need a look from time to time. We stay available.',
    },
    {
      title: 'Interior consultation',
      summary: 'Help choosing a treatment when the rest of the room is still being decided.',
      features: ['Coordination with your finishes', 'Layering sheers and drapes', 'Advice for several rooms'],
      paragraph: 'Useful when an architect or a household wants the windows resolved before furniture is placed.',
    },
  ],
  projects: [
    {
      title: 'Palm Court living room',
      summary: 'Floor-to-ceiling wave curtains in a tall living room with afternoon sun.',
      location: 'Private residence',
      paragraphs: [
        'The windows run almost the full height of the room. A wave heading keeps the cloth light enough for the architecture and full enough for privacy at dusk.',
        'The linen is a warm oat, lined so the street disappears without turning the room dark at noon.',
      ],
    },
    {
      title: 'Hotel lounge sheers',
      summary: 'Layered sheers and dimout drapes for a hospitality lounge.',
      location: 'Hospitality lounge',
      paragraphs: [
        'The brief was daylight for breakfast and a closed, quiet room for evening service.',
        'A sheer sits on the glass. A heavier dimout, on a second track, is drawn only when the lounge changes mood.',
      ],
    },
    {
      title: 'North gallery',
      summary: 'Roller screens on a long run of gallery glass.',
      location: 'Private gallery',
      paragraphs: [
        'Art on the opposite wall needed the sun taken down without losing the view of the court.',
        'Stone-coloured screen cloth in slim cassettes keeps the mullions visible and the glare off the work.',
      ],
    },
    {
      title: 'Linen bedroom suite',
      summary: 'Blackout romans and a sheer for a principal bedroom.',
      location: 'Private residence',
      paragraphs: [
        'Sleep asked for a true darkening. The roman blind stacks above the frame so the morning can still be invited in.',
        'A sheer remains for the hours when the room should feel open but not exposed.',
      ],
    },
    {
      title: 'Courtyard house',
      summary: 'Wooden blinds on courtyard doors, with a soft curtain for winter.',
      location: 'Private residence',
      paragraphs: [
        'The doors face a planted court. Timber slats tilt against the high sun and still show the garden.',
        'A separate curtain, hung wide of the frame, is there for cooler evenings.',
      ],
    },
    {
      title: 'Evening reception',
      summary: 'Tailored pleat drapes for a formal reception room.',
      location: 'Reception room',
      paragraphs: [
        'The ceiling is high and the windows are paired. A triple pleat gives the heading the weight the room was asking for.',
        'Interlining keeps the fall straight and the street silent.',
      ],
    },
  ],
  posts: [
    {
      title: 'How to choose a heading for a tall window',
      excerpt: 'Pleat, wave, or eyelet is not a matter of taste alone. The height of the room decides first.',
      category: 'Design notes',
      paragraphs: [
        'On a tall window, the heading is the first thing the eye meets. A pinched pleat reads as tailoring. A wave reads as a continuous surface. An eyelet is rarely quiet enough for a formal room.',
        'Fullness matters as much as the style. Too little cloth and the heading looks starved. Too much and the stack covers the glass you meant to keep.',
        'We usually begin by standing at the doorway, not at the window. The heading has to work from the place the room is entered.',
      ],
    },
    {
      title: 'Layering a sheer with a drape',
      excerpt: 'Two cloths on two tracks give a room a day face and an evening face.',
      category: 'Materials',
      paragraphs: [
        'A sheer alone is rarely enough for a street, and a heavy curtain alone can make a room feel shut in the morning. The useful answer is often both.',
        'The sheer belongs closest to the glass. The drape hangs on a second track, clear of the first, so neither cloth fights the other when they are drawn.',
        'Choose the sheer for privacy in daylight, not for colour. The drape can then carry the deeper tone.',
      ],
    },
    {
      title: 'What a made-to-measure installation includes',
      excerpt: 'Measuring, making, and hanging are one piece of work. This is what happens between the visit and the finished window.',
      category: 'Atelier',
      paragraphs: [
        'After the consultation we leave with measurements, photographs, and a note of how the sun moves. The proposal names the cloth, the heading, the lining, and the hardware.',
        'The workroom cuts to those figures. Nothing is taken from a standard drop and altered on site if it can be avoided.',
        'Installation covers the track or the blind, the motor if there is one, and a last dressing of the folds. We do not consider the window finished until the hem is level and the stack is even.',
      ],
    },
  ],
  testimonials: [
    {
      name: 'Merzo Crist',
      role: 'Atelier note',
      review:
        'A tall window wants fullness, but not so much that the stack covers the glass. We judge the heading from the doorway, not from the swatch.',
    },
    {
      name: 'Merzo Crist',
      role: 'Fitting note',
      review:
        'The sheer belongs on the glass. The drape hangs on a second track, clear of the first, so the room has a day face and an evening face.',
    },
    {
      name: 'Merzo Crist',
      role: 'Installation note',
      review:
        'A well-sewn curtain still fails if the track is out of level. We do not call the window finished until the hem is even.',
    },
  ],
  team: [
    { name: 'Amira El-Sayed', position: 'Design director', description: 'Leads cloth selection and the proportion of each heading. ' },
    { name: 'Karim Nassar', position: 'Head of installation', description: 'Responsible for tracks, motors, and the final dress of the cloth. ' },
    { name: 'Leila Farouk', position: 'Fabric specialist', description: 'Keeps the cloth library and matches linings to light. ' },
    { name: 'Omar Haddad', position: 'Client atelier', description: 'Arranges visits and keeps the proposal clear. ' },
  ],
  faqs: [
    { question: 'Which curtain and blind types can you make?', answer: 'Wave, tailored pleat, and eyelet curtains, plus roller, Roman, zebra, wooden, and vertical blinds. Electric versions are available where the opening allows a motor.' },
    { question: 'Can the cloth and heading be fully custom?', answer: 'Yes. Heading, fullness, lining, and hardware are specified for the window. You can also bring a cloth for us to review before it is made.' },
    { question: 'How do you measure?', answer: 'We measure on site. Width, drop, ceiling height, and obstacles such as radiators or handles are recorded before anything is cut.' },
    { question: 'Who installs the work?', answer: 'Our own installers fit the track or blind, commission motors, and dress the folds. We do not hand the last step to a separate crew.' },
    { question: 'How long does making and fitting take?', answer: 'It depends on the cloth and the number of windows. After measuring, we confirm a making period and an installation day in the proposal.' },
    { question: 'How should the curtains be cared for?', answer: 'We leave written care for the cloth you chose: vacuuming, professional cleaning, and what not to do with linings and motors.' },
    { question: 'How do I book a consultation?', answer: 'Use the consultation form, call, or send a WhatsApp message. Tell us the area and the rooms, and we will propose a time to visit.' },
  ],
  partners: ['Vela Atelier', 'Lumen Textiles', 'Casa Nera', 'Form & Fold', 'Atelier Sable', 'Linea House'],
}

export const ar: Copy = {
  announcement: 'استشارة مجانية في المحترف — الزيارة بموعد',
  address: 'زيارة المعرض بموعد مسبق',
  hours: 'الأحد – الخميس، ١٠:٠٠ – ١٩:٠٠',
  footer: 'تصمّم ميرزو كريست الستائر والتعتيم وتفصّلها وتركّبها للمنازل وغرف الضيافة التي يهمّها الضوء.',
  copyright: '© ميرزو كريست. جميع الحقوق محفوظة.',
  seoTitle: 'ميرزو كريست — ستائر وديكور داخلي',
  seoDescription: 'ستائر ومعالجات نوافذ تُفصَّل حسب المقاس، مع تركيب متقن. احجز استشارة مجانية مع ميرزو كريست.',
  hero: [
    {
      eyebrow: 'تفصيل حسب المقاس',
      title: 'ستائر تُشكَّل حول ضوء الغرفة.',
      description: 'نصمّم ونخيط ونركّب معالجات النوافذ لمنازل تفضّل الفخامة الهادئة على الزينة.',
    },
    {
      eyebrow: 'ستائر كهربائية',
      title: 'قماش ناعم. محرّك هادئ. غرفة تُغلق نفسها.',
      description: 'مسارات مخفية وقماش مبطّن، تُفتح بمفتاح أو تُترك لتتبع النهار.',
    },
    {
      eyebrow: 'المحترف',
      title: 'من أول قياس إلى آخر طيّة.',
      description: 'نزور ومعنا القماش لا التخمين. نقرّر شكل الرأس والبطانة والتثبيت في المكان.',
    },
  ],
  promos: [
    { title: 'مجموعة الأقمشة', description: 'كتان وصوف وشيفون تُختار لطريقة التقاطها للضوء، لا للون وحده.' },
    { title: 'قصّة النافذة', description: 'كل طول وعرض وطريقة تعليق تُصنع للفتحة التي ستعيش عليها.' },
    { title: 'تركيب بأيدينا', description: 'من قاس الغرفة يعود ليعلّق العمل.' },
    { title: 'استشارة بلا التزام', description: 'حدّثونا عن الغرفة. نحضر العيّنات وطريقًا واضحًا.' },
  ],
  about: {
    eyebrow: 'الدار',
    title: 'محترف ستائر للغرف المدروسة أصلًا.',
    paragraphs: [
      'ميرزو كريست دار للستائر والتعتيم المفصّلة حسب المقاس. نبدأ بالعمارة: ارتفاع السقف، ومسار الشمس، وطريقة استخدام الغرفة.',
      'يُختار القماش لملمسه وضوئه. ويبقى التثبيت هادئًا. النتيجة يجب أن تبدو كأنها كانت دائمًا جزءًا من النافذة.',
    ],
  },
  editorial: {
    eyebrow: 'الخامة',
    title: 'الأناقة في أغلبها مسألة تناسب.',
    paragraphs: [
      'جودة الستارة في طولها ووزنها والظل الذي تلقيه عصرًا. هنا نقضي وقتنا.',
      'يأتي اللون بعد أن تخبرنا الغرفة بحاجتها إلى الخصوصية والعتمة والنعومة.',
    ],
  },
  pillars: [
    { title: 'الفلسفة', text: 'اقتصاد في الشكل، ومواد صادقة، وضوء يُعامل كجزء من التصميم.' },
    { title: 'الحرفة', text: 'رؤوس وحواشٍ وبطانات تُخاط لعمر القماش لا لموسم واحد.' },
    { title: 'المواد', text: 'كتان وصوف ونسج ملموس وشيفون تُختار باليد.' },
    { title: 'العناية', text: 'فريق واحد من الزيارة إلى التركيب، وخط يمكنكم الاتصال به بعد ذلك.' },
  ],
  process: [
    { title: 'قدّموا الطلب', description: 'شاركونا الغرفة والنافذة والإحساس الذي تريدونه. نؤكد موعد الزيارة.' },
    { title: 'استشارة وزيارة', description: 'نحضر القماش ونتحدث عن الضوء والخصوصية وعمارة الفتحة.' },
    { title: 'قياس دقيق', description: 'نقيس الطول والعرض والتثبيت حتى يجلس رأس الستارة في مكانه.' },
    { title: 'التصنيع والتركيب', description: 'يُخاط العمل حسب الطلب، ثم يركّبه فريقنا ويهذّب طيّاته.' },
  ],
  why: [
    { title: 'قماش رفيع', description: 'أقمشة تُختار لانسدالها وكثافتها وطريقة تقادمها في ضوء النهار.' },
    { title: 'تصميم خاص', description: 'الرأس والبطانة والتثبيت تُؤلَّف لفتحة واحدة.' },
    { title: 'فريق محترف', description: 'التصميم والخياطة والتركيب تبقى داخل الدار.' },
    { title: 'استشارة مجانية', description: 'زيارة للمكان لرؤية الغرفة قبل أن يُصنع شيء.' },
    { title: 'تركيب متقن', description: 'مسارات ومحرّكات وحواشٍ تُنهى حتى تبدو النافذة مكتملة.' },
    { title: 'متابعة', description: 'إرشاد للتنظيف والتعديل والإصلاح حين يلزم.' },
  ],
  stats: ['مشاريع منجَزة', 'عملاء', 'سنوات في المحترف', 'عمليات تركيب'],
  finalCta: {
    eyebrow: 'البداية',
    title: 'أحضروا القماش إلى النافذة.',
    description: 'احجزوا استشارة مجانية. نقيس وننصح ونترك لكم عرضًا واضحًا.',
  },
  categories: [
    { name: 'ستائر كهربائية', description: 'ستائر مبطّنة على محرّك هادئ، تُفتح بمفتاح أو بجدول.' },
    { name: 'ستائر ويفي', description: 'طيّة متصلة تنسدل بموجات منتظمة من مسار خفي.' },
    { name: 'ستائر رول', description: 'سطح قماشي نظيف للغرف التي تريد الظل بلا حجم.' },
    { name: 'ستائر رومانية', description: 'طيّات ناعمة ترتفع عن الزجاج حين يُراد الضوء.' },
    { name: 'ستائر زيبرا', description: 'شرائح شفافة ومعتمة تُضبط الخصوصية خلالها.' },
    { name: 'ستائر خشبية', description: 'شرائح خشب ترشّح الشمس وتدفئ خط النافذة.' },
    { name: 'ستائر رأسية', description: 'شرائح عملية للفتحات العريضة والأبواب المنزلقة والمكاتب.' },
    { name: 'ستائر أمريكي', description: 'كسرات مفصّلة بوزن وإيقاع الستائر الكلاسيكية.' },
    { name: 'ستائر خاصة', description: 'رأس وقماش وبطانة تُؤلَّف لنافذة واحدة.' },
  ],
  products: [
    {
      name: 'سيرا ويف، كتان الشوفان',
      summary: 'ستارة ويفي من مزيج الكتان بتموّج منخفض ومتساوٍ ووجه مطفي.',
      features: ['رأس ويفي على مسار سقف أو جدار', 'بطانة عاتمة اختيارية', 'تُفصَّل على الطول المطلوب'],
      specs: [['الرأس', 'ويفي'], ['القماش', 'مزيج كتان'], ['الضوء', 'مرشّح']],
      paragraph: 'سيرا للغرف التي تريد هدوء الطيّة المتصلة. درجة الشوفان تجلس بهدوء مع الحجر والبلوط والجص.',
    },
    {
      name: 'نوكترن الكهربائية',
      summary: 'ستارة مبطّنة على محرّك مخفي، لغرف النوم والمعيشة الرسمية.',
      features: ['محرّك هادئ ومسار مخفي', 'تحكم بالمفتاح أو بالجدول', 'بطانة عاتمة أو نصف عاتمة'],
      specs: [['الرأس', 'موجة أو كسرة'], ['التحكم', 'كهربائي'], ['البطانة', 'عاتمة']],
      paragraph: 'تغلق نوكترن الغرفة بلا استعراض. يُحدَّد المحرّك مع المسار حتى يبقى القماش قماشًا لا جهازًا.',
    },
    {
      name: 'ألبا رول، حجر',
      summary: 'ستارة رول مضبوطة للمكاتب والمطابخ والنوافذ التي تريد سطحًا نظيفًا.',
      features: ['علبة وقنوات جانبية عند الحاجة', 'قماش شاشة أو عاتم', 'سلسلة أو محرّك'],
      specs: [['النمط', 'رول'], ['القماش', 'شاشة'], ['الضوء', 'تحكم بالوهج']],
      paragraph: 'تبقي ألبا الزجاج مقروءًا. هي الرفيق الصحيح حين تزحم الستارة الثقيلة الغرفة.',
    },
    {
      name: 'بالاتسو روماني، رمل',
      summary: 'طيّات ناعمة متراصة بقماش رملي دافئ، ترتفع حين يُرحَّب بالشمس.',
      features: ['تراص مسترخٍ أو مضبوط', 'بطانة تمنح الجسم', 'رفع بحبل أو محرّك'],
      specs: [['النمط', 'روماني'], ['القماش', 'نسج ملموس'], ['الضوء', 'مُلطَّف']],
      paragraph: 'يناسب بالاتسو غرف النوم والطعام حيث يجب أن تبدو النافذة منسّقة لا مظلّلة فحسب.',
    },
    {
      name: 'لينيا زيبرا',
      summary: 'شرائح شفافة ومعتمة تتحرك لضبط الخصوصية خلال اليوم.',
      features: ['قماش بطبقتين', 'وضع نهاري وليلي', 'علبة نحيلة'],
      specs: [['النمط', 'زيبرا'], ['الخصوصية', 'قابلة للضبط'], ['الضوء', 'طبقات']],
      paragraph: 'لينيا للشقق والغرف المطلة على الشارع، حين يلزم المشهد وطريقة لإغلاقه.',
    },
    {
      name: 'شرائح البلوط',
      summary: 'ستائر فينيسية خشبية بعرق دافئ وسلّم نحيل.',
      features: ['شرائح خشب طبيعي', 'إمالة للخصوصية', 'صبغة تناسب النجارة'],
      specs: [['النمط', 'ستارة خشبية'], ['المادة', 'خشب'], ['الضوء', 'موجَّه']],
      paragraph: 'تنتمي شرائح البلوط إلى أثاث الجوز والبلوط، حيث يبدو القماش أطرى مما ينبغي.',
    },
    {
      name: 'غالرّي الرأسية',
      summary: 'شرائح عريضة للأبواب المنزلقة والفتحات التجارية الطويلة.',
      features: ['شرائح قماش أو نصف عاتمة', 'تحريك بعصا أو حبل', 'تُصنع لكامل العرض'],
      specs: [['النمط', 'رأسية'], ['الاستخدام', 'فتحات عريضة'], ['الضوء', 'مضبوط']],
      paragraph: 'تبقي غالرّي امتداد الزجاج الطويل منظمًا. يُختار عرض الشريحة ليناسب إيقاع القوائم.',
    },
    {
      name: 'ميزون بليت',
      summary: 'كسرة أمريكية مفصّلة بوزن في الحاشية وانسدال رسمي.',
      features: ['كسرة مزدوجة أو ثلاثية', 'حاشية مثقّلة', 'بطانة داخلية اختيارية'],
      specs: [['الرأس', 'كسرة مفصّلة'], ['القماش', 'مزيج صوف'], ['الضوء', 'مكتمل']],
      paragraph: 'ميزون هي الستارة الرسمية: غرف الاستقبال والنوافذ العالية وكل مكان يجب أن يُقرأ رأسه كخياطة.',
    },
    {
      name: 'شيفون الأتيليه',
      summary: 'شيفون خاص، وحده أو خلف ستارة أثقل.',
      features: ['خصوصية مع ضوء النهار', 'رأس ويفي أو جيب', 'يُقرن بأي ستارة من المجموعة'],
      specs: [['الرأس', 'حسب الطلب'], ['القماش', 'شيفون'], ['الضوء', 'منتشر']],
      paragraph: 'يُقص شيفون الأتيليه حين تحتاج الغرفة نهارًا ناعمًا، وطبقة ثانية للمساء.',
    },
  ],
  services: [
    {
      title: 'قياس مجاني',
      summary: 'زيارة لقياس الفتحة ورؤية الضوء قبل طلب أي قماش.',
      features: ['قياس في المكان', 'ملاحظات عن الشمس والخصوصية', 'سجل مكتوب لكل نافذة'],
      paragraph: 'نقيس مرتين ونصوّر الفتحة حتى لا يعمل المشغل على رقم في صفحة.',
    },
    {
      title: 'تصميم ستائر خاصة',
      summary: 'الرأس والقماش والبطانة والتثبيت تُختار للغرفة لا من طقم ثابت.',
      features: ['عيّنات في الغرفة', 'دراسة للرأس والتناسب', 'عرض واضح'],
      paragraph: 'التصميم هنا قرارات: ارتفاع المسار، وامتلاء القماش، وما تفعله النافذة ليلًا.',
    },
    {
      title: 'تصنيع الستائر',
      summary: 'خياطة وبطانة وتشطيب في المشغل، على المقاسات التي أخذناها.',
      features: ['قصّة على الطول', 'بطانات وبطانات داخلية', 'التثبيت يُجهَّز مع القماش'],
      paragraph: 'لا شيء يُعدَّل من مقاس جاهز. الحاشية وشريط الرأس والرجعات تُصنع لتلك الفتحة.',
    },
    {
      title: 'تركيب احترافي',
      summary: 'تثبيت المسارات والمحرّكات والتعتيم، ثم تهذيب الطيّات.',
      features: ['مركّبونا', 'تشغيل المحرّكات في المكان', 'تهذيب أخير للقماش'],
      paragraph: 'التركيب جزء من الصنع. الستارة المتقنة الخياطة تفشل إن كان المسار غير مستوٍ.',
    },
    {
      title: 'صيانة ودعم',
      summary: 'تعديل وإرشاد للتنظيف وإصلاح بعد أن يحلّ العمل في الغرفة.',
      features: ['تعديل الحاشية والمسار', 'تعليمات العناية', 'إصلاح الرؤوس البالية'],
      paragraph: 'القماش يتحرك والبيوت تستقر والمحرّكات تحتاج نظرة بين حين وآخر. نبقى متاحين.',
    },
    {
      title: 'استشارة داخلية',
      summary: 'مساعدة في اختيار المعالجة حين ما زال بقية الغرفة قيد القرار.',
      features: ['تنسيق مع التشطيبات', 'طبقات الشيفون والستائر', 'رأي لعدة غرف'],
      paragraph: 'مفيدة حين يريد المعماري أو أهل البيت حسم النوافذ قبل وضع الأثاث.',
    },
  ],
  projects: [
    {
      title: 'معيشة بالم كورت',
      summary: 'ستائر ويفي من الأرض إلى السقف في صالة عالية وشمس بعد الظهر.',
      location: 'مسكن خاص',
      paragraphs: [
        'النوافذ تكاد تبلغ ارتفاع الغرفة. رأس الويفي يبقي القماش خفيفًا بما يكفي للعمارة وممتلئًا للخصوصية عند الغسق.',
        'الكتان بدرجة الشوفان الدافئ، مبطّن حتى يختفي الشارع من غير أن تظلم الغرفة عند الظهيرة.',
      ],
    },
    {
      title: 'شيفون صالة الفندق',
      summary: 'شيفون وطبقات تعتيم لصالة ضيافة.',
      location: 'صالة ضيافة',
      paragraphs: [
        'المطلوب ضوء للفطور وغرفة مغلقة هادئة لخدمة المساء.',
        'الشيفون على الزجاج. والتعتيم الأثقل على مسار ثانٍ يُسحب فقط حين يتبدل مزاج الصالة.',
      ],
    },
    {
      title: 'المعرض الشمالي',
      summary: 'شاشات رول على امتداد زجاج طويل.',
      location: 'معرض خاص',
      paragraphs: [
        'الأعمال على الجدار المقابل احتاجت تخفيف الشمس من غير فقدان رؤية الفناء.',
        'قماش شاشة بلون الحجر في علب نحيلة يبقي القوائم ظاهرة ويبعد الوهج عن العمل.',
      ],
    },
    {
      title: 'جناح الكتان',
      summary: 'ستائر رومانية عاتمة وشيفون لغرفة النوم الرئيسية.',
      location: 'مسكن خاص',
      paragraphs: [
        'النوم طلب عتمة حقيقية. تتراكم الستارة الرومانية فوق الإطار حتى يمكن دعوة الصباح.',
        'يبقى الشيفون للساعات التي يجب أن تبدو فيها الغرفة مفتوحة وغير مكشوفة.',
      ],
    },
    {
      title: 'بيت الفناء',
      summary: 'ستائر خشبية على أبواب الفناء، مع ستارة ناعمة للشتاء.',
      location: 'مسكن خاص',
      paragraphs: [
        'الأبواب تطل على فناء مزروع. تميل الشرائح الخشبية أمام الشمس العالية وما زالت تُظهر الحديقة.',
        'ستارة منفصلة، معلّقة بعيدًا عن الإطار، للمساءات الأبرد.',
      ],
    },
    {
      title: 'استقبال المساء',
      summary: 'ستائر بكسرات مفصّلة لغرفة استقبال رسمية.',
      location: 'غرفة استقبال',
      paragraphs: [
        'السقف مرتفع والنوافذ مزدوجة. الكسرة الثلاثية تمنح الرأس الوزن الذي طلبته الغرفة.',
        'البطانة الداخلية تبقي الانسدال مستقيمًا والشارع صامتًا.',
      ],
    },
  ],
  posts: [
    {
      title: 'كيف تختارون رأس ستارة لنافذة عالية',
      excerpt: 'الكسرة أو الموجة أو الحلقة ليست ذوقًا فقط. ارتفاع الغرفة يقرّر أولًا.',
      category: 'ملاحظات تصميم',
      paragraphs: [
        'في النافذة العالية، الرأس أول ما تلتقيه العين. الكسرة المضمومة تُقرأ كخياطة. والموجة تُقرأ كسطح متصل. والحلقة نادرًا ما تكون هادئة بما يكفي لغرفة رسمية.',
        'الامتلاء مهم كالأسلوب. قماش قليل فيبدو الرأس جائعًا. وكثير فيغطي التكديس الزجاج الذي أردتم إبقاءه.',
        'نبدأ عادة من باب الغرفة لا من النافذة. يجب أن يعمل الرأس من المكان الذي تُدخَل منه الغرفة.',
      ],
    },
    {
      title: 'طبقة شيفون مع ستارة',
      excerpt: 'قماشان على مسارين يمنحان الغرفة وجهًا للنهار ووجهًا للمساء.',
      category: 'الخامات',
      paragraphs: [
        'الشيفون وحده نادرًا ما يكفي لشارع، والستارة الثقيلة وحدها قد تجعل الغرفة مغلقة في الصباح. الجواب المفيد غالبًا هو الاثنان.',
        'الشيفون أقرب إلى الزجاج. والستارة على مسار ثانٍ، بعيدًا عن الأول، حتى لا يتزاحم القماشان عند السحب.',
        'اختاروا الشيفون للخصوصية في النهار لا للون. ويمكن للستارة بعد ذلك أن تحمل الدرجة الأعمق.',
      ],
    },
    {
      title: 'ماذا يشمل التركيب حسب المقاس',
      excerpt: 'القياس والصنع والتعليق عمل واحد. هذا ما يحدث بين الزيارة والنافذة المكتملة.',
      category: 'المحترف',
      paragraphs: [
        'بعد الاستشارة نخرج بمقاسات وصور وملاحظة عن حركة الشمس. يسمّي العرض القماش والرأس والبطانة والتثبيت.',
        'يقصّ المشغل على هذه الأرقام. لا نأخذ طولًا قياسيًا ونعدّله في المكان إن أمكن تجنّب ذلك.',
        'يشمل التركيب المسار أو التعتيم، والمحرّك إن وُجد، وتهذيبًا أخيرًا للطيّات. لا نعدّ النافذة منتهية حتى تستوي الحاشية ويتساوى التكديس.',
      ],
    },
  ],
  testimonials: [
    {
      name: 'ميرزو كريست',
      role: 'ملاحظة من المحترف',
      review: 'النافذة العالية تريد امتلاءً، لكن ليس إلى حد يغطي التكديس الزجاج. نحكم على الرأس من باب الغرفة لا من عيّنة القماش.',
    },
    {
      name: 'ميرزو كريست',
      role: 'ملاحظة تفصيل',
      review: 'الشيفون مكانه على الزجاج. والستارة على مسار ثانٍ بعيد عن الأول، حتى يكون للغرفة وجه للنهار ووجه للمساء.',
    },
    {
      name: 'ميرزو كريست',
      role: 'ملاحظة تركيب',
      review: 'الستارة المتقنة الخياطة تفشل إن كان المسار غير مستوٍ. لا نعدّ النافذة منتهية حتى تستوي الحاشية.',
    },
  ],
  team: [
    { name: 'أميرة السيد', position: 'مديرة التصميم', description: 'تقود اختيار القماش وتناسب كل رأس. ' },
    { name: 'كريم نصار', position: 'رئيس التركيب', description: 'مسؤول عن المسارات والمحرّكات والتهذيب الأخير. ' },
    { name: 'ليلى فاروق', position: 'أخصائية الأقمشة', description: 'ترعى مكتبة القماش وتطابق البطانات مع الضوء. ' },
    { name: 'عمر حداد', position: 'أتيليه العملاء', description: 'يرتّب الزيارات ويبقي العرض واضحًا. ' },
  ],
  faqs: [
    { question: 'ما أنواع الستائر والتعتيم التي تصنعونها؟', answer: 'ستائر ويفي وبكسرات مفصّلة وبحلقات، إضافة إلى الرول والروماني والزيبرا والخشبي والرأسي. والنسخ الكهربائية متاحة حين تسمح الفتحة بمحرّك.' },
    { question: 'هل يمكن تفصيل القماش والرأس بالكامل؟', answer: 'نعم. يُحدَّد الرأس والامتلاء والبطانة والتثبيت للنافذة. ويمكنكم إحضار قماش لنراجعه قبل الصنع.' },
    { question: 'كيف يتم القياس؟', answer: 'نقيس في المكان. يُسجَّل العرض والطول وارتفاع السقف والعوائق كالمدافئ والمقابض قبل أي قص.' },
    { question: 'من يركّب العمل؟', answer: 'مركّبونا يثبتون المسار أو التعتيم، ويشغّلون المحرّكات، ويهذّبون الطيّات. لا نسلّم الخطوة الأخيرة لفريق خارجي.' },
    { question: 'كم يستغرق الصنع والتركيب؟', answer: 'يعتمد على القماش وعدد النوافذ. بعد القياس نؤكد مدة الصنع ويوم التركيب في العرض.' },
    { question: 'كيف تُعتنى بالستائر؟', answer: 'نترك إرشادًا مكتوبًا للقماش الذي اخترتموه: التنظيف بالمكنسة، والتنظيف المهني، وما يُتجنَّب مع البطانات والمحرّكات.' },
    { question: 'كيف أحجز استشارة؟', answer: 'عبر نموذج الاستشارة أو الاتصال أو واتساب. أخبرونا بالمنطقة والغرف وسنقترح وقتًا للزيارة.' },
  ],
  partners: ['فيلا أتيليه', 'لومن للمنسوجات', 'كازا نيرا', 'فورم آند فولد', 'أتيليه سابل', 'لينيا هاوس'],
}
