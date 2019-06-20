import axios from 'axios';

export default class Table {
    constructor(query) {
        this.query = query;
        this.data = [];
        this.pages = 0;
    }

    async getTable() {
        let ind;
        if(this.query.interval === 'TIME_SERIES_INTRADAY')
            ind = 'Time Series (60min)';
        else if(this.query.interval === 'TIME_SERIES_DAILY')
            ind = "Time Series (Daily)";
        else if(this.query.interval === 'TIME_SERIES_WEEKLY')
            ind = "Weekly Time Series";
        else if(this.query.interval === 'TIME_SERIES_MONTHLY')
            ind = "Monthly Time Series";
        try {
            let res = await axios(`https://www.alphavantage.co/query?function=${this.query.interval}&symbol=${this.query.stock}${this.query.interval==='TIME_SERIES_INTRADAY'?'&interval=60min':''}&apikey=PIL6RRYKZIXM4NEW`);
            res = res['data'][ind];
            let keys = Object.keys(res);
            let obj = {};
            
            let pages = 0; 
            //keys.length / 20 is parts/pages of data after dividing it into chunks of twenty
            while(keys.length/20>0){
                let rows = [];
                let k = keys.splice(0,20); //get first 20 entries

                k.forEach(key => {
                    
                    obj = {
                        'timestamp': key,
                        'open': res[key]["1. open"],
                        'high': res[key]["2. high"],
                        'low': res[key]["3. low"],
                        'close': res[key]["4. close"],
                        'volume': res[key]["5. volume"]
                    }
                    rows.push(obj);
                });

                this.data[pages] = rows;
                pages++;
            }
            //if some enties are still left add those to data
            if(keys.length > 0){
                keys.forEach(key => {

                    obj = {
                        'timestamp': key,
                        'open': res[key]["1. open"],
                        'high': res[key]["2. high"],
                        'low': res[key]["3. low"],
                        'close': res[key]["4. close"],
                        'volume': res[key]["5. volume"]
                    }
                    rows.push(obj);
                });

                this.data[pages] = rows;
            }

            this.pages = this.data.length;
        } catch (error) {
            this.data = 0;
        }
    }
}
