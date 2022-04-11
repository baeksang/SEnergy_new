// require('./admin-lte')

$(document).ready(function () {
    $('#usersTable').DataTable({
        responsive: true,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 },
            { targets: [2, 3], className: 'dt-body-right' }
        ],
        lengthChange: false,
        autoWidth: false,
        ordering: true,
        searching: false,
        paging: false
    })
})
