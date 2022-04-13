(self["webpackChunk"] = self["webpackChunk"] || []).push([["/js/user"],{

/***/ "./node_modules/ansi-styles/index.js":
/*!*******************************************!*\
  !*** ./node_modules/ansi-styles/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* module decorator */ module = __webpack_require__.nmd(module);


const wrapAnsi16 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => (...args) => {
	const code = fn(...args);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => (...args) => {
	const rgb = fn(...args);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

const ansi2ansi = n => n;
const rgb2rgb = (r, g, b) => [r, g, b];

const setLazyProperty = (object, property, get) => {
	Object.defineProperty(object, property, {
		get: () => {
			const value = get();

			Object.defineProperty(object, property, {
				value,
				enumerable: true,
				configurable: true
			});

			return value;
		},
		enumerable: true,
		configurable: true
	});
};

/** @type {typeof import('color-convert')} */
let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
	if (colorConvert === undefined) {
		colorConvert = __webpack_require__(/*! color-convert */ "./node_modules/ansi-styles/node_modules/color-convert/index.js");
	}

	const offset = isBackground ? 10 : 0;
	const styles = {};

	for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
		const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
		if (sourceSpace === targetSpace) {
			styles[name] = wrap(identity, offset);
		} else if (typeof suite === 'object') {
			styles[name] = wrap(suite[targetSpace], offset);
		}
	}

	return styles;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],

			// Bright color
			blackBright: [90, 39],
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Alias bright black as gray (and grey)
	styles.color.gray = styles.color.blackBright;
	styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
	styles.color.grey = styles.color.blackBright;
	styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

	for (const [groupName, group] of Object.entries(styles)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});
	}

	Object.defineProperty(styles, 'codes', {
		value: codes,
		enumerable: false
	});

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
	setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
	setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
	setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});


/***/ }),

/***/ "./node_modules/ansi-styles/node_modules/color-convert/conversions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ansi-styles/node_modules/color-convert/conversions.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* MIT license */
/* eslint-disable no-mixed-operators */
const cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
	reverseKeywords[cssKeywords[key]] = key;
}

const convert = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

module.exports = convert;

// Hide .channels and .labels properties
for (const model of Object.keys(convert)) {
	if (!('channels' in convert[model])) {
		throw new Error('missing channels property: ' + model);
	}

	if (!('labels' in convert[model])) {
		throw new Error('missing channel labels property: ' + model);
	}

	if (convert[model].labels.length !== convert[model].channels) {
		throw new Error('channel and label counts mismatch: ' + model);
	}

	const {channels, labels} = convert[model];
	delete convert[model].channels;
	delete convert[model].labels;
	Object.defineProperty(convert[model], 'channels', {value: channels});
	Object.defineProperty(convert[model], 'labels', {value: labels});
}

convert.rgb.hsl = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	const r = rgb[0];
	const g = rgb[1];
	let b = rgb[2];
	const h = convert.rgb.hsl(rgb)[0];
	const w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const k = Math.min(1 - r, 1 - g, 1 - b);
	const c = (1 - r - k) / (1 - k) || 0;
	const m = (1 - g - k) / (1 - k) || 0;
	const y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

