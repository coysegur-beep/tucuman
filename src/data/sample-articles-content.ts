/**
 * Cuerpo de las notas y columnas de muestra. Lo separamos de sample-articles.ts
 * para que el index siga siendo navegable. En Fase 5 (Sanity) este map
 * desaparece y `contenidoHtml` se renderiza desde Portable Text.
 *
 * Markup admitido por `.article-body`:
 *   <p>           — párrafo normal (mb-7, 18px line-height 1.75)
 *   <h2>          — subtítulo intermedio (Spectral 24px, mt-10 mb-4)
 *   <blockquote>  — cita destacada (Spectral 22px italic, borde izq carmín)
 *   <em><strong>  — énfasis inline
 *
 * Drop cap automático en la primera letra del primer <p> de las notas
 * regulares (NO se aplica a columnas de opinión, marcadas con tag "opinion").
 */
export const ARTICLE_CONTENT: Record<string, string> = {
  "jaldo-presupuesto-2027-superavit-obra-publica": `
    <p>El gobernador Osvaldo Jaldo presentó este martes en la Casa de Gobierno el proyecto de Presupuesto 2027 que ingresará en las próximas horas a la Legislatura. La iniciativa contempla un total de gastos por $4,8 billones, paritarias atadas a la inflación interanual y la finalización de la autopista a Concepción como obra estratégica del año.</p>
    <p>El ministro de Economía, Daniel Abad, detalló que el proyecto proyecta un superávit primario del 1,2% del Producto Bruto Geográfico, sostenido en una recaudación que crecería 8% en términos reales y en una contención del gasto corriente. “No vamos a financiar la fiesta con la deuda flotante. Las cuentas se ordenan de verdad o no se ordenan”, aseguró Abad durante la presentación.</p>
    <h2>Las cuentas y la oposición</h2>
    <p>La oposición, encabezada por el bloque de Juntos por el Cambio en la Legislatura, anticipó que pedirá una sesión informativa antes del tratamiento. El concejal Roberto Sánchez cuestionó el supuesto superávit:</p>
    <blockquote>Lo que llaman superávit es el resultado de no pagar a los proveedores. La deuda flotante no es un detalle, es la trampa contable de siempre.</blockquote>
    <p>El proyecto será debatido en comisión durante las próximas dos semanas. Si se cumple el cronograma anunciado por el oficialismo, el dictamen llegará al recinto antes del receso de invierno. La autopista a Concepción, que demandaría unos $180 mil millones, está prevista para inaugurar en el segundo semestre de 2027.</p>
  `,

  "zafra-ingenios-record-molienda-rentabilidad-cayo": `
    <p>Los siete ingenios azucareros de Tucumán cerraron la zafra 2026 con una molienda de 16,4 millones de toneladas de caña, la mejor cifra desde 2019. Sin embargo, la rentabilidad del sector cayó 18% interanual, según el balance preliminar que difundió el Centro Azucarero Argentino.</p>
    <blockquote>Tuvimos volumen, pero no precio.</blockquote>
    <p>La frase resume el balance, según el presidente del CAA, Jorge Feijóo. La caída del azúcar en góndolas locales y el aumento del 26% en el costo del gasoil agrario explican gran parte del desfasaje entre producción récord y márgenes en rojo. La paritaria del FOTIA, cerrada en marzo con un piso del 14% trimestral, también tensó las cuentas.</p>
    <h2>Cooperativas en aprietos</h2>
    <p>El sector exportó el 38% de la producción, principalmente a países del Mercosur y a Estados Unidos. Las cooperativas más chicas son las más golpeadas: tres de ellas debieron postergar pagos a productores cañeros y negocian un auxilio con el Banco Macro y el banco provincial.</p>
    <p>Para 2027, la previsión es ajustada. El INTA Famaillá anticipó que las lluvias por debajo del promedio en el pedemonte podrían reducir la próxima zafra entre 8% y 12%, y la cámara empresarial pidió al gobierno provincial una mesa con biocombustibles para colocar el excedente de melaza.</p>
  `,

  "tucuman-cuarta-provincia-mas-abandono-escolar-secundario": `
    <p>Tucumán es la cuarta provincia argentina con mayor abandono escolar en el nivel secundario, según el último informe del INDEC sobre trayectorias educativas. El porcentaje de jóvenes de entre 13 y 17 años fuera del sistema asciende al 14,8%, detrás de Chaco (18,1%), Santiago del Estero (16,9%) y Salta (15,3%).</p>
    <p>El estudio, basado en datos del operativo Aprender 2025 y registros del Ministerio de Educación nacional, identifica al trabajo adolescente y a la maternidad temprana como las dos principales causas estructurales. En el norte y oeste de la provincia, la deserción supera el 20% en escuelas rurales, donde la asistencia depende del transporte y del calendario agrícola.</p>
    <h2>Trabajo y maternidad</h2>
    <p>“Los programas de retención existen, pero llegan tarde”, apuntó la pedagoga Verónica Kreplak, del Observatorio Educativo de la UNT. Mencionó como ejemplo el Plan Volver, que arranca recién cuando el alumno ya hizo más de 30 inasistencias.</p>
    <blockquote>Para entonces, lo que hay es un duelo, no una crisis temprana.</blockquote>
    <p>La ministra de Educación, Susana Montaldo, confirmó que el martes próximo se reunirá con representantes de UDA y CEDLIJ para coordinar un censo intensivo en las 18 cabeceras departamentales. La intención, según fuentes del ministerio, es publicar un mapa de abandono escolar comuna por comuna antes del receso de julio.</p>
  `,

  "feria-del-libro-parque-9-de-julio-2026": `
    <p>La Feria del Libro de Tucumán vuelve al Parque 9 de Julio entre el 12 y el 22 de mayo con 80 stands, una grilla de más de 200 actividades y la presencia confirmada de Camila Sosa Villada, Mariana Enríquez y el colombiano Juan Cárdenas. Es la edición número 23 y la primera que se hace al aire libre en gran escala desde la pandemia.</p>
    <p>“Apostamos a una feria que también sea fiesta urbana”, explicó la directora del Ente Cultural, Mariana Robles, en la presentación oficial. Habrá una carpa especial dedicada a editoriales del NOA — La Papa, Nudista, Falta Envido — y un programa para escuelas que recorrerá los colegios de zonas alejadas con autores invitados.</p>
    <p>Entre los nombres internacionales se destaca la presencia de Cárdenas, autor de <em>Elástico de sombra</em>, quien dará la charla inaugural el 12 de mayo a las 19. El pase a la feria es gratuito y los talleres requieren inscripción previa por la web del Ente. La organización espera 90 mil visitantes durante los once días de programación.</p>
  `,

  "atletico-refuerzos-mediocampista-uruguayo-sudamericana": `
    <p>Atlético Tucumán confirmó este martes la incorporación de Federico Viñas, mediocampista uruguayo que llega procedente de Cerro Largo. Firmó por 18 meses con opción de compra y será el segundo refuerzo de cara a la fase de grupos de la Copa Sudamericana, que arranca el 6 de junio en Mendoza ante Independiente Rivadavia.</p>
    <p>El entrenador Lucas Pusineri ya cuenta con Viñas en los entrenamientos de esta semana en el predio Ojo de Agua. La intención del cuerpo técnico es que llegue al partido del sábado, aunque la habilitación AFA recién estaría lista para el cierre del libro de pases. Pulga Rodríguez, el otro refuerzo de la temporada, ya entrena con normalidad después de la lesión muscular que lo marginó tres semanas.</p>
    <blockquote>Federico es un jugador que rompe líneas y suma juego aéreo, justo lo que nos faltaba en la mitad de cancha.</blockquote>
    <p>La frase, firmada por Pusineri en la rueda de prensa, refuerza el perfil del nuevo refuerzo. La directiva, encabezada por Mario Leito, también confirmó la salida de Cristian Lema a Gimnasia de Mendoza y monitorea a un delantero ecuatoriano cuyo nombre aún no trascendió.</p>
  `,

  "limon-precio-disparo-sequia-exportaciones": `
    <p>El precio del limón tucumano se disparó 40% en el mostrador y 28% para el productor en las últimas seis semanas, empujado por una sequía severa en el pedemonte que reducirá la cosecha 2026 en un 22%. La provincia, que produce el 80% del limón argentino, ya enfrenta tensiones para cumplir los contratos con compradores europeos.</p>
    <p>La Asociación Tucumana del Citrus (ATC) informó que las tres principales empresas — Citrusvil, San Miguel y Argenti Lemon — adelantaron exportaciones para asegurar volumen y aprovechar el premium de precio en Europa, principal destino del 65% de la producción.</p>
    <blockquote>Estamos cosechando antes de tiempo, lo que afecta calidad pero salva los contratos.</blockquote>
    <p>La frase es de Pablo Padilla, vicepresidente de la ATC, en diálogo con El Tucumán. El Ministerio de Producción provincial activó una mesa con bancos para discutir prefinanciaciones de exportación. La preocupación es por las pymes: las quintas chicas, que tienen menos de 50 hectáreas, son las más golpeadas porque no pueden bancar la pérdida de volumen sin financiamiento. La Federación Económica de Tucumán pidió que se incluya un esquema de subsidios al gasoil.</p>
    <h2>Tensión exportadora</h2>
    <p>Para los próximos 90 días, los meteorólogos del SMN no anticipan lluvias significativas en el sector serrano. Si la situación persiste, el sector calcula que las exportaciones cerrarán el año un 15% por debajo de 2025, aunque la facturación podría sostenerse por el efecto del precio.</p>
  `,

  "mercedes-sosa-sinfonico-tus-teatro-san-martin": `
    <p><em>Mercedes Sosa Sinfónico</em> arrancó su gira en el Teatro San Martín de la capital tucumana con tres funciones a sala llena. La Tucumán Sinfónica, dirigida por José Luis Amer, estrenó un nuevo arreglo de “Cuando tenga la tierra” interpretado con la voz invitada de Soledad Pastorutti, en una velada que cerró con quince minutos de aplausos de pie.</p>
    <p>El espectáculo, que reorquesta clásicos del repertorio de Mercedes Sosa para orquesta sinfónica completa, es producción del Ente Cultural junto al Ministerio de Cultura de la Nación. La curaduría estuvo a cargo del compositor cordobés Diego Schissi, quien también firma el arreglo de “Como un pájaro libre” que cerró la noche.</p>
    <blockquote>Tocar a Mercedes en su tierra es un compromiso enorme.</blockquote>
    <p>La frase la pronunció Pastorutti antes de subir al escenario. La gira continúa el 14 y 15 de mayo en el Teatro Provincial de Salta, y los días 21 y 22 en el Teatro Mitre de San Salvador de Jujuy. En agosto, el espectáculo volverá a Tucumán para una función especial en la apertura del Festival de la Pachamama.</p>
  `,

  "casa-blanca-comercio-china-agro-argentino": `
    <p>La administración estadounidense anunció este lunes una nueva ronda de aranceles cruzados sobre soja y maíz importados desde China, en un movimiento que el secretario del Tesoro, Scott Bessent, calificó como “respuesta proporcional” a las restricciones aplicadas por Beijing en marzo. La medida entra en vigencia el 1° de junio.</p>
    <p>Para el agro argentino, la tensión bilateral abre una ventana de oportunidad de corto plazo. Los analistas de Rosario estiman que China podría redirigir parte de su demanda hacia Sudamérica, lo que mejoraría los precios FOB de la soja entre 4% y 7% durante julio y agosto.</p>
    <blockquote>El que tenga grano para vender en esa ventana, va a hacer caja.</blockquote>
    <p>La síntesis es de Sebastián Salvaro, economista del IERAL, durante el panel de coyuntura del lunes en Buenos Aires. En el NOA, sin embargo, el efecto se siente atenuado. La región exporta principalmente a través del Pacífico vía Chile, y el nudo logístico del Paso de Jama — cerrado por temporal de nieve esta semana — está restringiendo despachos. Para los productores tucumanos, la ventana de precios podría coincidir con problemas de salida.</p>
  `,

  "concejo-deliberante-bloqueo-suba-tasas-2026": `
    <p>La sesión convocada para este martes por el Concejo Deliberante de San Miguel de Tucumán, en la que se iba a tratar el aumento de tasas municipales para 2026, se cayó por falta de quórum. Tres concejales del oficialismo no se presentaron y el bloque opositor, que ya había anunciado el rechazo, optó por no fortalecer el quórum.</p>
    <p>La intendenta Rossana Chahla había impulsado un paquete de aumentos del 18% en Servicios Generales y del 12% en Inmobiliario Urbano para sostener la cobertura de barrida y alumbrado. Las tasas seguían congeladas en valores de noviembre del año pasado, y según el Ejecutivo, ya no alcanzaban para cubrir los costos operativos.</p>
    <h2>Sin votos para subir</h2>
    <blockquote>Esta administración no se sostiene gobernando con tasas de hace ocho meses.</blockquote>
    <p>Lo afirmó el secretario de Hacienda municipal, Diego Alarcón, en declaraciones a El Tucumán. La oposición, en cambio, exige que cualquier suba se condicione a una auditoría de la planta política, que en los últimos seis meses creció un 9%.</p>
    <p>La presidenta del cuerpo, Lucía González, convocó a una nueva sesión para el viernes 9 de mayo. Si el oficialismo no logra los votos, las tasas continuarán congeladas y, según fuentes del Ejecutivo, se evaluará un decreto de necesidad y urgencia, una vía que ya generó cruces fuertes en el último año.</p>
  `,

  "dolar-blue-tucuman-1350-brecha-volvio-18": `
    <p>El dólar blue cerró este martes a $1.350 en las cuevas de la peatonal Mendoza y la calle 25 de Mayo, con una suba de $15 respecto del lunes. La brecha con el oficial volvió al 18%, después de tres jornadas en alza pese a las ventas que el Banco Nación realizó para contener la cotización en el mercado MEP.</p>
    <p>Los “arbolitos” del microcentro tucumano volvieron a cotizar por encima del MEP, que terminó en $1.328, y muy por debajo del CCL, que cerró a $1.420. Operadores cambiarios atribuyen la presión a la combinación de aguinaldo en proveedores y al efecto de la zafra: los ingenios suelen comprar dólares en mayo para insumos importados.</p>
    <blockquote>Es una suba estacional, no un cambio de tendencia.</blockquote>
    <p>Lo relativizó Federico Glustein, economista de Consultoría Tucumán. El analista, no obstante, advirtió que si el BCRA no recompone reservas durante junio, la brecha podría escalar hacia el 25%, niveles que no se ven desde principios de 2025.</p>
  `,

  "crisis-hidrica-villa-mariano-moreno-cuarto-dia": `
    <p>Villa Mariano Moreno entra hoy en su cuarto día consecutivo sin servicio de agua corriente, en una crisis que ya afecta a unas 12 mil personas del oeste de la capital tucumana. La causa es la rotura del acueducto Vipos, ocurrida el sábado por la noche, y que la Sociedad Aguas del Tucumán (SAT) prometió reparar para mañana al mediodía.</p>
    <p>Vecinos del barrio cortaron este martes las avenidas Avellaneda y Gobernador Garmendia en reclamo. La denuncia se escuchó fuerte de boca de Marcela Albornoz, referente vecinal:</p>
    <blockquote>Nos están repartiendo bidones, pero un bidón no alcanza para una familia de cinco. Y ya no hay agua ni para el inodoro.</blockquote>
    <p>La protesta fue desactivada por Gendarmería al mediodía, pero la asamblea barrial anunció que volverán a cortar mañana si no hay restitución del servicio.</p>
    <h2>Cortes y reclamos</h2>
    <p>El presidente de la SAT, Julio Saavedra, explicó que el daño en el acueducto es “más severo de lo previsto” y que se trabaja con seis cuadrillas en simultáneo. La empresa repartió 80 mil litros de agua envasada y dispuso ocho camiones cisterna en puntos del barrio. Sin embargo, la distribución llegó tarde: durante el lunes, varios sectores quedaron sin reparto.</p>
    <p>La intendenta Chahla anunció una reunión de urgencia con la Defensoría del Pueblo y la SAT para definir un esquema de resarcimiento por el corte. “No puede ser gratis tener tres días sin agua. Va a haber un descuento en la próxima factura, esto no es negociable”, afirmó. La Defensoría, mientras tanto, prepara un amparo colectivo en nombre de los vecinos afectados.</p>
  `,

  "paso-de-jama-cerrado-temporal-camioneros-varados": `
    <p>El Paso de Jama, principal nexo terrestre entre el norte argentino y Chile, permanece cerrado desde la madrugada del lunes por una nevada intensa sobre los 4.300 metros de altura. Vialidad Nacional descartó la apertura antes del miércoles y estima que unos 1.200 camioneros están varados del lado argentino, principalmente en San Antonio de los Cobres.</p>
    <p>La carga afectada incluye palta argentina, limón tucumano y autopartes industriales con destino a Antofagasta. Hugo Soto, dirigente de la Asociación de Transportistas del Norte (ATRAN), lo dijo desde Susques con palabras que resumen la urgencia:</p>
    <blockquote>Tenemos refrigerados que no aguantan más de 72 horas. Si esto no abre mañana, perdemos toda la mercadería.</blockquote>
    <h2>Alternativas en juego</h2>
    <p>La Cancillería argentina, junto con la Cámara Aduanera y el Ministerio del Interior, gestiona con sus pares chilenos el uso temporal del Paso de Sico como alternativa, aunque las restricciones de carga limitan la salida. Por ahora, la única vía habilitada es el sur (Cristo Redentor), pero implica desviar 1.800 kilómetros adicionales y sumar entre 32 y 40 horas a cada viaje.</p>
    <p>Para el sector citrícola tucumano, la situación es crítica: el 18% de las exportaciones de limón hacia Asia y el Pacífico salen por Jama. Si el cierre se prolonga más de 72 horas, los embarcadores empezarán a redireccionar carga al puerto de Buenos Aires, con el costo logístico que eso implica. La ATC ya pidió una reunión urgente con Cancillería.</p>
  `,

  "encuesta-tarifas-edet-rechazo-65-tucumanos": `
    <p>Una encuesta de la consultora Análisis sobre 800 casos en la provincia revela que el 65% de los tucumanos rechaza el aumento de tarifas eléctricas anunciado por la Empresa de Distribución Eléctrica de Tucumán (EDET) la semana pasada. Apenas el 22% lo considera “aceptable” y un 13% no opina.</p>
    <p>El sondeo, realizado entre el 28 de abril y el 4 de mayo, muestra una percepción transversal entre clases sociales: el rechazo supera el 70% en los segmentos C3 y D, y se mantiene en 58% incluso en el ABC1. La principal queja es la combinación del aumento — que va del 24% al 38% según consumo — con cortes recurrentes en zonas como Yerba Buena, Tafí Viejo y la Banda del Río Salí.</p>
    <h2>Defensoría y empresa</h2>
    <p>La Defensoría del Pueblo confirmó que presentará un amparo colectivo el viernes para frenar el aumento hasta tanto el ENRE provincial audite las inversiones realizadas por la empresa en los últimos 24 meses.</p>
    <blockquote>Si la inversión no se hizo, no se cobra el aumento. Es así de simple.</blockquote>
    <p>El planteo es del defensor Hugo Cabral. Desde EDET, la conducción descartó dar marcha atrás. “Las tarifas estaban congeladas desde marzo de 2025. Sin actualización, no podemos hacer las obras de capacidad que el sistema necesita”, argumentó el gerente comercial, Ariel Fernández. La empresa anunció que en julio iniciará obras en el alimentador de Tafí Viejo, una de las zonas más afectadas por los cortes.</p>
  `,

  "ajuste-no-llega-tucuman-mirada-larga": `
    <p>El gobernador Jaldo presentó hoy un Presupuesto que promete superávit. Es un buen titular. Pero hay un dato que el proyecto evita pronunciar: el 56% del gasto provincial sigue siendo empleo público. Sin tocar esa cifra, ningún superávit es real. Es contabilidad cosmética.</p>
    <p>La provincia tiene 156 mil empleados públicos. Es la segunda relación habitantes/empleado público más alta del país, después de Catamarca. Cada gobierno desde Bussi suma estructura y ninguno la desarma. El año electoral, que ya empezó, vuelve a ser mal terreno para revisar lo que sobra.</p>
    <h2>Lo que la Legislatura no debate</h2>
    <p>El argumento del oficialismo es conocido: en una provincia con 38% de pobreza y un mercado privado raquítico, achicar el Estado significa cortar oxígeno. Es cierto en parte. Pero confundir Estado con planta política es una trampa. La salud, la educación y la seguridad no están sobredimensionadas. Lo que sobra son los cargos creados al amparo del clientelismo.</p>
    <p>La discusión que la Legislatura no se va a animar a dar es ésa: cómo se ajusta sin desfinanciar lo que realmente funciona. Mientras eso no pase, los superávits que se anuncian van a seguir saliendo de no pagar a proveedores, y la deuda flotante seguirá creciendo en silencio. Que alguien hable de eso en serio sería, ya, un avance.</p>
  `,

  "espejismo-del-superavit": `
    <p>Cuando un ministro de Economía de cualquier color anuncia superávit fiscal, lo primero que conviene preguntarse no es cuánto, sino cómo. La Provincia presentó esta semana un proyecto de Presupuesto con un superávit primario del 1,2%. La pregunta es: ¿cuánto le debe la Provincia a sus proveedores hoy?</p>
    <p>La respuesta, aunque difícil de obtener (la Tesorería no publica el dato consolidado), ronda los $340 mil millones. Es deuda flotante: facturas presentadas y aún no pagadas. Cuando ese stock crece, la caja se “ordena” porque sale menos plata. Pero la obligación queda. Es un truco viejo y conocido.</p>
    <h2>El número que falta</h2>
    <p>Lo verdaderamente honesto sería publicar el número de deuda flotante junto con el resultado primario. Sería un gesto de transparencia. Pero ningún gobierno provincial lo hace, ni acá ni en otras jurisdicciones. La AFIP nacional lo publica desde 2019. Las provincias, no.</p>
    <p>Mientras tanto, los proveedores de la salud, los talleristas culturales y las pymes que prestan servicios al Estado siguen esperando 90, 120, 180 días para cobrar facturas vencidas. Ése es el verdadero termómetro fiscal. No el papel que se aprueba en la Legislatura: el papel del banco que esperás todos los meses.</p>
  `,

  "nostalgia-y-archivos": `
    <p>Visité esta semana el Archivo Histórico de la Provincia, en la calle 25 de Mayo. Está en un edificio que se cae a pedazos, con humedad en los expedientes coloniales y un ascensor que no funciona desde antes de la pandemia. Hay una persona, una sola, encargada del catálogo. El proyecto de digitalización lleva tres años de retraso.</p>
    <p>Lo que se digitaliza también se decide qué se olvida. Esa frase, que escuché alguna vez en una conferencia, vuelve cada vez que uno mira un archivo público en estado de abandono. La política de memoria se juega ahí: en qué se cataloga, qué se prioriza, qué se conserva, qué se descarta sin que nadie pregunte por qué.</p>
    <h2>Una obra pequeña que importa</h2>
    <p>El Estado provincial dedica al Archivo Histórico un presupuesto que no llega al 0,02% del total. La cifra es irrisoria. Y sin embargo, allí están las actas del Cabildo, los expedientes del primer Plan Belgrano, las cartas de la guerra de los caudillos. Son el material que cualquier historia futura necesitará para no inventarse.</p>
    <p>El Ministerio de Educación anunció hace seis meses una reforma del archivo. No pasó nada concreto desde entonces. Mientras se discuten las grandes obras de infraestructura — la autopista, el puerto seco, los polos productivos — algunas obras pequeñas siguen siendo prueba de seriedad institucional. El Archivo Histórico es una de ésas. Y la estamos perdiendo.</p>
  `,
};
