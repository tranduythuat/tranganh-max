// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".animate-fade");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  const tl_coudontwn = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".countdown",
      start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl_coudontwn.from(".months", { y: 100, opacity: 0 })       
    .from(".weeks", { y: 100, opacity: 0 }, "-=0.5")     
    .from(".days", { y: 100, opacity: 0 }, "-=0.5") 
    .from(".seconds", { y: 100, opacity: 0 }, "-=0.5");    

  const tl_timeline = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".time-box",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  tl_timeline.from(".first", { x: -100, opacity: 0 })       
  .from(".second", { x: -100, opacity: 0 }, "-=0.5")     
  .from(".third", { x: -100, opacity: 0 }, "-=0.5") 
  .from(".four", { x: -100, opacity: 0 }, "-=0.5")    
  .from(".five", { x: -100, opacity: 0 }, "-=0.5");    

  const toggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.menu-items');
  const icon = document.querySelector('.hamburger-lines');
  const container = document.querySelector(".navbar-container");

  if (toggle && menu && icon && container) {
    document.addEventListener('click', (e) => {
      const isInside = container.contains(e.target) || icon.contains(e.target);
      if (!isInside) {
        toggle.checked = false;
      }
    });

  }

  menu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        // Cuộn mượt
        window.scrollTo({
          top: targetEl.offsetTop + 10,
          behavior: "smooth"
        });
      }

      // Đóng menu
      toggle.checked = false;

    });
  });

  const qrcode = document.getElementById('qr-btn');
  qrcode.addEventListener("click", toggleQR);

  const form = document.forms["rsvp-form"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e));
  }
});

function toggleQR(e) {
  e.preventDefault();
  Swal.fire({
      title: "",
      text: "",
      imageUrl: "https://pub-d341ea7ec201435598469d75d8c4a056.r2.dev/tranganh-max/75EA6A3B-466F-4638-8345-1B7F4E9CB36E_1_105_c.jpeg",
      imageWidth: '100%',
      imageHeight: "auto",
      imageAlt: "Custom image",
      html: `
          <div class="qrcode-box">
              <div class="item">
                  <div class="info">
                      <p>NGUYEN THI TRANG ANH</p>
                      <p>8828 2905 1998</p>
                      <p>Techcombank</p>
                  </div>
                  <div class="qrcode-img">
                      <img src="assets/images/qrcode.jpg" alt="">
                  </div>
              </div>
          </div>
      `,
      confirmButtonColor: "#5a3a21ff"
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    guest_number: guest_number,
    wish: wish,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: 'Đang gửi ...',
    text: "Vui lòng chờ trong giây lát",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url = "?sheet=sheet-1";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        guest_number,
        wish
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
      confirmButtonColor: "#000",
    });
  }
}

