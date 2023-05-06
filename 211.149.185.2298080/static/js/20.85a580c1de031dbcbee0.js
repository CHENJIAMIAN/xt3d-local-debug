// smallmodel
webpackJsonp([20], {
    W7VP: function(e, i, n) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = {
            init: function(e) {
                this.initViewer(e),
                this.loadModels(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer(e,{
                    infoBox: !1,
                    selectionIndicator: !1,
                    navigation: !1,
                    animation: !1,
                    shouldAnimate: !0,
                    timeline: !1,
                    baseLayerPicker: !1,
                    geocoder: !1,
                    homeButton: !1,
                    sceneModePicker: !1,
                    navigationHelpButton: !1,
                    imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        url: "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A"
                    })
                }),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            loadModels: function() {
                this.loadGlb(),
                this.loadGltf()
            },
            loadGlb: function() {
                for (var e = [{
                    name: "tree2",
                    scale: 50
                }, {
                    name: "Taxi",
                    scale: 100
                }, {
                    name: "redCar",
                    scale: 3
                }, {
                    name: "Sedan",
                    scale: 100
                }, {
                    name: "PublicBus",
                    scale: 100
                }, {
                    name: "xiaofangyuan",
                    scale: 100
                }, {
                    name: "Cesium_Air",
                    scale: 20,
                    minHeight: 60
                }, {
                    name: "Helicopter",
                    scale: 10
                }, {
                    name: "SubwayTrain",
                    scale: 50
                }, {
                    name: "train",
                    scale: 50
                }, {
                    name: "camera",
                    scale: 100
                }, {
                    name: "leida",
                    scale: 1
                }], i = 0, n = 0; n < e.length; n++) {
                    var a = e[n];
                    this.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(108 + i, 34.008, a.minHeight || 0),
                        model: {
                            uri: appConfig.dataServiceBaseUrl + "glb/" + a.name + ".glb",
                            colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
                            color: Cesium.Color.WHITE,
                            scale: a.scale
                        }
                    }),
                    i += .01
                }
            },
            loadGltf: function() {
                for (var e = [{
                    name: "building",
                    scale: 1
                }, {
                    name: "fengche",
                    scale: 100
                }, {
                    name: "police",
                    scale: 100
                }, {
                    name: "man/walk",
                    scale: 80
                }, {
                    name: "xiaofangche",
                    scale: 30
                }, {
                    name: "police_car",
                    scale: 100
                }, {
                    name: "weixin",
                    scale: .2,
                    minHeight: 50
                }], i = 0, n = 0; n < e.length; n++) {
                    var a = e[n];
                    this.viewer.entities.add({
                        position: Cesium.Cartesian3.fromDegrees(108 + i, 34, a.minHeight || 0),
                        model: {
                            uri: appConfig.dataServiceBaseUrl + "gltf/" + a.name + ".gltf",
                            colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
                            color: Cesium.Color.WHITE,
                            scale: a.scale
                        }
                    }),
                    i += .01
                }
            },
            setView: function() {
                this.viewer.scene.camera.setView({
                    destination: {
                        x: -1646625.898679842,
                        y: 5051289.978356426,
                        z: 3543103.827333385
                    },
                    orientation: {
                        heading: 2.6645352591003757e-15,
                        pitch: -.7876239321656726,
                        roll: 6.283185307179586
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
          , t = {
            mounted: function() {
                a.init("cesium-container")
            },
            beforeDestroy: function() {
                a.destroy()
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
          , o = n("VU/8")(t, s, !1, null, null, null);
        i.default = o.exports
    }
});
