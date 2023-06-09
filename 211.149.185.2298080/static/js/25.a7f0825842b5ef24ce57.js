webpackJsonp([25], {
    ZYpZ: function(e, i, t) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = t("d7EF")
          , a = t.n(n)
          , r = (t("HcO0"),
        {
            init: function(e) {
                this.initViewer(e),
                this.addData(),
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
                    navigationHelpButton: !1
                }),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.scene.fxaa = !0,
                this.viewer.scene.postProcessStages.fxaa.enabled = !0
            },
            addData: function() {
                this.loadBuildData(),
                this.addScanline(),
                this.addScanCircle(),
                this.createODLines(),
                this.createODLines2(),
                this.createODLines3(),
                this.addConeGlow()
            },
            addScanline: function() {
                var e = Cesium.Cartesian3.fromDegrees(121.5022094577335, 31.23654188965993, 0);
                new xt3d.AdvancedPlugin.Scanline(this.viewer,e,{
                    color: Cesium.Color.CYAN,
                    radius: 1500,
                    duration: 5e3
                })
            },
            addScanCircle: function() {
                var e = Cesium.Cartesian3.fromDegrees(121.518505410478, 31.23036283107738, 0);
                new xt3d.CircleObject.ScanCircle(this.viewer,e,{
                    radius: 500,
                    color: new Cesium.Color(.5,.8,1,1),
                    url: "/static/images/circle/scancircle.png"
                })
            },
            createODLines: function() {
                var e = this
                  , i = [[[2.120576951415724, .5453286305283411, 0], [2.1206180324809942, .5452742515355276, 0], [2.1206522870077222, .5452127930893627, 0], [2.1206589437154424, .5451630655115893, 0], [2.1207314498206467, .5450382941603948, 9.313225746154785e-10]], [[2.1209955007242574, .5452933880932761, 0], [2.1209282195105272, .545289825083161, 0], [2.1208692016474275, .5452876777088307, 0], [2.120819162511318, .5452826799554552, 0], [2.120783810274953, .5452697527668044, 0], [2.1207335742022293, .5452568892680687, 0], [2.1206962437670036, .5452449834073527, 9.313225746154785e-10], [2.120661134416048, .5452280242012201, 0], [2.120638649850512, .5452166875660143, 0], [2.120618096957342, .545213841975332, 0], [2.1205990690837795, .545215655029966, 0], [2.1205555448547644, .5452309724456519, 0], [2.120518239373133, .545245934727075, 0], [2.120487939951654, .5452532353559607, 0], [2.120453877869143, .5452771262379986, 0]], [[2.1207720402496113, .5447232254659223, 0], [2.120793937457453, .5447614096520289, 0], [2.120813924804299, .5447878347320643, 0], [2.120822805668622, .5448060918960522, 0], [2.1208257532307546, .5448322042009828, 0], [2.120829308604679, .5448854085667205, 9.313225746154785e-10], [2.120829710319531, .5449227070309821, -1.3969838619232178e-9], [2.1208166872422236, .544965451614071, 0], [2.1207970443299544, .5450225616224018, 0], [2.1207741955597377, .5450815697881131, 0], [2.1207472452404077, .5451390197693765, 0], [2.120715891711618, .5451913500871663, 0], [2.120686154707263, .5452393433291649, 0], [2.12063135560303, .5453206355916543, 0]], [[2.121160980714632, .5451757121823626, 0], [2.1210251435952436, .5451293851641247, 0], [2.1209452677709963, .5451042703034664, 9.313225746154785e-10], [2.1208610109812414, .5450787900247277, 0], [2.120760520282932, .5450446749446803, 0], [2.1207079872433443, .5450233097361727, 0], [2.120655050843051, .5450014714916114, 0]], [[2.120812500352057, .5453409107030308, 0], [2.120889078346998, .545195520436419, 0], [2.120932108701968, .5451150725145038, 0], [2.1209760848229955, .5450053244299348, 0], [2.12100809512331, .5449329288607905, 0], [2.1210103662286377, .5448484817861251, 0], [2.1209514513937577, .5447197092694818, 0], [2.120915420918161, .5446602609794765, 0]], [[2.1207306918664655, .5450365938435415, 9.313225746154785e-10], [2.1206990239651544, .5450969027142336, 0], [2.120677978213145, .5451274025996179, 0], [2.120658030989688, .5451591032035257, 0], [2.1206162009039806, .5451494731344788, 0], [2.1205521515380683, .5451454787671309, 0], [2.120523261544574, .5451764652644532, 0], [2.120513465572076, .545186828361311, 0], [2.1205064729532204, .5452286596830263, 0], [2.1205097293904305, .5452390289664278, 0], [2.1205155659504875, .5452579743863037, 0], [2.1205339607444076, .545278609470748, 0], [2.120560671532377, .5452975128166889, 0], [2.1205860070598015, .5453142541502414, 9.313225746154785e-10]], [[2.1207475456110645, .5447800539523988, 0], [2.120758418929566, .5448033612258552, 0], [2.120760641853426, .5448290569441138, 9.313225746154785e-10], [2.1207520812530873, .5448549639478996, 0], [2.120739040764019, .5448955019165921, 0], [2.1207330217222946, .5449114209250849, 0], [2.120718556398262, .5449340150779083, 0], [2.120713075825238, .544947520937067, 0], [2.120705542548285, .5449750973423848, 0], [2.1206999424341655, .5449955334381246, 0], [2.120687471724567, .5450193172680584, 0], [2.1206764015730624, .5450357466832338, 0], [2.120663102383312, .5450423671149535, 0], [2.1206448093335357, .5450499263807379, 9.313225746154785e-10], [2.120632844942622, .5450538781259359, 0], [2.120622060207328, .5450609589527403, 0], [2.1206155051610045, .5450684063880887, 0], [2.120607014920696, .5450806634111063, 0], [2.1205992267700324, .5450923313279744, 9.313225746154785e-10], [2.120584223402013, .5451085782187807, 0], [2.120576665442944, .5451174618031969, 0], [2.1205701463581166, .5451484523716619, 0], [2.1205668616484528, .5451880772265143, 0], [2.120564504835388, .5452216324909629, 0], [2.120566743584541, .5452398398463616, 0], [2.1205793907371806, .5452571562150061, 0], [2.1206001724906343, .5452746261479045, 0], [2.1206140688131194, .5452855227986639, 0], [2.1206437404304954, .545302603645019, 0], [2.120662464415334, .5453071556708504, 9.313225746154785e-10], [2.1206966046753832, .5453118255745306, 0], [2.120728244569391, .5453141431903682, 0], [2.1207790870639474, .5453081271451783, 0], [2.1207999960307644, .5453059696492232, 0], [2.1208412595933046, .5453064111342434, 0]], [[2.121158021864907, .5449751074159752, 9.313225746154785e-10], [2.1210824723034527, .5450174633121871, 0], [2.120992322328455, .5450701295875267, 9.313225746154785e-10], [2.1209337630351115, .5451036284263123, 9.313225746154785e-10], [2.1208609626501214, .5451304457577895, 9.313225746154785e-10], [2.1207686896794486, .5451607280138492, 9.313225746154785e-10], [2.1207276250972584, .5451726734688432, 0], [2.1206842408878455, .5451860277258503, 0], [2.1206261209699546, .5452008662996621, 0], [2.1205742546569972, .5452227902910405, 0], [2.120525926857736, .5452438874376151, 9.313225746154785e-10], [2.120511201654767, .5452494511671568, 0], [2.120490450284154, .5452515681283203, 0], [2.1204606323651403, .5452705556733306, 0]]];
                i.push.apply(i, i);
                i.map(function(i) {
                    var t = [];
                    i.map(function(e) {
                        return [Cesium.Math.toDegrees(e[0]), Cesium.Math.toDegrees(e[1])]
                    }).forEach(function(e) {
                        t.push(e[0]),
                        t.push(e[1])
                    }),
                    e.viewer.entities.add({
                        polyline: {
                            positions: Cesium.Cartesian3.fromDegreesArray(t),
                            width: 3,
                            material: new xt3d.PolylineObject.PolylineMigrateMaterialProperty({
                                color: new Cesium.Color(.5 * Math.random() + .5,.8 * Math.random() + .2,0,Math.random()),
                                duration: 2e3 + 1e3 * Math.random(),
                                url: "/static/images/polylinematerial/polylinemigrate.png"
                            }),
                            clampToGround: !0
                        }
                    })
                })
            },
            createODLines2: function() {
                var e = this
                  , i = [[[2.120576951415724, .5453286305283411, 0], [2.1206180324809942, .5452742515355276, 0], [2.1206522870077222, .5452127930893627, 0], [2.1206589437154424, .5451630655115893, 0], [2.1207314498206467, .5450382941603948, 9.313225746154785e-10]], [[2.1209955007242574, .5452933880932761, 0], [2.1209282195105272, .545289825083161, 0], [2.1208692016474275, .5452876777088307, 0], [2.120819162511318, .5452826799554552, 0], [2.120783810274953, .5452697527668044, 0], [2.1207335742022293, .5452568892680687, 0], [2.1206962437670036, .5452449834073527, 9.313225746154785e-10], [2.120661134416048, .5452280242012201, 0], [2.120638649850512, .5452166875660143, 0], [2.120618096957342, .545213841975332, 0], [2.1205990690837795, .545215655029966, 0], [2.1205555448547644, .5452309724456519, 0], [2.120518239373133, .545245934727075, 0], [2.120487939951654, .5452532353559607, 0], [2.120453877869143, .5452771262379986, 0]], [[2.1207720402496113, .5447232254659223, 0], [2.120793937457453, .5447614096520289, 0], [2.120813924804299, .5447878347320643, 0], [2.120822805668622, .5448060918960522, 0], [2.1208257532307546, .5448322042009828, 0], [2.120829308604679, .5448854085667205, 9.313225746154785e-10], [2.120829710319531, .5449227070309821, -1.3969838619232178e-9], [2.1208166872422236, .544965451614071, 0], [2.1207970443299544, .5450225616224018, 0], [2.1207741955597377, .5450815697881131, 0], [2.1207472452404077, .5451390197693765, 0], [2.120715891711618, .5451913500871663, 0], [2.120686154707263, .5452393433291649, 0], [2.12063135560303, .5453206355916543, 0]], [[2.121160980714632, .5451757121823626, 0], [2.1210251435952436, .5451293851641247, 0], [2.1209452677709963, .5451042703034664, 9.313225746154785e-10], [2.1208610109812414, .5450787900247277, 0], [2.120760520282932, .5450446749446803, 0], [2.1207079872433443, .5450233097361727, 0], [2.120655050843051, .5450014714916114, 0]], [[2.120812500352057, .5453409107030308, 0], [2.120889078346998, .545195520436419, 0], [2.120932108701968, .5451150725145038, 0], [2.1209760848229955, .5450053244299348, 0], [2.12100809512331, .5449329288607905, 0], [2.1210103662286377, .5448484817861251, 0], [2.1209514513937577, .5447197092694818, 0], [2.120915420918161, .5446602609794765, 0]], [[2.1207306918664655, .5450365938435415, 9.313225746154785e-10], [2.1206990239651544, .5450969027142336, 0], [2.120677978213145, .5451274025996179, 0], [2.120658030989688, .5451591032035257, 0], [2.1206162009039806, .5451494731344788, 0], [2.1205521515380683, .5451454787671309, 0], [2.120523261544574, .5451764652644532, 0], [2.120513465572076, .545186828361311, 0], [2.1205064729532204, .5452286596830263, 0], [2.1205097293904305, .5452390289664278, 0], [2.1205155659504875, .5452579743863037, 0], [2.1205339607444076, .545278609470748, 0], [2.120560671532377, .5452975128166889, 0], [2.1205860070598015, .5453142541502414, 9.313225746154785e-10]], [[2.1207475456110645, .5447800539523988, 0], [2.120758418929566, .5448033612258552, 0], [2.120760641853426, .5448290569441138, 9.313225746154785e-10], [2.1207520812530873, .5448549639478996, 0], [2.120739040764019, .5448955019165921, 0], [2.1207330217222946, .5449114209250849, 0], [2.120718556398262, .5449340150779083, 0], [2.120713075825238, .544947520937067, 0], [2.120705542548285, .5449750973423848, 0], [2.1206999424341655, .5449955334381246, 0], [2.120687471724567, .5450193172680584, 0], [2.1206764015730624, .5450357466832338, 0], [2.120663102383312, .5450423671149535, 0], [2.1206448093335357, .5450499263807379, 9.313225746154785e-10], [2.120632844942622, .5450538781259359, 0], [2.120622060207328, .5450609589527403, 0], [2.1206155051610045, .5450684063880887, 0], [2.120607014920696, .5450806634111063, 0], [2.1205992267700324, .5450923313279744, 9.313225746154785e-10], [2.120584223402013, .5451085782187807, 0], [2.120576665442944, .5451174618031969, 0], [2.1205701463581166, .5451484523716619, 0], [2.1205668616484528, .5451880772265143, 0], [2.120564504835388, .5452216324909629, 0], [2.120566743584541, .5452398398463616, 0], [2.1205793907371806, .5452571562150061, 0], [2.1206001724906343, .5452746261479045, 0], [2.1206140688131194, .5452855227986639, 0], [2.1206437404304954, .545302603645019, 0], [2.120662464415334, .5453071556708504, 9.313225746154785e-10], [2.1206966046753832, .5453118255745306, 0], [2.120728244569391, .5453141431903682, 0], [2.1207790870639474, .5453081271451783, 0], [2.1207999960307644, .5453059696492232, 0], [2.1208412595933046, .5453064111342434, 0]], [[2.121158021864907, .5449751074159752, 9.313225746154785e-10], [2.1210824723034527, .5450174633121871, 0], [2.120992322328455, .5450701295875267, 9.313225746154785e-10], [2.1209337630351115, .5451036284263123, 9.313225746154785e-10], [2.1208609626501214, .5451304457577895, 9.313225746154785e-10], [2.1207686896794486, .5451607280138492, 9.313225746154785e-10], [2.1207276250972584, .5451726734688432, 0], [2.1206842408878455, .5451860277258503, 0], [2.1206261209699546, .5452008662996621, 0], [2.1205742546569972, .5452227902910405, 0], [2.120525926857736, .5452438874376151, 9.313225746154785e-10], [2.120511201654767, .5452494511671568, 0], [2.120490450284154, .5452515681283203, 0], [2.1204606323651403, .5452705556733306, 0]]];
                (i = i.flatMap(function(e) {
                    return e
                })).map(function(i) {
                    var t = [Cesium.Cartesian3.fromRadians(i[0], i[1], i[2]), Cesium.Cartesian3.fromRadians(i[0], i[1], i[2] + 500 * Math.random())];
                    e.viewer.entities.add({
                        polyline: {
                            positions: t,
                            width: 2,
                            material: new xt3d.PolylineObject.PolylineTrialFlowMaterialProperty({
                                color: new Cesium.Color(.5,.8,1,1),
                                duration: 3e3 + 6e3 * Math.random()
                            })
                        }
                    })
                })
            },
            addConeGlow: function() {
                var e = this
                  , i = void 0;
                [[[2.1202907282192385, .5450835546419367, 1.5], Cesium.Color.CYAN], [[2.120125294340532, .5453135338319917, 1.5], Cesium.Color.CYAN], [[2.120593634919066, .545503909863893, 1.5], Cesium.Color.CYAN], [[2.120633904525988, .5448141367213986, 1.5], Cesium.Color.CYAN], [[2.1208228652896737, .545141073908163, 1.5], Cesium.Color.YELLOW], [[2.120461948038486, .5451830324218808, 1.5], Cesium.Color.CYAN], [[2.1204975918398317, .5452978537884561, 1.5], Cesium.Color.YELLOW], [[2.1207024221200843, .5453525660588958, 1.5], Cesium.Color.RED], [[2.1207404597752664, .5451854942212021, 1.5], Cesium.Color.CYAN]].forEach(function(t) {
                    var n = a()(t, 2)
                      , r = n[0]
                      , o = n[1];
                    i = Cesium.Cartesian3.fromRadians(r[0], r[1], r[2]),
                    new xt3d.AdvancedPlugin.ConeGlow(e.viewer,i,{
                        height: 300,
                        bottomRadius: 12,
                        color: o
                    })
                })
            },
            createODLines3: function() {
                var e = this
                  , i = [[[2.120597930315031, .5451624300822016, 400], [2.1202907282192385, .5450835546419367, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.120125294340532, .5453135338319917, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.120593634919066, .545503909863893, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.120633904525988, .5448141367213986, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.1208228652896737, .545141073908163, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.120461948038486, .5451830324218808, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.1204975918398317, .5452978537884561, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.1207024221200843, .5453525660588958, 1.5]], [[2.120597930315031, .5451624300822016, 400], [2.1207404597752664, .5451854942212021, 1.5]]];
                i.push.apply(i, i);
                i.map(function(i) {
                    var t = Cesium.Cartesian3.fromRadians(i[0][0], i[0][1], i[0][2])
                      , n = Cesium.Cartesian3.fromRadians(i[1][0], i[1][1], i[1][2])
                      , a = e.generateCurve(t, n);
                    e.viewer.entities.add({
                        polyline: {
                            positions: a,
                            width: 3,
                            material: new xt3d.PolylineObject.PolylineTrialFlowMaterialProperty({
                                color: new Cesium.Color(.5,.8,1,1),
                                duration: 3e3 + 6e3 * Math.random()
                            })
                        }
                    })
                })
            },
            generateCurve: function(e, i) {
                var t = new Cesium.Cartesian3;
                Cesium.Cartesian3.add(e, i, t);
                var n = new Cesium.Cartesian3;
                Cesium.Cartesian3.divideByScalar(t, 2, n);
                var a = Cesium.Cartographic.fromCartesian(n);
                a.height = Cesium.Cartesian3.distance(e, i) / 3;
                var r = new Cesium.Cartesian3;
                Cesium.Ellipsoid.WGS84.cartographicToCartesian(a, r);
                for (var o = new Cesium.CatmullRomSpline({
                    times: [0, .5, 1],
                    points: [e, r, i]
                }), s = [], l = 0; l < 200; l++)
                    s.push(o.evaluate(l / 200));
                return s
            },
            loadBuildData: function() {
                var e = this;
                this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                    url: "https://lab.earthsdk.com/model/702aa950d03c11e99f7ddd77cbe22fea/tileset.json"
                })).readyPromise.then(function(i) {
                    new xt3d.BuildingEffects.CustomShaderEffect(e.viewer,i,{
                        color: "0.2, 0.5, 1.0, 1.0",
                        glowRange: !0,
                        glowRangeHeight: "100.0"
                    })
                }).otherwise(function(e) {})
            },
            setView: function() {
                this.viewer.scene.camera.setView({
                    duration: 1,
                    destination: {
                        x: -2851697.676086482,
                        y: 4653980.487640188,
                        z: 3291060.344763821
                    },
                    orientation: {
                        heading: 2.890028628915102,
                        pitch: -.4553698936401802,
                        roll: .0008234034582121907
                    }
                })
            },
            destroy: function() {
                this.viewer.entities.removeAll(),
                this.viewer.imageryLayers.removeAll(!0),
                this.viewer.destroy()
            }
        })
          , o = {
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
          , l = t("VU/8")(o, s, !1, null, null, null);
        i.default = l.exports
    }
});
