public with sharing class QuoteLineItemController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> GetProduct2(){
        return  [SELECT Id, Name, DisplayUrl FROM Product2];
    }
    @AuraEnabled(cacheable=true)
    public static List<Element__c> GetElement(){
        return  [SELECT Id, Name, Image__c FROM Element__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<SubElement__c> GetSubElement(){
        return  [SELECT Id, Name FROM SubElement__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<Brand__c> GetBrand(String recordId){
        List<String> lsIds = new List<String>();
        List<element_brand__c> ls = [SELECT Id, Brand__c FROM element_brand__c WHERE Element__c = :recordId];
        for(element_brand__c E :ls){
            lsIds.add(E.Brand__c);
        }
        return  [SELECT Id, Name FROM Brand__c WHERE Id in :lsIds];
    }
}