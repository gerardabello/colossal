
var Maps = {
    tolog: function(val, min, max){
        let exp = (val-min) / (min-max);
        return min * Math.pow(min/max, exp);
    }
}

export default Maps;
