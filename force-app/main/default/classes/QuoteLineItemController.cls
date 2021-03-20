public with sharing class QuoteLineItemController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> GetProduct2(){
        return  [SELECT Id, Name, DisplayUrl FROM Product2];
    }

  
}