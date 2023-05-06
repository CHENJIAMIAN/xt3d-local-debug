webpackJsonp([15], {
    "+gb7": function(e, i) {},
    Qtq5: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0"),
        t("+gb7");
        var n = {
            init: function(e) {
                this.initViewer(e),
                this.addRegion2(),
                this.addRegion3(),
                this.addPoint3(),
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
                    imageryProvider: new Cesium.SingleTileImageryProvider({
                        url: "static/images/earth/earth_3.jpg"
                    })
                }),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#0E0A3D"),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            addRegion2: function() {
                var e = this;
                fetch("static/data/beijing/beijing_2.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates[0]
                          , n = e.coordinateToPositions(t, 15e3);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: n,
                                perPositionHeight: !0,
                                material: Cesium.Color.fromCssColorString("#2B5678").withAlpha(.8)
                            },
                            wall: {
                                positions: n,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/wall/wallgradients1.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    color: Cesium.Color.fromCssColorString("#1987A8").withAlpha(.8)
                                })
                            }
                        })
                    })
                })
            },
            addRegion3: function() {
                var e = this;
                fetch("static/data/beijing/beijing_3.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates[0]
                          , n = e.coordinateToPositions(t, 15e3);
                        e.viewer.entities.add({
                            polyline: {
                                positions: n,
                                width: 1,
                                material: Cesium.Color.fromCssColorString("#ccc").withAlpha(.4)
                            }
                        });
                        var o = Cesium.Cartographic.fromCartesian(Cesium.BoundingSphere.fromPoints(n).center)
                          , r = Cesium.Math.toDegrees(o.longitude)
                          , s = Cesium.Math.toDegrees(o.latitude)
                          , a = Cesium.Cartesian3.fromDegrees(r, s, 15010);
                        e.viewer.entities.add({
                            position: a,
                            label: {
                                text: i.properties.name,
                                fillColor: Cesium.Color.WHITE,
                                scale: .5,
                                font: "normal 42px MicroSoft YaHei",
                                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0,7e6),
                                scaleByDistance: new Cesium.NearFarScalar(5e4,1,5e5,.5),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                pixelOffset: new Cesium.Cartesian2(0,-15),
                                outlineWidth: 5,
                                outlineColor: Cesium.Color.BLACK,
                                disableDepthTestDistance: 5e5
                            }
                        })
                    })
                })
            },
            addPoint3: function() {
                var e = this;
                fetch("static/data/beijing/beijing_3point.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates
                          , n = Cesium.Cartesian3.fromDegrees(t[0], t[1], 15010);
                        new xt3d.LabelPlotting.LedText(e.viewer,n,3e3 + Math.floor(100 * Math.random())),
                        new xt3d.AdvancedPlugin.ConeGlow(e.viewer,n,{
                            height: 25e3,
                            bottomRadius: 1500,
                            color: Cesium.Color.CYAN
                        })
                    })
                })
            },
            coordinateToPositions: function(e, i) {
                var t = [];
                return e.map(function(e) {
                    t.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], i || 0))
                }),
                t
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2285318.922205349,
                        y: 4561449.436806091,
                        z: 4046846.8682504706
                    },
                    orientation: {
                        heading: 6.174723072454894,
                        pitch: -.71825433447645,
                        roll: 10271026651409443e-22
                    },
                    duration: 2
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , o = {
            mounted: function() {
                n.init("cesium-container")
            },
            beforeDestroy: function() {
                n.destroy()
            },
            methods: {}
        }
          , r = {
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
          , s = t("VU/8")(o, r, !1, null, null, null);
        i.default = s.exports
    }
});
