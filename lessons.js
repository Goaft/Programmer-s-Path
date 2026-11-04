const curriculum = [
    {
        moduleId: 1, moduleTitle: "الوحدة 1: أساسيات الويب", moduleIcon: "🌐",
        moduleDescription: "بناء هيكل الصفحات باستخدام HTML.",
        lessons: [
            { id: 1, title: "الدرس 1: كيف يعمل الإنترنت؟", content: "<p>الإنترنت هو شبكة خوادم. HTML للهيكل، CSS للتصميم، JS للتفاعل.</p>", task: `<!-- تأمل فقط -->`, question: "ماذا يمثل الـ HTML؟", options: ["العقل", "التصميم", "الهيكل", "قواعد البيانات"], correctAnswer: 2 },
            { id: 2, title: "الدرس 2: أول وسم (Tag)", content: "<p>نستخدم &lt;h1&gt; للعناوين و &lt;p&gt; للفقرات.</p>", task: `<h1>مرحباً</h1>\n<p>أنا أتعلم.</p>`, question: "كيف نغلق وسم h1؟", options: ["<h1>", "</h1>", "<end h1>", "<h1/>"], correctAnswer: 1 },
            { id: 3, title: "الدرس 3: القوائم والروابط", content: "<p>&lt;ul&gt; للقوائم، &lt;a&gt; للروابط.</p>", task: `<ul>\n  <li>تعلم</li>\n</ul>\n<a href="#">رابط</a>`, question: "ما هو وسم عنصر القائمة؟", options: ["<ul>", "<ol>", "<li>", "<a>"], correctAnswer: 2 }
        ]
    },
    {
        moduleId: 2, moduleTitle: "الوحدة 2: التصميم (CSS)", moduleIcon: "🎨",
        moduleDescription: "تحويل الصفحات الباهتة إلى واجهات جذابة.",
        lessons: [
            { id: 4, title: "الدرس 4: الألوان والمسافات", content: "<p>نستخدم style للألوان، و padding للمسافات الداخلية.</p>", task: `<div style="background: #333; color: white; padding: 20px;">\n  صندوق ملون\n</div>`, question: "ما هي خاصية المسافة الداخلية؟", options: ["margin", "padding", "space", "border"], correctAnswer: 1 },
            { id: 5, title: "الدرس 5: التخطيط (Flexbox)", content: "<p>display: flex; لترتيب العناصر بجانب بعضها.</p>", task: `<div style="display: flex; gap: 10px;">\n  <div style="background: red; padding: 10px;">1</div>\n  <div style="background: blue; padding: 10px;">2</div>\n</div>`, question: "كيف نفعل الفليكس؟", options: ["display: block", "display: flex", "display: grid", "display: inline"], correctAnswer: 1 }
        ]
    },
    {
        moduleId: 3, moduleTitle: "الوحدة 3: لغة البرمجة (JS)", moduleIcon: "🧠",
        moduleDescription: "إضافة العقل والتفاعل لتطبيقك.",
        lessons: [
            { id: 6, title: "الدرس 6: المتغيرات", content: "<p>let للمتغيرات، const للثوابت.</p>", task: `<script>\n  let name = "مبرمج";\n  document.body.innerHTML = name;\n</script>`, question: "كيف نعرف متغيراً يتغير؟", options: ["const", "var", "let", "int"], correctAnswer: 2 },
            { id: 7, title: "الدرس 7: الشروط (If)", content: "<p>إذا تحقق الشرط نفذ، وإلا نفذ شيئاً آخر.</p>", task: `<script>\n  let s = 85;\n  if(s > 50) document.body.innerHTML = "ناجح";\n  else document.body.innerHTML = "راسب";\n</script>`, question: "ماذا تعني else؟", options: ["إذا", "وإلا", "توقف", "أعد"], correctAnswer: 1 },
            { id: 8, title: "الدرس 8: التحكم بالصفحة (DOM)", content: "<p>تغيير عناصر HTML عبر getElementById.</p>", task: `<h1 id="t">قديم</h1>\n<button onclick="document.getElementById('t').innerHTML = 'جديد!'">غير</button>`, question: "دالة جلب العنصر بالـ ID؟", options: ["getElement()", "getElementById()", "findID()", "queryID()"], correctAnswer: 1 }
        ]
    },
    {
        moduleId: 4, moduleTitle: "الوحدة 4: سوق العمل والمستقبل", moduleIcon: "💼",
        moduleDescription: "كيف تحول مهاراتك إلى وظيفة أو مشروع ناجح.",
        lessons: [
            { id: 9, title: "الدرس 9: ما هو الـ API؟", content: "<p>الـ API هو وسيط يجلب لك بيانات من خوادم أخرى (مثل جلب حالة الطقس أو الأخبار).</p><p>نستخدم دالة <code>fetch()</code> في الجافاسكريبت لجلب البيانات.</p>", task: `<p>جرب جلب بيانات وهمية:</p>\n<button onclick="fetch('https://jsonplaceholder.typicode.com/todos/1').then(r=>r.json()).then(d=>alert('تم جلب: ' + d.title))">جلب بيانات</button>`, question: "ما هي الدالة التي نستخدمها لجلب البيانات من API؟", options: ["get()", "bring()", "fetch()", "load()"], correctAnswer: 2 },
            { id: 10, title: "الدرس 10: كيف ترفع كودك على GitHub؟", content: "<p>GitHub هو مكان لحفظ كودك ومشاركته. تنشئ Repository، وترفع الملفات، ثم تفعل GitHub Pages ليعمل كموقع حقيقي.</p>", task: `<!-- تطبيقنا هذا هو الدليل! -->`, question: "ماذا نستخدم لجعل الموقع يعمل مجاناً على GitHub؟", options: ["GitHub Actions", "GitHub Pages", "GitHub Repos", "GitHub Server"], correctAnswer: 1 },
            { id: 11, title: "الدرس 11: أسئلة المقابلات الشخصية", content: "<p>في المقابلات، يسألونك عن الفرق بين let و const، وعن طريقة عمل الـ DOM. راجع دروسك جيداً!</p>", task: `<!-- تدرب على الإجابة -->`, question: "ما الفرق بين let و const؟", options: ["لا يوجد فرق", "let يتغير، const ثابت", "const يتغير، let ثابت", "كلاهما ثابت"], correctAnswer: 1 }
        ]
    }
];