const request = require('request');

const geocode = (address, callback) => {
    //주소와 비동기함수용 콜백함수를 매개변수로 받음
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibXlob3VzZW1vdXNlIiwiYSI6ImNtN2E0OTM1YjAwMzQycnBwNGpiamlidm8ifQ.pK1I3oNt1EXGQ7yl95xyGw&limit=1`;

    request({ url: url, json: true }, (error, { body } = {}) => {
        //요청된 값을 json으로 변환 (에러발생시 error로 담기고 답은 response로 담김)
        if (error) {
            return callback('Unable to connect to network', undefined);
            //return은 반환용도X, 조기종료
        } else if (!body || !body.features || body.features.length === 0) {
            return callback('Result error: No matching location found - geo', undefined);
        }
        //유효한 데이터 추출
        const location = body.features[0];
        const data = {
            lat: location.center[1],
            long: location.center[0],
            location: location.place_name
        };

        callback(undefined, data);
        //(error,data)를 받았으니, error가 있으면 undefined, 정상적인 data는 data 출력
    });
};

module.exports = geocode

// `geocode()` 호출 예제
// geocode('Korea', (error, data) => {
//     //(error,data)는 콜백함수로 대기, 마지막단계에서 실행
//     if (error) {
//         console.log('❌ ERROR:', error);
//     } else {
//         console.log('✅ Data:', data);
//     }
// });