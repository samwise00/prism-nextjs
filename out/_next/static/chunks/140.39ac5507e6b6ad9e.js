"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[140],{26140:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return ButtonCustom}});var _index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(41942);__webpack_require__(67294),__webpack_require__(83078);let ButtonCustomStyled$1=(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.s)(_index_js__WEBPACK_IMPORTED_MODULE_2__.B)`
    background-color: ${p=>{var _a;return null==(_a=p.customize)?void 0:_a.backgroundColor}};

    span {
        color: ${p=>{var _a;return null==(_a=p.customize)?void 0:_a.textColor}};
        font-size: ${p=>{var _a;return(null==(_a=p.customize)?void 0:_a.fontSize)+"px"}};
    }

    svg {
        fill: ${p=>{var _a;return null==(_a=p.customize)?void 0:_a.textColor}};
    }

    :after {
        background-color: transparent;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        transition: all 0.3s ease;
        width: 100%;
        z-index: 0;
    }

    :hover {
        background-color: ${p=>{var _a;return null==(_a=p.customize)?void 0:_a.backgroundColor}};

        :after {
            background-color: ${p=>{var _a;return(null==(_a=p.customize)?void 0:_a.onHover)==="lighten"?(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("light",20):(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("dark",20)}};
        }
    }

    :active {
        :after {
            background-color: ${p=>{var _a;return(null==(_a=p.customize)?void 0:_a.onHover)==="lighten"?(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("light",40):(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("dark",40)}};
        }
    }
`,{ButtonCustomStyled}={ButtonCustomStyled:ButtonCustomStyled$1},ButtonCustom=({customize,...props})=>(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.j)(ButtonCustomStyled,{customize,...props})}}]);