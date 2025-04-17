var g = Object.defineProperty,
  h = Object.defineProperties;
var x = Object.getOwnPropertyDescriptors;
var c = Object.getOwnPropertySymbols;
var d = Object.prototype.hasOwnProperty,
  s = Object.prototype.propertyIsEnumerable;
var r = (t, i, n) =>
    i in t
      ? g(t, i, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (t[i] = n),
  u = (t, i) => {
    for (var n in i || (i = {})) d.call(i, n) && r(t, n, i[n]);
    if (c) for (var n of c(i)) s.call(i, n) && r(t, n, i[n]);
    return t;
  },
  k = (t, i) => h(t, x(i));
var y = (t, i) => {
  var n = {};
  for (var e in t) d.call(t, e) && i.indexOf(e) < 0 && (n[e] = t[e]);
  if (t != null && c)
    for (var e of c(t)) i.indexOf(e) < 0 && s.call(t, e) && (n[e] = t[e]);
  return n;
};
var B = (t, i, n) =>
  new Promise((e, a) => {
    var l = (o) => {
        try {
          f(n.next(o));
        } catch (m) {
          a(m);
        }
      },
      C = (o) => {
        try {
          f(n.throw(o));
        } catch (m) {
          a(m);
        }
      },
      f = (o) => (o.done ? e(o.value) : Promise.resolve(o.value).then(l, C));
    f((n = n.apply(t, i)).next());
  });
import { jsx as b } from "react/jsx-runtime";
import { useState as j } from "react";
import { Button as w } from "antd";
const q = (i) => {
  var t = y(i, []);
  const [n, e] = j(!1);
  return /* @__PURE__ */ b(
    w,
    k(
      u(
        {
          loading: n,
          disabled: n,
        },
        t
      ),
      {
        onClick: (...a) =>
          B(void 0, null, function* () {
            const l = (t == null ? void 0 : t.onClick) && t.onClick(...a);
            if (l instanceof Promise)
              try {
                e(!0), yield l;
              } finally {
                e(!1);
              }
          }),
        children: t.children,
      }
    )
  );
};
export { q as Button };
