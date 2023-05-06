webpackJsonp([22], {
    "g+R+": function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var r = {
            init: function(e) {
                this.initViewer(e),
                this.setView(),
                this.addPeripheryRegion(),
                this.addRegion(),
                this.addPolyline(),
                this.addLevel2Region();
                var i = Cesium.Cartesian3.fromDegrees(112.404822428185, 31.0895043996517, 400);
                new xt3d.AdvancedPlugin.RotatingDial(this.viewer,i,{
                    radius: 4e5,
                    textureUrl: "/static/images/kedu"
                })
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
                fetch("static/data/kedu/hubei.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, r = 0; r < t.length; r++) {
                        var n = t[r]
                          , a = e.getDegreesArrayHeights(n);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,2e6),
                                height: 1e4,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/kedu/hubei.png"
                                })
                            },
                            wall: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(e.getDegreesArrayHeights(n, 1e4)),
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/kedu/wall.png",
                                    repeat: new Cesium.Cartesian2(0,1)
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
                                width: 1,
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
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,7e6),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-5),
                                outlineWidth: 20,
                                outlineColor: Cesium.Color.BLACK
                            }
                        })
                    }
                })
            },
            addLevel2Region: function() {
                var e = this;
                fetch("static/data/kedu/CHN_adm3.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, r = 0; r < t.length; r++) {
                        var n = t[r]
                          , a = e.getDegreesArrayHeights(n, 1e4);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                height: 10100,
                                material: Cesium.Color.fromRandom().withAlpha(.3)
                            },
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArrayHeights(a),
                                width: 2,
                                material: Cesium.Color.fromCssColorString("#1d953f")
                            }
                        })
                    }
                })
            },
            addPoint: function() {
                var e = Cesium.Cartesian3.fromDegrees(112.46821343978014, 30.990309536057428, 10020);
                new xt3d.PointObject.SampleLabel(this.viewer,e,"示范村"),
                new xt3d.CircleObject.WaveCircle(this.viewer,e,{
                    height: 10020,
                    radius: 16e3,
                    color: Cesium.Color.WHITE,
                    duration: 2e3,
                    count: 3
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
                        x: -2550406.6457611425,
                        y: 5933513.101821548,
                        z: 2846087.502079243
                    },
                    orientation: {
                        heading: 6.19460699732541,
                        pitch: -.8272223589320991,
                        roll: 6404778635804576e-20
                    },
                    duration: 5,
                    complete: function(i) {
                        e.addPoint()
                    }
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
