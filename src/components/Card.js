

function Card({date, price, openprice, indicator, instruction, spend, worth, net, sharecount,marketchange,wc}){
    const getStyleColor = (ins) =>{
        if(instruction === "BUY"){
            return("#7dfaac");
        }
        else if(instruction === "RESET"){
            return("#ff5c5c");
        }
        else{
            return("#ffffff");
        }
    }
    const sty={
        backgroundColor: getStyleColor(instruction)
    }
    const getRounded = (num) =>{
        return((Math.round(num * 100))/100)
    }
    return(
        <tr style={sty}>
            <td>{date}</td>
            <td>{getRounded(price)}</td>
            <td>{getRounded(openprice)}</td>
            <td>{indicator}</td>
            <td>{instruction}</td>
            <td>{getRounded(spend)}</td>
            <td>{sharecount}</td>
            <td>{getRounded(worth)}</td>
            <td>{getRounded(net)}</td>
            <td>{getRounded(wc) + "%"}</td>
            <td>{getRounded(marketchange) + "%"}</td>
        </tr>
    )
}

export default Card;