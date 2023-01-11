"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[132],{44132:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return ButtonColored}});var _index_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(41942);__webpack_require__(67294),__webpack_require__(83078);let coloredShades=_index_js__WEBPACK_IMPORTED_MODULE_2__.C`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("light",90)};
    }

    :hover {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("light",70)};
        }
    }

    :active {
        :after {
            background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("light",50)};
        }
    }
`,coloredRed=_index_js__WEBPACK_IMPORTED_MODULE_2__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.red};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.red};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.red};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.red};
    }

    ${coloredShades}
`,coloredGreen=_index_js__WEBPACK_IMPORTED_MODULE_2__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.green};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.green};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.green};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.green};
    }

    ${coloredShades}
`,coloredBlue=_index_js__WEBPACK_IMPORTED_MODULE_2__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.blue};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.blue};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.blue};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.blue};
    }

    ${coloredShades}
`,coloredYellow=_index_js__WEBPACK_IMPORTED_MODULE_2__.C`
    background-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.yellow};
    border-color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.yellow};
    color: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.yellow};

    :focus {
        box-shadow: 0px 0px 0px 2px ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.paleCerulean};
    }

    svg {
        fill: ${_index_js__WEBPACK_IMPORTED_MODULE_2__.c.yellow};
    }

    ${coloredShades}
`,getColored=color2=>{switch(color2){case"red":return coloredRed;case"green":return coloredGreen;case"blue":return coloredBlue;case"yellow":return coloredYellow;default:return}},ButtonColoredStyled$1=(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.s)(_index_js__WEBPACK_IMPORTED_MODULE_2__.B)`
    :after {
        background-color: ${(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.g)("dark",0)};
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
`,{ButtonColoredStyled}={ButtonColoredStyled:ButtonColoredStyled$1},ButtonColored=({color:color2,...props})=>(0,_index_js__WEBPACK_IMPORTED_MODULE_2__.j)(ButtonColoredStyled,{color:color2,...props})}}]);