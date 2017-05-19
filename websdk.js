/*sdk version:v1.3 update time:2017-05-19*/
(function() {
	var JSON = !window.JSON ?
	function() {
		function f(n) {
			return n < 10 ? "0" + n: n
		}
		Date.prototype.toJSON = function() {
			return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
		};
		var m = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		};
		function stringify(value, whitelist) {
			var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
			v;
			switch (typeof value) {
			case "string":
				return r.test(value) ? '"' + value.replace(r,
				function(a) {
					var c = m[a];
					if (c) {
						return c
					}
					c = a.charCodeAt();
					return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
				}) + '"': '"' + value + '"';
			case "number":
				return isFinite(value) ? String(value) : "null";
			case "boolean":
			case "null":
				return String(value);
			case "object":
				if (!value) {
					return "null"
				}
				if (typeof value.toJSON === "function") {
					return stringify(value.toJSON())
				}
				a = [];
				if (typeof value.length === "number" && !(value.propertyIsEnumerable("length"))) {
					l = value.length;
					for (i = 0; i < l; i += 1) {
						a.push(stringify(value[i], whitelist) || "null")
					}
					return "[" + a.join(",") + "]"
				}
				if (whitelist) {
					l = whitelist.length;
					for (i = 0; i < l; i += 1) {
						k = whitelist[i];
						if (typeof k === "string") {
							v = stringify(value[k], whitelist);
							if (v) {
								a.push(stringify(k) + ":" + v)
							}
						}
					}
				} else {
					for (k in value) {
						if (typeof k === "string") {
							v = stringify(value[k], whitelist);
							if (v) {
								a.push(stringify(k) + ":" + v)
							}
						}
					}
				}
				return "{" + a.join(",") + "}"
			}
		}
		return {
			stringify: stringify,
			parse: function(text, filter) {
				var j;
				function walk(k, v) {
					var i, n;
					if (v && typeof v === "object") {
						for (i in v) {
							if (Object.prototype.hasOwnProperty.apply(v, [i])) {
								n = walk(i, v[i]);
								if (n !== undefined) {
									v[i] = n
								} else {
									delete v[i]
								}
							}
						}
					}
					return filter(k, v)
				}
				if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
					j = eval("(" + text + ")");
					return typeof filter === "function" ? walk("", j) : j
				}
				throw new SyntaxError("parseJSON")
			}
		}
	} () : window.JSON;
	window.hiidoEvent = function(prodid, eventid) {
		var _xc = this.xc + "&prodid=" + prodid + "&eventid=" + eventid;
		var sec;
		var count;
		var heartTimer;
		var reporttype;
		var val;
		this.setUid = function(value) {
			this.uid = value
		};
		this.setImei = function(value) {
			_xc += "&imei=" + value
		};
		this.setMac = function(value) {
			_xc += "&mac=" + value
		};
		this.setHdid = function(value) {
			_xc += "&hdid=" + value
		};
		this.setAppkey = function(value) {
			_xc += "&appkey=" + value
		};
		this.setSys = function(value) {
			_xc += "&sys=" + value
		};
		this.setFrom = function(value) {
			_xc += "&from=" + value
		};
		this.setSid = function(value) {
			_xc += "&sid=" + value
		};
		this.setSubsid = function(value) {
			_xc += "&subsid=" + value
		};
		this.setTempid = function(value) {
			_xc += "&tempid=" + value
		};
		this.setSubtempid = function(value) {
			_xc += "&sub_tempid=" + value
		};
		this.setHostid = function(value) {
			_xc += "&hostid=" + value
		};
		this.setRef = function(value) {
			_xc += "&ref=" + value
		};
		this.setEntranid = function(value) {
			_xc += "&entran_id=" + value
		};
		this.setActtype = function(value) {
			_xc += "&act_type=" + value
		};
		this.setTpid = function(value) {
			_xc += "&tpid=" + value
		};
		this.setStatisobj = function(value) {
			_xc += "&statis_obj=" + value
		};
		this.setValue = function(value) {
			val = value
		};
		this.setMoreinfo = function(value) {
			if (typeof(value) == "object") {
				value = JSON.stringify(value)
			}
			_xc += "&moreinfo=" + encodeURIComponent(value)
		};
		this.reportHeart = function() {
			var _this = this;
			this.setType("heart");
			this.report(0);
			var hz = parseInt(val) * 1000;
			heartTimer = setInterval(function() {
				_this.report()
			},
			hz);
			window.onbeforeunload = function(e) {
				e = e || window.event;
				_this.reportLeave()
			}
		};
		this.reportAmount = function() {
			this.setType("amount");
			this.report(val)
		};
		this.reportProcess = function() {
			this.setType("process");
			this.report(val)
		};
		this.reportJudge = function() {
			this.setType("judge");
			this.report(1)
		};
		this.setType = function(value) {
			reporttype = value;
			_xc += "&type=" + value
		};
		this.report = function(value) {
			if (typeof(value) == "undefined") {
				value = val
			}
			var ut = parseInt((new Date() - 0) / 1000) + "";
			var guid = this.ui + ut;
			var time = parseInt(new Date().getTime() / 1000);
			var img = new Image(1, 1);
			img.src = this._hiidoHttpProtocol + "//" + this._hiidoHttpHost + "/j.gif?" + _xc + "&uid=" + this.uid + "&guid=" + guid + "&time=" + time + "&value=" + value;
			console.log(img.src);
			img.onload = function() {
				return
			};
			if (reporttype == "heart") {
				if (count) {
					clearInterval(count)
				}
				sec = 1;
				count = setInterval(this.countSec, 1000)
			}
		};
		this.reportLeave = function() {
			var value = (reporttype == "heart") ? sec: val;
			this.report(value);
			if (reporttype == "heart") {
				clearInterval(heartTimer)
			}
		};
		this.countSec = function() {
			sec = sec + 1
		}
	};
	hiidoEvent.prototype = {
		constructor: hiidoEvent,
		_hiidoHttpProtocol: window.location.protocol,
		_hiidoHttpHost: "ylog.hiido.com",
		uid: getCookie("yyuid"),
		ui: getUi(),
		xc: "act=websdkprotocol&sdkver=1.2&url=" + encodeURIComponent(String(window.location.href)) + "&domain=" + getDmn() + "&ui=" + getUi() + "&region=1"
	};
	function getDmn() {
		var url = String(window.location.href);
		var mLHUL = UL(url);
		var lsd = mLHUL ? mLHUL.host: ".";
		var domainKey = getDomain(lsd);
		return domainKey.dmn
	}
	function getUi() {
		var ui = getCookie("hiido_ui");
		if (!ui) {
			ui = Math.random();
			setCookie("hiido_ui", ui, {
				expires: 365 * 100
			})
		}
		return ui
	}
	function UL(fs) {
		var url = /(\w+):\/\/([\w.-]+)(?::\d+)?\/(\S*)/;
		var result = fs.match(url);
		if (result != null) {
			var fullurl = result[0];
			var protocol = result[1];
			var host = result[2];
			var path = result[3];
			if (host != "localhost") {
				return {
					host: host,
					path: path
				}
			} else {
				return false
			}
		} else {
			return false
		}
	}
	function getDomain(lds) {
		var dmn = "";
		var dmk = "";
		var dml = "";
		var dsn = "";
		if (lds) {
			function domainVal(n, k) {
				this.n = n;
				this.k = k
			}
			var domains = new Array(new domainVal("duowan.com", ""), new domainVal("yy.com", "@yy"), new domainVal("yy.tv", "@yytv"), new domainVal("kuaikuai.cn", "@kuaikuai"), new domainVal("hiido.com", "@hiido"), new domainVal("hiido.cn", "@hiidocn"), new domainVal("hiido.net", "@hiidonet"), new domainVal("bengou.com", "@bengou"), new domainVal("5253.com", "@5253"), new domainVal("duowan.cn", "@duowancn"), new domainVal("zzvv.com", "@zzvv"), new domainVal("99d.com", "@99d"), new domainVal("sc2.com.cn", "@sc2"), new domainVal("100.com", "@100"), new domainVal("5153.com", "@5153"), new domainVal("huya.com", "@huya"), new domainVal("1931.com", "@1931"), new domainVal("fengkaobiguo.com", "@fengkaobiguo"), new domainVal("up24.com", "@up24"), new domainVal("edu24ol.com", "@edu24ol"), new domainVal("ruixueys.com", "@ruixueys"), new domainVal("hqgwy.cn", "@hqgwy"), new domainVal("erdmusic.com", "@erdmusic"), new domainVal("zhiniu8.com", "@zhiniu8"), new domainVal("100yy.com", "@100yy"));
			var tmp = lds.split(".");
			for (var i = 0; i < domains.length; i++) {
				var h = domains[i].n.split(".");
				if (lds.indexOf(domains[i].n) > -1) {
					if (h.length == 2 && tmp.length == 3 && h[0] != tmp[1]) {
						continue
					}
					dmn = domains[i].n;
					dmk = domains[i].k;
					dml = (domains[i].n.split(".")).length;
					if (tmp.length == 2) {
						dsn = "www"
					} else {
						dsn = tmp[tmp.length - dml - 1]
					}
					break
				}
			}
		}
		return {
			dmn: dmn,
			dmk: dmk,
			dml: dml,
			dsn: dsn
		}
	}
	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length === 1) {
			return ""
		}
		return decodeURIComponent(parts[1].split(";")[0])
	}
	function setCookie(name, value, options) {
		options = options || {};
		var c = name + "=" + encodeURIComponent(value);
		if (options.expires && typeof options.expires === "number") {
			var expires_date = new Date();
			options.expires = options.expires * 1000 * 60 * 60 * 24;
			expires_date = new Date(expires_date.getTime() + options.expires);
			c = c + "; expires=" + expires_date.toUTCString()
		}
		options.path ? (c = c + "; path=" + options.path) : (c = c + "; path=/");
		options.domain ? (c = c + "; domain=" + options.domain) : "";
		document.cookie = c
	}
})();