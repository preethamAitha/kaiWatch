export function returnColor(val?: string){
    if(!val){
        return 'rgba(54, 162, 244, 0.2)'
    }
    else if(val[0]==='+'){
        return 'rgba(244, 98, 54, 0.2)'
    }
    else{
        return 'rgba(54, 244, 117, 0.2)'
    }
};

export function returnColorText(val: string){
    if(val === 'rgba(54, 162, 244, 0.2)'){
        return 'primary.main'
    }
    else if(val === 'rgba(244, 98, 54, 0.2)'){
        return 'error.main'
    }
    else{
        return 'success.main'
    }
}