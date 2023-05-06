webpackJsonp([13], {
    XmOO: function(t, s) {},
    lxxm: function(t, s, a) {
        "use strict";
        Object.defineProperty(s, "__esModule", {
            value: !0
        });
        var i = {
            init: function(t) {
                this.initViewer(t),
                this.load3dtiles(),
                this.setView()
            },
            initViewer: function(t) {
                this.viewer = new Cesium.Viewer(t,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    navigation: !1,
                    animation: !1,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    shouldAnimate: !1,
                    fullscreenButton: !1,
                    skyAtmosphere: !1,
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A"
                    }),
                    contextOptions: {
                        webgl: {
                            alpha: !0
                        }
                    }
                }),
                this.viewer.scene.skyBox.show = !1,
                this.viewer.scene.backgroundColor = new Cesium.Color(0,0,0,0),
                this.viewer.scene.sun.show = !1,
                this.viewer.scene.moon.show = !1;
                var s = this.viewer.scene.globe;
                s.depthTestAgainstTerrain = !0,
                s.showGroundAtmosphere = !1,
                s.baseColor = Cesium.Color.TRANSPARENT,
                s.translucency.enabled = !0,
                s.undergroundColor = void 0,
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            load3dtiles: function() {
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: appConfig.dataServiceBaseUrl + "3dtiles/shihua/tileset.json"
                }))
            },
            setView: function() {
                this.viewer.scene.camera.setView({
                    destination: {
                        x: -2474376.1106489943,
                        y: 4839045.37413846,
                        z: 3327607.6769630876
                    },
                    orientation: {
                        heading: .5325955547945078,
                        pitch: -.6436055168802803,
                        roll: .0019052835188517747
                    },
                    duration: 1
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , e = {
            data: function() {
                return {
                    animate: !1,
                    alarmList: [{
                        date: "01.20",
                        time: "15:20",
                        level: "中",
                        state: "未处理"
                    }, {
                        date: "01.20",
                        time: "17:33",
                        level: "中",
                        state: "已处理"
                    }, {
                        date: "01.20",
                        time: "13:32",
                        level: "低",
                        state: "未处理"
                    }, {
                        date: "01.20",
                        time: "15:23",
                        level: "高",
                        state: "未处理"
                    }, {
                        date: "02.12",
                        time: "15:32",
                        level: "中",
                        state: "未处理"
                    }, {
                        date: "04.11",
                        time: "11:20",
                        level: "中",
                        state: "未处理"
                    }, {
                        date: "04.20",
                        time: "15:20",
                        level: "低",
                        state: "已处理"
                    }, {
                        date: "03.20",
                        time: "13:34",
                        level: "低",
                        state: "未处理"
                    }, {
                        date: "05.20",
                        time: "15:44",
                        level: "中",
                        state: "未处理"
                    }],
                    goodsOrderList: [94, 88, 85, 82, 78, 74]
                }
            },
            mounted: function() {
                this.initChart1(),
                this.initChart2(),
                i.init("cesium-container"),
                this.initScroll();
                var t = document.documentElement
                  , s = t.requestFullScreen || t.webkitRequestFullScreen || t.mozRequestFullScreen || t.msRequestFullscreen;
                void 0 !== s && s && s.call(t)
            },
            methods: {
                initChart1: function() {
                    echarts.init(document.getElementById("info01")).setOption({
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b}: {c} "
                        },
                        series: [{
                            name: "设备状态",
                            type: "pie",
                            selectedMode: "single",
                            radius: ["50%", "70%"],
                            clockwise: !1,
                            label: {
                                normal: {
                                    position: "outside",
                                    color: "white"
                                }
                            },
                            data: [{
                                value: 590,
                                name: "停用",
                                itemStyle: {
                                    color: "#70F3FF"
                                }
                            }, {
                                value: 705,
                                name: "故障",
                                itemStyle: {
                                    color: "#2DAAEF"
                                }
                            }, {
                                value: 1800,
                                name: "使用中",
                                itemStyle: {
                                    color: "#062265"
                                }
                            }]
                        }]
                    })
                },
                initChart2: function() {
                    echarts.init(document.getElementById("info02")).setOption({
                        grid: {
                            top: "30%",
                            left: "10%",
                            right: "10%",
                            bottom: "10%"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{b} <br/> {c} "
                        },
                        xAxis: {
                            data: ["物料一", "物料二", "物料三", "物料四", "物料五", "物料六", "物料七"],
                            splitLine: {
                                show: !1
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#708ACC"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#708ACC"
                                }
                            }
                        },
                        yAxis: {
                            splitLine: {
                                show: !1
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#708ACC"
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#708ACC"
                                }
                            }
                        },
                        series: [{
                            type: "bar",
                            barWidth: 15,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0,1,0,0,[{
                                        offset: 0,
                                        color: "#1268f3"
                                    }, {
                                        offset: .6,
                                        color: "#08a4fa"
                                    }, {
                                        offset: 1,
                                        color: "#01ccfe"
                                    }],!1)
                                }
                            },
                            data: [300, 760, 500, 700, 600, 400, 750]
                        }]
                    })
                },
                initScroll: function() {
                    var t = this;
                    setInterval(function(s) {
                        t.animate = !0,
                        t.alarmList.push(t.alarmList[0]),
                        setTimeout(function() {
                            t.alarmList.shift(),
                            t.animate = !1
                        }, 1e3)
                    }, 1200)
                }
            }
        }
          , n = {
            render: function() {
                var t = this
                  , s = t.$createElement
                  , a = t._self._c || s;
                return a("div", {
                    staticClass: "content"
                }, [a("div", {
                    staticClass: "cesium-container",
                    attrs: {
                        id: "cesium-container"
                    }
                }), t._v(" "), t._m(0), t._v(" "), a("div", {
                    staticClass: "business-panel left showLeft"
                }, [t._m(1), t._v(" "), t._m(2), t._v(" "), a("div", {
                    staticClass: "chart-box left3",
                    staticStyle: {
                        height: "390px"
                    }
                }, [t._m(3), t._v(" "), a("div", {
                    staticClass: "chart-box-content"
                }, [a("div", {
                    staticClass: "chart-box3-content1 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankImg rankImg1"
                }), t._v(" "), a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.1")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品A")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress1"
                    }
                }, [t._v(t._s(t.goodsOrderList[0]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar1 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[0] + "%"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content2 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankImg rankImg2"
                }), t._v(" "), a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.2")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品B")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress2"
                    }
                }, [t._v(t._s(t.goodsOrderList[1]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar2 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[1] + "%"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content3 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankImg rankImg3"
                }), t._v(" "), a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.3")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品C")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress3"
                    }
                }, [t._v(t._s(t.goodsOrderList[2]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar3 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[2] + "%"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content4 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.4")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品D")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress4"
                    }
                }, [t._v(t._s(t.goodsOrderList[3]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar4 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[3] + "%"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content5 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.5")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品E")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress5"
                    }
                }, [t._v(t._s(t.goodsOrderList[4]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar5 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[4] + "%"
                    }
                })])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content6 chart-box3-contents"
                }, [a("div", {
                    staticClass: "chart-box3-content-info"
                }, [a("div", {
                    staticClass: "rankNum"
                }, [t._v("NO.6")]), t._v(" "), a("div", {
                    staticClass: "rankName"
                }, [t._v("商品F")]), t._v(" "), a("div", {
                    staticClass: "rankPercent",
                    attrs: {
                        id: "progress6"
                    }
                }, [t._v(t._s(t.goodsOrderList[5]))]), t._v(" "), a("div", {
                    staticClass: "rankPercenth"
                }, [t._v("%")])]), t._v(" "), a("div", {
                    staticClass: "chart-box3-content-progressBar"
                }, [a("div", {
                    staticClass: "chart-box3-content-progressBar6 box3-progressBar",
                    style: {
                        width: t.goodsOrderList[5] + "%"
                    }
                })])])])])]), t._v(" "), a("div", {
                    staticClass: "business-panel right showRight"
                }, [t._m(4), t._v(" "), t._m(5), t._v(" "), a("div", {
                    staticClass: "chart-box right3",
                    staticStyle: {
                        height: "390px"
                    }
                }, [t._m(6), t._v(" "), a("div", {
                    staticClass: "chart-box-content"
                }, [a("div", {
                    staticClass: "chart-wraper item-echarts"
                }, [a("div", {
                    staticClass: "chart-statebox"
                }, [t._m(7), t._v(" "), a("div", {
                    attrs: {
                        id: "state-scroll"
                    }
                }, [a("ul", {
                    staticClass: "chart-state-ul",
                    class: {
                        marquee_top: t.animate
                    }
                }, t._l(t.alarmList, function(s, i) {
                    return a("li", {
                        key: i
                    }, [a("div", {
                        staticClass: "fontInner clearfix"
                    }, [a("span", [t._v(t._s(s.date))]), t._v(" "), a("span", [t._v(t._s(s.time))]), t._v(" "), a("span", [t._v(t._s(s.level))]), t._v(" "), a("span", [t._v(t._s(s.state))])])])
                }), 0)])])])])])])])
            },
            staticRenderFns: [function() {
                var t = this
                  , s = t.$createElement
                  , a = t._self._c || s;
                return a("div", {
                    staticClass: "business-panel topChart"
                }, [a("div", {
                    staticClass: "top"
                }, [a("div", {
                    staticClass: "chart-top-background"
                }), t._v(" "), a("div", {
                    staticClass: "chart-top-title"
                }, [a("div", {
                    staticClass: "chart-top-title-name"
                }, [t._v("智慧工厂集成管控中心")])]), t._v(" "), a("div", {
                    staticClass: "chart-top-title1"
                }, [a("div", {
                    staticClass: "chart-top-title1-name title-name"
                }, [t._v("今日销售数量（吨）:")]), t._v(" "), a("div", {
                    staticClass: "chart-top-title1-num title-num",
                    attrs: {
                        id: "todaySales"
                    }
                }, [t._v("246")])]), t._v(" "), a("div", {
                    staticClass: "chart-top-title2"
                }, [a("div", {
                    staticClass: "chart-top-title2-name title-name"
                }, [t._v("累计销售数量（吨）:")]), t._v(" "), a("div", {
                    staticClass: "chart-top-title2-num title-num",
                    attrs: {
                        id: "cumulativeSales"
                    }
                }, [t._v("25,331")])])])])
            }
            , function() {
                var t = this
                  , s = t.$createElement
                  , a = t._self._c || s;
                return a("div", {
                    staticClass: "chart-box left1"
                }, [a("div", {
                    staticClass: "chart-box-title"
                }, [a("div", {
                    staticClass: "chart-box-title-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-title-name"
                }, [t._v("环境检测")])]), t._v(" "), a("div", {
                    staticClass: "chart-box-content"
                }, [a("div", {
                    staticClass: "chart-box-content-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-content1 chart-box-contents"
                }, [a("div", [t._v("今天 :")]), t._v(" "), a("div", {
                    attrs: {
                        id: "weather"
                    }
                })]), t._v(" "), a("div", {
                    staticClass: "chart-box-content2 chart-box-contents"
                }, [a("div", [t._v("\n            温度 :\n            "), a("span", {
                    staticStyle: {
                        "margin-left": "5px"
                    },
                    attrs: {
                        id: "temperature"
                    }
                }, [t._v("20.8")]), t._v(" "), a("span", [t._v("℃")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box-content3 chart-box-contents"
                }, [a("div", [t._v("\n            空气质量 :\n            "), a("span", {
                    staticStyle: {
                        "margin-left": "5px"
                    },
                    attrs: {
                        id: "airQuality"
                    }
                }, [t._v("优")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box-content4 chart-box-contents"
                }, [a("div", [t._v("\n            湿度 :\n            "), a("span", {
                    staticStyle: {
                        "margin-left": "5px"
                    },
                    attrs: {
                        id: "humidity"
                    }
                }, [t._v("1.44")]), t._v(" "), a("span", [t._v("%")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box-content5 chart-box-contents"
                }, [a("div", {
                    staticClass: "rotateBg1"
                }), t._v(" "), a("div", {
                    staticClass: "rotateBg2"
                }), t._v(" "), a("div", {
                    attrs: {
                        id: "city"
                    }
                }, [t._v("安徽")])])])])
            }
            , function() {
                var t = this
                  , s = t.$createElement
                  , a = t._self._c || s;
                return a("div", {
                    staticClass: "chart-box left2"
                }, [a("div", {
                    staticClass: "chart-box-title"
                }, [a("div", {
                    staticClass: "chart-box-title-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-title-name"
                }, [t._v("厂房资源信息")])]), t._v(" "), a("div", {
                    staticClass: "chart-box-content"
                }, [a("div", {
                    staticClass: "chart-box2-content1 chart-box-contents"
                }, [a("div", {
                    staticClass: "chart-box-content1-img content-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-content1-info content-info"
                }, [a("div", [t._v("在厂车辆数")]), t._v(" "), a("span", {
                    staticStyle: {
                        "font-size": "22px"
                    },
                    attrs: {
                        id: "carNum",
                        "data-val": "321"
                    }
                }, [t._v("310")]), t._v(" "), a("span", [t._v("辆")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box2-content2 chart-box-contents"
                }, [a("div", {
                    staticClass: "chart-box-content2-img content-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-content1-info content-info"
                }, [a("div", [t._v("员工数量")]), t._v(" "), a("span", {
                    staticStyle: {
                        "font-size": "22px"
                    },
                    attrs: {
                        id: "peopleNum",
                        "data-val": "452"
                    }
                }, [t._v("437")]), t._v(" "), a("span", [t._v("人")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box2-content3 chart-box-contents"
                }, [a("div", {
                    staticClass: "chart-box-content3-img content-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-content1-info content-info"
                }, [a("div", [t._v("用电量")]), t._v(" "), a("span", {
                    staticStyle: {
                        "font-size": "22px"
                    },
                    attrs: {
                        id: "temperatureNum",
                        "data-val": "762"
                    }
                }, [t._v("736")]), t._v(" "), a("span", [t._v("kW▪h")])])]), t._v(" "), a("div", {
                    staticClass: "chart-box2-content4 chart-box-contents"
                }, [a("div", {
                    staticClass: "chart-box-content4-img content-img"
                }), t._v(" "), a("div", {
                    staticClass: "chart-box-content1-info content-info"
                }, [a("div", [t._v("用水量")]), t._v(" "), a("span", {
                    staticStyle: {
                        "font-size": "22px"
                    },
                    attrs: {
                        id: "waterNum",
                        "data-val": "362"
                    }
                }, [t._v("350")]), t._v(" "), a("span", [t._v("吨")])])])])])
            }
            , function() {
                var t = this.$createElement
                  , s = this._self._c || t;
                return s("div", {
                    staticClass: "chart-box-title"
                }, [s("div", {
                    staticClass: "chart-box-title-img"
                }), this._v(" "), s("div", {
                    staticClass: "chart-box-title-name"
                }, [this._v("商品销量排行")])])
            }
            , function() {
                var t = this.$createElement
                  , s = this._self._c || t;
                return s("div", {
                    staticClass: "chart-box right1"
                }, [s("div", {
                    staticClass: "chart-box-title"
                }, [s("div", {
                    staticClass: "chart-box-title-img"
                }), this._v(" "), s("div", {
                    staticClass: "chart-box-title-name"
                }, [this._v("工厂设备检测")])]), this._v(" "), s("div", {
                    staticClass: "chart-box-content",
                    staticStyle: {
                        width: "300px",
                        height: "200px",
                        left: "12px",
                        top: "25px",
                        "-webkit-tap-highlight-color": "transparent",
                        "user-select": "none",
                        position: "relative"
                    },
                    attrs: {
                        id: "info01"
                    }
                })])
            }
            , function() {
                var t = this.$createElement
                  , s = this._self._c || t;
                return s("div", {
                    staticClass: "chart-box right2"
                }, [s("div", {
                    staticClass: "chart-box-title"
                }, [s("div", {
                    staticClass: "chart-box-title-img"
                }), this._v(" "), s("div", {
                    staticClass: "chart-box-title-name"
                }, [this._v("物料存储信息")])]), this._v(" "), s("div", {
                    staticClass: "chart-box-content",
                    staticStyle: {
                        width: "300px",
                        height: "200px",
                        left: "23px",
                        top: "10px",
                        "-webkit-tap-highlight-color": "transparent",
                        "user-select": "none",
                        position: "relative"
                    },
                    attrs: {
                        id: "info02"
                    }
                })])
            }
            , function() {
                var t = this.$createElement
                  , s = this._self._c || t;
                return s("div", {
                    staticClass: "chart-box-title"
                }, [s("div", {
                    staticClass: "chart-box-title-img"
                }), this._v(" "), s("div", {
                    staticClass: "chart-box-title-name"
                }, [this._v("厂房实时警报")])])
            }
            , function() {
                var t = this.$createElement
                  , s = this._self._c || t;
                return s("div", {
                    staticClass: "chart-statetit"
                }, [s("span", [this._v("日期")]), this._v(" "), s("span", [this._v("时间")]), this._v(" "), s("span", [this._v("报警级别")]), this._v(" "), s("span", [this._v("处理情况")])])
            }
            ]
        };
        var r = a("VU/8")(e, n, !1, function(t) {
            a("XmOO")
        }, "data-v-0ef17fff", null);
        s.default = r.exports
    }
});
