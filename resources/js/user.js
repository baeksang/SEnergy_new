'use strict'
$(document).ready(function () {

    resetUserSitesTable()
    resetRole()
    resetLevel()
    resetRegion()


    // $('input[data-bootstrap-switch]').bootstrapSwitch()
    if (modifiable === true) {
        document.getElementById('userMenu').children[2].style.display = 'block'
    } else {
        document.getElementById('userMenu').children[2].style.display = 'none'
    }

    // $('a[id="navSettings"]').on('show.bs.tab', function (e) {
    //     e.target // newly activated tab
    //     e.relatedTarget // previous active tab
    //     console.log('test')
    //     console.log(userRole)
    //     if (
    //         userRole != null &&
    //         userLevel == null &&
    //         userRegions.length == 0 &&
    //         userSites.length == 0
    //     ) {
    //         $('#select-role option').each(function () {
    //             if (this.value == userRole['id']) {
    //                 $('#select-role option[value=' + userRole['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //                 let id = userRole['id']
    //             }
    //         })
    //     } else if (
    //         userRole != [] &&
    //         userLevel != null &&
    //         userRegions.length == 0 &&
    //         userSites.length == 0
    //     ) {
    //         document.getElementById('userLevel').style.display = 'block'
    //         $('#select-role option').each(function () {
    //             if (this.value == userRole['id']) {
    //                 $('#select-role option[value=' + userRole['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //         document.getElementById('userLevel').style.display = 'block'
    //         $('#select-level option').each(function () {
    //             if (this.value == userLevel['id']) {
    //                 $('#select-level option[value=' + userLevel['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //     } else if (
    //         userRole != [] &&
    //         userLevel != null &&
    //         userRegions.length != 0 &&
    //         userSites.length == 0
    //     ) {
    //         $('#select-role option').each(function () {
    //             if (this.value == userRole['id']) {
    //                 $('#select-role option[value=' + userRole['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //         document.getElementById('userLevel').style.display = 'block'
    //         $('#select-level option').each(function () {
    //             if (this.value == userLevel['id']) {
    //                 $('#select-level option[value=' + userLevel['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //         document.getElementById('userRegion').style.display = 'block'
    //         $('#select-region option').remove()
    //         userRegions.forEach(function (item, index) {
    //             $('#select-region').append(
    //                 '<option value=' +
    //                     item.id +
    //                     '>' +
    //                     item.region_name +
    //                     '</option>'
    //             )
    //             $('#select-region option[value=' + item.id + ']')
    //                 .prop('selected', 'selected')
    //                 .change()
    //         })
    //     } else if (
    //         userRole != [] &&
    //         userLevel != null &&
    //         userRegions.length != 0 &&
    //         userSites.length != 0
    //     ) {
    //         $('#select-role option').each(function () {
    //             if (this.value == userRole['id']) {
    //                 $('#select-role option[value=' + userRole['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //         document.getElementById('userLevel').style.display = 'block'
    //         $('#select-level option').each(function () {
    //             if (this.value == userLevel['id']) {
    //                 $('#select-level option[value=' + userLevel['id'] + ']')
    //                     .prop('selected', 'selected')
    //                     .change()
    //             }
    //         })
    //         document.getElementById('userRegion').style.display = 'block'
    //         $('#select-region option').remove()
    //         userRegions.forEach(function (item, index) {
    //             $('#select-region').append(
    //                 '<option value=' +
    //                     item.id +
    //                     '>' +
    //                     item.region_name +
    //                     '</option>'
    //             )
    //             $('#select-region option[value=' + item.id + ']')
    //                 .prop('selected', 'selected')
    //                 .change()
    //         })
    //     }

    //     $('#select-region').on('change', function (e) {
    //         let userRoleid = $('#select-role option:selected').val()
    //         let userRegionid = $('#select-region option:selected').val()

    //         if (userRoleid == '3') {
    //             let userRegionSelected = document.querySelectorAll(
    //                 '#select-region option:checked'
    //             )
    //             let userRegionsid = Array.from(userRegionSelected).map(
    //                 el => el.value
    //             )
    //             let userRegionsName = Array.from(userRegionSelected).map(
    //                 el => el.text
    //             )

    //             document.getElementById('userAccess').style.display = 'block'
    //             // select-region ?????? ????????? region_code ??? ???????????? site ??? ?????? ??? ????????? filter ???  ajax ??? ????????????
    //             // site ????????? ??? ??????????????? loop??? ????????? filter ??? ??????
    //             if (typeof userRegionid != 'undefined') {
    //                 $.ajax({
    //                     // ?????? headers ??? ????????? token??? ??????????????? ??????. .!!!!!
    //                     headers: {
    //                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
    //                             'content'
    //                         )
    //                     },
    //                     type: 'POST',
    //                     url: '/admin/users/userAccess',
    //                     data: {
    //                         userRegionsid: JSON.stringify(userRegionsid)
    //                     },
    //                     traditional: true,
    //                     success: function (data) {
    //                         let userAssignedSites = data['userSites']
    //                         if (
    //                             typeof userAssignedSites == 'undefined' ||
    //                             userAssignedSites == []
    //                         ) {
    //                             $('#userEditTable tbody')
    //                                 .children()
    //                                 .remove()
    //                             return
    //                         } else {
    //                             let userEditTableTbody = ''
    //                             userAssignedSites.forEach(function (
    //                                 item,
    //                                 index
    //                             ) {
    //                                 let userAccessOption = ''
    //                                 if (item.operation_type == 'tracking') {
    //                                     accesses.forEach(function (
    //                                         item,
    //                                         index
    //                                     ) {
    //                                         userAccessOption =
    //                                             userAccessOption +
    //                                             '<option value=" ' +
    //                                             item.id +
    //                                             ' ">' +
    //                                             item.name +
    //                                             '</option>'
    //                                     })
    //                                 } else {
    //                                     accesses.forEach(function (
    //                                         item,
    //                                         index
    //                                     ) {
    //                                         if (item.name != 'control') {
    //                                             userAccessOption =
    //                                                 userAccessOption +
    //                                                 '<option value=" ' +
    //                                                 item.id +
    //                                                 ' ">' +
    //                                                 item.name +
    //                                                 '</option>'
    //                                         }
    //                                     })
    //                                 }
    //                                 userEditTableTbody =
    //                                     userEditTableTbody + '<tr>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.id +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.site_name +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.region_name +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.site_code +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td class="project-state"><select name="accesses[' +
    //                                     item.id +
    //                                     '][]" id="select-access' +
    //                                     item.id +
    //                                     '" class="select2_access" multiple="multiple" data-placeholder="Select a Access Role" style="width: 100%;">' +
    //                                     userAccessOption +
    //                                     '</select></td>'
    //                                 userEditTableTbody += '</tr>'
    //                             })
    //                             $('#userEditTable tbody')
    //                                 .children()
    //                                 .remove()
    //                             $('#userEditTable tbody').append(
    //                                 userEditTableTbody
    //                             )   //                             $('.select2_access').select2({
    //                                 minimumSelectionLength: 1,
    //                                 width: '100%'
    //                             })
    //                         }
    //                     },
    //                     error: function (data) {
    //                         alert('error')
    //                     },
    //                     complete: function (data) {}
    //                 })
    //             } else {
    //                 $('#userEditTable tbody')
    //                     .children()
    //                     .remove()
    //                 document.getElementById('userAccess').style.display = 'none'
    //             }
    //         } else if (userRoleid == '4') {
    //             let userRegionSelected = document.querySelectorAll(
    //                 '#select-region option:checked'
    //             )
    //             let userRegionsid = Array.from(userRegionSelected).map(
    //                 el => el.value
    //             )
    //             let userRegionsName = Array.from(userRegionSelected).map(
    //                 el => el.text
    //             )

    //             document.getElementById('userAccess').style.display = 'block'
    //             // select-region ?????? ????????? region_code ??? ???????????? site ??? ?????? ??? ????????? filter ???  ajax ??? ????????????
    //             // site ????????? ??? ??????????????? loop??? ????????? filter ??? ??????
    //             // console.log(userRegionid)
    //             if (typeof userRegionid != 'undefined') {
    //                 $.ajax({
    //                     // ?????? headers ??? ????????? token??? ??????????????? ??????. .!!!!!
    //                     headers: {
    //                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
    //                             'content'
    //                         )
    //                     },
    //                     type: 'POST',
    //                     url: '/admin/users/userAccess',
    //                     data: {
    //                         userRegionsid: JSON.stringify(userRegionsid)
    //                     },
    //                     traditional: true,
    //                     success: function (data) {
    //                         let userAssignedSites = data['userSites']
    //                         if (
    //                             typeof userAssignedSites == 'undefined' ||
    //                             userAssignedSites == []
    //                         ) {
    //                             $('#userEditTable tbody')
    //                                 .children()
    //                                 .remove()
    //                             return
    //                         } else {
    //                             let userEditTableTbody = ''
    //                             userAssignedSites.forEach(function (
    //                                 item,
    //                                 index
    //                             ) {
    //                                 let userAccessOption = ''
    //                                 accesses.forEach(function (item, index) {
    //                                     if (item.name != 'control') {
    //                                         userAccessOption =
    //                                             userAccessOption +
    //                                             '<option value=" ' +
    //                                             item.id +
    //                                             ' ">' +
    //                                             item.name +
    //                                             '</option>'
    //                                     }
    //                                 })

    //                                 userEditTableTbody =
    //                                     userEditTableTbody + '<tr>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.id +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.site_name +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.region_name +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td>' +
    //                                     item.site_code +
    //                                     '</td>'
    //                                 userEditTableTbody =
    //                                     userEditTableTbody +
    //                                     '<td class="project-state"><select name="accesses[' +
    //                                     item.id +
    //                                     '][]" id="select-access' +
    //                                     item.id +
    //                                     '" class="select2_access" multiple="multiple" data-placeholder="Select a Access Role" style="width: 100%;">' +
    //                                     userAccessOption +
    //                                     '</select></td>'
    //                                 userEditTableTbody += '</tr>'
    //                             })
    //                             $('#userEditTable tbody')
    //                                 .children()
    //                                 .remove()
    //                             $('#userEditTable tbody').append(
    //                                 userEditTableTbody
    //                             )
    //                             $('.select2_access').select2({
    //                                 minimumSelectionLength: 1,
    //                                 width: '100%'
    //                             })
    //                         }
    //                     },
    //                     error: function (data) {
    //                         alert('error')
    //                     },
    //                     complete: function (data) {}
    //                 })
    //             } else {
    //                 $('#userEditTable tbody')
    //                     .children()
    //                     .remove()
    //                 document.getElementById('userAccess').style.display = 'none'
    //             }
    //         }
    //     })

    //     $('#select-level').on('change', function (e) {
    //         let userRoleid = $('#select-role option:selected').val()
    //         let userLevelid = $('#select-level option:selected').val()

    //         if (userRoleid == '1') {
    //             document.getElementById('userRegion').style.display = 'block'
    //             $('#select-region option').remove()
    //             regions.forEach(function (item, index) {
    //                 if (item.id == 1) {
    //                     $('#select-region').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.region_name +
    //                             '</option>'
    //                     )
    //                 }
    //             })
    //         } else if (userRoleid == '2') {
    //             document.getElementById('userRegion').style.display = 'block'
    //             $('#select-region option').remove()
    //             regions.forEach(function (item, index) {
    //                 if (item.id !== 1) {
    //                     $('#select-region').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.region_name +
    //                             '</option>'
    //                     )
    //                 }
    //             })
    //         } else if (userRoleid == '3') {
    //             document.getElementById('userRegion').style.display = 'block'
    //             $('#select-region option').remove()
    //             $('#userEditTable tbody')
    //                 .children()
    //                 .remove()
    //             loginUserRegions.forEach(function (item, index) {
    //                 $('#select-region').append(
    //                     '<option value=' +
    //                         item.region_id +
    //                         '>' +
    //                         item.regionName +
    //                         '</option>'
    //                 )
    //             })
    //         } else if (userRoleid == '4') {
    //             document.getElementById('userRegion').style.display = 'block'
    //             $('#select-region option').remove()
    //             $('#userEditTable tbody')
    //                 .children()
    //                 .remove()
    //             loginUserRegions.forEach(function (item, index) {
    //                 $('#select-region').append(
    //                     '<option value=' +
    //                         item.region_id +
    //                         '>' +
    //                         item.regionName +
    //                         '</option>'
    //                 )
    //             })
    //         } else if (
    //             typeof userRoleid != 'undefined' &&
    //             typeof userLevelid == 'undefined'
    //         ) {
    //             document.getElementById('userRegion').style.display = 'none'
    //         }
    //     })

    //     $('#select-role').on('change', function (e) {
    //         let userRoleid = $(this).val()
    //         document.getElementById('userLevel').style.display = 'none'
    //         document.getElementById('userRegion').style.display = 'none'

    //         // when "admin" is selected as userRole
    //         if (userRoleid == '1') {
    //             document.getElementById('userLevel').style.display = 'block'
    //             document.getElementById('userRegion').style.display = 'none'
    //             $('#select-level option').remove()
    //             levels.forEach(function (item, index) {
    //                 if (item.id.toString() === userRoleid.toString()) {
    //                     $('#select-level').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.name +
    //                             '</option>'
    //                     )
    //                 }
    //             })
    //             // when "manager" is selected as userRole
    //         } else if (userRoleid == '2') {
    //             document.getElementById('userLevel').style.display = 'block'

    //             $('#select-level option').remove()
    //             levels.forEach(function (item, index) {
    //                 if (item.id.toString() === userRoleid.toString()) {
    //                     $('#select-level').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.name +
    //                             '</option>'
    //                     )
    //                 }
    //             })

    //             // when "service_operator" is selected as userRole
    //         } else if (userRoleid == '3') {
    //             document.getElementById('userLevel').style.display = 'block'

    //             $('#select-level option').remove()
    //             levels.forEach(function (item, index) {
    //                 if (item.name === 'site') {
    //                     $('#select-level').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.name +
    //                             '</option>'
    //                     )
    //                 }
    //             })
    //         } else if (userRoleid == '4') {
    //             document.getElementById('userLevel').style.display = 'block'

    //             $('#select-level option').remove()
    //             levels.forEach(function (item, index) {
    //                 if (item.name === 'site') {
    //                     $('#select-level').append(
    //                         '<option value=' +
    //                             item.id +
    //                             '>' +
    //                             item.name +
    //                             '</option>'
    //                     )
    //                 }
    //             })
    //         } else if (userRoleid == '5') {
    //             $('#select-level option:selected')
    //                 .prop('selected', false)
    //                 .change()
    //             document.getElementById('userRegion').style.display = 'none'
    //             document.getElementById('userLevel').style.display = 'none'
    //         } else if (typeof userRoleid == 'undefined') {
    //             document.getElementById('userRegion').style.display = 'none'
    //             document.getElementById('userLevel').style.display = 'none'
    //         }
    //     })
    // })

    // $('#roleSubmit').click(function () {
    //     // e.preventDefault();
    //     let count_role = $('#select-role option:selected').length
    //     let count_level = $('#select-level option:selected').length
    //     let count_access = $('#select-access option:selected').length
    //     let count_region = $('#select-region option:selected').length

    //     /*
    //      * level_key ????????? LEVEL ?????? ????????? ?????? ????????????. (?????????????????? ????????? ????????? )
    //      * DB role ??? id ????????? ???????????? ???????????? DB id ?????? ???????????? ??? ????????? ?????????????????????.
    //      * (????????? ?????? ????????? ????????? ????????? ????????????.)
    //      * level_key == 6 => SITE
    //      * level_key == 7 => Region
    //      */

    //     if (count_role == 0) {
    //         alert('Role ????????? ????????? ??? ?????? ??????????????? ?????????.')
    //         return false
    //     } else if (count_level == 0 && userRole['name'] != 'user') {
    //         alert('Level ????????? ????????? ??? ?????? ??????????????? ?????????.')
    //         return false
    //     } else if (
    //         count_region == 0 &&
    //         userRole['name'] != 'operator' &&
    //         userRole['name'] != 'user'
    //     ) {
    //         alert('Region ????????? ????????? ??? ?????? ??????????????? ?????????.')
    //         return false
    //     } else {
    //         return true
    //     }

    //     $(this + 'input[type=checkbox]:not(:checked)').each(function () {
    //         // set value 0 and check it
    //         $(this)
    //             .find('input[type=checkbox]:not(:checked)')
    //             .prop('checked', true)
    //             .val(0)
    //     })
    // })
    // $('#approvalSubmit').click(function () {
    //     var userApproval = $('input:checkbox[name=approvalCheckbox]:checked')
    //         .length
    //     alert(userApproval)

    //     $.ajax({
    //         headers: {
    //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //         },
    //         method: 'POST',
    //         url: "{{ route('admin.users.approvalUser') }}",
    //         data: {
    //             userApproval: userApproval,
    //             user_id: user.id
    //         },
    //         success: function (result) {
    //             alert('?????? ?????? ????????? ?????? ???????????????.')
    //             if (result['approved'] == 0) {
    //                 $('#userApprovalStatus').text('?????????')
    //                 $('input:checkbox[name=approvalCheckbox]:checked').is(
    //                     ':checked'
    //                 ) == false
    //             } else if (result['approved'] == 1) {
    //                 $('#userApprovalStatus').text('??????')
    //                 $('input:checkbox[name=approvalCheckbox]:checked').is(
    //                     ':checked'
    //                 ) == true
    //             }
    //         },
    //         complete: function (result) {}
    //     })
    // })

    // let userRegionSelected = document.querySelectorAll(
    //     '#select-region option:checked'
    // )
    // console.log(userRegionSelected)

    // var modalCloses = document.getElementsByClassName('modalCloseBtn')
    // for (var i = 0; i < modalCloses.length; i++) {
    //     modalCloses[i].addEventListener('click', function (e) {
    //         closeModal()
    //     })
    // }

    // document.getElementById('editUser').addEventListener('click', function (e) {
    //     editUser()
    // })
})