function comparativeDistance(x, y) {
	/*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
	return (
		((x[0] - y[0]) ** 2) +
		((x[1] - y[1]) ** 2) +
		((x[2] - y[2]) ** 2)
	);
}

convert.rgb.keyword = function (rgb) {
	const reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	let currentClosestDistance = Infinity;
	let currentClosestKeyword;

	for (const keyword of Object.keys(cssKeywords)) {
		const value = cssKeywords[keyword];

		// Compute comparative distance
		const distance = comparativeDistance(rgb, value);

		// Check if its less, if so set as closest
		if (distance < currentClosestDistance) {
			currentClosestDistance = distance;
			currentClosestKeyword = keyword;
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	let r = rgb[0] / 255;
	let g = rgb[1] / 255;
	let b = rgb[2] / 255;

	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	const xyz = convert.rgb.xyz(rgb);
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	const h = hsl[0] / 360;
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;
	let t2;
	let t3;
	let val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	const t1 = 2 * l - t2;

	const rgb = [0, 0, 0];
	for (let i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}

		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	const h = hsl[0];
	let s = hsl[1] / 100;
	let l = hsl[2] / 100;
	let smin = s;
	const lmin = Math.max(l, 0.01);

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	const v = (l + s) / 2;
	const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	const h = hsv[0] / 60;
	const s = hsv[1] / 100;
	let v = hsv[2] / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	const h = hsv[0];
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;
	const vmin = Math.max(v, 0.01);
	let sl;
	let l;

	l = (2 - s) * v;
	const lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	const h = hwb[0] / 360;
	let wh = hwb[1] / 100;
	let bl = hwb[2] / 100;
	const ratio = wh + bl;
	let f;

	// Wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh); // Linear interpolation

	let r;
	let g;
	let b;
	/* eslint-disable max-statements-per-line,no-multi-spaces */
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	/* eslint-enable max-statements-per-line,no-multi-spaces */

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	const c = cmyk[0] / 100;
	const m = cmyk[1] / 100;
	const y = cmyk[2] / 100;
	const k = cmyk[3] / 100;

	const r = 1 - Math.min(1, c * (1 - k) + k);
	const g = 1 - Math.min(1, m * (1 - k) + k);
	const b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	const x = xyz[0] / 100;
	const y = xyz[1] / 100;
	const z = xyz[2] / 100;
	let r;
	let g;
	let b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// Assume sRGB
	r = r > 0.0031308
		? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	const l = (116 * y) - 16;
	const a = 500 * (x - y);
	const b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let x;
	let y;
	let z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	const y2 = y ** 3;
	const x2 = x ** 3;
	const z2 = z ** 3;
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	const l = lab[0];
	const a = lab[1];
	const b = lab[2];
	let h;

	const hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	const c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	const l = lch[0];
	const c = lch[1];
	const h = lch[2];

	const hr = h / 360 * 2 * Math.PI;
	const a = c * Math.cos(hr);
	const b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args, saturation = null) {
	const [r, g, b] = args;
	let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	let ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// Optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	const r = args[0];
	const g = args[1];
	const b = args[2];

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	let color = args % 10;

	// Handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	const mult = (~~(args > 50) + 1) * 0.5;
	const r = ((color & 1) * mult) * 255;
	const g = (((color >> 1) & 1) * mult) * 255;
	const b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// Handle greyscale
	if (args >= 232) {
		const c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	let rem;
	const r = Math.floor(args / 36) / 5 * 255;
	const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	const b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	const integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	let colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(char => {
			return char + char;
		}).join('');
	}

	const integer = parseInt(colorString, 16);
	const r = (integer >> 16) & 0xFF;
	const g = (integer >> 8) & 0xFF;
	const b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const max = Math.max(Math.max(r, g), b);
	const min = Math.min(Math.min(r, g), b);
	const chroma = (max - min);
	let grayscale;
	let hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	const s = hsl[1] / 100;
	const l = hsl[2] / 100;

	const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));

	let f = 0;
	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	const s = hsv[1] / 100;
	const v = hsv[2] / 100;

	const c = s * v;
	let f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	const h = hcg[0] / 360;
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	const pure = [0, 0, 0];
	const hi = (h % 1) * 6;
	const v = hi % 1;
	const w = 1 - v;
	let mg = 0;

	/* eslint-disable max-statements-per-line */
	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}
	/* eslint-enable max-statements-per-line */

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const v = c + g * (1.0 - c);
	let f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;

	const l = g * (1.0 - c) + 0.5 * c;
	let s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	const c = hcg[1] / 100;
	const g = hcg[2] / 100;
	const v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	const w = hwb[1] / 100;
	const b = hwb[2] / 100;
	const v = 1 - b;
	const c = v - w;
	let g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hsv = convert.gray.hsl;

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	const val = Math.round(gray[0] / 100 * 255) & 0xFF;
	const integer = (val << 16) + (val << 8) + val;

	const string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/ansi-styles/node_modules/color-convert/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ansi-styles/node_modules/color-convert/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/ansi-styles/node_modules/color-convert/conversions.js");
const route = __webpack_require__(/*! ./route */ "./node_modules/ansi-styles/node_modules/color-convert/route.js");

const convert = {};

const models = Object.keys(conversions);

