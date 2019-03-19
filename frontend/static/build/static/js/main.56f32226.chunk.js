(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
    23: function (e, t, a) {
        e.exports = a(31)
    }, 29: function (e, t, a) {
    }, 30: function (e, t, a) {
    }, 31: function (e, t, a) {
        "use strict";
        a.r(t);
        var n = a(0), l = a.n(n), c = a(18), i = a.n(c), s = (a(29), a(7)), o = a(8), r = a(10), m = a(9), u = a(11),
            h = a(14), p = a(34), d = function (e) {
                function t(e) {
                    var a;
                    return Object(s.a)(this, t), (a = Object(r.a)(this, Object(m.a)(t).call(this, e))).state = {callList: []}, a
                }

                return Object(u.a)(t, e), Object(o.a)(t, [{
                    key: "componentDidMount", value: function () {
                        var e = this;
                        fetch("/api/dispatchcall/").then(function (e) {
                            return 200 !== e.status && console.log("problem"), e.json()
                        }).then(function (t) {
                            Object(h.a)(e.state.callList).push(t), console.log("json", t), e.setState({callList: t})
                        })
                    }
                }, {
                    key: "render", value: function () {
                        return l.a.createElement(g, {callList: this.state.callList, route: this.props.route})
                    }
                }]), t
            }(n.Component), g = function (e) {
                function t(e) {
                    var a;
                    return Object(s.a)(this, t), (a = Object(r.a)(this, Object(m.a)(t).call(this, e))).handleToggle = function (e) {
                        e.target.nextSibling.classList.toggle("d-none")
                    }, a.state = {active: !1}, a
                }

                return Object(u.a)(t, e), Object(o.a)(t, [{
                    key: "render", value: function () {
                        var e = this, t = this.props.callList.map(function (t) {
                            return l.a.createElement("li", {key: t.id}, l.a.createElement("img", {
                                src: t.image,
                                alt: ""
                            }), l.a.createElement("p", null, "Call #:", t.id), l.a.createElement("p", null, "Phone:", t.phone), l.a.createElement("p", null, "Date:", t.date), l.a.createElement(p.a, {onClick: e.handleToggle}, "Show Images"), l.a.createElement("ul", {className: " d-none"}, l.a.createElement("li", null, t.scene_images.map(function (e, t) {
                                return l.a.createElement("img", {className: "list_image", key: t, src: e.image})
                            }))))
                        });
                        return l.a.createElement("div", null, l.a.createElement("div", {className: "topDispatch"}, l.a.createElement("h2", null, "Welcome Dispatcher ! Create A New Call, Or Revisit Previous Calls"), l.a.createElement(p.a, {
                            variant: "danger",
                            className: "switch",
                            onClick: function (t) {
                                e.props.route("callCreate")
                            }
                        }, "Start A Call")), l.a.createElement("div", null, l.a.createElement("ul", {className: "image-toggle"}, t)))
                    }
                }]), t
            }(n.Component), b = a(5), f = a(33), v = function (e) {
                function t(e) {
                    var a;
                    return Object(s.a)(this, t), (a = Object(r.a)(this, Object(m.a)(t).call(this, e))).state = {
                        image_preview: "",
                        imageCollection: [],
                        image: ""
                    }, a.handleImage = a.handleImage.bind(Object(b.a)(Object(b.a)(a))), a.submitImage = a.submitImage.bind(Object(b.a)(Object(b.a)(a))), a
                }

                return Object(u.a)(t, e), Object(o.a)(t, [{
                    key: "handleImage", value: function (e) {
                        var t = this;
                        e.preventDefault();
                        var a = e.target.files[0], n = new FileReader;
                        n.onloadend = function () {
                            return t.setState({image_preview: n.result})
                        }, n.readAsDataURL(a), this.setState({image: a})
                    }
                }, {
                    key: "submitImage", value: function (e) {
                        var t = this;
                        e.preventDefault();
                        var a = new FormData;
                        a.append("image", this.state.image), a.append("imageCollection", JSON.stringify(this.state.imageCollection)), a.append("dispatchCall", JSON.stringify(this.props.dispatchCallId)), a.forEach(function (e, t) {
                            console.log("key %s: value %s", t, e)
                        }), fetch("/api/scene/", {method: "POST", body: a}).then(function (e) {
                            return e.json()
                        }).then(function (e) {
                            var a = Object(h.a)(t.state.imageCollection);
                            a.push(e), t.setState({imageCollection: a}), t.setState({image_preview: ""}), console.log("added", a)
                        })
                    }
                }, {
                    key: "render", value: function () {
                        var e = this.state.imageCollection.map(function (e) {
                            return l.a.createElement("li", {
                                className: "scene-photo-li",
                                key: e.id
                            }, l.a.createElement("img", {src: e.image, alt: ""}))
                        });
                        return l.a.createElement("div", {className: "scene-div"}, l.a.createElement("h1", {className: "please-submit-photo"}, "Please Submit A Photo To Emergency Services"), l.a.createElement(f.a, {onSubmit: this.submitImage}, l.a.createElement("img", {
                            className: "scene-photos",
                            src: this.state.image_preview,
                            alt: "..."
                        }), l.a.createElement("input", {
                            className: "scene-input",
                            type: "file",
                            onChange: this.handleImage,
                            name: "image"
                        }), l.a.createElement(p.a, {
                            className: "submitImageButtonScene",
                            type: "submit",
                            variant: "secondary"
                        }, "Submit This Image !")), l.a.createElement("div", null, l.a.createElement("ul", {className: "scene-photo-ul"}, e)))
                    }
                }]), t
            }(n.Component), E = a(21), C = function (e) {
                function t(e) {
                    var a;
                    return Object(s.a)(this, t), (a = Object(r.a)(this, Object(m.a)(t).call(this, e))).createCall = function (e) {
                        e.preventDefault();
                        var t = {phone: a.state.phone}, n = {
                            method: "POST",
                            body: JSON.stringify(t),
                            headers: new Headers({"Content-Type": "application/json"})
                        };
                        fetch("/api/dispatchcall/", n).then(function (e) {
                            return 201 !== e.status && console.log("problem"), e.json()
                        }).then(function (e) {
                            console.log("json", e), a.setState({dispatchInfo: e});
                            var t = "".concat(a.state.baseURL + e.id, "/scene");
                            console.log("link", t), setInterval(function () {
                                return a.updateDispatchImages()
                            }, 1e4), a.updateDispatchImages()
                        })
                    }, a.state = {
                        phone: "",
                        dispatchInfo: {id: ""},
                        imageCollection: [],
                        baseURL: "https://dashboard.heroku.com/apps/efficient-emergency/dispatchcall/"
                    }, a.handlePhoneNumber = a.handlePhoneNumber.bind(Object(b.a)(Object(b.a)(a))), a.createCall = a.createCall.bind(Object(b.a)(Object(b.a)(a))), a.updateDispatchImages = a.updateDispatchImages.bind(Object(b.a)(Object(b.a)(a))), a
                }

                return Object(u.a)(t, e), Object(o.a)(t, [{
                    key: "updateDispatchImages", value: function (e) {
                        var t = this;
                        console.log("update images"), this.state.dispatchInfo.id && fetch("/api/dispatchcall/".concat(this.state.dispatchInfo.id, "/scene/")).then(function (e) {
                            return 200 !== e.status && console.log("problem"), e.json()
                        }).then(function (e) {
                            t.setState({imageCollection: e}), console.log("json", e)
                        })
                    }
                }, {
                    key: "handlePhoneNumber", value: function (e) {
                        console.log(e.target.name, e.target.value), this.setState(Object(E.a)({}, e.target.name, e.target.value))
                    }
                }, {
                    key: "render", value: function () {
                        var e = this, t = this.state.imageCollection.map(function (e) {
                            return l.a.createElement("li", {key: e.id}, l.a.createElement("img", {src: e.image, alt: ""}))
                        });
                        return l.a.createElement("div", null, l.a.createElement("h2", null, "Dispatch Current Create Call Page"), l.a.createElement(f.a, {onSubmit: this.createCall}, l.a.createElement("label", {htmlFor: "phone"}, "Enter callers phone number:"), l.a.createElement("input", {
                            type: "tel",
                            id: "phone",
                            name: "phone",
                            placeholder: "Enter Phone Number Here",
                            pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                            required: !0,
                            value: this.state.phone,
                            onChange: this.handlePhoneNumber
                        }), l.a.createElement("span", {className: "note"}, "Format: 123-456-7890"), l.a.createElement("br", null), l.a.createElement(p.a, {
                            className: "createCallButton",
                            type: "submit",
                            variant: "secondary"
                        }, "Create This Call Record")), l.a.createElement("p", null, " ", this.state.phone), l.a.createElement("a", {href: "#"}, " https://dashboard.heroku.com/apps/efficient-emergency/dispatchcall/", this.state.dispatchInfo.id, "/scene"), l.a.createElement("div", {className: "imagesFromClient"}, l.a.createElement("ul", null, t)), l.a.createElement(p.a, {
                            className: "endCall",
                            onClick: function (t) {
                                e.props.route("/dispatchcall/")
                            }
                        }, "End Call"))
                    }
                }]), t
            }(n.Component), j = (a(30), a(32)), O = function (e) {
                function t(e) {
                    var a;
                    return Object(s.a)(this, t), (a = Object(r.a)(this, Object(m.a)(t).call(this, e))).route = function (e) {
                        console.log("is it setting", e), a.setState({currentScreen: {pathname: e}})
                    }, a.state = {currentScreen: window.location}, a
                }

                return Object(u.a)(t, e), Object(o.a)(t, [{
                    key: "render", value: function () {
                        var e = this;
                        return console.log("TESTING", this.state.currentScreen.pathname), l.a.createElement("div", null, l.a.createElement(j.a, {className: "MainCont"}, function () {
                            switch (e.state.currentScreen.pathname) {
                                case"/dispatchcall/":
                                    return l.a.createElement(d, {route: e.route});
                                case"callCreate":
                                    return l.a.createElement(C, {
                                        route: e.route,
                                        imageCollection: e.state.imageCollection,
                                        image_preview: e.state.image_preview
                                    });
                                default:
                                    var t = window.location.pathname.split("/"), a = parseInt(t[2]);
                                    return console.log("dispatchId", a), l.a.createElement(v, {
                                        route: e.route,
                                        handleImage: e.handleImage,
                                        imageCollection: e.state.imageCollection,
                                        submitImage: e.submitImage,
                                        image: e.state.image,
                                        image_preview: e.state.image_preview,
                                        dispatchCallId: a
                                    })
                            }
                        }()))
                    }
                }]), t
            }(n.Component);
        Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
        i.a.render(l.a.createElement(O, null), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then(function (e) {
            e.unregister()
        })
    }
}, [[23, 1, 2]]]);
//# sourceMappingURL=main.56f32226.chunk.js.map