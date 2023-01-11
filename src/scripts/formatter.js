import Card from '../components/Card';

function formatter(stringarr){
    return(stringarr.map((valu, index) =>{
        const [date,price,openprice,indicator,instruction,spend,worth,net,shares,change,worthchange] = valu.split("|");
        //^ Converts string into separate variables that can be read, using array destructuring and string slitting
        return(<Card key={index} 
            date={date} 
            price={price} 
            openprice={openprice}
            instruction={instruction} 
            indicator={indicator} 
            spend={spend}
            worth={worth} 
            net={net}
            sharecount={shares}
            marketchange={change}
            wc={worthchange}
            />)
    }));
}

export default formatter;