function wrapRaw(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];
		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		return fn(args);
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	const wrappedFn = function (...args) {
		const arg0 = args[0];

		if (arg0 === undefined || arg0 === null) {
			return arg0;
		}

		if (arg0.length > 1) {
			args = arg0;
		}

		const result = fn(args);

		// We're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (let len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// Preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(fromModel => {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	const routes = route(fromModel);
	const routeModels = Object.keys(routes);

	routeModels.forEach(toModel => {
		const fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/ansi-styles/node_modules/color-convert/route.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ansi-styles/node_modules/color-convert/route.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const conversions = __webpack_require__(/*! ./conversions */ "./node_modules/ansi-styles/node_modules/color-convert/conversions.js");

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	const graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	const models = Object.keys(conversions);

	for (let len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	const graph = buildGraph();
	const queue = [fromModel]; // Unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		const current = queue.pop();
		const adjacents = Object.keys(conversions[current]);

		for (let len = adjacents.length, i = 0; i < len; i++) {
			const adjacent = adjacents[i];
			const node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	const path = [graph[toModel].parent, toModel];
	let fn = conversions[graph[toModel].parent][toModel];

	let cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	const graph = deriveBFS(fromModel);
	const conversion = {};

	const models = Object.keys(graph);
	for (let len = models.length, i = 0; i < len; i++) {
		const toModel = models[i];
		const node = graph[toModel];

		if (node.parent === null) {
			// No possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./resources/js/user.js":
/*!******************************!*\
  !*** ./resources/js/user.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


var _require = __webpack_require__(/*! laravel-mix/src/Log */ "./node_modules/laravel-mix/src/Log.js"),
    reset = _require.reset;

$(document).ready(function () {
  resetUserSitesTable();
  resetUserEditTable();
  resetRole();
  resetLevel();
  resetRegion();
  $('input[data-bootstrap-switch-1]').bootstrapSwitch();

  if (user.approved != 0) {
    $('input[data-bootstrap-switch-1]').bootstrapSwitch('state', true);
  } else {
    $('input[data-bootstrap-switch-1]').bootstrapSwitch('state', false);
  }

  $('input[data-bootstrap-switch]').bootstrapSwitch();

  if (user.approved != 0) {
    $('input[data-bootstrap-switch]').bootstrapSwitch('state', true);
  } else {
    $('input[data-bootstrap-switch]').bootstrapSwitch('state', false);
  }

  if (modifiable === true) {
    document.getElementById('userMenu').children[2].style.display = 'block';
  } else {
    document.getElementById('userMenu').children[2].style.display = 'none';
  } // $('a[id="navSettings"]').on('show.bs.tab', function (e) {
  //     e.target // newly activated tab
  //     e.relatedTarget // previous active tab
  //     console.log('test')
  //     console.log(userRole)
  //     if (
  //         userRole != null &&
  //         userLevel == null &&
  //         userRegions.length == 0 &&
  //         userSites.length == 0
  //     ) {
  //         $('#select-role option').each(function () {
  //             if (this.value == userRole['id']) {
  //                 $('#select-role option[value=' + userRole['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //                 let id = userRole['id']
  //             }
  //         })
  //     } else if (
  //         userRole != [] &&
  //         userLevel != null &&
  //         userRegions.length == 0 &&
  //         userSites.length == 0
  //     ) {
  //         document.getElementById('userLevel').style.display = 'block'
  //         $('#select-role option').each(function () {
  //             if (this.value == userRole['id']) {
  //                 $('#select-role option[value=' + userRole['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //         document.getElementById('userLevel').style.display = 'block'
  //         $('#select-level option').each(function () {
  //             if (this.value == userLevel['id']) {
  //                 $('#select-level option[value=' + userLevel['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //     } else if (
  //         userRole != [] &&
  //         userLevel != null &&
  //         userRegions.length != 0 &&
  //         userSites.length == 0
  //     ) {
  //         $('#select-role option').each(function () {
  //             if (this.value == userRole['id']) {
  //                 $('#select-role option[value=' + userRole['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //         document.getElementById('userLevel').style.display = 'block'
  //         $('#select-level option').each(function () {
  //             if (this.value == userLevel['id']) {
  //                 $('#select-level option[value=' + userLevel['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //         document.getElementById('userRegion').style.display = 'block'
  //         $('#select-region option').remove()
  //         userRegions.forEach(function (item, index) {
  //             $('#select-region').append(
  //                 '<option value=' +
  //                     item.id +
  //                     '>' +
  //                     item.region_name +
  //                     '</option>'
  //             )
  //             $('#select-region option[value=' + item.id + ']')
  //                 .prop('selected', 'selected')
  //                 .change()
  //         })
  //     } else if (
  //         userRole != [] &&
  //         userLevel != null &&
  //         userRegions.length != 0 &&
  //         userSites.length != 0
  //     ) {
  //         $('#select-role option').each(function () {
  //             if (this.value == userRole['id']) {
  //                 $('#select-role option[value=' + userRole['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //         document.getElementById('userLevel').style.display = 'block'
  //         $('#select-level option').each(function () {
  //             if (this.value == userLevel['id']) {
  //                 $('#select-level option[value=' + userLevel['id'] + ']')
  //                     .prop('selected', 'selected')
  //                     .change()
  //             }
  //         })
  //         document.getElementById('userRegion').style.display = 'block'
  //         $('#select-region option').remove()
  //         userRegions.forEach(function (item, index) {
  //             $('#select-region').append(
  //                 '<option value=' +
  //                     item.id +
  //                     '>' +
  //                     item.region_name +
  //                     '</option>'
  //             )
  //             $('#select-region option[value=' + item.id + ']')
  //                 .prop('selected', 'selected')
  //                 .change()
  //         })
  //     }
  //     $('#select-region').on('change', function (e) {
  //         let userRoleid = $('#select-role option:selected').val()
  //         let userRegionid = $('#select-region option:selected').val()
  //         if (userRoleid == '3') {
  //             let userRegionSelected = document.querySelectorAll(
  //                 '#select-region option:checked'
  //             )
  //             let userRegionsid = Array.from(userRegionSelected).map(
  //                 el => el.value
  //             )
  //             let userRegionsName = Array.from(userRegionSelected).map(
  //                 el => el.text
  //             )
  //             document.getElementById('userAccess').style.display = 'block'
  //             // select-region 에서 선택된 region_code 에 해당하는 site 만 그릴 수 있도록 filter 나  ajax 로 걸러낸다
  //             // site 정보는 다 가져오므로 loop를 돌면서 filter 를 하자
  //             if (typeof userRegionid != 'undefined') {
  //                 $.ajax({
  //                     // 아래 headers 에 반드시 token을 추가해줘야 한다. .!!!!!
  //                     headers: {
  //                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
  //                             'content'
  //                         )
  //                     },
  //                     type: 'POST',
  //                     url: '/admin/users/userAccess',
  //                     data: {
  //                         userRegionsid: JSON.stringify(userRegionsid)
  //                     },
  //                     traditional: true,
  //                     success: function (data) {
  //                         let userAssignedSites = data['userSites']
  //                         if (
  //                             typeof userAssignedSites == 'undefined' ||
  //                             userAssignedSites == []
  //                         ) {
  //                             $('#userEditTable tbody')
  //                                 .children()
  //                                 .remove()
  //                             return
  //                         } else {
  //                             let userEditTableTbody = ''
  //                             userAssignedSites.forEach(function (
  //                                 item,
  //                                 index
  //                             ) {
  //                                 let userAccessOption = ''
  //                                 if (item.operation_type == 'tracking') {
  //                                     accesses.forEach(function (
  //                                         item,
  //                                         index
  //                                     ) {
  //                                         userAccessOption =
  //                                             userAccessOption +
  //                                             '<option value=" ' +
  //                                             item.id +
  //                                             ' ">' +
  //                                             item.name +
  //                                             '</option>'
  //                                     })
  //                                 } else {
  //                                     accesses.forEach(function (
  //                                         item,
  //                                         index
  //                                     ) {
  //                                         if (item.name != 'control') {
  //                                             userAccessOption =
  //                                                 userAccessOption +
  //                                                 '<option value=" ' +
  //                                                 item.id +
  //                                                 ' ">' +
  //                                                 item.name +
  //                                                 '</option>'
  //                                         }
  //                                     })
  //                                 }
  //                                 userEditTableTbody =
  //                                     userEditTableTbody + '<tr>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.id +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.site_name +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.region_name +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.site_code +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td class="project-state"><select name="accesses[' +
  //                                     item.id +
  //                                     '][]" id="select-access' +
  //                                     item.id +
  //                                     '" class="select2_access" multiple="multiple" data-placeholder="Select a Access Role" style="width: 100%;">' +
  //                                     userAccessOption +
  //                                     '</select></td>'
  //                                 userEditTableTbody += '</tr>'
  //                             })
  //                             $('#userEditTable tbody')
  //                                 .children()
  //                                 .remove()
  //                             $('#userEditTable tbody').append(
  //                                 userEditTableTbody
  //                             )
  //                             $('.select2_access').select2({
  //                                 minimumSelectionLength: 1,
  //                                 width: '100%'
  //                             })
  //                         }
  //                     },
  //                     error: function (data) {
  //                         alert('error')
  //                     },
  //                     complete: function (data) {}
  //                 })
  //             } else {
  //                 $('#userEditTable tbody')
  //                     .children()
  //                     .remove()
  //                 document.getElementById('userAccess').style.display = 'none'
  //             }
  //         } else if (userRoleid == '4') {
  //             let userRegionSelected = document.querySelectorAll(
  //                 '#select-region option:checked'
  //             )
  //             let userRegionsid = Array.from(userRegionSelected).map(
  //                 el => el.value
  //             )
  //             let userRegionsName = Array.from(userRegionSelected).map(
  //                 el => el.text
  //             )
  //             document.getElementById('userAccess').style.display = 'block'
  //             // select-region 에서 선택된 region_code 에 해당하는 site 만 그릴 수 있도록 filter 나  ajax 로 걸러낸다
  //             // site 정보는 다 가져오므로 loop를 돌면서 filter 를 하자
  //             // console.log(userRegionid)
  //             if (typeof userRegionid != 'undefined') {
  //                 $.ajax({
  //                     // 아래 headers 에 반드시 token을 추가해줘야 한다. .!!!!!
  //                     headers: {
  //                         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr(
  //                             'content'
  //                         )
  //                     },
  //                     type: 'POST',
  //                     url: '/admin/users/userAccess',
  //                     data: {
  //                         userRegionsid: JSON.stringify(userRegionsid)
  //                     },
  //                     traditional: true,
  //                     success: function (data) {
  //                         let userAssignedSites = data['userSites']
  //                         if (
  //                             typeof userAssignedSites == 'undefined' ||
  //                             userAssignedSites == []
  //                         ) {
  //                             $('#userEditTable tbody')
  //                                 .children()
  //                                 .remove()
  //                             return
  //                         } else {
  //                             let userEditTableTbody = ''
  //                             userAssignedSites.forEach(function (
  //                                 item,
  //                                 index
  //                             ) {
  //                                 let userAccessOption = ''
  //                                 accesses.forEach(function (item, index) {
  //                                     if (item.name != 'control') {
  //                                         userAccessOption =
  //                                             userAccessOption +
  //                                             '<option value=" ' +
  //                                             item.id +
  //                                             ' ">' +
  //                                             item.name +
  //                                             '</option>'
  //                                     }
  //                                 })
  //                                 userEditTableTbody =
  //                                     userEditTableTbody + '<tr>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.id +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.site_name +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.region_name +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td>' +
  //                                     item.site_code +
  //                                     '</td>'
  //                                 userEditTableTbody =
  //                                     userEditTableTbody +
  //                                     '<td class="project-state"><select name="accesses[' +
  //                                     item.id +
  //                                     '][]" id="select-access' +
  //                                     item.id +
  //                                     '" class="select2_access" multiple="multiple" data-placeholder="Select a Access Role" style="width: 100%;">' +
  //                                     userAccessOption +
  //                                     '</select></td>'
  //                                 userEditTableTbody += '</tr>'
  //                             })
  //                             $('#userEditTable tbody')
  //                                 .children()
  //                                 .remove()
  //                             $('#userEditTable tbody').append(
  //                                 userEditTableTbody
  //                             )
  //                             $('.select2_access').select2({
  //                                 minimumSelectionLength: 1,
  //                                 width: '100%'
  //                             })
  //                         }
  //                     },
  //                     error: function (data) {
  //                         alert('error')
  //                     },
  //                     complete: function (data) {}
  //                 })
  //             } else {
  //                 $('#userEditTable tbody')
  //                     .children()
  //                     .remove()
  //                 document.getElementById('userAccess').style.display = 'none'
  //             }
  //         }
  //     })
  //     $('#select-level').on('change', function (e) {
  //         let userRoleid = $('#select-role option:selected').val()
  //         let userLevelid = $('#select-level option:selected').val()
  //         if (userRoleid == '1') {
  //             document.getElementById('userRegion').style.display = 'block'
  //             $('#select-region option').remove()
  //             regions.forEach(function (item, index) {
  //                 if (item.id == 1) {
  //                     $('#select-region').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.region_name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //         } else if (userRoleid == '2') {
  //             document.getElementById('userRegion').style.display = 'block'
  //             $('#select-region option').remove()
  //             regions.forEach(function (item, index) {
  //                 if (item.id !== 1) {
  //                     $('#select-region').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.region_name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //         } else if (userRoleid == '3') {
  //             document.getElementById('userRegion').style.display = 'block'
  //             $('#select-region option').remove()
  //             $('#userEditTable tbody')
  //                 .children()
  //                 .remove()
  //             loginUserRegions.forEach(function (item, index) {
  //                 $('#select-region').append(
  //                     '<option value=' +
  //                         item.region_id +
  //                         '>' +
  //                         item.regionName +
  //                         '</option>'
  //                 )
  //             })
  //         } else if (userRoleid == '4') {
  //             document.getElementById('userRegion').style.display = 'block'
  //             $('#select-region option').remove()
  //             $('#userEditTable tbody')
  //                 .children()
  //                 .remove()
  //             loginUserRegions.forEach(function (item, index) {
  //                 $('#select-region').append(
  //                     '<option value=' +
  //                         item.region_id +
  //                         '>' +
  //                         item.regionName +
  //                         '</option>'
  //                 )
  //             })
  //         } else if (
  //             typeof userRoleid != 'undefined' &&
  //             typeof userLevelid == 'undefined'
  //         ) {
  //             document.getElementById('userRegion').style.display = 'none'
  //         }
  //     })
  //     $('#select-role').on('change', function (e) {
  //         let userRoleid = $(this).val()
  //         document.getElementById('userLevel').style.display = 'none'
  //         document.getElementById('userRegion').style.display = 'none'
  //         // when "admin" is selected as userRole
  //         if (userRoleid == '1') {
  //             document.getElementById('userLevel').style.display = 'block'
  //             document.getElementById('userRegion').style.display = 'none'
  //             $('#select-level option').remove()
  //             levels.forEach(function (item, index) {
  //                 if (item.id.toString() === userRoleid.toString()) {
  //                     $('#select-level').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //             // when "manager" is selected as userRole
  //         } else if (userRoleid == '2') {
  //             document.getElementById('userLevel').style.display = 'block'
  //             $('#select-level option').remove()
  //             levels.forEach(function (item, index) {
  //                 if (item.id.toString() === userRoleid.toString()) {
  //                     $('#select-level').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //             // when "service_operator" is selected as userRole
  //         } else if (userRoleid == '3') {
  //             document.getElementById('userLevel').style.display = 'block'
  //             $('#select-level option').remove()
  //             levels.forEach(function (item, index) {
  //                 if (item.name === 'site') {
  //                     $('#select-level').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //         } else if (userRoleid == '4') {
  //             document.getElementById('userLevel').style.display = 'block'
  //             $('#select-level option').remove()
  //             levels.forEach(function (item, index) {
  //                 if (item.name === 'site') {
  //                     $('#select-level').append(
  //                         '<option value=' +
  //                             item.id +
  //                             '>' +
  //                             item.name +
  //                             '</option>'
  //                     )
  //                 }
  //             })
  //         } else if (userRoleid == '5') {
  //             $('#select-level option:selected')
  //                 .prop('selected', false)
  //                 .change()
  //             document.getElementById('userRegion').style.display = 'none'
  //             document.getElementById('userLevel').style.display = 'none'
  //         } else if (typeof userRoleid == 'undefined') {
  //             document.getElementById('userRegion').style.display = 'none'
  //             document.getElementById('userLevel').style.display = 'none'
  //         }
  //     })
  // })
  // $('#roleSubmit').click(function () {
  //     // e.preventDefault();
  //     let count_role = $('#select-role option:selected').length
  //     let count_level = $('#select-level option:selected').length
  //     let count_access = $('#select-access option:selected').length
  //     let count_region = $('#select-region option:selected').length
  //     /*
  //      * level_key 값으로 LEVEL 에서 선택한 값을 확인한다. (불안정하지만 일단은 이렇게 )
  //      * DB role 의 id 값으로 확인하는 것이므로 DB id 값이 수정되면 이 부분도 수정되어야한다.
  //      * (의존성 없는 구조로 수정이 앞으로 필요하다.)
  //      * level_key == 6 => SITE
  //      * level_key == 7 => Region
  //      */
  //     if (count_role == 0) {
  //         alert('Role 권한은 최소한 한 개를 선택하여야 합니다.')
  //         return false
  //     } else if (count_level == 0 && userRole['name'] != 'user') {
  //         alert('Level 권한은 최소한 한 개를 선택하여야 합니다.')
  //         return false
  //     } else if (
  //         count_region == 0 &&
  //         userRole['name'] != 'operator' &&
  //         userRole['name'] != 'user'
  //     ) {
  //         alert('Region 권한은 최소한 한 개를 선택하여야 합니다.')
  //         return false
  //     } else {
  //         return true
  //     }
  //     $(this + 'input[type=checkbox]:not(:checked)').each(function () {
  //         // set value 0 and check it
  //         $(this)
  //             .find('input[type=checkbox]:not(:checked)')
  //             .prop('checked', true)
  //             .val(0)
  //     })
  // })
  // $('#approvalSubmit').click(function () {
  //     var userApproval = $('input:checkbox[name=approvalCheckbox]:checked')
  //         .length
  //     alert(userApproval)
  //     $.ajax({
  //         headers: {
  //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  //         },
  //         method: 'POST',
  //         url: "{{ route('admin.users.approvalUser') }}",
  //         data: {
  //             userApproval: userApproval,
  //             user_id: user.id
  //         },
  //         success: function (result) {
  //             alert('회원 승인 정보가 변경 되었습니다.')
  //             if (result['approved'] == 0) {
  //                 $('#userApprovalStatus').text('미승인')
  //                 $('input:checkbox[name=approvalCheckbox]:checked').is(
  //                     ':checked'
  //                 ) == false
  //             } else if (result['approved'] == 1) {
  //                 $('#userApprovalStatus').text('승인')
  //                 $('input:checkbox[name=approvalCheckbox]:checked').is(
  //                     ':checked'
  //                 ) == true
  //             }
  //         },
  //         complete: function (result) {}
  //     })
  // })
  // let userRegionSelected = document.querySelectorAll(
  //     '#select-region option:checked'
  // )
  // console.log(userRegionSelected)
  // var modalCloses = document.getElementsByClassName('modalCloseBtn')
  // for (var i = 0; i < modalCloses.length; i++) {
  //     modalCloses[i].addEventListener('click', function (e) {
  //         closeModal()
  //     })
  // }
  // document.getElementById('editUser').addEventListener('click', function (e) {
  //     editUser()
  // })

});
$(document).on('click', '.modalCloseBtn', function (e) {
  $('#modal-lg').modal('hide');
});
$(document).on('click', '#editUser', function (e) {
  $('#modal-lg').modal('show');
  initializeModalPage();
});
$(document).on('change', '#select-role', function (e) {
  // var selectedUserRegionid = $('#select-region option:selected').val()
  // console.log(this.value)
  var R_ACTIVATION = false;

  if (this.value === '1') {
    $('#select-level option[value="1"]').prop('selected', 'selected').change();
    $('#select-region option[value="1"]').prop('selected', 'selected').change();
    R_ACTIVATION = true;
  } else if (this.value === '2') {
    // console.log(this.value)
    // console.log('manager 입니다.')
    $('#select-level option:selected').prop('selected', false);
    $('#select-region option:selected').prop('selected', false);
  } else if (this.value === '3') {// console.log(this.value)
  } else if (this.value === '4') {// console.log(this.value)
  } else if (this.value === '5') {
    // console.log(this.value)
    // console.log('user 입니다.')
    R_ACTIVATION = true;
  } else {
    resetLevel();
    resetRegion();
  }

  $('#select-level').prop("disabled", R_ACTIVATION);
  $('#select-region').prop("disabled", R_ACTIVATION);
});
$(document).on('change', '#select-level', function (e) {
  var ACTIVATION = false;

  if (this.value === '1') {
    $('#select-region option[value="1"]').prop('selected', 'selected').change();
    ACTIVATION = true;
  } else if (this.value === '2' || this.value === '3') {
    $('#select-region option[value="1"]').prop('disabled', true);
    ACTIVATION = false;
  } else if (this.value === "") {
    resetRegion();
  }

  $('#select-region').prop("disabled", ACTIVATION);
});
$(document).on('change', '#select-region', function (e) {
  var selectedLevel = $('#select-level option:selected').val();
  var selectedRegion = $('.select2_region').select2("val");

  if (selectedRegion.length != 0) {
    if (selectedLevel === '3' && selectedRegion !== '1') {
      document.getElementById("userAccess").style.display = "block";

      if (selectedRegion != 'undefined' || selectedRegion != null) {
        makeUserEditTable(selectedRegion);
      } else {
        document.getElementById("userAccess").style.display = "none";
      }
    }
  } else {
    $('#userEditTable tbody').children().remove();
    document.getElementById("userAccess").style.display = "none";
  }
});

function checkSelectedRole() {
  var userRegionSelected = document.querySelectorAll('#select-region option:checked');
}

function initializeModalPage() {
  $('#select-role').val("");
  $('#select-level').val("");
  $('#select-region').val("");
  $('#select-role option[value=' + userRole['id'] + ']').prop('selected', 'selected').change();
  $('#select-level option[value=' + userLevel['id'] + ']').prop('selected', 'selected').change();
  userRegions.forEach(function (item, index) {
    $('#select-region option[value=' + item.id + ']').prop('selected', 'selected').change();
  });
}

function resetRole() {
  $('.select2_role').val("").select2({
    minimumSelectionLength: 1,
    maximumSelectionLength: 1,
    width: '100%'
  });
}

function resetLevel() {
  $('#select-level').val("").select2({
    minimumSelectionLength: 1,
    maximumSelectionLength: 1,
    width: '100%'
  });
}

function resetRegion() {
  $('#select-region').val("").select2({
    minimumSelectionLength: 1,
    width: '100%'
  });
}

function resetSelect2Access() {
  $('.select2_access').select2({
    minimumSelectionLength: 1,
    width: '100%'
  });
}

function resetUserSitesTable() {
  $('#userSitesTable').DataTable({
    responsive: true,
    columnDefs: [{
      responsivePriority: 1,
      targets: 0
    }, {
      responsivePriority: 1,
      targets: 1
    }, {
      targets: [2, 3, 4],
      className: 'dt-body-right'
    }],
    lengthChange: false,
    autoWidth: false,
    ordering: true,
    searching: false,
    paging: false
  });
}

function resetUserEditTable() {
  $('#userEditTable').DataTable({
    destroy: true,
    responsive: true,
    columnDefs: [{
      responsivePriority: 1,
      targets: 0
    }, {
      responsivePriority: 1,
      targets: 1
    }, {
      targets: [2],
      className: 'dt-body-right'
    }],
    lengthChange: false,
    autoWidth: false,
    ordering: true,
    searching: false,
    paging: false
  });
}

function makeUserEditTable(data) {
  $.ajax({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    type: "POST",
    url: "/api/accessableSite",
    data: {
      region: data
    },
    success: function success(data) {
      console.log(data);
      userEditTable(data);
    },
    error: function error(data) {
      alert("error");
    },
    complete: function complete(data) {
      resetSelect2Access();
    }
  });
}

function userEditTable(data) {
  /*
   * 1. userEditTable tbody 를 새롭게 만든다.
   */
  // $("#userEditTable thead").children().remove();
  $("#userEditTable tbody").children().remove();
  data.forEach(function (item, index, array) {
    var tr_obj0 = document.createElement("tr");
    var td_obj1 = document.createElement("td");
    var td_obj2 = document.createElement("td");
    var td_obj3 = document.createElement("td");
    td_obj1.innerHTML = item['site_name'];
    td_obj2.innerHTML = item['region_name'];
    var userAccessOption = '';

    if (item['operation_type'] == "tracking") {
      accesses.forEach(function (item, index) {
        userAccessOption = userAccessOption + '<option value="' + item.id + '">' + item.name + '</option>';
      });
    } else {
      accesses.forEach(function (item, index) {
        if (item.name != "control") {
          userAccessOption = userAccessOption + '<option value=" ' + item.id + ' ">' + item.name + '</option>';
        }
      });
    }

    td_obj3.className = 'project-state';
    td_obj3.innerHTML = '<select name="accesses[' + item.id + '][]" id="select-access' + item.id + '" class="select2_access" multiple="multiple" data-placeholder="Select a Access Role" style="width: 100%;">' + userAccessOption + '</select>'; //td를 tr에 삽입 -> td를 tr의 자식요소로 만들어야한다.

    tr_obj0.appendChild(td_obj1);
    tr_obj0.appendChild(td_obj2);
    tr_obj0.appendChild(td_obj3); //원하는 테이블의 원하는 장소에 자식요소로 만들기.

    var table = document.getElementById("userEditTable"); //테이블의 아이디를 이용
    //3번째 자식 요소를 얻어내서 추가해야한다.(tbody를 2번째로 만들어 놓음)

    var tbody = table.children[1]; //여기에 값넣기.

    tbody.appendChild(tr_obj0);
  });
}

/***/ }),

/***/ "./node_modules/chalk/source/index.js":
/*!********************************************!*\
  !*** ./node_modules/chalk/source/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const ansiStyles = __webpack_require__(/*! ansi-styles */ "./node_modules/ansi-styles/index.js");
const {stdout: stdoutColor, stderr: stderrColor} = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/browser.js");
const {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
} = __webpack_require__(/*! ./util */ "./node_modules/chalk/source/util.js");

const {isArray} = Array;

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m'
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

class ChalkClass {
	constructor(options) {
		// eslint-disable-next-line no-constructor-return
		return chalkFactory(options);
	}
}

const chalkFactory = options => {
	const chalk = {};
	applyOptions(chalk, options);

	chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);

	Object.setPrototypeOf(chalk, Chalk.prototype);
	Object.setPrototypeOf(chalk.template, chalk);

	chalk.template.constructor = () => {
		throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
	};

	chalk.template.Instance = ChalkClass;

	return chalk.template;
};

function Chalk(options) {
	return chalkFactory(options);
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		}
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this._styler, true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	}
};

