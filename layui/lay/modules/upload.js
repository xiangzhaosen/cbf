/** layui-v2.2.5 MIT License By https://www.layui.com */ ;
layui.define("layer", function(e) {
	"use strict";
	var i = layui.$,
		t = layui.layer,
		n = layui.hint(),
		a = layui.device(),
		o = {
			config: {},
			set: function(e) {
				var t = this;
				return t.config = i.extend({}, t.config, e), t
			},
			on: function(e, i) {
				return layui.onevent.call(this, r, e, i)
			}
		},
		l = function() {
			var e = this;
			return {
				upload: function(i) {
					e.upload.call(e, i)
				},
				config: e.config
			}
		},
		r = "upload",
		u = "layui-upload-file",
		c = "layui-upload-form",
		f = "layui-upload-iframe",
		s = "layui-upload-choose",
		p = function(e) {
			var t = this;
			t.config = i.extend({}, t.config, o.config, e), t.render()
		};
	p.prototype.config = {
		accept: "images",
		exts: "",
		auto: !0,
		bindAction: "",
		url: "",
		field: "file",
		method: "post",
		data: {},
		drag: !0,
		size: 0,
		number: 0,
		multiple: !1
	}, p.prototype.render = function(e) {
		var t = this,
			e = t.config;
		e.elem = i(e.elem), e.bindAction = i(e.bindAction), t.file(), t.events()
	}, p.prototype.file = function() {
		var e = this,
			t = e.config,
			n = e.elemFile = i(['<input class="' + u + '" type="file" name="' + t.field + '"', t.multiple ? " multiple" : "", ">"].join("")),
			o = t.elem.next();
		(o.hasClass(u) || o.hasClass(c)) && o.remove(), a.ie && a.ie < 10 && t.elem.wrap('<div class="layui-upload-wrap"></div>'), e.isFile() ? (e.elemFile = t.elem, t.field = t.elem[0].name) : t.elem.after(n), a.ie && a.ie < 10 && e.initIE()
	}, p.prototype.initIE = function() {
		var e = this,
			t = e.config,
			n = i('<iframe id="' + f + '" class="' + f + '" name="' + f + '" frameborder="0"></iframe>'),
			a = i(['<form target="' + f + '" class="' + c + '" method="' + t.method, '" key="set-mine" enctype="multipart/form-data" action="' + t.url + '">', "</form>"].join(""));
		i("#" + f)[0] || i("body").append(n), t.elem.next().hasClass(f) || (e.elemFile.wrap(a), t.elem.next("." + f).append(function() {
			var e = [];
			return layui.each(t.data, function(i, t) {
				e.push('<input type="hidden" name="' + i + '" value="' + t + '">')
			}), e.join("")
		}()))
	}, p.prototype.msg = function(e) {
		return t.msg(e, {
			icon: 2,
			shift: 6
		})
	}, p.prototype.isFile = function() {
		var e = this.config.elem[0];
		if(e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type
	}, p.prototype.preview = function(e) {
		var i = this;
		window.FileReader && layui.each(i.chooseFiles, function(i, t) {
			var n = new FileReader;
			n.readAsDataURL(t), n.onload = function() {
				e && e(i, t, this.result)
			}
		})
	}, p.prototype.upload = function(e, t) {
		var n, o = this,
			l = o.config,
			r = o.elemFile[0],
			u = function() {
				var t = 0,
					n = 0,
					a = e || o.files || o.chooseFiles || r.files,
					u = function() {
						l.multiple && t + n === o.fileLength && "function" == typeof l.allDone && l.allDone({
							total: o.fileLength,
							successful: t,
							aborted: n
						})
					};
				layui.each(a, function(e, a) {
					var r = new FormData;
					r.append(l.field, a), layui.each(l.data, function(e, i) {
						r.append(e, i)
					}), i.ajax({
						url: l.url,
						type: l.method,
						data: r,
						contentType: !1,
						processData: !1,
						dataType: "json",
						success: function(i) {
							t++, d(e, i), u()
						},
						error: function(i) {
							n++, o.msg("请求上传接口出现异常"), m(e), u()
						}
					})
				})
			},
			c = function() {
				var e = i("#" + f);
				o.elemFile.parent().submit(), clearInterval(p.timer), p.timer = setInterval(function() {
					var i, t = e.contents().find("body");
					try {
						i = t.text()
					} catch(n) {
						o.msg("获取上传后的响应信息出现异常"), clearInterval(p.timer), m()
					}
					i && (clearInterval(p.timer), t.html(""), d(0, i))
				}, 30)
			},
			d = function(e, i) {
				if(o.elemFile.next("." + s).remove(), r.value = "", "object" != typeof i) try {
					i = JSON.parse(i)
				} catch(t) {
					return i = {}, o.msg("请对上传接口返回有效JSON")
				}
				"function" == typeof l.done && l.done(i, e || 0, function(e) {
					o.upload(e)
				})
			},
			m = function(e) {
				l.auto && (r.value = ""), "function" == typeof l.error && l.error(e || 0, function(e) {
					o.upload(e)
				})
			},
			h = l.exts,
			v = function() {
				var i = [];
				return layui.each(e || o.chooseFiles, function(e, t) {
					i.push(t.name)
				}), i
			}(),
			g = {
				preview: function(e) {
					o.preview(e)
				},
				upload: function(e, i) {
					var t = {};
					t[e] = i, o.upload(t)
				},
				pushFile: function() {
					return o.files = o.files || {}, layui.each(o.chooseFiles, function(e, i) {
						o.files[e] = i
					}), o.files
				}
			},
			y = function() {
				return "choose" === t ? l.choose && l.choose(g) : (l.before && l.before(g), a.ie ? a.ie > 9 ? u() : c() : void u())
			};
		if(v = 0 === v.length ? r.value.match(/[^\/\\]+\..+/g) || [] || "" : v, 0 !== v.length) {
			switch(l.accept) {
				case "file":
					if(h && !RegExp("\\w\\.(" + h + ")$", "i").test(escape(v))) return o.msg("选择的文件中包含不支持的格式"), r.value = "";
					break;
				case "video":
					if(!RegExp("\\w\\.(" + (h || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(v))) return o.msg("选择的视频中包含不支持的格式"), r.value = "";
					break;
				case "audio":
					if(!RegExp("\\w\\.(" + (h || "mp3|wav|mid") + ")$", "i").test(escape(v))) return o.msg("选择的音频中包含不支持的格式"), r.value = "";
					break;
				default:
					if(layui.each(v, function(e, i) {
							RegExp("\\w\\.(" + (h || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(i)) || (n = !0)
						}), n) return o.msg("选择的图片中包含不支持的格式"), r.value = ""
			}
			if(o.fileLength = function() {
					var i = 0,
						t = e || o.files || o.chooseFiles || r.files;
					return layui.each(t, function() {
						i++
					}), i
				}(), l.number && o.fileLength > l.number) return o.msg("同时最多只能上传的数量为：" + l.number);
			if(l.size > 0 && !(a.ie && a.ie < 10)) {
				var F;
				if(layui.each(o.chooseFiles, function(e, i) {
						if(i.size > 1024 * l.size) {
							var t = l.size / 1024;
							t = t >= 1 ? Math.floor(t) + (t % 1 > 0 ? t.toFixed(1) : 0) + "MB" : l.size + "KB", r.value = "", F = t
						}
					}), F) return o.msg("文件不能超过" + F)
			}
			y()
		}
	}, p.prototype.events = function() {
		var e = this,
			t = e.config,
			o = function(i) {
				e.chooseFiles = {}, layui.each(i, function(i, t) {
					var n = (new Date).getTime();
					e.chooseFiles[n + "-" + i] = t
				})
			},
			l = function(i, n) {
				var a = e.elemFile,
					o = i.length > 1 ? i.length + "个文件" : (i[0] || {}).name || a[0].value.match(/[^\/\\]+\..+/g) || [] || "";
				a.next().hasClass(s) && a.next().remove(), e.upload(null, "choose"), e.isFile() || t.choose || a.after('<span class="layui-inline ' + s + '">' + o + "</span>")
			};
		t.elem.off("upload.start").on("upload.start", function() {
			var a = i(this),
				o = a.attr("lay-data");
			if(o) try {
				o = new Function("return " + o)(), e.config = i.extend({}, t, o)
			} catch(l) {
				n.error("Upload element property lay-data configuration item has a syntax error: " + o)
			}
			e.config.item = a, e.elemFile[0].click()
		}), a.ie && a.ie < 10 || t.elem.off("upload.over").on("upload.over", function() {
			var e = i(this);
			e.attr("lay-over", "")
		}).off("upload.leave").on("upload.leave", function() {
			var e = i(this);
			e.removeAttr("lay-over")
		}).off("upload.drop").on("upload.drop", function(n, a) {
			var r = i(this),
				u = a.originalEvent.dataTransfer.files || [];
			r.removeAttr("lay-over"), o(u), t.auto ? e.upload(u) : l(u)
		}), e.elemFile.off("upload.change").on("upload.change", function() {
			var i = this.files || [];
			o(i), t.auto ? e.upload() : l(i)
		}), t.bindAction.off("upload.action").on("upload.action", function() {
			e.upload()
		}), t.elem.data("haveEvents") || (e.elemFile.on("change", function() {
			i(this).trigger("upload.change")
		}), t.elem.on("click", function() {
			e.isFile() || i(this).trigger("upload.start")
		}), t.drag && t.elem.on("dragover", function(e) {
			e.preventDefault(), i(this).trigger("upload.over")
		}).on("dragleave", function(e) {
			i(this).trigger("upload.leave")
		}).on("drop", function(e) {
			e.preventDefault(), i(this).trigger("upload.drop", e)
		}), t.bindAction.on("click", function() {
			i(this).trigger("upload.action")
		}), t.elem.data("haveEvents", !0))
	}, o.render = function(e) {
		var i = new p(e);
		return l.call(i)
	}, e(r, o)
});