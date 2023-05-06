webpackJsonp([19], {
    j4eR: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var r = {
            init: function(e) {
                this.initViewer(e),
                this.addPeripheryRegion(),
                this.addRegion(),
                this.addPolyline(),
                this.addRd(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    navigation: !1,
                    animation: !1,
                    shouldAnimate: !1,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    imageryProvider: new Cesium.SingleTileImageryProvider({
                        url: "static/images/earth/earth_3.jpg"
                    })
                }),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            addPeripheryRegion: function() {
                var e = this;
                fetch("static/data/kedu/region.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, r = 0; r < t.length; r++) {
                        var n = t[r]
                          , a = e.getDegreesArrayHeights(n);
                        e.viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(e.getDegreesArrayHeights(n, 500)),
                                width: 3,
                                material: Cesium.Color.fromCssColorString("#1a2933")
                            },
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                height: 0,
                                extrudedHeight: n.properties.height,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/polygon/beij.083ca80f.png",
                                    repeat: new Cesium.Cartesian2(10,10),
                                    color: new Cesium.Color(.15,.15,.15)
                                })
                            }
                        })
                    }
                })
            },
            addRegion: function() {
                var e = this;
                fetch("static/data/kedu/CHN_adm2.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, r = 0; r < t.length; r++) {
                        var n = t[r]
                          , a = e.getDegreesArrayHeights(n);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                height: 1e4,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/polygon/beij.083ca80f.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    color: Cesium.Color.fromCssColorString("#2F5981").withAlpha(.8)
                                })
                            },
                            wall: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(e.getDegreesArrayHeights(n, 1e4)),
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/kedu/wallgradients.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    transparent: !0,
                                    color: Cesium.Color.fromCssColorString("#106C9D")
                                })
                            }
                        })
                    }
                })
            },
            addPolyline: function() {
                var e = this;
                fetch("static/data/kedu/CHN_adm2.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, r = 0; r < t.length; r++) {
                        var n = t[r]
                          , a = e.getDegreesArrayHeights(n, 1e4)
                          , s = (e.viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                width: 3,
                                material: Cesium.Color.fromCssColorString("#ccc").withAlpha(.4)
                            }
                        }),
                        Cesium.Cartographic.fromCartesian(Cesium.BoundingSphere.fromPoints(Cesium.Cartesian3.fromDegreesArrayHeights(a)).center))
                          , o = Cesium.Math.toDegrees(s.longitude)
                          , u = Cesium.Math.toDegrees(s.latitude);
                        e.viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(o, u, 12e3),
                            label: {
                                text: n.properties.name,
                                fillColor: Cesium.Color.WHITE,
                                scale: .5,
                                font: "normal 84px MicroSoft YaHei",
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,9e6),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-10),
                                outlineWidth: 20,
                                outlineColor: Cesium.Color.BLACK
                            }
                        })
                    }
                })
            },
            addRd: function() {
                var e = Cesium.Cartesian3.fromDegrees(112.404822428185, 31.0895043996517, 400);
                this.rD = new xt3d.AdvancedPlugin.RotatingDial(this.viewer,e,{
                    radius: 4e5,
                    textureUrl: "/static/images/kedu"
                })
            },
            getDegreesArrayHeights: function(e, i) {
                var t = []
                  , r = void 0;
                "MultiPolygon" == e.geometry.type ? r = e.geometry.coordinates[0][0] : "Polygon" == e.geometry.type && (r = e.geometry.coordinates[0]);
                for (var n = 0; n < r.length; n++) {
                    var a = r[n];
                    t.push(a[0]),
                    t.push(a[1]),
                    t.push(i || 0)
                }
                return t
            },
            setView: function() {
                var e = this
                  , i = {
                    destination: {
                        x: -2485908.8757991423,
                        y: 5918142.269908528,
                        z: 2995157.671278651
                    },
                    orientation: {
                        heading: 6.2493612738484785,
                        pitch: -.9003312267207324,
                        roll: 3797085538082001e-20
                    },
                    duration: 5
                };
                setTimeout(function() {
                    e.viewer.scene.camera.flyTo(i)
                }, 2e3)
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , n = {
            data: function() {
                return {}
            },
            mounted: function() {
                r.init("cesium-container")
            },
            beforeDestroy: function() {
                r.destroy()
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
          , a = {
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
        }
          , s = t("VU/8")(n, a, !1, null, null, null);
        i.default = s.exports
    }
});
