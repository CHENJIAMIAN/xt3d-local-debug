webpackJsonp([16], {
    C3iq: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = t("fyjX");
        window.turf = n;
        var r = {
            init: function(e) {
                this.initViewer(e),
                this.loadBuildData(),
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
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
                    })
                }),
                this.viewer.scene.globe.depthTestAgainstTerrain = !1,
                this.viewer.animation.container.style.visibility = "hidden",
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2482451.5737749715,
                        y: 4823994.987679441,
                        z: 3343684.149350038
                    },
                    orientation: {
                        heading: 5.8839572005496095,
                        pitch: -.6525781783904963,
                        roll: 6.281712205278232
                    },
                    duration: 1
                })
            },
            loadBuildData: function() {
                var e = this;
                fetch("../static/data/lou.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    var t = i.features;
                    e.twinkleBuildings = [],
                    t.forEach(function(i) {
                        e.addBuilding(i)
                    }),
                    e.startTwinkleBuildings()
                })
            },
            addBuilding: function(e) {
                var i = 4 * Number(e.properties.floor)
                  , t = i > 70 ? Cesium.Color.RED : Cesium.Color.BLUE
                  , n = this.getDegreesArrayHeights(e)
                  , r = this.viewer.entities.add({
                    polygon: {
                        hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(n)),
                        perPositionHeight: !0,
                        extrudedHeight: i,
                        material: t.withAlpha(.5)
                    }
                });
                i > 70 && this.twinkleBuildings.push(r),
                this.addLabel(e)
            },
            startTwinkleBuildings: function() {
                var e = this;
                this.endTwinkleBuildings(),
                this.clearInterval = setInterval(function() {
                    e.twinkleBuildings.map(function(e) {
                        e.show = !e.show
                    })
                }, 600)
            },
            endTwinkleBuildings: function() {
                this.clearInterval && (this.twinkleBuildings.map(function(e) {
                    e.show = !0
                }),
                clearInterval(this.clearInterval))
            },
            addLabel: function(e) {
                var i = n.center(e)
                  , t = 4.2 * Number(e.properties.floor)
                  , r = t > 70 ? Cesium.Color.RED : Cesium.Color.BLUE
                  , s = i.geometry.coordinates
                  , o = new Cesium.PinBuilder;
                this.viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(s[0], s[1], t),
                    billboard: {
                        image: o.fromText(e.properties.floor, r.withAlpha(.8), 48).toDataURL(),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                    }
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
                    i.push(e.properties.BaseHeight)
                }
                return i
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        }
          , s = {
            mounted: function() {
                r.init("cesium-container")
            },
            beforeDestroy: function() {
                r.destroy()
            },
            methods: {}
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
        }
          , a = t("VU/8")(s, o, !1, null, null, null);
        i.default = a.exports
    }
});
