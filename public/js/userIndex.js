(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/userIndex"],{

/***/ "./resources/js/userIndex.js":
/*!***********************************!*\
  !*** ./resources/js/userIndex.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
// require('./admin-lte')
$(document).ready(function () {
  $('#usersTable').DataTable({
    responsive: true,
    columnDefs: [{
      responsivePriority: 1,
      targets: 0
    }, {
      responsivePriority: 2,
      targets: -1
    }, {
      targets: [2, 3],
      className: 'dt-body-right'
    }],
    lengthChange: false,
    autoWidth: false,
    ordering: true,
    searching: false,
    paging: false
  });
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["js/vendor"], () => (__webpack_exec__("./resources/js/userIndex.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);