/* ========================================
   奇美博物館語音導覽 — 核心邏輯
   使用預錄 MP3 音檔（edge-tts 神經網路語音）
   ======================================== */

'use strict';

// ──────────────────────────────────────
// 導覽資料
// ──────────────────────────────────────
const GUIDE_DATA = {
  intro: {
    id: 'intro',
    title: '導覽開場',
    subtitle: '奇美博物館 · 整體介紹',
    image: 'images/chimei_welcome.png',
    playBtnId: 'play-intro',
    cardId: 'card-intro',
    audioSrc: 'audio/intro.mp3',
    defaultLabel: '播放開場導覽'
  },
  thinker: {
    id: 'thinker',
    title: '《沉思者》',
    subtitle: '奧古斯特 · 羅丹',
    image: 'images/thinker.png',
    playBtnId: 'play-thinker',
    cardId: 'card-thinker',
    audioSrc: 'audio/thinker.mp3',
    defaultLabel: '聆聽導覽'
  },
  abandon: {
    id: 'abandon',
    title: '《遺棄》',
    subtitle: '卡蜜兒 · 克勞黛',
    image: 'images/abandon.png',
    playBtnId: 'play-abandon',
    cardId: 'card-abandon',
    audioSrc: 'audio/abandon.mp3',
    defaultLabel: '聆聽導覽'
  },
  charity: {
    id: 'charity',
    title: '《慈愛》',
    subtitle: '威廉 · 布葛赫',
    image: 'images/charity.png',
    playBtnId: 'play-charity',
    cardId: 'card-charity',
    audioSrc: 'audio/charity.mp3',
    defaultLabel: '聆聽導覽'
  },
  saintMartin: {
    id: 'saintMartin',
    title: '《聖馬丁與乞丐》',
    subtitle: '艾爾 · 葛雷柯工作坊',
    image: 'images/saint_martin.png',
    playBtnId: 'play-saintMartin',
    cardId: 'card-saint-martin',
    audioSrc: 'audio/saintMartin.mp3',
    defaultLabel: '聆聽導覽'
  },
  theseus: {
    id: 'theseus',
    title: '《鐵修斯戰勝人馬獸》',
    subtitle: '安端-路易 · 巴里',
    image: 'images/theseus.png',
    playBtnId: 'play-theseus',
    cardId: 'card-theseus',
    audioSrc: 'audio/theseus.mp3',
    defaultLabel: '聆聽導覽'
  },
  artHall: {
    id: 'artHall',
    title: '藝術廳 · 西洋繪畫',
    subtitle: '整體導覽 · 13至20世紀',
    image: 'images/art_hall.png',
    playBtnId: 'play-artHall',
    cardId: 'card-art-hall',
    audioSrc: 'audio/artHall.mp3',
    defaultLabel: '聆聽導覽'
  },
  outro: {
    id: 'outro',
    title: '導覽結語',
    subtitle: '感謝參與 · 推薦路線',
    image: 'images/chimei_welcome.png',
    playBtnId: 'play-outro',
    cardId: null,
    audioSrc: 'audio/outro.mp3',
    defaultLabel: '播放導覽結語'
  },
  musicAllegory: {
    id: 'musicAllegory',
    title: '《音樂的寓意》',
    subtitle: '漢斯 · 馬卡特',
    image: 'images/music_allegory.png',
    playBtnId: 'play-musicAllegory',
    cardId: 'card-music-allegory',
    audioSrc: 'audio/musicAllegory.mp3',
    defaultLabel: '聆聽導覽'
  },
  theMessage: {
    id: 'theMessage',
    title: '《信息》',
    subtitle: '湯瑪斯 · 庫伯 · 高奇',
    image: 'images/the_message.png',
    playBtnId: 'play-theMessage',
    cardId: 'card-the-message',
    audioSrc: 'audio/theMessage.mp3',
    defaultLabel: '聆聽導覽'
  },
  theStorm: {
    id: 'theStorm',
    title: '《暴風雨》',
    subtitle: '皮耶 · 奧古斯特 · 寇特',
    image: 'images/the_storm.png',
    playBtnId: 'play-theStorm',
    cardId: 'card-the-storm',
    audioSrc: 'audio/theStorm.mp3',
    defaultLabel: '聆聽導覽'
  },
  venusBirth: {
    id: 'venusBirth',
    title: '《維納斯的誕生》',
    subtitle: '法蘭契斯可 · 波戴西提',
    image: 'images/venus_birth.png',
    playBtnId: 'play-venusBirth',
    cardId: 'card-venus-birth',
    audioSrc: 'audio/venusBirth.mp3',
    defaultLabel: '聆聽導覽'
  },
  instrumentsHall: {
    id: 'instrumentsHall',
    title: '樂器廳 · 整體導覽',
    subtitle: '全球最大提琴私人收藏',
    image: 'images/instruments_hall.png',
    playBtnId: 'play-instrumentsHall',
    cardId: 'card-instruments-hall',
    audioSrc: 'audio/instrumentsHall.mp3',
    defaultLabel: '聆聽導覽'
  },
  charlesIX: {
    id: 'charlesIX',
    title: '「查理九世」大提琴',
    subtitle: '安德烈 · 阿瑪蒂 · 1566',
    image: 'images/charles_ix_cello.png',
    playBtnId: 'play-charlesIX',
    cardId: 'card-charles-ix',
    audioSrc: 'audio/charlesIX.mp3',
    defaultLabel: '聆聽導覽'
  },
  famousViolins: {
    id: 'famousViolins',
    title: '名琴展區',
    subtitle: '史特拉底瓦里 · 瓜奈里',
    image: 'images/stradivari_violins.png',
    playBtnId: 'play-famousViolins',
    cardId: 'card-famous-violins',
    audioSrc: 'audio/famousViolins.mp3',
    defaultLabel: '聆聽導覽'
  },
  autoInstruments: {
    id: 'autoInstruments',
    title: '自動樂器展區',
    subtitle: '機械音樂家 · 18-20世紀',
    image: 'images/auto_instruments.png',
    playBtnId: 'play-autoInstruments',
    cardId: 'card-auto-instruments',
    audioSrc: 'audio/autoInstruments.mp3',
    defaultLabel: '聆聽導覽'
  }
};

