/*! For license information please see app.99c7b6b4.js.LICENSE.txt */
(self.webpackChunkkimai2 = self.webpackChunkkimai2 || []).push([[143], {
    8144: function(t, e, n) {
        n(1325),
        n(834),
        n.g.KimaiPaginatedBoxWidget = n(985).Z,
        n.g.KimaiReloadPageWidget = n(8227).Z,
        n.g.KimaiColor = n(7169).Z,
        n.g.KimaiStorage = n(6654).Z
    },
    834: function(t, e, n) {
        "use strict";
        n.r(e);
        class i extends Error {
        }
        class s extends i {
            constructor(t) {
                super(`Invalid DateTime: ${t.toMessage()}`)
            }
        }
        class o extends i {
            constructor(t) {
                super(`Invalid Interval: ${t.toMessage()}`)
            }
        }
        class r extends i {
            constructor(t) {
                super(`Invalid Duration: ${t.toMessage()}`)
            }
        }
        class a extends i {
        }
        class l extends i {
            constructor(t) {
                super(`Invalid unit ${t}`)
            }
        }
        class c extends i {
        }
        class u extends i {
            constructor() {
                super("Zone is an abstract class")
            }
        }
        const d = "numeric"
          , h = "short"
          , p = "long"
          , m = {
            year: d,
            month: d,
            day: d
        }
          , f = {
            year: d,
            month: h,
            day: d
        }
          , g = {
            year: d,
            month: h,
            day: d,
            weekday: h
        }
          , v = {
            year: d,
            month: p,
            day: d
        }
          , y = {
            year: d,
            month: p,
            day: d,
            weekday: p
        }
          , b = {
            hour: d,
            minute: d
        }
          , _ = {
            hour: d,
            minute: d,
            second: d
        }
          , w = {
            hour: d,
            minute: d,
            second: d,
            timeZoneName: h
        }
          , k = {
            hour: d,
            minute: d,
            second: d,
            timeZoneName: p
        }
          , x = {
            hour: d,
            minute: d,
            hourCycle: "h23"
        }
          , T = {
            hour: d,
            minute: d,
            second: d,
            hourCycle: "h23"
        }
          , E = {
            hour: d,
            minute: d,
            second: d,
            hourCycle: "h23",
            timeZoneName: h
        }
          , D = {
            hour: d,
            minute: d,
            second: d,
            hourCycle: "h23",
            timeZoneName: p
        }
          , S = {
            year: d,
            month: d,
            day: d,
            hour: d,
            minute: d
        }
          , O = {
            year: d,
            month: d,
            day: d,
            hour: d,
            minute: d,
            second: d
        }
          , C = {
            year: d,
            month: h,
            day: d,
            hour: d,
            minute: d
        }
          , L = {
            year: d,
            month: h,
            day: d,
            hour: d,
            minute: d,
            second: d
        }
          , M = {
            year: d,
            month: h,
            day: d,
            weekday: h,
            hour: d,
            minute: d
        }
          , I = {
            year: d,
            month: p,
            day: d,
            hour: d,
            minute: d,
            timeZoneName: h
        }
          , A = {
            year: d,
            month: p,
            day: d,
            hour: d,
            minute: d,
            second: d,
            timeZoneName: h
        }
          , N = {
            year: d,
            month: p,
            day: d,
            weekday: p,
            hour: d,
            minute: d,
            timeZoneName: p
        }
          , F = {
            year: d,
            month: p,
            day: d,
            weekday: p,
            hour: d,
            minute: d,
            second: d,
            timeZoneName: p
        };
        class P {
            get type() {
                throw new u
            }
            get name() {
                throw new u
            }
            get ianaName() {
                return this.name
            }
            get isUniversal() {
                throw new u
            }
            offsetName(t, e) {
                throw new u
            }
            formatOffset(t, e) {
                throw new u
            }
            offset(t) {
                throw new u
            }
            equals(t) {
                throw new u
            }
            get isValid() {
                throw new u
            }
        }
        let j = null;
        class q extends P {
            static get instance() {
                return null === j && (j = new q),
                j
            }
            get type() {
                return "system"
            }
            get name() {
                return (new Intl.DateTimeFormat).resolvedOptions().timeZone
            }
            get isUniversal() {
                return !1
            }
            offsetName(t, {format: e, locale: n}) {
                return Lt(t, e, n)
            }
            formatOffset(t, e) {
                return Nt(this.offset(t), e)
            }
            offset(t) {
                return -new Date(t).getTimezoneOffset()
            }
            equals(t) {
                return "system" === t.type
            }
            get isValid() {
                return !0
            }
        }
        let H = {};
        const V = {
            year: 0,
            month: 1,
            day: 2,
            era: 3,
            hour: 4,
            minute: 5,
            second: 6
        };
        let $ = {};
        class B extends P {
            static create(t) {
                return $[t] || ($[t] = new B(t)),
                $[t]
            }
            static resetCache() {
                $ = {},
                H = {}
            }
            static isValidSpecifier(t) {
                return this.isValidZone(t)
            }
            static isValidZone(t) {
                if (!t)
                    return !1;
                try {
                    return new Intl.DateTimeFormat("en-US",{
                        timeZone: t
                    }).format(),
                    !0
                } catch (t) {
                    return !1
                }
            }
            constructor(t) {
                super(),
                this.zoneName = t,
                this.valid = B.isValidZone(t)
            }
            get type() {
                return "iana"
            }
            get name() {
                return this.zoneName
            }
            get isUniversal() {
                return !1
            }
            offsetName(t, {format: e, locale: n}) {
                return Lt(t, e, n, this.name)
            }
            formatOffset(t, e) {
                return Nt(this.offset(t), e)
            }
            offset(t) {
                const e = new Date(t);
                if (isNaN(e))
                    return NaN;
                const n = (i = this.name,
                H[i] || (H[i] = new Intl.DateTimeFormat("en-US",{
                    hour12: !1,
                    timeZone: i,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    era: "short"
                })),
                H[i]);
                var i;
                let[s,o,r,a,l,c,u] = n.formatToParts ? function(t, e) {
                    const n = t.formatToParts(e)
                      , i = [];
                    for (let t = 0; t < n.length; t++) {
                        const {type: e, value: s} = n[t]
                          , o = V[e];
                        "era" === e ? i[o] = s : ht(o) || (i[o] = parseInt(s, 10))
                    }
                    return i
                }(n, e) : function(t, e) {
                    const n = t.format(e).replace(/\u200E/g, "")
                      , i = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n)
                      , [,s,o,r,a,l,c,u] = i;
                    return [r, s, o, a, l, c, u]
                }(n, e);
                "BC" === a && (s = 1 - Math.abs(s));
                let d = +e;
                const h = d % 1e3;
                return d -= h >= 0 ? h : 1e3 + h,
                (St({
                    year: s,
                    month: o,
                    day: r,
                    hour: 24 === l ? 0 : l,
                    minute: c,
                    second: u,
                    millisecond: 0
                }) - d) / 6e4
            }
            equals(t) {
                return "iana" === t.type && t.name === this.name
            }
            get isValid() {
                return this.valid
            }
        }
        let R = {};
        let z = {};
        function Y(t, e={}) {
            const n = JSON.stringify([t, e]);
            let i = z[n];
            return i || (i = new Intl.DateTimeFormat(t,e),
            z[n] = i),
            i
        }
        let U = {};
        let W = {};
        let Z = null;
        function J(t, e, n, i, s) {
            const o = t.listingMode(n);
            return "error" === o ? null : "en" === o ? i(e) : s(e)
        }
        class K {
            constructor(t, e, n) {
                this.padTo = n.padTo || 0,
                this.floor = n.floor || !1;
                const {padTo: i, floor: s, ...o} = n;
                if (!e || Object.keys(o).length > 0) {
                    const e = {
                        useGrouping: !1,
                        ...n
                    };
                    n.padTo > 0 && (e.minimumIntegerDigits = n.padTo),
                    this.inf = function(t, e={}) {
                        const n = JSON.stringify([t, e]);
                        let i = U[n];
                        return i || (i = new Intl.NumberFormat(t,e),
                        U[n] = i),
                        i
                    }(t, e)
                }
            }
            format(t) {
                if (this.inf) {
                    const e = this.floor ? Math.floor(t) : t;
                    return this.inf.format(e)
                }
                return bt(this.floor ? Math.floor(t) : xt(t, 3), this.padTo)
            }
        }
        class G {
            constructor(t, e, n) {
                let i;
                if (this.opts = n,
                this.originalZone = void 0,
                this.opts.timeZone)
                    this.dt = t;
                else if ("fixed" === t.zone.type) {
                    const e = t.offset / 60 * -1
                      , n = e >= 0 ? `Etc/GMT+${e}` : `Etc/GMT ${e}`;
                    0 !== t.offset && B.create(n).valid ? (i = n,
                    this.dt = t) : (i = "UTC",
                    this.dt = 0 === t.offset ? t : t.setZone("UTC").plus({
                        minutes: t.offset
                    }),
                    this.originalZone = t.zone)
                } else
                    "system" === t.zone.type ? this.dt = t : "iana" === t.zone.type ? (this.dt = t,
                    i = t.zone.name) : (i = "UTC",
                    this.dt = t.setZone("UTC").plus({
                        minutes: t.offset
                    }),
                    this.originalZone = t.zone);
                const s = {
                    ...this.opts
                };
                s.timeZone = s.timeZone || i,
                this.dtf = Y(e, s)
            }
            format() {
                return this.originalZone ? this.formatToParts().map((({value: t})=>t)).join("") : this.dtf.format(this.dt.toJSDate())
            }
            formatToParts() {
                const t = this.dtf.formatToParts(this.dt.toJSDate());
                return this.originalZone ? t.map((t=>{
                    if ("timeZoneName" === t.type) {
                        const e = this.originalZone.offsetName(this.dt.ts, {
                            locale: this.dt.locale,
                            format: this.opts.timeZoneName
                        });
                        return {
                            ...t,
                            value: e
                        }
                    }
                    return t
                }
                )) : t
            }
            resolvedOptions() {
                return this.dtf.resolvedOptions()
            }
        }
        class Q {
            constructor(t, e, n) {
                this.opts = {
                    style: "long",
                    ...n
                },
                !e && ft() && (this.rtf = function(t, e={}) {
                    const {base: n, ...i} = e
                      , s = JSON.stringify([t, i]);
                    let o = W[s];
                    return o || (o = new Intl.RelativeTimeFormat(t,e),
                    W[s] = o),
                    o
                }(t, n))
            }
            format(t, e) {
                return this.rtf ? this.rtf.format(t, e) : function(t, e, n="always", i=!1) {
                    const s = {
                        years: ["year", "yr."],
                        quarters: ["quarter", "qtr."],
                        months: ["month", "mo."],
                        weeks: ["week", "wk."],
                        days: ["day", "day", "days"],
                        hours: ["hour", "hr."],
                        minutes: ["minute", "min."],
                        seconds: ["second", "sec."]
                    }
                      , o = -1 === ["hours", "minutes", "seconds"].indexOf(t);
                    if ("auto" === n && o) {
                        const n = "days" === t;
                        switch (e) {
                        case 1:
                            return n ? "tomorrow" : `next ${s[t][0]}`;
                        case -1:
                            return n ? "yesterday" : `last ${s[t][0]}`;
                        case 0:
                            return n ? "today" : `this ${s[t][0]}`
                        }
                    }
                    const r = Object.is(e, -0) || e < 0
                      , a = Math.abs(e)
                      , l = 1 === a
                      , c = s[t]
                      , u = i ? l ? c[1] : c[2] || c[1] : l ? s[t][0] : t;
                    return r ? `${a} ${u} ago` : `in ${a} ${u}`
                }(e, t, this.opts.numeric, "long" !== this.opts.style)
            }
            formatToParts(t, e) {
                return this.rtf ? this.rtf.formatToParts(t, e) : []
            }
        }
        class X {
            static fromOpts(t) {
                return X.create(t.locale, t.numberingSystem, t.outputCalendar, t.defaultToEN)
            }
            static create(t, e, n, i=!1) {
                const s = t || dt.defaultLocale
                  , o = s || (i ? "en-US" : Z || (Z = (new Intl.DateTimeFormat).resolvedOptions().locale,
                Z))
                  , r = e || dt.defaultNumberingSystem
                  , a = n || dt.defaultOutputCalendar;
                return new X(o,r,a,s)
            }
            static resetCache() {
                Z = null,
                z = {},
                U = {},
                W = {}
            }
            static fromObject({locale: t, numberingSystem: e, outputCalendar: n}={}) {
                return X.create(t, e, n)
            }
            constructor(t, e, n, i) {
                const [s,o,r] = function(t) {
                    const e = t.indexOf("-x-");
                    -1 !== e && (t = t.substring(0, e));
                    const n = t.indexOf("-u-");
                    if (-1 === n)
                        return [t];
                    {
                        let e, i;
                        try {
                            e = Y(t).resolvedOptions(),
                            i = t
                        } catch (s) {
                            const o = t.substring(0, n);
                            e = Y(o).resolvedOptions(),
                            i = o
                        }
                        const {numberingSystem: s, calendar: o} = e;
                        return [i, s, o]
                    }
                }(t);
                this.locale = s,
                this.numberingSystem = e || o || null,
                this.outputCalendar = n || r || null,
                this.intl = function(t, e, n) {
                    return n || e ? (t.includes("-u-") || (t += "-u"),
                    n && (t += `-ca-${n}`),
                    e && (t += `-nu-${e}`),
                    t) : t
                }(this.locale, this.numberingSystem, this.outputCalendar),
                this.weekdaysCache = {
                    format: {},
                    standalone: {}
                },
                this.monthsCache = {
                    format: {},
                    standalone: {}
                },
                this.meridiemCache = null,
                this.eraCache = {},
                this.specifiedLocale = i,
                this.fastNumbersCached = null
            }
            get fastNumbers() {
                var t;
                return null == this.fastNumbersCached && (this.fastNumbersCached = (!(t = this).numberingSystem || "latn" === t.numberingSystem) && ("latn" === t.numberingSystem || !t.locale || t.locale.startsWith("en") || "latn" === new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem)),
                this.fastNumbersCached
            }
            listingMode() {
                const t = this.isEnglish()
                  , e = !(null !== this.numberingSystem && "latn" !== this.numberingSystem || null !== this.outputCalendar && "gregory" !== this.outputCalendar);
                return t && e ? "en" : "intl"
            }
            clone(t) {
                return t && 0 !== Object.getOwnPropertyNames(t).length ? X.create(t.locale || this.specifiedLocale, t.numberingSystem || this.numberingSystem, t.outputCalendar || this.outputCalendar, t.defaultToEN || !1) : this
            }
            redefaultToEN(t={}) {
                return this.clone({
                    ...t,
                    defaultToEN: !0
                })
            }
            redefaultToSystem(t={}) {
                return this.clone({
                    ...t,
                    defaultToEN: !1
                })
            }
            months(t, e=!1, n=!0) {
                return J(this, t, n, Ht, (()=>{
                    const n = e ? {
                        month: t,
                        day: "numeric"
                    } : {
                        month: t
                    }
                      , i = e ? "format" : "standalone";
                    return this.monthsCache[i][t] || (this.monthsCache[i][t] = function(t) {
                        const e = [];
                        for (let n = 1; n <= 12; n++) {
                            const i = ti.utc(2016, n, 1);
                            e.push(t(i))
                        }
                        return e
                    }((t=>this.extract(t, n, "month")))),
                    this.monthsCache[i][t]
                }
                ))
            }
            weekdays(t, e=!1, n=!0) {
                return J(this, t, n, Rt, (()=>{
                    const n = e ? {
                        weekday: t,
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    } : {
                        weekday: t
                    }
                      , i = e ? "format" : "standalone";
                    return this.weekdaysCache[i][t] || (this.weekdaysCache[i][t] = function(t) {
                        const e = [];
                        for (let n = 1; n <= 7; n++) {
                            const i = ti.utc(2016, 11, 13 + n);
                            e.push(t(i))
                        }
                        return e
                    }((t=>this.extract(t, n, "weekday")))),
                    this.weekdaysCache[i][t]
                }
                ))
            }
            meridiems(t=!0) {
                return J(this, void 0, t, (()=>zt), (()=>{
                    if (!this.meridiemCache) {
                        const t = {
                            hour: "numeric",
                            hourCycle: "h12"
                        };
                        this.meridiemCache = [ti.utc(2016, 11, 13, 9), ti.utc(2016, 11, 13, 19)].map((e=>this.extract(e, t, "dayperiod")))
                    }
                    return this.meridiemCache
                }
                ))
            }
            eras(t, e=!0) {
                return J(this, t, e, Zt, (()=>{
                    const e = {
                        era: t
                    };
                    return this.eraCache[t] || (this.eraCache[t] = [ti.utc(-40, 1, 1), ti.utc(2017, 1, 1)].map((t=>this.extract(t, e, "era")))),
                    this.eraCache[t]
                }
                ))
            }
            extract(t, e, n) {
                const i = this.dtFormatter(t, e).formatToParts().find((t=>t.type.toLowerCase() === n));
                return i ? i.value : null
            }
            numberFormatter(t={}) {
                return new K(this.intl,t.forceSimple || this.fastNumbers,t)
            }
            dtFormatter(t, e={}) {
                return new G(t,this.intl,e)
            }
            relFormatter(t={}) {
                return new Q(this.intl,this.isEnglish(),t)
            }
            listFormatter(t={}) {
                return function(t, e={}) {
                    const n = JSON.stringify([t, e]);
                    let i = R[n];
                    return i || (i = new Intl.ListFormat(t,e),
                    R[n] = i),
                    i
                }(this.intl, t)
            }
            isEnglish() {
                return "en" === this.locale || "en-us" === this.locale.toLowerCase() || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us")
            }
            equals(t) {
                return this.locale === t.locale && this.numberingSystem === t.numberingSystem && this.outputCalendar === t.outputCalendar
            }
        }
        let tt = null;
        class et extends P {
            static get utcInstance() {
                return null === tt && (tt = new et(0)),
                tt
            }
            static instance(t) {
                return 0 === t ? et.utcInstance : new et(t)
            }
            static parseSpecifier(t) {
                if (t) {
                    const e = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
                    if (e)
                        return new et(Mt(e[1], e[2]))
                }
                return null
            }
            constructor(t) {
                super(),
                this.fixed = t
            }
            get type() {
                return "fixed"
            }
            get name() {
                return 0 === this.fixed ? "UTC" : `UTC ${Nt(this.fixed, "narrow")}`
            }
            get ianaName() {
                return 0 === this.fixed ? "Etc/UTC" : `Etc/GMT ${Nt(-this.fixed, "narrow")}`
            }
            offsetName() {
                return this.name
            }
            formatOffset(t, e) {
                return Nt(this.fixed, e)
            }
            get isUniversal() {
                return !0
            }
            offset() {
                return this.fixed
            }
            equals(t) {
                return "fixed" === t.type && t.fixed === this.fixed
            }
            get isValid() {
                return !0
            }
        }
        class nt extends P {
            constructor(t) {
                super(),
                this.zoneName = t
            }
            get type() {
                return "invalid"
            }
            get name() {
                return this.zoneName
            }
            get isUniversal() {
                return !1
            }
            offsetName() {
                return null
            }
            formatOffset() {
                return ""
            }
            offset() {
                return NaN
            }
            equals() {
                return !1
            }
            get isValid() {
                return !1
            }
        }
        function it(t, e) {
            if (ht(t) || null === t)
                return e;
            if (t instanceof P)
                return t;
            if ("string" == typeof t) {
                const n = t.toLowerCase();
                return "default" === n ? e : "local" === n || "system" === n ? q.instance : "utc" === n || "gmt" === n ? et.utcInstance : et.parseSpecifier(n) || B.create(t)
            }
            return pt(t) ? et.instance(t) : "object" == typeof t && t.offset && "number" == typeof t.offset ? t : new nt(t)
        }
        let st, ot = ()=>Date.now(), rt = "system", at = null, lt = null, ct = null, ut = 60;
        class dt {
            static get now() {
                return ot
            }
            static set now(t) {
                ot = t
            }
            static set defaultZone(t) {
                rt = t
            }
            static get defaultZone() {
                return it(rt, q.instance)
            }
            static get defaultLocale() {
                return at
            }
            static set defaultLocale(t) {
                at = t
            }
            static get defaultNumberingSystem() {
                return lt
            }
            static set defaultNumberingSystem(t) {
                lt = t
            }
            static get defaultOutputCalendar() {
                return ct
            }
            static set defaultOutputCalendar(t) {
                ct = t
            }
            static get twoDigitCutoffYear() {
                return ut
            }
            static set twoDigitCutoffYear(t) {
                ut = t % 100
            }
            static get throwOnInvalid() {
                return st
            }
            static set throwOnInvalid(t) {
                st = t
            }
            static resetCaches() {
                X.resetCache(),
                B.resetCache()
            }
        }
        function ht(t) {
            return void 0 === t
        }
        function pt(t) {
            return "number" == typeof t
        }
        function mt(t) {
            return "number" == typeof t && t % 1 == 0
        }
        function ft() {
            try {
                return "undefined" != typeof Intl && !!Intl.RelativeTimeFormat
            } catch (t) {
                return !1
            }
        }
        function gt(t, e, n) {
            if (0 !== t.length)
                return t.reduce(((t,i)=>{
                    const s = [e(i), i];
                    return t && n(t[0], s[0]) === t[0] ? t : s
                }
                ), null)[1]
        }
        function vt(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        function yt(t, e, n) {
            return mt(t) && t >= e && t <= n
        }
        function bt(t, e=2) {
            let n;
            return n = t < 0 ? "-" + ("" + -t).padStart(e, "0") : ("" + t).padStart(e, "0"),
            n
        }
        function _t(t) {
            return ht(t) || null === t || "" === t ? void 0 : parseInt(t, 10)
        }
        function wt(t) {
            return ht(t) || null === t || "" === t ? void 0 : parseFloat(t)
        }
        function kt(t) {
            if (!ht(t) && null !== t && "" !== t) {
                const e = 1e3 * parseFloat("0." + t);
                return Math.floor(e)
            }
        }
        function xt(t, e, n=!1) {
            const i = 10 ** e;
            return (n ? Math.trunc : Math.round)(t * i) / i
        }
        function Tt(t) {
            return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0)
        }
        function Et(t) {
            return Tt(t) ? 366 : 365
        }
        function Dt(t, e) {
            const n = function(t, e) {
                return t - e * Math.floor(t / e)
            }(e - 1, 12) + 1;
            return 2 === n ? Tt(t + (e - n) / 12) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1]
        }
        function St(t) {
            let e = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second, t.millisecond);
            return t.year < 100 && t.year >= 0 && (e = new Date(e),
            e.setUTCFullYear(t.year, t.month - 1, t.day)),
            +e
        }
        function Ot(t) {
            const e = (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7
              , n = t - 1
              , i = (n + Math.floor(n / 4) - Math.floor(n / 100) + Math.floor(n / 400)) % 7;
            return 4 === e || 3 === i ? 53 : 52
        }
        function Ct(t) {
            return t > 99 ? t : t > dt.twoDigitCutoffYear ? 1900 + t : 2e3 + t
        }
        function Lt(t, e, n, i=null) {
            const s = new Date(t)
              , o = {
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            };
            i && (o.timeZone = i);
            const r = {
                timeZoneName: e,
                ...o
            }
              , a = new Intl.DateTimeFormat(n,r).formatToParts(s).find((t=>"timezonename" === t.type.toLowerCase()));
            return a ? a.value : null
        }
        function Mt(t, e) {
            let n = parseInt(t, 10);
            Number.isNaN(n) && (n = 0);
            const i = parseInt(e, 10) || 0;
            return 60 * n + (n < 0 || Object.is(n, -0) ? -i : i)
        }
        function It(t) {
            const e = Number(t);
            if ("boolean" == typeof t || "" === t || Number.isNaN(e))
                throw new c(`Invalid unit value ${t}`);
            return e
        }
        function At(t, e) {
            const n = {};
            for (const i in t)
                if (vt(t, i)) {
                    const s = t[i];
                    if (null == s)
                        continue;
                    n[e(i)] = It(s)
                }
            return n
        }
        function Nt(t, e) {
            const n = Math.trunc(Math.abs(t / 60))
              , i = Math.trunc(Math.abs(t % 60))
              , s = t >= 0 ? "+" : "-";
            switch (e) {
            case "short":
                return `${s}${bt(n, 2)}:${bt(i, 2)}`;
            case "narrow":
                return `${s}${n}${i > 0 ? `:${i}` : ""}`;
            case "techie":
                return `${s}${bt(n, 2)}${bt(i, 2)}`;
            default:
                throw new RangeError(`Value format ${e} is out of range for property format`)
            }
        }
        function Ft(t) {
            return function(t, e) {
                return e.reduce(((e,n)=>(e[n] = t[n],
                e)), {})
            }(t, ["hour", "minute", "second", "millisecond"])
        }
        const Pt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          , jt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          , qt = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        function Ht(t) {
            switch (t) {
            case "narrow":
                return [...qt];
            case "short":
                return [...jt];
            case "long":
                return [...Pt];
            case "numeric":
                return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            case "2-digit":
                return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
            default:
                return null
            }
        }
        const Vt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
          , $t = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          , Bt = ["M", "T", "W", "T", "F", "S", "S"];
        function Rt(t) {
            switch (t) {
            case "narrow":
                return [...Bt];
            case "short":
                return [...$t];
            case "long":
                return [...Vt];
            case "numeric":
                return ["1", "2", "3", "4", "5", "6", "7"];
            default:
                return null
            }
        }
        const zt = ["AM", "PM"]
          , Yt = ["Before Christ", "Anno Domini"]
          , Ut = ["BC", "AD"]
          , Wt = ["B", "A"];
        function Zt(t) {
            switch (t) {
            case "narrow":
                return [...Wt];
            case "short":
                return [...Ut];
            case "long":
                return [...Yt];
            default:
                return null
            }
        }
        function Jt(t, e) {
            let n = "";
            for (const i of t)
                i.literal ? n += i.val : n += e(i.val);
            return n
        }
        const Kt = {
            D: m,
            DD: f,
            DDD: v,
            DDDD: y,
            t: b,
            tt: _,
            ttt: w,
            tttt: k,
            T: x,
            TT: T,
            TTT: E,
            TTTT: D,
            f: S,
            ff: C,
            fff: I,
            ffff: N,
            F: O,
            FF: L,
            FFF: A,
            FFFF: F
        };
        class Gt {
            static create(t, e={}) {
                return new Gt(t,e)
            }
            static parseFormat(t) {
                let e = null
                  , n = ""
                  , i = !1;
                const s = [];
                for (let o = 0; o < t.length; o++) {
                    const r = t.charAt(o);
                    "'" === r ? (n.length > 0 && s.push({
                        literal: i || /^\s+$/.test(n),
                        val: n
                    }),
                    e = null,
                    n = "",
                    i = !i) : i || r === e ? n += r : (n.length > 0 && s.push({
                        literal: /^\s+$/.test(n),
                        val: n
                    }),
                    n = r,
                    e = r)
                }
                return n.length > 0 && s.push({
                    literal: i || /^\s+$/.test(n),
                    val: n
                }),
                s
            }
            static macroTokenToFormatOpts(t) {
                return Kt[t]
            }
            constructor(t, e) {
                this.opts = e,
                this.loc = t,
                this.systemLoc = null
            }
            formatWithSystemDefault(t, e) {
                null === this.systemLoc && (this.systemLoc = this.loc.redefaultToSystem());
                return this.systemLoc.dtFormatter(t, {
                    ...this.opts,
                    ...e
                }).format()
            }
            formatDateTime(t, e={}) {
                return this.loc.dtFormatter(t, {
                    ...this.opts,
                    ...e
                }).format()
            }
            formatDateTimeParts(t, e={}) {
                return this.loc.dtFormatter(t, {
                    ...this.opts,
                    ...e
                }).formatToParts()
            }
            formatInterval(t, e={}) {
                return this.loc.dtFormatter(t.start, {
                    ...this.opts,
                    ...e
                }).dtf.formatRange(t.start.toJSDate(), t.end.toJSDate())
            }
            resolvedOptions(t, e={}) {
                return this.loc.dtFormatter(t, {
                    ...this.opts,
                    ...e
                }).resolvedOptions()
            }
            num(t, e=0) {
                if (this.opts.forceSimple)
                    return bt(t, e);
                const n = {
                    ...this.opts
                };
                return e > 0 && (n.padTo = e),
                this.loc.numberFormatter(n).format(t)
            }
            formatDateTimeFromString(t, e) {
                const n = "en" === this.loc.listingMode()
                  , i = this.loc.outputCalendar && "gregory" !== this.loc.outputCalendar
                  , s = (e,n)=>this.loc.extract(t, e, n)
                  , o = e=>t.isOffsetFixed && 0 === t.offset && e.allowZ ? "Z" : t.isValid ? t.zone.formatOffset(t.ts, e.format) : ""
                  , r = ()=>n ? function(t) {
                    return zt[t.hour < 12 ? 0 : 1]
                }(t) : s({
                    hour: "numeric",
                    hourCycle: "h12"
                }, "dayperiod")
                  , a = (e,i)=>n ? function(t, e) {
                    return Ht(e)[t.month - 1]
                }(t, e) : s(i ? {
                    month: e
                } : {
                    month: e,
                    day: "numeric"
                }, "month")
                  , l = (e,i)=>n ? function(t, e) {
                    return Rt(e)[t.weekday - 1]
                }(t, e) : s(i ? {
                    weekday: e
                } : {
                    weekday: e,
                    month: "long",
                    day: "numeric"
                }, "weekday")
                  , c = e=>{
                    const n = Gt.macroTokenToFormatOpts(e);
                    return n ? this.formatWithSystemDefault(t, n) : e
                }
                  , u = e=>n ? function(t, e) {
                    return Zt(e)[t.year < 0 ? 0 : 1]
                }(t, e) : s({
                    era: e
                }, "era");
                return Jt(Gt.parseFormat(e), (e=>{
                    switch (e) {
                    case "S":
                        return this.num(t.millisecond);
                    case "u":
                    case "SSS":
                        return this.num(t.millisecond, 3);
                    case "s":
                        return this.num(t.second);
                    case "ss":
                        return this.num(t.second, 2);
                    case "uu":
                        return this.num(Math.floor(t.millisecond / 10), 2);
                    case "uuu":
                        return this.num(Math.floor(t.millisecond / 100));
                    case "m":
                        return this.num(t.minute);
                    case "mm":
                        return this.num(t.minute, 2);
                    case "h":
                        return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12);
                    case "hh":
                        return this.num(t.hour % 12 == 0 ? 12 : t.hour % 12, 2);
                    case "H":
                        return this.num(t.hour);
                    case "HH":
                        return this.num(t.hour, 2);
                    case "Z":
                        return o({
                            format: "narrow",
                            allowZ: this.opts.allowZ
                        });
                    case "ZZ":
                        return o({
                            format: "short",
                            allowZ: this.opts.allowZ
                        });
                    case "ZZZ":
                        return o({
                            format: "techie",
                            allowZ: this.opts.allowZ
                        });
                    case "ZZZZ":
                        return t.zone.offsetName(t.ts, {
                            format: "short",
                            locale: this.loc.locale
                        });
                    case "ZZZZZ":
                        return t.zone.offsetName(t.ts, {
                            format: "long",
                            locale: this.loc.locale
                        });
                    case "z":
                        return t.zoneName;
                    case "a":
                        return r();
                    case "d":
                        return i ? s({
                            day: "numeric"
                        }, "day") : this.num(t.day);
                    case "dd":
                        return i ? s({
                            day: "2-digit"
                        }, "day") : this.num(t.day, 2);
                    case "c":
                    case "E":
                        return this.num(t.weekday);
                    case "ccc":
                        return l("short", !0);
                    case "cccc":
                        return l("long", !0);
                    case "ccccc":
                        return l("narrow", !0);
                    case "EEE":
                        return l("short", !1);
                    case "EEEE":
                        return l("long", !1);
                    case "EEEEE":
                        return l("narrow", !1);
                    case "L":
                        return i ? s({
                            month: "numeric",
                            day: "numeric"
                        }, "month") : this.num(t.month);
                    case "LL":
                        return i ? s({
                            month: "2-digit",
                            day: "numeric"
                        }, "month") : this.num(t.month, 2);
                    case "LLL":
                        return a("short", !0);
                    case "LLLL":
                        return a("long", !0);
                    case "LLLLL":
                        return a("narrow", !0);
                    case "M":
                        return i ? s({
                            month: "numeric"
                        }, "month") : this.num(t.month);
                    case "MM":
                        return i ? s({
                            month: "2-digit"
                        }, "month") : this.num(t.month, 2);
                    case "MMM":
                        return a("short", !1);
                    case "MMMM":
                        return a("long", !1);
                    case "MMMMM":
                        return a("narrow", !1);
                    case "y":
                        return i ? s({
                            year: "numeric"
                        }, "year") : this.num(t.year);
                    case "yy":
                        return i ? s({
                            year: "2-digit"
                        }, "year") : this.num(t.year.toString().slice(-2), 2);
                    case "yyyy":
                        return i ? s({
                            year: "numeric"
                        }, "year") : this.num(t.year, 4);
                    case "yyyyyy":
                        return i ? s({
                            year: "numeric"
                        }, "year") : this.num(t.year, 6);
                    case "G":
                        return u("short");
                    case "GG":
                        return u("long");
                    case "GGGGG":
                        return u("narrow");
                    case "kk":
                        return this.num(t.weekYear.toString().slice(-2), 2);
                    case "kkkk":
                        return this.num(t.weekYear, 4);
                    case "W":
                        return this.num(t.weekNumber);
                    case "WW":
                        return this.num(t.weekNumber, 2);
                    case "o":
                        return this.num(t.ordinal);
                    case "ooo":
                        return this.num(t.ordinal, 3);
                    case "q":
                        return this.num(t.quarter);
                    case "qq":
                        return this.num(t.quarter, 2);
                    case "X":
                        return this.num(Math.floor(t.ts / 1e3));
                    case "x":
                        return this.num(t.ts);
                    default:
                        return c(e)
                    }
                }
                ))
            }
            formatDurationFromString(t, e) {
                const n = t=>{
                    switch (t[0]) {
                    case "S":
                        return "millisecond";
                    case "s":
                        return "second";
                    case "m":
                        return "minute";
                    case "h":
                        return "hour";
                    case "d":
                        return "day";
                    case "w":
                        return "week";
                    case "M":
                        return "month";
                    case "y":
                        return "year";
                    default:
                        return null
                    }
                }
                  , i = Gt.parseFormat(e)
                  , s = i.reduce(((t,{literal: e, val: n})=>e ? t : t.concat(n)), []);
                return Jt(i, (t=>e=>{
                    const i = n(e);
                    return i ? this.num(t.get(i), e.length) : e
                }
                )(t.shiftTo(...s.map(n).filter((t=>t)))))
            }
        }
        class Qt {
            constructor(t, e) {
                this.reason = t,
                this.explanation = e
            }
            toMessage() {
                return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason
            }
        }
        const Xt = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
        function te(...t) {
            const e = t.reduce(((t,e)=>t + e.source), "");
            return RegExp(`^${e}$`)
        }
        function ee(...t) {
            return e=>t.reduce((([t,n,i],s)=>{
                const [o,r,a] = s(e, i);
                return [{
                    ...t,
                    ...o
                }, r || n, a]
            }
            ), [{}, null, 1]).slice(0, 2)
        }
        function ne(t, ...e) {
            if (null == t)
                return [null, null];
            for (const [n,i] of e) {
                const e = n.exec(t);
                if (e)
                    return i(e)
            }
            return [null, null]
        }
        function ie(...t) {
            return (e,n)=>{
                const i = {};
                let s;
                for (s = 0; s < t.length; s++)
                    i[t[s]] = _t(e[n + s]);
                return [i, null, n + s]
            }
        }
        const se = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/
          , oe = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/
          , re = RegExp(`${oe.source}${`(?:${se.source}?(?:\\[(${Xt.source})\\])?)?`}`)
          , ae = RegExp(`(?:T ${re.source})?`)
          , le = ie("weekYear", "weekNumber", "weekDay")
          , ce = ie("year", "ordinal")
          , ue = RegExp(`${oe.source} ?(?:${se.source}|(${Xt.source}))?`)
          , de = RegExp(`(?: ${ue.source})?`);
        function he(t, e, n) {
            const i = t[e];
            return ht(i) ? n : _t(i)
        }
        function pe(t, e) {
            return [{
                hours: he(t, e, 0),
                minutes: he(t, e + 1, 0),
                seconds: he(t, e + 2, 0),
                milliseconds: kt(t[e + 3])
            }, null, e + 4]
        }
        function me(t, e) {
            const n = !t[e] && !t[e + 1]
              , i = Mt(t[e + 1], t[e + 2]);
            return [{}, n ? null : et.instance(i), e + 3]
        }
        function fe(t, e) {
            return [{}, t[e] ? B.create(t[e]) : null, e + 1]
        }
        const ge = RegExp(`^T?${oe.source}$`)
          , ve = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
        function ye(t) {
            const [e,n,i,s,o,r,a,l,c] = t
              , u = "-" === e[0]
              , d = l && "-" === l[0]
              , h = (t,e=!1)=>void 0 !== t && (e || t && u) ? -t : t;
            return [{
                years: h(wt(n)),
                months: h(wt(i)),
                weeks: h(wt(s)),
                days: h(wt(o)),
                hours: h(wt(r)),
                minutes: h(wt(a)),
                seconds: h(wt(l), "-0" === l),
                milliseconds: h(kt(c), d)
            }]
        }
        const be = {
            GMT: 0,
            EDT: -240,
            EST: -300,
            CDT: -300,
            CST: -360,
            MDT: -360,
            MST: -420,
            PDT: -420,
            PST: -480
        };
        function _e(t, e, n, i, s, o, r) {
            const a = {
                year: 2 === e.length ? Ct(_t(e)) : _t(e),
                month: jt.indexOf(n) + 1,
                day: _t(i),
                hour: _t(s),
                minute: _t(o)
            };
            return r && (a.second = _t(r)),
            t && (a.weekday = t.length > 3 ? Vt.indexOf(t) + 1 : $t.indexOf(t) + 1),
            a
        }
        const we = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
        function ke(t) {
            const [,e,n,i,s,o,r,a,l,c,u,d] = t
              , h = _e(e, s, i, n, o, r, a);
            let p;
            return p = l ? be[l] : c ? 0 : Mt(u, d),
            [h, new et(p)]
        }
        const xe = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/
          , Te = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/
          , Ee = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
        function De(t) {
            const [,e,n,i,s,o,r,a] = t;
            return [_e(e, s, i, n, o, r, a), et.utcInstance]
        }
        function Se(t) {
            const [,e,n,i,s,o,r,a] = t;
            return [_e(e, a, n, i, s, o, r), et.utcInstance]
        }
        const Oe = te(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, ae)
          , Ce = te(/(\d{4})-?W(\d\d)(?:-?(\d))?/, ae)
          , Le = te(/(\d{4})-?(\d{3})/, ae)
          , Me = te(re)
          , Ie = ee((function(t, e) {
            return [{
                year: he(t, e),
                month: he(t, e + 1, 1),
                day: he(t, e + 2, 1)
            }, null, e + 3]
        }
        ), pe, me, fe)
          , Ae = ee(le, pe, me, fe)
          , Ne = ee(ce, pe, me, fe)
          , Fe = ee(pe, me, fe);
        const Pe = ee(pe);
        const je = te(/(\d{4})-(\d\d)-(\d\d)/, de)
          , qe = te(ue)
          , He = ee(pe, me, fe);
        const Ve = {
            weeks: {
                days: 7,
                hours: 168,
                minutes: 10080,
                seconds: 604800,
                milliseconds: 6048e5
            },
            days: {
                hours: 24,
                minutes: 1440,
                seconds: 86400,
                milliseconds: 864e5
            },
            hours: {
                minutes: 60,
                seconds: 3600,
                milliseconds: 36e5
            },
            minutes: {
                seconds: 60,
                milliseconds: 6e4
            },
            seconds: {
                milliseconds: 1e3
            }
        }
          , $e = {
            years: {
                quarters: 4,
                months: 12,
                weeks: 52,
                days: 365,
                hours: 8760,
                minutes: 525600,
                seconds: 31536e3,
                milliseconds: 31536e6
            },
            quarters: {
                months: 3,
                weeks: 13,
                days: 91,
                hours: 2184,
                minutes: 131040,
                seconds: 7862400,
                milliseconds: 78624e5
            },
            months: {
                weeks: 4,
                days: 30,
                hours: 720,
                minutes: 43200,
                seconds: 2592e3,
                milliseconds: 2592e6
            },
            ...Ve
        }
          , Be = 365.2425
          , Re = 30.436875
          , ze = {
            years: {
                quarters: 4,
                months: 12,
                weeks: 52.1775,
                days: Be,
                hours: 8765.82,
                minutes: 525949.2,
                seconds: 525949.2 * 60,
                milliseconds: 525949.2 * 60 * 1e3
            },
            quarters: {
                months: 3,
                weeks: 13.044375,
                days: 91.310625,
                hours: 2191.455,
                minutes: 131487.3,
                seconds: 525949.2 * 60 / 4,
                milliseconds: 7889237999.999999
            },
            months: {
                weeks: 4.3481250000000005,
                days: Re,
                hours: 730.485,
                minutes: 43829.1,
                seconds: 2629746,
                milliseconds: 2629746e3
            },
            ...Ve
        }
          , Ye = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"]
          , Ue = Ye.slice(0).reverse();
        function We(t, e, n=!1) {
            const i = {
                values: n ? e.values : {
                    ...t.values,
                    ...e.values || {}
                },
                loc: t.loc.clone(e.loc),
                conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
                matrix: e.matrix || t.matrix
            };
            return new Je(i)
        }
        function Ze(t, e, n, i, s) {
            const o = t[s][n]
              , r = e[n] / o
              , a = !(Math.sign(r) === Math.sign(i[s])) && 0 !== i[s] && Math.abs(r) <= 1 ? function(t) {
                return t < 0 ? Math.floor(t) : Math.ceil(t)
            }(r) : Math.trunc(r);
            i[s] += a,
            e[n] -= a * o
        }
        class Je {
            constructor(t) {
                const e = "longterm" === t.conversionAccuracy || !1;
                let n = e ? ze : $e;
                t.matrix && (n = t.matrix),
                this.values = t.values,
                this.loc = t.loc || X.create(),
                this.conversionAccuracy = e ? "longterm" : "casual",
                this.invalid = t.invalid || null,
                this.matrix = n,
                this.isLuxonDuration = !0
            }
            static fromMillis(t, e) {
                return Je.fromObject({
                    milliseconds: t
                }, e)
            }
            static fromObject(t, e={}) {
                if (null == t || "object" != typeof t)
                    throw new c("Duration.fromObject: argument expected to be an object, got " + (null === t ? "null" : typeof t));
                return new Je({
                    values: At(t, Je.normalizeUnit),
                    loc: X.fromObject(e),
                    conversionAccuracy: e.conversionAccuracy,
                    matrix: e.matrix
                })
            }
            static fromDurationLike(t) {
                if (pt(t))
                    return Je.fromMillis(t);
                if (Je.isDuration(t))
                    return t;
                if ("object" == typeof t)
                    return Je.fromObject(t);
                throw new c(`Unknown duration argument ${t} of type ${typeof t}`)
            }
            static fromISO(t, e) {
                const [n] = function(t) {
                    return ne(t, [ve, ye])
                }(t);
                return n ? Je.fromObject(n, e) : Je.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`)
            }
            static fromISOTime(t, e) {
                const [n] = function(t) {
                    return ne(t, [ge, Pe])
                }(t);
                return n ? Je.fromObject(n, e) : Je.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`)
            }
            static invalid(t, e=null) {
                if (!t)
                    throw new c("need to specify a reason the Duration is invalid");
                const n = t instanceof Qt ? t : new Qt(t,e);
                if (dt.throwOnInvalid)
                    throw new r(n);
                return new Je({
                    invalid: n
                })
            }
            static normalizeUnit(t) {
                const e = {
                    year: "years",
                    years: "years",
                    quarter: "quarters",
                    quarters: "quarters",
                    month: "months",
                    months: "months",
                    week: "weeks",
                    weeks: "weeks",
                    day: "days",
                    days: "days",
                    hour: "hours",
                    hours: "hours",
                    minute: "minutes",
                    minutes: "minutes",
                    second: "seconds",
                    seconds: "seconds",
                    millisecond: "milliseconds",
                    milliseconds: "milliseconds"
                }[t ? t.toLowerCase() : t];
                if (!e)
                    throw new l(t);
                return e
            }
            static isDuration(t) {
                return t && t.isLuxonDuration || !1
            }
            get locale() {
                return this.isValid ? this.loc.locale : null
            }
            get numberingSystem() {
                return this.isValid ? this.loc.numberingSystem : null
            }
            toFormat(t, e={}) {
                const n = {
                    ...e,
                    floor: !1 !== e.round && !1 !== e.floor
                };
                return this.isValid ? Gt.create(this.loc, n).formatDurationFromString(this, t) : "Invalid Duration"
            }
            toHuman(t={}) {
                const e = Ye.map((e=>{
                    const n = this.values[e];
                    return ht(n) ? null : this.loc.numberFormatter({
                        style: "unit",
                        unitDisplay: "long",
                        ...t,
                        unit: e.slice(0, -1)
                    }).format(n)
                }
                )).filter((t=>t));
                return this.loc.listFormatter({
                    type: "conjunction",
                    style: t.listStyle || "narrow",
                    ...t
                }).format(e)
            }
            toObject() {
                return this.isValid ? {
                    ...this.values
                } : {}
            }
            toISO() {
                if (!this.isValid)
                    return null;
                let t = "P";
                return 0 !== this.years && (t += this.years + "Y"),
                0 === this.months && 0 === this.quarters || (t += this.months + 3 * this.quarters + "M"),
                0 !== this.weeks && (t += this.weeks + "W"),
                0 !== this.days && (t += this.days + "D"),
                0 === this.hours && 0 === this.minutes && 0 === this.seconds && 0 === this.milliseconds || (t += "T"),
                0 !== this.hours && (t += this.hours + "H"),
                0 !== this.minutes && (t += this.minutes + "M"),
                0 === this.seconds && 0 === this.milliseconds || (t += xt(this.seconds + this.milliseconds / 1e3, 3) + "S"),
                "P" === t && (t += "T0S"),
                t
            }
            toISOTime(t={}) {
                if (!this.isValid)
                    return null;
                const e = this.toMillis();
                if (e < 0 || e >= 864e5)
                    return null;
                t = {
                    suppressMilliseconds: !1,
                    suppressSeconds: !1,
                    includePrefix: !1,
                    format: "extended",
                    ...t
                };
                const n = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
                let i = "basic" === t.format ? "hhmm" : "hh:mm";
                t.suppressSeconds && 0 === n.seconds && 0 === n.milliseconds || (i += "basic" === t.format ? "ss" : ":ss",
                t.suppressMilliseconds && 0 === n.milliseconds || (i += ".SSS"));
                let s = n.toFormat(i);
                return t.includePrefix && (s = "T" + s),
                s
            }
            toJSON() {
                return this.toISO()
            }
            toString() {
                return this.toISO()
            }
            toMillis() {
                return this.as("milliseconds")
            }
            valueOf() {
                return this.toMillis()
            }
            plus(t) {
                if (!this.isValid)
                    return this;
                const e = Je.fromDurationLike(t)
                  , n = {};
                for (const t of Ye)
                    (vt(e.values, t) || vt(this.values, t)) && (n[t] = e.get(t) + this.get(t));
                return We(this, {
                    values: n
                }, !0)
            }
            minus(t) {
                if (!this.isValid)
                    return this;
                const e = Je.fromDurationLike(t);
                return this.plus(e.negate())
            }
            mapUnits(t) {
                if (!this.isValid)
                    return this;
                const e = {};
                for (const n of Object.keys(this.values))
                    e[n] = It(t(this.values[n], n));
                return We(this, {
                    values: e
                }, !0)
            }
            get(t) {
                return this[Je.normalizeUnit(t)]
            }
            set(t) {
                if (!this.isValid)
                    return this;
                return We(this, {
                    values: {
                        ...this.values,
                        ...At(t, Je.normalizeUnit)
                    }
                })
            }
            reconfigure({locale: t, numberingSystem: e, conversionAccuracy: n, matrix: i}={}) {
                return We(this, {
                    loc: this.loc.clone({
                        locale: t,
                        numberingSystem: e
                    }),
                    matrix: i,
                    conversionAccuracy: n
                })
            }
            as(t) {
                return this.isValid ? this.shiftTo(t).get(t) : NaN
            }
            normalize() {
                if (!this.isValid)
                    return this;
                const t = this.toObject();
                return function(t, e) {
                    Ue.reduce(((n,i)=>ht(e[i]) ? n : (n && Ze(t, e, n, e, i),
                    i)), null)
                }(this.matrix, t),
                We(this, {
                    values: t
                }, !0)
            }
            rescale() {
                if (!this.isValid)
                    return this;
                return We(this, {
                    values: function(t) {
                        const e = {};
                        for (const [n,i] of Object.entries(t))
                            0 !== i && (e[n] = i);
                        return e
                    }(this.normalize().shiftToAll().toObject())
                }, !0)
            }
            shiftTo(...t) {
                if (!this.isValid)
                    return this;
                if (0 === t.length)
                    return this;
                t = t.map((t=>Je.normalizeUnit(t)));
                const e = {}
                  , n = {}
                  , i = this.toObject();
                let s;
                for (const o of Ye)
                    if (t.indexOf(o) >= 0) {
                        s = o;
                        let t = 0;
                        for (const e in n)
                            t += this.matrix[e][o] * n[e],
                            n[e] = 0;
                        pt(i[o]) && (t += i[o]);
                        const r = Math.trunc(t);
                        e[o] = r,
                        n[o] = (1e3 * t - 1e3 * r) / 1e3;
                        for (const t in i)
                            Ye.indexOf(t) > Ye.indexOf(o) && Ze(this.matrix, i, t, e, o)
                    } else
                        pt(i[o]) && (n[o] = i[o]);
                for (const t in n)
                    0 !== n[t] && (e[s] += t === s ? n[t] : n[t] / this.matrix[s][t]);
                return We(this, {
                    values: e
                }, !0).normalize()
            }
            shiftToAll() {
                return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this
            }
            negate() {
                if (!this.isValid)
                    return this;
                const t = {};
                for (const e of Object.keys(this.values))
                    t[e] = 0 === this.values[e] ? 0 : -this.values[e];
                return We(this, {
                    values: t
                }, !0)
            }
            get years() {
                return this.isValid ? this.values.years || 0 : NaN
            }
            get quarters() {
                return this.isValid ? this.values.quarters || 0 : NaN
            }
            get months() {
                return this.isValid ? this.values.months || 0 : NaN
            }
            get weeks() {
                return this.isValid ? this.values.weeks || 0 : NaN
            }
            get days() {
                return this.isValid ? this.values.days || 0 : NaN
            }
            get hours() {
                return this.isValid ? this.values.hours || 0 : NaN
            }
            get minutes() {
                return this.isValid ? this.values.minutes || 0 : NaN
            }
            get seconds() {
                return this.isValid ? this.values.seconds || 0 : NaN
            }
            get milliseconds() {
                return this.isValid ? this.values.milliseconds || 0 : NaN
            }
            get isValid() {
                return null === this.invalid
            }
            get invalidReason() {
                return this.invalid ? this.invalid.reason : null
            }
            get invalidExplanation() {
                return this.invalid ? this.invalid.explanation : null
            }
            equals(t) {
                if (!this.isValid || !t.isValid)
                    return !1;
                if (!this.loc.equals(t.loc))
                    return !1;
                for (const i of Ye)
                    if (e = this.values[i],
                    n = t.values[i],
                    !(void 0 === e || 0 === e ? void 0 === n || 0 === n : e === n))
                        return !1;
                var e, n;
                return !0
            }
        }
        const Ke = "Invalid Interval";
        class Ge {
            constructor(t) {
                this.s = t.start,
                this.e = t.end,
                this.invalid = t.invalid || null,
                this.isLuxonInterval = !0
            }
            static invalid(t, e=null) {
                if (!t)
                    throw new c("need to specify a reason the Interval is invalid");
                const n = t instanceof Qt ? t : new Qt(t,e);
                if (dt.throwOnInvalid)
                    throw new o(n);
                return new Ge({
                    invalid: n
                })
            }
            static fromDateTimes(t, e) {
                const n = ei(t)
                  , i = ei(e)
                  , s = function(t, e) {
                    return t && t.isValid ? e && e.isValid ? e < t ? Ge.invalid("end before start", `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`) : null : Ge.invalid("missing or invalid end") : Ge.invalid("missing or invalid start")
                }(n, i);
                return null == s ? new Ge({
                    start: n,
                    end: i
                }) : s
            }
            static after(t, e) {
                const n = Je.fromDurationLike(e)
                  , i = ei(t);
                return Ge.fromDateTimes(i, i.plus(n))
            }
            static before(t, e) {
                const n = Je.fromDurationLike(e)
                  , i = ei(t);
                return Ge.fromDateTimes(i.minus(n), i)
            }
            static fromISO(t, e) {
                const [n,i] = (t || "").split("/", 2);
                if (n && i) {
                    let t, s, o, r;
                    try {
                        t = ti.fromISO(n, e),
                        s = t.isValid
                    } catch (i) {
                        s = !1
                    }
                    try {
                        o = ti.fromISO(i, e),
                        r = o.isValid
                    } catch (i) {
                        r = !1
                    }
                    if (s && r)
                        return Ge.fromDateTimes(t, o);
                    if (s) {
                        const n = Je.fromISO(i, e);
                        if (n.isValid)
                            return Ge.after(t, n)
                    } else if (r) {
                        const t = Je.fromISO(n, e);
                        if (t.isValid)
                            return Ge.before(o, t)
                    }
                }
                return Ge.invalid("unparsable", `the input "${t}" can't be parsed as ISO 8601`)
            }
            static isInterval(t) {
                return t && t.isLuxonInterval || !1
            }
            get start() {
                return this.isValid ? this.s : null
            }
            get end() {
                return this.isValid ? this.e : null
            }
            get isValid() {
                return null === this.invalidReason
            }
            get invalidReason() {
                return this.invalid ? this.invalid.reason : null
            }
            get invalidExplanation() {
                return this.invalid ? this.invalid.explanation : null
            }
            length(t="milliseconds") {
                return this.isValid ? this.toDuration(t).get(t) : NaN
            }
            count(t="milliseconds") {
                if (!this.isValid)
                    return NaN;
                const e = this.start.startOf(t)
                  , n = this.end.startOf(t);
                return Math.floor(n.diff(e, t).get(t)) + (n.valueOf() !== this.end.valueOf())
            }
            hasSame(t) {
                return !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, t))
            }
            isEmpty() {
                return this.s.valueOf() === this.e.valueOf()
            }
            isAfter(t) {
                return !!this.isValid && this.s > t
            }
            isBefore(t) {
                return !!this.isValid && this.e <= t
            }
            contains(t) {
                return !!this.isValid && (this.s <= t && this.e > t)
            }
            set({start: t, end: e}={}) {
                return this.isValid ? Ge.fromDateTimes(t || this.s, e || this.e) : this
            }
            splitAt(...t) {
                if (!this.isValid)
                    return [];
                const e = t.map(ei).filter((t=>this.contains(t))).sort()
                  , n = [];
                let {s: i} = this
                  , s = 0;
                for (; i < this.e; ) {
                    const t = e[s] || this.e
                      , o = +t > +this.e ? this.e : t;
                    n.push(Ge.fromDateTimes(i, o)),
                    i = o,
                    s += 1
                }
                return n
            }
            splitBy(t) {
                const e = Je.fromDurationLike(t);
                if (!this.isValid || !e.isValid || 0 === e.as("milliseconds"))
                    return [];
                let n, {s: i} = this, s = 1;
                const o = [];
                for (; i < this.e; ) {
                    const t = this.start.plus(e.mapUnits((t=>t * s)));
                    n = +t > +this.e ? this.e : t,
                    o.push(Ge.fromDateTimes(i, n)),
                    i = n,
                    s += 1
                }
                return o
            }
            divideEqually(t) {
                return this.isValid ? this.splitBy(this.length() / t).slice(0, t) : []
            }
            overlaps(t) {
                return this.e > t.s && this.s < t.e
            }
            abutsStart(t) {
                return !!this.isValid && +this.e == +t.s
            }
            abutsEnd(t) {
                return !!this.isValid && +t.e == +this.s
            }
            engulfs(t) {
                return !!this.isValid && (this.s <= t.s && this.e >= t.e)
            }
            equals(t) {
                return !(!this.isValid || !t.isValid) && (this.s.equals(t.s) && this.e.equals(t.e))
            }
            intersection(t) {
                if (!this.isValid)
                    return this;
                const e = this.s > t.s ? this.s : t.s
                  , n = this.e < t.e ? this.e : t.e;
                return e >= n ? null : Ge.fromDateTimes(e, n)
            }
            union(t) {
                if (!this.isValid)
                    return this;
                const e = this.s < t.s ? this.s : t.s
                  , n = this.e > t.e ? this.e : t.e;
                return Ge.fromDateTimes(e, n)
            }
            static merge(t) {
                const [e,n] = t.sort(((t,e)=>t.s - e.s)).reduce((([t,e],n)=>e ? e.overlaps(n) || e.abutsStart(n) ? [t, e.union(n)] : [t.concat([e]), n] : [t, n]), [[], null]);
                return n && e.push(n),
                e
            }
            static xor(t) {
                let e = null
                  , n = 0;
                const i = []
                  , s = t.map((t=>[{
                    time: t.s,
                    type: "s"
                }, {
                    time: t.e,
                    type: "e"
                }]))
                  , o = Array.prototype.concat(...s).sort(((t,e)=>t.time - e.time));
                for (const t of o)
                    n += "s" === t.type ? 1 : -1,
                    1 === n ? e = t.time : (e && +e != +t.time && i.push(Ge.fromDateTimes(e, t.time)),
                    e = null);
                return Ge.merge(i)
            }
            difference(...t) {
                return Ge.xor([this].concat(t)).map((t=>this.intersection(t))).filter((t=>t && !t.isEmpty()))
            }
            toString() {
                return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Ke
            }
            toLocaleString(t=m, e={}) {
                return this.isValid ? Gt.create(this.s.loc.clone(e), t).formatInterval(this) : Ke
            }
            toISO(t) {
                return this.isValid ? `${this.s.toISO(t)}/${this.e.toISO(t)}` : Ke
            }
            toISODate() {
                return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : Ke
            }
            toISOTime(t) {
                return this.isValid ? `${this.s.toISOTime(t)}/${this.e.toISOTime(t)}` : Ke
            }
            toFormat(t, {separator: e=" – "}={}) {
                return this.isValid ? `${this.s.toFormat(t)}${e}${this.e.toFormat(t)}` : Ke
            }
            toDuration(t, e) {
                return this.isValid ? this.e.diff(this.s, t, e) : Je.invalid(this.invalidReason)
            }
            mapEndpoints(t) {
                return Ge.fromDateTimes(t(this.s), t(this.e))
            }
        }
        class Qe {
            static hasDST(t=dt.defaultZone) {
                const e = ti.now().setZone(t).set({
                    month: 12
                });
                return !t.isUniversal && e.offset !== e.set({
                    month: 6
                }).offset
            }
            static isValidIANAZone(t) {
                return B.isValidZone(t)
            }
            static normalizeZone(t) {
                return it(t, dt.defaultZone)
            }
            static months(t="long", {locale: e=null, numberingSystem: n=null, locObj: i=null, outputCalendar: s="gregory"}={}) {
                return (i || X.create(e, n, s)).months(t)
            }
            static monthsFormat(t="long", {locale: e=null, numberingSystem: n=null, locObj: i=null, outputCalendar: s="gregory"}={}) {
                return (i || X.create(e, n, s)).months(t, !0)
            }
            static weekdays(t="long", {locale: e=null, numberingSystem: n=null, locObj: i=null}={}) {
                return (i || X.create(e, n, null)).weekdays(t)
            }
            static weekdaysFormat(t="long", {locale: e=null, numberingSystem: n=null, locObj: i=null}={}) {
                return (i || X.create(e, n, null)).weekdays(t, !0)
            }
            static meridiems({locale: t=null}={}) {
                return X.create(t).meridiems()
            }
            static eras(t="short", {locale: e=null}={}) {
                return X.create(e, null, "gregory").eras(t)
            }
            static features() {
                return {
                    relative: ft()
                }
            }
        }
        function Xe(t, e) {
            const n = t=>t.toUTC(0, {
                keepLocalTime: !0
            }).startOf("day").valueOf()
              , i = n(e) - n(t);
            return Math.floor(Je.fromMillis(i).as("days"))
        }
        function tn(t, e, n, i) {
            let[s,o,r,a] = function(t, e, n) {
                const i = [["years", (t,e)=>e.year - t.year], ["quarters", (t,e)=>e.quarter - t.quarter + 4 * (e.year - t.year)], ["months", (t,e)=>e.month - t.month + 12 * (e.year - t.year)], ["weeks", (t,e)=>{
                    const n = Xe(t, e);
                    return (n - n % 7) / 7
                }
                ], ["days", Xe]]
                  , s = {}
                  , o = t;
                let r, a;
                for (const [l,c] of i)
                    n.indexOf(l) >= 0 && (r = l,
                    s[l] = c(t, e),
                    a = o.plus(s),
                    a > e ? (s[l]--,
                    t = o.plus(s)) : t = a);
                return [t, s, a, r]
            }(t, e, n);
            const l = e - s
              , c = n.filter((t=>["hours", "minutes", "seconds", "milliseconds"].indexOf(t) >= 0));
            0 === c.length && (r < e && (r = s.plus({
                [a]: 1
            })),
            r !== s && (o[a] = (o[a] || 0) + l / (r - s)));
            const u = Je.fromObject(o, i);
            return c.length > 0 ? Je.fromMillis(l, i).shiftTo(...c).plus(u) : u
        }
        const en = {
            arab: "[٠-٩]",
            arabext: "[۰-۹]",
            bali: "[᭐-᭙]",
            beng: "[০-৯]",
            deva: "[०-९]",
            fullwide: "[０-９]",
            gujr: "[૦-૯]",
            hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
            khmr: "[០-៩]",
            knda: "[೦-೯]",
            laoo: "[໐-໙]",
            limb: "[᥆-᥏]",
            mlym: "[൦-൯]",
            mong: "[᠐-᠙]",
            mymr: "[၀-၉]",
            orya: "[୦-୯]",
            tamldec: "[௦-௯]",
            telu: "[౦-౯]",
            thai: "[๐-๙]",
            tibt: "[༠-༩]",
            latn: "\\d"
        }
          , nn = {
            arab: [1632, 1641],
            arabext: [1776, 1785],
            bali: [6992, 7001],
            beng: [2534, 2543],
            deva: [2406, 2415],
            fullwide: [65296, 65303],
            gujr: [2790, 2799],
            khmr: [6112, 6121],
            knda: [3302, 3311],
            laoo: [3792, 3801],
            limb: [6470, 6479],
            mlym: [3430, 3439],
            mong: [6160, 6169],
            mymr: [4160, 4169],
            orya: [2918, 2927],
            tamldec: [3046, 3055],
            telu: [3174, 3183],
            thai: [3664, 3673],
            tibt: [3872, 3881]
        }
          , sn = en.hanidec.replace(/[\[|\]]/g, "").split("");
        function on({numberingSystem: t}, e="") {
            return new RegExp(`${en[t || "latn"]}${e}`)
        }
        function rn(t, e=(t=>t)) {
            return {
                regex: t,
                deser: ([t])=>e(function(t) {
                    let e = parseInt(t, 10);
                    if (isNaN(e)) {
                        e = "";
                        for (let n = 0; n < t.length; n++) {
                            const i = t.charCodeAt(n);
                            if (-1 !== t[n].search(en.hanidec))
                                e += sn.indexOf(t[n]);
                            else
                                for (const t in nn) {
                                    const [n,s] = nn[t];
                                    i >= n && i <= s && (e += i - n)
                                }
                        }
                        return parseInt(e, 10)
                    }
                    return e
                }(t))
            }
        }
        const an = `[ ${String.fromCharCode(160)}]`
          , ln = new RegExp(an,"g");
        function cn(t) {
            return t.replace(/\./g, "\\.?").replace(ln, an)
        }
        function un(t) {
            return t.replace(/\./g, "").replace(ln, " ").toLowerCase()
        }
        function dn(t, e) {
            return null === t ? null : {
                regex: RegExp(t.map(cn).join("|")),
                deser: ([n])=>t.findIndex((t=>un(n) === un(t))) + e
            }
        }
        function hn(t, e) {
            return {
                regex: t,
                deser: ([,t,e])=>Mt(t, e),
                groups: e
            }
        }
        function pn(t) {
            return {
                regex: t,
                deser: ([t])=>t
            }
        }
        const mn = {
            year: {
                "2-digit": "yy",
                numeric: "yyyyy"
            },
            month: {
                numeric: "M",
                "2-digit": "MM",
                short: "MMM",
                long: "MMMM"
            },
            day: {
                numeric: "d",
                "2-digit": "dd"
            },
            weekday: {
                short: "EEE",
                long: "EEEE"
            },
            dayperiod: "a",
            dayPeriod: "a",
            hour: {
                numeric: "h",
                "2-digit": "hh"
            },
            minute: {
                numeric: "m",
                "2-digit": "mm"
            },
            second: {
                numeric: "s",
                "2-digit": "ss"
            },
            timeZoneName: {
                long: "ZZZZZ",
                short: "ZZZ"
            }
        };
        let fn = null;
        function gn(t, e) {
            return Array.prototype.concat(...t.map((t=>function(t, e) {
                if (t.literal)
                    return t;
                const n = yn(Gt.macroTokenToFormatOpts(t.val), e);
                return null == n || n.includes(void 0) ? t : n
            }(t, e))))
        }
        function vn(t, e, n) {
            const i = gn(Gt.parseFormat(n), t)
              , s = i.map((e=>function(t, e) {
                const n = on(e)
                  , i = on(e, "{2}")
                  , s = on(e, "{3}")
                  , o = on(e, "{4}")
                  , r = on(e, "{6}")
                  , a = on(e, "{1,2}")
                  , l = on(e, "{1,3}")
                  , c = on(e, "{1,6}")
                  , u = on(e, "{1,9}")
                  , d = on(e, "{2,4}")
                  , h = on(e, "{4,6}")
                  , p = t=>{
                    return {
                        regex: RegExp((e = t.val,
                        e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"))),
                        deser: ([t])=>t,
                        literal: !0
                    };
                    var e
                }
                  , m = (m=>{
                    if (t.literal)
                        return p(m);
                    switch (m.val) {
                    case "G":
                        return dn(e.eras("short", !1), 0);
                    case "GG":
                        return dn(e.eras("long", !1), 0);
                    case "y":
                        return rn(c);
                    case "yy":
                    case "kk":
                        return rn(d, Ct);
                    case "yyyy":
                    case "kkkk":
                        return rn(o);
                    case "yyyyy":
                        return rn(h);
                    case "yyyyyy":
                        return rn(r);
                    case "M":
                    case "L":
                    case "d":
                    case "H":
                    case "h":
                    case "m":
                    case "q":
                    case "s":
                    case "W":
                        return rn(a);
                    case "MM":
                    case "LL":
                    case "dd":
                    case "HH":
                    case "hh":
                    case "mm":
                    case "qq":
                    case "ss":
                    case "WW":
                        return rn(i);
                    case "MMM":
                        return dn(e.months("short", !0, !1), 1);
                    case "MMMM":
                        return dn(e.months("long", !0, !1), 1);
                    case "LLL":
                        return dn(e.months("short", !1, !1), 1);
                    case "LLLL":
                        return dn(e.months("long", !1, !1), 1);
                    case "o":
                    case "S":
                        return rn(l);
                    case "ooo":
                    case "SSS":
                        return rn(s);
                    case "u":
                        return pn(u);
                    case "uu":
                        return pn(a);
                    case "uuu":
                    case "E":
                    case "c":
                        return rn(n);
                    case "a":
                        return dn(e.meridiems(), 0);
                    case "EEE":
                        return dn(e.weekdays("short", !1, !1), 1);
                    case "EEEE":
                        return dn(e.weekdays("long", !1, !1), 1);
                    case "ccc":
                        return dn(e.weekdays("short", !0, !1), 1);
                    case "cccc":
                        return dn(e.weekdays("long", !0, !1), 1);
                    case "Z":
                    case "ZZ":
                        return hn(new RegExp(`([+-]${a.source})(?::(${i.source}))?`), 2);
                    case "ZZZ":
                        return hn(new RegExp(`([+-]${a.source})(${i.source})?`), 2);
                    case "z":
                        return pn(/[a-z_+-/]{1,256}?/i);
                    case " ":
                        return pn(/[^\S\n\r]/);
                    default:
                        return p(m)
                    }
                }
                )(t) || {
                    invalidReason: "missing Intl.DateTimeFormat.formatToParts support"
                };
                return m.token = t,
                m
            }(e, t)))
              , o = s.find((t=>t.invalidReason));
            if (o)
                return {
                    input: e,
                    tokens: i,
                    invalidReason: o.invalidReason
                };
            {
                const [t,n] = function(t) {
                    return [`^${t.map((t=>t.regex)).reduce(((t,e)=>`${t}(${e.source})`), "")}$`, t]
                }(s)
                  , o = RegExp(t, "i")
                  , [r,l] = function(t, e, n) {
                    const i = t.match(e);
                    if (i) {
                        const t = {};
                        let e = 1;
                        for (const s in n)
                            if (vt(n, s)) {
                                const o = n[s]
                                  , r = o.groups ? o.groups + 1 : 1;
                                !o.literal && o.token && (t[o.token.val[0]] = o.deser(i.slice(e, e + r))),
                                e += r
                            }
                        return [i, t]
                    }
                    return [i, {}]
                }(e, o, n)
                  , [c,u,d] = l ? function(t) {
                    let e, n = null;
                    return ht(t.z) || (n = B.create(t.z)),
                    ht(t.Z) || (n || (n = new et(t.Z)),
                    e = t.Z),
                    ht(t.q) || (t.M = 3 * (t.q - 1) + 1),
                    ht(t.h) || (t.h < 12 && 1 === t.a ? t.h += 12 : 12 === t.h && 0 === t.a && (t.h = 0)),
                    0 === t.G && t.y && (t.y = -t.y),
                    ht(t.u) || (t.S = kt(t.u)),
                    [Object.keys(t).reduce(((e,n)=>{
                        const i = (t=>{
                            switch (t) {
                            case "S":
                                return "millisecond";
                            case "s":
                                return "second";
                            case "m":
                                return "minute";
                            case "h":
                            case "H":
                                return "hour";
                            case "d":
                                return "day";
                            case "o":
                                return "ordinal";
                            case "L":
                            case "M":
                                return "month";
                            case "y":
                                return "year";
                            case "E":
                            case "c":
                                return "weekday";
                            case "W":
                                return "weekNumber";
                            case "k":
                                return "weekYear";
                            case "q":
                                return "quarter";
                            default:
                                return null
                            }
                        }
                        )(n);
                        return i && (e[i] = t[n]),
                        e
                    }
                    ), {}), n, e]
                }(l) : [null, null, void 0];
                if (vt(l, "a") && vt(l, "H"))
                    throw new a("Can't include meridiem when specifying 24-hour format");
                return {
                    input: e,
                    tokens: i,
                    regex: o,
                    rawMatches: r,
                    matches: l,
                    result: c,
                    zone: u,
                    specificOffset: d
                }
            }
        }
        function yn(t, e) {
            if (!t)
                return null;
            return Gt.create(e, t).formatDateTimeParts((fn || (fn = ti.fromMillis(1555555555555)),
            fn)).map((e=>function(t, e) {
                const {type: n, value: i} = t;
                if ("literal" === n) {
                    const t = /^\s+$/.test(i);
                    return {
                        literal: !t,
                        val: t ? " " : i
                    }
                }
                const s = e[n];
                let o = mn[n];
                if ("object" == typeof o && (o = o[s]),
                o)
                    return {
                        literal: !1,
                        val: o
                    }
            }(e, t)))
        }
        const bn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
          , _n = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
        function wn(t, e) {
            return new Qt("unit out of range",`you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`)
        }
        function kn(t, e, n) {
            const i = new Date(Date.UTC(t, e - 1, n));
            t < 100 && t >= 0 && i.setUTCFullYear(i.getUTCFullYear() - 1900);
            const s = i.getUTCDay();
            return 0 === s ? 7 : s
        }
        function xn(t, e, n) {
            return n + (Tt(t) ? _n : bn)[e - 1]
        }
        function Tn(t, e) {
            const n = Tt(t) ? _n : bn
              , i = n.findIndex((t=>t < e));
            return {
                month: i + 1,
                day: e - n[i]
            }
        }
        function En(t) {
            const {year: e, month: n, day: i} = t
              , s = xn(e, n, i)
              , o = kn(e, n, i);
            let r, a = Math.floor((s - o + 10) / 7);
            return a < 1 ? (r = e - 1,
            a = Ot(r)) : a > Ot(e) ? (r = e + 1,
            a = 1) : r = e,
            {
                weekYear: r,
                weekNumber: a,
                weekday: o,
                ...Ft(t)
            }
        }
        function Dn(t) {
            const {weekYear: e, weekNumber: n, weekday: i} = t
              , s = kn(e, 1, 4)
              , o = Et(e);
            let r, a = 7 * n + i - s - 3;
            a < 1 ? (r = e - 1,
            a += Et(r)) : a > o ? (r = e + 1,
            a -= Et(e)) : r = e;
            const {month: l, day: c} = Tn(r, a);
            return {
                year: r,
                month: l,
                day: c,
                ...Ft(t)
            }
        }
        function Sn(t) {
            const {year: e, month: n, day: i} = t;
            return {
                year: e,
                ordinal: xn(e, n, i),
                ...Ft(t)
            }
        }
        function On(t) {
            const {year: e, ordinal: n} = t
              , {month: i, day: s} = Tn(e, n);
            return {
                year: e,
                month: i,
                day: s,
                ...Ft(t)
            }
        }
        function Cn(t) {
            const e = mt(t.year)
              , n = yt(t.month, 1, 12)
              , i = yt(t.day, 1, Dt(t.year, t.month));
            return e ? n ? !i && wn("day", t.day) : wn("month", t.month) : wn("year", t.year)
        }
        function Ln(t) {
            const {hour: e, minute: n, second: i, millisecond: s} = t
              , o = yt(e, 0, 23) || 24 === e && 0 === n && 0 === i && 0 === s
              , r = yt(n, 0, 59)
              , a = yt(i, 0, 59)
              , l = yt(s, 0, 999);
            return o ? r ? a ? !l && wn("millisecond", s) : wn("second", i) : wn("minute", n) : wn("hour", e)
        }
        const Mn = "Invalid DateTime"
          , In = 864e13;
        function An(t) {
            return new Qt("unsupported zone",`the zone "${t.name}" is not supported`)
        }
        function Nn(t) {
            return null === t.weekData && (t.weekData = En(t.c)),
            t.weekData
        }
        function Fn(t, e) {
            const n = {
                ts: t.ts,
                zone: t.zone,
                c: t.c,
                o: t.o,
                loc: t.loc,
                invalid: t.invalid
            };
            return new ti({
                ...n,
                ...e,
                old: n
            })
        }
        function Pn(t, e, n) {
            let i = t - 60 * e * 1e3;
            const s = n.offset(i);
            if (e === s)
                return [i, e];
            i -= 60 * (s - e) * 1e3;
            const o = n.offset(i);
            return s === o ? [i, s] : [t - 60 * Math.min(s, o) * 1e3, Math.max(s, o)]
        }
        function jn(t, e) {
            const n = new Date(t += 60 * e * 1e3);
            return {
                year: n.getUTCFullYear(),
                month: n.getUTCMonth() + 1,
                day: n.getUTCDate(),
                hour: n.getUTCHours(),
                minute: n.getUTCMinutes(),
                second: n.getUTCSeconds(),
                millisecond: n.getUTCMilliseconds()
            }
        }
        function qn(t, e, n) {
            return Pn(St(t), e, n)
        }
        function Hn(t, e) {
            const n = t.o
              , i = t.c.year + Math.trunc(e.years)
              , s = t.c.month + Math.trunc(e.months) + 3 * Math.trunc(e.quarters)
              , o = {
                ...t.c,
                year: i,
                month: s,
                day: Math.min(t.c.day, Dt(i, s)) + Math.trunc(e.days) + 7 * Math.trunc(e.weeks)
            }
              , r = Je.fromObject({
                years: e.years - Math.trunc(e.years),
                quarters: e.quarters - Math.trunc(e.quarters),
                months: e.months - Math.trunc(e.months),
                weeks: e.weeks - Math.trunc(e.weeks),
                days: e.days - Math.trunc(e.days),
                hours: e.hours,
                minutes: e.minutes,
                seconds: e.seconds,
                milliseconds: e.milliseconds
            }).as("milliseconds")
              , a = St(o);
            let[l,c] = Pn(a, n, t.zone);
            return 0 !== r && (l += r,
            c = t.zone.offset(l)),
            {
                ts: l,
                o: c
            }
        }
        function Vn(t, e, n, i, s, o) {
            const {setZone: r, zone: a} = n;
            if (t && 0 !== Object.keys(t).length || e) {
                const i = e || a
                  , s = ti.fromObject(t, {
                    ...n,
                    zone: i,
                    specificOffset: o
                });
                return r ? s : s.setZone(a)
            }
            return ti.invalid(new Qt("unparsable",`the input "${s}" can't be parsed as ${i}`))
        }
        function $n(t, e, n=!0) {
            return t.isValid ? Gt.create(X.create("en-US"), {
                allowZ: n,
                forceSimple: !0
            }).formatDateTimeFromString(t, e) : null
        }
        function Bn(t, e) {
            const n = t.c.year > 9999 || t.c.year < 0;
            let i = "";
            return n && t.c.year >= 0 && (i += "+"),
            i += bt(t.c.year, n ? 6 : 4),
            e ? (i += "-",
            i += bt(t.c.month),
            i += "-",
            i += bt(t.c.day)) : (i += bt(t.c.month),
            i += bt(t.c.day)),
            i
        }
        function Rn(t, e, n, i, s, o) {
            let r = bt(t.c.hour);
            return e ? (r += ":",
            r += bt(t.c.minute),
            0 === t.c.second && n || (r += ":")) : r += bt(t.c.minute),
            0 === t.c.second && n || (r += bt(t.c.second),
            0 === t.c.millisecond && i || (r += ".",
            r += bt(t.c.millisecond, 3))),
            s && (t.isOffsetFixed && 0 === t.offset && !o ? r += "Z" : t.o < 0 ? (r += "-",
            r += bt(Math.trunc(-t.o / 60)),
            r += ":",
            r += bt(Math.trunc(-t.o % 60))) : (r += "+",
            r += bt(Math.trunc(t.o / 60)),
            r += ":",
            r += bt(Math.trunc(t.o % 60)))),
            o && (r += "[" + t.zone.ianaName + "]"),
            r
        }
        const zn = {
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        }
          , Yn = {
            weekNumber: 1,
            weekday: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        }
          , Un = {
            ordinal: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        }
          , Wn = ["year", "month", "day", "hour", "minute", "second", "millisecond"]
          , Zn = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"]
          , Jn = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
        function Kn(t) {
            const e = {
                year: "year",
                years: "year",
                month: "month",
                months: "month",
                day: "day",
                days: "day",
                hour: "hour",
                hours: "hour",
                minute: "minute",
                minutes: "minute",
                quarter: "quarter",
                quarters: "quarter",
                second: "second",
                seconds: "second",
                millisecond: "millisecond",
                milliseconds: "millisecond",
                weekday: "weekday",
                weekdays: "weekday",
                weeknumber: "weekNumber",
                weeksnumber: "weekNumber",
                weeknumbers: "weekNumber",
                weekyear: "weekYear",
                weekyears: "weekYear",
                ordinal: "ordinal"
            }[t.toLowerCase()];
            if (!e)
                throw new l(t);
            return e
        }
        function Gn(t, e) {
            const n = it(e.zone, dt.defaultZone)
              , i = X.fromObject(e)
              , s = dt.now();
            let o, r;
            if (ht(t.year))
                o = s;
            else {
                for (const e of Wn)
                    ht(t[e]) && (t[e] = zn[e]);
                const e = Cn(t) || Ln(t);
                if (e)
                    return ti.invalid(e);
                const i = n.offset(s);
                [o,r] = qn(t, i, n)
            }
            return new ti({
                ts: o,
                zone: n,
                loc: i,
                o: r
            })
        }
        function Qn(t, e, n) {
            const i = !!ht(n.round) || n.round
              , s = (t,s)=>{
                t = xt(t, i || n.calendary ? 0 : 2, !0);
                return e.loc.clone(n).relFormatter(n).format(t, s)
            }
              , o = i=>n.calendary ? e.hasSame(t, i) ? 0 : e.startOf(i).diff(t.startOf(i), i).get(i) : e.diff(t, i).get(i);
            if (n.unit)
                return s(o(n.unit), n.unit);
            for (const t of n.units) {
                const e = o(t);
                if (Math.abs(e) >= 1)
                    return s(e, t)
            }
            return s(t > e ? -0 : 0, n.units[n.units.length - 1])
        }
        function Xn(t) {
            let e, n = {};
            return t.length > 0 && "object" == typeof t[t.length - 1] ? (n = t[t.length - 1],
            e = Array.from(t).slice(0, t.length - 1)) : e = Array.from(t),
            [n, e]
        }
        class ti {
            constructor(t) {
                const e = t.zone || dt.defaultZone;
                let n = t.invalid || (Number.isNaN(t.ts) ? new Qt("invalid input") : null) || (e.isValid ? null : An(e));
                this.ts = ht(t.ts) ? dt.now() : t.ts;
                let i = null
                  , s = null;
                if (!n) {
                    if (t.old && t.old.ts === this.ts && t.old.zone.equals(e))
                        [i,s] = [t.old.c, t.old.o];
                    else {
                        const t = e.offset(this.ts);
                        i = jn(this.ts, t),
                        n = Number.isNaN(i.year) ? new Qt("invalid input") : null,
                        i = n ? null : i,
                        s = n ? null : t
                    }
                }
                this._zone = e,
                this.loc = t.loc || X.create(),
                this.invalid = n,
                this.weekData = null,
                this.c = i,
                this.o = s,
                this.isLuxonDateTime = !0
            }
            static now() {
                return new ti({})
            }
            static local() {
                const [t,e] = Xn(arguments)
                  , [n,i,s,o,r,a,l] = e;
                return Gn({
                    year: n,
                    month: i,
                    day: s,
                    hour: o,
                    minute: r,
                    second: a,
                    millisecond: l
                }, t)
            }
            static utc() {
                const [t,e] = Xn(arguments)
                  , [n,i,s,o,r,a,l] = e;
                return t.zone = et.utcInstance,
                Gn({
                    year: n,
                    month: i,
                    day: s,
                    hour: o,
                    minute: r,
                    second: a,
                    millisecond: l
                }, t)
            }
            static fromJSDate(t, e={}) {
                const n = (i = t,
                "[object Date]" === Object.prototype.toString.call(i) ? t.valueOf() : NaN);
                var i;
                if (Number.isNaN(n))
                    return ti.invalid("invalid input");
                const s = it(e.zone, dt.defaultZone);
                return s.isValid ? new ti({
                    ts: n,
                    zone: s,
                    loc: X.fromObject(e)
                }) : ti.invalid(An(s))
            }
            static fromMillis(t, e={}) {
                if (pt(t))
                    return t < -In || t > In ? ti.invalid("Timestamp out of range") : new ti({
                        ts: t,
                        zone: it(e.zone, dt.defaultZone),
                        loc: X.fromObject(e)
                    });
                throw new c(`fromMillis requires a numerical input, but received a ${typeof t} with value ${t}`)
            }
            static fromSeconds(t, e={}) {
                if (pt(t))
                    return new ti({
                        ts: 1e3 * t,
                        zone: it(e.zone, dt.defaultZone),
                        loc: X.fromObject(e)
                    });
                throw new c("fromSeconds requires a numerical input")
            }
            static fromObject(t, e={}) {
                t = t || {};
                const n = it(e.zone, dt.defaultZone);
                if (!n.isValid)
                    return ti.invalid(An(n));
                const i = dt.now()
                  , s = ht(e.specificOffset) ? n.offset(i) : e.specificOffset
                  , o = At(t, Kn)
                  , r = !ht(o.ordinal)
                  , l = !ht(o.year)
                  , c = !ht(o.month) || !ht(o.day)
                  , u = l || c
                  , d = o.weekYear || o.weekNumber
                  , h = X.fromObject(e);
                if ((u || r) && d)
                    throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                if (c && r)
                    throw new a("Can't mix ordinal dates with month/day");
                const p = d || o.weekday && !u;
                let m, f, g = jn(i, s);
                p ? (m = Zn,
                f = Yn,
                g = En(g)) : r ? (m = Jn,
                f = Un,
                g = Sn(g)) : (m = Wn,
                f = zn);
                let v = !1;
                for (const t of m) {
                    ht(o[t]) ? o[t] = v ? f[t] : g[t] : v = !0
                }
                const y = p ? function(t) {
                    const e = mt(t.weekYear)
                      , n = yt(t.weekNumber, 1, Ot(t.weekYear))
                      , i = yt(t.weekday, 1, 7);
                    return e ? n ? !i && wn("weekday", t.weekday) : wn("week", t.week) : wn("weekYear", t.weekYear)
                }(o) : r ? function(t) {
                    const e = mt(t.year)
                      , n = yt(t.ordinal, 1, Et(t.year));
                    return e ? !n && wn("ordinal", t.ordinal) : wn("year", t.year)
                }(o) : Cn(o)
                  , b = y || Ln(o);
                if (b)
                    return ti.invalid(b);
                const _ = p ? Dn(o) : r ? On(o) : o
                  , [w,k] = qn(_, s, n)
                  , x = new ti({
                    ts: w,
                    zone: n,
                    o: k,
                    loc: h
                });
                return o.weekday && u && t.weekday !== x.weekday ? ti.invalid("mismatched weekday", `you can't specify both a weekday of ${o.weekday} and a date of ${x.toISO()}`) : x
            }
            static fromISO(t, e={}) {
                const [n,i] = function(t) {
                    return ne(t, [Oe, Ie], [Ce, Ae], [Le, Ne], [Me, Fe])
                }(t);
                return Vn(n, i, e, "ISO 8601", t)
            }
            static fromRFC2822(t, e={}) {
                const [n,i] = function(t) {
                    return ne(function(t) {
                        return t.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim()
                    }(t), [we, ke])
                }(t);
                return Vn(n, i, e, "RFC 2822", t)
            }
            static fromHTTP(t, e={}) {
                const [n,i] = function(t) {
                    return ne(t, [xe, De], [Te, De], [Ee, Se])
                }(t);
                return Vn(n, i, e, "HTTP", e)
            }
            static fromFormat(t, e, n={}) {
                if (ht(t) || ht(e))
                    throw new c("fromFormat requires an input string and a format");
                const {locale: i=null, numberingSystem: s=null} = n
                  , o = X.fromOpts({
                    locale: i,
                    numberingSystem: s,
                    defaultToEN: !0
                })
                  , [r,a,l,u] = function(t, e, n) {
                    const {result: i, zone: s, specificOffset: o, invalidReason: r} = vn(t, e, n);
                    return [i, s, o, r]
                }(o, t, e);
                return u ? ti.invalid(u) : Vn(r, a, n, `format ${e}`, t, l)
            }
            static fromString(t, e, n={}) {
                return ti.fromFormat(t, e, n)
            }
            static fromSQL(t, e={}) {
                const [n,i] = function(t) {
                    return ne(t, [je, Ie], [qe, He])
                }(t);
                return Vn(n, i, e, "SQL", t)
            }
            static invalid(t, e=null) {
                if (!t)
                    throw new c("need to specify a reason the DateTime is invalid");
                const n = t instanceof Qt ? t : new Qt(t,e);
                if (dt.throwOnInvalid)
                    throw new s(n);
                return new ti({
                    invalid: n
                })
            }
            static isDateTime(t) {
                return t && t.isLuxonDateTime || !1
            }
            static parseFormatForOpts(t, e={}) {
                const n = yn(t, X.fromObject(e));
                return n ? n.map((t=>t ? t.val : null)).join("") : null
            }
            static expandFormat(t, e={}) {
                return gn(Gt.parseFormat(t), X.fromObject(e)).map((t=>t.val)).join("")
            }
            get(t) {
                return this[t]
            }
            get isValid() {
                return null === this.invalid
            }
            get invalidReason() {
                return this.invalid ? this.invalid.reason : null
            }
            get invalidExplanation() {
                return this.invalid ? this.invalid.explanation : null
            }
            get locale() {
                return this.isValid ? this.loc.locale : null
            }
            get numberingSystem() {
                return this.isValid ? this.loc.numberingSystem : null
            }
            get outputCalendar() {
                return this.isValid ? this.loc.outputCalendar : null
            }
            get zone() {
                return this._zone
            }
            get zoneName() {
                return this.isValid ? this.zone.name : null
            }
            get year() {
                return this.isValid ? this.c.year : NaN
            }
            get quarter() {
                return this.isValid ? Math.ceil(this.c.month / 3) : NaN
            }
            get month() {
                return this.isValid ? this.c.month : NaN
            }
            get day() {
                return this.isValid ? this.c.day : NaN
            }
            get hour() {
                return this.isValid ? this.c.hour : NaN
            }
            get minute() {
                return this.isValid ? this.c.minute : NaN
            }
            get second() {
                return this.isValid ? this.c.second : NaN
            }
            get millisecond() {
                return this.isValid ? this.c.millisecond : NaN
            }
            get weekYear() {
                return this.isValid ? Nn(this).weekYear : NaN
            }
            get weekNumber() {
                return this.isValid ? Nn(this).weekNumber : NaN
            }
            get weekday() {
                return this.isValid ? Nn(this).weekday : NaN
            }
            get ordinal() {
                return this.isValid ? Sn(this.c).ordinal : NaN
            }
            get monthShort() {
                return this.isValid ? Qe.months("short", {
                    locObj: this.loc
                })[this.month - 1] : null
            }
            get monthLong() {
                return this.isValid ? Qe.months("long", {
                    locObj: this.loc
                })[this.month - 1] : null
            }
            get weekdayShort() {
                return this.isValid ? Qe.weekdays("short", {
                    locObj: this.loc
                })[this.weekday - 1] : null
            }
            get weekdayLong() {
                return this.isValid ? Qe.weekdays("long", {
                    locObj: this.loc
                })[this.weekday - 1] : null
            }
            get offset() {
                return this.isValid ? +this.o : NaN
            }
            get offsetNameShort() {
                return this.isValid ? this.zone.offsetName(this.ts, {
                    format: "short",
                    locale: this.locale
                }) : null
            }
            get offsetNameLong() {
                return this.isValid ? this.zone.offsetName(this.ts, {
                    format: "long",
                    locale: this.locale
                }) : null
            }
            get isOffsetFixed() {
                return this.isValid ? this.zone.isUniversal : null
            }
            get isInDST() {
                return !this.isOffsetFixed && (this.offset > this.set({
                    month: 1,
                    day: 1
                }).offset || this.offset > this.set({
                    month: 5
                }).offset)
            }
            get isInLeapYear() {
                return Tt(this.year)
            }
            get daysInMonth() {
                return Dt(this.year, this.month)
            }
            get daysInYear() {
                return this.isValid ? Et(this.year) : NaN
            }
            get weeksInWeekYear() {
                return this.isValid ? Ot(this.weekYear) : NaN
            }
            resolvedLocaleOptions(t={}) {
                const {locale: e, numberingSystem: n, calendar: i} = Gt.create(this.loc.clone(t), t).resolvedOptions(this);
                return {
                    locale: e,
                    numberingSystem: n,
                    outputCalendar: i
                }
            }
            toUTC(t=0, e={}) {
                return this.setZone(et.instance(t), e)
            }
            toLocal() {
                return this.setZone(dt.defaultZone)
            }
            setZone(t, {keepLocalTime: e=!1, keepCalendarTime: n=!1}={}) {
                if ((t = it(t, dt.defaultZone)).equals(this.zone))
                    return this;
                if (t.isValid) {
                    let i = this.ts;
                    if (e || n) {
                        const e = t.offset(this.ts)
                          , n = this.toObject();
                        [i] = qn(n, e, t)
                    }
                    return Fn(this, {
                        ts: i,
                        zone: t
                    })
                }
                return ti.invalid(An(t))
            }
            reconfigure({locale: t, numberingSystem: e, outputCalendar: n}={}) {
                return Fn(this, {
                    loc: this.loc.clone({
                        locale: t,
                        numberingSystem: e,
                        outputCalendar: n
                    })
                })
            }
            setLocale(t) {
                return this.reconfigure({
                    locale: t
                })
            }
            set(t) {
                if (!this.isValid)
                    return this;
                const e = At(t, Kn)
                  , n = !ht(e.weekYear) || !ht(e.weekNumber) || !ht(e.weekday)
                  , i = !ht(e.ordinal)
                  , s = !ht(e.year)
                  , o = !ht(e.month) || !ht(e.day)
                  , r = s || o
                  , l = e.weekYear || e.weekNumber;
                if ((r || i) && l)
                    throw new a("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                if (o && i)
                    throw new a("Can't mix ordinal dates with month/day");
                let c;
                n ? c = Dn({
                    ...En(this.c),
                    ...e
                }) : ht(e.ordinal) ? (c = {
                    ...this.toObject(),
                    ...e
                },
                ht(e.day) && (c.day = Math.min(Dt(c.year, c.month), c.day))) : c = On({
                    ...Sn(this.c),
                    ...e
                });
                const [u,d] = qn(c, this.o, this.zone);
                return Fn(this, {
                    ts: u,
                    o: d
                })
            }
            plus(t) {
                if (!this.isValid)
                    return this;
                return Fn(this, Hn(this, Je.fromDurationLike(t)))
            }
            minus(t) {
                if (!this.isValid)
                    return this;
                return Fn(this, Hn(this, Je.fromDurationLike(t).negate()))
            }
            startOf(t) {
                if (!this.isValid)
                    return this;
                const e = {}
                  , n = Je.normalizeUnit(t);
                switch (n) {
                case "years":
                    e.month = 1;
                case "quarters":
                case "months":
                    e.day = 1;
                case "weeks":
                case "days":
                    e.hour = 0;
                case "hours":
                    e.minute = 0;
                case "minutes":
                    e.second = 0;
                case "seconds":
                    e.millisecond = 0
                }
                if ("weeks" === n && (e.weekday = 1),
                "quarters" === n) {
                    const t = Math.ceil(this.month / 3);
                    e.month = 3 * (t - 1) + 1
                }
                return this.set(e)
            }
            endOf(t) {
                return this.isValid ? this.plus({
                    [t]: 1
                }).startOf(t).minus(1) : this
            }
            toFormat(t, e={}) {
                return this.isValid ? Gt.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(this, t) : Mn
            }
            toLocaleString(t=m, e={}) {
                return this.isValid ? Gt.create(this.loc.clone(e), t).formatDateTime(this) : Mn
            }
            toLocaleParts(t={}) {
                return this.isValid ? Gt.create(this.loc.clone(t), t).formatDateTimeParts(this) : []
            }
            toISO({format: t="extended", suppressSeconds: e=!1, suppressMilliseconds: n=!1, includeOffset: i=!0, extendedZone: s=!1}={}) {
                if (!this.isValid)
                    return null;
                const o = "extended" === t;
                let r = Bn(this, o);
                return r += "T",
                r += Rn(this, o, e, n, i, s),
                r
            }
            toISODate({format: t="extended"}={}) {
                return this.isValid ? Bn(this, "extended" === t) : null
            }
            toISOWeekDate() {
                return $n(this, "kkkk-'W'WW-c")
            }
            toISOTime({suppressMilliseconds: t=!1, suppressSeconds: e=!1, includeOffset: n=!0, includePrefix: i=!1, extendedZone: s=!1, format: o="extended"}={}) {
                if (!this.isValid)
                    return null;
                return (i ? "T" : "") + Rn(this, "extended" === o, e, t, n, s)
            }
            toRFC2822() {
                return $n(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1)
            }
            toHTTP() {
                return $n(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'")
            }
            toSQLDate() {
                return this.isValid ? Bn(this, !0) : null
            }
            toSQLTime({includeOffset: t=!0, includeZone: e=!1, includeOffsetSpace: n=!0}={}) {
                let i = "HH:mm:ss.SSS";
                return (e || t) && (n && (i += " "),
                e ? i += "z" : t && (i += "ZZ")),
                $n(this, i, !0)
            }
            toSQL(t={}) {
                return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(t)}` : null
            }
            toString() {
                return this.isValid ? this.toISO() : Mn
            }
            valueOf() {
                return this.toMillis()
            }
            toMillis() {
                return this.isValid ? this.ts : NaN
            }
            toSeconds() {
                return this.isValid ? this.ts / 1e3 : NaN
            }
            toUnixInteger() {
                return this.isValid ? Math.floor(this.ts / 1e3) : NaN
            }
            toJSON() {
                return this.toISO()
            }
            toBSON() {
                return this.toJSDate()
            }
            toObject(t={}) {
                if (!this.isValid)
                    return {};
                const e = {
                    ...this.c
                };
                return t.includeConfig && (e.outputCalendar = this.outputCalendar,
                e.numberingSystem = this.loc.numberingSystem,
                e.locale = this.loc.locale),
                e
            }
            toJSDate() {
                return new Date(this.isValid ? this.ts : NaN)
            }
            diff(t, e="milliseconds", n={}) {
                if (!this.isValid || !t.isValid)
                    return Je.invalid("created by diffing an invalid DateTime");
                const i = {
                    locale: this.locale,
                    numberingSystem: this.numberingSystem,
                    ...n
                }
                  , s = (a = e,
                Array.isArray(a) ? a : [a]).map(Je.normalizeUnit)
                  , o = t.valueOf() > this.valueOf()
                  , r = tn(o ? this : t, o ? t : this, s, i);
                var a;
                return o ? r.negate() : r
            }
            diffNow(t="milliseconds", e={}) {
                return this.diff(ti.now(), t, e)
            }
            until(t) {
                return this.isValid ? Ge.fromDateTimes(this, t) : this
            }
            hasSame(t, e) {
                if (!this.isValid)
                    return !1;
                const n = t.valueOf()
                  , i = this.setZone(t.zone, {
                    keepLocalTime: !0
                });
                return i.startOf(e) <= n && n <= i.endOf(e)
            }
            equals(t) {
                return this.isValid && t.isValid && this.valueOf() === t.valueOf() && this.zone.equals(t.zone) && this.loc.equals(t.loc)
            }
            toRelative(t={}) {
                if (!this.isValid)
                    return null;
                const e = t.base || ti.fromObject({}, {
                    zone: this.zone
                })
                  , n = t.padding ? this < e ? -t.padding : t.padding : 0;
                let i = ["years", "months", "days", "hours", "minutes", "seconds"]
                  , s = t.unit;
                return Array.isArray(t.unit) && (i = t.unit,
                s = void 0),
                Qn(e, this.plus(n), {
                    ...t,
                    numeric: "always",
                    units: i,
                    unit: s
                })
            }
            toRelativeCalendar(t={}) {
                return this.isValid ? Qn(t.base || ti.fromObject({}, {
                    zone: this.zone
                }), this, {
                    ...t,
                    numeric: "auto",
                    units: ["years", "months", "days"],
                    calendary: !0
                }) : null
            }
            static min(...t) {
                if (!t.every(ti.isDateTime))
                    throw new c("min requires all arguments be DateTimes");
                return gt(t, (t=>t.valueOf()), Math.min)
            }
            static max(...t) {
                if (!t.every(ti.isDateTime))
                    throw new c("max requires all arguments be DateTimes");
                return gt(t, (t=>t.valueOf()), Math.max)
            }
            static fromFormatExplain(t, e, n={}) {
                const {locale: i=null, numberingSystem: s=null} = n;
                return vn(X.fromOpts({
                    locale: i,
                    numberingSystem: s,
                    defaultToEN: !0
                }), t, e)
            }
            static fromStringExplain(t, e, n={}) {
                return ti.fromFormatExplain(t, e, n)
            }
            static get DATE_SHORT() {
                return m
            }
            static get DATE_MED() {
                return f
            }
            static get DATE_MED_WITH_WEEKDAY() {
                return g
            }
            static get DATE_FULL() {
                return v
            }
            static get DATE_HUGE() {
                return y
            }
            static get TIME_SIMPLE() {
                return b
            }
            static get TIME_WITH_SECONDS() {
                return _
            }
            static get TIME_WITH_SHORT_OFFSET() {
                return w
            }
            static get TIME_WITH_LONG_OFFSET() {
                return k
            }
            static get TIME_24_SIMPLE() {
                return x
            }
            static get TIME_24_WITH_SECONDS() {
                return T
            }
            static get TIME_24_WITH_SHORT_OFFSET() {
                return E
            }
            static get TIME_24_WITH_LONG_OFFSET() {
                return D
            }
            static get DATETIME_SHORT() {
                return S
            }
            static get DATETIME_SHORT_WITH_SECONDS() {
                return O
            }
            static get DATETIME_MED() {
                return C
            }
            static get DATETIME_MED_WITH_SECONDS() {
                return L
            }
            static get DATETIME_MED_WITH_WEEKDAY() {
                return M
            }
            static get DATETIME_FULL() {
                return I
            }
            static get DATETIME_FULL_WITH_SECONDS() {
                return A
            }
            static get DATETIME_HUGE() {
                return N
            }
            static get DATETIME_HUGE_WITH_SECONDS() {
                return F
            }
        }
        function ei(t) {
            if (ti.isDateTime(t))
                return t;
            if (t && t.valueOf && pt(t.valueOf()))
                return ti.fromJSDate(t);
            if (t && "object" == typeof t)
                return ti.fromObject(t);
            throw new c(`Unknown datetime argument: ${t}, of type ${typeof t}`)
        }
        class ni {
            constructor(t) {
                this._translations = t
            }
            get(t) {
                return this._translations[t]
            }
            has(t) {
                return t in this._translations
            }
        }
        class ii {
            constructor(t) {
                this._configurations = t
            }
            get(t) {
                return this._configurations[t]
            }
            has(t) {
                return t in this._configurations
            }
            isRTL() {
                return "rtl" === this.get("direction")
            }
            getLanguage() {
                return this.get("locale").replace("_", "-")
            }
            is24Hours() {
                return !!this.get("twentyFourHours")
            }
            getFirstDayOfWeek() {
                let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                void 0 === t && (t = !0);
                let e = this.get("first_dow_iso");
                return t || (e %= 7),
                e
            }
        }
        class si {
            init() {}
            getId() {
                return null
            }
            setContainer(t) {
                if (!(t instanceof oi))
                    throw new Error("Plugin was given an invalid KimaiContainer");
                this._core = t
            }
            getContainer() {
                return this._core
            }
            getConfiguration(t) {
                return this.getContainer().getConfiguration().get(t)
            }
            getConfigurations() {
                return this.getContainer().getConfiguration()
            }
            getDateUtils() {
                return this.getPlugin("date")
            }
            getPlugin(t) {
                return this.getContainer().getPlugin(t)
            }
            getTranslation() {
                return this.getContainer().getTranslation()
            }
            translate(t) {
                return this.getTranslation().get(t)
            }
            escape(t) {
                return this.getPlugin("escape").escapeForHtml(t)
            }
            trigger(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.getPlugin("event").trigger(t, e)
            }
            fetch(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.getPlugin("fetch").fetch(t, e)
            }
            fetchForm(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                n = n || t.getAttribute("action");
                const i = t.getAttribute("method").toUpperCase();
                if ("GET" === i) {
                    const i = this.getPlugin("form").convertFormDataToQueryString(t, {}, !0);
                    n = n + (n.includes("?") ? "&" : "?") + i,
                    e = {
                        method: "GET",
                        ...e
                    }
                } else
                    "POST" === i && (e = {
                        method: "POST",
                        body: new FormData(t),
                        ...e
                    });
                return this.fetch(n, e)
            }
            isMobile() {
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 576
            }
        }
        class oi {
            constructor(t, e) {
                if (!(t instanceof ii))
                    throw new Error("Configuration needs to a KimaiConfiguration instance");
                if (this._configuration = t,
                !(e instanceof ni))
                    throw new Error("Configuration needs to a KimaiTranslation instance");
                this._translation = e,
                this._plugins = []
            }
            registerPlugin(t) {
                if (!(t instanceof si))
                    throw new Error("Invalid plugin given, needs to be a KimaiPlugin instance");
                return t.setContainer(this),
                this._plugins.push(t),
                t
            }
            getPlugin(t) {
                for (let e of this._plugins)
                    if (null !== e.getId() && e.getId() === t)
                        return e;
                throw new Error("Unknown plugin: " + t)
            }
            getPlugins() {
                return this._plugins
            }
            getTranslation() {
                return this._translation
            }
            getConfiguration() {
                return this._configuration
            }
            getUser() {
                return this.getPlugin("user")
            }
        }
        class ri extends si {
            constructor(t) {
                super(),
                this.dataAttribute = t
            }
            getId() {
                return "datatable-column-visibility"
            }
            init() {
                let t = document.querySelector("[" + this.dataAttribute + "]");
                if (null !== t) {
                    this._id = t.getAttribute(this.dataAttribute),
                    this._modal = document.getElementById("modal_" + this._id),
                    this._modal.addEventListener("show.bs.modal", (()=>{
                        this._evaluateCheckboxes()
                    }
                    )),
                    this._modal.querySelector("button[data-type=save]").addEventListener("click", (()=>{
                        this._saveVisibility()
                    }
                    )),
                    this._modal.querySelector("button[data-type=reset]").addEventListener("click", (t=>{
                        this._resetVisibility(t.currentTarget)
                    }
                    )),
                    this._modal.querySelectorAll("input[name=datatable_profile]").forEach((t=>{
                        t.addEventListener("change", (()=>{
                            const e = this._modal.getElementsByTagName("form")[0];
                            this.fetchForm(e, {}, t.getAttribute("data-href")).then((()=>{
                                localStorage.setItem("kimai_profile", t.getAttribute("value")),
                                document.location.reload()
                            }
                            )).catch((()=>{
                                e.setAttribute("action", t.getAttribute("data-href")),
                                e.submit()
                            }
                            ))
                        }
                        ))
                    }
                    ));
                    for (let t of this._modal.querySelectorAll("form input[type=checkbox]"))
                        t.addEventListener("change", (()=>{
                            this._changeVisibility(t.getAttribute("name"), t.checked)
                        }
                        ))
                }
            }
            _evaluateCheckboxes() {
                const t = this._modal.getElementsByTagName("form")[0]
                  , e = document.getElementsByClassName("datatable_" + this._id)[0];
                for (let n of e.getElementsByTagName("th")) {
                    const e = n.getAttribute("data-field");
                    if (null === e)
                        continue;
                    const i = t.querySelector("input[name=" + e + "]");
                    null !== i && (i.checked = "none" !== window.getComputedStyle(n).display)
                }
            }
            _saveVisibility() {
                const t = this._modal.getElementsByTagName("form")[0];
                this.fetchForm(t).then((()=>{
                    document.location.reload()
                }
                )).catch((()=>{
                    t.submit()
                }
                ))
            }
            _resetVisibility(t) {
                const e = this._modal.getElementsByTagName("form")[0];
                this.fetchForm(e, {}, t.getAttribute("formaction")).then((()=>{
                    document.location.reload()
                }
                )).catch((()=>{
                    e.setAttribute("action", t.getAttribute("formaction")),
                    e.submit()
                }
                ))
            }
            _changeVisibility(t, e) {
                for (const n of document.getElementsByClassName("datatable_" + this._id)) {
                    let i = null;
                    for (let s of n.getElementsByClassName("col_" + t)) {
                        if (null === i) {
                            let t = "-none"
                              , n = "d-table-cell";
                            e || (t = "-table-cell",
                            n = "d-none"),
                            i = "",
                            s.classList.forEach((function(e, n, s) {
                                -1 === e.indexOf(t) && (i += " " + e)
                            }
                            )),
                            -1 === i.indexOf(n) && (i += " " + n)
                        }
                        s.className = i
                    }
                }
            }
        }
        var ai = n(3138);
        class li extends si {
            init() {
                [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]')).map((function(t) {
                    return new ai.u(t)
                }
                ));
                this.getContainer().getPlugin("form").activateForm("div.page-wrapper form"),
                this._registerModalAutofocus("#remote_form_modal"),
                this.overlay = null,
                document.addEventListener("kimai.reloadContent", (t=>{
                    if (null !== this.overlay)
                        return;
                    let e = "body";
                    void 0 !== t.detail && null !== t.detail && (e = t.detail);
                    const n = document.createElement("div");
                    n.innerHTML = '<div class="overlay"><div class="fas fa-sync fa-spin"></div></div>',
                    this.overlay = n.firstElementChild,
                    document.querySelector(e).append(this.overlay)
                }
                )),
                document.addEventListener("kimai.reloadedContent", (()=>{
                    null !== this.overlay && (this.overlay.remove(),
                    this.overlay = null)
                }
                ))
            }
            _registerModalAutofocus(t) {
                if (this.isMobile())
                    return;
                const e = document.querySelector(t);
                null !== e && e.addEventListener("shown.bs.modal", (()=>{
                    const t = e.querySelector("form");
                    let n = t.querySelectorAll("[autofocus]");
                    n.length < 1 && (n = t.querySelectorAll("input[type=text],input[type=date],textarea,select")),
                    n.length > 0 && n[0].focus()
                }
                ))
            }
        }
        var ci = n(7466);
        n(991);
        class ui extends si {
            supportsForm(t) {
                return !1
            }
            activateForm(t) {}
            destroyForm(t) {}
        }
        class di extends ui {
            constructor(t) {
                super(),
                this._selector = t
            }
            init() {
                window.disableLitepickerStyles = !0,
                this._pickers = []
            }
            supportsForm(t) {
                return !0
            }
            activateForm(t) {
                const e = this.getConfigurations().getFirstDayOfWeek(!1)
                  , n = this.getConfigurations().getLanguage();
                let i = {
                    buttonText: {
                        previousMonth: '<i class="fas fa-chevron-left"></i>',
                        nextMonth: '<i class="fas fa-chevron-right"></i>',
                        apply: this.translate("confirm"),
                        cancel: this.translate("cancel")
                    }
                };
                const s = [].slice.call(t.querySelectorAll(this._selector)).map((t=>(void 0 === t.dataset.format && console.log("Trying to bind litepicker to an element without data-format attribute"),
                i = {
                    ...i,
                    format: t.dataset.format,
                    showTooltip: !1,
                    element: t,
                    lang: n,
                    autoRefresh: !0,
                    firstDay: e,
                    setup: e=>{
                        e.on("preselect", ((t,n)=>{
                            e._wasPreselected = !0
                        }
                        )),
                        e.on("selected", ((n,i)=>{
                            void 0 !== e._wasPreselected && (t.dispatchEvent(new Event("change",{
                                bubbles: !0
                            })),
                            delete e._wasPreselected)
                        }
                        )),
                        void 0 !== e.backdrop && document.body.appendChild(e.backdrop)
                    }
                },
                [t, new ci.Litepicker(this.prepareOptions(i))])));
                this._pickers = this._pickers.concat(s)
            }
            prepareOptions(t) {
                return {
                    ...t,
                    plugins: ["mobilefriendly"]
                }
            }
            destroyForm(t) {
                [].slice.call(t.querySelectorAll(this._selector)).map((t=>{
                    for (let e = 0; e < this._pickers.length; e++)
                        this._pickers[e][0] === t && (this._pickers[e][1].destroy(),
                        this._pickers.splice(e, 1))
                }
                ))
            }
        }
        class hi extends di {
            prepareOptions(t) {
                return {
                    ...t,
                    plugins: ["mobilefriendly"],
                    singleMode: !1,
                    autoRefresh: !0
                }
            }
        }
        var pi = n(3187);
        class mi extends si {
            constructor(t, e) {
                super(),
                this._contentArea = t,
                this._selector = e
            }
            getId() {
                return "datatable"
            }
            init() {
                const t = document.querySelector(this._selector);
                if (null === t)
                    return;
                this.registerContextMenu(this._selector);
                const e = t.dataset.reloadEvent;
                if (void 0 === e)
                    return;
                const n = ()=>{
                    this.reloadDatatable()
                }
                ;
                for (let t of e.split(" "))
                    document.addEventListener(t, n);
                document.addEventListener("pagination-change", n),
                document.addEventListener("filter-change", n)
            }
            registerContextMenu(t) {
                pi.Z.createForDataTable(t)
            }
            reloadDatatable() {
                const t = this.getContainer().getPlugin("toolbar").getSelector()
                  , e = document.querySelector(t)
                  , n = t=>{
                    const e = document.createElement("div");
                    e.innerHTML = t;
                    const n = e.querySelector(this._contentArea);
                    document.querySelector(this._contentArea).replaceWith(n),
                    this.registerContextMenu(this._selector),
                    document.dispatchEvent(new Event("kimai.reloadedContent"))
                }
                ;
                document.dispatchEvent(new CustomEvent("kimai.reloadContent",{
                    detail: this._contentArea
                })),
                null !== e ? this.fetchForm(e).then((t=>{
                    t.text().then(n)
                }
                )).catch((()=>{
                    e.submit()
                }
                )) : this.fetch(document.location).then((t=>{
                    t.text().then(n)
                }
                )).catch((()=>{
                    document.location.reload()
                }
                ))
            }
        }
        class fi extends si {
            constructor(t, e) {
                super(),
                this._formSelector = t,
                this._actionClass = e
            }
            getId() {
                return "toolbar"
            }
            init() {
                const t = this.getSelector();
                this._registerPagination(t),
                this._registerSortableTables(t),
                this._registerAlternativeSubmitActions(t, this._actionClass),
                [].slice.call(document.querySelectorAll(t + " input")).map((e=>{
                    e.addEventListener("change", (e=>{
                        switch (e.target.id) {
                        case "order":
                        case "orderBy":
                        case "page":
                            break;
                        default:
                            document.querySelector(t + " input#page").value = 1
                        }
                    }
                    )),
                    this.triggerChange()
                }
                )),
                [].slice.call(document.querySelectorAll(t + " select")).map((e=>{
                    e.addEventListener("change", (e=>{
                        let n = !0;
                        switch (e.target.id) {
                        case "customer":
                            null !== document.querySelector(t + " select#project") && (n = !1);
                            break;
                        case "project":
                            null !== document.querySelector(t + " select#activity") && (n = !1)
                        }
                        document.querySelector(t + " input#page").value = 1,
                        n && this.triggerChange()
                    }
                    ))
                }
                ))
            }
            _registerAlternativeSubmitActions(t, e) {
                document.addEventListener("click", (function(n) {
                    let i = n.target;
                    for (; null !== i && "function" == typeof i.matches && !i.matches("body"); ) {
                        if (i.classList.contains(e)) {
                            const e = document.querySelector(t);
                            if (null === e)
                                return;
                            const s = e.getAttribute("action")
                              , o = e.getAttribute("method");
                            void 0 !== i.dataset.target && (e.target = i.dataset.target),
                            e.action = i.href,
                            void 0 !== i.dataset.method && (e.method = i.dataset.method),
                            e.submit(),
                            e.target = "",
                            e.action = s,
                            e.method = o,
                            n.preventDefault(),
                            n.stopPropagation()
                        }
                        i = i.parentNode
                    }
                }
                ))
            }
            _registerSortableTables(t) {
                document.body.addEventListener("click", (e=>{
                    if (!e.target.matches("th.sortable"))
                        return;
                    let n = "DESC"
                      , i = e.target.dataset.order;
                    e.target.classList.contains("sorting_desc") && (n = "ASC"),
                    document.querySelector(t + " #orderBy").value = i,
                    document.querySelector(t + " #order").value = n,
                    document.querySelector(t + " #orderBy").dispatchEvent(new Event("change")),
                    document.querySelector(t + " #order").dispatchEvent(new Event("change")),
                    document.dispatchEvent(new Event("filter-change"))
                }
                ))
            }
            _registerPagination(t) {
                document.body.addEventListener("click", (e=>{
                    if (!(e.target.matches("ul.pagination li a") || null !== e.target.parentNode && e.target.parentNode.matches("ul.pagination li a")))
                        return;
                    let n = document.querySelector(t + " input#page");
                    if (null === n)
                        return;
                    let i = e.target;
                    i.matches("a") || (i = i.parentNode),
                    e.preventDefault(),
                    e.stopPropagation();
                    let s = i.href.split("/")
                      , o = s[s.length - 1];
                    return /\d/.test(o) || (o = 1),
                    n.value = o,
                    n.dispatchEvent(new Event("change")),
                    document.dispatchEvent(new Event("pagination-change")),
                    !1
                }
                ))
            }
            triggerChange() {
                document.dispatchEvent(new Event("toolbar-change"))
            }
            getSelector() {
                return this._formSelector
            }
        }
        class gi extends si {
            getId() {
                return "api"
            }
            _headers() {
                const t = new Headers;
                return t.append("X-AUTH-SESSION", "1"),
                t.append("Content-Type", "application/json"),
                t
            }
            get(t, e, n, i) {
                if (void 0 !== e) {
                    const n = new URLSearchParams(e).toString();
                    "" !== n && (t = t + (t.includes("?") ? "&" : "?") + n)
                }
                void 0 === i && (i = t=>{
                    this.handleError("An error occurred", t)
                }
                ),
                this.fetch(t, {
                    method: "GET",
                    headers: this._headers()
                }).then((t=>{
                    t.json().then((t=>{
                        n(t)
                    }
                    ))
                }
                )).catch((t=>{
                    i(t)
                }
                ))
            }
            post(t, e, n, i) {
                void 0 === i && (i = t=>{
                    this.handleError("action.update.error", t)
                }
                ),
                this.fetch(t, {
                    method: "POST",
                    body: this._parseData(e),
                    headers: this._headers()
                }).then((t=>{
                    t.json().then((t=>{
                        n(t)
                    }
                    ))
                }
                )).catch((t=>{
                    i(t)
                }
                ))
            }
            patch(t, e, n, i) {
                void 0 === i && (i = t=>{
                    this.handleError("action.update.error", t)
                }
                ),
                this.fetch(t, {
                    method: "PATCH",
                    body: this._parseData(e),
                    headers: this._headers()
                }).then((t=>{
                    204 === t.statusCode ? n() : t.json().then((t=>{
                        n(t)
                    }
                    ))
                }
                )).catch((t=>{
                    i(t)
                }
                ))
            }
            delete(t, e, n) {
                void 0 === n && (n = t=>{
                    this.handleError("action.delete.error", t)
                }
                ),
                this.fetch(t, {
                    method: "DELETE",
                    headers: this._headers()
                }).then((()=>{
                    e()
                }
                )).catch((t=>{
                    n(t)
                }
                ))
            }
            _parseData(t) {
                return "object" == typeof t ? JSON.stringify(t) : t
            }
            handleError(t, e) {
                if (void 0 === e.headers)
                    return;
                const n = e.headers.get("content-type");
                n && -1 !== n.indexOf("application/json") ? e.json().then((n=>{
                    let i = n.message;
                    if (400 === e.status && n.errors) {
                        let t = ["<u>" + i + "</u>"];
                        if (n.errors.errors)
                            for (let e of n.errors.errors)
                                t.push(e);
                        if (n.errors.children)
                            for (let e in n.errors.children) {
                                let i = n.errors.children[e];
                                if (void 0 !== i.errors && i.errors.length > 0)
                                    for (let e of i.errors)
                                        t.push(e)
                            }
                        t.length > 0 && (i = t)
                    }
                    this.getPlugin("alert").error(t, i)
                }
                )) : e.text().then((()=>{
                    const n = "[" + e.statusCode + "] " + e.statusText;
                    this.getPlugin("alert").error(t, n)
                }
                ))
            }
        }
        class vi extends si {
            addClickHandler(t, e) {
                document.body.addEventListener("click", (n=>{
                    let i = n.target;
                    for (; null !== i; ) {
                        const e = i.tagName.toUpperCase();
                        if ("BODY" === e)
                            return;
                        if (i.matches(t))
                            break;
                        if ("A" === e || "BUTTON" === e || "INPUT" === e || "LABEL" === e)
                            return;
                        i = i.parentNode
                    }
                    if (null === i)
                        return;
                    if (i.isContentEditable || i.parentNode.isContentEditable)
                        return;
                    if (!i.matches(t))
                        return;
                    n.preventDefault(),
                    n.stopPropagation();
                    let s = i.dataset.href;
                    null == s && (s = i.href),
                    null != s && "" !== s && e(s)
                }
                ))
            }
        }
        class yi extends vi {
            constructor(t) {
                super(),
                this._selector = t
            }
            init() {
                this.addClickHandler(this._selector, (function(t) {
                    window.location = t
                }
                ))
            }
        }
        class bi extends vi {
            constructor(t) {
                super(),
                this._selector = t
            }
            getId() {
                return "modal"
            }
            init() {
                this._isDirty = !1;
                const t = this._getModalElement();
                null !== t && (t.addEventListener("hide.bs.modal", (e=>{
                    if (this._isDirty) {
                        if (null === t.querySelector(".modal-body .remote_modal_is_dirty_warning")) {
                            const e = this.translate("modal.dirty")
                              , n = document.createElement("div");
                            n.innerHTML = '<p class="text-danger small remote_modal_is_dirty_warning">' + e + "</p>",
                            t.querySelector(".modal-body").prepend(n.firstElementChild)
                        }
                        e.preventDefault()
                    } else
                        this._isDirty = !1,
                        document.dispatchEvent(new Event("modal-hide"))
                }
                )),
                t.addEventListener("hidden.bs.modal", (()=>{
                    this.getContainer().getPlugin("form").destroyForm(this._getFormIdentifier()),
                    t.querySelector(".modal-body").replaceWith("")
                }
                )),
                t.addEventListener("show.bs.modal", (()=>{
                    document.dispatchEvent(new Event("modal-show"))
                }
                )),
                this.addClickHandler(this._selector, (t=>{
                    this.openUrlInModal(t)
                }
                )))
            }
            _getModal() {
                return ai.u_.getOrCreateInstance(this._getModalElement())
            }
            openUrlInModal(t, e) {
                const n = new Headers;
                n.append("X-Requested-With", "Kimai-Modal"),
                this.fetch(t, {
                    method: "GET",
                    redirect: "follow",
                    headers: n
                }).then((e=>{
                    if (e.ok)
                        return e.text().then((t=>{
                            this._openFormInModal(t)
                        }
                        ));
                    window.location = t
                }
                )).catch((n=>{
                    null == e ? window.location = t : e(n)
                }
                ))
            }
            _getFormIdentifier() {
                return "#remote_form_modal .modal-content form"
            }
            _getModalElement() {
                return document.getElementById("remote_form_modal")
            }
            _makeScriptExecutable(t) {
                if (void 0 !== t.tagName && "SCRIPT" === t.tagName) {
                    const e = document.createElement("script");
                    e.text = t.innerHTML,
                    t.parentNode.replaceChild(e, t)
                } else
                    for (const e of t.childNodes)
                        this._makeScriptExecutable(e);
                return t
            }
            _openFormInModal(t) {
                const e = this._getFormIdentifier();
                let n = this._getModalElement();
                const i = document.createElement("div");
                i.innerHTML = t;
                const s = this._makeScriptExecutable(i.querySelector("#form_modal .modal-content"));
                if (null !== s) {
                    let t = n.querySelector(".modal-dialog")
                      , o = i.querySelector(".modal-dialog").classList.contains("modal-lg");
                    o && !t.classList.contains("modal-lg") && t.classList.toggle("modal-lg"),
                    !o && t.classList.contains("modal-lg") && t.classList.toggle("modal-lg"),
                    n.querySelector(".modal-content").replaceWith(s),
                    [].slice.call(n.querySelectorAll('[data-bs-dismiss="modal"]')).map((t=>{
                        t.addEventListener("click", (()=>{
                            this._isDirty = !1,
                            this._getModal().hide()
                        }
                        ))
                    }
                    )),
                    this.getContainer().getPlugin("form").activateForm(e)
                }
                let o = i.querySelector("div.alert");
                null !== o && n.querySelector(".modal-body").prepend(o);
                const r = document.querySelector(e);
                r.addEventListener("change", (()=>{
                    this._isDirty = !0
                }
                )),
                r.addEventListener("submit", this._getEventHandler()),
                this._getModal().show()
            }
            _getEventHandler() {
                return void 0 === this.eventHandler && (this.eventHandler = t=>{
                    const e = t.target;
                    if (void 0 !== e.target && "" !== e.target)
                        return !0;
                    const n = document.querySelector(this._getFormIdentifier() + " button[type=submit]");
                    n.textContent = n.textContent + " …",
                    n.disabled = !0;
                    const i = e.dataset.formEvent
                      , s = this.getContainer().getPlugin("event")
                      , o = this.getContainer().getPlugin("alert");
                    t.preventDefault(),
                    t.stopPropagation();
                    const r = new Headers;
                    r.append("X-Requested-With", "Kimai-Modal");
                    const a = {
                        headers: r
                    };
                    this.fetchForm(e, a).then((t=>{
                        t.text().then((t=>{
                            const r = document.createElement("div");
                            r.innerHTML = t;
                            let a = !1
                              , l = !1
                              , c = !1;
                            n.textContent = n.textContent.replace(" …", ""),
                            n.disabled = !1;
                            const u = r.querySelector("#form_modal .modal-content");
                            if (null !== u && (a = null !== u.querySelector(".is-invalid"),
                            a || (a = null !== u.querySelector(".invalid-feedback")),
                            l = null !== u.querySelector("ul.list-unstyled li.text-danger"),
                            c = null !== r.querySelector("div.alert-danger")),
                            a || l || c)
                                this._openFormInModal(t);
                            else {
                                s.trigger(i);
                                let t = e.dataset.msgSuccess;
                                null != t && "" !== t || (t = "action.update.success"),
                                this._isDirty = !1,
                                this._getModal().hide(),
                                o.success(t)
                            }
                        }
                        ))
                    }
                    )).catch((t=>{
                        let i = e.dataset.msgError;
                        null != i && "" !== i || (i = "action.update.error"),
                        o.error(i, t.message),
                        setTimeout((()=>{
                            n.textContent = n.textContent.replace(" …", ""),
                            n.disabled = !1
                        }
                        ), 1500)
                    }
                    ))
                }
                ),
                this.eventHandler
            }
        }
        class _i extends si {
            constructor() {
                super(),
                this._selector = ".ticktac-menu",
                this._selectorEmpty = ".ticktac-menu-empty",
                this._favIconUrl = null
            }
            getId() {
                return "active-records"
            }
            init() {
                if (null === document.querySelector(this._selector))
                    return;
                const t = ()=>{
                    this.reloadActiveRecords()
                }
                ;
                document.addEventListener("kimai.timesheetUpdate", t),
                document.addEventListener("kimai.timesheetDelete", t),
                document.addEventListener("kimai.activityUpdate", t),
                document.addEventListener("kimai.activityDelete", t),
                document.addEventListener("kimai.projectUpdate", t),
                document.addEventListener("kimai.projectDelete", t),
                document.addEventListener("kimai.customerUpdate", t),
                document.addEventListener("kimai.customerDelete", t),
                this._updateBrowserTitle = !!this.getConfiguration("updateBrowserTitle");
                const e = ()=>{
                    this._updateDuration()
                }
                ;
                this._updatesHandler = setInterval(e, 1e4),
                document.addEventListener("kimai.timesheetUpdate", e),
                document.addEventListener("kimai.reloadedContent", e)
            }
            _updateDuration() {
                const t = document.querySelectorAll('[data-since]:not([data-since=""])');
                if (this._updateBrowserTitle && this._changeFavicon(t.length > 0),
                0 === t.length)
                    return void (this._updateBrowserTitle && (void 0 === document.body.dataset.title ? this._updateBrowserTitle = !1 : document.title = document.body.dataset.title));
                const e = this.getDateUtils();
                let n = [];
                for (const i of t) {
                    const t = e.formatDuration(i.dataset.since);
                    void 0 !== i.dataset.replacer && null !== i.dataset.title && "?" !== t && n.push(t),
                    i.textContent = t
                }
                0 !== n.length && this._updateBrowserTitle && (document.title = n.shift())
            }
            _setEntries(t) {
                const e = t.length > 0;
                for (let t of document.querySelectorAll(this._selectorEmpty))
                    t.style.display = e ? "none" : "inline-block";
                for (let n of document.querySelectorAll(this._selector)) {
                    if (n.style.display = e ? "inline-block" : "none",
                    !e)
                        for (let t of n.querySelectorAll("[data-since]"))
                            t.dataset.since = "";
                    const i = n.querySelector(".ticktac-stop");
                    e ? (i && (i.accesskey = "s"),
                    this._replaceInNode(n, t[0])) : i && (i.accesskey = null)
                }
                this._updateDuration()
            }
            _replaceInNode(t, e) {
                const n = this.getDateUtils()
                  , i = t.querySelectorAll("[data-replacer]");
                for (let s of i) {
                    const i = s.dataset.replacer;
                    "url" === i ? s.dataset.href = t.dataset.href.replace("000", e.id) : "activity" === i ? s.innerText = e.activity.name : "project" === i ? s.innerText = e.project.name : "customer" === i ? s.innerText = e.project.customer.name : "duration" === i && (s.dataset.since = e.begin,
                    s.innerText = n.formatDuration(e.duration))
                }
            }
            reloadActiveRecords() {
                const t = this.getContainer().getPlugin("api")
                  , e = document.querySelector(this._selector).dataset.api;
                t.get(e, {}, (t=>{
                    this._setEntries(t)
                }
                ))
            }
            _changeFavicon(t) {
                const e = document.createElement("canvas")
                  , n = document.getElementById("favicon");
                null === this._favIconUrl && (this._favIconUrl = n.href);
                const i = n.cloneNode(!0);
                if (e.getContext && i) {
                    const s = window.devicePixelRatio
                      , o = document.createElement("img");
                    e.height = e.width = 16 * s,
                    o.onload = function() {
                        const o = e.getContext("2d");
                        if (o.drawImage(this, 0, 0, e.width, e.height),
                        t) {
                            const t = 5.5 * s;
                            o.fillStyle = "rgb(182,57,57)",
                            o.fillRect(e.width / 2 - t / 2, e.height / 2 - t / 2, t, t)
                        }
                        i.href = e.toDataURL("image/png"),
                        n.remove(),
                        document.head.appendChild(i)
                    }
                    ,
                    o.src = this._favIconUrl
                }
            }
        }
        class wi extends si {
            getId() {
                return "event"
            }
            trigger(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                if ("" !== t)
                    for (const n of t.split(" ")) {
                        let t = new Event(n);
                        null !== e && (t = new CustomEvent(n,{
                            detail: e
                        })),
                        document.dispatchEvent(t)
                    }
            }
        }
        class ki extends si {
            constructor(t) {
                super(),
                this._selector = t
            }
            init() {
                document.addEventListener("click", (t=>{
                    let e = t.target;
                    for (; null !== e && "function" == typeof e.matches && !e.matches("body"); ) {
                        if (e.classList.contains(this._selector)) {
                            const n = e.dataset;
                            let i = n.href;
                            i || (i = e.getAttribute("href")),
                            void 0 !== n.question ? this.getContainer().getPlugin("alert").question(n.question, (t=>{
                                t && this._callApi(i, n)
                            }
                            )) : this._callApi(i, n),
                            t.preventDefault(),
                            t.stopPropagation()
                        }
                        e = e.parentNode
                    }
                }
                ))
            }
            _callApi(t, e) {
                const n = e.method
                  , i = e.event
                  , s = this.getContainer().getPlugin("api")
                  , o = this.getContainer().getPlugin("event")
                  , r = this.getContainer().getPlugin("alert")
                  , a = ()=>{
                    o.trigger(i),
                    void 0 !== e.msgSuccess && r.success(e.msgSuccess)
                }
                  , l = t=>{
                    let n = "action.update.error";
                    void 0 !== e.msgError && (n = e.msgError),
                    s.handleError(n, t)
                }
                ;
                let c = {};
                if (void 0 !== e.payload && (c = e.payload),
                "PATCH" === n)
                    s.patch(t, c, a, l);
                else if ("POST" === n) {
                    let e = {};
                    s.post(t, e, a, l)
                } else
                    "DELETE" === n ? s.delete(t, a, l) : "GET" === n && s.get(t, c, a, l)
            }
        }
        class xi extends si {
            getId() {
                return "alert"
            }
            error(t, e) {
                const n = this.getTranslation();
                n.has(t) && (t = n.get(t)),
                t = t.replace("%reason%", ""),
                void 0 === e && (e = null),
                null !== e && (n.has(e) && (e = n.get(e)),
                Array.isArray(e) && (e = e.join("<br>")));
                const i = "alert_global_error"
                  , s = document.getElementById(i);
                null !== s && ai.u_.getOrCreateInstance(s).hide();
                const o = '\n            <div class="modal modal-blur fade" id="' + i + '" tabindex="-1" role="dialog">\n                <div class="modal-dialog modal-sm modal-dialog-centered" role="document">\n                    <div class="modal-content">\n                        <div class="modal-status bg-' + this._mapClass("danger") + '"></div>\n                        <div class="modal-body text-center py-4">\n                            <i class="fas fa-exclamation-circle fa-3x mb-3 text-danger"></i>\n                            <h2>' + t + "</h2>\n                            " + (null !== e ? '<div class="text-muted">' + e + "</div>" : "") + '\n                        </div>\n                        <div class="modal-footer">\n                            <div class="w-100">\n                                <div class="row">\n                                    <div class="col text-center"><a href="#" class="btn btn-primary" data-bs-dismiss="modal">' + n.get("close") + "</a></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
                this._showModal(o)
            }
            warning(t) {
                this._show("warning", t)
            }
            success(t) {
                this._toast("success", t)
            }
            info(t) {
                this._show("info", t)
            }
            _showModal(t) {
                const e = document.body
                  , n = document.createElement("template");
                n.innerHTML = t.trim();
                const i = n.content.firstChild;
                e.appendChild(i);
                const s = new ai.u_(i);
                i.addEventListener("hidden.bs.modal", (function() {
                    e.removeChild(i)
                }
                )),
                s.show()
            }
            _show(t, e) {
                const n = this.getTranslation();
                n.has(e) && (e = n.get(e));
                const i = '\n            <div class="modal modal-blur fade" tabindex="-1" role="dialog">\n                <div class="modal-dialog modal-sm modal-dialog-centered" role="document">\n                    <div class="modal-content">\n                        <div class="modal-status bg-' + this._mapClass(t) + '"></div>\n                        <div class="modal-body text-center py-4">\n                            <i class="fas fa-exclamation-circle fa-3x mb-3 text-' + this._mapClass(t) + '"></i>\n                            <h2>' + e + '</h2>\n                        </div>\n                        <div class="modal-footer">\n                            <div class="w-100">\n                                <div class="row">\n                                    <div class="col text-center"><a href="#" class="btn btn-primary" data-bs-dismiss="modal">' + n.get("close") + "</a></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
                this._showModal(i)
            }
            _mapClass(t) {
                return "info" === t || "success" === t || "warning" === t || "danger" === t ? t : "error" === t ? "danger" : "primary"
            }
            _toast(t, e) {
                const n = this.getTranslation();
                n.has(e) && (e = n.get(e));
                let i = '<i class="fas fa-info me-2"></i>';
                "success" === t ? i = '<i class="fas fa-check me-2"></i>' : "warning" === t ? i = '<i class="fas fa-exclamation me-2"></i>' : "danger" !== t && "error" !== t || (i = '<i class="fas fa-exclamation-circle me-2"></i>');
                const s = '<div class="toast align-items-center text-white bg-' + this._mapClass(t) + ' border-0" data-bs-delay="2000" role="alert" aria-live="assertive" aria-atomic="true">\n            <div class="d-flex">\n                <div class="toast-body">\n                    ' + i + " " + e + '\n                </div>\n                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="' + n.get("close") + '"></button>\n            </div>\n        </div>'
                  , o = document.getElementById("toast-container")
                  , r = document.createElement("template");
                r.innerHTML = s.trim();
                const a = r.content.firstChild;
                o.appendChild(a);
                const l = new ai.FN(a);
                a.addEventListener("hidden.bs.toast", (function() {
                    o.removeChild(a)
                }
                )),
                l.show()
            }
            question(t, e) {
                const n = this.getTranslation();
                n.has(t) && (t = n.get(t));
                const i = this._mapClass("info")
                  , s = '\n            <div class="modal modal-blur fade" tabindex="-1" role="dialog" data-bs-backdrop="static">\n                <div class="modal-dialog modal-sm modal-dialog-centered" role="document">\n                    <div class="modal-content">\n                        <div class="modal-status bg-' + i + '"></div>\n                        <div class="modal-body text-center py-4">\n                            <i class="fas fa-question fa-3x mb-3 text-' + i + '"></i>\n                            <h2>' + t + '</h2>\n                        </div>\n                        <div class="modal-footer">\n                            <div class="w-100">\n                                <div class="row">\n                                    <div class="col"><a href="#" class="question-confirm btn btn-primary w-100" data-bs-dismiss="modal">' + n.get("confirm") + '</a></div>\n                                    <div class="col"><a href="#" class="question-cancel btn w-100" data-bs-dismiss="modal">' + n.get("cancel") + "</a></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "
                  , o = document.body
                  , r = document.createElement("template");
                r.innerHTML = s.trim();
                const a = r.content.firstChild;
                o.appendChild(a),
                a.querySelector(".question-confirm").addEventListener("click", (()=>{
                    e(!0)
                }
                )),
                a.querySelector(".question-cancel").addEventListener("click", (()=>{
                    e(!1)
                }
                ));
                const l = new ai.u_(a);
                a.addEventListener("hidden.bs.modal", (()=>{
                    o.removeChild(a)
                }
                )),
                l.show()
            }
        }
        var Ti = n(4183)
          , Ei = n.n(Ti);
        class Di extends ui {
            init() {
                this.selector = '[data-form-widget="autocomplete"]'
            }
            supportsForm(t) {
                return !0
            }
            activateForm(t) {
                const e = this.getContainer().getPlugin("api");
                [].slice.call(t.querySelectorAll(this.selector)).map((t=>{
                    const n = t.dataset.autocompleteUrl;
                    let i = 3;
                    void 0 !== t.dataset.minimumCharacter && (i = parseInt(t.dataset.minimumCharacter)),
                    new (Ei())(t,{
                        maxOptions: 500,
                        create: void 0 !== t.dataset.create,
                        onOptionAdd: e=>{
                            t.dispatchEvent(new CustomEvent("create",{
                                detail: {
                                    value: e
                                }
                            }))
                        }
                        ,
                        plugins: ["remove_button"],
                        shouldLoad: function(t) {
                            return t.length >= i
                        },
                        load: (t,i)=>{
                            e.get(n, {
                                name: t
                            }, (t=>{
                                const e = [].slice.call(t).map((t=>({
                                    text: t,
                                    value: t
                                })));
                                i(e)
                            }
                            ), (()=>{
                                i()
                            }
                            ))
                        }
                        ,
                        render: {
                            not_loading: (t,e)=>{}
                            ,
                            option_create: (t,e)=>{
                                const n = e(t.input);
                                if (n.length < 3)
                                    return null;
                                return '<div class="create">' + this.translate("select.search.create").replace("%input%", "<strong>" + n + "</strong>") + "</div>"
                            }
                            ,
                            no_results: (t,e)=>'<div class="no-results">' + this.translate("select.search.notfound").replace("%input%", "<strong>" + e(t.input) + "</strong>") + "</div>"
                        }
                    })
                }
                ))
            }
            destroyForm(t) {
                [].slice.call(t.querySelectorAll(this.selector)).map((t=>{
                    t.tomselect && t.tomselect.destroy()
                }
                ))
            }
        }
        class Si extends ui {
            constructor(t, e) {
                super(),
                this._selector = t,
                this._apiSelects = e
            }
            getId() {
                return "form-select"
            }
            init() {
                document.addEventListener("reset", (t=>{
                    "FORM" === t.target.tagName.toUpperCase() && setTimeout((()=>{
                        const e = t.target.querySelectorAll(this._selector);
                        for (let t of e)
                            "SELECT" === t.tagName.toUpperCase() && t.dispatchEvent(new Event("data-reloaded"))
                    }
                    ), 10)
                }
                ))
            }
            activateSelectPickerByElement(t) {
                let e = ["change_listener"];
                const n = void 0 !== t.multiple && !0 === t.multiple
                  , i = void 0 !== t.required && !0 === t.required;
                i && e.push("no_backspace_delete"),
                n && e.push("remove_button");
                let s = {
                    lockOptgroupOrder: !0,
                    allowEmptyOption: !i,
                    hidePlaceholder: !1,
                    plugins: e,
                    maxOptions: 500
                }
                  , o = {
                    option_create: (t,e)=>{
                        const n = e(t.input);
                        if (n.length < 3)
                            return null;
                        return '<div class="create">' + this.translate("select.search.create").replace("%input%", "<strong>" + n + "</strong>") + "</div>"
                    }
                    ,
                    no_results: (t,e)=>'<div class="no-results">' + this.translate("select.search.notfound").replace("%input%", "<strong>" + e(t.input) + "</strong>") + "</div>",
                    onOptionAdd: e=>{
                        t.dispatchEvent(new CustomEvent("create",{
                            detail: {
                                value: e
                            }
                        }))
                    }
                };
                s = void 0 !== t.dataset.create ? {
                    ...s,
                    persist: !0,
                    create: !0
                } : {
                    ...s,
                    persist: !1,
                    create: !1
                },
                void 0 !== t.dataset.disableSearch && (s = {
                    ...s,
                    controlInput: null
                }),
                void 0 !== t.dataset.renderer && "color" === t.dataset.renderer ? s.render = {
                    ...o,
                    option: function(t, e) {
                        let n = '<div class="list-group-item border-0 p-1 ps-2 text-nowrap">';
                        return void 0 !== t.color ? n += '<span style="background-color:' + t.color + '" class="color-choice-item">&nbsp;</span>' : n += '<span class="color-choice-item">&nbsp;</span>',
                        n += e(t.text) + "</div>",
                        n
                    },
                    item: function(t, e) {
                        let n = '<div class="text-nowrap">';
                        return void 0 !== t.color ? n += '<span style="background-color:' + t.color + '" class="color-choice-item">&nbsp;</span>' : n += '<span class="color-choice-item">&nbsp;</span>',
                        n += e(t.text) + "</div>",
                        n
                    }
                } : s.render = {
                    ...o,
                    option: function(t, e) {
                        let n = t.text;
                        return n = null === n || "" === n.trim() ? "&nbsp;" : e(n),
                        "<div>" + n + "</div>"
                    }
                };
                const r = new (Ei())(t,s);
                t.addEventListener("data-reloaded", (t=>{
                    r.clear(!0),
                    r.clearOptionGroups(),
                    r.clearOptions(),
                    r.sync(),
                    r.setValue(t.detail),
                    r.refreshItems(),
                    r.refreshOptions(!1)
                }
                )),
                void 0 !== t.dataset.reload && t.addEventListener("reload", (()=>{
                    r.disable(),
                    t.disabled = !0;
                    this.getContainer().getPlugin("api").get(t.dataset.reload, {}, (e=>{
                        this._updateSelect(t, e),
                        r.enable(),
                        t.disabled = !1
                    }
                    )),
                    t.dispatchEvent(new Event("change"))
                }
                ))
            }
            supportsForm(t) {
                return !0
            }
            activateForm(t) {
                [].slice.call(t.querySelectorAll(this._selector)).map((t=>{
                    this.activateSelectPickerByElement(t)
                }
                )),
                this._activateApiSelects(this._apiSelects)
            }
            destroyForm(t) {
                [].slice.call(t.querySelectorAll(this._selector)).map((t=>{
                    t.tomselect && t.tomselect.destroy()
                }
                ))
            }
            _updateOptions(t, e) {
                let n = null
                  , i = null;
                if (i = t instanceof Element ? t : document.querySelector(t),
                null === i)
                    return void console.log("Missing select: " + t);
                const s = i.value;
                for (let t = 0; t < i.options.length; t++)
                    "" === i.options[t].value && (n = i.options[t]);
                i.options.length = 0,
                null !== n && i.appendChild(this._createOption(n.text, ""));
                let o = []
                  , r = []
                  , a = null;
                void 0 !== i.dataset && void 0 !== i.dataset.optionPattern && (a = i.dataset.optionPattern),
                null !== a && "" !== a || (a = "{name}");
                for (const [t,n] of Object.entries(e)) {
                    if ("__empty__" === t) {
                        for (const t of n)
                            o.push(this._createOption(this._getTitleFromPattern(a, t), t.id));
                        continue
                    }
                    let e = this._createOptgroup(t);
                    for (const t of n)
                        e.appendChild(this._createOption(this._getTitleFromPattern(a, t), t.id));
                    r.push(e)
                }
                if (r.forEach((t=>i.appendChild(t))),
                o.forEach((t=>i.appendChild(t))),
                i.value = s,
                "" === i.value || null === i.value) {
                    const t = i.options
                      , e = t.length;
                    let s = "";
                    1 === e && void 0 === i.dataset.autoselect ? s = t[0].value : 2 === e && null !== n && (s = t[1].value),
                    "" !== s && (i.value = s)
                }
                i.dispatchEvent(new CustomEvent("data-reloaded",{
                    detail: i.value
                })),
                i.dispatchEvent(new Event("change"))
            }
            _getTitleFromPattern(t, e) {
                const n = this.getDateUtils()
                  , i = new RegExp("{[^}]*?}","g");
                let s = t
                  , o = null;
                for (; null !== (o = i.exec(t)); ) {
                    const t = o[0].slice(1, -1);
                    let i = void 0 === e[t] ? null : e[t];
                    "start" !== t && "end" !== t || (i = null === i ? "?" : n.getFormattedDate(i)),
                    s = s.replace(new RegExp("{" + t + "}","g"), i ?? "")
                }
                s = s.replace(/- \?-\?/, ""),
                s = s.replace(/\r\n|\r|\n/g, " "),
                s = s.substring(0, 110);
                let r = 0
                  , a = s.length;
                for (; r < a && "- ".indexOf(s[r]) >= 0; )
                    ++r;
                for (; a > r && "- ".indexOf(s[a - 1]) >= 0; )
                    --a;
                let l = r > 0 || a < s.length ? s.substring(r, a) : s;
                return "" === l && void 0 !== e.name ? e.name : l
            }
            addOption(t, e, n, i) {
                const s = this._createOption(e, n);
                for (const t in i)
                    s.dataset[t] = i[t];
                t.options.add(s),
                void 0 !== t.tomselect && t.tomselect.sync()
            }
            removeOption(t, e) {
                e.remove(),
                void 0 !== t.tomselect && (t.tomselect.removeOption(e.value, !0),
                t.tomselect.clear(!0))
            }
            _createOption(t, e) {
                let n = document.createElement("option");
                return n.innerText = t,
                n.value = e,
                n
            }
            _createOptgroup(t) {
                let e = document.createElement("optgroup");
                return e.label = t,
                e
            }
            _activateApiSelects(t) {
                void 0 === this._eventHandlerApiSelects && (this._eventHandlerApiSelects = e=>{
                    if (null === e.target || !e.target.matches(t))
                        return;
                    const n = e.target
                      , i = "#" + n.dataset.relatedSelect
                      , s = document.getElementById(n.dataset.relatedSelect);
                    if (null === s || "1" === s.dataset.reloading)
                        return;
                    s.dataset.reloading = "1",
                    void 0 !== s.tomselect && s.tomselect.disable(),
                    s.disabled = !0;
                    let o = n.dataset.formPrefix;
                    null == o ? o = "" : o.length > 0 && (o += "_");
                    let r = this._buildUrlWithFormFields(n.dataset.apiUrl, o);
                    const a = n.value;
                    if (null == a || "" === a || Array.isArray(a) && 0 === a.length) {
                        if (void 0 === n.dataset.emptyUrl)
                            return this._updateSelect(i, {}),
                            void (s.dataset.reloading = "0");
                        r = this._buildUrlWithFormFields(n.dataset.emptyUrl, o)
                    }
                    this.getContainer().getPlugin("api").get(r, {}, (t=>{
                        this._updateSelect(i, t),
                        void 0 !== s.tomselect && s.tomselect.enable(),
                        s.dataset.reloading = "0",
                        s.disabled = !1
                    }
                    ))
                }
                ,
                document.addEventListener("change", this._eventHandlerApiSelects))
            }
            _buildUrlWithFormFields(t, e) {
                let n = t;
                return t.split("?")[1].split("&").forEach((t=>{
                    const [i,s] = t.split("=")
                      , o = decodeURIComponent(s).match(/%(.*)%/);
                    if (null !== o) {
                        const i = o[1]
                          , r = (e + i).replace(/\[/, "").replace(/]/, "")
                          , a = document.getElementById(r);
                        let l = "";
                        if (null === a)
                            ;
                        else if (null !== a.value)
                            if (l = a.value,
                            "SELECT" === a.tagName && a.multiple)
                                l = [...a.selectedOptions].map((t=>t.value));
                            else if ("" !== l)
                                if ("date" === a.type) {
                                    const t = a.id.replace("_date", "_time")
                                      , e = document.getElementById(t)
                                      , n = null === e ? "12:00:00" : e.value
                                      , i = this.getDateUtils().fromHtml5Input(l, n);
                                    l = this.getDateUtils().formatForAPI(i, !1)
                                } else if ("text" === a.type && a.name.includes("date")) {
                                    const t = a.id.replace("_date", "_time")
                                      , e = document.getElementById(t);
                                    let n = "12:00:00"
                                      , i = "HH:mm";
                                    null !== e && (n = e.value,
                                    i = e.dataset.format);
                                    const s = this.getDateUtils().fromFormat(l.trim() + " " + n.trim(), a.dataset.format + " " + i);
                                    l = this.getDateUtils().formatForAPI(s, !1)
                                } else
                                    void 0 !== a.dataset.format && this.getDateUtils().isValidDateTime(l, a.dataset.format) && (l = this.getDateUtils().format(a.dataset.format, l));
                        if (Array.isArray(l)) {
                            let e = [];
                            for (let t of l)
                                null === t && (t = ""),
                                e.push(i + "=" + t);
                            n = n.replace(t, e.join("&"))
                        } else
                            null === l && (l = ""),
                            n = n.replace(s, l)
                    }
                }
                )),
                n
            }
            _updateSelect(t, e) {
                const n = {};
                for (const t of e) {
                    let e = "__empty__";
                    void 0 !== t.parentTitle && null !== t.parentTitle && (e = t.parentTitle),
                    void 0 === n[e] && (n[e] = []),
                    n[e].push(t)
                }
                const i = {};
                Object.keys(n).sort().forEach((function(t) {
                    i[t] = n[t]
                }
                )),
                this._updateOptions(t, i)
            }
        }
        class Oi extends si {
            getId() {
                return "form"
            }
            activateForm(t) {
                [].slice.call(document.querySelectorAll(t)).map((t=>{
                    for (const e of this.getContainer().getPlugins())
                        e instanceof ui && e.supportsForm(t) && e.activateForm(t)
                }
                ))
            }
            destroyForm(t) {
                [].slice.call(document.querySelectorAll(t)).map((t=>{
                    for (const e of this.getContainer().getPlugins())
                        e instanceof ui && e.supportsForm(t) && e.destroyForm(t)
                }
                ))
            }
            convertFormDataToQueryString(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , i = []
                  , s = new FormData(t);
                for (const t in e)
                    s.set(t, e[t]);
                for (let t of s)
                    n && "" === t[1] || i.push(encodeURIComponent(t[0]) + "=" + encodeURIComponent(t[1]));
                return i.join("&")
            }
        }
        class Ci extends si {
            constructor(t) {
                super(),
                this._selector = t
            }
            init() {
                document.addEventListener("click", (t=>{
                    let e = t.target;
                    for (; null !== e && "function" == typeof e.matches && !e.matches("body"); ) {
                        if (e.classList.contains(this._selector)) {
                            const n = e.dataset;
                            let i = n.href;
                            i || (i = e.getAttribute("href"));
                            let s = null;
                            "submit" === e.type && void 0 !== e.form && (s = e.form),
                            void 0 !== n.question && this.getContainer().getPlugin("alert").question(n.question, (function(t) {
                                t && (null === s ? document.location = i : (null !== i && (s.action = i),
                                s.submit()))
                            }
                            )),
                            t.preventDefault(),
                            t.stopPropagation()
                        }
                        e = e.parentNode
                    }
                }
                ))
            }
        }
        class Li extends si {
            init() {
                if (null === document.getElementById("multi_update_all"))
                    return;
                const t = document.querySelector("div.page-body");
                t.addEventListener("change", (t=>{
                    if (t.target.matches("#multi_update_all")) {
                        const e = t.target.checked;
                        for (const t of document.querySelectorAll(".multi_update_single"))
                            t.checked = e;
                        this._toggleForm(),
                        t.stopPropagation()
                    } else
                        t.target.matches(".multi_update_single") && (this._toggleForm(),
                        t.stopPropagation())
                }
                )),
                t.addEventListener("click", (t=>{
                    if (t.target.matches(".multi_update_table_action")) {
                        const e = t.target
                          , n = this._getSelectedIds()
                          , i = document.getElementById("multi_update_form").dataset.question.replace(/%action%/, e.textContent).replace(/%count%/, n.length.toString());
                        this.getPlugin("alert").question(i, (function(t) {
                            if (t) {
                                const t = document.getElementById("multi_update_form");
                                t.action = e.dataset.href,
                                t.submit()
                            }
                        }
                        ))
                    }
                }
                ))
            }
            _getSelectedIds() {
                let t = [];
                for (const e of document.querySelectorAll("input.multi_update_single:checked"))
                    t.push(e.value);
                return t
            }
            _toggleForm() {
                const t = this._getSelectedIds();
                if (document.getElementById("multi_update_table_entities").value = t.join(","),
                t.length > 0) {
                    for (const t of document.getElementsByClassName("multi_update_form_hide"))
                        t.style.setProperty("display", "none", "important");
                    document.getElementById("multi_update_form").style.display = null
                } else {
                    document.getElementById("multi_update_form").style.setProperty("display", "none", "important");
                    for (const t of document.getElementsByClassName("multi_update_form_hide"))
                        t.style.display = null
                }
            }
        }
        class Mi extends si {
            getId() {
                return "date"
            }
            init() {
                this.getConfigurations().is24Hours() ? this.timeFormat = "HH:mm" : this.timeFormat = "hh:mm a",
                this.durationFormat = this.getConfiguration("formatDuration"),
                this.dateFormat = this.getConfiguration("formatDate")
            }
            _parseFormat(t) {
                return t = (t = (t = (t = (t = (t = (t = t.replace("DD", "dd")).replace("D", "d")).replace("MM", "LL")).replace("M", "L")).replace("YYYY", "yyyy")).replace("YY", "yy")).replace("A", "a")
            }
            format(t, e) {
                let n = null;
                return n = null == e ? ti.now() : e instanceof Date ? ti.fromJSDate(e) : ti.fromISO(e),
                n.toFormat(this._parseFormat(t), {
                    locale: "en-us"
                })
            }
            getFormattedDate(t) {
                return this.format(this._parseFormat(this.dateFormat), t)
            }
            formatForAPI(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return t instanceof Date && (t = ti.fromJSDate(t)),
                void 0 !== e && e || (t = t.toUTC()),
                t.toISO({
                    includeOffset: !1,
                    suppressMilliseconds: !0
                })
            }
            fromFormat(t, e) {
                return ti.fromFormat(t, this._parseFormat(e), {
                    locale: "en-us"
                })
            }
            fromHtml5Input(t, e) {
                return e = e ?? "",
                "" === (t = t ?? "") && "" === e ? ti.invalid("Empty date and time given") : ("" !== t && "" !== e && (t = t + "T" + e),
                ti.fromISO(t))
            }
            isValidDateTime(t, e) {
                return this.fromFormat(t, e).isValid
            }
            addHumanDuration(t, e) {
                let n = null;
                if (t instanceof Date)
                    n = ti.fromJSDate(t);
                else {
                    if (!(t instanceof ti))
                        throw "addHumanDuration() needs a JS Date";
                    n = t
                }
                const i = ti.fromISO(e)
                  , s = ti.now().startOf("day")
                  , o = i.diff(s);
                return n.plus(o).toJSDate()
            }
            formatDuration(t) {
                let e = null;
                return e = "string" == typeof t ? ti.now().diff(ti.fromISO(t)) : Je.fromISO("PT" + (null === t ? 0 : t) + "S"),
                this.formatLuxonDuration(e)
            }
            formatSeconds(t) {
                return this.formatLuxonDuration(Je.fromObject({
                    seconds: t
                }))
            }
            formatLuxonDuration(t) {
                return t = t.shiftTo("hours", "minutes", "seconds"),
                this.formatAsDuration(t.hours, t.minutes)
            }
            formatTime(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , n = ti.fromJSDate(t);
                return void 0 !== e && e || (n = n.toUTC()),
                n.toFormat(this.timeFormat)
            }
            formatAsDuration(t, e) {
                let n = this.durationFormat;
                return (t < 0 || e < 0) && (t = Math.abs(t),
                e = Math.abs(e),
                n = "-" + n),
                n.replace("%h", t.toString()).replace("%m", ("0" + e).slice(-2))
            }
            getSecondsFromDurationString(t) {
                const e = this.parseDuration(t);
                return null !== e && e.isValid ? e.as("seconds") : 0
            }
            parseDuration(t) {
                if (null == t || "" === t)
                    return new Je({
                        seconds: 0
                    });
                let e = null;
                if (-1 !== (t = t.trim().toUpperCase()).indexOf(":")) {
                    const [,n,i,s] = t.match(/(\d+):(\d+)(?::(\d+))*/);
                    e = Je.fromObject({
                        hours: n,
                        minutes: i,
                        seconds: s
                    })
                } else if (-1 !== t.indexOf(".") || -1 !== t.indexOf(","))
                    t = t.replace(/,/, "."),
                    t = (3600 * parseFloat(t)).toString(),
                    e = Je.fromISO("PT" + t + "S");
                else if (-1 !== t.indexOf("H") || -1 !== t.indexOf("M") || -1 !== t.indexOf("S"))
                    e = Je.fromISO("PT" + t);
                else {
                    let n = parseInt(t);
                    const i = parseInt(t).toFixed();
                    isNaN(n) || t !== i || (t = (3600 * n).toString(),
                    e = Je.fromISO("PT" + t + "S"))
                }
                return null !== e && e.isValid ? "-" === t[0] && e.valueOf() > 0 ? e.negate() : e : new Je({
                    seconds: 0
                })
            }
        }
        class Ii extends si {
            getId() {
                return "escape"
            }
            escapeForHtml(t) {
                if (null == t)
                    return "";
                const e = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;"
                };
                return t.replace(/[&<>]/g, (function(t) {
                    return e[t] || t
                }
                ))
            }
        }
        class Ai extends si {
            getId() {
                return "fetch"
            }
            fetch(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return void 0 === e.headers && (e.headers = new Headers),
                e.headers.append("X-Requested-With", "Kimai"),
                e = {
                    redirect: "follow",
                    ...e
                },
                new Promise(((n,i)=>{
                    fetch(t, e).then((t=>{
                        if (t.ok)
                            return 201 === t.status && t.headers.has("x-modal-redirect") ? void (window.location = t.headers.get("x-modal-redirect")) : void n(t);
                        let e = !1;
                        if (403 === t.status) {
                            if (t.headers.has("login-required")) {
                                const t = this.getConfiguration("login").toString();
                                this.getContainer().getPlugin("alert").question(this.translate("login.required"), (e=>{
                                    !0 === e && window.location.replace(t)
                                }
                                )),
                                e = !0
                            }
                        } else
                            console.log("Some error occurred");
                        e || i(t)
                    }
                    )).catch((t=>{
                        console.log("Error occurred while talking to Kimai backend", t),
                        i(t)
                    }
                    ))
                }
                ))
            }
        }
        class Ni extends ui {
            supportsForm(t) {
                return "timesheet_edit_form" === t.name || "timesheet_admin_edit_form" === t.name || "timesheet_multi_user_edit_form" === t.name
            }
            destroyForm(t) {
                this.supportsForm(t) && (void 0 !== this._beginDate && (this._beginDate.removeEventListener("change", this._beginListener),
                delete this._beginListener,
                delete this._beginDate),
                void 0 !== this._beginTime && (this._beginTime.removeEventListener("change", this._beginListener),
                delete this._beginTime),
                void 0 !== this._endTime && (this._endTime.removeEventListener("change", this._endListener),
                delete this._endTime),
                void 0 !== this._duration && (this._duration.removeEventListener("change", this._durationListener),
                delete this._durationListener,
                delete this._duration),
                void 0 !== this._durationToggle && null !== this._durationToggle && (this._durationToggle.removeEventListener("change", this._durationToggleListener),
                delete this._durationToggleListener,
                delete this._durationToggle),
                void 0 !== this._activity && (this._activity.removeEventListener("create", this._activityListener),
                delete this._activityListener,
                delete this._activity),
                void 0 !== this._project && delete this._project)
            }
            activateForm(t) {
                if (!this.supportsForm(t))
                    return;
                const e = t.name;
                this._activity = document.getElementById(e + "_activity"),
                this._project = document.getElementById(e + "_project"),
                this._activityListener = t=>{
                    const e = this._project.value;
                    this.getContainer().getPlugin("api").post(this._activity.dataset.create, {
                        name: t.detail.value,
                        project: "" === e ? null : e,
                        visible: !0
                    }, (()=>{
                        this._project.dispatchEvent(new Event("change"))
                    }
                    ))
                }
                ,
                this._activity.addEventListener("create", this._activityListener),
                this._beginDate = document.getElementById(e + "_begin_date"),
                this._beginTime = document.getElementById(e + "_begin_time"),
                this._endTime = document.getElementById(e + "_end_time"),
                this._duration = document.getElementById(e + "_duration"),
                this._durationToggle = document.getElementById(e + "_duration_toggle"),
                null !== this._beginDate && null !== this._beginTime && null !== this._endTime && null !== this._duration && (this._beginListener = ()=>this._changedBegin(),
                this._endListener = ()=>this._changedEnd(),
                this._durationListener = ()=>this._changedDuration(),
                this._beginDate.addEventListener("change", this._beginListener),
                this._beginTime.addEventListener("change", this._beginListener),
                this._endTime.addEventListener("change", this._endListener),
                this._duration.addEventListener("change", this._durationListener),
                null !== this._duration && null !== this._durationToggle && (this._durationToggleListener = ()=>{
                    this._durationToggle.classList.toggle("text-success")
                }
                ,
                this._durationToggle.addEventListener("click", this._durationToggleListener)))
            }
            _isDurationConnected() {
                return (null !== this._duration || null !== this._durationToggle) && (null === this._durationToggle || this._durationToggle.classList.contains("text-success"))
            }
            _getBegin() {
                if ("" === this._beginDate.value || "" === this._beginTime.value)
                    return null;
                let t = this._parseBegin(this._beginTime.dataset.format);
                return t.invalid && (t = this._parseBegin(this._fixTimeFormat(this._beginTime.dataset.format)),
                t.invalid) ? null : t
            }
            _parseBegin(t) {
                return this.getDateUtils().fromFormat(this._beginDate.value + " " + this._beginTime.value, this._beginDate.dataset.format + " " + t)
            }
            _parseEnd(t, e) {
                let n = this.getDateUtils().fromFormat(t.toFormat("yyyy-LL-dd") + " " + this._endTime.value, "yyyy-LL-dd " + e);
                return n.invalid && (n = this.getDateUtils().fromFormat(t.toFormat("yyyy-LL-dd") + " " + this._endTime.value, "yyyy-LL-dd " + this._fixTimeFormat(e))),
                n
            }
            _fixTimeFormat(t) {
                return t.replace("HH", "H").replace("hh", "h")
            }
            _getEnd() {
                if ("" === this._endTime.value)
                    return null;
                let t = this._parseEnd(ti.now(), this._endTime.dataset.format);
                const e = this._getBegin();
                return null !== e && (t = this._parseEnd(e, this._endTime.dataset.format),
                t < e && (t = t.plus({
                    days: 1
                }))),
                t.invalid ? null : t
            }
            _changedBegin() {
                const t = this._getBegin();
                if (null === t)
                    return;
                const e = this._getParsedDuration()
                  , n = e.as("seconds") > 0;
                null === this._getEnd() && n ? this._applyDateToField(t.plus(e), null, this._endTime) : this._updateDuration()
            }
            _changedEnd() {
                const t = this._getEnd();
                if (null === t)
                    return;
                const e = this._getParsedDuration()
                  , n = e.as("seconds") > 0;
                null === this._getBegin() && n ? this._applyDateToField(t.minus(e), this._beginDate, this._beginTime) : this._updateDuration()
            }
            _updateDuration() {
                const t = this._getBegin()
                  , e = this._getEnd();
                let n = null;
                null !== t && null !== e && (n = e.diff(t)),
                this._setDurationAsString(n)
            }
            _changedDuration() {
                if (!this._isDurationConnected())
                    return;
                const t = this._getParsedDuration();
                if (!t.isValid)
                    return void this._setDurationAsString(null);
                const e = this._getBegin();
                let n = this._getEnd();
                const i = t.as("seconds");
                if (i < 0 && (n = null),
                null === e && null === n) {
                    const t = ti.now();
                    this._applyDateToField(t, this._beginDate, this._beginTime),
                    this._applyDateToField(t.plus({
                        seconds: i
                    }), null, this._endTime)
                } else
                    null === e && null !== n ? this._applyDateToField(n.minus({
                        seconds: i
                    }), this._beginDate, this._beginTime) : null !== e && i >= 0 && this._applyDateToField(e.plus({
                        seconds: i
                    }), null, this._endTime)
            }
            _setDurationAsString(t) {
                if (!this._isDurationConnected())
                    return;
                if (null === t)
                    return void (this._duration.value = "");
                if (!t.isValid)
                    return;
                const e = t.as("seconds");
                if (e < 0)
                    return void (this._duration.value = "");
                const n = Math.floor(e / 3600);
                let i = Math.floor((e - 3600 * n) / 60);
                i < 10 && (i = "0" + i),
                this._duration.value = n + ":" + i
            }
            _getParsedDuration() {
                return this.getDateUtils().parseDuration(this._duration.value.toUpperCase())
            }
            _applyDateToField(t, e, n) {
                if (null === t || t.invalid)
                    return e.value = "",
                    void (n.value = "");
                null !== e && (e.value = this.getDateUtils().format(e.dataset.format, t)),
                n.value = this.getDateUtils().format(n.dataset.format, t)
            }
        }
        var Fi, Pi, ji = n(7169);
        class qi extends ui {
            init() {
                this.usersId = "team_edit_form_users"
            }
            supportsForm(t) {
                return "team_edit_form" === t.name
            }
            _getPrototype() {
                return document.getElementById("team_edit_form_members")
            }
            activateForm(t) {
                this.supportsForm(t) && (t.addEventListener("click", (t=>this._removeMember(t))),
                document.getElementById(this.usersId).addEventListener("change", (t=>{
                    const e = t.target
                      , n = e.options[e.selectedIndex]
                      , i = this._createMember(n);
                    this._getPrototype().append(i),
                    this.getPlugin("form-select").removeOption(e, n)
                }
                )))
            }
            _createMember(t) {
                const e = this.getPlugin("escape")
                  , n = this._getPrototype();
                let i = n.dataset.widgetCounter || n.childNodes.length
                  , s = n.dataset.prototype;
                s = s.replace(/__name__/g, i),
                s = s.replace(/#000000/g, ji.Z.calculateContrastColor(t.dataset.color)),
                s = s.replace(/__DISPLAY__/g, e.escapeForHtml(t.dataset.display)),
                s = s.replace(/__COLOR__/g, t.dataset.color),
                s = s.replace(/__INITIALS__/g, e.escapeForHtml(t.dataset.initials)),
                s = s.replace(/__TITLE__/g, e.escapeForHtml(t.dataset.title)),
                s = s.replace(/__USERNAME__/g, e.escapeForHtml(t.text)),
                n.dataset.widgetCounter = (++i).toString();
                const o = document.createElement("div");
                o.innerHTML = s,
                o.querySelector("input[type=hidden]").value = t.value;
                const r = o.firstElementChild;
                for (const e in t.dataset)
                    r.dataset[e] = t.dataset[e];
                return r
            }
            _removeMember(t) {
                let e = t.target;
                if (e.parentNode.matches(".remove-member") && (e = e.parentNode),
                e.matches(".remove-member")) {
                    e.parentNode.parentNode.parentNode.parentNode.parentNode.remove(),
                    t.stopPropagation(),
                    t.preventDefault()
                }
            }
            destroyForm(t) {
                this.supportsForm(t) && t.removeEventListener("click", this._removeMember)
            }
        }
        class Hi extends ui {
            supportsForm(t) {
                return !0
            }
            activateForm(t) {
                void 0 === this._eventHandler && (this._eventHandler = t=>{
                    let e = t.target;
                    if (e.matches('a[data-form-widget="copy-data"]') || (e = e.parentNode),
                    !e.matches('a[data-form-widget="copy-data"]') || void 0 === e.dataset.target)
                        return;
                    const n = document.querySelector(e.dataset.target);
                    if (null !== n) {
                        if (n.value = e.dataset.value,
                        void 0 !== e.dataset.event)
                            for (const t of e.dataset.event.split(" "))
                                n.dispatchEvent(new Event(t));
                        else if (void 0 !== e.dataset.eventBubbles)
                            for (const t of e.dataset.eventBubbles.split(" "))
                                n.dispatchEvent(new Event(t,{
                                    bubbles: !0
                                }));
                        t.preventDefault()
                    }
                }
                ),
                t.addEventListener("click", this._eventHandler)
            }
            destroyForm(t) {
                t.removeEventListener("click", this._eventHandler)
            }
        }
        class Vi extends ui {
            init() {
                this.selector = 'a[data-form-widget="date-now"]'
            }
            supportsForm(t) {
                return !0
            }
            activateForm(t) {
                [].slice.call(t.querySelectorAll(this.selector)).map((t=>{
                    void 0 !== t.dataset.format && void 0 !== t.dataset.target && (void 0 === this._eventHandler && (this._eventHandler = t=>{
                        const e = t.currentTarget
                          , n = document.getElementById(e.dataset.target);
                        n.disabled || (n.value = this.getDateUtils().format(e.dataset.format, null),
                        n.dispatchEvent(new Event("change",{
                            bubbles: !0
                        }))),
                        t.preventDefault()
                    }
                    ),
                    t.addEventListener("click", this._eventHandler))
                }
                ))
            }
            destroyForm(t) {
                [].slice.call(t.querySelectorAll(this.selector)).map((t=>{
                    void 0 !== t.dataset.format && void 0 !== t.dataset.target && t.removeEventListener("click", this._eventHandler)
                }
                ))
            }
        }
        class $i extends si {
            getId() {
                return "notification"
            }
            isSupported() {
                return !!window.Notification && ("denied" !== Notification.permission && "granted" === Notification.permission)
            }
            request(t) {
                try {
                    Notification.requestPermission().then((e=>{
                        t("granted" === e || "default" === e && null)
                    }
                    ))
                } catch (e) {
                    Notification.requestPermission((e=>{
                        t("granted" === e || "default" === e && null)
                    }
                    ))
                }
            }
            notify(t, e, n, i) {
                this.request((s=>{
                    if (!0 !== s) {
                        this.getPlugin("alert").info(e)
                    }
                    let o = {
                        body: e,
                        dir: this.getConfigurations().isRTL() ? "rtl" : "ltr"
                    };
                    null != n && (o.icon = n);
                    let r = "Kimai";
                    null !== t && (r = r + ": " + t),
                    null != i && (o = {
                        ...o,
                        ...i
                    });
                    const a = new window.Notification(r,o);
                    a.onclick = function() {
                        window.focus(),
                        a.close()
                    }
                }
                ))
            }
        }
        class Bi extends si {
            getId() {
                return "hotkeys"
            }
            init() {
                window.addEventListener("keyup", (t=>{
                    if (t.ctrlKey && "Enter" === t.key) {
                        const e = [...document.querySelectorAll('[data-hotkey="ctrl+Enter"]')].filter((t=>this.isVisible(t)));
                        e.length > 1 && console.warn("KimaiHotkeys: More than one visible element matches ${selector}. No action triggered."),
                        1 === e.length && (t.stopPropagation(),
                        t.preventDefault(),
                        e[0].click())
                    }
                }
                ))
            }
            isVisible(t) {
                return !(!t || 0 === t.getClientRects().length) && "visible" === getComputedStyle(t).getPropertyValue("visibility")
            }
        }
        class Ri extends si {
            constructor() {
                super(),
                this._selector = "a.remote-modal-load"
            }
            getId() {
                return "remote-modal"
            }
            init() {
                this.handle = t=>{
                    this._showModal(t.currentTarget),
                    t.stopPropagation(),
                    t.preventDefault()
                }
                ;
                for (let t of document.querySelectorAll(this._selector))
                    t.addEventListener("click", this.handle);
                document.addEventListener("kimai.closeRemoteModal", (()=>{
                    this._hide()
                }
                ))
            }
            _initElement(t) {
                for (let e of t.querySelectorAll("a.remote-modal-reload"))
                    e.addEventListener("click", this.handle)
            }
            _hide() {
                this._getModal().hide()
            }
            _getModalElement() {
                return document.getElementById("remote_modal")
            }
            _getModal() {
                return ai.u_.getOrCreateInstance(this._getModalElement())
            }
            _showModal(t) {
                this.fetch(t.href, {
                    method: "GET"
                }).then((e=>{
                    if (e.ok)
                        return e.text().then((e=>{
                            const n = document.createElement("div");
                            n.classList.add("modal-body"),
                            n.classList.add("p-0"),
                            n.innerHTML = e,
                            this._initElement(n);
                            const i = this._getModalElement();
                            i.querySelector(".modal-body").replaceWith(n),
                            void 0 !== t.dataset.modalTitle && (i.querySelector(".modal-title").textContent = t.dataset.modalTitle),
                            this._getModal().show()
                        }
                        ))
                }
                )).catch((t=>{
                    console.log("Failed to load remote modal", t)
                }
                ))
            }
        }
        class zi extends si {
            getId() {
                return "user"
            }
            init() {
                this.user = this.getConfigurations().get("user")
            }
            getUserId() {
                return this.user.id
            }
            getName() {
                return this.user.name
            }
            isAdmin() {
                return this.user.admin
            }
            isSuperAdmin() {
                return this.user.superAdmin
            }
        }
        t = n.hmd(t),
        Fi = "undefined" != typeof self ? self : void 0,
        Pi = function() {
            return class extends class {
                constructor(t, e) {
                    dt.defaultLocale = t.locale.replace("_", "-").toLowerCase(),
                    dt.defaultZone = t.timezone;
                    const n = new oi(new ii(t),new ni(e));
                    n.registerPlugin(new zi),
                    n.registerPlugin(new Ii),
                    n.registerPlugin(new wi),
                    n.registerPlugin(new gi),
                    n.registerPlugin(new xi),
                    n.registerPlugin(new Ai),
                    n.registerPlugin(new Mi),
                    n.registerPlugin(new $i),
                    n.registerPlugin(new Si(".selectpicker","select[data-related-select]")),
                    n.registerPlugin(new hi('input[data-daterangepicker="on"]')),
                    n.registerPlugin(new di('input[data-datepicker="on"]')),
                    n.registerPlugin(new Di),
                    n.registerPlugin(new Ni),
                    n.registerPlugin(new qi),
                    n.registerPlugin(new Hi),
                    n.registerPlugin(new Vi),
                    n.registerPlugin(new Oi),
                    n.registerPlugin(new Bi),
                    n.registerPlugin(new Ci("confirmation-link")),
                    n.registerPlugin(new ri("data-column-visibility")),
                    n.registerPlugin(new mi("section.content","table.dataTable")),
                    n.registerPlugin(new fi("form.searchform","toolbar-action")),
                    n.registerPlugin(new yi(".alternative-link")),
                    n.registerPlugin(new bi(".modal-ajax-form")),
                    n.registerPlugin(new Ri),
                    n.registerPlugin(new _i),
                    n.registerPlugin(new ki("api-link")),
                    n.registerPlugin(new Li),
                    n.registerPlugin(new li),
                    document.dispatchEvent(new CustomEvent("kimai.pluginRegister",{
                        detail: {
                            kimai: n
                        }
                    })),
                    n.getPlugins().map((t=>{
                        t.init()
                    }
                    )),
                    document.dispatchEvent(new CustomEvent("kimai.initialized",{
                        detail: {
                            kimai: n
                        }
                    })),
                    this.kimai = n
                }
                getKimai() {
                    return this.kimai
                }
            }
            {
            }
        }
        ,
        "function" == typeof define && n.amdO ? define([], (function() {
            return Fi.KimaiWebLoader = Pi()
        }
        )) : t.exports ? t.exports = Pi() : Fi.KimaiWebLoader = Pi()
    },
    7169: function(t, e, n) {
        "use strict";
        n.d(e, {
            Z: function() {
                return i
            }
        });
        class i {
            static calculateContrastColor(t) {
                "#" === t.slice(0, 1) && (t = t.slice(1)),
                3 === t.length && (t = t.split("").map((function(t) {
                    return t + t
                }
                )).join(""));
                return (299 * parseInt(t.substring(0, 2), 16) + 587 * parseInt(t.substring(2, 4), 16) + 114 * parseInt(t.substring(4, 6), 16)) / 1e3 >= 128 ? "#000000" : "#ffffff"
            }
        }
    },
    3187: function(t, e, n) {
        "use strict";
        n.d(e, {
            Z: function() {
                return i
            }
        });
        class i {
            constructor(t) {
                this.id = t
            }
            getContextMenuElement() {
                if (null === document.getElementById(this.id)) {
                    const t = document.createElement("div");
                    t.id = this.id,
                    t.classList.add("dropdown-menu", "d-none"),
                    document.body.appendChild(t)
                }
                return document.getElementById(this.id)
            }
            createFromApi(t, e) {
                let n = "";
                for (const t of e)
                    if (!0 === t.divider && (n += '<div class="dropdown-divider"></div>'),
                    null !== t.url) {
                        if (n += '<a class="dropdown-item ' + (null !== t.class ? t.class : "") + '" href="' + t.url + '"',
                        void 0 !== t.attr)
                            for (const e in t.attr)
                                n += " " + e + '="' + t.attr[e].replaceAll('"', "&quot;") + '"';
                        n += ">" + t.title + "</a>"
                    }
                this.createFromClickEvent(t, n)
            }
            createFromClickEvent(t, e) {
                const n = this.getContextMenuElement();
                n.style.zIndex = "1021",
                n.innerHTML = e,
                n.style.position = "fixed",
                n.style.top = t.clientY + "px",
                n.style.left = t.clientX + "px";
                const i = t=>{
                    t.target.classList.contains("dropdown-toggle") || t.target.classList.contains("dropdown-divider") || (n.classList.remove("d-block"),
                    n.classList.contains("d-none") || n.classList.add("d-none"),
                    n.removeEventListener("click", i),
                    document.removeEventListener("click", i))
                }
                ;
                n.addEventListener("click", i),
                document.addEventListener("click", i),
                n.classList.remove("d-none"),
                n.classList.contains("d-block") || n.classList.add("d-block")
            }
            static createForDataTable(t) {
                [].slice.call(document.querySelectorAll(t)).map((t=>{
                    null !== t.querySelector("td.actions div.dropdown-menu") && t.addEventListener("contextmenu", (e=>{
                        let n = e.target;
                        for (; null !== n; ) {
                            const t = n.tagName.toUpperCase();
                            if ("TH" === t || "TABLE" === t || "BODY" === t)
                                return;
                            if ("TR" === t)
                                break;
                            n = n.parentNode
                        }
                        if (null === n || !n.matches("table.dataTable tbody tr"))
                            return;
                        const s = n.querySelector("td.actions div.dropdown-menu");
                        if (null === s)
                            return;
                        e.preventDefault();
                        new i(t.dataset.contextMenu).createFromClickEvent(e, s.innerHTML)
                    }
                    ))
                }
                ))
            }
        }
    },
    985: function(t, e, n) {
        "use strict";
        n.d(e, {
            Z: function() {
                return s
            }
        });
        var i = n(3187);
        class s {
            constructor(t) {
                this.selector = t;
                const e = document.querySelector(this.selector);
                if (this.href = e.dataset.href,
                void 0 !== e.dataset.reload) {
                    this.events = e.dataset.reload.split(" ");
                    const t = ()=>{
                        let t = null;
                        t = void 0 !== document.querySelector(this.selector).dataset.reloadHref ? document.querySelector(this.selector).dataset.reloadHref : document.querySelector(this.selector + " ul.pagination li.active a").href,
                        this.loadPage(t)
                    }
                    ;
                    for (const e of this.events)
                        document.addEventListener(e, t)
                }
                document.body.addEventListener("click", (t=>{
                    let e = t.target;
                    e.matches(this.selector + " a.pagination-link") || (e = e.parentNode),
                    e.matches(this.selector + " a.pagination-link") && (t.preventDefault(),
                    this.loadPage(e.href))
                }
                ))
            }
            static create(t) {
                return new s(t)
            }
            loadPage(t) {
                const e = this.selector;
                document.dispatchEvent(new CustomEvent("kimai.reloadContent",{
                    detail: this.selector
                }));
                const n = ()=>{
                    document.dispatchEvent(new Event("kimai.reloadedContent"))
                }
                ;
                window.kimai.getPlugin("fetch").fetch(t).then((t=>{
                    t.text().then((t=>{
                        const s = document.createElement("div");
                        s.innerHTML = t,
                        document.querySelector(e).replaceWith(this._makeScriptExecutable(s.firstElementChild)),
                        i.Z.createForDataTable(e + " table.dataTable"),
                        n()
                    }
                    ))
                }
                )).catch((()=>{
                    window.kimai.getPlugin("alert").error("Failed loading selected page"),
                    n()
                }
                ))
            }
            _makeScriptExecutable(t) {
                if (void 0 !== t.tagName && "SCRIPT" === t.tagName) {
                    const e = document.createElement("script");
                    e.text = t.innerHTML,
                    t.parentNode.replaceChild(e, t)
                } else
                    for (const e of t.childNodes)
                        this._makeScriptExecutable(e);
                return t
            }
        }
    },
    8227: function(t, e, n) {
        "use strict";
        n.d(e, {
            Z: function() {
                return i
            }
        });
        class i {
            constructor(t, e) {
                const n = ()=>{
                    e ? document.location.reload() : this._loadPage(document.location)
                }
                ;
                for (const e of t.split(" "))
                    document.addEventListener(e, n)
            }
            static create(t, e) {
                return null == e && (e = !1),
                new i(t,e)
            }
            _showOverlay() {
                document.dispatchEvent(new CustomEvent("kimai.reloadContent",{
                    detail: "div.page-wrapper"
                }))
            }
            _hideOverlay() {
                document.dispatchEvent(new Event("kimai.reloadedContent"))
            }
            _loadPage(t) {
                this._showOverlay(),
                window.kimai.getPlugin("fetch").fetch(t).then((t=>{
                    t.text().then((t=>{
                        const e = document.createElement("div");
                        e.innerHTML = t;
                        const n = e.querySelector("section.content");
                        document.querySelector("section.content").replaceWith(n),
                        document.dispatchEvent(new Event("kimai.reloadPage")),
                        this._hideOverlay()
                    }
                    ))
                }
                )).catch((()=>{
                    this._hideOverlay(),
                    document.location = t
                }
                ))
            }
        }
    },
    6654: function(t, e, n) {
        "use strict";
        n.d(e, {
            Z: function() {
                return i
            }
        });
        class i {
            static set(t, e) {
                window.localStorage.setItem(t, JSON.stringify(e))
            }
            static get(t) {
                let e = window.localStorage.getItem(t);
                return null == e ? null : JSON.parse(e)
            }
            static remove(t) {
                window.localStorage.removeItem(t)
            }
        }
    },
    3138: function(t, e, n) {
        "use strict";
        n.d(e, {
            u_: function() {
                return $n
            },
            J2: function() {
                return bi
            },
            FN: function() {
                return $i
            },
            u: function() {
                return gi
            }
        });
        var i = {};
        n.r(i),
        n.d(i, {
            afterMain: function() {
                return x
            },
            afterRead: function() {
                return _
            },
            afterWrite: function() {
                return D
            },
            applyStyles: function() {
                return A
            },
            arrow: function() {
                return X
            },
            auto: function() {
                return l
            },
            basePlacements: function() {
                return c
            },
            beforeMain: function() {
                return w
            },
            beforeRead: function() {
                return y
            },
            beforeWrite: function() {
                return T
            },
            bottom: function() {
                return o
            },
            clippingParents: function() {
                return h
            },
            computeStyles: function() {
                return it
            },
            createPopper: function() {
                return At
            },
            createPopperBase: function() {
                return It
            },
            createPopperLite: function() {
                return Nt
            },
            detectOverflow: function() {
                return bt
            },
            end: function() {
                return d
            },
            eventListeners: function() {
                return ot
            },
            flip: function() {
                return _t
            },
            hide: function() {
                return xt
            },
            left: function() {
                return a
            },
            main: function() {
                return k
            },
            modifierPhases: function() {
                return S
            },
            offset: function() {
                return Tt
            },
            placements: function() {
                return v
            },
            popper: function() {
                return m
            },
            popperGenerator: function() {
                return Mt
            },
            popperOffsets: function() {
                return Et
            },
            preventOverflow: function() {
                return Dt
            },
            read: function() {
                return b
            },
            reference: function() {
                return f
            },
            right: function() {
                return r
            },
            start: function() {
                return u
            },
            top: function() {
                return s
            },
            variationPlacements: function() {
                return g
            },
            viewport: function() {
                return p
            },
            write: function() {
                return E
            }
        });
        var s = "top"
          , o = "bottom"
          , r = "right"
          , a = "left"
          , l = "auto"
          , c = [s, o, r, a]
          , u = "start"
          , d = "end"
          , h = "clippingParents"
          , p = "viewport"
          , m = "popper"
          , f = "reference"
          , g = c.reduce((function(t, e) {
            return t.concat([e + "-" + u, e + "-" + d])
        }
        ), [])
          , v = [].concat(c, [l]).reduce((function(t, e) {
            return t.concat([e, e + "-" + u, e + "-" + d])
        }
        ), [])
          , y = "beforeRead"
          , b = "read"
          , _ = "afterRead"
          , w = "beforeMain"
          , k = "main"
          , x = "afterMain"
          , T = "beforeWrite"
          , E = "write"
          , D = "afterWrite"
          , S = [y, b, _, w, k, x, T, E, D];
        function O(t) {
            return t ? (t.nodeName || "").toLowerCase() : null
        }
        function C(t) {
            if (null == t)
                return window;
            if ("[object Window]" !== t.toString()) {
                var e = t.ownerDocument;
                return e && e.defaultView || window
            }
            return t
        }
        function L(t) {
            return t instanceof C(t).Element || t instanceof Element
        }
        function M(t) {
            return t instanceof C(t).HTMLElement || t instanceof HTMLElement
        }
        function I(t) {
            return "undefined" != typeof ShadowRoot && (t instanceof C(t).ShadowRoot || t instanceof ShadowRoot)
        }
        var A = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(t) {
                var e = t.state;
                Object.keys(e.elements).forEach((function(t) {
                    var n = e.styles[t] || {}
                      , i = e.attributes[t] || {}
                      , s = e.elements[t];
                    M(s) && O(s) && (Object.assign(s.style, n),
                    Object.keys(i).forEach((function(t) {
                        var e = i[t];
                        !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e)
                    }
                    )))
                }
                ))
            },
            effect: function(t) {
                var e = t.state
                  , n = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                return Object.assign(e.elements.popper.style, n.popper),
                e.styles = n,
                e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow),
                function() {
                    Object.keys(e.elements).forEach((function(t) {
                        var i = e.elements[t]
                          , s = e.attributes[t] || {}
                          , o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce((function(t, e) {
                            return t[e] = "",
                            t
                        }
                        ), {});
                        M(i) && O(i) && (Object.assign(i.style, o),
                        Object.keys(s).forEach((function(t) {
                            i.removeAttribute(t)
                        }
                        )))
                    }
                    ))
                }
            },
            requires: ["computeStyles"]
        };
        function N(t) {
            return t.split("-")[0]
        }
        var F = Math.max
          , P = Math.min
          , j = Math.round;
        function q() {
            var t = navigator.userAgentData;
            return null != t && t.brands && Array.isArray(t.brands) ? t.brands.map((function(t) {
                return t.brand + "/" + t.version
            }
            )).join(" ") : navigator.userAgent
        }
        function H() {
            return !/^((?!chrome|android).)*safari/i.test(q())
        }
        function V(t, e, n) {
            void 0 === e && (e = !1),
            void 0 === n && (n = !1);
            var i = t.getBoundingClientRect()
              , s = 1
              , o = 1;
            e && M(t) && (s = t.offsetWidth > 0 && j(i.width) / t.offsetWidth || 1,
            o = t.offsetHeight > 0 && j(i.height) / t.offsetHeight || 1);
            var r = (L(t) ? C(t) : window).visualViewport
              , a = !H() && n
              , l = (i.left + (a && r ? r.offsetLeft : 0)) / s
              , c = (i.top + (a && r ? r.offsetTop : 0)) / o
              , u = i.width / s
              , d = i.height / o;
            return {
                width: u,
                height: d,
                top: c,
                right: l + u,
                bottom: c + d,
                left: l,
                x: l,
                y: c
            }
        }
        function $(t) {
            var e = V(t)
              , n = t.offsetWidth
              , i = t.offsetHeight;
            return Math.abs(e.width - n) <= 1 && (n = e.width),
            Math.abs(e.height - i) <= 1 && (i = e.height),
            {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: n,
                height: i
            }
        }
        function B(t, e) {
            var n = e.getRootNode && e.getRootNode();
            if (t.contains(e))
                return !0;
            if (n && I(n)) {
                var i = e;
                do {
                    if (i && t.isSameNode(i))
                        return !0;
                    i = i.parentNode || i.host
                } while (i)
            }
            return !1
        }
        function R(t) {
            return C(t).getComputedStyle(t)
        }
        function z(t) {
            return ["table", "td", "th"].indexOf(O(t)) >= 0
        }
        function Y(t) {
            return ((L(t) ? t.ownerDocument : t.document) || window.document).documentElement
        }
        function U(t) {
            return "html" === O(t) ? t : t.assignedSlot || t.parentNode || (I(t) ? t.host : null) || Y(t)
        }
        function W(t) {
            return M(t) && "fixed" !== R(t).position ? t.offsetParent : null
        }
        function Z(t) {
            for (var e = C(t), n = W(t); n && z(n) && "static" === R(n).position; )
                n = W(n);
            return n && ("html" === O(n) || "body" === O(n) && "static" === R(n).position) ? e : n || function(t) {
                var e = /firefox/i.test(q());
                if (/Trident/i.test(q()) && M(t) && "fixed" === R(t).position)
                    return null;
                var n = U(t);
                for (I(n) && (n = n.host); M(n) && ["html", "body"].indexOf(O(n)) < 0; ) {
                    var i = R(n);
                    if ("none" !== i.transform || "none" !== i.perspective || "paint" === i.contain || -1 !== ["transform", "perspective"].indexOf(i.willChange) || e && "filter" === i.willChange || e && i.filter && "none" !== i.filter)
                        return n;
                    n = n.parentNode
                }
                return null
            }(t) || e
        }
        function J(t) {
            return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
        }
        function K(t, e, n) {
            return F(t, P(e, n))
        }
        function G(t) {
            return Object.assign({}, {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }, t)
        }
        function Q(t, e) {
            return e.reduce((function(e, n) {
                return e[n] = t,
                e
            }
            ), {})
        }
        var X = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e, n = t.state, i = t.name, l = t.options, u = n.elements.arrow, d = n.modifiersData.popperOffsets, h = N(n.placement), p = J(h), m = [a, r].indexOf(h) >= 0 ? "height" : "width";
                if (u && d) {
                    var f = function(t, e) {
                        return G("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                            placement: e.placement
                        })) : t) ? t : Q(t, c))
                    }(l.padding, n)
                      , g = $(u)
                      , v = "y" === p ? s : a
                      , y = "y" === p ? o : r
                      , b = n.rects.reference[m] + n.rects.reference[p] - d[p] - n.rects.popper[m]
                      , _ = d[p] - n.rects.reference[p]
                      , w = Z(u)
                      , k = w ? "y" === p ? w.clientHeight || 0 : w.clientWidth || 0 : 0
                      , x = b / 2 - _ / 2
                      , T = f[v]
                      , E = k - g[m] - f[y]
                      , D = k / 2 - g[m] / 2 + x
                      , S = K(T, D, E)
                      , O = p;
                    n.modifiersData[i] = ((e = {})[O] = S,
                    e.centerOffset = S - D,
                    e)
                }
            },
            effect: function(t) {
                var e = t.state
                  , n = t.options.element
                  , i = void 0 === n ? "[data-popper-arrow]" : n;
                null != i && ("string" != typeof i || (i = e.elements.popper.querySelector(i))) && B(e.elements.popper, i) && (e.elements.arrow = i)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };
        function tt(t) {
            return t.split("-")[1]
        }
        var et = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function nt(t) {
            var e, n = t.popper, i = t.popperRect, l = t.placement, c = t.variation, u = t.offsets, h = t.position, p = t.gpuAcceleration, m = t.adaptive, f = t.roundOffsets, g = t.isFixed, v = u.x, y = void 0 === v ? 0 : v, b = u.y, _ = void 0 === b ? 0 : b, w = "function" == typeof f ? f({
                x: y,
                y: _
            }) : {
                x: y,
                y: _
            };
            y = w.x,
            _ = w.y;
            var k = u.hasOwnProperty("x")
              , x = u.hasOwnProperty("y")
              , T = a
              , E = s
              , D = window;
            if (m) {
                var S = Z(n)
                  , O = "clientHeight"
                  , L = "clientWidth";
                if (S === C(n) && "static" !== R(S = Y(n)).position && "absolute" === h && (O = "scrollHeight",
                L = "scrollWidth"),
                l === s || (l === a || l === r) && c === d)
                    E = o,
                    _ -= (g && S === D && D.visualViewport ? D.visualViewport.height : S[O]) - i.height,
                    _ *= p ? 1 : -1;
                if (l === a || (l === s || l === o) && c === d)
                    T = r,
                    y -= (g && S === D && D.visualViewport ? D.visualViewport.width : S[L]) - i.width,
                    y *= p ? 1 : -1
            }
            var M, I = Object.assign({
                position: h
            }, m && et), A = !0 === f ? function(t, e) {
                var n = t.x
                  , i = t.y
                  , s = e.devicePixelRatio || 1;
                return {
                    x: j(n * s) / s || 0,
                    y: j(i * s) / s || 0
                }
            }({
                x: y,
                y: _
            }, C(n)) : {
                x: y,
                y: _
            };
            return y = A.x,
            _ = A.y,
            p ? Object.assign({}, I, ((M = {})[E] = x ? "0" : "",
            M[T] = k ? "0" : "",
            M.transform = (D.devicePixelRatio || 1) <= 1 ? "translate(" + y + "px, " + _ + "px)" : "translate3d(" + y + "px, " + _ + "px, 0)",
            M)) : Object.assign({}, I, ((e = {})[E] = x ? _ + "px" : "",
            e[T] = k ? y + "px" : "",
            e.transform = "",
            e))
        }
        var it = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(t) {
                var e = t.state
                  , n = t.options
                  , i = n.gpuAcceleration
                  , s = void 0 === i || i
                  , o = n.adaptive
                  , r = void 0 === o || o
                  , a = n.roundOffsets
                  , l = void 0 === a || a
                  , c = {
                    placement: N(e.placement),
                    variation: tt(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: s,
                    isFixed: "fixed" === e.options.strategy
                };
                null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, nt(Object.assign({}, c, {
                    offsets: e.modifiersData.popperOffsets,
                    position: e.options.strategy,
                    adaptive: r,
                    roundOffsets: l
                })))),
                null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, nt(Object.assign({}, c, {
                    offsets: e.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))),
                e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-placement": e.placement
                })
            },
            data: {}
        }
          , st = {
            passive: !0
        };
        var ot = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(t) {
                var e = t.state
                  , n = t.instance
                  , i = t.options
                  , s = i.scroll
                  , o = void 0 === s || s
                  , r = i.resize
                  , a = void 0 === r || r
                  , l = C(e.elements.popper)
                  , c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return o && c.forEach((function(t) {
                    t.addEventListener("scroll", n.update, st)
                }
                )),
                a && l.addEventListener("resize", n.update, st),
                function() {
                    o && c.forEach((function(t) {
                        t.removeEventListener("scroll", n.update, st)
                    }
                    )),
                    a && l.removeEventListener("resize", n.update, st)
                }
            },
            data: {}
        }
          , rt = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function at(t) {
            return t.replace(/left|right|bottom|top/g, (function(t) {
                return rt[t]
            }
            ))
        }
        var lt = {
            start: "end",
            end: "start"
        };
        function ct(t) {
            return t.replace(/start|end/g, (function(t) {
                return lt[t]
            }
            ))
        }
        function ut(t) {
            var e = C(t);
            return {
                scrollLeft: e.pageXOffset,
                scrollTop: e.pageYOffset
            }
        }
        function dt(t) {
            return V(Y(t)).left + ut(t).scrollLeft
        }
        function ht(t) {
            var e = R(t)
              , n = e.overflow
              , i = e.overflowX
              , s = e.overflowY;
            return /auto|scroll|overlay|hidden/.test(n + s + i)
        }
        function pt(t) {
            return ["html", "body", "#document"].indexOf(O(t)) >= 0 ? t.ownerDocument.body : M(t) && ht(t) ? t : pt(U(t))
        }
        function mt(t, e) {
            var n;
            void 0 === e && (e = []);
            var i = pt(t)
              , s = i === (null == (n = t.ownerDocument) ? void 0 : n.body)
              , o = C(i)
              , r = s ? [o].concat(o.visualViewport || [], ht(i) ? i : []) : i
              , a = e.concat(r);
            return s ? a : a.concat(mt(U(r)))
        }
        function ft(t) {
            return Object.assign({}, t, {
                left: t.x,
                top: t.y,
                right: t.x + t.width,
                bottom: t.y + t.height
            })
        }
        function gt(t, e, n) {
            return e === p ? ft(function(t, e) {
                var n = C(t)
                  , i = Y(t)
                  , s = n.visualViewport
                  , o = i.clientWidth
                  , r = i.clientHeight
                  , a = 0
                  , l = 0;
                if (s) {
                    o = s.width,
                    r = s.height;
                    var c = H();
                    (c || !c && "fixed" === e) && (a = s.offsetLeft,
                    l = s.offsetTop)
                }
                return {
                    width: o,
                    height: r,
                    x: a + dt(t),
                    y: l
                }
            }(t, n)) : L(e) ? function(t, e) {
                var n = V(t, !1, "fixed" === e);
                return n.top = n.top + t.clientTop,
                n.left = n.left + t.clientLeft,
                n.bottom = n.top + t.clientHeight,
                n.right = n.left + t.clientWidth,
                n.width = t.clientWidth,
                n.height = t.clientHeight,
                n.x = n.left,
                n.y = n.top,
                n
            }(e, n) : ft(function(t) {
                var e, n = Y(t), i = ut(t), s = null == (e = t.ownerDocument) ? void 0 : e.body, o = F(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), r = F(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -i.scrollLeft + dt(t), l = -i.scrollTop;
                return "rtl" === R(s || n).direction && (a += F(n.clientWidth, s ? s.clientWidth : 0) - o),
                {
                    width: o,
                    height: r,
                    x: a,
                    y: l
                }
            }(Y(t)))
        }
        function vt(t, e, n, i) {
            var s = "clippingParents" === e ? function(t) {
                var e = mt(U(t))
                  , n = ["absolute", "fixed"].indexOf(R(t).position) >= 0 && M(t) ? Z(t) : t;
                return L(n) ? e.filter((function(t) {
                    return L(t) && B(t, n) && "body" !== O(t)
                }
                )) : []
            }(t) : [].concat(e)
              , o = [].concat(s, [n])
              , r = o[0]
              , a = o.reduce((function(e, n) {
                var s = gt(t, n, i);
                return e.top = F(s.top, e.top),
                e.right = P(s.right, e.right),
                e.bottom = P(s.bottom, e.bottom),
                e.left = F(s.left, e.left),
                e
            }
            ), gt(t, r, i));
            return a.width = a.right - a.left,
            a.height = a.bottom - a.top,
            a.x = a.left,
            a.y = a.top,
            a
        }
        function yt(t) {
            var e, n = t.reference, i = t.element, l = t.placement, c = l ? N(l) : null, h = l ? tt(l) : null, p = n.x + n.width / 2 - i.width / 2, m = n.y + n.height / 2 - i.height / 2;
            switch (c) {
            case s:
                e = {
                    x: p,
                    y: n.y - i.height
                };
                break;
            case o:
                e = {
                    x: p,
                    y: n.y + n.height
                };
                break;
            case r:
                e = {
                    x: n.x + n.width,
                    y: m
                };
                break;
            case a:
                e = {
                    x: n.x - i.width,
                    y: m
                };
                break;
            default:
                e = {
                    x: n.x,
                    y: n.y
                }
            }
            var f = c ? J(c) : null;
            if (null != f) {
                var g = "y" === f ? "height" : "width";
                switch (h) {
                case u:
                    e[f] = e[f] - (n[g] / 2 - i[g] / 2);
                    break;
                case d:
                    e[f] = e[f] + (n[g] / 2 - i[g] / 2)
                }
            }
            return e
        }
        function bt(t, e) {
            void 0 === e && (e = {});
            var n = e
              , i = n.placement
              , a = void 0 === i ? t.placement : i
              , l = n.strategy
              , u = void 0 === l ? t.strategy : l
              , d = n.boundary
              , g = void 0 === d ? h : d
              , v = n.rootBoundary
              , y = void 0 === v ? p : v
              , b = n.elementContext
              , _ = void 0 === b ? m : b
              , w = n.altBoundary
              , k = void 0 !== w && w
              , x = n.padding
              , T = void 0 === x ? 0 : x
              , E = G("number" != typeof T ? T : Q(T, c))
              , D = _ === m ? f : m
              , S = t.rects.popper
              , O = t.elements[k ? D : _]
              , C = vt(L(O) ? O : O.contextElement || Y(t.elements.popper), g, y, u)
              , M = V(t.elements.reference)
              , I = yt({
                reference: M,
                element: S,
                strategy: "absolute",
                placement: a
            })
              , A = ft(Object.assign({}, S, I))
              , N = _ === m ? A : M
              , F = {
                top: C.top - N.top + E.top,
                bottom: N.bottom - C.bottom + E.bottom,
                left: C.left - N.left + E.left,
                right: N.right - C.right + E.right
            }
              , P = t.modifiersData.offset;
            if (_ === m && P) {
                var j = P[a];
                Object.keys(F).forEach((function(t) {
                    var e = [r, o].indexOf(t) >= 0 ? 1 : -1
                      , n = [s, o].indexOf(t) >= 0 ? "y" : "x";
                    F[t] += j[n] * e
                }
                ))
            }
            return F
        }
        var _t = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state
                  , n = t.options
                  , i = t.name;
                if (!e.modifiersData[i]._skip) {
                    for (var d = n.mainAxis, h = void 0 === d || d, p = n.altAxis, m = void 0 === p || p, f = n.fallbackPlacements, y = n.padding, b = n.boundary, _ = n.rootBoundary, w = n.altBoundary, k = n.flipVariations, x = void 0 === k || k, T = n.allowedAutoPlacements, E = e.options.placement, D = N(E), S = f || (D === E || !x ? [at(E)] : function(t) {
                        if (N(t) === l)
                            return [];
                        var e = at(t);
                        return [ct(t), e, ct(e)]
                    }(E)), O = [E].concat(S).reduce((function(t, n) {
                        return t.concat(N(n) === l ? function(t, e) {
                            void 0 === e && (e = {});
                            var n = e
                              , i = n.placement
                              , s = n.boundary
                              , o = n.rootBoundary
                              , r = n.padding
                              , a = n.flipVariations
                              , l = n.allowedAutoPlacements
                              , u = void 0 === l ? v : l
                              , d = tt(i)
                              , h = d ? a ? g : g.filter((function(t) {
                                return tt(t) === d
                            }
                            )) : c
                              , p = h.filter((function(t) {
                                return u.indexOf(t) >= 0
                            }
                            ));
                            0 === p.length && (p = h);
                            var m = p.reduce((function(e, n) {
                                return e[n] = bt(t, {
                                    placement: n,
                                    boundary: s,
                                    rootBoundary: o,
                                    padding: r
                                })[N(n)],
                                e
                            }
                            ), {});
                            return Object.keys(m).sort((function(t, e) {
                                return m[t] - m[e]
                            }
                            ))
                        }(e, {
                            placement: n,
                            boundary: b,
                            rootBoundary: _,
                            padding: y,
                            flipVariations: x,
                            allowedAutoPlacements: T
                        }) : n)
                    }
                    ), []), C = e.rects.reference, L = e.rects.popper, M = new Map, I = !0, A = O[0], F = 0; F < O.length; F++) {
                        var P = O[F]
                          , j = N(P)
                          , q = tt(P) === u
                          , H = [s, o].indexOf(j) >= 0
                          , V = H ? "width" : "height"
                          , $ = bt(e, {
                            placement: P,
                            boundary: b,
                            rootBoundary: _,
                            altBoundary: w,
                            padding: y
                        })
                          , B = H ? q ? r : a : q ? o : s;
                        C[V] > L[V] && (B = at(B));
                        var R = at(B)
                          , z = [];
                        if (h && z.push($[j] <= 0),
                        m && z.push($[B] <= 0, $[R] <= 0),
                        z.every((function(t) {
                            return t
                        }
                        ))) {
                            A = P,
                            I = !1;
                            break
                        }
                        M.set(P, z)
                    }
                    if (I)
                        for (var Y = function(t) {
                            var e = O.find((function(e) {
                                var n = M.get(e);
                                if (n)
                                    return n.slice(0, t).every((function(t) {
                                        return t
                                    }
                                    ))
                            }
                            ));
                            if (e)
                                return A = e,
                                "break"
                        }, U = x ? 3 : 1; U > 0; U--) {
                            if ("break" === Y(U))
                                break
                        }
                    e.placement !== A && (e.modifiersData[i]._skip = !0,
                    e.placement = A,
                    e.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        };
        function wt(t, e, n) {
            return void 0 === n && (n = {
                x: 0,
                y: 0
            }),
            {
                top: t.top - e.height - n.y,
                right: t.right - e.width + n.x,
                bottom: t.bottom - e.height + n.y,
                left: t.left - e.width - n.x
            }
        }
        function kt(t) {
            return [s, r, o, a].some((function(e) {
                return t[e] >= 0
            }
            ))
        }
        var xt = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(t) {
                var e = t.state
                  , n = t.name
                  , i = e.rects.reference
                  , s = e.rects.popper
                  , o = e.modifiersData.preventOverflow
                  , r = bt(e, {
                    elementContext: "reference"
                })
                  , a = bt(e, {
                    altBoundary: !0
                })
                  , l = wt(r, i)
                  , c = wt(a, s, o)
                  , u = kt(l)
                  , d = kt(c);
                e.modifiersData[n] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: u,
                    hasPopperEscaped: d
                },
                e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": u,
                    "data-popper-escaped": d
                })
            }
        };
        var Tt = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(t) {
                var e = t.state
                  , n = t.options
                  , i = t.name
                  , o = n.offset
                  , l = void 0 === o ? [0, 0] : o
                  , c = v.reduce((function(t, n) {
                    return t[n] = function(t, e, n) {
                        var i = N(t)
                          , o = [a, s].indexOf(i) >= 0 ? -1 : 1
                          , l = "function" == typeof n ? n(Object.assign({}, e, {
                            placement: t
                        })) : n
                          , c = l[0]
                          , u = l[1];
                        return c = c || 0,
                        u = (u || 0) * o,
                        [a, r].indexOf(i) >= 0 ? {
                            x: u,
                            y: c
                        } : {
                            x: c,
                            y: u
                        }
                    }(n, e.rects, l),
                    t
                }
                ), {})
                  , u = c[e.placement]
                  , d = u.x
                  , h = u.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += d,
                e.modifiersData.popperOffsets.y += h),
                e.modifiersData[i] = c
            }
        };
        var Et = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(t) {
                var e = t.state
                  , n = t.name;
                e.modifiersData[n] = yt({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                })
            },
            data: {}
        };
        var Dt = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state
                  , n = t.options
                  , i = t.name
                  , l = n.mainAxis
                  , c = void 0 === l || l
                  , d = n.altAxis
                  , h = void 0 !== d && d
                  , p = n.boundary
                  , m = n.rootBoundary
                  , f = n.altBoundary
                  , g = n.padding
                  , v = n.tether
                  , y = void 0 === v || v
                  , b = n.tetherOffset
                  , _ = void 0 === b ? 0 : b
                  , w = bt(e, {
                    boundary: p,
                    rootBoundary: m,
                    padding: g,
                    altBoundary: f
                })
                  , k = N(e.placement)
                  , x = tt(e.placement)
                  , T = !x
                  , E = J(k)
                  , D = "x" === E ? "y" : "x"
                  , S = e.modifiersData.popperOffsets
                  , O = e.rects.reference
                  , C = e.rects.popper
                  , L = "function" == typeof _ ? _(Object.assign({}, e.rects, {
                    placement: e.placement
                })) : _
                  , M = "number" == typeof L ? {
                    mainAxis: L,
                    altAxis: L
                } : Object.assign({
                    mainAxis: 0,
                    altAxis: 0
                }, L)
                  , I = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null
                  , A = {
                    x: 0,
                    y: 0
                };
                if (S) {
                    if (c) {
                        var j, q = "y" === E ? s : a, H = "y" === E ? o : r, V = "y" === E ? "height" : "width", B = S[E], R = B + w[q], z = B - w[H], Y = y ? -C[V] / 2 : 0, U = x === u ? O[V] : C[V], W = x === u ? -C[V] : -O[V], G = e.elements.arrow, Q = y && G ? $(G) : {
                            width: 0,
                            height: 0
                        }, X = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }, et = X[q], nt = X[H], it = K(0, O[V], Q[V]), st = T ? O[V] / 2 - Y - it - et - M.mainAxis : U - it - et - M.mainAxis, ot = T ? -O[V] / 2 + Y + it + nt + M.mainAxis : W + it + nt + M.mainAxis, rt = e.elements.arrow && Z(e.elements.arrow), at = rt ? "y" === E ? rt.clientTop || 0 : rt.clientLeft || 0 : 0, lt = null != (j = null == I ? void 0 : I[E]) ? j : 0, ct = B + ot - lt, ut = K(y ? P(R, B + st - lt - at) : R, B, y ? F(z, ct) : z);
                        S[E] = ut,
                        A[E] = ut - B
                    }
                    if (h) {
                        var dt, ht = "x" === E ? s : a, pt = "x" === E ? o : r, mt = S[D], ft = "y" === D ? "height" : "width", gt = mt + w[ht], vt = mt - w[pt], yt = -1 !== [s, a].indexOf(k), _t = null != (dt = null == I ? void 0 : I[D]) ? dt : 0, wt = yt ? gt : mt - O[ft] - C[ft] - _t + M.altAxis, kt = yt ? mt + O[ft] + C[ft] - _t - M.altAxis : vt, xt = y && yt ? function(t, e, n) {
                            var i = K(t, e, n);
                            return i > n ? n : i
                        }(wt, mt, kt) : K(y ? wt : gt, mt, y ? kt : vt);
                        S[D] = xt,
                        A[D] = xt - mt
                    }
                    e.modifiersData[i] = A
                }
            },
            requiresIfExists: ["offset"]
        };
        function St(t, e, n) {
            void 0 === n && (n = !1);
            var i, s, o = M(e), r = M(e) && function(t) {
                var e = t.getBoundingClientRect()
                  , n = j(e.width) / t.offsetWidth || 1
                  , i = j(e.height) / t.offsetHeight || 1;
                return 1 !== n || 1 !== i
            }(e), a = Y(e), l = V(t, r, n), c = {
                scrollLeft: 0,
                scrollTop: 0
            }, u = {
                x: 0,
                y: 0
            };
            return (o || !o && !n) && (("body" !== O(e) || ht(a)) && (c = (i = e) !== C(i) && M(i) ? {
                scrollLeft: (s = i).scrollLeft,
                scrollTop: s.scrollTop
            } : ut(i)),
            M(e) ? ((u = V(e, !0)).x += e.clientLeft,
            u.y += e.clientTop) : a && (u.x = dt(a))),
            {
                x: l.left + c.scrollLeft - u.x,
                y: l.top + c.scrollTop - u.y,
                width: l.width,
                height: l.height
            }
        }
        function Ot(t) {
            var e = new Map
              , n = new Set
              , i = [];
            function s(t) {
                n.add(t.name),
                [].concat(t.requires || [], t.requiresIfExists || []).forEach((function(t) {
                    if (!n.has(t)) {
                        var i = e.get(t);
                        i && s(i)
                    }
                }
                )),
                i.push(t)
            }
            return t.forEach((function(t) {
                e.set(t.name, t)
            }
            )),
            t.forEach((function(t) {
                n.has(t.name) || s(t)
            }
            )),
            i
        }
        var Ct = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function Lt() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            return !e.some((function(t) {
                return !(t && "function" == typeof t.getBoundingClientRect)
            }
            ))
        }
        function Mt(t) {
            void 0 === t && (t = {});
            var e = t
              , n = e.defaultModifiers
              , i = void 0 === n ? [] : n
              , s = e.defaultOptions
              , o = void 0 === s ? Ct : s;
            return function(t, e, n) {
                void 0 === n && (n = o);
                var s, r, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, Ct, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: e
                    },
                    attributes: {},
                    styles: {}
                }, l = [], c = !1, u = {
                    state: a,
                    setOptions: function(n) {
                        var s = "function" == typeof n ? n(a.options) : n;
                        d(),
                        a.options = Object.assign({}, o, a.options, s),
                        a.scrollParents = {
                            reference: L(t) ? mt(t) : t.contextElement ? mt(t.contextElement) : [],
                            popper: mt(e)
                        };
                        var r = function(t) {
                            var e = Ot(t);
                            return S.reduce((function(t, n) {
                                return t.concat(e.filter((function(t) {
                                    return t.phase === n
                                }
                                )))
                            }
                            ), [])
                        }(function(t) {
                            var e = t.reduce((function(t, e) {
                                var n = t[e.name];
                                return t[e.name] = n ? Object.assign({}, n, e, {
                                    options: Object.assign({}, n.options, e.options),
                                    data: Object.assign({}, n.data, e.data)
                                }) : e,
                                t
                            }
                            ), {});
                            return Object.keys(e).map((function(t) {
                                return e[t]
                            }
                            ))
                        }([].concat(i, a.options.modifiers)));
                        return a.orderedModifiers = r.filter((function(t) {
                            return t.enabled
                        }
                        )),
                        a.orderedModifiers.forEach((function(t) {
                            var e = t.name
                              , n = t.options
                              , i = void 0 === n ? {} : n
                              , s = t.effect;
                            if ("function" == typeof s) {
                                var o = s({
                                    state: a,
                                    name: e,
                                    instance: u,
                                    options: i
                                })
                                  , r = function() {};
                                l.push(o || r)
                            }
                        }
                        )),
                        u.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var t = a.elements
                              , e = t.reference
                              , n = t.popper;
                            if (Lt(e, n)) {
                                a.rects = {
                                    reference: St(e, Z(n), "fixed" === a.options.strategy),
                                    popper: $(n)
                                },
                                a.reset = !1,
                                a.placement = a.options.placement,
                                a.orderedModifiers.forEach((function(t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data)
                                }
                                ));
                                for (var i = 0; i < a.orderedModifiers.length; i++)
                                    if (!0 !== a.reset) {
                                        var s = a.orderedModifiers[i]
                                          , o = s.fn
                                          , r = s.options
                                          , l = void 0 === r ? {} : r
                                          , d = s.name;
                                        "function" == typeof o && (a = o({
                                            state: a,
                                            options: l,
                                            name: d,
                                            instance: u
                                        }) || a)
                                    } else
                                        a.reset = !1,
                                        i = -1
                            }
                        }
                    },
                    update: (s = function() {
                        return new Promise((function(t) {
                            u.forceUpdate(),
                            t(a)
                        }
                        ))
                    }
                    ,
                    function() {
                        return r || (r = new Promise((function(t) {
                            Promise.resolve().then((function() {
                                r = void 0,
                                t(s())
                            }
                            ))
                        }
                        ))),
                        r
                    }
                    ),
                    destroy: function() {
                        d(),
                        c = !0
                    }
                };
                if (!Lt(t, e))
                    return u;
                function d() {
                    l.forEach((function(t) {
                        return t()
                    }
                    )),
                    l = []
                }
                return u.setOptions(n).then((function(t) {
                    !c && n.onFirstUpdate && n.onFirstUpdate(t)
                }
                )),
                u
            }
        }
        var It = Mt()
          , At = Mt({
            defaultModifiers: [ot, Et, it, A, Tt, _t, Dt, X, xt]
        })
          , Nt = Mt({
            defaultModifiers: [ot, Et, it, A]
        });
        const Ft = new Map
          , Pt = {
            set(t, e, n) {
                Ft.has(t) || Ft.set(t, new Map);
                const i = Ft.get(t);
                i.has(e) || 0 === i.size ? i.set(e, n) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`)
            },
            get: (t,e)=>Ft.has(t) && Ft.get(t).get(e) || null,
            remove(t, e) {
                if (!Ft.has(t))
                    return;
                const n = Ft.get(t);
                n.delete(e),
                0 === n.size && Ft.delete(t)
            }
        }
          , jt = "transitionend"
          , qt = t=>(t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, ((t,e)=>`#${CSS.escape(e)}`))),
        t)
          , Ht = t=>{
            t.dispatchEvent(new Event(jt))
        }
          , Vt = t=>!(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]),
        void 0 !== t.nodeType)
          , $t = t=>Vt(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(qt(t)) : null
          , Bt = t=>{
            if (!Vt(t) || 0 === t.getClientRects().length)
                return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility")
              , n = t.closest("details:not([open])");
            if (!n)
                return e;
            if (n !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== n)
                    return !1;
                if (null === e)
                    return !1
            }
            return e
        }
          , Rt = t=>!t || t.nodeType !== Node.ELEMENT_NODE || (!!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")))
          , zt = t=>{
            if (!document.documentElement.attachShadow)
                return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? zt(t.parentNode) : null
        }
          , Yt = ()=>{}
          , Ut = t=>{
            t.offsetHeight
        }
          , Wt = ()=>window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null
          , Zt = []
          , Jt = ()=>"rtl" === document.documentElement.dir
          , Kt = t=>{
            var e;
            e = ()=>{
                const e = Wt();
                if (e) {
                    const n = t.NAME
                      , i = e.fn[n];
                    e.fn[n] = t.jQueryInterface,
                    e.fn[n].Constructor = t,
                    e.fn[n].noConflict = ()=>(e.fn[n] = i,
                    t.jQueryInterface)
                }
            }
            ,
            "loading" === document.readyState ? (Zt.length || document.addEventListener("DOMContentLoaded", (()=>{
                for (const t of Zt)
                    t()
            }
            )),
            Zt.push(e)) : e()
        }
          , Gt = (t,e=[],n=t)=>"function" == typeof t ? t(...e) : n
          , Qt = (t,e,n=!0)=>{
            if (!n)
                return void Gt(t);
            const i = (t=>{
                if (!t)
                    return 0;
                let {transitionDuration: e, transitionDelay: n} = window.getComputedStyle(t);
                const i = Number.parseFloat(e)
                  , s = Number.parseFloat(n);
                return i || s ? (e = e.split(",")[0],
                n = n.split(",")[0],
                1e3 * (Number.parseFloat(e) + Number.parseFloat(n))) : 0
            }
            )(e) + 5;
            let s = !1;
            const o = ({target: n})=>{
                n === e && (s = !0,
                e.removeEventListener(jt, o),
                Gt(t))
            }
            ;
            e.addEventListener(jt, o),
            setTimeout((()=>{
                s || Ht(e)
            }
            ), i)
        }
          , Xt = (t,e,n,i)=>{
            const s = t.length;
            let o = t.indexOf(e);
            return -1 === o ? !n && i ? t[s - 1] : t[0] : (o += n ? 1 : -1,
            i && (o = (o + s) % s),
            t[Math.max(0, Math.min(o, s - 1))])
        }
          , te = /[^.]*(?=\..*)\.|.*/
          , ee = /\..*/
          , ne = /::\d+$/
          , ie = {};
        let se = 1;
        const oe = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }
          , re = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
        function ae(t, e) {
            return e && `${e}::${se++}` || t.uidEvent || se++
        }
        function le(t) {
            const e = ae(t);
            return t.uidEvent = e,
            ie[e] = ie[e] || {},
            ie[e]
        }
        function ce(t, e, n=null) {
            return Object.values(t).find((t=>t.callable === e && t.delegationSelector === n))
        }
        function ue(t, e, n) {
            const i = "string" == typeof e
              , s = i ? n : e || n;
            let o = me(t);
            return re.has(o) || (o = t),
            [i, s, o]
        }
        function de(t, e, n, i, s) {
            if ("string" != typeof e || !t)
                return;
            let[o,r,a] = ue(e, n, i);
            if (e in oe) {
                const t = t=>function(e) {
                    if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))
                        return t.call(this, e)
                }
                ;
                r = t(r)
            }
            const l = le(t)
              , c = l[a] || (l[a] = {})
              , u = ce(c, r, o ? n : null);
            if (u)
                return void (u.oneOff = u.oneOff && s);
            const d = ae(r, e.replace(te, ""))
              , h = o ? function(t, e, n) {
                return function i(s) {
                    const o = t.querySelectorAll(e);
                    for (let {target: r} = s; r && r !== this; r = r.parentNode)
                        for (const a of o)
                            if (a === r)
                                return ge(s, {
                                    delegateTarget: r
                                }),
                                i.oneOff && fe.off(t, s.type, e, n),
                                n.apply(r, [s])
                }
            }(t, n, r) : function(t, e) {
                return function n(i) {
                    return ge(i, {
                        delegateTarget: t
                    }),
                    n.oneOff && fe.off(t, i.type, e),
                    e.apply(t, [i])
                }
            }(t, r);
            h.delegationSelector = o ? n : null,
            h.callable = r,
            h.oneOff = s,
            h.uidEvent = d,
            c[d] = h,
            t.addEventListener(a, h, o)
        }
        function he(t, e, n, i, s) {
            const o = ce(e[n], i, s);
            o && (t.removeEventListener(n, o, Boolean(s)),
            delete e[n][o.uidEvent])
        }
        function pe(t, e, n, i) {
            const s = e[n] || {};
            for (const [o,r] of Object.entries(s))
                o.includes(i) && he(t, e, n, r.callable, r.delegationSelector)
        }
        function me(t) {
            return t = t.replace(ee, ""),
            oe[t] || t
        }
        const fe = {
            on(t, e, n, i) {
                de(t, e, n, i, !1)
            },
            one(t, e, n, i) {
                de(t, e, n, i, !0)
            },
            off(t, e, n, i) {
                if ("string" != typeof e || !t)
                    return;
                const [s,o,r] = ue(e, n, i)
                  , a = r !== e
                  , l = le(t)
                  , c = l[r] || {}
                  , u = e.startsWith(".");
                if (void 0 === o) {
                    if (u)
                        for (const n of Object.keys(l))
                            pe(t, l, n, e.slice(1));
                    for (const [n,i] of Object.entries(c)) {
                        const s = n.replace(ne, "");
                        a && !e.includes(s) || he(t, l, r, i.callable, i.delegationSelector)
                    }
                } else {
                    if (!Object.keys(c).length)
                        return;
                    he(t, l, r, o, s ? n : null)
                }
            },
            trigger(t, e, n) {
                if ("string" != typeof e || !t)
                    return null;
                const i = Wt();
                let s = null
                  , o = !0
                  , r = !0
                  , a = !1;
                e !== me(e) && i && (s = i.Event(e, n),
                i(t).trigger(s),
                o = !s.isPropagationStopped(),
                r = !s.isImmediatePropagationStopped(),
                a = s.isDefaultPrevented());
                const l = ge(new Event(e,{
                    bubbles: o,
                    cancelable: !0
                }), n);
                return a && l.preventDefault(),
                r && t.dispatchEvent(l),
                l.defaultPrevented && s && s.preventDefault(),
                l
            }
        };
        function ge(t, e={}) {
            for (const [n,i] of Object.entries(e))
                try {
                    t[n] = i
                } catch (e) {
                    Object.defineProperty(t, n, {
                        configurable: !0,
                        get: ()=>i
                    })
                }
            return t
        }
        function ve(t) {
            if ("true" === t)
                return !0;
            if ("false" === t)
                return !1;
            if (t === Number(t).toString())
                return Number(t);
            if ("" === t || "null" === t)
                return null;
            if ("string" != typeof t)
                return t;
            try {
                return JSON.parse(decodeURIComponent(t))
            } catch (e) {
                return t
            }
        }
        function ye(t) {
            return t.replace(/[A-Z]/g, (t=>`-${t.toLowerCase()}`))
        }
        const be = {
            setDataAttribute(t, e, n) {
                t.setAttribute(`data-bs-${ye(e)}`, n)
            },
            removeDataAttribute(t, e) {
                t.removeAttribute(`data-bs-${ye(e)}`)
            },
            getDataAttributes(t) {
                if (!t)
                    return {};
                const e = {}
                  , n = Object.keys(t.dataset).filter((t=>t.startsWith("bs") && !t.startsWith("bsConfig")));
                for (const i of n) {
                    let n = i.replace(/^bs/, "");
                    n = n.charAt(0).toLowerCase() + n.slice(1, n.length),
                    e[n] = ve(t.dataset[i])
                }
                return e
            },
            getDataAttribute: (t,e)=>ve(t.getAttribute(`data-bs-${ye(e)}`))
        };
        class _e {
            static get Default() {
                return {}
            }
            static get DefaultType() {
                return {}
            }
            static get NAME() {
                throw new Error('You have to implement the static method "NAME", for each component!')
            }
            _getConfig(t) {
                return t = this._mergeConfigObj(t),
                t = this._configAfterMerge(t),
                this._typeCheckConfig(t),
                t
            }
            _configAfterMerge(t) {
                return t
            }
            _mergeConfigObj(t, e) {
                const n = Vt(e) ? be.getDataAttribute(e, "config") : {};
                return {
                    ...this.constructor.Default,
                    ..."object" == typeof n ? n : {},
                    ...Vt(e) ? be.getDataAttributes(e) : {},
                    ..."object" == typeof t ? t : {}
                }
            }
            _typeCheckConfig(t, e=this.constructor.DefaultType) {
                for (const [i,s] of Object.entries(e)) {
                    const e = t[i]
                      , o = Vt(e) ? "element" : null == (n = e) ? `${n}` : Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(s).test(o))
                        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${s}".`)
                }
                var n
            }
        }
        class we extends _e {
            constructor(t, e) {
                super(),
                (t = $t(t)) && (this._element = t,
                this._config = this._getConfig(e),
                Pt.set(this._element, this.constructor.DATA_KEY, this))
            }
            dispose() {
                Pt.remove(this._element, this.constructor.DATA_KEY),
                fe.off(this._element, this.constructor.EVENT_KEY);
                for (const t of Object.getOwnPropertyNames(this))
                    this[t] = null
            }
            _queueCallback(t, e, n=!0) {
                Qt(t, e, n)
            }
            _getConfig(t) {
                return t = this._mergeConfigObj(t, this._element),
                t = this._configAfterMerge(t),
                this._typeCheckConfig(t),
                t
            }
            static getInstance(t) {
                return Pt.get($t(t), this.DATA_KEY)
            }
            static getOrCreateInstance(t, e={}) {
                return this.getInstance(t) || new this(t,"object" == typeof e ? e : null)
            }
            static get VERSION() {
                return "5.3.0-alpha2"
            }
            static get DATA_KEY() {
                return `bs.${this.NAME}`
            }
            static get EVENT_KEY() {
                return `.${this.DATA_KEY}`
            }
            static eventName(t) {
                return `${t}${this.EVENT_KEY}`
            }
        }
        const ke = t=>{
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let n = t.getAttribute("href");
                if (!n || !n.includes("#") && !n.startsWith("."))
                    return null;
                n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`),
                e = n && "#" !== n ? n.trim() : null
            }
            return qt(e)
        }
          , xe = {
            find: (t,e=document.documentElement)=>[].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t,e=document.documentElement)=>Element.prototype.querySelector.call(e, t),
            children: (t,e)=>[].concat(...t.children).filter((t=>t.matches(e))),
            parents(t, e) {
                const n = [];
                let i = t.parentNode.closest(e);
                for (; i; )
                    n.push(i),
                    i = i.parentNode.closest(e);
                return n
            },
            prev(t, e) {
                let n = t.previousElementSibling;
                for (; n; ) {
                    if (n.matches(e))
                        return [n];
                    n = n.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let n = t.nextElementSibling;
                for (; n; ) {
                    if (n.matches(e))
                        return [n];
                    n = n.nextElementSibling
                }
                return []
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t=>`${t}:not([tabindex^="-"])`)).join(",");
                return this.find(e, t).filter((t=>!Rt(t) && Bt(t)))
            },
            getSelectorFromElement(t) {
                const e = ke(t);
                return e && xe.findOne(e) ? e : null
            },
            getElementFromSelector(t) {
                const e = ke(t);
                return e ? xe.findOne(e) : null
            },
            getMultipleElementsFromSelector(t) {
                const e = ke(t);
                return e ? xe.find(e) : []
            }
        }
          , Te = (t,e="hide")=>{
            const n = `click.dismiss ${t.EVENT_KEY}`
              , i = t.NAME;
            fe.on(document, n, `[data-bs-dismiss="${i}"]`, (function(n) {
                if (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
                Rt(this))
                    return;
                const s = xe.getElementFromSelector(this) || this.closest(`.${i}`);
                t.getOrCreateInstance(s)[e]()
            }
            ))
        }
        ;
        class Ee extends we {
            static get NAME() {
                return "alert"
            }
            close() {
                if (fe.trigger(this._element, "close.bs.alert").defaultPrevented)
                    return;
                this._element.classList.remove("show");
                const t = this._element.classList.contains("fade");
                this._queueCallback((()=>this._destroyElement()), this._element, t)
            }
            _destroyElement() {
                this._element.remove(),
                fe.trigger(this._element, "closed.bs.alert"),
                this.dispose()
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Ee.getOrCreateInstance(this);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                            throw new TypeError(`No method named "${t}"`);
                        e[t](this)
                    }
                }
                ))
            }
        }
        Te(Ee, "close"),
        Kt(Ee);
        const De = '[data-bs-toggle="button"]';
        class Se extends we {
            static get NAME() {
                return "button"
            }
            toggle() {
                this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Se.getOrCreateInstance(this);
                    "toggle" === t && e[t]()
                }
                ))
            }
        }
        fe.on(document, "click.bs.button.data-api", De, (t=>{
            t.preventDefault();
            const e = t.target.closest(De);
            Se.getOrCreateInstance(e).toggle()
        }
        )),
        Kt(Se);
        const Oe = ".bs.swipe"
          , Ce = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        }
          , Le = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
        class Me extends _e {
            constructor(t, e) {
                super(),
                this._element = t,
                t && Me.isSupported() && (this._config = this._getConfig(e),
                this._deltaX = 0,
                this._supportPointerEvents = Boolean(window.PointerEvent),
                this._initEvents())
            }
            static get Default() {
                return Ce
            }
            static get DefaultType() {
                return Le
            }
            static get NAME() {
                return "swipe"
            }
            dispose() {
                fe.off(this._element, Oe)
            }
            _start(t) {
                this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX
            }
            _end(t) {
                this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX),
                this._handleSwipe(),
                Gt(this._config.endCallback)
            }
            _move(t) {
                this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
            }
            _handleSwipe() {
                const t = Math.abs(this._deltaX);
                if (t <= 40)
                    return;
                const e = t / this._deltaX;
                this._deltaX = 0,
                e && Gt(e > 0 ? this._config.rightCallback : this._config.leftCallback)
            }
            _initEvents() {
                this._supportPointerEvents ? (fe.on(this._element, "pointerdown.bs.swipe", (t=>this._start(t))),
                fe.on(this._element, "pointerup.bs.swipe", (t=>this._end(t))),
                this._element.classList.add("pointer-event")) : (fe.on(this._element, "touchstart.bs.swipe", (t=>this._start(t))),
                fe.on(this._element, "touchmove.bs.swipe", (t=>this._move(t))),
                fe.on(this._element, "touchend.bs.swipe", (t=>this._end(t))))
            }
            _eventIsPointerPenTouch(t) {
                return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType)
            }
            static isSupported() {
                return "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0
            }
        }
        const Ie = "next"
          , Ae = "prev"
          , Ne = "left"
          , Fe = "right"
          , Pe = "slid.bs.carousel"
          , je = "carousel"
          , qe = "active"
          , He = ".active"
          , Ve = ".carousel-item"
          , $e = {
            ArrowLeft: Fe,
            ArrowRight: Ne
        }
          , Be = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        }
          , Re = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
        class ze extends we {
            constructor(t, e) {
                super(t, e),
                this._interval = null,
                this._activeElement = null,
                this._isSliding = !1,
                this.touchTimeout = null,
                this._swipeHelper = null,
                this._indicatorsElement = xe.findOne(".carousel-indicators", this._element),
                this._addEventListeners(),
                this._config.ride === je && this.cycle()
            }
            static get Default() {
                return Be
            }
            static get DefaultType() {
                return Re
            }
            static get NAME() {
                return "carousel"
            }
            next() {
                this._slide(Ie)
            }
            nextWhenVisible() {
                !document.hidden && Bt(this._element) && this.next()
            }
            prev() {
                this._slide(Ae)
            }
            pause() {
                this._isSliding && Ht(this._element),
                this._clearInterval()
            }
            cycle() {
                this._clearInterval(),
                this._updateInterval(),
                this._interval = setInterval((()=>this.nextWhenVisible()), this._config.interval)
            }
            _maybeEnableCycle() {
                this._config.ride && (this._isSliding ? fe.one(this._element, Pe, (()=>this.cycle())) : this.cycle())
            }
            to(t) {
                const e = this._getItems();
                if (t > e.length - 1 || t < 0)
                    return;
                if (this._isSliding)
                    return void fe.one(this._element, Pe, (()=>this.to(t)));
                const n = this._getItemIndex(this._getActive());
                if (n === t)
                    return;
                const i = t > n ? Ie : Ae;
                this._slide(i, e[t])
            }
            dispose() {
                this._swipeHelper && this._swipeHelper.dispose(),
                super.dispose()
            }
            _configAfterMerge(t) {
                return t.defaultInterval = t.interval,
                t
            }
            _addEventListeners() {
                this._config.keyboard && fe.on(this._element, "keydown.bs.carousel", (t=>this._keydown(t))),
                "hover" === this._config.pause && (fe.on(this._element, "mouseenter.bs.carousel", (()=>this.pause())),
                fe.on(this._element, "mouseleave.bs.carousel", (()=>this._maybeEnableCycle()))),
                this._config.touch && Me.isSupported() && this._addTouchEventListeners()
            }
            _addTouchEventListeners() {
                for (const t of xe.find(".carousel-item img", this._element))
                    fe.on(t, "dragstart.bs.carousel", (t=>t.preventDefault()));
                const t = {
                    leftCallback: ()=>this._slide(this._directionToOrder(Ne)),
                    rightCallback: ()=>this._slide(this._directionToOrder(Fe)),
                    endCallback: ()=>{
                        "hover" === this._config.pause && (this.pause(),
                        this.touchTimeout && clearTimeout(this.touchTimeout),
                        this.touchTimeout = setTimeout((()=>this._maybeEnableCycle()), 500 + this._config.interval))
                    }
                };
                this._swipeHelper = new Me(this._element,t)
            }
            _keydown(t) {
                if (/input|textarea/i.test(t.target.tagName))
                    return;
                const e = $e[t.key];
                e && (t.preventDefault(),
                this._slide(this._directionToOrder(e)))
            }
            _getItemIndex(t) {
                return this._getItems().indexOf(t)
            }
            _setActiveIndicatorElement(t) {
                if (!this._indicatorsElement)
                    return;
                const e = xe.findOne(He, this._indicatorsElement);
                e.classList.remove(qe),
                e.removeAttribute("aria-current");
                const n = xe.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
                n && (n.classList.add(qe),
                n.setAttribute("aria-current", "true"))
            }
            _updateInterval() {
                const t = this._activeElement || this._getActive();
                if (!t)
                    return;
                const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
                this._config.interval = e || this._config.defaultInterval
            }
            _slide(t, e=null) {
                if (this._isSliding)
                    return;
                const n = this._getActive()
                  , i = t === Ie
                  , s = e || Xt(this._getItems(), n, i, this._config.wrap);
                if (s === n)
                    return;
                const o = this._getItemIndex(s)
                  , r = e=>fe.trigger(this._element, e, {
                    relatedTarget: s,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(n),
                    to: o
                });
                if (r("slide.bs.carousel").defaultPrevented)
                    return;
                if (!n || !s)
                    return;
                const a = Boolean(this._interval);
                this.pause(),
                this._isSliding = !0,
                this._setActiveIndicatorElement(o),
                this._activeElement = s;
                const l = i ? "carousel-item-start" : "carousel-item-end"
                  , c = i ? "carousel-item-next" : "carousel-item-prev";
                s.classList.add(c),
                Ut(s),
                n.classList.add(l),
                s.classList.add(l);
                this._queueCallback((()=>{
                    s.classList.remove(l, c),
                    s.classList.add(qe),
                    n.classList.remove(qe, c, l),
                    this._isSliding = !1,
                    r(Pe)
                }
                ), n, this._isAnimated()),
                a && this.cycle()
            }
            _isAnimated() {
                return this._element.classList.contains("slide")
            }
            _getActive() {
                return xe.findOne(".active.carousel-item", this._element)
            }
            _getItems() {
                return xe.find(Ve, this._element)
            }
            _clearInterval() {
                this._interval && (clearInterval(this._interval),
                this._interval = null)
            }
            _directionToOrder(t) {
                return Jt() ? t === Ne ? Ae : Ie : t === Ne ? Ie : Ae
            }
            _orderToDirection(t) {
                return Jt() ? t === Ae ? Ne : Fe : t === Ae ? Fe : Ne
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = ze.getOrCreateInstance(this, t);
                    if ("number" != typeof t) {
                        if ("string" == typeof t) {
                            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                                throw new TypeError(`No method named "${t}"`);
                            e[t]()
                        }
                    } else
                        e.to(t)
                }
                ))
            }
        }
        fe.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(t) {
            const e = xe.getElementFromSelector(this);
            if (!e || !e.classList.contains(je))
                return;
            t.preventDefault();
            const n = ze.getOrCreateInstance(e)
              , i = this.getAttribute("data-bs-slide-to");
            return i ? (n.to(i),
            void n._maybeEnableCycle()) : "next" === be.getDataAttribute(this, "slide") ? (n.next(),
            void n._maybeEnableCycle()) : (n.prev(),
            void n._maybeEnableCycle())
        }
        )),
        fe.on(window, "load.bs.carousel.data-api", (()=>{
            const t = xe.find('[data-bs-ride="carousel"]');
            for (const e of t)
                ze.getOrCreateInstance(e)
        }
        )),
        Kt(ze);
        const Ye = "show"
          , Ue = "collapse"
          , We = "collapsing"
          , Ze = '[data-bs-toggle="collapse"]'
          , Je = {
            parent: null,
            toggle: !0
        }
          , Ke = {
            parent: "(null|element)",
            toggle: "boolean"
        };
        class Ge extends we {
            constructor(t, e) {
                super(t, e),
                this._isTransitioning = !1,
                this._triggerArray = [];
                const n = xe.find(Ze);
                for (const t of n) {
                    const e = xe.getSelectorFromElement(t)
                      , n = xe.find(e).filter((t=>t === this._element));
                    null !== e && n.length && this._triggerArray.push(t)
                }
                this._initializeChildren(),
                this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
                this._config.toggle && this.toggle()
            }
            static get Default() {
                return Je
            }
            static get DefaultType() {
                return Ke
            }
            static get NAME() {
                return "collapse"
            }
            toggle() {
                this._isShown() ? this.hide() : this.show()
            }
            show() {
                if (this._isTransitioning || this._isShown())
                    return;
                let t = [];
                if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t=>t !== this._element)).map((t=>Ge.getOrCreateInstance(t, {
                    toggle: !1
                })))),
                t.length && t[0]._isTransitioning)
                    return;
                if (fe.trigger(this._element, "show.bs.collapse").defaultPrevented)
                    return;
                for (const e of t)
                    e.hide();
                const e = this._getDimension();
                this._element.classList.remove(Ue),
                this._element.classList.add(We),
                this._element.style[e] = 0,
                this._addAriaAndCollapsedClass(this._triggerArray, !0),
                this._isTransitioning = !0;
                const n = `scroll ${e[0].toUpperCase() + e.slice(1)}`;
                this._queueCallback((()=>{
                    this._isTransitioning = !1,
                    this._element.classList.remove(We),
                    this._element.classList.add(Ue, Ye),
                    this._element.style[e] = "",
                    fe.trigger(this._element, "shown.bs.collapse")
                }
                ), this._element, !0),
                this._element.style[e] = `${this._element[n]}px`
            }
            hide() {
                if (this._isTransitioning || !this._isShown())
                    return;
                if (fe.trigger(this._element, "hide.bs.collapse").defaultPrevented)
                    return;
                const t = this._getDimension();
                this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`,
                Ut(this._element),
                this._element.classList.add(We),
                this._element.classList.remove(Ue, Ye);
                for (const t of this._triggerArray) {
                    const e = xe.getElementFromSelector(t);
                    e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
                }
                this._isTransitioning = !0;
                this._element.style[t] = "",
                this._queueCallback((()=>{
                    this._isTransitioning = !1,
                    this._element.classList.remove(We),
                    this._element.classList.add(Ue),
                    fe.trigger(this._element, "hidden.bs.collapse")
                }
                ), this._element, !0)
            }
            _isShown(t=this._element) {
                return t.classList.contains(Ye)
            }
            _configAfterMerge(t) {
                return t.toggle = Boolean(t.toggle),
                t.parent = $t(t.parent),
                t
            }
            _getDimension() {
                return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
            }
            _initializeChildren() {
                if (!this._config.parent)
                    return;
                const t = this._getFirstLevelChildren(Ze);
                for (const e of t) {
                    const t = xe.getElementFromSelector(e);
                    t && this._addAriaAndCollapsedClass([e], this._isShown(t))
                }
            }
            _getFirstLevelChildren(t) {
                const e = xe.find(":scope .collapse .collapse", this._config.parent);
                return xe.find(t, this._config.parent).filter((t=>!e.includes(t)))
            }
            _addAriaAndCollapsedClass(t, e) {
                if (t.length)
                    for (const n of t)
                        n.classList.toggle("collapsed", !e),
                        n.setAttribute("aria-expanded", e)
            }
            static jQueryInterface(t) {
                const e = {};
                return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1),
                this.each((function() {
                    const n = Ge.getOrCreateInstance(this, e);
                    if ("string" == typeof t) {
                        if (void 0 === n[t])
                            throw new TypeError(`No method named "${t}"`);
                        n[t]()
                    }
                }
                ))
            }
        }
        fe.on(document, "click.bs.collapse.data-api", Ze, (function(t) {
            ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
            for (const t of xe.getMultipleElementsFromSelector(this))
                Ge.getOrCreateInstance(t, {
                    toggle: !1
                }).toggle()
        }
        )),
        Kt(Ge);
        const Qe = "dropdown"
          , Xe = "ArrowUp"
          , tn = "ArrowDown"
          , en = "click.bs.dropdown.data-api"
          , nn = "keydown.bs.dropdown.data-api"
          , sn = "show"
          , on = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'
          , rn = `${on}.show`
          , an = ".dropdown-menu"
          , ln = Jt() ? "top-end" : "top-start"
          , cn = Jt() ? "top-start" : "top-end"
          , un = Jt() ? "bottom-end" : "bottom-start"
          , dn = Jt() ? "bottom-start" : "bottom-end"
          , hn = Jt() ? "left-start" : "right-start"
          , pn = Jt() ? "right-start" : "left-start"
          , mn = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        }
          , fn = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
        class gn extends we {
            constructor(t, e) {
                super(t, e),
                this._popper = null,
                this._parent = this._element.parentNode,
                this._menu = xe.next(this._element, an)[0] || xe.prev(this._element, an)[0] || xe.findOne(an, this._parent),
                this._inNavbar = this._detectNavbar()
            }
            static get Default() {
                return mn
            }
            static get DefaultType() {
                return fn
            }
            static get NAME() {
                return Qe
            }
            toggle() {
                return this._isShown() ? this.hide() : this.show()
            }
            show() {
                if (Rt(this._element) || this._isShown())
                    return;
                const t = {
                    relatedTarget: this._element
                };
                if (!fe.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) {
                    if (this._createPopper(),
                    "ontouchstart"in document.documentElement && !this._parent.closest(".navbar-nav"))
                        for (const t of [].concat(...document.body.children))
                            fe.on(t, "mouseover", Yt);
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    this._menu.classList.add(sn),
                    this._element.classList.add(sn),
                    fe.trigger(this._element, "shown.bs.dropdown", t)
                }
            }
            hide() {
                if (Rt(this._element) || !this._isShown())
                    return;
                const t = {
                    relatedTarget: this._element
                };
                this._completeHide(t)
            }
            dispose() {
                this._popper && this._popper.destroy(),
                super.dispose()
            }
            update() {
                this._inNavbar = this._detectNavbar(),
                this._popper && this._popper.update()
            }
            _completeHide(t) {
                if (!fe.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented) {
                    if ("ontouchstart"in document.documentElement)
                        for (const t of [].concat(...document.body.children))
                            fe.off(t, "mouseover", Yt);
                    this._popper && this._popper.destroy(),
                    this._menu.classList.remove(sn),
                    this._element.classList.remove(sn),
                    this._element.setAttribute("aria-expanded", "false"),
                    be.removeDataAttribute(this._menu, "popper"),
                    fe.trigger(this._element, "hidden.bs.dropdown", t)
                }
            }
            _getConfig(t) {
                if ("object" == typeof (t = super._getConfig(t)).reference && !Vt(t.reference) && "function" != typeof t.reference.getBoundingClientRect)
                    throw new TypeError(`${Qe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
                return t
            }
            _createPopper() {
                if (void 0 === i)
                    throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                let t = this._element;
                "parent" === this._config.reference ? t = this._parent : Vt(this._config.reference) ? t = $t(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
                const e = this._getPopperConfig();
                this._popper = At(t, this._menu, e)
            }
            _isShown() {
                return this._menu.classList.contains(sn)
            }
            _getPlacement() {
                const t = this._parent;
                if (t.classList.contains("dropend"))
                    return hn;
                if (t.classList.contains("dropstart"))
                    return pn;
                if (t.classList.contains("dropup-center"))
                    return "top";
                if (t.classList.contains("dropdown-center"))
                    return "bottom";
                const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
                return t.classList.contains("dropup") ? e ? cn : ln : e ? dn : un
            }
            _detectNavbar() {
                return null !== this._element.closest(".navbar")
            }
            _getOffset() {
                const {offset: t} = this._config;
                return "string" == typeof t ? t.split(",").map((t=>Number.parseInt(t, 10))) : "function" == typeof t ? e=>t(e, this._element) : t
            }
            _getPopperConfig() {
                const t = {
                    placement: this._getPlacement(),
                    modifiers: [{
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    }]
                };
                return (this._inNavbar || "static" === this._config.display) && (be.setDataAttribute(this._menu, "popper", "static"),
                t.modifiers = [{
                    name: "applyStyles",
                    enabled: !1
                }]),
                {
                    ...t,
                    ...Gt(this._config.popperConfig, [t])
                }
            }
            _selectMenuItem({key: t, target: e}) {
                const n = xe.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t=>Bt(t)));
                n.length && Xt(n, e, t === tn, !n.includes(e)).focus()
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = gn.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                }
                ))
            }
            static clearMenus(t) {
                if (2 === t.button || "keyup" === t.type && "Tab" !== t.key)
                    return;
                const e = xe.find(rn);
                for (const n of e) {
                    const e = gn.getInstance(n);
                    if (!e || !1 === e._config.autoClose)
                        continue;
                    const i = t.composedPath()
                      , s = i.includes(e._menu);
                    if (i.includes(e._element) || "inside" === e._config.autoClose && !s || "outside" === e._config.autoClose && s)
                        continue;
                    if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName)))
                        continue;
                    const o = {
                        relatedTarget: e._element
                    };
                    "click" === t.type && (o.clickEvent = t),
                    e._completeHide(o)
                }
            }
            static dataApiKeydownHandler(t) {
                const e = /input|textarea/i.test(t.target.tagName)
                  , n = "Escape" === t.key
                  , i = [Xe, tn].includes(t.key);
                if (!i && !n)
                    return;
                if (e && !n)
                    return;
                t.preventDefault();
                const s = this.matches(on) ? this : xe.prev(this, on)[0] || xe.next(this, on)[0] || xe.findOne(on, t.delegateTarget.parentNode)
                  , o = gn.getOrCreateInstance(s);
                if (i)
                    return t.stopPropagation(),
                    o.show(),
                    void o._selectMenuItem(t);
                o._isShown() && (t.stopPropagation(),
                o.hide(),
                s.focus())
            }
        }
        fe.on(document, nn, on, gn.dataApiKeydownHandler),
        fe.on(document, nn, an, gn.dataApiKeydownHandler),
        fe.on(document, en, gn.clearMenus),
        fe.on(document, "keyup.bs.dropdown.data-api", gn.clearMenus),
        fe.on(document, en, on, (function(t) {
            t.preventDefault(),
            gn.getOrCreateInstance(this).toggle()
        }
        )),
        Kt(gn);
        const vn = "backdrop"
          , yn = "show"
          , bn = "mousedown.bs.backdrop"
          , _n = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        }
          , wn = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
        class kn extends _e {
            constructor(t) {
                super(),
                this._config = this._getConfig(t),
                this._isAppended = !1,
                this._element = null
            }
            static get Default() {
                return _n
            }
            static get DefaultType() {
                return wn
            }
            static get NAME() {
                return vn
            }
            show(t) {
                if (!this._config.isVisible)
                    return void Gt(t);
                this._append();
                const e = this._getElement();
                this._config.isAnimated && Ut(e),
                e.classList.add(yn),
                this._emulateAnimation((()=>{
                    Gt(t)
                }
                ))
            }
            hide(t) {
                this._config.isVisible ? (this._getElement().classList.remove(yn),
                this._emulateAnimation((()=>{
                    this.dispose(),
                    Gt(t)
                }
                ))) : Gt(t)
            }
            dispose() {
                this._isAppended && (fe.off(this._element, bn),
                this._element.remove(),
                this._isAppended = !1)
            }
            _getElement() {
                if (!this._element) {
                    const t = document.createElement("div");
                    t.className = this._config.className,
                    this._config.isAnimated && t.classList.add("fade"),
                    this._element = t
                }
                return this._element
            }
            _configAfterMerge(t) {
                return t.rootElement = $t(t.rootElement),
                t
            }
            _append() {
                if (this._isAppended)
                    return;
                const t = this._getElement();
                this._config.rootElement.append(t),
                fe.on(t, bn, (()=>{
                    Gt(this._config.clickCallback)
                }
                )),
                this._isAppended = !0
            }
            _emulateAnimation(t) {
                Qt(t, this._getElement(), this._config.isAnimated)
            }
        }
        const xn = ".bs.focustrap"
          , Tn = "backward"
          , En = {
            autofocus: !0,
            trapElement: null
        }
          , Dn = {
            autofocus: "boolean",
            trapElement: "element"
        };
        class Sn extends _e {
            constructor(t) {
                super(),
                this._config = this._getConfig(t),
                this._isActive = !1,
                this._lastTabNavDirection = null
            }
            static get Default() {
                return En
            }
            static get DefaultType() {
                return Dn
            }
            static get NAME() {
                return "focustrap"
            }
            activate() {
                this._isActive || (this._config.autofocus && this._config.trapElement.focus(),
                fe.off(document, xn),
                fe.on(document, "focusin.bs.focustrap", (t=>this._handleFocusin(t))),
                fe.on(document, "keydown.tab.bs.focustrap", (t=>this._handleKeydown(t))),
                this._isActive = !0)
            }
            deactivate() {
                this._isActive && (this._isActive = !1,
                fe.off(document, xn))
            }
            _handleFocusin(t) {
                const {trapElement: e} = this._config;
                if (t.target === document || t.target === e || e.contains(t.target))
                    return;
                const n = xe.focusableChildren(e);
                0 === n.length ? e.focus() : this._lastTabNavDirection === Tn ? n[n.length - 1].focus() : n[0].focus()
            }
            _handleKeydown(t) {
                "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? Tn : "forward")
            }
        }
        const On = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
          , Cn = ".sticky-top"
          , Ln = "padding-right"
          , Mn = "margin-right";
        class In {
            constructor() {
                this._element = document.body
            }
            getWidth() {
                const t = document.documentElement.clientWidth;
                return Math.abs(window.innerWidth - t)
            }
            hide() {
                const t = this.getWidth();
                this._disableOverFlow(),
                this._setElementAttributes(this._element, Ln, (e=>e + t)),
                this._setElementAttributes(On, Ln, (e=>e + t)),
                this._setElementAttributes(Cn, Mn, (e=>e - t))
            }
            reset() {
                this._resetElementAttributes(this._element, "overflow"),
                this._resetElementAttributes(this._element, Ln),
                this._resetElementAttributes(On, Ln),
                this._resetElementAttributes(Cn, Mn)
            }
            isOverflowing() {
                return this.getWidth() > 0
            }
            _disableOverFlow() {
                this._saveInitialAttribute(this._element, "overflow"),
                this._element.style.overflow = "hidden"
            }
            _setElementAttributes(t, e, n) {
                const i = this.getWidth();
                this._applyManipulationCallback(t, (t=>{
                    if (t !== this._element && window.innerWidth > t.clientWidth + i)
                        return;
                    this._saveInitialAttribute(t, e);
                    const s = window.getComputedStyle(t).getPropertyValue(e);
                    t.style.setProperty(e, `${n(Number.parseFloat(s))}px`)
                }
                ))
            }
            _saveInitialAttribute(t, e) {
                const n = t.style.getPropertyValue(e);
                n && be.setDataAttribute(t, e, n)
            }
            _resetElementAttributes(t, e) {
                this._applyManipulationCallback(t, (t=>{
                    const n = be.getDataAttribute(t, e);
                    null !== n ? (be.removeDataAttribute(t, e),
                    t.style.setProperty(e, n)) : t.style.removeProperty(e)
                }
                ))
            }
            _applyManipulationCallback(t, e) {
                if (Vt(t))
                    e(t);
                else
                    for (const n of xe.find(t, this._element))
                        e(n)
            }
        }
        const An = ".bs.modal"
          , Nn = "hidden.bs.modal"
          , Fn = "show.bs.modal"
          , Pn = "modal-open"
          , jn = "show"
          , qn = "modal-static"
          , Hn = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        }
          , Vn = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
        class $n extends we {
            constructor(t, e) {
                super(t, e),
                this._dialog = xe.findOne(".modal-dialog", this._element),
                this._backdrop = this._initializeBackDrop(),
                this._focustrap = this._initializeFocusTrap(),
                this._isShown = !1,
                this._isTransitioning = !1,
                this._scrollBar = new In,
                this._addEventListeners()
            }
            static get Default() {
                return Hn
            }
            static get DefaultType() {
                return Vn
            }
            static get NAME() {
                return "modal"
            }
            toggle(t) {
                return this._isShown ? this.hide() : this.show(t)
            }
            show(t) {
                if (this._isShown || this._isTransitioning)
                    return;
                fe.trigger(this._element, Fn, {
                    relatedTarget: t
                }).defaultPrevented || (this._isShown = !0,
                this._isTransitioning = !0,
                this._scrollBar.hide(),
                document.body.classList.add(Pn),
                this._adjustDialog(),
                this._backdrop.show((()=>this._showElement(t))))
            }
            hide() {
                if (!this._isShown || this._isTransitioning)
                    return;
                fe.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1,
                this._isTransitioning = !0,
                this._focustrap.deactivate(),
                this._element.classList.remove(jn),
                this._queueCallback((()=>this._hideModal()), this._element, this._isAnimated()))
            }
            dispose() {
                fe.off(window, An),
                fe.off(this._dialog, An),
                this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose()
            }
            handleUpdate() {
                this._adjustDialog()
            }
            _initializeBackDrop() {
                return new kn({
                    isVisible: Boolean(this._config.backdrop),
                    isAnimated: this._isAnimated()
                })
            }
            _initializeFocusTrap() {
                return new Sn({
                    trapElement: this._element
                })
            }
            _showElement(t) {
                document.body.contains(this._element) || document.body.append(this._element),
                this._element.style.display = "block",
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.scrollTop = 0;
                const e = xe.findOne(".modal-body", this._dialog);
                e && (e.scrollTop = 0),
                Ut(this._element),
                this._element.classList.add(jn);
                this._queueCallback((()=>{
                    this._config.focus && this._focustrap.activate(),
                    this._isTransitioning = !1,
                    fe.trigger(this._element, "shown.bs.modal", {
                        relatedTarget: t
                    })
                }
                ), this._dialog, this._isAnimated())
            }
            _addEventListeners() {
                fe.on(this._element, "keydown.dismiss.bs.modal", (t=>{
                    "Escape" === t.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
                }
                )),
                fe.on(window, "resize.bs.modal", (()=>{
                    this._isShown && !this._isTransitioning && this._adjustDialog()
                }
                )),
                fe.on(this._element, "mousedown.dismiss.bs.modal", (t=>{
                    fe.one(this._element, "click.dismiss.bs.modal", (e=>{
                        this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                    }
                    ))
                }
                ))
            }
            _hideModal() {
                this._element.style.display = "none",
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._isTransitioning = !1,
                this._backdrop.hide((()=>{
                    document.body.classList.remove(Pn),
                    this._resetAdjustments(),
                    this._scrollBar.reset(),
                    fe.trigger(this._element, Nn)
                }
                ))
            }
            _isAnimated() {
                return this._element.classList.contains("fade")
            }
            _triggerBackdropTransition() {
                if (fe.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
                    return;
                const t = this._element.scrollHeight > document.documentElement.clientHeight
                  , e = this._element.style.overflowY;
                "hidden" === e || this._element.classList.contains(qn) || (t || (this._element.style.overflowY = "hidden"),
                this._element.classList.add(qn),
                this._queueCallback((()=>{
                    this._element.classList.remove(qn),
                    this._queueCallback((()=>{
                        this._element.style.overflowY = e
                    }
                    ), this._dialog)
                }
                ), this._dialog),
                this._element.focus())
            }
            _adjustDialog() {
                const t = this._element.scrollHeight > document.documentElement.clientHeight
                  , e = this._scrollBar.getWidth()
                  , n = e > 0;
                if (n && !t) {
                    const t = Jt() ? "paddingLeft" : "paddingRight";
                    this._element.style[t] = `${e}px`
                }
                if (!n && t) {
                    const t = Jt() ? "paddingRight" : "paddingLeft";
                    this._element.style[t] = `${e}px`
                }
            }
            _resetAdjustments() {
                this._element.style.paddingLeft = "",
                this._element.style.paddingRight = ""
            }
            static jQueryInterface(t, e) {
                return this.each((function() {
                    const n = $n.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === n[t])
                            throw new TypeError(`No method named "${t}"`);
                        n[t](e)
                    }
                }
                ))
            }
        }
        fe.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(t) {
            const e = xe.getElementFromSelector(this);
            ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
            fe.one(e, Fn, (t=>{
                t.defaultPrevented || fe.one(e, Nn, (()=>{
                    Bt(this) && this.focus()
                }
                ))
            }
            ));
            const n = xe.findOne(".modal.show");
            n && $n.getInstance(n).hide();
            $n.getOrCreateInstance(e).toggle(this)
        }
        )),
        Te($n),
        Kt($n);
        const Bn = "show"
          , Rn = "showing"
          , zn = "hiding"
          , Yn = ".offcanvas.show"
          , Un = "hidePrevented.bs.offcanvas"
          , Wn = "hidden.bs.offcanvas"
          , Zn = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        }
          , Jn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
        class Kn extends we {
            constructor(t, e) {
                super(t, e),
                this._isShown = !1,
                this._backdrop = this._initializeBackDrop(),
                this._focustrap = this._initializeFocusTrap(),
                this._addEventListeners()
            }
            static get Default() {
                return Zn
            }
            static get DefaultType() {
                return Jn
            }
            static get NAME() {
                return "offcanvas"
            }
            toggle(t) {
                return this._isShown ? this.hide() : this.show(t)
            }
            show(t) {
                if (this._isShown)
                    return;
                if (fe.trigger(this._element, "show.bs.offcanvas", {
                    relatedTarget: t
                }).defaultPrevented)
                    return;
                this._isShown = !0,
                this._backdrop.show(),
                this._config.scroll || (new In).hide(),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.classList.add(Rn);
                this._queueCallback((()=>{
                    this._config.scroll && !this._config.backdrop || this._focustrap.activate(),
                    this._element.classList.add(Bn),
                    this._element.classList.remove(Rn),
                    fe.trigger(this._element, "shown.bs.offcanvas", {
                        relatedTarget: t
                    })
                }
                ), this._element, !0)
            }
            hide() {
                if (!this._isShown)
                    return;
                if (fe.trigger(this._element, "hide.bs.offcanvas").defaultPrevented)
                    return;
                this._focustrap.deactivate(),
                this._element.blur(),
                this._isShown = !1,
                this._element.classList.add(zn),
                this._backdrop.hide();
                this._queueCallback((()=>{
                    this._element.classList.remove(Bn, zn),
                    this._element.removeAttribute("aria-modal"),
                    this._element.removeAttribute("role"),
                    this._config.scroll || (new In).reset(),
                    fe.trigger(this._element, Wn)
                }
                ), this._element, !0)
            }
            dispose() {
                this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose()
            }
            _initializeBackDrop() {
                const t = Boolean(this._config.backdrop);
                return new kn({
                    className: "offcanvas-backdrop",
                    isVisible: t,
                    isAnimated: !0,
                    rootElement: this._element.parentNode,
                    clickCallback: t ? ()=>{
                        "static" !== this._config.backdrop ? this.hide() : fe.trigger(this._element, Un)
                    }
                    : null
                })
            }
            _initializeFocusTrap() {
                return new Sn({
                    trapElement: this._element
                })
            }
            _addEventListeners() {
                fe.on(this._element, "keydown.dismiss.bs.offcanvas", (t=>{
                    "Escape" === t.key && (this._config.keyboard ? this.hide() : fe.trigger(this._element, Un))
                }
                ))
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Kn.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                            throw new TypeError(`No method named "${t}"`);
                        e[t](this)
                    }
                }
                ))
            }
        }
        fe.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(t) {
            const e = xe.getElementFromSelector(this);
            if (["A", "AREA"].includes(this.tagName) && t.preventDefault(),
            Rt(this))
                return;
            fe.one(e, Wn, (()=>{
                Bt(this) && this.focus()
            }
            ));
            const n = xe.findOne(Yn);
            n && n !== e && Kn.getInstance(n).hide();
            Kn.getOrCreateInstance(e).toggle(this)
        }
        )),
        fe.on(window, "load.bs.offcanvas.data-api", (()=>{
            for (const t of xe.find(Yn))
                Kn.getOrCreateInstance(t).show()
        }
        )),
        fe.on(window, "resize.bs.offcanvas", (()=>{
            for (const t of xe.find("[aria-modal][class*=show][class*=offcanvas-]"))
                "fixed" !== getComputedStyle(t).position && Kn.getOrCreateInstance(t).hide()
        }
        )),
        Te(Kn),
        Kt(Kn);
        const Gn = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"])
          , Qn = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i
          , Xn = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i
          , ti = (t,e)=>{
            const n = t.nodeName.toLowerCase();
            return e.includes(n) ? !Gn.has(n) || Boolean(Qn.test(t.nodeValue) || Xn.test(t.nodeValue)) : e.filter((t=>t instanceof RegExp)).some((t=>t.test(n)))
        }
          , ei = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        };
        const ni = {
            allowList: ei,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        }
          , ii = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        }
          , si = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
        class oi extends _e {
            constructor(t) {
                super(),
                this._config = this._getConfig(t)
            }
            static get Default() {
                return ni
            }
            static get DefaultType() {
                return ii
            }
            static get NAME() {
                return "TemplateFactory"
            }
            getContent() {
                return Object.values(this._config.content).map((t=>this._resolvePossibleFunction(t))).filter(Boolean)
            }
            hasContent() {
                return this.getContent().length > 0
            }
            changeContent(t) {
                return this._checkContent(t),
                this._config.content = {
                    ...this._config.content,
                    ...t
                },
                this
            }
            toHtml() {
                const t = document.createElement("div");
                t.innerHTML = this._maybeSanitize(this._config.template);
                for (const [e,n] of Object.entries(this._config.content))
                    this._setContent(t, n, e);
                const e = t.children[0]
                  , n = this._resolvePossibleFunction(this._config.extraClass);
                return n && e.classList.add(...n.split(" ")),
                e
            }
            _typeCheckConfig(t) {
                super._typeCheckConfig(t),
                this._checkContent(t.content)
            }
            _checkContent(t) {
                for (const [e,n] of Object.entries(t))
                    super._typeCheckConfig({
                        selector: e,
                        entry: n
                    }, si)
            }
            _setContent(t, e, n) {
                const i = xe.findOne(n, t);
                i && ((e = this._resolvePossibleFunction(e)) ? Vt(e) ? this._putElementInTemplate($t(e), i) : this._config.html ? i.innerHTML = this._maybeSanitize(e) : i.textContent = e : i.remove())
            }
            _maybeSanitize(t) {
                return this._config.sanitize ? function(t, e, n) {
                    if (!t.length)
                        return t;
                    if (n && "function" == typeof n)
                        return n(t);
                    const i = (new window.DOMParser).parseFromString(t, "text/html")
                      , s = [].concat(...i.body.querySelectorAll("*"));
                    for (const t of s) {
                        const n = t.nodeName.toLowerCase();
                        if (!Object.keys(e).includes(n)) {
                            t.remove();
                            continue
                        }
                        const i = [].concat(...t.attributes)
                          , s = [].concat(e["*"] || [], e[n] || []);
                        for (const e of i)
                            ti(e, s) || t.removeAttribute(e.nodeName)
                    }
                    return i.body.innerHTML
                }(t, this._config.allowList, this._config.sanitizeFn) : t
            }
            _resolvePossibleFunction(t) {
                return Gt(t, [this])
            }
            _putElementInTemplate(t, e) {
                if (this._config.html)
                    return e.innerHTML = "",
                    void e.append(t);
                e.textContent = t.textContent
            }
        }
        const ri = new Set(["sanitize", "allowList", "sanitizeFn"])
          , ai = "fade"
          , li = "show"
          , ci = ".modal"
          , ui = "hide.bs.modal"
          , di = "hover"
          , hi = "focus"
          , pi = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: Jt() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: Jt() ? "right" : "left"
        }
          , mi = {
            allowList: ei,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        }
          , fi = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
        class gi extends we {
            constructor(t, e) {
                if (void 0 === i)
                    throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                super(t, e),
                this._isEnabled = !0,
                this._timeout = 0,
                this._isHovered = null,
                this._activeTrigger = {},
                this._popper = null,
                this._templateFactory = null,
                this._newContent = null,
                this.tip = null,
                this._setListeners(),
                this._config.selector || this._fixTitle()
            }
            static get Default() {
                return mi
            }
            static get DefaultType() {
                return fi
            }
            static get NAME() {
                return "tooltip"
            }
            enable() {
                this._isEnabled = !0
            }
            disable() {
                this._isEnabled = !1
            }
            toggleEnabled() {
                this._isEnabled = !this._isEnabled
            }
            toggle() {
                this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click,
                this._isShown() ? this._leave() : this._enter())
            }
            dispose() {
                clearTimeout(this._timeout),
                fe.off(this._element.closest(ci), ui, this._hideModalHandler),
                this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
                this._disposePopper(),
                super.dispose()
            }
            show() {
                if ("none" === this._element.style.display)
                    throw new Error("Please use show on visible elements");
                if (!this._isWithContent() || !this._isEnabled)
                    return;
                const t = fe.trigger(this._element, this.constructor.eventName("show"))
                  , e = (zt(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
                if (t.defaultPrevented || !e)
                    return;
                this._disposePopper();
                const n = this._getTipElement();
                this._element.setAttribute("aria-describedby", n.getAttribute("id"));
                const {container: i} = this._config;
                if (this._element.ownerDocument.documentElement.contains(this.tip) || (i.append(n),
                fe.trigger(this._element, this.constructor.eventName("inserted"))),
                this._popper = this._createPopper(n),
                n.classList.add(li),
                "ontouchstart"in document.documentElement)
                    for (const t of [].concat(...document.body.children))
                        fe.on(t, "mouseover", Yt);
                this._queueCallback((()=>{
                    fe.trigger(this._element, this.constructor.eventName("shown")),
                    !1 === this._isHovered && this._leave(),
                    this._isHovered = !1
                }
                ), this.tip, this._isAnimated())
            }
            hide() {
                if (!this._isShown())
                    return;
                if (fe.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented)
                    return;
                if (this._getTipElement().classList.remove(li),
                "ontouchstart"in document.documentElement)
                    for (const t of [].concat(...document.body.children))
                        fe.off(t, "mouseover", Yt);
                this._activeTrigger.click = !1,
                this._activeTrigger.focus = !1,
                this._activeTrigger.hover = !1,
                this._isHovered = null;
                this._queueCallback((()=>{
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(),
                    this._element.removeAttribute("aria-describedby"),
                    fe.trigger(this._element, this.constructor.eventName("hidden")))
                }
                ), this.tip, this._isAnimated())
            }
            update() {
                this._popper && this._popper.update()
            }
            _isWithContent() {
                return Boolean(this._getTitle())
            }
            _getTipElement() {
                return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
                this.tip
            }
            _createTipElement(t) {
                const e = this._getTemplateFactory(t).toHtml();
                if (!e)
                    return null;
                e.classList.remove(ai, li),
                e.classList.add(`bs-${this.constructor.NAME}-auto`);
                const n = (t=>{
                    do {
                        t += Math.floor(1e6 * Math.random())
                    } while (document.getElementById(t));
                    return t
                }
                )(this.constructor.NAME).toString();
                return e.setAttribute("id", n),
                this._isAnimated() && e.classList.add(ai),
                e
            }
            setContent(t) {
                this._newContent = t,
                this._isShown() && (this._disposePopper(),
                this.show())
            }
            _getTemplateFactory(t) {
                return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new oi({
                    ...this._config,
                    content: t,
                    extraClass: this._resolvePossibleFunction(this._config.customClass)
                }),
                this._templateFactory
            }
            _getContentForTemplate() {
                return {
                    ".tooltip-inner": this._getTitle()
                }
            }
            _getTitle() {
                return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
            }
            _initializeOnDelegatedTarget(t) {
                return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
            }
            _isAnimated() {
                return this._config.animation || this.tip && this.tip.classList.contains(ai)
            }
            _isShown() {
                return this.tip && this.tip.classList.contains(li)
            }
            _createPopper(t) {
                const e = Gt(this._config.placement, [this, t, this._element])
                  , n = pi[e.toUpperCase()];
                return At(this._element, t, this._getPopperConfig(n))
            }
            _getOffset() {
                const {offset: t} = this._config;
                return "string" == typeof t ? t.split(",").map((t=>Number.parseInt(t, 10))) : "function" == typeof t ? e=>t(e, this._element) : t
            }
            _resolvePossibleFunction(t) {
                return Gt(t, [this._element])
            }
            _getPopperConfig(t) {
                const e = {
                    placement: t,
                    modifiers: [{
                        name: "flip",
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    }, {
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "arrow",
                        options: {
                            element: `.${this.constructor.NAME}-arrow`
                        }
                    }, {
                        name: "preSetPlacement",
                        enabled: !0,
                        phase: "beforeMain",
                        fn: t=>{
                            this._getTipElement().setAttribute("data-popper-placement", t.state.placement)
                        }
                    }]
                };
                return {
                    ...e,
                    ...Gt(this._config.popperConfig, [e])
                }
            }
            _setListeners() {
                const t = this._config.trigger.split(" ");
                for (const e of t)
                    if ("click" === e)
                        fe.on(this._element, this.constructor.eventName("click"), this._config.selector, (t=>{
                            this._initializeOnDelegatedTarget(t).toggle()
                        }
                        ));
                    else if ("manual" !== e) {
                        const t = e === di ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin")
                          , n = e === di ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                        fe.on(this._element, t, this._config.selector, (t=>{
                            const e = this._initializeOnDelegatedTarget(t);
                            e._activeTrigger["focusin" === t.type ? hi : di] = !0,
                            e._enter()
                        }
                        )),
                        fe.on(this._element, n, this._config.selector, (t=>{
                            const e = this._initializeOnDelegatedTarget(t);
                            e._activeTrigger["focusout" === t.type ? hi : di] = e._element.contains(t.relatedTarget),
                            e._leave()
                        }
                        ))
                    }
                this._hideModalHandler = ()=>{
                    this._element && this.hide()
                }
                ,
                fe.on(this._element.closest(ci), ui, this._hideModalHandler)
            }
            _fixTitle() {
                const t = this._element.getAttribute("title");
                t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t),
                this._element.setAttribute("data-bs-original-title", t),
                this._element.removeAttribute("title"))
            }
            _enter() {
                this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0,
                this._setTimeout((()=>{
                    this._isHovered && this.show()
                }
                ), this._config.delay.show))
            }
            _leave() {
                this._isWithActiveTrigger() || (this._isHovered = !1,
                this._setTimeout((()=>{
                    this._isHovered || this.hide()
                }
                ), this._config.delay.hide))
            }
            _setTimeout(t, e) {
                clearTimeout(this._timeout),
                this._timeout = setTimeout(t, e)
            }
            _isWithActiveTrigger() {
                return Object.values(this._activeTrigger).includes(!0)
            }
            _getConfig(t) {
                const e = be.getDataAttributes(this._element);
                for (const t of Object.keys(e))
                    ri.has(t) && delete e[t];
                return t = {
                    ...e,
                    ..."object" == typeof t && t ? t : {}
                },
                t = this._mergeConfigObj(t),
                t = this._configAfterMerge(t),
                this._typeCheckConfig(t),
                t
            }
            _configAfterMerge(t) {
                return t.container = !1 === t.container ? document.body : $t(t.container),
                "number" == typeof t.delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content && (t.content = t.content.toString()),
                t
            }
            _getDelegateConfig() {
                const t = {};
                for (const [e,n] of Object.entries(this._config))
                    this.constructor.Default[e] !== n && (t[e] = n);
                return t.selector = !1,
                t.trigger = "manual",
                t
            }
            _disposePopper() {
                this._popper && (this._popper.destroy(),
                this._popper = null),
                this.tip && (this.tip.remove(),
                this.tip = null)
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = gi.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                }
                ))
            }
        }
        Kt(gi);
        const vi = {
            ...gi.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        }
          , yi = {
            ...gi.DefaultType,
            content: "(null|string|element|function)"
        };
        class bi extends gi {
            static get Default() {
                return vi
            }
            static get DefaultType() {
                return yi
            }
            static get NAME() {
                return "popover"
            }
            _isWithContent() {
                return this._getTitle() || this._getContent()
            }
            _getContentForTemplate() {
                return {
                    ".popover-header": this._getTitle(),
                    ".popover-body": this._getContent()
                }
            }
            _getContent() {
                return this._resolvePossibleFunction(this._config.content)
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = bi.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                }
                ))
            }
        }
        Kt(bi);
        const _i = "click.bs.scrollspy"
          , wi = "active"
          , ki = "[href]"
          , xi = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        }
          , Ti = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
        class Ei extends we {
            constructor(t, e) {
                super(t, e),
                this._targetLinks = new Map,
                this._observableSections = new Map,
                this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element,
                this._activeTarget = null,
                this._observer = null,
                this._previousScrollData = {
                    visibleEntryTop: 0,
                    parentScrollTop: 0
                },
                this.refresh()
            }
            static get Default() {
                return xi
            }
            static get DefaultType() {
                return Ti
            }
            static get NAME() {
                return "scrollspy"
            }
            refresh() {
                this._initializeTargetsAndObservables(),
                this._maybeEnableSmoothScroll(),
                this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
                for (const t of this._observableSections.values())
                    this._observer.observe(t)
            }
            dispose() {
                this._observer.disconnect(),
                super.dispose()
            }
            _configAfterMerge(t) {
                return t.target = $t(t.target) || document.body,
                t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin,
                "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t=>Number.parseFloat(t)))),
                t
            }
            _maybeEnableSmoothScroll() {
                this._config.smoothScroll && (fe.off(this._config.target, _i),
                fe.on(this._config.target, _i, ki, (t=>{
                    const e = this._observableSections.get(t.target.hash);
                    if (e) {
                        t.preventDefault();
                        const n = this._rootElement || window
                          , i = e.offsetTop - this._element.offsetTop;
                        if (n.scrollTo)
                            return void n.scrollTo({
                                top: i,
                                behavior: "smooth"
                            });
                        n.scrollTop = i
                    }
                }
                )))
            }
            _getNewObserver() {
                const t = {
                    root: this._rootElement,
                    threshold: this._config.threshold,
                    rootMargin: this._config.rootMargin
                };
                return new IntersectionObserver((t=>this._observerCallback(t)),t)
            }
            _observerCallback(t) {
                const e = t=>this._targetLinks.get(`#${t.target.id}`)
                  , n = t=>{
                    this._previousScrollData.visibleEntryTop = t.target.offsetTop,
                    this._process(e(t))
                }
                  , i = (this._rootElement || document.documentElement).scrollTop
                  , s = i >= this._previousScrollData.parentScrollTop;
                this._previousScrollData.parentScrollTop = i;
                for (const o of t) {
                    if (!o.isIntersecting) {
                        this._activeTarget = null,
                        this._clearActiveClass(e(o));
                        continue
                    }
                    const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                    if (s && t) {
                        if (n(o),
                        !i)
                            return
                    } else
                        s || t || n(o)
                }
            }
            _initializeTargetsAndObservables() {
                this._targetLinks = new Map,
                this._observableSections = new Map;
                const t = xe.find(ki, this._config.target);
                for (const e of t) {
                    if (!e.hash || Rt(e))
                        continue;
                    const t = xe.findOne(e.hash, this._element);
                    Bt(t) && (this._targetLinks.set(e.hash, e),
                    this._observableSections.set(e.hash, t))
                }
            }
            _process(t) {
                this._activeTarget !== t && (this._clearActiveClass(this._config.target),
                this._activeTarget = t,
                t.classList.add(wi),
                this._activateParents(t),
                fe.trigger(this._element, "activate.bs.scrollspy", {
                    relatedTarget: t
                }))
            }
            _activateParents(t) {
                if (t.classList.contains("dropdown-item"))
                    xe.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(wi);
                else
                    for (const e of xe.parents(t, ".nav, .list-group"))
                        for (const t of xe.prev(e, ".nav-link, .nav-item > .nav-link, .list-group-item"))
                            t.classList.add(wi)
            }
            _clearActiveClass(t) {
                t.classList.remove(wi);
                const e = xe.find("[href].active", t);
                for (const t of e)
                    t.classList.remove(wi)
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Ei.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                            throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                }
                ))
            }
        }
        fe.on(window, "load.bs.scrollspy.data-api", (()=>{
            for (const t of xe.find('[data-bs-spy="scroll"]'))
                Ei.getOrCreateInstance(t)
        }
        )),
        Kt(Ei);
        const Di = "ArrowLeft"
          , Si = "ArrowRight"
          , Oi = "ArrowUp"
          , Ci = "ArrowDown"
          , Li = "active"
          , Mi = "fade"
          , Ii = "show"
          , Ai = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
          , Ni = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Ai}`;
        class Fi extends we {
            constructor(t) {
                super(t),
                this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'),
                this._parent && (this._setInitialAttributes(this._parent, this._getChildren()),
                fe.on(this._element, "keydown.bs.tab", (t=>this._keydown(t))))
            }
            static get NAME() {
                return "tab"
            }
            show() {
                const t = this._element;
                if (this._elemIsActive(t))
                    return;
                const e = this._getActiveElem()
                  , n = e ? fe.trigger(e, "hide.bs.tab", {
                    relatedTarget: t
                }) : null;
                fe.trigger(t, "show.bs.tab", {
                    relatedTarget: e
                }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t),
                this._activate(t, e))
            }
            _activate(t, e) {
                if (!t)
                    return;
                t.classList.add(Li),
                this._activate(xe.getElementFromSelector(t));
                this._queueCallback((()=>{
                    "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"),
                    t.setAttribute("aria-selected", !0),
                    this._toggleDropDown(t, !0),
                    fe.trigger(t, "shown.bs.tab", {
                        relatedTarget: e
                    })) : t.classList.add(Ii)
                }
                ), t, t.classList.contains(Mi))
            }
            _deactivate(t, e) {
                if (!t)
                    return;
                t.classList.remove(Li),
                t.blur(),
                this._deactivate(xe.getElementFromSelector(t));
                this._queueCallback((()=>{
                    "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1),
                    t.setAttribute("tabindex", "-1"),
                    this._toggleDropDown(t, !1),
                    fe.trigger(t, "hidden.bs.tab", {
                        relatedTarget: e
                    })) : t.classList.remove(Ii)
                }
                ), t, t.classList.contains(Mi))
            }
            _keydown(t) {
                if (![Di, Si, Oi, Ci].includes(t.key))
                    return;
                t.stopPropagation(),
                t.preventDefault();
                const e = [Si, Ci].includes(t.key)
                  , n = Xt(this._getChildren().filter((t=>!Rt(t))), t.target, e, !0);
                n && (n.focus({
                    preventScroll: !0
                }),
                Fi.getOrCreateInstance(n).show())
            }
            _getChildren() {
                return xe.find(Ni, this._parent)
            }
            _getActiveElem() {
                return this._getChildren().find((t=>this._elemIsActive(t))) || null
            }
            _setInitialAttributes(t, e) {
                this._setAttributeIfNotExists(t, "role", "tablist");
                for (const t of e)
                    this._setInitialAttributesOnChild(t)
            }
            _setInitialAttributesOnChild(t) {
                t = this._getInnerElement(t);
                const e = this._elemIsActive(t)
                  , n = this._getOuterElement(t);
                t.setAttribute("aria-selected", e),
                n !== t && this._setAttributeIfNotExists(n, "role", "presentation"),
                e || t.setAttribute("tabindex", "-1"),
                this._setAttributeIfNotExists(t, "role", "tab"),
                this._setInitialAttributesOnTargetPanel(t)
            }
            _setInitialAttributesOnTargetPanel(t) {
                const e = xe.getElementFromSelector(t);
                e && (this._setAttributeIfNotExists(e, "role", "tabpanel"),
                t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`))
            }
            _toggleDropDown(t, e) {
                const n = this._getOuterElement(t);
                if (!n.classList.contains("dropdown"))
                    return;
                const i = (t,i)=>{
                    const s = xe.findOne(t, n);
                    s && s.classList.toggle(i, e)
                }
                ;
                i(".dropdown-toggle", Li),
                i(".dropdown-menu", Ii),
                n.setAttribute("aria-expanded", e)
            }
            _setAttributeIfNotExists(t, e, n) {
                t.hasAttribute(e) || t.setAttribute(e, n)
            }
            _elemIsActive(t) {
                return t.classList.contains(Li)
            }
            _getInnerElement(t) {
                return t.matches(Ni) ? t : xe.findOne(Ni, t)
            }
            _getOuterElement(t) {
                return t.closest(".nav-item, .list-group-item") || t
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Fi.getOrCreateInstance(this);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
                            throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                }
                ))
            }
        }
        fe.on(document, "click.bs.tab", Ai, (function(t) {
            ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
            Rt(this) || Fi.getOrCreateInstance(this).show()
        }
        )),
        fe.on(window, "load.bs.tab", (()=>{
            for (const t of xe.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'))
                Fi.getOrCreateInstance(t)
        }
        )),
        Kt(Fi);
        const Pi = "hide"
          , ji = "show"
          , qi = "showing"
          , Hi = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        }
          , Vi = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
        class $i extends we {
            constructor(t, e) {
                super(t, e),
                this._timeout = null,
                this._hasMouseInteraction = !1,
                this._hasKeyboardInteraction = !1,
                this._setListeners()
            }
            static get Default() {
                return Vi
            }
            static get DefaultType() {
                return Hi
            }
            static get NAME() {
                return "toast"
            }
            show() {
                if (fe.trigger(this._element, "show.bs.toast").defaultPrevented)
                    return;
                this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade");
                this._element.classList.remove(Pi),
                Ut(this._element),
                this._element.classList.add(ji, qi),
                this._queueCallback((()=>{
                    this._element.classList.remove(qi),
                    fe.trigger(this._element, "shown.bs.toast"),
                    this._maybeScheduleHide()
                }
                ), this._element, this._config.animation)
            }
            hide() {
                if (!this.isShown())
                    return;
                if (fe.trigger(this._element, "hide.bs.toast").defaultPrevented)
                    return;
                this._element.classList.add(qi),
                this._queueCallback((()=>{
                    this._element.classList.add(Pi),
                    this._element.classList.remove(qi, ji),
                    fe.trigger(this._element, "hidden.bs.toast")
                }
                ), this._element, this._config.animation)
            }
            dispose() {
                this._clearTimeout(),
                this.isShown() && this._element.classList.remove(ji),
                super.dispose()
            }
            isShown() {
                return this._element.classList.contains(ji)
            }
            _maybeScheduleHide() {
                this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((()=>{
                    this.hide()
                }
                ), this._config.delay)))
            }
            _onInteraction(t, e) {
                switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e
                }
                if (e)
                    return void this._clearTimeout();
                const n = t.relatedTarget;
                this._element === n || this._element.contains(n) || this._maybeScheduleHide()
            }
            _setListeners() {
                fe.on(this._element, "mouseover.bs.toast", (t=>this._onInteraction(t, !0))),
                fe.on(this._element, "mouseout.bs.toast", (t=>this._onInteraction(t, !1))),
                fe.on(this._element, "focusin.bs.toast", (t=>this._onInteraction(t, !0))),
                fe.on(this._element, "focusout.bs.toast", (t=>this._onInteraction(t, !1)))
            }
            _clearTimeout() {
                clearTimeout(this._timeout),
                this._timeout = null
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = $i.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError(`No method named "${t}"`);
                        e[t](this)
                    }
                }
                ))
            }
        }
        Te($i),
        Kt($i)
    },
    7466: function(t) {
        window,
        t.exports = function(t) {
            var e = {};
            function n(i) {
                if (e[i])
                    return e[i].exports;
                var s = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(s.exports, s, s.exports, n),
                s.l = !0,
                s.exports
            }
            return n.m = t,
            n.c = e,
            n.d = function(t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: i
                })
            }
            ,
            n.r = function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
            ,
            n.t = function(t, e) {
                if (1 & e && (t = n(t)),
                8 & e)
                    return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                    return t;
                var i = Object.create(null);
                if (n.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }),
                2 & e && "string" != typeof t)
                    for (var s in t)
                        n.d(i, s, function(e) {
                            return t[e]
                        }
                        .bind(null, s));
                return i
            }
            ,
            n.n = function(t) {
                var e = t && t.__esModule ? function() {
                    return t.default
                }
                : function() {
                    return t
                }
                ;
                return n.d(e, "a", e),
                e
            }
            ,
            n.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            ,
            n.p = "",
            n(n.s = 4)
        }([function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = function() {
                function t(e, n, i) {
                    void 0 === e && (e = null),
                    void 0 === n && (n = null),
                    void 0 === i && (i = "en-US"),
                    this.dateInstance = "object" == typeof n && null !== n ? n.parse(e instanceof t ? e.clone().toJSDate() : e) : "string" == typeof n ? t.parseDateTime(e, n, i) : e ? t.parseDateTime(e) : t.parseDateTime(new Date),
                    this.lang = i
                }
                return t.parseDateTime = function(e, n, i) {
                    if (void 0 === n && (n = "YYYY-MM-DD"),
                    void 0 === i && (i = "en-US"),
                    !e)
                        return new Date(NaN);
                    if (e instanceof Date)
                        return new Date(e);
                    if (e instanceof t)
                        return e.clone().toJSDate();
                    if (/^-?\d{10,}$/.test(e))
                        return t.getDateZeroTime(new Date(Number(e)));
                    if ("string" == typeof e) {
                        for (var s = [], o = null; null != (o = t.regex.exec(n)); )
                            "\\" !== o[1] && s.push(o);
                        if (s.length) {
                            var r = {
                                year: null,
                                month: null,
                                shortMonth: null,
                                longMonth: null,
                                day: null,
                                value: ""
                            };
                            s[0].index > 0 && (r.value += ".*?");
                            for (var a = 0, l = Object.entries(s); a < l.length; a++) {
                                var c = l[a]
                                  , u = c[0]
                                  , d = c[1]
                                  , h = Number(u)
                                  , p = t.formatPatterns(d[0], i)
                                  , m = p.group
                                  , f = p.pattern;
                                r[m] = h + 1,
                                r.value += f,
                                r.value += ".*?"
                            }
                            var g = new RegExp("^" + r.value + "$");
                            if (g.test(e)) {
                                var v = g.exec(e)
                                  , y = Number(v[r.year])
                                  , b = null;
                                r.month ? b = Number(v[r.month]) - 1 : r.shortMonth ? b = t.shortMonths(i).indexOf(v[r.shortMonth]) : r.longMonth && (b = t.longMonths(i).indexOf(v[r.longMonth]));
                                var _ = Number(v[r.day]) || 1;
                                return new Date(y,b,_,0,0,0,0)
                            }
                        }
                    }
                    return t.getDateZeroTime(new Date(e))
                }
                ,
                t.convertArray = function(e, n) {
                    return e.map((function(e) {
                        return e instanceof Array ? e.map((function(e) {
                            return new t(e,n)
                        }
                        )) : new t(e,n)
                    }
                    ))
                }
                ,
                t.getDateZeroTime = function(t) {
                    return new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0)
                }
                ,
                t.shortMonths = function(e) {
                    return t.MONTH_JS.map((function(t) {
                        return new Date(2019,t).toLocaleString(e, {
                            month: "short"
                        })
                    }
                    ))
                }
                ,
                t.longMonths = function(e) {
                    return t.MONTH_JS.map((function(t) {
                        return new Date(2019,t).toLocaleString(e, {
                            month: "long"
                        })
                    }
                    ))
                }
                ,
                t.formatPatterns = function(e, n) {
                    switch (e) {
                    case "YY":
                    case "YYYY":
                        return {
                            group: "year",
                            pattern: "(\\d{" + e.length + "})"
                        };
                    case "M":
                        return {
                            group: "month",
                            pattern: "(\\d{1,2})"
                        };
                    case "MM":
                        return {
                            group: "month",
                            pattern: "(\\d{2})"
                        };
                    case "MMM":
                        return {
                            group: "shortMonth",
                            pattern: "(" + t.shortMonths(n).join("|") + ")"
                        };
                    case "MMMM":
                        return {
                            group: "longMonth",
                            pattern: "(" + t.longMonths(n).join("|") + ")"
                        };
                    case "D":
                        return {
                            group: "day",
                            pattern: "(\\d{1,2})"
                        };
                    case "DD":
                        return {
                            group: "day",
                            pattern: "(\\d{2})"
                        }
                    }
                }
                ,
                t.prototype.toJSDate = function() {
                    return this.dateInstance
                }
                ,
                t.prototype.toLocaleString = function(t, e) {
                    return this.dateInstance.toLocaleString(t, e)
                }
                ,
                t.prototype.toDateString = function() {
                    return this.dateInstance.toDateString()
                }
                ,
                t.prototype.getSeconds = function() {
                    return this.dateInstance.getSeconds()
                }
                ,
                t.prototype.getDay = function() {
                    return this.dateInstance.getDay()
                }
                ,
                t.prototype.getTime = function() {
                    return this.dateInstance.getTime()
                }
                ,
                t.prototype.getDate = function() {
                    return this.dateInstance.getDate()
                }
                ,
                t.prototype.getMonth = function() {
                    return this.dateInstance.getMonth()
                }
                ,
                t.prototype.getFullYear = function() {
                    return this.dateInstance.getFullYear()
                }
                ,
                t.prototype.setMonth = function(t) {
                    return this.dateInstance.setMonth(t)
                }
                ,
                t.prototype.setHours = function(t, e, n, i) {
                    void 0 === t && (t = 0),
                    void 0 === e && (e = 0),
                    void 0 === n && (n = 0),
                    void 0 === i && (i = 0),
                    this.dateInstance.setHours(t, e, n, i)
                }
                ,
                t.prototype.setSeconds = function(t) {
                    return this.dateInstance.setSeconds(t)
                }
                ,
                t.prototype.setDate = function(t) {
                    return this.dateInstance.setDate(t)
                }
                ,
                t.prototype.setFullYear = function(t) {
                    return this.dateInstance.setFullYear(t)
                }
                ,
                t.prototype.getWeek = function(t) {
                    var e = new Date(this.timestamp())
                      , n = (this.getDay() + (7 - t)) % 7;
                    e.setDate(e.getDate() - n);
                    var i = e.getTime();
                    return e.setMonth(0, 1),
                    e.getDay() !== t && e.setMonth(0, 1 + (4 - e.getDay() + 7) % 7),
                    1 + Math.ceil((i - e.getTime()) / 6048e5)
                }
                ,
                t.prototype.clone = function() {
                    return new t(this.toJSDate())
                }
                ,
                t.prototype.isBetween = function(t, e, n) {
                    switch (void 0 === n && (n = "()"),
                    n) {
                    default:
                    case "()":
                        return this.timestamp() > t.getTime() && this.timestamp() < e.getTime();
                    case "[)":
                        return this.timestamp() >= t.getTime() && this.timestamp() < e.getTime();
                    case "(]":
                        return this.timestamp() > t.getTime() && this.timestamp() <= e.getTime();
                    case "[]":
                        return this.timestamp() >= t.getTime() && this.timestamp() <= e.getTime()
                    }
                }
                ,
                t.prototype.isBefore = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        return t.getTime() > this.getTime();
                    case "day":
                    case "days":
                        return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime() > new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();
                    case "month":
                    case "months":
                        return new Date(t.getFullYear(),t.getMonth(),1).getTime() > new Date(this.getFullYear(),this.getMonth(),1).getTime();
                    case "year":
                    case "years":
                        return t.getFullYear() > this.getFullYear()
                    }
                    throw new Error("isBefore: Invalid unit!")
                }
                ,
                t.prototype.isSameOrBefore = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        return t.getTime() >= this.getTime();
                    case "day":
                    case "days":
                        return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime() >= new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();
                    case "month":
                    case "months":
                        return new Date(t.getFullYear(),t.getMonth(),1).getTime() >= new Date(this.getFullYear(),this.getMonth(),1).getTime()
                    }
                    throw new Error("isSameOrBefore: Invalid unit!")
                }
                ,
                t.prototype.isAfter = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        return this.getTime() > t.getTime();
                    case "day":
                    case "days":
                        return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime() > new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();
                    case "month":
                    case "months":
                        return new Date(this.getFullYear(),this.getMonth(),1).getTime() > new Date(t.getFullYear(),t.getMonth(),1).getTime();
                    case "year":
                    case "years":
                        return this.getFullYear() > t.getFullYear()
                    }
                    throw new Error("isAfter: Invalid unit!")
                }
                ,
                t.prototype.isSameOrAfter = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        return this.getTime() >= t.getTime();
                    case "day":
                    case "days":
                        return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime() >= new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();
                    case "month":
                    case "months":
                        return new Date(this.getFullYear(),this.getMonth(),1).getTime() >= new Date(t.getFullYear(),t.getMonth(),1).getTime()
                    }
                    throw new Error("isSameOrAfter: Invalid unit!")
                }
                ,
                t.prototype.isSame = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        return this.getTime() === t.getTime();
                    case "day":
                    case "days":
                        return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime() === new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();
                    case "month":
                    case "months":
                        return new Date(this.getFullYear(),this.getMonth(),1).getTime() === new Date(t.getFullYear(),t.getMonth(),1).getTime()
                    }
                    throw new Error("isSame: Invalid unit!")
                }
                ,
                t.prototype.add = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        this.setSeconds(this.getSeconds() + t);
                        break;
                    case "day":
                    case "days":
                        this.setDate(this.getDate() + t);
                        break;
                    case "month":
                    case "months":
                        this.setMonth(this.getMonth() + t)
                    }
                    return this
                }
                ,
                t.prototype.subtract = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    case "second":
                    case "seconds":
                        this.setSeconds(this.getSeconds() - t);
                        break;
                    case "day":
                    case "days":
                        this.setDate(this.getDate() - t);
                        break;
                    case "month":
                    case "months":
                        this.setMonth(this.getMonth() - t)
                    }
                    return this
                }
                ,
                t.prototype.diff = function(t, e) {
                    switch (void 0 === e && (e = "seconds"),
                    e) {
                    default:
                    case "second":
                    case "seconds":
                        return this.getTime() - t.getTime();
                    case "day":
                    case "days":
                        return Math.round((this.timestamp() - t.getTime()) / 864e5);
                    case "month":
                    case "months":
                    }
                }
                ,
                t.prototype.format = function(e, n) {
                    if (void 0 === n && (n = "en-US"),
                    "object" == typeof e)
                        return e.output(this.clone().toJSDate());
                    for (var i = "", s = [], o = null; null != (o = t.regex.exec(e)); )
                        "\\" !== o[1] && s.push(o);
                    if (s.length) {
                        s[0].index > 0 && (i += e.substring(0, s[0].index));
                        for (var r = 0, a = Object.entries(s); r < a.length; r++) {
                            var l = a[r]
                              , c = l[0]
                              , u = l[1]
                              , d = Number(c);
                            i += this.formatTokens(u[0], n),
                            s[d + 1] && (i += e.substring(u.index + u[0].length, s[d + 1].index)),
                            d === s.length - 1 && (i += e.substring(u.index + u[0].length))
                        }
                    }
                    return i.replace(/\\/g, "")
                }
                ,
                t.prototype.timestamp = function() {
                    return new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0,0).getTime()
                }
                ,
                t.prototype.formatTokens = function(e, n) {
                    switch (e) {
                    case "YY":
                        return String(this.getFullYear()).slice(-2);
                    case "YYYY":
                        return String(this.getFullYear());
                    case "M":
                        return String(this.getMonth() + 1);
                    case "MM":
                        return ("0" + (this.getMonth() + 1)).slice(-2);
                    case "MMM":
                        return t.shortMonths(n)[this.getMonth()];
                    case "MMMM":
                        return t.longMonths(n)[this.getMonth()];
                    case "D":
                        return String(this.getDate());
                    case "DD":
                        return ("0" + this.getDate()).slice(-2);
                    default:
                        return ""
                    }
                }
                ,
                t.regex = /(\\)?(Y{2,4}|M{1,4}|D{1,2}|d{1,4})/g,
                t.MONTH_JS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                t
            }();
            e.DateTime = i
        }
        , function(t, e, n) {
            "use strict";
            var i, s = this && this.__extends || (i = function(t, e) {
                return (i = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = e[n])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function n() {
                    this.constructor = t
                }
                i(t, e),
                t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                new n)
            }
            ), o = this && this.__spreadArrays || function() {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++)
                    t += arguments[e].length;
                var i = Array(t)
                  , s = 0;
                for (e = 0; e < n; e++)
                    for (var o = arguments[e], r = 0, a = o.length; r < a; r++,
                    s++)
                        i[s] = o[r];
                return i
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(5)
              , a = n(0)
              , l = n(3)
              , c = n(2)
              , u = function(t) {
                function e(e) {
                    var n = t.call(this, e) || this;
                    return n.preventClick = !1,
                    n.bindEvents(),
                    n
                }
                return s(e, t),
                e.prototype.scrollToDate = function(t) {
                    if (this.options.scrollToDate) {
                        var e = this.options.startDate instanceof a.DateTime ? this.options.startDate.clone() : null
                          , n = this.options.endDate instanceof a.DateTime ? this.options.endDate.clone() : null;
                        !this.options.startDate || t && t !== this.options.element ? t && this.options.endDate && t === this.options.elementEnd && (n.setDate(1),
                        this.options.numberOfMonths > 1 && n.isAfter(e) && n.setMonth(n.getMonth() - (this.options.numberOfMonths - 1)),
                        this.calendars[0] = n.clone()) : (e.setDate(1),
                        this.calendars[0] = e.clone())
                    }
                }
                ,
                e.prototype.bindEvents = function() {
                    document.addEventListener("click", this.onClick.bind(this), !0),
                    this.ui = document.createElement("div"),
                    this.ui.className = l.litepicker,
                    this.ui.style.display = "none",
                    this.ui.addEventListener("mouseenter", this.onMouseEnter.bind(this), !0),
                    this.ui.addEventListener("mouseleave", this.onMouseLeave.bind(this), !1),
                    this.options.autoRefresh ? (this.options.element instanceof HTMLElement && this.options.element.addEventListener("keyup", this.onInput.bind(this), !0),
                    this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("keyup", this.onInput.bind(this), !0)) : (this.options.element instanceof HTMLElement && this.options.element.addEventListener("change", this.onInput.bind(this), !0),
                    this.options.elementEnd instanceof HTMLElement && this.options.elementEnd.addEventListener("change", this.onInput.bind(this), !0)),
                    this.options.parentEl ? this.options.parentEl instanceof HTMLElement ? this.options.parentEl.appendChild(this.ui) : document.querySelector(this.options.parentEl).appendChild(this.ui) : this.options.inlineMode ? this.options.element instanceof HTMLInputElement ? this.options.element.parentNode.appendChild(this.ui) : this.options.element.appendChild(this.ui) : document.body.appendChild(this.ui),
                    this.updateInput(),
                    this.init(),
                    "function" == typeof this.options.setup && this.options.setup.call(this, this),
                    this.render(),
                    this.options.inlineMode && this.show()
                }
                ,
                e.prototype.updateInput = function() {
                    if (this.options.element instanceof HTMLInputElement) {
                        var t = this.options.startDate
                          , e = this.options.endDate;
                        if (this.options.singleMode && t)
                            this.options.element.value = t.format(this.options.format, this.options.lang);
                        else if (!this.options.singleMode && t && e) {
                            var n = t.format(this.options.format, this.options.lang)
                              , i = e.format(this.options.format, this.options.lang);
                            this.options.elementEnd instanceof HTMLInputElement ? (this.options.element.value = n,
                            this.options.elementEnd.value = i) : this.options.element.value = "" + n + this.options.delimiter + i
                        }
                        t || e || (this.options.element.value = "",
                        this.options.elementEnd instanceof HTMLInputElement && (this.options.elementEnd.value = ""))
                    }
                }
                ,
                e.prototype.isSamePicker = function(t) {
                    return t.closest("." + l.litepicker) === this.ui
                }
                ,
                e.prototype.shouldShown = function(t) {
                    return !t.disabled && (t === this.options.element || this.options.elementEnd && t === this.options.elementEnd)
                }
                ,
                e.prototype.shouldResetDatePicked = function() {
                    return this.options.singleMode || 2 === this.datePicked.length
                }
                ,
                e.prototype.shouldSwapDatePicked = function() {
                    return 2 === this.datePicked.length && this.datePicked[0].getTime() > this.datePicked[1].getTime()
                }
                ,
                e.prototype.shouldCheckLockDays = function() {
                    return this.options.disallowLockDaysInRange && 2 === this.datePicked.length
                }
                ,
                e.prototype.onClick = function(t) {
                    var e = t.target;
                    if (t.target.shadowRoot && (e = t.composedPath()[0]),
                    e && this.ui)
                        if (this.shouldShown(e))
                            this.show(e);
                        else if (e.closest("." + l.litepicker) || !this.isShowning()) {
                            if (this.isSamePicker(e))
                                if (this.emit("before:click", e),
                                this.preventClick)
                                    this.preventClick = !1;
                                else {
                                    if (e.classList.contains(l.dayItem)) {
                                        if (t.preventDefault(),
                                        e.classList.contains(l.isLocked))
                                            return;
                                        if (this.shouldResetDatePicked() && (this.datePicked.length = 0),
                                        this.datePicked[this.datePicked.length] = new a.DateTime(e.dataset.time),
                                        this.shouldSwapDatePicked()) {
                                            var n = this.datePicked[1].clone();
                                            this.datePicked[1] = this.datePicked[0].clone(),
                                            this.datePicked[0] = n.clone()
                                        }
                                        return this.shouldCheckLockDays() && c.rangeIsLocked(this.datePicked, this.options) && (this.emit("error:range", this.datePicked),
                                        this.datePicked.length = 0),
                                        this.render(),
                                        this.emit.apply(this, o(["preselect"], o(this.datePicked).map((function(t) {
                                            return t.clone()
                                        }
                                        )))),
                                        void (this.options.autoApply && (this.options.singleMode && this.datePicked.length ? (this.setDate(this.datePicked[0]),
                                        this.hide()) : this.options.singleMode || 2 !== this.datePicked.length || (this.setDateRange(this.datePicked[0], this.datePicked[1]),
                                        this.hide())))
                                    }
                                    if (e.classList.contains(l.buttonPreviousMonth)) {
                                        t.preventDefault();
                                        var i = 0
                                          , s = this.options.switchingMonths || this.options.numberOfMonths;
                                        if (this.options.splitView) {
                                            var r = e.closest("." + l.monthItem);
                                            i = c.findNestedMonthItem(r),
                                            s = 1
                                        }
                                        return this.calendars[i].setMonth(this.calendars[i].getMonth() - s),
                                        this.gotoDate(this.calendars[i], i),
                                        void this.emit("change:month", this.calendars[i], i)
                                    }
                                    if (e.classList.contains(l.buttonNextMonth))
                                        return t.preventDefault(),
                                        i = 0,
                                        s = this.options.switchingMonths || this.options.numberOfMonths,
                                        this.options.splitView && (r = e.closest("." + l.monthItem),
                                        i = c.findNestedMonthItem(r),
                                        s = 1),
                                        this.calendars[i].setMonth(this.calendars[i].getMonth() + s),
                                        this.gotoDate(this.calendars[i], i),
                                        void this.emit("change:month", this.calendars[i], i);
                                    e.classList.contains(l.buttonCancel) && (t.preventDefault(),
                                    this.hide(),
                                    this.emit("button:cancel")),
                                    e.classList.contains(l.buttonApply) && (t.preventDefault(),
                                    this.options.singleMode && this.datePicked.length ? this.setDate(this.datePicked[0]) : this.options.singleMode || 2 !== this.datePicked.length || this.setDateRange(this.datePicked[0], this.datePicked[1]),
                                    this.hide(),
                                    this.emit("button:apply", this.options.startDate, this.options.endDate))
                                }
                        } else
                            this.hide()
                }
                ,
                e.prototype.showTooltip = function(t, e) {
                    var n = this.ui.querySelector("." + l.containerTooltip);
                    n.style.visibility = "visible",
                    n.innerHTML = e;
                    var i = this.ui.getBoundingClientRect()
                      , s = n.getBoundingClientRect()
                      , o = t.getBoundingClientRect()
                      , r = o.top
                      , a = o.left;
                    if (this.options.inlineMode && this.options.parentEl) {
                        var c = this.ui.parentNode.getBoundingClientRect();
                        r -= c.top,
                        a -= c.left
                    } else
                        r -= i.top,
                        a -= i.left;
                    r -= s.height,
                    a -= s.width / 2,
                    a += o.width / 2,
                    n.style.top = r + "px",
                    n.style.left = a + "px",
                    this.emit("tooltip", n, t)
                }
                ,
                e.prototype.hideTooltip = function() {
                    this.ui.querySelector("." + l.containerTooltip).style.visibility = "hidden"
                }
                ,
                e.prototype.shouldAllowMouseEnter = function(t) {
                    return !this.options.singleMode && !t.classList.contains(l.isLocked)
                }
                ,
                e.prototype.shouldAllowRepick = function() {
                    return this.options.elementEnd && this.options.allowRepick && this.options.startDate && this.options.endDate
                }
                ,
                e.prototype.isDayItem = function(t) {
                    return t.classList.contains(l.dayItem)
                }
                ,
                e.prototype.onMouseEnter = function(t) {
                    var e = this
                      , n = t.target;
                    if (this.isDayItem(n) && this.shouldAllowMouseEnter(n)) {
                        if (this.shouldAllowRepick() && (this.triggerElement === this.options.element ? this.datePicked[0] = this.options.endDate.clone() : this.triggerElement === this.options.elementEnd && (this.datePicked[0] = this.options.startDate.clone())),
                        1 !== this.datePicked.length)
                            return;
                        var i = this.ui.querySelector("." + l.dayItem + '[data-time="' + this.datePicked[0].getTime() + '"]')
                          , s = this.datePicked[0].clone()
                          , o = new a.DateTime(n.dataset.time)
                          , r = !1;
                        if (s.getTime() > o.getTime()) {
                            var c = s.clone();
                            s = o.clone(),
                            o = c.clone(),
                            r = !0
                        }
                        if (Array.prototype.slice.call(this.ui.querySelectorAll("." + l.dayItem)).forEach((function(t) {
                            var n = new a.DateTime(t.dataset.time)
                              , i = e.renderDay(n);
                            n.isBetween(s, o) && i.classList.add(l.isInRange),
                            t.className = i.className
                        }
                        )),
                        n.classList.add(l.isEndDate),
                        r ? (i && i.classList.add(l.isFlipped),
                        n.classList.add(l.isFlipped)) : (i && i.classList.remove(l.isFlipped),
                        n.classList.remove(l.isFlipped)),
                        this.options.showTooltip) {
                            var u = o.diff(s, "day") + 1;
                            if ("function" == typeof this.options.tooltipNumber && (u = this.options.tooltipNumber.call(this, u)),
                            u > 0) {
                                var d = this.pluralSelector(u)
                                  , h = u + " " + (this.options.tooltipText[d] ? this.options.tooltipText[d] : "[" + d + "]");
                                this.showTooltip(n, h);
                                var p = window.navigator.userAgent
                                  , m = /(iphone|ipad)/i.test(p)
                                  , f = /OS 1([0-2])/i.test(p);
                                m && f && n.dispatchEvent(new Event("click"))
                            } else
                                this.hideTooltip()
                        }
                    }
                }
                ,
                e.prototype.onMouseLeave = function(t) {
                    t.target,
                    this.options.allowRepick && (!this.options.allowRepick || this.options.startDate || this.options.endDate) && (this.datePicked.length = 0,
                    this.render())
                }
                ,
                e.prototype.onInput = function(t) {
                    var e = this.parseInput()
                      , n = e[0]
                      , i = e[1]
                      , s = this.options.format;
                    if (this.options.elementEnd ? n instanceof a.DateTime && i instanceof a.DateTime && n.format(s) === this.options.element.value && i.format(s) === this.options.elementEnd.value : this.options.singleMode ? n instanceof a.DateTime && n.format(s) === this.options.element.value : n instanceof a.DateTime && i instanceof a.DateTime && "" + n.format(s) + this.options.delimiter + i.format(s) === this.options.element.value) {
                        if (i && n.getTime() > i.getTime()) {
                            var o = n.clone();
                            n = i.clone(),
                            i = o.clone()
                        }
                        this.options.startDate = new a.DateTime(n,this.options.format,this.options.lang),
                        i && (this.options.endDate = new a.DateTime(i,this.options.format,this.options.lang)),
                        this.updateInput(),
                        this.render();
                        var r = n.clone()
                          , l = 0;
                        (this.options.elementEnd ? n.format(s) === t.target.value : t.target.value.startsWith(n.format(s))) || (r = i.clone(),
                        l = this.options.numberOfMonths - 1),
                        this.emit("selected", this.getStartDate(), this.getEndDate()),
                        this.gotoDate(r, l)
                    }
                }
                ,
                e
            }(r.Calendar);
            e.Litepicker = u
        }
        , function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.findNestedMonthItem = function(t) {
                for (var e = t.parentNode.childNodes, n = 0; n < e.length; n += 1)
                    if (e.item(n) === t)
                        return n;
                return 0
            }
            ,
            e.dateIsLocked = function(t, e, n) {
                var i = !1;
                return e.lockDays.length && (i = e.lockDays.filter((function(n) {
                    return n instanceof Array ? t.isBetween(n[0], n[1], e.lockDaysInclusivity) : n.isSame(t, "day")
                }
                )).length),
                i || "function" != typeof e.lockDaysFilter || (i = e.lockDaysFilter.call(this, t.clone(), null, n)),
                i
            }
            ,
            e.rangeIsLocked = function(t, e) {
                var n = !1;
                return e.lockDays.length && (n = e.lockDays.filter((function(n) {
                    if (n instanceof Array) {
                        var i = t[0].toDateString() === n[0].toDateString() && t[1].toDateString() === n[1].toDateString();
                        return n[0].isBetween(t[0], t[1], e.lockDaysInclusivity) || n[1].isBetween(t[0], t[1], e.lockDaysInclusivity) || i
                    }
                    return n.isBetween(t[0], t[1], e.lockDaysInclusivity)
                }
                )).length),
                n || "function" != typeof e.lockDaysFilter || (n = e.lockDaysFilter.call(this, t[0].clone(), t[1].clone(), t)),
                n
            }
        }
        , function(t, e, n) {
            var i = n(8);
            "string" == typeof i && (i = [[t.i, i, ""]]);
            var s = {
                insert: function(t) {
                    var e = document.querySelector("head")
                      , n = window._lastElementInsertedByStyleLoader;
                    window.disableLitepickerStyles || (n ? n.nextSibling ? e.insertBefore(t, n.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild),
                    window._lastElementInsertedByStyleLoader = t)
                },
                singleton: !1
            };
            n(10)(i, s),
            i.locals && (t.exports = i.locals)
        }
        , function(t, e, n) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var i = n(1);
            e.Litepicker = i.Litepicker,
            n(11),
            window.Litepicker = i.Litepicker,
            e.default = i.Litepicker
        }
        , function(t, e, n) {
            "use strict";
            var i, s = this && this.__extends || (i = function(t, e) {
                return (i = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = e[n])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function n() {
                    this.constructor = t
                }
                i(t, e),
                t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                new n)
            }
            );
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var o = n(6)
              , r = n(0)
              , a = n(3)
              , l = n(2)
              , c = function(t) {
                function e(e) {
                    return t.call(this, e) || this
                }
                return s(e, t),
                e.prototype.render = function() {
                    var t = this;
                    this.emit("before:render", this.ui);
                    var e = document.createElement("div");
                    e.className = a.containerMain;
                    var n = document.createElement("div");
                    n.className = a.containerMonths,
                    a["columns" + this.options.numberOfColumns] && (n.classList.remove(a.columns2, a.columns3, a.columns4),
                    n.classList.add(a["columns" + this.options.numberOfColumns])),
                    this.options.splitView && n.classList.add(a.splitView),
                    this.options.showWeekNumbers && n.classList.add(a.showWeekNumbers);
                    for (var i = this.calendars[0].clone(), s = i.getMonth(), o = i.getMonth() + this.options.numberOfMonths, r = 0, l = s; l < o; l += 1) {
                        var c = i.clone();
                        c.setDate(1),
                        c.setHours(0, 0, 0, 0),
                        this.options.splitView ? c = this.calendars[r].clone() : c.setMonth(l),
                        n.appendChild(this.renderMonth(c, r)),
                        r += 1
                    }
                    if (this.ui.innerHTML = "",
                    e.appendChild(n),
                    this.options.resetButton) {
                        var u = void 0;
                        "function" == typeof this.options.resetButton ? u = this.options.resetButton.call(this) : ((u = document.createElement("button")).type = "button",
                        u.className = a.resetButton,
                        u.innerHTML = this.options.buttonText.reset),
                        u.addEventListener("click", (function(e) {
                            e.preventDefault(),
                            t.clearSelection()
                        }
                        )),
                        e.querySelector("." + a.monthItem + ":last-child").querySelector("." + a.monthItemHeader).appendChild(u)
                    }
                    this.ui.appendChild(e),
                    this.options.autoApply && !this.options.footerHTML || this.ui.appendChild(this.renderFooter()),
                    this.options.showTooltip && this.ui.appendChild(this.renderTooltip()),
                    this.ui.dataset.plugins = (this.options.plugins || []).join("|"),
                    this.emit("render", this.ui)
                }
                ,
                e.prototype.renderMonth = function(t, e) {
                    var n = this
                      , i = t.clone()
                      , s = 32 - new Date(i.getFullYear(),i.getMonth(),32).getDate()
                      , o = document.createElement("div");
                    o.className = a.monthItem;
                    var c = document.createElement("div");
                    c.className = a.monthItemHeader;
                    var u = document.createElement("div");
                    if (this.options.dropdowns.months) {
                        var d = document.createElement("select");
                        d.className = a.monthItemName;
                        for (var h = 0; h < 12; h += 1) {
                            var p = document.createElement("option")
                              , m = new r.DateTime(new Date(t.getFullYear(),h,2,0,0,0))
                              , f = new r.DateTime(new Date(t.getFullYear(),h,1,0,0,0));
                            p.value = String(h),
                            p.text = m.toLocaleString(this.options.lang, {
                                month: "long"
                            }),
                            p.disabled = this.options.minDate && f.isBefore(new r.DateTime(this.options.minDate), "month") || this.options.maxDate && f.isAfter(new r.DateTime(this.options.maxDate), "month"),
                            p.selected = f.getMonth() === t.getMonth(),
                            d.appendChild(p)
                        }
                        d.addEventListener("change", (function(t) {
                            var e = t.target
                              , i = 0;
                            if (n.options.splitView) {
                                var s = e.closest("." + a.monthItem);
                                i = l.findNestedMonthItem(s)
                            }
                            n.calendars[i].setMonth(Number(e.value)),
                            n.render(),
                            n.emit("change:month", n.calendars[i], i, t)
                        }
                        )),
                        u.appendChild(d)
                    } else
                        (m = document.createElement("strong")).className = a.monthItemName,
                        m.innerHTML = t.toLocaleString(this.options.lang, {
                            month: "long"
                        }),
                        u.appendChild(m);
                    if (this.options.dropdowns.years) {
                        var g = document.createElement("select");
                        g.className = a.monthItemYear;
                        var v = this.options.dropdowns.minYear
                          , y = this.options.dropdowns.maxYear ? this.options.dropdowns.maxYear : (new Date).getFullYear();
                        for (t.getFullYear() > y && ((p = document.createElement("option")).value = String(t.getFullYear()),
                        p.text = String(t.getFullYear()),
                        p.selected = !0,
                        p.disabled = !0,
                        g.appendChild(p)),
                        h = y; h >= v; h -= 1) {
                            p = document.createElement("option");
                            var b = new r.DateTime(new Date(h,0,1,0,0,0));
                            p.value = String(h),
                            p.text = String(h),
                            p.disabled = this.options.minDate && b.isBefore(new r.DateTime(this.options.minDate), "year") || this.options.maxDate && b.isAfter(new r.DateTime(this.options.maxDate), "year"),
                            p.selected = t.getFullYear() === h,
                            g.appendChild(p)
                        }
                        if (t.getFullYear() < v && ((p = document.createElement("option")).value = String(t.getFullYear()),
                        p.text = String(t.getFullYear()),
                        p.selected = !0,
                        p.disabled = !0,
                        g.appendChild(p)),
                        "asc" === this.options.dropdowns.years) {
                            var _ = Array.prototype.slice.call(g.childNodes).reverse();
                            g.innerHTML = "",
                            _.forEach((function(t) {
                                t.innerHTML = t.value,
                                g.appendChild(t)
                            }
                            ))
                        }
                        g.addEventListener("change", (function(t) {
                            var e = t.target
                              , i = 0;
                            if (n.options.splitView) {
                                var s = e.closest("." + a.monthItem);
                                i = l.findNestedMonthItem(s)
                            }
                            n.calendars[i].setFullYear(Number(e.value)),
                            n.render(),
                            n.emit("change:year", n.calendars[i], i, t)
                        }
                        )),
                        u.appendChild(g)
                    } else {
                        var w = document.createElement("span");
                        w.className = a.monthItemYear,
                        w.innerHTML = String(t.getFullYear()),
                        u.appendChild(w)
                    }
                    var k = document.createElement("button");
                    k.type = "button",
                    k.className = a.buttonPreviousMonth,
                    k.innerHTML = this.options.buttonText.previousMonth;
                    var x = document.createElement("button");
                    x.type = "button",
                    x.className = a.buttonNextMonth,
                    x.innerHTML = this.options.buttonText.nextMonth,
                    c.appendChild(k),
                    c.appendChild(u),
                    c.appendChild(x),
                    this.options.minDate && i.isSameOrBefore(new r.DateTime(this.options.minDate), "month") && o.classList.add(a.noPreviousMonth),
                    this.options.maxDate && i.isSameOrAfter(new r.DateTime(this.options.maxDate), "month") && o.classList.add(a.noNextMonth);
                    var T = document.createElement("div");
                    T.className = a.monthItemWeekdaysRow,
                    this.options.showWeekNumbers && (T.innerHTML = "<div>W</div>");
                    for (var E = 1; E <= 7; E += 1) {
                        var D = 3 + this.options.firstDay + E
                          , S = document.createElement("div");
                        S.innerHTML = this.weekdayName(D),
                        S.title = this.weekdayName(D, "long"),
                        T.appendChild(S)
                    }
                    var O = document.createElement("div");
                    O.className = a.containerDays;
                    var C = this.calcSkipDays(i);
                    this.options.showWeekNumbers && C && O.appendChild(this.renderWeekNumber(i));
                    for (var L = 0; L < C; L += 1) {
                        var M = document.createElement("div");
                        O.appendChild(M)
                    }
                    for (L = 1; L <= s; L += 1)
                        i.setDate(L),
                        this.options.showWeekNumbers && i.getDay() === this.options.firstDay && O.appendChild(this.renderWeekNumber(i)),
                        O.appendChild(this.renderDay(i));
                    return o.appendChild(c),
                    o.appendChild(T),
                    o.appendChild(O),
                    this.emit("render:month", o, t),
                    o
                }
                ,
                e.prototype.renderDay = function(t) {
                    t.setHours();
                    var e = document.createElement("div");
                    if (e.className = a.dayItem,
                    e.innerHTML = String(t.getDate()),
                    e.dataset.time = String(t.getTime()),
                    t.toDateString() === (new Date).toDateString() && e.classList.add(a.isToday),
                    this.datePicked.length)
                        this.datePicked[0].toDateString() === t.toDateString() && (e.classList.add(a.isStartDate),
                        this.options.singleMode && e.classList.add(a.isEndDate)),
                        2 === this.datePicked.length && this.datePicked[1].toDateString() === t.toDateString() && e.classList.add(a.isEndDate),
                        2 === this.datePicked.length && t.isBetween(this.datePicked[0], this.datePicked[1]) && e.classList.add(a.isInRange);
                    else if (this.options.startDate) {
                        var n = this.options.startDate
                          , i = this.options.endDate;
                        n.toDateString() === t.toDateString() && (e.classList.add(a.isStartDate),
                        this.options.singleMode && e.classList.add(a.isEndDate)),
                        i && i.toDateString() === t.toDateString() && e.classList.add(a.isEndDate),
                        n && i && t.isBetween(n, i) && e.classList.add(a.isInRange)
                    }
                    if (this.options.minDate && t.isBefore(new r.DateTime(this.options.minDate)) && e.classList.add(a.isLocked),
                    this.options.maxDate && t.isAfter(new r.DateTime(this.options.maxDate)) && e.classList.add(a.isLocked),
                    this.options.minDays > 1 && 1 === this.datePicked.length) {
                        var s = this.options.minDays - 1
                          , o = this.datePicked[0].clone().subtract(s, "day")
                          , c = this.datePicked[0].clone().add(s, "day");
                        t.isBetween(o, this.datePicked[0], "(]") && e.classList.add(a.isLocked),
                        t.isBetween(this.datePicked[0], c, "[)") && e.classList.add(a.isLocked)
                    }
                    if (this.options.maxDays && 1 === this.datePicked.length) {
                        var u = this.options.maxDays;
                        o = this.datePicked[0].clone().subtract(u, "day"),
                        c = this.datePicked[0].clone().add(u, "day"),
                        t.isSameOrBefore(o) && e.classList.add(a.isLocked),
                        t.isSameOrAfter(c) && e.classList.add(a.isLocked)
                    }
                    return this.options.selectForward && 1 === this.datePicked.length && t.isBefore(this.datePicked[0]) && e.classList.add(a.isLocked),
                    this.options.selectBackward && 1 === this.datePicked.length && t.isAfter(this.datePicked[0]) && e.classList.add(a.isLocked),
                    l.dateIsLocked(t, this.options, this.datePicked) && e.classList.add(a.isLocked),
                    this.options.highlightedDays.length && this.options.highlightedDays.filter((function(e) {
                        return e instanceof Array ? t.isBetween(e[0], e[1], "[]") : e.isSame(t, "day")
                    }
                    )).length && e.classList.add(a.isHighlighted),
                    e.tabIndex = e.classList.contains("is-locked") ? -1 : 0,
                    this.emit("render:day", e, t),
                    e
                }
                ,
                e.prototype.renderFooter = function() {
                    var t = document.createElement("div");
                    if (t.className = a.containerFooter,
                    this.options.footerHTML ? t.innerHTML = this.options.footerHTML : t.innerHTML = '\n      <span class="' + a.previewDateRange + '"></span>\n      <button type="button" class="' + a.buttonCancel + '">' + this.options.buttonText.cancel + '</button>\n      <button type="button" class="' + a.buttonApply + '">' + this.options.buttonText.apply + "</button>\n      ",
                    this.options.singleMode) {
                        if (1 === this.datePicked.length) {
                            var e = this.datePicked[0].format(this.options.format, this.options.lang);
                            t.querySelector("." + a.previewDateRange).innerHTML = e
                        }
                    } else if (1 === this.datePicked.length && t.querySelector("." + a.buttonApply).setAttribute("disabled", ""),
                    2 === this.datePicked.length) {
                        e = this.datePicked[0].format(this.options.format, this.options.lang);
                        var n = this.datePicked[1].format(this.options.format, this.options.lang);
                        t.querySelector("." + a.previewDateRange).innerHTML = "" + e + this.options.delimiter + n
                    }
                    return this.emit("render:footer", t),
                    t
                }
                ,
                e.prototype.renderWeekNumber = function(t) {
                    var e = document.createElement("div")
                      , n = t.getWeek(this.options.firstDay);
                    return e.className = a.weekNumber,
                    e.innerHTML = 53 === n && 0 === t.getMonth() ? "53 / 1" : n,
                    e
                }
                ,
                e.prototype.renderTooltip = function() {
                    var t = document.createElement("div");
                    return t.className = a.containerTooltip,
                    t
                }
                ,
                e.prototype.weekdayName = function(t, e) {
                    return void 0 === e && (e = "short"),
                    new Date(1970,0,t,12,0,0,0).toLocaleString(this.options.lang, {
                        weekday: e
                    })
                }
                ,
                e.prototype.calcSkipDays = function(t) {
                    var e = t.getDay() - this.options.firstDay;
                    return e < 0 && (e += 7),
                    e
                }
                ,
                e
            }(o.LPCore);
            e.Calendar = c
        }
        , function(t, e, n) {
            "use strict";
            var i, s = this && this.__extends || (i = function(t, e) {
                return (i = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = e[n])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function n() {
                    this.constructor = t
                }
                i(t, e),
                t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                new n)
            }
            ), o = this && this.__assign || function() {
                return (o = Object.assign || function(t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var s in e = arguments[n])
                            Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
                    return t
                }
                ).apply(this, arguments)
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var r = n(7)
              , a = n(0)
              , l = n(1)
              , c = function(t) {
                function e(e) {
                    var n = t.call(this) || this;
                    n.datePicked = [],
                    n.calendars = [],
                    n.options = {
                        element: null,
                        elementEnd: null,
                        parentEl: null,
                        firstDay: 1,
                        format: "YYYY-MM-DD",
                        lang: "en-US",
                        delimiter: " - ",
                        numberOfMonths: 1,
                        numberOfColumns: 1,
                        startDate: null,
                        endDate: null,
                        zIndex: 9999,
                        position: "auto",
                        selectForward: !1,
                        selectBackward: !1,
                        splitView: !1,
                        inlineMode: !1,
                        singleMode: !0,
                        autoApply: !0,
                        allowRepick: !1,
                        showWeekNumbers: !1,
                        showTooltip: !0,
                        scrollToDate: !0,
                        mobileFriendly: !0,
                        resetButton: !1,
                        autoRefresh: !1,
                        lockDaysFormat: "YYYY-MM-DD",
                        lockDays: [],
                        disallowLockDaysInRange: !1,
                        lockDaysInclusivity: "[]",
                        highlightedDaysFormat: "YYYY-MM-DD",
                        highlightedDays: [],
                        dropdowns: {
                            minYear: 1990,
                            maxYear: null,
                            months: !1,
                            years: !1
                        },
                        buttonText: {
                            apply: "Apply",
                            cancel: "Cancel",
                            previousMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',
                            nextMonth: '<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',
                            reset: '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>\n      </svg>'
                        },
                        tooltipText: {
                            one: "day",
                            other: "days"
                        }
                    },
                    n.options = o(o({}, n.options), e.element.dataset),
                    Object.keys(n.options).forEach((function(t) {
                        "true" !== n.options[t] && "false" !== n.options[t] || (n.options[t] = "true" === n.options[t])
                    }
                    ));
                    var i = o(o({}, n.options.dropdowns), e.dropdowns)
                      , s = o(o({}, n.options.buttonText), e.buttonText)
                      , r = o(o({}, n.options.tooltipText), e.tooltipText);
                    n.options = o(o({}, n.options), e),
                    n.options.dropdowns = o({}, i),
                    n.options.buttonText = o({}, s),
                    n.options.tooltipText = o({}, r),
                    n.options.elementEnd || (n.options.allowRepick = !1),
                    n.options.lockDays.length && (n.options.lockDays = a.DateTime.convertArray(n.options.lockDays, n.options.lockDaysFormat)),
                    n.options.highlightedDays.length && (n.options.highlightedDays = a.DateTime.convertArray(n.options.highlightedDays, n.options.highlightedDaysFormat));
                    var l = n.parseInput()
                      , c = l[0]
                      , u = l[1];
                    n.options.startDate && (n.options.singleMode || n.options.endDate) && (c = new a.DateTime(n.options.startDate,n.options.format,n.options.lang)),
                    c && n.options.endDate && (u = new a.DateTime(n.options.endDate,n.options.format,n.options.lang)),
                    c instanceof a.DateTime && !isNaN(c.getTime()) && (n.options.startDate = c),
                    n.options.startDate && u instanceof a.DateTime && !isNaN(u.getTime()) && (n.options.endDate = u),
                    !n.options.singleMode || n.options.startDate instanceof a.DateTime || (n.options.startDate = null),
                    n.options.singleMode || n.options.startDate instanceof a.DateTime && n.options.endDate instanceof a.DateTime || (n.options.startDate = null,
                    n.options.endDate = null);
                    for (var d = 0; d < n.options.numberOfMonths; d += 1) {
                        var h = n.options.startDate instanceof a.DateTime ? n.options.startDate.clone() : new a.DateTime;
                        if (!n.options.startDate && (0 === d || n.options.splitView)) {
                            var p = n.options.maxDate ? new a.DateTime(n.options.maxDate) : null
                              , m = n.options.minDate ? new a.DateTime(n.options.minDate) : null
                              , f = n.options.numberOfMonths - 1;
                            m && p && h.isAfter(p) ? (h = m.clone()).setDate(1) : !m && p && h.isAfter(p) && ((h = p.clone()).setDate(1),
                            h.setMonth(h.getMonth() - f))
                        }
                        h.setDate(1),
                        h.setMonth(h.getMonth() + d),
                        n.calendars[d] = h
                    }
                    if (n.options.showTooltip)
                        if (n.options.tooltipPluralSelector)
                            n.pluralSelector = n.options.tooltipPluralSelector;
                        else
                            try {
                                var g = new Intl.PluralRules(n.options.lang);
                                n.pluralSelector = g.select.bind(g)
                            } catch (t) {
                                n.pluralSelector = function(t) {
                                    return 0 === Math.abs(t) ? "one" : "other"
                                }
                            }
                    return n
                }
                return s(e, t),
                e.add = function(t, e) {
                    l.Litepicker.prototype[t] = e
                }
                ,
                e.prototype.DateTime = function(t, e) {
                    return t ? new a.DateTime(t,e) : new a.DateTime
                }
                ,
                e.prototype.init = function() {
                    var t = this;
                    this.options.plugins && this.options.plugins.length && this.options.plugins.forEach((function(e) {
                        l.Litepicker.prototype.hasOwnProperty(e) ? l.Litepicker.prototype[e].init.call(t, t) : console.warn("Litepicker: plugin «" + e + "» not found.")
                    }
                    ))
                }
                ,
                e.prototype.parseInput = function() {
                    var t = this.options.delimiter
                      , e = new RegExp("" + t)
                      , n = this.options.element instanceof HTMLInputElement ? this.options.element.value.split(t) : [];
                    if (this.options.elementEnd) {
                        if (this.options.element instanceof HTMLInputElement && this.options.element.value.length && this.options.elementEnd instanceof HTMLInputElement && this.options.elementEnd.value.length)
                            return [new a.DateTime(this.options.element.value,this.options.format), new a.DateTime(this.options.elementEnd.value,this.options.format)]
                    } else if (this.options.singleMode) {
                        if (this.options.element instanceof HTMLInputElement && this.options.element.value.length)
                            return [new a.DateTime(this.options.element.value,this.options.format)]
                    } else if (this.options.element instanceof HTMLInputElement && e.test(this.options.element.value) && n.length && n.length % 2 == 0) {
                        var i = n.slice(0, n.length / 2).join(t)
                          , s = n.slice(n.length / 2).join(t);
                        return [new a.DateTime(i,this.options.format), new a.DateTime(s,this.options.format)]
                    }
                    return []
                }
                ,
                e.prototype.isShowning = function() {
                    return this.ui && "none" !== this.ui.style.display
                }
                ,
                e.prototype.findPosition = function(t) {
                    var e = t.getBoundingClientRect()
                      , n = this.ui.getBoundingClientRect()
                      , i = this.options.position.split(" ")
                      , s = window.scrollX || window.pageXOffset
                      , o = window.scrollY || window.pageYOffset
                      , r = 0
                      , a = 0;
                    if ("auto" !== i[0] && /top|bottom/.test(i[0]))
                        r = e[i[0]] + o,
                        "top" === i[0] && (r -= n.height);
                    else {
                        r = e.bottom + o;
                        var l = e.bottom + n.height > window.innerHeight
                          , c = e.top + o - n.height >= n.height;
                        l && c && (r = e.top + o - n.height)
                    }
                    if (/left|right/.test(i[0]) || i[1] && "auto" !== i[1] && /left|right/.test(i[1]))
                        a = /left|right/.test(i[0]) ? e[i[0]] + s : e[i[1]] + s,
                        "right" !== i[0] && "right" !== i[1] || (a -= n.width);
                    else {
                        a = e.left + s,
                        l = e.left + n.width > window.innerWidth;
                        var u = e.right + s - n.width >= 0;
                        l && u && (a = e.right + s - n.width)
                    }
                    return {
                        left: a,
                        top: r
                    }
                }
                ,
                e
            }(r.EventEmitter);
            e.LPCore = c
        }
        , function(t, e, n) {
            "use strict";
            var i, s = "object" == typeof Reflect ? Reflect : null, o = s && "function" == typeof s.apply ? s.apply : function(t, e, n) {
                return Function.prototype.apply.call(t, e, n)
            }
            ;
            i = s && "function" == typeof s.ownKeys ? s.ownKeys : Object.getOwnPropertySymbols ? function(t) {
                return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
            }
            : function(t) {
                return Object.getOwnPropertyNames(t)
            }
            ;
            var r = Number.isNaN || function(t) {
                return t != t
            }
            ;
            function a() {
                a.init.call(this)
            }
            t.exports = a,
            a.EventEmitter = a,
            a.prototype._events = void 0,
            a.prototype._eventsCount = 0,
            a.prototype._maxListeners = void 0;
            var l = 10;
            function c(t) {
                return void 0 === t._maxListeners ? a.defaultMaxListeners : t._maxListeners
            }
            function u(t, e, n, i) {
                var s, o, r, a;
                if ("function" != typeof n)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n);
                if (void 0 === (o = t._events) ? (o = t._events = Object.create(null),
                t._eventsCount = 0) : (void 0 !== o.newListener && (t.emit("newListener", e, n.listener ? n.listener : n),
                o = t._events),
                r = o[e]),
                void 0 === r)
                    r = o[e] = n,
                    ++t._eventsCount;
                else if ("function" == typeof r ? r = o[e] = i ? [n, r] : [r, n] : i ? r.unshift(n) : r.push(n),
                (s = c(t)) > 0 && r.length > s && !r.warned) {
                    r.warned = !0;
                    var l = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    l.name = "MaxListenersExceededWarning",
                    l.emitter = t,
                    l.type = e,
                    l.count = r.length,
                    a = l,
                    console && console.warn && console.warn(a)
                }
                return t
            }
            function d() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t.push(arguments[e]);
                this.fired || (this.target.removeListener(this.type, this.wrapFn),
                this.fired = !0,
                o(this.listener, this.target, t))
            }
            function h(t, e, n) {
                var i = {
                    fired: !1,
                    wrapFn: void 0,
                    target: t,
                    type: e,
                    listener: n
                }
                  , s = d.bind(i);
                return s.listener = n,
                i.wrapFn = s,
                s
            }
            function p(t, e, n) {
                var i = t._events;
                if (void 0 === i)
                    return [];
                var s = i[e];
                return void 0 === s ? [] : "function" == typeof s ? n ? [s.listener || s] : [s] : n ? function(t) {
                    for (var e = new Array(t.length), n = 0; n < e.length; ++n)
                        e[n] = t[n].listener || t[n];
                    return e
                }(s) : f(s, s.length)
            }
            function m(t) {
                var e = this._events;
                if (void 0 !== e) {
                    var n = e[t];
                    if ("function" == typeof n)
                        return 1;
                    if (void 0 !== n)
                        return n.length
                }
                return 0
            }
            function f(t, e) {
                for (var n = new Array(e), i = 0; i < e; ++i)
                    n[i] = t[i];
                return n
            }
            Object.defineProperty(a, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return l
                },
                set: function(t) {
                    if ("number" != typeof t || t < 0 || r(t))
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
                    l = t
                }
            }),
            a.init = function() {
                void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null),
                this._eventsCount = 0),
                this._maxListeners = this._maxListeners || void 0
            }
            ,
            a.prototype.setMaxListeners = function(t) {
                if ("number" != typeof t || t < 0 || r(t))
                    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
                return this._maxListeners = t,
                this
            }
            ,
            a.prototype.getMaxListeners = function() {
                return c(this)
            }
            ,
            a.prototype.emit = function(t) {
                for (var e = [], n = 1; n < arguments.length; n++)
                    e.push(arguments[n]);
                var i = "error" === t
                  , s = this._events;
                if (void 0 !== s)
                    i = i && void 0 === s.error;
                else if (!i)
                    return !1;
                if (i) {
                    var r;
                    if (e.length > 0 && (r = e[0]),
                    r instanceof Error)
                        throw r;
                    var a = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
                    throw a.context = r,
                    a
                }
                var l = s[t];
                if (void 0 === l)
                    return !1;
                if ("function" == typeof l)
                    o(l, this, e);
                else {
                    var c = l.length
                      , u = f(l, c);
                    for (n = 0; n < c; ++n)
                        o(u[n], this, e)
                }
                return !0
            }
            ,
            a.prototype.addListener = function(t, e) {
                return u(this, t, e, !1)
            }
            ,
            a.prototype.on = a.prototype.addListener,
            a.prototype.prependListener = function(t, e) {
                return u(this, t, e, !0)
            }
            ,
            a.prototype.once = function(t, e) {
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
                return this.on(t, h(this, t, e)),
                this
            }
            ,
            a.prototype.prependOnceListener = function(t, e) {
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
                return this.prependListener(t, h(this, t, e)),
                this
            }
            ,
            a.prototype.removeListener = function(t, e) {
                var n, i, s, o, r;
                if ("function" != typeof e)
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
                if (void 0 === (i = this._events))
                    return this;
                if (void 0 === (n = i[t]))
                    return this;
                if (n === e || n.listener === e)
                    0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[t],
                    i.removeListener && this.emit("removeListener", t, n.listener || e));
                else if ("function" != typeof n) {
                    for (s = -1,
                    o = n.length - 1; o >= 0; o--)
                        if (n[o] === e || n[o].listener === e) {
                            r = n[o].listener,
                            s = o;
                            break
                        }
                    if (s < 0)
                        return this;
                    0 === s ? n.shift() : function(t, e) {
                        for (; e + 1 < t.length; e++)
                            t[e] = t[e + 1];
                        t.pop()
                    }(n, s),
                    1 === n.length && (i[t] = n[0]),
                    void 0 !== i.removeListener && this.emit("removeListener", t, r || e)
                }
                return this
            }
            ,
            a.prototype.off = a.prototype.removeListener,
            a.prototype.removeAllListeners = function(t) {
                var e, n, i;
                if (void 0 === (n = this._events))
                    return this;
                if (void 0 === n.removeListener)
                    return 0 === arguments.length ? (this._events = Object.create(null),
                    this._eventsCount = 0) : void 0 !== n[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[t]),
                    this;
                if (0 === arguments.length) {
                    var s, o = Object.keys(n);
                    for (i = 0; i < o.length; ++i)
                        "removeListener" !== (s = o[i]) && this.removeAllListeners(s);
                    return this.removeAllListeners("removeListener"),
                    this._events = Object.create(null),
                    this._eventsCount = 0,
                    this
                }
                if ("function" == typeof (e = n[t]))
                    this.removeListener(t, e);
                else if (void 0 !== e)
                    for (i = e.length - 1; i >= 0; i--)
                        this.removeListener(t, e[i]);
                return this
            }
            ,
            a.prototype.listeners = function(t) {
                return p(this, t, !0)
            }
            ,
            a.prototype.rawListeners = function(t) {
                return p(this, t, !1)
            }
            ,
            a.listenerCount = function(t, e) {
                return "function" == typeof t.listenerCount ? t.listenerCount(e) : m.call(t, e)
            }
            ,
            a.prototype.listenerCount = m,
            a.prototype.eventNames = function() {
                return this._eventsCount > 0 ? i(this._events) : []
            }
        }
        , function(t, e, n) {
            (e = n(9)(!1)).push([t.i, ':root{--litepicker-container-months-color-bg: #fff;--litepicker-container-months-box-shadow-color: #ddd;--litepicker-footer-color-bg: #fafafa;--litepicker-footer-box-shadow-color: #ddd;--litepicker-tooltip-color-bg: #fff;--litepicker-month-header-color: #333;--litepicker-button-prev-month-color: #9e9e9e;--litepicker-button-next-month-color: #9e9e9e;--litepicker-button-prev-month-color-hover: #2196f3;--litepicker-button-next-month-color-hover: #2196f3;--litepicker-month-width: calc(var(--litepicker-day-width) * 7);--litepicker-month-weekday-color: #9e9e9e;--litepicker-month-week-number-color: #9e9e9e;--litepicker-day-width: 38px;--litepicker-day-color: #333;--litepicker-day-color-hover: #2196f3;--litepicker-is-today-color: #f44336;--litepicker-is-in-range-color: #bbdefb;--litepicker-is-locked-color: #9e9e9e;--litepicker-is-start-color: #fff;--litepicker-is-start-color-bg: #2196f3;--litepicker-is-end-color: #fff;--litepicker-is-end-color-bg: #2196f3;--litepicker-button-cancel-color: #fff;--litepicker-button-cancel-color-bg: #9e9e9e;--litepicker-button-apply-color: #fff;--litepicker-button-apply-color-bg: #2196f3;--litepicker-button-reset-color: #909090;--litepicker-button-reset-color-hover: #2196f3;--litepicker-highlighted-day-color: #333;--litepicker-highlighted-day-color-bg: #ffeb3b}.show-week-numbers{--litepicker-month-width: calc(var(--litepicker-day-width) * 8)}.litepicker{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-size:0.8em;display:none}.litepicker button{border:none;background:none}.litepicker .container__main{display:-webkit-box;display:-ms-flexbox;display:flex}.litepicker .container__months{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--litepicker-container-months-color-bg);border-radius:5px;-webkit-box-shadow:0 0 5px var(--litepicker-container-months-box-shadow-color);box-shadow:0 0 5px var(--litepicker-container-months-box-shadow-color);width:calc(var(--litepicker-month-width) + 10px);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months.columns-2{width:calc((var(--litepicker-month-width) * 2) + 20px)}.litepicker .container__months.columns-3{width:calc((var(--litepicker-month-width) * 3) + 30px)}.litepicker .container__months.columns-4{width:calc((var(--litepicker-month-width) * 4) + 40px)}.litepicker .container__months.split-view .month-item-header .button-previous-month,.litepicker .container__months.split-view .month-item-header .button-next-month{visibility:visible}.litepicker .container__months .month-item{padding:5px;width:var(--litepicker-month-width);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months .month-item-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-weight:500;padding:10px 5px;text-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--litepicker-month-header-color)}.litepicker .container__months .month-item-header div{-webkit-box-flex:1;-ms-flex:1;flex:1}.litepicker .container__months .month-item-header div>.month-item-name{margin-right:5px}.litepicker .container__months .month-item-header div>.month-item-year{padding:0}.litepicker .container__months .month-item-header .reset-button{color:var(--litepicker-button-reset-color)}.litepicker .container__months .month-item-header .reset-button>svg{fill:var(--litepicker-button-reset-color)}.litepicker .container__months .month-item-header .reset-button *{pointer-events:none}.litepicker .container__months .month-item-header .reset-button:hover{color:var(--litepicker-button-reset-color-hover)}.litepicker .container__months .month-item-header .reset-button:hover>svg{fill:var(--litepicker-button-reset-color-hover)}.litepicker .container__months .month-item-header .button-previous-month,.litepicker .container__months .month-item-header .button-next-month{visibility:hidden;text-decoration:none;padding:3px 5px;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__months .month-item-header .button-previous-month *,.litepicker .container__months .month-item-header .button-next-month *{pointer-events:none}.litepicker .container__months .month-item-header .button-previous-month{color:var(--litepicker-button-prev-month-color)}.litepicker .container__months .month-item-header .button-previous-month>svg,.litepicker .container__months .month-item-header .button-previous-month>img{fill:var(--litepicker-button-prev-month-color)}.litepicker .container__months .month-item-header .button-previous-month:hover{color:var(--litepicker-button-prev-month-color-hover)}.litepicker .container__months .month-item-header .button-previous-month:hover>svg{fill:var(--litepicker-button-prev-month-color-hover)}.litepicker .container__months .month-item-header .button-next-month{color:var(--litepicker-button-next-month-color)}.litepicker .container__months .month-item-header .button-next-month>svg,.litepicker .container__months .month-item-header .button-next-month>img{fill:var(--litepicker-button-next-month-color)}.litepicker .container__months .month-item-header .button-next-month:hover{color:var(--litepicker-button-next-month-color-hover)}.litepicker .container__months .month-item-header .button-next-month:hover>svg{fill:var(--litepicker-button-next-month-color-hover)}.litepicker .container__months .month-item-weekdays-row{display:-webkit-box;display:-ms-flexbox;display:flex;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;color:var(--litepicker-month-weekday-color)}.litepicker .container__months .month-item-weekdays-row>div{padding:5px 0;font-size:85%;-webkit-box-flex:1;-ms-flex:1;flex:1;width:var(--litepicker-day-width);text-align:center}.litepicker .container__months .month-item:first-child .button-previous-month{visibility:visible}.litepicker .container__months .month-item:last-child .button-next-month{visibility:visible}.litepicker .container__months .month-item.no-previous-month .button-previous-month{visibility:hidden}.litepicker .container__months .month-item.no-next-month .button-next-month{visibility:hidden}.litepicker .container__days{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;text-align:center;-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__days>div,.litepicker .container__days>a{padding:5px 0;width:var(--litepicker-day-width)}.litepicker .container__days .day-item{color:var(--litepicker-day-color);text-align:center;text-decoration:none;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__days .day-item:hover{color:var(--litepicker-day-color-hover);-webkit-box-shadow:inset 0 0 0 1px var(--litepicker-day-color-hover);box-shadow:inset 0 0 0 1px var(--litepicker-day-color-hover)}.litepicker .container__days .day-item.is-today{color:var(--litepicker-is-today-color)}.litepicker .container__days .day-item.is-locked{color:var(--litepicker-is-locked-color)}.litepicker .container__days .day-item.is-locked:hover{color:var(--litepicker-is-locked-color);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-in-range{background-color:var(--litepicker-is-in-range-color);border-radius:0}.litepicker .container__days .day-item.is-start-date{color:var(--litepicker-is-start-color);background-color:var(--litepicker-is-start-color-bg);border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-flipped{border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date{color:var(--litepicker-is-end-color);background-color:var(--litepicker-is-end-color-bg);border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date.is-flipped{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-end-date{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-highlighted{color:var(--litepicker-highlighted-day-color);background-color:var(--litepicker-highlighted-day-color-bg)}.litepicker .container__days .week-number{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:var(--litepicker-month-week-number-color);font-size:85%}.litepicker .container__footer{text-align:right;padding:10px 5px;margin:0 5px;background-color:var(--litepicker-footer-color-bg);-webkit-box-shadow:inset 0px 3px 3px 0px var(--litepicker-footer-box-shadow-color);box-shadow:inset 0px 3px 3px 0px var(--litepicker-footer-box-shadow-color);border-bottom-left-radius:5px;border-bottom-right-radius:5px}.litepicker .container__footer .preview-date-range{margin-right:10px;font-size:90%}.litepicker .container__footer .button-cancel{background-color:var(--litepicker-button-cancel-color-bg);color:var(--litepicker-button-cancel-color);border:0;padding:3px 7px 4px;border-radius:3px}.litepicker .container__footer .button-cancel *{pointer-events:none}.litepicker .container__footer .button-apply{background-color:var(--litepicker-button-apply-color-bg);color:var(--litepicker-button-apply-color);border:0;padding:3px 7px 4px;border-radius:3px;margin-left:10px;margin-right:10px}.litepicker .container__footer .button-apply:disabled{opacity:0.7}.litepicker .container__footer .button-apply *{pointer-events:none}.litepicker .container__tooltip{position:absolute;margin-top:-4px;padding:4px 8px;border-radius:4px;background-color:var(--litepicker-tooltip-color-bg);-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.25);box-shadow:0 1px 3px rgba(0,0,0,0.25);white-space:nowrap;font-size:11px;pointer-events:none;visibility:hidden}.litepicker .container__tooltip:before{position:absolute;bottom:-5px;left:calc(50% - 5px);border-top:5px solid rgba(0,0,0,0.12);border-right:5px solid transparent;border-left:5px solid transparent;content:""}.litepicker .container__tooltip:after{position:absolute;bottom:-4px;left:calc(50% - 4px);border-top:4px solid var(--litepicker-tooltip-color-bg);border-right:4px solid transparent;border-left:4px solid transparent;content:""}\n', ""]),
            e.locals = {
                showWeekNumbers: "show-week-numbers",
                litepicker: "litepicker",
                containerMain: "container__main",
                containerMonths: "container__months",
                columns2: "columns-2",
                columns3: "columns-3",
                columns4: "columns-4",
                splitView: "split-view",
                monthItemHeader: "month-item-header",
                buttonPreviousMonth: "button-previous-month",
                buttonNextMonth: "button-next-month",
                monthItem: "month-item",
                monthItemName: "month-item-name",
                monthItemYear: "month-item-year",
                resetButton: "reset-button",
                monthItemWeekdaysRow: "month-item-weekdays-row",
                noPreviousMonth: "no-previous-month",
                noNextMonth: "no-next-month",
                containerDays: "container__days",
                dayItem: "day-item",
                isToday: "is-today",
                isLocked: "is-locked",
                isInRange: "is-in-range",
                isStartDate: "is-start-date",
                isFlipped: "is-flipped",
                isEndDate: "is-end-date",
                isHighlighted: "is-highlighted",
                weekNumber: "week-number",
                containerFooter: "container__footer",
                previewDateRange: "preview-date-range",
                buttonCancel: "button-cancel",
                buttonApply: "button-apply",
                containerTooltip: "container__tooltip"
            },
            t.exports = e
        }
        , function(t, e, n) {
            "use strict";
            t.exports = function(t) {
                var e = [];
                return e.toString = function() {
                    return this.map((function(e) {
                        var n = function(t, e) {
                            var n, i, s, o = t[1] || "", r = t[3];
                            if (!r)
                                return o;
                            if (e && "function" == typeof btoa) {
                                var a = (n = r,
                                i = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
                                s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
                                "/*# ".concat(s, " */"))
                                  , l = r.sources.map((function(t) {
                                    return "/*# sourceURL=".concat(r.sourceRoot || "").concat(t, " */")
                                }
                                ));
                                return [o].concat(l).concat([a]).join("\n")
                            }
                            return [o].join("\n")
                        }(e, t);
                        return e[2] ? "@media ".concat(e[2], " {").concat(n, "}") : n
                    }
                    )).join("")
                }
                ,
                e.i = function(t, n, i) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    var s = {};
                    if (i)
                        for (var o = 0; o < this.length; o++) {
                            var r = this[o][0];
                            null != r && (s[r] = !0)
                        }
                    for (var a = 0; a < t.length; a++) {
                        var l = [].concat(t[a]);
                        i && s[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n),
                        e.push(l))
                    }
                }
                ,
                e
            }
        }
        , function(t, e, n) {
            "use strict";
            var i, s = {}, o = function() {
                return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)),
                i
            }, r = function() {
                var t = {};
                return function(e) {
                    if (void 0 === t[e]) {
                        var n = document.querySelector(e);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                            try {
                                n = n.contentDocument.head
                            } catch (t) {
                                n = null
                            }
                        t[e] = n
                    }
                    return t[e]
                }
            }();
            function a(t, e) {
                for (var n = [], i = {}, s = 0; s < t.length; s++) {
                    var o = t[s]
                      , r = e.base ? o[0] + e.base : o[0]
                      , a = {
                        css: o[1],
                        media: o[2],
                        sourceMap: o[3]
                    };
                    i[r] ? i[r].parts.push(a) : n.push(i[r] = {
                        id: r,
                        parts: [a]
                    })
                }
                return n
            }
            function l(t, e) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n]
                      , o = s[i.id]
                      , r = 0;
                    if (o) {
                        for (o.refs++; r < o.parts.length; r++)
                            o.parts[r](i.parts[r]);
                        for (; r < i.parts.length; r++)
                            o.parts.push(g(i.parts[r], e))
                    } else {
                        for (var a = []; r < i.parts.length; r++)
                            a.push(g(i.parts[r], e));
                        s[i.id] = {
                            id: i.id,
                            refs: 1,
                            parts: a
                        }
                    }
                }
            }
            function c(t) {
                var e = document.createElement("style");
                if (void 0 === t.attributes.nonce) {
                    var i = n.nc;
                    i && (t.attributes.nonce = i)
                }
                if (Object.keys(t.attributes).forEach((function(n) {
                    e.setAttribute(n, t.attributes[n])
                }
                )),
                "function" == typeof t.insert)
                    t.insert(e);
                else {
                    var s = r(t.insert || "head");
                    if (!s)
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    s.appendChild(e)
                }
                return e
            }
            var u, d = (u = [],
            function(t, e) {
                return u[t] = e,
                u.filter(Boolean).join("\n")
            }
            );
            function h(t, e, n, i) {
                var s = n ? "" : i.css;
                if (t.styleSheet)
                    t.styleSheet.cssText = d(e, s);
                else {
                    var o = document.createTextNode(s)
                      , r = t.childNodes;
                    r[e] && t.removeChild(r[e]),
                    r.length ? t.insertBefore(o, r[e]) : t.appendChild(o)
                }
            }
            function p(t, e, n) {
                var i = n.css
                  , s = n.media
                  , o = n.sourceMap;
                if (s && t.setAttribute("media", s),
                o && btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")),
                t.styleSheet)
                    t.styleSheet.cssText = i;
                else {
                    for (; t.firstChild; )
                        t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(i))
                }
            }
            var m = null
              , f = 0;
            function g(t, e) {
                var n, i, s;
                if (e.singleton) {
                    var o = f++;
                    n = m || (m = c(e)),
                    i = h.bind(null, n, o, !1),
                    s = h.bind(null, n, o, !0)
                } else
                    n = c(e),
                    i = p.bind(null, n, e),
                    s = function() {
                        !function(t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t)
                        }(n)
                    }
                    ;
                return i(t),
                function(e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                            return;
                        i(t = e)
                    } else
                        s()
                }
            }
            t.exports = function(t, e) {
                (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {},
                e.singleton || "boolean" == typeof e.singleton || (e.singleton = o());
                var n = a(t, e);
                return l(n, e),
                function(t) {
                    for (var i = [], o = 0; o < n.length; o++) {
                        var r = n[o]
                          , c = s[r.id];
                        c && (c.refs--,
                        i.push(c))
                    }
                    t && l(a(t, e), e);
                    for (var u = 0; u < i.length; u++) {
                        var d = i[u];
                        if (0 === d.refs) {
                            for (var h = 0; h < d.parts.length; h++)
                                d.parts[h]();
                            delete s[d.id]
                        }
                    }
                }
            }
        }
        , function(t, e, n) {
            "use strict";
            var i = this && this.__assign || function() {
                return (i = Object.assign || function(t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var s in e = arguments[n])
                            Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
                    return t
                }
                ).apply(this, arguments)
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var s = n(0)
              , o = n(1)
              , r = n(2);
            o.Litepicker.prototype.show = function(t) {
                void 0 === t && (t = null),
                this.emit("before:show", t);
                var e = t || this.options.element;
                if (this.triggerElement = e,
                !this.isShowning()) {
                    if (this.options.inlineMode)
                        return this.ui.style.position = "relative",
                        this.ui.style.display = "inline-block",
                        this.ui.style.top = null,
                        this.ui.style.left = null,
                        this.ui.style.bottom = null,
                        void (this.ui.style.right = null);
                    this.scrollToDate(t),
                    this.render(),
                    this.ui.style.position = "absolute",
                    this.ui.style.display = "block",
                    this.ui.style.zIndex = this.options.zIndex;
                    var n = this.findPosition(e);
                    this.ui.style.top = n.top + "px",
                    this.ui.style.left = n.left + "px",
                    this.ui.style.right = null,
                    this.ui.style.bottom = null,
                    this.emit("show", t)
                }
            }
            ,
            o.Litepicker.prototype.hide = function() {
                this.isShowning() && (this.datePicked.length = 0,
                this.updateInput(),
                this.options.inlineMode ? this.render() : (this.ui.style.display = "none",
                this.emit("hide")))
            }
            ,
            o.Litepicker.prototype.getDate = function() {
                return this.getStartDate()
            }
            ,
            o.Litepicker.prototype.getStartDate = function() {
                return this.options.startDate ? this.options.startDate.clone() : null
            }
            ,
            o.Litepicker.prototype.getEndDate = function() {
                return this.options.endDate ? this.options.endDate.clone() : null
            }
            ,
            o.Litepicker.prototype.setDate = function(t, e) {
                void 0 === e && (e = !1);
                var n = new s.DateTime(t,this.options.format,this.options.lang);
                r.dateIsLocked(n, this.options, [n]) && !e ? this.emit("error:date", n) : (this.setStartDate(t),
                this.options.inlineMode && this.render(),
                this.emit("selected", this.getDate()))
            }
            ,
            o.Litepicker.prototype.setStartDate = function(t) {
                t && (this.options.startDate = new s.DateTime(t,this.options.format,this.options.lang),
                this.updateInput())
            }
            ,
            o.Litepicker.prototype.setEndDate = function(t) {
                t && (this.options.endDate = new s.DateTime(t,this.options.format,this.options.lang),
                this.options.startDate.getTime() > this.options.endDate.getTime() && (this.options.endDate = this.options.startDate.clone(),
                this.options.startDate = new s.DateTime(t,this.options.format,this.options.lang)),
                this.updateInput())
            }
            ,
            o.Litepicker.prototype.setDateRange = function(t, e, n) {
                void 0 === n && (n = !1),
                this.triggerElement = void 0;
                var i = new s.DateTime(t,this.options.format,this.options.lang)
                  , o = new s.DateTime(e,this.options.format,this.options.lang);
                (this.options.disallowLockDaysInRange ? r.rangeIsLocked([i, o], this.options) : r.dateIsLocked(i, this.options, [i, o]) || r.dateIsLocked(o, this.options, [i, o])) && !n ? this.emit("error:range", [i, o]) : (this.setStartDate(i),
                this.setEndDate(o),
                this.options.inlineMode && this.render(),
                this.updateInput(),
                this.emit("selected", this.getStartDate(), this.getEndDate()))
            }
            ,
            o.Litepicker.prototype.gotoDate = function(t, e) {
                void 0 === e && (e = 0);
                var n = new s.DateTime(t);
                n.setDate(1),
                this.calendars[e] = n.clone(),
                this.render()
            }
            ,
            o.Litepicker.prototype.setLockDays = function(t) {
                this.options.lockDays = s.DateTime.convertArray(t, this.options.lockDaysFormat),
                this.render()
            }
            ,
            o.Litepicker.prototype.setHighlightedDays = function(t) {
                this.options.highlightedDays = s.DateTime.convertArray(t, this.options.highlightedDaysFormat),
                this.render()
            }
            ,
            o.Litepicker.prototype.setOptions = function(t) {
                delete t.element,
                delete t.elementEnd,
                delete t.parentEl,
                t.startDate && (t.startDate = new s.DateTime(t.startDate,this.options.format,this.options.lang)),
                t.endDate && (t.endDate = new s.DateTime(t.endDate,this.options.format,this.options.lang));
                var e = i(i({}, this.options.dropdowns), t.dropdowns)
                  , n = i(i({}, this.options.buttonText), t.buttonText)
                  , o = i(i({}, this.options.tooltipText), t.tooltipText);
                this.options = i(i({}, this.options), t),
                this.options.dropdowns = i({}, e),
                this.options.buttonText = i({}, n),
                this.options.tooltipText = i({}, o),
                !this.options.singleMode || this.options.startDate instanceof s.DateTime || (this.options.startDate = null,
                this.options.endDate = null),
                this.options.singleMode || this.options.startDate instanceof s.DateTime && this.options.endDate instanceof s.DateTime || (this.options.startDate = null,
                this.options.endDate = null);
                for (var r = 0; r < this.options.numberOfMonths; r += 1) {
                    var a = this.options.startDate ? this.options.startDate.clone() : new s.DateTime;
                    a.setDate(1),
                    a.setMonth(a.getMonth() + r),
                    this.calendars[r] = a
                }
                this.options.lockDays.length && (this.options.lockDays = s.DateTime.convertArray(this.options.lockDays, this.options.lockDaysFormat)),
                this.options.highlightedDays.length && (this.options.highlightedDays = s.DateTime.convertArray(this.options.highlightedDays, this.options.highlightedDaysFormat)),
                this.render(),
                this.options.inlineMode && this.show(),
                this.updateInput()
            }
            ,
            o.Litepicker.prototype.clearSelection = function() {
                this.options.startDate = null,
                this.options.endDate = null,
                this.datePicked.length = 0,
                this.updateInput(),
                this.isShowning() && this.render(),
                this.emit("clear:selection")
            }
            ,
            o.Litepicker.prototype.destroy = function() {
                this.ui && this.ui.parentNode && (this.ui.parentNode.removeChild(this.ui),
                this.ui = null),
                this.emit("destroy")
            }
        }
        ])
    },
    991: function() {
        !function(t) {
            var e = {};
            function n(i) {
                if (e[i])
                    return e[i].exports;
                var s = e[i] = {
                    i: i,
                    l: !1,
                    exports: {}
                };
                return t[i].call(s.exports, s, s.exports, n),
                s.l = !0,
                s.exports
            }
            n.m = t,
            n.c = e,
            n.d = function(t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {
                    enumerable: !0,
                    get: i
                })
            }
            ,
            n.r = function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
            ,
            n.t = function(t, e) {
                if (1 & e && (t = n(t)),
                8 & e)
                    return t;
                if (4 & e && "object" == typeof t && t && t.__esModule)
                    return t;
                var i = Object.create(null);
                if (n.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }),
                2 & e && "string" != typeof t)
                    for (var s in t)
                        n.d(i, s, function(e) {
                            return t[e]
                        }
                        .bind(null, s));
                return i
            }
            ,
            n.n = function(t) {
                var e = t && t.__esModule ? function() {
                    return t.default
                }
                : function() {
                    return t
                }
                ;
                return n.d(e, "a", e),
                e
            }
            ,
            n.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            ,
            n.p = "",
            n(n.s = 5)
        }([function(t, e, n) {
            "use strict";
            t.exports = function(t) {
                var e = [];
                return e.toString = function() {
                    return this.map((function(e) {
                        var n = function(t, e) {
                            var n, i, s, o = t[1] || "", r = t[3];
                            if (!r)
                                return o;
                            if (e && "function" == typeof btoa) {
                                var a = (n = r,
                                i = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
                                s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
                                "/*# ".concat(s, " */"))
                                  , l = r.sources.map((function(t) {
                                    return "/*# sourceURL=".concat(r.sourceRoot || "").concat(t, " */")
                                }
                                ));
                                return [o].concat(l).concat([a]).join("\n")
                            }
                            return [o].join("\n")
                        }(e, t);
                        return e[2] ? "@media ".concat(e[2], " {").concat(n, "}") : n
                    }
                    )).join("")
                }
                ,
                e.i = function(t, n, i) {
                    "string" == typeof t && (t = [[null, t, ""]]);
                    var s = {};
                    if (i)
                        for (var o = 0; o < this.length; o++) {
                            var r = this[o][0];
                            null != r && (s[r] = !0)
                        }
                    for (var a = 0; a < t.length; a++) {
                        var l = [].concat(t[a]);
                        i && s[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n),
                        e.push(l))
                    }
                }
                ,
                e
            }
        }
        , function(t, e, n) {
            "use strict";
            var i, s = {}, o = function() {
                var t = {};
                return function(e) {
                    if (void 0 === t[e]) {
                        var n = document.querySelector(e);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                            try {
                                n = n.contentDocument.head
                            } catch (t) {
                                n = null
                            }
                        t[e] = n
                    }
                    return t[e]
                }
            }();
            function r(t, e) {
                for (var n = [], i = {}, s = 0; s < t.length; s++) {
                    var o = t[s]
                      , r = e.base ? o[0] + e.base : o[0]
                      , a = {
                        css: o[1],
                        media: o[2],
                        sourceMap: o[3]
                    };
                    i[r] ? i[r].parts.push(a) : n.push(i[r] = {
                        id: r,
                        parts: [a]
                    })
                }
                return n
            }
            function a(t, e) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n]
                      , o = s[i.id]
                      , r = 0;
                    if (o) {
                        for (o.refs++; r < o.parts.length; r++)
                            o.parts[r](i.parts[r]);
                        for (; r < i.parts.length; r++)
                            o.parts.push(f(i.parts[r], e))
                    } else {
                        for (var a = []; r < i.parts.length; r++)
                            a.push(f(i.parts[r], e));
                        s[i.id] = {
                            id: i.id,
                            refs: 1,
                            parts: a
                        }
                    }
                }
            }
            function l(t) {
                var e = document.createElement("style");
                if (void 0 === t.attributes.nonce) {
                    var i = n.nc;
                    i && (t.attributes.nonce = i)
                }
                if (Object.keys(t.attributes).forEach((function(n) {
                    e.setAttribute(n, t.attributes[n])
                }
                )),
                "function" == typeof t.insert)
                    t.insert(e);
                else {
                    var s = o(t.insert || "head");
                    if (!s)
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    s.appendChild(e)
                }
                return e
            }
            var c, u = (c = [],
            function(t, e) {
                return c[t] = e,
                c.filter(Boolean).join("\n")
            }
            );
            function d(t, e, n, i) {
                var s = n ? "" : i.css;
                if (t.styleSheet)
                    t.styleSheet.cssText = u(e, s);
                else {
                    var o = document.createTextNode(s)
                      , r = t.childNodes;
                    r[e] && t.removeChild(r[e]),
                    r.length ? t.insertBefore(o, r[e]) : t.appendChild(o)
                }
            }
            function h(t, e, n) {
                var i = n.css
                  , s = n.media
                  , o = n.sourceMap;
                if (s && t.setAttribute("media", s),
                o && btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")),
                t.styleSheet)
                    t.styleSheet.cssText = i;
                else {
                    for (; t.firstChild; )
                        t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(i))
                }
            }
            var p = null
              , m = 0;
            function f(t, e) {
                var n, i, s;
                if (e.singleton) {
                    var o = m++;
                    n = p || (p = l(e)),
                    i = d.bind(null, n, o, !1),
                    s = d.bind(null, n, o, !0)
                } else
                    n = l(e),
                    i = h.bind(null, n, e),
                    s = function() {
                        !function(t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t)
                        }(n)
                    }
                    ;
                return i(t),
                function(e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                            return;
                        i(t = e)
                    } else
                        s()
                }
            }
            t.exports = function(t, e) {
                (e = e || {}).attributes = "object" == typeof e.attributes ? e.attributes : {},
                e.singleton || "boolean" == typeof e.singleton || (e.singleton = (void 0 === i && (i = Boolean(window && document && document.all && !window.atob)),
                i));
                var n = r(t, e);
                return a(n, e),
                function(t) {
                    for (var i = [], o = 0; o < n.length; o++) {
                        var l = n[o]
                          , c = s[l.id];
                        c && (c.refs--,
                        i.push(c))
                    }
                    t && a(r(t, e), e);
                    for (var u = 0; u < i.length; u++) {
                        var d = i[u];
                        if (0 === d.refs) {
                            for (var h = 0; h < d.parts.length; h++)
                                d.parts[h]();
                            delete s[d.id]
                        }
                    }
                }
            }
        }
        , , , , function(t, e, n) {
            "use strict";
            function i(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(t);
                    e && (i = i.filter((function(e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }
                    ))),
                    n.push.apply(n, i)
                }
                return n
            }
            function s(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? i(Object(n), !0).forEach((function(e) {
                        o(t, e, n[e])
                    }
                    )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }
                    ))
                }
                return t
            }
            function o(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n,
                t
            }
            n.r(e),
            n(6),
            Litepicker.add("mobilefriendly", {
                init: function(t) {
                    var e = t.options;
                    t.options.mobilefriendly = s(s({}, {
                        breakpoint: 480
                    }), e.mobilefriendly),
                    Object.defineProperties(t, {
                        xTouchDown: {
                            value: null,
                            writable: !0
                        },
                        yTouchDown: {
                            value: null,
                            writable: !0
                        },
                        touchTargetMonth: {
                            value: null,
                            writable: !0
                        }
                    });
                    var n = !1;
                    try {
                        var i = Object.defineProperty({}, "passive", {
                            get: function() {
                                n = !0
                            }
                        });
                        window.addEventListener("testPassive", null, i),
                        window.removeEventListener("testPassive", null, i)
                    } catch (t) {}
                    function o() {
                        var e = "portrait" === r();
                        return window.matchMedia("(max-device-".concat(e ? "width" : "height", ": ").concat(t.options.mobilefriendly.breakpoint, "px)")).matches
                    }
                    function r() {
                        return "orientation"in window.screen && "type"in window.screen.orientation ? window.screen.orientation.type.replace(/\-\w+$/, "") : window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"
                    }
                    function a() {
                        "portrait" === r() ? (t.options.numberOfMonths = 1,
                        t.options.numberOfColumns = 1) : (t.options.numberOfMonths = 2,
                        t.options.numberOfColumns = 2)
                    }
                    t.backdrop = document.createElement("div"),
                    t.backdrop.className = "litepicker-backdrop",
                    t.backdrop.addEventListener("click", t.hide()),
                    e.element && e.element.parentNode && e.element.parentNode.appendChild(t.backdrop),
                    window.addEventListener("orientationchange", (function(n) {
                        window.addEventListener("resize", (function n() {
                            if (o() && t.isShowning()) {
                                var i = r();
                                if ("landscape" === i)
                                    e.numberOfMonths = 2,
                                    e.numberOfColumns = 2;
                                else
                                    e.numberOfMonths = 1,
                                    e.numberOfColumns = 1;
                                t.ui.classList.toggle("mobilefriendly-portrait", "portrait" === i),
                                t.ui.classList.toggle("mobilefriendly-landscape", "landscape" === i),
                                t.render()
                            }
                            window.removeEventListener("resize", n)
                        }
                        ))
                    }
                    )),
                    e.inlineMode && o() && (window.dispatchEvent(new Event("orientationchange")),
                    window.dispatchEvent(new Event("resize"))),
                    t.on("before:show", (function(e) {
                        if (t.triggerElement = e,
                        !t.options.inlineMode && o()) {
                            t.emit("mobilefriendly.before:show", e),
                            t.ui.style.position = "fixed",
                            t.ui.style.display = "block",
                            a(),
                            t.scrollToDate(e),
                            t.render();
                            var n = r();
                            t.ui.classList.add("mobilefriendly"),
                            t.ui.classList.toggle("mobilefriendly-portrait", "portrait" === n),
                            t.ui.classList.toggle("mobilefriendly-landscape", "landscape" === n),
                            t.ui.style.top = "50%",
                            t.ui.style.left = "50%",
                            t.ui.style.right = null,
                            t.ui.style.bottom = null,
                            t.ui.style.zIndex = t.options.zIndex,
                            t.backdrop.style.display = "block",
                            t.backdrop.style.zIndex = t.options.zIndex - 1,
                            document.body.classList.add("litepicker-open"),
                            (e || t.options.element).blur(),
                            t.emit("mobilefriendly.show", e)
                        } else
                            o() && (a(),
                            t.render())
                    }
                    )),
                    t.on("render", (function(e) {
                        t.touchTargetMonth && Array.from(t.ui.querySelectorAll(".month-item")).map((function(e) {
                            return e.classList.add("touch-target-".concat(t.touchTargetMonth))
                        }
                        )),
                        t.touchTargetMonth = null
                    }
                    )),
                    t.on("hide", (function() {
                        document.body.classList.remove("litepicker-open"),
                        t.backdrop.style.display = "none",
                        t.ui.classList.remove("mobilefriendly", "mobilefriendly-portrait", "mobilefriendly-landscape")
                    }
                    )),
                    t.on("destroy", (function() {
                        t.backdrop && t.backdrop.parentNode && t.backdrop.parentNode.removeChild(t.backdrop)
                    }
                    )),
                    t.ui.addEventListener("touchstart", (function(e) {
                        var n = e.touches[0];
                        t.xTouchDown = n.clientX,
                        t.yTouchDown = n.clientY
                    }
                    ), !!n && {
                        passive: !0
                    }),
                    t.ui.addEventListener("touchmove", (function(e) {
                        if (t.xTouchDown && t.yTouchDown) {
                            var n = e.touches[0].clientX
                              , i = e.touches[0].clientY
                              , s = t.xTouchDown - n
                              , o = t.yTouchDown - i
                              , r = Math.abs(s) > Math.abs(o)
                              , a = t.options.numberOfMonths
                              , l = null
                              , c = !1
                              , u = ""
                              , d = Array.from(t.ui.querySelectorAll(".month-item"));
                            if (r) {
                                var h = t.DateTime(t.ui.querySelector(".day-item").dataset.time)
                                  , p = Number("".concat(1 - Math.abs(s) / 100))
                                  , m = 0;
                                if (s > 0) {
                                    m = -Math.abs(s),
                                    l = h.clone().add(a, "month");
                                    var f = t.options.maxDate;
                                    c = !f || l.isSameOrBefore(t.DateTime(f), "month"),
                                    u = "next"
                                } else {
                                    m = Math.abs(s),
                                    l = h.clone().subtract(a, "month");
                                    var g = t.options.minDate;
                                    c = !g || l.isSameOrAfter(t.DateTime(g), "month"),
                                    u = "prev"
                                }
                                c && d.map((function(t) {
                                    t.style.opacity = p,
                                    t.style.transform = "translateX(".concat(m, "px)")
                                }
                                ))
                            }
                            Math.abs(s) + Math.abs(o) > 100 && r && l && c && (t.touchTargetMonth = u,
                            t.gotoDate(l))
                        }
                    }
                    ), !!n && {
                        passive: !0
                    }),
                    t.ui.addEventListener("touchend", (function(e) {
                        t.touchTargetMonth || Array.from(t.ui.querySelectorAll(".month-item")).map((function(t) {
                            t.style.transform = "translateX(0px)",
                            t.style.opacity = 1
                        }
                        )),
                        t.xTouchDown = null,
                        t.yTouchDown = null
                    }
                    ), !!n && {
                        passive: !0
                    })
                }
            })
        }
        , function(t, e, n) {
            var i = n(7);
            "string" == typeof i && (i = [[t.i, i, ""]]);
            var s = {
                insert: function(t) {
                    var e = document.querySelector("head")
                      , n = window._lastElementInsertedByStyleLoader;
                    window.disableLitepickerStyles || (n ? n.nextSibling ? e.insertBefore(t, n.nextSibling) : e.appendChild(t) : e.insertBefore(t, e.firstChild),
                    window._lastElementInsertedByStyleLoader = t)
                },
                singleton: !1
            };
            n(1)(i, s),
            i.locals && (t.exports = i.locals)
        }
        , function(t, e, n) {
            (e = n(0)(!1)).push([t.i, ':root {\n  --litepicker-mobilefriendly-backdrop-color-bg: #000;\n}\n\n.litepicker-backdrop {\n  display: none;\n  background-color: var(--litepicker-mobilefriendly-backdrop-color-bg);\n  opacity: 0.3;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.litepicker-open {\n  overflow: hidden;\n}\n\n.litepicker.mobilefriendly[data-plugins*="mobilefriendly"] {\n  transform: translate(-50%, -50%);\n  font-size: 1.1rem;\n  --litepicker-container-months-box-shadow-color: #616161;\n}\n.litepicker.mobilefriendly-portrait {\n  --litepicker-day-width: 13.5vw;\n  --litepicker-month-width: calc(var(--litepicker-day-width) * 7);\n}\n.litepicker.mobilefriendly-landscape {\n  --litepicker-day-width: 5.5vw;\n  --litepicker-month-width: calc(var(--litepicker-day-width) * 7);\n}\n\n.litepicker[data-plugins*="mobilefriendly"] .container__months {\n  overflow: hidden;\n}\n\n.litepicker.mobilefriendly[data-plugins*="mobilefriendly"] .container__months .month-item-header {\n  height: var(--litepicker-day-width);\n}\n\n.litepicker.mobilefriendly[data-plugins*="mobilefriendly"] .container__days > div {\n  height: var(--litepicker-day-width);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n\n.litepicker[data-plugins*="mobilefriendly"] .container__months .month-item {\n  transform-origin: center;\n}\n\n.litepicker[data-plugins*="mobilefriendly"] .container__months .month-item.touch-target-next {\n  animation-name: lp-bounce-target-next;\n  animation-duration: .5s;\n  animation-timing-function: ease;\n}\n\n.litepicker[data-plugins*="mobilefriendly"] .container__months .month-item.touch-target-prev {\n  animation-name: lp-bounce-target-prev;\n  animation-duration: .5s;\n  animation-timing-function: ease;\n}\n\n@keyframes lp-bounce-target-next {\n  from {\n    transform: translateX(100px) scale(0.5);\n  }\n  to {\n    transform: translateX(0px) scale(1);\n  }\n}\n\n@keyframes lp-bounce-target-prev {\n  from {\n    transform: translateX(-100px) scale(0.5);\n  }\n  to {\n    transform: translateX(0px) scale(1);\n  }\n}', ""]),
            t.exports = e
        }
        ])
    },
    1325: function(t, e, n) {
        "use strict";
        n.r(e)
    },
    4183: function(t) {
        t.exports = function() {
            "use strict";
            function t(t, e) {
                t.split(/\s+/).forEach((t=>{
                    e(t)
                }
                ))
            }
            class e {
                constructor() {
                    this._events = void 0,
                    this._events = {}
                }
                on(e, n) {
                    t(e, (t=>{
                        const e = this._events[t] || [];
                        e.push(n),
                        this._events[t] = e
                    }
                    ))
                }
                off(e, n) {
                    var i = arguments.length;
                    0 !== i ? t(e, (t=>{
                        if (1 === i)
                            return void delete this._events[t];
                        const e = this._events[t];
                        void 0 !== e && (e.splice(e.indexOf(n), 1),
                        this._events[t] = e)
                    }
                    )) : this._events = {}
                }
                trigger(e, ...n) {
                    var i = this;
                    t(e, (t=>{
                        const e = i._events[t];
                        void 0 !== e && e.forEach((t=>{
                            t.apply(i, n)
                        }
                        ))
                    }
                    ))
                }
            }
            function n(t) {
                return t.plugins = {},
                class extends t {
                    constructor(...t) {
                        super(...t),
                        this.plugins = {
                            names: [],
                            settings: {},
                            requested: {},
                            loaded: {}
                        }
                    }
                    static define(e, n) {
                        t.plugins[e] = {
                            name: e,
                            fn: n
                        }
                    }
                    initializePlugins(t) {
                        var e, n;
                        const i = this
                          , s = [];
                        if (Array.isArray(t))
                            t.forEach((t=>{
                                "string" == typeof t ? s.push(t) : (i.plugins.settings[t.name] = t.options,
                                s.push(t.name))
                            }
                            ));
                        else if (t)
                            for (e in t)
                                t.hasOwnProperty(e) && (i.plugins.settings[e] = t[e],
                                s.push(e));
                        for (; n = s.shift(); )
                            i.require(n)
                    }
                    loadPlugin(e) {
                        var n = this
                          , i = n.plugins
                          , s = t.plugins[e];
                        if (!t.plugins.hasOwnProperty(e))
                            throw new Error('Unable to find "' + e + '" plugin');
                        i.requested[e] = !0,
                        i.loaded[e] = s.fn.apply(n, [n.plugins.settings[e] || {}]),
                        i.names.push(e)
                    }
                    require(t) {
                        var e = this
                          , n = e.plugins;
                        if (!e.plugins.loaded.hasOwnProperty(t)) {
                            if (n.requested[t])
                                throw new Error('Plugin has circular dependency ("' + t + '")');
                            e.loadPlugin(t)
                        }
                        return n.loaded[t]
                    }
                }
            }
            const i = t=>(t = t.filter(Boolean)).length < 2 ? t[0] || "" : 1 == l(t) ? "[" + t.join("") + "]" : "(?:" + t.join("|") + ")"
              , s = t=>{
                if (!r(t))
                    return t.join("");
                let e = ""
                  , n = 0;
                const i = ()=>{
                    n > 1 && (e += "{" + n + "}")
                }
                ;
                return t.forEach(((s,o)=>{
                    s !== t[o - 1] ? (i(),
                    e += s,
                    n = 1) : n++
                }
                )),
                i(),
                e
            }
              , o = t=>{
                let e = u(t);
                return i(e)
            }
              , r = t=>new Set(t).size !== t.length
              , a = t=>(t + "").replace(/([\$\(\)\*\+\.\?\[\]\^\{\|\}\\])/gu, "\\$1")
              , l = t=>t.reduce(((t,e)=>Math.max(t, c(e))), 0)
              , c = t=>u(t).length
              , u = t=>Array.from(t)
              , d = t=>{
                if (1 === t.length)
                    return [[t]];
                let e = [];
                const n = t.substring(1);
                return d(n).forEach((function(n) {
                    let i = n.slice(0);
                    i[0] = t.charAt(0) + i[0],
                    e.push(i),
                    i = n.slice(0),
                    i.unshift(t.charAt(0)),
                    e.push(i)
                }
                )),
                e
            }
              , h = [[0, 65535]]
              , p = "[̀-ͯ·ʾʼ]";
            let m, f;
            const g = 3
              , v = {}
              , y = {
                "/": "⁄∕",
                0: "߀",
                a: "ⱥɐɑ",
                aa: "ꜳ",
                ae: "æǽǣ",
                ao: "ꜵ",
                au: "ꜷ",
                av: "ꜹꜻ",
                ay: "ꜽ",
                b: "ƀɓƃ",
                c: "ꜿƈȼↄ",
                d: "đɗɖᴅƌꮷԁɦ",
                e: "ɛǝᴇɇ",
                f: "ꝼƒ",
                g: "ǥɠꞡᵹꝿɢ",
                h: "ħⱨⱶɥ",
                i: "ɨı",
                j: "ɉȷ",
                k: "ƙⱪꝁꝃꝅꞣ",
                l: "łƚɫⱡꝉꝇꞁɭ",
                m: "ɱɯϻ",
                n: "ꞥƞɲꞑᴎлԉ",
                o: "øǿɔɵꝋꝍᴑ",
                oe: "œ",
                oi: "ƣ",
                oo: "ꝏ",
                ou: "ȣ",
                p: "ƥᵽꝑꝓꝕρ",
                q: "ꝗꝙɋ",
                r: "ɍɽꝛꞧꞃ",
                s: "ßȿꞩꞅʂ",
                t: "ŧƭʈⱦꞇ",
                th: "þ",
                tz: "ꜩ",
                u: "ʉ",
                v: "ʋꝟʌ",
                vy: "ꝡ",
                w: "ⱳ",
                y: "ƴɏỿ",
                z: "ƶȥɀⱬꝣ",
                hv: "ƕ"
            };
            for (let t in y) {
                let e = y[t] || "";
                for (let n = 0; n < e.length; n++) {
                    let i = e.substring(n, n + 1);
                    v[i] = t
                }
            }
            const b = new RegExp(Object.keys(v).join("|") + "|" + p,"gu")
              , _ = t=>{
                void 0 === m && (m = D(t || h))
            }
              , w = (t,e="NFKD")=>t.normalize(e)
              , k = t=>u(t).reduce(((t,e)=>t + x(e)), "")
              , x = t=>(t = w(t).toLowerCase().replace(b, (t=>v[t] || "")),
            w(t, "NFC"));
            function *T(t) {
                for (const [e,n] of t)
                    for (let t = e; t <= n; t++) {
                        let e = String.fromCharCode(t)
                          , n = k(e);
                        n != e.toLowerCase() && (n.length > g || 0 != n.length && (yield{
                            folded: n,
                            composed: e,
                            code_point: t
                        }))
                    }
            }
            const E = t=>{
                const e = {}
                  , n = (t,n)=>{
                    const i = e[t] || new Set
                      , s = new RegExp("^" + o(i) + "$","iu");
                    n.match(s) || (i.add(a(n)),
                    e[t] = i)
                }
                ;
                for (let e of T(t))
                    n(e.folded, e.folded),
                    n(e.folded, e.composed);
                return e
            }
              , D = t=>{
                const e = E(t)
                  , n = {};
                let s = [];
                for (let t in e) {
                    let i = e[t];
                    i && (n[t] = o(i)),
                    t.length > 1 && s.push(a(t))
                }
                s.sort(((t,e)=>e.length - t.length));
                const r = i(s);
                return f = new RegExp("^" + r,"u"),
                n
            }
              , S = (t,e=1)=>{
                let n = 0;
                return t = t.map((t=>(m[t] && (n += t.length),
                m[t] || t))),
                n >= e ? s(t) : ""
            }
              , O = (t,e=1)=>(e = Math.max(e, t.length - 1),
            i(d(t).map((t=>S(t, e)))))
              , C = (t,e=!0)=>{
                let n = t.length > 1 ? 1 : 0;
                return i(t.map((t=>{
                    let i = [];
                    const o = e ? t.length() : t.length() - 1;
                    for (let e = 0; e < o; e++)
                        i.push(O(t.substrs[e] || "", n));
                    return s(i)
                }
                )))
            }
              , L = (t,e)=>{
                for (const n of e) {
                    if (n.start != t.start || n.end != t.end)
                        continue;
                    if (n.substrs.join("") !== t.substrs.join(""))
                        continue;
                    let e = t.parts;
                    const i = t=>{
                        for (const n of e) {
                            if (n.start === t.start && n.substr === t.substr)
                                return !1;
                            if (1 != t.length && 1 != n.length) {
                                if (t.start < n.start && t.end > n.start)
                                    return !0;
                                if (n.start < t.start && n.end > t.start)
                                    return !0
                            }
                        }
                        return !1
                    }
                    ;
                    if (!(n.parts.filter(i).length > 0))
                        return !0
                }
                return !1
            }
            ;
            class M {
                constructor() {
                    this.parts = [],
                    this.substrs = [],
                    this.start = 0,
                    this.end = 0
                }
                add(t) {
                    t && (this.parts.push(t),
                    this.substrs.push(t.substr),
                    this.start = Math.min(t.start, this.start),
                    this.end = Math.max(t.end, this.end))
                }
                last() {
                    return this.parts[this.parts.length - 1]
                }
                length() {
                    return this.parts.length
                }
                clone(t, e) {
                    let n = new M
                      , i = JSON.parse(JSON.stringify(this.parts))
                      , s = i.pop();
                    for (const t of i)
                        n.add(t);
                    let o = e.substr.substring(0, t - s.start)
                      , r = o.length;
                    return n.add({
                        start: s.start,
                        end: s.start + r,
                        length: r,
                        substr: o
                    }),
                    n
                }
            }
            const I = t=>{
                _(),
                t = k(t);
                let e = ""
                  , n = [new M];
                for (let i = 0; i < t.length; i++) {
                    let s = t.substring(i).match(f);
                    const o = t.substring(i, i + 1)
                      , r = s ? s[0] : null;
                    let a = []
                      , l = new Set;
                    for (const t of n) {
                        const e = t.last();
                        if (!e || 1 == e.length || e.end <= i)
                            if (r) {
                                const e = r.length;
                                t.add({
                                    start: i,
                                    end: i + e,
                                    length: e,
                                    substr: r
                                }),
                                l.add("1")
                            } else
                                t.add({
                                    start: i,
                                    end: i + 1,
                                    length: 1,
                                    substr: o
                                }),
                                l.add("2");
                        else if (r) {
                            let n = t.clone(i, e);
                            const s = r.length;
                            n.add({
                                start: i,
                                end: i + s,
                                length: s,
                                substr: r
                            }),
                            a.push(n)
                        } else
                            l.add("3")
                    }
                    if (a.length > 0) {
                        a = a.sort(((t,e)=>t.length() - e.length()));
                        for (let t of a)
                            L(t, n) || n.push(t)
                    } else if (i > 0 && 1 == l.size && !l.has("3")) {
                        e += C(n, !1);
                        let t = new M;
                        const i = n[0];
                        i && t.add(i.last()),
                        n = [t]
                    }
                }
                return e += C(n, !0),
                e
            }
              , A = (t,e)=>{
                if (t)
                    return t[e]
            }
              , N = (t,e)=>{
                if (t) {
                    for (var n, i = e.split("."); (n = i.shift()) && (t = t[n]); )
                        ;
                    return t
                }
            }
              , F = (t,e,n)=>{
                var i, s;
                return t ? (t += "",
                null == e.regex || -1 === (s = t.search(e.regex)) ? 0 : (i = e.string.length / t.length,
                0 === s && (i += .5),
                i * n)) : 0
            }
              , P = (t,e)=>{
                var n = t[e];
                if ("function" == typeof n)
                    return n;
                n && !Array.isArray(n) && (t[e] = [n])
            }
              , j = (t,e)=>{
                if (Array.isArray(t))
                    t.forEach(e);
                else
                    for (var n in t)
                        t.hasOwnProperty(n) && e(t[n], n)
            }
              , q = (t,e)=>"number" == typeof t && "number" == typeof e ? t > e ? 1 : t < e ? -1 : 0 : (t = k(t + "").toLowerCase()) > (e = k(e + "").toLowerCase()) ? 1 : e > t ? -1 : 0;
            class H {
                constructor(t, e) {
                    this.items = void 0,
                    this.settings = void 0,
                    this.items = t,
                    this.settings = e || {
                        diacritics: !0
                    }
                }
                tokenize(t, e, n) {
                    if (!t || !t.length)
                        return [];
                    const i = []
                      , s = t.split(/\s+/);
                    var o;
                    return n && (o = new RegExp("^(" + Object.keys(n).map(a).join("|") + "):(.*)$")),
                    s.forEach((t=>{
                        let n, s = null, r = null;
                        o && (n = t.match(o)) && (s = n[1],
                        t = n[2]),
                        t.length > 0 && (r = this.settings.diacritics ? I(t) || null : a(t),
                        r && e && (r = "\\b" + r)),
                        i.push({
                            string: t,
                            regex: r ? new RegExp(r,"iu") : null,
                            field: s
                        })
                    }
                    )),
                    i
                }
                getScoreFunction(t, e) {
                    var n = this.prepareSearch(t, e);
                    return this._getScoreFunction(n)
                }
                _getScoreFunction(t) {
                    const e = t.tokens
                      , n = e.length;
                    if (!n)
                        return function() {
                            return 0
                        }
                        ;
                    const i = t.options.fields
                      , s = t.weights
                      , o = i.length
                      , r = t.getAttrFn;
                    if (!o)
                        return function() {
                            return 1
                        }
                        ;
                    const a = 1 === o ? function(t, e) {
                        const n = i[0].field;
                        return F(r(e, n), t, s[n] || 1)
                    }
                    : function(t, e) {
                        var n = 0;
                        if (t.field) {
                            const i = r(e, t.field);
                            !t.regex && i ? n += 1 / o : n += F(i, t, 1)
                        } else
                            j(s, ((i,s)=>{
                                n += F(r(e, s), t, i)
                            }
                            ));
                        return n / o
                    }
                    ;
                    return 1 === n ? function(t) {
                        return a(e[0], t)
                    }
                    : "and" === t.options.conjunction ? function(t) {
                        var i, s = 0;
                        for (let n of e) {
                            if ((i = a(n, t)) <= 0)
                                return 0;
                            s += i
                        }
                        return s / n
                    }
                    : function(t) {
                        var i = 0;
                        return j(e, (e=>{
                            i += a(e, t)
                        }
                        )),
                        i / n
                    }
                }
                getSortFunction(t, e) {
                    var n = this.prepareSearch(t, e);
                    return this._getSortFunction(n)
                }
                _getSortFunction(t) {
                    var e, n = [];
                    const i = this
                      , s = t.options
                      , o = !t.query && s.sort_empty ? s.sort_empty : s.sort;
                    if ("function" == typeof o)
                        return o.bind(this);
                    const r = function(e, n) {
                        return "$score" === e ? n.score : t.getAttrFn(i.items[n.id], e)
                    };
                    if (o)
                        for (let e of o)
                            (t.query || "$score" !== e.field) && n.push(e);
                    if (t.query) {
                        e = !0;
                        for (let t of n)
                            if ("$score" === t.field) {
                                e = !1;
                                break
                            }
                        e && n.unshift({
                            field: "$score",
                            direction: "desc"
                        })
                    } else
                        n = n.filter((t=>"$score" !== t.field));
                    return n.length ? function(t, e) {
                        var i, s;
                        for (let o of n)
                            if (s = o.field,
                            i = ("desc" === o.direction ? -1 : 1) * q(r(s, t), r(s, e)))
                                return i;
                        return 0
                    }
                    : null
                }
                prepareSearch(t, e) {
                    const n = {};
                    var i = Object.assign({}, e);
                    if (P(i, "sort"),
                    P(i, "sort_empty"),
                    i.fields) {
                        P(i, "fields");
                        const t = [];
                        i.fields.forEach((e=>{
                            "string" == typeof e && (e = {
                                field: e,
                                weight: 1
                            }),
                            t.push(e),
                            n[e.field] = "weight"in e ? e.weight : 1
                        }
                        )),
                        i.fields = t
                    }
                    return {
                        options: i,
                        query: t.toLowerCase().trim(),
                        tokens: this.tokenize(t, i.respect_word_boundaries, n),
                        total: 0,
                        items: [],
                        weights: n,
                        getAttrFn: i.nesting ? N : A
                    }
                }
                search(t, e) {
                    var n, i, s = this;
                    i = this.prepareSearch(t, e),
                    e = i.options,
                    t = i.query;
                    const o = e.score || s._getScoreFunction(i);
                    t.length ? j(s.items, ((t,s)=>{
                        n = o(t),
                        (!1 === e.filter || n > 0) && i.items.push({
                            score: n,
                            id: s
                        })
                    }
                    )) : j(s.items, ((t,e)=>{
                        i.items.push({
                            score: 1,
                            id: e
                        })
                    }
                    ));
                    const r = s._getSortFunction(i);
                    return r && i.items.sort(r),
                    i.total = i.items.length,
                    "number" == typeof e.limit && (i.items = i.items.slice(0, e.limit)),
                    i
                }
            }
            const V = (t,e)=>{
                if (Array.isArray(t))
                    t.forEach(e);
                else
                    for (var n in t)
                        t.hasOwnProperty(n) && e(t[n], n)
            }
              , B = t=>{
                if (t.jquery)
                    return t[0];
                if (t instanceof HTMLElement)
                    return t;
                if (R(t)) {
                    var e = document.createElement("template");
                    return e.innerHTML = t.trim(),
                    e.content.firstChild
                }
                return document.querySelector(t)
            }
              , R = t=>"string" == typeof t && t.indexOf("<") > -1
              , z = t=>t.replace(/['"\\]/g, "\\$&")
              , Y = (t,e)=>{
                var n = document.createEvent("HTMLEvents");
                n.initEvent(e, !0, !1),
                t.dispatchEvent(n)
            }
              , U = (t,e)=>{
                Object.assign(t.style, e)
            }
              , W = (t,...e)=>{
                var n = J(e);
                (t = K(t)).map((t=>{
                    n.map((e=>{
                        t.classList.add(e)
                    }
                    ))
                }
                ))
            }
              , Z = (t,...e)=>{
                var n = J(e);
                (t = K(t)).map((t=>{
                    n.map((e=>{
                        t.classList.remove(e)
                    }
                    ))
                }
                ))
            }
              , J = t=>{
                var e = [];
                return V(t, (t=>{
                    "string" == typeof t && (t = t.trim().split(/[\11\12\14\15\40]/)),
                    Array.isArray(t) && (e = e.concat(t))
                }
                )),
                e.filter(Boolean)
            }
              , K = t=>(Array.isArray(t) || (t = [t]),
            t)
              , G = (t,e,n)=>{
                if (!n || n.contains(t))
                    for (; t && t.matches; ) {
                        if (t.matches(e))
                            return t;
                        t = t.parentNode
                    }
            }
              , Q = (t,e=0)=>e > 0 ? t[t.length - 1] : t[0]
              , X = t=>0 === Object.keys(t).length
              , tt = (t,e)=>{
                if (!t)
                    return -1;
                e = e || t.nodeName;
                for (var n = 0; t = t.previousElementSibling; )
                    t.matches(e) && n++;
                return n
            }
              , et = (t,e)=>{
                V(e, ((e,n)=>{
                    null == e ? t.removeAttribute(n) : t.setAttribute(n, "" + e)
                }
                ))
            }
              , nt = (t,e)=>{
                t.parentNode && t.parentNode.replaceChild(e, t)
            }
              , it = (t,e)=>{
                if (null === e)
                    return;
                if ("string" == typeof e) {
                    if (!e.length)
                        return;
                    e = new RegExp(e,"i")
                }
                const n = t=>{
                    var n = t.data.match(e);
                    if (n && t.data.length > 0) {
                        var i = document.createElement("span");
                        i.className = "highlight";
                        var s = t.splitText(n.index);
                        s.splitText(n[0].length);
                        var o = s.cloneNode(!0);
                        return i.appendChild(o),
                        nt(s, i),
                        1
                    }
                    return 0
                }
                  , i = t=>{
                    1 !== t.nodeType || !t.childNodes || /(script|style)/i.test(t.tagName) || "highlight" === t.className && "SPAN" === t.tagName || Array.from(t.childNodes).forEach((t=>{
                        s(t)
                    }
                    ))
                }
                  , s = t=>3 === t.nodeType ? n(t) : (i(t),
                0);
                s(t)
            }
              , st = t=>{
                var e = t.querySelectorAll("span.highlight");
                Array.prototype.forEach.call(e, (function(t) {
                    var e = t.parentNode;
                    e.replaceChild(t.firstChild, t),
                    e.normalize()
                }
                ))
            }
              , ot = 65
              , rt = 13
              , at = 27
              , lt = 37
              , ct = 38
              , ut = 39
              , dt = 40
              , ht = 8
              , pt = 46
              , mt = 9
              , ft = "undefined" != typeof navigator && /Mac/.test(navigator.userAgent) ? "metaKey" : "ctrlKey";
            var gt = {
                options: [],
                optgroups: [],
                plugins: [],
                delimiter: ",",
                splitOn: null,
                persist: !0,
                diacritics: !0,
                create: null,
                createOnBlur: !1,
                createFilter: null,
                highlight: !0,
                openOnFocus: !0,
                shouldOpen: null,
                maxOptions: 50,
                maxItems: null,
                hideSelected: null,
                duplicates: !1,
                addPrecedence: !1,
                selectOnTab: !1,
                preload: null,
                allowEmptyOption: !1,
                loadThrottle: 300,
                loadingClass: "loading",
                dataAttr: null,
                optgroupField: "optgroup",
                valueField: "value",
                labelField: "text",
                disabledField: "disabled",
                optgroupLabelField: "label",
                optgroupValueField: "value",
                lockOptgroupOrder: !1,
                sortField: "$order",
                searchField: ["text"],
                searchConjunction: "and",
                mode: null,
                wrapperClass: "ts-wrapper",
                controlClass: "ts-control",
                dropdownClass: "ts-dropdown",
                dropdownContentClass: "ts-dropdown-content",
                itemClass: "item",
                optionClass: "option",
                dropdownParent: null,
                controlInput: '<input type="text" autocomplete="off" size="1" />',
                copyClassesToDropdown: !1,
                placeholder: null,
                hidePlaceholder: null,
                shouldLoad: function(t) {
                    return t.length > 0
                },
                render: {}
            };
            const vt = t=>null == t ? null : yt(t)
              , yt = t=>"boolean" == typeof t ? t ? "1" : "0" : t + ""
              , bt = t=>(t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
              , _t = (t,e)=>{
                var n;
                return function(i, s) {
                    var o = this;
                    n && (o.loading = Math.max(o.loading - 1, 0),
                    clearTimeout(n)),
                    n = setTimeout((function() {
                        n = null,
                        o.loadedSearches[i] = !0,
                        t.call(o, i, s)
                    }
                    ), e)
                }
            }
              , wt = (t,e,n)=>{
                var i, s = t.trigger, o = {};
                for (i of (t.trigger = function() {
                    var n = arguments[0];
                    if (-1 === e.indexOf(n))
                        return s.apply(t, arguments);
                    o[n] = arguments
                }
                ,
                n.apply(t, []),
                t.trigger = s,
                e))
                    i in o && s.apply(t, o[i])
            }
              , kt = t=>({
                start: t.selectionStart || 0,
                length: (t.selectionEnd || 0) - (t.selectionStart || 0)
            })
              , xt = (t,e=!1)=>{
                t && (t.preventDefault(),
                e && t.stopPropagation())
            }
              , Tt = (t,e,n,i)=>{
                t.addEventListener(e, n, i)
            }
              , Et = (t,e)=>!!e && !!e[t] && 1 == (e.altKey ? 1 : 0) + (e.ctrlKey ? 1 : 0) + (e.shiftKey ? 1 : 0) + (e.metaKey ? 1 : 0)
              , Dt = (t,e)=>{
                const n = t.getAttribute("id");
                return n || (t.setAttribute("id", e),
                e)
            }
              , St = t=>t.replace(/[\\"']/g, "\\$&")
              , Ot = (t,e)=>{
                e && t.append(e)
            }
            ;
            function Ct(t, e) {
                var n = Object.assign({}, gt, e)
                  , i = n.dataAttr
                  , s = n.labelField
                  , o = n.valueField
                  , r = n.disabledField
                  , a = n.optgroupField
                  , l = n.optgroupLabelField
                  , c = n.optgroupValueField
                  , u = t.tagName.toLowerCase()
                  , d = t.getAttribute("placeholder") || t.getAttribute("data-placeholder");
                if (!d && !n.allowEmptyOption) {
                    let e = t.querySelector('option[value=""]');
                    e && (d = e.textContent)
                }
                var h, p, m, f, g, v, y, b = {
                    placeholder: d,
                    options: [],
                    optgroups: [],
                    items: [],
                    maxItems: null
                }, _ = ()=>{
                    const e = t.getAttribute(i);
                    if (e)
                        b.options = JSON.parse(e),
                        V(b.options, (t=>{
                            b.items.push(t[o])
                        }
                        ));
                    else {
                        var r = t.value.trim() || "";
                        if (!n.allowEmptyOption && !r.length)
                            return;
                        const e = r.split(n.delimiter);
                        V(e, (t=>{
                            const e = {};
                            e[s] = t,
                            e[o] = t,
                            b.options.push(e)
                        }
                        )),
                        b.items = e
                    }
                }
                ;
                return "select" === u ? (p = b.options,
                m = {},
                f = 1,
                g = t=>{
                    var e = Object.assign({}, t.dataset)
                      , n = i && e[i];
                    return "string" == typeof n && n.length && (e = Object.assign(e, JSON.parse(n))),
                    e
                }
                ,
                v = (t,e)=>{
                    var i = vt(t.value);
                    if (null != i && (i || n.allowEmptyOption)) {
                        if (m.hasOwnProperty(i)) {
                            if (e) {
                                var l = m[i][a];
                                l ? Array.isArray(l) ? l.push(e) : m[i][a] = [l, e] : m[i][a] = e
                            }
                        } else {
                            var c = g(t);
                            c[s] = c[s] || t.textContent,
                            c[o] = c[o] || i,
                            c[r] = c[r] || t.disabled,
                            c[a] = c[a] || e,
                            c.$option = t,
                            m[i] = c,
                            p.push(c)
                        }
                        t.selected && b.items.push(i)
                    }
                }
                ,
                y = t=>{
                    var e, n;
                    (n = g(t))[l] = n[l] || t.getAttribute("label") || "",
                    n[c] = n[c] || f++,
                    n[r] = n[r] || t.disabled,
                    b.optgroups.push(n),
                    e = n[c],
                    V(t.children, (t=>{
                        v(t, e)
                    }
                    ))
                }
                ,
                b.maxItems = t.hasAttribute("multiple") ? null : 1,
                V(t.children, (t=>{
                    "optgroup" === (h = t.tagName.toLowerCase()) ? y(t) : "option" === h && v(t)
                }
                ))) : _(),
                Object.assign({}, gt, b, e)
            }
            var Lt = 0;
            class Mt extends (n(e)) {
                constructor(t, e) {
                    var n;
                    super(),
                    this.control_input = void 0,
                    this.wrapper = void 0,
                    this.dropdown = void 0,
                    this.control = void 0,
                    this.dropdown_content = void 0,
                    this.focus_node = void 0,
                    this.order = 0,
                    this.settings = void 0,
                    this.input = void 0,
                    this.tabIndex = void 0,
                    this.is_select_tag = void 0,
                    this.rtl = void 0,
                    this.inputId = void 0,
                    this._destroy = void 0,
                    this.sifter = void 0,
                    this.isOpen = !1,
                    this.isDisabled = !1,
                    this.isRequired = void 0,
                    this.isInvalid = !1,
                    this.isValid = !0,
                    this.isLocked = !1,
                    this.isFocused = !1,
                    this.isInputHidden = !1,
                    this.isSetup = !1,
                    this.ignoreFocus = !1,
                    this.ignoreHover = !1,
                    this.hasOptions = !1,
                    this.currentResults = void 0,
                    this.lastValue = "",
                    this.caretPos = 0,
                    this.loading = 0,
                    this.loadedSearches = {},
                    this.activeOption = null,
                    this.activeItems = [],
                    this.optgroups = {},
                    this.options = {},
                    this.userOptions = {},
                    this.items = [],
                    Lt++;
                    var i = B(t);
                    if (i.tomselect)
                        throw new Error("Tom Select already initialized on this element");
                    i.tomselect = this,
                    n = (window.getComputedStyle && window.getComputedStyle(i, null)).getPropertyValue("direction");
                    const s = Ct(i, e);
                    this.settings = s,
                    this.input = i,
                    this.tabIndex = i.tabIndex || 0,
                    this.is_select_tag = "select" === i.tagName.toLowerCase(),
                    this.rtl = /rtl/i.test(n),
                    this.inputId = Dt(i, "tomselect-" + Lt),
                    this.isRequired = i.required,
                    this.sifter = new H(this.options,{
                        diacritics: s.diacritics
                    }),
                    s.mode = s.mode || (1 === s.maxItems ? "single" : "multi"),
                    "boolean" != typeof s.hideSelected && (s.hideSelected = "multi" === s.mode),
                    "boolean" != typeof s.hidePlaceholder && (s.hidePlaceholder = "multi" !== s.mode);
                    var o = s.createFilter;
                    "function" != typeof o && ("string" == typeof o && (o = new RegExp(o)),
                    o instanceof RegExp ? s.createFilter = t=>o.test(t) : s.createFilter = t=>this.settings.duplicates || !this.options[t]),
                    this.initializePlugins(s.plugins),
                    this.setupCallbacks(),
                    this.setupTemplates();
                    const r = B("<div>")
                      , a = B("<div>")
                      , l = this._render("dropdown")
                      , c = B('<div role="listbox" tabindex="-1">')
                      , u = this.input.getAttribute("class") || ""
                      , d = s.mode;
                    var h;
                    W(r, s.wrapperClass, u, d),
                    W(a, s.controlClass),
                    Ot(r, a),
                    W(l, s.dropdownClass, d),
                    s.copyClassesToDropdown && W(l, u),
                    W(c, s.dropdownContentClass),
                    Ot(l, c),
                    B(s.dropdownParent || r).appendChild(l),
                    R(s.controlInput) ? (h = B(s.controlInput),
                    j(["autocorrect", "autocapitalize", "autocomplete"], (t=>{
                        i.getAttribute(t) && et(h, {
                            [t]: i.getAttribute(t)
                        })
                    }
                    )),
                    h.tabIndex = -1,
                    a.appendChild(h),
                    this.focus_node = h) : s.controlInput ? (h = B(s.controlInput),
                    this.focus_node = h) : (h = B("<input/>"),
                    this.focus_node = a),
                    this.wrapper = r,
                    this.dropdown = l,
                    this.dropdown_content = c,
                    this.control = a,
                    this.control_input = h,
                    this.setup()
                }
                setup() {
                    const t = this
                      , e = t.settings
                      , n = t.control_input
                      , i = t.dropdown
                      , s = t.dropdown_content
                      , o = t.wrapper
                      , r = t.control
                      , l = t.input
                      , c = t.focus_node
                      , u = {
                        passive: !0
                    }
                      , d = t.inputId + "-ts-dropdown";
                    et(s, {
                        id: d
                    }),
                    et(c, {
                        role: "combobox",
                        "aria-haspopup": "listbox",
                        "aria-expanded": "false",
                        "aria-controls": d
                    });
                    const h = Dt(c, t.inputId + "-ts-control")
                      , p = "label[for='" + z(t.inputId) + "']"
                      , m = document.querySelector(p)
                      , f = t.focus.bind(t);
                    if (m) {
                        Tt(m, "click", f),
                        et(m, {
                            for: h
                        });
                        const e = Dt(m, t.inputId + "-ts-label");
                        et(c, {
                            "aria-labelledby": e
                        }),
                        et(s, {
                            "aria-labelledby": e
                        })
                    }
                    if (o.style.width = l.style.width,
                    t.plugins.names.length) {
                        const e = "plugin-" + t.plugins.names.join(" plugin-");
                        W([o, i], e)
                    }
                    (null === e.maxItems || e.maxItems > 1) && t.is_select_tag && et(l, {
                        multiple: "multiple"
                    }),
                    e.placeholder && et(n, {
                        placeholder: e.placeholder
                    }),
                    !e.splitOn && e.delimiter && (e.splitOn = new RegExp("\\s*" + a(e.delimiter) + "+\\s*")),
                    e.load && e.loadThrottle && (e.load = _t(e.load, e.loadThrottle)),
                    t.control_input.type = l.type,
                    Tt(i, "mousemove", (()=>{
                        t.ignoreHover = !1
                    }
                    )),
                    Tt(i, "mouseenter", (e=>{
                        var n = G(e.target, "[data-selectable]", i);
                        n && t.onOptionHover(e, n)
                    }
                    ), {
                        capture: !0
                    }),
                    Tt(i, "click", (e=>{
                        const n = G(e.target, "[data-selectable]");
                        n && (t.onOptionSelect(e, n),
                        xt(e, !0))
                    }
                    )),
                    Tt(r, "click", (e=>{
                        var i = G(e.target, "[data-ts-item]", r);
                        i && t.onItemSelect(e, i) ? xt(e, !0) : "" == n.value && (t.onClick(),
                        xt(e, !0))
                    }
                    )),
                    Tt(c, "keydown", (e=>t.onKeyDown(e))),
                    Tt(n, "keypress", (e=>t.onKeyPress(e))),
                    Tt(n, "input", (e=>t.onInput(e))),
                    Tt(c, "blur", (e=>t.onBlur(e))),
                    Tt(c, "focus", (e=>t.onFocus(e))),
                    Tt(n, "paste", (e=>t.onPaste(e)));
                    const g = e=>{
                        const s = e.composedPath()[0];
                        if (!o.contains(s) && !i.contains(s))
                            return t.isFocused && t.blur(),
                            void t.inputState();
                        s == n && t.isOpen ? e.stopPropagation() : xt(e, !0)
                    }
                      , v = ()=>{
                        t.isOpen && t.positionDropdown()
                    }
                    ;
                    Tt(document, "mousedown", g),
                    Tt(window, "scroll", v, u),
                    Tt(window, "resize", v, u),
                    this._destroy = ()=>{
                        document.removeEventListener("mousedown", g),
                        window.removeEventListener("scroll", v),
                        window.removeEventListener("resize", v),
                        m && m.removeEventListener("click", f)
                    }
                    ,
                    this.revertSettings = {
                        innerHTML: l.innerHTML,
                        tabIndex: l.tabIndex
                    },
                    l.tabIndex = -1,
                    l.insertAdjacentElement("afterend", t.wrapper),
                    t.sync(!1),
                    e.items = [],
                    delete e.optgroups,
                    delete e.options,
                    Tt(l, "invalid", (()=>{
                        t.isValid && (t.isValid = !1,
                        t.isInvalid = !0,
                        t.refreshState())
                    }
                    )),
                    t.updateOriginalInput(),
                    t.refreshItems(),
                    t.close(!1),
                    t.inputState(),
                    t.isSetup = !0,
                    l.disabled ? t.disable() : t.enable(),
                    t.on("change", this.onChange),
                    W(l, "tomselected", "ts-hidden-accessible"),
                    t.trigger("initialize"),
                    !0 === e.preload && t.preload()
                }
                setupOptions(t=[], e=[]) {
                    this.addOptions(t),
                    j(e, (t=>{
                        this.registerOptionGroup(t)
                    }
                    ))
                }
                setupTemplates() {
                    var t = this
                      , e = t.settings.labelField
                      , n = t.settings.optgroupLabelField
                      , i = {
                        optgroup: t=>{
                            let e = document.createElement("div");
                            return e.className = "optgroup",
                            e.appendChild(t.options),
                            e
                        }
                        ,
                        optgroup_header: (t,e)=>'<div class="optgroup-header">' + e(t[n]) + "</div>",
                        option: (t,n)=>"<div>" + n(t[e]) + "</div>",
                        item: (t,n)=>"<div>" + n(t[e]) + "</div>",
                        option_create: (t,e)=>'<div class="create">Add <strong>' + e(t.input) + "</strong>&hellip;</div>",
                        no_results: ()=>'<div class="no-results">No results found</div>',
                        loading: ()=>'<div class="spinner"></div>',
                        not_loading: ()=>{}
                        ,
                        dropdown: ()=>"<div></div>"
                    };
                    t.settings.render = Object.assign({}, i, t.settings.render)
                }
                setupCallbacks() {
                    var t, e, n = {
                        initialize: "onInitialize",
                        change: "onChange",
                        item_add: "onItemAdd",
                        item_remove: "onItemRemove",
                        item_select: "onItemSelect",
                        clear: "onClear",
                        option_add: "onOptionAdd",
                        option_remove: "onOptionRemove",
                        option_clear: "onOptionClear",
                        optgroup_add: "onOptionGroupAdd",
                        optgroup_remove: "onOptionGroupRemove",
                        optgroup_clear: "onOptionGroupClear",
                        dropdown_open: "onDropdownOpen",
                        dropdown_close: "onDropdownClose",
                        type: "onType",
                        load: "onLoad",
                        focus: "onFocus",
                        blur: "onBlur"
                    };
                    for (t in n)
                        (e = this.settings[n[t]]) && this.on(t, e)
                }
                sync(t=!0) {
                    const e = this
                      , n = t ? Ct(e.input, {
                        delimiter: e.settings.delimiter
                    }) : e.settings;
                    e.setupOptions(n.options, n.optgroups),
                    e.setValue(n.items || [], !0),
                    e.lastQuery = null
                }
                onClick() {
                    var t = this;
                    if (t.activeItems.length > 0)
                        return t.clearActiveItems(),
                        void t.focus();
                    t.isFocused && t.isOpen ? t.blur() : t.focus()
                }
                onMouseDown() {}
                onChange() {
                    Y(this.input, "input"),
                    Y(this.input, "change")
                }
                onPaste(t) {
                    var e = this;
                    e.isInputHidden || e.isLocked ? xt(t) : e.settings.splitOn && setTimeout((()=>{
                        var t = e.inputValue();
                        if (t.match(e.settings.splitOn)) {
                            var n = t.trim().split(e.settings.splitOn);
                            j(n, (t=>{
                                vt(t) && (this.options[t] ? e.addItem(t) : e.createItem(t))
                            }
                            ))
                        }
                    }
                    ), 0)
                }
                onKeyPress(t) {
                    var e = this;
                    if (!e.isLocked) {
                        var n = String.fromCharCode(t.keyCode || t.which);
                        return e.settings.create && "multi" === e.settings.mode && n === e.settings.delimiter ? (e.createItem(),
                        void xt(t)) : void 0
                    }
                    xt(t)
                }
                onKeyDown(t) {
                    var e = this;
                    if (e.ignoreHover = !0,
                    e.isLocked)
                        t.keyCode !== mt && xt(t);
                    else {
                        switch (t.keyCode) {
                        case ot:
                            if (Et(ft, t) && "" == e.control_input.value)
                                return xt(t),
                                void e.selectAll();
                            break;
                        case at:
                            return e.isOpen && (xt(t, !0),
                            e.close()),
                            void e.clearActiveItems();
                        case dt:
                            if (!e.isOpen && e.hasOptions)
                                e.open();
                            else if (e.activeOption) {
                                let t = e.getAdjacent(e.activeOption, 1);
                                t && e.setActiveOption(t)
                            }
                            return void xt(t);
                        case ct:
                            if (e.activeOption) {
                                let t = e.getAdjacent(e.activeOption, -1);
                                t && e.setActiveOption(t)
                            }
                            return void xt(t);
                        case rt:
                            return void (e.canSelect(e.activeOption) ? (e.onOptionSelect(t, e.activeOption),
                            xt(t)) : (e.settings.create && e.createItem() || document.activeElement == e.control_input && e.isOpen) && xt(t));
                        case lt:
                            return void e.advanceSelection(-1, t);
                        case ut:
                            return void e.advanceSelection(1, t);
                        case mt:
                            return void (e.settings.selectOnTab && (e.canSelect(e.activeOption) && (e.onOptionSelect(t, e.activeOption),
                            xt(t)),
                            e.settings.create && e.createItem() && xt(t)));
                        case ht:
                        case pt:
                            return void e.deleteSelection(t)
                        }
                        e.isInputHidden && !Et(ft, t) && xt(t)
                    }
                }
                onInput(t) {
                    var e = this;
                    if (!e.isLocked) {
                        var n = e.inputValue();
                        e.lastValue !== n && (e.lastValue = n,
                        e.settings.shouldLoad.call(e, n) && e.load(n),
                        e.refreshOptions(),
                        e.trigger("type", n))
                    }
                }
                onOptionHover(t, e) {
                    this.ignoreHover || this.setActiveOption(e, !1)
                }
                onFocus(t) {
                    var e = this
                      , n = e.isFocused;
                    if (e.isDisabled)
                        return e.blur(),
                        void xt(t);
                    e.ignoreFocus || (e.isFocused = !0,
                    "focus" === e.settings.preload && e.preload(),
                    n || e.trigger("focus"),
                    e.activeItems.length || (e.showInput(),
                    e.refreshOptions(!!e.settings.openOnFocus)),
                    e.refreshState())
                }
                onBlur(t) {
                    if (!1 !== document.hasFocus()) {
                        var e = this;
                        if (e.isFocused) {
                            e.isFocused = !1,
                            e.ignoreFocus = !1;
                            var n = ()=>{
                                e.close(),
                                e.setActiveItem(),
                                e.setCaret(e.items.length),
                                e.trigger("blur")
                            }
                            ;
                            e.settings.create && e.settings.createOnBlur ? e.createItem(null, n) : n()
                        }
                    }
                }
                onOptionSelect(t, e) {
                    var n, i = this;
                    e.parentElement && e.parentElement.matches("[data-disabled]") || (e.classList.contains("create") ? i.createItem(null, (()=>{
                        i.settings.closeAfterSelect && i.close()
                    }
                    )) : void 0 !== (n = e.dataset.value) && (i.lastQuery = null,
                    i.addItem(n),
                    i.settings.closeAfterSelect && i.close(),
                    !i.settings.hideSelected && t.type && /click/.test(t.type) && i.setActiveOption(e)))
                }
                canSelect(t) {
                    return !!(this.isOpen && t && this.dropdown_content.contains(t))
                }
                onItemSelect(t, e) {
                    var n = this;
                    return !n.isLocked && "multi" === n.settings.mode && (xt(t),
                    n.setActiveItem(e, t),
                    !0)
                }
                canLoad(t) {
                    return !!this.settings.load && !this.loadedSearches.hasOwnProperty(t)
                }
                load(t) {
                    const e = this;
                    if (!e.canLoad(t))
                        return;
                    W(e.wrapper, e.settings.loadingClass),
                    e.loading++;
                    const n = e.loadCallback.bind(e);
                    e.settings.load.call(e, t, n)
                }
                loadCallback(t, e) {
                    const n = this;
                    n.loading = Math.max(n.loading - 1, 0),
                    n.lastQuery = null,
                    n.clearActiveOption(),
                    n.setupOptions(t, e),
                    n.refreshOptions(n.isFocused && !n.isInputHidden),
                    n.loading || Z(n.wrapper, n.settings.loadingClass),
                    n.trigger("load", t, e)
                }
                preload() {
                    var t = this.wrapper.classList;
                    t.contains("preloaded") || (t.add("preloaded"),
                    this.load(""))
                }
                setTextboxValue(t="") {
                    var e = this.control_input;
                    e.value !== t && (e.value = t,
                    Y(e, "update"),
                    this.lastValue = t)
                }
                getValue() {
                    return this.is_select_tag && this.input.hasAttribute("multiple") ? this.items : this.items.join(this.settings.delimiter)
                }
                setValue(t, e) {
                    wt(this, e ? [] : ["change"], (()=>{
                        this.clear(e),
                        this.addItems(t, e)
                    }
                    ))
                }
                setMaxItems(t) {
                    0 === t && (t = null),
                    this.settings.maxItems = t,
                    this.refreshState()
                }
                setActiveItem(t, e) {
                    var n, i, s, o, r, a, l = this;
                    if ("single" !== l.settings.mode) {
                        if (!t)
                            return l.clearActiveItems(),
                            void (l.isFocused && l.showInput());
                        if ("click" === (n = e && e.type.toLowerCase()) && Et("shiftKey", e) && l.activeItems.length) {
                            for (a = l.getLastActive(),
                            (s = Array.prototype.indexOf.call(l.control.children, a)) > (o = Array.prototype.indexOf.call(l.control.children, t)) && (r = s,
                            s = o,
                            o = r),
                            i = s; i <= o; i++)
                                t = l.control.children[i],
                                -1 === l.activeItems.indexOf(t) && l.setActiveItemClass(t);
                            xt(e)
                        } else
                            "click" === n && Et(ft, e) || "keydown" === n && Et("shiftKey", e) ? t.classList.contains("active") ? l.removeActiveItem(t) : l.setActiveItemClass(t) : (l.clearActiveItems(),
                            l.setActiveItemClass(t));
                        l.hideInput(),
                        l.isFocused || l.focus()
                    }
                }
                setActiveItemClass(t) {
                    const e = this
                      , n = e.control.querySelector(".last-active");
                    n && Z(n, "last-active"),
                    W(t, "active last-active"),
                    e.trigger("item_select", t),
                    -1 == e.activeItems.indexOf(t) && e.activeItems.push(t)
                }
                removeActiveItem(t) {
                    var e = this.activeItems.indexOf(t);
                    this.activeItems.splice(e, 1),
                    Z(t, "active")
                }
                clearActiveItems() {
                    Z(this.activeItems, "active"),
                    this.activeItems = []
                }
                setActiveOption(t, e=!0) {
                    t !== this.activeOption && (this.clearActiveOption(),
                    t && (this.activeOption = t,
                    et(this.focus_node, {
                        "aria-activedescendant": t.getAttribute("id")
                    }),
                    et(t, {
                        "aria-selected": "true"
                    }),
                    W(t, "active"),
                    e && this.scrollToOption(t)))
                }
                scrollToOption(t, e) {
                    if (!t)
                        return;
                    const n = this.dropdown_content
                      , i = n.clientHeight
                      , s = n.scrollTop || 0
                      , o = t.offsetHeight
                      , r = t.getBoundingClientRect().top - n.getBoundingClientRect().top + s;
                    r + o > i + s ? this.scroll(r - i + o, e) : r < s && this.scroll(r, e)
                }
                scroll(t, e) {
                    const n = this.dropdown_content;
                    e && (n.style.scrollBehavior = e),
                    n.scrollTop = t,
                    n.style.scrollBehavior = ""
                }
                clearActiveOption() {
                    this.activeOption && (Z(this.activeOption, "active"),
                    et(this.activeOption, {
                        "aria-selected": null
                    })),
                    this.activeOption = null,
                    et(this.focus_node, {
                        "aria-activedescendant": null
                    })
                }
                selectAll() {
                    const t = this;
                    if ("single" === t.settings.mode)
                        return;
                    const e = t.controlChildren();
                    e.length && (t.hideInput(),
                    t.close(),
                    t.activeItems = e,
                    j(e, (e=>{
                        t.setActiveItemClass(e)
                    }
                    )))
                }
                inputState() {
                    var t = this;
                    t.control.contains(t.control_input) && (et(t.control_input, {
                        placeholder: t.settings.placeholder
                    }),
                    t.activeItems.length > 0 || !t.isFocused && t.settings.hidePlaceholder && t.items.length > 0 ? (t.setTextboxValue(),
                    t.isInputHidden = !0) : (t.settings.hidePlaceholder && t.items.length > 0 && et(t.control_input, {
                        placeholder: ""
                    }),
                    t.isInputHidden = !1),
                    t.wrapper.classList.toggle("input-hidden", t.isInputHidden))
                }
                hideInput() {
                    this.inputState()
                }
                showInput() {
                    this.inputState()
                }
                inputValue() {
                    return this.control_input.value.trim()
                }
                focus() {
                    var t = this;
                    t.isDisabled || (t.ignoreFocus = !0,
                    t.control_input.offsetWidth ? t.control_input.focus() : t.focus_node.focus(),
                    setTimeout((()=>{
                        t.ignoreFocus = !1,
                        t.onFocus()
                    }
                    ), 0))
                }
                blur() {
                    this.focus_node.blur(),
                    this.onBlur()
                }
                getScoreFunction(t) {
                    return this.sifter.getScoreFunction(t, this.getSearchOptions())
                }
                getSearchOptions() {
                    var t = this.settings
                      , e = t.sortField;
                    return "string" == typeof t.sortField && (e = [{
                        field: t.sortField
                    }]),
                    {
                        fields: t.searchField,
                        conjunction: t.searchConjunction,
                        sort: e,
                        nesting: t.nesting
                    }
                }
                search(t) {
                    var e, n, i = this, s = this.getSearchOptions();
                    if (i.settings.score && "function" != typeof (n = i.settings.score.call(i, t)))
                        throw new Error('Tom Select "score" setting must be a function that returns a function');
                    return t !== i.lastQuery ? (i.lastQuery = t,
                    e = i.sifter.search(t, Object.assign(s, {
                        score: n
                    })),
                    i.currentResults = e) : e = Object.assign({}, i.currentResults),
                    i.settings.hideSelected && (e.items = e.items.filter((t=>{
                        let e = vt(t.id);
                        return !(e && -1 !== i.items.indexOf(e))
                    }
                    ))),
                    e
                }
                refreshOptions(t=!0) {
                    var e, n, i, s, o, r, a, l, c, u;
                    const d = {}
                      , h = [];
                    var p = this
                      , m = p.inputValue();
                    const f = m === p.lastQuery || "" == m && null == p.lastQuery;
                    var g = p.search(m)
                      , v = null
                      , y = p.settings.shouldOpen || !1
                      , b = p.dropdown_content;
                    for (f && (v = p.activeOption) && (c = v.closest("[data-group]")),
                    s = g.items.length,
                    "number" == typeof p.settings.maxOptions && (s = Math.min(s, p.settings.maxOptions)),
                    s > 0 && (y = !0),
                    e = 0; e < s; e++) {
                        let t = g.items[e];
                        if (!t)
                            continue;
                        let s = t.id
                          , a = p.options[s];
                        if (void 0 === a)
                            continue;
                        let l = yt(s)
                          , u = p.getOption(l, !0);
                        for (p.settings.hideSelected || u.classList.toggle("selected", p.items.includes(l)),
                        o = a[p.settings.optgroupField] || "",
                        n = 0,
                        i = (r = Array.isArray(o) ? o : [o]) && r.length; n < i; n++) {
                            o = r[n],
                            p.optgroups.hasOwnProperty(o) || (o = "");
                            let t = d[o];
                            void 0 === t && (t = document.createDocumentFragment(),
                            h.push(o)),
                            n > 0 && (u = u.cloneNode(!0),
                            et(u, {
                                id: a.$id + "-clone-" + n,
                                "aria-selected": null
                            }),
                            u.classList.add("ts-cloned"),
                            Z(u, "active"),
                            p.activeOption && p.activeOption.dataset.value == s && c && c.dataset.group === o.toString() && (v = u)),
                            t.appendChild(u),
                            d[o] = t
                        }
                    }
                    p.settings.lockOptgroupOrder && h.sort(((t,e)=>{
                        const n = p.optgroups[t]
                          , i = p.optgroups[e];
                        return (n && n.$order || 0) - (i && i.$order || 0)
                    }
                    )),
                    a = document.createDocumentFragment(),
                    j(h, (t=>{
                        let e = d[t];
                        if (!e || !e.children.length)
                            return;
                        let n = p.optgroups[t];
                        if (void 0 !== n) {
                            let t = document.createDocumentFragment()
                              , i = p.render("optgroup_header", n);
                            Ot(t, i),
                            Ot(t, e);
                            let s = p.render("optgroup", {
                                group: n,
                                options: t
                            });
                            Ot(a, s)
                        } else
                            Ot(a, e)
                    }
                    )),
                    b.innerHTML = "",
                    Ot(b, a),
                    p.settings.highlight && (st(b),
                    g.query.length && g.tokens.length && j(g.tokens, (t=>{
                        it(b, t.regex)
                    }
                    )));
                    var _ = t=>{
                        let e = p.render(t, {
                            input: m
                        });
                        return e && (y = !0,
                        b.insertBefore(e, b.firstChild)),
                        e
                    }
                    ;
                    if (p.loading ? _("loading") : p.settings.shouldLoad.call(p, m) ? 0 === g.items.length && _("no_results") : _("not_loading"),
                    (l = p.canCreate(m)) && (u = _("option_create")),
                    p.hasOptions = g.items.length > 0 || l,
                    y) {
                        if (g.items.length > 0) {
                            if (v || "single" !== p.settings.mode || null == p.items[0] || (v = p.getOption(p.items[0])),
                            !b.contains(v)) {
                                let t = 0;
                                u && !p.settings.addPrecedence && (t = 1),
                                v = p.selectable()[t]
                            }
                        } else
                            u && (v = u);
                        t && !p.isOpen && (p.open(),
                        p.scrollToOption(v, "auto")),
                        p.setActiveOption(v)
                    } else
                        p.clearActiveOption(),
                        t && p.isOpen && p.close(!1)
                }
                selectable() {
                    return this.dropdown_content.querySelectorAll("[data-selectable]")
                }
                addOption(t, e=!1) {
                    const n = this;
                    if (Array.isArray(t))
                        return n.addOptions(t, e),
                        !1;
                    const i = vt(t[n.settings.valueField]);
                    return null !== i && !n.options.hasOwnProperty(i) && (t.$order = t.$order || ++n.order,
                    t.$id = n.inputId + "-opt-" + t.$order,
                    n.options[i] = t,
                    n.lastQuery = null,
                    e && (n.userOptions[i] = e,
                    n.trigger("option_add", i, t)),
                    i)
                }
                addOptions(t, e=!1) {
                    j(t, (t=>{
                        this.addOption(t, e)
                    }
                    ))
                }
                registerOption(t) {
                    return this.addOption(t)
                }
                registerOptionGroup(t) {
                    var e = vt(t[this.settings.optgroupValueField]);
                    return null !== e && (t.$order = t.$order || ++this.order,
                    this.optgroups[e] = t,
                    e)
                }
                addOptionGroup(t, e) {
                    var n;
                    e[this.settings.optgroupValueField] = t,
                    (n = this.registerOptionGroup(e)) && this.trigger("optgroup_add", n, e)
                }
                removeOptionGroup(t) {
                    this.optgroups.hasOwnProperty(t) && (delete this.optgroups[t],
                    this.clearCache(),
                    this.trigger("optgroup_remove", t))
                }
                clearOptionGroups() {
                    this.optgroups = {},
                    this.clearCache(),
                    this.trigger("optgroup_clear")
                }
                updateOption(t, e) {
                    const n = this;
                    var i, s;
                    const o = vt(t)
                      , r = vt(e[n.settings.valueField]);
                    if (null === o)
                        return;
                    const a = n.options[o];
                    if (null == a)
                        return;
                    if ("string" != typeof r)
                        throw new Error("Value must be set in option data");
                    const l = n.getOption(o)
                      , c = n.getItem(o);
                    if (e.$order = e.$order || a.$order,
                    delete n.options[o],
                    n.uncacheValue(r),
                    n.options[r] = e,
                    l) {
                        if (n.dropdown_content.contains(l)) {
                            const t = n._render("option", e);
                            nt(l, t),
                            n.activeOption === l && n.setActiveOption(t)
                        }
                        l.remove()
                    }
                    c && (-1 !== (s = n.items.indexOf(o)) && n.items.splice(s, 1, r),
                    i = n._render("item", e),
                    c.classList.contains("active") && W(i, "active"),
                    nt(c, i)),
                    n.lastQuery = null
                }
                removeOption(t, e) {
                    const n = this;
                    t = yt(t),
                    n.uncacheValue(t),
                    delete n.userOptions[t],
                    delete n.options[t],
                    n.lastQuery = null,
                    n.trigger("option_remove", t),
                    n.removeItem(t, e)
                }
                clearOptions(t) {
                    const e = (t || this.clearFilter).bind(this);
                    this.loadedSearches = {},
                    this.userOptions = {},
                    this.clearCache();
                    const n = {};
                    j(this.options, ((t,i)=>{
                        e(t, i) && (n[i] = t)
                    }
                    )),
                    this.options = this.sifter.items = n,
                    this.lastQuery = null,
                    this.trigger("option_clear")
                }
                clearFilter(t, e) {
                    return this.items.indexOf(e) >= 0
                }
                getOption(t, e=!1) {
                    const n = vt(t);
                    if (null === n)
                        return null;
                    const i = this.options[n];
                    if (null != i) {
                        if (i.$div)
                            return i.$div;
                        if (e)
                            return this._render("option", i)
                    }
                    return null
                }
                getAdjacent(t, e, n="option") {
                    var i, s = this;
                    if (!t)
                        return null;
                    i = "item" == n ? s.controlChildren() : s.dropdown_content.querySelectorAll("[data-selectable]");
                    for (let n = 0; n < i.length; n++)
                        if (i[n] == t)
                            return e > 0 ? i[n + 1] : i[n - 1];
                    return null
                }
                getItem(t) {
                    if ("object" == typeof t)
                        return t;
                    var e = vt(t);
                    return null !== e ? this.control.querySelector(`[data-value="${St(e)}"]`) : null
                }
                addItems(t, e) {
                    var n = this
                      , i = Array.isArray(t) ? t : [t];
                    const s = (i = i.filter((t=>-1 === n.items.indexOf(t))))[i.length - 1];
                    i.forEach((t=>{
                        n.isPending = t !== s,
                        n.addItem(t, e)
                    }
                    ))
                }
                addItem(t, e) {
                    wt(this, e ? [] : ["change", "dropdown_close"], (()=>{
                        var n, i;
                        const s = this
                          , o = s.settings.mode
                          , r = vt(t);
                        if ((!r || -1 === s.items.indexOf(r) || ("single" === o && s.close(),
                        "single" !== o && s.settings.duplicates)) && null !== r && s.options.hasOwnProperty(r) && ("single" === o && s.clear(e),
                        "multi" !== o || !s.isFull())) {
                            if (n = s._render("item", s.options[r]),
                            s.control.contains(n) && (n = n.cloneNode(!0)),
                            i = s.isFull(),
                            s.items.splice(s.caretPos, 0, r),
                            s.insertAtCaret(n),
                            s.isSetup) {
                                if (!s.isPending && s.settings.hideSelected) {
                                    let t = s.getOption(r)
                                      , e = s.getAdjacent(t, 1);
                                    e && s.setActiveOption(e)
                                }
                                s.isPending || s.settings.closeAfterSelect || s.refreshOptions(s.isFocused && "single" !== o),
                                0 != s.settings.closeAfterSelect && s.isFull() ? s.close() : s.isPending || s.positionDropdown(),
                                s.trigger("item_add", r, n),
                                s.isPending || s.updateOriginalInput({
                                    silent: e
                                })
                            }
                            (!s.isPending || !i && s.isFull()) && (s.inputState(),
                            s.refreshState())
                        }
                    }
                    ))
                }
                removeItem(t=null, e) {
                    const n = this;
                    if (!(t = n.getItem(t)))
                        return;
                    var i, s;
                    const o = t.dataset.value;
                    i = tt(t),
                    t.remove(),
                    t.classList.contains("active") && (s = n.activeItems.indexOf(t),
                    n.activeItems.splice(s, 1),
                    Z(t, "active")),
                    n.items.splice(i, 1),
                    n.lastQuery = null,
                    !n.settings.persist && n.userOptions.hasOwnProperty(o) && n.removeOption(o, e),
                    i < n.caretPos && n.setCaret(n.caretPos - 1),
                    n.updateOriginalInput({
                        silent: e
                    }),
                    n.refreshState(),
                    n.positionDropdown(),
                    n.trigger("item_remove", o, t)
                }
                createItem(t=null, e=(()=>{}
                )) {
                    3 === arguments.length && (e = arguments[2]),
                    "function" != typeof e && (e = ()=>{}
                    );
                    var n, i = this, s = i.caretPos;
                    if (t = t || i.inputValue(),
                    !i.canCreate(t))
                        return e(),
                        !1;
                    i.lock();
                    var o = !1
                      , r = t=>{
                        if (i.unlock(),
                        !t || "object" != typeof t)
                            return e();
                        var n = vt(t[i.settings.valueField]);
                        if ("string" != typeof n)
                            return e();
                        i.setTextboxValue(),
                        i.addOption(t, !0),
                        i.setCaret(s),
                        i.addItem(n),
                        e(t),
                        o = !0
                    }
                    ;
                    return n = "function" == typeof i.settings.create ? i.settings.create.call(this, t, r) : {
                        [i.settings.labelField]: t,
                        [i.settings.valueField]: t
                    },
                    o || r(n),
                    !0
                }
                refreshItems() {
                    var t = this;
                    t.lastQuery = null,
                    t.isSetup && t.addItems(t.items),
                    t.updateOriginalInput(),
                    t.refreshState()
                }
                refreshState() {
                    const t = this;
                    t.refreshValidityState();
                    const e = t.isFull()
                      , n = t.isLocked;
                    t.wrapper.classList.toggle("rtl", t.rtl);
                    const i = t.wrapper.classList;
                    i.toggle("focus", t.isFocused),
                    i.toggle("disabled", t.isDisabled),
                    i.toggle("required", t.isRequired),
                    i.toggle("invalid", !t.isValid),
                    i.toggle("locked", n),
                    i.toggle("full", e),
                    i.toggle("input-active", t.isFocused && !t.isInputHidden),
                    i.toggle("dropdown-active", t.isOpen),
                    i.toggle("has-options", X(t.options)),
                    i.toggle("has-items", t.items.length > 0)
                }
                refreshValidityState() {
                    var t = this;
                    t.input.validity && (t.isValid = t.input.validity.valid,
                    t.isInvalid = !t.isValid)
                }
                isFull() {
                    return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
                }
                updateOriginalInput(t={}) {
                    const e = this;
                    var n, i;
                    const s = e.input.querySelector('option[value=""]');
                    if (e.is_select_tag) {
                        const o = []
                          , r = e.input.querySelectorAll("option:checked").length;
                        function a(t, n, i) {
                            return t || (t = B('<option value="' + bt(n) + '">' + bt(i) + "</option>")),
                            t != s && e.input.append(t),
                            o.push(t),
                            (t != s || r > 0) && (t.selected = !0),
                            t
                        }
                        e.input.querySelectorAll("option:checked").forEach((t=>{
                            t.selected = !1
                        }
                        )),
                        0 == e.items.length && "single" == e.settings.mode ? a(s, "", "") : e.items.forEach((t=>{
                            n = e.options[t],
                            i = n[e.settings.labelField] || "",
                            o.includes(n.$option) ? a(e.input.querySelector(`option[value="${St(t)}"]:not(:checked)`), t, i) : n.$option = a(n.$option, t, i)
                        }
                        ))
                    } else
                        e.input.value = e.getValue();
                    e.isSetup && (t.silent || e.trigger("change", e.getValue()))
                }
                open() {
                    var t = this;
                    t.isLocked || t.isOpen || "multi" === t.settings.mode && t.isFull() || (t.isOpen = !0,
                    et(t.focus_node, {
                        "aria-expanded": "true"
                    }),
                    t.refreshState(),
                    U(t.dropdown, {
                        visibility: "hidden",
                        display: "block"
                    }),
                    t.positionDropdown(),
                    U(t.dropdown, {
                        visibility: "visible",
                        display: "block"
                    }),
                    t.focus(),
                    t.trigger("dropdown_open", t.dropdown))
                }
                close(t=!0) {
                    var e = this
                      , n = e.isOpen;
                    t && (e.setTextboxValue(),
                    "single" === e.settings.mode && e.items.length && e.hideInput()),
                    e.isOpen = !1,
                    et(e.focus_node, {
                        "aria-expanded": "false"
                    }),
                    U(e.dropdown, {
                        display: "none"
                    }),
                    e.settings.hideSelected && e.clearActiveOption(),
                    e.refreshState(),
                    n && e.trigger("dropdown_close", e.dropdown)
                }
                positionDropdown() {
                    if ("body" === this.settings.dropdownParent) {
                        var t = this.control
                          , e = t.getBoundingClientRect()
                          , n = t.offsetHeight + e.top + window.scrollY
                          , i = e.left + window.scrollX;
                        U(this.dropdown, {
                            width: e.width + "px",
                            top: n + "px",
                            left: i + "px"
                        })
                    }
                }
                clear(t) {
                    var e = this;
                    if (e.items.length) {
                        var n = e.controlChildren();
                        j(n, (t=>{
                            e.removeItem(t, !0)
                        }
                        )),
                        e.showInput(),
                        t || e.updateOriginalInput(),
                        e.trigger("clear")
                    }
                }
                insertAtCaret(t) {
                    const e = this
                      , n = e.caretPos
                      , i = e.control;
                    i.insertBefore(t, i.children[n] || null),
                    e.setCaret(n + 1)
                }
                deleteSelection(t) {
                    var e, n, i, s, o = this;
                    e = t && t.keyCode === ht ? -1 : 1,
                    n = kt(o.control_input);
                    const r = [];
                    if (o.activeItems.length)
                        s = Q(o.activeItems, e),
                        i = tt(s),
                        e > 0 && i++,
                        j(o.activeItems, (t=>r.push(t)));
                    else if ((o.isFocused || "single" === o.settings.mode) && o.items.length) {
                        const t = o.controlChildren();
                        let i;
                        e < 0 && 0 === n.start && 0 === n.length ? i = t[o.caretPos - 1] : e > 0 && n.start === o.inputValue().length && (i = t[o.caretPos]),
                        void 0 !== i && r.push(i)
                    }
                    if (!o.shouldDelete(r, t))
                        return !1;
                    for (xt(t, !0),
                    void 0 !== i && o.setCaret(i); r.length; )
                        o.removeItem(r.pop());
                    return o.showInput(),
                    o.positionDropdown(),
                    o.refreshOptions(!1),
                    !0
                }
                shouldDelete(t, e) {
                    const n = t.map((t=>t.dataset.value));
                    return !(!n.length || "function" == typeof this.settings.onDelete && !1 === this.settings.onDelete(n, e))
                }
                advanceSelection(t, e) {
                    var n, i, s = this;
                    s.rtl && (t *= -1),
                    s.inputValue().length || (Et(ft, e) || Et("shiftKey", e) ? (i = (n = s.getLastActive(t)) ? n.classList.contains("active") ? s.getAdjacent(n, t, "item") : n : t > 0 ? s.control_input.nextElementSibling : s.control_input.previousElementSibling) && (i.classList.contains("active") && s.removeActiveItem(n),
                    s.setActiveItemClass(i)) : s.moveCaret(t))
                }
                moveCaret(t) {}
                getLastActive(t) {
                    let e = this.control.querySelector(".last-active");
                    if (e)
                        return e;
                    var n = this.control.querySelectorAll(".active");
                    return n ? Q(n, t) : void 0
                }
                setCaret(t) {
                    this.caretPos = this.items.length
                }
                controlChildren() {
                    return Array.from(this.control.querySelectorAll("[data-ts-item]"))
                }
                lock() {
                    this.isLocked = !0,
                    this.refreshState()
                }
                unlock() {
                    this.isLocked = !1,
                    this.refreshState()
                }
                disable() {
                    var t = this;
                    t.input.disabled = !0,
                    t.control_input.disabled = !0,
                    t.focus_node.tabIndex = -1,
                    t.isDisabled = !0,
                    this.close(),
                    t.lock()
                }
                enable() {
                    var t = this;
                    t.input.disabled = !1,
                    t.control_input.disabled = !1,
                    t.focus_node.tabIndex = t.tabIndex,
                    t.isDisabled = !1,
                    t.unlock()
                }
                destroy() {
                    var t = this
                      , e = t.revertSettings;
                    t.trigger("destroy"),
                    t.off(),
                    t.wrapper.remove(),
                    t.dropdown.remove(),
                    t.input.innerHTML = e.innerHTML,
                    t.input.tabIndex = e.tabIndex,
                    Z(t.input, "tomselected", "ts-hidden-accessible"),
                    t._destroy(),
                    delete t.input.tomselect
                }
                render(t, e) {
                    var n, i;
                    const s = this;
                    if ("function" != typeof this.settings.render[t])
                        return null;
                    if (!(i = s.settings.render[t].call(this, e, bt)))
                        return null;
                    if (i = B(i),
                    "option" === t || "option_create" === t ? e[s.settings.disabledField] ? et(i, {
                        "aria-disabled": "true"
                    }) : et(i, {
                        "data-selectable": ""
                    }) : "optgroup" === t && (n = e.group[s.settings.optgroupValueField],
                    et(i, {
                        "data-group": n
                    }),
                    e.group[s.settings.disabledField] && et(i, {
                        "data-disabled": ""
                    })),
                    "option" === t || "item" === t) {
                        const n = yt(e[s.settings.valueField]);
                        et(i, {
                            "data-value": n
                        }),
                        "item" === t ? (W(i, s.settings.itemClass),
                        et(i, {
                            "data-ts-item": ""
                        })) : (W(i, s.settings.optionClass),
                        et(i, {
                            role: "option",
                            id: e.$id
                        }),
                        e.$div = i,
                        s.options[n] = e)
                    }
                    return i
                }
                _render(t, e) {
                    const n = this.render(t, e);
                    if (null == n)
                        throw "HTMLElement expected";
                    return n
                }
                clearCache() {
                    j(this.options, (t=>{
                        t.$div && (t.$div.remove(),
                        delete t.$div)
                    }
                    ))
                }
                uncacheValue(t) {
                    const e = this.getOption(t);
                    e && e.remove()
                }
                canCreate(t) {
                    return this.settings.create && t.length > 0 && this.settings.createFilter.call(this, t)
                }
                hook(t, e, n) {
                    var i = this
                      , s = i[e];
                    i[e] = function() {
                        var e, o;
                        return "after" === t && (e = s.apply(i, arguments)),
                        o = n.apply(i, arguments),
                        "instead" === t ? o : ("before" === t && (e = s.apply(i, arguments)),
                        e)
                    }
                }
            }
            function It() {
                Tt(this.input, "change", (()=>{
                    this.sync()
                }
                ))
            }
            function At() {
                var t = this
                  , e = t.onOptionSelect;
                t.settings.hideSelected = !1;
                var n = function(t) {
                    setTimeout((()=>{
                        var e = t.querySelector("input");
                        e instanceof HTMLInputElement && (t.classList.contains("selected") ? e.checked = !0 : e.checked = !1)
                    }
                    ), 1)
                };
                t.hook("after", "setupTemplates", (()=>{
                    var e = t.settings.render.option;
                    t.settings.render.option = (n,i)=>{
                        var s = B(e.call(t, n, i))
                          , o = document.createElement("input");
                        o.addEventListener("click", (function(t) {
                            xt(t)
                        }
                        )),
                        o.type = "checkbox";
                        const r = vt(n[t.settings.valueField]);
                        return r && t.items.indexOf(r) > -1 && (o.checked = !0),
                        s.prepend(o),
                        s
                    }
                }
                )),
                t.on("item_remove", (e=>{
                    var i = t.getOption(e);
                    i && (i.classList.remove("selected"),
                    n(i))
                }
                )),
                t.on("item_add", (e=>{
                    var i = t.getOption(e);
                    i && n(i)
                }
                )),
                t.hook("instead", "onOptionSelect", ((i,s)=>{
                    if (s.classList.contains("selected"))
                        return s.classList.remove("selected"),
                        t.removeItem(s.dataset.value),
                        t.refreshOptions(),
                        void xt(i, !0);
                    e.call(t, i, s),
                    n(s)
                }
                ))
            }
            function Nt(t) {
                const e = this
                  , n = Object.assign({
                    className: "clear-button",
                    title: "Clear All",
                    html: t=>`<div class="${t.className}" title="${t.title}">&#10799;</div>`
                }, t);
                e.on("initialize", (()=>{
                    var t = B(n.html(n));
                    t.addEventListener("click", (t=>{
                        e.isDisabled || (e.clear(),
                        "single" === e.settings.mode && e.settings.allowEmptyOption && e.addItem(""),
                        t.preventDefault(),
                        t.stopPropagation())
                    }
                    )),
                    e.control.appendChild(t)
                }
                ))
            }
            function Ft() {
                var t = this;
                if (!$.fn.sortable)
                    throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
                if ("multi" === t.settings.mode) {
                    var e = t.lock
                      , n = t.unlock;
                    t.hook("instead", "lock", (()=>{
                        var n = $(t.control).data("sortable");
                        return n && n.disable(),
                        e.call(t)
                    }
                    )),
                    t.hook("instead", "unlock", (()=>{
                        var e = $(t.control).data("sortable");
                        return e && e.enable(),
                        n.call(t)
                    }
                    )),
                    t.on("initialize", (()=>{
                        var e = $(t.control).sortable({
                            items: "[data-value]",
                            forcePlaceholderSize: !0,
                            disabled: t.isLocked,
                            start: (t,n)=>{
                                n.placeholder.css("width", n.helper.css("width")),
                                e.css({
                                    overflow: "visible"
                                })
                            }
                            ,
                            stop: ()=>{
                                e.css({
                                    overflow: "hidden"
                                });
                                var n = [];
                                e.children("[data-value]").each((function() {
                                    this.dataset.value && n.push(this.dataset.value)
                                }
                                )),
                                t.setValue(n)
                            }
                        })
                    }
                    ))
                }
            }
            function Pt(t) {
                const e = this
                  , n = Object.assign({
                    title: "Untitled",
                    headerClass: "dropdown-header",
                    titleRowClass: "dropdown-header-title",
                    labelClass: "dropdown-header-label",
                    closeClass: "dropdown-header-close",
                    html: t=>'<div class="' + t.headerClass + '"><div class="' + t.titleRowClass + '"><span class="' + t.labelClass + '">' + t.title + '</span><a class="' + t.closeClass + '">&times;</a></div></div>'
                }, t);
                e.on("initialize", (()=>{
                    var t = B(n.html(n))
                      , i = t.querySelector("." + n.closeClass);
                    i && i.addEventListener("click", (t=>{
                        xt(t, !0),
                        e.close()
                    }
                    )),
                    e.dropdown.insertBefore(t, e.dropdown.firstChild)
                }
                ))
            }
            function jt() {
                var t = this;
                t.hook("instead", "setCaret", (e=>{
                    "single" !== t.settings.mode && t.control.contains(t.control_input) ? (e = Math.max(0, Math.min(t.items.length, e))) == t.caretPos || t.isPending || t.controlChildren().forEach(((n,i)=>{
                        i < e ? t.control_input.insertAdjacentElement("beforebegin", n) : t.control.appendChild(n)
                    }
                    )) : e = t.items.length,
                    t.caretPos = e
                }
                )),
                t.hook("instead", "moveCaret", (e=>{
                    if (!t.isFocused)
                        return;
                    const n = t.getLastActive(e);
                    if (n) {
                        const i = tt(n);
                        t.setCaret(e > 0 ? i + 1 : i),
                        t.setActiveItem(),
                        Z(n, "last-active")
                    } else
                        t.setCaret(t.caretPos + e)
                }
                ))
            }
            function qt() {
                const t = this;
                t.settings.shouldOpen = !0,
                t.hook("before", "setup", (()=>{
                    t.focus_node = t.control,
                    W(t.control_input, "dropdown-input");
                    const e = B('<div class="dropdown-input-wrap">');
                    e.append(t.control_input),
                    t.dropdown.insertBefore(e, t.dropdown.firstChild);
                    const n = B('<input class="items-placeholder" tabindex="-1" />');
                    n.placeholder = t.settings.placeholder || "",
                    t.control.append(n)
                }
                )),
                t.on("initialize", (()=>{
                    t.control_input.addEventListener("keydown", (e=>{
                        switch (e.keyCode) {
                        case at:
                            return t.isOpen && (xt(e, !0),
                            t.close()),
                            void t.clearActiveItems();
                        case mt:
                            t.focus_node.tabIndex = -1
                        }
                        return t.onKeyDown.call(t, e)
                    }
                    )),
                    t.on("blur", (()=>{
                        t.focus_node.tabIndex = t.isDisabled ? -1 : t.tabIndex
                    }
                    )),
                    t.on("dropdown_open", (()=>{
                        t.control_input.focus()
                    }
                    ));
                    const e = t.onBlur;
                    t.hook("instead", "onBlur", (n=>{
                        if (!n || n.relatedTarget != t.control_input)
                            return e.call(t)
                    }
                    )),
                    Tt(t.control_input, "blur", (()=>t.onBlur())),
                    t.hook("before", "close", (()=>{
                        t.isOpen && t.focus_node.focus({
                            preventScroll: !0
                        })
                    }
                    ))
                }
                ))
            }
            function Ht() {
                var t = this;
                t.on("initialize", (()=>{
                    var e = document.createElement("span")
                      , n = t.control_input;
                    e.style.cssText = "position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ",
                    t.wrapper.appendChild(e);
                    var i = ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"];
                    for (const t of i)
                        e.style[t] = n.style[t];
                    var s = ()=>{
                        e.textContent = n.value,
                        n.style.width = e.clientWidth + "px"
                    }
                    ;
                    s(),
                    t.on("update item_add item_remove", s),
                    Tt(n, "input", s),
                    Tt(n, "keyup", s),
                    Tt(n, "blur", s),
                    Tt(n, "update", s)
                }
                ))
            }
            function Vt() {
                var t = this
                  , e = t.deleteSelection;
                this.hook("instead", "deleteSelection", (n=>!!t.activeItems.length && e.call(t, n)))
            }
            function $t() {
                this.hook("instead", "setActiveItem", (()=>{}
                )),
                this.hook("instead", "selectAll", (()=>{}
                ))
            }
            function Bt() {
                var t = this
                  , e = t.onKeyDown;
                t.hook("instead", "onKeyDown", (n=>{
                    var i, s, o, r;
                    if (!t.isOpen || n.keyCode !== lt && n.keyCode !== ut)
                        return e.call(t, n);
                    t.ignoreHover = !0,
                    r = G(t.activeOption, "[data-group]"),
                    i = tt(t.activeOption, "[data-selectable]"),
                    r && (r = n.keyCode === lt ? r.previousSibling : r.nextSibling) && (s = (o = r.querySelectorAll("[data-selectable]"))[Math.min(o.length - 1, i)]) && t.setActiveOption(s)
                }
                ))
            }
            function Rt(t) {
                const e = Object.assign({
                    label: "&times;",
                    title: "Remove",
                    className: "remove",
                    append: !0
                }, t);
                var n = this;
                if (e.append) {
                    var i = '<a href="javascript:void(0)" class="' + e.className + '" tabindex="-1" title="' + bt(e.title) + '">' + e.label + "</a>";
                    n.hook("after", "setupTemplates", (()=>{
                        var t = n.settings.render.item;
                        n.settings.render.item = (e,s)=>{
                            var o = B(t.call(n, e, s))
                              , r = B(i);
                            return o.appendChild(r),
                            Tt(r, "mousedown", (t=>{
                                xt(t, !0)
                            }
                            )),
                            Tt(r, "click", (t=>{
                                xt(t, !0),
                                n.isLocked || n.shouldDelete([o], t) && (n.removeItem(o),
                                n.refreshOptions(!1),
                                n.inputState())
                            }
                            )),
                            o
                        }
                    }
                    ))
                }
            }
            function zt(t) {
                const e = this
                  , n = Object.assign({
                    text: t=>t[e.settings.labelField]
                }, t);
                e.on("item_remove", (function(t) {
                    if (e.isFocused && "" === e.control_input.value.trim()) {
                        var i = e.options[t];
                        i && e.setTextboxValue(n.text.call(e, i))
                    }
                }
                ))
            }
            function Yt() {
                const t = this
                  , e = t.canLoad
                  , n = t.clearActiveOption
                  , i = t.loadCallback;
                var s, o, r = {}, a = !1, l = [];
                if (t.settings.shouldLoadMore || (t.settings.shouldLoadMore = ()=>{
                    if (s.clientHeight / (s.scrollHeight - s.scrollTop) > .9)
                        return !0;
                    if (t.activeOption) {
                        var e = t.selectable();
                        if (Array.from(e).indexOf(t.activeOption) >= e.length - 2)
                            return !0
                    }
                    return !1
                }
                ),
                !t.settings.firstUrl)
                    throw "virtual_scroll plugin requires a firstUrl() method";
                t.settings.sortField = [{
                    field: "$order"
                }, {
                    field: "$score"
                }];
                const c = e=>!("number" == typeof t.settings.maxOptions && s.children.length >= t.settings.maxOptions || !(e in r) || !r[e])
                  , u = (e,n)=>t.items.indexOf(n) >= 0 || l.indexOf(n) >= 0;
                t.setNextUrl = (t,e)=>{
                    r[t] = e
                }
                ,
                t.getUrl = e=>{
                    if (e in r) {
                        const t = r[e];
                        return r[e] = !1,
                        t
                    }
                    return r = {},
                    t.settings.firstUrl.call(t, e)
                }
                ,
                t.hook("instead", "clearActiveOption", (()=>{
                    if (!a)
                        return n.call(t)
                }
                )),
                t.hook("instead", "canLoad", (n=>n in r ? c(n) : e.call(t, n))),
                t.hook("instead", "loadCallback", ((e,n)=>{
                    if (a) {
                        if (o) {
                            const n = e[0];
                            void 0 !== n && (o.dataset.value = n[t.settings.valueField])
                        }
                    } else
                        t.clearOptions(u);
                    i.call(t, e, n),
                    a = !1
                }
                )),
                t.hook("after", "refreshOptions", (()=>{
                    const e = t.lastValue;
                    var n;
                    c(e) ? (n = t.render("loading_more", {
                        query: e
                    })) && (n.setAttribute("data-selectable", ""),
                    o = n) : e in r && !s.querySelector(".no-results") && (n = t.render("no_more_results", {
                        query: e
                    })),
                    n && (W(n, t.settings.optionClass),
                    s.append(n))
                }
                )),
                t.on("initialize", (()=>{
                    l = Object.keys(t.options),
                    s = t.dropdown_content,
                    t.settings.render = Object.assign({}, {
                        loading_more: ()=>'<div class="loading-more-results">Loading more results ... </div>',
                        no_more_results: ()=>'<div class="no-more-results">No more results</div>'
                    }, t.settings.render),
                    s.addEventListener("scroll", (()=>{
                        t.settings.shouldLoadMore.call(t) && c(t.lastValue) && (a || (a = !0,
                        t.load.call(t, t.lastValue)))
                    }
                    ))
                }
                ))
            }
            return Mt.define("change_listener", It),
            Mt.define("checkbox_options", At),
            Mt.define("clear_button", Nt),
            Mt.define("drag_drop", Ft),
            Mt.define("dropdown_header", Pt),
            Mt.define("caret_position", jt),
            Mt.define("dropdown_input", qt),
            Mt.define("input_autogrow", Ht),
            Mt.define("no_backspace_delete", Vt),
            Mt.define("no_active_items", $t),
            Mt.define("optgroup_columns", Bt),
            Mt.define("remove_button", Rt),
            Mt.define("restore_on_backspace", zt),
            Mt.define("virtual_scroll", Yt),
            Mt
        }()
    }
}, function(t) {
    var e;
    e = 8144,
    t(t.s = e)
}
]);
