window.addEventListener('load', function () {
    console.log('project');
    // gsap.registerPlugin(ScrollTrigger);

    // gsap.utils.toArray('.project_visual img').forEach(container => {
    //     const img = container.querySelector('.project_visual img');

    //     ScrollTrigger.create({
    //         trigger: ".project_visual img",
    //         start: "top top",
    //         end: "+=100%", 
    //         pin: ".project_visual img",
    //         scrub: true
    //     });
    // });
    
    /* // PC, MOBILE 
    function getPcGutter() {
        if (window.innerWidth <= 768) return 0;
        if (window.innerWidth <= 1024) return 32;
        if (window.innerWidth <= 1280) return 40;
        return 40;
    }
    function getMobileGutter() {
        if (window.innerWidth <= 480) return 0;
        if (window.innerWidth <= 768) return 16;
        if (window.innerWidth <= 1024) return 24;
        if (window.innerWidth <= 1280) return 32;
        return 48;
    }

    const pcGrid = document.querySelector('.project_preview_pc_wrap .project_preview');
    const mobileGrid = document.querySelector('.project_preview_mobile_wrap .project_preview');
    let pcMsnry, mobileMsnry;

    // Masonry 실행
    function pcInitMasonry() {
        if (!pcGrid) return;

        if (!pcMsnry) {
            pcMsnry = new Masonry(pcGrid, {
            itemSelector: '.img_box',
            columnWidth: '.img_box',
            percentPosition: true,
            gutter: getPcGutter()
            });
        } else {
            pcMsnry.options.gutter = getPcGutter();
            pcMsnry.layout();
        }
    }
    function mobileInitMasonry() {
        if (!mobileGrid) return;

        if (mobileMsnry) {
            mobileMsnry.destroy();
        }

        mobileMsnry = new Masonry(mobileGrid, {
            itemSelector: '.img_box',
            columnWidth: '.img_box',
            percentPosition: true,
            gutter: getMobileGutter()
        });
    }

    function firstLayout() {
        imagesLoaded(pcGrid, pcInitMasonry);
        imagesLoaded(mobileGrid, mobileInitMasonry);
    }

    function resizeLayout() {
        pcInitMasonry();
        mobileInitMasonry();
    }

    // 최초 실행
    firstLayout();

    // resize 대응
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            resizeLayout();
        }, 100);
    }); */

    // masonryLayout
    function masonryPcLayout() {
        const content_poss = document.querySelector('.project_preview_pc_wrap');
        if ( !content_poss ) return;


        const masonryContainerStyle = 
            getComputedStyle(document.querySelector(".project_preview_pc_wrap .project_preview"));
        const autoRows = 
            parseInt(masonryContainerStyle.getPropertyValue("grid-auto-rows"));

        /* const masonryItemStyle = 
            getComputedStyle(document.querySelector(".project_preview_pc_wrap .img_item")); */
        /* const marginBottom = 
            parseInt(masonryItemStyle.getPropertyValue("margin-bottom")) || 0; */
        /* const columnGap = 
            parseInt(masonryContainerStyle.getPropertyValue("column-gap")) || 0; */

        function getPcRowGap() {
            const width = window.innerWidth;
            if ( width <= 480 ) return 28;
            if ( width <= 768 ) return 40;
            if ( width <= 1024 ) return 48;
            if ( width <= 1280 ) return 60;
            if ( width <= 1600 ) return 80;
            return 110;
        }
        const rowGap = getPcRowGap();
        
        const pcItems = 
            document.querySelectorAll(".project_preview_pc_wrap .img_item");

        pcItems.forEach((elt) => {
            const height =
                elt.querySelector(".img_box").getBoundingClientRect().height;
            /* const marginBottom = 
                parseInt(getComputedStyle(document.querySelector('.img_box')).marginBottom) || 0; */
            
            elt.style.gridRowEnd = 
                `span ${Math.ceil((height + rowGap) / autoRows)}`;
        });

        requestAnimationFrame(() => {
            const pcLayout = [...new Set(
                [...pcItems].map(item => item.offsetLeft)
            )].sort((a, b) => a - b);

            pcItems.forEach(item => {
                item.classList.remove('pc-column-0','pc-column-1','pc-column-2','pc-column-3','pc-column-4', 'last-row-item');
            });

            pcItems.forEach( (item, index) => {
                const colIndex = pcLayout.indexOf(item.offsetLeft);
                item.classList.add(`pc-column-${colIndex}`);
            });

            pcLayout.forEach((leftPos, colIndex) => {
                const columnItems = [...pcItems].filter( item => item.offsetLeft == leftPos);
                const lastItem = columnItems.at(-1);

                if ( lastItem ) {
                    lastItem.classList.add('last-row-item');
                }
            });

            pcItems.forEach((elt) => {
                const height = elt.querySelector('.img_box').getBoundingClientRect().height;
                const gap = elt.classList.contains('last-row-item')? 0 : getPcRowGap();

                elt.style.gridRowEnd =
                    `span ${Math.ceil((height + gap ) / autoRows)}`;
            });
        });
    }

    function masonryMobileLayout() {
        const content_poss = document.querySelector('.project_preview_mobile_wrap');
        if ( !content_poss ) return;

        const masonryContainerStyle = 
            getComputedStyle(document.querySelector(".project_preview_mobile_wrap .project_preview"));
        const autoRows = 
            parseInt(masonryContainerStyle.getPropertyValue("grid-auto-rows"));

        /* const masonryItemStyle = 
            getComputedStyle(document.querySelector(".project_preview_mobile_wrap .img_item")); */
        /* const marginBottom = 
            parseInt(masonryItemStyle.getPropertyValue("margin-bottom")) || 0; */
        /* const columnGap = 
            parseInt(masonryContainerStyle.getPropertyValue("column-gap")) || 0; */

        function getMobileRowGap() {
            const width = window.innerWidth;
            if ( width <= 480 ) return 24;
            if ( width <= 768 ) return 40;
            if ( width <= 1024 ) return 50;
            if ( width <= 1280 ) return 60;
            if ( width <= 1600 ) return 80;
            return 100;
        }
        const rowGap = getMobileRowGap();

        const mobileItems = 
            document.querySelectorAll(".project_preview_mobile_wrap .img_item");

        mobileItems.forEach((elt) => {
            const height =
                elt.querySelector(".img_box").getBoundingClientRect().height;
            /* const marginBottom = 
                parseInt(getComputedStyle(document.querySelector('.img_box')).marginBottom); */

            elt.style.gridRowEnd = 
                `span ${Math.ceil((height + rowGap) / autoRows)}`;
        });

        requestAnimationFrame(() => {
            const mobileLayout = [...new Set(
                [...mobileItems].map(item => item.offsetLeft)
            )].sort((a, b) => a - b);

            mobileItems.forEach(item => {
                item.classList.remove('mobile-column-0','mobile-column-1','mobile-column-2','mobile-column-3','mobile-column-4');
            });

            mobileItems.forEach(item => {
                const colIndex = mobileLayout.indexOf(item.offsetLeft);
                item.classList.add(`mobile-column-${colIndex}`);
            });

            mobileLayout.forEach((leftPos, colIndex) => {
                const columnItems = [...mobileItems].filter( item => item.offsetLeft == leftPos);
                const lastItem = columnItems.at(-1);

                if ( lastItem ) {
                    lastItem.classList.add('last-row-item');
                }
            });

            mobileItems.forEach((elt) => {
                const height = elt.querySelector('.img_box').getBoundingClientRect().height;
                const gap = elt.classList.contains('last-row-item')? 0 : getMobileRowGap();

                elt.style.gridRowEnd =
                    `span ${Math.ceil((height + gap ) / autoRows)}`;
            });
        });
    }

    function masonryWeatherLayout() {
        const content_poss = document.querySelector('.weather');
        if ( !content_poss ) return;

        const masonryContainerStyle = 
            getComputedStyle(document.querySelector(".weather .project_preview_pc_wrap .project_preview"));
        const autoRows = 
            parseInt(masonryContainerStyle.getPropertyValue("grid-auto-rows"));

        /* const masonryItemStyle = 
            getComputedStyle(document.querySelector(".project_preview_pc_wrap .img_item")); */
        /* const marginBottom = 
            parseInt(masonryItemStyle.getPropertyValue("margin-bottom")) || 0; */
        /* const columnGap = 
            parseInt(masonryContainerStyle.getPropertyValue("column-gap")) || 0; */

        function getWeatherRowGap() {
            const width = window.innerWidth;
            if ( width <= 480 ) return 24;
            if ( width <= 768 ) return 40;
            if ( width <= 1024 ) return 60;
            if ( width <= 1280 ) return 80;
            if ( width <= 1600 ) return 80;
            return 100;
        }
        const rowGap = getWeatherRowGap();

        const weatherItems = 
            document.querySelectorAll(".weather .project_preview_pc_wrap .img_item");

        weatherItems.forEach((elt) => {
            const height =
                elt.querySelector(".project_preview_content").getBoundingClientRect().height;
            /* const marginBottom = 
                parseInt(getComputedStyle(document.querySelector('.img_box')).marginBottom); */

            elt.style.gridRowEnd = 
                `span ${Math.ceil((height + rowGap) / autoRows)}`;
        });

        requestAnimationFrame(() => {
            const weatherLayout = [...new Set(
                [...weatherItems].map(item => item.offsetLeft)
            )].sort((a, b) => a - b);

            weatherItems.forEach(item => {
                item.classList.remove('weather-column-0','weather-column-1','weather-column-2','weather-column-3','weather-column-4');
            });
/* 
            weatherItems.forEach(item => {
                const colIndex = weatherLayout.indexOf(item.offsetLeft);
                item.classList.add(`weather-column-${colIndex}`);
            });
 */
            weatherItems.forEach( (item, index) => {
                const colIndex = weatherLayout.indexOf(item.offsetLeft);
                item.classList.add(`weather-column-${colIndex}`);
            });

            weatherLayout.forEach((leftPos, colIndex) => {
                const columnItems = [...weatherItems].filter( item => item.offsetLeft == leftPos);
                const lastItem = columnItems.at(-1);

                if ( lastItem ) {
                    lastItem.classList.add('last-row-item');
                }
            });

            weatherItems.forEach((elt) => {
                const height = elt.querySelector('.project_preview_content').getBoundingClientRect().height;
                const gap = elt.classList.contains('last-row-item')? 0 : getWeatherRowGap();

                elt.style.gridRowEnd =
                    `span ${Math.ceil((height + gap) / autoRows)}`;
            });
        });
    }


    // //masonryLayout

    masonryPcLayout();
    masonryWeatherLayout();
    masonryMobileLayout();
    window.addEventListener("load", () => {
        masonryPcLayout();
        masonryWeatherLayout();
        masonryMobileLayout();
    });
    window.addEventListener("resize", () => {
        masonryPcLayout();
        masonryWeatherLayout();
        masonryMobileLayout();
    });
});