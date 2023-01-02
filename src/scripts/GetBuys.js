function GetBuys(objects, shares, date){
    const size = Object.keys(objects).length;
    let [index,count, buycount, currentspend, sharecount, marketstart, buylist] = [2,1,0,0,0,objects[size-1].price,{}];
    //^Instantiate intial variables
    const arr = [objects[size-1].date + "| @ |" + String(objects[size-1].price) + "|Indicator|" + String(index)];
    //^set initial 
    const reset = () =>{
        index = 2;
        count = 0;
    }
   //reset index and count
    for(var i = (size - 2); i >= 0; i--){
        let day = new Date(objects[i].date); //Ensure date value is a date
        let Present = objects[i].price; //Date's price
        let Past = objects[i+1].price; //Day before price
        let openprice = objects[i].openprice; //Open price
        let worth = sharecount * Present; //Value of owned stocks since beginning of buys

        if(day < date){
            marketstart = objects[i].price;
            continue;
        }
        /*
        ----- PAPAS STOCK BUYING METHOD -----
        1. Count the price of a stock, starting at a desired date
        2. Create a value that represents a indicator of when to buy, starting at 2
        3. If the stock price goes up, increment the indicator by 1
        4. If the stock price does not go up, do nothing. 
        5. If the indicator stays the same 3 times in a row, and the indicator is **below 10**, reset the indicator
        6. If the indicator stays the same 3 times in a row, and the indicator is **10 or above*, BUY a share of the stock.
        7. If the indicator is above 10 and stays the same more than 3 times in a row, reset the indicator
        */

        let buildstring = objects[i].date + "|" + String(Present) +`|${openprice}`; // set a base string before conditional
        if(index >= 10){ // is papa's indicator greater than 10?
            if (Present > Past){  // did the price go up?
                index++; // increase papas indicator
                buildstring += "|" + String(index) + "|  |"; // Add papas indicator with EMPTY instruction
                count = 1;
            }
            else{
                count++;
                buildstring += "|" + String(index);
                if (count === 3){ // did the price not go up 3 times in a row?
                    buildstring += "|BUY|"; //Add BUY instruction to string 
                    currentspend += Present * shares; //Update total spend
                    sharecount += shares;// Update total shares
                    buylist[buycount] = { //Create a buy object and add it to a map, to save buy data
                        price: Present,
                        date: objects[i].date,
                        totalspend: currentspend
                    }
                    buycount++; // allow for iteration in map
                }
                else if(count > 3){
                    buildstring += "|RESET|"; //Add RESET instruction to string
                    reset(); // reset papas indicator and repeat count
                }
                else{
                    buildstring += "|  |";//Add 
                }
            }
        }
        else{
            if (Present > Past){ // did the price go up?
                index++; // increase papas indicator
                buildstring += "|" + String(index) + "|  |"; //Add papas indicator with EMPTY instruction
                count = 1;
            }
            else{
                count++;
                buildstring += "|" + String(index);
                if (count === 3){ // did the price not go up 3 times in a row?
                    buildstring += "|RESET|"; //Add papas indicator with RESET instruction
                    reset(); // reset papas indicator and repeat count
                }
                else{
                    buildstring += "|  |"; //Add papas indicator with EMPTY instruction
                }
            }
        }
        let net = worth - currentspend; // Calculate value MINUS the amount spent as of X transaction
        let marketchange = ((Present - marketstart) / Math.abs(marketstart)) * 100; // Calcuate % change between start and end period
        let worthchange = ((net) / Math.abs(currentspend)) * 100; // Calcuate % change between owned shares value and total spend
        buildstring += `${currentspend}|${worth}|${net}|${sharecount}|${marketchange}|${worthchange}` // finalize the string, adding final calculations
        arr.push(buildstring); // add the string to the array of entries
    }
    return(arr);
}

export default GetBuys;