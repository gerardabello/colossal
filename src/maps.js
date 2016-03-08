
let Maps = {

    applyLaw(v, min, max, law){
        let l = law || 'linear';
        if(min>=max){throw('min should be smaller than max');}

        let result = 0;
        switch (l) {
        case 'linear':
            result = v*(max-min) + min;
            break;
        case 'log':
            if(min<0){throw('Called applyLaw with a log law and negative values');}
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
        if(min>=max){throw('min should be smaller than max');}

        let result = 0;
        switch (l) {
        case 'linear':
            result = (v - min) / (max-min);
            break;
        case 'log':
            if(min<0){throw('Called applyLaw with a log law and negative values');}
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