// ──────────────────────────────────────
// 播放器狀態
// ──────────────────────────────────────
let currentId = null;
let audio = null;       // HTML5 Audio 物件
let animFrame = null;   // requestAnimationFrame ID

// ──────────────────────────────────────
// 初始化
// ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 建立全域 Audio 物件
  audio = new Audio();
  audio.preload = 'auto';

  // 音訊事件綁定
  audio.addEventListener('timeupdate', onTimeUpdate);
  audio.addEventListener('ended', onPlayEnd);
  audio.addEventListener('error', (e) => {
    console.warn('音訊載入錯誤：', e);
    updateStatus('載入失敗');
  });

  // 按鈕事件委派
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[id^="play-"]');
    if (!btn) return;
    e.stopPropagation();
    const key = btn.id.replace('play-', '');
    if (GUIDE_DATA[key]) playAudio(key);
  });
});

// ──────────────────────────────────────
// 主要播放函式
// ──────────────────────────────────────
function playAudio(id) {
  if (!GUIDE_DATA[id]) return;
  const guide = GUIDE_DATA[id];

  // 若正在播放同一作品 → 暫停/繼續
  if (currentId === id && !audio.paused) {
    audio.pause();
    setCardState(id, 'paused');
    document.getElementById('play-icon').textContent = '▶';
    updateStatus('已暫停');
    return;
  }

  // 若同一作品暫停中 → 繼續
  if (currentId === id && audio.paused && audio.currentTime > 0) {
    audio.play();
    setCardState(id, 'playing');
    document.getElementById('play-icon').textContent = '⏸';
    updateStatus('播放中…');
    return;
  }

  // 播放新的作品
  clearPreviousState();
  currentId = id;
  audio.src = guide.audioSrc;
  audio.playbackRate = parseFloat(document.getElementById('speed-select').value);
  audio.play().catch(err => {
    console.warn('播放失敗：', err);
    updateStatus('無法播放');
  });

  // 更新 UI
  showPlayerBar(guide);
  setCardState(id, 'playing');
  document.getElementById('play-icon').textContent = '⏸';
  updateStatus('播放中…');
}

