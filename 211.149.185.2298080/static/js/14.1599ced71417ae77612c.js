webpackJsonp([14], {
    DE5T: function(e, i) {},
    Sdnr: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var n = {
            init: function(e) {
                this.initViewer(e),
                this.addWall(),
                this.addLine(),
                this.addPoint(),
                this.loadLocalImage(),
                this.setView()
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
            loadLocalImage: function() {
                var e = new Cesium.UrlTemplateImageryProvider({
                    url: appConfig.dataServiceBaseUrl + "zhuchengjiedao/image/{z}/{x}/{y}.png",
                    tilingScheme: new Cesium.WebMercatorTilingScheme
                });
                this.viewer.imageryLayers.addImageryProvider(e)
            },
            addWall: function() {
                var e = this;
                fetch("static/data/zhuchengjiedao/region.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, n = 0; n < t.length; n++) {
                        var r = t[n]
                          , o = e.getDegreesArrayHeights(r);
                        e.viewer.entities.add({
                            wall: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(e.getDegreesArrayHeights(r)),
                                minimumHeights: new Array(o.length / 3).fill(-300),
                                maximumHeights: new Array(o.length / 3).fill(0),
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/wall/wallgradients1.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    color: Cesium.Color.fromCssColorString("#1987A8").withAlpha(.99)
                                })
                            }
                        })
                    }
                })
            },
            addPoint: function() {
                var e = this;
                fetch("static/data/zhuchengjiedao/point_clip.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates
                          , n = Cesium.Cartesian3.fromDegrees(t[0], t[1], 0);
                        e.viewer.entities.add({
                            position: n,
                            label: {
                                text: i.properties.Name,
                                fillColor: Cesium.Color.WHITE,
                                scale: .4,
                                font: "normal 32px MicroSoft YaHei",
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,7e6),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-5),
                                outlineWidth: 20,
                                outlineColor: Cesium.Color.BLACK
                            }
                        })
                    })
                })
            },
            getDegreesArrayHeights: function(e) {
                var i = []
                  , t = void 0;
                "MultiPolygon" == e.geometry.type ? t = e.geometry.coordinates[0][0] : "Polygon" == e.geometry.type && (t = e.geometry.coordinates[0]);
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    i.push(r[0]),
                    i.push(r[1]),
                    i.push(0)
                }
                return i
            },
            addLine: function() {
                var e = this;
                Cesium.GeoJsonDataSource.load("../static/data/zhuchengjiedao/line_clip.json").then(function(i) {
                    e.viewer.dataSources.add(i);
                    for (var t = i.entities.values, n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.polyline.material = new xt3d.PolylineObject.PolylineTrailMaterialProperty({
                            color: Cesium.Color.CYAN,
                            duration: 5e3
                        }),
                        r.polyline.width = 1
                    }
                }).otherwise(function(e) {})
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2288113.436924399,
                        y: 4990454.384009088,
                        z: 3248843.635437383
                    },
                    orientation: {
                        heading: 1.3236097139838954,
                        pitch: -.4607964909272275,
                        roll: .0031931159208999915
                    },
                    duration: 3
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , r = {
            mounted: function() {
                n.init("cesium-container")
            },
            beforeDestroy: function() {
                n.destroy()
            },
            methods: {
                pickCamera: function(e) {
                    function i() {
                        return e.apply(this, arguments)
                    }
                    return i.toString = function() {
                        return e.toString()
                    }
                    ,
                    i
                }(function() {})
            }
        }
          , o = {
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
        var a = t("VU/8")(r, o, !1, function(e) {
            t("DE5T")
        }, "data-v-0ee275ad", null);
        i.default = a.exports
    }
});
