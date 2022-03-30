require('./adminlte_plugin');


$(document).ready(function() {
    $('.select2_role').select2({
        maximumSelectionLength: 1,
        width: '100%',
    });

    $('.select2_region').select2({
        maximumSelectionLength: 1,
        width: '100%',
    });

    resetSelector();
    $("#select-role").on('change', function(e){
        resetSelector();
    });
})


function resetSelector() {
    var selectedRole = $('#select-role option:selected').val();
    var selectionLength = 1

    if( selectedRole == 1) {
        $('#select-region option').remove();
        regions.forEach(function(item, index) {
            if(item.region_code == "KR-00"){
                $('#select-region').append("<option value="+ item.region_code +">"+ item.region_name +"</option>");
                $('#select-region option[value='+ item.region_code + ']').prop('selected', 'selected').change();
            }
        });

    } else if( selectedRole == 2 || selectedRole == 3 || selectedRole == 4 ){
        $('#select-region option').remove();
        regions.forEach(function(item, index) {
            if(item.id !== 1){
                $('#select-region').append("<option value=" + item.region_code + ">" + item.region_name + "</option>");
                selectionLength = item.length
            }
        });
        if (selectedRole != 2) {
            selectionLength = 1
        }
    } else {
        $('.select-role').val("").select2();
        $('.select-region').val("").select2();
    }
    $('.select2_region').select2({
        maximumSelectionLength: selectionLength,
        width: '100%',
    });
}
