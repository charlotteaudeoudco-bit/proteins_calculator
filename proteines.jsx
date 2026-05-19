import { useState, useCallback } from "react";

/* ══════════════════ FOODS DATA ══════════════════ */
const FOODS = {
  "oeufs entiers":           {label:"Œufs",           prot:13.0, stdQty:50,  unit:"g",  note:"×1=50g"},
  "yaourt grec":             {label:"Yaourt grec",     prot:10.0, stdQty:150, unit:"g"},
  "mozzarella":              {label:"Mozzarella",      prot:22.0, stdQty:80,  unit:"g"},
  "lait":                    {label:"Lait",            prot:3.4,  stdQty:200, unit:"mL"},
  "parmesan":                {label:"Parmesan",        prot:36.0, stdQty:20,  unit:"g"},
  "cuajada":                 {label:"Cuajada",         prot:18.0, stdQty:80,  unit:"g"},
  "pain/wrap":               {label:"Pain / Wrap",     prot:9.0,  stdQty:60,  unit:"g"},
  "amandes":                 {label:"Amandes",         prot:21.0, stdQty:30,  unit:"g"},
  "pistaches":               {label:"Pistaches",       prot:20.6, stdQty:30,  unit:"g"},
  "cacahuetes":              {label:"Cacahuètes",      prot:26.0, stdQty:30,  unit:"g"},
  "beurre de cacahuete":     {label:"Beurre cacah.",   prot:25.0, stdQty:20,  unit:"g"},
  "graines de lin":          {label:"G. de lin",       prot:18.0, stdQty:5,   unit:"g",  note:"saupoudrées"},
  "graines de chia":         {label:"G. de chia",      prot:16.5, stdQty:5,   unit:"g",  note:"saupoudrées"},
  "graines de tournesol":    {label:"G. tournesol",    prot:21.0, stdQty:8,   unit:"g",  note:"saupoudrées"},
  "flocons d'avoine":        {label:"Flocons avoine",  prot:13.5, stdQty:40,  unit:"g"},
  "quinoa cuit":             {label:"Quinoa",          prot:4.4,  stdQty:150, unit:"g"},
  "pates cuites":            {label:"Pâtes",           prot:5.5,  stdQty:120, unit:"g"},
  "riz cuit":                {label:"Riz",             prot:2.7,  stdQty:100, unit:"g"},
  "orge cuite (cebada)":     {label:"Cebada",          prot:2.3,  stdQty:100, unit:"g"},
  "pommes de terre cuites":  {label:"Pommes de terre", prot:2.0,  stdQty:150, unit:"g"},
  "arepa de maiz":           {label:"Arepa de maíz",   prot:3.5,  stdQty:80,  unit:"g"},
  "lentilles cuites":        {label:"Lentilles",       prot:9.0,  stdQty:150, unit:"g",  isLegume:true},
  "pois chiches cuits":      {label:"Pois chiches",    prot:8.9,  stdQty:150, unit:"g",  isLegume:true},
  "haricots rouges cuits":   {label:"Haricots rouges", prot:8.7,  stdQty:150, unit:"g",  isLegume:true},
  "edamame cuit":            {label:"Edamame",         prot:11.5, stdQty:100, unit:"g",  isLegume:true},
  "frijoles negros cuits":   {label:"Frijoles negros", prot:8.9,  stdQty:150, unit:"g",  isLegume:true},
  "habas cuites":            {label:"Habas / Fèves",   prot:8.0,  stdQty:150, unit:"g",  isLegume:true},
  "soja texturise sec":      {label:"Soja texturisé",  prot:50.0, stdQty:30,  unit:"g"},
  "seitan":                  {label:"Seitan",          prot:25.0, stdQty:100, unit:"g"},
  "tofu ferme":              {label:"Tofu",            prot:8.0,  stdQty:100, unit:"g"},
  "tempeh":                  {label:"Tempeh",          prot:19.0, stdQty:80,  unit:"g"},
  "champignons de paris":    {label:"Champignons",     prot:3.1,  stdQty:100, unit:"g"},
  "petits pois verts cuits": {label:"Petits pois",     prot:5.4,  stdQty:100, unit:"g"},
  "epinards cuits":          {label:"Épinards",        prot:3.0,  stdQty:100, unit:"g"},
  "brocoli cuit":            {label:"Brocoli",         prot:2.6,  stdQty:150, unit:"g"},
  "mais doux cuit":          {label:"Maïs doux",       prot:3.4,  stdQty:100, unit:"g"},
  "chou-fleur cuit":         {label:"Chou-fleur",      prot:1.9,  stdQty:150, unit:"g"},
  "avocat":                  {label:"Avocat",          prot:2.0,  stdQty:100, unit:"g"},
  "empanadas de queso":      {label:"Empanadas queso", prot:9.0,  stdQty:100, unit:"g"},
  "soupe de lentilles (bol)":{label:"Soupe lentilles", prot:3.0,  stdQty:300, unit:"mL", isLegume:true},
  "soupe de frijoles (bol)": {label:"Soupe frijoles",  prot:3.5,  stdQty:300, unit:"mL", isLegume:true},
  "soupe de legumes (bol)":  {label:"Soupe légumes",   prot:1.0,  stdQty:300, unit:"mL"},
  "soupe de poulet (bol)":   {label:"Soupe poulet",    prot:3.0,  stdQty:300, unit:"mL", nonVeg:true},
  "blanc de poulet cuit":    {label:"Poulet",          prot:27.0, stdQty:120, unit:"g",  nonVeg:true},
  "boeuf maigre cuit":       {label:"Bœuf maigre",    prot:26.0, stdQty:120, unit:"g",  nonVeg:true},
  "tilapia/mojarra grille":  {label:"Tilapia/Mojarra", prot:22.0, stdQty:120, unit:"g",  nonVeg:true},
  "trucha grille":           {label:"Trucha",          prot:20.0, stdQty:120, unit:"g",  nonVeg:true},
};

