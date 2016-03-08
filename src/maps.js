
let Maps = {

    applyLaw(v, min, max, law){
        let l = law || 'linear';

        let result = 0;
        switch (l) {
        case 'linear':
            result = v*(max-min) + min;
            break;
        case 'log':
            result = min * Math.pow(max/min, v);
            break;
        case 'pow':
            result = min + (v*v)*(max-min);
            break;
        default:
            result = v*(max-min) + min;
            break;
        }

        return result;
    },

    reverseLaw(v, min, max, law){
        let l = law || 'linear';

        let result = 0;
        switch (l) {
        case 'linear':
            result = (v - min) / (max-min);
            break;
        case 'log':
            result = (Math.log(v/min))/(Math.log(max/min));
            break;
        case 'pow':
            result = Math.sqrt((v-min)/(max-min));
            break;
        default:
            result = (v - min) / (max-min);
            break;
        }
        return result;
    }
};

export default Maps;
