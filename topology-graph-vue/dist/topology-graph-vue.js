import { defineComponent as Yt, ref as yt, computed as U, onMounted as Bt, nextTick as Gt, watch as Xt, openBlock as H, createElementBlock as V, createElementVNode as F, toDisplayString as W, normalizeClass as kt, createCommentVNode as st, normalizeStyle as Ft, Fragment as at, renderList as Tt, createStaticVNode as Ht } from "vue";
const Vt = {
  terminal: { icon: "💻", name: "终端" },
  "comm-device": { icon: "📡", name: "通信机" },
  router: { icon: "🔀", name: "路由器" },
  switch: { icon: "🔌", name: "交换机" },
  server: { icon: "🖥", name: "服务器" },
  gps: { icon: "🛰", name: "GPS" },
  antenna: { icon: "📏", name: "天线" },
  "base-station": { icon: "🏠", name: "基站" }
}, Qt = {
  internal: { color: "#334155", width: 1, dash: "4 2", name: "内部链路" },
  wired: { color: "#38bdf8", width: 1.5, dash: "", name: "有线" },
  fiber: { color: "#22d3ee", width: 1.5, dash: "", name: "光纤" },
  wireless: { color: "#fbbf24", width: 1, dash: "3 3", name: "超短波" },
  satellite: { color: "#a78bfa", width: 1.5, dash: "8 4", name: "卫星通道" },
  "4g": { color: "#34d399", width: 1, dash: "2 4 6 4", name: "4G" },
  "5g": { color: "#f472b6", width: 1.5, dash: "6 3 2 3", name: "5G" },
  microwave: { color: "#67e8f9", width: 1, dash: "10 2 3 2", name: "微波" }
}, Ut = {
  island: { color: "#38bdf8", name: "岛屿" },
  "route-station": { color: "#22d3ee", name: "路由站" },
  ship: { color: "#06b6d4", name: "船只" },
  aircraft: { color: "#3b82f6", name: "飞行器" },
  vehicle: { color: "#22c55e", name: "车辆" },
  satellite: { color: "#a855f7", name: "卫星" },
  buoy: { color: "#f97316", name: "浮标" },
  station: { color: "#eab308", name: "基站" }
};
function Wt(t, e) {
  var n, i = 1;
  t == null && (t = 0), e == null && (e = 0);
  function o() {
    var s, c = n.length, v, g = 0, a = 0;
    for (s = 0; s < c; ++s)
      v = n[s], g += v.x, a += v.y;
    for (g = (g / c - t) * i, a = (a / c - e) * i, s = 0; s < c; ++s)
      v = n[s], v.x -= g, v.y -= a;
  }
  return o.initialize = function(s) {
    n = s;
  }, o.x = function(s) {
    return arguments.length ? (t = +s, o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = +s, o) : e;
  }, o.strength = function(s) {
    return arguments.length ? (i = +s, o) : i;
  }, o;
}
function Jt(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Rt(this.cover(e, n), e, n, t);
}
function Rt(t, e, n, i) {
  if (isNaN(e) || isNaN(n)) return t;
  var o, s = t._root, c = { data: i }, v = t._x0, g = t._y0, a = t._x1, p = t._y1, b, x, y, _, f, l, u, r;
  if (!s) return t._root = c, t;
  for (; s.length; )
    if ((f = e >= (b = (v + a) / 2)) ? v = b : a = b, (l = n >= (x = (g + p) / 2)) ? g = x : p = x, o = s, !(s = s[u = l << 1 | f])) return o[u] = c, t;
  if (y = +t._x.call(null, s.data), _ = +t._y.call(null, s.data), e === y && n === _) return c.next = s, o ? o[u] = c : t._root = c, t;
  do
    o = o ? o[u] = new Array(4) : t._root = new Array(4), (f = e >= (b = (v + a) / 2)) ? v = b : a = b, (l = n >= (x = (g + p) / 2)) ? g = x : p = x;
  while ((u = l << 1 | f) === (r = (_ >= x) << 1 | y >= b));
  return o[r] = s, o[u] = c, t;
}
function Kt(t) {
  var e, n, i = t.length, o, s, c = new Array(i), v = new Array(i), g = 1 / 0, a = 1 / 0, p = -1 / 0, b = -1 / 0;
  for (n = 0; n < i; ++n)
    isNaN(o = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (c[n] = o, v[n] = s, o < g && (g = o), o > p && (p = o), s < a && (a = s), s > b && (b = s));
  if (g > p || a > b) return this;
  for (this.cover(g, a).cover(p, b), n = 0; n < i; ++n)
    Rt(this, c[n], v[n], t[n]);
  return this;
}
function Zt(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, i = this._y0, o = this._x1, s = this._y1;
  if (isNaN(n))
    o = (n = Math.floor(t)) + 1, s = (i = Math.floor(e)) + 1;
  else {
    for (var c = o - n || 1, v = this._root, g, a; n > t || t >= o || i > e || e >= s; )
      switch (a = (e < i) << 1 | t < n, g = new Array(4), g[a] = v, v = g, c *= 2, a) {
        case 0:
          o = n + c, s = i + c;
          break;
        case 1:
          n = o - c, s = i + c;
          break;
        case 2:
          o = n + c, i = s - c;
          break;
        case 3:
          n = o - c, i = s - c;
          break;
      }
    this._root && this._root.length && (this._root = v);
  }
  return this._x0 = n, this._y0 = i, this._x1 = o, this._y1 = s, this;
}
function qt() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function te(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function G(t, e, n, i, o) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = i, this.y1 = o;
}
function ee(t, e, n) {
  var i, o = this._x0, s = this._y0, c, v, g, a, p = this._x1, b = this._y1, x = [], y = this._root, _, f;
  for (y && x.push(new G(y, o, s, p, b)), n == null ? n = 1 / 0 : (o = t - n, s = e - n, p = t + n, b = e + n, n *= n); _ = x.pop(); )
    if (!(!(y = _.node) || (c = _.x0) > p || (v = _.y0) > b || (g = _.x1) < o || (a = _.y1) < s))
      if (y.length) {
        var l = (c + g) / 2, u = (v + a) / 2;
        x.push(
          new G(y[3], l, u, g, a),
          new G(y[2], c, u, l, a),
          new G(y[1], l, v, g, u),
          new G(y[0], c, v, l, u)
        ), (f = (e >= u) << 1 | t >= l) && (_ = x[x.length - 1], x[x.length - 1] = x[x.length - 1 - f], x[x.length - 1 - f] = _);
      } else {
        var r = t - +this._x.call(null, y.data), h = e - +this._y.call(null, y.data), d = r * r + h * h;
        if (d < n) {
          var N = Math.sqrt(n = d);
          o = t - N, s = e - N, p = t + N, b = e + N, i = y.data;
        }
      }
  return i;
}
function ne(t) {
  if (isNaN(p = +this._x.call(null, t)) || isNaN(b = +this._y.call(null, t))) return this;
  var e, n = this._root, i, o, s, c = this._x0, v = this._y0, g = this._x1, a = this._y1, p, b, x, y, _, f, l, u;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((_ = p >= (x = (c + g) / 2)) ? c = x : g = x, (f = b >= (y = (v + a) / 2)) ? v = y : a = y, e = n, !(n = n[l = f << 1 | _])) return this;
    if (!n.length) break;
    (e[l + 1 & 3] || e[l + 2 & 3] || e[l + 3 & 3]) && (i = e, u = l);
  }
  for (; n.data !== t; ) if (o = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, o ? (s ? o.next = s : delete o.next, this) : e ? (s ? e[l] = s : delete e[l], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (i ? i[u] = n : this._root = n), this) : (this._root = s, this);
}
function re(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function ie() {
  return this._root;
}
function oe() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function se(t) {
  var e = [], n, i = this._root, o, s, c, v, g;
  for (i && e.push(new G(i, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(i = n.node, s = n.x0, c = n.y0, v = n.x1, g = n.y1) && i.length) {
      var a = (s + v) / 2, p = (c + g) / 2;
      (o = i[3]) && e.push(new G(o, a, p, v, g)), (o = i[2]) && e.push(new G(o, s, p, a, g)), (o = i[1]) && e.push(new G(o, a, c, v, p)), (o = i[0]) && e.push(new G(o, s, c, a, p));
    }
  return this;
}
function ae(t) {
  var e = [], n = [], i;
  for (this._root && e.push(new G(this._root, this._x0, this._y0, this._x1, this._y1)); i = e.pop(); ) {
    var o = i.node;
    if (o.length) {
      var s, c = i.x0, v = i.y0, g = i.x1, a = i.y1, p = (c + g) / 2, b = (v + a) / 2;
      (s = o[0]) && e.push(new G(s, c, v, p, b)), (s = o[1]) && e.push(new G(s, p, v, g, b)), (s = o[2]) && e.push(new G(s, c, b, p, a)), (s = o[3]) && e.push(new G(s, p, b, g, a));
    }
    n.push(i);
  }
  for (; i = n.pop(); )
    t(i.node, i.x0, i.y0, i.x1, i.y1);
  return this;
}
function le(t) {
  return t[0];
}
function ce(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function ue(t) {
  return t[1];
}
function fe(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Mt(t, e, n) {
  var i = new Et(e ?? le, n ?? ue, NaN, NaN, NaN, NaN);
  return t == null ? i : i.addAll(t);
}
function Et(t, e, n, i, o, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = i, this._x1 = o, this._y1 = s, this._root = void 0;
}
function At(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var X = Mt.prototype = Et.prototype;
X.copy = function() {
  var t = new Et(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, i;
  if (!e) return t;
  if (!e.length) return t._root = At(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var o = 0; o < 4; ++o)
      (i = e.source[o]) && (i.length ? n.push({ source: i, target: e.target[o] = new Array(4) }) : e.target[o] = At(i));
  return t;
};
X.add = Jt;
X.addAll = Kt;
X.cover = Zt;
X.data = qt;
X.extent = te;
X.find = ee;
X.remove = ne;
X.removeAll = re;
X.root = ie;
X.size = oe;
X.visit = se;
X.visitAfter = ae;
X.x = ce;
X.y = fe;
function q(t) {
  return function() {
    return t;
  };
}
function K(t) {
  return (t() - 0.5) * 1e-6;
}
function he(t) {
  return t.x + t.vx;
}
function de(t) {
  return t.y + t.vy;
}
function ye(t) {
  var e, n, i, o = 1, s = 1;
  typeof t != "function" && (t = q(t == null ? 1 : +t));
  function c() {
    for (var a, p = e.length, b, x, y, _, f, l, u = 0; u < s; ++u)
      for (b = Mt(e, he, de).visitAfter(v), a = 0; a < p; ++a)
        x = e[a], f = n[x.index], l = f * f, y = x.x + x.vx, _ = x.y + x.vy, b.visit(r);
    function r(h, d, N, A, w) {
      var S = h.data, k = h.r, L = f + k;
      if (S) {
        if (S.index > x.index) {
          var Y = y - S.x - S.vx, j = _ - S.y - S.vy, B = Y * Y + j * j;
          B < L * L && (Y === 0 && (Y = K(i), B += Y * Y), j === 0 && (j = K(i), B += j * j), B = (L - (B = Math.sqrt(B))) / B * o, x.vx += (Y *= B) * (L = (k *= k) / (l + k)), x.vy += (j *= B) * L, S.vx -= Y * (L = 1 - L), S.vy -= j * L);
        }
        return;
      }
      return d > y + L || A < y - L || N > _ + L || w < _ - L;
    }
  }
  function v(a) {
    if (a.data) return a.r = n[a.data.index];
    for (var p = a.r = 0; p < 4; ++p)
      a[p] && a[p].r > a.r && (a.r = a[p].r);
  }
  function g() {
    if (e) {
      var a, p = e.length, b;
      for (n = new Array(p), a = 0; a < p; ++a) b = e[a], n[b.index] = +t(b, a, e);
    }
  }
  return c.initialize = function(a, p) {
    e = a, i = p, g();
  }, c.iterations = function(a) {
    return arguments.length ? (s = +a, c) : s;
  }, c.strength = function(a) {
    return arguments.length ? (o = +a, c) : o;
  }, c.radius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : q(+a), g(), c) : t;
  }, c;
}
function ve(t) {
  return t.index;
}
function It(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function pe(t) {
  var e = ve, n = b, i, o = q(30), s, c, v, g, a, p = 1;
  t == null && (t = []);
  function b(l) {
    return 1 / Math.min(v[l.source.index], v[l.target.index]);
  }
  function x(l) {
    for (var u = 0, r = t.length; u < p; ++u)
      for (var h = 0, d, N, A, w, S, k, L; h < r; ++h)
        d = t[h], N = d.source, A = d.target, w = A.x + A.vx - N.x - N.vx || K(a), S = A.y + A.vy - N.y - N.vy || K(a), k = Math.sqrt(w * w + S * S), k = (k - s[h]) / k * l * i[h], w *= k, S *= k, A.vx -= w * (L = g[h]), A.vy -= S * L, N.vx += w * (L = 1 - L), N.vy += S * L;
  }
  function y() {
    if (c) {
      var l, u = c.length, r = t.length, h = new Map(c.map((N, A) => [e(N, A, c), N])), d;
      for (l = 0, v = new Array(u); l < r; ++l)
        d = t[l], d.index = l, typeof d.source != "object" && (d.source = It(h, d.source)), typeof d.target != "object" && (d.target = It(h, d.target)), v[d.source.index] = (v[d.source.index] || 0) + 1, v[d.target.index] = (v[d.target.index] || 0) + 1;
      for (l = 0, g = new Array(r); l < r; ++l)
        d = t[l], g[l] = v[d.source.index] / (v[d.source.index] + v[d.target.index]);
      i = new Array(r), _(), s = new Array(r), f();
    }
  }
  function _() {
    if (c)
      for (var l = 0, u = t.length; l < u; ++l)
        i[l] = +n(t[l], l, t);
  }
  function f() {
    if (c)
      for (var l = 0, u = t.length; l < u; ++l)
        s[l] = +o(t[l], l, t);
  }
  return x.initialize = function(l, u) {
    c = l, a = u, y();
  }, x.links = function(l) {
    return arguments.length ? (t = l, y(), x) : t;
  }, x.id = function(l) {
    return arguments.length ? (e = l, x) : e;
  }, x.iterations = function(l) {
    return arguments.length ? (p = +l, x) : p;
  }, x.strength = function(l) {
    return arguments.length ? (n = typeof l == "function" ? l : q(+l), _(), x) : n;
  }, x.distance = function(l) {
    return arguments.length ? (o = typeof l == "function" ? l : q(+l), f(), x) : o;
  }, x;
}
var ge = { value: () => {
} };
function Dt() {
  for (var t = 0, e = arguments.length, n = {}, i; t < e; ++t) {
    if (!(i = arguments[t] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new pt(n);
}
function pt(t) {
  this._ = t;
}
function xe(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
pt.prototype = Dt.prototype = {
  constructor: pt,
  on: function(t, e) {
    var n = this._, i = xe(t + "", n), o, s = -1, c = i.length;
    if (arguments.length < 2) {
      for (; ++s < c; ) if ((o = (t = i[s]).type) && (o = me(n[o], t.name))) return o;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < c; )
      if (o = (t = i[s]).type) n[o] = $t(n[o], t.name, e);
      else if (e == null) for (o in n) n[o] = $t(n[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new pt(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), i = 0, o, s; i < o; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], i = 0, o = s.length; i < o; ++i) s[i].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var i = this._[t], o = 0, s = i.length; o < s; ++o) i[o].value.apply(e, n);
  }
};
function me(t, e) {
  for (var n = 0, i = t.length, o; n < i; ++n)
    if ((o = t[n]).name === e)
      return o.value;
}
function $t(t, e, n) {
  for (var i = 0, o = t.length; i < o; ++i)
    if (t[i].name === e) {
      t[i] = ge, t = t.slice(0, i).concat(t.slice(i + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var it = 0, ct = 0, lt = 0, Lt = 1e3, gt, ut, xt = 0, tt = 0, mt = 0, ht = typeof performance == "object" && performance.now ? performance : Date, zt = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function jt() {
  return tt || (zt(we), tt = ht.now() + mt);
}
function we() {
  tt = 0;
}
function _t() {
  this._call = this._time = this._next = null;
}
_t.prototype = Pt.prototype = {
  constructor: _t,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? jt() : +n) + (e == null ? 0 : +e), !this._next && ut !== this && (ut ? ut._next = this : gt = this, ut = this), this._call = t, this._time = n, bt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, bt());
  }
};
function Pt(t, e, n) {
  var i = new _t();
  return i.restart(t, e, n), i;
}
function _e() {
  jt(), ++it;
  for (var t = gt, e; t; )
    (e = tt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --it;
}
function St() {
  tt = (xt = ht.now()) + mt, it = ct = 0;
  try {
    _e();
  } finally {
    it = 0, Me(), tt = 0;
  }
}
function be() {
  var t = ht.now(), e = t - xt;
  e > Lt && (mt -= e, xt = t);
}
function Me() {
  for (var t, e = gt, n, i = 1 / 0; e; )
    e._call ? (i > e._time && (i = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : gt = n);
  ut = t, bt(i);
}
function bt(t) {
  if (!it) {
    ct && (ct = clearTimeout(ct));
    var e = t - tt;
    e > 24 ? (t < 1 / 0 && (ct = setTimeout(St, t - ht.now() - mt)), lt && (lt = clearInterval(lt))) : (lt || (xt = ht.now(), lt = setInterval(be, Lt)), it = 1, zt(St));
  }
}
const Ee = 1664525, Ne = 1013904223, Ct = 4294967296;
function ke() {
  let t = 1;
  return () => (t = (Ee * t + Ne) % Ct) / Ct;
}
function Te(t) {
  return t.x;
}
function Ae(t) {
  return t.y;
}
var Ie = 10, $e = Math.PI * (3 - Math.sqrt(5));
function Se(t) {
  var e, n = 1, i = 1e-3, o = 1 - Math.pow(i, 1 / 300), s = 0, c = 0.6, v = /* @__PURE__ */ new Map(), g = Pt(b), a = Dt("tick", "end"), p = ke();
  t == null && (t = []);
  function b() {
    x(), a.call("tick", e), n < i && (g.stop(), a.call("end", e));
  }
  function x(f) {
    var l, u = t.length, r;
    f === void 0 && (f = 1);
    for (var h = 0; h < f; ++h)
      for (n += (s - n) * o, v.forEach(function(d) {
        d(n);
      }), l = 0; l < u; ++l)
        r = t[l], r.fx == null ? r.x += r.vx *= c : (r.x = r.fx, r.vx = 0), r.fy == null ? r.y += r.vy *= c : (r.y = r.fy, r.vy = 0);
    return e;
  }
  function y() {
    for (var f = 0, l = t.length, u; f < l; ++f) {
      if (u = t[f], u.index = f, u.fx != null && (u.x = u.fx), u.fy != null && (u.y = u.fy), isNaN(u.x) || isNaN(u.y)) {
        var r = Ie * Math.sqrt(0.5 + f), h = f * $e;
        u.x = r * Math.cos(h), u.y = r * Math.sin(h);
      }
      (isNaN(u.vx) || isNaN(u.vy)) && (u.vx = u.vy = 0);
    }
  }
  function _(f) {
    return f.initialize && f.initialize(t, p), f;
  }
  return y(), e = {
    tick: x,
    restart: function() {
      return g.restart(b), e;
    },
    stop: function() {
      return g.stop(), e;
    },
    nodes: function(f) {
      return arguments.length ? (t = f, y(), v.forEach(_), e) : t;
    },
    alpha: function(f) {
      return arguments.length ? (n = +f, e) : n;
    },
    alphaMin: function(f) {
      return arguments.length ? (i = +f, e) : i;
    },
    alphaDecay: function(f) {
      return arguments.length ? (o = +f, e) : +o;
    },
    alphaTarget: function(f) {
      return arguments.length ? (s = +f, e) : s;
    },
    velocityDecay: function(f) {
      return arguments.length ? (c = 1 - f, e) : 1 - c;
    },
    randomSource: function(f) {
      return arguments.length ? (p = f, v.forEach(_), e) : p;
    },
    force: function(f, l) {
      return arguments.length > 1 ? (l == null ? v.delete(f) : v.set(f, _(l)), e) : v.get(f);
    },
    find: function(f, l, u) {
      var r = 0, h = t.length, d, N, A, w, S;
      for (u == null ? u = 1 / 0 : u *= u, r = 0; r < h; ++r)
        w = t[r], d = f - w.x, N = l - w.y, A = d * d + N * N, A < u && (S = w, u = A);
      return S;
    },
    on: function(f, l) {
      return arguments.length > 1 ? (a.on(f, l), e) : a.on(f);
    }
  };
}
function Ce() {
  var t, e, n, i, o = q(-30), s, c = 1, v = 1 / 0, g = 0.81;
  function a(y) {
    var _, f = t.length, l = Mt(t, Te, Ae).visitAfter(b);
    for (i = y, _ = 0; _ < f; ++_) e = t[_], l.visit(x);
  }
  function p() {
    if (t) {
      var y, _ = t.length, f;
      for (s = new Array(_), y = 0; y < _; ++y) f = t[y], s[f.index] = +o(f, y, t);
    }
  }
  function b(y) {
    var _ = 0, f, l, u = 0, r, h, d;
    if (y.length) {
      for (r = h = d = 0; d < 4; ++d)
        (f = y[d]) && (l = Math.abs(f.value)) && (_ += f.value, u += l, r += l * f.x, h += l * f.y);
      y.x = r / u, y.y = h / u;
    } else {
      f = y, f.x = f.data.x, f.y = f.data.y;
      do
        _ += s[f.data.index];
      while (f = f.next);
    }
    y.value = _;
  }
  function x(y, _, f, l) {
    if (!y.value) return !0;
    var u = y.x - e.x, r = y.y - e.y, h = l - _, d = u * u + r * r;
    if (h * h / g < d)
      return d < v && (u === 0 && (u = K(n), d += u * u), r === 0 && (r = K(n), d += r * r), d < c && (d = Math.sqrt(c * d)), e.vx += u * y.value * i / d, e.vy += r * y.value * i / d), !0;
    if (y.length || d >= v) return;
    (y.data !== e || y.next) && (u === 0 && (u = K(n), d += u * u), r === 0 && (r = K(n), d += r * r), d < c && (d = Math.sqrt(c * d)));
    do
      y.data !== e && (h = s[y.data.index] * i / d, e.vx += u * h, e.vy += r * h);
    while (y = y.next);
  }
  return a.initialize = function(y, _) {
    t = y, n = _, p();
  }, a.strength = function(y) {
    return arguments.length ? (o = typeof y == "function" ? y : q(+y), p(), a) : o;
  }, a.distanceMin = function(y) {
    return arguments.length ? (c = y * y, a) : Math.sqrt(c);
  }, a.distanceMax = function(y) {
    return arguments.length ? (v = y * y, a) : Math.sqrt(v);
  }, a.theta = function(y) {
    return arguments.length ? (g = y * y, a) : Math.sqrt(g);
  }, a;
}
const Re = {
  island: 0,
  "route-station": 0,
  satellite: 0,
  aircraft: 1,
  buoy: 1,
  ship: 2,
  vehicle: 2,
  station: 2
}, nt = 13, ft = 8;
function rt(t, e) {
  return t <= 0 ? 30 : t === 1 ? e + ft : e / Math.sin(Math.PI / t) + ft;
}
function Ot(t) {
  return rt(t, nt) + 12;
}
function De(t) {
  const e = t.subs ?? [], n = t.devices ?? [];
  if (e.length > 0) {
    const i = e.map((c) => Ot(c.devices.length));
    if (i.length === 1)
      return i[0] + ft + 18;
    const o = Math.max(...i);
    return rt(i.length, o) + o + ft + 18;
  }
  return rt(n.length, nt) + ft + 18;
}
function Le(t, e, n, i, o, s) {
  const c = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  t.groups.forEach((r) => {
    var h, d;
    (h = r.devices) == null || h.forEach((N) => c.set(N.id, r.id)), (d = r.subs) == null || d.forEach((N) => N.devices.forEach((A) => {
      c.set(A.id, r.id), v.set(A.id, N.id);
    }));
  });
  const g = t.groups.map((r) => De(r)), a = t.groups.map((r, h) => ({
    id: r.id,
    groupIdx: h,
    layer: Re[r.type] ?? 2,
    radius: g[h]
  })), p = /* @__PURE__ */ new Set(), b = [];
  t.links.forEach((r) => {
    const h = c.get(r.source), d = c.get(r.target);
    if (!h || !d || h === d) return;
    const N = h < d ? `${h}|${d}` : `${d}|${h}`;
    p.has(N) || (p.add(N), b.push({ source: h, target: d, ltype: r.type }));
  });
  const x = new Set(a.map((r) => r.layer)).size, y = s / (x + 1), _ = {};
  a.forEach((r) => {
    var h;
    (_[h = r.layer] ?? (_[h] = [])).push(r);
  }), Object.entries(_).forEach(([r, h]) => {
    const d = y * (Number(r) + 1), N = h.reduce((S, k) => S + k.radius * 2, 0), A = Math.max(80, (o - 80 - N) / Math.max(h.length, 1));
    let w = (o - (N + A * (h.length - 1))) / 2;
    h.forEach((S) => {
      S.x = w + S.radius, S.y = d + (Math.random() - 0.5) * 20, w += S.radius * 2 + A;
    });
  });
  const f = Se(a).force("link", pe(b).id((r) => r.id).distance(350).strength(0.25)).force("charge", Ce().strength((r) => -r.radius * 20)).force("center", Wt(o / 2, s / 2)).force("collide", ye().radius((r) => r.radius + 20).strength(0.8)).stop();
  for (let r = 0; r < 400; r++) f.tick();
  a.forEach((r) => {
    r.x == null && (r.x = o / 2), r.y == null && (r.y = s / 2);
  });
  const l = t.groups.map((r, h) => {
    const d = a[h], N = e[r.type] || "#38bdf8", A = r.subs ?? [], w = [];
    if (A.length > 0) {
      const k = A.map((j) => Ot(j.devices.length)), L = Math.max(...k);
      let Y;
      A.length === 1 ? Y = 0 : Y = rt(A.length, L), A.forEach((j, B) => {
        const wt = k[B], dt = -Math.PI / 2 + 2 * Math.PI / A.length * B, m = d.x + Y * Math.cos(dt), M = d.y + Y * Math.sin(dt), T = rt(j.devices.length, nt), P = j.devices.map((z, E) => {
          const I = -Math.PI / 2 + 2 * Math.PI / Math.max(j.devices.length, 1) * E;
          return {
            ...z,
            groupId: r.id,
            subId: j.id,
            icon: i[z.type] || "📦",
            r: nt,
            x: m + T * Math.cos(I),
            y: M + T * Math.sin(I)
          };
        });
        w.push({ id: j.id, name: j.name, x: m, y: M, r: wt, devices: P, groupId: r.id });
      });
    }
    const S = (r.devices ?? []).map((k, L) => {
      const Y = (r.devices ?? []).length, j = rt(Y, nt), B = -Math.PI / 2 + 2 * Math.PI / Math.max(Y, 1) * L;
      return {
        ...k,
        groupId: r.id,
        icon: i[k.type] || "📦",
        r: nt,
        x: d.x + j * Math.cos(B),
        y: d.y + j * Math.sin(B)
      };
    });
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      color: N,
      x: d.x,
      y: d.y,
      r: g[h],
      subs: w,
      devices: S
    };
  }), u = t.links.map((r) => {
    const h = c.get(r.source), d = c.get(r.target), N = v.get(r.source), A = v.get(r.target);
    let w = "external";
    return h === d && (w = N && A && N === A ? "internal" : "sub"), { source: r.source, target: r.target, type: r.type, status: r.status ?? "normal", level: w };
  });
  return { groups: l, links: u };
}
const ze = "http://www.w3.org/2000/svg";
function O(t, e = {}, n = null) {
  const i = document.createElementNS(ze, t);
  for (const [o, s] of Object.entries(e))
    s !== void 0 && i.setAttribute(o, String(s));
  return n && n.appendChild(i), i;
}
function vt(t, e, n) {
  const i = O("text", e, n);
  return i.textContent = t, i;
}
function je(t, e, n, i, o = {}) {
  const s = e.x - t.x, c = e.y - t.y, v = Math.sqrt(s * s + c * c) || 1, g = t.x + s / v * (t.r + 2), a = t.y + c / v * (t.r + 2), p = e.x - s / v * (e.r + 2), b = e.y - c / v * (e.r + 2), x = o.opacity ?? 1;
  if (o.curve) {
    const y = (g + p) / 2 - c * o.curve, _ = (a + b) / 2 + s * o.curve;
    O("path", { d: `M${g},${a} Q${y},${_} ${p},${b}`, fill: "none", stroke: n.color, "stroke-width": n.width, "stroke-dasharray": n.dash || void 0, opacity: x }, i);
  } else
    O("line", { x1: g, y1: a, x2: p, y2: b, stroke: n.color, "stroke-width": n.width, "stroke-dasharray": n.dash || void 0, opacity: x }, i);
}
function Pe(t, e, n) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
  t.setAttribute("viewBox", `${n.x} ${n.y} ${n.w} ${n.h}`);
  const i = O("defs", {}, t), o = O("pattern", { id: "tg-grid", width: 40, height: 40, patternUnits: "userSpaceOnUse" }, i);
  O("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "#1e293b", "stroke-width": 0.5 }, o), O("rect", { width: 2e4, height: 2e4, x: -1e4, y: -1e4, fill: "#0f172a" }, t), O("rect", { width: 2e4, height: 2e4, x: -1e4, y: -1e4, fill: "url(#tg-grid)" }, t);
  const s = O("g", {}, t), c = O("g", {}, t), v = O("g", {}, t), g = O("g", {}, t), { groups: a, links: p, faultMode: b, linkTypes: x, faultRelated: y } = e, _ = b ? y : /* @__PURE__ */ new Set();
  function f(r, h) {
    var d, N;
    return ((d = e.deviceMap.get(r)) == null ? void 0 : d.status) === "offline" || ((N = e.deviceMap.get(h)) == null ? void 0 : N.status) === "offline";
  }
  function l(r) {
    return r.subs.some((h) => h.devices.some((d) => d.status === "offline")) || r.devices.some((h) => h.status === "offline");
  }
  p.forEach((r, h) => {
    const d = e.deviceMap.get(r.source), N = e.deviceMap.get(r.target);
    if (!d || !N) return;
    const A = x[r.type] || x.internal || { color: "#475569", width: 1, dash: "4 2" }, w = b && !f(r.source, r.target), S = r.level === "external";
    je(d, N, A, s, {
      opacity: w ? 0.06 : S ? 0.5 : 1,
      curve: S ? 0.06 + h % 5 * 0.02 : void 0
    });
  }), a.forEach((r) => {
    const h = b && !l(r);
    O("circle", { cx: r.x, cy: r.y, r: r.r, fill: "transparent", stroke: r.color, "stroke-width": 1.5, "stroke-dasharray": "6 3", opacity: h ? 0.05 : 0.5, "data-gid": r.id, cursor: "grab" }, c), vt(r.name, { x: r.x, y: r.y - r.r + 14, "text-anchor": "middle", fill: r.color, "font-size": r.r > 80 ? 10 : 9, "font-weight": "bold", opacity: h ? 0.05 : 0.8, "data-gid": r.id, cursor: "grab" }, g);
  }), a.forEach((r) => r.subs.forEach((h) => {
    const d = b && !h.devices.some((N) => N.status === "offline");
    O("circle", { cx: h.x, cy: h.y, r: h.r, fill: "transparent", stroke: r.color, "stroke-width": 1, "stroke-dasharray": "4 2", opacity: d ? 0.04 : 0.35, "data-sid": h.id, cursor: "grab" }, c), vt(h.name, { x: h.x, y: h.y - h.r + 12, "text-anchor": "middle", fill: r.color, "font-size": 8, opacity: d ? 0.04 : 0.6, "data-sid": h.id, cursor: "grab" }, g);
  }));
  const u = [];
  a.forEach((r) => {
    r.subs.forEach((h) => h.devices.forEach((d) => u.push(d))), r.devices.forEach((h) => u.push(h));
  }), u.forEach((r) => {
    const h = r.status === "offline", d = _.has(r.id), A = b && !d ? 0.06 : 1;
    if (h) {
      const w = O("circle", { cx: r.x, cy: r.y, r: r.r + 4, fill: "#ef444415", stroke: "#ef4444", "stroke-width": 1.5 }, v);
      O("animate", { attributeName: "opacity", values: "0.3;0.9;0.3", dur: "1.2s", repeatCount: "indefinite" }, w), O("animate", { attributeName: "r", values: `${r.r + 2};${r.r + 10};${r.r + 2}`, dur: "1.2s", repeatCount: "indefinite" }, w), O("circle", { cx: r.x, cy: r.y, r: r.r, fill: "#ef444425", stroke: "#ef4444", "stroke-width": 1.5, "data-nid": r.id, cursor: "grab" }, v);
    } else
      O("circle", { cx: r.x, cy: r.y, r: r.r, fill: "transparent", stroke: "#22c55e", "stroke-width": 1, opacity: A, "data-nid": r.id, cursor: "grab" }, v);
    vt(r.icon, { x: r.x, y: r.y - 2, "text-anchor": "middle", "font-size": r.r > 14 ? 11 : 9, opacity: A, "data-nid": r.id, cursor: "grab" }, v), vt(r.name, { x: r.x, y: r.y + (r.r > 14 ? 11 : 9), "text-anchor": "middle", fill: h ? "#fca5a5" : "#64748b", "font-size": r.r > 14 ? 7 : 6, opacity: A, "data-nid": r.id, cursor: "grab" }, v);
  });
}
const Oe = {
  key: 0,
  class: "tg-toolbar"
}, Ye = { class: "tg-toolbar-info" }, Be = { class: "tg-legend-icon" }, Ge = {
  width: "32",
  height: "6"
}, Xe = ["stroke", "stroke-width", "stroke-dasharray"], He = /* @__PURE__ */ Yt({
  __name: "TopologyGraph",
  props: {
    data: {},
    deviceTypes: {},
    linkTypes: {},
    groupTypes: {},
    legend: { default: () => ({}) },
    showToolbar: { type: Boolean, default: !0 }
  },
  emits: ["node-click"],
  setup(t, { emit: e }) {
    const n = t, i = yt(), o = yt(), s = yt(null);
    function c(m) {
      s.value = s.value === m ? null : m, S();
    }
    const v = U(() => ({ ...Vt, ...n.deviceTypes })), g = U(() => ({ ...Qt, ...n.linkTypes })), a = U(() => ({ ...Ut, ...n.groupTypes })), p = U(() => n.legend ?? {}), b = U(() => {
      const m = {};
      for (const [M, T] of Object.entries(a.value)) m[M] = T.color;
      return m;
    }), x = U(() => {
      const m = {};
      for (const [M, T] of Object.entries(v.value)) m[M] = T.icon;
      return m;
    }), y = U(() => {
      const m = Object.keys(v.value);
      return p.value.deviceTypes ?? m;
    }), _ = U(() => {
      const m = Object.keys(g.value);
      return p.value.linkTypes ?? m;
    });
    let f = [], l = [], u = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    function h() {
      if (!o.value) return;
      const m = o.value.clientWidth || 1200, M = o.value.clientHeight || 800, T = m * 1.8, P = M * 1.8, z = Le(
        n.data,
        b.value,
        {},
        x.value,
        T,
        P
      );
      if (f = z.groups, l = z.links, u.clear(), r.clear(), f.forEach(($) => {
        r.set($.id, { group: $, subs: $.subs }), $.subs.forEach((D) => D.devices.forEach((Q) => u.set(Q.id, Q))), $.devices.forEach((D) => u.set(D.id, D));
      }), A(), f.length === 0) return;
      let E = 1 / 0, I = 1 / 0, R = -1 / 0, C = -1 / 0;
      f.forEach(($) => {
        const D = $.r + 20;
        $.x - D < E && (E = $.x - D), $.y - D < I && (I = $.y - D), $.x + D > R && (R = $.x + D), $.y + D > C && (C = $.y + D);
      }), w.x = E, w.y = I, w.w = R - E, w.h = C - I;
    }
    const d = U(() => {
      if (!s.value) return /* @__PURE__ */ new Set();
      const m = /* @__PURE__ */ new Set(), M = s.value;
      return u.forEach((T, P) => {
        T.status === M && m.add(P);
      }), l.forEach((T) => {
        var P, z;
        (m.has(T.source) || ((P = u.get(T.source)) == null ? void 0 : P.status) === M) && m.add(T.target), (m.has(T.target) || ((z = u.get(T.target)) == null ? void 0 : z.status) === M) && m.add(T.source);
      }), m;
    }), N = yt("");
    function A() {
      let m = 0, M = 0;
      u.forEach((T) => {
        m++, T.status === "offline" && M++;
      }), N.value = `${m}个设备 · ${M}个离线`;
    }
    const w = { x: 0, y: 0, w: 1200, h: 800 };
    function S() {
      !i.value || f.length === 0 || Pe(i.value, {
        groups: f,
        links: l,
        deviceMap: u,
        faultMode: !!s.value,
        faultRelated: d.value,
        deviceTypes: v.value,
        linkTypes: g.value,
        groupTypes: a.value,
        legend: p.value
      }, w);
    }
    let k = null;
    function L(m, M) {
      if (!i.value) return { x: 0, y: 0 };
      const T = i.value.getBoundingClientRect();
      return { x: (m - T.left) * w.w / T.width + w.x, y: (M - T.top) * w.h / T.height + w.y };
    }
    function Y(m) {
      const M = m.target, T = M.getAttribute("data-nid"), P = M.getAttribute("data-sid"), z = M.getAttribute("data-gid");
      if (T && u.has(T)) {
        const E = u.get(T);
        k = { type: "node", id: T, sx: E.x, sy: E.y, mx: m.clientX, my: m.clientY }, m.preventDefault();
      } else if (P) {
        let E = null, I = null;
        for (const R of f) {
          const C = R.subs.find(($) => $.id === P);
          if (C) {
            E = C, I = R;
            break;
          }
        }
        if (E && I) {
          const R = E.devices.map((C) => ({ id: C.id, x: C.x, y: C.y }));
          k = { type: "sub", sub: E, group: I, sx: E.x, sy: E.y, ns: R, mx: m.clientX, my: m.clientY }, m.preventDefault();
        }
      } else if (z && r.has(z)) {
        const { group: E, subs: I } = r.get(z), R = [];
        I.forEach(($) => $.devices.forEach((D) => R.push({ id: D.id, x: D.x, y: D.y }))), E.devices.forEach(($) => R.push({ id: $.id, x: $.x, y: $.y }));
        const C = I.map(($) => ({ sub: $, sx: $.x, sy: $.y }));
        k = { type: "group", group: E, allSubs: C, allNodes: R, sx: E.x, sy: E.y, mx: m.clientX, my: m.clientY }, m.preventDefault();
      } else
        k = { type: "pan", mx: m.clientX, my: m.clientY };
      i.value.style.cursor = "grabbing";
    }
    function j(m) {
      if (!k) return;
      if (m.preventDefault(), k.type === "pan") {
        if (!i.value) return;
        const E = i.value.getBoundingClientRect(), I = w.w / E.width;
        w.x -= (m.clientX - k.mx) * I, w.y -= (m.clientY - k.my) * I, k.mx = m.clientX, k.my = m.clientY, i.value.setAttribute("viewBox", `${w.x} ${w.y} ${w.w} ${w.h}`);
        return;
      }
      const M = L(m.clientX, m.clientY), T = L(k.mx, k.my), P = M.x - T.x, z = M.y - T.y;
      if (k.type === "node") {
        const E = u.get(k.id);
        let I = k.sx + P, R = k.sy + z;
        const C = f.find((Z) => Z.id === E.groupId), D = C.subs.find((Z) => Z.id === E.subId) ?? C, Q = D.r - E.r - 2, J = I - D.x, ot = R - D.y, et = Math.sqrt(J * J + ot * ot);
        et > Q && et > 0 && (I = D.x + J / et * Q, R = D.y + ot / et * Q), E.x = I, E.y = R, S();
      } else if (k.type === "sub") {
        const { sub: E, group: I } = k;
        let R = k.sx + P, C = k.sy + z;
        const $ = I.r - E.r - 2, D = R - I.x, Q = C - I.y, J = Math.sqrt(D * D + Q * Q);
        J > $ && J > 0 && (R = I.x + D / J * $, C = I.y + Q / J * $);
        const ot = R - k.sx, et = C - k.sy;
        E.x = R, E.y = C, k.ns.forEach((Z) => {
          const Nt = u.get(Z.id);
          Nt.x = Z.x + ot, Nt.y = Z.y + et;
        }), S();
      } else if (k.type === "group") {
        const { group: E, allSubs: I, allNodes: R } = k;
        E.x = k.sx + P, E.y = k.sy + z, I.forEach((C) => {
          C.sub.x = C.sx + P, C.sub.y = C.sy + z;
        }), R.forEach((C) => {
          const $ = u.get(C.id);
          $.x = C.x + P, $.y = C.y + z;
        }), S();
      }
    }
    function B() {
      k = null, i.value && (i.value.style.cursor = "");
    }
    function wt(m) {
      if (m.preventDefault(), !i.value) return;
      const M = i.value.getBoundingClientRect(), T = (m.clientX - M.left) / M.width, P = (m.clientY - M.top) / M.height, z = m.deltaY > 0 ? 1.1 : 0.9, E = w.w * z, I = w.h * z;
      w.x += (w.w - E) * T, w.y += (w.h - I) * P, w.w = E, w.h = I, i.value.setAttribute("viewBox", `${w.x} ${w.y} ${w.w} ${w.h}`);
    }
    const dt = U(() => {
      const m = p.value.position ?? "left-bottom", M = {};
      m.includes("left") ? M.left = "16px" : M.right = "16px", m.includes("top") ? M.top = "60px" : M.bottom = "16px";
      const T = p.value.style ?? {};
      return T.background && (M.background = T.background), T.borderColor && (M.borderColor = T.borderColor), T.borderRadius && (M.borderRadius = T.borderRadius + "px"), M;
    });
    return Bt(async () => {
      await Gt(), o.value && i.value && (w.w = o.value.clientWidth || 1200, w.h = (o.value.clientHeight || 800) - (n.showToolbar ? 48 : 0), i.value.addEventListener("mousedown", Y), i.value.addEventListener("wheel", wt, { passive: !1 }), document.addEventListener("mousemove", j), document.addEventListener("mouseup", B), h(), S());
    }), Xt(() => n.data, () => {
      h(), S();
    }, { deep: !0 }), (m, M) => {
      var T, P, z;
      return H(), V("div", {
        ref_key: "container",
        ref: o,
        class: "tg-wrap"
      }, [
        (H(), V("svg", {
          ref_key: "svgEl",
          ref: i,
          class: "tg-svg"
        }, null, 512)),
        t.showToolbar ? (H(), V("div", Oe, [
          M[2] || (M[2] = F("span", { class: "tg-toolbar-title" }, "拓扑图", -1)),
          M[3] || (M[3] = F("span", { class: "tg-toolbar-hint" }, "拖拽节点 · 滚轮缩放 · 空白平移", -1)),
          F("span", Ye, W(N.value), 1),
          F("button", {
            class: kt(["tg-fault-btn", { active: s.value === "offline" }]),
            onClick: M[0] || (M[0] = (E) => c("offline"))
          }, W(s.value === "offline" ? "退出筛选" : "独显离线设备"), 3),
          F("button", {
            class: kt(["tg-online-btn", { active: s.value === "online" }]),
            onClick: M[1] || (M[1] = (E) => c("online"))
          }, W(s.value === "online" ? "退出筛选" : "独显在线设备"), 3)
        ])) : st("", !0),
        p.value.show ? (H(), V("div", {
          key: 1,
          class: "tg-legend",
          style: Ft(dt.value)
        }, [
          y.value.length ? (H(), V(at, { key: 0 }, [
            F("h4", null, W(((T = p.value.sectionTitles) == null ? void 0 : T.devices) ?? "设备类型"), 1),
            (H(!0), V(at, null, Tt(y.value, (E) => {
              var I, R;
              return H(), V("div", {
                key: E,
                class: "tg-legend-row"
              }, [
                F("span", Be, W((I = v.value[E]) == null ? void 0 : I.icon), 1),
                F("span", null, W(((R = v.value[E]) == null ? void 0 : R.name) ?? E), 1)
              ]);
            }), 128)),
            M[4] || (M[4] = F("div", { class: "tg-legend-sep" }, null, -1))
          ], 64)) : st("", !0),
          _.value.length ? (H(), V(at, { key: 1 }, [
            F("h4", null, W(((P = p.value.sectionTitles) == null ? void 0 : P.links) ?? "链路类型"), 1),
            (H(!0), V(at, null, Tt(_.value, (E) => {
              var I, R, C, $;
              return H(), V("div", {
                key: E,
                class: "tg-legend-row"
              }, [
                (H(), V("svg", Ge, [
                  F("line", {
                    x1: "0",
                    y1: "3",
                    x2: "32",
                    y2: "3",
                    stroke: (I = g.value[E]) == null ? void 0 : I.color,
                    "stroke-width": (R = g.value[E]) == null ? void 0 : R.width,
                    "stroke-dasharray": (C = g.value[E]) == null ? void 0 : C.dash
                  }, null, 8, Xe)
                ])),
                F("span", null, W((($ = g.value[E]) == null ? void 0 : $.name) ?? E), 1)
              ]);
            }), 128)),
            M[5] || (M[5] = F("div", { class: "tg-legend-sep" }, null, -1))
          ], 64)) : st("", !0),
          p.value.showStatus !== !1 ? (H(), V(at, { key: 2 }, [
            F("h4", null, W(((z = p.value.sectionTitles) == null ? void 0 : z.status) ?? "设备状态"), 1),
            M[6] || (M[6] = Ht('<div class="tg-legend-row"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="transparent" stroke="#22c55e" stroke-width="1"></circle></svg><span>在线</span></div><div class="tg-legend-row"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#ef444425" stroke="#ef4444" stroke-width="1.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite"></animate></circle></svg><span style="color:#fca5a5;">离线</span></div>', 2))
          ], 64)) : st("", !0)
        ], 4)) : st("", !0)
      ], 512);
    };
  }
});
export {
  He as TopologyGraph,
  Vt as defaultDeviceTypes,
  Ut as defaultGroupTypes,
  Qt as defaultLinkTypes
};
