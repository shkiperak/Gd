const initialObjects = [
    { id: 'obj-1', name: 'Дворцовая наб. 12 (Подвал)', type: 'Инъектирование и заделка штроб', logs: [
        { date: '2026-11-03', type: 'Проштроблено швов (п.м.)', val: 15, note: 'Шов 25х25 мм' },
        { date: '2026-11-04', type: 'Закачано ПенеПурФом (кг)', val: 24, note: 'ПенеПурФом 1К' }
    ]},
    { id: 'obj-2', name: 'ЖК Невский Пассаж', type: 'Бетонирование пристенков и стяжек', logs: [
        { date: '2026-11-04', type: 'Залито ЦПС / пристенков (м³)', val: 2.5, note: 'Жгут Пенебар 12м' }
    ]}
];

const initialTools = [
    { id: 't-1', name: 'Инъекционный насос 1К/2К', sn: 'PUMP-992', status: 'obj-1' },
    { id: 't-2', name: 'Перфоратор SDS-Max Bosch', sn: 'BSH-004', status: 'obj-2' },
    { id: 't-3', name: 'Глубинный вибратор (вала 3м)', sn: 'VIB-102', status: 'sklad' },
    { id: 't-4', name: 'Штроборез + Пылесос', sn: 'STR-44', status: 'repair' }
];

const initialShifts = [
    { id: 's-1', worker: 'Алексей М.', objId: 'obj-1', hours: 8, rate: 4500, date: '2026-11-04' },
    { id: 's-2', worker: 'Дмитрий К.', objId: 'obj-1', hours: 8, rate: 4500, date: '2026-11-04' }
];

const CHECKLIST_VERSION = 'v2';

const defaultChecklists = {
    strobe_inject: [
        { cat: '⚡ Электроинструмент', items: [
            { text: 'Насос д/смолы', checked: true },
            { text: 'Насос д/воды', checked: false },
            { text: 'Шуруповёрт', checked: false },
            { text: 'Перфоратор (бурение)', checked: false },
            { text: 'Перфоратор (отбойник)', checked: false },
            { text: 'Миксер', checked: false },
            { text: 'Пылесос', checked: false },
            { text: 'УШМ (болгарка)', checked: false },
            { text: 'Прожектор', checked: false },
            { text: 'Удлинитель', checked: false }
        ]},
        { cat: '🔧 Ручной инструмент и оснастка', items: [
            { text: 'Головка д/пакеров 8', checked: false },
            { text: 'Головка д/пакеров 10', checked: false },
            { text: 'Пылеотвод д/перфа', checked: false },
            { text: 'Пылеотвод д/ушм', checked: false },
            { text: 'Венчик', checked: false },
            { text: 'Пассатижи', checked: false },
            { text: 'Молоток', checked: false },
            { text: 'Жук', checked: false },
            { text: 'Шпатели', checked: false },
            { text: 'Рулетка', checked: false },
            { text: 'Кисть маклавица', checked: false },
            { text: 'Карандаш / маркер', checked: false }
        ]},
        { cat: '📦 Расходники и мелочь', items: [
            { text: 'Пакеры 8', checked: false },
            { text: 'Пакеры 10', checked: false },
            { text: 'Муфты', checked: false },
            { text: 'Лопатки д/sds+/sdsmax', checked: false },
            { text: 'Бур 10', checked: false },
            { text: 'Бур 6', checked: false },
            { text: 'Масло', checked: false },
            { text: 'Растворитель', checked: false },
            { text: 'Мешки д/пылесоса', checked: false },
            { text: 'Мешки д/мусора', checked: false },
            { text: 'Плёнка укрывная', checked: false },
            { text: 'Ветошь', checked: false },
            { text: 'Ёмкости (ведра 20л, тазы 60л)', checked: false },
            { text: 'Саморезы', checked: false },
            { text: 'Сарматы', checked: false },
            { text: 'Уголок металический', checked: false }
        ]},
        { cat: '🧪 Материалы', items: [
            { text: 'Смола / Акрилатный гель + Отвердитель', checked: false },
            { text: 'Обмазочная Гидроизоляция', checked: false },
            { text: 'Гидропломба', checked: false },
            { text: 'Шовный состав («Ремстрим Т»)', checked: false }
        ]}
    ],
    concrete: [
        { cat: '⚡ Электроинструмент', items: [
            { text: 'Глубинный вибратор', checked: true },
            { text: 'Перфоратор', checked: false },
            { text: 'Шуруповёрт', checked: false },
            { text: 'Миксер / Бетономешалка', checked: false },
            { text: 'Прожектор освещения', checked: false },
            { text: 'Удлинитель', checked: false }
        ]},
        { cat: '🔧 Ручной инструмент и оснастка', items: [
            { text: 'Мастерок, гладилки, правила 2м', checked: false },
            { text: 'Рулетка', checked: false },
            { text: 'Карандаш / маркер', checked: false },
            { text: 'Ёмкости (ведра 20л, тазы 60л)', checked: false },
            { text: 'Крюк вязальный', checked: false },
            { text: 'Жук', checked: false },
            { text: 'Кувалда мал', checked: false },
            { text: 'Бур 6', checked: false },
            { text: 'Биты д/шурика', checked: false },
            { text: 'Молоток', checked: false }
        ]},
        { cat: '📦 Расходники и крепеж', items: [
            { text: 'Мешки д/мусора', checked: false },
            { text: 'Уголок металлический', checked: false },
            { text: 'Саморезы', checked: false },
            { text: 'Сарматы', checked: false },
            { text: 'Уголок металический', checked: false },
            { text: 'Проволока вязальная', checked: false }
        ]},
        { cat: '🧪 Материалы и опалубка', items: [
            { text: 'Сухая смесь ЦПС (мешки 25 кг)', checked: true },
            { text: 'Щиты опалубки / Фанера + Шпильки/Гайки', checked: true },
            { text: 'Доска обрезная / Брус', checked: false },
            { text: 'Гидропрокладка / Жгут «Пенебар»', checked: false },
            { text: 'Сетка/перфолента д/пенебар', checked: false },
            { text: 'Плёнка укрывная (для бетона)', checked: true }
        ]}
    ]
};

