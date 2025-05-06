const minimizeHTML = `
<div id="div-18c1f211f891" class="DIV-18c1f211f891" title="Open Editor">
<p style="margin-top: 5%;">
Open Editor
</p>

 <i class="fa-solid fa-grip">

</i>


</div>`;

export const minimizeEditor =()=>{
let contentWrapper = document.getElementById("container");
let maincontroller = document.getElementById("main-controller");
gsap.to(maincontroller, { xPercent: -150, duration: 1,});
gsap.to(contentWrapper, {
    marginLeft: "0%",
    width: "100%",
    duration: 0.3, // Durasi animasi dalam detik
    ease: "power2.out" // Efek easing untuk animasi
  });
//========================================================//
    const section = document.createElement('section');
    section.id = 'container-18c1f1ee7eb1';
    section.classList.add('container-18c1f1ee7eb1');
    section.innerHTML = minimizeHTML;
    document.body.appendChild(section);
//========================================================//
gsap.from(section, {width: "0px", duration: 0.3})
//========================================================//
const closebutton = document.getElementById('div-18c1f211f891');
closebutton.addEventListener('click', ()=>{
    gsap.to(section, {height:0, duration: 0.3});
    setTimeout(() => {
        section.remove();
    }, 301);
    gsap.to(contentWrapper, {
        marginLeft: "5%",
        width: "95%",
        duration: 0.3, // Durasi animasi dalam detik
        ease: "power2.out" // Efek easing untuk animasi
      });
      gsap.to(maincontroller, { xPercent: 0, duration: 0.3,});
});
// Dapatkan elemen yang ingin di-drag
const draggableElement = document.getElementById('container-18c1f1ee7eb1');

let offsetX, offsetY, isDragging = false;

// Fungsi untuk menangani peristiwa 'mousedown'
function dragStart(event) {
    isDragging = true;

    // Simpan posisi awal mouse terhadap elemen
    offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
}

// Fungsi untuk menangani peristiwa 'mousemove'
function dragMove(event) {
    if (isDragging) {
        // Hitung posisi baru elemen berdasarkan pergerakan mouse
        const width = window.innerWidth;
        const height = window.innerHeight;

        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        if(newLeft <= 10){
            newLeft = 11
        }
        if(newLeft >= width*90/100){
            newLeft = width*80/100
        }
        if(newTop <= 10){
            newTop = 11
        }
        if(newTop >= height*90/100){
            newTop = height*80/100
        }

        // Setel posisi elemen
        draggableElement.style.left = newLeft + 'px';
        draggableElement.style.top = newTop + 'px';
    }
}

// Fungsi untuk menangani peristiwa 'mouseup'
function dragEnd() {
    isDragging = false;
}

// Tambahkan event listener untuk memulai drag
draggableElement.addEventListener('mousedown', dragStart);

// Tambahkan event listener untuk bergerak selama drag
document.addEventListener('mousemove', dragMove);

// Tambahkan event listener untuk mengakhiri drag
document.addEventListener('mouseup', dragEnd);

//========================================================//
}

export function dragTheElement(element){
    const draggableElement = element;

    let offsetX, offsetY, isDragging = false;
    
    // Fungsi untuk menangani peristiwa 'mousedown'
    function dragStart(event) {
        isDragging = true;
    
        // Simpan posisi awal mouse terhadap elemen
        offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
        offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
    }
    
    // Fungsi untuk menangani peristiwa 'mousemove'
    function dragMove(event) {
        if (isDragging) {
            // Hitung posisi baru elemen berdasarkan pergerakan mouse
            const width = window.innerWidth;
            const height = window.innerHeight;
    
            let newLeft = event.clientX - offsetX;
            let newTop = event.clientY - offsetY;
    
            if(newLeft <= 10){
                newLeft = 11
            }
            if(newLeft >= width*90/100){
                newLeft = width*80/100
            }
            if(newTop <= 10){
                newTop = 11
            }
            if(newTop >= height*90/100){
                newTop = height*80/100
            }
    
            // Setel posisi elemen
            draggableElement.style.left = newLeft + 'px';
            draggableElement.style.top = newTop + 'px';
        }
    }
    
    // Fungsi untuk menangani peristiwa 'mouseup'
    function dragEnd() {
        isDragging = false;
    }
    
    // Tambahkan event listener untuk memulai drag
    draggableElement.addEventListener('mousedown', dragStart);
    
    // Tambahkan event listener untuk bergerak selama drag
    document.addEventListener('mousemove', dragMove);
    
    // Tambahkan event listener untuk mengakhiri drag
    document.addEventListener('mouseup', dragEnd);
    
    //========================================================//
    
}