$( document ).ready(function() {
    (function(){
		//검색
		const CHO_HANGUL = [
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
            'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
            'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
		];
		
		const HANGUL_START_CHARCODE = "가".charCodeAt();
		
		const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
		const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());
		
		function combine(cho, jung, jong) {
		return String.fromCharCode(
			HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
		);
		}
          
		// 초성검색
		function makeRegexByCho(search = "") {
		const regex = CHO_HANGUL.reduce(
			(acc, cho, index) =>
			acc.replace(
				new RegExp(cho, "g"),
				`[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
			),
			search
		);
		
		return new RegExp(`(${regex})`, "g");
		}
		
		function includeByCho(search, targetWord) {
			return makeRegexByCho(search).test(targetWord);
		}

        //지도
        const dataList = ['서울특별시', '경기도 가평군', '경기도 고양시', '경기도 구리시', '경기도 김포시', '경기도 부천시', '경기도 성남시', '경기도 수원시', '경기도 안산시', '경기도 안성시', '경기도 안양시', '경기도 여주시', '경기도 오산시', '경기도 용인시', '경기도 의정부시', '경기도 이천시', '경기도 파주시', '경기도 평택시', '경기도 하남시', '경기도 화성시', '인천광역시', '인천광역시 강화군', '강원도 양양', '강원도 강릉시', '강원도 고성군', '강원도 동해시', '강원도 원주시', '강원도 춘천시', '강원도 태백시', '강원도 화천군', '충청북도 괴산군', '충청북도 옥천군', '충청북도 제천시', '충청북도 진천시', '충청북도 청주시', '충청북도 충주시', '대전광역시', '충청남도 공주시', '충청남도 논산시', '충청남도 당진시', '충청남도 보령시', '충청남도 서산시', '충청남도 아산시', '충청남도 예산시', '충청남도 천안시', '충청남도 홍성군', '경상북도 경산시', '경상북도 경주시', '경상북도 구미시', '경상북도 군위군', '경상북도 김천시', '경상북도 문경시', '경상북도 상주시', '경상북도 안동시', '경상북도 영동군', '경상북도 영양군', '경상북도 영주시', '경상북도 예천군', '경상북도 예천군', '경상북도 울진군', '경상북도 청동군', '경상북도 칠곡군', '경상북도 포항시', '대구광역시', '경상남도 고성군', '경상남도 김해시', '경상남도 남해군', '경상남도 밀양시', '경상남도 진주시', '경상남도 창녕군', '경상남도 창원시', '경상남도 함양군', '울산광역시', '부산광역시', '전라북도 고창군', '전라북도 군산시', '전라북도 김제시', '전라북도 무주군', '전라북도 부안군', '전라북도 순창군', '전라북도 익산시', '전라북도 임실군', '전라북도 전주시', '전라북도 진안군', '광주광역시', '전라남도 나주시', '전라남도 목포시', '전라남도 무안군', '전라남도 보성군', '전라남도 순천시', '전라남도 신안군', '전라남도 해남군', '제주특별자치도'];

        const $searchBox = $('#searchBox');
        const $autoComplete = $('.autoComplete');

        //focus 위치조정
		const focusOn = function() { $('.weatherHeader').css({marginTop:`-6px`}); };
		const focusOff = function() { $('.weatherHeader').css({marginTop:`0px`}) };
        $searchBox.on({
            focus: function() {
                focusOn();
            },
            blur: function() {
				focusOff();
            }
        });

        //keyup event funtion
		let nowIndex = 0;
		let nowSearchData;
        $searchBox.keyup(function(e) {
			
            let value = $searchBox.val().trim();
            let getMatchDataList, matchDataList;

            //자동완성박스 show / 자동완성
            if ( value == "" ) {
                $autoComplete.css({display:'none'});
                getMatchDataList = [];
            } else {
                $autoComplete.css({display:'block'});
				$('.xmarkIcon').css({display:'block'});
                getMatchDataList = dataList.filter(function(label) {
                    return includeByCho(value, label);
                });
            }
			
			if ( getMatchDataList.length > 5 ) {
				matchDataList = getMatchDataList.slice(0, 5);
			} else if ( getMatchDataList.length == 0 ) {
				$autoComplete.css({display:'none'});
			} else {
				matchDataList = getMatchDataList;
			}

			if ( getMatchDataList.length != 0 ) {
				switch(e.keyCode) {
					case 13 :
						e.preventDefault();
						searchFun(nowSearchData);
						focusOff();
						$searchBox.blur();
						$('.autoComplete').css({display:'none'});
						nowSearchData = '';
						break;
					case 38 : 
						//nowIndex = Math.max(nowIndex - 1 ,0);
						nowIndex = nowIndex - 1;
						if ( nowIndex <= -1 ) {
							nowIndex = matchDataList.length - 1;
						}
						break;
					case 40 : 
						//nowIndex = Math.min(nowIndex + 1, matchDataList.length-1);
						nowIndex = nowIndex + 1;
						if ( nowIndex >= matchDataList.length ) {
							nowIndex = 0;
						}
						break;
					default :
						nowIndex = 0;
						break;
				}
	
				nowSearchData = matchDataList[nowIndex];
				showList(matchDataList, value, nowIndex); 
			} else { 
				switch(e.keyCode) {
					case 13 :
						e.preventDefault();
						searchFun(nowSearchData);
						focusOff();
						$searchBox.blur();
						$('.autoComplete').css({display:'none'});
						nowSearchData = '';
						break;
				}
			}

			//리스트 클릭
			let clickData;
			$('.autoComplete p').on({
				click : function() {
					clickData = $(this).text();
					nowSearchData = clickData;
					$searchBox.focus();
					$('#searchBox').val(clickData);
					$('.autoComplete').css({display:'none'});
				}
			});

			//X button click
			$('.xmarkIcon').on({
				click: function() {
					$('#searchBox').val("");
					nowSearchData = "";
					$('.autoComplete').css({display:'none'});
				}
			});
        });

        const showList = (data, value, nowIndex) => {
            // 정규식으로 변환
            const regexp = new RegExp(`(${value})`, "g");

            let NewDataList = data.map(function(label, index) {
                if (nowIndex === index) {
                    return `<p class='active'>${label.replace(regexp, "<span class='mark'>$1</span>")}</p>`
                } else {
                    return `<p>${label.replace(regexp, "<span class='mark'>$1</span>")}</p>`
                }
            });

            $autoComplete.html(NewDataList.join(""));
        };


		const mapDataList = [
			{ city:"서울특별시", lat:"37.5833",lon:"127"},
			{ city:"경기도 가평군", lat:"37.831",lon:"127.5106"},
			{ city:"경기도 고양시", lat:"37.6564",lon:"126.835"},
			{ city:"경기도 구리시", lat:"37.5986",lon:"127.1394"},
			{ city:"경기도 김포시", lat:"37.6236",lon:"126.7142"},
			{ city:"경기도 부천시", lat:"37.4989",lon:"126.7831"},
			{ city:"경기도 성남시", lat:"37.4386",lon:"127.1378"},
			{ city:"경기도 수원시", lat:"37.2911",lon:"127.0089"},
			{ city:"경기도 안산시", lat:"37.3236",lon:"126.8219"},
			{ city:"경기도 안성시", lat:"37.0108",lon:"127.2703"},
			{ city:"경기도 안양시", lat:"37.3925",lon:"126.9269"},
			{ city:"경기도 여주시", lat:"37.2958",lon:"127.6339"},
			{ city:"경기도 오산시", lat:"37.1522",lon:"127.0706"},
			{ city:"경기도 용인시", lat:"37.2342",lon:"127.2064"},
			{ city:"경기도 의정부시", lat:"37.7415",lon:"127.0474"},
			{ city:"경기도 이천시", lat:"37.2792",lon:"127.4425"},
			{ city:"경기도 파주시", lat:"37.7611",lon:"126.775"},
			{ city:"경기도 평택시", lat:"36.9947",lon:"127.0889"},
			{ city:"경기도 하남시", lat:"37.54",lon:"127.2056"},
			{ city:"경기도 화성시", lat:"37.2068",lon:"126.8169"},
			{ city:"인천광역시", lat:"37.45",lon:"126.4161"},
			{ city:"인천광역시 강화군", lat:"37.7472",lon:"126.4856"},
			{ city:"강원도 양양", lat:"38.0739",lon:"128.6211"},
			{ city:"강원도 강릉시", lat:"37.7556",lon:"128.8961"},
			{ city:"강원도 고성군", lat:"34.9763",lon:"128.3236"},
			{ city:"강원도 동해시", lat:"37.5439",lon:"129.1069"},
			{ city:"강원도 원주시", lat:"37.3514",lon:"127.9453"},
			{ city:"강원도 춘천시", lat:"37.8747",lon:"127.7342"},
			{ city:"강원도 태백시", lat:"37.1759",lon:"128.9889"},
			{ city:"강원도 화천군", lat:"38.1061",lon:"127.7067"},
			{ city:"충청북도 괴산군", lat:"36.8108",lon:"127.7947"},
			{ city:"충청북도 영동군", lat:"36.175",lon:"127.7764"},
			{ city:"충청북도 옥천군", lat:"36.3012",lon:"127.568"},
			{ city:"충청북도 제천시", lat:"37.1361",lon:"128.2119"},
			{ city:"충청북도 진천시", lat:"36.8567",lon:"127.4433"},
			{ city:"충청북도 청주시", lat:"36.6372",lon:"127.4897"},
			{ city:"충청북도 충주시", lat:"36.9706",lon:"127.9322"},
			{ city:"대전광역시", lat:"36.3333",lon:"127.4167"},
			{ city:"충청남도 공주시", lat:"36.4556",lon:"127.1247"},
			{ city:"충청남도 논산시", lat:"36.2039",lon:"127.0847"},
			{ city:"충청남도 당진시", lat:"36.8944",lon:"126.6297"},
			{ city:"충청남도 보령시", lat:"36.3493",lon:"126.5977"},
			{ city:"충청남도 서산시", lat:"36.7817",lon:"126.4522"},
			{ city:"충청남도 아산시 ", lat:"36.7836",lon:"127.0042"},
			{ city:"충청남도 예산시", lat:"36.6776",lon:"126.8427"},
			{ city:"충청남도 천안시", lat:"36.8065",lon:"127.1522"},
			{ city:"충청남도 홍성군", lat:"36.6009",lon:"126.665"},
			{ city:"경상북도 경산시", lat:"35.8251",lon:"128.7413"},
			{ city:"경상북도 경주시", lat:"35.8428",lon:"129.2117"},
			{ city:"경상북도 구미시", lat:"36.1136",lon:"128.336"},
			{ city:"경상북도 군위군", lat:"36.2426",lon:"128.5729"},
			{ city:"경상북도 김천시", lat:"36.1218",lon:"128.1198"},
			{ city:"경상북도 문경시", lat:"36.5946",lon:"128.1995"},
			{ city:"경상북도 상주시", lat:"36.4153",lon:"128.1606"},
			{ city:"경상북도 안동시", lat:"36.5656",lon:"128.725"},
			{ city:"경상북도 영양군", lat:"36.6659",lon:"129.1129"},
			{ city:"경상북도 영주시", lat:"36.8217",lon:"128.6308"},
			{ city:"경상북도 예천군", lat:"36.6556",lon:"128.4569"},
			{ city:"경상북도 울진군", lat:"36.9929",lon:"129.4"},
			{ city:"경상북도 청동군", lat:"35.0433",lon:"126.7242"},
			{ city:"경상북도 칠곡군", lat:"35.9917",lon:"128.3973"},
			{ city:"경상북도 포항시", lat:"36.0322",lon:"129.365"},
			{ city:"대구광역시", lat:"35.8",lon:"128.55"},
			{ city:"경상남도 고성군", lat:"34.9763",lon:"128.3236"},
			{ city:"경상남도 김해시", lat:"35.2342",lon:"128.8811"},
			{ city:"경상남도 남해군", lat:"34.8394",lon:"127.8944"},
			{ city:"경상남도 밀양시", lat:"35.4933",lon:"128.7489"},
			{ city:"경상남도 진주시", lat:"35.1928",lon:"128.0847"},
			{ city:"경상남도 창녕군", lat:"35.5415",lon:"128.4951"},
			{ city:"경상남도 창원시", lat:"35.2281",lon:"128.6811"},
			{ city:"경상남도 함양군", lat:"35.5194",lon:"127.7277"},
			{ city:"울산광역시", lat:"35.5372",lon:"129.3167"},
			{ city:"부산광역시", lat:"35.1333",lon:"129.05"},
			{ city:"전라북도 고창군", lat:"35.4356",lon:"126.7021"},
			{ city:"전라북도 군산시", lat:"35.9786",lon:"126.7114"},
			{ city:"전라북도 김제시", lat:"35.8038",lon:"126.8806"},
			{ city:"전라북도 무주군", lat:"36.0072",lon:"127.6614"},
			{ city:"전라북도 부안군", lat:"35.7281",lon:"126.7319"},
			{ city:"전라북도 순창군", lat:"35.3743",lon:"127.1373"},
			{ city:"전라북도 익산시", lat:"35.9439",lon:"126.9544"},
			{ city:"전라북도 임실군", lat:"35.6131",lon:"127.2794"},
			{ city:"전라북도 전주시", lat:"35.8219",lon:"127.1489"},
			{ city:"전라북도 진안군", lat:"35.7917",lon:"127.4253"},
			{ city:"광주광역시", lat:"35.1547",lon:"126.9156"},
			{ city:"전라남도 나주시", lat:"35.0283",lon:"126.7175"},
			{ city:"전라남도 목포시", lat:"34.7936",lon:"126.3886"},
			{ city:"전라남도 무안군", lat:"34.9897",lon:"126.4714"},
			{ city:"전라남도 보성군", lat:"34.7697",lon:"127.0809"},
			{ city:"전라남도 순천시", lat:"34.9481",lon:"127.4895"},
			{ city:"전라남도 신안군", lat:"34.8262",lon:"126.1086"},
			{ city:"전라남도 해남군", lat:"34.5711",lon:"126.5989"},
			{ city:"제주특별자치도", lat:"33.5097",lon:"126.5219"},
		]

		//검색기능
		function searchFun(searchData)  {
			//let checkDataList = $('#searchBox').val().trim();
			let checkDataList = searchData;
			let dataCheck;

			mapDataList.forEach((list)=> {
				if ( list.city == checkDataList ) {
					dataCheck = list;
				}
			});

			if ( dataCheck != undefined ) {
				$('.errorContent').css({display:'none'});
				$('.weatherContent').css({display:'flex'});

				let nowLatPos, nowLonPos;
				nowLatPos = dataCheck.lat;
				nowLonPos = dataCheck.lon;
				nowCityName = dataCheck.city;
				nowWeatherData(nowLatPos, nowLonPos, nowCityName);
			} else {
				$('.errorContent').css({display:'block'});
				$('.weatherContent').css({display:'none'});
			}

			$('#searchBox').val("");
		}

		$('.searchIcon').click(function() {
			nowSearchData = $('#searchBox').val();
			searchFun(nowSearchData);
			$('.autoComplete').css({display:'none'});
		});


		//날씨data 
		function nowWeatherData(nowLat = 35.8, nowLon = 128.55, nowCityName ='대구광역시' ) {
			//오늘날씨
			let todatWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${nowLat}&lon=${nowLon}&appid=00f55c9f5e9900fd14348f0dd9cbb0b6&units=metric&lang=kr`;
			//주간날씨
			let weekWather = `https://api.openweathermap.org/data/2.5/forecast?lat=${nowLat}&lon=${nowLon}&appid=00f55c9f5e9900fd14348f0dd9cbb0b6&units=metric&lang=kr`;
			//대기오염
			let airPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${nowLat}&lon=${nowLon}&appid=00f55c9f5e9900fd14348f0dd9cbb0b6`;

			$('.searchPos').text(nowCityName);
			
			//주간 요일
			let timeData = function() {
				let dt = new Date();
				let nowYear = dt.getFullYear();
				let nowMonth = dt.getMonth() + 1;
				let nextMonth = nowMonth >= 12 ? 1 : nowMonth + 1;
				let nowDate = dt.getDate();
				let monthLastDay = new Date(nowYear, nowMonth, 0).getDate();
				let nowHours = dt.getHours();
				let nowMinutes = dt.getMinutes();
				let nowTotalMinutes = ( nowHours * 60 ) + nowMinutes;
				let weekDateArray = [ nowDate + 1, nowDate + 2, nowDate + 3, nowDate + 4, nowDate + 5 ];
				let dayWeekArray = new Array(5);
				let newDayWeekArray = new Array(5);
				let resetDay = 1;
				weekDateArray.forEach( function(date, index) {
					if ( date > monthLastDay ) {
						weekDateArray[index] = resetDay;
						resetDay++;
						dayWeekArray[index] = new Date(`${nowYear}-${nextMonth}-${weekDateArray[index]}`).getDay();
					} else {
						weekDateArray[index] = date;
						dayWeekArray[index] = new Date(`${nowYear}-${nowMonth}-${weekDateArray[index]}`).getDay();
					}
				});
				dayWeekArray.forEach( function(date, index) {
					switch(date) {
						case 0 : newDayWeekArray[index] = '일'; break;
						case 1 : newDayWeekArray[index] = '월'; break;
						case 2 : newDayWeekArray[index] = '화'; break;
						case 3 : newDayWeekArray[index] = '수'; break;
						case 4 : newDayWeekArray[index] = '목'; break;
						case 5 : newDayWeekArray[index] = '금'; break;
						case 6 : newDayWeekArray[index] = '토'; break;
					}
				});
				return [weekDateArray, newDayWeekArray, nowTotalMinutes];
			}
			let [weekDateArray, dayWeekArray, nowTotalMinutes] = timeData();		
			
			let weekDivList = $('.weekDateBox').get();
			
			for (let listCount = 0; listCount < weekDivList.length; listCount++) {
				$('.weekDateBox').eq(listCount).html(`<p class="weekDate">${weekDateArray[listCount]}(${dayWeekArray[listCount]})</p>`);
			}
		
			//오늘날씨, 습도, 체감온도, 풍향, 풍속
			$.getJSON(todatWeather, function(data) {
				let nowTempData = data.main.temp;
				let nowWeatherData = data.weather[0].id;
				let nowHumidityData = data.main.humidity;
				let nowWindchillData = data.main.feels_like;
				let nowWindDegData = data.wind.deg;
				let nowWindSpeedData = data.wind.speed;
				let todaySunrise = data.sys.sunrise;
				let todaySunset = data.sys.sunset;
				let todaySunTime = [todaySunrise, todaySunset];
				let calcSunTime = new Array();
				todaySunTime.forEach(function(data, index){
					let newTimeCalc = new Date(data * 1000);
					let sunTimeHours = newTimeCalc.getHours();
					let sunTimeMinutes = newTimeCalc.getMinutes();
					calcSunTime[index] = (sunTimeHours * 60) + sunTimeMinutes;
				});
				let newTempData = nowTempData.toFixed(1);
				let newWIndchillData = nowWindchillData.toFixed(1);
				let newWindSpeendData = nowWindSpeedData.toFixed(1);
				//날씨아이콘
				let weatherImg, weatherText;

				switch(nowWeatherData) {
					case 200 :
					case 201 :
					case 230 :
					case 231 :
					case 202 :
					case 232 :
						weatherImg = '01';
						weatherText = '뇌우';
						break;
					case 210 :
					case 211 :
					case 212 :
					case 221 :
						weatherImg = '03';
						weatherText = '';
						break;
					case 300 : 
					case 301 :
					case 302 :
					case 310 :
					case 311 :
					case 313 :
					case 321 :
					case 500 :
					case 501 :
					case 312 :
					case 314 :
					case 502 :
					case 503 :
					case 504 :
					case 520 :
					case 521 :
					case 522 :
					case 531 :
						weatherImg = '05';
						weatherText = '비';
						break;
					case 511 :
					case 600 :
					case 601 :
					case 611 :
					case 612 :
					case 602 :
					case 622 :
						weatherImg = '06';
						weatherText = '눈';
						break;
					case 615 :
					case 616 :
					case 620 :
					case 621 :
						weatherImg = '08';
						weatherText = '폭우';
						break;
					case 701 :
					case 711 :
					case 721 :
					case 731 :
					case 741 :
					case 751 :
					case 761 :
					case 762 :
						weatherImg = '09';
						weatherText = '안개';
						break;
					case 771 :
					case 781 :
						weatherImg = '10';
						weatherText = '돌풍';
						break;
					case 800 :
						if( nowTotalMinutes >= calcSunTime[0] && nowTotalMinutes <= calcSunTime[1] ) {
							weatherImg = '11am';
						} else if ( nowTotalMinutes <= calcSunTime[0] || nowTotalMinutes >= calcSunTime[1] ) {
							weatherImg = '11pm';
						}
						weatherText = '맑음';
						break;
					case 801 :
					case 802 :
						if( nowTotalMinutes >= calcSunTime[0] && nowTotalMinutes <= calcSunTime[1] ) {
							weatherImg = '12am';
						} else if ( nowTotalMinutes <= calcSunTime[0] || nowTotalMinutes >= calcSunTime[1] ) {
							weatherImg = '12pm';
						}
						weatherText = '구름';
						break;
					case 803 :
					case 804 :
						weatherImg = '13';
						weatherText = '구름많음'
						
				}
				$('.weatherImg').html(`<img src="img/weather/${weatherImg}.png" alt="weatherImg">`);
				$('.weatherInfo .nowWeather').text(`${weatherText}`);
				
				//풍향
				let windDegText;
				if ( nowWindDegData >= 22.6 && nowWindDegData <= 67.4 ) {
					windDegText = '북동';
				} else if ( nowWindDegData >= 67.5 && nowWindDegData <= 112.5 ) {
					windDegText = '동';
				} else if ( nowWindDegData >= 112.6 && nowWindDegData <= 157.4 ) {
					windDegText = '남동';
				} else if ( nowWindDegData >= 157.5 && nowWindDegData <= 202.5 ) {
					windDegText = '남';
				} else if ( nowWindDegData >= 202.6 && nowWindDegData <= 247.4 ) {
					windDegText = '남서';
				} else if ( nowWindDegData >= 247.5 && nowWindDegData <= 292.5 ) {
					windDegText = '서';
				} else if ( nowWindDegData >= 292.6 && nowWindDegData <= 337.4 ) {
					windDegText = '북서';
				} else {
					windDegText = '북';
				}

			$('.temperature .nowTemp').text(`${newTempData}°`);
			$('.weatherOtherInfoBoxs .infoData_1').text(`${nowHumidityData}`);
			$('.weatherOtherInfoBoxs .infoData_2').text(`${newWIndchillData}`);
			$('.weatherOtherInfoBoxs .infoData_3').text(`${windDegText}`);
			$('.weatherOtherInfoBoxs .infoData_4').text(`${newWindSpeendData}`);

			});

			//주간날씨 weekSunset
			$.getJSON(weekWather, function(data) {
				let weekSunriseTime = data.city.sunrise;
				let weekSunsetTime = data.city.sunset;
				
				let getWeekSunrise = new Date(weekSunriseTime *1000);
				let getWeekSunset = new Date(weekSunsetTime * 1000);

				let getWeekSunriseHours = getWeekSunrise.getHours();
				let getWeekSunriseMinutes = getWeekSunrise.getMinutes();
				let getWeekSunsetHours = getWeekSunset.getHours();
				let getWeekSunsetMinutes = getWeekSunset.getMinutes();

				//주간배열만들기
				let weekData = data.list;
				let newWeekList0 = new Array();
				let newWeekList1 = new Array();
				let newWeekList2 = new Array();
				let newWeekList3 = new Array();
				let newWeekList4 = new Array();

				weekData.map(function(weekData) {
					let weekTimeList = new Date(weekData.dt_txt);
					let weekTimeDay = weekTimeList.getDate();

					weekDateArray.filter( function( weekDay, index ) {
						if (weekDay === weekTimeDay ) {
							switch(index) {
								case 0 : newWeekList0.push(weekData);
								break;
								case 1 : newWeekList1.push(weekData);
								break;
								case 2 : newWeekList2.push(weekData);
								break;
								case 3 : newWeekList3.push(weekData);
								break;
								case 4 : newWeekList4.push(weekData);
								break;
							}
						}
					});
				});

				//일출시간, 일몰시간별 주간 배열
				function WeekSunTime( weekData ) {
					let weekSunData = new Array();
					weekData.map(function(data){
						let sunriseTime = ( getWeekSunriseHours * 60 ) + getWeekSunriseMinutes;
						let sunsetTime = ( getWeekSunsetHours * 60 ) + getWeekSunsetMinutes;

						let weekDayTime = new Date(data.dt_txt);
						let weekDayTimeHours = weekDayTime.getHours() * 60;


						if ( weekDayTimeHours >= sunriseTime && weekDayTimeHours <= sunsetTime ) {
							weekSunData.push(data);
						}	
					});
					return weekSunData;

				}
				let newWeekSunList0 = WeekSunTime(newWeekList0);
				let newWeekSunList1 = WeekSunTime(newWeekList1);
				let newWeekSunList2 = WeekSunTime(newWeekList2);
				let newWeekSunList3 = WeekSunTime(newWeekList3);
				let newWeekSunList4 = WeekSunTime(newWeekList3);

				//주간 날씨 데이터 입력
				function weekDataInput( data, index ) {
					//rainfall probability data
					let rainfallArray = new Array();
					let rainfallCalc, maxRainfall;
					//weather data
					let weatherAm, weatherPm, getWeatherImg, getWeatherText;
					//temperature data
					let tempArray = new Array();
					let minTemp, maxTemp;

					data.forEach(function(weekData) {
						//rainfall
						rainfallCalc = weekData.pop * 100;
						rainfallArray.push(Math.round(rainfallCalc));

						//weather
						let getTimeHours = new Date(weekData.dt_txt).getHours();
						if ( getTimeHours == 9 ) {
							weatherAm = weekData.weather[0].id;
						} else if ( getTimeHours == 15 ) {
							weatherPm = weekData.weather[0].id;
						}

						//temperature
						tempArray.push(Math.round(weekData.main.temp));
					});
					maxRainfall = Math.max.apply(null, rainfallArray);

					function setWeekWeather(weatherId, time) {
						switch(weatherId) {
							case 200 :
							case 201 :
							case 230 :
							case 231 :
							case 202 :
							case 232 :
								getWeatherImg = '01';
								getWeatherText = '뇌우';
								break;
							case 210 :
							case 211 :
							case 212 :
							case 221 :
								getWeatherImg = '03';
								getWeatherText = '';
								break;
							case 300 : 
							case 301 :
							case 302 :
							case 310 :
							case 311 :
							case 313 :
							case 321 :
							case 500 :
							case 501 :
							case 312 :
							case 314 :
							case 502 :
							case 503 :
							case 504 :
							case 520 :
							case 521 :
							case 522 :
							case 531 :
								getWeatherImg = '05';
								getWeatherText = '비';
								break;
							case 511 :
							case 600 :
							case 601 :
							case 611 :
							case 612 :
							case 602 :
							case 622 :
								getWeatherImg = '06';
								getWeatherText = '눈';
								break;
							case 615 :
							case 616 :
							case 620 :
							case 621 :
								getWeatherImg = '08';
								getWeatherText = '폭우';
								break;
							case 701 :
							case 711 :
							case 721 :
							case 731 :
							case 741 :
							case 751 :
							case 761 :
							case 762 :
								getWeatherImg = '09';
								getWeatherText = '안개';
								break;
							case 771 :
							case 781 :
								getWeatherImg = '10';
								getWeatherText = '돌풍';
								break;
							case 800 :
								if( time == 'am' ) {
									getWeatherImg = '11am';
								} else if ( time == 'pm' ) {
									getWeatherImg = '11pm';
								}
								getWeatherText = '맑음';
								break;
							case 801 :
							case 802 :
								if( time == 'am' ) {
									getWeatherImg = '12am';
								} else if ( time == 'pm' ) {
									getWeatherImg = '12pm';
								}
								getWeatherText = '구름';
								break;
							case 803 :
							case 804 :
								getWeatherImg = '13';
								getWeatherText = '구름많음';
								break;
						}
					}
					minTemp = Math.min.apply(null, tempArray);
					maxTemp = Math.max.apply(null, tempArray);

					let weekDivList = $('.weekWeatherBox');
					let currentWeekDiv = weekDivList.eq(index);
					let currentRainfallDiv = currentWeekDiv.find('.weekRainfallBox');
					currentRainfallDiv.find('p').html(`${maxRainfall}%`);

					let currentWeatherDiv = currentWeekDiv.find('.weekWeatherIcon');
					setWeekWeather(weatherAm, 'am');
					currentWeatherDiv.find('.weekAmIcon').html(`<img src="img/weather/${getWeatherImg}.png" alt="${getWeatherText}">`);
					setWeekWeather(weatherPm, 'pm');
					currentWeatherDiv.find('.weekPmIcon').html(`<img src="img/weather/${getWeatherImg}.png" alt="${getWeatherText}">`);

					let currentMinTempDiv = currentWeekDiv.find('.weekTempBox');
					currentMinTempDiv.find('p').html(`<span>${minTemp}°</span><span>${maxTemp}°</span>`);
				}
				
				weekDataInput(newWeekSunList0, 0);
				weekDataInput(newWeekSunList1, 1);
				weekDataInput(newWeekSunList2, 2);
				weekDataInput(newWeekSunList3, 3);
				weekDataInput(newWeekSunList4, 4);
			});

			//대기오염(미세먼지)
			$.getJSON(airPollution, function(data) {
			let fineDustData = data.list[0].components.pm10;
			let ultraFinedDustData = data.list[0].components.pm2_5;

			let newFineDustData = fineDustData.toFixed(1);
			let newUltraFineDustData = ultraFinedDustData.toFixed(1);

			$('.fineDust .dustNum').text(`${newFineDustData}`);
			$('.ultraFineDust .dustNum').text(`${newUltraFineDustData}`);

			if ( newFineDustData <= 30 ) {
				$('.fineDust .dustText').text(`좋음`);
				$('.leftDust .dustIconBox').html(`<img src="img/icon/finedust_good.png" alt="goodIcon">`);
			} else if ( newFineDustData >= 31 && newFineDustData <= 80 ) {
				$('.fineDust .dustText').text(`보통`);
				$('.leftDust .dustIconBox').html(`<img src="img/icon/finedust_normal.png" alt="normalIcon">`);
			} else if ( newFineDustData >= 81 && newFineDustData <= 150 ) {
				$('.fineDust .dustText').text(`나쁨`);
				$('.leftDust .dustIconBox').html(`<img src="img/icon/finedust_bad.png" alt="badIcon">`);
			} else if ( 151 <= newFineDustData ) {
				$('.fineDust .dustText').text(`매우나쁨`);
				$('.leftDust .dustIconBox').html(`<img src="img/icon/finedust_verybad.png" alt="verybadIcon">`);
			}

			if ( newUltraFineDustData <= 15 ) {
				$('.ultraFineDust .dustText').text(`좋음`);
				$('.rightDust .dustIconBox').html(`<img src="img/icon/finedust_good.png" alt="goodIcon">`);
			} else if ( newUltraFineDustData >= 16 && newUltraFineDustData <= 35 ) {
				$('.ultraFineDust .dustText').text(`보통`);
				$('.rightDust .dustIconBox').html(`<img src="img/icon/finedust_normal.png" alt="normalIcon">`);
			} else if ( newUltraFineDustData >= 36 && newUltraFineDustData <= 75 ) {
				$('.ultraFineDust .dustText').text(`나쁨`);
				$('.rightDust .dustIconBox').html(`<img src="img/icon/finedust_bad.png" alt="badIcon">`);
			} else if ( newUltraFineDustData >= 76 ) {
				$('.ultraFineDust .dustText').text(`매우나쁨`);
				$('.rightDust .dustIconBox').html(`<img src="img/icon/finedust_verybad.png" alt="verybadIcon">`);
			}

			});
      	}
		nowWeatherData();
    }());
});