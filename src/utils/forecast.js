const request = require('request'); 

//forecast 모듈 만들기
const forecast = (lat,long, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=951b5b9df563be34d2bc15ce3db20efa&query=' + lat + ',' + long + '&units=f'
    // const url = `https://api.weatherstack.com/current?access_key=951b5b9df563be34d2bc15ce3db20efa&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return callback('Unable to connect to network', undefined);
        }
        else if(response.body.error){ //내용의 오류 (참조값 오류 등)
            return callback('Result error: No matching location found - fore', undefined);
        }
        else{
            return callback(undefined,response.body.current.weather_descriptions[0] + ' it is currently temperature is ' + response.body.current.temperature + ' There is pressure of ' + response.body.current.pressure)
        }
        //else 대신에 data를 객체로 만들어서 사용 가능
            //  const data = {
            //  description: response.body.current.weather_descriptions[0],
            //  temperature: response.body.current.temperature,
            //  pressure: response.body.current.pressure
            //  };

            // // 데이터를 객체로 반환
             callback(undefined, data);
    })
}
module.exports = forecast

