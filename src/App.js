import fetchStockData from './scripts/fetchStockData';
import { useState } from 'react';
import GetBuys from './scripts/GetBuys';
import './css/styling.css';
import DatePicker from "react-datepicker";
import formatter from './scripts/formatter';

import "react-datepicker/dist/react-datepicker.css";

function App() {

    const apiKey = '3HVXR1R9TOQEYCE6';

    const [val, setVal] = useState('');
    const [objects, setObjects] = useState([]);
    const [val2, setVal2] = useState('');
    const [startDate, setStartDate] = useState(new Date('1999-01-01'));

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const response = await fetchStockData(val, apiKey);
        const buys = GetBuys(response, parseInt(val2), startDate);
        setObjects(buys.reverse());
    }

    const handleChange = (event) =>{
        setVal(event.target.value);
    }
    const handleChange2 = (event) =>{
        setVal2(event.target.value);
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
                <div className="inputdiv">
                    <input value={val} onChange={handleChange}/>
                </div>
                <div className="labeldiv">
                    <label>Input # of shares per buy</label>
                </div>
                <div className="inputdiv">
                    <input value={val2} onChange={handleChange2}/>
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
    )
}

export default App;