$('#roleSubmit').click(function (e) {
    e.preventDefault();
    let count_role = $('#select-role option:selected').length
    let count_level = $('#select-level option:selected').length
    let count_access = $('#select-access option:selected').length
    let count_region = $('#select-region option:selected').length

    /*
        * level_key ????????? LEVEL ?????? ????????? ?????? ????????????. (?????????????????? ????????? ????????? )
        * DB role ??? id ????????? ???????????? ???????????? DB id ?????? ???????????? ??? ????????? ?????????????????????.
        * (????????? ?????? ????????? ????????? ????????? ????????????.)
        * level_key == 6 => SITE
        * level_key == 7 => Region
        */

    if (count_role == 0) {
        alert('Role ????????? ????????? ??? ?????? ??????????????? ?????????.')
        return false
    } else if (count_level == 0 && userRole['name'] != 'user') {
        alert('Level ????????? ????????? ??? ?????? ??????????????? ?????????.')
        return false
    } else if (
        count_region == 0 &&
        userRole['name'] != 'operator' &&
        userRole['name'] != 'user'
    ) {
        alert('Region ????????? ????????? ??? ?????? ??????????????? ?????????.')
        return false
    } else {
        return true
    }

    $(this + 'input[type=checkbox]:not(:checked)').each(function () {
        // set value 0 and check it
        $(this)
            .find('input[type=checkbox]:not(:checked)')
            .prop('checked', true)
            .val(0)
    })
})

