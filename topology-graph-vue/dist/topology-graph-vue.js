import { defineComponent as Qt, ref as ut, watch as Rt, computed as Z, reactive as Ut, onMounted as Wt, nextTick as Kt, openBlock as V, createElementBlock as Q, createElementVNode as O, toDisplayString as K, withDirectives as Jt, withKeys as Zt, vModelText as qt, normalizeClass as Lt, createCommentVNode as rt, normalizeStyle as kt, Fragment as ot, renderList as Tt, createStaticVNode as te } from "vue";
const ee = {
  terminal: { icon: "💻", name: "终端" },
  "comm-device": { icon: "📡", name: "通信机" },
  router: { icon: "🔀", name: "路由器" },
  switch: { icon: "🔌", name: "交换机" },
  server: { icon: "🖥", name: "服务器" },
  gps: { icon: "🛰", name: "GPS" },
  antenna: { icon: "📏", name: "天线" },
  "base-station": { icon: "🏠", name: "基站" }
}, ne = {
  internal: { color: "#334155", width: 1, dash: "4 2", name: "内部链路" },
  wired: { color: "#38bdf8", width: 1.5, dash: "", name: "有线" },
  fiber: { color: "#22d3ee", width: 1.5, dash: "", name: "光纤" },
  wireless: { color: "#fbbf24", width: 1, dash: "3 3", name: "超短波" },
  satellite: { color: "#a78bfa", width: 1.5, dash: "8 4", name: "卫星通道" },
  "4g": { color: "#34d399", width: 1, dash: "2 4 6 4", name: "4G" },
  "5g": { color: "#f472b6", width: 1.5, dash: "6 3 2 3", name: "5G" },
  microwave: { color: "#67e8f9", width: 1, dash: "10 2 3 2", name: "微波" }
}, ie = {
  island: { color: "#38bdf8", name: "岛屿" },
  "route-station": { color: "#22d3ee", name: "路由站" },
  ship: { color: "#06b6d4", name: "船只" },
  aircraft: { color: "#3b82f6", name: "飞行器" },
  vehicle: { color: "#22c55e", name: "车辆" },
  satellite: { color: "#a855f7", name: "卫星" },
  buoy: { color: "#f97316", name: "浮标" },
  station: { color: "#eab308", name: "基站" }
};
function re(t, e) {
  var n, r = 1;
  t == null && (t = 0), e == null && (e = 0);
  function o() {
    var s, c = n.length, y, w = 0, a = 0;
    for (s = 0; s < c; ++s)
      y = n[s], w += y.x, a += y.y;
    for (w = (w / c - t) * r, a = (a / c - e) * r, s = 0; s < c; ++s)
      y = n[s], y.x -= w, y.y -= a;
  }
  return o.initialize = function(s) {
    n = s;
  }, o.x = function(s) {
    return arguments.length ? (t = +s, o) : t;
  }, o.y = function(s) {
    return arguments.length ? (e = +s, o) : e;
  }, o.strength = function(s) {
    return arguments.length ? (r = +s, o) : r;
  }, o;
}
function oe(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return Xt(this.cover(e, n), e, n, t);
}
function Xt(t, e, n, r) {
  if (isNaN(e) || isNaN(n)) return t;
  var o, s = t._root, c = { data: r }, y = t._x0, w = t._y0, a = t._x1, x = t._y1, M, p, v, _, d, u, h, i;
  if (!s) return t._root = c, t;
  for (; s.length; )
    if ((d = e >= (M = (y + a) / 2)) ? y = M : a = M, (u = n >= (p = (w + x) / 2)) ? w = p : x = p, o = s, !(s = s[h = u << 1 | d])) return o[h] = c, t;
  if (v = +t._x.call(null, s.data), _ = +t._y.call(null, s.data), e === v && n === _) return c.next = s, o ? o[h] = c : t._root = c, t;
  do
    o = o ? o[h] = new Array(4) : t._root = new Array(4), (d = e >= (M = (y + a) / 2)) ? y = M : a = M, (u = n >= (p = (w + x) / 2)) ? w = p : x = p;
  while ((h = u << 1 | d) === (i = (_ >= p) << 1 | v >= M));
  return o[i] = s, o[h] = c, t;
}
function se(t) {
  var e, n, r = t.length, o, s, c = new Array(r), y = new Array(r), w = 1 / 0, a = 1 / 0, x = -1 / 0, M = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(o = +this._x.call(null, e = t[n])) || isNaN(s = +this._y.call(null, e)) || (c[n] = o, y[n] = s, o < w && (w = o), o > x && (x = o), s < a && (a = s), s > M && (M = s));
  if (w > x || a > M) return this;
  for (this.cover(w, a).cover(x, M), n = 0; n < r; ++n)
    Xt(this, c[n], y[n], t[n]);
  return this;
}
function ae(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e)) return this;
  var n = this._x0, r = this._y0, o = this._x1, s = this._y1;
  if (isNaN(n))
    o = (n = Math.floor(t)) + 1, s = (r = Math.floor(e)) + 1;
  else {
    for (var c = o - n || 1, y = this._root, w, a; n > t || t >= o || r > e || e >= s; )
      switch (a = (e < r) << 1 | t < n, w = new Array(4), w[a] = y, y = w, c *= 2, a) {
        case 0:
          o = n + c, s = r + c;
          break;
        case 1:
          n = o - c, s = r + c;
          break;
        case 2:
          o = n + c, r = s - c;
          break;
        case 3:
          n = o - c, r = s - c;
          break;
      }
    this._root && this._root.length && (this._root = y);
  }
  return this._x0 = n, this._y0 = r, this._x1 = o, this._y1 = s, this;
}
function le() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length) do
      t.push(e.data);
    while (e = e.next);
  }), t;
}
function ce(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function U(t, e, n, r, o) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = o;
}
function ue(t, e, n) {
  var r, o = this._x0, s = this._y0, c, y, w, a, x = this._x1, M = this._y1, p = [], v = this._root, _, d;
  for (v && p.push(new U(v, o, s, x, M)), n == null ? n = 1 / 0 : (o = t - n, s = e - n, x = t + n, M = e + n, n *= n); _ = p.pop(); )
    if (!(!(v = _.node) || (c = _.x0) > x || (y = _.y0) > M || (w = _.x1) < o || (a = _.y1) < s))
      if (v.length) {
        var u = (c + w) / 2, h = (y + a) / 2;
        p.push(
          new U(v[3], u, h, w, a),
          new U(v[2], c, h, u, a),
          new U(v[1], u, y, w, h),
          new U(v[0], c, y, u, h)
        ), (d = (e >= h) << 1 | t >= u) && (_ = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - d], p[p.length - 1 - d] = _);
      } else {
        var i = t - +this._x.call(null, v.data), l = e - +this._y.call(null, v.data), f = i * i + l * l;
        if (f < n) {
          var k = Math.sqrt(n = f);
          o = t - k, s = e - k, x = t + k, M = e + k, r = v.data;
        }
      }
  return r;
}
function fe(t) {
  if (isNaN(x = +this._x.call(null, t)) || isNaN(M = +this._y.call(null, t))) return this;
  var e, n = this._root, r, o, s, c = this._x0, y = this._y0, w = this._x1, a = this._y1, x, M, p, v, _, d, u, h;
  if (!n) return this;
  if (n.length) for (; ; ) {
    if ((_ = x >= (p = (c + w) / 2)) ? c = p : w = p, (d = M >= (v = (y + a) / 2)) ? y = v : a = v, e = n, !(n = n[u = d << 1 | _])) return this;
    if (!n.length) break;
    (e[u + 1 & 3] || e[u + 2 & 3] || e[u + 3 & 3]) && (r = e, h = u);
  }
  for (; n.data !== t; ) if (o = n, !(n = n.next)) return this;
  return (s = n.next) && delete n.next, o ? (s ? o.next = s : delete o.next, this) : e ? (s ? e[u] = s : delete e[u], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[h] = n : this._root = n), this) : (this._root = s, this);
}
function he(t) {
  for (var e = 0, n = t.length; e < n; ++e) this.remove(t[e]);
  return this;
}
function de() {
  return this._root;
}
function ve() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length) do
      ++t;
    while (e = e.next);
  }), t;
}
function ye(t) {
  var e = [], n, r = this._root, o, s, c, y, w;
  for (r && e.push(new U(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, s = n.x0, c = n.y0, y = n.x1, w = n.y1) && r.length) {
      var a = (s + y) / 2, x = (c + w) / 2;
      (o = r[3]) && e.push(new U(o, a, x, y, w)), (o = r[2]) && e.push(new U(o, s, x, a, w)), (o = r[1]) && e.push(new U(o, a, c, y, x)), (o = r[0]) && e.push(new U(o, s, c, a, x));
    }
  return this;
}
function pe(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new U(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var o = r.node;
    if (o.length) {
      var s, c = r.x0, y = r.y0, w = r.x1, a = r.y1, x = (c + w) / 2, M = (y + a) / 2;
      (s = o[0]) && e.push(new U(s, c, y, x, M)), (s = o[1]) && e.push(new U(s, x, y, w, M)), (s = o[2]) && e.push(new U(s, c, M, x, a)), (s = o[3]) && e.push(new U(s, x, M, w, a));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function ge(t) {
  return t[0];
}
function xe(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function me(t) {
  return t[1];
}
function we(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function It(t, e, n) {
  var r = new St(e ?? ge, n ?? me, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function St(t, e, n, r, o, s) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = o, this._y1 = s, this._root = void 0;
}
function Dt(t) {
  for (var e = { data: t.data }, n = e; t = t.next; ) n = n.next = { data: t.data };
  return e;
}
var W = It.prototype = St.prototype;
W.copy = function() {
  var t = new St(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e) return t;
  if (!e.length) return t._root = Dt(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var o = 0; o < 4; ++o)
      (r = e.source[o]) && (r.length ? n.push({ source: r, target: e.target[o] = new Array(4) }) : e.target[o] = Dt(r));
  return t;
};
W.add = oe;
W.addAll = se;
W.cover = ae;
W.data = le;
W.extent = ce;
W.find = ue;
W.remove = fe;
W.removeAll = he;
W.root = de;
W.size = ve;
W.visit = ye;
W.visitAfter = pe;
W.x = xe;
W.y = we;
function nt(t) {
  return function() {
    return t;
  };
}
function et(t) {
  return (t() - 0.5) * 1e-6;
}
function be(t) {
  return t.x + t.vx;
}
function _e(t) {
  return t.y + t.vy;
}
function Me(t) {
  var e, n, r, o = 1, s = 1;
  typeof t != "function" && (t = nt(t == null ? 1 : +t));
  function c() {
    for (var a, x = e.length, M, p, v, _, d, u, h = 0; h < s; ++h)
      for (M = It(e, be, _e).visitAfter(y), a = 0; a < x; ++a)
        p = e[a], d = n[p.index], u = d * d, v = p.x + p.vx, _ = p.y + p.vy, M.visit(i);
    function i(l, f, k, I, z) {
      var R = l.data, E = l.r, D = d + E;
      if (R) {
        if (R.index > p.index) {
          var P = v - R.x - R.vx, X = _ - R.y - R.vy, F = P * P + X * X;
          F < D * D && (P === 0 && (P = et(r), F += P * P), X === 0 && (X = et(r), F += X * X), F = (D - (F = Math.sqrt(F))) / F * o, p.vx += (P *= F) * (D = (E *= E) / (u + E)), p.vy += (X *= F) * D, R.vx -= P * (D = 1 - D), R.vy -= X * D);
        }
        return;
      }
      return f > v + D || I < v - D || k > _ + D || z < _ - D;
    }
  }
  function y(a) {
    if (a.data) return a.r = n[a.data.index];
    for (var x = a.r = 0; x < 4; ++x)
      a[x] && a[x].r > a.r && (a.r = a[x].r);
  }
  function w() {
    if (e) {
      var a, x = e.length, M;
      for (n = new Array(x), a = 0; a < x; ++a) M = e[a], n[M.index] = +t(M, a, e);
    }
  }
  return c.initialize = function(a, x) {
    e = a, r = x, w();
  }, c.iterations = function(a) {
    return arguments.length ? (s = +a, c) : s;
  }, c.strength = function(a) {
    return arguments.length ? (o = +a, c) : o;
  }, c.radius = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : nt(+a), w(), c) : t;
  }, c;
}
function Ee(t) {
  return t.index;
}
function zt(t, e) {
  var n = t.get(e);
  if (!n) throw new Error("node not found: " + e);
  return n;
}
function Ne(t) {
  var e = Ee, n = M, r, o = nt(30), s, c, y, w, a, x = 1;
  t == null && (t = []);
  function M(u) {
    return 1 / Math.min(y[u.source.index], y[u.target.index]);
  }
  function p(u) {
    for (var h = 0, i = t.length; h < x; ++h)
      for (var l = 0, f, k, I, z, R, E, D; l < i; ++l)
        f = t[l], k = f.source, I = f.target, z = I.x + I.vx - k.x - k.vx || et(a), R = I.y + I.vy - k.y - k.vy || et(a), E = Math.sqrt(z * z + R * R), E = (E - s[l]) / E * u * r[l], z *= E, R *= E, I.vx -= z * (D = w[l]), I.vy -= R * D, k.vx += z * (D = 1 - D), k.vy += R * D;
  }
  function v() {
    if (c) {
      var u, h = c.length, i = t.length, l = new Map(c.map((k, I) => [e(k, I, c), k])), f;
      for (u = 0, y = new Array(h); u < i; ++u)
        f = t[u], f.index = u, typeof f.source != "object" && (f.source = zt(l, f.source)), typeof f.target != "object" && (f.target = zt(l, f.target)), y[f.source.index] = (y[f.source.index] || 0) + 1, y[f.target.index] = (y[f.target.index] || 0) + 1;
      for (u = 0, w = new Array(i); u < i; ++u)
        f = t[u], w[u] = y[f.source.index] / (y[f.source.index] + y[f.target.index]);
      r = new Array(i), _(), s = new Array(i), d();
    }
  }
  function _() {
    if (c)
      for (var u = 0, h = t.length; u < h; ++u)
        r[u] = +n(t[u], u, t);
  }
  function d() {
    if (c)
      for (var u = 0, h = t.length; u < h; ++u)
        s[u] = +o(t[u], u, t);
  }
  return p.initialize = function(u, h) {
    c = u, a = h, v();
  }, p.links = function(u) {
    return arguments.length ? (t = u, v(), p) : t;
  }, p.id = function(u) {
    return arguments.length ? (e = u, p) : e;
  }, p.iterations = function(u) {
    return arguments.length ? (x = +u, p) : x;
  }, p.strength = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : nt(+u), _(), p) : n;
  }, p.distance = function(u) {
    return arguments.length ? (o = typeof u == "function" ? u : nt(+u), d(), p) : o;
  }, p;
}
var ke = { value: () => {
} };
function Bt() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new bt(n);
}
function bt(t) {
  this._ = t;
}
function Te(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", o = n.indexOf(".");
    if (o >= 0 && (r = n.slice(o + 1), n = n.slice(0, o)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
bt.prototype = Bt.prototype = {
  constructor: bt,
  on: function(t, e) {
    var n = this._, r = Te(t + "", n), o, s = -1, c = r.length;
    if (arguments.length < 2) {
      for (; ++s < c; ) if ((o = (t = r[s]).type) && (o = $e(n[o], t.name))) return o;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < c; )
      if (o = (t = r[s]).type) n[o] = jt(n[o], t.name, e);
      else if (e == null) for (o in n) n[o] = jt(n[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new bt(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), r = 0, o, s; r < o; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, o = s.length; r < o; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], o = 0, s = r.length; o < s; ++o) r[o].value.apply(e, n);
  }
};
function $e(t, e) {
  for (var n = 0, r = t.length, o; n < r; ++n)
    if ((o = t[n]).name === e)
      return o.value;
}
function jt(t, e, n) {
  for (var r = 0, o = t.length; r < o; ++r)
    if (t[r].name === e) {
      t[r] = ke, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var lt = 0, ht = 0, ft = 0, Gt = 1e3, _t, dt, Mt = 0, it = 0, Et = 0, yt = typeof performance == "object" && performance.now ? performance : Date, Ot = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ft() {
  return it || (Ot(Ae), it = yt.now() + Et);
}
function Ae() {
  it = 0;
}
function $t() {
  this._call = this._time = this._next = null;
}
$t.prototype = Ht.prototype = {
  constructor: $t,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Ft() : +n) + (e == null ? 0 : +e), !this._next && dt !== this && (dt ? dt._next = this : _t = this, dt = this), this._call = t, this._time = n, At();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, At());
  }
};
function Ht(t, e, n) {
  var r = new $t();
  return r.restart(t, e, n), r;
}
function Ie() {
  Ft(), ++lt;
  for (var t = _t, e; t; )
    (e = it - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --lt;
}
function Pt() {
  it = (Mt = yt.now()) + Et, lt = ht = 0;
  try {
    Ie();
  } finally {
    lt = 0, Ce(), it = 0;
  }
}
function Se() {
  var t = yt.now(), e = t - Mt;
  e > Gt && (Et -= e, Mt = t);
}
function Ce() {
  for (var t, e = _t, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : _t = n);
  dt = t, At(r);
}
function At(t) {
  if (!lt) {
    ht && (ht = clearTimeout(ht));
    var e = t - it;
    e > 24 ? (t < 1 / 0 && (ht = setTimeout(Pt, t - yt.now() - Et)), ft && (ft = clearInterval(ft))) : (ft || (Mt = yt.now(), ft = setInterval(Se, Gt)), lt = 1, Ot(Pt));
  }
}
const Re = 1664525, Le = 1013904223, Yt = 4294967296;
function De() {
  let t = 1;
  return () => (t = (Re * t + Le) % Yt) / Yt;
}
function ze(t) {
  return t.x;
}
function je(t) {
  return t.y;
}
var Pe = 10, Ye = Math.PI * (3 - Math.sqrt(5));
function Xe(t) {
  var e, n = 1, r = 1e-3, o = 1 - Math.pow(r, 1 / 300), s = 0, c = 0.6, y = /* @__PURE__ */ new Map(), w = Ht(M), a = Bt("tick", "end"), x = De();
  t == null && (t = []);
  function M() {
    p(), a.call("tick", e), n < r && (w.stop(), a.call("end", e));
  }
  function p(d) {
    var u, h = t.length, i;
    d === void 0 && (d = 1);
    for (var l = 0; l < d; ++l)
      for (n += (s - n) * o, y.forEach(function(f) {
        f(n);
      }), u = 0; u < h; ++u)
        i = t[u], i.fx == null ? i.x += i.vx *= c : (i.x = i.fx, i.vx = 0), i.fy == null ? i.y += i.vy *= c : (i.y = i.fy, i.vy = 0);
    return e;
  }
  function v() {
    for (var d = 0, u = t.length, h; d < u; ++d) {
      if (h = t[d], h.index = d, h.fx != null && (h.x = h.fx), h.fy != null && (h.y = h.fy), isNaN(h.x) || isNaN(h.y)) {
        var i = Pe * Math.sqrt(0.5 + d), l = d * Ye;
        h.x = i * Math.cos(l), h.y = i * Math.sin(l);
      }
      (isNaN(h.vx) || isNaN(h.vy)) && (h.vx = h.vy = 0);
    }
  }
  function _(d) {
    return d.initialize && d.initialize(t, x), d;
  }
  return v(), e = {
    tick: p,
    restart: function() {
      return w.restart(M), e;
    },
    stop: function() {
      return w.stop(), e;
    },
    nodes: function(d) {
      return arguments.length ? (t = d, v(), y.forEach(_), e) : t;
    },
    alpha: function(d) {
      return arguments.length ? (n = +d, e) : n;
    },
    alphaMin: function(d) {
      return arguments.length ? (r = +d, e) : r;
    },
    alphaDecay: function(d) {
      return arguments.length ? (o = +d, e) : +o;
    },
    alphaTarget: function(d) {
      return arguments.length ? (s = +d, e) : s;
    },
    velocityDecay: function(d) {
      return arguments.length ? (c = 1 - d, e) : 1 - c;
    },
    randomSource: function(d) {
      return arguments.length ? (x = d, y.forEach(_), e) : x;
    },
    force: function(d, u) {
      return arguments.length > 1 ? (u == null ? y.delete(d) : y.set(d, _(u)), e) : y.get(d);
    },
    find: function(d, u, h) {
      var i = 0, l = t.length, f, k, I, z, R;
      for (h == null ? h = 1 / 0 : h *= h, i = 0; i < l; ++i)
        z = t[i], f = d - z.x, k = u - z.y, I = f * f + k * k, I < h && (R = z, h = I);
      return R;
    },
    on: function(d, u) {
      return arguments.length > 1 ? (a.on(d, u), e) : a.on(d);
    }
  };
}
function Be() {
  var t, e, n, r, o = nt(-30), s, c = 1, y = 1 / 0, w = 0.81;
  function a(v) {
    var _, d = t.length, u = It(t, ze, je).visitAfter(M);
    for (r = v, _ = 0; _ < d; ++_) e = t[_], u.visit(p);
  }
  function x() {
    if (t) {
      var v, _ = t.length, d;
      for (s = new Array(_), v = 0; v < _; ++v) d = t[v], s[d.index] = +o(d, v, t);
    }
  }
  function M(v) {
    var _ = 0, d, u, h = 0, i, l, f;
    if (v.length) {
      for (i = l = f = 0; f < 4; ++f)
        (d = v[f]) && (u = Math.abs(d.value)) && (_ += d.value, h += u, i += u * d.x, l += u * d.y);
      v.x = i / h, v.y = l / h;
    } else {
      d = v, d.x = d.data.x, d.y = d.data.y;
      do
        _ += s[d.data.index];
      while (d = d.next);
    }
    v.value = _;
  }
  function p(v, _, d, u) {
    if (!v.value) return !0;
    var h = v.x - e.x, i = v.y - e.y, l = u - _, f = h * h + i * i;
    if (l * l / w < f)
      return f < y && (h === 0 && (h = et(n), f += h * h), i === 0 && (i = et(n), f += i * i), f < c && (f = Math.sqrt(c * f)), e.vx += h * v.value * r / f, e.vy += i * v.value * r / f), !0;
    if (v.length || f >= y) return;
    (v.data !== e || v.next) && (h === 0 && (h = et(n), f += h * h), i === 0 && (i = et(n), f += i * i), f < c && (f = Math.sqrt(c * f)));
    do
      v.data !== e && (l = s[v.data.index] * r / f, e.vx += h * l, e.vy += i * l);
    while (v = v.next);
  }
  return a.initialize = function(v, _) {
    t = v, n = _, x();
  }, a.strength = function(v) {
    return arguments.length ? (o = typeof v == "function" ? v : nt(+v), x(), a) : o;
  }, a.distanceMin = function(v) {
    return arguments.length ? (c = v * v, a) : Math.sqrt(c);
  }, a.distanceMax = function(v) {
    return arguments.length ? (y = v * v, a) : Math.sqrt(y);
  }, a.theta = function(v) {
    return arguments.length ? (w = v * v, a) : Math.sqrt(w);
  }, a;
}
const Ge = {
  island: 0,
  "route-station": 0,
  satellite: 0,
  aircraft: 1,
  buoy: 1,
  ship: 2,
  vehicle: 2,
  station: 2
}, st = 13, vt = 8;
function at(t, e) {
  return t <= 0 ? 30 : t === 1 ? e + vt : e / Math.sin(Math.PI / t) + vt;
}
function Vt(t) {
  return at(t, st) + 12;
}
function Oe(t) {
  const e = t.subs ?? [], n = t.devices ?? [];
  if (e.length > 0) {
    const r = e.map((c) => Vt(c.devices.length));
    if (r.length === 1)
      return r[0] + vt + 18;
    const o = Math.max(...r);
    return at(r.length, o) + o + vt + 18;
  }
  return at(n.length, st) + vt + 18;
}
function Fe(t, e, n, r, o, s) {
  const c = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
  t.groups.forEach((i) => {
    var l, f;
    (l = i.devices) == null || l.forEach((k) => c.set(k.id, i.id)), (f = i.subs) == null || f.forEach((k) => k.devices.forEach((I) => {
      c.set(I.id, i.id), y.set(I.id, k.id);
    }));
  });
  const w = t.groups.map((i) => Oe(i)), a = t.groups.map((i, l) => ({
    id: i.id,
    groupIdx: l,
    layer: Ge[i.type] ?? 2,
    radius: w[l]
  })), x = /* @__PURE__ */ new Set(), M = [];
  t.links.forEach((i) => {
    const l = c.get(i.source), f = c.get(i.target);
    if (!l || !f || l === f) return;
    const k = l < f ? `${l}|${f}` : `${f}|${l}`;
    x.has(k) || (x.add(k), M.push({ source: l, target: f, ltype: i.type }));
  });
  const p = new Set(a.map((i) => i.layer)).size, v = s / (p + 1), _ = {};
  a.forEach((i) => {
    var l;
    (_[l = i.layer] ?? (_[l] = [])).push(i);
  }), Object.entries(_).forEach(([i, l]) => {
    const f = v * (Number(i) + 1), k = l.reduce((R, E) => R + E.radius * 2, 0), I = Math.max(80, (o - 80 - k) / Math.max(l.length, 1));
    let z = (o - (k + I * (l.length - 1))) / 2;
    l.forEach((R) => {
      R.x = z + R.radius, R.y = f + (Math.random() - 0.5) * 20, z += R.radius * 2 + I;
    });
  });
  const d = Xe(a).force("link", Ne(M).id((i) => i.id).distance(350).strength(0.25)).force("charge", Be().strength((i) => -i.radius * 20)).force("center", re(o / 2, s / 2)).force("collide", Me().radius((i) => i.radius + 20).strength(0.8)).stop();
  for (let i = 0; i < 400; i++) d.tick();
  a.forEach((i) => {
    i.x == null && (i.x = o / 2), i.y == null && (i.y = s / 2);
  });
  const u = t.groups.map((i, l) => {
    const f = a[l], k = e[i.type] || "#38bdf8", I = i.subs ?? [], z = [];
    if (I.length > 0) {
      const E = I.map((X) => Vt(X.devices.length)), D = Math.max(...E);
      let P;
      I.length === 1 ? P = 0 : P = at(I.length, D), I.forEach((X, F) => {
        const j = E[F], ct = -Math.PI / 2 + 2 * Math.PI / I.length * F, pt = f.x + P * Math.cos(ct), gt = f.y + P * Math.sin(ct), xt = at(X.devices.length, st), Nt = X.devices.map((mt, g) => {
          const b = -Math.PI / 2 + 2 * Math.PI / Math.max(X.devices.length, 1) * g;
          return {
            ...mt,
            groupId: i.id,
            subId: X.id,
            icon: r[mt.type] || "📦",
            r: st,
            x: pt + xt * Math.cos(b),
            y: gt + xt * Math.sin(b)
          };
        });
        z.push({ id: X.id, name: X.name, x: pt, y: gt, r: j, devices: Nt, groupId: i.id });
      });
    }
    const R = (i.devices ?? []).map((E, D) => {
      const P = (i.devices ?? []).length, X = at(P, st), F = -Math.PI / 2 + 2 * Math.PI / Math.max(P, 1) * D;
      return {
        ...E,
        groupId: i.id,
        icon: r[E.type] || "📦",
        r: st,
        x: f.x + X * Math.cos(F),
        y: f.y + X * Math.sin(F)
      };
    });
    return {
      id: i.id,
      name: i.name,
      type: i.type,
      color: k,
      x: f.x,
      y: f.y,
      r: w[l],
      subs: z,
      devices: R
    };
  }), h = t.links.map((i) => {
    const l = c.get(i.source), f = c.get(i.target), k = y.get(i.source), I = y.get(i.target);
    let z = "external";
    return l === f && (z = k && I && k === I ? "internal" : "sub"), { source: i.source, target: i.target, type: i.type, status: i.status ?? "normal", level: z };
  });
  return { groups: u, links: h };
}
const He = "http://www.w3.org/2000/svg";
function G(t, e = {}, n = null) {
  const r = document.createElementNS(He, t);
  for (const [o, s] of Object.entries(e))
    s !== void 0 && r.setAttribute(o, String(s));
  return n && n.appendChild(r), r;
}
function wt(t, e, n) {
  const r = G("text", e, n);
  return r.textContent = t, r;
}
function Ve(t, e, n, r, o = {}) {
  const s = e.x - t.x, c = e.y - t.y, y = Math.sqrt(s * s + c * c) || 1, w = t.x + s / y * (t.r + 2), a = t.y + c / y * (t.r + 2), x = e.x - s / y * (e.r + 2), M = e.y - c / y * (e.r + 2), p = o.opacity ?? 1;
  if (o.curve) {
    const v = (w + x) / 2 - c * o.curve, _ = (a + M) / 2 + s * o.curve;
    G("path", { d: `M${w},${a} Q${v},${_} ${x},${M}`, fill: "none", stroke: n.color, "stroke-width": n.width, "stroke-dasharray": n.dash || void 0, opacity: p }, r);
  } else
    G("line", { x1: w, y1: a, x2: x, y2: M, stroke: n.color, "stroke-width": n.width, "stroke-dasharray": n.dash || void 0, opacity: p }, r);
}
function Qe(t, e, n) {
  for (; t.firstChild; ) t.removeChild(t.firstChild);
  t.setAttribute("viewBox", `${n.x} ${n.y} ${n.w} ${n.h}`);
  const r = G("defs", {}, t), o = G("pattern", { id: "tg-grid", width: 40, height: 40, patternUnits: "userSpaceOnUse" }, r);
  G("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "#1e293b", "stroke-width": 0.5 }, o), G("rect", { width: 2e4, height: 2e4, x: -1e4, y: -1e4, fill: "#0f172a" }, t), G("rect", { width: 2e4, height: 2e4, x: -1e4, y: -1e4, fill: "url(#tg-grid)" }, t);
  const s = G("g", {}, t), c = G("g", {}, t), y = G("g", {}, t), w = G("g", {}, t), { groups: a, links: x, faultMode: M, linkTypes: p, faultRelated: v } = e, _ = M ? v : /* @__PURE__ */ new Set();
  function d(i, l) {
    return _.has(i) || _.has(l);
  }
  function u(i) {
    return i.subs.some((l) => l.devices.some((f) => _.has(f.id))) || i.devices.some((l) => _.has(l.id));
  }
  x.forEach((i, l) => {
    const f = e.deviceMap.get(i.source), k = e.deviceMap.get(i.target);
    if (!f || !k) return;
    const I = p[i.type] || p.internal || { color: "#475569", width: 1, dash: "4 2" }, z = M && !d(i.source, i.target), R = i.level === "external";
    Ve(f, k, I, s, {
      opacity: z ? 0.06 : R ? 0.5 : 1,
      curve: R ? 0.06 + l % 5 * 0.02 : void 0
    });
  }), a.forEach((i) => {
    const l = M && !u(i);
    G("circle", { cx: i.x, cy: i.y, r: i.r, fill: "transparent", stroke: i.color, "stroke-width": 1.5, "stroke-dasharray": "6 3", opacity: l ? 0.05 : 0.5, "data-gid": i.id, cursor: "grab" }, c), wt(i.name, { x: i.x, y: i.y - i.r + 14, "text-anchor": "middle", fill: i.color, "font-size": i.r > 80 ? 10 : 9, "font-weight": "bold", opacity: l ? 0.05 : 0.8, "data-gid": i.id, cursor: "grab" }, w);
  }), a.forEach((i) => i.subs.forEach((l) => {
    const f = M && !l.devices.some((k) => _.has(k.id));
    G("circle", { cx: l.x, cy: l.y, r: l.r, fill: "transparent", stroke: i.color, "stroke-width": 1, "stroke-dasharray": "4 2", opacity: f ? 0.04 : 0.35, "data-sid": l.id, cursor: "grab" }, c), wt(l.name, { x: l.x, y: l.y - l.r + 12, "text-anchor": "middle", fill: i.color, "font-size": 8, opacity: f ? 0.04 : 0.6, "data-sid": l.id, cursor: "grab" }, w);
  }));
  const h = [];
  a.forEach((i) => {
    i.subs.forEach((l) => l.devices.forEach((f) => h.push(f))), i.devices.forEach((l) => h.push(l));
  }), h.forEach((i) => {
    const l = i.status === "offline", f = _.has(i.id), I = M && !f ? 0.06 : 1;
    if (l) {
      const z = G("circle", { cx: i.x, cy: i.y, r: i.r + 4, fill: "#ef444415", stroke: "#ef4444", "stroke-width": 1.5 }, y);
      G("animate", { attributeName: "opacity", values: "0.3;0.9;0.3", dur: "1.2s", repeatCount: "indefinite" }, z), G("animate", { attributeName: "r", values: `${i.r + 2};${i.r + 10};${i.r + 2}`, dur: "1.2s", repeatCount: "indefinite" }, z), G("circle", { cx: i.x, cy: i.y, r: i.r, fill: "#ef444425", stroke: "#ef4444", "stroke-width": 1.5, "data-nid": i.id, cursor: "grab" }, y);
    } else
      G("circle", { cx: i.x, cy: i.y, r: i.r, fill: "transparent", stroke: "#22c55e", "stroke-width": 1, opacity: I, "data-nid": i.id, cursor: "grab" }, y);
    wt(i.icon, { x: i.x, y: i.y - 2, "text-anchor": "middle", "font-size": i.r > 14 ? 11 : 9, opacity: I, "data-nid": i.id, cursor: "grab" }, y), wt(i.name, { x: i.x, y: i.y + (i.r > 14 ? 11 : 9), "text-anchor": "middle", fill: l ? "#fca5a5" : "#64748b", "font-size": i.r > 14 ? 7 : 6, opacity: I, "data-nid": i.id, cursor: "grab" }, y);
  });
}
const Ue = {
  key: 0,
  class: "tg-toolbar"
}, We = { class: "tg-toolbar-info" }, Ke = { class: "tg-tooltip-label" }, Je = { class: "tg-tooltip-value" }, Ze = { class: "tg-legend-icon" }, qe = {
  width: "32",
  height: "6"
}, tn = ["stroke", "stroke-width", "stroke-dasharray"], nn = /* @__PURE__ */ Qt({
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
    const n = t, r = ut(), o = ut(), s = ut(null), c = ut("");
    function y() {
      c.value.trim() ? s.value = "search" : s.value = null, D();
    }
    Rt(c, (g) => {
      !g && s.value === "search" && (s.value = null, D());
    });
    function w(g) {
      c.value = "", s.value = s.value === g ? null : g, D();
    }
    const a = Z(() => ({ ...ee, ...n.deviceTypes })), x = Z(() => ({ ...ne, ...n.linkTypes })), M = Z(() => ({ ...ie, ...n.groupTypes })), p = Z(() => n.legend ?? {}), v = Z(() => {
      const g = {};
      for (const [b, N] of Object.entries(M.value)) g[b] = N.color;
      return g;
    }), _ = Z(() => {
      const g = {};
      for (const [b, N] of Object.entries(a.value)) g[b] = N.icon;
      return g;
    }), d = Z(() => {
      const g = Object.keys(a.value);
      return p.value.deviceTypes ?? g;
    }), u = Z(() => {
      const g = Object.keys(x.value);
      return p.value.linkTypes ?? g;
    });
    let h = [], i = [], l = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    function k() {
      if (!o.value) return;
      const g = o.value.clientWidth || 1200, b = o.value.clientHeight || 800, N = g * 1.8, L = b * 1.8, Y = Fe(
        n.data,
        v.value,
        {},
        _.value,
        N,
        L
      );
      if (h = Y.groups, i = Y.links, l.clear(), f.clear(), h.forEach(($) => {
        f.set($.id, { group: $, subs: $.subs }), $.subs.forEach((A) => A.devices.forEach((B) => l.set(B.id, B))), $.devices.forEach((A) => l.set(A.id, A));
      }), R(), h.length === 0) return;
      let m = 1 / 0, T = 1 / 0, S = -1 / 0, C = -1 / 0;
      h.forEach(($) => {
        const A = $.r + 20;
        $.x - A < m && (m = $.x - A), $.y - A < T && (T = $.y - A), $.x + A > S && (S = $.x + A), $.y + A > C && (C = $.y + A);
      }), E.x = m, E.y = T, E.w = S - m, E.h = C - T;
    }
    const I = Z(() => {
      if (!s.value) return /* @__PURE__ */ new Set();
      const g = /* @__PURE__ */ new Set();
      if (s.value === "search") {
        const b = c.value.trim().toLowerCase(), N = /* @__PURE__ */ new Set();
        h.forEach((L) => {
          const Y = L.name.toLowerCase().includes(b);
          L.subs.forEach((m) => {
            const T = m.name.toLowerCase().includes(b);
            (Y || T) && m.devices.forEach((S) => {
              N.add(S.id), g.add(S.id);
            });
          }), Y && L.devices.forEach((m) => {
            N.add(m.id), g.add(m.id);
          });
        }), i.forEach((L) => {
          N.has(L.source) && g.add(L.target), N.has(L.target) && g.add(L.source);
        });
      } else {
        const b = s.value;
        l.forEach((N, L) => {
          N.status === b && g.add(L);
        }), i.forEach((N) => {
          var L, Y;
          (g.has(N.source) || ((L = l.get(N.source)) == null ? void 0 : L.status) === b) && g.add(N.target), (g.has(N.target) || ((Y = l.get(N.target)) == null ? void 0 : Y.status) === b) && g.add(N.source);
        });
      }
      return g;
    }), z = ut("");
    function R() {
      let g = 0, b = 0;
      l.forEach((N) => {
        g++, N.status === "offline" && b++;
      }), z.value = `${g}个设备 · ${b}个离线`;
    }
    const E = { x: 0, y: 0, w: 1200, h: 800 };
    function D() {
      !r.value || h.length === 0 || Qe(r.value, {
        groups: h,
        links: i,
        deviceMap: l,
        faultMode: !!s.value,
        faultRelated: I.value,
        deviceTypes: a.value,
        linkTypes: x.value,
        groupTypes: M.value,
        legend: p.value
      }, E);
    }
    const P = Ut({
      visible: !1,
      title: "",
      color: "#38bdf8",
      items: [],
      style: {}
    });
    function X(g) {
      const b = g.target, N = b.getAttribute("data-gid"), L = b.getAttribute("data-sid");
      let Y = "", m = "#38bdf8", T = [];
      if (N && f.has(N)) {
        const { group: A } = f.get(N);
        Y = A.name, m = A.color;
        const B = [...A.subs.flatMap((J) => J.devices), ...A.devices], H = B.filter((J) => J.status !== "offline").length, q = B.length - H;
        T = [
          { label: "类型", value: { island: "岛屿", ship: "船舶", "route-station": "路由站", aircraft: "飞行器", buoy: "浮标", satellite: "卫星", vehicle: "车辆", station: "站点" }[A.type] ?? A.type }
        ], A.subs.length > 0 && T.push({ label: "子站", value: `${A.subs.length} 个` }), T.push(
          { label: "设备", value: `${B.length} 个` },
          { label: "在线", value: `${H} 个` },
          { label: "离线", value: `${q} 个` }
        );
      } else if (L)
        for (const A of h) {
          const B = A.subs.find((H) => H.id === L);
          if (B) {
            Y = B.name, m = A.color;
            const H = B.devices.filter((tt) => tt.status !== "offline").length, q = B.devices.length - H;
            T = [
              { label: "所属", value: A.name },
              { label: "设备", value: `${B.devices.length} 个` },
              { label: "在线", value: `${H} 个` },
              { label: "离线", value: `${q} 个` }
            ];
            break;
          }
        }
      else
        return;
      if (P.title = Y, P.color = m, P.items = T, !o.value) return;
      const S = o.value.getBoundingClientRect();
      let C = g.clientX - S.left + 14, $ = g.clientY - S.top + 14;
      C + 180 > S.width && (C = g.clientX - S.left - 190), $ + 140 > S.height && ($ = g.clientY - S.top - 140), P.style = { left: `${C}px`, top: `${$}px` }, P.visible = !0;
    }
    function F() {
      P.visible = !1;
    }
    let j = null;
    function ct(g, b) {
      if (!r.value) return { x: 0, y: 0 };
      const N = r.value.getBoundingClientRect();
      return { x: (g - N.left) * E.w / N.width + E.x, y: (b - N.top) * E.h / N.height + E.y };
    }
    function pt(g) {
      const b = g.target, N = b.getAttribute("data-nid"), L = b.getAttribute("data-sid"), Y = b.getAttribute("data-gid");
      if (N && l.has(N)) {
        const m = l.get(N);
        j = { type: "node", id: N, sx: m.x, sy: m.y, mx: g.clientX, my: g.clientY }, g.preventDefault();
      } else if (L) {
        let m = null, T = null;
        for (const S of h) {
          const C = S.subs.find(($) => $.id === L);
          if (C) {
            m = C, T = S;
            break;
          }
        }
        if (m && T) {
          const S = m.devices.map((C) => ({ id: C.id, x: C.x, y: C.y }));
          j = { type: "sub", sub: m, group: T, sx: m.x, sy: m.y, ns: S, mx: g.clientX, my: g.clientY }, g.preventDefault();
        }
      } else if (Y && f.has(Y)) {
        const { group: m, subs: T } = f.get(Y), S = [];
        T.forEach(($) => $.devices.forEach((A) => S.push({ id: A.id, x: A.x, y: A.y }))), m.devices.forEach(($) => S.push({ id: $.id, x: $.x, y: $.y }));
        const C = T.map(($) => ({ sub: $, sx: $.x, sy: $.y }));
        j = { type: "group", group: m, allSubs: C, allNodes: S, sx: m.x, sy: m.y, mx: g.clientX, my: g.clientY }, g.preventDefault();
      } else
        j = { type: "pan", mx: g.clientX, my: g.clientY };
      r.value.style.cursor = "grabbing";
    }
    function gt(g) {
      if (!j) return;
      if (g.preventDefault(), j.type === "pan") {
        if (!r.value) return;
        const m = r.value.getBoundingClientRect(), T = E.w / m.width;
        E.x -= (g.clientX - j.mx) * T, E.y -= (g.clientY - j.my) * T, j.mx = g.clientX, j.my = g.clientY, r.value.setAttribute("viewBox", `${E.x} ${E.y} ${E.w} ${E.h}`);
        return;
      }
      const b = ct(g.clientX, g.clientY), N = ct(j.mx, j.my), L = b.x - N.x, Y = b.y - N.y;
      if (j.type === "node") {
        const m = l.get(j.id);
        let T = j.sx + L, S = j.sy + Y;
        const C = h.find((J) => J.id === m.groupId), A = C.subs.find((J) => J.id === m.subId) ?? C, B = A.r - m.r - 2, H = T - A.x, q = S - A.y, tt = Math.sqrt(H * H + q * q);
        tt > B && tt > 0 && (T = A.x + H / tt * B, S = A.y + q / tt * B), m.x = T, m.y = S, D();
      } else if (j.type === "sub") {
        const { sub: m, group: T } = j;
        let S = j.sx + L, C = j.sy + Y;
        const $ = T.r - m.r - 2, A = S - T.x, B = C - T.y, H = Math.sqrt(A * A + B * B);
        H > $ && H > 0 && (S = T.x + A / H * $, C = T.y + B / H * $);
        const q = S - j.sx, tt = C - j.sy;
        m.x = S, m.y = C, j.ns.forEach((J) => {
          const Ct = l.get(J.id);
          Ct.x = J.x + q, Ct.y = J.y + tt;
        }), D();
      } else if (j.type === "group") {
        const { group: m, allSubs: T, allNodes: S } = j;
        m.x = j.sx + L, m.y = j.sy + Y, T.forEach((C) => {
          C.sub.x = C.sx + L, C.sub.y = C.sy + Y;
        }), S.forEach((C) => {
          const $ = l.get(C.id);
          $.x = C.x + L, $.y = C.y + Y;
        }), D();
      }
    }
    function xt() {
      j = null, r.value && (r.value.style.cursor = "");
    }
    function Nt(g) {
      if (g.preventDefault(), !r.value) return;
      const b = r.value.getBoundingClientRect(), N = (g.clientX - b.left) / b.width, L = (g.clientY - b.top) / b.height, Y = g.deltaY > 0 ? 1.1 : 0.9, m = E.w * Y, T = E.h * Y;
      E.x += (E.w - m) * N, E.y += (E.h - T) * L, E.w = m, E.h = T, r.value.setAttribute("viewBox", `${E.x} ${E.y} ${E.w} ${E.h}`);
    }
    const mt = Z(() => {
      const g = p.value.position ?? "left-bottom", b = {};
      g.includes("left") ? b.left = "16px" : b.right = "16px", g.includes("top") ? b.top = "60px" : b.bottom = "16px";
      const N = p.value.style ?? {};
      return N.background && (b.background = N.background), N.borderColor && (b.borderColor = N.borderColor), N.borderRadius && (b.borderRadius = N.borderRadius + "px"), b;
    });
    return Wt(async () => {
      await Kt(), o.value && r.value && (E.w = o.value.clientWidth || 1200, E.h = (o.value.clientHeight || 800) - (n.showToolbar ? 48 : 0), r.value.addEventListener("mousedown", pt), r.value.addEventListener("wheel", Nt, { passive: !1 }), r.value.addEventListener("mouseover", X), r.value.addEventListener("mouseout", F), document.addEventListener("mousemove", gt), document.addEventListener("mouseup", xt), k(), D());
    }), Rt(() => n.data, () => {
      k(), D();
    }, { deep: !0 }), (g, b) => {
      var N, L, Y;
      return V(), Q("div", {
        ref_key: "container",
        ref: o,
        class: "tg-wrap"
      }, [
        (V(), Q("svg", {
          ref_key: "svgEl",
          ref: r,
          class: "tg-svg"
        }, null, 512)),
        t.showToolbar ? (V(), Q("div", Ue, [
          b[3] || (b[3] = O("span", { class: "tg-toolbar-title" }, "拓扑图", -1)),
          b[4] || (b[4] = O("span", { class: "tg-toolbar-hint" }, "拖拽节点 · 滚轮缩放 · 空白平移", -1)),
          O("span", We, K(z.value), 1),
          Jt(O("input", {
            class: "tg-search-input",
            "onUpdate:modelValue": b[0] || (b[0] = (m) => c.value = m),
            placeholder: "搜索区域/站点/船名",
            onKeydown: Zt(y, ["enter"])
          }, null, 544), [
            [qt, c.value]
          ]),
          O("button", {
            class: Lt(["tg-fault-btn", { active: s.value === "offline" }]),
            onClick: b[1] || (b[1] = (m) => w("offline"))
          }, K(s.value === "offline" ? "退出筛选" : "独显离线设备"), 3),
          O("button", {
            class: Lt(["tg-online-btn", { active: s.value === "online" }]),
            onClick: b[2] || (b[2] = (m) => w("online"))
          }, K(s.value === "online" ? "退出筛选" : "独显在线设备"), 3)
        ])) : rt("", !0),
        P.visible ? (V(), Q("div", {
          key: 1,
          class: "tg-tooltip",
          style: kt(P.style)
        }, [
          O("h5", {
            style: kt({ color: P.color })
          }, K(P.title), 5),
          (V(!0), Q(ot, null, Tt(P.items, (m) => (V(), Q("div", {
            key: m.label,
            class: "tg-tooltip-row"
          }, [
            O("span", Ke, K(m.label), 1),
            O("span", Je, K(m.value), 1)
          ]))), 128))
        ], 4)) : rt("", !0),
        p.value.show ? (V(), Q("div", {
          key: 2,
          class: "tg-legend",
          style: kt(mt.value)
        }, [
          d.value.length ? (V(), Q(ot, { key: 0 }, [
            O("h4", null, K(((N = p.value.sectionTitles) == null ? void 0 : N.devices) ?? "设备类型"), 1),
            (V(!0), Q(ot, null, Tt(d.value, (m) => {
              var T, S;
              return V(), Q("div", {
                key: m,
                class: "tg-legend-row"
              }, [
                O("span", Ze, K((T = a.value[m]) == null ? void 0 : T.icon), 1),
                O("span", null, K(((S = a.value[m]) == null ? void 0 : S.name) ?? m), 1)
              ]);
            }), 128)),
            b[5] || (b[5] = O("div", { class: "tg-legend-sep" }, null, -1))
          ], 64)) : rt("", !0),
          u.value.length ? (V(), Q(ot, { key: 1 }, [
            O("h4", null, K(((L = p.value.sectionTitles) == null ? void 0 : L.links) ?? "链路类型"), 1),
            (V(!0), Q(ot, null, Tt(u.value, (m) => {
              var T, S, C, $;
              return V(), Q("div", {
                key: m,
                class: "tg-legend-row"
              }, [
                (V(), Q("svg", qe, [
                  O("line", {
                    x1: "0",
                    y1: "3",
                    x2: "32",
                    y2: "3",
                    stroke: (T = x.value[m]) == null ? void 0 : T.color,
                    "stroke-width": (S = x.value[m]) == null ? void 0 : S.width,
                    "stroke-dasharray": (C = x.value[m]) == null ? void 0 : C.dash
                  }, null, 8, tn)
                ])),
                O("span", null, K((($ = x.value[m]) == null ? void 0 : $.name) ?? m), 1)
              ]);
            }), 128)),
            b[6] || (b[6] = O("div", { class: "tg-legend-sep" }, null, -1))
          ], 64)) : rt("", !0),
          p.value.showStatus !== !1 ? (V(), Q(ot, { key: 2 }, [
            O("h4", null, K(((Y = p.value.sectionTitles) == null ? void 0 : Y.status) ?? "设备状态"), 1),
            b[7] || (b[7] = te('<div class="tg-legend-row"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="transparent" stroke="#22c55e" stroke-width="1"></circle></svg><span>在线</span></div><div class="tg-legend-row"><svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#ef444425" stroke="#ef4444" stroke-width="1.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite"></animate></circle></svg><span style="color:#fca5a5;">离线</span></div>', 2))
          ], 64)) : rt("", !0)
        ], 4)) : rt("", !0)
      ], 512);
    };
  }
});
export {
  nn as TopologyGraph,
  ee as defaultDeviceTypes,
  ie as defaultGroupTypes,
  ne as defaultLinkTypes
};
