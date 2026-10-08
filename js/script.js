
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
      {
        title: "SUMMER SALE UP TO 50% OFF",
        subtitle: "部活生応援！人気ブランドのトレーニングウェア＆スパイクが期間限定プライスダウン。",
        btnText: "セール会場はこちら",
        bg: "linear-gradient(135deg, #e60012 0%, #80000a 100%)"
      },
      {
        title: "TEAM ORDER SIMULATOR",
        subtitle: "自分たちのカラーを着ろ。Web上で簡単にデザイン作成＆概算見積もりが可能。",
        btnText: "チームウェアを作成する",
        bg: "linear-gradient(135deg, #111 0%, #333 100%)"
      }
    ];

    let currentSlide = 0;
    let slideInterval;

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

// 20260912検索アイコン
document.addEventListener('DOMContentLoaded', () => {

  // 各要素の取得
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('modal-search-input');
  const closeBtn = document.getElementById('close-search-btn');
  const clearBtn = document.getElementById('clear-search-btn');
  const keywordTags = document.querySelectorAll('.tag-item');

  // ヘッダーやボトムナビ内の検索ボタン（クリック対象）を取得
  const searchTriggers = document.querySelectorAll('.icon-btn, .bottom-nav-item');

  // 1. モーダルを開く処理
  function openSearchModal() {
    searchModal.classList.add('active');
    // 開いた瞬間にテキスト入力エリアへフォーカスさせてキーボードを自動起動
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  }

  // 2. モーダルを閉じる処理
  function closeSearchModal() {
    searchModal.classList.remove('active');
    searchInput.value = '';
    clearBtn.style.display = 'none';
  }

  // 検索アイコンクリック時の判定処理
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.textContent.trim();
      // ボタンテキストが「検索」を含む場合にモーダル起動
      if (text.includes('検索')) {
        e.preventDefault();
        openSearchModal();
      }
    });
  });

  // 3. キャンセルボタンでモーダルを閉じる
  closeBtn.addEventListener('click', closeSearchModal);

  // 4. 入力中のクリア（×）ボタン表示制御
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
  });

  // 5. Enterキー押下で検索実行（ページ遷移処理など）
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        // 実際の遷移処理例
        alert(`「${query}」の検索一覧ページへ遷移します`);
        // window.location.href = `/search?keyword=${encodeURIComponent(query)}`;
        closeSearchModal();
      }
    }
  });

  // 6. おすすめキーワードタグのタップ入力処理
  keywordTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const keyword = tag.textContent;
      searchInput.value = keyword;
      clearBtn.style.display = 'block';
      // タグ選択後にそのまま検索を実行
      alert(`「${keyword}」で検索します`);
      // window.location.href = `/search?keyword=${encodeURIComponent(keyword)}`;
      closeSearchModal();
    });
  });

});

// 20260912　カートアイコン機能追加
document.addEventListener('DOMContentLoaded', () => {

  // カートデータ（状態保持用）
  let cart = [];

  // DOM要素
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalPriceEl = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('checkout-btn');

  // ヘッダーやボトムナビのカートボタンを取得
  const cartTriggers = document.querySelectorAll('.icon-btn, .bottom-nav-item');

  // カート開閉制御
  function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
  }

  // トリガーボタンのクリックイベント
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.textContent.includes('カート')) {
        e.preventDefault();
        openCart();
      }
    });
  });

  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // カート描画更新処理
  function updateCartUI() {
    // 1. カート数のカウント更新
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalQty;

    // ヘッダーアイコンのバッジ更新（あれば）
    let badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? 'inline-block' : 'none';
    }

    // 2. カート内リストの描画
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-msg">カートに商品が入っていません。</p>';
      checkoutBtn.disabled = true;
      cartTotalPriceEl.textContent = '¥0';
      return;
    }

    checkoutBtn.disabled = false;
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">¥${item.price.toLocaleString()}</div>
          <div class="quantity-controls">
            <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
            <button class="remove-btn" data-id="${item.id}">削除</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    // 3. 合計金額の更新
    cartTotalPriceEl.textContent = `¥${totalPrice.toLocaleString()}`;
  }

  // 商品をカートに追加する関数（商品カードの「カートに追加」ボタンから呼び出し可能）
  window.addToCart = function(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openCart(); // 追加したらドロワーを開く
  };

  // カート内での操作（＋、ー、削除ボタンのイベント移譲）
  cartItemsContainer.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    const item = cart.find(i => i.id === id);

    if (e.target.classList.contains('plus-btn')) {
      item.quantity += 1;
    } else if (e.target.classList.contains('minus-btn')) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter(i => i.id !== id);
      }
    } else if (e.target.classList.contains('remove-btn')) {
      cart = cart.filter(i => i.id !== id);
    }

    updateCartUI();
  });

  // レジ進むボタン
  checkoutBtn.addEventListener('click', () => {
    alert('購入手続き画面へ遷移します');
    // window.location.href = '/checkout';
  });

});