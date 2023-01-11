import fetchStockData from './scripts/fetchStockData';
import { useState } from 'react';
import GetBuys from './scripts/GetBuys';
import './css/styling.css';
import DatePicker from "react-datepicker";
import formatter from './scripts/formatter';

import "react-datepicker/dist/react-datepicker.css";

function App() {

    const k = '3HVXR1R9TOQEYCE6';

    const [objects, setObjects] = useState([]);
    const [startDate, setStartDate] = useState(new Date('1999-01-01'));

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let symbolinput = document.getElementById('symbolinput').value;
        let sharesinput = document.getElementById('sharesinput').value;
        const response = await fetchStockData(symbolinput, k);
        if(isNaN(sharesinput) || sharesinput < 1){
            alert("Shares per buy must not be empty or less than 1!")
            return;
        }
        let buys = GetBuys(response, parseInt(sharesinput), startDate);
        setObjects(buys.reverse());
    }

    const handleDateChange = (date) =>{
        setStartDate(date);
    }
    const formattedObjects = formatter(objects);
    return(
    <div>
        <div className="banner">
            <h1>💰 $$$ Papa's Stock App $$$ 😀</h1>
        </div>
        <div className="dashcontainer">
            <div className="dash">
            <form onSubmit={handleSubmit}>
                <div className="labeldiv">
                    <label>Input Stock Symbol</label>
                </div>
                <div  className="inputdiv">
                    <input id="symbolinput"/>
                </div>
                <div className="labeldiv">
                    <label>Input # of shares per buy</label>
                </div>
                <div className="inputdiv">
                    <input id="sharesinput"/>
                </div>
                <div className="labeldiv">
                    <label>Input Start Date</label>
                </div>
                <div className="inputdiv">
                    <DatePicker wrapperClassName="datePicker" selected={startDate} onChange={handleDateChange} />
                </div>
                <div className="buttondiv">
                    <button className="shake">Run App</button>
                </div>
            </form>
            </div>
        </div>
        
        <div className="tablediv">
        <table>
            <thead>
                <tr >
                    <th>Date</th>
                    <th>Close Price</th>
                    <th>Open Price</th>
                    <th>Papa's Indicator</th>
                    <th>Instruction</th>
                    <th>Total Spend</th>
                    <th>Share Count</th>
                    <th>Worth of Shares</th>
                    <th>Net Profit</th>
                    <th>Worth Change</th>
                    <th>Market Change</th>
                </tr>
            </thead>
            <tbody>
                {formattedObjects}
            </tbody>
        </table>
        </div>
    </div>
    )
}

export default App;