const MEAL_MENUS = {
  pdj: [
    {id:"eggs",   label:"Œufs & Laitiers",  foods:["oeufs entiers","lait","yaourt grec"]},
    {id:"cer",    label:"Céréales",          foods:["flocons d'avoine","pain/wrap"]},
    {id:"seeds",  label:"Graines",           foods:["graines de chia","graines de lin","graines de tournesol"]},
  ],
  midi: [
    {id:"dairy",  label:"Œufs & Laitiers",   foods:["oeufs entiers","yaourt grec","mozzarella","lait","parmesan","cuajada"]},
    {id:"nuts",   label:"Oléagineux",         foods:["amandes","pistaches","cacahuetes","beurre de cacahuete","graines de lin","graines de chia","graines de tournesol"]},
    {id:"starch", label:"Féculents",          foods:["flocons d'avoine","quinoa cuit","pates cuites","riz cuit","orge cuite (cebada)","pommes de terre cuites","pain/wrap","arepa de maiz"]},
    {id:"legume", label:"Légumineuses ✱",     foods:["lentilles cuites","pois chiches cuits","haricots rouges cuits","edamame cuit","frijoles negros cuits","habas cuites"]},
    {id:"vprot",  label:"Protéines végé",     foods:["soja texturise sec","seitan","tofu ferme","tempeh"]},
    {id:"veg",    label:"Légumes",            foods:["champignons de paris","petits pois verts cuits","epinards cuits","brocoli cuit","mais doux cuit","chou-fleur cuit","avocat"]},
    {id:"meat",   label:"Viandes & Poissons", foods:["blanc de poulet cuit","boeuf maigre cuit","tilapia/mojarra grille","trucha grille"], nonVegOnly:true},
  ],
  soir: [
    {id:"cheese", label:"Laitiers & Fromages", foods:["yaourt grec","mozzarella","lait","parmesan","cuajada"]},
    {id:"starch", label:"Féculents",            foods:["quinoa cuit","pates cuites","riz cuit","orge cuite (cebada)","pommes de terre cuites","arepa de maiz"]},
    {id:"col",    label:"Cuisine colombienne",  foods:["empanadas de queso","soupe de lentilles (bol)","soupe de frijoles (bol)","soupe de legumes (bol)","soupe de poulet (bol)"]},
  ],
};

const SUGGEST_PRIO = {
  pdj:  ["yaourt grec","oeufs entiers","flocons d'avoine","pain/wrap","graines de chia"],
  midi: ["seitan","lentilles cuites","frijoles negros cuits","pois chiches cuits","edamame cuit","haricots rouges cuits","tofu ferme","tempeh","yaourt grec","oeufs entiers","quinoa cuit","blanc de poulet cuit","tilapia/mojarra grille","amandes","parmesan","mozzarella","beurre de cacahuete"],
  soir: ["cuajada","yaourt grec","mozzarella","parmesan","oeufs entiers","quinoa cuit","pates cuites","seitan","tempeh","soupe de lentilles (bol)","soupe de frijoles (bol)"],
};

const MIDI_COMBOS = [
  {label:"Riz + Lentilles",       items:[{food:"riz cuit",qty:100},{food:"lentilles cuites",qty:150}]},
  {label:"Quinoa + Pois chiches", items:[{food:"quinoa cuit",qty:150},{food:"pois chiches cuits",qty:150}]},
  {label:"Pâtes + Frijoles",      items:[{food:"pates cuites",qty:120},{food:"frijoles negros cuits",qty:150}]},
];

const MEAL_LABELS = { pdj:"Petit-déjeuner", midi:"Déjeuner", soir:"Dîner" };

