/* ============================================================
   小和 · 个人作品集 交互脚本
   - 项目数据驱动渲染：新增项目只需往 PROJECTS 数组添加一个对象
   - 分类筛选 / 介绍展开 / 导航高亮 / 轻量入场动效
   ============================================================ */

/* ==================== 项目数据 ====================
 * 字段说明：
 *   name      项目名称
 *   tagline   一句话简介
 *   detail    展开后的补充介绍（可留空 ""，留空则不显示展开按钮）
 *   tech      技术栈数组
 *   date      完成时间
 *   category 类别（Tag 文案，筛选项自动从数据中生成）
 *   image     项目配图
 */
const PROJECTS = [
  {
    name: "轻记账",
    tagline: "面向日常生活场景的极简记账微信小程序，支持语音快捷记账、月度收支统计与预算提醒。",
    detail: "一款面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。项目支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    tech: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025.04",
    category: "移动应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=flat%20modern%20illustration%20of%20minimalist%20expense%20tracking%20app%20interface%2C%20smartphone%20mockup%20with%20bar%20charts%20and%20voice%20note%20icon%2C%20warm%20cream%20background%2C%20ink%20and%20vermilion%20orange%20palette%2C%20clean%20vector%20UI&image_size=landscape_16_9"
  },
  {
    name: "拾光集市",
    tagline: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。",
    detail: "一个面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    tech: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025.09",
    category: "Web应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=flat%20illustration%20of%20campus%20second%20hand%20marketplace%20web%20interface%2C%20product%20cards%20with%20books%20and%20gadgets%2C%20search%20bar%2C%20cream%20background%2C%20ink%20and%20vermilion%20orange%20palette%2C%20minimal%20modern%20vector%20UI%20mockup&image_size=landscape_16_9"
  },
  {
    name: "城市脉搏",
    tagline: "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。",
    detail: "一个城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。项目通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    tech: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    date: "2026.03",
    category: "数据可视化",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dark%20data%20visualization%20dashboard%20big%20screen%2C%20abstract%20city%20map%20with%20glowing%20traffic%20lines%20and%20weather%20icons%2C%20particle%20effects%2C%20deep%20ink%20navy%20background%2C%20orange%20accents%2C%20minimal%20futuristic%20infographic%20style&image_size=landscape_16_9"
  },
  {
    name: "课语通",
    tagline: "基于大语言模型的课程问答助手，上传课程资料即可建立知识索引并回答问题。",
    detail: "一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    tech: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    date: "2026.07",
    category: "AI应用",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=flat%20illustration%20of%20AI%20course%20Q%26A%20assistant%20app%2C%20document%20with%20knowledge%20graph%20nodes%20and%20chat%20bubbles%2C%20quote%20citation%20icons%2C%20cream%20background%2C%20vermilion%20orange%20and%20ink%20colors%2C%20minimal%20modern%20vector&image_size=landscape_16_9"
  }
];

const $ = (sel, el = document) => el.querySelector(sel);

/* ==================== 渲染项目列表 ==================== */

function renderProjects() {
  const list = $("#projectList");
  list.innerHTML = PROJECTS.map((p, i) => {
    const no = String(i + 1).padStart(2, "0");
    const tech = p.tech.map(t => `<li>${t}</li>`).join("");
    const moreBtn = p.detail
      ? `<button class="p-more" type="button" aria-expanded="false">展开介绍 +</button>`
      : "";
    return `
      <article class="project reveal ${i % 2 ? "reverse" : ""}" data-cat="${p.category}">
        <div class="p-media">
          <img src="${p.image}" alt="${p.name} 项目配图" loading="lazy">
        </div>
        <div class="p-body">
          <div class="p-meta">
            <span class="p-no">${no}</span>
            <span class="p-date">${p.date}</span>
            <span class="p-tag">${p.category}</span>
          </div>
          <h3>${p.name}</h3>
          <p class="p-intro">${p.tagline}</p>
          ${p.detail ? `<p class="p-detail">${p.detail}</p>` : ""}
          <ul class="p-tech">${tech}</ul>
          ${moreBtn}
        </div>
      </article>`;
  }).join("");
}

/* ==================== 分类筛选 ==================== */

function renderFilters() {
  const bar = $("#filters");
  const cats = ["全部", ...new Set(PROJECTS.map(p => p.category))];
  bar.innerHTML = cats
    .map((c, i) => `<button type="button" data-cat="${c}" ${i === 0 ? 'class="active"' : ""}>${c}</button>`)
    .join("");

  const count = $("#filterCount");
  const updateCount = visible => {
    count.innerHTML = `共 <b>${visible}</b> / ${PROJECTS.length} 个项目`;
  };
  updateCount(PROJECTS.length);

  bar.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    bar.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
    const cat = btn.dataset.cat;
    let visible = 0;
    document.querySelectorAll("#projectList .project").forEach(el => {
      const show = cat === "全部" || el.dataset.cat === cat;
      el.style.display = show ? "" : "none";
      // 首个可见项目不画顶部分割线（CSS 相邻选择器不区分可见性）
      el.classList.toggle("first-visible", show && visible === 0);
      if (show) visible++;
    });
    updateCount(visible);
  });
}

/* ==================== 项目交互：展开介绍 / 图片加载失败兜底 ==================== */

function bindProjectEvents() {
  const list = $("#projectList");

  list.addEventListener("click", e => {
    const btn = e.target.closest(".p-more");
    if (!btn) return;
    const article = btn.closest(".project");
    const open = article.classList.toggle("open");
    btn.textContent = open ? "收起介绍 −" : "展开介绍 +";
    btn.setAttribute("aria-expanded", String(open));
  });

  // 图片生成/加载失败时，隐藏破图并显示占位底色
  list.querySelectorAll(".p-media img").forEach(img => {
    img.addEventListener("error", () => img.closest(".p-media").classList.add("img-fail"));
  });
}

/* ==================== 侧栏滚动高亮（scrollspy） ==================== */

function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav-link")];
  const map = new Map(
    links.map(l => [document.querySelector(l.getAttribute("href")), l])
  );

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.remove("active"));
      const link = map.get(entry.target);
      if (link) link.classList.add("active");
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  map.forEach((_, sec) => spy.observe(sec));
}

/* ==================== 轻量入场动效 ==================== */

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ==================== 深浅色主题切换 ==================== */

const THEME_KEY = "portfolio-theme";

// 页面渲染前先应用已保存的主题，避免刷新时闪烁
(function applySavedTheme() {
  let saved = "";
  try { saved = localStorage.getItem(THEME_KEY) || ""; } catch (_) { /* 存储不可用时忽略 */ }
  document.documentElement.setAttribute(
    "data-theme",
    saved === "dark" || saved === "light" ? saved : "light"
  );
})();

function initThemeToggle() {
  const root = document.documentElement;
  const btn = $("#themeToggle");
  if (!btn) return;

  const syncBtn = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", dark ? "切换为浅色主题" : "切换为深色主题");
  };
  syncBtn();

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* 存储不可用时忽略 */ }
    syncBtn();
  });
}

/* ==================== 初始化 ==================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  renderProjects();
  renderFilters();
  bindProjectEvents();
  initScrollSpy();
  initReveal();
});
