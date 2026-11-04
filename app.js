if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }

let userXP = Number(localStorage.getItem('userXP')) || 0;
let completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
let userName = localStorage.getItem('userName') || "بطل التحدي";
let isLightMode = localStorage.getItem('theme') === 'light';
let usedPlaygroundToday = localStorage.getItem('usedPlayground') === new Date().toDateString();

if (isLightMode) document.body.classList.add('light-mode');

// نظام السلسلة
let lastLogin = localStorage.getItem('lastLoginDate');
let streak = Number(localStorage.getItem('streak')) || 0;
let today = new Date().toDateString();
if (lastLogin !== today) {
    let yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    if (lastLogin === yesterday.toDateString()) { streak++; } else if (lastLogin !== null) { streak = 1; } else { streak = 1; }
    localStorage.setItem('lastLoginDate', today); localStorage.setItem('streak', streak);
    usedPlaygroundToday = false; // تصفير المهمة اليومية
    localStorage.setItem('usedPlayground', 'false');
}

function getLevelData(xp) {
    let level = Math.floor(xp / 100) + 1;
    let currentXP = xp % 100;
    let progressPercent = (currentXP / 100) * 100;
    let titles = ["مبتدئ 🌱", "مستكشف 🧭", "مبتكر 💡", "محترف 👑", "أسطورة 🏆"];
    return { level, currentXP, progressPercent, title: titles[Math.min(level - 1, titles.length - 1)] };
}

function getTotalLessons() { let t = 0; curriculum.forEach(m => t += m.lessons.length); return t; }

// إعدادات المختبر
let codeHTML = localStorage.getItem('codeHTML') || '<h1>مرحباً بالعالم</h1>';
let codeCSS = localStorage.getItem('codeCSS') || 'h1 { color: #38bdf8; }';
let codeJS = localStorage.getItem('codeJS') || 'console.log("مرحباً");';

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    const btn = document.getElementById('theme-btn');
    if(btn) btn.innerText = isLightMode ? '🌙' : '☀️';
}

function renderBadges() {
    const hasFirstLesson = completedLessons.length >= 1;
    const hasModule1 = completedLessons.includes(1) && completedLessons.includes(2) && completedLessons.includes(3);
    const hasStreak3 = streak >= 3;
    const isLegend = completedLessons.length === getTotalLessons();
    return `<div class="badge-container">
        <div class="badge ${hasFirstLesson ? 'unlocked' : ''}"><span>🌱</span> البداية</div>
        <div class="badge ${hasModule1 ? 'unlocked' : ''}"><span>🌐</span> مبرمج HTML</div>
        <div class="badge ${hasStreak3 ? 'unlocked' : ''}"><span>🔥</span> محارب السلسلة</div>
        <div class="badge ${isLegend ? 'unlocked' : ''}"><span>👑</span> الأسطورة</div>
    </div>`;
}

