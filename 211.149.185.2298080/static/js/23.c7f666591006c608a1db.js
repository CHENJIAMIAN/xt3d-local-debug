webpackJsonp([23], {
    U87W: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        t("HcO0");
        var n = {
            init: function(e) {
                this.initViewer(e),
                this.loadBuildData(),
                this.addScanCircle(),
                this.addWall(),
                this.setView()
            },
            initViewer: function(e) {
                this.viewer = new Cesium.Viewer("cesium-container",{
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
                    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                        url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
                    })
                });
                var i = this.viewer.scene.postProcessStages;
                this.viewer.scene.brightness = this.viewer.scene.brightness || i.add(Cesium.PostProcessStageLibrary.createBrightnessStage()),
                this.viewer.scene.brightness.enabled = !0,
                this.viewer.scene.brightness.uniforms.brightness = 1.2,
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            loadBuildData: function() {
                this.loadData1(),
                this.loadData2(),
                this.loadData3()
            },
            loadData1: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "http://lab.earthsdk.com/model/27af3f70003311eaae02359b3e5d0653/tileset.json"
                })).readyPromise.then(function(i) {
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        shader: "varying vec3 v_positionEC;\n               void main(void){\n                    vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n                    float glowRange = 50.0; // 光环的移动范围(高度)\n                    gl_FragColor = vec4(0.2,  0.5, 1.0, 1.0); // 颜色\n                    gl_FragColor *= vec4(vec3((position.z + 40.0) / 30.0), 0.2); // 渐变\n                    // 动态光环\n                    float time = fract(czm_frameNumber / 360.0);\n                    time = abs(time - 0.5) * 2.0;\n                    float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));\n                    gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n             }"
                    })
                }).otherwise(function(e) {})
            },
            loadData2: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "http://lab.earthsdk.com/model/212bc470003311eaae02359b3e5d0653/tileset.json"
                })).readyPromise.then(function(i) {
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        shader: "varying vec3 v_positionEC;\n               void main(void){\n                    vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n                    float glowRange = 50.0; // 光环的移动范围(高度)\n                    gl_FragColor = vec4(0.2,  0.5, 1.0, 1.0); // 颜色\n                    gl_FragColor *= vec4(vec3((position.z + 40.0) / 30.0), 0.2); // 渐变\n                    // 动态光环\n                    float time = fract(czm_frameNumber / 360.0);\n                    time = abs(time - 0.5) * 2.0;\n                    float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));\n                    gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n             }"
                    })
                }).otherwise(function(e) {})
            },
            loadData3: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "http://lab.earthsdk.com/model/1b91bf10003311eaae02359b3e5d0653/tileset.json"
                })).readyPromise.then(function(i) {
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        shader: "varying vec3 v_positionEC;\n               void main(void){\n                    vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n                    float glowRange = 50.0; // 光环的移动范围(高度)\n                    gl_FragColor = vec4(0.2,  0.5, 1.0, 1.0); // 颜色\n                    gl_FragColor *= vec4(vec3((position.z + 40.0) / 30.0), 0.2); // 渐变\n                    // 动态光环\n                    float time = fract(czm_frameNumber / 360.0);\n                    time = abs(time - 0.5) * 2.0;\n                    float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));\n                    gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n             }"
                    })
                }).otherwise(function(e) {})
            },
            addScanCircle: function() {
                new xt3d.CircleObject.ScanCircle(this.viewer,{
                    x: -2178278.3680711966,
                    y: 4388536.048142271,
                    z: 4069993.5577284778
                },{
                    color: new Cesium.Color(.5,.8,1,1),
                    radius: 500,
                    url: "/static/images/circle/scancircle.png"
                })
            },
            addWall: function() {
                new xt3d.WallObject.CircleDiffWall(this.viewer,{
                    x: -2177511.1970080775,
                    y: 4389128.1647437345,
                    z: 4069767.0963036907
                },{
                    radius: 300,
                    wallHeight: 200,
                    speed: 1,
                    wallColor: new Cesium.Color(.5,.8,1,1)
                })
            },
            setView: function() {
                this.viewer.scene.camera.flyTo({
                    destination: {
                        x: -2178535.7197663393,
                        y: 4391025.063932634,
                        z: 4069324.109522099
                    },
                    orientation: {
                        heading: .07808864412131555,
                        pitch: -.7641862957753718,
                        roll: .0003580297052918624
                    },
                    duration: 2
                })
            },
            get_fs: function() {
                return "varying vec3 v_positionEC;\n              void main(void){\n                   vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置\n                   float glowRange = 50.0; // 光环的移动范围(高度)\n                   gl_FragColor = vec4(0.2,  0.5, 1.0, 1.0); // 颜色\n                   gl_FragColor *= vec4(vec3((position.z + 40.0) / 30.0), 0.2); // 渐变\n                   // 动态光环\n                   float time = fract(czm_frameNumber / 360.0);\n                   time = abs(time - 0.5) * 2.0;\n                   float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));\n                   gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);\n            }"
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
