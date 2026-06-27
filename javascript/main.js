window.addEventListener('load', function () {
    console.log('main')
    // spotlight card
    document.querySelectorAll(".card-spotlight").forEach(function(card){

        const color = card.dataset.spotlight;

        card.addEventListener("mousemove",function(e){

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x",x+"px");
        card.style.setProperty("--mouse-y",y+"px");
        card.style.setProperty("--spotlight-color",color);

        });

    });

    // particles

    const options = {
         fullScreen:{
            enable:false
        },
        background: {
            color: {
                value: "transparent"
            }
        },
        particles: {
            number: { 
                value: 100, 
                density: { 
                    enable: true,
                    area: 2000
                }
            },
            color: {
                value: ["#00e5ff", "#ffffff", "#8b5cf6", "#a855f7", "#7dd3fc"]
            },
            opacity: { 
                value: .9
            },
            size: { 
                value: 10,
                random: {
                    enable: true,
                    minimumValue: 4
                }, 
                animation: {
                    enable: true,
                    speed: 5,
                    minimumValue: 0.1,
                    sync: false,
                    startValue: "random"
                }
            },
            move: { 
                enable: true,
                speed: 0.6,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default:"bounce"
                }
            },
        links: {
                enable: true,
                distance: 120,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" }
            },
            modes: {
                grab: {
                     distance: 140, links: { opacity: 0.5 }
                }, 
                repulse: { distance: 120, duration: 0.4 }
            },
        },
        detectRetina: true
    }

    tsParticles.load("particles", options).then((container)=>{

    const wrapper = document.querySelector(".particles-wrapper")

    let mouseX = 0
    let mouseY = 0

    let currentX = 0
    let currentY = 0

    const strength = 80


    window.addEventListener("mousemove",(e)=>{

    mouseX = (e.clientX / window.innerWidth - 0.5) * strength
    mouseY = (e.clientY / window.innerHeight - 0.5) * strength

    })


    function animate(){

    currentX += (mouseX - currentX) * 0.08
    currentY += (mouseY - currentY) * 0.08

    wrapper.style.transform = 
    `translate(${currentX}px, ${currentY}px)`
    
    requestAnimationFrame(animate)
        
    }
    animate()

    })
});


/* window.addEventListener('pageshow', function () {
    // loading
    const lines = [
        '<!DOCTYPE html>',
        '\t<html>',
        '\t<head>',
        '\t\t<script>',
        '\t\t<css>',
        '\t<body>',
        '\t\tLoading...'
    ];
    const typing = document.querySelector('.typing');

    let lineIndex = 0;
    let charIndex = 0;

    function escapeHTML(text){
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlight(text){
        return text
        .replace(
            /&lt;!DOCTYPE html&gt;/,
            '__DOCTYPE__'
        )
        .replace(
            /&lt;|&gt;/g,
            '<span class="bracket">$&</span>'
        )
        .replace(
            /\b(html|head|body|script|css)\b/g,
            '<span class="tag">$1</span>'
        )
        .replace(
            /(\.\.\.)/g,
            '<span class="short">$1</span>'
        )
        .replace(
            '__DOCTYPE__',
            '<span class="bracket">&lt;</span>' +
            '<span class="keyword">!DOCTYPE</span> ' +
            '<span class="tag">html</span>' +
            '<span class="bracket">&gt;</span>'
        );
    }

    function render(){
        let html = '';
        for(let i = 0; i < lineIndex; i++){
            html += `<dd><span class="lineNum">${i+1}</span><div class="line done">${highlight(escapeHTML(lines[i]))}</div></dd>`;
        }

        const currentLine = lines[lineIndex];
        const currentText = currentLine.slice(0, charIndex);

        html += `<dd><span class="lineNum">${lineIndex+1}</span><div class="line">${highlight(escapeHTML(currentText))}<span class="cursor"></span></div></dd>`;
        typing.innerHTML = html;
    }

    function type(){
        render();
        charIndex++;

        if(charIndex > lines[lineIndex].length){
            lineIndex++;
            charIndex = 0;

            if(lineIndex >= lines.length){
                clearInterval(timer);
                render();
                const cursor = document.querySelector('.cursor');

                if(cursor){
                    cursor.remove();
                }
            }
        }
    }

    const timer = setInterval(type, 50);

    // loading
    function preventScroll(e) {
        if (document.body.classList.contains('loadingActive')) {
            e.preventDefault();
        }
    }

    const loading_page = document.querySelector('.loadingPage');
    const nav_entries = performance.getEntriesByType('navigation');
    const nav_type = nav_entries[0].type;

    document.addEventListener('wheel', preventScroll, { passive:false });
    document.addEventListener('touchmove', preventScroll, { passive:false });
   
    if ( nav_type === 'back_forward') {
        loading_page.classList.remove('show');
        document.body.classList.remove('loadingActive');
    } else {
        sessionStorage.setItem('visited', 'true');

        function hideLoading() {
            loading_page.classList.remove('show');
            document.body.classList.remove('loadingActive');
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
        }

        if ( document.readyState === 'complete' ) {
            setTimeout(hideLoading, 1000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(hideLoading, 1000);
            });
        }
    }
   
}) */
    
