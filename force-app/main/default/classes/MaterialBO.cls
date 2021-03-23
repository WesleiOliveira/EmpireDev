public with sharing class MaterialBO {
    @future
    public static void deleteQuantity(String IdItemQuot){
        QuoteLineItem itQuot = [SELECT Id, Quantity FROM QuoteLineItem WHERE Id = :IdItemQuot];
        update itQuot;
    }
}