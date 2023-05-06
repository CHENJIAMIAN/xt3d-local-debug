webpackJsonp([8], {
    D4P8: function(t, e) {},
    HACV: function(t, e) {},
    ahzf: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = i("mvHQ")
          , n = i.n(a)
          , o = {
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
                dragStartEvent: function(t) {
                    t.dataTransfer.setData("symbolData", n()(this.symbolData))
                }
            }
        }
          , s = {
            render: function() {
                var t = this
                  , e = t.$createElement
                  , i = t._self._c || e;
                return i("div", {
                    staticClass: "symbol-item",
                    on: {
                        dragstart: function(e) {
                            return t.dragStartEvent(e)
                        }
                    }
                }, [i("img", {
                    staticClass: "symbol-img",
                    attrs: {
                        src: t.symbolData.symbolImage
                    }
                }), t._v(" "), i("span", {
                    staticClass: "symbol-name"
                }, [t._v(t._s(t.symbolData.name))])])
            },
            staticRenderFns: []
        };
        var l = i("VU/8")(o, s, !1, function(t) {
            i("HACV")
        }, "data-v-929efde6", null).exports
          , r = {
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
                },
                changeO: function(t) {
                    this.plot.updateOrientation(t)
                }
            }
        }
          , c = {
            render: function() {
                var t = this
                  , e = t.$createElement
                  , i = t._self._c || e;
                return i("div", {
                    staticClass: "attr-panel"
                }, [t._m(0), t._v(" "), i("div", {
                    staticClass: "attr-panel-body"
                }, [i("el-form", {
                    ref: "form",
                    attrs: {
                        model: t.plot,
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
                        value: t.plot.properties.attr.name,
                        callback: function(e) {
                            t.$set(t.plot.properties.attr, "name", e)
                        },
                        expression: "plot.properties.attr.name"
                    }
                })], 1), t._v(" "), i("el-form-item", {
                    attrs: {
                        label: "粒子编号"
                    }
                }, [i("el-input", {
                    attrs: {
                        readonly: ""
                    },
                    model: {
                        value: t.plot.properties.plotCode,
                        callback: function(e) {
                            t.$set(t.plot.properties, "plotCode", e)
                        },
                        expression: "plot.properties.plotCode"
                    }
                })], 1), t._v(" "), i("el-form-item", {
                    attrs: {
                        label: "粒子数量"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: 0,
                        max: 1e3
                    },
                    on: {
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.emissionRate,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "emissionRate", e)
                        },
                        expression: "plot.properties.style.emissionRate"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.minimumParticleLife,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "minimumParticleLife", e)
                        },
                        expression: "plot.properties.style.minimumParticleLife"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.maximumParticleLife,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "maximumParticleLife", e)
                        },
                        expression: "plot.properties.style.maximumParticleLife"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.minimumSpeed,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "minimumSpeed", e)
                        },
                        expression: "plot.properties.style.minimumSpeed"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.maximumSpeed,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "maximumSpeed", e)
                        },
                        expression: "plot.properties.style.maximumSpeed"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.startScale,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "startScale", e)
                        },
                        expression: "plot.properties.style.startScale"
                    }
                })], 1), t._v(" "), i("el-form-item", {
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
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.endScale,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "endScale", e)
                        },
                        expression: "plot.properties.style.endScale"
                    }
                })], 1), t._v(" "), i("el-form-item", {
                    attrs: {
                        label: "重力"
                    }
                }, [i("el-slider", {
                    attrs: {
                        min: -20,
                        max: 20,
                        step: .01
                    },
                    on: {
                        change: t.updateStyle
                    },
                    model: {
                        value: t.plot.properties.style.gravity,
                        callback: function(e) {
                            t.$set(t.plot.properties.style, "gravity", e)
                        },
                        expression: "plot.properties.style.gravity"
                    }
                })], 1), t._v(" "), i("el-form-item", [i("div", {
                    staticStyle: {
                        "text-align": "right"
                    }
                }, [i("el-button", {
                    attrs: {
                        type: "danger"
                    },
                    on: {
                        click: t.delClickEvent
                    }
                }, [t._v("删除粒子")])], 1)])], 1), t._v(" "), i("div", {
                    staticStyle: {
                        margin: "5px"
                    }
                }, [i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("北风")
                        }
                    }
                }, [t._v("北风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("东北风")
                        }
                    }
                }, [t._v("东北风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("东风")
                        }
                    }
                }, [t._v("东风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("东南风")
                        }
                    }
                }, [t._v("东南风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("南风")
                        }
                    }
                }, [t._v("南风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("西南风")
                        }
                    }
                }, [t._v("西南风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("西风")
                        }
                    }
                }, [t._v("西风")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return e.stopPropagation(),
                            t.changeO("西北风")
                        }
                    }
                }, [t._v("西北风")])])], 1)])
            },
            staticRenderFns: [function() {
                var t = this.$createElement
                  , e = this._self._c || t;
                return e("div", {
                    staticClass: "attr-panel-header"
                }, [e("span", {
                    staticClass: "attr-panel-header-title"
                }, [this._v("属性编辑")])])
            }
            ]
        };
        var p = i("VU/8")(r, c, !1, function(t) {
            i("D4P8")
        }, "data-v-114fe17a", null).exports
          , m = (i("Zf/z"),
        {
            init: function(t) {
                this.initViewer(t),
                this.setView(),
                this.initPlot(),
                this.load3dtiles(),
                this.initDatas()
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
                var t = this;
                fetch("static/data/labelplotting/1618969652340.json").then(function(t) {
                    return t.json()
                }).then(function(e) {
                    e.features.forEach(function(e) {
                        t.particlePlotLayer.addPlot(e)
                    })
                }).catch(function(t) {})
            },
            addSmoke: function(t) {
                var e = {
                    type: "Feature",
                    properties: {
                        plotCode: xt3d.ParticleSystem.getPlotCode(),
                        plotType: "smoke",
                        style: void 0,
                        attr: {
                            name: "烟雾"
                        }
                    },
                    geometry: {
                        type: "Point",
                        coordinates: this.cartesian3ToCoordinates(t)
                    }
                };
                this.particlePlotLayer.addPlot(e)
            },
            savePlots: function() {
                var t = [];
                this.particlePlotLayer.plots.forEach(function(e) {
                    t.push(e.toGeoJson())
                });
                var e = {
                    type: "FeatureCollection",
                    features: t
                }
                  , i = n()(e)
                  , a = new Blob([i],{
                    type: "text/json"
                })
                  , o = document.createEvent("MouseEvents")
                  , s = document.createElement("a");
                s.download = (new Date).getTime() + ".json",
                s.href = window.URL.createObjectURL(a),
                s.dataset.downloadurl = ["text/json", s.download, s.href].join(":"),
                o.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null),
                s.dispatchEvent(o)
            },
            clear: function() {
                this.particlePlotLayer.clear()
            },
            cartesian3ToCoordinates: function(t) {
                var e = Cesium.Cartographic.fromCartesian(t);
                return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]
            },
            load3dtiles: function() {
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "http://data.marsgis.cn/3dtiles/max-shihua/tileset.json"
                })).readyPromise.then(function(t) {}).otherwise(function(t) {})
            },
            setView: function() {
                this.viewer.scene.camera.setView({
                    destination: {
                        x: -2474130.874613722,
                        y: 4838711.801557431,
                        z: 3328147.8792809374
                    },
                    orientation: {
                        heading: 1.771623656651892,
                        pitch: -.6436041991569161,
                        roll: .003668449204559998
                    }
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        })
          , d = {
            components: {
                SymbolItem: l,
                EditPanel: p
            },
            data: function() {
                return {
                    symbolList: [{
                        name: "烟雾",
                        type: "smoke",
                        symbolImage: "static/images/symbol/smoke.jpg"
                    }],
                    selectedPlot: void 0
                }
            },
            mounted: function() {
                m.init("cesium-container"),
                m.viewer.canvas.ondragover = function(t) {
                    t.preventDefault()
                }
                ,
                m.viewer.canvas.ondrop = function(t) {
                    t.preventDefault();
                    var e = JSON.parse(t.dataTransfer.getData("symbolData"));
                    if (e) {
                        var i = new Cesium.Cartesian2(t.offsetX,t.offsetY)
                          , a = m.viewer.scene.pickPosition(i);
                        switch (e.type) {
                        case "smoke":
                            m.addSmoke(a)
                        }
                    }
                }
                ,
                m.particlePlotLayer.selectedPlotChanged.addEventListener(this.selectedPlotChangedEvent, this)
            },
            beforeDestroy: function() {
                m.viewer.canvas.ondragover = void 0,
                m.viewer.canvas.ondrop = void 0,
                m.particlePlotLayer.selectedPlotChanged.removeEventListener(this.selectedPlotChangedEvent, this),
                m.destroy()
            },
            methods: {
                clear: function() {
                    m.clear()
                },
                delClickEvent: function(t) {
                    m.particlePlotLayer.removeByPlotCode(t),
                    this.selectedPlot = void 0
                },
                save: function() {
                    m.savePlots()
                },
                selectedPlotChangedEvent: function(t) {
                    this.selectedPlot = t
                },
                pickCamera: function(t) {
                    function e() {
                        return t.apply(this, arguments)
                    }
                    return e.toString = function() {
                        return t.toString()
                    }
                    ,
                    e
                }(function() {})
            }
        }
          , u = {
            render: function() {
                var t = this
                  , e = t.$createElement
                  , i = t._self._c || e;
                return i("div", {
                    staticClass: "app-wrapp"
                }, [i("div", {
                    staticClass: "cesium-container",
                    attrs: {
                        id: "cesium-container"
                    }
                }), t._v(" "), i("div", {
                    staticClass: "panel"
                }, [i("div", {
                    staticClass: "panel-header"
                }, [t._v("烟雾粒子")]), t._v(" "), i("div", {
                    staticClass: "panel-body"
                }, [i("div", {
                    staticClass: "symbol-container"
                }, t._l(t.symbolList, function(t) {
                    return i("SymbolItem", {
                        key: t.name,
                        attrs: {
                            symbolData: t
                        }
                    })
                }), 1), t._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [t._v("按住图片拖放到场景中进行添加")]), t._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [t._v("选中粒子对象在属性面板中可以修改属性或者删除粒子对象")]), t._v(" "), i("div", {
                    staticClass: "tip-item"
                }, [t._v("点击保存按钮将粒子对象数据保存到json文件中，支持从文件中加载")]), t._v(" "), i("br"), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return t.clear()
                        }
                    }
                }, [t._v("清空")]), t._v(" "), i("button", {
                    on: {
                        click: function(e) {
                            return t.save()
                        }
                    }
                }, [t._v("保存")])])]), t._v(" "), void 0 != t.selectedPlot ? i("EditPanel", {
                    attrs: {
                        plot: t.selectedPlot
                    },
                    on: {
                        delClickEvent: t.delClickEvent
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: []
        };
        var v = i("VU/8")(d, u, !1, function(t) {
            i("siZb")
        }, "data-v-85945d5c", null);
        e.default = v.exports
    },
    siZb: function(t, e) {}
});