const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

for (const model of usedModels) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
				return createBuilder(this, styler, this._isEmpty);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this._generator.level;
		},
		set(level) {
			this._generator.level = level;
		}
	}
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	const builder = (...arguments_) => {
		if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
			// Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
			return applyStyle(builder, chalkTag(builder, ...arguments_));
		}

		// Single argument is hot path, implicit coercion is faster than anything
		// eslint-disable-next-line no-implicit-coercion
		return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
	};

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder._generator = self;
	builder._styler = _styler;
	builder._isEmpty = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self._isEmpty ? '' : string;
	}

	let styler = self._styler;

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.indexOf('\u001B') !== -1) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

let template;
const chalkTag = (chalk, ...strings) => {
	const [firstString] = strings;

	if (!isArray(firstString) || !isArray(firstString.raw)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return strings.join(' ');
	}

	const arguments_ = strings.slice(1);
	const parts = [firstString.raw[0]];

	for (let i = 1; i < firstString.length; i++) {
		parts.push(
			String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
			String(firstString.raw[i])
		);
	}

	if (template === undefined) {
		template = __webpack_require__(/*! ./templates */ "./node_modules/chalk/source/templates.js");
	}

	return template(chalk, parts.join(''));
};

Object.defineProperties(Chalk.prototype, styles);