let db = { objects: initialObjects, tools: initialTools, shifts: initialShifts, checklists: defaultChecklists, qrLinks: {} };

try {
    const savedObj = localStorage.getItem('hydro_objects');
    const savedTools = localStorage.getItem('hydro_tools');
    const savedShifts = localStorage.getItem('hydro_shifts');
    const savedCl = localStorage.getItem('hydro_checklists_v3');
    const savedVersion = localStorage.getItem('hydro_checklist_version');
    const savedQr = localStorage.getItem('hydro_qr_links');

    if (savedObj) { const parsed = JSON.parse(savedObj); if (Array.isArray(parsed)) db.objects = parsed; }
    if (savedTools) { const parsed = JSON.parse(savedTools); if (Array.isArray(parsed)) db.tools = parsed; }
    if (savedShifts) { const parsed = JSON.parse(savedShifts); if (Array.isArray(parsed)) db.shifts = parsed; }
    
    if (savedQr) {
        db.qrLinks = JSON.parse(savedQr);
    }

    if (savedVersion !== CHECKLIST_VERSION) {
        db.checklists = defaultChecklists;
        localStorage.setItem('hydro_checklists_v3', JSON.stringify(db.checklists));
        localStorage.setItem('hydro_checklist_version', CHECKLIST_VERSION);
    } else if (savedCl) {
        const parsed = JSON.parse(savedCl);
        if (typeof parsed === 'object') db.checklists = parsed;
    }
} catch(e) {
    console.error('Ошибка чтения БД', e);
}

function saveData() {
    try {
        localStorage.setItem('hydro_objects', JSON.stringify(db.objects));
        localStorage.setItem('hydro_tools', JSON.stringify(db.tools));
        localStorage.setItem('hydro_shifts', JSON.stringify(db.shifts));
        localStorage.setItem('hydro_checklists_v3', JSON.stringify(db.checklists));
        localStorage.setItem('hydro_checklist_version', CHECKLIST_VERSION);
        localStorage.setItem('hydro_qr_links', JSON.stringify(db.qrLinks));
    } catch(e) { console.error('Save error', e); }
}

async function exportBackup() {
    const backupData = JSON.stringify(db, null, 2);
    const blob = new Blob([backupData], { type: 'application/json' });
    const fileName = `GidroDel_Backup_${new Date().toISOString().split('T')[0]}.json`;
    if (navigator.canShare && navigator.canShare({ files: [new File([blob], fileName, { type: 'application/json' })] })) {
        try {
            await navigator.share({ title: 'Резервная копия', files: [new File([blob], fileName, { type: 'application/json' })] });
            return;
        } catch (err) { if (err.name !== 'AbortError') console.log('Share fallback:', err); }
    }
    const ta = document.getElementById('backup-json-textarea');
    if (ta) {
        ta.value = backupData;
        toggleInfoModal();
        document.getElementById('modal-backup-text').classList.remove('hidden');
    }
}

function copyBackupText() {
    const ta = document.getElementById('backup-json-textarea');
    if (!ta) return;
    ta.select();
    navigator.clipboard.writeText(ta.value).then(() => alert('✅ Скопировано!')).catch(() => alert('Скопируйте вручную.'));
}

function importBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported && imported.objects && imported.tools && imported.shifts) {
                db.objects = imported.objects;
                db.tools = imported.tools;
                db.shifts = imported.shifts;
                saveData();
                alert('✅ Копия восстановлена!');
                location.reload();
            } else { alert('❌ Неверная структура файла.'); }
        } catch(err) { alert('❌ Ошибка чтения JSON: ' + err.message); }
    };
    reader.readAsText(file);
}

let pendingConfirmCallback = null;
function askConfirm(text, callback, yesText = 'Удалить', noText = 'Отмена', noCallback = null) {
    const textElem = document.getElementById('confirm-text');
    const yesBtn = document.getElementById('confirm-yes-btn');
    
    if (textElem) textElem.innerText = text;
    if (yesBtn) yesBtn.innerText = yesText;

    pendingConfirmCallback = callback;
    if (yesBtn) {
        yesBtn.onclick = function() {
            closeModal('modal-confirm');
            if (typeof pendingConfirmCallback === 'function') { 
                pendingConfirmCallback(); 
                pendingConfirmCallback = null; 
            }
        };
    }

    const noBtn = document.querySelector("#modal-confirm button[onclick*=\"closeModal\"]");
    if (noBtn) {
        noBtn.innerText = noText;
        noBtn.onclick = function() {
            closeModal('modal-confirm');
            if (typeof noCallback === 'function') noCallback();
        };
        noBtn.className = noText === 'Отмена' ? 
            "px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-semibold text-slate-300" : 
            "px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/40 rounded-xl text-xs font-bold";
    }

    document.getElementById('modal-confirm').classList.remove('hidden');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => { 
        el.classList.remove('text-amber-400', 'border-amber-500/50', 'bg-amber-500/10');
        el.classList.add('text-slate-400', 'border-slate-700/50', 'bg-slate-800/30');
    });
    
    const targetTab = document.getElementById(`tab-${tabId}`);
    const targetNav = document.getElementById(`nav-${tabId}`);
    
    if (targetTab) targetTab.classList.remove('hidden');
    if (targetNav) { 
        targetNav.classList.add('text-amber-400', 'border-amber-500/50', 'bg-amber-500/10');
        targetNav.classList.remove('text-slate-400', 'border-slate-700/50', 'bg-slate-800/30');
    }
    
    if (tabId === 'objects') renderObjects();
    if (tabId === 'checklists') { toggleCalcInputs(); renderChecklist(); calculateMaterials(); }
    if (tabId === 'tools') renderTools();
    if (tabId === 'workers') renderWorkers();
}
    
