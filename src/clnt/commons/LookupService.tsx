
import * as axios from 'axios';

import {baseUrl} from '../commons/AppState'



export default class LookupService {
    //@observable
    static products = null

    //@observable
    static categorys = null

    public static async loadLookups(urls) {
        console.log("loading lookups");
        //let promises = urls.map(LookupService.loadlu) // call getImage on each array element and return array of promises
        for (var i = 0; i < urls.length; i++) {
            try {
                console.log("awaiting " + urls[i])
                await LookupService.loadlu(urls[i])
                console.log(LookupService[urls[i]])
            } catch (err) {
                console.warn("Could not load lookup ")
            }
        }
    }

     public static  getLookup(name: string):any {
        if (!LookupService[name]) {
            return this.loadlu("categorys").then(
                x => { return x }
            )
        }
        return LookupService[name];
    }

    public static loadlu(url: string) {
        return axios
            .get(baseUrl + url + "Lookup")
            .then(response => {
                let data: any = response.data
                LookupService[url] = data.results
                //console.log("categorys" + this.categorys);
                //return LookupService[url];
            })
            .catch(error => console.log(error));
    }

}