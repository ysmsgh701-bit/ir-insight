// ══════════════════════════════════════════════════════
// 방산 기업 DB (자동완성용)
// ══════════════════════════════════════════════════════
const COMPANY_DB = [
    { name:'한화에어로스페이스', ticker:'012450', market:'KOR', sector:'항공·방산 엔진' },
    { name:'LIG넥스원',         ticker:'079550', market:'KOR', sector:'유도무기·전자전' },
    { name:'현대로템',           ticker:'064350', market:'KOR', sector:'전차·방호차량' },
    { name:'한국항공우주(KAI)', ticker:'047810', market:'KOR', sector:'항공기·우주' },
    { name:'한화시스템',         ticker:'272210', market:'KOR', sector:'방산 IT·레이다' },
    { name:'한화오션',           ticker:'042660', market:'KOR', sector:'방산 조선·잠수함' },
    { name:'풍산',               ticker:'103140', market:'KOR', sector:'탄약·동합금' },
    { name:'빅텍',               ticker:'065620', market:'KOR', sector:'함정 전자장비' },
    { name:'퍼스텍',             ticker:'010820', market:'KOR', sector:'방산 정밀부품' },
    { name:'이오시스템',         ticker:'098460', market:'KOR', sector:'광학·IRST' },
    { name:'SNT모티브',          ticker:'064960', market:'KOR', sector:'엔진·구동계' },
    { name:'쎄트렉아이',         ticker:'099440', market:'KOR', sector:'위성 시스템' },
    { name:'Lockheed Martin',      ticker:'LMT',  market:'USA', sector:'Defense·Aerospace' },
    { name:'Northrop Grumman',     ticker:'NOC',  market:'USA', sector:'Defense·Space' },
    { name:'RTX Corporation',      ticker:'RTX',  market:'USA', sector:'Defense·Aero' },
    { name:'General Dynamics',     ticker:'GD',   market:'USA', sector:'Defense·Marine' },
    { name:'Boeing',               ticker:'BA',   market:'USA', sector:'Aerospace·Defense' },
    { name:'L3Harris Technologies',ticker:'LHX',  market:'USA', sector:'Defense Electronics' },
    { name:'Leidos Holdings',      ticker:'LDOS', market:'USA', sector:'Defense IT' },
    { name:'Huntington Ingalls',   ticker:'HII',  market:'USA', sector:'Naval Defense' },
    { name:'TransDigm Group',      ticker:'TDG',  market:'USA', sector:'Aerospace' },
];

// ══════════════════════════════════════════════════════
// 실적 발표 캘린더
// ══════════════════════════════════════════════════════
const EARNINGS = [
    { company:'L3Harris Technologies', ticker:'LHX',  market:'USA', date:'2026-04-29', quarter:'Q1 2026' },
    { company:'Boeing',                ticker:'BA',   market:'USA', date:'2026-04-30', quarter:'Q1 2026' },
    { company:'Leidos Holdings',       ticker:'LDOS', market:'USA', date:'2026-05-06', quarter:'Q1 2026' },
    { company:'한국항공우주(KAI)',    ticker:'047810',market:'KOR', date:'2026-05-09', quarter:'Q1 2026' },
    { company:'현대로템',             ticker:'064350',market:'KOR', date:'2026-05-12', quarter:'Q1 2026' },
    { company:'LIG넥스원',           ticker:'079550',market:'KOR', date:'2026-05-14', quarter:'Q1 2026' },
    { company:'한화에어로스페이스',   ticker:'012450',market:'KOR', date:'2026-05-15', quarter:'Q1 2026' },
    { company:'한화시스템',           ticker:'272210',market:'KOR', date:'2026-05-16', quarter:'Q1 2026' },
    { company:'한화오션',             ticker:'042660',market:'KOR', date:'2026-05-20', quarter:'Q1 2026' },
    { company:'Lockheed Martin',       ticker:'LMT',  market:'USA', date:'2026-07-21', quarter:'Q2 2026' },
    { company:'RTX Corporation',       ticker:'RTX',  market:'USA', date:'2026-07-22', quarter:'Q2 2026' },
    { company:'Northrop Grumman',      ticker:'NOC',  market:'USA', date:'2026-07-24', quarter:'Q2 2026' },
    { company:'General Dynamics',      ticker:'GD',   market:'USA', date:'2026-07-29', quarter:'Q2 2026' },
    { company:'한화에어로스페이스',   ticker:'012450',market:'KOR', date:'2026-08-12', quarter:'Q2 2026' },
    { company:'LIG넥스원',           ticker:'079550',market:'KOR', date:'2026-08-13', quarter:'Q2 2026' },
];

// ══════════════════════════════════════════════════════
// 프롬프트 설정
// ══════════════════════════════════════════════════════
const LEN_CONFIG = {
    short:  { tokens: 3000,  desc:'단문 · 핵심 500자 요약',    instruction:'핵심 포인트만 각 섹션 2~3줄로 간결하게 작성. 전체 500자 내외.' },
    medium: { tokens: 8192,  desc:'중문 · 표준 1500~2500자',   instruction:'표준 분량으로 상세하게 작성. 전체 1500~2500자.' },
    long:   { tokens: 8192,  desc:'장문 · 심층 3000자 이상',   instruction:'매우 상세하고 깊이 있게 작성. 각 섹션을 충분히 확장. 전체 3000자 이상.' },
};

