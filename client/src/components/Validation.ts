function checkCC(cno: string) : any {
    if(cno.length > 19) return false

    let newCno = cno.split('').reverse();
    let set : number[] = []

    for(let i = 0; i<newCno.length;i++) {
        if(i%2 !== 0) {
            console.log(newCno[i])
            let cur : number = parseInt(newCno[i]);
            let num : number = 0;
            if( cur + cur > 9) {
                num = cur + cur;
                num = parseInt(num.toString().charAt(0)) + parseInt(num.toString().charAt(1))
            } else {
                num = cur + cur;
            }
            set.push(num);
        } else {
            set.push(parseInt(newCno[i]));
        }
    }

    let total : number = set.reduce((p, c) => p + c);
    if(total % 10 === 0) return true
    else return false
    
}

export { checkCC }