$(document).on('click', '.modalCloseBtn', function (e) {
    $('#modal-lg').modal('hide')
})

$(document).on('click', '#editUser', function (e) {
    $('#modal-lg').modal('show')
    initializeModalPage()
})


$(document).on('change', '#select-role', function (e) {
    var R_ACTIVATION = false;
    if (this.value === '1') {
        $('#select-level option[value="1"]')
            .prop('selected', 'selected')
            .change()
        $('#select-region option[value="1"]')
            .prop('selected', 'selected')
            .change()
        R_ACTIVATION = true
    } else if (this.value === '2') {
        // console.log(this.value)
        // console.log('manager ?????????.')
        $('#select-level option:selected').prop('selected', false)
        $('#select-region option:selected').prop('selected', false)
    } else if (this.value === '3') {
        // console.log(this.value)
    } else if (this.value === '4') {
        // console.log(this.value)
    } else if (this.value === '5') {
        // console.log(this.value)
        // console.log('user ?????????.')
        R_ACTIVATION = true
    } else {
        resetLevel()
        resetRegion()
    }
    // $('#select-level').prop("readonly", R_ACTIVATION)
    // $('#select-region').prop("readonly", R_ACTIVATION)


    $('#select-level').prop("disabled", R_ACTIVATION)
    $('#select-region').prop("disabled", R_ACTIVATION)

})

