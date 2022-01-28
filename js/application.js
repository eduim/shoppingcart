var reducer = (previousValue, currentValue) => previousValue + currentValue;

var subTotalCalculation = function(ele){
    var unitprice = parseFloat($(ele).children('.unitprice').text());
    var quantity = parseFloat($(ele).find('.quantity input').val());
        
    var subtotalprice = quantity * unitprice;
    $(ele).children('.subtotal').html(subtotalprice);
    return subtotalprice;
};

var updateSubtotalsAndTotal = function(){
    subtotalprod = [];
    
    $('.product').each(function(i,ele){
        var subtotal = subTotalCalculation(ele)
        subtotalprod.push(Number(subtotal))
    })
    
    var totalproducts = subtotalprod.reduce(reducer)
    $('#totalprice').html(totalproducts);

    return totalproducts;
};


$(document).ready(function () {
    
    updateSubtotalsAndTotal()
  
    $(document).on('click','.btn.remove', function (event) {
        $(this).closest('.product').remove();
        updateSubtotalsAndTotal();
    
    });

    $('#buttonadd').on('click',function(event){
        event.preventDefault();
        var nameProduct = $('#itemnew').find('.nameadd input').val();
        var priceProduct = $('#itemnew').find('.unitpriceadd input').val();
        $('#maintable').append('<div class="row product">'+
        '<div class="name col-sm-2">'+nameProduct+'</div>'+
        '<div class="unitprice col-sm-2">'+priceProduct+'</div>'+
        '<div class="quantity col-sm-2"><input type="number" value="3" /></div>'+
        '<div class="remove col-sm-2"><button class="btn btn-light btn-sm button remove">remove</button></div>'+
        '<div class="subtotal col-sm-2"></div>')
    });

    var timeout;
    $(document).on('input','body input',function(){
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            updateSubtotalsAndTotal();    
        },200);
    });
});


//div:nth-child(2) div:last-child