const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;

module.exports = chalk;


/***/ }),

/***/ "./node_modules/chalk/source/templates.js":
/*!************************************************!*\
  !*** ./node_modules/chalk/source/templates.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	const u = c[0] === 'u';
	const bracket = c[1] === '{';

	if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	if (u && bracket) {
		return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, arguments_) {
	const results = [];
	const chunks = arguments_.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		const number = Number(chunk);
		if (!Number.isNaN(number)) {
			results.push(number);
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const [styleName, styles] of Object.entries(enabled)) {
		if (!Array.isArray(styles)) {
			continue;
		}

		if (!(styleName in current)) {
			throw new Error(`Unknown Chalk style: ${styleName}`);
		}

		current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
	}

	return current;
}

module.exports = (chalk, temporary) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
		if (escapeCharacter) {
			chunk.push(unescape(escapeCharacter));
		} else if (style) {
			const string = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(character);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMessage);
	}

	return chunks.join('');
};


/***/ }),

/***/ "./node_modules/chalk/source/util.js":
/*!*******************************************!*\
  !*** ./node_modules/chalk/source/util.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


const stringReplaceAll = (string, substring, replacer) => {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.substr(endIndex);
	return returnValue;
};

module.exports = {
	stringReplaceAll,
	stringEncaseCRLFWithFirstIndex
};


/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/laravel-mix/src/Log.js":
/*!*********************************************!*\
  !*** ./node_modules/laravel-mix/src/Log.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const chalk = __webpack_require__(/*! chalk */ "./node_modules/chalk/source/index.js");

