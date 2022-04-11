'use strict'

// require('./admin-lte')
// // require('./adminlte_plugin')

// require('admin-lte/plugins/bootstrap/js/bootstrap')
// require('admin-lte/plugins/select2/js/select2.js')
// require('admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.js')
// require('admin-lte/plugins/datatables/jquery.dataTables.min.js')
// require('admin-lte/plugins/datatables-responsive/js/dataTables.responsive.js')

$(document).ready(function () {
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

    $('#userEditTable').DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
        ordering: true
    })

    $('.select2_role').select2({
        maximumSelectionLength: 1,
        width: '100%'
    })

    $('.select2_level').select2({
        maximumSelectionLength: 1,
        width: '100%'
    })

    $('.select2_region').select2({
        width: '100%'
    })

    $('input[data-bootstrap-switch-1]').bootstrapSwitch()
    if (user.approved != 0) {
        $('input[data-bootstrap-switch-1]').bootstrapSwitch('state', true)
    } else {
        $('input[data-bootstrap-switch-1]').bootstrapSwitch('state', false)
    }

    $('input[data-bootstrap-switch]').bootstrapSwitch()
    if (user.approved != 0) {
        $('input[data-bootstrap-switch]').bootstrapSwitch('state', true)
    } else {
        $('input[data-bootstrap-switch]').bootstrapSwitch('state', false)
    }

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
    //             // select-region 에서 선택된 region_code 에 해당하는 site 만 그릴 수 있도록 filter 나  ajax 로 걸러낸다
    //             // site 정보는 다 가져오므로 loop를 돌면서 filter 를 하자
    //             if (typeof userRegionid != 'undefined') {
    //                 $.ajax({
    //                     // 아래 headers 에 반드시 token을 추가해줘야 한다. .!!!!!
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
    //             // select-region 에서 선택된 region_code 에 해당하는 site 만 그릴 수 있도록 filter 나  ajax 로 걸러낸다
    //             // site 정보는 다 가져오므로 loop를 돌면서 filter 를 하자
    //             // console.log(userRegionid)
    //             if (typeof userRegionid != 'undefined') {
    //                 $.ajax({
    //                     // 아래 headers 에 반드시 token을 추가해줘야 한다. .!!!!!
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
    //      * level_key 값으로 LEVEL 에서 선택한 값을 확인한다. (불안정하지만 일단은 이렇게 )
    //      * DB role 의 id 값으로 확인하는 것이므로 DB id 값이 수정되면 이 부분도 수정되어야한다.
    //      * (의존성 없는 구조로 수정이 앞으로 필요하다.)
    //      * level_key == 6 => SITE
    //      * level_key == 7 => Region
    //      */

    //     if (count_role == 0) {
    //         alert('Role 권한은 최소한 한 개를 선택하여야 합니다.')
    //         return false
    //     } else if (count_level == 0 && userRole['name'] != 'user') {
    //         alert('Level 권한은 최소한 한 개를 선택하여야 합니다.')
    //         return false
    //     } else if (
    //         count_region == 0 &&
    //         userRole['name'] != 'operator' &&
    //         userRole['name'] != 'user'
    //     ) {
    //         alert('Region 권한은 최소한 한 개를 선택하여야 합니다.')
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
    //             alert('회원 승인 정보가 변경 되었습니다.')
    //             if (result['approved'] == 0) {
    //                 $('#userApprovalStatus').text('미승인')
    //                 $('input:checkbox[name=approvalCheckbox]:checked').is(
    //                     ':checked'
    //                 ) == false
    //             } else if (result['approved'] == 1) {
    //                 $('#userApprovalStatus').text('승인')
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

    $(document).on('click', '.modalCloseBtn', function (e) {
        $('#modal-lg').modal('hide')
    })

    $(document).on('click', '#editUser', function (e) {
        $('#modal-lg').modal('show')
        initializeModalPage()
    })
})

function checkSelectedRole () {
    let userRegionSelected = document.querySelectorAll(
        '#select-region option:checked'
    )
}

function initializeModalPage () {
    $('#select-role option[value=' + userRole['id'] + ']')
        .prop('selected', 'selected')
        .change()

    $('#select-level option[value=' + userLevel['id'] + ']')
        .prop('selected', 'selected')
        .change()

    // userRegion.forEach
    // $('#select-region option[value=' + userLevel['id'] + ']')
    //     .prop('selected', 'selected')
    //     .change()

    console.log(userRegions)

    userRegions.forEach(function (item, index) {
        $('#select-region option[value=' + item.id + ']')
            .prop('selected', 'selected')
            .change()

        // $('#select-level').append(
        //     '<option value=' + item.id + '>' + item.name + '</option>'
        // )
    })
}