// ──────────────────────────────────────
// 事件處理
// ──────────────────────────────────────
function onTimeUpdate() {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  setProgressFill(pct);

  // 更新時間顯示
  const cur = formatTime(audio.currentTime);
  const dur = formatTime(audio.duration);
  updateStatus(`${cur} / ${dur}`);
}

function onPlayEnd() {
  setProgressFill(100);
  updateStatus('播放完畢');
  document.getElementById('play-icon').textContent = '▶';
  setCardState(currentId, 'done');
}

// ──────────────────────────────────────
// 控制函式
// ──────────────────────────────────────
function togglePlayPause() {
  if (!audio || !currentId) return;
  if (audio.paused) {
    audio.play();
    document.getElementById('play-icon').textContent = '⏸';
    setCardState(currentId, 'playing');
    updateStatus('播放中…');
  } else {
    audio.pause();
    document.getElementById('play-icon').textContent = '▶';
    setCardState(currentId, 'paused');
    updateStatus('已暫停');
  }
}

function restartCurrent() {
  if (!audio || !currentId) return;
  audio.currentTime = 0;
  audio.play();
  document.getElementById('play-icon').textContent = '⏸';
  setCardState(currentId, 'playing');
  updateStatus('播放中…');
}

function stopAudio() {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  setProgressFill(0);
  updateStatus('等待中');
  document.getElementById('play-icon').textContent = '▶';
  setCardState(currentId, 'idle');
  currentId = null;
}

function changeSpeed(val) {
  const rate = parseFloat(val);
  if (audio) audio.playbackRate = rate;
}

function startTour() {
  playAudio('intro');
  document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
}

// ──────────────────────────────────────
// UI 輔助函式
// ──────────────────────────────────────
function clearPreviousState() {
  if (currentId) setCardState(currentId, 'idle');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  setProgressFill(0);
}

function showPlayerBar(guide) {
  const bar = document.getElementById('audio-player-bar');
  bar.classList.add('visible');
  document.getElementById('player-title').textContent = guide.title;
  document.getElementById('player-subtitle').textContent = guide.subtitle;
  const img = document.getElementById('player-thumb-img');
  img.src = guide.image;
  img.alt = guide.title;
}

function setProgressFill(pct) {
  const el = document.getElementById('progress-fill');
  if (el) el.style.width = pct + '%';
}

function updateStatus(text) {
  const el = document.getElementById('player-status');
  if (el) el.textContent = text;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ──────────────────────────────────────
// 卡片狀態切換
// ──────────────────────────────────────
function setCardState(id, state) {
  if (!id || !GUIDE_DATA[id]) return;
  const guide = GUIDE_DATA[id];

  // 清除所有 active
  document.querySelectorAll('.artwork-card, .intro-card, .outro-card').forEach(el => {
    el.classList.remove('active-play');
  });

  // 更新按鈕
  if (guide.playBtnId) {
    const btn = document.getElementById(guide.playBtnId);
    if (btn) {
      const icon = btn.querySelector('.play-btn-icon');
      const text = btn.querySelector('span:last-child');
      if (state === 'playing') {
        if (icon) icon.textContent = '⏸';
        if (text) text.textContent = '暫停';
        btn.classList.add('playing');
      } else if (state === 'paused') {
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = '繼續播放';
        btn.classList.add('playing');
      } else {
        if (icon) icon.textContent = '▶';
        if (text) text.textContent = guide.defaultLabel;
        btn.classList.remove('playing');
      }
    }
  }

  // 卡片 active 邊框
  if ((state === 'playing' || state === 'paused') && guide.cardId) {
    const card = document.getElementById(guide.cardId);
    if (card) card.classList.add('active-play');
  }
}

// ──────────────────────────────────────
// 背景省電：切換 App 時自動暫停
// ──────────────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden && audio && !audio.paused) {
    audio.pause();
    document.getElementById('play-icon').textContent = '▶';
    setCardState(currentId, 'paused');
    updateStatus('已暫停（背景）');
  }
});

// ──────────────────────────────────────
// 時間鎖定：5/18 11:00 (台灣時間) 才開放
// ──────────────────────────────────────
const UNLOCK_TIME = new Date(2026, 4, 18, 11, 0, 0).getTime(); // 月份 0-indexed，4 = 五月
let countdownTimer = null;

