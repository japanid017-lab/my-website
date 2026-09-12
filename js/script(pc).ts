  document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================
       1. ヒーローエリア スライダー（自動＆ドット切り替え）
       =================================================== */
    const heroSection = document.querySelector('.hero');
    const dots = document.querySelectorAll('.hero-dots .dot');
    
    // スライドデータ（画像切り替え用サンプル）
    const slides = [ 
      {
        title: "2026 NEW MODEL SPEED PRO ARRIVED.",
        subtitle: "圧倒的な軽量性と足馴染み。ピッチ上のすべての動きを加速させる最新モデル。",
        btnText: "新作スパイクをチェック",
        bg: "linear-gradient(135deg, #1b2a4a 0%, #0d1526 100%)"
      },
    ]
     
console.log(slides);
console.log(slides[0].title);

    let currentSlide = 0;
    let slideInterval=0;

    function updateSlide(index) {
      if (!heroSection || slides.length === 0) return;
      const data = slides[index];
      
      // 背景とテキストの更新
      heroSection.style.background = data.bg;
      const h1 = heroSection.querySelector('h1, h2');
      const p = heroSection.querySelector('p');
      const btn = heroSection.querySelector('.hero-btn');

      if (h1) h1.textContent = data.title;
      if (p) p.textContent = data.subtitle;
      if (btn) btn.textContent = data.btnText;

      // ドット（インジケーター）の更新
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentSlide = index;
    }

    // 自動再生（4秒ごと）
    function startAutoSlide() {
      slideInterval = setInterval(() => {
        let nextIndex = (currentSlide + 1) % slides.length;
        updateSlide(nextIndex);
      }, 4000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    // ドットクリックイベント
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        updateSlide(i);
        startAutoSlide();
      });
    });

    // マウスホバーで自動再生一時停止
    if (heroSection) {
      heroSection.addEventListener('mouseenter', stopAutoSlide);
      heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    startAutoSlide();


    /* ===================================================
       2. スクロールに応じたヘッダーのアニメーション
       =================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        header.style.transition = 'all 0.3s ease';
      } else {
        header.style.boxShadow = 'none';
      }
    });


    /* ===================================================
       3. スマホ用 フッターアコーディオンメニュー
       =================================================== */
    const footerItems = document.querySelectorAll('.footer-item');

    footerItems.forEach(item => {
      item.addEventListener('click', () => {
        // 次の要素（サブメニュー）を取得または開閉制御
        const icon = item.querySelector('span');
        if (icon) {
          if (icon.textContent === '＋') {
            icon.textContent = '－';
            item.style.color = '#ccff00';
          } else {
            icon.textContent = '＋';
            item.style.color = '#fff';
          }
        }
      });
    });


    /* ===================================================
       4. 検索機能のインタラクション（Enterキー / ボタン）
       =================================================== */
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    function executeSearch() {
      if (!searchInput) return;
      const query = searchInput.value.trim();
      if (query) {
        alert(`「${query}」の検索結果ページへ遷移します（実装例）`);
        // 実際の実装時は以下のように遷移させます:
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
      } else {
        alert('検索キーワードを入力してください。');
      }
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', executeSearch);
    }
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          executeSearch();
        }
      });
    }

  });

