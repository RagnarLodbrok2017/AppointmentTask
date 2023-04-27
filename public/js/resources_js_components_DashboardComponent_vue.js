"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_DashboardComponent_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../Helpers/SwalHelper */ "./resources/js/Helpers/SwalHelper.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AppointmentComponent",
  created: function created() {
    this.fetchDoctors();
    this.fetchPatients();
    this.fetchAppointments();
  },
  components: {},
  mounted: function mounted() {},
  data: function data() {
    return {
      appointments: [],
      doctors: [],
      patients: [],
      base_url: base_url,
      addForm: {},
      editForm: {},
      form: {},
      Checked: '',
      searchTerm: '',
      addFormErrors: {},
      editFormErrors: {}
    };
  },
  methods: {
    fetchDoctors: function fetchDoctors() {
      var _this = this;
      axios.get(base_url + 'api/doctors').then(function (response) {
        _this.doctors = response.data.doctors;
      })["catch"](function (error) {
        _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no data loaded');
      });
    },
    fetchPatients: function fetchPatients() {
      var _this2 = this;
      axios.get(base_url + 'api/patients').then(function (response) {
        _this2.patients = response.data.patients;
      })["catch"](function (error) {
        _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no albums loaded');
      });
    },
    fetchAppointments: function fetchAppointments() {
      var _this3 = this;
      axios.get(base_url + 'api/appointments').then(function (response) {
        _this3.appointments = response.data.appointments;
      })["catch"](function (error) {
        _Helpers_SwalHelper__WEBPACK_IMPORTED_MODULE_0__["default"].errorWithMessage('no albums loaded');
      });
    },
    storeMethod: function storeMethod(FormData) {
      var _this4 = this;
      axios.post(base_url + 'api/appointments/', FormData).then(function (response) {
        response.data.patient ? _this4.appointments.push(response.data.patient) : null;
        _this4.addFormErrors = response.data.errors;
      })["catch"](function (error) {
        _this4.addFormErrors = error.response.data.errors;
      });
    },
    editMethod: function editMethod(data) {
      this.editForm = data;
      this.editFormErrors = null;
    },
    updateMethod: function updateMethod(FormData) {
      var _this5 = this;
      axios.put(base_url + 'api/appointments/' + FormData.id, FormData).then(function (response) {
        if (response.data) {
          Object.assign(FormData, response.data.patient);
        }
      })["catch"](function (error) {
        _this5.editFormErrors = error.response.data.errors;
        _this5.fetchDoctors();
      });
    },
    deleteMethod: function deleteMethod(id) {
      var _this6 = this;
      if (id) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this setting!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
          if (result.isConfirmed) {
            axios["delete"](base_url + 'api/appointments/' + id).then(function (response) {
              _this6.appointments = _this6.appointments.filter(function (appointment) {
                return appointment.id !== id;
              });
              _this6.fetchPatients();
              _this6.fetchAppointments();
              SwalHelper.successWithMessage(response.data.message);
            })["catch"](function (error) {
              Notification.errorWithMessage(error.response.data.message);
            });
          }
        });
      }
    }
  },
  computed: {
    AppointmentsSearchFilter: function AppointmentsSearchFilter() {
      var _this7 = this;
      if (!this.searchTerm) {
        return this.appointments;
      } else {
        return this.appointments.filter(function (appointment) {
          return appointment.number.toLowerCase().includes(_this7.searchTerm.toLowerCase());
        });
      }
    }
  },
  watch: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("h4", {
    staticClass: "card-title"
  }, [_vm._v("Consultations")]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-9"
  }, [_c("div", {
    staticClass: "form-check"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.Checked,
      expression: "Checked"
    }],
    staticClass: "form-check-input",
    attrs: {
      type: "radio",
      value: "patients"
    },
    domProps: {
      checked: _vm._q(_vm.Checked, "patients")
    },
    on: {
      change: function change($event) {
        _vm.Checked = "patients";
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "form-check-label",
    attrs: {
      "for": "flexRadioDefault1"
    }
  }, [_vm._v("\n                            Tous Les Patients\n                        ")])]), _vm._v(" "), _c("div", {
    staticClass: "form-check"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.Checked,
      expression: "Checked"
    }],
    staticClass: "form-check-input",
    attrs: {
      type: "radio",
      value: "doctors",
      checked: ""
    },
    domProps: {
      checked: _vm._q(_vm.Checked, "doctors")
    },
    on: {
      change: function change($event) {
        _vm.Checked = "doctors";
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "form-check-label",
    attrs: {
      "for": "flexRadioDefault2"
    }
  }, [_vm._v("\n                            Tous Les Medecins\n                        ")])]), _vm._v(" "), _c("div", {
    staticClass: "form-check"
  }, [_c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.Checked,
      expression: "Checked"
    }],
    staticClass: "form-check-input",
    attrs: {
      type: "radio",
      value: "appointments"
    },
    domProps: {
      checked: _vm._q(_vm.Checked, "appointments")
    },
    on: {
      change: function change($event) {
        _vm.Checked = "appointments";
      }
    }
  }), _vm._v(" "), _c("label", {
    staticClass: "form-check-label",
    attrs: {
      "for": "flexRadioDefault3"
    }
  }, [_vm._v("\n                                Tous Les RDVs\n                            ")])])]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c("p", {
    staticClass: "card-title-desc"
  }), _vm._v(" "), _vm.Checked == "appointments" ? _c("table", {
    staticClass: "table table-bordered dt-responsive nowrap",
    staticStyle: {
      "border-collapse": "collapse",
      "border-spacing": "0",
      width: "100%"
    },
    attrs: {
      id: "datatable"
    }
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.appointments, function (appointment, index) {
    return _c("tr", {
      key: appointment.id
    }, [_c("td", [_vm._v(" " + _vm._s(appointment.number))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(appointment.date))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(appointment.time))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(appointment.doctor_code))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(appointment.patient_code))])]);
  }), 0)]) : _vm.Checked == "doctors" ? _c("table", {
    staticClass: "table table-bordered dt-responsive nowrap",
    staticStyle: {
      "border-collapse": "collapse",
      "border-spacing": "0",
      width: "100%"
    },
    attrs: {
      id: "datatable"
    }
  }, [_vm._m(2), _vm._v(" "), _c("tbody", _vm._l(_vm.doctors, function (doctor, index) {
    return _c("tr", {
      key: doctor.id
    }, [_c("td", [_vm._v(" " + _vm._s(doctor.name))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(doctor.code))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(doctor.telephone))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(doctor.date_hired))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(doctor.speciality))])]);
  }), 0)]) : _vm.Checked == "patients" ? _c("table", {
    staticClass: "table table-bordered dt-responsive nowrap",
    staticStyle: {
      "border-collapse": "collapse",
      "border-spacing": "0",
      width: "100%"
    },
    attrs: {
      id: "datatable"
    }
  }, [_vm._m(3), _vm._v(" "), _c("tbody", _vm._l(_vm.patients, function (patient, index) {
    return _c("tr", {
      key: patient.id
    }, [_c("td", [_vm._v(" " + _vm._s(patient.name))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(patient.code))]), _vm._v(" "), _c("td", [_vm._v(" " + _vm._s(patient.date_of_birth))]), _vm._v(" "), _c("td", [patient.sex === "male" ? _c("p", {
      staticClass: "font-monospace"
    }, [_vm._v("M")]) : patient.sex === "female" ? _c("p", {
      staticClass: "font-monospace"
    }, [_vm._v("F")]) : _vm._e()])]);
  }), 0)]) : _vm._e()])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "col-3"
  }, [_c("button", {
    staticClass: "btn btn-primary"
  }, [_vm._v("VALIDER")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("Numero")]), _vm._v(" "), _c("th", [_vm._v("Date")]), _vm._v(" "), _c("th", [_vm._v("Heure")]), _vm._v(" "), _c("th", [_vm._v("Medecin")]), _vm._v(" "), _c("th", [_vm._v("Patient")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("Nom")]), _vm._v(" "), _c("th", [_vm._v("Code")]), _vm._v(" "), _c("th", [_vm._v("Telephone")]), _vm._v(" "), _c("th", [_vm._v("Date")]), _vm._v(" "), _c("th", [_vm._v("Specialite")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", [_vm._v("Nom")]), _vm._v(" "), _c("th", [_vm._v("Code")]), _vm._v(" "), _c("th", [_vm._v("Date Naissance")]), _vm._v(" "), _c("th", [_vm._v("Sexe")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/Helpers/SwalHelper.js":
/*!********************************************!*\
  !*** ./resources/js/Helpers/SwalHelper.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SwalHelper = /*#__PURE__*/function () {
  function SwalHelper() {
    _classCallCheck(this, SwalHelper);
  }
  _createClass(SwalHelper, [{
    key: "success",
    value: function success() {
      Swal.fire({
        title: 'success!',
        text: 'Successfully Done!',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        willClose: true,
        showCloseButton: false,
        showCancelButton: false,
        toast: true
      });
    }
  }, {
    key: "alert",
    value: function alert() {
      Swal.fire({
        title: 'alert!',
        icon: 'alert',
        text: 'Are you sure?!',
        timer: 1000,
        timerProgressBar: true
      });
    }
  }, {
    key: "error",
    value: function error() {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 1000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warning",
    value: function warning() {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: 'Oops Wrong!',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "Image_validation",
    value: function Image_validation() {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Uploaded image big than 2MB!',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "exist",
    value: function exist() {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: 'This Item is exist',
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "successWithMessage",
    value: function successWithMessage(message) {
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "errorWithMessage",
    value: function errorWithMessage(message) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warningWithMessage",
    value: function warningWithMessage(message) {
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "successWithTitleAndMessage",
    value: function successWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "errorWithTitleAndMessage",
    value: function errorWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }, {
    key: "warningWithTitleAndMessage",
    value: function warningWithTitleAndMessage(title, message) {
      Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        timer: 2000,
        timerProgressBar: true
      });
    }
  }]);
  return SwalHelper;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwalHelper = new SwalHelper());

/***/ }),

/***/ "./resources/js/components/DashboardComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/DashboardComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true& */ "./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true&");
/* harmony import */ var _DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DashboardComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "01ab55f4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DashboardComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DashboardComponent_vue_vue_type_template_id_01ab55f4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/DashboardComponent.vue?vue&type=template&id=01ab55f4&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);