/**
 * @typedef {object} LogMessage
 * @property {string} text
 * @property {'info' | 'warn' | 'error'} type
 **/

/**
 * @typedef {'default' | 'green' | 'red'} LogColor
 **/

class Log {
    /**
     * Determine if we are in test mode.
     */
    static testing = false;

    /**
     * All logged messages.
     *
     * @type {string[]}
     */
    static fakedLogs = [];

    /**
     * Log basic info to the console.
     *
     * @param  {string} message
     * @param  {LogColor} color
     */
    static info(message, color = 'default') {
        if (Log.testing) {
            Log.fakedLogs.push(message);

            return;
        }

        console.log(Log.colors()[color], message);

        Log.reset();
    }

    /**
     *
     * @param {LogMessage} message
     */
    static message(message) {
        if (Log.testing) {
            Log.fakedLogs.push(message.text);

            return;
        }

        /** @type {string} */
        let prefix = '';

        if (message.type === 'info') {
            prefix = ' INFO ';
        } else if (message.type === 'warn') {
            prefix = ' WARN ';
        } else if (message.type === 'error') {
            prefix = ' ERR ';
        }

        const line = message.text.replace(/\n/g, '\n' + ' '.repeat(prefix.length + 1));

        if (message.type === 'info') {
            console.warn(`${chalk.bgBlue.white(prefix)} ${chalk.white(line)}`);
        } else if (message.type === 'warn') {
            console.warn(`${chalk.bgYellow.black(prefix)} ${chalk.yellow(line)}`);
        } else if (message.type === 'error') {
            console.warn(`${chalk.bgRed.white(prefix)} ${chalk.red(line)}`);
        }
    }