window.addEventListener('pageshow', function (e) {

    const loading_page = document.querySelector('.loadingPage');
    const nav_entries = performance.getEntriesByType('navigation');
    const nav_type = nav_entries[0].type;

    
    loading_page.classList.add('show');
    document.body.classList.add('loadingActive');

    // typing code
    const lines = [
        '<!DOCTYPE html>',
        '\t<html>',
        '\t<head>',
        '\t\t<script>',
        '\t\t<css>',
        '\t<body>',
        '\t\tLoading...'
    ];

    const typing = document.querySelector('.typing');

    let lineIndex = 0;
    let charIndex = 0;

    function escapeHTML(text) {
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function highlight(text) {
        return text
            .replace(/&lt;!DOCTYPE html&gt;/, '__DOCTYPE__')
            .replace(/&lt;|&gt;/g, '<span class="bracket">$&</span>')
            .replace(/\b(html|head|body|script|css)\b/g, '<span class="tag">$1</span>')
            .replace(/(\.\.\.)/g, '<span class="short">$1</span>')
            .replace(
                '__DOCTYPE__',
                '<span class="bracket">&lt;</span>' +
                '<span class="keyword">!DOCTYPE</span> ' +
                '<span class="tag">html</span>' +
                '<span class="bracket">&gt;</span>'
            );
    }

    function render() {
        let html = '';
        for(let i = 0; i < lineIndex; i++){
            html += `<dd><span class="lineNum">${i+1}</span><div class="line done">${highlight(escapeHTML(lines[i]))}</div></dd>`;
        }
        

        const currentLine = lines[lineIndex];
        const currentText = currentLine.slice(0, charIndex);

        html += `<dd><span class="lineNum">${lineIndex+1}</span><div class="line">${highlight(escapeHTML(currentText))}<span class="cursor"></span></div></dd>`;
        typing.innerHTML = html;

    }

    function type() {
        render();

        if (charIndex < lines[lineIndex].length) {
            charIndex++;
        } 
        else {
            if (lineIndex === lines.length - 1) {
                clearInterval(timer);
                return;
            }

            lineIndex++;
            charIndex = 0;
        }
    }

    const timer = setInterval(type, 50);

    function preventScroll(e) {
        if (document.body.classList.contains('loadingActive')) {
            e.preventDefault();
        }
    }

    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });

    function hideLoading() {
        loading_page.classList.remove('show');
        document.body.classList.remove('loadingActive');

        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
    }

    if ( nav_type === "back_forward" ) {
        hideLoading();
    } else {
        if (document.readyState === 'complete') {
            setTimeout(hideLoading, 8000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(hideLoading, 8000);
            });
        }
    }

});