const screens = {
    home: () => {
        const lvl = getLevelData(userXP);
        // المهام اليومية
        const quest1 = completedLessons.length > 0; 
        const quest2 = usedPlaygroundToday;
        return `
        <button id="theme-btn" class="theme-toggle" onclick="toggleTheme()">${isLightMode ? '🌙' : '☀️'}</button>
        <div class="welcome-header"><h1>مرحبًا ${userName} 👋</h1><p>منبر المبرمجين الاحترافي.</p></div>
        
        <div class="card">
            <h2>المستوى ${lvl.level}: ${lvl.title}</h2>
            <p style="font-size:12px;">الخبرة: ${lvl.currentXP} / 100 XP</p>
            <div class="progress-container"><div class="progress-bar" style="width: ${lvl.progressPercent}%; background: var(--primary);"></div></div>
        </div>

        <div class="card">
            <h2>🎯 المهام اليومية</h2>
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding:10px 0;">
                <span>حل درساً واحداً</span>
                <span style="color:${quest1 ? 'var(--success)' : 'var(--text-muted)'}">${quest1 ? '✅' : '⏳'}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0;">
                <span>جرب المختبر اليوم</span>
                <span style="color:${quest2 ? 'var(--success)' : 'var(--text-muted)'}">${quest2 ? '✅' : '⏳'}</span>
            </div>
        </div>

        <div class="card" style="display:flex; justify-content:space-around; text-align:center;">
            <div><h2>🔥 ${streak}</h2><p style="font-size:12px; margin:0;">أيام متتالية</p></div>
            <div><h2>🎓 ${completedLessons.length}</h2><p style="font-size:12px; margin:0;">درس مكتمل</p></div>
        </div>
    `},
    lessons: () => {
        let html = `<h1>📚 المنهج الدراسي</h1>`;
        curriculum.forEach(module => {
            const completedInModule = module.lessons.filter(l => completedLessons.includes(l.id)).length;
            html += `<div class="card" style="cursor: pointer;" onclick="openModule(${module.moduleId})">
                <h2>${module.moduleIcon} ${module.moduleTitle}</h2><p>${module.moduleDescription}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                    <span style="font-size: 12px; background: var(--primary); color: #000; padding: 4px 8px; border-radius: 10px; font-weight: bold;">${completedInModule} / ${module.lessons.length}</span>
                </div></div>`;
        });
        return html;
    },
    moduleLessons: (moduleId) => {
        const module = curriculum.find(m => m.moduleId === moduleId);
        let html = `<button onclick="navigate('lessons', document.querySelectorAll('.nav-btn')[1])" style="background:none; border:none; color:var(--primary); margin-bottom:20px; cursor:pointer;">← العودة</button><h1>${module.moduleTitle}</h1>`;
        module.lessons.forEach(lesson => {
            const isCompleted = completedLessons.includes(lesson.id);
            html += `<div class="card" style="border-right: 4px solid ${isCompleted ? '#4ade80' : '#94a3b8'}; cursor: pointer;" onclick="openLesson(${lesson.id})"><h2>${lesson.title}</h2></div>`;
        });
        return html;
    },
    playground: () => {
        // تسجيل أن المتعلم استخدم المختبر اليوم
        localStorage.setItem('usedPlayground', new Date().toDateString());
        return `
        <h1>🧪 المختبر الاحترافي</h1>
        <p>اكتب كودك (HTML/CSS/JS) وشاهده فوراً.</p>
        <div class="card" style="padding:10px;">
            <div class="tabs">
                <button class="tab-btn active" onclick="switchTab('html')" id="tab-html">HTML</button>
                <button class="tab-btn" onclick="switchTab('css')" id="tab-css">CSS</button>
                <button class="tab-btn" onclick="switchTab('js')" id="tab-js">JS</button>
            </div>
            <textarea id="input-html" class="code-area active" oninput="saveProCode(this.value, 'html')">${codeHTML}</textarea>
            <textarea id="input-css" class="code-area" oninput="saveProCode(this.value, 'css')">${codeCSS}</textarea>
            <textarea id="input-js" class="code-area" oninput="saveProCode(this.value, 'js')">${codeJS}</textarea>
            <iframe id="preview-frame" class="preview-frame"></iframe>
        </div>`;
    },
    profile: () => `
        <h1>👤 ملفي</h1>
        <div class="card">
            <p>الاسم: <strong>${userName}</strong></p>
            <h2 style="margin-top:20px; font-size:18px;">أوسمتي 🏅</h2>
            ${renderBadges()}
            <button onclick="changeName()" style="background:var(--primary); color:#000; border:none; padding:8px; border-radius:8px; margin-top:20px; cursor:pointer; width:100%; font-weight:bold;">تغيير الاسم</button>
            <button onclick="resetProgress()" style="background:#ef4444; color:white; border:none; padding:8px; border-radius:8px; margin-top:10px; cursor:pointer; width:100%;">تصفير التقدم</button>
        </div>
    `
};

function navigate(screenName, btnElement, param = null) {
    let content = screenName === 'moduleLessons' ? screens.moduleLessons(param) : screens[screenName]();
    document.getElementById('app-content').innerHTML = content;
    if (btnElement) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    if(screenName === 'playground') setTimeout(() => runProCode(), 100);
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.code-area').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('input-' + tab).classList.add('active');
}

