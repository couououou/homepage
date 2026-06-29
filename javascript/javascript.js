window.addEventListener('load', function () {
    /* // smooth_scroll 
    const scroll_content = document.querySelector('#scroll');
    let smooth_scroll_bar = null;
    let current_scroll_top = 0;
    
    function handleSmoothScroll() {
        const is_mobile = window.innerWidth <= 768;

        // mobile_set
        if ( is_mobile ) {
            if ( smooth_scroll_bar ) {
                current_scroll_top = smooth_scroll_bar.offset.y;

                smooth_scroll_bar.destroy();
                smooth_scroll_bar = null;
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                
            }
            setTimeout(() => {
                window.scrollTo(0, current_scroll_top);
            }, 0);
        }
        // pc 
        else {
            const current_scroll_top = smooth_scroll_bar?.offset?.y ?? window.scrollY;

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';

            if ( !smooth_scroll_bar) {
                smooth_scroll_bar = Scrollbar.init(scroll_content, {
                    damping: 0.03,
                    delegateTo: document,
                    alwaysShowTracks: false,
                    continuousScrolling: true,
                    renderByPixels: true
                });
            }

            smooth_scroll_bar.scrollTo(0, current_scroll_top, 0);
        }
        navControl();
    }
    handleSmoothScroll();

    window.addEventListener('resize', ()=> {
        window.resizeTimer = setTimeout(()=> {
            handleSmoothScroll();
        }, 200);
    });
    // navControl
    function navControl() {
        const scroll_progress = $('.progressHeight');
        const is_mobile = window.innerWidth <= 768;

        if ( is_mobile ) {
            $(window).off('scroll.mobileProgress');
            $(window).on('scroll.mobileProgress', () => {
                let scroll_height = $(window).scrollTop();

                scrollBarProgress(scroll_height);
                scrollActive(scroll_height);
                activeNav(scroll_height);
            })
        } else {
            smooth_scroll_bar.addListener((status) => {
                let scroll_height = status.offset.y;

                scrollBarProgress(scroll_height);
                scrollActive(scroll_height);
                activeNav(scroll_height);
            });
        }

        function scrollBarProgress(height) {
            let document_height;
            let page_height;

            if ( is_mobile ) {
                document_height = $(document).height();
                page_height = $(window).height();
            } else {
                document_height = smooth_scroll_bar.contentEl.scrollHeight;
                page_height = window.innerHeight;
            }

            let total_height = document_height - page_height;
            let precentage = height / total_height;

            scroll_progress.css({width: `${100 * precentage}%`});
        }
        function scrollActive( height ) {
            if ( height > 0 ) {
                $('nav').addClass('active');
            } else {
                $('nav').removeClass('active');
            }
        }
    }

    // navLinkControl
    const nav_links = document.querySelectorAll('nav a');
    const nav_items = document.querySelectorAll('nav li')
    const all_sections = document.querySelectorAll('section');
    const remain_sections = [...all_sections].slice(2);
    // nav_link_click
    nav_links.forEach((link) => {
        link.addEventListener('click', (e)=> {
            e.preventDefault();
            const target_id = link.getAttribute('href');
            const target_section = document.querySelector(target_id);
            let nav_height = document.querySelector('nav').offsetHeight;
            let target_top = target_section.offsetTop - nav_height;

            const is_mobile = window.innerWidth <= 768;
            
            if ( is_mobile ) {
                window.scrollTo({
                    top:target_top,
                    behavior: 'smooth'
                });
            } else {
                smooth_scroll_bar.scrollTo(
                    0,
                    target_top,
                    800
                );
            }
        });
    });
    
    // activeNav
    function activeNav(scrollTop) {
        if (document.querySelector('.nav')) {
            const nav_height = document.querySelector('nav').offsetHeight;

            remain_sections.forEach((section, index) => {

                const section_top = section.offsetTop - nav_height;
                const section_height = section.offsetHeight;

                if ( scrollTop >= section_top && scrollTop < section_top + section_height) {
                    nav_items.forEach((link) => {
                        link.classList.remove('nowNav');
                    });

                    nav_items[index].classList.add('nowNav');
                }
            });
        }
    } */

        
    // scrollBar
    /* function scrollBar() {
        const scrollProgress = $('.progressHeight');
        const bodyTag = $('body');
        let scrollHeight = window.pageYOffset;
        $(document).on('scroll', () => {
        
            scrollHeight = window.pageYOffset;
            
            scrollBarProgress();
            nowScrollHeight();
        });
        function scrollBarProgress() {
            const pageHeight = bodyTag.height();
            const totalHeight = pageHeight - window.innerHeight;
            const percentage = scrollHeight / totalHeight;

            scrollProgress.css({'width': `${100 * percentage}%`});
        }
        scrollBarProgress();

        function nowScrollHeight() {
            if ( scrollHeight > 0 ) {
                $('nav').addClass('active');
            } else {
                $('nav').removeClass('active');
            }
        }
        nowScrollHeight();

        var delay = 0;
        var timer = null;
        $(window).resize(function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                nowScrollHeight();
                scrollBarProgress();
            }, delay);
        });
    }
    scrollBar(); */




    /* function mobileNav() {
        $('nav .navBox .mobileNavContent button').click( function() {
            $(this).children('.mobileNavLine').toggleClass('on');
        });

    } mobileNav(); */
    
    // Text show
    function mainText() {
        $('.mainText h1').each(function() {
            let $t = $(this);
            let rows = $.trim($t.html()).split('<br>');

            $t.html('');

            $.each(rows, function(i, val) {
                $('<span class=row></span').appendTo($t);

                let letters = $.trim(val).split('');

                $.each(letters, function(j, v){
                    v == v;
                    if ( v == ' ') {
                        v = '&nbsp;'
                    } else if ( v == '&') {
                        v = '&'
                        letters[j+1] = '';
                        letters[j+2] = '';
                        letters[j+3] = '';
                        letters[j+4] = '';
                    } else {
                        v = v;
                    }
                    $('<span>' + $.trim(v)+ '</span>').appendTo($('.row:last', $t));
                });
            });
        });

        function mainTextShow() {
            for (i = 0; i < $('.mainText h1 span').length; i++) {
                (function(ind) {
                  setTimeout(function(){
                      $('.mainText h1 span:not(".row")').eq(ind).addClass('animate');
                  }, ind * 15);
                })(i);
            }
        }
        setTimeout ( mainTextShow, 6800);
    }
    //mainText();

    // skillProgress
    function skillProgress() {
        const skillBox = $('.skillContent');
        const skillBar = skillBox.find('.skillBar');
        const skliiBarPercent = [];
        
        const skillText = $('.percent');
        const skillTextPercent = skillText.find('h6');

        skillBar.each( function(index){
            skliiBarPercent[index] =  $(this).data('percent');
            $(this).css({'width':skliiBarPercent[index]+'%' });
        });

        if ( skillBox.hasClass('active') == false ) {
            skillTextPercent.each( function(index) {
                let $this = $(this);
                
                let countTo = skliiBarPercent[index];
                $({ countNum: $this.text()}).animate({
                    countNum: countTo 
                },
                {
                    duration: 1000, 
                    easing:'linear',
                    step: function() {
                        $this.text(Math.floor(this.countNum)+'%');
                    },
                    complete: function() { 
                        $this.text(this.countNum + '%');
                    }
                });  
            });
        }

        skillBox.addClass('active');
    }

    // otherDesign
    function ohterDesignFun() {
        const $designBoxs = $('.otherDesignBoxs');
        const $designBtns = $designBoxs.find('.otherBtn');
        const $designs = $designBoxs.find('.otherDesignBox');
        const $designBanner1 = $designBoxs.find('.otherDesignBox1');
        const $designBanner2 = $designBoxs.find('.otherDesignBox2');
        const $designBanners = $designBoxs.find('.otherDesignBox1, .otherDesignBox2');
        const $designPoster = $designBoxs.find('.otherDesignBox3');
        const $designCard = $designBoxs.find('.otherDesignBox4');
        const designListArray = [$designs, $designBanners, $designPoster, $designCard];
        const designListArray2 = [$designBanner1, $designBanner2, $designPoster, $designCard];

        $designBtns.click( function() {
            $designBtns.not(this).removeClass('active');
            $(this).addClass('active');

            let indexNo = $(this).index();
            
            designListArray.forEach( function(el) {
                el.css({display:'none'});
            });
            designListArray[indexNo].css({display:'table'});
            designListArray[indexNo].find('div').css({display:'table-cell'});

            scrollTag();
        });

        let designListWidth = [];

        designListArray2.forEach( function(el, index) {
            designListWidth.push(el.width());
            
            switch(index) {
                case 0 : designListArray2[index].height(designListWidth[index] * 0.3);
                break;
                case 1 : designListArray2[index].height(designListWidth[index] * 0.4);
                break;
                case 2 : designListArray2[index].height(designListWidth[index] * 1.4);
                break;
                case 3 : designListArray2[index].height(designListWidth[index] * 1);
                break;
                default : ;
                break;
            }
        });

        const $otherDesignInfo = $('.otherDesignInfo');
        const $otherDesignInfoBox = $('.otherDesignInfoBox');
        const otherDesignNameBox = $otherDesignInfo.find('.otherDesignTop h5');
        const otherDesignCloseBtn = $otherDesignInfo.find('.otherDesignTop .infoCloseBtn i');
        const otherDesignImg1 = $otherDesignInfo.find('.otherDesignImgBox1');
        const otherDesignImg2 = $otherDesignInfo.find('.otherDesignImgBox2');

        const otherDesignCardBtn = $otherDesignInfo.find('.cardBtn');
        const cardBtn = otherDesignCardBtn.find('.btn');
        const cardLeftBtn = otherDesignCardBtn.find('.otherLeftBtn');
        const cardRightBtn = otherDesignCardBtn.find('.otherRightBtn');
        const cardPageNum = otherDesignCardBtn.find('.pageNum');
        const cardPageNow = cardPageNum.find('.pageNow');
        const cardPageEnd = cardPageNum.find('.pageEnd');

        const imgSrc = 'main/img/portfolio/other_design/';
        const imgEx = 'jpg';

        $designs.click(function() {
            let designClass = $(this).find('div').attr('class');
            let designName = $(this).find('div h6').text();
            let designFileName = $(this).find('div span.blind').text();

            $('html, body').addClass('no_scroll');
            $otherDesignInfo.css({display:'block'});
            $otherDesignInfoBox.addClass(designClass);
            otherDesignNameBox.text(designName);

            if ( $otherDesignInfoBox.hasClass('card') === false ) {
                otherDesignImg1.css({display:'block'});
                otherDesignImg2.css({display:'none'});
                otherDesignCardBtn.css({display:'none'});
                otherDesignImg1.find('img').attr('src',`${imgSrc}${designFileName}.${imgEx}`);
            } else if ( $otherDesignInfoBox.hasClass('card') === true ) {
                otherDesignImg1.css({display:'none'});
                otherDesignImg2.css({display:'block'});
                otherDesignCardBtn.css({display:'flex'});

                cardPage();
            }

            otherDesignCloseBtn.click( function() {
                $otherDesignInfo.css({display:'none'});
                otherDesignImg1.css({display:'none'});
                otherDesignImg2.css({display:'none'});
                otherDesignCardBtn.css({display:'none'});
                $('html, body').removeClass('no_scroll');
                $otherDesignInfoBox.removeClass(designClass);
            });

            function cardPage() {
                const cardPageSlides = otherDesignImg2.find('.cardBox');
                const cardPageSlide = otherDesignImg2.find('.cardBox li');
                const cardPageCount = otherDesignImg2.find('.cardBox li').length;
                let pageNow = 1;

                cardPageSlides.css({width:`${cardPageSlide.width()} * ${cardPageCount}px`});
                cardPageNow.text(pageNow);
                cardBtnCursor(pageNow);
                cardPageEnd.text(cardPageCount);
    
                cardLeftBtn.click(function () {
                    if( cardBtn.hasClass('stop') == false) {
                        if( pageNow <= 7 && pageNow > 1 ) {
                            cardBtn.addClass('stop');
                            cardMoveSlide(pageNow - 1);
    
                            cardSlideDelay();
                        }
                    }
                });
    
                cardRightBtn.click(function() {
                    if( cardBtn.hasClass('stop') == false) {
                        if( pageNow < 7 && pageNow >= 1 ) {
                            cardBtn.addClass('stop');
                            cardMoveSlide(pageNow + 1);

                            cardSlideDelay();
                        }
                    }
                });
    
                function cardMoveSlide(num) {
                    cardPageNow.text(num);
                    cardBtnCursor(num);
                    pageNow = num;
                    let modiNum = --num;

                    cardPageSlides.css({'transform' : "translateX( " + - cardPageSlide.width() * modiNum + "px)"});
                }
    
                function cardSlideDelay() {
                    setTimeout( function() {
                        cardBtn.removeClass('stop');
                    }, 500);
                }
    
                function cardBtnCursor(now) {
                    if ( now >= 1 && now < 7) {
                        cardRightBtn.addClass('active');
                    } else {
                        cardRightBtn.removeClass('active');
                    }
    
                    if( now <= 7 && now > 1) {
                        cardLeftBtn.addClass('active');
                    } else {
                        cardLeftBtn.removeClass('active');
                    }
                }

                otherDesignCloseBtn.click( function() {
                    pageNow = '';
                    cardPageSlides.css({'transform' : "translateX(0px)"});
                });
            }
        });

    }
    //ohterDesignFun();

    // srcoll
    function scrollTag() {
        const navHeight = $('.nav').outerHeight();
        const about = $('#about');
        let aboutTop = about.offset().top;
        const web = $('#web');
        let webTop = web.offset().top;
        const webDesign = $('#webDesign');
        let webDesignTop = webDesign.offset().top;
        const otherDesign = $('#otherDesign');
        let otherDesignTop = otherDesign.offset().top;
        const footer = $('#footer');
        let footerTop = footer.offset().top;

        $(document).on('scroll', () => { 
            scrollHeight();
        });

        function scrollHeight() {
            const scrollHeight = window.pageYOffset + navHeight;
            if ( scrollHeight >= 0 && scrollHeight <= aboutTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#home"]').parent('li').addClass('nowNav');
            } else if ( scrollHeight >= aboutTop && scrollHeight <= webTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#about"]').parent('li').addClass('nowNav');
                
                skillProgress();
            } else if ( scrollHeight >= webTop && scrollHeight <= webDesignTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#web"]').parent('li').addClass('nowNav');

            }else if ( scrollHeight >= webDesignTop && scrollHeight <= otherDesignTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#webDesign"]').parent('li').addClass('nowNav');

            } else if ( scrollHeight >= otherDesignTop && scrollHeight <= footerTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#otherDesign"]').parent('li').addClass('nowNav');
            } else if ( scrollHeight >= footerTop ) {
                $('.navContent').find('li').removeClass('nowNav');
                $('.navContent').find('a[href="#footer"]').parent('li').addClass('nowNav');

                $('.footerText').addClass('start');
            }
        }
        scrollHeight();

        // navClick
        function navClickScroll() {
            $('.navContent').find('li a').click(function(e) {
                e.preventDefault();
                let clickNav = $(this).attr('href');
                const moveDelay = 800;
                switch(clickNav) {
                    case '#home' : 
                        $('html, body').stop().animate({scrollTop : 0}, moveDelay);
                    break;
                    case '#about' :
                        $('html, body').stop().animate({scrollTop : aboutTop-69}, moveDelay);
                    break;
                    case '#web' :
                        $('html, body').stop().animate({scrollTop : webTop-69}, moveDelay);
                    break;
                    case '#webDesign' :
                        $('html, body').stop().animate({scrollTop : webDesignTop-69}, moveDelay);
                    break;
                    case '#otherDesign' :
                        $('html, body').stop().animate({scrollTop : otherDesignTop-69}, moveDelay);
                    break;
                    case '#footer' :
                        $('html, body').stop().animate({scrollTop : footerTop }, moveDelay);
                    break;
                }
            });
        }
        //navClickScroll();
        
        var delay = 0;
        var timer = null;
        $(window).resize(function() {
            clearTimeout(timer);
            timer = setTimeout(function() {
                scrollHeight();

                aboutTop = about.offset().top;
                webTop = web.offset().top;
                webDesignTop = webDesign.offset().top;
                otherDesignTop = otherDesign.offset().top;
                footerTop = footer.offset().top;
            }, delay);
        });
    }
    //scrollTag();

    // fade
    const observer = new IntersectionObserver((entries) => {
        entries.forEach( entry => {

                if (entry.isIntersecting ) {
                    const el = entry.target;

                    const siblings = [...el.parentNode.children];
                    const index = siblings.indexOf(el);

                    setTimeout( () => {
                        el.classList.add('active');
                        WFImgHeight();
                    }, index * 120);
                }

                // entry.target.classList.add('active');
                // setTimeout(WFImgHeight, 100);
            }
        );
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.fade').forEach(el => {
        observer.observe(el);
    });


    // project weather_project_feature
    // WFImgHeight = weather_project_feature_img_height
    const featureImg = document.querySelectorAll('.weather .project_feature_wrap .project_feature .feature_box .img_box');

    function WFImgHeight() {
        let imgHeightMax = 0;

        featureImg.forEach((el, i) => {
            el.style.height = 'auto';
            imgHeightMax = Math.max(imgHeightMax, el.offsetHeight);
        });

        featureImg.forEach( el => {
            el.style.height = imgHeightMax + 'px';
        });
    } 
    WFImgHeight();

    let WFImgHeightResizeTimer;

    window.addEventListener('resize', () => {
        clearTimeout(WFImgHeightResizeTimer);

        WFImgHeightResizeTimer = setTimeout(() => {
            WFImgHeight();
        }, 300);
    });


    window.addEventListener("pageshow", (e) => {
    console.log("persisted:", e.persisted);
});

window.addEventListener("pagehide", () => {
    console.log("pagehide");
});

window.addEventListener("load", () => {
    console.log("load");
});
});


