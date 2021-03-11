const campos = {
    Product: Product(),
    view: view()
}
function view(){
    return {
        UrlProduct: ''
    }
}

function Product(){
    return [{
        label: '',
        value: '',
        Url: ''
    }]
}

export {campos}