function checkTimelock() {
  const now = Date.now();
  const diff = UNLOCK_TIME - now;
  const fab = document.getElementById('fab-heart');

  if (diff <= 0) {
    // 時間到！隱藏倒數 → 顯示問答 → 顯示愛心
    if (countdownTimer) clearInterval(countdownTimer);
    const tl = document.getElementById('timelock-overlay');
    const qz = document.getElementById('quiz-overlay');
    if (tl) tl.classList.remove('visible');
    if (qz) qz.classList.add('visible');
    if (fab) fab.style.display = 'flex';
    return;
  }

  // 鎖定中：隱藏愛心
  if (fab) fab.style.display = 'none';

  // 更新倒數
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const eh = document.getElementById('cd-hours');
  const em = document.getElementById('cd-minutes');
  const es = document.getElementById('cd-seconds');
  if (eh) eh.textContent = String(h).padStart(2, '0');
  if (em) em.textContent = String(m).padStart(2, '0');
  if (es) es.textContent = String(s).padStart(2, '0');
}

// DOM 就緒後啟動倒數
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    checkTimelock();
    countdownTimer = setInterval(checkTimelock, 1000);
  });
} else {
  checkTimelock();
  countdownTimer = setInterval(checkTimelock, 1000);
}

// ──────────────────────────────────────
// 入場問答 → 耳機確認 → 老公問候
// ──────────────────────────────────────
let greetingAudio = null;
let testAudio = null;

const WRONG_HINTS = [
  '不對喔～再想想看 😏',
  '你確定？老公不太信 😂',
  '哈哈，再猜一次吧！',
  '提示：最近超carry的那隻 💪'
];
let wrongCount = 0;

// --- Step 1: 問答 ---
function quizAnswer(choice) {
  const hint = document.getElementById('quiz-hint');
  const btns = document.querySelectorAll('.quiz-btn');

  if (choice === 'C') {
    btns.forEach(b => b.style.pointerEvents = 'none');
    document.querySelector('.quiz-btn-correct').classList.add('correct');
    hint.style.color = '#4ade80';
    hint.textContent = '答對了！✨ 果然是朵莉亞大神！';
    setTimeout(() => {
      document.getElementById('quiz-overlay').classList.remove('visible');
      setTimeout(() => {
        document.getElementById('earphone-overlay').classList.add('visible');
      }, 300);
    }, 1200);
  } else {
    const clickedBtn = [...btns].find(b => b.textContent.startsWith(choice));
    if (clickedBtn) {
      clickedBtn.classList.remove('wrong');
      void clickedBtn.offsetWidth;
      clickedBtn.classList.add('wrong');
    }
    hint.style.color = '#ff6b8a';
    hint.textContent = WRONG_HINTS[Math.min(wrongCount, WRONG_HINTS.length - 1)];
    wrongCount++;
  }
}

// --- Step 2: 耳機確認 ---
function testVolume() {
  const btn = document.getElementById('btn-test-volume');
  const status = document.getElementById('earphone-status');

  // 如果正在播放就停止
  if (testAudio && !testAudio.paused) {
    testAudio.pause();
    testAudio = null;
    btn.classList.remove('playing');
    btn.textContent = '🔊 測試音量';
    status.textContent = '點上方按鈕再測一次';
    return;
  }

  // 播放開場導覽的前幾秒作為測試音
  testAudio = new Audio('audio/intro.mp3');
  testAudio.currentTime = 0;
  btn.classList.add('playing');
  btn.textContent = '🔊 播放中… 再按一次停止';
  status.textContent = '如果聽得到聲音，就可以按下方確認囉！';
  status.style.color = '#4ade80';

  testAudio.play().catch(() => {
    status.textContent = '⚠️ 播放失敗，請確認手機沒有靜音';
    status.style.color = '#ff6b8a';
    btn.classList.remove('playing');
    btn.textContent = '🔊 再試一次';
  });

  // 播放 5 秒後自動停止
  setTimeout(() => {
    if (testAudio && !testAudio.paused) {
      testAudio.pause();
      testAudio = null;
      btn.classList.remove('playing');
      btn.textContent = '🔊 再測一次';
    }
  }, 5000);
}

function confirmEarphone() {
  if (testAudio) { testAudio.pause(); testAudio = null; }
  document.getElementById('earphone-overlay').classList.remove('visible');
  setTimeout(() => showHusbandGreeting(), 300);
}