/* ══════════════════ UTILS ══════════════════ */
const r1 = v => Math.round(v * 10) / 10;
const calcProt = (food, qty) => { const f = FOODS[food]; return f ? r1(f.prot * qty / 100) : 0; };
const getMealItems = (p, meal) => [
  ...(p.constants[meal] || []).map(c => ({...c, locked:true})),
  ...Object.entries(p.selections[meal] || {}).map(([food, qty]) => ({food, qty, locked:false})),
];
const getMealProt = (p, meal) => r1(getMealItems(p,meal).reduce((s,{food,qty}) => s + calcProt(food,qty), 0));
const getDayProt = p => r1(['pdj','midi','soir'].reduce((s,m) => s + getMealProt(p,m), 0) + (p.supplement||0));
const getObj = p => Math.round(p.weight * 1.6);
const isLegumeUsed = p => ['pdj','midi','soir'].some(m => getMealItems(p,m).some(({food}) => FOODS[food]?.isLegume));

const getSuggestions = (p, meal) => {
  let legumeUsed = isLegumeUsed(p);
  const consumed = new Set(['pdj','midi','soir'].flatMap(m => getMealItems(p,m).map(({food}) => food)));
  let rem = getObj(p) - getDayProt(p);
  if (rem < 0.5) return [];
  const res = [];
  for (const food of (SUGGEST_PRIO[meal] || SUGGEST_PRIO.midi)) {
    if (consumed.has(food)) continue;
    const f = FOODS[food];
    if (!f || (p.veg && f.nonVeg) || (f.isLegume && legumeUsed)) continue;
    const qty = Math.max(20, Math.min(Math.round(rem / f.prot * 100), f.stdQty * 2));
    const pv = calcProt(food, qty);
    res.push({food, qty, prot:pv});
    rem -= pv;
    if (f.isLegume) legumeUsed = true;
    if (rem < 0.5) break;
  }
  return res;
};

const checkMidiNeeds = (p) => {
  const items = getMealItems(p,'midi');
  const foods = new Set(items.map(i => i.food));
  const starchSet = new Set(MEAL_MENUS.midi.find(c=>c.id==='starch')?.foods||[]);
  const leguSet = new Set(MEAL_MENUS.midi.find(c=>c.id==='legume')?.foods||[]);
  const hasFec = [...foods].some(f => starchSet.has(f));
  const hasLeg = [...foods].some(f => leguSet.has(f) || FOODS[f]?.isLegume);
  const legElsewhere = ['pdj','soir'].some(m => getMealItems(p,m).some(({food}) => FOODS[food]?.isLegume));
  return {needsFec:!hasFec, needsLeg:!hasLeg && !legElsewhere};
};

/* ══════════════════ DEFAULT DATA ══════════════════ */
const mkId = () => Math.random().toString(36).slice(2,8);
const DEFAULT_PERSONS = [
  {id:'p1', name:'Personne A', weight:63, veg:false, supplement:0,
   constants:{pdj:[{food:'oeufs entiers',qty:150},{food:'lait',qty:200}],midi:[],soir:[]},
   selections:{pdj:{},midi:{},soir:{}}},
  {id:'p2', name:'Personne B', weight:78, veg:true, supplement:23,
   constants:{pdj:[{food:'oeufs entiers',qty:250},{food:"flocons d'avoine",qty:30}],midi:[{food:'amandes',qty:15},{food:'pistaches',qty:15}],soir:[]},
   selections:{pdj:{},midi:{},soir:{}}},
];

/* ══════════════════ STYLES ══════════════════ */
const CSS = `
  .pill-btn{cursor:pointer;border:0.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md);padding:4px 10px;font-size:12px;background:var(--color-background-primary);color:var(--color-text-secondary);transition:all .15s}
  .pill-btn:hover{background:var(--color-background-secondary);color:var(--color-text-primary)}
  .pill-btn.active{background:var(--color-background-success);color:var(--color-text-success);border-color:var(--color-border-success)}
  .food-pill{cursor:pointer;border:0.5px solid var(--color-border-secondary);border-radius:var(--border-radius-md);padding:5px 9px;font-size:12px;background:var(--color-background-primary);color:var(--color-text-primary);text-align:left;transition:all .12s;min-width:0}
  .food-pill:hover{border-color:var(--color-border-primary);background:var(--color-background-secondary)}
  .food-pill.sel{background:var(--color-background-success);border-color:var(--color-border-success);color:var(--color-text-success)}
  .food-pill.legume.sel{background:var(--color-background-info);border-color:var(--color-border-info);color:var(--color-text-info)}
  .food-pill.dis{opacity:.4;cursor:not-allowed}
  .qty-in{width:52px;border:none;background:transparent;font-size:12px;color:var(--color-text-primary);text-align:right;outline:none;font-family:inherit}
  .qty-in:focus{background:var(--color-background-secondary);border-radius:4px}
  .chip{display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:var(--border-radius-md);font-size:12px;border:0.5px solid var(--color-border-tertiary);background:var(--color-background-primary)}
  .chip.locked{background:var(--color-background-secondary);border-style:dashed}
  .chip.legume{border-color:var(--color-border-info)}
  .rm-btn{background:none;border:none;cursor:pointer;color:var(--color-text-tertiary);font-size:14px;line-height:1;padding:0 2px;border-radius:3px}
  .rm-btn:hover{color:var(--color-text-danger);background:var(--color-background-danger)}
  .add-btn{display:flex;align-items:center;gap:5px;padding:6px 12px;border:0.5px dashed var(--color-border-secondary);border-radius:var(--border-radius-md);background:transparent;cursor:pointer;font-size:12px;color:var(--color-text-secondary);width:100%;justify-content:center;transition:all .15s}
  .add-btn:hover{background:var(--color-background-secondary);border-style:solid;color:var(--color-text-primary)}
  input[type=number]{-moz-appearance:textfield}
  input[type=number]::-webkit-inner-spin-button{opacity:0.5}
`;

