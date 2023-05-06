webpackJsonp([11], {
    "3FJK": function(t, e) {},
    fch6: function(t, e, a) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = a("AGz/")
          , s = a.n(i)
          , n = a("vBBC")
          , c = {
            data: function() {
                return {
                    advancedExamples: n.a,
                    selectedList: [],
                    logoImg: s.a
                }
            },
            created: function() {
                for (var t = this.advancedExamples[0].items, e = 0; e < t.length; e++) {
                    var a = t[e];
                    this.selectedList.push({
                        name: a.meta.title,
                        selected: !1,
                        sourcePrice: a.sourcePrice
                    })
                }
            },
            computed: {
                totalPrice: function() {
                    for (var t = 0, e = 0; e < this.selectedList.length; e++)
                        this.selectedList[e].selected && (t += this.selectedList[e].sourcePrice);
                    return t
                }
            },
            methods: {
                basiclistEvent: function() {
                    window.open("/basiccategorylist")
                },
                advancelistEvent: function() {
                    window.open("/advancedlist")
                },
                handleCommand1: function(t) {
                    "basicprice" == t ? window.open("/basicprice") : window.open("/buyexplan")
                },
                handleCommand2: function(t) {
                    "api1" == t ? window.open("https://cesium.com/learn/cesiumjs/ref-doc/") : "api2" == t ? window.open("http://cesium.xin/cesium/cn/Documentation1.72/index.html") : window.open("http://42.192.134.169:8090/xt3dapi/index.html")
                },
                exportSlectedList: function() {
                    var t = "xt3d 高级应用购买￥：" + this.totalPrice + "\n";
                    this.selectedList.forEach(function(e) {
                        e.selected && (t += e.name + "￥：" + e.sourcePrice + "\n")
                    });
                    var e = document.createElement("a");
                    e.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)),
                    e.setAttribute("download", "xt3d高级应用购买功能清单" + (new Date).getTime() + ".txt"),
                    e.style.display = "none",
                    document.body.appendChild(e),
                    e.click(),
                    document.body.removeChild(e)
                }
            }
        }
          , o = {
            render: function() {
                var t = this
                  , e = t.$createElement
                  , a = t._self._c || e;
                return a("div", {
                    staticClass: "app-home"
                }, [a("div", {
                    staticClass: "app-header"
                }, [a("div", {
                    staticClass: "app-logo-container"
                }, [a("img", {
                    staticClass: "app-logo",
                    attrs: {
                        src: t.logoImg
                    }
                }), t._v(" "), a("span", {
                    staticClass: "app-title"
                }, [t._v("xt3d高级应用购买")])]), t._v(" "), a("div", {
                    staticClass: "action-container"
                }, [a("span", {
                    staticClass: "action-item",
                    on: {
                        click: t.basiclistEvent
                    }
                }, [t._v("基础实例")]), t._v(" "), a("span", {
                    staticClass: "action-item",
                    on: {
                        click: t.advancelistEvent
                    }
                }, [t._v("高级应用")]), t._v(" "), a("el-dropdown", {
                    on: {
                        command: t.handleCommand2
                    }
                }, [a("span", {
                    staticClass: "el-dropdown-link action-item"
                }, [t._v("\n          相关文档\n          "), a("i", {
                    staticClass: "el-icon-arrow-down el-icon--right"
                })]), t._v(" "), a("el-dropdown-menu", {
                    attrs: {
                        slot: "dropdown"
                    },
                    slot: "dropdown"
                }, [a("el-dropdown-item", {
                    attrs: {
                        command: "api3"
                    }
                }, [t._v("xt3d-SDK文档")]), t._v(" "), a("el-dropdown-item", {
                    attrs: {
                        command: "api1"
                    }
                }, [t._v("CESIUM官网文档")]), t._v(" "), a("el-dropdown-item", {
                    attrs: {
                        command: "api2"
                    }
                }, [t._v("CESIUM中文文档")])], 1)], 1), t._v(" "), a("el-dropdown", {
                    on: {
                        command: t.handleCommand1
                    }
                }, [a("span", {
                    staticClass: "el-dropdown-link action-item"
                }, [t._v("\n          xt3d购买\n          "), a("i", {
                    staticClass: "el-icon-arrow-down el-icon--right"
                })]), t._v(" "), a("el-dropdown-menu", {
                    attrs: {
                        slot: "dropdown"
                    },
                    slot: "dropdown"
                }, [a("el-dropdown-item", {
                    attrs: {
                        command: "basicprice"
                    }
                }, [t._v("基础实例购买")]), t._v(" "), a("el-dropdown-item", {
                    attrs: {
                        command: "buyexplan"
                    }
                }, [t._v("购买说明")])], 1)], 1)], 1)]), t._v(" "), t._m(0), t._v(" "), a("div", {
                    staticClass: "part-price"
                }, [a("div", {
                    staticClass: "part-price-item"
                }, [t._m(1), t._v(" "), a("div", t._l(t.advancedExamples[0].items, function(e, i) {
                    return a("div", {
                        key: e.meta.title,
                        staticClass: "category-name"
                    }, [a("el-checkbox", {
                        model: {
                            value: t.selectedList[i].selected,
                            callback: function(e) {
                                t.$set(t.selectedList[i], "selected", e)
                            },
                            expression: "selectedList[index].selected"
                        }
                    }, [a("span", [t._v(t._s(e.meta.title))]), t._v(" "), a("span", [t._v("￥：" + t._s(e.sourcePrice))])])], 1)
                }), 0)]), t._v(" "), a("div", {
                    staticClass: "part-price-item"
                }, [a("div", {
                    staticStyle: {
                        margin: "10px 0px",
                        "font-size": "20px"
                    }
                }, [a("span", [t._v("当前所选功能：")]), t._v(" "), a("span", {
                    staticStyle: {
                        color: "rgb(255, 102, 0)",
                        "font-size": "26px"
                    }
                }, [t._v("￥：" + t._s(t.totalPrice))]), t._v(" "), t._l(t.selectedList, function(e, i) {
                    return a("div", {
                        key: i
                    }, [e.selected ? a("div", {
                        staticStyle: {
                            "font-size": "16px",
                            color: "#409EFF"
                        }
                    }, [t._v(t._s(e.name))]) : t._e()])
                })], 2), t._v(" "), a("div", {
                    staticClass: "btn-export",
                    on: {
                        click: t.exportSlectedList
                    }
                }, [t._v("导出所选列表")])])]), t._v(" "), t._m(2)])
            },
            staticRenderFns: [function() {
                var t = this
                  , e = t.$createElement
                  , a = t._self._c || e;
                return a("div", {
                    staticClass: "buy-explain"
                }, [a("div", {
                    staticClass: "buy-type"
                }, [t._v("xt3d高级应用购买")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "30px"
                    }
                }, [t._v("购前须知")]), t._v(" "), a("div", {
                    staticStyle: {
                        display: "flex",
                        "justify-content": "center"
                    }
                }, [a("div", {
                    staticStyle: {
                        "text-align": "left"
                    }
                }, [a("div", {
                    staticStyle: {
                        "margin-top": "5px"
                    }
                }, [t._v("1.所有价格公开透明，所有客户一视同仁，不会针对客户随意更改。")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "5px"
                    }
                }, [t._v("2.以下价格随时发生变化，最终解释权归我方所有。")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "5px"
                    }
                }, [t._v("3.高级应用目前只提供源码购买。")]), t._v(" "), a("div", {
                    staticStyle: {
                        "margin-top": "5px"
                    }
                }, [t._v("4.价格不含税，如需开票（增值税普通发票），购买前请先告知。")])])])])
            }
            , function() {
                var t = this.$createElement
                  , e = this._self._c || t;
                return e("div", {
                    staticStyle: {
                        "font-size": "20px"
                    }
                }, [e("span", [this._v("高级应用列表")])])
            }
            , function() {
                var t = this
                  , e = t.$createElement
                  , i = t._self._c || e;
                return i("div", {
                    staticClass: "contcat-container"
                }, [i("div", {
                    staticClass: "link-text1"
                }, [t._v("联系方式")]), t._v(" "), i("div", {
                    staticClass: "contcat-item"
                }, [i("img", {
                    attrs: {
                        src: a("/2Ld")
                    }
                }), t._v(" "), i("div", [t._v("微信：xt3d2021")])]), t._v(" "), i("div", {
                    staticClass: "contcat-item"
                }, [i("img", {
                    attrs: {
                        src: a("JCyr")
                    }
                }), t._v(" "), i("div", [t._v("QQ：1911074953")])]), t._v(" "), i("div", {
                    staticClass: "link-text2"
                }, [t._v("友情链接")]), t._v(" "), i("div", {
                    staticClass: "contcat-item"
                }, [i("div", {
                    staticClass: "link-a"
                }, [i("a", {
                    attrs: {
                        href: "https://cesium.com/platform/cesiumjs/",
                        target: "_blank"
                    }
                }, [t._v("CESIUM官网")]), t._v(" "), i("a", {
                    attrs: {
                        href: "https://sandcastle.cesium.com/index.html",
                        target: "_blank"
                    }
                }, [t._v("CESIUM官网实例")]), t._v(" "), i("a", {
                    attrs: {
                        href: "https://cesium.com/docs/cesiumjs-ref-doc/",
                        target: "_blank"
                    }
                }, [t._v("CESIUM官网文档")]), t._v(" "), i("a", {
                    attrs: {
                        href: "http://cesium.xin/cesium/cn/Documentation1.72/",
                        target: "_blank"
                    }
                }, [t._v("CESIUM中文文档")])]), t._v(" "), i("div", {
                    staticClass: "link-a"
                }, [i("a", {
                    attrs: {
                        href: "http://www.marsgis.cn/index.html",
                        target: "_blank"
                    }
                }, [t._v("火星科技")]), t._v(" "), i("a", {
                    attrs: {
                        href: "https://www.supermap.com/",
                        target: "_blank"
                    }
                }, [t._v("北京超图")]), t._v(" "), i("a", {
                    attrs: {
                        href: "https://earthsdk.com/",
                        target: "_blank"
                    }
                }, [t._v("西部世界")]), t._v(" "), i("a", {
                    attrs: {
                        href: "http://www.freexgis.com/",
                        target: "_blank"
                    }
                }, [t._v("恒歌科技")])])])])
            }
            ]
        };
        var l = a("VU/8")(c, o, !1, function(t) {
            a("3FJK")
        }, "data-v-7f380d1c", null);
        e.default = l.exports
    }
});