$(document).on('change', '#select-level', function (e) {
    var ACTIVATION = false
    if (this.value === '1') {
        $('#select-region option[value="1"]')
        .prop('selected', 'selected')
            .change()
        ACTIVATION =  true
    } else if (this.value === '2' || this.value === '3' ) {
        $('#select-region option[value="1"]').prop('disabled',true);
        ACTIVATION = false
    } else if (this.value === "") {
        resetRegion()
    }
    $('#select-region').prop("disabled", ACTIVATION)
})


$(document).on('change', '#select-region', function (e) {
    var selectedLevel = $('#select-level option:selected').val()
    var selectedRegion = $('.select2_region').select2("val");
    if (selectedRegion.length != 0) {
        if (selectedLevel === '3' && selectedRegion !== '1') {

            if (selectedRegion != 'undefined' || selectedRegion != null) {
                var rr = makeUserEditTable(selectedRegion)
                if (rr.length != 0) {
                    console.log(rr)
                    document.getElementById("userAccess").style.display = "block"
                    userEditTable(rr)

                } else {
                    console.log("?????????")
                    document.getElementById("userAccess").style.display = "none"
                    alert("?????? ??????(???)??? ????????? ????????? ????????????.")
                }
            } else {
                document.getElementById("userAccess").style.display = "none"
            }
        }
    } else {
        $('#userEditTable tbody').children().remove();
        document.getElementById("userAccess").style.display = "none"
    }
})