    /**
     * Log feedback info to the console.
     *
     * @param  {string} message
     * @param  {LogColor} color
     */
    static feedback(message, color = 'green') {
        Log.line('\t' + message, color);
    }

    /**
     * Log error info to the console.
     *
     * @param  {string} message
     * @param  {LogColor} color
     */
    static error(message, color = 'red') {
        Log.line(message, color);
    }

    /**
     * Log a new line of info to the console.
     *
     * @param  {string} message
     * @param  {LogColor} color
     */
    static line(message, color = 'default') {
        Log.info(message, color);
    }

    /**
     * Reset the default color for future console.logs.
     */
    static reset() {
        console.log(Log.colors()['default'], '');
    }

    /**
     * Enter testing mode.
     */
    static fake() {
        Log.testing = true;
    }

    /**
     * Exit testing mode.
     */
    static restore() {
        Log.testing = false;
        Log.fakedLogs = [];
    }

    /**
     * Determine if the given message was logged.
     *
     * @param  {string} message
     */
    static received(message) {
        let result = Log.fakedLogs.some(log => log.includes(message));

        Log.restore();

        return result;
    }

    /**
     * The colors lookup table.
     */
    static colors() {
        return {
            default: '\x1b[0m',
            green: '\x1b[32m',
            red: '\x1b[31m'
        };
    }
}

module.exports = Log;


/***/ }),

/***/ "./node_modules/supports-color/browser.js":
/*!************************************************!*\
  !*** ./node_modules/supports-color/browser.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";

module.exports = {
	stdout: false,
	stderr: false
};


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["js/vendor"], () => (__webpack_exec__("./resources/js/user.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);