/* ══════════════════ FOOD CHIP ══════════════════ */
function FoodChip({food, qty, locked, onQtyChange, onRemove}) {
  const f = FOODS[food];
  if (!f) return null;
  const pv = calcProt(food, qty);
  return (
    <div className={`chip${locked?' locked':''}${f.isLegume?' legume':''}`}>
      <span style={{fontWeight:500, flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.label}</span>
      {locked
        ? <span style={{color:'var(--color-text-tertiary)',fontSize:11}}>{qty}{f.unit}</span>
        : <input type="number" className="qty-in" value={qty} min={1} step={f.unit==='mL'?50:5}
            onChange={e => onQtyChange(food, Math.max(1, Number(e.target.value)))} />
      }
      <span style={{color:'var(--color-text-tertiary)',fontSize:11}}>{f.unit}</span>
      <span style={{color:'var(--color-text-success)',fontWeight:500,fontSize:11,whiteSpace:'nowrap'}}>{pv}g</span>
      {locked
        ? <i className="ti ti-lock" style={{fontSize:11,color:'var(--color-text-tertiary)'}} aria-hidden="true"/>
        : <button className="rm-btn" onClick={() => onRemove(food)} aria-label="Retirer">×</button>
      }
    </div>
  );
}

/* ══════════════════ MEAL CELL ══════════════════ */
function MealCell({person, meal, onUpdate, legumeUsed}) {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const items = getMealItems(person, meal);
  const total = getMealProt(person, meal);
  const cats = MEAL_MENUS[meal].filter(c => !c.nonVegOnly || !person.veg);
  const curCat = activeCat || cats[0]?.id;

  const toggleFood = useCallback(food => {
    const f = FOODS[food];
    if (!f) return;
    const isConst = (person.constants[meal]||[]).some(c => c.food === food);
    if (isConst) return;
    const isSel = food in (person.selections[meal]||{});
    onUpdate(person.id, {
      selections: {...person.selections, [meal]: isSel
        ? Object.fromEntries(Object.entries(person.selections[meal]).filter(([k])=>k!==food))
        : {...person.selections[meal], [food]: f.stdQty}
      }
    });
  }, [person, meal, onUpdate]);

  const updateQty = useCallback((food, qty) => {
    if ((person.constants[meal]||[]).some(c => c.food === food)) return;
    onUpdate(person.id, {
      selections: {...person.selections, [meal]: {...person.selections[meal], [food]: qty}}
    });
  }, [person, meal, onUpdate]);

  const removeFood = useCallback(food => {
    onUpdate(person.id, {
      selections: {...person.selections, [meal]:
        Object.fromEntries(Object.entries(person.selections[meal]).filter(([k])=>k!==food))}
    });
  }, [person, meal, onUpdate]);

  // Midi combo suggestion
  const {needsFec, needsLeg} = meal==='midi' ? checkMidiNeeds(person) : {needsFec:false,needsLeg:false};
  const showCombo = meal==='midi' && (needsFec || needsLeg) && !open && items.length === (person.constants.midi||[]).length;

  const applyCombo = combo => {
    const newSel = {...person.selections.midi};
    combo.items.forEach(({food, qty}) => { if (!newSel[food]) newSel[food] = qty; });
    onUpdate(person.id, {selections:{...person.selections, midi:newSel}});
  };

  const activeFoods = cats.find(c=>c.id===curCat)?.foods||[];

  return (
    <div style={{background:'var(--color-background-primary)',borderRadius:'var(--border-radius-lg)',border:'0.5px solid var(--color-border-tertiary)',padding:'10px 12px',display:'flex',flexDirection:'column',gap:6,minHeight:90}}>
      {/* Protein badge */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:11,color:'var(--color-text-tertiary)'}}>Protéines</span>
        <span style={{fontSize:15,fontWeight:500,color:total>0?'var(--color-text-success)':'var(--color-text-tertiary)'}}>{total}g</span>
      </div>

      {/* Chips */}
      <div style={{display:'flex',flexDirection:'column',gap:4}}>
        {items.map(({food,qty,locked}) => (
          <FoodChip key={food} food={food} qty={qty} locked={locked}
            onQtyChange={updateQty} onRemove={removeFood}/>
        ))}
      </div>

      {/* Combo suggestion (midi only) */}
      {showCombo && (
        <div style={{padding:'6px 8px',background:'var(--color-background-warning)',borderRadius:'var(--border-radius-md)',fontSize:11}}>
          <div style={{color:'var(--color-text-warning)',fontWeight:500,marginBottom:4}}>
            <i className="ti ti-bulb" aria-hidden="true"/> Repas équilibré suggéré :
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:3}}>
            {MIDI_COMBOS.map((c,i) => {
              const tp = r1(c.items.reduce((s,{food,qty})=>s+calcProt(food,qty),0));
              return (
                <button key={i} onClick={()=>applyCombo(c)}
                  style={{background:'none',border:'0.5px solid var(--color-border-warning)',borderRadius:6,padding:'3px 8px',cursor:'pointer',fontSize:11,color:'var(--color-text-warning)',textAlign:'left'}}>
                  {c.label} <span style={{opacity:.7}}>+{tp}g prot.</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Food selector */}
      {open ? (
        <div style={{borderTop:'0.5px solid var(--color-border-tertiary)',paddingTop:8,display:'flex',flexDirection:'column',gap:6}}>
          {/* Category tabs */}
          <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
            {cats.map(c => (
              <button key={c.id} className={`pill-btn${curCat===c.id?' active':''}`}
                onClick={()=>setActiveCat(c.id)}>{c.label}</button>
            ))}
          </div>
          {/* Food pills */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
            {activeFoods.map(food => {
              const f = FOODS[food];
              if (!f || (person.veg && f.nonVeg)) return null;
              const isConst = (person.constants[meal]||[]).some(c=>c.food===food);
              const isSel = food in (person.selections[meal]||{});
              const isSelected = isConst || isSel;
              const isLegDisabled = f.isLegume && legumeUsed && !isSel && !isConst;
              const qty = isConst
                ? (person.constants[meal]||[]).find(c=>c.food===food)?.qty
                : (person.selections[meal]||{})[food] ?? f.stdQty;
              return (
                <button key={food}
                  className={`food-pill${isSelected?(f.isLegume?' legume sel':' sel'):''}${isLegDisabled?' dis':''}`}
                  onClick={()=>!isConst && !isLegDisabled && toggleFood(food)}
                  disabled={isLegDisabled}
                  title={isConst?'Aliment de base':f.note||''}>
                  <div style={{fontWeight:500,fontSize:12,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.label}</div>
                  <div style={{fontSize:11,opacity:.7}}>
                    {calcProt(food, qty||f.stdQty)}g prot · {qty||f.stdQty}{f.unit}
                    {isConst && ' 🔒'}
                  </div>
                </button>
              );
            })}
          </div>
          <button className="pill-btn" onClick={()=>setOpen(false)} style={{alignSelf:'flex-end',marginTop:2}}>
            <i className="ti ti-x" aria-hidden="true"/> Fermer
          </button>
        </div>
      ) : (
        <button className="add-btn" onClick={()=>setOpen(true)}>
          <i className="ti ti-plus" aria-hidden="true"/>
          Ajouter un aliment
        </button>
      )}
    </div>
  );
}

/* ══════════════════ PERSON COLUMN ══════════════════ */
function PersonColumn({person}) {
  const total = getDayProt(person);
  const obj = getObj(person);
  const pct = Math.min(100, Math.round(total / obj * 100));
  const deficit = r1(obj - total);
  const sugs = getSuggestions(person, 'soir');

  const barColor = pct >= 95 ? 'var(--color-text-success)'
    : pct >= 75 ? 'var(--color-text-warning)'
    : 'var(--color-text-danger)';

  return (
    <div style={{background:'var(--color-background-secondary)',borderRadius:'var(--border-radius-lg)',border:'0.5px solid var(--color-border-tertiary)',padding:'10px 12px',display:'flex',flexDirection:'column',gap:8}}>
      <div>
        <div style={{fontWeight:500,fontSize:14,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{person.name}</div>
        <div style={{fontSize:12,color:'var(--color-text-secondary)'}}>{person.weight} kg</div>
        <div style={{display:'flex',gap:4,marginTop:4,flexWrap:'wrap'}}>
          {person.veg && <span style={{fontSize:10,padding:'2px 6px',borderRadius:4,background:'var(--color-background-success)',color:'var(--color-text-success)',border:'0.5px solid var(--color-border-success)'}}>Végé</span>}
          {person.supplement > 0 && <span style={{fontSize:10,padding:'2px 6px',borderRadius:4,background:'var(--color-background-info)',color:'var(--color-text-info)',border:'0.5px solid var(--color-border-info)'}}>+{person.supplement}g suppl.</span>}
        </div>
      </div>

      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:4}}>
          <span style={{fontSize:22,fontWeight:500,color:barColor}}>{total}g</span>
          <span style={{fontSize:11,color:'var(--color-text-tertiary)'}}>/ {obj}g</span>
        </div>
        <div style={{height:6,borderRadius:3,background:'var(--color-border-tertiary)',overflow:'hidden'}}>
          <div style={{height:'100%',width:`${pct}%`,background:barColor,borderRadius:3,transition:'width .3s'}}/>
        </div>
        <div style={{fontSize:11,color:'var(--color-text-tertiary)',marginTop:3}}>{pct}% de l'objectif</div>
      </div>

      {person.supplement > 0 && (
        <div style={{fontSize:11,color:'var(--color-text-secondary)',padding:'4px 6px',background:'var(--color-background-primary)',borderRadius:'var(--border-radius-md)',border:'0.5px solid var(--color-border-tertiary)'}}>
          <i className="ti ti-clock" style={{fontSize:12}} aria-hidden="true"/> 6h — Supplément +{person.supplement}g
        </div>
      )}

      {deficit > 1 && sugs.length > 0 && (
        <div style={{borderTop:'0.5px solid var(--color-border-tertiary)',paddingTop:6}}>
          <div style={{fontSize:11,color:'var(--color-text-warning)',fontWeight:500,marginBottom:4}}>
            <i className="ti ti-arrow-up-circle" aria-hidden="true"/> Suggestions ({r1(deficit)}g manquants)
          </div>
          {sugs.map(({food,qty,prot:pv}) => (
            <div key={food} style={{fontSize:11,color:'var(--color-text-secondary)',padding:'2px 0',display:'flex',justifyContent:'space-between'}}>
              <span>{FOODS[food]?.label}</span>
              <span style={{color:'var(--color-text-success)',fontWeight:500}}>{qty}{FOODS[food]?.unit} · {pv}g</span>
            </div>
          ))}
        </div>
      )}

      {deficit <= 0 && (
        <div style={{fontSize:11,padding:'4px 8px',background:'var(--color-background-success)',color:'var(--color-text-success)',borderRadius:'var(--border-radius-md)',textAlign:'center'}}>
          <i className="ti ti-check" aria-hidden="true"/> Objectif atteint
        </div>
      )}
    </div>
  );
}

/* ══════════════════ TRACKER SCREEN ══════════════════ */
function TrackerScreen({persons, onUpdate, onBack}) {
  const legumeUsedMap = Object.fromEntries(persons.map(p => [p.id, isLegumeUsed(p)]));

  return (
    <div style={{maxWidth:1200,margin:'0 auto',padding:16}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16,padding:'8px 0',position:'sticky',top:0,zIndex:10,background:'var(--color-background-tertiary)'}}>
        <div>
          <span style={{fontSize:18,fontWeight:500}}>Suivi du jour</span>
          <span style={{fontSize:12,color:'var(--color-text-secondary)',marginLeft:10}}>1,6 g protéines / kg / jour</span>
        </div>
        <button className="pill-btn" onClick={onBack}>
          <i className="ti ti-settings" aria-hidden="true"/> Modifier les personnes
        </button>
      </div>

      {/* Matrix */}
      <div style={{display:'grid',gridTemplateColumns:'190px 1fr 1fr 1fr',gap:'6px 10px',alignItems:'start'}}>
        {/* Header row */}
        <div/>
        {['pdj','midi','soir'].map(meal => (
          <div key={meal} style={{fontSize:13,fontWeight:500,color:'var(--color-text-secondary)',padding:'0 4px 6px',textAlign:'center',borderBottom:'0.5px solid var(--color-border-tertiary)'}}>
            {meal==='pdj' && <><i className="ti ti-sun-low" aria-hidden="true"/> </>}
            {meal==='midi' && <><i className="ti ti-sun" aria-hidden="true"/> </>}
            {meal==='soir' && <><i className="ti ti-moon" aria-hidden="true"/> </>}
            {MEAL_LABELS[meal]}
          </div>
        ))}

        {/* Person rows */}
        {persons.flatMap(person => [
          <PersonColumn key={person.id+'-col'} person={person}/>,
          ...['pdj','midi','soir'].map(meal => (
            <MealCell key={person.id+'-'+meal}
              person={person} meal={meal} onUpdate={onUpdate}
              legumeUsed={legumeUsedMap[person.id]}/>
          ))
        ])}
      </div>
    </div>
  );
}

/* ══════════════════ CONSTANTS EDITOR ══════════════════ */
function ConstantsEditor({person, meal, onChange}) {
  const [newFood, setNewFood] = useState('');
  const [newQty, setNewQty] = useState(50);
  const cats = MEAL_MENUS[meal].filter(c => !c.nonVegOnly || !person.veg);
  const allFoods = cats.flatMap(c => c.foods);

  const addConst = () => {
    if (!newFood) return;
    const f = FOODS[newFood];
    if (!f) return;
    if ((person.constants[meal]||[]).some(c=>c.food===newFood)) return;
    onChange(meal, [...(person.constants[meal]||[]), {food:newFood, qty:newQty}]);
    setNewFood(''); setNewQty(FOODS[newFood]?.stdQty||50);
  };

  const removeConst = food => onChange(meal, (person.constants[meal]||[]).filter(c=>c.food!==food));
  const updateConst = (food, qty) => onChange(meal, (person.constants[meal]||[]).map(c=>c.food===food?{...c,qty}:c));

  return (
    <div style={{marginTop:4}}>
      <div style={{display:'flex',flexDirection:'column',gap:4,marginBottom:6}}>
        {(person.constants[meal]||[]).map(({food,qty}) => {
          const f = FOODS[food]; if (!f) return null;
          return (
            <div key={food} className="chip">
              <span style={{flex:1,fontSize:12,fontWeight:500}}>{f.label}</span>
              <input type="number" className="qty-in" value={qty} min={1}
                onChange={e=>updateConst(food,Math.max(1,Number(e.target.value)))}/>
              <span style={{fontSize:11,color:'var(--color-text-tertiary)'}}>{f.unit}</span>
              <span style={{fontSize:11,color:'var(--color-text-success)',fontWeight:500}}>{calcProt(food,qty)}g</span>
              <button className="rm-btn" onClick={()=>removeConst(food)}>×</button>
            </div>
          );
        })}
      </div>
      <div style={{display:'flex',gap:6,alignItems:'center'}}>
        <select value={newFood} onChange={e=>{setNewFood(e.target.value);if(e.target.value)setNewQty(FOODS[e.target.value]?.stdQty||50)}}
          style={{flex:1,fontSize:12,minWidth:0}}>
          <option value="">— Ajouter un aliment —</option>
          {cats.map(c=>(
            <optgroup key={c.id} label={c.label}>
              {c.foods.filter(f=>!(person.constants[meal]||[]).some(x=>x.food===f)).map(f=>(
                <option key={f} value={f}>{FOODS[f]?.label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <input type="number" value={newQty} min={1} style={{width:60,fontSize:12}}
          onChange={e=>setNewQty(Math.max(1,Number(e.target.value)))}/>
        <span style={{fontSize:11,color:'var(--color-text-tertiary)',minWidth:20}}>{newFood?FOODS[newFood]?.unit:'g'}</span>
        <button className="pill-btn" onClick={addConst} disabled={!newFood}
          style={{padding:'4px 10px'}}>
          <i className="ti ti-plus" aria-hidden="true"/>
        </button>
      </div>
      {newFood && <div style={{fontSize:11,color:'var(--color-text-tertiary)',marginTop:2}}>{FOODS[newFood]?.note||''}</div>}
    </div>
  );
}

/* ══════════════════ PERSON SETUP CARD ══════════════════ */
function PersonSetupCard({person, onChange, onRemove, canRemove}) {
  const [openMeal, setOpenMeal] = useState(null);

  const updateConsts = (meal, newConsts) => {
    onChange({...person, constants:{...person.constants,[meal]:newConsts}});
  };

  return (
    <div style={{background:'var(--color-background-primary)',borderRadius:'var(--border-radius-lg)',border:'0.5px solid var(--color-border-tertiary)',overflow:'hidden'}}>
      <div style={{padding:'10px 14px',borderBottom:'0.5px solid var(--color-border-tertiary)',background:'var(--color-background-secondary)',display:'flex',alignItems:'center',gap:8}}>
        <input value={person.name} onChange={e=>onChange({...person,name:e.target.value})}
          style={{flex:1,fontSize:14,fontWeight:500,border:'none',background:'transparent',outline:'none',color:'var(--color-text-primary)'}}
          placeholder="Nom de la personne"/>
        {canRemove && <button className="rm-btn" onClick={onRemove} style={{fontSize:16}}>×</button>}
      </div>

      <div style={{padding:'10px 14px',display:'flex',flexDirection:'column',gap:10}}>
        {/* Weight + veg */}
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <label style={{fontSize:12,color:'var(--color-text-secondary)',display:'flex',alignItems:'center',gap:6}}>
            <i className="ti ti-weight" aria-hidden="true"/>
            <input type="number" value={person.weight} min={30} max={250}
              onChange={e=>onChange({...person,weight:Math.max(30,Number(e.target.value))})}
              style={{width:60,fontSize:13}}/>
            kg
          </label>
          <label style={{fontSize:12,color:'var(--color-text-secondary)',display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}>
            <input type="checkbox" checked={person.veg} onChange={e=>onChange({...person,veg:e.target.checked})}/>
            Végétarien(ne)
          </label>
          <label style={{fontSize:12,color:'var(--color-text-secondary)',display:'flex',alignItems:'center',gap:6}}>
            Supplément :
            <input type="number" value={person.supplement} min={0}
              onChange={e=>onChange({...person,supplement:Math.max(0,Number(e.target.value))})}
              style={{width:52,fontSize:12}}/>
            g/j
          </label>
        </div>

        {/* Objective */}
        <div style={{fontSize:12,color:'var(--color-text-success)',padding:'4px 8px',background:'var(--color-background-success)',borderRadius:'var(--border-radius-md)'}}>
          <i className="ti ti-target" aria-hidden="true"/> Objectif : <strong>{getObj(person)}g</strong> de protéines/jour ({person.weight} × 1,6)
        </div>

        {/* Constants per meal */}
        {(['pdj','midi','soir']).map(meal => (
          <div key={meal}>
            <button className="pill-btn" style={{width:'100%',justifyContent:'space-between',display:'flex'}}
              onClick={()=>setOpenMeal(openMeal===meal?null:meal)}>
              <span><i className={`ti ti-${meal==='pdj'?'sun-low':meal==='midi'?'sun':'moon'}`} aria-hidden="true"/> {MEAL_LABELS[meal]} — Aliments de base</span>
              <span style={{color:'var(--color-text-success)',fontWeight:500}}>
                {r1((person.constants[meal]||[]).reduce((s,{food,qty})=>s+calcProt(food,qty),0))}g
                <i className={`ti ti-chevron-${openMeal===meal?'up':'down'}`} style={{marginLeft:4}} aria-hidden="true"/>
              </span>
            </button>
            {openMeal===meal && (
              <div style={{marginTop:6,paddingLeft:4}}>
                <ConstantsEditor person={person} meal={meal} onChange={updateConsts}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════ SETUP SCREEN ══════════════════ */
function SetupScreen({persons, setPersons, onStart}) {
  const updatePerson = (id, updated) => setPersons(ps => ps.map(p=>p.id===id?updated:p));
  const removePerson = id => setPersons(ps => ps.filter(p=>p.id!==id));
  const addPerson = () => setPersons(ps => [...ps, {
    id:mkId(), name:`Personne ${ps.length+1}`, weight:70, veg:false, supplement:0,
    constants:{pdj:[],midi:[],soir:[]}, selections:{pdj:{},midi:{},soir:{}}
  }]);

  return (
    <div style={{maxWidth:860,margin:'0 auto',padding:20}}>
      <h2 style={{marginBottom:4,fontSize:22}}>
        <i className="ti ti-salad" aria-hidden="true"/> Calculateur de protéines
      </h2>
      <p style={{fontSize:13,color:'var(--color-text-secondary)',marginBottom:18}}>
        Colombie · 1,6 g / kg / jour · Sportifs (Morton et al., 2018)
      </p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:12,marginBottom:14}}>
        {persons.map(p => (
          <PersonSetupCard key={p.id} person={p}
            onChange={updated => updatePerson(p.id, updated)}
            onRemove={() => removePerson(p.id)}
            canRemove={persons.length > 1}/>
        ))}
      </div>

      <div style={{display:'flex',gap:10,justifyContent:'space-between',alignItems:'center'}}>
        <button className="pill-btn" onClick={addPerson} style={{padding:'7px 14px'}}>
          <i className="ti ti-plus" aria-hidden="true"/> Ajouter une personne
        </button>
        <button onClick={onStart}
          style={{padding:'9px 22px',background:'var(--color-background-success)',color:'var(--color-text-success)',border:'0.5px solid var(--color-border-success)',borderRadius:'var(--border-radius-md)',cursor:'pointer',fontSize:14,fontWeight:500,display:'flex',alignItems:'center',gap:8}}>
          Commencer le suivi <i className="ti ti-arrow-right" aria-hidden="true"/>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════ APP ══════════════════ */
export default function App() {
  const [phase, setPhase] = useState('setup');
  const [persons, setPersons] = useState(DEFAULT_PERSONS);

  const updatePerson = useCallback((id, patch) => {
    setPersons(ps => ps.map(p => p.id===id ? {...p,...patch} : p));
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <h2 className="sr-only">Calculateur de protéines journalières</h2>
      {phase==='setup'
        ? <SetupScreen persons={persons} setPersons={setPersons} onStart={()=>setPhase('tracker')}/>
        : <TrackerScreen persons={persons} onUpdate={updatePerson} onBack={()=>setPhase('setup')}/>
      }
    </>
  );
}
