"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[243],{89243:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return ButtonColored}});var _index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(41942);__webpack_require__(67294),__webpack_require__(83078);let coloredShades=_index_js__WEBPACK_IMPORTED_MODULE_2__.b`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.d)("light",90)};
    }

    :hover {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.d)("light",70)};
        }
    }

    :active {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.d)("light",50)};
        }
    }
`,coloredRed=_index_js__WEBPACK_IMPORTED_MODULE_2__.b`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.red};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.red};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.red};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.red};
    }

    ${coloredShades}
`,coloredGreen=_index_js__WEBPACK_IMPORTED_MODULE_2__.b`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.green};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.green};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.green};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.green};
    }

    ${coloredShades}
`,coloredBlue=_index_js__WEBPACK_IMPORTED_MODULE_2__.b`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.blue};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.blue};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.blue};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.blue};
    }

    ${coloredShades}
`,coloredYellow=_index_js__WEBPACK_IMPORTED_MODULE_2__.b`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.yellow};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.yellow};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.yellow};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.e.yellow};
    }

    ${coloredShades}
`,getColored=color2=>{switch(color2){case"red":return coloredRed;case"green":return coloredGreen;case"blue":return coloredBlue;case"yellow":return coloredYellow;default:return}},ButtonColoredStyled$1=(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.f)(_index_js__WEBPACK_IMPORTED_MODULE_2__.h)`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.d)("dark",0)};
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

    ${({color:color2})=>color2&&getColored(color2)}
`,{ButtonColoredStyled}={ButtonColoredStyled:ButtonColoredStyled$1},ButtonColored=({color:color2,...props})=>(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.i)(ButtonColoredStyled,{color:color2,...props})}}]);