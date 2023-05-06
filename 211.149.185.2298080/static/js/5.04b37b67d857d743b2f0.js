webpackJsonp([5], {
    "4+mC": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = i("mvHQ")
          , s = i.n(a)
          , n = {
            props: {
                symbolData: {
                    type: Object
                }
            },
            data: function() {
                return {}
            },
            computed: {},
            mounted: function() {},
            methods: {
                dragStartEvent: function(e) {
                    e.dataTransfer.setData("symbolData", s()(this.symbolData))
                }
            }
        }
          , r = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "symbol-item",
                    on: {
                        dragstart: function(t) {
                            return e.dragStartEvent(t)
                        }
                    }
                }, [i("img", {
                    staticClass: "symbol-img",
                    attrs: {
                        src: e.symbolData.symbolImage
                    }
                }), e._v(" "), i("span", {
                    staticClass: "symbol-name"
                }, [e._v(e._s(e.symbolData.name))])])
            },
            staticRenderFns: []
        };
        var o = i("VU/8")(n, r, !1, function(e) {
            i("qpvu")
        }, "data-v-6568f730", null).exports
          , l = {
            props: {
                plot: {
                    type: Object
                }
            },
            methods: {
                updateStyle: function() {
                    this.plot.updateStyle()
                },
                delClickEvent: function() {
                    this.$emit("delClickEvent", this.plot.properties.plotCode)
                }
            }
        }
          , u = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "attr-panel"
                }, [e._m(0), e._v(" "), i("div", {
                    staticClass: "attr-panel-body"
                }, [i("el-form", {
                    ref: "form",
                    attrs: {
                        model: e.plot,
                        "label-width": "100px",
                        size: "mini"
                    }
                }, [i("el-form-item", {
                    attrs: {
                        label: "粒子名称"
                    }
                }, [i("el-input", {
                    attrs: {
                        readonly: ""
                    },
                    model: {
                        value: e.plot.properties.attr.name,
                        callback: function(t) {
                            e.$set(e.plot.properties.attr, "name", t)
                        },
                        expression: "plot.properties.attr.name"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "粒子编号"
                    }
                }, [i("el-input", {
                    attrs: {
                        readonly: ""
                    },
                    model: {
                        value: e.plot.properties.plotCode,
                        callback: function(t) {
                            e.$set(e.plot.properties, "plotCode", t)
                        },
                        expression: "plot.properties.plotCode"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "粒子数量"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 1e3
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.emissionRate,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "emissionRate", t)
                        },
                        expression: "plot.properties.style.emissionRate"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "粒子大小"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 60,
                        step: 1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.particleSize,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "particleSize", t)
                        },
                        expression: "plot.properties.style.particleSize"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "最小生命周期"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: .1,
                        max: 5,
                        step: .2
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.minimumParticleLife,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "minimumParticleLife", t)
                        },
                        expression: "plot.properties.style.minimumParticleLife"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "最大生命周期"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: .1,
                        max: 5,
                        step: .2
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.maximumParticleLife,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "maximumParticleLife", t)
                        },
                        expression: "plot.properties.style.maximumParticleLife"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "最小速度"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 30,
                        step: 1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.minimumSpeed,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "minimumSpeed", t)
                        },
                        expression: "plot.properties.style.minimumSpeed"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "最大速度"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 30,
                        step: 1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.maximumSpeed,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "maximumSpeed", t)
                        },
                        expression: "plot.properties.style.maximumSpeed"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "初始比例"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 10,
                        step: 1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.startScale,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "startScale", t)
                        },
                        expression: "plot.properties.style.startScale"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "终止比例"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 10,
                        step: 1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.endScale,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "endScale", t)
                        },
                        expression: "plot.properties.style.endScale"
                    }
                })], 1), e._v(" "), i("el-form-item", {
                    attrs: {
                        label: "重力"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: -20,
                        max: 20,
                        step: .1
                    },
                    on: {
                        change: e.updateStyle
                    },
                    model: {
                        value: e.plot.properties.style.gravity,
                        callback: function(t) {
                            e.$set(e.plot.properties.style, "gravity", t)
                        },
                        expression: "plot.properties.style.gravity"
                    }
                })], 1), e._v(" "), i("el-form-item", [i("div", {
                    staticStyle: {
                        "text-align": "right"
                    }
                }, [i("el-button", {
                    attrs: {
                        type: "danger"
                    },
                    on: {
                        click: e.delClickEvent
                    }
                }, [e._v("删除粒子")])], 1)])], 1)], 1)])
            },
            staticRenderFns: [function() {
                var e = this.$createElement
                  , t = this._self._c || e;
                return t("div", {
                    staticClass: "attr-panel-header"
                }, [t("span", {
                    staticClass: "attr-panel-header-title"
                }, [this._v("属性编辑")])])
            }
            ]
        };
        var m = i("VU/8")(l, u, !1, function(e) {
            i("SS0x")
        }, "data-v-0e008010", null).exports
          , c = (i("Zf/z"),
        i("LRG3"),
        {
            init: function(e) {
                this.initViewer(e),
                this.setView(),
                this.initPlot(),
                this.load3dtiles(),
                this.initDatas()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
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
                    shouldAnimate: !0,
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A"
                    })
                })
            },
            initPlot: function() {
                this.particlePlotLayer = new xt3d.ParticleSystem.PlotLayer(this.viewer),
                this.particlePlotLayer.setPlotSelectable(!0)
            },
            initDatas: function() {
                var e = this;
                fetch("static/data/labelplotting/1603020572924.json").then(function(e) {
                    return e.json()
                }).then(function(t) {
                    t.features.forEach(function(t) {
                        e.particlePlotLayer.addPlot(t)
                    })
                }).catch(function(e) {})
            },
            addFountain: function(e) {
                var t = {
                    type: "Feature",
                    properties: {
                        plotCode: xt3d.ParticleSystem.getPlotCode(),
                        plotType: "fountain",
                        style: void 0,
                        attr: {
                            name: "喷泉"
                        }
                    },
                    geometry: {
                        type: "Point",
                        coordinates: this.cartesian3ToCoordinates(e)
                    }
                };
                this.particlePlotLayer.addPlot(t)
            },
            savePlots: function() {
                var e = [];
                this.particlePlotLayer.plots.forEach(function(t) {
                    e.push(t.toGeoJson())
                });
                var t = {
                    type: "FeatureCollection",
                    features: e
                }
                  , i = s()(t)
                  , a = new Blob([i],{
                    type: "text/json"
                })
                  , n = document.createEvent("MouseEvents")
                  , r = document.createElement("a");
                r.download = (new Date).getTime() + ".json",
                r.href = window.URL.createObjectURL(a),
                r.dataset.downloadurl = ["text/json", r.download, r.href].join(":"),
                n.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                r.dispatchEvent(n)
            },
            clear: function() {
                this.particlePlotLayer.clear()
            },
            cartesian3ToCoordinates: function(e) {
                var t = Cesium.Cartographic.fromCartesian(e);
                return [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]
            },
            load3dtiles: function() {
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: appConfig.zy3dtiles
                })).readyPromise.then(function(e) {
                    xt3d.TilesetPlugin.setTilesetHeight(e, 55)
                }).otherwise(function(e) {})
            },
            setView: function() {
                this.viewer.scene.camera.setView({
                    destination: {
                        x: -1573884.6908543836,
                        y: 5327973.888973422,
                        z: 3122968.6617322788
                    },
                    orientation: {
                        heading: 3.9895122290195566,
                        pitch: -.7216958404623961,
                        roll: 6.280318945117999
                    }
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        })
          , p = {
            components: {
                SymbolItem: o,
                EditPanel: m
            },
            data: function() {
                return {
                    symbolList: [{
                        name: "喷泉",
                        type: "fountain",
                        symbolImage: "static/images/symbol/fountain.jpg"
                    }],
                    selectedPlot: void 0
                }
            },
            mounted: function() {
                c.init("cesium-container"),
                c.viewer.canvas.ondragover = function(e) {
                    e.preventDefault()
                }
                ,
                c.viewer.canvas.ondrop = function(e) {
                    e.preventDefault();
                    var t = JSON.parse(e.dataTransfer.getData("symbolData"));
                    if (t) {
                        var i = new Cesium.Cartesian2(e.offsetX,e.offsetY)
                          , a = c.viewer.scene.pickPosition(i);
                        switch (t.type) {
                        case "fountain":
                            c.addFountain(a)
                        }
                    }
                }
                ,
                c.particlePlotLayer.selectedPlotChanged.addEventListener(this.selectedPlotChangedEvent, this)
            },
            beforeDestroy: function() {
                c.viewer.canvas.ondragover = void 0,
                c.viewer.canvas.ondrop = void 0,
                c.particlePlotLayer.selectedPlotChanged.removeEventListener(this.selectedPlotChangedEvent, this),
                c.destroy()
            },
            methods: {
                clear: function() {
                    c.clear()
                },
                delClickEvent: function(e) {
                    c.particlePlotLayer.removeByPlotCode(e),
                    this.selectedPlot = void 0
                },
                save: function() {
                    c.savePlots()
                },
                selectedPlotChangedEvent: function(e) {
                    this.selectedPlot = e
                }
            }
        }
          , h = {
            render: function() {
                var e = this
                  , t = e.$createElement
                  , i = e._self._c || t;
                return i("div", {
                    staticClass: "app-wrapp"
                }, [i("div", {
                    staticClass: "cesium-container",
                    attrs: {
                        id: "cesium-container"
                    }
                }), e._v(" "), i("div", {
                    staticClass: "panel"
                }, [i("div", {
                    staticClass: "panel-header"
                }, [e._v("喷泉粒子")]), e._v(" "), i("div", {
                    staticClass: "panel-body"
                }, [i("div", {
                    staticClass: "symbol-container"
                }, e._l(e.symbolList, function(e) {
                    return i("SymbolItem", {
                        key: e.name,
                        attrs: {
                            symbolData: e
                        }
                    })
                }), 1), e._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [e._v("按住图片拖放到场景中进行添加")]), e._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [e._v("选中粒子对象在属性面板中可以修改属性或者删除粒子对象")]), e._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [e._v("点击保存按钮将粒子对象数据保存到json文件中，支持从文件中加载")]), e._v(" "), i("br"), e._v(" "), i("button", {
                    on: {
                        click: function(t) {
                            return e.clear()
                        }
                    }
                }, [e._v("清空")]), e._v(" "), i("button", {
                    on: {
                        click: function(t) {
                            return e.save()
                        }
                    }
                }, [e._v("保存")])])]), e._v(" "), void 0 != e.selectedPlot ? i("EditPanel", {
                    attrs: {
                        plot: e.selectedPlot
                    },
                    on: {
                        delClickEvent: e.delClickEvent
                    }
                }) : e._e()], 1)
            },
            staticRenderFns: []
        };
        var d = i("VU/8")(p, h, !1, function(e) {
            i("56tQ")
        }, "data-v-37434eaa", null);
        t.default = d.exports
    },
    "56tQ": function(e, t) {},
    LRG3: function(e, t, i) {
        "use strict";
        i("EypN");
        var a = i("Dd8w")
          , s = i.n(a)
          , n = i("d7EF")
          , r = i.n(n)
          , o = i("Zrlr")
          , l = i.n(o)
          , u = i("wxAW")
          , m = i.n(u)
          , c = function() {
            function e(t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                    autoMaxMin: !0,
                    data: []
                }
                  , a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [-180, -90, 180, 90]
                  , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                    enabled: !0,
                    min: 6375e3,
                    max: 1e7,
                    maxRadius: 40,
                    minRadius: 10
                }
                  , o = this
                  , u = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {}
                  , m = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                    totalArea: 1036800,
                    autoResize: !0
                };
                if (l()(this, e),
                "undefined" != typeof window) {
                    this.viewer = t,
                    this.bbox = a,
                    this.autoRadiusConfig = n,
                    this.max = 1,
                    this.min = .01;
                    var c = r()(a, 4)
                      , p = c[0]
                      , h = c[1]
                      , d = c[2]
                      , v = c[3]
                      , f = v - h
                      , y = d - p;
                    if (this.boxMeta = {
                        top: v,
                        left: p,
                        height: f,
                        width: y
                    },
                    m.autoResize) {
                        if (!m.totalArea)
                            throw "specify totalArea if auto resize";
                        var C = Math.floor(Math.sqrt(f * m.totalArea))
                          , g = Math.floor(C * y / f);
                        this.canvasConfig = s()({}, m, {
                            width: g,
                            height: C
                        })
                    } else {
                        if (!m.width || !m.height)
                            throw "specify width and height if not auto resize";
                        this.canvasConfig = m
                    }
                    var x = s()({}, u);
                    x.container || (this.mountPoint = this.newDiv({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        "z-index": -100,
                        overflow: "hidden",
                        width: 0,
                        height: 0
                    }, document.body),
                    x.container = this.newDiv({
                        width: this.canvasConfig.width,
                        height: this.canvasConfig.height
                    }, this.mountPoint)),
                    this.heatmapConfig = x,
                    this.heatmap = h337.create(x);
                    var w = void 0;
                    if (!(w = Array.isArray(i) ? {
                        autoMaxMin: !0,
                        data: i
                    } : s()({}, i)).autoMaxMin) {
                        if (!w.min || !w.max)
                            throw "need max and min when not auto";
                        this.min = w.min,
                        this.max = w.max
                    }
                    var b = w.data.map(function(e) {
                        return o.updateMaxMin(e.z),
                        o.convertData(e)
                    });
                    delete w.data,
                    this.dataConfig = w,
                    this.data = b;
                    var P = {
                        max: this.max,
                        min: this.min,
                        data: b
                    };
                    this.heatmap.setData(P),
                    this.updateCesium(n.enabled),
                    this.cameraMoveEnd = function() {
                        return o.updateCesium(!0)
                    }
                    ,
                    n.enabled && this.viewer.camera.moveEnd.addEventListener(this.cameraMoveEnd),
                    this.rectangleEntity = this.viewer.entities.add({
                        polygon: {
                            material: this.heatmap.getDataURL(),
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(this.recToPolygon())
                        }
                    })
                }
            }
            return m()(e, [{
                key: "updateHeatmap",
                value: function() {
                    var e = this.viewer.camera.getMagnitude()
                      , t = this.autoRadiusConfig
                      , i = t.min
                      , a = t.max
                      , s = t.minRadius
                      , n = t.maxRadius
                      , r = parseInt(s + (n - s) * (e - i) / (a - i));
                    this.heatmap.setData({
                        max: this.max,
                        min: this.min,
                        data: this.data.map(function(e) {
                            return {
                                x: e.x,
                                y: e.y,
                                value: e.value,
                                radius: r
                            }
                        })
                    })
                }
            }, {
                key: "updateCesium",
                value: function(e) {
                    e && this.updateHeatmap(),
                    this.rectangleEntity && (this.rectangleEntity.polygon.material = this.heatmap.getDataURL())
                }
            }, {
                key: "recToPolygon",
                value: function() {
                    return [this.bbox[0], this.bbox[1], this.bbox[2], this.bbox[1], this.bbox[2], this.bbox[3], this.bbox[0], this.bbox[3], this.bbox[0], this.bbox[1]]
                }
            }, {
                key: "convertData",
                value: function(e) {
                    var t = e.x
                      , i = e.y
                      , a = e.z
                      , s = this.gps2point([t, i])
                      , n = r()(s, 2);
                    return {
                        x: n[0],
                        y: n[1],
                        value: a
                    }
                }
            }, {
                key: "updateMaxMin",
                value: function(e) {
                    void 0 === this.max ? this.max = e : this.max = Math.max(e, this.max),
                    void 0 === this.min ? this.min = e : this.min = Math.min(e, this.min)
                }
            }, {
                key: "gps2point",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                      , t = r()(e, 2)
                      , i = t[0]
                      , a = t[1]
                      , s = this.boxMeta
                      , n = s.top
                      , o = s.left
                      , l = s.height
                      , u = s.width
                      , m = this.canvasConfig;
                    return [parseInt((i - o) / u * m.width), parseInt((n - a) / l * m.height)]
                }
            }, {
                key: "newDiv",
                value: function(e, t) {
                    var i = document.createElement("div");
                    for (var a in t && t.append(i),
                    e)
                        "number" != typeof e[a] ? i.style[a] = e[a] : i.style[a] = e[a] + "px";
                    return i
                }
            }, {
                key: "destroy",
                value: function() {
                    this.viewer.camera.moveEnd.removeEventListener(this.cameraMoveEnd),
                    this.rectangleEntity && this.viewer.entities.remove(this.rectangleEntity),
                    this.mountPoint && this.mountPoint.remove()
                }
            }, {
                key: "remove",
                value: function() {
                    this.destroy()
                }
            }]),
            e
        }()
          , p = function() {
            function e(t, i, a) {
                l()(this, e),
                this.viewer = t,
                this.tileset = i,
                this.params = a || {
                    scale: 1,
                    longitude: 0,
                    latitude: 0,
                    height: 0,
                    rx: 0,
                    ry: 0,
                    rz: 0
                };
                var s = Cesium.Cartographic.fromCartesian(this.tileset.boundingSphere.center);
                this.params.longitude = Cesium.Math.toDegrees(s.longitude),
                this.params.latitude = Cesium.Math.toDegrees(s.latitude),
                this.params.height = s.height,
                this.highlightAxis = {},
                this.activate()
            }
            return m()(e, [{
                key: "activate",
                value: function() {
                    this.deactivate(),
                    this.axisList = [],
                    this.createAxis(),
                    this.registerEvents()
                }
            }, {
                key: "deactivate",
                value: function() {
                    var e = this;
                    this.eventHandler && (this.eventHandler.destroy(),
                    this.eventHandler = void 0,
                    this.axisList.forEach(function(t) {
                        e.viewer.entities.remove(t)
                    }))
                }
            }, {
                key: "createAxis",
                value: function() {
                    var e = this.createXaxis();
                    this.axisList.push(e),
                    e = this.createYaxis(),
                    this.axisList.push(e),
                    e = this.createZaxis(),
                    this.axisList.push(e)
                }
            }, {
                key: "createXaxis",
                value: function() {
                    var e = this;
                    return this.viewer.entities.add({
                        type: "axis",
                        subType: "xaxis",
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.fromDegreesArrayHeights([e.params.longitude, e.params.latitude, e.params.height, e.params.longitude + .001, e.params.latitude, e.params.height])
                            }
                            ,!1),
                            width: 20,
                            material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.BLUE)
                        }
                    })
                }
            }, {
                key: "createYaxis",
                value: function() {
                    var e = this;
                    return this.viewer.entities.add({
                        type: "axis",
                        subType: "yaxis",
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.fromDegreesArrayHeights([e.params.longitude, e.params.latitude, e.params.height, e.params.longitude, e.params.latitude + .001, e.params.height])
                            }
                            ,!1),
                            width: 20,
                            material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GREEN)
                        }
                    })
                }
            }, {
                key: "createZaxis",
                value: function() {
                    var e = this;
                    return this.viewer.entities.add({
                        type: "axis",
                        subType: "zaxis",
                        polyline: {
                            positions: new Cesium.CallbackProperty(function(t) {
                                return Cesium.Cartesian3.fromDegreesArrayHeights([e.params.longitude, e.params.latitude, e.params.height, e.params.longitude, e.params.latitude, e.params.height + 60])
                            }
                            ,!1),
                            width: 20,
                            material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
                        }
                    })
                }
            }, {
                key: "registerEvents",
                value: function() {
                    this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas),
                    this.registerLeftDownEvent(),
                    this.registerLeftUpEvent(),
                    this.registerMouseMoveEvent()
                }
            }, {
                key: "registerLeftDownEvent",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        var i = e.viewer.scene.pick(t.position);
                        i && i.id && "axis" === i.id.type && (e.moveType = i.id.subType,
                        e.highlightAxis.color = i.id.polyline.material.color,
                        e.highlightAxis.polyline = i.id.polyline,
                        e.highlightAxis.polyline.material.color = Cesium.Color.YELLOW,
                        e.viewer.enableCursorStyle = !1,
                        document.body.style.cursor = "move",
                        e.moveing = !0,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !1)
                    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
                }
            }, {
                key: "registerLeftUpEvent",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        e.moveing && (e.viewer.enableCursorStyle = !0,
                        document.body.style.cursor = "default",
                        e.highlightAxis.polyline.material.color = e.highlightAxis.color,
                        e.highlightAxis = {},
                        e.moveing = !1,
                        e.viewer.scene.screenSpaceCameraController.enableRotate = !0)
                    }, Cesium.ScreenSpaceEventType.LEFT_UP)
                }
            }, {
                key: "registerMouseMoveEvent",
                value: function() {
                    var e = this;
                    this.eventHandler.setInputAction(function(t) {
                        if (e.moveing) {
                            if ("zaxis" == e.moveType)
                                return e.params.height += t.startPosition.y - t.endPosition.y,
                                void e.updateModelMatrix();
                            var i = e.viewer.scene.pickPosition(t.endPosition)
                              , a = e.viewer.scene.pickPosition(t.startPosition);
                            if (i && a) {
                                var s = Cesium.Cartographic.fromCartesian(i)
                                  , n = Cesium.Cartographic.fromCartesian(a);
                                return "xaxis" == e.moveType ? (e.params.longitude += Cesium.Math.toDegrees(s.longitude - n.longitude),
                                void e.updateModelMatrix()) : "yaxis" == e.moveType ? (e.params.latitude += Cesium.Math.toDegrees(s.latitude - n.latitude),
                                void e.updateModelMatrix()) : void 0
                            }
                        }
                    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
                }
            }, {
                key: "updateModelMatrix",
                value: function() {
                    if (this.tileset) {
                        var e = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(this.params.rx))
                          , t = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(this.params.ry))
                          , i = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(this.params.rz))
                          , a = Cesium.Matrix4.fromRotationTranslation(e)
                          , s = Cesium.Matrix4.fromRotationTranslation(t)
                          , n = Cesium.Matrix4.fromRotationTranslation(i)
                          , r = Cesium.Cartesian3.fromDegrees(this.params.longitude, this.params.latitude, this.params.height)
                          , o = Cesium.Transforms.eastNorthUpToFixedFrame(r);
                        Cesium.Matrix4.multiply(o, a, o),
                        Cesium.Matrix4.multiply(o, s, o),
                        Cesium.Matrix4.multiply(o, n, o);
                        var l = Cesium.Matrix4.fromUniformScale(this.params.scale);
                        Cesium.Matrix4.multiply(o, l, o),
                        this.tileset._root.transform = o
                    }
                }
            }, {
                key: "getParams",
                value: function() {
                    return this.params
                }
            }]),
            e
        }()
          , h = function() {
            function e(t) {
                l()(this, e),
                this.viewer = t
            }
            return m()(e, [{
                key: "add",
                value: function(e, t) {
                    this.tiles = t,
                    this.clear(),
                    this.booleanClockwise(e) && (e = e.reverse()),
                    this.addClippingPlanes(e)
                }
            }, {
                key: "addClippingPlanes",
                value: function(e) {
                    for (var t = this.getInverseTransform(this.tiles), i = e.length, a = void 0, s = void 0, n = void 0, r = [], o = 0; o < i; ++o) {
                        var l = (o + 1) % i;
                        a = e[o],
                        s = e[l],
                        n = this.createPlane(a, s, t),
                        r.push(n)
                    }
                    this.tiles.clippingPlanes = new Cesium.ClippingPlaneCollection({
                        planes: r,
                        edgeWidth: 1,
                        edgeColor: Cesium.Color.WHITE
                    })
                }
            }, {
                key: "getInverseTransform",
                value: function(e) {
                    var t = void 0
                      , i = e.root.transform;
                    return t = i && i.equals(Cesium.Matrix4.IDENTITY) || !i ? Cesium.Transforms.eastNorthUpToFixedFrame(e.boundingSphere.center) : Cesium.Matrix4.fromArray(e.root.transform),
                    Cesium.Matrix4.inverseTransformation(t, new Cesium.Matrix4)
                }
            }, {
                key: "getOriginCoordinateSystemPoint",
                value: function(e, t) {
                    return Cesium.Matrix4.multiplyByPoint(t, e, new Cesium.Cartesian3(0,0,0))
                }
            }, {
                key: "createPlane",
                value: function(e, t, i) {
                    var a = this.getOriginCoordinateSystemPoint(e, i)
                      , s = this.getOriginCoordinateSystemPoint(t, i)
                      , n = new Cesium.Cartesian3(0,0,10)
                      , r = Cesium.Cartesian3.subtract(s, a, new Cesium.Cartesian3)
                      , o = Cesium.Cartesian3.cross(r, n, new Cesium.Cartesian3);
                    o = Cesium.Cartesian3.normalize(o, o);
                    var l = Cesium.Plane.fromPointNormal(a, o);
                    return Cesium.ClippingPlane.fromPlane(l)
                }
            }, {
                key: "booleanClockwise",
                value: function(e) {
                    var t = this
                      , i = [];
                    e.map(function(e) {
                        i.push(t.cartesian3ToDegrees(e))
                    }),
                    i.push(i[0]);
                    var a = turf.lineString(i);
                    return turf.booleanClockwise(a)
                }
            }, {
                key: "cartesian3ToDegrees",
                value: function(e) {
                    var t = Cesium.Cartographic.fromCartesian(e);
                    return [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude)]
                }
            }, {
                key: "clear",
                value: function() {
                    this.tiles && (this.tiles.clippingPlanes = new Cesium.ClippingPlaneCollection({
                        planes: [],
                        edgeWidth: 1,
                        edgeColor: Cesium.Color.WHITE
                    }))
                }
            }]),
            e
        }()
          , d = function() {
            function e(t, i) {
                l()(this, e),
                this.viewer = t,
                this.positions = i,
                this.primitives = [],
                this.invisibleColor = new Cesium.Color(.25,.25,.25,1)
            }
            return m()(e, [{
                key: "addVisibleRegion",
                value: function(e) {
                    var t = this.createGeometry(e, 1e5)
                      , i = this.addPrimitive(t);
                    this.primitives.push(i),
                    this.viewer.scene.invertClassification = !0,
                    this.viewer.scene.invertClassificationColor = this.invisibleColor
                }
            }, {
                key: "setInvisibleColorAlpha",
                value: function(e) {
                    this.viewer.scene.invertClassificationColor = this.invisibleColor.withAlpha(e)
                }
            }, {
                key: "activate",
                value: function() {
                    this.viewer.scene.invertClassification = !0
                }
            }, {
                key: "deactivate",
                value: function() {
                    this.viewer.scene.invertClassification = !1
                }
            }, {
                key: "addPrimitive",
                value: function(e) {
                    return this.viewer.scene.primitives.add(new Cesium.ClassificationPrimitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: Cesium.PolygonGeometry.createGeometry(e),
                            attributes: {
                                color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
                                    alpha: .8
                                })),
                                show: new Cesium.ShowGeometryInstanceAttribute(!1)
                            }
                        }),
                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                    }))
                }
            }, {
                key: "createGeometry",
                value: function(e, t) {
                    return new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(e),
                        perPositionHeight: !0,
                        extrudedHeight: t
                    })
                }
            }, {
                key: "removeAll",
                value: function() {
                    var e = this;
                    this.viewer.scene.invertClassification = !1,
                    this.primitives.forEach(function(t) {
                        e.viewer.scene.primitives.remove(t)
                    })
                }
            }]),
            e
        }();
        xt3d.TilesetPlugin = {
            Heatmap: c,
            PositionEditor: p,
            TilesetClip: h,
            PartVisible: d,
            setTilesetHeight: function(e, t) {
                var i = Cesium.Cartographic.fromCartesian(e.boundingSphere.center)
                  , a = Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, i.height)
                  , s = Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, t)
                  , n = Cesium.Cartesian3.subtract(s, a, new Cesium.Cartesian3);
                e.modelMatrix = Cesium.Matrix4.fromTranslation(n)
            }
        }
    },
    SS0x: function(e, t) {},
    qpvu: function(e, t) {}
});
