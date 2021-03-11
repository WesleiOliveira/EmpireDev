import GetProduct2 from "@salesforce/apex/QuoteLineItemController.GetProduct2";

function ListProduct() {
    GetProduct2()
    .then(result => {
        return result
    })
    .catch(error => {
        return error;
    })
}
export {ListProduct}