function checkSelectedRole () {
    let userRegionSelected = document.querySelectorAll(
        '#select-region option:checked'
    )
}

function initializeModalPage() {
    if (user.approved != 0) {
        $('input[data-bootstrap-switch]').bootstrapSwitch('state', true)
    } else {
        $('input[data-bootstrap-switch]').bootstrapSwitch('state', false)
    }
    $('#select-role').val("")
    $('#select-level').val("")
    $('#select-region').val("")
    $('#select-role option[value=' + userRole['id'] + ']')
        .prop('selected', 'selected')
        .change()
    $('#select-level option[value=' + userLevel['id'] + ']')
        .prop('selected', 'selected')
        .change()
    userRegions.forEach(function (item, index) {
        $('#select-region option[value=' + item.id + ']')
            .prop('selected', 'selected')
            .change()
    })
}

function resetRole() {
    $('.select2_role').val("").select2({
        minimumSelectionLength: 1,
        maximumSelectionLength: 1,
        width: '100%'
    })
}

function resetLevel () {
    $('#select-level').val("").select2({
        minimumSelectionLength: 1,
        maximumSelectionLength: 1,
        width: '100%'
    })
}

function resetRegion() {
    $('#select-region').val("").select2({
        minimumSelectionLength: 1,
        width: '100%'
    })
}
function resetSelect2Access() {
    $('.select2_access').select2({
        minimumSelectionLength: 1,
        width: '100%'
    });
}