function renderObjects() {
    const container = document.getElementById('objects-list');
    if (!container) return;
    try {
        if (!db.objects || db.objects.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 px-4 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
                    <p class="text-slate-400 text-sm mb-4">Список объектов пуст.</p>
                    <button onclick="clearAllData()" class="text-xs text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg">Если видите эту надпись из-за ошибки — нажмите сюда для сброса</button>
                </div>`;
            return;
        }

        container.innerHTML = db.objects.map(obj => {
            const logsHtml = obj.logs && obj.logs.length > 0
                ? obj.logs.map((l, lIdx) => {
                    let displayVal = l.val;
                    let displayType = l.type;
                    if (l.type === 'Залито ЦПС (мешки 25кг)') {
                        const vol = ((l.val * 25) / 2200).toFixed(2);
                        displayVal = `${l.val} меш. (~${vol} м³)`;
                        displayType = 'Залито ЦПС';
                    }
                    return `
                    <div class="flex justify-between items-center text-xs py-1.5 border-b border-slate-700/50 gap-2">
                        <span class="text-slate-300 font-medium">${displayType}: <b class="text-amber-400">${displayVal}</b> <span class="text-slate-400 font-normal">(${l.note || '—'})</span></span>
                        <div class="flex items-center gap-2 shrink-0">
                            <span class="text-slate-500 text-[10px]">${l.date}</span>
                            <button type="button" onclick="openEditLogModal('${String(obj.id)}', ${lIdx})" class="text-slate-400 hover:text-amber-400 p-1"><i class="fa-solid fa-pen text-[10px]"></i></button>
                            <button type="button" onclick="event.stopPropagation(); deleteWorkLog('${String(obj.id)}', ${lIdx})" class="text-slate-500 hover:text-red-400 p-1"><i class="fa-solid fa-trash text-[10px]"></i></button>
                        </div>
                    </div>`;
                }).join('')
                : `<p class="text-xs text-slate-500 italic">Выработка еще не вносилась</p>`;
            return `
                <div class="bg-slate-800 border border-slate-700 rounded-2xl p-4 shadow-md space-y-3">
                    <div class="flex justify-between items-start">
                        <div><h3 class="font-bold text-white text-base">${obj.name}</h3><p class="text-xs text-amber-400/90 font-medium">${obj.type}</p></div>
                        <button type="button" onclick="event.stopPropagation(); deleteObject('${String(obj.id)}')" class="text-slate-500 hover:text-red-400 p-1.5 bg-slate-900/40 rounded-lg"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div>
                    <div class="bg-slate-900/60 rounded-xl p-3 border border-slate-700/40 space-y-1">
                        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex justify-between"><span>Журнал выработки</span><i class="fa-solid fa-clock-rotate-left"></i></div>
                        ${logsHtml}
                    </div>
                    <button type="button" onclick="openAddLogModal('${String(obj.id)}')" class="w-full bg-slate-700 hover:bg-slate-600 active:scale-95 text-amber-400 text-xs font-bold py-2 rounded-xl border border-slate-600 flex items-center justify-center gap-1"><i class="fa-solid fa-plus"></i> Внести объем</button>
                </div>`;
        }).join('');
    } catch(e) {
        console.error('Критическая ошибка рендера', e);
        container.innerHTML = `<div class="text-center py-8 text-red-400 text-sm">Ошибка базы данных.<br><button onclick="clearAllData()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl">Сбросить данные</button></div>`;
    }
}

function openNewObjectModal() {
    document.getElementById('obj-name-input').value = '';
    document.getElementById('obj-type-input').value = '';
    document.getElementById('modal-object').classList.remove('hidden');
}

function saveNewObject() {
    const name = document.getElementById('obj-name-input').value.trim();
    const type = document.getElementById('obj-type-input').value.trim();
    if (!name) return alert('Укажите название объекта');
    db.objects.push({ id: 'obj-' + Date.now(), name, type: type || 'Штробление, инъектирование', logs: [] });
    saveData(); closeModal('modal-object'); renderObjects();
}

function deleteObject(id) {
    askConfirm('Удалить объект и всю историю?', function() {
        db.objects = db.objects.filter(o => String(o.id) !== String(id));
        saveData(); renderObjects();
    });
}

function openAddLogModal(objId) {
    document.getElementById('log-modal-title').innerHTML = `<i class="fa-solid fa-list-check"></i> Запись`;
    document.getElementById('log-obj-id').value = String(objId);
    document.getElementById('log-edit-idx').value = '';
    document.getElementById('log-val-input').value = '';
    document.getElementById('log-note-input').value = '';
    document.getElementById('modal-log').classList.remove('hidden');
}

function openEditLogModal(objId, logIdx) {
    const obj = db.objects.find(o => String(o.id) === String(objId));
    if (!obj || !obj.logs[logIdx]) return;
    const log = obj.logs[logIdx];
    document.getElementById('log-modal-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Ред.`;
    document.getElementById('log-obj-id').value = String(objId);
    document.getElementById('log-edit-idx').value = logIdx;
    document.getElementById('log-type-input').value = log.type;
    document.getElementById('log-val-input').value = log.val;
    document.getElementById('log-note-input').value = log.note || '';
    document.getElementById('modal-log').classList.remove('hidden');
}

function saveWorkLog() {
    const objId = document.getElementById('log-obj-id').value;
    const editIdx = document.getElementById('log-edit-idx').value;
    const type = document.getElementById('log-type-input').value;
    const valInput = document.getElementById('log-val-input').value.replace(',', '.');
    const val = parseFloat(valInput);
    const note = document.getElementById('log-note-input').value.trim();
    if (!val || val <= 0) return alert('Введите корректное число');
    
    const obj = db.objects.find(o => String(o.id) === String(objId));
    if (obj) {
        if (!obj.logs) obj.logs = [];
        if (editIdx !== '') {
            const idx = parseInt(editIdx);
            if (obj.logs[idx]) { obj.logs[idx].type = type; obj.logs[idx].val = val; obj.logs[idx].note = note; }
        } else {
            obj.logs.unshift({ date: new Date().toISOString().split('T')[0], type, val, note });
        }
        saveData(); closeModal('modal-log'); renderObjects();
    }
}

function deleteWorkLog(objId, logIdx) {
    askConfirm('Удалить запись?', function() {
        const obj = db.objects.find(o => String(o.id) === String(objId));
        if (obj && obj.logs && obj.logs[logIdx] !== undefined) {
            obj.logs.splice(logIdx, 1); saveData(); renderObjects();
        }
    });
}

function toggleCalcInputs() {
    const typeElem = document.getElementById('calc-type');
    if (!typeElem) return;
    const type = typeElem.value;
    document.querySelectorAll('.calc-sub-input').forEach(el => el.classList.add('hidden'));
    const sub = document.getElementById(`inputs-${type}`);
    if (sub) sub.classList.remove('hidden');
    calculateMaterials();
}

function calculateMaterials() {
    const typeElem = document.getElementById('calc-type');
    if (!typeElem) return;
    const type = typeElem.value;
    const margin = (parseFloat(document.getElementById('calc-margin').value) || 0) / 100 + 1;
    const res = document.getElementById('calc-results');
    if (!res) return;
    
    if (type === 'strobe') {
        const len = parseFloat(document.getElementById('strobe-length').value) || 0;
        const bags = Math.ceil((len / 11) * margin);
        const totalKg = bags * 25;
        const gruntKg = (len * 0.2 * margin).toFixed(1);
        res.innerHTML = `
            <div class="flex justify-between font-bold text-white"><span>Состав:</span><span class="text-amber-400">${bags} меш. (${totalKg} кг)</span></div>
            <div class="flex justify-between text-xs text-slate-300"><span>Грунтовка:</span><span>~${gruntKg} кг</span></div>`;
    } else if (type === 'inject') {
        const len = parseFloat(document.getElementById('inj-length').value) || 0;
        const resinType = document.getElementById('inj-resin-type').value;
        const resinName = resinType === '1k' ? '1К' : '65';
        const packers = Math.ceil(len * 7 * margin);
        const resinKg = (len * 2.0 * margin).toFixed(1);
        res.innerHTML = `
            <div class="flex justify-between font-bold text-white"><span>Пакеры:</span><span class="text-amber-400">${packers} шт</span></div>
            <div class="flex justify-between font-bold text-white"><span>Смола (${resinName}):</span><span class="text-amber-400">~${resinKg} кг</span></div>`;
    } else if (type === 'concrete') {
        const bL = parseFloat(document.getElementById('beton-l').value) || 0;
        const bH = parseFloat(document.getElementById('beton-h').value) || 0;
        const bT = (parseFloat(document.getElementById('beton-t').value) || 0) / 100;
        const penebarL = parseFloat(document.getElementById('penebar-l').value) || 0;
        
        const cpsVol = bL * bH * bT * margin;
        const cpsKg = cpsVol * 2200;
        const cpsBags = Math.ceil(cpsKg / 25);
        const faneraSqm = (bL * bH * 2 * margin).toFixed(1);
        const faneraSheets = Math.ceil(faneraSqm / 2.31);
        const penebarMeters = Math.ceil(penebarL * margin);
        const penebarRolls = Math.ceil(penebarMeters / 5);

        const m25 = parseFloat(document.getElementById('doska-25-m').value) || 0;
        const m40 = parseFloat(document.getElementById('doska-40-m').value) || 0;
        const w = (parseFloat(document.getElementById('doska-w').value) || 150) / 1000;
        let doskaHtml = '';
        
        if (m25 > 0) {
            const vol25 = (m25 * w * 0.025).toFixed(3);
            const pieces25 = Math.ceil(m25 / 6);
            doskaHtml += `<div class="flex justify-between text-xs text-slate-300 mt-2"><span>Доска 25мм (дюймовка):</span><span>${vol25} м³ (${pieces25} шт по 6м)</span></div>`;
        }
        if (m40 > 0) {
            const vol40 = (m40 * w * 0.040).toFixed(3);
            const pieces40 = Math.ceil(m40 / 6);
            doskaHtml += `<div class="flex justify-between text-xs text-slate-300 mt-1"><span>Доска 40мм (сороковка):</span><span>${vol40} м³ (${pieces40} шт по 6м)</span></div>`;
        }
        if (m25 === 0 && m40 === 0) {
            doskaHtml = `<div class="text-xs text-slate-500 italic mt-2">Доски не рассчитаны (не введен метраж)</div>`;
        }

        res.innerHTML = `
            <div class="flex justify-between font-bold text-white"><span>ЦПС (25кг):</span><span class="text-amber-400">${cpsBags} меш. (${cpsVol.toFixed(2)} м³)</span></div>
            <div class="flex justify-between text-xs text-slate-300 mt-1"><span>Фанера (1.52х1.52):</span><span>${faneraSqm} м² (~${faneraSheets} л.)</span></div>
            <div class="flex justify-between font-semibold text-amber-300 text-xs mt-1"><span>Пенебар:</span><span>${penebarMeters} м.п. (${penebarRolls} рул.)</span></div>
            <div class="border-t border-slate-700/50 my-2"></div>
            ${doskaHtml}`;
    }
}

function renderChecklist() {
    const presetSelect = document.getElementById('checklist-preset');
    if (!presetSelect) return;
    const presetKey = presetSelect.value;
    const groups = db.checklists[presetKey] || [];
    const container = document.getElementById('checklist-items');
    if (!container) return;
    
    container.innerHTML = groups.map((group, gIdx) => `
        <div class="mt-4 mb-2 text-xs font-bold text-amber-500 uppercase tracking-wider">${group.cat}</div>
        <div class="space-y-2">
            ${group.items.map((item, iIdx) => `
                <div onclick="toggleChecklistItem('${presetKey}', ${gIdx}, ${iIdx})" class="flex items-center gap-3 p-3 bg-slate-900/80 rounded-xl border ${item.checked ? 'border-amber-500/40 bg-amber-500/5' : 'border-slate-700/60'} cursor-pointer transition-all">
                    <div class="w-5 h-5 rounded-lg border flex items-center justify-center ${item.checked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-500'}">${item.checked ? '<i class="fa-solid fa-check text-xs font-black"></i>' : ''}</div>
                    <span class="text-xs ${item.checked ? 'line-through text-slate-400' : 'text-slate-200 font-medium'}">${item.text}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function toggleChecklistItem(presetKey, gIdx, iIdx) {
    if (db.checklists[presetKey] && db.checklists[presetKey][gIdx] && db.checklists[presetKey][gIdx].items[iIdx]) {
        db.checklists[presetKey][gIdx].items[iIdx].checked = !db.checklists[presetKey][gIdx].items[iIdx].checked;
        saveData(); renderChecklist();
    }
}

function resetChecklist() {
    const presetSelect = document.getElementById('checklist-preset');
    if (!presetSelect) return;
    const presetKey = presetSelect.value;
    if (db.checklists[presetKey]) {
        db.checklists[presetKey].forEach(group => {
            group.items.forEach(item => item.checked = false);
        });
        saveData(); renderChecklist();
    }
}

let currentToolFilter = 'all';
function filterTools(filter, e) {
    currentToolFilter = filter;
    document.querySelectorAll('.tool-filter-btn').forEach(btn => { btn.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold'); btn.classList.add('bg-slate-800', 'text-slate-300'); });
    if (e && e.target) { e.target.classList.add('bg-amber-500', 'text-slate-950', 'font-bold'); e.target.classList.remove('bg-slate-800', 'text-slate-300'); }
    renderTools();
}

function getObjectColor(objId) {
    const colors = [
        { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
        { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
        { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
        { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
        { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500/30' },
        { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
        { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
        { bg: 'bg-fuchsia-500/20', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30' }
    ];
    let index = 0;
    if (db.objects) {
        const objIndex = db.objects.findIndex(o => String(o.id) === String(objId));
        if (objIndex >= 0) index = objIndex % colors.length;
    }
    return colors[index];
}

function renderTools() {
    const container = document.getElementById('tools-list');
    if (!container) return;
    let filtered = db.tools || [];
    if (currentToolFilter === 'sklad') filtered = db.tools.filter(t => t.status === 'sklad');
    if (currentToolFilter === 'repair') filtered = db.tools.filter(t => t.status === 'repair');
    if (currentToolFilter === 'object') filtered = db.tools.filter(t => t.status !== 'sklad' && t.status !== 'repair');
    if (filtered.length === 0) { container.innerHTML = `<div class="col-span-2 text-center py-6 text-slate-500 text-sm">Инструментов не найдено</div>`; return; }
    container.innerHTML = filtered.map(t => {
        let statusBadge = '';
        if (t.status === 'sklad') {
            statusBadge = `<span class="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-md text-[10px] font-bold">На складе</span>`;
        } else if (t.status === 'repair') {
            statusBadge = `<span class="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-md text-[10px] font-bold">В ремонте</span>`;
        } else {
            const obj = db.objects.find(o => String(o.id) === String(t.status));
            const objName = obj ? obj.name : 'На объекте';
            const c = getObjectColor(String(t.status));
            statusBadge = `<span class="${c.bg} ${c.text} border ${c.border} px-2 py-0.5 rounded-md text-[10px] font-bold">${objName}</span>`;
        }
        return `
            <div class="bg-slate-800 border border-slate-700 rounded-2xl p-3 shadow-sm space-y-2 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start gap-1 mb-1">
                        <h4 class="font-bold text-slate-200 text-sm leading-tight">${t.name}</h4>
                        <button type="button" onclick="event.stopPropagation(); deleteTool('${String(t.id)}')" class="text-slate-500 hover:text-red-400 p-1"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <p class="text-[11px] text-slate-400">Инв / SN: ${t.sn || 'б/н'}</p>
                </div>
                <div class="pt-2 border-t border-slate-700/60 flex justify-between items-center">
                    ${statusBadge}
                    <button type="button" onclick="openMoveToolModal('${String(t.id)}')" class="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"><i class="fa-solid fa-arrow-right-arrow-left text-[10px]"></i> Переместить</button>
                </div>
            </div>`;
    }).join('');
}

function openNewToolModal() {
    document.getElementById('tool-name-input').value = '';
    document.getElementById('tool-sn-input').value = '';
    const select = document.getElementById('tool-status-input');
    if (select) {
        select.innerHTML = `<option value="sklad">На базе / Складе</option><option value="repair">В ремонте</option>${db.objects.map(o => `<option value="${String(o.id)}">Объект: ${o.name}</option>`).join('')}`;
    }
    document.getElementById('modal-tool').classList.remove('hidden');
}

function saveTool() {
    const name = document.getElementById('tool-name-input').value.trim();
    const sn = document.getElementById('tool-sn-input').value.trim();
    const status = document.getElementById('tool-status-input').value;
    if (!name) return alert('Укажите название');
    db.tools.push({ id: 't-' + Date.now(), name, sn, status });
    saveData(); closeModal('modal-tool'); renderTools();
}

function openMoveToolModal(toolId) {
    const tool = db.tools.find(t => String(t.id) === String(toolId));
    if (!tool) return;
    document.getElementById('move-tool-id').value = tool.id;
    document.getElementById('move-tool-title').innerHTML = `<i class="fa-solid fa-arrow-right-arrow-left"></i> Перемещение: ${tool.name}`;
    const select = document.getElementById('move-tool-target');
    if (select) {
        select.innerHTML = `
            <option value="sklad" ${tool.status === 'sklad' ? 'selected' : ''}>📍 На базе / Складе</option>
            <option value="repair" ${tool.status === 'repair' ? 'selected' : ''}>🛠 В ремонте</option>
            ${db.objects.map(o => `<option value="${String(o.id)}" ${String(o.id) === String(tool.status) ? 'selected' : ''}>🏗 Объект: ${o.name}</option>`).join('')}`;
    }
    document.getElementById('modal-move-tool').classList.remove('hidden');
}

function confirmMoveTool() {
    const toolId = document.getElementById('move-tool-id').value;
    const newStatus = document.getElementById('move-tool-target').value;
    const tool = db.tools.find(t => String(t.id) === String(toolId));
    if (tool) { tool.status = newStatus; saveData(); closeModal('modal-move-tool'); renderTools(); }
}

function deleteTool(id) {
    askConfirm('Удалить инструмент?', function() {
        db.tools = db.tools.filter(t => String(t.id) !== String(id));
        saveData(); renderTools();
    });
}

function formatMonthName(yearMonthStr) {
    if (!yearMonthStr) return '';
    const parts = String(yearMonthStr).split('-');
    if (parts.length < 2) return yearMonthStr;
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
    return date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
}

function renderWorkers() {
    const summaryContainer = document.getElementById('workers-summary');
    const historyContainer = document.getElementById('shifts-history');
    const monthSelect = document.getElementById('statement-month-select');
    if (!summaryContainer || !historyContainer || !monthSelect) return;
    const monthsSet = new Set();
    if (Array.isArray(db.shifts)) db.shifts.forEach(s => { if (s && s.date) monthsSet.add(String(s.date).substring(0, 7)); });
    monthsSet.add(new Date().toISOString().substring(0, 7));
    const sortedMonths = Array.from(monthsSet).sort().reverse();
    const selectedMonth = monthSelect.value && monthsSet.has(monthSelect.value) ? monthSelect.value : sortedMonths[0];
    monthSelect.innerHTML = sortedMonths.map(ym => `<option value="${ym}" ${ym === selectedMonth ? 'selected' : ''}>${formatMonthName(ym)}</option>`).join('');
    const filteredShifts = (db.shifts || []).filter(s => s && s.date && String(s.date).substring(0, 7) === selectedMonth);
    const summary = {};
    filteredShifts.forEach(s => {
        if (!summary[s.worker]) summary[s.worker] = { totalHours: 0, totalPay: 0 };
        const hours = parseFloat(s.hours) || 0;
        const rate = parseFloat(s.rate) || 0;
        summary[s.worker].totalHours += hours;
        summary[s.worker].totalPay += (rate / 8) * hours;
    });
    const workerNames = Object.keys(summary);
    if (workerNames.length === 0) {
        summaryContainer.innerHTML = `<p class="text-xs text-slate-500 py-2">Нет ведомости за месяц</p>`;
    } else {
        summaryContainer.innerHTML = workerNames.map(w => `
            <div class="flex justify-between items-center p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs">
                <div><p class="font-bold text-white text-sm">${w}</p><p class="text-slate-400">Отработано: <b class="text-slate-200">${summary[w].totalHours} ч</b></p></div>
                <p class="font-bold text-amber-400 text-sm">${summary[w].totalPay.toLocaleString('ru-RU')} ₽</p>
            </div>`).join('');
    }
    if (!db.shifts || db.shifts.length === 0) {
        historyContainer.innerHTML = `<p class="text-xs text-slate-500">Реестр пуст</p>`;
    } else {
        historyContainer.innerHTML = db.shifts.map((s, idx) => {
            const obj = db.objects.find(o => String(o.id) === String(s.objId));
            const hours = parseFloat(s.hours) || 8;
            const rate = parseFloat(s.rate) || 0;
            const shiftPay = Math.round((rate / 8) * hours);
            const shiftId = String(s.id || 's-' + idx);
            return `
                <div class="flex justify-between items-center p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/40">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-slate-200 text-sm">${s.worker}</span>
                            <span class="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-semibold">${hours} ч (${shiftPay.toLocaleString('ru-RU')} ₽)</span>
                        </div>
                        <p class="text-slate-400 text-[11px] mt-0.5">${obj ? obj.name : 'Объект не указан'} • <span class="text-slate-500">${s.date}</span></p>
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button" onclick="openEditShiftModal('${shiftId}')" class="p-2 text-slate-400 hover:text-amber-400"><i class="fa-solid fa-pen text-sm"></i></button>
                        <button type="button" onclick="deleteShiftById('${shiftId}')" class="p-2 text-slate-500 hover:text-red-400"><i class="fa-solid fa-trash text-sm"></i></button>
                    </div>
                </div>`;
        }).join('');
    }
}

function deleteShiftById(shiftId) {
    askConfirm('Удалить эту смену?', function() {
        db.shifts = db.shifts.filter(s => String(s.id) !== String(shiftId));
        saveData(); renderWorkers();
    });
}

function exportReportToMessenger() {
    const monthSelect = document.getElementById('statement-month-select');
    if (!monthSelect) return;
    const selectedMonth = monthSelect.value;
    const monthLabel = formatMonthName(selectedMonth);
    const filteredShifts = db.shifts.filter(s => s && s.date && String(s.date).substring(0, 7) === selectedMonth);
    if (filteredShifts.length === 0) return alert('За этот месяц нет смен!');
    const summary = {};
    let grandTotalPay = 0, grandTotalHours = 0;
    filteredShifts.forEach(s => {
        if (!summary[s.worker]) summary[s.worker] = { totalHours: 0, totalPay: 0, shiftsCount: 0 };
        const hours = parseFloat(s.hours) || 0;
        const rate = parseFloat(s.rate) || 0;
        const pay = (rate / 8) * hours;
        summary[s.worker].totalHours += hours;
        summary[s.worker].totalPay += pay;
        summary[s.worker].shiftsCount += 1;
        grandTotalHours += hours;
        grandTotalPay += pay;
    });
    let report = `📋 *ОТЧЁТ ПО ВЫПЛАТАМ*\n📅 *Период:* ${monthLabel.toUpperCase()}\n─────────────────\n\n💰 *ВЕДОМОСТЬ:*\n`;
    Object.keys(summary).forEach((w, idx) => {
        report += `${idx + 1}. *${w}*: ${summary[w].totalHours} ч (${summary[w].shiftsCount} смен) ➔ *${summary[w].totalPay.toLocaleString('ru-RU')} ₽*\n`;
    });
    report += `\n📊 *ИТОГО:* ${grandTotalPay.toLocaleString('ru-RU')} ₽ (${grandTotalHours} ч)\n`;
    if (db.objects && db.objects.length > 0) {
        report += `\n🏗 *ВЫРАБОТКА:*\n`;
        db.objects.forEach(obj => {
            if (obj.logs && obj.logs.length > 0) {
                report += `• *${obj.name}*:\n`;
                obj.logs.forEach(l => { report += `   - ${l.type}: ${l.val} (${l.date}${l.note ? ', ' + l.note : ''})\n`; });
            }
        });
    }
    report += `\n_ГидроДел_`;
    navigator.clipboard.writeText(report).then(() => alert('✅ Отчёт скопирован!')).catch(() => prompt('Скопируйте вручную:', report));
}

function openShiftModal() {
    if (!db.objects || db.objects.length === 0) return alert('Сначала создайте объект!');
    document.getElementById('shift-edit-id').value = '';
    document.getElementById('shift-modal-title').innerHTML = `<i class="fa-solid fa-user-plus"></i> Внести смену`;
    document.getElementById('shift-worker-input').value = '';
    document.getElementById('shift-hours-input').value = '8';
    document.getElementById('shift-rate-input').value = '4500';
    document.getElementById('shift-date-input').value = new Date().toISOString().split('T')[0];
    const select = document.getElementById('shift-obj-input');
    if (select) select.innerHTML = db.objects.map(o => `<option value="${String(o.id)}">${o.name}</option>`).join('');
    document.getElementById('modal-shift').classList.remove('hidden');
}

function openEditShiftModal(shiftId) {
    const shift = db.shifts.find(s => String(s.id) === String(shiftId));
    if (!shift) return;
    document.getElementById('shift-edit-id').value = String(shift.id);
    document.getElementById('shift-modal-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Редактировать`;
    document.getElementById('shift-worker-input').value = shift.worker;
    document.getElementById('shift-hours-input').value = shift.hours;
    document.getElementById('shift-rate-input').value = shift.rate;
    document.getElementById('shift-date-input').value = shift.date || new Date().toISOString().split('T')[0];
    const select = document.getElementById('shift-obj-input');
    if (select) select.innerHTML = db.objects.map(o => `<option value="${String(o.id)}" ${String(o.id) === String(shift.objId) ? 'selected' : ''}>${o.name}</option>`).join('');
    document.getElementById('modal-shift').classList.remove('hidden');
}

function saveShift() {
    const editId = document.getElementById('shift-edit-id').value;
    const worker = document.getElementById('shift-worker-input').value.trim();
    const objId = document.getElementById('shift-obj-input').value;
    const hours = parseFloat(document.getElementById('shift-hours-input').value) || 8;
    const rate = parseFloat(document.getElementById('shift-rate-input').value) || 0;
    const date = document.getElementById('shift-date-input').value || new Date().toISOString().split('T')[0];
    if (!worker) return alert('Введите имя');
    if (editId) {
        const shift = db.shifts.find(s => String(s.id) === String(editId));
        if (shift) { shift.worker = worker; shift.objId = objId; shift.hours = hours; shift.rate = rate; shift.date = date; }
    } else {
        if (!Array.isArray(db.shifts)) db.shifts = [];
        db.shifts.unshift({ id: 's-' + Date.now(), worker, objId, hours, rate, date });
    }
    saveData(); closeModal('modal-shift'); renderWorkers();
}

// ================= ЛОГИКА QR-КОДОВ =================

let html5QrCode = null;

function startScanner() {
    document.getElementById('modal-scanner').classList.remove('hidden');
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }
    
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess
    ).catch(err => {
        alert("Ошибка камеры. Разрешите доступ в настройках Safari.");
        stopScanner();
    });
}

function stopScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            document.getElementById('modal-scanner').classList.add('hidden');
        }).catch(err => console.error(err));
    } else {
        document.getElementById('modal-scanner').classList.add('hidden');
    }
}

function onScanSuccess(decodedText, decodedResult) {
    stopScanner(); // Выключаем камеру
    handleScannedCode(decodedText);
}

function handleScannedCode(code) {
    const link = db.qrLinks[code];

    if (!link) {
        showBindQrModal(code);
    } else {
        if (link.type === 'obj') {
            const obj = db.objects.find(o => String(o.id) === String(link.id));
            const name = obj ? obj.name : 'Неизвестный объект';
            askConfirm(`QR-код привязан к объекту "${name}".\n\nНажмите "Открыть", чтобы внести выработку.`, function() {
                switchTab('objects');
                openAddLogModal(link.id);
            }, "Открыть", "Отвязать код", function() {
                delete db.qrLinks[code];
                saveData();
                alert('✅ Код отвязан. Теперь его можно использовать для другого объекта.');
            });
        } else if (link.type === 'tool') {
            const tool = db.tools.find(t => String(t.id) === String(link.id));
            const name = tool ? tool.name : 'Неизвестный инструмент';
            askConfirm(`QR-код привязан к инструменту "${name}".\n\nНажмите "Открыть" для перемещения.`, function() {
                switchTab('tools');
                openMoveToolModal(link.id);
            }, "Открыть", "Отвязать код", function() {
                delete db.qrLinks[code];
                saveData();
                alert('✅ Код отвязан.');
            });
        }
    }
}

function showBindQrModal(code) {
    document.getElementById('bind-qr-code').value = code;
    document.getElementById('bind-qr-text').innerText = code;

    const objSelect = document.getElementById('bind-obj-select');
    objSelect.innerHTML = '<option value="">-- Выберите объект --</option>' + db.objects.map(o => `<option value="${o.id}">${o.name}</option>`).join('');

    const toolSelect = document.getElementById('bind-tool-select');
    toolSelect.innerHTML = '<option value="">-- Выберите инструмент --</option>' + db.tools.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

    document.getElementById('modal-bind-qr').classList.remove('hidden');
}

function toggleNewBindingInputs() {
    const objSelect = document.getElementById('bind-obj-select');
    const toolSelect = document.getElementById('bind-tool-select');
    const objFields = document.getElementById('bind-new-obj-fields');
    const toolFields = document.getElementById('bind-new-tool-fields');

    if (objSelect.value === 'new') {
        objFields.classList.remove('hidden');
        toolSelect.value = ''; // Сбрасываем другой
        toolFields.classList.add('hidden');
    } else if (toolSelect.value === 'new') {
        toolFields.classList.remove('hidden');
        objSelect.value = ''; // Сбрасываем другой
        objFields.classList.add('hidden');
    } else {
        objFields.classList.add('hidden');
        toolFields.classList.add('hidden');
    }
}

function saveQrBinding() {
    const code = document.getElementById('bind-qr-code').value;
    let objId = document.getElementById('bind-obj-select').value;
    let toolId = document.getElementById('bind-tool-select').value;

    if (!db.qrLinks) db.qrLinks = {};

    // 1. Если нужно СОЗДАТЬ новый объект
    if (objId === 'new') {
        const name = document.getElementById('bind-new-obj-name').value.trim();
        if (!name) return alert('Введите название нового объекта!');
        const type = document.getElementById('bind-new-obj-type').value.trim();
        objId = 'obj-' + Date.now();
        db.objects.push({ id: objId, name: name, type: type || 'Не указан', logs: [] });
    } 
    // 2. Если нужно СОЗДАТЬ новый инструмент
    else if (toolId === 'new') {
        const name = document.getElementById('bind-new-tool-name').value.trim();
        if (!name) return alert('Введите название нового инструмента!');
        const sn = document.getElementById('bind-new-tool-sn').value.trim();
        toolId = 't-' + Date.now();
        db.tools.push({ id: toolId, name: name, sn: sn, status: 'sklad' }); // По умолчанию кладем на склад
    }

    // Проверка на пустой выбор
    if (!objId && !toolId) {
        alert('Выберите объект/инструмент или создайте новый!');
        return;
    }

    // 3. Очищаем старые привязки для этого объекта/инструмента (если были)
    if (objId && objId !== 'new') {
        for (let k in db.qrLinks) {
            if (db.qrLinks[k].type === 'obj' && db.qrLinks[k].id === objId) delete db.qrLinks[k];
        }
        db.qrLinks[code] = { type: 'obj', id: objId };
    } else if (toolId && toolId !== 'new') {
        for (let k in db.qrLinks) {
            if (db.qrLinks[k].type === 'tool' && db.qrLinks[k].id === toolId) delete db.qrLinks[k];
        }
        db.qrLinks[code] = { type: 'tool', id: toolId };
    }

    saveData();
    closeModal('modal-bind-qr');
    alert('✅ QR-код успешно привязан!');
    
    // Обновляем списки на экране, чтобы новые инструменты сразу появились
    renderObjects(); 
    renderTools();
}

// ===================================================

function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.add('hidden'); }
function toggleInfoModal() { const m = document.getElementById('modal-info'); if (m) m.classList.toggle('hidden'); }
function clearAllData() { askConfirm('Сбросить всю БД?', function() { localStorage.clear(); location.reload(); }); }

window.onload = function() { 
    try { renderObjects(); } catch(e) { console.error(e); }
    try { toggleCalcInputs(); } catch(e) { console.error(e); }
};