// ══════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

    // ── DOM refs ──
    const companyInput   = document.getElementById('companyInput');
    const marketSelect   = document.getElementById('marketSelect');
    const quarterInput   = document.getElementById('quarterInput');
    const analyzeBtn     = document.getElementById('analyzeBtn');
    const addBatchBtn    = document.getElementById('addBatchBtn');
    const runBatchBtn    = document.getElementById('runBatchBtn');
    const stopBatchBtn   = document.getElementById('stopBatchBtn');
    const clearBatchBtn  = document.getElementById('clearBatchBtn');
    const batchCard      = document.getElementById('batchCard');
    const batchQueueEl   = document.getElementById('batchQueue');
    const batchCountEl   = document.getElementById('batchCount');
    const batchLabel     = document.getElementById('batchLabel');
    const progressContainer = document.getElementById('progressContainer');
    const premiumEditor  = document.getElementById('premiumEditor');
    const freeEditor     = document.getElementById('freeEditor');
    const youtubeEditor  = document.getElementById('youtubeEditor');
    const mdPreview      = document.getElementById('mdPreview');
    const apiStatus      = document.getElementById('apiStatus');
    const errorBox       = document.getElementById('errorBox');
    const errorMsg       = document.getElementById('errorMsg');
    const settingsBtn    = document.getElementById('settingsBtn');
    const settingsModal  = document.getElementById('settingsModal');
    const closeSettings  = document.getElementById('closeSettings');
    const saveSettings   = document.getElementById('saveSettings');
    const geminiKeyInput = document.getElementById('geminiKeyInput');
    const dartKeyInput   = document.getElementById('dartKeyInput');
    const editBtn          = document.getElementById('editBtn');
    const previewBtn       = document.getElementById('previewBtn');
    const extractScenesBtn = document.getElementById('extractScenesBtn');
    const goVeoBtn         = document.getElementById('goVeoBtn');
    const veoScenesEl      = document.getElementById('veoScenes');
    const veoEmptyEl       = document.getElementById('veoEmpty');

    // ── State ──
    let GEMINI_KEY   = localStorage.getItem('GEMINI_API_KEY') || '';
    let DART_KEY     = localStorage.getItem('DART_API_KEY')   || '';
    let currentLen   = 'medium';
    let batchQueue   = [];
    let batchRunning = false;
    let stopBatch    = false;
    let isPreview    = false;
    let calFilter    = 'ALL';

    geminiKeyInput.value = GEMINI_KEY;
    dartKeyInput.value   = DART_KEY;
    updateBadge();
    renderCalendar();
    renderHistory();

    // ── Badge ──
    function updateBadge() {
        if (GEMINI_KEY) {
            apiStatus.textContent = 'API 연결됨';
            apiStatus.className = 'text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30';
        } else {
            apiStatus.textContent = 'API 키 미설정';
            apiStatus.className = 'text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30';
        }
    }

    // ── Toast ──
    function toast(msg, type = 'ok') {
        const el   = document.getElementById('toast');
        const icon = document.getElementById('toastIcon');
        const txt  = document.getElementById('toastMsg');
        if (!el) return;
        txt.textContent = msg;
        const map = { ok:['check-circle','text-green-400'], warn:['alert-triangle','text-yellow-400'], err:['alert-circle','text-red-400'] };
        const [ic, cls] = map[type] || map.ok;
        icon.setAttribute('data-lucide', ic);
        icon.className = `w-4 h-4 flex-shrink-0 ${cls}`;
        lucide.createIcons();
        el.classList.remove('translate-y-20','opacity-0');
        el.classList.add('translate-y-0','opacity-100');
        setTimeout(() => { el.classList.add('translate-y-20','opacity-0'); el.classList.remove('translate-y-0','opacity-100'); }, 3000);
    }

    // ── Settings Modal ──
    settingsBtn.addEventListener('click', () => { settingsModal.style.display = 'block'; });
    closeSettings.addEventListener('click', () => { settingsModal.style.display = 'none'; });
    settingsModal.addEventListener('click', e => { if (e.target === settingsModal) settingsModal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') settingsModal.style.display = 'none'; });
    saveSettings.addEventListener('click', () => {
        GEMINI_KEY = geminiKeyInput.value.trim();
        DART_KEY   = dartKeyInput.value.trim();
        localStorage.setItem('GEMINI_API_KEY', GEMINI_KEY);
        localStorage.setItem('DART_API_KEY', DART_KEY);
        updateBadge();
        settingsModal.style.display = 'none';
        toast('API 키가 저장되었습니다.');
    });

    // ── Tabs ──
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active-tab','border-gold-400','text-gold-400');
                b.classList.add('inactive-tab','border-transparent','text-gray-400');
            });
            btn.classList.add('active-tab','border-gold-400','text-gold-400');
            btn.classList.remove('inactive-tab','border-transparent','text-gray-400');
            document.querySelectorAll('.tab-panel').forEach(p => {
                p.classList.add('hidden'); p.classList.remove('flex');
            });
            document.getElementById('tab-' + target).classList.remove('hidden');
            document.getElementById('tab-' + target).classList.add('flex');
            // Preview toggle only for premium
            document.getElementById('previewToggle').style.visibility = target === 'premium' ? 'visible' : 'hidden';
        });
    });

    // ── Preview / Edit toggle ──
    editBtn?.addEventListener('click', () => {
        if (!isPreview) return;
        isPreview = false;
        premiumEditor.classList.remove('hidden'); mdPreview.classList.add('hidden');
        editBtn.classList.add('mode-active');     editBtn.classList.remove('text-gray-500');
        previewBtn.classList.remove('mode-active'); previewBtn.classList.add('text-gray-500');
    });
    previewBtn?.addEventListener('click', () => {
        if (isPreview) return;
        if (!premiumEditor.value.trim()) { toast('분석 결과가 없습니다.', 'warn'); return; }
        isPreview = true;
        mdPreview.innerHTML = marked.parse(premiumEditor.value);
        premiumEditor.classList.add('hidden'); mdPreview.classList.remove('hidden');
        previewBtn.classList.add('mode-active');     previewBtn.classList.remove('text-gray-500');
        editBtn.classList.remove('mode-active');     editBtn.classList.add('text-gray-500');
    });

    // ── Copy ──
    document.querySelectorAll('.copybtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ta = document.getElementById(btn.dataset.for);
            if (!ta?.value) { toast('복사할 내용이 없습니다.', 'warn'); return; }
            navigator.clipboard.writeText(ta.value).then(() => {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="check" class="w-3 h-3 mr-1"></i>복사됨';
                lucide.createIcons();
                setTimeout(() => { btn.innerHTML = orig; lucide.createIcons(); }, 2000);
                toast('클립보드에 복사되었습니다.');
            });
        });
    });

    // ── Download ──
    document.querySelectorAll('.dlbtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ta = document.getElementById(btn.dataset.for);
            if (!ta?.value) { toast('저장할 내용이 없습니다.', 'warn'); return; }
            const co = (companyInput.value.trim() || '분석결과').replace(/\s/g,'');
            const q  = (quarterInput.value.trim() || '분기').replace(/\s/g,'');
            const labels = { premiumEditor:'프리미엄리포트', freeEditor:'텔레그램요약', youtubeEditor:'유튜브대본' };
            const fn = `${co}_${q}_${labels[btn.dataset.for]}.md`;
            const a = Object.assign(document.createElement('a'), {
                href: URL.createObjectURL(new Blob([ta.value], { type:'text/plain;charset=utf-8' })),
                download: fn
            });
            a.click(); URL.revokeObjectURL(a.href);
            toast(`${fn} 저장됨`);
        });
    });

    // ── PDF ──
    document.getElementById('pdfBtn')?.addEventListener('click', () => {
        const visible = document.querySelector('.tab-panel:not(.hidden)');
        const ta = visible?.querySelector('textarea');
        if (!ta?.value) { toast('출력할 내용이 없습니다.', 'warn'); return; }
        const co = companyInput.value.trim() || '분석결과';
        const q  = quarterInput.value.trim() || '';
        const html = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>${co} ${q} — IR Insight</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<style>body{font-family:'Malgun Gothic',sans-serif;max-width:820px;margin:40px auto;color:#1a202c;line-height:1.75;font-size:14px}
h1{font-size:1.5rem;border-bottom:2px solid #2d3748;padding-bottom:.4em;margin-bottom:.8em}
h2{font-size:1.2rem;color:#2d3748;margin:1.6em 0 .5em;border-bottom:1px solid #e2e8f0;padding-bottom:.2em}
h3{font-size:1rem;color:#4a5568;margin:1.2em 0 .4em}
table{width:100%;border-collapse:collapse;margin:1em 0;font-size:13px}
th{background:#f7fafc;padding:.5em .7em;border:1px solid #e2e8f0;font-weight:600;text-align:left}
td{padding:.45em .7em;border:1px solid #e2e8f0}tr:nth-child(even)td{background:#f9fafb}
strong{color:#744210}blockquote{border-left:3px solid #3182ce;padding-left:1em;color:#4a5568;margin:1em 0}
.hdr{margin-bottom:2em;padding-bottom:1em;border-bottom:1px solid #e2e8f0}
.ftr{margin-top:3em;padding-top:1em;border-top:1px solid #e2e8f0;font-size:.8em;color:#718096}
@media print{body{margin:15px}}</style></head><body>
<div class="hdr"><h1>IR Insight — ${co} ${q}</h1>
<p style="color:#718096;font-size:.85em">작성일: ${new Date().toLocaleDateString('ko-KR')} | AI × 현직 IR 팀장 분석</p></div>
<div id="c"></div>
<div class="ftr">본 리포트는 투자 참고용이며 투자 판단의 최종 책임은 투자자 본인에게 있습니다.</div>
<script>document.getElementById('c').innerHTML=marked.parse(${JSON.stringify(ta.value)});window.onload=()=>setTimeout(()=>window.print(),300);<\/script>
</body></html>`;
        const a = Object.assign(document.createElement('a'), {
            href: URL.createObjectURL(new Blob([html], { type:'text/html;charset=utf-8' })),
            target: '_blank'
        });
        a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 10000);
    });

    // ── Autocomplete ──
    const acDrop = document.getElementById('acDropdown');
    let acList = [], acIdx = -1;

    companyInput.addEventListener('input', () => {
        const q = companyInput.value.trim().toLowerCase();
        if (!q) { acDrop.classList.add('hidden'); return; }
        acList = COMPANY_DB.filter(c =>
            c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q)
        ).slice(0, 8);
        renderAc();
    });
    companyInput.addEventListener('focus', () => {
        if (companyInput.value.trim()) companyInput.dispatchEvent(new Event('input'));
    });
    companyInput.addEventListener('keydown', e => {
        if (acDrop.classList.contains('hidden')) return;
        if (e.key === 'ArrowDown')  { e.preventDefault(); acIdx = Math.min(acIdx+1, acList.length-1); hiliteAc(); }
        else if (e.key === 'ArrowUp')   { e.preventDefault(); acIdx = Math.max(acIdx-1, -1); hiliteAc(); }
        else if (e.key === 'Enter' && acIdx >= 0) { e.preventDefault(); pickAc(acList[acIdx]); }
        else if (e.key === 'Escape') acDrop.classList.add('hidden');
    });
    document.addEventListener('click', e => { if (!e.target.closest('#companyWrapper')) acDrop.classList.add('hidden'); });

    function renderAc() {
        acIdx = -1;
        if (!acList.length) { acDrop.classList.add('hidden'); return; }
        acDrop.innerHTML = acList.map((c,i) => `
            <div class="ac-item flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-dark-700 transition-colors" data-i="${i}">
                <div class="min-w-0">
                    <span class="text-sm text-gray-200">${c.name}</span>
                    <span class="text-xs text-gray-500 ml-1.5">${c.sector}</span>
                </div>
                <span class="text-xs px-1.5 py-0.5 rounded font-mono ml-2 flex-shrink-0 ${c.market==='KOR'?'bg-blue-900/50 text-blue-400':'bg-purple-900/50 text-purple-400'}">${c.ticker}</span>
            </div>`).join('');
        acDrop.classList.remove('hidden');
        acDrop.querySelectorAll('.ac-item').forEach((el,i) => {
            el.addEventListener('mouseenter', () => { acIdx=i; hiliteAc(); });
            el.addEventListener('click', () => pickAc(acList[i]));
        });
    }
    function hiliteAc() {
        acDrop.querySelectorAll('.ac-item').forEach((el,i) => el.classList.toggle('bg-dark-700', i===acIdx));
    }
    function pickAc(c) {
        companyInput.value = c.name; marketSelect.value = c.market;
        acDrop.classList.add('hidden'); acIdx = -1;
        syncChips(c.name);
    }
    function syncChips(name) {
        document.querySelectorAll('.qchip').forEach(ch => ch.classList.toggle('chip-on', ch.dataset.company === name));
    }

    // ── Quick Chips ──
    document.querySelectorAll('.qchip').forEach(chip => {
        chip.addEventListener('click', () => {
            companyInput.value = chip.dataset.company;
            marketSelect.value = chip.dataset.market;
            syncChips(chip.dataset.company);
            acDrop.classList.add('hidden');
        });
    });

    // ── Content Length ──
    document.querySelectorAll('.len-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLen = btn.dataset.len;
            document.querySelectorAll('.len-btn').forEach(b => b.classList.remove('len-active'));
            btn.classList.add('len-active');
            document.getElementById('lenDesc').textContent = LEN_CONFIG[currentLen].desc;
        });
    });

    // ── Batch Queue ──
    function renderBatch() {
        const has = batchQueue.length > 0;
        batchCard.classList.toggle('hidden', !has);
        if (batchCountEl) batchCountEl.textContent = has ? `(${batchQueue.length})` : '';
        if (!has) { batchQueueEl.innerHTML=''; return; }
        batchQueueEl.innerHTML = batchQueue.map((b,i) => `
            <div class="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-dark-700 transition-colors">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="text-xs text-gray-500 flex-shrink-0">${i+1}</span>
                    <div class="min-w-0">
                        <p class="text-xs text-gray-200 truncate">${b.company}</p>
                        <p class="text-xs text-gray-500">${b.quarter} · ${b.market}</p>
                    </div>
                </div>
                <button class="rm-batch text-gray-600 hover:text-red-400 transition-colors flex-shrink-0" data-i="${i}">
                    <i data-lucide="x" class="w-3 h-3"></i>
                </button>
            </div>`).join('');
        lucide.createIcons();
        batchQueueEl.querySelectorAll('.rm-batch').forEach(btn => {
            btn.addEventListener('click', () => { batchQueue.splice(+btn.dataset.i, 1); renderBatch(); });
        });
    }

    addBatchBtn?.addEventListener('click', () => {
        const co = companyInput.value.trim();
        if (!co) { toast('기업명을 입력해주세요.', 'warn'); return; }
        const q = quarterInput.value.trim() || '최근 분기';
        if (batchQueue.find(b => b.company===co && b.quarter===q)) { toast('이미 큐에 있습니다.', 'warn'); return; }
        batchQueue.push({ company:co, market:marketSelect.value, quarter:q });
        renderBatch();
        toast(`${co} 배치에 추가됨`);
    });
    clearBatchBtn?.addEventListener('click', () => { batchQueue=[]; renderBatch(); });
    stopBatchBtn?.addEventListener('click', () => { stopBatch=true; toast('배치 중지 중...', 'warn'); });

    runBatchBtn?.addEventListener('click', async () => {
        if (!batchQueue.length || batchRunning) return;
        if (!GEMINI_KEY) { settingsModal.style.display='block'; return; }
        batchRunning=true; stopBatch=false;
        runBatchBtn.classList.add('hidden'); stopBatchBtn.classList.remove('hidden');
        if (batchLabel) batchLabel.classList.remove('hidden');
        const total = batchQueue.length;
        for (let i=0; i<batchQueue.length; i++) {
            if (stopBatch) break;
            if (batchLabel) batchLabel.textContent = `배치 ${i+1}/${total}`;
            const item = batchQueue[i];
            await runAnalysis(item.company, item.market, item.quarter);
            if (i < batchQueue.length-1) await delay(1500);
        }
        batchQueue=[]; renderBatch(); batchRunning=false;
        if (batchLabel) batchLabel.classList.add('hidden');
        runBatchBtn.classList.remove('hidden'); stopBatchBtn.classList.add('hidden');
        toast(`배치 분석 완료 (${total}개)`);
    });

    // ── Earnings Calendar ──
    document.querySelectorAll('.cal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            calFilter = btn.dataset.mkt;
            document.querySelectorAll('.cal-btn').forEach(b => { b.classList.remove('cal-active'); b.classList.add('text-gray-500'); });
            btn.classList.add('cal-active'); btn.classList.remove('text-gray-500');
            renderCalendar();
        });
    });

    function renderCalendar() {
        const el = document.getElementById('earningsList');
        if (!el) return;
        const today = new Date(); today.setHours(0,0,0,0);
        const list = EARNINGS
            .filter(e => new Date(e.date) >= today && (calFilter==='ALL' || e.market===calFilter))
            .sort((a,b) => new Date(a.date)-new Date(b.date))
            .slice(0, 7);
        if (!list.length) { el.innerHTML='<p class="text-xs text-gray-500 text-center py-2">예정 없음</p>'; return; }
        el.innerHTML = list.map(e => {
            const d = new Date(e.date);
            const days = Math.round((d-today)/86400000);
            const hot = days<=7, isToday = days===0;
            return `<div class="earnings-row flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors"
                data-co="${e.company}" data-mkt="${e.market}" data-q="${e.quarter}">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="text-xs font-mono w-9 text-center flex-shrink-0 ${hot?'text-orange-400 font-semibold':'text-gray-500'}">${d.getMonth()+1}/${d.getDate()}</span>
                    <div class="min-w-0"><p class="text-xs text-gray-200 truncate">${e.company}</p><p class="text-xs text-gray-500">${e.quarter}</p></div>
                </div>
                <div class="flex items-center gap-1.5 flex-shrink-0">
                    <span class="text-xs px-1.5 py-0.5 rounded font-mono ${e.market==='KOR'?'bg-blue-900/40 text-blue-400':'bg-purple-900/40 text-purple-400'}">${e.ticker}</span>
                    ${isToday?'<span class="text-xs text-orange-400 font-bold">TODAY</span>':hot?`<span class="text-xs text-orange-400">D-${days}</span>`:''}
                </div>
            </div>`;
        }).join('');
        el.querySelectorAll('.earnings-row').forEach(row => {
            row.addEventListener('click', () => {
                companyInput.value = row.dataset.co;
                marketSelect.value = row.dataset.mkt;
                quarterInput.value = row.dataset.q;
                syncChips(row.dataset.co);
                toast(`${row.dataset.co} 선택됨`);
            });
        });
    }

    // ── History ──
    function saveHistory(co, mkt, q) {
        const h = JSON.parse(localStorage.getItem('irHistory')||'[]');
        h.unshift({ company:co, market:mkt, quarter:q, date:new Date().toLocaleDateString('ko-KR'),
            content:{ premium:premiumEditor.value, free:freeEditor.value, youtube:youtubeEditor.value } });
        if (h.length>8) h.pop();
        localStorage.setItem('irHistory', JSON.stringify(h));
        renderHistory();
    }
    function renderHistory() {
        const el = document.getElementById('historyList');
        if (!el) return;
        const h = JSON.parse(localStorage.getItem('irHistory')||'[]');
        if (!h.length) { el.innerHTML='<p class="text-xs text-gray-500 text-center py-2">기록 없음</p>'; return; }
        el.innerHTML = h.map((item,i) => `
            <div class="hist-row group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-dark-700 cursor-pointer transition-colors" data-i="${i}">
                <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs font-medium text-gray-200 truncate">${item.company}</span>
                        <span class="text-xs px-1 py-0.5 rounded flex-shrink-0 ${item.market==='KOR'?'bg-blue-900/40 text-blue-400':'bg-purple-900/40 text-purple-400'}">${item.market}</span>
                    </div>
                    <p class="text-xs text-gray-500">${item.quarter} · ${item.date}</p>
                </div>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0 ml-1"></i>
            </div>`).join('');
        lucide.createIcons();
        el.querySelectorAll('.hist-row').forEach(row => {
            row.addEventListener('click', () => {
                const item = h[+row.dataset.i];
                companyInput.value=item.company; marketSelect.value=item.market; quarterInput.value=item.quarter;
                premiumEditor.value=item.content.premium||'';
                freeEditor.value=item.content.free||'';
                youtubeEditor.value=item.content.youtube||'';
                if (isPreview) editBtn?.click();
                toast(`${item.company} 불러왔습니다.`);
            });
        });
    }
    document.getElementById('clearHistoryBtn')?.addEventListener('click', () => {
        if (confirm('기록을 전체 삭제할까요?')) { localStorage.removeItem('irHistory'); renderHistory(); toast('기록 삭제됨'); }
    });

    // ── Step helpers ──
    function stepActive(n) {
        const el = document.getElementById('step'+n); if(!el) return;
        el.querySelector('.step-icon').style.cssText = 'background:#3b82f6;animation:pulse-step 1.8s infinite';
        el.querySelector('.step-text').style.cssText = 'color:#60a5fa;font-weight:500';
    }
    function stepDone(n) {
        const el = document.getElementById('step'+n); if(!el) return;
        el.querySelector('.step-icon').style.cssText = 'background:#10b981;animation:none';
        el.querySelector('.step-text').style.cssText = 'color:#34d399';
    }
    function stepReset() {
        [1,2,3,4].forEach(n => {
            const el = document.getElementById('step'+n); if(!el) return;
            el.querySelector('.step-icon').style.cssText = '';
            el.querySelector('.step-text').style.cssText = '';
        });
    }

    const delay = ms => new Promise(r => setTimeout(r, ms));

    // ── Gemini call ──
    async function callGemini(prompt, maxTokens = 8192) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;
        const res = await fetch(url, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                contents:[{parts:[{text:prompt}]}],
                generationConfig:{ temperature:0.7, maxOutputTokens:maxTokens }
            })
        });
        if (!res.ok) {
            const e = await res.json().catch(()=>({}));
            throw new Error(e?.error?.message || `API 오류 (HTTP ${res.status})`);
        }
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('API 응답에서 텍스트를 추출할 수 없습니다.');
        return text;
    }

    // ── Core Analysis ──
    async function runAnalysis(company, market, quarter) {
        companyInput.value = company;
        marketSelect.value = market;
        quarterInput.value = quarter;

        const cfg = LEN_CONFIG[currentLen];

        document.getElementById('errorBox').classList.add('hidden');
        progressContainer.classList.remove('hidden');
        stepReset();
        premiumEditor.value=''; freeEditor.value=''; youtubeEditor.value='';
        if (isPreview) editBtn?.click();

        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>분석 중...</span>';
        analyzeBtn.classList.add('opacity-60','cursor-not-allowed');
        lucide.createIcons();

        const peers = {
            KOR:'한화에어로스페이스, LIG넥스원, 현대로템, 한국항공우주(KAI)',
            USA:'Lockheed Martin(LMT), Northrop Grumman(NOC), RTX Corporation, General Dynamics(GD)'
        };

        try {
            // Step 1
            stepActive(1);
            await delay(800);
            stepDone(1);

            // Step 2 — Premium (full token budget)
            stepActive(2);
            const premiumPrompt = `당신은 12년 이상 경력의 대기업/스타트업 재무 주재원이자 현직 IR 팀장입니다.
고려대 KMBA 졸업, OCI·태광그룹·한화첨단소재·CS Wind 재무·IR 경력 보유자입니다.

분석 기업: ${company}
시장: ${market==='KOR'?'국내 증시 (KOSPI/KOSDAQ)':'미국 증시 (NYSE/NASDAQ)'}
분석 기간: ${quarter}
글로벌 피어그룹: ${peers[market]||peers.KOR}
분량 지침: ${cfg.instruction}

아래 목차 구조에 따라 '네이버 프리미엄콘텐츠'용 심층 재무 리포트를 마크다운으로 작성하세요.

## 1. 실적 개요 및 핵심 지표
- 매출액, 영업이익, 영업이익률 YoY 비교
- 핵심 포인트 3줄 요약

## 2. 3대 재무 리스크 분석 (YoY)
### 리스크 ① 매출채권 및 수금 구조
### 리스크 ② 재고자산 변동 및 원가율
### 리스크 ③ 현금흐름 특이점

## 3. 글로벌 피어(Peer) 비교
> 표 형식으로: 영업이익률, 수주잔고/매출 비율, ROE 비교 (${peers[market]||peers.KOR})

## 4. IR 팀장의 핵심 인사이트
> 수주잔고 매출 인식 시점 / 원가율 변동 요인 / 환율 민감도 / 공시 이면의 돈의 흐름

## 5. 투자 포인트 & 리스크 요약
> 매수/관망/매도 의견 (필자 개인 의견 명시)

[작성 지침] 전문적 문어체. 추정치는 **(추정)** 표기. 볼드·이탤릭·표 적극 활용. 절대 중간에 끊지 말고 ## 5. 투자 포인트까지 완성할 것.`;

            const premiumText = await callGemini(premiumPrompt, cfg.tokens);
            premiumEditor.value = premiumText;
            stepDone(2);

            // Step 3 — Free summary
            stepActive(3);
            const freePrompt = `다음은 ${company} ${quarter} 심층 재무 리포트입니다:

---
${premiumText.slice(0, 3000)}${premiumText.length > 3000 ? '\n...(이하 생략)' : ''}
---

위 내용을 바탕으로 텔레그램/블로그 무료 배포용 요약 포스트를 작성하세요.

아래 형식을 정확히 따르세요:

📊 **${company} ${quarter} 실적 핵심 요약**

• [핵심 수치·지표 포함 한 줄 — 예: 매출 YoY +XX%]
• [주요 리스크 또는 이슈 한 줄]
• [투자자가 반드시 알아야 할 포인트 한 줄]
• [글로벌 피어 대비 포지션 또는 향후 전망 한 줄]

⚠️ [IR 팀장 한 줄 경고 또는 주목 포인트]

👉 전체 심층 분석(피어 비교·현금흐름·투자의견)은 네이버 프리미엄에서 확인하세요.

작성 규칙:
- 실제 수치를 넣어 구체적으로 작성
- 이모지 풍부하게 (📊 💰 🚀 ⚠️ 📈 📉 🏭)
- 구어체, 임팩트 있게
- 전체 400~600자`;

            freeEditor.value = await callGemini(freePrompt, 1500);
            stepDone(3);

            // Step 4 — YouTube Script
            stepActive(4);
            const ytPrompt = `다음은 ${company} ${quarter} 심층 재무 리포트입니다:

---
${premiumText.slice(0, 3000)}${premiumText.length > 3000 ? '\n...(이하 생략)' : ''}
---

5~8분짜리 유튜브 영상 대본을 작성하세요.

[오프닝 Hook 30초] 충격적인 수치나 질문으로 이목 집중
[자기소개 20초] 12년 재무/IR 경력 소개
[본론 4~6분] 재무 리스크 3가지를 비유와 함께 쉽게 설명 + [화면 지시문]
[클로징 30초] 요약 + 네이버 프리미엄 유도 + 구독·좋아요

해요체 구어체. [화면: xxx] 지시문 포함.`;

            youtubeEditor.value = await callGemini(ytPrompt, cfg.tokens);
            stepDone(4);

            saveHistory(company, market, quarter);
            toast(`${company} 분석 완료!`);

        } catch(err) {
            errorBox.classList.remove('hidden');
            errorMsg.textContent = err.message;
            lucide.createIcons();
            toast(err.message, 'err');
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<i data-lucide="zap" class="w-4 h-4"></i><span>AI 분석 실행</span>';
            analyzeBtn.classList.remove('opacity-60','cursor-not-allowed');
            lucide.createIcons();
            setTimeout(() => progressContainer.classList.add('hidden'), 4000);
        }
    }

    // ── VEO Scene Extraction ──
    function parseScenes(text) {
        const re = /\[화면[:\s]+([^\]]+)\]/g;
        const scenes = [];
        let m;
        while ((m = re.exec(text)) !== null) scenes.push(m[1].trim());
        return scenes;
    }

    async function generateVeoPrompts(scenes, company, quarter) {
        const prompt = `You are a professional video director. Convert these Korean YouTube [화면] scene directions into English Google VEO 3.0 video generation prompts for a "${company} ${quarter}" financial analysis video.

Korean scene directions:
${scenes.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Requirements:
- Cinematic, professional, 4K quality visual description
- Appropriate for a credible financial/investment YouTube channel (dark tones, data overlays, boardroom, stock charts, global skylines)
- Each prompt: 40-80 words
- Output ONLY a valid JSON array of strings in the same order, no other text

Example: ["A sleek corporate boardroom...", "Close-up of stock charts..."]`;

        const result = await callGemini(prompt, 2048);
        const jsonMatch = result.match(/\[[\s\S]*?\]/);
        if (!jsonMatch) throw new Error('VEO 프롬프트 변환 실패 — 다시 시도해주세요.');
        return JSON.parse(jsonMatch[0]);
    }

    async function callVeoApi(prompt, cardEl) {
        const statusEl = cardEl.querySelector('.veo-status');
        const videoEl  = cardEl.querySelector('.veo-video');

        statusEl.textContent = '생성 요청 중...';
        statusEl.className = 'veo-status text-xs text-blue-400 mt-2';

        const url = `https://generativelanguage.googleapis.com/v1beta/models/veo-3.0-generate-preview:predictLongRunning?key=${GEMINI_KEY}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/veo-3.0-generate-preview',
                instances: [{ prompt }],
                parameters: { aspectRatio: '16:9', sampleCount: 1 }
            })
        });
        if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            throw new Error(e?.error?.message || `VEO API 오류 (${res.status})`);
        }
        const opData = await res.json();
        const opName = opData.name;

        for (let i = 0; i < 36; i++) {
            statusEl.textContent = `영상 생성 중... (${(i + 1) * 5}초 경과)`;
            await delay(5000);
            const pollRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/${opName}?key=${GEMINI_KEY}`);
            if (!pollRes.ok) continue;
            const pollData = await pollRes.json();
            if (pollData.done) {
                const vid = pollData.response?.videos?.[0] ?? pollData.response?.generatedSamples?.[0]?.video;
                const b64 = vid?.bytesBase64Encoded ?? vid?.videoMetadata?.bytesBase64Encoded;
                if (b64) {
                    videoEl.src = `data:video/mp4;base64,${b64}`;
                    videoEl.classList.remove('hidden');
                    statusEl.textContent = '✓ 생성 완료';
                    statusEl.className = 'veo-status text-xs text-green-400 mt-2';
                    return;
                }
                throw new Error('영상 데이터 없음 — VEO 접근 권한이 필요합니다 (Google AI Studio 확인)');
            }
        }
        throw new Error('VEO 생성 타임아웃 (3분) — 계정의 VEO 접근 권한을 확인해주세요.');
    }

    function renderVeoScenes(scenes, prompts) {
        veoEmptyEl.classList.add('hidden');
        veoScenesEl.classList.remove('hidden');
        veoScenesEl.innerHTML = scenes.map((scene, i) => {
            const eng = prompts[i] || `Professional financial analysis cinematic 4K footage, ${scene}`;
            const safeEng = eng.replace(/"/g, '&quot;');
            return `<div class="veo-card bg-dark-900/50 border border-dark-700 rounded-xl p-4" data-idx="${i}">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs font-bold text-purple-300 bg-purple-900/40 border border-purple-700/40 px-2.5 py-0.5 rounded-full">씬 ${i + 1}</span>
                    <div class="flex gap-1.5">
                        <button class="copy-veo-prompt action-sm" data-prompt="${safeEng}">
                            <i data-lucide="copy" class="w-3 h-3 mr-1"></i>프롬프트 복사
                        </button>
                        <button class="gen-veo-btn action-sm border-purple-700/50 bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 hover:text-white" data-idx="${i}">
                            <i data-lucide="play" class="w-3 h-3 mr-1"></i>VEO 생성
                        </button>
                    </div>
                </div>
                <p class="text-xs text-gray-500 mb-2.5 flex items-start gap-1.5">
                    <span class="flex-shrink-0">🇰🇷</span><span>${scene}</span>
                </p>
                <div class="bg-dark-800 rounded-lg p-3 border border-dark-700">
                    <p class="text-xs text-gray-300 font-mono leading-relaxed">${eng}</p>
                </div>
                <video class="veo-video w-full rounded-lg mt-3 hidden" controls></video>
                <p class="veo-status text-xs text-gray-600 mt-1"></p>
            </div>`;
        }).join('');
        lucide.createIcons();

        veoScenesEl.querySelectorAll('.copy-veo-prompt').forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(btn.dataset.prompt).then(() => toast('VEO 프롬프트 복사됨'));
            });
        });

        veoScenesEl.querySelectorAll('.gen-veo-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const card = btn.closest('.veo-card');
                const idx  = +btn.dataset.idx;
                btn.disabled = true;
                btn.innerHTML = '<i data-lucide="loader" class="w-3 h-3 mr-1 animate-spin"></i>생성 중';
                lucide.createIcons();
                try {
                    await callVeoApi(prompts[idx], card);
                    toast(`씬 ${idx + 1} 영상 생성 완료!`);
                } catch (err) {
                    card.querySelector('.veo-status').textContent = `오류: ${err.message}`;
                    card.querySelector('.veo-status').className = 'veo-status text-xs text-red-400 mt-2';
                    toast(err.message, 'err');
                } finally {
                    btn.disabled = false;
                    btn.innerHTML = '<i data-lucide="play" class="w-3 h-3 mr-1"></i>VEO 생성';
                    lucide.createIcons();
                }
            });
        });
    }

    async function doExtractScenes() {
        const script = youtubeEditor.value.trim();
        if (!script) { toast('유튜브 대본을 먼저 생성해주세요.', 'warn'); return; }
        const scenes = parseScenes(script);
        if (!scenes.length) { toast('[화면: xxx] 지시문이 없습니다. 대본을 다시 생성해주세요.', 'warn'); return; }
        if (!GEMINI_KEY) { settingsModal.style.display = 'block'; return; }

        [extractScenesBtn, goVeoBtn].forEach(b => {
            if (!b) return;
            b.disabled = true;
            b.innerHTML = '<i data-lucide="loader" class="w-3 h-3 mr-1 animate-spin"></i>변환 중';
            lucide.createIcons();
        });

        try {
            toast(`${scenes.length}개 씬 추출 · 영어 변환 중...`);
            const co = companyInput.value.trim() || '방산 기업';
            const q  = quarterInput.value.trim() || '';
            const prompts = await generateVeoPrompts(scenes, co, q);
            // Switch to VEO tab
            document.querySelector('[data-tab="veo"]')?.click();
            renderVeoScenes(scenes, prompts);
            toast(`${scenes.length}개 VEO 프롬프트 생성 완료!`);
        } catch (err) {
            toast(err.message, 'err');
        } finally {
            if (extractScenesBtn) {
                extractScenesBtn.disabled = false;
                extractScenesBtn.innerHTML = '<i data-lucide="clapperboard" class="w-3 h-3 mr-1"></i>씬 추출 · 변환';
                lucide.createIcons();
            }
            if (goVeoBtn) {
                goVeoBtn.disabled = false;
                goVeoBtn.innerHTML = '<i data-lucide="clapperboard" class="w-3 h-3 mr-1"></i>VEO 씬 추출';
                lucide.createIcons();
            }
        }
    }

    extractScenesBtn?.addEventListener('click', doExtractScenes);
    goVeoBtn?.addEventListener('click', doExtractScenes);

    // ── Analyze button ──
    analyzeBtn.addEventListener('click', async () => {
        if (!GEMINI_KEY) { settingsModal.style.display='block'; toast('Gemini API 키를 먼저 설정해주세요.', 'warn'); return; }
        const co = companyInput.value.trim() || '한화에어로스페이스';
        const mkt = marketSelect.value || 'KOR';
        const q   = quarterInput.value.trim() || '2024년 4분기';
        await runAnalysis(co, mkt, q);
    });
});
