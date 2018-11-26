var automobiletemplate=`
<table class="stufftable" onclick=filter('$(manufacturer)')>
    <tr>
        <td>$(name)</td>
    </tr>
    <tr>
        <td>Manufacturer</td>
        <td>$(manufacturer)</td>
    </tr>
    <tr>
        <td>Consumption</td>
        <td>$(consumption)</td>
    </tr>
    <tr>
        <td>Color</td>
        <td>$(color)</td>
    </tr>
    <tr>
        <td>Available</td>
        <td>$(available)</td>
    </tr>
    <tr>
        <td>Horsepower</td>
        <td>$(horsepower)</td>
    </tr>
    <tr>
        <td>Year</td>
        <td>$(year)</td>
    </tr>
`;

function pastetable(template,data){
    var generatedtable=template;
    for(var key in data){
        console.log(data);
        var count= template.split(key).length;
        for(var i=0;i<count;i++)
            {generatedtable = generatedtable.replace("$("+key+")",data[key])}


    }
    return generatedtable;
}
function getcars(){
    jQuery("#cont1").empty();
    jQuery.get('/cars',function(cardata){
        for(var car of cardata){
            $("#cont1").append(pastetable(automobiletemplate,car));
        }
    })
}
function init(){
    getcars();
    jQuery.get('/manufacturerNames', function(names){
        jQuery('#manufacturerSelector').empty();
        for(var man of names){
            jQuery('#manufacturerSelector').append('<option>'+man+'</option>')
        }
    });
    jQuery('#carform').submit(function (e){ //eventhandler
        e.preventDefault();
        $.ajax({
            url:'/addCar',
            type:'post',
            data:$('#carform').serialize(),
            success:function () {
                alert("Car added.")
            },
            error: function () {
                alert("Car exists already.")
            }
        })
})
}
function filter(MaN){
    document.cookie="name="+MaN;
    jQuery.ajax({
        url:'/manufacturer',
        type:'get',
        success:function(cars){
            jQuery('#cont1').empty();
            for(var auto of cars){
                jQuery('#cont1').append(pastetable(automobiletemplate,auto));
            }
        }
    })
}