// --- Step 3: 老公問候（手動播放）---
function showHusbandGreeting() {
  document.getElementById('husband-overlay').classList.add('visible');
}

function playGreetingAudio() {
  const btn = document.getElementById('btn-play-greeting');
  // 已在播放中就不重複觸發
  if (greetingAudio && !greetingAudio.paused) return;

  btn.classList.add('playing');
  btn.textContent = '🔊 播放中…';
  btn.style.pointerEvents = 'none';

  greetingAudio = new Audio('audio/husband_greeting.mp3');
  const wave = document.getElementById('husband-wave');

  greetingAudio.addEventListener('play', () => wave.classList.add('active'));
  greetingAudio.addEventListener('ended', () => {
    wave.classList.remove('active');
    btn.style.display = 'none';
    // 顯示文字稿 + 關閉按鈕
    document.getElementById('husband-transcript').style.display = 'block';
    document.getElementById('btn-husband-close').style.display = 'inline-block';
  });

  greetingAudio.play().catch(() => {
    btn.classList.remove('playing');
    btn.textContent = '⚠️ 播放失敗，再試一次';
    btn.style.pointerEvents = 'auto';
  });
}

function closeHusbandGreeting() {
  document.getElementById('husband-overlay').classList.remove('visible');
  if (greetingAudio) { greetingAudio.pause(); greetingAudio = null; }
}

// ──────────────────────────────────────
// 心情筆記
// ──────────────────────────────────────
const JOURNAL_KEY = 'chimei_journal';
let pendingPhoto = null;

function toggleJournal() {
  document.getElementById('journal-panel').classList.toggle('open');
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    pendingPhoto = ev.target.result;
    document.getElementById('journal-preview-img').src = pendingPhoto;
    document.getElementById('journal-photo-preview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function removePhotoPreview() {
  pendingPhoto = null;
  document.getElementById('journal-photo-preview').style.display = 'none';
  document.getElementById('journal-preview-img').src = '';
  document.getElementById('journal-photo').value = '';
}

function saveJournalEntry() {
  const input = document.getElementById('journal-input');
  const text = input.value.trim();
  if (!text && !pendingPhoto) { input.placeholder = '請寫點什麼再儲存喔 ♡'; input.focus(); return; }
  const entries = getJournalEntries();
  const now = new Date();
  const t = `${now.getMonth()+1}/${now.getDate()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  entries.unshift({ id: Date.now(), time: t, text, photo: pendingPhoto || null });
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  input.value = ''; input.placeholder = '寫下此刻的感動…';
  removePhotoPreview();
  renderJournalEntries(); updateBadge();
  const btn = document.querySelector('.journal-save-btn');
  btn.textContent = '✅ 已儲存！';
  setTimeout(() => { btn.textContent = '💾 儲存'; }, 1500);
}

function deleteJournalEntry(id) {
  let entries = getJournalEntries().filter(e => e.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  renderJournalEntries(); updateBadge();
}

function getJournalEntries() {
  try { return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || []; } catch { return []; }
}

function renderJournalEntries() {
  const c = document.getElementById('journal-entries');
  const entries = getJournalEntries();
  const empty = document.getElementById('journal-empty');
  c.querySelectorAll('.journal-entry').forEach(el => el.remove());
  if (entries.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  entries.forEach(entry => {
    const el = document.createElement('div');
    el.className = 'journal-entry';
    const esc = (s) => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML.replace(/\n/g,'<br/>'); };
    el.innerHTML = `<div class="journal-entry-time">${entry.time}</div>
      ${entry.text ? `<div class="journal-entry-text">${esc(entry.text)}</div>` : ''}
      ${entry.photo ? `<img class="journal-entry-photo" src="${entry.photo}" alt="照片"/>` : ''}
      <button class="journal-entry-delete" onclick="deleteJournalEntry(${entry.id})">🗑 刪除</button>`;
    c.appendChild(el);
  });
}

function updateBadge() {
  const n = getJournalEntries().length;
  const b = document.getElementById('journal-badge');
  if (n > 0) { b.style.display = 'flex'; b.textContent = n; } else { b.style.display = 'none'; }
}

// 頁面載入時初始化筆記
document.addEventListener('DOMContentLoaded', () => { renderJournalEntries(); updateBadge(); });