function saveProCode(val, type) {
    if(type === 'html') { codeHTML = val; localStorage.setItem('codeHTML', val); }
    if(type === 'css') { codeCSS = val; localStorage.setItem('codeCSS', val); }
    if(type === 'js') { codeJS = val; localStorage.setItem('codeJS', val); }
    runProCode();
}

function runProCode() {
    const frame = document.getElementById('preview-frame');
    const doc = frame.contentWindow.document;
    doc.open();
    doc.write(`<style>${codeCSS}</style>${codeHTML}<script>${codeJS}<\/script>`);
    doc.close();
}

function findLesson(id) { for (let m of curriculum) { const l = m.lessons.find(x => x.id === id); if (l) return l; } return null; }

function openLesson(id) {
    const l = findLesson(id);
    const savedNote = localStorage.getItem('note_lesson_' + id) || "";
    document.getElementById('app-content').innerHTML = `
        <button onclick="navigate('lessons', document.querySelectorAll('.nav-btn')[1])" style="background:none; border:none; color:var(--primary); margin-bottom:20px; cursor:pointer;">← العودة</button>
        <div class="card">
            <h2 style="color:var(--primary);">${l.title}</h2>
            <hr style="border-color:#334155; margin: 15px 0;">
            <div class="lesson-content">${l.content}</div>
            
            <h3 style="margin-top:20px; font-size:16px;">📝 ملاحظاتي:</h3>
            <textarea class="notes-area" placeholder="اكتب ملاحظاتك هنا ليتم حفظها..." oninput="localStorage.setItem('note_lesson_${id}', this.value)">${savedNote}</textarea>

            <button onclick="goToTask(${l.id})" class="action-btn">جرب في المختبر 🧪</button>
            <button onclick="startQuiz(${l.id})" class="action-btn quiz-btn">الاختبار 📝</button>
        </div>`;
}

function goToTask(id) { localStorage.setItem('codeHTML', findLesson(id).task); navigate('playground', document.querySelectorAll('.nav-btn')[2]); }

function startQuiz(id) {
    const l = findLesson(id);
    let opts = l.options.map((o, i) => `<button onclick="checkAnswer(${id}, ${i})" style="display:block; width:100%; margin-bottom:10px; padding:12px; background:var(--card-bg); color:var(--text-main); border:1px solid #334155; border-radius:8px;">${o}</button>`).join('');
    document.getElementById('app-content').innerHTML = `<button onclick="openLesson(${id})" style="background:none; border:none; color:var(--primary); margin-bottom:20px; cursor:pointer;">← العودة للشرح</button><div class="card"><h2>📝 اختبار</h2><p>${l.question}</p><hr style="border-color:#334155; margin: 15px 0;">${opts}</div>`;
}

function checkAnswer(lessonId, selectedIndex) {
    const l = findLesson(lessonId);
    if (selectedIndex === l.correctAnswer) {
        if (!completedLessons.includes(lessonId)) {
            userXP += 50; completedLessons.push(lessonId);
            localStorage.setItem('userXP', userXP); localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
            showModal("🎉 أحسنت!", "إجابة صحيحة! كسبت 50 XP.");
        } else { showModal("تنبيه", "لقد أكملت هذا الدرس!"); }
        let currentModule = curriculum.find(m => m.lessons.some(x => x.id === lessonId));
        navigate('moduleLessons', document.querySelectorAll('.nav-btn')[1], currentModule.moduleId);
    } else { showModal("❌ خطأ", "حاول مرة أخرى!"); }
}

function showModal(t, m) { document.getElementById('modal-title').textContent = t; document.getElementById('modal-message').textContent = m; document.getElementById('custom-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('custom-modal').style.display = 'none'; }
function changeName() { let n = prompt("اسمك الجديد:"); if (n) { userName = n; localStorage.setItem('userName', userName); navigate('profile', document.querySelectorAll('.nav-btn')[3]); } }
function resetProgress() { if(confirm("مسح كل شيء؟")) { localStorage.clear(); location.reload(); } }
function openModule(id) { navigate('moduleLessons', document.querySelectorAll('.nav-btn')[1], id); }

window.onload = () => navigate('home');