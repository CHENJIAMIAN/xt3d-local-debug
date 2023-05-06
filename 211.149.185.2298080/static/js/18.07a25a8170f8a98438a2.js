webpackJsonp([18], {
    KihH: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var n = t("fyjX")
          , o = {
            init: function(e) {
                this.initViewer(e),
                this.load3dtiles();
                new xt3d.SceneDominate.CustomBgImage(this.viewer,"/static/images/20211124161941.png")
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
            addBottomPolygon: function() {
                var e = [];
                [[121.92103025110953, 40.89734335293406, 0], [121.9225766718703, 40.894839782489825, 0], [121.92391417504646, 40.895374538393305, 0], [121.92358544934727, 40.89587226364337, 0], [121.9268629430762, 40.89708418197949, 0], [121.92549224786829, 40.899278965933256, 0], [121.92255195684477, 40.8981503642774, 0], [121.92259995564194, 40.89792641051201, 0]].forEach(function(i) {
                    e.push(Cesium.Cartesian3.fromDegrees(i[0], i[1], i[2]))
                }),
                this.viewer.entities.add({
                    polygon: {
                        hierarchy: e,
                        height: -2,
                        extrudedHeight: -1.9,
                        material: Cesium.Color.fromCssColorString("#05fbf6").withAlpha(.4)
                    }
                })
            },
            addWall: function() {
                var e = [];
                [[121.92103025110953, 40.89734335293406, -20], [121.9225766718703, 40.894839782489825, -20], [121.92391417504646, 40.895374538393305, -20], [121.92358544934727, 40.89587226364337, -20], [121.9268629430762, 40.89708418197949, -20], [121.92549224786829, 40.899278965933256, -20], [121.92255195684477, 40.8981503642774, -20], [121.92259995564194, 40.89792641051201, -20], [121.92103025110953, 40.89734335293406, -20]].forEach(function(i) {
                    e.push(Cesium.Cartesian3.fromDegrees(i[0], i[1], i[2]))
                });
                new xt3d.WallObject.FlowWall(this.viewer,e,{
                    wallHeight: 80,
                    wallColor: Cesium.Color.fromCssColorString("#05fbf6").withAlpha(.6),
                    materialType: xt3d.WallObject.MaterialTypes.BaseGradient
                })
            },
            addPolylineFlyings: function() {
                var e = this
                  , i = n.polygon([[[121.92103025110953, 40.89734335293406], [121.9225766718703, 40.894839782489825], [121.92391417504646, 40.895374538393305], [121.92358544934727, 40.89587226364337], [121.9268629430762, 40.89708418197949], [121.92549224786829, 40.899278965933256], [121.92255195684477, 40.8981503642774], [121.92259995564194, 40.89792641051201], [121.92103025110953, 40.89734335293406]]])
                  , t = n.bbox(i)
                  , o = void 0
                  , r = void 0
                  , s = void 0;
                n.randomPoint(60, {
                    bbox: t
                }).features.forEach(function(i) {
                    o = i.geometry.coordinates,
                    r = Cesium.Cartesian3.fromDegrees(o[0], o[1], -400),
                    s = Cesium.Cartesian3.fromDegrees(o[0], o[1], 600 * Math.random()),
                    e.addPolylineFlying([r, s])
                })
            },
            addPolylineFlying: function(e) {
                this.viewer.entities.add({
                    polyline: {
                        positions: e,
                        width: 1,
                        material: new xt3d.PolylineObject.PolylineTrailMaterialProperty({
                            speed: 1 * Math.random(),
                            color: Cesium.Color.CYAN,
                            percent: .02,
                            gradient: .01
                        })
                    }
                })
            },
            load3dtiles: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: appConfig.dataServiceBaseUrl + "3dtiles/gongchang/tileset.json"
                })).readyPromise.then(function(i) {
                    e.setView(),
                    e.addBottomPolygon(),
                    e.addWall(),
                    e.addPolylineFlyings()
                }).otherwise(function(e) {})
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2552741.949497928,
                        y: 4097961.1985365124,
                        z: 4154156.8020691318
                    },
                    orientation: {
                        heading: 2.2825784454346065,
                        pitch: -.4656422218647047,
                        roll: .002812490471258755
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
                o.init("cesium-container")
            },
            beforeDestroy: function() {
                o.destroy()
            }
        }
          , s = {
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
          , a = t("VU/8")(r, s, !1, null, null, null);
        i.default = a.exports
    }
});
