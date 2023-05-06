webpackJsonp([24], {
    LgpW: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var n = {
            init: function(e) {
                this.initViewer(e),
                this.colors = [Cesium.Color.CORNFLOWERBLUE, Cesium.Color.CORAL, Cesium.Color.YELLOW, Cesium.Color.TURQUOISE],
                this.loadBuildData(),
                this.loadRegions(),
                this.loadRegionLines(),
                this.addLabels(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    navigation: !1,
                    animation: !0,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    shouldAnimate: !0,
                    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
                    })
                }),
                this.viewer.scene.globe.depthTestAgainstTerrain = !1,
                this.viewer.animation.container.style.visibility = "hidden";
                var i = this.viewer.scene.postProcessStages;
                this.viewer.scene.brightness = this.viewer.scene.brightness || i.add(Cesium.PostProcessStageLibrary.createBrightnessStage()),
                this.viewer.scene.brightness.enabled = !0,
                this.viewer.scene.brightness.uniforms.brightness = 1.2,
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2390920.692991348,
                        y: 5387443.48486147,
                        z: 2430877.49942038
                    },
                    orientation: {
                        heading: 2.571246813023412,
                        pitch: -.37852448103718217,
                        roll: .0013778322231097206
                    },
                    duration: 1
                })
            },
            addLabels: function() {
                var e = Cesium.Cartesian3.fromDegrees(113.95048636945164, 22.526819947321343, 3.12819240940834);
                new xt3d.PointObject.DynamicDivLabel(this.viewer,e,"檀香山");
                e = Cesium.Cartesian3.fromDegrees(113.93966572638087, 22.5260098335836, 2.156748986156585),
                new xt3d.PointObject.DynamicDivLabel(this.viewer,e,"望江嘉园"),
                e = Cesium.Cartesian3.fromDegrees(113.94983295865637, 22.53645932755602, 1.1992481678410885),
                new xt3d.PointObject.DynamicDivLabel(this.viewer,e,"风华里"),
                e = Cesium.Cartesian3.fromDegrees(113.93864069501294, 22.5358286217726, 17.51984456614089),
                new xt3d.PointObject.DynamicDivLabel(this.viewer,e,"御水湾")
            },
            loadRegions: function() {
                var e = this;
                fetch("static/data/digitalcommunity/region.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.forEach(function(i, t) {
                        e.addRegion(i, t)
                    })
                })
            },
            addRegion: function(e, i) {
                var t = this.getDegreesArrayHeights(e);
                this.viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(t)),
                        perPositionHeight: !0,
                        extrudedHeight: 1,
                        material: this.colors[i].withAlpha(.3)
                    }
                })
            },
            loadRegionLines: function() {
                var e = this;
                fetch("../static/data/digitalcommunity/region_1.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    i.features.forEach(function(i, t) {
                        e.addRegionLine(i, t)
                    })
                })
            },
            addRegionLine: function(e, i) {
                var t = this.getDegreesArrayHeights(e, 1);
                this.viewer.entities.add({
                    polyline: {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(t),
                        material: new xt3d.PolylineObject.PolylineTrailMaterialProperty({
                            speed: 2 * Math.random(),
                            color: this.colors[i].withAlpha(.7),
                            percent: .5,
                            gradient: .01
                        }),
                        width: 3
                    }
                })
            },
            getDegreesArrayHeights: function(e, i) {
                var t = []
                  , n = void 0;
                "MultiPolygon" == e.geometry.type ? n = e.geometry.coordinates[0][0] : "Polygon" == e.geometry.type ? n = e.geometry.coordinates[0] : "LineString" == e.geometry.type && (n = e.geometry.coordinates);
                for (var r = 0; r < n.length; r++) {
                    var s = n[r];
                    t.push(s[0]),
                    t.push(s[1]),
                    t.push(i || 0)
                }
                return t
            },
            loadBuildData: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "static/data/digitalcommunity/b/tileset.json"
                })).readyPromise.then(function(i) {
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        color: "0.2, 0.5, 1.0, 1.0",
                        glowRange: !0,
                        glowRangeHeight: "100.0"
                    })
                }).otherwise(function(e) {})
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
          , o = t("VU/8")(r, s, !1, null, null, null);
        i.default = o.exports
    }
});
