import { LightningElement, wire, api, track } from 'lwc';
import { campos } from './model/Variables.js'
import { ListProduct } from './Controller/Product.js'
import GetProduct2 from "@salesforce/apex/QuoteLineItemController.GetProduct2";
export default class ImputItemQuote extends LightningElement {
    @api recordId
    @track campos = campos
    @wire(GetProduct2)
    record({
        error,
        data
    }) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            let opt = [];
            data.forEach((ele) => {
                opt.push({
                    label: ele.Name,
                    value: ele.Id,
                    Url: ele.DisplayUrl
                });
            });
            this.campos.Product = opt;
        }
    }

    handleProduct(evt){
        this.campos.Product.forEach(ele =>{
            if(ele.value === evt.target.value){
                this.campos.view.UrlProduct = ele.Url
            }
        })
    }
}