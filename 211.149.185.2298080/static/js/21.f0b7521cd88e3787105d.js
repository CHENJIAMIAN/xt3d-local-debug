webpackJsonp([21], {
    b2SM: function(e, i, n) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var t = n("fyjX");
        n("HcO0");
        window.turf = t;
        var o = {
            init: function(e) {
                this.initViewer(e),
                this.loadRegionData(),
                this.setView(),
                this.colors = [Cesium.Color.YELLOW, Cesium.Color.RED, Cesium.Color.AQUA, Cesium.Color.LIME, Cesium.Color.NAVY, Cesium.Color.WHITE],
                this.colorIndex = 0
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
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A"
                    })
                }),
                this.viewer.scene.screenSpaceCameraController.minimumZoomDistance = 7e3,
                this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 12e4;
                var i = new Cesium.UrlTemplateImageryProvider({
                    url: appConfig.dataServiceBaseUrl + "weishanxiang/image/{z}/{x}/{y}.png",
                    tilingScheme: new Cesium.WebMercatorTilingScheme
                });
                this.viewer.imageryLayers.addImageryProvider(i)
            },
            loadRegionData: function() {
                var e = this;
                fetch("../static/data/weishanxiang/weishanxiangbianjie.json").then(function(e) {
                    return e.json()
                }).then(function(i) {
                    var n = i.features[0];
                    e.highlightBoundary = new xt3d.AdvancedPlugin.HighlightBoundary(e.viewer,n),
                    setInterval(function() {
                        e.changeBoundaryColor()
                    }, 1200)
                })
            },
            changeBoundaryColor: function() {
                if (this.highlightBoundary) {
                    var e = this.colors[this.colorIndex];
                    this.colorIndex++,
                    this.colorIndex > this.colors.length - 1 && (this.colorIndex = 0),
                    this.highlightBoundary.changeColor(e)
                }
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2107826.2908801693,
                        y: 5226627.807041473,
                        z: 3013142.068315674
                    },
                    orientation: {
                        heading: 2.987603288299459,
                        pitch: -.968186635399964,
                        roll: .0025565340715658635
                    },
                    duration: 1
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
            },
            methods: {}
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
          , s = n("VU/8")(r, a, !1, null, null, null);
        i.default = s.exports
    }
});
