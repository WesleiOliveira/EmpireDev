import {
    api,
    LightningElement,
    wire,
    track
} from "lwc";
import GetProduct2 from "@salesforce/apex/QuoteLineItemController.GetProduct2";
import GetElement from "@salesforce/apex/QuoteLineItemController.GetElement";
import GetBrand from "@salesforce/apex/QuoteLineItemController.GetBrand";
import GetSubElement from "@salesforce/apex/QuoteLineItemController.GetSubElement";

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
    @track viewurlProd = false;

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
        GetElement({}).then((result) => {
            this.ElementList = result;
            this.viewComboelement = true;
        });
    }
    get ElementOptions() {
        var returnOptions = [];
        if (this.ElementList) {
            this.ElementList.forEach((ele) => {
                returnOptions.push({
                    label: ele.Name,
                    value: ele.Id
                });
            });
        }
        console.log(JSON.stringify(returnOptions));
        return returnOptions;
    }
    handleElement(evt) {
        this.viewCombobrand = false;
        this.ElementId = evt.detail.value;
        alert(this.ElementId);
        GetSubElement()
            .then(result => {
                this.SubElementList = result;
                this.viewComboSubelement= true;
            })
    }
    get SubElementOptions() {
        var returnOptions = [];
        if (this.SubElementList) {
            this.SubElementList.forEach((ele) => {
                returnOptions.push({
                    label: ele.Name,
                    value: ele.Id
                });
            });
        }
        console.log(JSON.stringify(returnOptions));
        return returnOptions;
    }
    handleSubElement(evt) {
        this.SubElementId = evt.detail.value;
        alert(this.Brandid);
        GetBrand({
            recordId: this.ElementId
        })
        .then(result => {
            this.BrandList = result;
            this.viewCombobrand= true;
        })
    }
    get BrandOptions() {
        var returnOptions = [];
        if (this.BrandList) {
            this.BrandList.forEach((ele) => {
                returnOptions.push({
                    label: ele.Name,
                    value: ele.Id
                });
            });
        }
        console.log(JSON.stringify(returnOptions));
        return returnOptions;
    }
    handleBrand(evt) {
        this.Brandid = evt.detail.value;
        alert(this.Brandid);
    }
}