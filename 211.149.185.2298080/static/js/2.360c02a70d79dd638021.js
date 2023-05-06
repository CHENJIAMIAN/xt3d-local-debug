webpackJsonp([2], {
    CJli: function(e, i, t) {
        t("pRCB");
        var r = t("FeBl").Object;
        e.exports = function(e, i) {
            return r.defineProperties(e, i)
        }
    },
    HSQo: function(e, i, t) {
        e.exports = {
            default: t("CJli"),
            __esModule: !0
        }
    },
    UPyZ: function(e, i) {},
    bOdI: function(e, i, t) {
        "use strict";
        i.__esModule = !0;
        var r, n = t("C4MV"), o = (r = n) && r.__esModule ? r : {
            default: r
        };
        i.default = function(e, i, t) {
            return i in e ? (0,
            o.default)(e, i, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[i] = t,
            e
        }
    },
    oeWI: function(e, i) {},
    pRCB: function(e, i, t) {
        var r = t("kM2E");
        r(r.S + r.F * !t("+E39"), "Object", {
            defineProperties: t("qio6")
        })
    },
    ych9: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = t("bOdI")
          , n = t.n(r)
          , o = (t("HcO0"),
        t("Zrlr"))
          , a = t.n(o)
          , s = t("wxAW")
          , l = t.n(s)
          , c = (t("oeWI"),
        function() {
            function e(i, t, r) {
                a()(this, e),
                this.viewer = i,
                this.position = t,
                this.imgUrl = r,
                this.createDom(),
                i.cesiumWidget.container.appendChild(this.container),
                this.addPostRender()
            }
            return l()(e, [{
                key: "createDom",
                value: function() {
                    this.container = document.createElement("div"),
                    this.container.classList.add("animate-point1"),
                    this.container.style.cssText = "background-image:url(" + this.imgUrl + ")"
                }
            }, {
                key: "addPostRender",
                value: function() {
                    this.viewer.scene.postRender.addEventListener(this.postRender, this)
                }
            }, {
                key: "postRender",
                value: function() {
                    if (this.container && this.container.style) {
                        var e = this.viewer.scene.canvas.height
                          , i = new Cesium.Cartesian2;
                        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, i),
                        this.container.style.position = "absolute",
                        this.container.style.bottom = e - 10 - i.y + "px";
                        var t = this.container.offsetWidth;
                        this.container.style.left = i.x - t / 2 + "px",
                        this.viewer.camera.positionCartographic.height > 3e5 ? this.container.style.display = "none" : this.container.style.display = "block"
                    }
                }
            }, {
                key: "remove",
                value: function() {
                    this.viewer.scene.postRender.removeEventListener(this.postRender, this),
                    this.container.remove()
                }
            }]),
            e
        }())
          , u = t("HSQo");
        function m(e) {
            this._definitionChanged = new Cesium.Event,
            this._color = void 0,
            this._colorSubscription = void 0,
            this.color = e
        }
        t.n(u)()(m.prototype, {
            isConstant: {
                get: function() {
                    return !1
                }
            },
            definitionChanged: {
                get: function() {
                    return this._definitionChanged
                }
            },
            color: Cesium.createPropertyDescriptor("color")
        }),
        m.prototype.getType = function(e) {
            return "Wall"
        }
        ,
        m.prototype.getValue = function(e, i) {
            return Cesium.defined(i) || (i = {}),
            i.color = Cesium.Property.getValueOrClonedDefault(this._color, e, Cesium.Color.WHITE, i.color),
            i.image = Cesium.Material.WallImage,
            i
        }
        ,
        m.prototype.equals = function(e) {
            return this === e || e instanceof m && Cesium.Property.equals(this._color, e._color)
        }
        ,
        Cesium.WallMaterialProperty = m,
        Cesium.Material.WallType = "Wall",
        Cesium.Material.WallImage = "data:image/png;base64,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",
        Cesium.Material.WallSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n{\n     czm_material material = czm_getDefaultMaterial(materialInput);\n     vec2 st = materialInput.st;\n     vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n     material.alpha = colorImage.a * color.a;\n     material.diffuse = 1.5 * color.rgb  ;\n     return material;\n }",
        Cesium.Material._materialCache.addMaterial(Cesium.Material.WallType, {
            fabric: {
                type: Cesium.Material.WallType,
                uniforms: {
                    color: new Cesium.Color(1,0,0,.5),
                    image: Cesium.Material.WallImage,
                    time: 0
                },
                source: Cesium.Material.WallSource
            },
            translucent: function(e) {
                return !1
            }
        });
        var d = {
            init: function(e) {
                this.initViewer(e),
                this.addData(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    fullscreenButton: !1,
                    navigation: !1,
                    animation: !1,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    shouldAnimate: !0,
                    skyAtmosphere: !1,
                    orderIndependentTranslucency: !1,
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: appConfig.imageryProvider
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
                var i = this.viewer.scene.globe;
                i.depthTestAgainstTerrain = !0,
                i.showGroundAtmosphere = !1,
                i.baseColor = Cesium.Color.TRANSPARENT,
                i.translucency.enabled = !0,
                i.undergroundColor = void 0,
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            addData: function() {
                this.addBottomCircle(),
                this.loadPoints(),
                this.loadPolylines(),
                this.loadPolygons()
            },
            loadPoints: function() {
                var e = this;
                fetch("/static/data/xuchangshi/xuchang_point.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.forEach(function(i, t) {
                        var r = Cesium.Cartesian3.fromDegrees(i.geometry.coordinates[0], i.geometry.coordinates[1], 8500);
                        e.viewer.entities.add({
                            position: r,
                            label: {
                                text: i.properties.Name,
                                fillColor: Cesium.Color.WHITE,
                                scale: .5,
                                font: "normal 48px MicroSoft YaHei",
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,42e4),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-10),
                                outlineWidth: 20,
                                outlineColor: Cesium.Color.BLACK
                            }
                        });
                        var n = t % 2 == 0 ? "/static/images/marker/62a43.png" : "/static/images/marker/e96b4.png";
                        new c(e.viewer,r,n)
                    })
                })
            },
            loadPolygons: function() {
                var e = this;
                fetch("/static/data/xuchangshi/xuchang_region.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    var t = i.features;
                    e.colors = [],
                    t.forEach(function(i, t) {
                        e.addPolygon(i)
                    })
                })
            },
            addPolygon: function(e) {
                var i = this.plyToDegreesArrayHeights(e);
                this.viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(i)),
                        height: 2e3,
                        extrudedHeight: 6500,
                        material: Cesium.Color.fromCssColorString("#3F464D")
                    },
                    wall: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(i),
                        minimumHeights: new Array(i.length / 3).fill(2e3),
                        maximumHeights: new Array(i.length / 3).fill(0),
                        material: new Cesium.WallMaterialProperty(Cesium.Color.fromCssColorString("#FF8201"))
                    }
                })
            },
            loadPolylines: function() {
                var e = this;
                fetch("/static/data/xuchangshi/xuchang_quxian.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    var t = i.features;
                    e.colors = [],
                    t.forEach(function(i, t) {
                        e.addPolyline(i)
                    })
                })
            },
            addPolyline: function(e) {
                var i = this.plyToDegreesArrayHeights(e, 8550);
                this.viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(i),
                        material: Cesium.Color.fromCssColorString("#1987A8").withAlpha(.99),
                        width: 1
                    }
                })
            },
            plyToDegreesArrayHeights: function(e, i) {
                var t = []
                  , r = void 0;
                "MultiPolygon" == e.geometry.type ? r = e.geometry.coordinates[0][0] : "Polygon" == e.geometry.type && (r = e.geometry.coordinates[0]);
                for (var n = 0; n < r.length; n++) {
                    var o = r[n];
                    t.push(o[0]),
                    t.push(o[1]),
                    t.push(i || 0)
                }
                return t
            },
            addBottomCircle: function() {
                this.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(113.762863824633, 34.0402888389127, 20),
                    ellipse: {
                        semiMinorAxis: 9e4,
                        semiMajorAxis: 9e4,
                        material: "/static/images/circle/circle2.png"
                    }
                })
            },
            setView: function() {
                this.viewer.scene.camera.flyTo(n()({
                    duration: 1,
                    destination: {
                        x: -2102082.416170738,
                        y: 5055717.31418965,
                        z: 3545188.119903512
                    },
                    orientation: {
                        heading: .8296296635806044,
                        pitch: -.8510129139331957,
                        roll: 10250633648567486e-21
                    }
                }, "duration", 2))
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , A = {
            mounted: function() {
                d.init("cesium-container")
            },
            beforeDestroy: function() {
                d.destroy()
            }
        }
          , h = {
            render: function() {
                this.$createElement;
                this._self._c;
                return this._m(0)
            },
            staticRenderFns: [function() {
                var e = this.$createElement
                  , i = this._self._c || e;
                return i("div", {
                    staticClass: "app-wrapp"
                }, [i("div", {
                    staticClass: "cesium-container",
                    attrs: {
                        id: "cesium-container"
                    }
                })])
            }
            ]
        };
        var g = t("VU/8")(A, h, !1, function(e) {
            t("UPyZ")
        }, "data-v-17d160e3", null);
        i.default = g.exports
    }
});
