var manftemplate=`
<table class="stufftable">
    <tr>
        <td>Name</td>
        <td>$(name)</td>
    </tr>
    <tr>
        <td>Country</td>
        <td>$(country)</td>
    </tr>
    <tr>
        <td>Founded</td>
        <td>$(founded)</td>
    </tr>
</table>
`;

function initm(){
    jQuery.get('/manufacturers',function(manufacturers){
        console.log(manufacturers);
        jQuery("#cont2").empty();
        for(var manufacturer of manufacturers){
            jQuery("#cont2").append(pastetable(manftemplate,manufacturer));
        }
    });
    $('#manfform').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/addManufacturers',
            type:'post',
            data:$('#manfform').serialize(),
            success:function(){
                alert("Manufacturer added");
            },
            error: function(e) {
                alert("Manufacturer exists already");
            }
        });
    });
}
