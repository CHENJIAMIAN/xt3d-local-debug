webpackJsonp([27], {
    eMhA: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var n = {
            init: function(e) {
                this.initViewer(e),
                this.load3dtiles(),
                this.addZhuchengBoundary(),
                this.addZhuchengRegion(),
                this.addLine(),
                this.addJiedaoLabel(),
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
            load3dtiles: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: appConfig.dataServiceBaseUrl + "beijingzhuchengqu/building/tileset.json"
                })).readyPromise.then(function(i) {
                    e.setTilesetHeight(i);
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        shader: "varying vec3 v_positionEC;\n                    void main(void){\n                        vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n                        float glowRange = 100.0; // 光环的移动范围(高度)\n                        gl_FragColor = vec4(0.47, 0.47, 1.0, 1.0); // 颜色\n                        gl_FragColor *= vec4(vec3(position.z / 100.0), 1.0); // 渐变\n                     }\n                   "
                    })
                }).otherwise(function(e) {})
            },
            setTilesetHeight: function(e) {
                var i = Cesium.Cartographic.fromCartesian(e.boundingSphere.center)
                  , t = Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, i.height)
                  , n = Cesium.Cartesian3.fromRadians(i.longitude, i.latitude, 425)
                  , o = Cesium.Cartesian3.subtract(n, t, new Cesium.Cartesian3);
                e.modelMatrix = Cesium.Matrix4.fromTranslation(o)
            },
            addZhuchengRegion: function() {
                var e = this;
                fetch("static/data/beijingzhucheng/boundary.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates[0]
                          , n = e.coordinateToPositions(t, 300);
                        e.viewer.entities.add({
                            polygon: {
                                hierarchy: n,
                                perPositionHeight: !0,
                                material: Cesium.Color.fromCssColorString("#101338")
                            },
                            wall: {
                                positions: n,
                                material: new Cesium.ImageMaterialProperty({
                                    image: "static/images/wall/wallgradients1.png",
                                    repeat: new Cesium.Cartesian2(0,1),
                                    color: Cesium.Color.BLACK.withAlpha(.99)
                                })
                            }
                        })
                    })
                })
            },
            addZhuchengBoundary: function() {
                var e = this;
                fetch("static/data/beijingzhucheng/boundary.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates[0]
                          , n = e.coordinateToPositions(t, 100);
                        e.viewer.entities.add({
                            polyline: {
                                positions: n,
                                width: 1,
                                material: Cesium.Color.fromCssColorString("#4705FF")
                            }
                        })
                    })
                })
            },
            addLine: function() {
                var e = this;
                fetch("static/data/beijingzhucheng/line.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.map(function(i) {
                        var t = i.geometry.coordinates
                          , n = e.coordinateToPositions(t, 300);
                        e.viewer.entities.add({
                            polyline: {
                                positions: n,
                                width: 1,
                                material: new xt3d.PolylineObject.PolylineTrialFlowMaterialProperty({
                                    color: Cesium.Color.CYAN,
                                    duration: 5e3
                                })
                            }
                        })
                    })
                })
            },
            addJiedaoLabel: function() {
                var e = this;
                fetch("static/data/beijingzhucheng/point3d.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    for (var t = i.features, n = 0; n < t.length; n++) {
                        var o = t[n]
                          , r = o.geometry.coordinates
                          , a = Cesium.Cartesian3.fromDegrees(r[0], r[1], 300);
                        new xt3d.LabelPlotting.ShulieText(e.viewer,a,o.properties.Name),
                        new xt3d.CircleObject.WaveCircle(e.viewer,a,{
                            height: 320,
                            radius: 200,
                            duration: 5e3,
                            color: Cesium.Color.fromCssColorString("#004F92"),
                            count: 2
                        })
                    }
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
                        x: -2188262.2608110863,
                        y: 4389495.266845838,
                        z: 4069328.839255339
                    },
                    orientation: {
                        heading: 5.133712841088872,
                        pitch: -.4079986181529469,
                        roll: 6.279899942967674
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
          , a = t("VU/8")(o, r, !1, null, null, null);
        i.default = a.exports
    }
});
