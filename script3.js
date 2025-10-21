document.addEventListener('DOMContentLoaded', function () {
    // Sayfa tamamen yüklendiğinde çalışacak



    // Menü toggle
    const menutogg = document.querySelector(".menu-toggle");
    const linklerim = document.querySelector(".linklerim");
    const menutoggIcon = menutogg.querySelector("i");

    menutogg.addEventListener("click", function () {
        linklerim.classList.toggle("aktiflik");
        const isOpen = linklerim.classList.contains("aktiflik");

        if (isOpen) {
            menutoggIcon.classList.remove("fa-bars");
            menutoggIcon.classList.add("fa-times");
        } else {
            menutoggIcon.classList.remove("fa-times");
            menutoggIcon.classList.add("fa-bars");
        }
    });

    // Açılır menü
    const acilirToggle = document.querySelector(".acilir-toggle");
    const acilirParent = document.querySelector(".acilir");
    if (acilirToggle) {
        acilirToggle.addEventListener("click", () => {
            acilirParent.classList.toggle("open");
        });
    }



    const resimler = [
        "images/cilt-bakimi.jpg",
        "images/lifting.jpg",
        "images/lazer.webp",
        "images/kalici-makyaj.jpg"
    ];

    const yazilar = [
        "cilt bakımıyla yenilen",
        "lifting ile kirpiklerine hayat ver",
        "lazer epilasyonla pürüzsüz ol",
        "kalıcı makyajla her zaman hazır ol"
    ];

    let index = 0;
    const anakutu = document.querySelector('.anakutu');
    const yazi = document.querySelector('.anakutu p');

    function degistir() {
        // yazıyı önce görünmez yap
        yazi.style.opacity = 0;

        setTimeout(() => {
            // sonraki indeksi bul
            index = (index + 1) % resimler.length;

            // arka planı değiştir
            anakutu.style.backgroundImage = `url("${resimler[index]}")`;

            // yazıyı değiştir
            yazi.textContent = yazilar[index];

            // yazıyı geri görünür yap
            yazi.style.opacity = 1;
        }, 800); // yazı kaybolduktan sonra geçiş
    }



    // otomatik döngü
    setInterval(degistir, 4000); // her 4 saniyede bir değişir

    const calismalar = document.querySelector('.calismalar');
    const imgler = document.querySelectorAll('.calismalar img');
    let indexb = 0;

    const gecisuzun = imgler[0].offsetWidth + 20; // gap ekledik
    const toplamimgSayisi = imgler.length;
    let gorunen = 4; // başlangıçta 4 resim gözüküyor
    const updateGorunen = () => {
        if (window.innerWidth < 480) gorunen = 1;
        else if (window.innerWidth < 768) gorunen = 2;
        else gorunen = 4;
    };
    updateGorunen();
    window.addEventListener('resize', () => {
        updateGorunen();
        kaydir();
    });

    const kaydir = () => {
        const maxIndex = toplamimgSayisi - gorunen;
        if (indexb > maxIndex) indexb = 0;
        if (indexb < 0) indexb = maxIndex;

        calismalar.style.transform = `translateX(-${gecisuzun * indexb}px)`;
    };

    document.getElementById('sag').addEventListener('click', () => {
        indexb++;
        kaydir();
    });

    document.getElementById('sol').addEventListener('click', () => {
        indexb--;
        kaydir();
    });

    // Dokunmatik kaydırma
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    calismalar.addEventListener('pointerdown', e => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = indexb * gecisuzun;
        calismalar.style.transition = 'none';
    });

    calismalar.addEventListener('pointermove', e => {
        if (!isDown) return;
        const x = e.pageX;
        const walk = startX - x;
        calismalar.style.transform = `translateX(${-scrollLeft - walk}px)`;
    });

    calismalar.addEventListener('pointerup', e => {
        isDown = false;
        calismalar.style.transition = 'transform 0.5s ease';
        const moved = startX - e.pageX;
        if (moved > 50) indexb++;
        else if (moved < -50) indexb--;
        kaydir();
    });

    calismalar.addEventListener('pointerleave', () => {
        if (isDown) {
            isDown = false;
            calismalar.style.transition = 'transform 0.5s ease';
            kaydir();
        }
    });


});