function resetUserSitesTable() {
    $('#userSitesTable').DataTable({
        responsive: true,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 1, targets: 1 },
            { targets: [2, 3, 4], className: 'dt-body-right' }
        ],
        lengthChange: false,
        autoWidth: false,
        ordering: true,
        searching: false,
        paging: false
    })
}

function resetUserEditTable() {
    $('#userEditTable').DataTable({
        destroy: true,
        retrieve: true,
        responsive: true,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 1, targets: 1 },
            { targets: [2,3,4], className: 'dt-body-right' }
        ],
        lengthChange: false,
        autoWidth: false,
        ordering: true,
        searching: false,
        paging: false,
    })
}

function makeUserEditTable(data) {

    let results
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: "POST",
        url: "/api/accessableSite",
        async: false, // async ????????? false ?????? ajax??? ???????????? ?????? ??????????????? ???????????? ??????.
        data: {
            region: data
        },
        success: function (data) {
            results = data
        },
        error: function(data) {
            alert("error");
        },
        complete: function(data) {
            // resetSelect2Access();
        }
    })

    return results
}

function userEditTable(data) {

    // datatable ????????? ????????? ???????????? ????????? ?????? ?????? ?????? ?????????. reinitial error ????????? ??????
    if ($.fn.DataTable.isDataTable( '#userEditTable' ) ) {
        $('#userEditTable').DataTable().destroy()
    }

    /*
     * 1. userEditTable tbody ??? ????????? ?????????.
     */
    $("#userEditTable thead").children().remove();
    $("#userEditTable tbody").children().remove();

    var tr_obj0 = document.createElement("tr"); //
    var td_obj1 = document.createElement("td"); //
    var td_obj2 = document.createElement("td"); //
    var td_obj3 = document.createElement("td"); //
    var td_obj4 = document.createElement("td"); //
    var td_obj5 = document.createElement("td"); //

    td_obj1.innerHTML = "?????????";
    td_obj2.innerHTML = "??????";
    td_obj3.innerHTML = "??????";
    td_obj4.innerHTML = "??????";
    td_obj5.innerHTML = "??????";

    //td??? tr??? ?????? -> td??? tr??? ??????????????? ??????????????????.
    tr_obj0.appendChild(td_obj1);
    tr_obj0.appendChild(td_obj2);
    tr_obj0.appendChild(td_obj3);
    tr_obj0.appendChild(td_obj4);
    tr_obj0.appendChild(td_obj5);

    //????????? ???????????? ????????? ????????? ??????????????? ?????????.

    var table = document.getElementById("userEditTable"); //???????????? ???????????? ??????

    //3?????? ?????? ????????? ???????????? ??????????????????.(tbody??? 2????????? ????????? ??????)
    var thead = table.children[0];
    //????????? ?????????.
    thead.appendChild(tr_obj0);


    data.forEach(function (item, index, array) {
        var tr_obj0 = document.createElement("tr");
        var td_obj1 = document.createElement("td");
        var td_obj2 = document.createElement("td");
        var td_obj3 = document.createElement("td");
        var td_obj4 = document.createElement("td");
        var td_obj5 = document.createElement("td");

        td_obj1.innerHTML = item['site_name'];
        td_obj2.innerHTML = item['region_name'];
        if(item['operation_type'] == "tracking"){
            // accesses.forEach(function(item,index) {})
            td_obj3.innerHTML = '<input type="checkbox" name="userAccessChx" value="monitoring" >'
                td_obj4.innerHTML = '<input type="checkbox" name="userAccessChx" value="subscribe" >'
                td_obj5.innerHTML = '<input type="checkbox" name="userAccessChx" value="control" >'
        } else {
            // accesses.forEach(function (item, index) {if (item.name != "control") {}})
            td_obj3.innerHTML = '<input type="checkbox" name="userAccessChx" value="monitoring" >'
            td_obj4.innerHTML = '<input type="checkbox" name="userAccessChx" value="subscribe" >'
            td_obj5.innerHTML = '<input type="checkbox" name="userAccessChx" value="control" disabled>'
        }
        //td??? tr??? ?????? -> td??? tr??? ??????????????? ??????????????????.
        tr_obj0.appendChild(td_obj1);
        tr_obj0.appendChild(td_obj2);
        tr_obj0.appendChild(td_obj3);
        tr_obj0.appendChild(td_obj4);
        tr_obj0.appendChild(td_obj5);
        //????????? ???????????? ????????? ????????? ??????????????? ?????????.
        var table = document.getElementById("userEditTable"); //???????????? ???????????? ??????

        //3?????? ?????? ????????? ???????????? ??????????????????.(tbody??? 2????????? ????????? ??????)
        var tbody = table.children[1];
        //????????? ?????????.
        tbody.appendChild(tr_obj0);
    })

    resetUserEditTable()
}


// $('input[data-bootstrap-switch]').on('switchChange.bootstrapSwitch', function (e, data) {
//     e.preventDefault();
//     console.log(data)
//     // $('input[data-bootstrap-switch]').bootstrapSwitch('state', !data, true);
//     $('#showModal').modal({
//         backdrop: 'static',
//         keyboard: false
//     });
// });
// $(".modal-footer .btn-primary").click(function(){
//     $('input[data-bootstrap-switch]').bootstrapSwitch('toggleState', true, true);
//     $('#showModal').modal('hide')
// })


