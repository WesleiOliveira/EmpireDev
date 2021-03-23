import {
    api,
    LightningElement,
    wire,
    track
} from "lwc";
import GetProduct2 from "@salesforce/apex/QuoteLineItemController.GetProduct2";

export default class QuoteLineItem extends LightningElement {
    @api recordId;
    @api objectName;

    @track viewSpiner = false;
    @track ProductList = [];
    @track ProductId;
    @track viewComboelement = false;
    @track ElementId;
    @track viewCombobrand = false;
    @track Brandid;
    @track viewComboSubelement = false;
    @track SubElementId;
    @track urlProd;
    @track urlElem;
    @track viewurlProd = false;
    @track viewurlElem = false;

    @wire(GetProduct2)
    record({
        error,
        data
    }) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            this.ProductList = data;
        }
    }
    get ProductOptions() {
        var returnOptions = [];
        if (this.ProductList) {
            this.ProductList.forEach((ele) => {
                returnOptions.push({
                    label: ele.Name,
                    value: ele.Id
                });
            });
        }
        console.log(JSON.stringify(returnOptions));
        return returnOptions;
    }
    handleProduct(event) {
        this.viewurlProd = false;
        this.viewComboelement = false;
        this.viewCombobrand = false;
        this.ElementId = undefined;
        this.ProductId = event.detail.value;
        this.ProductList.forEach((P) => {
            if (P.Id === this.ProductId) {
                this.urlProd = P.DisplayUrl 
                if (P.DisplayUrl !== undefined) {
                    this.viewurlProd = true;
                }
            }
        })
        alert(event.target.value)
    }
  
}