window._ = require('lodash')

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery')
    require('bootstrap')

    require('admin-lte/plugins/datatables/jquery.dataTables.min.js')
    require('admin-lte/plugins/datatables-responsive/js/dataTables.responsive.js')

    require('admin-lte/plugins/overlayScrollbars/js/OverlayScrollbars.js')
    require('admin-lte/plugins/bs-stepper/js/bs-stepper.js')
    require('admin-lte/plugins/select2/js/select2.js')
    require('admin-lte/plugins/bootstrap-switch/js/bootstrap-switch.js')

    require('admin-lte')
} catch (e) {}
