//custom hooks
import { use, useEffect, useState } from "react";


function useCurrencyInfo(currency){
    const [data, setData] = useState({});
    
    useEffect(() => {
        fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`)
        .then((resp) => resp.json())
        .then((data) => {
            setData(data.rates)
        })
    } , [currency]);
    return data;
}

export default useCurrencyInfo;