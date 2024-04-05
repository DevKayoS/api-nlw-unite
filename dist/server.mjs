import {
  registerForEvent
} from "./chunk-FEEJCOCO.mjs";
import {
  errorHandler
} from "./chunk-A4KU3325.mjs";
import {
  checkIn
} from "./chunk-DOHGCADI.mjs";
import {
  createEvent
} from "./chunk-KX5B6Z5S.mjs";
import "./chunk-KLEKF6RJ.mjs";
import {
  getAttendeeBadge
} from "./chunk-W6PXWEVZ.mjs";
import {
  getEventAttendees
} from "./chunk-BBJVPKJA.mjs";
import {
  getEvent
} from "./chunk-ICX2JBNJ.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-SWTOKJCE.mjs";

// node_modules/fastify-plugin/lib/getPluginName.js
var require_getPluginName = __commonJS({
  "node_modules/fastify-plugin/lib/getPluginName.js"(exports, module) {
    "use strict";
    var fpStackTracePattern = /at\s{1}(?:.*\.)?plugin\s{1}.*\n\s*(.*)/;
    var fileNamePattern = /(\w*(\.\w*)*)\..*/;
    module.exports = function getPluginName(fn) {
      if (fn.name.length > 0)
        return fn.name;
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 10;
      try {
        throw new Error("anonymous function");
      } catch (e) {
        Error.stackTraceLimit = stackTraceLimit;
        return extractPluginName(e.stack);
      }
    };
    function extractPluginName(stack) {
      const m = stack.match(fpStackTracePattern);
      return m ? m[1].split(/[/\\]/).slice(-1)[0].match(fileNamePattern)[1] : "anonymous";
    }
    module.exports.extractPluginName = extractPluginName;
  }
});

// node_modules/fastify-plugin/lib/toCamelCase.js
var require_toCamelCase = __commonJS({
  "node_modules/fastify-plugin/lib/toCamelCase.js"(exports, module) {
    "use strict";
    module.exports = function toCamelCase(name) {
      if (name[0] === "@") {
        name = name.slice(1).replace("/", "-");
      }
      const newName = name.replace(/-(.)/g, function(match, g1) {
        return g1.toUpperCase();
      });
      return newName;
    };
  }
});

// node_modules/fastify-plugin/plugin.js
var require_plugin = __commonJS({
  "node_modules/fastify-plugin/plugin.js"(exports, module) {
    "use strict";
    var getPluginName = require_getPluginName();
    var toCamelCase = require_toCamelCase();
    var count = 0;
    function plugin(fn, options = {}) {
      let autoName = false;
      if (typeof fn.default !== "undefined") {
        fn = fn.default;
      }
      if (typeof fn !== "function") {
        throw new TypeError(
          `fastify-plugin expects a function, instead got a '${typeof fn}'`
        );
      }
      if (typeof options === "string") {
        options = {
          fastify: options
        };
      }
      if (typeof options !== "object" || Array.isArray(options) || options === null) {
        throw new TypeError("The options object should be an object");
      }
      if (options.fastify !== void 0 && typeof options.fastify !== "string") {
        throw new TypeError(`fastify-plugin expects a version string, instead got '${typeof options.fastify}'`);
      }
      if (!options.name) {
        autoName = true;
        options.name = getPluginName(fn) + "-auto-" + count++;
      }
      fn[Symbol.for("skip-override")] = options.encapsulate !== true;
      fn[Symbol.for("fastify.display-name")] = options.name;
      fn[Symbol.for("plugin-meta")] = options;
      if (!fn.default) {
        fn.default = fn;
      }
      const camelCase = toCamelCase(options.name);
      if (!autoName && !fn[camelCase]) {
        fn[camelCase] = fn;
      }
      return fn;
    }
    module.exports = plugin;
    module.exports.default = plugin;
    module.exports.fastifyPlugin = plugin;
  }
});

// node_modules/@fastify/swagger/lib/util/format-param-url.js
var require_format_param_url = __commonJS({
  "node_modules/@fastify/swagger/lib/util/format-param-url.js"(exports, module) {
    "use strict";
    var COLON = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
    function formatParamUrl(str) {
      let i, char;
      let state = "skip";
      let path = "";
      let param = "";
      let level = 0;
      let regexp = 0;
      for (i = 0; i < str.length; i++) {
        char = str[i];
        switch (state) {
          case "colon": {
            if (COLON.indexOf(char) !== -1) {
              param += char;
            } else if (char === "(") {
              state = "regexp";
              level++;
            } else {
              state = "skip";
              path += "{" + param + "}";
              path += char;
              param = "";
            }
            break;
          }
          case "regexp": {
            if (char === "(") {
              level++;
            } else if (char === ")") {
              level--;
            }
            if (level === 0) {
              state = "skip";
              if (param === "") {
                regexp++;
                param = "regexp" + String(regexp);
              }
              path += "{" + param + "}";
              param = "";
            }
            break;
          }
          default: {
            if (char === ":" && str[i + 1] === ":") {
              path += char;
              i++;
            } else if (char === ":") {
              state = "colon";
            } else if (char === "(") {
              state = "regexp";
              level++;
            } else if (char === "*") {
              path += "{*}";
            } else {
              path += char;
            }
          }
        }
      }
      if (state === "colon" && param !== "") {
        path += "{" + param + "}";
      }
      return path;
    }
    module.exports = {
      formatParamUrl
    };
  }
});

// node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    var ALIAS = Symbol.for("yaml.alias");
    var DOC = Symbol.for("yaml.document");
    var MAP = Symbol.for("yaml.map");
    var PAIR = Symbol.for("yaml.pair");
    var SCALAR = Symbol.for("yaml.scalar");
    var SEQ = Symbol.for("yaml.seq");
    var NODE_TYPE = Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var identity = require_identity();
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          if (!prevAnchors)
            prevAnchors = anchorNames(doc);
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});

// node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc) {
        let found = void 0;
        visit.visit(doc, {
          Node: (_key, node) => {
            if (node === this)
              return visit.visit.BREAK;
            if (node.anchor === this.source)
              found = node;
          }
        });
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (!data || data.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          if (!ref.anchor)
            ref.anchor = onAnchor(value);
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    Collection.maxFlowStringSingleLineLength = 60;
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (literal ? "|" : ">") + (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${start}${value}${end}`;
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines.foldFlowLines(`${start}${value}${end}`, indent, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx, true));
      return `${header}
${indent}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        const match = tags.filter((t) => t.identify?.(obj));
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key)) {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n")
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof process !== "undefined" && process.emitWarning)
          process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log = require_log();
    var stringify = require_stringify();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var MERGE_KEY = "<<";
    function addPairToJSMap(ctx, map, { key, value }) {
      if (ctx?.doc.schema.merge && isMergeKey(key)) {
        value = identity.isAlias(value) ? value.resolve(ctx.doc) : value;
        if (identity.isSeq(value))
          for (const it of value.items)
            mergeToJSMap(ctx, map, it);
        else if (Array.isArray(value))
          for (const it of value)
            mergeToJSMap(ctx, map, it);
        else
          mergeToJSMap(ctx, map, value);
      } else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    var isMergeKey = (key) => key === MERGE_KEY || identity.isScalar(key) && key.value === MERGE_KEY && (!key.type || key.type === Scalar.Scalar.PLAIN);
    function mergeToJSMap(ctx, map, value) {
      const source = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        if (i < items.length - 1)
          str += ",";
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        if (!reqNewline && (lines.length > linesAtValue || str.includes("\n")))
          reqNewline = true;
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});

// node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});

// node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true|false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        const buf = value;
        let str;
        if (typeof Buffer === "function") {
          str = buf instanceof Buffer ? buf.toString("base64") : Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName) {
      let tags = schemas.get(schemaName);
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      return tags.map((tag) => {
        if (typeof tag !== "string")
          return tag;
        const tagObj = tagsByName[tag];
        if (tagObj)
          return tagObj;
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
      });
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.merge = !!merge;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});

// node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { merge: true, resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { merge: false, resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let hasNewlineAfterProp = false;
      let reqSpace = false;
      let anchor = null;
      let tag = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        switch (token.type) {
          case "space":
            if (!flow && atNewline && indicator !== "doc-start" && token.source[0] === "	")
              onError(token, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              hasNewlineAfterProp = true;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = false;
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== ""))
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        hasNewlineAfterProp,
        anchor,
        tag,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value && !(a.value === "<<" && ctx.schema.merge);
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value && value.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop:
              for (const st of start) {
                switch (st.type) {
                  case "comma":
                  case "space":
                    break;
                  case "comment":
                    prevItemComment = st.source.substring(1);
                    break loop;
                  default:
                    break loop;
                }
              }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source && value.source[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, tagToken, onError) {
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq" || !expType) {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt?.collection) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(scalar, strict, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch (_) {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = { x: 2, u: 4, U: 8 }[next];
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
      return String.fromCodePoint(code);
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      const tag = tagToken && tagName ? findScalarTagByName(ctx.schema, value, tagName, tagToken, onError) : token.type === "scalar" ? findScalarTagByTest(ctx, value, token, onError) : ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => tag2.default && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        if (pos === null)
          pos = before.length;
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
          isSrcToken = false;
        }
      }
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports.visit = visit;
  }
});

// node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = "0123456789ABCDEFabcdef".split("");
    var tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split("");
    var invalidFlowScalarChars = ",[]{}".split("");
    var invalidAnchorChars = " ,[]{}\n\r	".split("");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.includes(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          const cs = line.indexOf("#");
          if (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	")
              dirEnd = cs - 1;
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if (s === "---" && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return "doc";
          } else if (s === "..." && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            return "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop:
          for (let i = this.pos; ch = this.buffer[i]; ++i) {
            switch (ch) {
              case " ":
                indent += 1;
                break;
              case "\n":
                nl = i;
                indent = 0;
                break;
              case "\r": {
                const next = this.buffer[i + 1];
                if (!next && !this.atEnd)
                  return this.setNext("block-scalar");
                if (next === "\n")
                  break;
              }
              default:
                break loop;
            }
          }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else
            this.indentNext += this.blockScalarIndent;
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        if (!this.blockScalarKeep) {
          do {
            let i = nl - 1;
            let ch2 = this.buffer[i];
            if (ch2 === "\r")
              ch2 = this.buffer[--i];
            const lastChar = i;
            while (ch2 === " " || ch2 === "	")
              ch2 = this.buffer[--i];
            if (ch2 === "\n" && i >= this.pos && i + 1 + indent > lastChar)
              nl = i;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && next === ",")
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && invalidFlowScalarChars.includes(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && invalidFlowScalarChars.includes(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && invalidFlowScalarChars.includes(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.includes(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.includes(this.buffer[i + 1]) && hexDigits.includes(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports.Lexer = Lexer;
  }
});

// node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop:
        while (--i >= 0) {
          switch (prev[i].type) {
            case "doc-start":
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
            case "newline":
              break loop;
          }
        }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                Array.prototype.push.apply(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              Array.prototype.push.apply(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !includesToken(it.start, "explicit-key-ind");
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !includesToken(it.start, "explicit-key-ind")) {
                it.start.push(this.sourceToken);
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken] }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (includesToken(it.start, "explicit-key-ind")) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key, delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (atNextItem && bv.type !== "block-seq" && includesToken(it.start, "explicit-key-ind")) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top && top.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser;
  }
});

// node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// node_modules/@fastify/swagger/lib/mode/static.js
var require_static = __commonJS({
  "node_modules/@fastify/swagger/lib/mode/static.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var fs = __require("fs");
    var yaml = require_dist();
    module.exports = function(fastify2, opts, done) {
      if (!opts.specification)
        return done(new Error("specification is missing in the module options"));
      if (typeof opts.specification !== "object")
        return done(new Error("specification is not an object"));
      let swaggerObject = {};
      if (!opts.specification.path && !opts.specification.document) {
        return done(new Error("both specification.path and specification.document are missing, should be path to the file or swagger document spec"));
      } else if (opts.specification.path) {
        if (typeof opts.specification.path !== "string")
          return done(new Error("specification.path is not a string"));
        if (!fs.existsSync(path.resolve(opts.specification.path)))
          return done(new Error(`${opts.specification.path} does not exist`));
        const extName = path.extname(opts.specification.path).toLowerCase();
        if ([".yaml", ".json"].indexOf(extName) === -1)
          return done(new Error("specification.path extension name is not supported, should be one from ['.yaml', '.json']"));
        if (opts.specification.postProcessor && typeof opts.specification.postProcessor !== "function")
          return done(new Error("specification.postProcessor should be a function"));
        if (opts.specification.baseDir && typeof opts.specification.baseDir !== "string")
          return done(new Error("specification.baseDir should be string"));
        if (!opts.specification.baseDir) {
          opts.specification.baseDir = path.resolve(path.dirname(opts.specification.path));
        } else {
          while (opts.specification.baseDir.endsWith("/")) {
            opts.specification.baseDir = opts.specification.baseDir.slice(0, -1);
          }
        }
        const source = fs.readFileSync(
          path.resolve(opts.specification.path),
          "utf8"
        );
        switch (extName) {
          case ".yaml":
            swaggerObject = yaml.parse(source);
            break;
          case ".json":
            swaggerObject = JSON.parse(source);
            break;
        }
        if (opts.specification.postProcessor) {
          swaggerObject = opts.specification.postProcessor(swaggerObject);
        }
      } else {
        if (typeof opts.specification.document !== "object")
          return done(new Error("specification.document is not an object"));
        swaggerObject = opts.specification.document;
      }
      fastify2.decorate("swagger", swagger);
      const cache = {
        swaggerObject: null,
        swaggerString: null
      };
      function swagger(opts2) {
        if (opts2 && opts2.yaml) {
          if (cache.swaggerString)
            return cache.swaggerString;
        } else {
          if (cache.swaggerObject)
            return cache.swaggerObject;
        }
        if (opts2 && opts2.yaml) {
          const swaggerString = yaml.stringify(swaggerObject, { strict: false });
          cache.swaggerString = swaggerString;
          return swaggerString;
        }
        cache.swaggerObject = swaggerObject;
        return swaggerObject;
      }
      done();
    };
  }
});

// node_modules/uri-js/dist/es5/uri.all.js
var require_uri_all = __commonJS({
  "node_modules/uri-js/dist/es5/uri.all.js"(exports, module) {
    "use strict";
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.URI = global.URI || {});
    })(exports, function(exports2) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = /* @__PURE__ */ function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve;
      exports2.normalize = normalize;
      exports2.equal = equal;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/rfdc/index.js
var require_rfdc = __commonJS({
  "node_modules/rfdc/index.js"(exports, module) {
    "use strict";
    module.exports = rfdc;
    function copyBuffer(cur) {
      if (cur instanceof Buffer) {
        return Buffer.from(cur);
      }
      return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
    }
    function rfdc(opts) {
      opts = opts || {};
      if (opts.circles)
        return rfdcCircles(opts);
      return opts.proto ? cloneProto : clone;
      function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur instanceof Date) {
            a2[k] = new Date(cur);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            a2[k] = fn(cur);
          }
        }
        return a2;
      }
      function clone(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (o instanceof Date)
          return new Date(o);
        if (Array.isArray(o))
          return cloneArray(o, clone);
        if (o instanceof Map)
          return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set)
          return new Set(cloneArray(Array.from(o), clone));
        var o2 = {};
        for (var k in o) {
          if (Object.hasOwnProperty.call(o, k) === false)
            continue;
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), clone));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), clone));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = clone(cur);
          }
        }
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (o instanceof Date)
          return new Date(o);
        if (Array.isArray(o))
          return cloneArray(o, cloneProto);
        if (o instanceof Map)
          return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set)
          return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        for (var k in o) {
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            o2[k] = cloneProto(cur);
          }
        }
        return o2;
      }
    }
    function rfdcCircles(opts) {
      var refs = [];
      var refsNew = [];
      return opts.proto ? cloneProto : clone;
      function cloneArray(a, fn) {
        var keys = Object.keys(a);
        var a2 = new Array(keys.length);
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
          var cur = a[k];
          if (typeof cur !== "object" || cur === null) {
            a2[k] = cur;
          } else if (cur instanceof Date) {
            a2[k] = new Date(cur);
          } else if (ArrayBuffer.isView(cur)) {
            a2[k] = copyBuffer(cur);
          } else {
            var index = refs.indexOf(cur);
            if (index !== -1) {
              a2[k] = refsNew[index];
            } else {
              a2[k] = fn(cur);
            }
          }
        }
        return a2;
      }
      function clone(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (o instanceof Date)
          return new Date(o);
        if (Array.isArray(o))
          return cloneArray(o, clone);
        if (o instanceof Map)
          return new Map(cloneArray(Array.from(o), clone));
        if (o instanceof Set)
          return new Set(cloneArray(Array.from(o), clone));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (var k in o) {
          if (Object.hasOwnProperty.call(o, k) === false)
            continue;
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), clone));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), clone));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            var i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = clone(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
      function cloneProto(o) {
        if (typeof o !== "object" || o === null)
          return o;
        if (o instanceof Date)
          return new Date(o);
        if (Array.isArray(o))
          return cloneArray(o, cloneProto);
        if (o instanceof Map)
          return new Map(cloneArray(Array.from(o), cloneProto));
        if (o instanceof Set)
          return new Set(cloneArray(Array.from(o), cloneProto));
        var o2 = {};
        refs.push(o);
        refsNew.push(o2);
        for (var k in o) {
          var cur = o[k];
          if (typeof cur !== "object" || cur === null) {
            o2[k] = cur;
          } else if (cur instanceof Date) {
            o2[k] = new Date(cur);
          } else if (cur instanceof Map) {
            o2[k] = new Map(cloneArray(Array.from(cur), cloneProto));
          } else if (cur instanceof Set) {
            o2[k] = new Set(cloneArray(Array.from(cur), cloneProto));
          } else if (ArrayBuffer.isView(cur)) {
            o2[k] = copyBuffer(cur);
          } else {
            var i = refs.indexOf(cur);
            if (i !== -1) {
              o2[k] = refsNew[i];
            } else {
              o2[k] = cloneProto(cur);
            }
          }
        }
        refs.pop();
        refsNew.pop();
        return o2;
      }
    }
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    "use strict";
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    "use strict";
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    "use strict";
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = __require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    "use strict";
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/json-schema-resolver/ref-resolver.js
var require_ref_resolver = __commonJS({
  "node_modules/json-schema-resolver/ref-resolver.js"(exports, module) {
    "use strict";
    var URI = require_uri_all();
    var cloner = require_rfdc()({ proto: true, circles: false });
    var { EventEmitter } = __require("events");
    var debug = require_src()("json-schema-resolver");
    var kIgnore = Symbol("json-schema-resolver.ignore");
    var kRefToDef = Symbol("json-schema-resolver.refToDef");
    var kConsumed = Symbol("json-schema-resolver.consumed");
    var defaultOpts = {
      target: "draft-07",
      clone: false,
      buildLocalReference(json, baseUri, fragment, i) {
        return `def-${i}`;
      }
    };
    var targetSupported = ["draft-07"];
    var targetCfg = {
      "draft-07": {
        def: "definitions"
      },
      "draft-08": {
        def: "$defs"
      }
    };
    function jsonSchemaResolver(options) {
      const ee = new EventEmitter();
      const {
        clone,
        target,
        applicationUri,
        externalSchemas: rootExternalSchemas,
        buildLocalReference
      } = Object.assign({}, defaultOpts, options);
      const allIds = /* @__PURE__ */ new Map();
      let rolling = 0;
      ee.on("$id", collectIds);
      const allRefs = [];
      ee.on("$ref", collectRefs);
      if (!targetSupported.includes(target)) {
        throw new Error(`Unsupported JSON schema version ${target}`);
      }
      let defaultUri;
      if (applicationUri) {
        defaultUri = getRootUri(applicationUri);
        if (rootExternalSchemas) {
          for (const es of rootExternalSchemas) {
            mapIds(ee, defaultUri, es);
          }
          debug("Processed root external schemas");
        }
      } else if (rootExternalSchemas) {
        throw new Error("If you set root externalSchema, the applicationUri option is needed");
      }
      return {
        resolve,
        definitions() {
          const defKey = targetCfg[target].def;
          const x = { [defKey]: {} };
          allIds.forEach((json, baseUri) => {
            x[defKey][json[kRefToDef]] = json;
          });
          return x;
        }
      };
      function resolve(rootSchema, opts) {
        const { externalSchemas } = opts || {};
        if (!rootExternalSchemas) {
          allIds.clear();
        }
        allRefs.length = 0;
        if (clone) {
          rootSchema = cloner(rootSchema);
        }
        const appUri = defaultUri || getRootUri(rootSchema.$id);
        debug("Found app URI %o", appUri);
        if (externalSchemas) {
          for (const es of externalSchemas) {
            mapIds(ee, appUri, es);
          }
          debug("Processed external schemas");
        }
        const baseUri = URI.serialize(appUri);
        if (rootSchema.$id) {
          rootSchema.$id = baseUri;
        }
        rootSchema[kIgnore] = true;
        mapIds(ee, appUri, rootSchema);
        debug("Processed root schema");
        debug("Generating %d refs", allRefs.length);
        allRefs.forEach(({ baseUri: baseUri2, ref, refUri, json }) => {
          debug("Evaluating $ref %s", ref);
          if (ref[0] === "#") {
            return;
          }
          const evaluatedJson = allIds.get(baseUri2);
          if (!evaluatedJson) {
            debug("External $ref %s not provided with baseUri %s", ref, baseUri2);
            return;
          }
          evaluatedJson[kConsumed] = true;
          json.$ref = `#/definitions/${evaluatedJson[kRefToDef]}${refUri.fragment || ""}`;
        });
        if (externalSchemas) {
          const defKey = targetCfg[target].def;
          allIds.forEach((json, baseUri2) => {
            if (json[kConsumed] === true) {
              if (!rootSchema[defKey]) {
                rootSchema[defKey] = {};
              }
              rootSchema[defKey][json[kRefToDef]] = json;
            }
          });
        }
        return rootSchema;
      }
      function collectIds(json, baseUri, fragment) {
        if (json[kIgnore]) {
          return;
        }
        const rel = fragment && URI.serialize(fragment) || "";
        const id = URI.serialize(baseUri) + rel;
        if (!allIds.has(id)) {
          debug("Collected $id %s", id);
          json[kRefToDef] = buildLocalReference(json, baseUri, fragment, rolling++);
          allIds.set(id, json);
        } else {
          debug("WARN duplicated id %s .. IGNORED - ", id);
        }
      }
      function collectRefs(json, baseUri, refVal) {
        const refUri = URI.parse(refVal);
        debug("Pre enqueue $ref %o", refUri);
        if (refUri.reference === "relative") {
          refUri.scheme = baseUri.scheme;
          refUri.userinfo = baseUri.userinfo;
          refUri.host = baseUri.host;
          refUri.port = baseUri.port;
          const newBaseUri = Object.assign({}, baseUri);
          newBaseUri.path = refUri.path;
          baseUri = newBaseUri;
        } else if (refUri.reference === "uri" || refUri.reference === "absolute") {
          baseUri = { ...refUri, fragment: void 0 };
        }
        const ref = URI.serialize(refUri);
        allRefs.push({
          baseUri: URI.serialize(baseUri),
          refUri,
          ref,
          json
        });
        debug("Enqueue $ref %s", ref);
      }
    }
    function mapIds(ee, baseUri, json) {
      if (!(json instanceof Object))
        return;
      if (json.$id) {
        const $idUri = URI.parse(json.$id);
        let fragment = null;
        if ($idUri.reference === "absolute") {
          baseUri = $idUri;
        } else if ($idUri.reference === "relative") {
          const newBaseUri = Object.assign({}, baseUri);
          newBaseUri.path = $idUri.path;
          newBaseUri.fragment = $idUri.fragment;
          baseUri = newBaseUri;
        } else {
          fragment = $idUri;
        }
        ee.emit("$id", json, baseUri, fragment);
      }
      const fields = Object.keys(json);
      for (const prop of fields) {
        if (prop === "$ref") {
          ee.emit("$ref", json, baseUri, json[prop]);
        }
        mapIds(ee, baseUri, json[prop]);
      }
    }
    function getRootUri(strUri = "application.uri") {
      const uri = URI.parse(strUri);
      uri.fragment = void 0;
      return uri;
    }
    module.exports = jsonSchemaResolver;
  }
});

// node_modules/@fastify/swagger/lib/util/add-hook.js
var require_add_hook = __commonJS({
  "node_modules/@fastify/swagger/lib/util/add-hook.js"(exports, module) {
    "use strict";
    var Ref = require_ref_resolver();
    var cloner = require_rfdc()({ proto: true, circles: false });
    function addHook(fastify2, pluginOptions) {
      const routes = [];
      const sharedSchemasMap = /* @__PURE__ */ new Map();
      let hookRun = false;
      fastify2.addHook("onRoute", (routeOptions) => {
        const routeConfig = routeOptions.config || {};
        const swaggerConfig = routeConfig.swagger || {};
        if (routeOptions.method === "HEAD" && pluginOptions.exposeHeadRoutes !== true && swaggerConfig.exposeHeadRoute !== true) {
          return;
        }
        if (routeOptions.method === "HEAD" && routeOptions.schema !== void 0 && routeOptions.schema.operationId !== void 0) {
          routes.push(
            // If two routes with operationId are added to the swagger
            // object, it is no longer valid.
            // therefore we suffix the operationId with `-head`.
            Object.assign({}, routeOptions, {
              schema: Object.assign({}, routeOptions.schema, {
                operationId: `${routeOptions.schema.operationId}-head`
              })
            })
          );
          return;
        }
        routes.push(routeOptions);
      });
      fastify2.addHook("onRegister", async (instance) => {
        instance.addHook("onReady", (done) => {
          const allSchemas = instance.getSchemas();
          for (const schemaId of Object.keys(allSchemas)) {
            sharedSchemasMap.set(schemaId, allSchemas[schemaId]);
          }
          done();
        });
      });
      fastify2.addHook("onReady", (done) => {
        hookRun = true;
        const allSchemas = fastify2.getSchemas();
        for (const schemaId of Object.keys(allSchemas)) {
          sharedSchemasMap.set(schemaId, allSchemas[schemaId]);
        }
        done();
      });
      return {
        routes,
        Ref() {
          if (hookRun === false) {
            throw new Error(".swagger() must be called after .ready()");
          }
          const externalSchemas = cloner(Array.from(sharedSchemasMap.values()));
          return Ref(
            Object.assign(
              { applicationUri: "todo.com" },
              pluginOptions.refResolver,
              { clone: true, externalSchemas }
            )
          );
        }
      };
    }
    module.exports = {
      addHook
    };
  }
});

// node_modules/@fastify/swagger/lib/util/should-route-hide.js
var require_should_route_hide = __commonJS({
  "node_modules/@fastify/swagger/lib/util/should-route-hide.js"(exports, module) {
    "use strict";
    function shouldRouteHide(schema, opts) {
      const { hiddenTag, hideUntagged } = opts;
      if (schema && schema.hide) {
        return true;
      }
      const tags = schema && schema.tags || [];
      if (tags.length === 0 && hideUntagged) {
        return true;
      }
      if (tags.includes(hiddenTag)) {
        return schema.tags.includes(hiddenTag);
      }
      return false;
    }
    module.exports = {
      shouldRouteHide
    };
  }
});

// node_modules/@fastify/swagger/lib/util/read-package-json.js
var require_read_package_json = __commonJS({
  "node_modules/@fastify/swagger/lib/util/read-package-json.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path = __require("path");
    function readPackageJson() {
      try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json")));
      } catch (err) {
        return {};
      }
    }
    module.exports = {
      readPackageJson
    };
  }
});

// node_modules/@fastify/swagger/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/@fastify/swagger/lib/symbols.js"(exports, module) {
    "use strict";
    var rawRequired = Symbol("@fastify/swagger.rawRequired");
    module.exports = {
      rawRequired
    };
  }
});

// node_modules/@fastify/swagger/lib/constants.js
var require_constants = __commonJS({
  "node_modules/@fastify/swagger/lib/constants.js"(exports, module) {
    "use strict";
    var xConsume = "x-consume";
    var xResponseDescription = "x-response-description";
    var xExamples = "x-examples";
    module.exports = {
      xConsume,
      xResponseDescription,
      xExamples
    };
  }
});

// node_modules/@fastify/swagger/lib/util/resolve-local-ref.js
var require_resolve_local_ref = __commonJS({
  "node_modules/@fastify/swagger/lib/util/resolve-local-ref.js"(exports, module) {
    "use strict";
    var { rawRequired } = require_symbols();
    var { xConsume } = require_constants();
    function resolveLocalRef(jsonSchema, externalSchemas) {
      if (jsonSchema.type !== void 0 && jsonSchema.properties !== void 0) {
        const propertiesMap = Object.keys(jsonSchema.properties).reduce((acc, headers) => {
          const rewriteProps = {};
          rewriteProps.required = Array.isArray(jsonSchema.required) && jsonSchema.required.indexOf(headers) >= 0 || false;
          if (jsonSchema.properties[headers][xConsume]) {
            rewriteProps[rawRequired] = jsonSchema.properties[headers].required;
          }
          const newProps = Object.assign({}, jsonSchema.properties[headers], rewriteProps);
          return Object.assign({}, acc, { [headers]: newProps });
        }, {});
        return propertiesMap;
      }
      if (jsonSchema.oneOf || jsonSchema.anyOf || jsonSchema.allOf) {
        const schemas = jsonSchema.oneOf || jsonSchema.anyOf || jsonSchema.allOf;
        return schemas.reduce(function(acc, schema) {
          const json = resolveLocalRef(schema, externalSchemas);
          return { ...acc, ...json };
        }, {});
      }
      if (jsonSchema.$ref) {
        const localRef = jsonSchema.$ref.split("/", 3)[2];
        if (externalSchemas[localRef])
          return resolveLocalRef(externalSchemas[localRef], externalSchemas);
        return resolveLocalRef(externalSchemas[jsonSchema.$ref.split("/", 4)[3]], externalSchemas);
      }
      return jsonSchema;
    }
    module.exports = {
      resolveLocalRef
    };
  }
});

// node_modules/@fastify/swagger/lib/util/match-params.js
var require_match_params = __commonJS({
  "node_modules/@fastify/swagger/lib/util/match-params.js"(exports, module) {
    "use strict";
    var paramPattern = /\{[^{}]+\}/gu;
    function hasParams(url) {
      if (!url)
        return false;
      return paramPattern.test(url);
    }
    function matchParams(url) {
      if (!url)
        return [];
      return url.match(paramPattern) || [];
    }
    module.exports = {
      hasParams,
      matchParams
    };
  }
});

// node_modules/@fastify/swagger/lib/util/generate-params-schema.js
var require_generate_params_schema = __commonJS({
  "node_modules/@fastify/swagger/lib/util/generate-params-schema.js"(exports, module) {
    "use strict";
    var { matchParams } = require_match_params();
    var namePattern = /\{([^{}]+)\}/u;
    function paramName(param) {
      return param.replace(namePattern, (_, captured) => captured);
    }
    function generateParamsSchema(url) {
      const params = matchParams(url);
      const schema = {
        params: {
          type: "object",
          properties: {}
        }
      };
      schema.params.properties = params.reduce((acc, param) => {
        const name = paramName(param);
        acc[name] = {
          type: "string"
        };
        return acc;
      }, {});
      return schema;
    }
    module.exports = {
      generateParamsSchema,
      paramName
    };
  }
});

// node_modules/@fastify/swagger/lib/spec/swagger/utils.js
var require_utils = __commonJS({
  "node_modules/@fastify/swagger/lib/spec/swagger/utils.js"(exports, module) {
    "use strict";
    var { readPackageJson } = require_read_package_json();
    var { formatParamUrl } = require_format_param_url();
    var { resolveLocalRef } = require_resolve_local_ref();
    var { xResponseDescription, xConsume } = require_constants();
    var { generateParamsSchema } = require_generate_params_schema();
    var { hasParams } = require_match_params();
    function prepareDefaultOptions(opts) {
      const swagger = opts.swagger;
      const info = swagger.info || null;
      const host = swagger.host || null;
      const schemes = swagger.schemes || null;
      const consumes = swagger.consumes || null;
      const produces = swagger.produces || null;
      const definitions = swagger.definitions || null;
      const paths = swagger.paths || null;
      const basePath = swagger.basePath || null;
      const securityDefinitions = swagger.securityDefinitions || null;
      const security = swagger.security || null;
      const tags = swagger.tags || null;
      const externalDocs = swagger.externalDocs || null;
      const stripBasePath = opts.stripBasePath;
      const transform = opts.transform;
      const transformObject = opts.transformObject;
      const hiddenTag = opts.hiddenTag;
      const hideUntagged = opts.hideUntagged;
      const extensions = [];
      for (const [key, value] of Object.entries(opts.swagger)) {
        if (key.startsWith("x-")) {
          extensions.push([key, value]);
        }
      }
      return {
        info,
        host,
        schemes,
        consumes,
        produces,
        definitions,
        paths,
        basePath,
        securityDefinitions,
        security,
        tags,
        externalDocs,
        stripBasePath,
        transform,
        transformObject,
        hiddenTag,
        extensions,
        hideUntagged
      };
    }
    function prepareSwaggerObject(opts) {
      const pkg = readPackageJson();
      const swaggerObject = {
        swagger: "2.0",
        info: {
          version: pkg.version || "1.0.0",
          title: pkg.name || ""
        },
        definitions: {},
        paths: {}
      };
      if (opts.info)
        swaggerObject.info = opts.info;
      if (opts.host)
        swaggerObject.host = opts.host;
      if (opts.schemes)
        swaggerObject.schemes = opts.schemes;
      if (opts.basePath)
        swaggerObject.basePath = opts.basePath;
      if (opts.consumes)
        swaggerObject.consumes = opts.consumes;
      if (opts.produces)
        swaggerObject.produces = opts.produces;
      if (opts.definitions)
        swaggerObject.definitions = opts.definitions;
      if (opts.paths)
        swaggerObject.paths = opts.paths;
      if (opts.securityDefinitions)
        swaggerObject.securityDefinitions = opts.securityDefinitions;
      if (opts.security)
        swaggerObject.security = opts.security;
      if (opts.tags)
        swaggerObject.tags = opts.tags;
      if (opts.externalDocs)
        swaggerObject.externalDocs = opts.externalDocs;
      for (const [key, value] of opts.extensions) {
        swaggerObject[key] = value;
      }
      return swaggerObject;
    }
    function normalizeUrl(url, basePath, stripBasePath) {
      let path;
      if (stripBasePath && url.startsWith(basePath)) {
        path = url.replace(basePath, "");
      } else {
        path = url;
      }
      if (!path.startsWith("/")) {
        path = "/" + String(path);
      }
      return formatParamUrl(path);
    }
    function plainJsonObjectToSwagger2(container, jsonSchema, externalSchemas, securityIgnores = []) {
      const obj = resolveLocalRef(jsonSchema, externalSchemas);
      let toSwaggerProp;
      switch (container) {
        case "header":
        case "query":
          toSwaggerProp = function(propertyName, jsonSchemaElement) {
            if (jsonSchemaElement[xConsume]) {
              throw new Error('Complex serialization is not supported by Swagger. Remove "' + xConsume + '" for "' + propertyName + '" querystring/header schema or change specification to OpenAPI');
            }
            jsonSchemaElement.in = container;
            jsonSchemaElement.name = propertyName;
            return jsonSchemaElement;
          };
          break;
        case "formData":
          toSwaggerProp = function(propertyName, jsonSchemaElement) {
            delete jsonSchemaElement.$id;
            jsonSchemaElement.in = container;
            jsonSchemaElement.name = propertyName;
            if (jsonSchemaElement.contentEncoding === "binary") {
              delete jsonSchemaElement.contentEncoding;
              jsonSchemaElement.type = "file";
            }
            return jsonSchemaElement;
          };
          break;
        case "path":
          toSwaggerProp = function(propertyName, jsonSchemaElement) {
            jsonSchemaElement.in = container;
            jsonSchemaElement.name = propertyName;
            jsonSchemaElement.required = true;
            return jsonSchemaElement;
          };
          break;
      }
      return Object.keys(obj).filter((propKey) => !securityIgnores.includes(propKey)).map((propKey) => {
        return toSwaggerProp(propKey, obj[propKey]);
      });
    }
    function replaceUnsupported(jsonSchema) {
      if (typeof jsonSchema === "object" && jsonSchema !== null) {
        if (jsonSchema.patternProperties) {
          jsonSchema.additionalProperties = { type: "string" };
          delete jsonSchema.patternProperties;
        } else if (jsonSchema.const !== void 0) {
          jsonSchema.enum = [jsonSchema.const];
          delete jsonSchema.const;
        }
        Object.keys(jsonSchema).forEach(function(key) {
          jsonSchema[key] = replaceUnsupported(jsonSchema[key]);
        });
      }
      return jsonSchema;
    }
    function isConsumesFormOnly(schema) {
      const consumes = schema.consumes;
      return consumes && consumes.length === 1 && (consumes[0] === "application/x-www-form-urlencoded" || consumes[0] === "multipart/form-data");
    }
    function resolveBodyParams(parameters, schema, ref) {
      const resolved = ref.resolve(schema);
      replaceUnsupported(resolved);
      parameters.push({
        name: "body",
        in: "body",
        description: resolved && resolved.description ? resolved.description : void 0,
        schema: resolved
      });
    }
    function resolveCommonParams(container, parameters, schema, ref, sharedSchemas, securityIgnores) {
      const resolved = ref.resolve(schema);
      const arr = plainJsonObjectToSwagger2(container, resolved, sharedSchemas, securityIgnores);
      arr.forEach((swaggerSchema) => parameters.push(swaggerSchema));
    }
    function resolveResponse(fastifyResponseJson, ref) {
      if (!fastifyResponseJson) {
        return { 200: { description: "Default Response" } };
      }
      const responsesContainer = {};
      const statusCodes = Object.keys(fastifyResponseJson);
      statusCodes.forEach((statusCode) => {
        const rawJsonSchema = fastifyResponseJson[statusCode];
        const resolved = ref.resolve(rawJsonSchema);
        delete resolved.$schema;
        const deXXStatusCode = statusCode.toUpperCase().replace("XX", "00");
        if (statusCode.toUpperCase().includes("XX") && statusCodes.includes(deXXStatusCode)) {
          return;
        }
        if (statusCode !== "default") {
          statusCode = deXXStatusCode;
        }
        const response = {
          description: rawJsonSchema[xResponseDescription] || rawJsonSchema.description || "Default Response"
        };
        if (rawJsonSchema.headers) {
          response.headers = rawJsonSchema.headers;
          delete resolved.headers;
        }
        if (rawJsonSchema.type !== "null") {
          const schema = { ...resolved };
          replaceUnsupported(schema);
          delete schema[xResponseDescription];
          response.schema = schema;
        }
        responsesContainer[statusCode] = response;
      });
      return responsesContainer;
    }
    function prepareSwaggerMethod(schema, ref, swaggerObject, url) {
      const swaggerMethod = {};
      const parameters = [];
      const securityIgnores = [
        ...swaggerObject && swaggerObject.security ? swaggerObject.security : [],
        ...schema && schema.security ? schema.security : []
      ].reduce((acc, securitySchemeGroup) => {
        Object.keys(securitySchemeGroup).forEach((securitySchemeLabel) => {
          const { name, in: category } = swaggerObject.securityDefinitions[securitySchemeLabel];
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(name);
        });
        return acc;
      }, {});
      if (schema) {
        if (schema.operationId)
          swaggerMethod.operationId = schema.operationId;
        if (schema.summary)
          swaggerMethod.summary = schema.summary;
        if (schema.description)
          swaggerMethod.description = schema.description;
        if (schema.externalDocs)
          swaggerMethod.externalDocs = schema.externalDocs;
        if (schema.tags)
          swaggerMethod.tags = schema.tags;
        if (schema.produces)
          swaggerMethod.produces = schema.produces;
        if (schema.consumes)
          swaggerMethod.consumes = schema.consumes;
        if (schema.querystring)
          resolveCommonParams("query", parameters, schema.querystring, ref, swaggerObject.definitions, securityIgnores.query);
        if (schema.body) {
          const isConsumesAllFormOnly = isConsumesFormOnly(schema) || isConsumesFormOnly(swaggerObject);
          isConsumesAllFormOnly ? resolveCommonParams("formData", parameters, schema.body, ref, swaggerObject.definitions) : resolveBodyParams(parameters, schema.body, ref);
        }
        if (schema.params)
          resolveCommonParams("path", parameters, schema.params, ref, swaggerObject.definitions);
        if (schema.headers)
          resolveCommonParams("header", parameters, schema.headers, ref, swaggerObject.definitions, securityIgnores.header);
        if (parameters.length > 0)
          swaggerMethod.parameters = parameters;
        if (schema.deprecated)
          swaggerMethod.deprecated = schema.deprecated;
        if (schema.security)
          swaggerMethod.security = schema.security;
        for (const key of Object.keys(schema)) {
          if (key.startsWith("x-")) {
            swaggerMethod[key] = schema[key];
          }
        }
      }
      if ((!schema || !schema.params) && hasParams(url)) {
        const schemaGenerated = generateParamsSchema(url);
        resolveCommonParams("path", parameters, schemaGenerated.params, ref, swaggerObject.definitions);
        swaggerMethod.parameters = parameters;
      }
      swaggerMethod.responses = resolveResponse(schema ? schema.response : null, ref);
      return swaggerMethod;
    }
    function prepareSwaggerDefinitions(definitions, ref) {
      return Object.entries(definitions).reduce((res, [name, definition]) => {
        const _ = { ...definition };
        const resolved = ref.resolve(_, { externalSchemas: [definitions] });
        delete resolved.$id;
        delete resolved.definitions;
        res[name] = resolved;
        return res;
      }, {});
    }
    module.exports = {
      prepareDefaultOptions,
      prepareSwaggerObject,
      prepareSwaggerMethod,
      normalizeUrl,
      prepareSwaggerDefinitions
    };
  }
});

// node_modules/@fastify/swagger/lib/spec/swagger/index.js
var require_swagger = __commonJS({
  "node_modules/@fastify/swagger/lib/spec/swagger/index.js"(exports, module) {
    "use strict";
    var yaml = require_dist();
    var { shouldRouteHide } = require_should_route_hide();
    var { prepareDefaultOptions, prepareSwaggerObject, prepareSwaggerMethod, normalizeUrl, prepareSwaggerDefinitions } = require_utils();
    module.exports = function(opts, cache, routes, Ref, done) {
      let ref;
      const defOpts = prepareDefaultOptions(opts);
      return function(opts2) {
        if (opts2 && opts2.yaml) {
          if (cache.string)
            return cache.string;
        } else {
          if (cache.object)
            return cache.object;
        }
        const swaggerObject = prepareSwaggerObject(defOpts, done);
        ref = Ref();
        swaggerObject.definitions = prepareSwaggerDefinitions({
          ...swaggerObject.definitions,
          ...ref.definitions().definitions
        }, ref);
        for (const route of routes) {
          const transformResult = route.config?.swaggerTransform !== void 0 ? route.config.swaggerTransform ? route.config.swaggerTransform({ schema: route.schema, url: route.url, route, swaggerObject }) : {} : defOpts.transform ? defOpts.transform({ schema: route.schema, url: route.url, route, swaggerObject }) : {};
          const schema = transformResult.schema || route.schema;
          const shouldRouteHideOpts = {
            hiddenTag: defOpts.hiddenTag,
            hideUntagged: defOpts.hideUntagged
          };
          if (shouldRouteHide(schema, shouldRouteHideOpts))
            continue;
          let url = transformResult.url || route.url;
          url = normalizeUrl(url, defOpts.basePath, defOpts.stripBasePath);
          const swaggerRoute = Object.assign({}, swaggerObject.paths[url]);
          const swaggerMethod = prepareSwaggerMethod(schema, ref, swaggerObject, url);
          if (route.links) {
            throw new Error("Swagger (Open API v2) does not support Links. Upgrade to OpenAPI v3 (see @fastify/swagger readme)");
          }
          const methods = typeof route.method === "string" ? [route.method] : route.method;
          for (const method of methods) {
            swaggerRoute[method.toLowerCase()] = swaggerMethod;
          }
          swaggerObject.paths[url] = swaggerRoute;
        }
        const transformObjectResult = defOpts.transformObject ? defOpts.transformObject({ swaggerObject }) : swaggerObject;
        if (opts2 && opts2.yaml) {
          cache.string = yaml.stringify(transformObjectResult, { strict: false });
          return cache.string;
        }
        cache.object = transformObjectResult;
        return cache.object;
      };
    };
  }
});

// node_modules/@fastify/swagger/lib/spec/openapi/utils.js
var require_utils2 = __commonJS({
  "node_modules/@fastify/swagger/lib/spec/openapi/utils.js"(exports, module) {
    "use strict";
    var { readPackageJson } = require_read_package_json();
    var { formatParamUrl } = require_format_param_url();
    var { resolveLocalRef } = require_resolve_local_ref();
    var { xResponseDescription, xConsume, xExamples } = require_constants();
    var { rawRequired } = require_symbols();
    var { generateParamsSchema } = require_generate_params_schema();
    var { hasParams } = require_match_params();
    function prepareDefaultOptions(opts) {
      const openapi = opts.openapi;
      const info = openapi.info || null;
      const servers = openapi.servers || null;
      const components = openapi.components || null;
      const security = openapi.security || null;
      const tags = openapi.tags || null;
      const externalDocs = openapi.externalDocs || null;
      const stripBasePath = opts.stripBasePath;
      const transform = opts.transform;
      const transformObject = opts.transformObject;
      const hiddenTag = opts.hiddenTag;
      const hideUntagged = opts.hideUntagged;
      const extensions = [];
      for (const [key, value] of Object.entries(opts.openapi)) {
        if (key.startsWith("x-")) {
          extensions.push([key, value]);
        }
      }
      return {
        ...openapi,
        info,
        servers,
        components,
        security,
        tags,
        externalDocs,
        stripBasePath,
        transform,
        transformObject,
        hiddenTag,
        extensions,
        hideUntagged
      };
    }
    function prepareOpenapiObject(opts) {
      const pkg = readPackageJson();
      const openapiObject = {
        openapi: "3.0.3",
        info: {
          version: pkg.version || "1.0.0",
          title: pkg.name || ""
        },
        components: { schemas: {} },
        paths: {}
      };
      if (opts.openapi)
        openapiObject.openapi = opts.openapi;
      if (opts.info)
        openapiObject.info = opts.info;
      if (opts.servers)
        openapiObject.servers = opts.servers;
      if (opts.components)
        openapiObject.components = Object.assign({}, opts.components, { schemas: Object.assign({}, opts.components.schemas) });
      if (opts.paths)
        openapiObject.paths = opts.paths;
      if (opts.webhooks)
        openapiObject.webhooks = opts.webhooks;
      if (opts.security)
        openapiObject.security = opts.security;
      if (opts.tags)
        openapiObject.tags = opts.tags;
      if (opts.externalDocs)
        openapiObject.externalDocs = opts.externalDocs;
      for (const [key, value] of opts.extensions) {
        openapiObject[key] = value;
      }
      return openapiObject;
    }
    function normalizeUrl(url, serverUrls, stripBasePath) {
      if (!stripBasePath)
        return formatParamUrl(url);
      serverUrls.forEach(function(serverUrl) {
        const basePath = serverUrl.startsWith("/") ? serverUrl : new URL(serverUrl).pathname;
        if (url.startsWith(basePath) && basePath !== "/") {
          url = url.replace(basePath, "");
        }
      });
      return formatParamUrl(url);
    }
    function resolveServerUrls(servers) {
      const resolvedUrls = [];
      const findVariablesRegex = /\{([^{}]+)\}/gu;
      servers = Array.isArray(servers) ? servers : [];
      for (const server of servers) {
        const originalUrl = server.url;
        const variables = server.variables;
        let url = originalUrl;
        const matches = url.matchAll(findVariablesRegex);
        for (const [nameInBrackets, name] of matches) {
          const value = variables?.[name]?.default;
          if (value === void 0) {
            throw new Error(`Server URL ${originalUrl} could not be resolved. Make sure to provide a default value for each URL variable.`);
          }
          url = url.replace(nameInBrackets, value);
        }
        resolvedUrls.push(url);
      }
      return resolvedUrls;
    }
    function transformDefsToComponents(jsonSchema) {
      if (typeof jsonSchema === "object" && jsonSchema !== null) {
        if (jsonSchema.patternProperties) {
          jsonSchema.additionalProperties = Object.values(jsonSchema.patternProperties)[0];
          delete jsonSchema.patternProperties;
        } else if (jsonSchema.const !== void 0) {
          jsonSchema.enum = [jsonSchema.const];
          delete jsonSchema.const;
        }
        Object.keys(jsonSchema).forEach(function(key) {
          if (key === "properties") {
            Object.keys(jsonSchema[key]).forEach(function(prop) {
              jsonSchema[key][prop] = transformDefsToComponents(jsonSchema[key][prop]);
            });
          } else if (key === "$ref") {
            jsonSchema[key] = jsonSchema[key].replace("definitions", "components/schemas");
          } else if (key === "$id" || key === "$schema") {
            delete jsonSchema[key];
          } else {
            jsonSchema[key] = transformDefsToComponents(jsonSchema[key]);
          }
        });
      }
      return jsonSchema;
    }
    function convertExamplesArrayToObject(examples) {
      return examples.reduce((examplesObject, example, index) => {
        if (typeof example === "object") {
          examplesObject["example" + (index + 1)] = { value: example };
        } else {
          examplesObject[example] = { value: example };
        }
        return examplesObject;
      }, {});
    }
    function plainJsonObjectToOpenapi3(container, jsonSchema, externalSchemas, securityIgnores = []) {
      const obj = transformDefsToComponents(resolveLocalRef(jsonSchema, externalSchemas));
      let toOpenapiProp;
      switch (container) {
        case "cookie":
        case "header":
        case "query":
          toOpenapiProp = function(propertyName, jsonSchemaElement) {
            let result = {
              in: container,
              name: propertyName,
              required: jsonSchemaElement.required
            };
            const media = schemaToMedia(jsonSchemaElement);
            if (jsonSchemaElement[xConsume]) {
              media.schema.required = jsonSchemaElement[rawRequired];
              result.content = {
                [jsonSchemaElement[xConsume]]: media
              };
              delete result.content[jsonSchemaElement[xConsume]].schema[xConsume];
            } else {
              result = { ...media, ...result };
            }
            if (jsonSchemaElement.description)
              result.description = jsonSchemaElement.description;
            if (jsonSchema.style)
              result.style = jsonSchema.style;
            if (jsonSchema.explode != null)
              result.explode = jsonSchema.explode;
            if (jsonSchema.allowReserved === true && container === "query") {
              result.allowReserved = jsonSchema.allowReserved;
            }
            return result;
          };
          break;
        case "path":
          toOpenapiProp = function(propertyName, jsonSchemaElement) {
            const media = schemaToMedia(jsonSchemaElement);
            const result = {
              ...media,
              in: container,
              name: propertyName,
              required: true
            };
            if (jsonSchemaElement.description)
              result.description = jsonSchemaElement.description;
            return result;
          };
          break;
      }
      return Object.keys(obj).filter((propKey) => !securityIgnores.includes(propKey)).map((propKey) => {
        const jsonSchema2 = toOpenapiProp(propKey, obj[propKey]);
        if (jsonSchema2.schema) {
          if (jsonSchema2.schema.required !== void 0)
            delete jsonSchema2.schema.required;
          if (jsonSchema2.schema.description !== void 0)
            delete jsonSchema2.schema.description;
        }
        return jsonSchema2;
      });
    }
    var schemaTypeToNestedSchemas = {
      object: (schema) => {
        return [
          ...Object.values(schema.properties || {}),
          ...Object.values(schema.patternProperties || {}),
          ...Object.values(schema.additionalProperties || {})
        ];
      },
      array: (schema) => {
        return [
          ...schema.items ? [schema.items] : [],
          ...schema.contains ? [schema.contains] : []
        ];
      }
    };
    function resolveSchemaExamples(schema) {
      const example = schema[xExamples] ?? schema.examples?.[0];
      if (typeof example !== "undefined") {
        schema.example = example;
      }
      delete schema[xExamples];
      delete schema.examples;
    }
    function resolveSchemaExamplesRecursive(schema) {
      resolveSchemaExamples(schema);
      const getNestedSchemas = schemaTypeToNestedSchemas[schema.type];
      const nestedSchemas = getNestedSchemas?.(schema) ?? [];
      for (const nestedSchema of nestedSchemas) {
        resolveSchemaExamplesRecursive(nestedSchema);
      }
    }
    function schemaToMedia(schema) {
      const media = { schema };
      if (schema.examples?.length === 1) {
        media.example = schema.examples[0];
        delete schema.examples;
      } else if (schema.examples?.length > 1) {
        media.examples = convertExamplesArrayToObject(schema.examples);
        delete schema.examples;
      }
      if (schema[xExamples]) {
        media.examples = schema[xExamples];
        delete schema[xExamples];
      }
      return media;
    }
    function schemaToMediaRecursive(schema) {
      const media = schemaToMedia(schema);
      resolveSchemaExamplesRecursive(schema);
      return media;
    }
    function resolveBodyParams(body, schema, consumes, ref) {
      const resolved = transformDefsToComponents(ref.resolve(schema));
      if (Array.isArray(consumes) && consumes.length === 0 || consumes === void 0) {
        consumes = ["application/json"];
      }
      const media = schemaToMediaRecursive(resolved);
      consumes.forEach((consume) => {
        body.content[consume] = media;
      });
      if (resolved && resolved.required && resolved.required.length) {
        body.required = true;
      }
      if (resolved && resolved.description) {
        body.description = resolved.description;
      }
    }
    function resolveCommonParams(container, parameters, schema, ref, sharedSchemas, securityIgnores) {
      const schemasPath = "#/components/schemas/";
      let resolved = transformDefsToComponents(ref.resolve(schema));
      if (resolved.$ref && resolved.$ref.startsWith(schemasPath)) {
        const parts = resolved.$ref.split(schemasPath);
        const pathParts = parts[1].split("/");
        resolved = pathParts.reduce((resolved2, pathPart) => resolved2[pathPart], ref.definitions().definitions);
      }
      const arr = plainJsonObjectToOpenapi3(container, resolved, { ...sharedSchemas, ...ref.definitions().definitions }, securityIgnores);
      arr.forEach((swaggerSchema) => parameters.push(swaggerSchema));
    }
    function resolveResponse(fastifyResponseJson, produces, ref) {
      if (!fastifyResponseJson) {
        return { 200: { description: "Default Response" } };
      }
      const responsesContainer = {};
      const statusCodes = Object.keys(fastifyResponseJson);
      statusCodes.forEach((statusCode) => {
        const rawJsonSchema = fastifyResponseJson[statusCode];
        const resolved = transformDefsToComponents(ref.resolve(rawJsonSchema));
        if (statusCode !== "default") {
          statusCode = statusCode.toUpperCase();
        }
        const response = {
          description: resolved[xResponseDescription] || rawJsonSchema.description || "Default Response"
        };
        if (rawJsonSchema.headers) {
          response.headers = {};
          Object.keys(rawJsonSchema.headers).forEach(function(key) {
            const header = {
              schema: rawJsonSchema.headers[key]
            };
            if (rawJsonSchema.headers[key].description) {
              header.description = rawJsonSchema.headers[key].description;
              delete header.schema.description;
            }
            response.headers[key] = header;
          });
          delete resolved.headers;
        }
        if (rawJsonSchema.type !== "null") {
          if (resolved.content && resolved.content[Object.keys(resolved.content)[0]].schema) {
            response.content = resolved.content;
          } else {
            const content = {};
            if (Array.isArray(produces) && produces.length === 0 || produces === void 0) {
              produces = ["application/json"];
            }
            delete resolved[xResponseDescription];
            const media = schemaToMediaRecursive(resolved);
            for (const produce of produces) {
              content[produce] = media;
            }
            response.content = content;
          }
        }
        responsesContainer[statusCode] = response;
      });
      return responsesContainer;
    }
    function prepareOpenapiMethod(schema, ref, openapiObject, url) {
      const openapiMethod = {};
      const parameters = [];
      const securityIgnores = [
        ...openapiObject && openapiObject.security ? openapiObject.security : [],
        ...schema && schema.security ? schema.security : []
      ].reduce((acc, securitySchemeGroup) => {
        Object.keys(securitySchemeGroup).forEach((securitySchemeLabel) => {
          const scheme = openapiObject.components.securitySchemes[securitySchemeLabel];
          const isBearer = scheme.type === "http" && scheme.scheme === "bearer";
          const category = isBearer ? "header" : scheme.in;
          const name = isBearer ? "authorization" : scheme.name;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(name);
        });
        return acc;
      }, {});
      if (schema) {
        if (schema.operationId)
          openapiMethod.operationId = schema.operationId;
        if (schema.summary)
          openapiMethod.summary = schema.summary;
        if (schema.tags)
          openapiMethod.tags = schema.tags;
        if (schema.description)
          openapiMethod.description = schema.description;
        if (schema.externalDocs)
          openapiMethod.externalDocs = schema.externalDocs;
        if (schema.querystring)
          resolveCommonParams("query", parameters, schema.querystring, ref, openapiObject.definitions, securityIgnores.query);
        if (schema.body) {
          openapiMethod.requestBody = { content: {} };
          resolveBodyParams(openapiMethod.requestBody, schema.body, schema.consumes, ref);
        }
        if (schema.params)
          resolveCommonParams("path", parameters, schema.params, ref, openapiObject.definitions);
        if (schema.headers)
          resolveCommonParams("header", parameters, schema.headers, ref, openapiObject.definitions, securityIgnores.header);
        if (schema.cookies)
          resolveCommonParams("cookie", parameters, schema.cookies, ref, openapiObject.definitions, securityIgnores.cookie);
        if (parameters.length > 0)
          openapiMethod.parameters = parameters;
        if (schema.deprecated)
          openapiMethod.deprecated = schema.deprecated;
        if (schema.security)
          openapiMethod.security = schema.security;
        if (schema.servers)
          openapiMethod.servers = schema.servers;
        for (const key of Object.keys(schema)) {
          if (key.startsWith("x-")) {
            openapiMethod[key] = schema[key];
          }
        }
      }
      if ((!schema || !schema.params) && hasParams(url)) {
        const schemaGenerated = generateParamsSchema(url);
        resolveCommonParams("path", parameters, schemaGenerated.params, ref, openapiObject.definitions);
        openapiMethod.parameters = parameters;
      }
      openapiMethod.responses = resolveResponse(schema ? schema.response : null, schema ? schema.produces : null, ref);
      return openapiMethod;
    }
    function prepareOpenapiSchemas(schemas, ref) {
      return Object.entries(schemas).reduce((res, [name, schema]) => {
        const _ = { ...schema };
        const resolved = transformDefsToComponents(ref.resolve(_, { externalSchemas: [schemas] }));
        delete resolved.$id;
        delete resolved.definitions;
        res[name] = resolved;
        return res;
      }, {});
    }
    module.exports = {
      prepareDefaultOptions,
      prepareOpenapiObject,
      prepareOpenapiMethod,
      prepareOpenapiSchemas,
      resolveServerUrls,
      normalizeUrl
    };
  }
});

// node_modules/@fastify/swagger/lib/spec/openapi/index.js
var require_openapi = __commonJS({
  "node_modules/@fastify/swagger/lib/spec/openapi/index.js"(exports, module) {
    "use strict";
    var yaml = require_dist();
    var { shouldRouteHide } = require_should_route_hide();
    var { prepareDefaultOptions, prepareOpenapiObject, prepareOpenapiMethod, prepareOpenapiSchemas, normalizeUrl, resolveServerUrls } = require_utils2();
    module.exports = function(opts, cache, routes, Ref, done) {
      let ref;
      const defOpts = prepareDefaultOptions(opts);
      return function(opts2) {
        if (opts2 && opts2.yaml) {
          if (cache.string)
            return cache.string;
        } else {
          if (cache.object)
            return cache.object;
        }
        const openapiObject = prepareOpenapiObject(defOpts, done);
        ref = Ref();
        openapiObject.components.schemas = prepareOpenapiSchemas({
          ...openapiObject.components.schemas,
          ...ref.definitions().definitions
        }, ref);
        const serverUrls = resolveServerUrls(defOpts.servers);
        for (const route of routes) {
          const transformResult = route.config?.swaggerTransform !== void 0 ? route.config.swaggerTransform ? route.config.swaggerTransform({ schema: route.schema, url: route.url, route, openapiObject }) : {} : defOpts.transform ? defOpts.transform({ schema: route.schema, url: route.url, route, openapiObject }) : {};
          const schema = transformResult.schema || route.schema;
          const shouldRouteHideOpts = {
            hiddenTag: defOpts.hiddenTag,
            hideUntagged: defOpts.hideUntagged
          };
          if (shouldRouteHide(schema, shouldRouteHideOpts))
            continue;
          let url = transformResult.url || route.url;
          url = normalizeUrl(url, serverUrls, defOpts.stripBasePath);
          const openapiRoute = Object.assign({}, openapiObject.paths[url]);
          const openapiMethod = prepareOpenapiMethod(schema, ref, openapiObject, url);
          if (route.links) {
            for (const statusCode of Object.keys(route.links)) {
              if (!openapiMethod.responses[statusCode]) {
                throw new Error(`missing status code ${statusCode} in route ${route.path}`);
              }
              openapiMethod.responses[statusCode].links = route.links[statusCode];
            }
          }
          const methods = typeof route.method === "string" ? [route.method] : route.method;
          for (const method of methods) {
            openapiRoute[method.toLowerCase()] = openapiMethod;
          }
          openapiObject.paths[url] = openapiRoute;
        }
        const transformObjectResult = defOpts.transformObject ? defOpts.transformObject({ openapiObject }) : openapiObject;
        if (opts2 && opts2.yaml) {
          cache.string = yaml.stringify(transformObjectResult, { strict: false });
          return cache.string;
        }
        cache.object = transformObjectResult;
        return cache.object;
      };
    };
  }
});

// node_modules/@fastify/swagger/lib/util/resolve-swagger-function.js
var require_resolve_swagger_function = __commonJS({
  "node_modules/@fastify/swagger/lib/util/resolve-swagger-function.js"(exports, module) {
    "use strict";
    function resolveSwaggerFunction(opts, cache, routes, Ref, done) {
      if (opts.openapi === void 0 || opts.openapi === null) {
        return require_swagger()(opts, cache, routes, Ref, done);
      } else {
        return require_openapi()(opts, cache, routes, Ref, done);
      }
    }
    module.exports = {
      resolveSwaggerFunction
    };
  }
});

// node_modules/@fastify/swagger/lib/mode/dynamic.js
var require_dynamic = __commonJS({
  "node_modules/@fastify/swagger/lib/mode/dynamic.js"(exports, module) {
    "use strict";
    var { addHook } = require_add_hook();
    var { resolveSwaggerFunction } = require_resolve_swagger_function();
    module.exports = function(fastify2, opts, done) {
      opts = Object.assign({}, {
        exposeRoute: false,
        hiddenTag: "X-HIDDEN",
        hideUntagged: false,
        stripBasePath: true,
        openapi: null,
        swagger: {},
        transform: null,
        transformObject: null,
        refResolver: {
          buildLocalReference(json, baseUri, fragment, i) {
            if (!json.title && json.$id) {
              json.title = json.$id;
            }
            return `def-${i}`;
          }
        }
      }, opts);
      const { routes, Ref } = addHook(fastify2, opts);
      const cache = {
        object: null,
        string: null
      };
      const swagger = resolveSwaggerFunction(opts, cache, routes, Ref, done);
      fastify2.decorate("swagger", swagger);
      done();
    };
  }
});

// node_modules/@fastify/swagger/index.js
var require_swagger2 = __commonJS({
  "node_modules/@fastify/swagger/index.js"(exports, module) {
    "use strict";
    var fp = require_plugin();
    var { formatParamUrl } = require_format_param_url();
    function fastifySwagger2(fastify2, opts, next) {
      opts.mode = opts.mode || "dynamic";
      switch (opts.mode) {
        case "static": {
          const setup = require_static();
          setup(fastify2, opts, next);
          break;
        }
        case "dynamic": {
          const setup = require_dynamic();
          setup(fastify2, opts, next);
          break;
        }
        default: {
          return next(new Error("unsupported mode, should be one of ['static', 'dynamic']"));
        }
      }
    }
    module.exports = fp(fastifySwagger2, {
      fastify: "4.x",
      name: "@fastify/swagger"
    });
    module.exports.fastifySwagger = fastifySwagger2;
    module.exports.default = fastifySwagger2;
    module.exports.formatParamUrl = formatParamUrl;
  }
});

// node_modules/@fastify/swagger-ui/static/csp.json
var require_csp = __commonJS({
  "node_modules/@fastify/swagger-ui/static/csp.json"(exports, module) {
    module.exports = { script: [], style: [] };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module) {
    "use strict";
    module.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        if (a === b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module) {
    "use strict";
    var balanced = require_balanced_match();
    module.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m)
        return [str];
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      if (/\$$/.test(m.pre)) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + "{" + m.body + "}" + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
          if (m.post.match(/,.*\}/)) {
            str = m.pre + "{" + m.body + escClose + m.post;
            return expand(str);
          }
          return [str];
        }
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            n = expand(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
        var N;
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length);
          var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
          N = [];
          for (var i = x; test(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === "\\")
                c = "";
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join("0");
                  if (i < 0)
                    c = "-" + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand(n[j], false));
          }
        }
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
      return expansions;
    }
  }
});

// node_modules/minimatch/dist/commonjs/assert-valid-pattern.js
var require_assert_valid_pattern = __commonJS({
  "node_modules/minimatch/dist/commonjs/assert-valid-pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertValidPattern = void 0;
    var MAX_PATTERN_LENGTH = 1024 * 64;
    var assertValidPattern = (pattern) => {
      if (typeof pattern !== "string") {
        throw new TypeError("invalid pattern");
      }
      if (pattern.length > MAX_PATTERN_LENGTH) {
        throw new TypeError("pattern is too long");
      }
    };
    exports.assertValidPattern = assertValidPattern;
  }
});

// node_modules/minimatch/dist/commonjs/brace-expressions.js
var require_brace_expressions = __commonJS({
  "node_modules/minimatch/dist/commonjs/brace-expressions.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseClass = void 0;
    var posixClasses = {
      "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true],
      "[:alpha:]": ["\\p{L}\\p{Nl}", true],
      "[:ascii:]": ["\\x00-\\x7f", false],
      "[:blank:]": ["\\p{Zs}\\t", true],
      "[:cntrl:]": ["\\p{Cc}", true],
      "[:digit:]": ["\\p{Nd}", true],
      "[:graph:]": ["\\p{Z}\\p{C}", true, true],
      "[:lower:]": ["\\p{Ll}", true],
      "[:print:]": ["\\p{C}", true],
      "[:punct:]": ["\\p{P}", true],
      "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true],
      "[:upper:]": ["\\p{Lu}", true],
      "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true],
      "[:xdigit:]": ["A-Fa-f0-9", false]
    };
    var braceEscape = (s) => s.replace(/[[\]\\-]/g, "\\$&");
    var regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var rangesToString = (ranges) => ranges.join("");
    var parseClass = (glob, position) => {
      const pos = position;
      if (glob.charAt(pos) !== "[") {
        throw new Error("not in a brace expression");
      }
      const ranges = [];
      const negs = [];
      let i = pos + 1;
      let sawStart = false;
      let uflag = false;
      let escaping = false;
      let negate = false;
      let endPos = pos;
      let rangeStart = "";
      WHILE:
        while (i < glob.length) {
          const c = glob.charAt(i);
          if ((c === "!" || c === "^") && i === pos + 1) {
            negate = true;
            i++;
            continue;
          }
          if (c === "]" && sawStart && !escaping) {
            endPos = i + 1;
            break;
          }
          sawStart = true;
          if (c === "\\") {
            if (!escaping) {
              escaping = true;
              i++;
              continue;
            }
          }
          if (c === "[" && !escaping) {
            for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
              if (glob.startsWith(cls, i)) {
                if (rangeStart) {
                  return ["$.", false, glob.length - pos, true];
                }
                i += cls.length;
                if (neg)
                  negs.push(unip);
                else
                  ranges.push(unip);
                uflag = uflag || u;
                continue WHILE;
              }
            }
          }
          escaping = false;
          if (rangeStart) {
            if (c > rangeStart) {
              ranges.push(braceEscape(rangeStart) + "-" + braceEscape(c));
            } else if (c === rangeStart) {
              ranges.push(braceEscape(c));
            }
            rangeStart = "";
            i++;
            continue;
          }
          if (glob.startsWith("-]", i + 1)) {
            ranges.push(braceEscape(c + "-"));
            i += 2;
            continue;
          }
          if (glob.startsWith("-", i + 1)) {
            rangeStart = c;
            i += 2;
            continue;
          }
          ranges.push(braceEscape(c));
          i++;
        }
      if (endPos < i) {
        return ["", false, 0, false];
      }
      if (!ranges.length && !negs.length) {
        return ["$.", false, glob.length - pos, true];
      }
      if (negs.length === 0 && ranges.length === 1 && /^\\?.$/.test(ranges[0]) && !negate) {
        const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
        return [regexpEscape(r), false, endPos - pos, false];
      }
      const sranges = "[" + (negate ? "^" : "") + rangesToString(ranges) + "]";
      const snegs = "[" + (negate ? "" : "^") + rangesToString(negs) + "]";
      const comb = ranges.length && negs.length ? "(" + sranges + "|" + snegs + ")" : ranges.length ? sranges : snegs;
      return [comb, uflag, endPos - pos, true];
    };
    exports.parseClass = parseClass;
  }
});

// node_modules/minimatch/dist/commonjs/unescape.js
var require_unescape = __commonJS({
  "node_modules/minimatch/dist/commonjs/unescape.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unescape = void 0;
    var unescape = (s, { windowsPathsNoEscape = false } = {}) => {
      return windowsPathsNoEscape ? s.replace(/\[([^\/\\])\]/g, "$1") : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
    };
    exports.unescape = unescape;
  }
});

// node_modules/minimatch/dist/commonjs/ast.js
var require_ast = __commonJS({
  "node_modules/minimatch/dist/commonjs/ast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AST = void 0;
    var brace_expressions_js_1 = require_brace_expressions();
    var unescape_js_1 = require_unescape();
    var types = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]);
    var isExtglobType = (c) => types.has(c);
    var startNoTraversal = "(?!(?:^|/)\\.\\.?(?:$|/))";
    var startNoDot = "(?!\\.)";
    var addPatternStart = /* @__PURE__ */ new Set(["[", "."]);
    var justDots = /* @__PURE__ */ new Set(["..", "."]);
    var reSpecials = new Set("().*{}+?[]^$\\!");
    var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var qmark = "[^/]";
    var star = qmark + "*?";
    var starNoEmpty = qmark + "+?";
    var AST = class _AST {
      type;
      #root;
      #hasMagic;
      #uflag = false;
      #parts = [];
      #parent;
      #parentIndex;
      #negs;
      #filledNegs = false;
      #options;
      #toString;
      // set to true if it's an extglob with no children
      // (which really means one child of '')
      #emptyExt = false;
      constructor(type, parent, options = {}) {
        this.type = type;
        if (type)
          this.#hasMagic = true;
        this.#parent = parent;
        this.#root = this.#parent ? this.#parent.#root : this;
        this.#options = this.#root === this ? options : this.#root.#options;
        this.#negs = this.#root === this ? [] : this.#root.#negs;
        if (type === "!" && !this.#root.#filledNegs)
          this.#negs.push(this);
        this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
      }
      get hasMagic() {
        if (this.#hasMagic !== void 0)
          return this.#hasMagic;
        for (const p of this.#parts) {
          if (typeof p === "string")
            continue;
          if (p.type || p.hasMagic)
            return this.#hasMagic = true;
        }
        return this.#hasMagic;
      }
      // reconstructs the pattern
      toString() {
        if (this.#toString !== void 0)
          return this.#toString;
        if (!this.type) {
          return this.#toString = this.#parts.map((p) => String(p)).join("");
        } else {
          return this.#toString = this.type + "(" + this.#parts.map((p) => String(p)).join("|") + ")";
        }
      }
      #fillNegs() {
        if (this !== this.#root)
          throw new Error("should only call on root");
        if (this.#filledNegs)
          return this;
        this.toString();
        this.#filledNegs = true;
        let n;
        while (n = this.#negs.pop()) {
          if (n.type !== "!")
            continue;
          let p = n;
          let pp = p.#parent;
          while (pp) {
            for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
              for (const part of n.#parts) {
                if (typeof part === "string") {
                  throw new Error("string part in extglob AST??");
                }
                part.copyIn(pp.#parts[i]);
              }
            }
            p = pp;
            pp = p.#parent;
          }
        }
        return this;
      }
      push(...parts) {
        for (const p of parts) {
          if (p === "")
            continue;
          if (typeof p !== "string" && !(p instanceof _AST && p.#parent === this)) {
            throw new Error("invalid part: " + p);
          }
          this.#parts.push(p);
        }
      }
      toJSON() {
        const ret = this.type === null ? this.#parts.slice().map((p) => typeof p === "string" ? p : p.toJSON()) : [this.type, ...this.#parts.map((p) => p.toJSON())];
        if (this.isStart() && !this.type)
          ret.unshift([]);
        if (this.isEnd() && (this === this.#root || this.#root.#filledNegs && this.#parent?.type === "!")) {
          ret.push({});
        }
        return ret;
      }
      isStart() {
        if (this.#root === this)
          return true;
        if (!this.#parent?.isStart())
          return false;
        if (this.#parentIndex === 0)
          return true;
        const p = this.#parent;
        for (let i = 0; i < this.#parentIndex; i++) {
          const pp = p.#parts[i];
          if (!(pp instanceof _AST && pp.type === "!")) {
            return false;
          }
        }
        return true;
      }
      isEnd() {
        if (this.#root === this)
          return true;
        if (this.#parent?.type === "!")
          return true;
        if (!this.#parent?.isEnd())
          return false;
        if (!this.type)
          return this.#parent?.isEnd();
        const pl = this.#parent ? this.#parent.#parts.length : 0;
        return this.#parentIndex === pl - 1;
      }
      copyIn(part) {
        if (typeof part === "string")
          this.push(part);
        else
          this.push(part.clone(this));
      }
      clone(parent) {
        const c = new _AST(this.type, parent);
        for (const p of this.#parts) {
          c.copyIn(p);
        }
        return c;
      }
      static #parseAST(str, ast, pos, opt) {
        let escaping = false;
        let inBrace = false;
        let braceStart = -1;
        let braceNeg = false;
        if (ast.type === null) {
          let i2 = pos;
          let acc2 = "";
          while (i2 < str.length) {
            const c = str.charAt(i2++);
            if (escaping || c === "\\") {
              escaping = !escaping;
              acc2 += c;
              continue;
            }
            if (inBrace) {
              if (i2 === braceStart + 1) {
                if (c === "^" || c === "!") {
                  braceNeg = true;
                }
              } else if (c === "]" && !(i2 === braceStart + 2 && braceNeg)) {
                inBrace = false;
              }
              acc2 += c;
              continue;
            } else if (c === "[") {
              inBrace = true;
              braceStart = i2;
              braceNeg = false;
              acc2 += c;
              continue;
            }
            if (!opt.noext && isExtglobType(c) && str.charAt(i2) === "(") {
              ast.push(acc2);
              acc2 = "";
              const ext = new _AST(c, ast);
              i2 = _AST.#parseAST(str, ext, i2, opt);
              ast.push(ext);
              continue;
            }
            acc2 += c;
          }
          ast.push(acc2);
          return i2;
        }
        let i = pos + 1;
        let part = new _AST(null, ast);
        const parts = [];
        let acc = "";
        while (i < str.length) {
          const c = str.charAt(i++);
          if (escaping || c === "\\") {
            escaping = !escaping;
            acc += c;
            continue;
          }
          if (inBrace) {
            if (i === braceStart + 1) {
              if (c === "^" || c === "!") {
                braceNeg = true;
              }
            } else if (c === "]" && !(i === braceStart + 2 && braceNeg)) {
              inBrace = false;
            }
            acc += c;
            continue;
          } else if (c === "[") {
            inBrace = true;
            braceStart = i;
            braceNeg = false;
            acc += c;
            continue;
          }
          if (isExtglobType(c) && str.charAt(i) === "(") {
            part.push(acc);
            acc = "";
            const ext = new _AST(c, part);
            part.push(ext);
            i = _AST.#parseAST(str, ext, i, opt);
            continue;
          }
          if (c === "|") {
            part.push(acc);
            acc = "";
            parts.push(part);
            part = new _AST(null, ast);
            continue;
          }
          if (c === ")") {
            if (acc === "" && ast.#parts.length === 0) {
              ast.#emptyExt = true;
            }
            part.push(acc);
            acc = "";
            ast.push(...parts, part);
            return i;
          }
          acc += c;
        }
        ast.type = null;
        ast.#hasMagic = void 0;
        ast.#parts = [str.substring(pos - 1)];
        return i;
      }
      static fromGlob(pattern, options = {}) {
        const ast = new _AST(null, void 0, options);
        _AST.#parseAST(pattern, ast, 0, options);
        return ast;
      }
      // returns the regular expression if there's magic, or the unescaped
      // string if not.
      toMMPattern() {
        if (this !== this.#root)
          return this.#root.toMMPattern();
        const glob = this.toString();
        const [re, body, hasMagic, uflag] = this.toRegExpSource();
        const anyMagic = hasMagic || this.#hasMagic || this.#options.nocase && !this.#options.nocaseMagicOnly && glob.toUpperCase() !== glob.toLowerCase();
        if (!anyMagic) {
          return body;
        }
        const flags = (this.#options.nocase ? "i" : "") + (uflag ? "u" : "");
        return Object.assign(new RegExp(`^${re}$`, flags), {
          _src: re,
          _glob: glob
        });
      }
      get options() {
        return this.#options;
      }
      // returns the string match, the regexp source, whether there's magic
      // in the regexp (so a regular expression is required) and whether or
      // not the uflag is needed for the regular expression (for posix classes)
      // TODO: instead of injecting the start/end at this point, just return
      // the BODY of the regexp, along with the start/end portions suitable
      // for binding the start/end in either a joined full-path makeRe context
      // (where we bind to (^|/), or a standalone matchPart context (where
      // we bind to ^, and not /).  Otherwise slashes get duped!
      //
      // In part-matching mode, the start is:
      // - if not isStart: nothing
      // - if traversal possible, but not allowed: ^(?!\.\.?$)
      // - if dots allowed or not possible: ^
      // - if dots possible and not allowed: ^(?!\.)
      // end is:
      // - if not isEnd(): nothing
      // - else: $
      //
      // In full-path matching mode, we put the slash at the START of the
      // pattern, so start is:
      // - if first pattern: same as part-matching mode
      // - if not isStart(): nothing
      // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
      // - if dots allowed or not possible: /
      // - if dots possible and not allowed: /(?!\.)
      // end is:
      // - if last pattern, same as part-matching mode
      // - else nothing
      //
      // Always put the (?:$|/) on negated tails, though, because that has to be
      // there to bind the end of the negated pattern portion, and it's easier to
      // just stick it in now rather than try to inject it later in the middle of
      // the pattern.
      //
      // We can just always return the same end, and leave it up to the caller
      // to know whether it's going to be used joined or in parts.
      // And, if the start is adjusted slightly, can do the same there:
      // - if not isStart: nothing
      // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
      // - if dots allowed or not possible: (?:/|^)
      // - if dots possible and not allowed: (?:/|^)(?!\.)
      //
      // But it's better to have a simpler binding without a conditional, for
      // performance, so probably better to return both start options.
      //
      // Then the caller just ignores the end if it's not the first pattern,
      // and the start always gets applied.
      //
      // But that's always going to be $ if it's the ending pattern, or nothing,
      // so the caller can just attach $ at the end of the pattern when building.
      //
      // So the todo is:
      // - better detect what kind of start is needed
      // - return both flavors of starting pattern
      // - attach $ at the end of the pattern when creating the actual RegExp
      //
      // Ah, but wait, no, that all only applies to the root when the first pattern
      // is not an extglob. If the first pattern IS an extglob, then we need all
      // that dot prevention biz to live in the extglob portions, because eg
      // +(*|.x*) can match .xy but not .yx.
      //
      // So, return the two flavors if it's #root and the first child is not an
      // AST, otherwise leave it to the child AST to handle it, and there,
      // use the (?:^|/) style of start binding.
      //
      // Even simplified further:
      // - Since the start for a join is eg /(?!\.) and the start for a part
      // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
      // or start or whatever) and prepend ^ or / at the Regexp construction.
      toRegExpSource(allowDot) {
        const dot = allowDot ?? !!this.#options.dot;
        if (this.#root === this)
          this.#fillNegs();
        if (!this.type) {
          const noEmpty = this.isStart() && this.isEnd();
          const src = this.#parts.map((p) => {
            const [re, _, hasMagic, uflag] = typeof p === "string" ? _AST.#parseGlob(p, this.#hasMagic, noEmpty) : p.toRegExpSource(allowDot);
            this.#hasMagic = this.#hasMagic || hasMagic;
            this.#uflag = this.#uflag || uflag;
            return re;
          }).join("");
          let start2 = "";
          if (this.isStart()) {
            if (typeof this.#parts[0] === "string") {
              const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
              if (!dotTravAllowed) {
                const aps = addPatternStart;
                const needNoTrav = (
                  // dots are allowed, and the pattern starts with [ or .
                  dot && aps.has(src.charAt(0)) || // the pattern starts with \., and then [ or .
                  src.startsWith("\\.") && aps.has(src.charAt(2)) || // the pattern starts with \.\., and then [ or .
                  src.startsWith("\\.\\.") && aps.has(src.charAt(4))
                );
                const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                start2 = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : "";
              }
            }
          }
          let end = "";
          if (this.isEnd() && this.#root.#filledNegs && this.#parent?.type === "!") {
            end = "(?:$|\\/)";
          }
          const final2 = start2 + src + end;
          return [
            final2,
            (0, unescape_js_1.unescape)(src),
            this.#hasMagic = !!this.#hasMagic,
            this.#uflag
          ];
        }
        const repeated = this.type === "*" || this.type === "+";
        const start = this.type === "!" ? "(?:(?!(?:" : "(?:";
        let body = this.#partsToRegExp(dot);
        if (this.isStart() && this.isEnd() && !body && this.type !== "!") {
          const s = this.toString();
          this.#parts = [s];
          this.type = null;
          this.#hasMagic = void 0;
          return [s, (0, unescape_js_1.unescape)(this.toString()), false, false];
        }
        let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot ? "" : this.#partsToRegExp(true);
        if (bodyDotAllowed === body) {
          bodyDotAllowed = "";
        }
        if (bodyDotAllowed) {
          body = `(?:${body})(?:${bodyDotAllowed})*?`;
        }
        let final = "";
        if (this.type === "!" && this.#emptyExt) {
          final = (this.isStart() && !dot ? startNoDot : "") + starNoEmpty;
        } else {
          const close = this.type === "!" ? (
            // !() must match something,but !(x) can match ''
            "))" + (this.isStart() && !dot && !allowDot ? startNoDot : "") + star + ")"
          ) : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && bodyDotAllowed ? ")" : this.type === "*" && bodyDotAllowed ? `)?` : `)${this.type}`;
          final = start + body + close;
        }
        return [
          final,
          (0, unescape_js_1.unescape)(body),
          this.#hasMagic = !!this.#hasMagic,
          this.#uflag
        ];
      }
      #partsToRegExp(dot) {
        return this.#parts.map((p) => {
          if (typeof p === "string") {
            throw new Error("string type in extglob ast??");
          }
          const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
          this.#uflag = this.#uflag || uflag;
          return re;
        }).filter((p) => !(this.isStart() && this.isEnd()) || !!p).join("|");
      }
      static #parseGlob(glob, hasMagic, noEmpty = false) {
        let escaping = false;
        let re = "";
        let uflag = false;
        for (let i = 0; i < glob.length; i++) {
          const c = glob.charAt(i);
          if (escaping) {
            escaping = false;
            re += (reSpecials.has(c) ? "\\" : "") + c;
            continue;
          }
          if (c === "\\") {
            if (i === glob.length - 1) {
              re += "\\\\";
            } else {
              escaping = true;
            }
            continue;
          }
          if (c === "[") {
            const [src, needUflag, consumed, magic] = (0, brace_expressions_js_1.parseClass)(glob, i);
            if (consumed) {
              re += src;
              uflag = uflag || needUflag;
              i += consumed - 1;
              hasMagic = hasMagic || magic;
              continue;
            }
          }
          if (c === "*") {
            if (noEmpty && glob === "*")
              re += starNoEmpty;
            else
              re += star;
            hasMagic = true;
            continue;
          }
          if (c === "?") {
            re += qmark;
            hasMagic = true;
            continue;
          }
          re += regExpEscape(c);
        }
        return [re, (0, unescape_js_1.unescape)(glob), !!hasMagic, uflag];
      }
    };
    exports.AST = AST;
  }
});

// node_modules/minimatch/dist/commonjs/escape.js
var require_escape = __commonJS({
  "node_modules/minimatch/dist/commonjs/escape.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.escape = void 0;
    var escape = (s, { windowsPathsNoEscape = false } = {}) => {
      return windowsPathsNoEscape ? s.replace(/[?*()[\]]/g, "[$&]") : s.replace(/[?*()[\]\\]/g, "\\$&");
    };
    exports.escape = escape;
  }
});

// node_modules/minimatch/dist/commonjs/index.js
var require_commonjs = __commonJS({
  "node_modules/minimatch/dist/commonjs/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unescape = exports.escape = exports.AST = exports.Minimatch = exports.match = exports.makeRe = exports.braceExpand = exports.defaults = exports.filter = exports.GLOBSTAR = exports.sep = exports.minimatch = void 0;
    var brace_expansion_1 = __importDefault(require_brace_expansion());
    var assert_valid_pattern_js_1 = require_assert_valid_pattern();
    var ast_js_1 = require_ast();
    var escape_js_1 = require_escape();
    var unescape_js_1 = require_unescape();
    var minimatch = (p, pattern, options = {}) => {
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      return new Minimatch(pattern, options).match(p);
    };
    exports.minimatch = minimatch;
    var starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
    var starDotExtTest = (ext2) => (f) => !f.startsWith(".") && f.endsWith(ext2);
    var starDotExtTestDot = (ext2) => (f) => f.endsWith(ext2);
    var starDotExtTestNocase = (ext2) => {
      ext2 = ext2.toLowerCase();
      return (f) => !f.startsWith(".") && f.toLowerCase().endsWith(ext2);
    };
    var starDotExtTestNocaseDot = (ext2) => {
      ext2 = ext2.toLowerCase();
      return (f) => f.toLowerCase().endsWith(ext2);
    };
    var starDotStarRE = /^\*+\.\*+$/;
    var starDotStarTest = (f) => !f.startsWith(".") && f.includes(".");
    var starDotStarTestDot = (f) => f !== "." && f !== ".." && f.includes(".");
    var dotStarRE = /^\.\*+$/;
    var dotStarTest = (f) => f !== "." && f !== ".." && f.startsWith(".");
    var starRE = /^\*+$/;
    var starTest = (f) => f.length !== 0 && !f.startsWith(".");
    var starTestDot = (f) => f.length !== 0 && f !== "." && f !== "..";
    var qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
    var qmarksTestNocase = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExt([$0]);
      if (!ext2)
        return noext;
      ext2 = ext2.toLowerCase();
      return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
    };
    var qmarksTestNocaseDot = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExtDot([$0]);
      if (!ext2)
        return noext;
      ext2 = ext2.toLowerCase();
      return (f) => noext(f) && f.toLowerCase().endsWith(ext2);
    };
    var qmarksTestDot = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExtDot([$0]);
      return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
    };
    var qmarksTest = ([$0, ext2 = ""]) => {
      const noext = qmarksTestNoExt([$0]);
      return !ext2 ? noext : (f) => noext(f) && f.endsWith(ext2);
    };
    var qmarksTestNoExt = ([$0]) => {
      const len = $0.length;
      return (f) => f.length === len && !f.startsWith(".");
    };
    var qmarksTestNoExtDot = ([$0]) => {
      const len = $0.length;
      return (f) => f.length === len && f !== "." && f !== "..";
    };
    var defaultPlatform = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
    var path = {
      win32: { sep: "\\" },
      posix: { sep: "/" }
    };
    exports.sep = defaultPlatform === "win32" ? path.win32.sep : path.posix.sep;
    exports.minimatch.sep = exports.sep;
    exports.GLOBSTAR = Symbol("globstar **");
    exports.minimatch.GLOBSTAR = exports.GLOBSTAR;
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var filter = (pattern, options = {}) => (p) => (0, exports.minimatch)(p, pattern, options);
    exports.filter = filter;
    exports.minimatch.filter = exports.filter;
    var ext = (a, b = {}) => Object.assign({}, a, b);
    var defaults = (def) => {
      if (!def || typeof def !== "object" || !Object.keys(def).length) {
        return exports.minimatch;
      }
      const orig = exports.minimatch;
      const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
      return Object.assign(m, {
        Minimatch: class Minimatch extends orig.Minimatch {
          constructor(pattern, options = {}) {
            super(pattern, ext(def, options));
          }
          static defaults(options) {
            return orig.defaults(ext(def, options)).Minimatch;
          }
        },
        AST: class AST extends orig.AST {
          /* c8 ignore start */
          constructor(type, parent, options = {}) {
            super(type, parent, ext(def, options));
          }
          /* c8 ignore stop */
          static fromGlob(pattern, options = {}) {
            return orig.AST.fromGlob(pattern, ext(def, options));
          }
        },
        unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
        escape: (s, options = {}) => orig.escape(s, ext(def, options)),
        filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
        defaults: (options) => orig.defaults(ext(def, options)),
        makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
        braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
        match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
        sep: orig.sep,
        GLOBSTAR: exports.GLOBSTAR
      });
    };
    exports.defaults = defaults;
    exports.minimatch.defaults = exports.defaults;
    var braceExpand = (pattern, options = {}) => {
      (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
      if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
        return [pattern];
      }
      return (0, brace_expansion_1.default)(pattern);
    };
    exports.braceExpand = braceExpand;
    exports.minimatch.braceExpand = exports.braceExpand;
    var makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
    exports.makeRe = makeRe;
    exports.minimatch.makeRe = exports.makeRe;
    var match = (list, pattern, options = {}) => {
      const mm = new Minimatch(pattern, options);
      list = list.filter((f) => mm.match(f));
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    exports.match = match;
    exports.minimatch.match = exports.match;
    var globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
    var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var Minimatch = class {
      options;
      set;
      pattern;
      windowsPathsNoEscape;
      nonegate;
      negate;
      comment;
      empty;
      preserveMultipleSlashes;
      partial;
      globSet;
      globParts;
      nocase;
      isWindows;
      platform;
      windowsNoMagicRoot;
      regexp;
      constructor(pattern, options = {}) {
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        options = options || {};
        this.options = options;
        this.pattern = pattern;
        this.platform = options.platform || defaultPlatform;
        this.isWindows = this.platform === "win32";
        this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
          this.pattern = this.pattern.replace(/\\/g, "/");
        }
        this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
        this.regexp = null;
        this.negate = false;
        this.nonegate = !!options.nonegate;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        this.nocase = !!this.options.nocase;
        this.windowsNoMagicRoot = options.windowsNoMagicRoot !== void 0 ? options.windowsNoMagicRoot : !!(this.isWindows && this.nocase);
        this.globSet = [];
        this.globParts = [];
        this.set = [];
        this.make();
      }
      hasMagic() {
        if (this.options.magicalBraces && this.set.length > 1) {
          return true;
        }
        for (const pattern of this.set) {
          for (const part of pattern) {
            if (typeof part !== "string")
              return true;
          }
        }
        return false;
      }
      debug(..._) {
      }
      make() {
        const pattern = this.pattern;
        const options = this.options;
        if (!options.nocomment && pattern.charAt(0) === "#") {
          this.comment = true;
          return;
        }
        if (!pattern) {
          this.empty = true;
          return;
        }
        this.parseNegate();
        this.globSet = [...new Set(this.braceExpand())];
        if (options.debug) {
          this.debug = (...args) => console.error(...args);
        }
        this.debug(this.pattern, this.globSet);
        const rawGlobParts = this.globSet.map((s) => this.slashSplit(s));
        this.globParts = this.preprocess(rawGlobParts);
        this.debug(this.pattern, this.globParts);
        let set = this.globParts.map((s, _, __) => {
          if (this.isWindows && this.windowsNoMagicRoot) {
            const isUNC = s[0] === "" && s[1] === "" && (s[2] === "?" || !globMagic.test(s[2])) && !globMagic.test(s[3]);
            const isDrive = /^[a-z]:/i.test(s[0]);
            if (isUNC) {
              return [...s.slice(0, 4), ...s.slice(4).map((ss) => this.parse(ss))];
            } else if (isDrive) {
              return [s[0], ...s.slice(1).map((ss) => this.parse(ss))];
            }
          }
          return s.map((ss) => this.parse(ss));
        });
        this.debug(this.pattern, set);
        this.set = set.filter((s) => s.indexOf(false) === -1);
        if (this.isWindows) {
          for (let i = 0; i < this.set.length; i++) {
            const p = this.set[i];
            if (p[0] === "" && p[1] === "" && this.globParts[i][2] === "?" && typeof p[3] === "string" && /^[a-z]:$/i.test(p[3])) {
              p[2] = "?";
            }
          }
        }
        this.debug(this.pattern, this.set);
      }
      // various transforms to equivalent pattern sets that are
      // faster to process in a filesystem walk.  The goal is to
      // eliminate what we can, and push all ** patterns as far
      // to the right as possible, even if it increases the number
      // of patterns that we have to process.
      preprocess(globParts) {
        if (this.options.noglobstar) {
          for (let i = 0; i < globParts.length; i++) {
            for (let j = 0; j < globParts[i].length; j++) {
              if (globParts[i][j] === "**") {
                globParts[i][j] = "*";
              }
            }
          }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
          globParts = this.firstPhasePreProcess(globParts);
          globParts = this.secondPhasePreProcess(globParts);
        } else if (optimizationLevel >= 1) {
          globParts = this.levelOneOptimize(globParts);
        } else {
          globParts = this.adjascentGlobstarOptimize(globParts);
        }
        return globParts;
      }
      // just get rid of adjascent ** portions
      adjascentGlobstarOptimize(globParts) {
        return globParts.map((parts) => {
          let gs = -1;
          while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
            let i = gs;
            while (parts[i + 1] === "**") {
              i++;
            }
            if (i !== gs) {
              parts.splice(gs, i - gs);
            }
          }
          return parts;
        });
      }
      // get rid of adjascent ** and resolve .. portions
      levelOneOptimize(globParts) {
        return globParts.map((parts) => {
          parts = parts.reduce((set, part) => {
            const prev = set[set.length - 1];
            if (part === "**" && prev === "**") {
              return set;
            }
            if (part === "..") {
              if (prev && prev !== ".." && prev !== "." && prev !== "**") {
                set.pop();
                return set;
              }
            }
            set.push(part);
            return set;
          }, []);
          return parts.length === 0 ? [""] : parts;
        });
      }
      levelTwoFileOptimize(parts) {
        if (!Array.isArray(parts)) {
          parts = this.slashSplit(parts);
        }
        let didSomething = false;
        do {
          didSomething = false;
          if (!this.preserveMultipleSlashes) {
            for (let i = 1; i < parts.length - 1; i++) {
              const p = parts[i];
              if (i === 1 && p === "" && parts[0] === "")
                continue;
              if (p === "." || p === "") {
                didSomething = true;
                parts.splice(i, 1);
                i--;
              }
            }
            if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
              didSomething = true;
              parts.pop();
            }
          }
          let dd = 0;
          while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
            const p = parts[dd - 1];
            if (p && p !== "." && p !== ".." && p !== "**") {
              didSomething = true;
              parts.splice(dd - 1, 2);
              dd -= 2;
            }
          }
        } while (didSomething);
        return parts.length === 0 ? [""] : parts;
      }
      // First phase: single-pattern processing
      // <pre> is 1 or more portions
      // <rest> is 1 or more portions
      // <p> is any portion other than ., .., '', or **
      // <e> is . or ''
      //
      // **/.. is *brutal* for filesystem walking performance, because
      // it effectively resets the recursive walk each time it occurs,
      // and ** cannot be reduced out by a .. pattern part like a regexp
      // or most strings (other than .., ., and '') can be.
      //
      // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
      // <pre>/<e>/<rest> -> <pre>/<rest>
      // <pre>/<p>/../<rest> -> <pre>/<rest>
      // **/**/<rest> -> **/<rest>
      //
      // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
      // this WOULD be allowed if ** did follow symlinks, or * didn't
      firstPhasePreProcess(globParts) {
        let didSomething = false;
        do {
          didSomething = false;
          for (let parts of globParts) {
            let gs = -1;
            while (-1 !== (gs = parts.indexOf("**", gs + 1))) {
              let gss = gs;
              while (parts[gss + 1] === "**") {
                gss++;
              }
              if (gss > gs) {
                parts.splice(gs + 1, gss - gs);
              }
              let next = parts[gs + 1];
              const p = parts[gs + 2];
              const p2 = parts[gs + 3];
              if (next !== "..")
                continue;
              if (!p || p === "." || p === ".." || !p2 || p2 === "." || p2 === "..") {
                continue;
              }
              didSomething = true;
              parts.splice(gs, 1);
              const other = parts.slice(0);
              other[gs] = "**";
              globParts.push(other);
              gs--;
            }
            if (!this.preserveMultipleSlashes) {
              for (let i = 1; i < parts.length - 1; i++) {
                const p = parts[i];
                if (i === 1 && p === "" && parts[0] === "")
                  continue;
                if (p === "." || p === "") {
                  didSomething = true;
                  parts.splice(i, 1);
                  i--;
                }
              }
              if (parts[0] === "." && parts.length === 2 && (parts[1] === "." || parts[1] === "")) {
                didSomething = true;
                parts.pop();
              }
            }
            let dd = 0;
            while (-1 !== (dd = parts.indexOf("..", dd + 1))) {
              const p = parts[dd - 1];
              if (p && p !== "." && p !== ".." && p !== "**") {
                didSomething = true;
                const needDot = dd === 1 && parts[dd + 1] === "**";
                const splin = needDot ? ["."] : [];
                parts.splice(dd - 1, 2, ...splin);
                if (parts.length === 0)
                  parts.push("");
                dd -= 2;
              }
            }
          }
        } while (didSomething);
        return globParts;
      }
      // second phase: multi-pattern dedupes
      // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
      // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
      // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
      //
      // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
      // ^-- not valid because ** doens't follow symlinks
      secondPhasePreProcess(globParts) {
        for (let i = 0; i < globParts.length - 1; i++) {
          for (let j = i + 1; j < globParts.length; j++) {
            const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
            if (!matched)
              continue;
            globParts[i] = matched;
            globParts[j] = [];
          }
        }
        return globParts.filter((gs) => gs.length);
      }
      partsMatch(a, b, emptyGSMatch = false) {
        let ai = 0;
        let bi = 0;
        let result = [];
        let which = "";
        while (ai < a.length && bi < b.length) {
          if (a[ai] === b[bi]) {
            result.push(which === "b" ? b[bi] : a[ai]);
            ai++;
            bi++;
          } else if (emptyGSMatch && a[ai] === "**" && b[bi] === a[ai + 1]) {
            result.push(a[ai]);
            ai++;
          } else if (emptyGSMatch && b[bi] === "**" && a[ai] === b[bi + 1]) {
            result.push(b[bi]);
            bi++;
          } else if (a[ai] === "*" && b[bi] && (this.options.dot || !b[bi].startsWith(".")) && b[bi] !== "**") {
            if (which === "b")
              return false;
            which = "a";
            result.push(a[ai]);
            ai++;
            bi++;
          } else if (b[bi] === "*" && a[ai] && (this.options.dot || !a[ai].startsWith(".")) && a[ai] !== "**") {
            if (which === "a")
              return false;
            which = "b";
            result.push(b[bi]);
            ai++;
            bi++;
          } else {
            return false;
          }
        }
        return a.length === b.length && result;
      }
      parseNegate() {
        if (this.nonegate)
          return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for (let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++) {
          negate = !negate;
          negateOffset++;
        }
        if (negateOffset)
          this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
      }
      // set partial to true to test if, for example,
      // "/a/b" matches the start of "/*/b/*/d"
      // Partial means, if you run out of file before you run
      // out of pattern, then that's fine, as long as all
      // the parts match.
      matchOne(file, pattern, partial = false) {
        const options = this.options;
        if (this.isWindows) {
          const fileDrive = typeof file[0] === "string" && /^[a-z]:$/i.test(file[0]);
          const fileUNC = !fileDrive && file[0] === "" && file[1] === "" && file[2] === "?" && /^[a-z]:$/i.test(file[3]);
          const patternDrive = typeof pattern[0] === "string" && /^[a-z]:$/i.test(pattern[0]);
          const patternUNC = !patternDrive && pattern[0] === "" && pattern[1] === "" && pattern[2] === "?" && typeof pattern[3] === "string" && /^[a-z]:$/i.test(pattern[3]);
          const fdi = fileUNC ? 3 : fileDrive ? 0 : void 0;
          const pdi = patternUNC ? 3 : patternDrive ? 0 : void 0;
          if (typeof fdi === "number" && typeof pdi === "number") {
            const [fd, pd] = [file[fdi], pattern[pdi]];
            if (fd.toLowerCase() === pd.toLowerCase()) {
              pattern[pdi] = fd;
              if (pdi > fdi) {
                pattern = pattern.slice(pdi);
              } else if (fdi > pdi) {
                file = file.slice(fdi);
              }
            }
          }
        }
        const { optimizationLevel = 1 } = this.options;
        if (optimizationLevel >= 2) {
          file = this.levelTwoFileOptimize(file);
        }
        this.debug("matchOne", this, { file, pattern });
        this.debug("matchOne", file.length, pattern.length);
        for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
          this.debug("matchOne loop");
          var p = pattern[pi];
          var f = file[fi];
          this.debug(pattern, p, f);
          if (p === false) {
            return false;
          }
          if (p === exports.GLOBSTAR) {
            this.debug("GLOBSTAR", [pattern, p, f]);
            var fr = fi;
            var pr = pi + 1;
            if (pr === pl) {
              this.debug("** at the end");
              for (; fi < fl; fi++) {
                if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                  return false;
              }
              return true;
            }
            while (fr < fl) {
              var swallowee = file[fr];
              this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
              if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                this.debug("globstar found match!", fr, fl, swallowee);
                return true;
              } else {
                if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                  this.debug("dot detected!", file, fr, pattern, pr);
                  break;
                }
                this.debug("globstar swallow a segment, and continue");
                fr++;
              }
            }
            if (partial) {
              this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
              if (fr === fl) {
                return true;
              }
            }
            return false;
          }
          let hit;
          if (typeof p === "string") {
            hit = f === p;
            this.debug("string match", p, f, hit);
          } else {
            hit = p.test(f);
            this.debug("pattern match", p, f, hit);
          }
          if (!hit)
            return false;
        }
        if (fi === fl && pi === pl) {
          return true;
        } else if (fi === fl) {
          return partial;
        } else if (pi === pl) {
          return fi === fl - 1 && file[fi] === "";
        } else {
          throw new Error("wtf?");
        }
      }
      braceExpand() {
        return (0, exports.braceExpand)(this.pattern, this.options);
      }
      parse(pattern) {
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        const options = this.options;
        if (pattern === "**")
          return exports.GLOBSTAR;
        if (pattern === "")
          return "";
        let m;
        let fastTest = null;
        if (m = pattern.match(starRE)) {
          fastTest = options.dot ? starTestDot : starTest;
        } else if (m = pattern.match(starDotExtRE)) {
          fastTest = (options.nocase ? options.dot ? starDotExtTestNocaseDot : starDotExtTestNocase : options.dot ? starDotExtTestDot : starDotExtTest)(m[1]);
        } else if (m = pattern.match(qmarksRE)) {
          fastTest = (options.nocase ? options.dot ? qmarksTestNocaseDot : qmarksTestNocase : options.dot ? qmarksTestDot : qmarksTest)(m);
        } else if (m = pattern.match(starDotStarRE)) {
          fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
        } else if (m = pattern.match(dotStarRE)) {
          fastTest = dotStarTest;
        }
        const re = ast_js_1.AST.fromGlob(pattern, this.options).toMMPattern();
        if (fastTest && typeof re === "object") {
          Reflect.defineProperty(re, "test", { value: fastTest });
        }
        return re;
      }
      makeRe() {
        if (this.regexp || this.regexp === false)
          return this.regexp;
        const set = this.set;
        if (!set.length) {
          this.regexp = false;
          return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
        const flags = new Set(options.nocase ? ["i"] : []);
        let re = set.map((pattern) => {
          const pp = pattern.map((p) => {
            if (p instanceof RegExp) {
              for (const f of p.flags.split(""))
                flags.add(f);
            }
            return typeof p === "string" ? regExpEscape(p) : p === exports.GLOBSTAR ? exports.GLOBSTAR : p._src;
          });
          pp.forEach((p, i) => {
            const next = pp[i + 1];
            const prev = pp[i - 1];
            if (p !== exports.GLOBSTAR || prev === exports.GLOBSTAR) {
              return;
            }
            if (prev === void 0) {
              if (next !== void 0 && next !== exports.GLOBSTAR) {
                pp[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + next;
              } else {
                pp[i] = twoStar;
              }
            } else if (next === void 0) {
              pp[i - 1] = prev + "(?:\\/|" + twoStar + ")?";
            } else if (next !== exports.GLOBSTAR) {
              pp[i - 1] = prev + "(?:\\/|\\/" + twoStar + "\\/)" + next;
              pp[i + 1] = exports.GLOBSTAR;
            }
          });
          return pp.filter((p) => p !== exports.GLOBSTAR).join("/");
        }).join("|");
        const [open, close] = set.length > 1 ? ["(?:", ")"] : ["", ""];
        re = "^" + open + re + close + "$";
        if (this.negate)
          re = "^(?!" + re + ").+$";
        try {
          this.regexp = new RegExp(re, [...flags].join(""));
        } catch (ex) {
          this.regexp = false;
        }
        return this.regexp;
      }
      slashSplit(p) {
        if (this.preserveMultipleSlashes) {
          return p.split("/");
        } else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
          return ["", ...p.split(/\/+/)];
        } else {
          return p.split(/\/+/);
        }
      }
      match(f, partial = this.partial) {
        this.debug("match", f, this.pattern);
        if (this.comment) {
          return false;
        }
        if (this.empty) {
          return f === "";
        }
        if (f === "/" && partial) {
          return true;
        }
        const options = this.options;
        if (this.isWindows) {
          f = f.split("\\").join("/");
        }
        const ff = this.slashSplit(f);
        this.debug(this.pattern, "split", ff);
        const set = this.set;
        this.debug(this.pattern, "set", set);
        let filename = ff[ff.length - 1];
        if (!filename) {
          for (let i = ff.length - 2; !filename && i >= 0; i--) {
            filename = ff[i];
          }
        }
        for (let i = 0; i < set.length; i++) {
          const pattern = set[i];
          let file = ff;
          if (options.matchBase && pattern.length === 1) {
            file = [filename];
          }
          const hit = this.matchOne(file, pattern, partial);
          if (hit) {
            if (options.flipNegate) {
              return true;
            }
            return !this.negate;
          }
        }
        if (options.flipNegate) {
          return false;
        }
        return this.negate;
      }
      static defaults(def) {
        return exports.minimatch.defaults(def).Minimatch;
      }
    };
    exports.Minimatch = Minimatch;
    var ast_js_2 = require_ast();
    Object.defineProperty(exports, "AST", { enumerable: true, get: function() {
      return ast_js_2.AST;
    } });
    var escape_js_2 = require_escape();
    Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
      return escape_js_2.escape;
    } });
    var unescape_js_2 = require_unescape();
    Object.defineProperty(exports, "unescape", { enumerable: true, get: function() {
      return unescape_js_2.unescape;
    } });
    exports.minimatch.AST = ast_js_1.AST;
    exports.minimatch.Minimatch = Minimatch;
    exports.minimatch.escape = escape_js_1.escape;
    exports.minimatch.unescape = unescape_js_1.unescape;
  }
});

// node_modules/path-scurry/node_modules/lru-cache/dist/commonjs/index.js
var require_commonjs2 = __commonJS({
  "node_modules/path-scurry/node_modules/lru-cache/dist/commonjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = void 0;
    var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
    var warned = /* @__PURE__ */ new Set();
    var PROCESS = typeof process === "object" && !!process ? process : {};
    var emitWarning = (msg, type, code, fn) => {
      typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
    };
    var AC = globalThis.AbortController;
    var AS = globalThis.AbortSignal;
    if (typeof AC === "undefined") {
      AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
          this._onabort.push(fn);
        }
      };
      AC = class AbortController {
        constructor() {
          warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
          if (this.signal.aborted)
            return;
          this.signal.reason = reason;
          this.signal.aborted = true;
          for (const fn of this.signal._onabort) {
            fn(reason);
          }
          this.signal.onabort?.(reason);
        }
      };
      let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
      const warnACPolyfill = () => {
        if (!printACPolyfillWarning)
          return;
        printACPolyfillWarning = false;
        emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
      };
    }
    var shouldWarn = (code) => !warned.has(code);
    var TYPE = Symbol("type");
    var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
    var ZeroArray = class extends Array {
      constructor(size) {
        super(size);
        this.fill(0);
      }
    };
    var Stack = class _Stack {
      heap;
      length;
      // private constructor
      static #constructing = false;
      static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls)
          return [];
        _Stack.#constructing = true;
        const s = new _Stack(max, HeapCls);
        _Stack.#constructing = false;
        return s;
      }
      constructor(max, HeapCls) {
        if (!_Stack.#constructing) {
          throw new TypeError("instantiate Stack using Stack.create(n)");
        }
        this.heap = new HeapCls(max);
        this.length = 0;
      }
      push(n) {
        this.heap[this.length++] = n;
      }
      pop() {
        return this.heap[--this.length];
      }
    };
    var LRUCache = class _LRUCache {
      // properties coming in from the options of these, only max and maxSize
      // really *need* to be protected. The rest can be modified, as they just
      // set defaults for various methods.
      #max;
      #maxSize;
      #dispose;
      #disposeAfter;
      #fetchMethod;
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      ttl;
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      ttlResolution;
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      ttlAutopurge;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      updateAgeOnGet;
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      updateAgeOnHas;
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      allowStale;
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      noDisposeOnSet;
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      noUpdateTTL;
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      maxEntrySize;
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      sizeCalculation;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      noDeleteOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      noDeleteOnStaleGet;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      allowStaleOnFetchAbort;
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      allowStaleOnFetchRejection;
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      ignoreFetchAbort;
      // computed properties
      #size;
      #calculatedSize;
      #keyMap;
      #keyList;
      #valList;
      #next;
      #prev;
      #head;
      #tail;
      #free;
      #disposed;
      #sizes;
      #starts;
      #ttls;
      #hasDispose;
      #hasFetchMethod;
      #hasDisposeAfter;
      /**
       * Do not call this method unless you need to inspect the
       * inner workings of the cache.  If anything returned by this
       * object is modified in any way, strange breakage may occur.
       *
       * These fields are private for a reason!
       *
       * @internal
       */
      static unsafeExposeInternals(c) {
        return {
          // properties
          starts: c.#starts,
          ttls: c.#ttls,
          sizes: c.#sizes,
          keyMap: c.#keyMap,
          keyList: c.#keyList,
          valList: c.#valList,
          next: c.#next,
          prev: c.#prev,
          get head() {
            return c.#head;
          },
          get tail() {
            return c.#tail;
          },
          free: c.#free,
          // methods
          isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
          backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
          moveToTail: (index) => c.#moveToTail(index),
          indexes: (options) => c.#indexes(options),
          rindexes: (options) => c.#rindexes(options),
          isStale: (index) => c.#isStale(index)
        };
      }
      // Protected read-only members
      /**
       * {@link LRUCache.OptionsBase.max} (read-only)
       */
      get max() {
        return this.#max;
      }
      /**
       * {@link LRUCache.OptionsBase.maxSize} (read-only)
       */
      get maxSize() {
        return this.#maxSize;
      }
      /**
       * The total computed size of items in the cache (read-only)
       */
      get calculatedSize() {
        return this.#calculatedSize;
      }
      /**
       * The number of items stored in the cache (read-only)
       */
      get size() {
        return this.#size;
      }
      /**
       * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
       */
      get fetchMethod() {
        return this.#fetchMethod;
      }
      /**
       * {@link LRUCache.OptionsBase.dispose} (read-only)
       */
      get dispose() {
        return this.#dispose;
      }
      /**
       * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
       */
      get disposeAfter() {
        return this.#disposeAfter;
      }
      constructor(options) {
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max)) {
          throw new TypeError("max option must be a nonnegative integer");
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
          throw new Error("invalid max value: " + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
          if (!this.#maxSize && !this.maxEntrySize) {
            throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
          }
          if (typeof this.sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation set to non-function");
          }
        }
        if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
          throw new TypeError("fetchMethod must be a function if specified");
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = /* @__PURE__ */ new Map();
        this.#keyList = new Array(max).fill(void 0);
        this.#valList = new Array(max).fill(void 0);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === "function") {
          this.#dispose = dispose;
        }
        if (typeof disposeAfter === "function") {
          this.#disposeAfter = disposeAfter;
          this.#disposed = [];
        } else {
          this.#disposeAfter = void 0;
          this.#disposed = void 0;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        if (this.maxEntrySize !== 0) {
          if (this.#maxSize !== 0) {
            if (!isPosInt(this.#maxSize)) {
              throw new TypeError("maxSize must be a positive integer if specified");
            }
          }
          if (!isPosInt(this.maxEntrySize)) {
            throw new TypeError("maxEntrySize must be a positive integer if specified");
          }
          this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
          if (!isPosInt(this.ttl)) {
            throw new TypeError("ttl must be a positive integer if specified");
          }
          this.#initializeTTLTracking();
        }
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
          throw new TypeError("At least one of max, maxSize, or ttl is required");
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
          const code = "LRU_CACHE_UNBOUNDED";
          if (shouldWarn(code)) {
            warned.add(code);
            const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
            emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
          }
        }
      }
      /**
       * Return the remaining TTL time for a given entry key
       */
      getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
      }
      #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        this.#setItemTTL = (index, ttl, start = perf.now()) => {
          starts[index] = ttl !== 0 ? start : 0;
          ttls[index] = ttl;
          if (ttl !== 0 && this.ttlAutopurge) {
            const t = setTimeout(() => {
              if (this.#isStale(index)) {
                this.delete(this.#keyList[index]);
              }
            }, ttl + 1);
            if (t.unref) {
              t.unref();
            }
          }
        };
        this.#updateItemAge = (index) => {
          starts[index] = ttls[index] !== 0 ? perf.now() : 0;
        };
        this.#statusTTL = (status, index) => {
          if (ttls[index]) {
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start)
              return;
            status.ttl = ttl;
            status.start = start;
            status.now = cachedNow || getNow();
            const age = status.now - start;
            status.remainingTTL = ttl - age;
          }
        };
        let cachedNow = 0;
        const getNow = () => {
          const n = perf.now();
          if (this.ttlResolution > 0) {
            cachedNow = n;
            const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
            if (t.unref) {
              t.unref();
            }
          }
          return n;
        };
        this.getRemainingTTL = (key) => {
          const index = this.#keyMap.get(key);
          if (index === void 0) {
            return 0;
          }
          const ttl = ttls[index];
          const start = starts[index];
          if (!ttl || !start) {
            return Infinity;
          }
          const age = (cachedNow || getNow()) - start;
          return ttl - age;
        };
        this.#isStale = (index) => {
          const s = starts[index];
          const t = ttls[index];
          return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
      }
      // conditionally set private methods related to TTL
      #updateItemAge = () => {
      };
      #statusTTL = () => {
      };
      #setItemTTL = () => {
      };
      /* c8 ignore stop */
      #isStale = () => false;
      #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index) => {
          this.#calculatedSize -= sizes[index];
          sizes[index] = 0;
        };
        this.#requireSize = (k, v, size, sizeCalculation) => {
          if (this.#isBackgroundFetch(v)) {
            return 0;
          }
          if (!isPosInt(size)) {
            if (sizeCalculation) {
              if (typeof sizeCalculation !== "function") {
                throw new TypeError("sizeCalculation must be a function");
              }
              size = sizeCalculation(v, k);
              if (!isPosInt(size)) {
                throw new TypeError("sizeCalculation return invalid (expect positive integer)");
              }
            } else {
              throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
            }
          }
          return size;
        };
        this.#addItemSize = (index, size, status) => {
          sizes[index] = size;
          if (this.#maxSize) {
            const maxSize = this.#maxSize - sizes[index];
            while (this.#calculatedSize > maxSize) {
              this.#evict(true);
            }
          }
          this.#calculatedSize += sizes[index];
          if (status) {
            status.entrySize = size;
            status.totalCalculatedSize = this.#calculatedSize;
          }
        };
      }
      #removeItemSize = (_i) => {
      };
      #addItemSize = (_i, _s, _st) => {
      };
      #requireSize = (_k, _v, size, sizeCalculation) => {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
        return 0;
      };
      *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i = this.#tail; true; ) {
            if (!this.#isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.#isStale(i)) {
              yield i;
            }
            if (i === this.#head) {
              break;
            } else {
              i = this.#prev[i];
            }
          }
        }
      }
      *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
          for (let i = this.#head; true; ) {
            if (!this.#isValidIndex(i)) {
              break;
            }
            if (allowStale || !this.#isStale(i)) {
              yield i;
            }
            if (i === this.#tail) {
              break;
            } else {
              i = this.#next[i];
            }
          }
        }
      }
      #isValidIndex(index) {
        return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
      }
      /**
       * Return a generator yielding `[key, value]` pairs,
       * in order from most recently used to least recently used.
       */
      *entries() {
        for (const i of this.#indexes()) {
          if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield [this.#keyList[i], this.#valList[i]];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.entries}
       *
       * Return a generator yielding `[key, value]` pairs,
       * in order from least recently used to most recently used.
       */
      *rentries() {
        for (const i of this.#rindexes()) {
          if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield [this.#keyList[i], this.#valList[i]];
          }
        }
      }
      /**
       * Return a generator yielding the keys in the cache,
       * in order from most recently used to least recently used.
       */
      *keys() {
        for (const i of this.#indexes()) {
          const k = this.#keyList[i];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield k;
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.keys}
       *
       * Return a generator yielding the keys in the cache,
       * in order from least recently used to most recently used.
       */
      *rkeys() {
        for (const i of this.#rindexes()) {
          const k = this.#keyList[i];
          if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield k;
          }
        }
      }
      /**
       * Return a generator yielding the values in the cache,
       * in order from most recently used to least recently used.
       */
      *values() {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield this.#valList[i];
          }
        }
      }
      /**
       * Inverse order version of {@link LRUCache.values}
       *
       * Return a generator yielding the values in the cache,
       * in order from least recently used to most recently used.
       */
      *rvalues() {
        for (const i of this.#rindexes()) {
          const v = this.#valList[i];
          if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
            yield this.#valList[i];
          }
        }
      }
      /**
       * Iterating over the cache itself yields the same results as
       * {@link LRUCache.entries}
       */
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * A String value that is used in the creation of the default string description of an object.
       * Called by the built-in method Object.prototype.toString.
       */
      [Symbol.toStringTag] = "LRUCache";
      /**
       * Find a value for which the supplied fn method returns a truthy value,
       * similar to Array.find().  fn is called as fn(value, key, cache).
       */
      find(fn, getOptions = {}) {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          if (fn(value, this.#keyList[i], this)) {
            return this.get(this.#keyList[i], getOptions);
          }
        }
      }
      /**
       * Call the supplied function on each item in the cache, in order from
       * most recently used to least recently used.  fn is called as
       * fn(value, key, cache).  Does not update age or recenty of use.
       * Does not iterate over stale values.
       */
      forEach(fn, thisp = this) {
        for (const i of this.#indexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * The same as {@link LRUCache.forEach} but items are iterated over in
       * reverse order.  (ie, less recently used items are iterated over first.)
       */
      rforEach(fn, thisp = this) {
        for (const i of this.#rindexes()) {
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0)
            continue;
          fn.call(thisp, value, this.#keyList[i], this);
        }
      }
      /**
       * Delete any stale entries. Returns true if anything was removed,
       * false otherwise.
       */
      purgeStale() {
        let deleted = false;
        for (const i of this.#rindexes({ allowStale: true })) {
          if (this.#isStale(i)) {
            this.delete(this.#keyList[i]);
            deleted = true;
          }
        }
        return deleted;
      }
      /**
       * Get the extended info about a given entry, to get its value, size, and
       * TTL info simultaneously. Like {@link LRUCache#dump}, but just for a
       * single key. Always returns stale values, if their info is found in the
       * cache, so be sure to check for expired TTLs if relevant.
       */
      info(key) {
        const i = this.#keyMap.get(key);
        if (i === void 0)
          return void 0;
        const v = this.#valList[i];
        const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          return void 0;
        const entry = { value };
        if (this.#ttls && this.#starts) {
          const ttl = this.#ttls[i];
          const start = this.#starts[i];
          if (ttl && start) {
            const remain = ttl - (perf.now() - start);
            entry.ttl = remain;
            entry.start = Date.now();
          }
        }
        if (this.#sizes) {
          entry.size = this.#sizes[i];
        }
        return entry;
      }
      /**
       * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
       * passed to cache.load()
       */
      dump() {
        const arr = [];
        for (const i of this.#indexes({ allowStale: true })) {
          const key = this.#keyList[i];
          const v = this.#valList[i];
          const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
          if (value === void 0 || key === void 0)
            continue;
          const entry = { value };
          if (this.#ttls && this.#starts) {
            entry.ttl = this.#ttls[i];
            const age = perf.now() - this.#starts[i];
            entry.start = Math.floor(Date.now() - age);
          }
          if (this.#sizes) {
            entry.size = this.#sizes[i];
          }
          arr.unshift([key, entry]);
        }
        return arr;
      }
      /**
       * Reset the cache and load in the items in entries in the order listed.
       * Note that the shape of the resulting cache may be different if the
       * same options are not used in both caches.
       */
      load(arr) {
        this.clear();
        for (const [key, entry] of arr) {
          if (entry.start) {
            const age = Date.now() - entry.start;
            entry.start = perf.now() - age;
          }
          this.set(key, entry.value, entry);
        }
      }
      /**
       * Add a value to the cache.
       *
       * Note: if `undefined` is specified as a value, this is an alias for
       * {@link LRUCache#delete}
       */
      set(k, v, setOptions = {}) {
        if (v === void 0) {
          this.delete(k);
          return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        if (this.maxEntrySize && size > this.maxEntrySize) {
          if (status) {
            status.set = "miss";
            status.maxEntrySizeExceeded = true;
          }
          this.delete(k);
          return this;
        }
        let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
        if (index === void 0) {
          index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
          this.#keyList[index] = k;
          this.#valList[index] = v;
          this.#keyMap.set(k, index);
          this.#next[this.#tail] = index;
          this.#prev[index] = this.#tail;
          this.#tail = index;
          this.#size++;
          this.#addItemSize(index, size, status);
          if (status)
            status.set = "add";
          noUpdateTTL = false;
        } else {
          this.#moveToTail(index);
          const oldVal = this.#valList[index];
          if (v !== oldVal) {
            if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
              oldVal.__abortController.abort(new Error("replaced"));
              const { __staleWhileFetching: s } = oldVal;
              if (s !== void 0 && !noDisposeOnSet) {
                if (this.#hasDispose) {
                  this.#dispose?.(s, k, "set");
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([s, k, "set"]);
                }
              }
            } else if (!noDisposeOnSet) {
              if (this.#hasDispose) {
                this.#dispose?.(oldVal, k, "set");
              }
              if (this.#hasDisposeAfter) {
                this.#disposed?.push([oldVal, k, "set"]);
              }
            }
            this.#removeItemSize(index);
            this.#addItemSize(index, size, status);
            this.#valList[index] = v;
            if (status) {
              status.set = "replace";
              const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
              if (oldValue !== void 0)
                status.oldValue = oldValue;
            }
          } else if (status) {
            status.set = "update";
          }
        }
        if (ttl !== 0 && !this.#ttls) {
          this.#initializeTTLTracking();
        }
        if (this.#ttls) {
          if (!noUpdateTTL) {
            this.#setItemTTL(index, ttl, start);
          }
          if (status)
            this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return this;
      }
      /**
       * Evict the least recently used item, returning its value or
       * `undefined` if cache is empty.
       */
      pop() {
        try {
          while (this.#size) {
            const val = this.#valList[this.#head];
            this.#evict(true);
            if (this.#isBackgroundFetch(val)) {
              if (val.__staleWhileFetching) {
                return val.__staleWhileFetching;
              }
            } else if (val !== void 0) {
              return val;
            }
          }
        } finally {
          if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while (task = dt?.shift()) {
              this.#disposeAfter?.(...task);
            }
          }
        }
      }
      #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
          v.__abortController.abort(new Error("evicted"));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
          if (this.#hasDispose) {
            this.#dispose?.(v, k, "evict");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([v, k, "evict"]);
          }
        }
        this.#removeItemSize(head);
        if (free) {
          this.#keyList[head] = void 0;
          this.#valList[head] = void 0;
          this.#free.push(head);
        }
        if (this.#size === 1) {
          this.#head = this.#tail = 0;
          this.#free.length = 0;
        } else {
          this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
      }
      /**
       * Check if a key is in the cache, without updating the recency of use.
       * Will return false if the item is stale, even though it is technically
       * in the cache.
       *
       * Will not update item age unless
       * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
       */
      has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
            return false;
          }
          if (!this.#isStale(index)) {
            if (updateAgeOnHas) {
              this.#updateItemAge(index);
            }
            if (status) {
              status.has = "hit";
              this.#statusTTL(status, index);
            }
            return true;
          } else if (status) {
            status.has = "stale";
            this.#statusTTL(status, index);
          }
        } else if (status) {
          status.has = "miss";
        }
        return false;
      }
      /**
       * Like {@link LRUCache#get} but doesn't update recency or delete stale
       * items.
       *
       * Returns `undefined` if the item is stale, unless
       * {@link LRUCache.OptionsBase.allowStale} is set.
       */
      peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === void 0 || !allowStale && this.#isStale(index)) {
          return;
        }
        const v = this.#valList[index];
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      }
      #backgroundFetch(k, index, options, context) {
        const v = index === void 0 ? void 0 : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
          return v;
        }
        const ac = new AC();
        const { signal } = options;
        signal?.addEventListener("abort", () => ac.abort(signal.reason), {
          signal: ac.signal
        });
        const fetchOpts = {
          signal: ac.signal,
          options,
          context
        };
        const cb = (v2, updateCache = false) => {
          const { aborted } = ac.signal;
          const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
          if (options.status) {
            if (aborted && !updateCache) {
              options.status.fetchAborted = true;
              options.status.fetchError = ac.signal.reason;
              if (ignoreAbort)
                options.status.fetchAbortIgnored = true;
            } else {
              options.status.fetchResolved = true;
            }
          }
          if (aborted && !ignoreAbort && !updateCache) {
            return fetchFail(ac.signal.reason);
          }
          const bf2 = p;
          if (this.#valList[index] === p) {
            if (v2 === void 0) {
              if (bf2.__staleWhileFetching) {
                this.#valList[index] = bf2.__staleWhileFetching;
              } else {
                this.delete(k);
              }
            } else {
              if (options.status)
                options.status.fetchUpdated = true;
              this.set(k, v2, fetchOpts.options);
            }
          }
          return v2;
        };
        const eb = (er) => {
          if (options.status) {
            options.status.fetchRejected = true;
            options.status.fetchError = er;
          }
          return fetchFail(er);
        };
        const fetchFail = (er) => {
          const { aborted } = ac.signal;
          const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
          const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
          const noDelete = allowStale || options.noDeleteOnFetchRejection;
          const bf2 = p;
          if (this.#valList[index] === p) {
            const del = !noDelete || bf2.__staleWhileFetching === void 0;
            if (del) {
              this.delete(k);
            } else if (!allowStaleAborted) {
              this.#valList[index] = bf2.__staleWhileFetching;
            }
          }
          if (allowStale) {
            if (options.status && bf2.__staleWhileFetching !== void 0) {
              options.status.returnedStale = true;
            }
            return bf2.__staleWhileFetching;
          } else if (bf2.__returned === bf2) {
            throw er;
          }
        };
        const pcall = (res, rej) => {
          const fmp = this.#fetchMethod?.(k, v, fetchOpts);
          if (fmp && fmp instanceof Promise) {
            fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
          }
          ac.signal.addEventListener("abort", () => {
            if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
              res(void 0);
              if (options.allowStaleOnFetchAbort) {
                res = (v2) => cb(v2, true);
              }
            }
          });
        };
        if (options.status)
          options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
          __abortController: ac,
          __staleWhileFetching: v,
          __returned: void 0
        });
        if (index === void 0) {
          this.set(k, bf, { ...fetchOpts.options, status: void 0 });
          index = this.#keyMap.get(k);
        } else {
          this.#valList[index] = bf;
        }
        return bf;
      }
      #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod)
          return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
      }
      async fetch(k, fetchOptions = {}) {
        const {
          // get options
          allowStale = this.allowStale,
          updateAgeOnGet = this.updateAgeOnGet,
          noDeleteOnStaleGet = this.noDeleteOnStaleGet,
          // set options
          ttl = this.ttl,
          noDisposeOnSet = this.noDisposeOnSet,
          size = 0,
          sizeCalculation = this.sizeCalculation,
          noUpdateTTL = this.noUpdateTTL,
          // fetch exclusive options
          noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
          allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
          ignoreFetchAbort = this.ignoreFetchAbort,
          allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
          context,
          forceRefresh = false,
          status,
          signal
        } = fetchOptions;
        if (!this.#hasFetchMethod) {
          if (status)
            status.fetch = "get";
          return this.get(k, {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            status
          });
        }
        const options = {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          ttl,
          noDisposeOnSet,
          size,
          sizeCalculation,
          noUpdateTTL,
          noDeleteOnFetchRejection,
          allowStaleOnFetchRejection,
          allowStaleOnFetchAbort,
          ignoreFetchAbort,
          status,
          signal
        };
        let index = this.#keyMap.get(k);
        if (index === void 0) {
          if (status)
            status.fetch = "miss";
          const p = this.#backgroundFetch(k, index, options, context);
          return p.__returned = p;
        } else {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            const stale = allowStale && v.__staleWhileFetching !== void 0;
            if (status) {
              status.fetch = "inflight";
              if (stale)
                status.returnedStale = true;
            }
            return stale ? v.__staleWhileFetching : v.__returned = v;
          }
          const isStale = this.#isStale(index);
          if (!forceRefresh && !isStale) {
            if (status)
              status.fetch = "hit";
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            if (status)
              this.#statusTTL(status, index);
            return v;
          }
          const p = this.#backgroundFetch(k, index, options, context);
          const hasStale = p.__staleWhileFetching !== void 0;
          const staleVal = hasStale && allowStale;
          if (status) {
            status.fetch = isStale ? "stale" : "refresh";
            if (staleVal && isStale)
              status.returnedStale = true;
          }
          return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
      }
      /**
       * Return a value from the cache. Will update the recency of the cache
       * entry found.
       *
       * If the key is not found, get() will return `undefined`.
       */
      get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== void 0) {
          const value = this.#valList[index];
          const fetching = this.#isBackgroundFetch(value);
          if (status)
            this.#statusTTL(status, index);
          if (this.#isStale(index)) {
            if (status)
              status.get = "stale";
            if (!fetching) {
              if (!noDeleteOnStaleGet) {
                this.delete(k);
              }
              if (status && allowStale)
                status.returnedStale = true;
              return allowStale ? value : void 0;
            } else {
              if (status && allowStale && value.__staleWhileFetching !== void 0) {
                status.returnedStale = true;
              }
              return allowStale ? value.__staleWhileFetching : void 0;
            }
          } else {
            if (status)
              status.get = "hit";
            if (fetching) {
              return value.__staleWhileFetching;
            }
            this.#moveToTail(index);
            if (updateAgeOnGet) {
              this.#updateItemAge(index);
            }
            return value;
          }
        } else if (status) {
          status.get = "miss";
        }
      }
      #connect(p, n) {
        this.#prev[n] = p;
        this.#next[p] = n;
      }
      #moveToTail(index) {
        if (index !== this.#tail) {
          if (index === this.#head) {
            this.#head = this.#next[index];
          } else {
            this.#connect(this.#prev[index], this.#next[index]);
          }
          this.#connect(this.#tail, index);
          this.#tail = index;
        }
      }
      /**
       * Deletes a key out of the cache.
       * Returns true if the key was deleted, false otherwise.
       */
      delete(k) {
        let deleted = false;
        if (this.#size !== 0) {
          const index = this.#keyMap.get(k);
          if (index !== void 0) {
            deleted = true;
            if (this.#size === 1) {
              this.clear();
            } else {
              this.#removeItemSize(index);
              const v = this.#valList[index];
              if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error("deleted"));
              } else if (this.#hasDispose || this.#hasDisposeAfter) {
                if (this.#hasDispose) {
                  this.#dispose?.(v, k, "delete");
                }
                if (this.#hasDisposeAfter) {
                  this.#disposed?.push([v, k, "delete"]);
                }
              }
              this.#keyMap.delete(k);
              this.#keyList[index] = void 0;
              this.#valList[index] = void 0;
              if (index === this.#tail) {
                this.#tail = this.#prev[index];
              } else if (index === this.#head) {
                this.#head = this.#next[index];
              } else {
                const pi = this.#prev[index];
                this.#next[pi] = this.#next[index];
                const ni = this.#next[index];
                this.#prev[ni] = this.#prev[index];
              }
              this.#size--;
              this.#free.push(index);
            }
          }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
        return deleted;
      }
      /**
       * Clear the cache entirely, throwing away all values.
       */
      clear() {
        for (const index of this.#rindexes({ allowStale: true })) {
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else {
            const k = this.#keyList[index];
            if (this.#hasDispose) {
              this.#dispose?.(v, k, "delete");
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, "delete"]);
            }
          }
        }
        this.#keyMap.clear();
        this.#valList.fill(void 0);
        this.#keyList.fill(void 0);
        if (this.#ttls && this.#starts) {
          this.#ttls.fill(0);
          this.#starts.fill(0);
        }
        if (this.#sizes) {
          this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
          const dt = this.#disposed;
          let task;
          while (task = dt?.shift()) {
            this.#disposeAfter?.(...task);
          }
        }
      }
    };
    exports.LRUCache = LRUCache;
  }
});

// node_modules/minipass/dist/commonjs/index.js
var require_commonjs3 = __commonJS({
  "node_modules/minipass/dist/commonjs/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Minipass = exports.isWritable = exports.isReadable = exports.isStream = void 0;
    var proc = typeof process === "object" && process ? process : {
      stdout: null,
      stderr: null
    };
    var events_1 = __require("events");
    var stream_1 = __importDefault(__require("stream"));
    var string_decoder_1 = __require("string_decoder");
    var isStream = (s) => !!s && typeof s === "object" && (s instanceof Minipass || s instanceof stream_1.default || (0, exports.isReadable)(s) || (0, exports.isWritable)(s));
    exports.isStream = isStream;
    var isReadable = (s) => !!s && typeof s === "object" && s instanceof events_1.EventEmitter && typeof s.pipe === "function" && // node core Writable streams have a pipe() method, but it throws
    s.pipe !== stream_1.default.Writable.prototype.pipe;
    exports.isReadable = isReadable;
    var isWritable = (s) => !!s && typeof s === "object" && s instanceof events_1.EventEmitter && typeof s.write === "function" && typeof s.end === "function";
    exports.isWritable = isWritable;
    var EOF = Symbol("EOF");
    var MAYBE_EMIT_END = Symbol("maybeEmitEnd");
    var EMITTED_END = Symbol("emittedEnd");
    var EMITTING_END = Symbol("emittingEnd");
    var EMITTED_ERROR = Symbol("emittedError");
    var CLOSED = Symbol("closed");
    var READ = Symbol("read");
    var FLUSH = Symbol("flush");
    var FLUSHCHUNK = Symbol("flushChunk");
    var ENCODING = Symbol("encoding");
    var DECODER = Symbol("decoder");
    var FLOWING = Symbol("flowing");
    var PAUSED = Symbol("paused");
    var RESUME = Symbol("resume");
    var BUFFER = Symbol("buffer");
    var PIPES = Symbol("pipes");
    var BUFFERLENGTH = Symbol("bufferLength");
    var BUFFERPUSH = Symbol("bufferPush");
    var BUFFERSHIFT = Symbol("bufferShift");
    var OBJECTMODE = Symbol("objectMode");
    var DESTROYED = Symbol("destroyed");
    var ERROR = Symbol("error");
    var EMITDATA = Symbol("emitData");
    var EMITEND = Symbol("emitEnd");
    var EMITEND2 = Symbol("emitEnd2");
    var ASYNC = Symbol("async");
    var ABORT = Symbol("abort");
    var ABORTED = Symbol("aborted");
    var SIGNAL = Symbol("signal");
    var DATALISTENERS = Symbol("dataListeners");
    var DISCARDED = Symbol("discarded");
    var defer = (fn) => Promise.resolve().then(fn);
    var nodefer = (fn) => fn();
    var isEndish = (ev) => ev === "end" || ev === "finish" || ev === "prefinish";
    var isArrayBufferLike = (b) => b instanceof ArrayBuffer || !!b && typeof b === "object" && b.constructor && b.constructor.name === "ArrayBuffer" && b.byteLength >= 0;
    var isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
    var Pipe = class {
      src;
      dest;
      opts;
      ondrain;
      constructor(src, dest, opts) {
        this.src = src;
        this.dest = dest;
        this.opts = opts;
        this.ondrain = () => src[RESUME]();
        this.dest.on("drain", this.ondrain);
      }
      unpipe() {
        this.dest.removeListener("drain", this.ondrain);
      }
      // only here for the prototype
      /* c8 ignore start */
      proxyErrors(_er) {
      }
      /* c8 ignore stop */
      end() {
        this.unpipe();
        if (this.opts.end)
          this.dest.end();
      }
    };
    var PipeProxyErrors = class extends Pipe {
      unpipe() {
        this.src.removeListener("error", this.proxyErrors);
        super.unpipe();
      }
      constructor(src, dest, opts) {
        super(src, dest, opts);
        this.proxyErrors = (er) => dest.emit("error", er);
        src.on("error", this.proxyErrors);
      }
    };
    var isObjectModeOptions = (o) => !!o.objectMode;
    var isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== "buffer";
    var Minipass = class extends events_1.EventEmitter {
      [FLOWING] = false;
      [PAUSED] = false;
      [PIPES] = [];
      [BUFFER] = [];
      [OBJECTMODE];
      [ENCODING];
      [ASYNC];
      [DECODER];
      [EOF] = false;
      [EMITTED_END] = false;
      [EMITTING_END] = false;
      [CLOSED] = false;
      [EMITTED_ERROR] = null;
      [BUFFERLENGTH] = 0;
      [DESTROYED] = false;
      [SIGNAL];
      [ABORTED] = false;
      [DATALISTENERS] = 0;
      [DISCARDED] = false;
      /**
       * true if the stream can be written
       */
      writable = true;
      /**
       * true if the stream can be read
       */
      readable = true;
      /**
       * If `RType` is Buffer, then options do not need to be provided.
       * Otherwise, an options object must be provided to specify either
       * {@link Minipass.SharedOptions.objectMode} or
       * {@link Minipass.SharedOptions.encoding}, as appropriate.
       */
      constructor(...args) {
        const options = args[0] || {};
        super();
        if (options.objectMode && typeof options.encoding === "string") {
          throw new TypeError("Encoding and objectMode may not be used together");
        }
        if (isObjectModeOptions(options)) {
          this[OBJECTMODE] = true;
          this[ENCODING] = null;
        } else if (isEncodingOptions(options)) {
          this[ENCODING] = options.encoding;
          this[OBJECTMODE] = false;
        } else {
          this[OBJECTMODE] = false;
          this[ENCODING] = null;
        }
        this[ASYNC] = !!options.async;
        this[DECODER] = this[ENCODING] ? new string_decoder_1.StringDecoder(this[ENCODING]) : null;
        if (options && options.debugExposeBuffer === true) {
          Object.defineProperty(this, "buffer", { get: () => this[BUFFER] });
        }
        if (options && options.debugExposePipes === true) {
          Object.defineProperty(this, "pipes", { get: () => this[PIPES] });
        }
        const { signal } = options;
        if (signal) {
          this[SIGNAL] = signal;
          if (signal.aborted) {
            this[ABORT]();
          } else {
            signal.addEventListener("abort", () => this[ABORT]());
          }
        }
      }
      /**
       * The amount of data stored in the buffer waiting to be read.
       *
       * For Buffer strings, this will be the total byte length.
       * For string encoding streams, this will be the string character length,
       * according to JavaScript's `string.length` logic.
       * For objectMode streams, this is a count of the items waiting to be
       * emitted.
       */
      get bufferLength() {
        return this[BUFFERLENGTH];
      }
      /**
       * The `BufferEncoding` currently in use, or `null`
       */
      get encoding() {
        return this[ENCODING];
      }
      /**
       * @deprecated - This is a read only property
       */
      set encoding(_enc) {
        throw new Error("Encoding must be set at instantiation time");
      }
      /**
       * @deprecated - Encoding may only be set at instantiation time
       */
      setEncoding(_enc) {
        throw new Error("Encoding must be set at instantiation time");
      }
      /**
       * True if this is an objectMode stream
       */
      get objectMode() {
        return this[OBJECTMODE];
      }
      /**
       * @deprecated - This is a read-only property
       */
      set objectMode(_om) {
        throw new Error("objectMode must be set at instantiation time");
      }
      /**
       * true if this is an async stream
       */
      get ["async"]() {
        return this[ASYNC];
      }
      /**
       * Set to true to make this stream async.
       *
       * Once set, it cannot be unset, as this would potentially cause incorrect
       * behavior.  Ie, a sync stream can be made async, but an async stream
       * cannot be safely made sync.
       */
      set ["async"](a) {
        this[ASYNC] = this[ASYNC] || !!a;
      }
      // drop everything and get out of the flow completely
      [ABORT]() {
        this[ABORTED] = true;
        this.emit("abort", this[SIGNAL]?.reason);
        this.destroy(this[SIGNAL]?.reason);
      }
      /**
       * True if the stream has been aborted.
       */
      get aborted() {
        return this[ABORTED];
      }
      /**
       * No-op setter. Stream aborted status is set via the AbortSignal provided
       * in the constructor options.
       */
      set aborted(_) {
      }
      write(chunk, encoding, cb) {
        if (this[ABORTED])
          return false;
        if (this[EOF])
          throw new Error("write after end");
        if (this[DESTROYED]) {
          this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), { code: "ERR_STREAM_DESTROYED" }));
          return true;
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = "utf8";
        }
        if (!encoding)
          encoding = "utf8";
        const fn = this[ASYNC] ? defer : nodefer;
        if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
          if (isArrayBufferView(chunk)) {
            chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
          } else if (isArrayBufferLike(chunk)) {
            chunk = Buffer.from(chunk);
          } else if (typeof chunk !== "string") {
            throw new Error("Non-contiguous data written to non-objectMode stream");
          }
        }
        if (this[OBJECTMODE]) {
          if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
            this[FLUSH](true);
          if (this[FLOWING])
            this.emit("data", chunk);
          else
            this[BUFFERPUSH](chunk);
          if (this[BUFFERLENGTH] !== 0)
            this.emit("readable");
          if (cb)
            fn(cb);
          return this[FLOWING];
        }
        if (!chunk.length) {
          if (this[BUFFERLENGTH] !== 0)
            this.emit("readable");
          if (cb)
            fn(cb);
          return this[FLOWING];
        }
        if (typeof chunk === "string" && // unless it is a string already ready for us to use
        !(encoding === this[ENCODING] && !this[DECODER]?.lastNeed)) {
          chunk = Buffer.from(chunk, encoding);
        }
        if (Buffer.isBuffer(chunk) && this[ENCODING]) {
          chunk = this[DECODER].write(chunk);
        }
        if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
          this[FLUSH](true);
        if (this[FLOWING])
          this.emit("data", chunk);
        else
          this[BUFFERPUSH](chunk);
        if (this[BUFFERLENGTH] !== 0)
          this.emit("readable");
        if (cb)
          fn(cb);
        return this[FLOWING];
      }
      /**
       * Low-level explicit read method.
       *
       * In objectMode, the argument is ignored, and one item is returned if
       * available.
       *
       * `n` is the number of bytes (or in the case of encoding streams,
       * characters) to consume. If `n` is not provided, then the entire buffer
       * is returned, or `null` is returned if no data is available.
       *
       * If `n` is greater that the amount of data in the internal buffer,
       * then `null` is returned.
       */
      read(n) {
        if (this[DESTROYED])
          return null;
        this[DISCARDED] = false;
        if (this[BUFFERLENGTH] === 0 || n === 0 || n && n > this[BUFFERLENGTH]) {
          this[MAYBE_EMIT_END]();
          return null;
        }
        if (this[OBJECTMODE])
          n = null;
        if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
          this[BUFFER] = [
            this[ENCODING] ? this[BUFFER].join("") : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])
          ];
        }
        const ret = this[READ](n || null, this[BUFFER][0]);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [READ](n, chunk) {
        if (this[OBJECTMODE])
          this[BUFFERSHIFT]();
        else {
          const c = chunk;
          if (n === c.length || n === null)
            this[BUFFERSHIFT]();
          else if (typeof c === "string") {
            this[BUFFER][0] = c.slice(n);
            chunk = c.slice(0, n);
            this[BUFFERLENGTH] -= n;
          } else {
            this[BUFFER][0] = c.subarray(n);
            chunk = c.subarray(0, n);
            this[BUFFERLENGTH] -= n;
          }
        }
        this.emit("data", chunk);
        if (!this[BUFFER].length && !this[EOF])
          this.emit("drain");
        return chunk;
      }
      end(chunk, encoding, cb) {
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = void 0;
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = "utf8";
        }
        if (chunk !== void 0)
          this.write(chunk, encoding);
        if (cb)
          this.once("end", cb);
        this[EOF] = true;
        this.writable = false;
        if (this[FLOWING] || !this[PAUSED])
          this[MAYBE_EMIT_END]();
        return this;
      }
      // don't let the internal resume be overwritten
      [RESUME]() {
        if (this[DESTROYED])
          return;
        if (!this[DATALISTENERS] && !this[PIPES].length) {
          this[DISCARDED] = true;
        }
        this[PAUSED] = false;
        this[FLOWING] = true;
        this.emit("resume");
        if (this[BUFFER].length)
          this[FLUSH]();
        else if (this[EOF])
          this[MAYBE_EMIT_END]();
        else
          this.emit("drain");
      }
      /**
       * Resume the stream if it is currently in a paused state
       *
       * If called when there are no pipe destinations or `data` event listeners,
       * this will place the stream in a "discarded" state, where all data will
       * be thrown away. The discarded state is removed if a pipe destination or
       * data handler is added, if pause() is called, or if any synchronous or
       * asynchronous iteration is started.
       */
      resume() {
        return this[RESUME]();
      }
      /**
       * Pause the stream
       */
      pause() {
        this[FLOWING] = false;
        this[PAUSED] = true;
        this[DISCARDED] = false;
      }
      /**
       * true if the stream has been forcibly destroyed
       */
      get destroyed() {
        return this[DESTROYED];
      }
      /**
       * true if the stream is currently in a flowing state, meaning that
       * any writes will be immediately emitted.
       */
      get flowing() {
        return this[FLOWING];
      }
      /**
       * true if the stream is currently in a paused state
       */
      get paused() {
        return this[PAUSED];
      }
      [BUFFERPUSH](chunk) {
        if (this[OBJECTMODE])
          this[BUFFERLENGTH] += 1;
        else
          this[BUFFERLENGTH] += chunk.length;
        this[BUFFER].push(chunk);
      }
      [BUFFERSHIFT]() {
        if (this[OBJECTMODE])
          this[BUFFERLENGTH] -= 1;
        else
          this[BUFFERLENGTH] -= this[BUFFER][0].length;
        return this[BUFFER].shift();
      }
      [FLUSH](noDrain = false) {
        do {
        } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) && this[BUFFER].length);
        if (!noDrain && !this[BUFFER].length && !this[EOF])
          this.emit("drain");
      }
      [FLUSHCHUNK](chunk) {
        this.emit("data", chunk);
        return this[FLOWING];
      }
      /**
       * Pipe all data emitted by this stream into the destination provided.
       *
       * Triggers the flow of data.
       */
      pipe(dest, opts) {
        if (this[DESTROYED])
          return dest;
        this[DISCARDED] = false;
        const ended = this[EMITTED_END];
        opts = opts || {};
        if (dest === proc.stdout || dest === proc.stderr)
          opts.end = false;
        else
          opts.end = opts.end !== false;
        opts.proxyErrors = !!opts.proxyErrors;
        if (ended) {
          if (opts.end)
            dest.end();
        } else {
          this[PIPES].push(!opts.proxyErrors ? new Pipe(this, dest, opts) : new PipeProxyErrors(this, dest, opts));
          if (this[ASYNC])
            defer(() => this[RESUME]());
          else
            this[RESUME]();
        }
        return dest;
      }
      /**
       * Fully unhook a piped destination stream.
       *
       * If the destination stream was the only consumer of this stream (ie,
       * there are no other piped destinations or `'data'` event listeners)
       * then the flow of data will stop until there is another consumer or
       * {@link Minipass#resume} is explicitly called.
       */
      unpipe(dest) {
        const p = this[PIPES].find((p2) => p2.dest === dest);
        if (p) {
          if (this[PIPES].length === 1) {
            if (this[FLOWING] && this[DATALISTENERS] === 0) {
              this[FLOWING] = false;
            }
            this[PIPES] = [];
          } else
            this[PIPES].splice(this[PIPES].indexOf(p), 1);
          p.unpipe();
        }
      }
      /**
       * Alias for {@link Minipass#on}
       */
      addListener(ev, handler) {
        return this.on(ev, handler);
      }
      /**
       * Mostly identical to `EventEmitter.on`, with the following
       * behavior differences to prevent data loss and unnecessary hangs:
       *
       * - Adding a 'data' event handler will trigger the flow of data
       *
       * - Adding a 'readable' event handler when there is data waiting to be read
       *   will cause 'readable' to be emitted immediately.
       *
       * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
       *   already passed will cause the event to be emitted immediately and all
       *   handlers removed.
       *
       * - Adding an 'error' event handler after an error has been emitted will
       *   cause the event to be re-emitted immediately with the error previously
       *   raised.
       */
      on(ev, handler) {
        const ret = super.on(ev, handler);
        if (ev === "data") {
          this[DISCARDED] = false;
          this[DATALISTENERS]++;
          if (!this[PIPES].length && !this[FLOWING]) {
            this[RESUME]();
          }
        } else if (ev === "readable" && this[BUFFERLENGTH] !== 0) {
          super.emit("readable");
        } else if (isEndish(ev) && this[EMITTED_END]) {
          super.emit(ev);
          this.removeAllListeners(ev);
        } else if (ev === "error" && this[EMITTED_ERROR]) {
          const h = handler;
          if (this[ASYNC])
            defer(() => h.call(this, this[EMITTED_ERROR]));
          else
            h.call(this, this[EMITTED_ERROR]);
        }
        return ret;
      }
      /**
       * Alias for {@link Minipass#off}
       */
      removeListener(ev, handler) {
        return this.off(ev, handler);
      }
      /**
       * Mostly identical to `EventEmitter.off`
       *
       * If a 'data' event handler is removed, and it was the last consumer
       * (ie, there are no pipe destinations or other 'data' event listeners),
       * then the flow of data will stop until there is another consumer or
       * {@link Minipass#resume} is explicitly called.
       */
      off(ev, handler) {
        const ret = super.off(ev, handler);
        if (ev === "data") {
          this[DATALISTENERS] = this.listeners("data").length;
          if (this[DATALISTENERS] === 0 && !this[DISCARDED] && !this[PIPES].length) {
            this[FLOWING] = false;
          }
        }
        return ret;
      }
      /**
       * Mostly identical to `EventEmitter.removeAllListeners`
       *
       * If all 'data' event handlers are removed, and they were the last consumer
       * (ie, there are no pipe destinations), then the flow of data will stop
       * until there is another consumer or {@link Minipass#resume} is explicitly
       * called.
       */
      removeAllListeners(ev) {
        const ret = super.removeAllListeners(ev);
        if (ev === "data" || ev === void 0) {
          this[DATALISTENERS] = 0;
          if (!this[DISCARDED] && !this[PIPES].length) {
            this[FLOWING] = false;
          }
        }
        return ret;
      }
      /**
       * true if the 'end' event has been emitted
       */
      get emittedEnd() {
        return this[EMITTED_END];
      }
      [MAYBE_EMIT_END]() {
        if (!this[EMITTING_END] && !this[EMITTED_END] && !this[DESTROYED] && this[BUFFER].length === 0 && this[EOF]) {
          this[EMITTING_END] = true;
          this.emit("end");
          this.emit("prefinish");
          this.emit("finish");
          if (this[CLOSED])
            this.emit("close");
          this[EMITTING_END] = false;
        }
      }
      /**
       * Mostly identical to `EventEmitter.emit`, with the following
       * behavior differences to prevent data loss and unnecessary hangs:
       *
       * If the stream has been destroyed, and the event is something other
       * than 'close' or 'error', then `false` is returned and no handlers
       * are called.
       *
       * If the event is 'end', and has already been emitted, then the event
       * is ignored. If the stream is in a paused or non-flowing state, then
       * the event will be deferred until data flow resumes. If the stream is
       * async, then handlers will be called on the next tick rather than
       * immediately.
       *
       * If the event is 'close', and 'end' has not yet been emitted, then
       * the event will be deferred until after 'end' is emitted.
       *
       * If the event is 'error', and an AbortSignal was provided for the stream,
       * and there are no listeners, then the event is ignored, matching the
       * behavior of node core streams in the presense of an AbortSignal.
       *
       * If the event is 'finish' or 'prefinish', then all listeners will be
       * removed after emitting the event, to prevent double-firing.
       */
      emit(ev, ...args) {
        const data = args[0];
        if (ev !== "error" && ev !== "close" && ev !== DESTROYED && this[DESTROYED]) {
          return false;
        } else if (ev === "data") {
          return !this[OBJECTMODE] && !data ? false : this[ASYNC] ? (defer(() => this[EMITDATA](data)), true) : this[EMITDATA](data);
        } else if (ev === "end") {
          return this[EMITEND]();
        } else if (ev === "close") {
          this[CLOSED] = true;
          if (!this[EMITTED_END] && !this[DESTROYED])
            return false;
          const ret2 = super.emit("close");
          this.removeAllListeners("close");
          return ret2;
        } else if (ev === "error") {
          this[EMITTED_ERROR] = data;
          super.emit(ERROR, data);
          const ret2 = !this[SIGNAL] || this.listeners("error").length ? super.emit("error", data) : false;
          this[MAYBE_EMIT_END]();
          return ret2;
        } else if (ev === "resume") {
          const ret2 = super.emit("resume");
          this[MAYBE_EMIT_END]();
          return ret2;
        } else if (ev === "finish" || ev === "prefinish") {
          const ret2 = super.emit(ev);
          this.removeAllListeners(ev);
          return ret2;
        }
        const ret = super.emit(ev, ...args);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [EMITDATA](data) {
        for (const p of this[PIPES]) {
          if (p.dest.write(data) === false)
            this.pause();
        }
        const ret = this[DISCARDED] ? false : super.emit("data", data);
        this[MAYBE_EMIT_END]();
        return ret;
      }
      [EMITEND]() {
        if (this[EMITTED_END])
          return false;
        this[EMITTED_END] = true;
        this.readable = false;
        return this[ASYNC] ? (defer(() => this[EMITEND2]()), true) : this[EMITEND2]();
      }
      [EMITEND2]() {
        if (this[DECODER]) {
          const data = this[DECODER].end();
          if (data) {
            for (const p of this[PIPES]) {
              p.dest.write(data);
            }
            if (!this[DISCARDED])
              super.emit("data", data);
          }
        }
        for (const p of this[PIPES]) {
          p.end();
        }
        const ret = super.emit("end");
        this.removeAllListeners("end");
        return ret;
      }
      /**
       * Return a Promise that resolves to an array of all emitted data once
       * the stream ends.
       */
      async collect() {
        const buf = Object.assign([], {
          dataLength: 0
        });
        if (!this[OBJECTMODE])
          buf.dataLength = 0;
        const p = this.promise();
        this.on("data", (c) => {
          buf.push(c);
          if (!this[OBJECTMODE])
            buf.dataLength += c.length;
        });
        await p;
        return buf;
      }
      /**
       * Return a Promise that resolves to the concatenation of all emitted data
       * once the stream ends.
       *
       * Not allowed on objectMode streams.
       */
      async concat() {
        if (this[OBJECTMODE]) {
          throw new Error("cannot concat in objectMode");
        }
        const buf = await this.collect();
        return this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength);
      }
      /**
       * Return a void Promise that resolves once the stream ends.
       */
      async promise() {
        return new Promise((resolve, reject) => {
          this.on(DESTROYED, () => reject(new Error("stream destroyed")));
          this.on("error", (er) => reject(er));
          this.on("end", () => resolve());
        });
      }
      /**
       * Asynchronous `for await of` iteration.
       *
       * This will continue emitting all chunks until the stream terminates.
       */
      [Symbol.asyncIterator]() {
        this[DISCARDED] = false;
        let stopped = false;
        const stop = async () => {
          this.pause();
          stopped = true;
          return { value: void 0, done: true };
        };
        const next = () => {
          if (stopped)
            return stop();
          const res = this.read();
          if (res !== null)
            return Promise.resolve({ done: false, value: res });
          if (this[EOF])
            return stop();
          let resolve;
          let reject;
          const onerr = (er) => {
            this.off("data", ondata);
            this.off("end", onend);
            this.off(DESTROYED, ondestroy);
            stop();
            reject(er);
          };
          const ondata = (value) => {
            this.off("error", onerr);
            this.off("end", onend);
            this.off(DESTROYED, ondestroy);
            this.pause();
            resolve({ value, done: !!this[EOF] });
          };
          const onend = () => {
            this.off("error", onerr);
            this.off("data", ondata);
            this.off(DESTROYED, ondestroy);
            stop();
            resolve({ done: true, value: void 0 });
          };
          const ondestroy = () => onerr(new Error("stream destroyed"));
          return new Promise((res2, rej) => {
            reject = rej;
            resolve = res2;
            this.once(DESTROYED, ondestroy);
            this.once("error", onerr);
            this.once("end", onend);
            this.once("data", ondata);
          });
        };
        return {
          next,
          throw: stop,
          return: stop,
          [Symbol.asyncIterator]() {
            return this;
          }
        };
      }
      /**
       * Synchronous `for of` iteration.
       *
       * The iteration will terminate when the internal buffer runs out, even
       * if the stream has not yet terminated.
       */
      [Symbol.iterator]() {
        this[DISCARDED] = false;
        let stopped = false;
        const stop = () => {
          this.pause();
          this.off(ERROR, stop);
          this.off(DESTROYED, stop);
          this.off("end", stop);
          stopped = true;
          return { done: true, value: void 0 };
        };
        const next = () => {
          if (stopped)
            return stop();
          const value = this.read();
          return value === null ? stop() : { done: false, value };
        };
        this.once("end", stop);
        this.once(ERROR, stop);
        this.once(DESTROYED, stop);
        return {
          next,
          throw: stop,
          return: stop,
          [Symbol.iterator]() {
            return this;
          }
        };
      }
      /**
       * Destroy a stream, preventing it from being used for any further purpose.
       *
       * If the stream has a `close()` method, then it will be called on
       * destruction.
       *
       * After destruction, any attempt to write data, read data, or emit most
       * events will be ignored.
       *
       * If an error argument is provided, then it will be emitted in an
       * 'error' event.
       */
      destroy(er) {
        if (this[DESTROYED]) {
          if (er)
            this.emit("error", er);
          else
            this.emit(DESTROYED);
          return this;
        }
        this[DESTROYED] = true;
        this[DISCARDED] = true;
        this[BUFFER].length = 0;
        this[BUFFERLENGTH] = 0;
        const wc = this;
        if (typeof wc.close === "function" && !this[CLOSED])
          wc.close();
        if (er)
          this.emit("error", er);
        else
          this.emit(DESTROYED);
        return this;
      }
      /**
       * Alias for {@link isStream}
       *
       * Former export location, maintained for backwards compatibility.
       *
       * @deprecated
       */
      static get isStream() {
        return exports.isStream;
      }
    };
    exports.Minipass = Minipass;
  }
});

// node_modules/path-scurry/dist/commonjs/index.js
var require_commonjs4 = __commonJS({
  "node_modules/path-scurry/dist/commonjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PathScurry = exports.Path = exports.PathScurryDarwin = exports.PathScurryPosix = exports.PathScurryWin32 = exports.PathScurryBase = exports.PathPosix = exports.PathWin32 = exports.PathBase = exports.ChildrenCache = exports.ResolveCache = void 0;
    var lru_cache_1 = require_commonjs2();
    var path_1 = __require("path");
    var url_1 = __require("url");
    var actualFS = __importStar(__require("fs"));
    var fs_1 = __require("fs");
    var realpathSync = fs_1.realpathSync.native;
    var promises_1 = __require("fs/promises");
    var minipass_1 = require_commonjs3();
    var defaultFS = {
      lstatSync: fs_1.lstatSync,
      readdir: fs_1.readdir,
      readdirSync: fs_1.readdirSync,
      readlinkSync: fs_1.readlinkSync,
      realpathSync,
      promises: {
        lstat: promises_1.lstat,
        readdir: promises_1.readdir,
        readlink: promises_1.readlink,
        realpath: promises_1.realpath
      }
    };
    var fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ? defaultFS : {
      ...defaultFS,
      ...fsOption,
      promises: {
        ...defaultFS.promises,
        ...fsOption.promises || {}
      }
    };
    var uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
    var uncToDrive = (rootPath) => rootPath.replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
    var eitherSep = /[\\\/]/;
    var UNKNOWN = 0;
    var IFIFO = 1;
    var IFCHR = 2;
    var IFDIR = 4;
    var IFBLK = 6;
    var IFREG = 8;
    var IFLNK = 10;
    var IFSOCK = 12;
    var IFMT = 15;
    var IFMT_UNKNOWN = ~IFMT;
    var READDIR_CALLED = 16;
    var LSTAT_CALLED = 32;
    var ENOTDIR = 64;
    var ENOENT = 128;
    var ENOREADLINK = 256;
    var ENOREALPATH = 512;
    var ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
    var TYPEMASK = 1023;
    var entToType = (s) => s.isFile() ? IFREG : s.isDirectory() ? IFDIR : s.isSymbolicLink() ? IFLNK : s.isCharacterDevice() ? IFCHR : s.isBlockDevice() ? IFBLK : s.isSocket() ? IFSOCK : s.isFIFO() ? IFIFO : UNKNOWN;
    var normalizeCache = /* @__PURE__ */ new Map();
    var normalize = (s) => {
      const c = normalizeCache.get(s);
      if (c)
        return c;
      const n = s.normalize("NFKD");
      normalizeCache.set(s, n);
      return n;
    };
    var normalizeNocaseCache = /* @__PURE__ */ new Map();
    var normalizeNocase = (s) => {
      const c = normalizeNocaseCache.get(s);
      if (c)
        return c;
      const n = normalize(s.toLowerCase());
      normalizeNocaseCache.set(s, n);
      return n;
    };
    var ResolveCache = class extends lru_cache_1.LRUCache {
      constructor() {
        super({ max: 256 });
      }
    };
    exports.ResolveCache = ResolveCache;
    var ChildrenCache = class extends lru_cache_1.LRUCache {
      constructor(maxSize = 16 * 1024) {
        super({
          maxSize,
          // parent + children
          sizeCalculation: (a) => a.length + 1
        });
      }
    };
    exports.ChildrenCache = ChildrenCache;
    var setAsCwd = Symbol("PathScurry setAsCwd");
    var PathBase = class {
      /**
       * the basename of this path
       *
       * **Important**: *always* test the path name against any test string
       * usingthe {@link isNamed} method, and not by directly comparing this
       * string. Otherwise, unicode path strings that the system sees as identical
       * will not be properly treated as the same path, leading to incorrect
       * behavior and possible security issues.
       */
      name;
      /**
       * the Path entry corresponding to the path root.
       *
       * @internal
       */
      root;
      /**
       * All roots found within the current PathScurry family
       *
       * @internal
       */
      roots;
      /**
       * a reference to the parent path, or undefined in the case of root entries
       *
       * @internal
       */
      parent;
      /**
       * boolean indicating whether paths are compared case-insensitively
       * @internal
       */
      nocase;
      // potential default fs override
      #fs;
      // Stats fields
      #dev;
      get dev() {
        return this.#dev;
      }
      #mode;
      get mode() {
        return this.#mode;
      }
      #nlink;
      get nlink() {
        return this.#nlink;
      }
      #uid;
      get uid() {
        return this.#uid;
      }
      #gid;
      get gid() {
        return this.#gid;
      }
      #rdev;
      get rdev() {
        return this.#rdev;
      }
      #blksize;
      get blksize() {
        return this.#blksize;
      }
      #ino;
      get ino() {
        return this.#ino;
      }
      #size;
      get size() {
        return this.#size;
      }
      #blocks;
      get blocks() {
        return this.#blocks;
      }
      #atimeMs;
      get atimeMs() {
        return this.#atimeMs;
      }
      #mtimeMs;
      get mtimeMs() {
        return this.#mtimeMs;
      }
      #ctimeMs;
      get ctimeMs() {
        return this.#ctimeMs;
      }
      #birthtimeMs;
      get birthtimeMs() {
        return this.#birthtimeMs;
      }
      #atime;
      get atime() {
        return this.#atime;
      }
      #mtime;
      get mtime() {
        return this.#mtime;
      }
      #ctime;
      get ctime() {
        return this.#ctime;
      }
      #birthtime;
      get birthtime() {
        return this.#birthtime;
      }
      #matchName;
      #depth;
      #fullpath;
      #fullpathPosix;
      #relative;
      #relativePosix;
      #type;
      #children;
      #linkTarget;
      #realpath;
      /**
       * This property is for compatibility with the Dirent class as of
       * Node v20, where Dirent['path'] refers to the path of the directory
       * that was passed to readdir.  So, somewhat counterintuitively, this
       * property refers to the *parent* path, not the path object itself.
       * For root entries, it's the path to the entry itself.
       */
      get path() {
        return (this.parent || this).fullpath();
      }
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        this.name = name;
        this.#matchName = nocase ? normalizeNocase(name) : normalize(name);
        this.#type = type & TYPEMASK;
        this.nocase = nocase;
        this.roots = roots;
        this.root = root || this;
        this.#children = children;
        this.#fullpath = opts.fullpath;
        this.#relative = opts.relative;
        this.#relativePosix = opts.relativePosix;
        this.parent = opts.parent;
        if (this.parent) {
          this.#fs = this.parent.#fs;
        } else {
          this.#fs = fsFromOption(opts.fs);
        }
      }
      /**
       * Returns the depth of the Path object from its root.
       *
       * For example, a path at `/foo/bar` would have a depth of 2.
       */
      depth() {
        if (this.#depth !== void 0)
          return this.#depth;
        if (!this.parent)
          return this.#depth = 0;
        return this.#depth = this.parent.depth() + 1;
      }
      /**
       * @internal
       */
      childrenCache() {
        return this.#children;
      }
      /**
       * Get the Path object referenced by the string path, resolved from this Path
       */
      resolve(path) {
        if (!path) {
          return this;
        }
        const rootPath = this.getRootString(path);
        const dir = path.substring(rootPath.length);
        const dirParts = dir.split(this.splitSep);
        const result = rootPath ? this.getRoot(rootPath).#resolveParts(dirParts) : this.#resolveParts(dirParts);
        return result;
      }
      #resolveParts(dirParts) {
        let p = this;
        for (const part of dirParts) {
          p = p.child(part);
        }
        return p;
      }
      /**
       * Returns the cached children Path objects, if still available.  If they
       * have fallen out of the cache, then returns an empty array, and resets the
       * READDIR_CALLED bit, so that future calls to readdir() will require an fs
       * lookup.
       *
       * @internal
       */
      children() {
        const cached = this.#children.get(this);
        if (cached) {
          return cached;
        }
        const children = Object.assign([], { provisional: 0 });
        this.#children.set(this, children);
        this.#type &= ~READDIR_CALLED;
        return children;
      }
      /**
       * Resolves a path portion and returns or creates the child Path.
       *
       * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
       * `'..'`.
       *
       * This should not be called directly.  If `pathPart` contains any path
       * separators, it will lead to unsafe undefined behavior.
       *
       * Use `Path.resolve()` instead.
       *
       * @internal
       */
      child(pathPart, opts) {
        if (pathPart === "" || pathPart === ".") {
          return this;
        }
        if (pathPart === "..") {
          return this.parent || this;
        }
        const children = this.children();
        const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
        for (const p of children) {
          if (p.#matchName === name) {
            return p;
          }
        }
        const s = this.parent ? this.sep : "";
        const fullpath = this.#fullpath ? this.#fullpath + s + pathPart : void 0;
        const pchild = this.newChild(pathPart, UNKNOWN, {
          ...opts,
          parent: this,
          fullpath
        });
        if (!this.canReaddir()) {
          pchild.#type |= ENOENT;
        }
        children.push(pchild);
        return pchild;
      }
      /**
       * The relative path from the cwd. If it does not share an ancestor with
       * the cwd, then this ends up being equivalent to the fullpath()
       */
      relative() {
        if (this.#relative !== void 0) {
          return this.#relative;
        }
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#relative = this.name;
        }
        const pv = p.relative();
        return pv + (!pv || !p.parent ? "" : this.sep) + name;
      }
      /**
       * The relative path from the cwd, using / as the path separator.
       * If it does not share an ancestor with
       * the cwd, then this ends up being equivalent to the fullpathPosix()
       * On posix systems, this is identical to relative().
       */
      relativePosix() {
        if (this.sep === "/")
          return this.relative();
        if (this.#relativePosix !== void 0)
          return this.#relativePosix;
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#relativePosix = this.fullpathPosix();
        }
        const pv = p.relativePosix();
        return pv + (!pv || !p.parent ? "" : "/") + name;
      }
      /**
       * The fully resolved path string for this Path entry
       */
      fullpath() {
        if (this.#fullpath !== void 0) {
          return this.#fullpath;
        }
        const name = this.name;
        const p = this.parent;
        if (!p) {
          return this.#fullpath = this.name;
        }
        const pv = p.fullpath();
        const fp = pv + (!p.parent ? "" : this.sep) + name;
        return this.#fullpath = fp;
      }
      /**
       * On platforms other than windows, this is identical to fullpath.
       *
       * On windows, this is overridden to return the forward-slash form of the
       * full UNC path.
       */
      fullpathPosix() {
        if (this.#fullpathPosix !== void 0)
          return this.#fullpathPosix;
        if (this.sep === "/")
          return this.#fullpathPosix = this.fullpath();
        if (!this.parent) {
          const p2 = this.fullpath().replace(/\\/g, "/");
          if (/^[a-z]:\//i.test(p2)) {
            return this.#fullpathPosix = `//?/${p2}`;
          } else {
            return this.#fullpathPosix = p2;
          }
        }
        const p = this.parent;
        const pfpp = p.fullpathPosix();
        const fpp = pfpp + (!pfpp || !p.parent ? "" : "/") + this.name;
        return this.#fullpathPosix = fpp;
      }
      /**
       * Is the Path of an unknown type?
       *
       * Note that we might know *something* about it if there has been a previous
       * filesystem operation, for example that it does not exist, or is not a
       * link, or whether it has child entries.
       */
      isUnknown() {
        return (this.#type & IFMT) === UNKNOWN;
      }
      isType(type) {
        return this[`is${type}`]();
      }
      getType() {
        return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : (
          /* c8 ignore start */
          this.isSocket() ? "Socket" : "Unknown"
        );
      }
      /**
       * Is the Path a regular file?
       */
      isFile() {
        return (this.#type & IFMT) === IFREG;
      }
      /**
       * Is the Path a directory?
       */
      isDirectory() {
        return (this.#type & IFMT) === IFDIR;
      }
      /**
       * Is the path a character device?
       */
      isCharacterDevice() {
        return (this.#type & IFMT) === IFCHR;
      }
      /**
       * Is the path a block device?
       */
      isBlockDevice() {
        return (this.#type & IFMT) === IFBLK;
      }
      /**
       * Is the path a FIFO pipe?
       */
      isFIFO() {
        return (this.#type & IFMT) === IFIFO;
      }
      /**
       * Is the path a socket?
       */
      isSocket() {
        return (this.#type & IFMT) === IFSOCK;
      }
      /**
       * Is the path a symbolic link?
       */
      isSymbolicLink() {
        return (this.#type & IFLNK) === IFLNK;
      }
      /**
       * Return the entry if it has been subject of a successful lstat, or
       * undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* simply
       * mean that we haven't called lstat on it.
       */
      lstatCached() {
        return this.#type & LSTAT_CALLED ? this : void 0;
      }
      /**
       * Return the cached link target if the entry has been the subject of a
       * successful readlink, or undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * readlink() has been called at some point.
       */
      readlinkCached() {
        return this.#linkTarget;
      }
      /**
       * Returns the cached realpath target if the entry has been the subject
       * of a successful realpath, or undefined otherwise.
       *
       * Does not read the filesystem, so an undefined result *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * realpath() has been called at some point.
       */
      realpathCached() {
        return this.#realpath;
      }
      /**
       * Returns the cached child Path entries array if the entry has been the
       * subject of a successful readdir(), or [] otherwise.
       *
       * Does not read the filesystem, so an empty array *could* just mean we
       * don't have any cached data. Only use it if you are very sure that a
       * readdir() has been called recently enough to still be valid.
       */
      readdirCached() {
        const children = this.children();
        return children.slice(0, children.provisional);
      }
      /**
       * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
       * any indication that readlink will definitely fail.
       *
       * Returns false if the path is known to not be a symlink, if a previous
       * readlink failed, or if the entry does not exist.
       */
      canReadlink() {
        if (this.#linkTarget)
          return true;
        if (!this.parent)
          return false;
        const ifmt = this.#type & IFMT;
        return !(ifmt !== UNKNOWN && ifmt !== IFLNK || this.#type & ENOREADLINK || this.#type & ENOENT);
      }
      /**
       * Return true if readdir has previously been successfully called on this
       * path, indicating that cachedReaddir() is likely valid.
       */
      calledReaddir() {
        return !!(this.#type & READDIR_CALLED);
      }
      /**
       * Returns true if the path is known to not exist. That is, a previous lstat
       * or readdir failed to verify its existence when that would have been
       * expected, or a parent entry was marked either enoent or enotdir.
       */
      isENOENT() {
        return !!(this.#type & ENOENT);
      }
      /**
       * Return true if the path is a match for the given path name.  This handles
       * case sensitivity and unicode normalization.
       *
       * Note: even on case-sensitive systems, it is **not** safe to test the
       * equality of the `.name` property to determine whether a given pathname
       * matches, due to unicode normalization mismatches.
       *
       * Always use this method instead of testing the `path.name` property
       * directly.
       */
      isNamed(n) {
        return !this.nocase ? this.#matchName === normalize(n) : this.#matchName === normalizeNocase(n);
      }
      /**
       * Return the Path object corresponding to the target of a symbolic link.
       *
       * If the Path is not a symbolic link, or if the readlink call fails for any
       * reason, `undefined` is returned.
       *
       * Result is cached, and thus may be outdated if the filesystem is mutated.
       */
      async readlink() {
        const target = this.#linkTarget;
        if (target) {
          return target;
        }
        if (!this.canReadlink()) {
          return void 0;
        }
        if (!this.parent) {
          return void 0;
        }
        try {
          const read = await this.#fs.promises.readlink(this.fullpath());
          const linkTarget = (await this.parent.realpath())?.resolve(read);
          if (linkTarget) {
            return this.#linkTarget = linkTarget;
          }
        } catch (er) {
          this.#readlinkFail(er.code);
          return void 0;
        }
      }
      /**
       * Synchronous {@link PathBase.readlink}
       */
      readlinkSync() {
        const target = this.#linkTarget;
        if (target) {
          return target;
        }
        if (!this.canReadlink()) {
          return void 0;
        }
        if (!this.parent) {
          return void 0;
        }
        try {
          const read = this.#fs.readlinkSync(this.fullpath());
          const linkTarget = this.parent.realpathSync()?.resolve(read);
          if (linkTarget) {
            return this.#linkTarget = linkTarget;
          }
        } catch (er) {
          this.#readlinkFail(er.code);
          return void 0;
        }
      }
      #readdirSuccess(children) {
        this.#type |= READDIR_CALLED;
        for (let p = children.provisional; p < children.length; p++) {
          const c = children[p];
          if (c)
            c.#markENOENT();
        }
      }
      #markENOENT() {
        if (this.#type & ENOENT)
          return;
        this.#type = (this.#type | ENOENT) & IFMT_UNKNOWN;
        this.#markChildrenENOENT();
      }
      #markChildrenENOENT() {
        const children = this.children();
        children.provisional = 0;
        for (const p of children) {
          p.#markENOENT();
        }
      }
      #markENOREALPATH() {
        this.#type |= ENOREALPATH;
        this.#markENOTDIR();
      }
      // save the information when we know the entry is not a dir
      #markENOTDIR() {
        if (this.#type & ENOTDIR)
          return;
        let t = this.#type;
        if ((t & IFMT) === IFDIR)
          t &= IFMT_UNKNOWN;
        this.#type = t | ENOTDIR;
        this.#markChildrenENOENT();
      }
      #readdirFail(code = "") {
        if (code === "ENOTDIR" || code === "EPERM") {
          this.#markENOTDIR();
        } else if (code === "ENOENT") {
          this.#markENOENT();
        } else {
          this.children().provisional = 0;
        }
      }
      #lstatFail(code = "") {
        if (code === "ENOTDIR") {
          const p = this.parent;
          p.#markENOTDIR();
        } else if (code === "ENOENT") {
          this.#markENOENT();
        }
      }
      #readlinkFail(code = "") {
        let ter = this.#type;
        ter |= ENOREADLINK;
        if (code === "ENOENT")
          ter |= ENOENT;
        if (code === "EINVAL" || code === "UNKNOWN") {
          ter &= IFMT_UNKNOWN;
        }
        this.#type = ter;
        if (code === "ENOTDIR" && this.parent) {
          this.parent.#markENOTDIR();
        }
      }
      #readdirAddChild(e, c) {
        return this.#readdirMaybePromoteChild(e, c) || this.#readdirAddNewChild(e, c);
      }
      #readdirAddNewChild(e, c) {
        const type = entToType(e);
        const child = this.newChild(e.name, type, { parent: this });
        const ifmt = child.#type & IFMT;
        if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
          child.#type |= ENOTDIR;
        }
        c.unshift(child);
        c.provisional++;
        return child;
      }
      #readdirMaybePromoteChild(e, c) {
        for (let p = c.provisional; p < c.length; p++) {
          const pchild = c[p];
          const name = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
          if (name !== pchild.#matchName) {
            continue;
          }
          return this.#readdirPromoteChild(e, pchild, p, c);
        }
      }
      #readdirPromoteChild(e, p, index, c) {
        const v = p.name;
        p.#type = p.#type & IFMT_UNKNOWN | entToType(e);
        if (v !== e.name)
          p.name = e.name;
        if (index !== c.provisional) {
          if (index === c.length - 1)
            c.pop();
          else
            c.splice(index, 1);
          c.unshift(p);
        }
        c.provisional++;
        return p;
      }
      /**
       * Call lstat() on this Path, and update all known information that can be
       * determined.
       *
       * Note that unlike `fs.lstat()`, the returned value does not contain some
       * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
       * information is required, you will need to call `fs.lstat` yourself.
       *
       * If the Path refers to a nonexistent file, or if the lstat call fails for
       * any reason, `undefined` is returned.  Otherwise the updated Path object is
       * returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async lstat() {
        if ((this.#type & ENOENT) === 0) {
          try {
            this.#applyStat(await this.#fs.promises.lstat(this.fullpath()));
            return this;
          } catch (er) {
            this.#lstatFail(er.code);
          }
        }
      }
      /**
       * synchronous {@link PathBase.lstat}
       */
      lstatSync() {
        if ((this.#type & ENOENT) === 0) {
          try {
            this.#applyStat(this.#fs.lstatSync(this.fullpath()));
            return this;
          } catch (er) {
            this.#lstatFail(er.code);
          }
        }
      }
      #applyStat(st) {
        const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size, uid } = st;
        this.#atime = atime;
        this.#atimeMs = atimeMs;
        this.#birthtime = birthtime;
        this.#birthtimeMs = birthtimeMs;
        this.#blksize = blksize;
        this.#blocks = blocks;
        this.#ctime = ctime;
        this.#ctimeMs = ctimeMs;
        this.#dev = dev;
        this.#gid = gid;
        this.#ino = ino;
        this.#mode = mode;
        this.#mtime = mtime;
        this.#mtimeMs = mtimeMs;
        this.#nlink = nlink;
        this.#rdev = rdev;
        this.#size = size;
        this.#uid = uid;
        const ifmt = entToType(st);
        this.#type = this.#type & IFMT_UNKNOWN | ifmt | LSTAT_CALLED;
        if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
          this.#type |= ENOTDIR;
        }
      }
      #onReaddirCB = [];
      #readdirCBInFlight = false;
      #callOnReaddirCB(children) {
        this.#readdirCBInFlight = false;
        const cbs = this.#onReaddirCB.slice();
        this.#onReaddirCB.length = 0;
        cbs.forEach((cb) => cb(null, children));
      }
      /**
       * Standard node-style callback interface to get list of directory entries.
       *
       * If the Path cannot or does not contain any children, then an empty array
       * is returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       *
       * @param cb The callback called with (er, entries).  Note that the `er`
       * param is somewhat extraneous, as all readdir() errors are handled and
       * simply result in an empty set of entries being returned.
       * @param allowZalgo Boolean indicating that immediately known results should
       * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
       * zalgo at your peril, the dark pony lord is devious and unforgiving.
       */
      readdirCB(cb, allowZalgo = false) {
        if (!this.canReaddir()) {
          if (allowZalgo)
            cb(null, []);
          else
            queueMicrotask(() => cb(null, []));
          return;
        }
        const children = this.children();
        if (this.calledReaddir()) {
          const c = children.slice(0, children.provisional);
          if (allowZalgo)
            cb(null, c);
          else
            queueMicrotask(() => cb(null, c));
          return;
        }
        this.#onReaddirCB.push(cb);
        if (this.#readdirCBInFlight) {
          return;
        }
        this.#readdirCBInFlight = true;
        const fullpath = this.fullpath();
        this.#fs.readdir(fullpath, { withFileTypes: true }, (er, entries) => {
          if (er) {
            this.#readdirFail(er.code);
            children.provisional = 0;
          } else {
            for (const e of entries) {
              this.#readdirAddChild(e, children);
            }
            this.#readdirSuccess(children);
          }
          this.#callOnReaddirCB(children.slice(0, children.provisional));
          return;
        });
      }
      #asyncReaddirInFlight;
      /**
       * Return an array of known child entries.
       *
       * If the Path cannot or does not contain any children, then an empty array
       * is returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async readdir() {
        if (!this.canReaddir()) {
          return [];
        }
        const children = this.children();
        if (this.calledReaddir()) {
          return children.slice(0, children.provisional);
        }
        const fullpath = this.fullpath();
        if (this.#asyncReaddirInFlight) {
          await this.#asyncReaddirInFlight;
        } else {
          let resolve = () => {
          };
          this.#asyncReaddirInFlight = new Promise((res) => resolve = res);
          try {
            for (const e of await this.#fs.promises.readdir(fullpath, {
              withFileTypes: true
            })) {
              this.#readdirAddChild(e, children);
            }
            this.#readdirSuccess(children);
          } catch (er) {
            this.#readdirFail(er.code);
            children.provisional = 0;
          }
          this.#asyncReaddirInFlight = void 0;
          resolve();
        }
        return children.slice(0, children.provisional);
      }
      /**
       * synchronous {@link PathBase.readdir}
       */
      readdirSync() {
        if (!this.canReaddir()) {
          return [];
        }
        const children = this.children();
        if (this.calledReaddir()) {
          return children.slice(0, children.provisional);
        }
        const fullpath = this.fullpath();
        try {
          for (const e of this.#fs.readdirSync(fullpath, {
            withFileTypes: true
          })) {
            this.#readdirAddChild(e, children);
          }
          this.#readdirSuccess(children);
        } catch (er) {
          this.#readdirFail(er.code);
          children.provisional = 0;
        }
        return children.slice(0, children.provisional);
      }
      canReaddir() {
        if (this.#type & ENOCHILD)
          return false;
        const ifmt = IFMT & this.#type;
        if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
          return false;
        }
        return true;
      }
      shouldWalk(dirs, walkFilter) {
        return (this.#type & IFDIR) === IFDIR && !(this.#type & ENOCHILD) && !dirs.has(this) && (!walkFilter || walkFilter(this));
      }
      /**
       * Return the Path object corresponding to path as resolved
       * by realpath(3).
       *
       * If the realpath call fails for any reason, `undefined` is returned.
       *
       * Result is cached, and thus may be outdated if the filesystem is mutated.
       * On success, returns a Path object.
       */
      async realpath() {
        if (this.#realpath)
          return this.#realpath;
        if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
          return void 0;
        try {
          const rp = await this.#fs.promises.realpath(this.fullpath());
          return this.#realpath = this.resolve(rp);
        } catch (_) {
          this.#markENOREALPATH();
        }
      }
      /**
       * Synchronous {@link realpath}
       */
      realpathSync() {
        if (this.#realpath)
          return this.#realpath;
        if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
          return void 0;
        try {
          const rp = this.#fs.realpathSync(this.fullpath());
          return this.#realpath = this.resolve(rp);
        } catch (_) {
          this.#markENOREALPATH();
        }
      }
      /**
       * Internal method to mark this Path object as the scurry cwd,
       * called by {@link PathScurry#chdir}
       *
       * @internal
       */
      [setAsCwd](oldCwd) {
        if (oldCwd === this)
          return;
        const changed = /* @__PURE__ */ new Set([]);
        let rp = [];
        let p = this;
        while (p && p.parent) {
          changed.add(p);
          p.#relative = rp.join(this.sep);
          p.#relativePosix = rp.join("/");
          p = p.parent;
          rp.push("..");
        }
        p = oldCwd;
        while (p && p.parent && !changed.has(p)) {
          p.#relative = void 0;
          p.#relativePosix = void 0;
          p = p.parent;
        }
      }
    };
    exports.PathBase = PathBase;
    var PathWin32 = class _PathWin32 extends PathBase {
      /**
       * Separator for generating path strings.
       */
      sep = "\\";
      /**
       * Separator for parsing path strings.
       */
      splitSep = eitherSep;
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        super(name, type, root, roots, nocase, children, opts);
      }
      /**
       * @internal
       */
      newChild(name, type = UNKNOWN, opts = {}) {
        return new _PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
      }
      /**
       * @internal
       */
      getRootString(path) {
        return path_1.win32.parse(path).root;
      }
      /**
       * @internal
       */
      getRoot(rootPath) {
        rootPath = uncToDrive(rootPath.toUpperCase());
        if (rootPath === this.root.name) {
          return this.root;
        }
        for (const [compare, root] of Object.entries(this.roots)) {
          if (this.sameRoot(rootPath, compare)) {
            return this.roots[rootPath] = root;
          }
        }
        return this.roots[rootPath] = new PathScurryWin32(rootPath, this).root;
      }
      /**
       * @internal
       */
      sameRoot(rootPath, compare = this.root.name) {
        rootPath = rootPath.toUpperCase().replace(/\//g, "\\").replace(uncDriveRegexp, "$1\\");
        return rootPath === compare;
      }
    };
    exports.PathWin32 = PathWin32;
    var PathPosix = class _PathPosix extends PathBase {
      /**
       * separator for parsing path strings
       */
      splitSep = "/";
      /**
       * separator for generating path strings
       */
      sep = "/";
      /**
       * Do not create new Path objects directly.  They should always be accessed
       * via the PathScurry class or other methods on the Path class.
       *
       * @internal
       */
      constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
        super(name, type, root, roots, nocase, children, opts);
      }
      /**
       * @internal
       */
      getRootString(path) {
        return path.startsWith("/") ? "/" : "";
      }
      /**
       * @internal
       */
      getRoot(_rootPath) {
        return this.root;
      }
      /**
       * @internal
       */
      newChild(name, type = UNKNOWN, opts = {}) {
        return new _PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
      }
    };
    exports.PathPosix = PathPosix;
    var PathScurryBase = class {
      /**
       * The root Path entry for the current working directory of this Scurry
       */
      root;
      /**
       * The string path for the root of this Scurry's current working directory
       */
      rootPath;
      /**
       * A collection of all roots encountered, referenced by rootPath
       */
      roots;
      /**
       * The Path entry corresponding to this PathScurry's current working directory.
       */
      cwd;
      #resolveCache;
      #resolvePosixCache;
      #children;
      /**
       * Perform path comparisons case-insensitively.
       *
       * Defaults true on Darwin and Windows systems, false elsewhere.
       */
      nocase;
      #fs;
      /**
       * This class should not be instantiated directly.
       *
       * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
       *
       * @internal
       */
      constructor(cwd = process.cwd(), pathImpl, sep, { nocase, childrenCacheSize = 16 * 1024, fs = defaultFS } = {}) {
        this.#fs = fsFromOption(fs);
        if (cwd instanceof URL || cwd.startsWith("file://")) {
          cwd = (0, url_1.fileURLToPath)(cwd);
        }
        const cwdPath = pathImpl.resolve(cwd);
        this.roots = /* @__PURE__ */ Object.create(null);
        this.rootPath = this.parseRootPath(cwdPath);
        this.#resolveCache = new ResolveCache();
        this.#resolvePosixCache = new ResolveCache();
        this.#children = new ChildrenCache(childrenCacheSize);
        const split = cwdPath.substring(this.rootPath.length).split(sep);
        if (split.length === 1 && !split[0]) {
          split.pop();
        }
        if (nocase === void 0) {
          throw new TypeError("must provide nocase setting to PathScurryBase ctor");
        }
        this.nocase = nocase;
        this.root = this.newRoot(this.#fs);
        this.roots[this.rootPath] = this.root;
        let prev = this.root;
        let len = split.length - 1;
        const joinSep = pathImpl.sep;
        let abs = this.rootPath;
        let sawFirst = false;
        for (const part of split) {
          const l = len--;
          prev = prev.child(part, {
            relative: new Array(l).fill("..").join(joinSep),
            relativePosix: new Array(l).fill("..").join("/"),
            fullpath: abs += (sawFirst ? "" : joinSep) + part
          });
          sawFirst = true;
        }
        this.cwd = prev;
      }
      /**
       * Get the depth of a provided path, string, or the cwd
       */
      depth(path = this.cwd) {
        if (typeof path === "string") {
          path = this.cwd.resolve(path);
        }
        return path.depth();
      }
      /**
       * Return the cache of child entries.  Exposed so subclasses can create
       * child Path objects in a platform-specific way.
       *
       * @internal
       */
      childrenCache() {
        return this.#children;
      }
      /**
       * Resolve one or more path strings to a resolved string
       *
       * Same interface as require('path').resolve.
       *
       * Much faster than path.resolve() when called multiple times for the same
       * path, because the resolved Path objects are cached.  Much slower
       * otherwise.
       */
      resolve(...paths) {
        let r = "";
        for (let i = paths.length - 1; i >= 0; i--) {
          const p = paths[i];
          if (!p || p === ".")
            continue;
          r = r ? `${p}/${r}` : p;
          if (this.isAbsolute(p)) {
            break;
          }
        }
        const cached = this.#resolveCache.get(r);
        if (cached !== void 0) {
          return cached;
        }
        const result = this.cwd.resolve(r).fullpath();
        this.#resolveCache.set(r, result);
        return result;
      }
      /**
       * Resolve one or more path strings to a resolved string, returning
       * the posix path.  Identical to .resolve() on posix systems, but on
       * windows will return a forward-slash separated UNC path.
       *
       * Same interface as require('path').resolve.
       *
       * Much faster than path.resolve() when called multiple times for the same
       * path, because the resolved Path objects are cached.  Much slower
       * otherwise.
       */
      resolvePosix(...paths) {
        let r = "";
        for (let i = paths.length - 1; i >= 0; i--) {
          const p = paths[i];
          if (!p || p === ".")
            continue;
          r = r ? `${p}/${r}` : p;
          if (this.isAbsolute(p)) {
            break;
          }
        }
        const cached = this.#resolvePosixCache.get(r);
        if (cached !== void 0) {
          return cached;
        }
        const result = this.cwd.resolve(r).fullpathPosix();
        this.#resolvePosixCache.set(r, result);
        return result;
      }
      /**
       * find the relative path from the cwd to the supplied path string or entry
       */
      relative(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.relative();
      }
      /**
       * find the relative path from the cwd to the supplied path string or
       * entry, using / as the path delimiter, even on Windows.
       */
      relativePosix(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.relativePosix();
      }
      /**
       * Return the basename for the provided string or Path object
       */
      basename(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.name;
      }
      /**
       * Return the dirname for the provided string or Path object
       */
      dirname(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return (entry.parent || entry).fullpath();
      }
      async readdir(entry = this.cwd, opts = {
        withFileTypes: true
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes } = opts;
        if (!entry.canReaddir()) {
          return [];
        } else {
          const p = await entry.readdir();
          return withFileTypes ? p : p.map((e) => e.name);
        }
      }
      readdirSync(entry = this.cwd, opts = {
        withFileTypes: true
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true } = opts;
        if (!entry.canReaddir()) {
          return [];
        } else if (withFileTypes) {
          return entry.readdirSync();
        } else {
          return entry.readdirSync().map((e) => e.name);
        }
      }
      /**
       * Call lstat() on the string or Path object, and update all known
       * information that can be determined.
       *
       * Note that unlike `fs.lstat()`, the returned value does not contain some
       * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
       * information is required, you will need to call `fs.lstat` yourself.
       *
       * If the Path refers to a nonexistent file, or if the lstat call fails for
       * any reason, `undefined` is returned.  Otherwise the updated Path object is
       * returned.
       *
       * Results are cached, and thus may be out of date if the filesystem is
       * mutated.
       */
      async lstat(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.lstat();
      }
      /**
       * synchronous {@link PathScurryBase.lstat}
       */
      lstatSync(entry = this.cwd) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        }
        return entry.lstatSync();
      }
      async readlink(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = await entry.readlink();
        return withFileTypes ? e : e?.fullpath();
      }
      readlinkSync(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = entry.readlinkSync();
        return withFileTypes ? e : e?.fullpath();
      }
      async realpath(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = await entry.realpath();
        return withFileTypes ? e : e?.fullpath();
      }
      realpathSync(entry = this.cwd, { withFileTypes } = {
        withFileTypes: false
      }) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          withFileTypes = entry.withFileTypes;
          entry = this.cwd;
        }
        const e = entry.realpathSync();
        return withFileTypes ? e : e?.fullpath();
      }
      async walk(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
        const results = [];
        if (!filter || filter(entry)) {
          results.push(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set();
        const walk = (dir, cb) => {
          dirs.add(dir);
          dir.readdirCB((er, entries) => {
            if (er) {
              return cb(er);
            }
            let len = entries.length;
            if (!len)
              return cb();
            const next = () => {
              if (--len === 0) {
                cb();
              }
            };
            for (const e of entries) {
              if (!filter || filter(e)) {
                results.push(withFileTypes ? e : e.fullpath());
              }
              if (follow && e.isSymbolicLink()) {
                e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r).then((r) => r?.shouldWalk(dirs, walkFilter) ? walk(r, next) : next());
              } else {
                if (e.shouldWalk(dirs, walkFilter)) {
                  walk(e, next);
                } else {
                  next();
                }
              }
            }
          }, true);
        };
        const start = entry;
        return new Promise((res, rej) => {
          walk(start, (er) => {
            if (er)
              return rej(er);
            res(results);
          });
        });
      }
      walkSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
        const results = [];
        if (!filter || filter(entry)) {
          results.push(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set([entry]);
        for (const dir of dirs) {
          const entries = dir.readdirSync();
          for (const e of entries) {
            if (!filter || filter(e)) {
              results.push(withFileTypes ? e : e.fullpath());
            }
            let r = e;
            if (e.isSymbolicLink()) {
              if (!(follow && (r = e.realpathSync())))
                continue;
              if (r.isUnknown())
                r.lstatSync();
            }
            if (r.shouldWalk(dirs, walkFilter)) {
              dirs.add(r);
            }
          }
        }
        return results;
      }
      /**
       * Support for `for await`
       *
       * Alias for {@link PathScurryBase.iterate}
       *
       * Note: As of Node 19, this is very slow, compared to other methods of
       * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
       * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
       */
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
      iterate(entry = this.cwd, options = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          options = entry;
          entry = this.cwd;
        }
        return this.stream(entry, options)[Symbol.asyncIterator]();
      }
      /**
       * Iterating over a PathScurry performs a synchronous walk.
       *
       * Alias for {@link PathScurryBase.iterateSync}
       */
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      *iterateSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
        if (!filter || filter(entry)) {
          yield withFileTypes ? entry : entry.fullpath();
        }
        const dirs = /* @__PURE__ */ new Set([entry]);
        for (const dir of dirs) {
          const entries = dir.readdirSync();
          for (const e of entries) {
            if (!filter || filter(e)) {
              yield withFileTypes ? e : e.fullpath();
            }
            let r = e;
            if (e.isSymbolicLink()) {
              if (!(follow && (r = e.realpathSync())))
                continue;
              if (r.isUnknown())
                r.lstatSync();
            }
            if (r.shouldWalk(dirs, walkFilter)) {
              dirs.add(r);
            }
          }
        }
      }
      stream(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
        const results = new minipass_1.Minipass({ objectMode: true });
        if (!filter || filter(entry)) {
          results.write(withFileTypes ? entry : entry.fullpath());
        }
        const dirs = /* @__PURE__ */ new Set();
        const queue = [entry];
        let processing = 0;
        const process2 = () => {
          let paused = false;
          while (!paused) {
            const dir = queue.shift();
            if (!dir) {
              if (processing === 0)
                results.end();
              return;
            }
            processing++;
            dirs.add(dir);
            const onReaddir = (er, entries, didRealpaths = false) => {
              if (er)
                return results.emit("error", er);
              if (follow && !didRealpaths) {
                const promises = [];
                for (const e of entries) {
                  if (e.isSymbolicLink()) {
                    promises.push(e.realpath().then((r) => r?.isUnknown() ? r.lstat() : r));
                  }
                }
                if (promises.length) {
                  Promise.all(promises).then(() => onReaddir(null, entries, true));
                  return;
                }
              }
              for (const e of entries) {
                if (e && (!filter || filter(e))) {
                  if (!results.write(withFileTypes ? e : e.fullpath())) {
                    paused = true;
                  }
                }
              }
              processing--;
              for (const e of entries) {
                const r = e.realpathCached() || e;
                if (r.shouldWalk(dirs, walkFilter)) {
                  queue.push(r);
                }
              }
              if (paused && !results.flowing) {
                results.once("drain", process2);
              } else if (!sync) {
                process2();
              }
            };
            let sync = true;
            dir.readdirCB(onReaddir, true);
            sync = false;
          }
        };
        process2();
        return results;
      }
      streamSync(entry = this.cwd, opts = {}) {
        if (typeof entry === "string") {
          entry = this.cwd.resolve(entry);
        } else if (!(entry instanceof PathBase)) {
          opts = entry;
          entry = this.cwd;
        }
        const { withFileTypes = true, follow = false, filter, walkFilter } = opts;
        const results = new minipass_1.Minipass({ objectMode: true });
        const dirs = /* @__PURE__ */ new Set();
        if (!filter || filter(entry)) {
          results.write(withFileTypes ? entry : entry.fullpath());
        }
        const queue = [entry];
        let processing = 0;
        const process2 = () => {
          let paused = false;
          while (!paused) {
            const dir = queue.shift();
            if (!dir) {
              if (processing === 0)
                results.end();
              return;
            }
            processing++;
            dirs.add(dir);
            const entries = dir.readdirSync();
            for (const e of entries) {
              if (!filter || filter(e)) {
                if (!results.write(withFileTypes ? e : e.fullpath())) {
                  paused = true;
                }
              }
            }
            processing--;
            for (const e of entries) {
              let r = e;
              if (e.isSymbolicLink()) {
                if (!(follow && (r = e.realpathSync())))
                  continue;
                if (r.isUnknown())
                  r.lstatSync();
              }
              if (r.shouldWalk(dirs, walkFilter)) {
                queue.push(r);
              }
            }
          }
          if (paused && !results.flowing)
            results.once("drain", process2);
        };
        process2();
        return results;
      }
      chdir(path = this.cwd) {
        const oldCwd = this.cwd;
        this.cwd = typeof path === "string" ? this.cwd.resolve(path) : path;
        this.cwd[setAsCwd](oldCwd);
      }
    };
    exports.PathScurryBase = PathScurryBase;
    var PathScurryWin32 = class extends PathScurryBase {
      /**
       * separator for generating path strings
       */
      sep = "\\";
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = true } = opts;
        super(cwd, path_1.win32, "\\", { ...opts, nocase });
        this.nocase = nocase;
        for (let p = this.cwd; p; p = p.parent) {
          p.nocase = this.nocase;
        }
      }
      /**
       * @internal
       */
      parseRootPath(dir) {
        return path_1.win32.parse(dir).root.toUpperCase();
      }
      /**
       * @internal
       */
      newRoot(fs) {
        return new PathWin32(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
      }
      /**
       * Return true if the provided path string is an absolute path
       */
      isAbsolute(p) {
        return p.startsWith("/") || p.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(p);
      }
    };
    exports.PathScurryWin32 = PathScurryWin32;
    var PathScurryPosix = class extends PathScurryBase {
      /**
       * separator for generating path strings
       */
      sep = "/";
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = false } = opts;
        super(cwd, path_1.posix, "/", { ...opts, nocase });
        this.nocase = nocase;
      }
      /**
       * @internal
       */
      parseRootPath(_dir) {
        return "/";
      }
      /**
       * @internal
       */
      newRoot(fs) {
        return new PathPosix(this.rootPath, IFDIR, void 0, this.roots, this.nocase, this.childrenCache(), { fs });
      }
      /**
       * Return true if the provided path string is an absolute path
       */
      isAbsolute(p) {
        return p.startsWith("/");
      }
    };
    exports.PathScurryPosix = PathScurryPosix;
    var PathScurryDarwin = class extends PathScurryPosix {
      constructor(cwd = process.cwd(), opts = {}) {
        const { nocase = true } = opts;
        super(cwd, { ...opts, nocase });
      }
    };
    exports.PathScurryDarwin = PathScurryDarwin;
    exports.Path = process.platform === "win32" ? PathWin32 : PathPosix;
    exports.PathScurry = process.platform === "win32" ? PathScurryWin32 : process.platform === "darwin" ? PathScurryDarwin : PathScurryPosix;
  }
});

// node_modules/glob/dist/commonjs/pattern.js
var require_pattern = __commonJS({
  "node_modules/glob/dist/commonjs/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Pattern = void 0;
    var minimatch_1 = require_commonjs();
    var isPatternList = (pl) => pl.length >= 1;
    var isGlobList = (gl) => gl.length >= 1;
    var Pattern = class _Pattern {
      #patternList;
      #globList;
      #index;
      length;
      #platform;
      #rest;
      #globString;
      #isDrive;
      #isUNC;
      #isAbsolute;
      #followGlobstar = true;
      constructor(patternList, globList, index, platform) {
        if (!isPatternList(patternList)) {
          throw new TypeError("empty pattern list");
        }
        if (!isGlobList(globList)) {
          throw new TypeError("empty glob list");
        }
        if (globList.length !== patternList.length) {
          throw new TypeError("mismatched pattern list and glob list lengths");
        }
        this.length = patternList.length;
        if (index < 0 || index >= this.length) {
          throw new TypeError("index out of range");
        }
        this.#patternList = patternList;
        this.#globList = globList;
        this.#index = index;
        this.#platform = platform;
        if (this.#index === 0) {
          if (this.isUNC()) {
            const [p0, p1, p2, p3, ...prest] = this.#patternList;
            const [g0, g1, g2, g3, ...grest] = this.#globList;
            if (prest[0] === "") {
              prest.shift();
              grest.shift();
            }
            const p = [p0, p1, p2, p3, ""].join("/");
            const g = [g0, g1, g2, g3, ""].join("/");
            this.#patternList = [p, ...prest];
            this.#globList = [g, ...grest];
            this.length = this.#patternList.length;
          } else if (this.isDrive() || this.isAbsolute()) {
            const [p1, ...prest] = this.#patternList;
            const [g1, ...grest] = this.#globList;
            if (prest[0] === "") {
              prest.shift();
              grest.shift();
            }
            const p = p1 + "/";
            const g = g1 + "/";
            this.#patternList = [p, ...prest];
            this.#globList = [g, ...grest];
            this.length = this.#patternList.length;
          }
        }
      }
      /**
       * The first entry in the parsed list of patterns
       */
      pattern() {
        return this.#patternList[this.#index];
      }
      /**
       * true of if pattern() returns a string
       */
      isString() {
        return typeof this.#patternList[this.#index] === "string";
      }
      /**
       * true of if pattern() returns GLOBSTAR
       */
      isGlobstar() {
        return this.#patternList[this.#index] === minimatch_1.GLOBSTAR;
      }
      /**
       * true if pattern() returns a regexp
       */
      isRegExp() {
        return this.#patternList[this.#index] instanceof RegExp;
      }
      /**
       * The /-joined set of glob parts that make up this pattern
       */
      globString() {
        return this.#globString = this.#globString || (this.#index === 0 ? this.isAbsolute() ? this.#globList[0] + this.#globList.slice(1).join("/") : this.#globList.join("/") : this.#globList.slice(this.#index).join("/"));
      }
      /**
       * true if there are more pattern parts after this one
       */
      hasMore() {
        return this.length > this.#index + 1;
      }
      /**
       * The rest of the pattern after this part, or null if this is the end
       */
      rest() {
        if (this.#rest !== void 0)
          return this.#rest;
        if (!this.hasMore())
          return this.#rest = null;
        this.#rest = new _Pattern(this.#patternList, this.#globList, this.#index + 1, this.#platform);
        this.#rest.#isAbsolute = this.#isAbsolute;
        this.#rest.#isUNC = this.#isUNC;
        this.#rest.#isDrive = this.#isDrive;
        return this.#rest;
      }
      /**
       * true if the pattern represents a //unc/path/ on windows
       */
      isUNC() {
        const pl = this.#patternList;
        return this.#isUNC !== void 0 ? this.#isUNC : this.#isUNC = this.#platform === "win32" && this.#index === 0 && pl[0] === "" && pl[1] === "" && typeof pl[2] === "string" && !!pl[2] && typeof pl[3] === "string" && !!pl[3];
      }
      // pattern like C:/...
      // split = ['C:', ...]
      // XXX: would be nice to handle patterns like `c:*` to test the cwd
      // in c: for *, but I don't know of a way to even figure out what that
      // cwd is without actually chdir'ing into it?
      /**
       * True if the pattern starts with a drive letter on Windows
       */
      isDrive() {
        const pl = this.#patternList;
        return this.#isDrive !== void 0 ? this.#isDrive : this.#isDrive = this.#platform === "win32" && this.#index === 0 && this.length > 1 && typeof pl[0] === "string" && /^[a-z]:$/i.test(pl[0]);
      }
      // pattern = '/' or '/...' or '/x/...'
      // split = ['', ''] or ['', ...] or ['', 'x', ...]
      // Drive and UNC both considered absolute on windows
      /**
       * True if the pattern is rooted on an absolute path
       */
      isAbsolute() {
        const pl = this.#patternList;
        return this.#isAbsolute !== void 0 ? this.#isAbsolute : this.#isAbsolute = pl[0] === "" && pl.length > 1 || this.isDrive() || this.isUNC();
      }
      /**
       * consume the root of the pattern, and return it
       */
      root() {
        const p = this.#patternList[0];
        return typeof p === "string" && this.isAbsolute() && this.#index === 0 ? p : "";
      }
      /**
       * Check to see if the current globstar pattern is allowed to follow
       * a symbolic link.
       */
      checkFollowGlobstar() {
        return !(this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar);
      }
      /**
       * Mark that the current globstar pattern is following a symbolic link
       */
      markFollowGlobstar() {
        if (this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar)
          return false;
        this.#followGlobstar = false;
        return true;
      }
    };
    exports.Pattern = Pattern;
  }
});

// node_modules/glob/dist/commonjs/ignore.js
var require_ignore = __commonJS({
  "node_modules/glob/dist/commonjs/ignore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ignore = void 0;
    var minimatch_1 = require_commonjs();
    var pattern_js_1 = require_pattern();
    var defaultPlatform = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
    var Ignore = class {
      relative;
      relativeChildren;
      absolute;
      absoluteChildren;
      constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform }) {
        this.relative = [];
        this.absolute = [];
        this.relativeChildren = [];
        this.absoluteChildren = [];
        const mmopts = {
          dot: true,
          nobrace,
          nocase,
          noext,
          noglobstar,
          optimizationLevel: 2,
          platform,
          nocomment: true,
          nonegate: true
        };
        for (const ign of ignored) {
          const mm = new minimatch_1.Minimatch(ign, mmopts);
          for (let i = 0; i < mm.set.length; i++) {
            const parsed = mm.set[i];
            const globParts = mm.globParts[i];
            if (!parsed || !globParts) {
              throw new Error("invalid pattern object");
            }
            while (parsed[0] === "." && globParts[0] === ".") {
              parsed.shift();
              globParts.shift();
            }
            const p = new pattern_js_1.Pattern(parsed, globParts, 0, platform);
            const m = new minimatch_1.Minimatch(p.globString(), mmopts);
            const children = globParts[globParts.length - 1] === "**";
            const absolute = p.isAbsolute();
            if (absolute)
              this.absolute.push(m);
            else
              this.relative.push(m);
            if (children) {
              if (absolute)
                this.absoluteChildren.push(m);
              else
                this.relativeChildren.push(m);
            }
          }
        }
      }
      ignored(p) {
        const fullpath = p.fullpath();
        const fullpaths = `${fullpath}/`;
        const relative = p.relative() || ".";
        const relatives = `${relative}/`;
        for (const m of this.relative) {
          if (m.match(relative) || m.match(relatives))
            return true;
        }
        for (const m of this.absolute) {
          if (m.match(fullpath) || m.match(fullpaths))
            return true;
        }
        return false;
      }
      childrenIgnored(p) {
        const fullpath = p.fullpath() + "/";
        const relative = (p.relative() || ".") + "/";
        for (const m of this.relativeChildren) {
          if (m.match(relative))
            return true;
        }
        for (const m of this.absoluteChildren) {
          if (m.match(fullpath))
            return true;
        }
        return false;
      }
    };
    exports.Ignore = Ignore;
  }
});

// node_modules/glob/dist/commonjs/processor.js
var require_processor = __commonJS({
  "node_modules/glob/dist/commonjs/processor.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Processor = exports.SubWalks = exports.MatchRecord = exports.HasWalkedCache = void 0;
    var minimatch_1 = require_commonjs();
    var HasWalkedCache = class _HasWalkedCache {
      store;
      constructor(store = /* @__PURE__ */ new Map()) {
        this.store = store;
      }
      copy() {
        return new _HasWalkedCache(new Map(this.store));
      }
      hasWalked(target, pattern) {
        return this.store.get(target.fullpath())?.has(pattern.globString());
      }
      storeWalked(target, pattern) {
        const fullpath = target.fullpath();
        const cached = this.store.get(fullpath);
        if (cached)
          cached.add(pattern.globString());
        else
          this.store.set(fullpath, /* @__PURE__ */ new Set([pattern.globString()]));
      }
    };
    exports.HasWalkedCache = HasWalkedCache;
    var MatchRecord = class {
      store = /* @__PURE__ */ new Map();
      add(target, absolute, ifDir) {
        const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
        const current = this.store.get(target);
        this.store.set(target, current === void 0 ? n : n & current);
      }
      // match, absolute, ifdir
      entries() {
        return [...this.store.entries()].map(([path, n]) => [
          path,
          !!(n & 2),
          !!(n & 1)
        ]);
      }
    };
    exports.MatchRecord = MatchRecord;
    var SubWalks = class {
      store = /* @__PURE__ */ new Map();
      add(target, pattern) {
        if (!target.canReaddir()) {
          return;
        }
        const subs = this.store.get(target);
        if (subs) {
          if (!subs.find((p) => p.globString() === pattern.globString())) {
            subs.push(pattern);
          }
        } else
          this.store.set(target, [pattern]);
      }
      get(target) {
        const subs = this.store.get(target);
        if (!subs) {
          throw new Error("attempting to walk unknown path");
        }
        return subs;
      }
      entries() {
        return this.keys().map((k) => [k, this.store.get(k)]);
      }
      keys() {
        return [...this.store.keys()].filter((t) => t.canReaddir());
      }
    };
    exports.SubWalks = SubWalks;
    var Processor = class _Processor {
      hasWalkedCache;
      matches = new MatchRecord();
      subwalks = new SubWalks();
      patterns;
      follow;
      dot;
      opts;
      constructor(opts, hasWalkedCache) {
        this.opts = opts;
        this.follow = !!opts.follow;
        this.dot = !!opts.dot;
        this.hasWalkedCache = hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
      }
      processPatterns(target, patterns) {
        this.patterns = patterns;
        const processingSet = patterns.map((p) => [target, p]);
        for (let [t, pattern] of processingSet) {
          this.hasWalkedCache.storeWalked(t, pattern);
          const root = pattern.root();
          const absolute = pattern.isAbsolute() && this.opts.absolute !== false;
          if (root) {
            t = t.resolve(root === "/" && this.opts.root !== void 0 ? this.opts.root : root);
            const rest2 = pattern.rest();
            if (!rest2) {
              this.matches.add(t, true, false);
              continue;
            } else {
              pattern = rest2;
            }
          }
          if (t.isENOENT())
            continue;
          let p;
          let rest;
          let changed = false;
          while (typeof (p = pattern.pattern()) === "string" && (rest = pattern.rest())) {
            const c = t.resolve(p);
            t = c;
            pattern = rest;
            changed = true;
          }
          p = pattern.pattern();
          rest = pattern.rest();
          if (changed) {
            if (this.hasWalkedCache.hasWalked(t, pattern))
              continue;
            this.hasWalkedCache.storeWalked(t, pattern);
          }
          if (typeof p === "string") {
            const ifDir = p === ".." || p === "" || p === ".";
            this.matches.add(t.resolve(p), absolute, ifDir);
            continue;
          } else if (p === minimatch_1.GLOBSTAR) {
            if (!t.isSymbolicLink() || this.follow || pattern.checkFollowGlobstar()) {
              this.subwalks.add(t, pattern);
            }
            const rp = rest?.pattern();
            const rrest = rest?.rest();
            if (!rest || (rp === "" || rp === ".") && !rrest) {
              this.matches.add(t, absolute, rp === "" || rp === ".");
            } else {
              if (rp === "..") {
                const tp = t.parent || t;
                if (!rrest)
                  this.matches.add(tp, absolute, true);
                else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
                  this.subwalks.add(tp, rrest);
                }
              }
            }
          } else if (p instanceof RegExp) {
            this.subwalks.add(t, pattern);
          }
        }
        return this;
      }
      subwalkTargets() {
        return this.subwalks.keys();
      }
      child() {
        return new _Processor(this.opts, this.hasWalkedCache);
      }
      // return a new Processor containing the subwalks for each
      // child entry, and a set of matches, and
      // a hasWalkedCache that's a copy of this one
      // then we're going to call
      filterEntries(parent, entries) {
        const patterns = this.subwalks.get(parent);
        const results = this.child();
        for (const e of entries) {
          for (const pattern of patterns) {
            const absolute = pattern.isAbsolute();
            const p = pattern.pattern();
            const rest = pattern.rest();
            if (p === minimatch_1.GLOBSTAR) {
              results.testGlobstar(e, pattern, rest, absolute);
            } else if (p instanceof RegExp) {
              results.testRegExp(e, p, rest, absolute);
            } else {
              results.testString(e, p, rest, absolute);
            }
          }
        }
        return results;
      }
      testGlobstar(e, pattern, rest, absolute) {
        if (this.dot || !e.name.startsWith(".")) {
          if (!pattern.hasMore()) {
            this.matches.add(e, absolute, false);
          }
          if (e.canReaddir()) {
            if (this.follow || !e.isSymbolicLink()) {
              this.subwalks.add(e, pattern);
            } else if (e.isSymbolicLink()) {
              if (rest && pattern.checkFollowGlobstar()) {
                this.subwalks.add(e, rest);
              } else if (pattern.markFollowGlobstar()) {
                this.subwalks.add(e, pattern);
              }
            }
          }
        }
        if (rest) {
          const rp = rest.pattern();
          if (typeof rp === "string" && // dots and empty were handled already
          rp !== ".." && rp !== "" && rp !== ".") {
            this.testString(e, rp, rest.rest(), absolute);
          } else if (rp === "..") {
            const ep = e.parent || e;
            this.subwalks.add(ep, rest);
          } else if (rp instanceof RegExp) {
            this.testRegExp(e, rp, rest.rest(), absolute);
          }
        }
      }
      testRegExp(e, p, rest, absolute) {
        if (!p.test(e.name))
          return;
        if (!rest) {
          this.matches.add(e, absolute, false);
        } else {
          this.subwalks.add(e, rest);
        }
      }
      testString(e, p, rest, absolute) {
        if (!e.isNamed(p))
          return;
        if (!rest) {
          this.matches.add(e, absolute, false);
        } else {
          this.subwalks.add(e, rest);
        }
      }
    };
    exports.Processor = Processor;
  }
});

// node_modules/glob/dist/commonjs/walker.js
var require_walker = __commonJS({
  "node_modules/glob/dist/commonjs/walker.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobStream = exports.GlobWalker = exports.GlobUtil = void 0;
    var minipass_1 = require_commonjs3();
    var ignore_js_1 = require_ignore();
    var processor_js_1 = require_processor();
    var makeIgnore = (ignore, opts) => typeof ignore === "string" ? new ignore_js_1.Ignore([ignore], opts) : Array.isArray(ignore) ? new ignore_js_1.Ignore(ignore, opts) : ignore;
    var GlobUtil = class {
      path;
      patterns;
      opts;
      seen = /* @__PURE__ */ new Set();
      paused = false;
      aborted = false;
      #onResume = [];
      #ignore;
      #sep;
      signal;
      maxDepth;
      constructor(patterns, path, opts) {
        this.patterns = patterns;
        this.path = path;
        this.opts = opts;
        this.#sep = !opts.posix && opts.platform === "win32" ? "\\" : "/";
        if (opts.ignore) {
          this.#ignore = makeIgnore(opts.ignore, opts);
        }
        this.maxDepth = opts.maxDepth || Infinity;
        if (opts.signal) {
          this.signal = opts.signal;
          this.signal.addEventListener("abort", () => {
            this.#onResume.length = 0;
          });
        }
      }
      #ignored(path) {
        return this.seen.has(path) || !!this.#ignore?.ignored?.(path);
      }
      #childrenIgnored(path) {
        return !!this.#ignore?.childrenIgnored?.(path);
      }
      // backpressure mechanism
      pause() {
        this.paused = true;
      }
      resume() {
        if (this.signal?.aborted)
          return;
        this.paused = false;
        let fn = void 0;
        while (!this.paused && (fn = this.#onResume.shift())) {
          fn();
        }
      }
      onResume(fn) {
        if (this.signal?.aborted)
          return;
        if (!this.paused) {
          fn();
        } else {
          this.#onResume.push(fn);
        }
      }
      // do the requisite realpath/stat checking, and return the path
      // to add or undefined to filter it out.
      async matchCheck(e, ifDir) {
        if (ifDir && this.opts.nodir)
          return void 0;
        let rpc;
        if (this.opts.realpath) {
          rpc = e.realpathCached() || await e.realpath();
          if (!rpc)
            return void 0;
          e = rpc;
        }
        const needStat = e.isUnknown() || this.opts.stat;
        const s = needStat ? await e.lstat() : e;
        if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
          const target = await s.realpath();
          if (target && (target.isUnknown() || this.opts.stat)) {
            await target.lstat();
          }
        }
        return this.matchCheckTest(s, ifDir);
      }
      matchCheckTest(e, ifDir) {
        return e && (this.maxDepth === Infinity || e.depth() <= this.maxDepth) && (!ifDir || e.canReaddir()) && (!this.opts.nodir || !e.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !e.isSymbolicLink() || !e.realpathCached()?.isDirectory()) && !this.#ignored(e) ? e : void 0;
      }
      matchCheckSync(e, ifDir) {
        if (ifDir && this.opts.nodir)
          return void 0;
        let rpc;
        if (this.opts.realpath) {
          rpc = e.realpathCached() || e.realpathSync();
          if (!rpc)
            return void 0;
          e = rpc;
        }
        const needStat = e.isUnknown() || this.opts.stat;
        const s = needStat ? e.lstatSync() : e;
        if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
          const target = s.realpathSync();
          if (target && (target?.isUnknown() || this.opts.stat)) {
            target.lstatSync();
          }
        }
        return this.matchCheckTest(s, ifDir);
      }
      matchFinish(e, absolute) {
        if (this.#ignored(e))
          return;
        const abs = this.opts.absolute === void 0 ? absolute : this.opts.absolute;
        this.seen.add(e);
        const mark = this.opts.mark && e.isDirectory() ? this.#sep : "";
        if (this.opts.withFileTypes) {
          this.matchEmit(e);
        } else if (abs) {
          const abs2 = this.opts.posix ? e.fullpathPosix() : e.fullpath();
          this.matchEmit(abs2 + mark);
        } else {
          const rel = this.opts.posix ? e.relativePosix() : e.relative();
          const pre = this.opts.dotRelative && !rel.startsWith(".." + this.#sep) ? "." + this.#sep : "";
          this.matchEmit(!rel ? "." + mark : pre + rel + mark);
        }
      }
      async match(e, absolute, ifDir) {
        const p = await this.matchCheck(e, ifDir);
        if (p)
          this.matchFinish(p, absolute);
      }
      matchSync(e, absolute, ifDir) {
        const p = this.matchCheckSync(e, ifDir);
        if (p)
          this.matchFinish(p, absolute);
      }
      walkCB(target, patterns, cb) {
        if (this.signal?.aborted)
          cb();
        this.walkCB2(target, patterns, new processor_js_1.Processor(this.opts), cb);
      }
      walkCB2(target, patterns, processor, cb) {
        if (this.#childrenIgnored(target))
          return cb();
        if (this.signal?.aborted)
          cb();
        if (this.paused) {
          this.onResume(() => this.walkCB2(target, patterns, processor, cb));
          return;
        }
        processor.processPatterns(target, patterns);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          tasks++;
          this.match(m, absolute, ifDir).then(() => next());
        }
        for (const t of processor.subwalkTargets()) {
          if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
            continue;
          }
          tasks++;
          const childrenCached = t.readdirCached();
          if (t.calledReaddir())
            this.walkCB3(t, childrenCached, processor, next);
          else {
            t.readdirCB((_, entries) => this.walkCB3(t, entries, processor, next), true);
          }
        }
        next();
      }
      walkCB3(target, entries, processor, cb) {
        processor = processor.filterEntries(target, entries);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          tasks++;
          this.match(m, absolute, ifDir).then(() => next());
        }
        for (const [target2, patterns] of processor.subwalks.entries()) {
          tasks++;
          this.walkCB2(target2, patterns, processor.child(), next);
        }
        next();
      }
      walkCBSync(target, patterns, cb) {
        if (this.signal?.aborted)
          cb();
        this.walkCB2Sync(target, patterns, new processor_js_1.Processor(this.opts), cb);
      }
      walkCB2Sync(target, patterns, processor, cb) {
        if (this.#childrenIgnored(target))
          return cb();
        if (this.signal?.aborted)
          cb();
        if (this.paused) {
          this.onResume(() => this.walkCB2Sync(target, patterns, processor, cb));
          return;
        }
        processor.processPatterns(target, patterns);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          this.matchSync(m, absolute, ifDir);
        }
        for (const t of processor.subwalkTargets()) {
          if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
            continue;
          }
          tasks++;
          const children = t.readdirSync();
          this.walkCB3Sync(t, children, processor, next);
        }
        next();
      }
      walkCB3Sync(target, entries, processor, cb) {
        processor = processor.filterEntries(target, entries);
        let tasks = 1;
        const next = () => {
          if (--tasks === 0)
            cb();
        };
        for (const [m, absolute, ifDir] of processor.matches.entries()) {
          if (this.#ignored(m))
            continue;
          this.matchSync(m, absolute, ifDir);
        }
        for (const [target2, patterns] of processor.subwalks.entries()) {
          tasks++;
          this.walkCB2Sync(target2, patterns, processor.child(), next);
        }
        next();
      }
    };
    exports.GlobUtil = GlobUtil;
    var GlobWalker = class extends GlobUtil {
      matches;
      constructor(patterns, path, opts) {
        super(patterns, path, opts);
        this.matches = /* @__PURE__ */ new Set();
      }
      matchEmit(e) {
        this.matches.add(e);
      }
      async walk() {
        if (this.signal?.aborted)
          throw this.signal.reason;
        if (this.path.isUnknown()) {
          await this.path.lstat();
        }
        await new Promise((res, rej) => {
          this.walkCB(this.path, this.patterns, () => {
            if (this.signal?.aborted) {
              rej(this.signal.reason);
            } else {
              res(this.matches);
            }
          });
        });
        return this.matches;
      }
      walkSync() {
        if (this.signal?.aborted)
          throw this.signal.reason;
        if (this.path.isUnknown()) {
          this.path.lstatSync();
        }
        this.walkCBSync(this.path, this.patterns, () => {
          if (this.signal?.aborted)
            throw this.signal.reason;
        });
        return this.matches;
      }
    };
    exports.GlobWalker = GlobWalker;
    var GlobStream = class extends GlobUtil {
      results;
      constructor(patterns, path, opts) {
        super(patterns, path, opts);
        this.results = new minipass_1.Minipass({
          signal: this.signal,
          objectMode: true
        });
        this.results.on("drain", () => this.resume());
        this.results.on("resume", () => this.resume());
      }
      matchEmit(e) {
        this.results.write(e);
        if (!this.results.flowing)
          this.pause();
      }
      stream() {
        const target = this.path;
        if (target.isUnknown()) {
          target.lstat().then(() => {
            this.walkCB(target, this.patterns, () => this.results.end());
          });
        } else {
          this.walkCB(target, this.patterns, () => this.results.end());
        }
        return this.results;
      }
      streamSync() {
        if (this.path.isUnknown()) {
          this.path.lstatSync();
        }
        this.walkCBSync(this.path, this.patterns, () => this.results.end());
        return this.results;
      }
    };
    exports.GlobStream = GlobStream;
  }
});

// node_modules/glob/dist/commonjs/glob.js
var require_glob = __commonJS({
  "node_modules/glob/dist/commonjs/glob.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Glob = void 0;
    var minimatch_1 = require_commonjs();
    var path_scurry_1 = require_commonjs4();
    var url_1 = __require("url");
    var pattern_js_1 = require_pattern();
    var walker_js_1 = require_walker();
    var defaultPlatform = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux";
    var Glob = class {
      absolute;
      cwd;
      root;
      dot;
      dotRelative;
      follow;
      ignore;
      magicalBraces;
      mark;
      matchBase;
      maxDepth;
      nobrace;
      nocase;
      nodir;
      noext;
      noglobstar;
      pattern;
      platform;
      realpath;
      scurry;
      stat;
      signal;
      windowsPathsNoEscape;
      withFileTypes;
      /**
       * The options provided to the constructor.
       */
      opts;
      /**
       * An array of parsed immutable {@link Pattern} objects.
       */
      patterns;
      /**
       * All options are stored as properties on the `Glob` object.
       *
       * See {@link GlobOptions} for full options descriptions.
       *
       * Note that a previous `Glob` object can be passed as the
       * `GlobOptions` to another `Glob` instantiation to re-use settings
       * and caches with a new pattern.
       *
       * Traversal functions can be called multiple times to run the walk
       * again.
       */
      constructor(pattern, opts) {
        if (!opts)
          throw new TypeError("glob options required");
        this.withFileTypes = !!opts.withFileTypes;
        this.signal = opts.signal;
        this.follow = !!opts.follow;
        this.dot = !!opts.dot;
        this.dotRelative = !!opts.dotRelative;
        this.nodir = !!opts.nodir;
        this.mark = !!opts.mark;
        if (!opts.cwd) {
          this.cwd = "";
        } else if (opts.cwd instanceof URL || opts.cwd.startsWith("file://")) {
          opts.cwd = (0, url_1.fileURLToPath)(opts.cwd);
        }
        this.cwd = opts.cwd || "";
        this.root = opts.root;
        this.magicalBraces = !!opts.magicalBraces;
        this.nobrace = !!opts.nobrace;
        this.noext = !!opts.noext;
        this.realpath = !!opts.realpath;
        this.absolute = opts.absolute;
        this.noglobstar = !!opts.noglobstar;
        this.matchBase = !!opts.matchBase;
        this.maxDepth = typeof opts.maxDepth === "number" ? opts.maxDepth : Infinity;
        this.stat = !!opts.stat;
        this.ignore = opts.ignore;
        if (this.withFileTypes && this.absolute !== void 0) {
          throw new Error("cannot set absolute and withFileTypes:true");
        }
        if (typeof pattern === "string") {
          pattern = [pattern];
        }
        this.windowsPathsNoEscape = !!opts.windowsPathsNoEscape || opts.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) {
          pattern = pattern.map((p) => p.replace(/\\/g, "/"));
        }
        if (this.matchBase) {
          if (opts.noglobstar) {
            throw new TypeError("base matching requires globstar");
          }
          pattern = pattern.map((p) => p.includes("/") ? p : `./**/${p}`);
        }
        this.pattern = pattern;
        this.platform = opts.platform || defaultPlatform;
        this.opts = { ...opts, platform: this.platform };
        if (opts.scurry) {
          this.scurry = opts.scurry;
          if (opts.nocase !== void 0 && opts.nocase !== opts.scurry.nocase) {
            throw new Error("nocase option contradicts provided scurry option");
          }
        } else {
          const Scurry = opts.platform === "win32" ? path_scurry_1.PathScurryWin32 : opts.platform === "darwin" ? path_scurry_1.PathScurryDarwin : opts.platform ? path_scurry_1.PathScurryPosix : path_scurry_1.PathScurry;
          this.scurry = new Scurry(this.cwd, {
            nocase: opts.nocase,
            fs: opts.fs
          });
        }
        this.nocase = this.scurry.nocase;
        const nocaseMagicOnly = this.platform === "darwin" || this.platform === "win32";
        const mmo = {
          // default nocase based on platform
          ...opts,
          dot: this.dot,
          matchBase: this.matchBase,
          nobrace: this.nobrace,
          nocase: this.nocase,
          nocaseMagicOnly,
          nocomment: true,
          noext: this.noext,
          nonegate: true,
          optimizationLevel: 2,
          platform: this.platform,
          windowsPathsNoEscape: this.windowsPathsNoEscape,
          debug: !!this.opts.debug
        };
        const mms = this.pattern.map((p) => new minimatch_1.Minimatch(p, mmo));
        const [matchSet, globParts] = mms.reduce((set, m) => {
          set[0].push(...m.set);
          set[1].push(...m.globParts);
          return set;
        }, [[], []]);
        this.patterns = matchSet.map((set, i) => {
          const g = globParts[i];
          if (!g)
            throw new Error("invalid pattern object");
          return new pattern_js_1.Pattern(set, g, 0, this.platform);
        });
      }
      async walk() {
        return [
          ...await new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
            platform: this.platform,
            nocase: this.nocase
          }).walk()
        ];
      }
      walkSync() {
        return [
          ...new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
            ...this.opts,
            maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
            platform: this.platform,
            nocase: this.nocase
          }).walkSync()
        ];
      }
      stream() {
        return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
          platform: this.platform,
          nocase: this.nocase
        }).stream();
      }
      streamSync() {
        return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
          ...this.opts,
          maxDepth: this.maxDepth !== Infinity ? this.maxDepth + this.scurry.cwd.depth() : Infinity,
          platform: this.platform,
          nocase: this.nocase
        }).streamSync();
      }
      /**
       * Default sync iteration function. Returns a Generator that
       * iterates over the results.
       */
      iterateSync() {
        return this.streamSync()[Symbol.iterator]();
      }
      [Symbol.iterator]() {
        return this.iterateSync();
      }
      /**
       * Default async iteration function. Returns an AsyncGenerator that
       * iterates over the results.
       */
      iterate() {
        return this.stream()[Symbol.asyncIterator]();
      }
      [Symbol.asyncIterator]() {
        return this.iterate();
      }
    };
    exports.Glob = Glob;
  }
});

// node_modules/glob/dist/commonjs/has-magic.js
var require_has_magic = __commonJS({
  "node_modules/glob/dist/commonjs/has-magic.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hasMagic = void 0;
    var minimatch_1 = require_commonjs();
    var hasMagic = (pattern, options = {}) => {
      if (!Array.isArray(pattern)) {
        pattern = [pattern];
      }
      for (const p of pattern) {
        if (new minimatch_1.Minimatch(p, options).hasMagic())
          return true;
      }
      return false;
    };
    exports.hasMagic = hasMagic;
  }
});

// node_modules/glob/dist/commonjs/index.js
var require_commonjs5 = __commonJS({
  "node_modules/glob/dist/commonjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.glob = exports.hasMagic = exports.Glob = exports.unescape = exports.escape = exports.sync = exports.iterate = exports.iterateSync = exports.stream = exports.streamSync = exports.globIterate = exports.globIterateSync = exports.globSync = exports.globStream = exports.globStreamSync = void 0;
    var minimatch_1 = require_commonjs();
    var glob_js_1 = require_glob();
    var has_magic_js_1 = require_has_magic();
    function globStreamSync(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).streamSync();
    }
    exports.globStreamSync = globStreamSync;
    function globStream(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).stream();
    }
    exports.globStream = globStream;
    function globSync(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).walkSync();
    }
    exports.globSync = globSync;
    async function glob_(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).walk();
    }
    function globIterateSync(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).iterateSync();
    }
    exports.globIterateSync = globIterateSync;
    function globIterate(pattern, options = {}) {
      return new glob_js_1.Glob(pattern, options).iterate();
    }
    exports.globIterate = globIterate;
    exports.streamSync = globStreamSync;
    exports.stream = Object.assign(globStream, { sync: globStreamSync });
    exports.iterateSync = globIterateSync;
    exports.iterate = Object.assign(globIterate, {
      sync: globIterateSync
    });
    exports.sync = Object.assign(globSync, {
      stream: globStreamSync,
      iterate: globIterateSync
    });
    var minimatch_2 = require_commonjs();
    Object.defineProperty(exports, "escape", { enumerable: true, get: function() {
      return minimatch_2.escape;
    } });
    Object.defineProperty(exports, "unescape", { enumerable: true, get: function() {
      return minimatch_2.unescape;
    } });
    var glob_js_2 = require_glob();
    Object.defineProperty(exports, "Glob", { enumerable: true, get: function() {
      return glob_js_2.Glob;
    } });
    var has_magic_js_2 = require_has_magic();
    Object.defineProperty(exports, "hasMagic", { enumerable: true, get: function() {
      return has_magic_js_2.hasMagic;
    } });
    exports.glob = Object.assign(glob_, {
      glob: glob_,
      globSync,
      sync: exports.sync,
      globStream,
      stream: exports.stream,
      globStreamSync,
      streamSync: exports.streamSync,
      globIterate,
      iterate: exports.iterate,
      globIterateSync,
      iterateSync: exports.iterateSync,
      Glob: glob_js_1.Glob,
      hasMagic: has_magic_js_1.hasMagic,
      escape: minimatch_1.escape,
      unescape: minimatch_1.unescape
    });
    exports.glob.glob = exports.glob;
  }
});

// node_modules/@fastify/send/lib/isUtf8MimeType.js
var require_isUtf8MimeType = __commonJS({
  "node_modules/@fastify/send/lib/isUtf8MimeType.js"(exports, module) {
    "use strict";
    function isUtf8MimeType(value) {
      const len = value.length;
      return len > 21 && value.indexOf("application/javascript") === 0 || len > 14 && value.indexOf("application/json") === 0 || len > 5 && value.indexOf("text/") === 0;
    }
    module.exports.isUtf8MimeType = isUtf8MimeType;
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null);
      this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++) {
        this.define(arguments[i]);
      }
      this.define = this.define.bind(this);
      this.getType = this.getType.bind(this);
      this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          const ext = extensions[i];
          if (ext[0] === "*") {
            continue;
          }
          if (!force && ext in this._types) {
            throw new Error(
              'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
            );
          }
          this._types[ext] = type;
        }
        if (force || !this._extensions[type]) {
          const ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path) {
      path = String(path);
      let last = path.replace(/^.*[/\\]/, "").toLowerCase();
      let ext = last.replace(/^.*\./, "").toLowerCase();
      let hasPath = last.length < path.length;
      let hasDot = ext.length < last.length - 1;
      return (hasDot || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
      return type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    "use strict";
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports, module) {
    "use strict";
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS({
  "node_modules/fast-decode-uri-component/index.js"(exports, module) {
    "use strict";
    var UTF8_ACCEPT = 12;
    var UTF8_REJECT = 0;
    var UTF8_DATA = [
      // The first part of the table maps bytes to character to a transition.
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      3,
      4,
      4,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      6,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      7,
      8,
      7,
      7,
      10,
      9,
      9,
      9,
      11,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      4,
      // The second part of the table maps a state to a new state when adding a
      // transition.
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      12,
      0,
      0,
      0,
      0,
      24,
      36,
      48,
      60,
      72,
      84,
      96,
      0,
      12,
      12,
      12,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      24,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      24,
      24,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // The third part maps the current transition to a mask that needs to apply
      // to the byte.
      127,
      63,
      63,
      63,
      0,
      31,
      15,
      15,
      15,
      7,
      7,
      7
    ];
    function decodeURIComponent2(uri) {
      var percentPosition = uri.indexOf("%");
      if (percentPosition === -1)
        return uri;
      var length = uri.length;
      var decoded = "";
      var last = 0;
      var codepoint = 0;
      var startOfOctets = percentPosition;
      var state = UTF8_ACCEPT;
      while (percentPosition > -1 && percentPosition < length) {
        var high = hexCodeToInt(uri[percentPosition + 1], 4);
        var low = hexCodeToInt(uri[percentPosition + 2], 0);
        var byte = high | low;
        var type = UTF8_DATA[byte];
        state = UTF8_DATA[256 + state + type];
        codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type];
        if (state === UTF8_ACCEPT) {
          decoded += uri.slice(last, startOfOctets);
          decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(
            55232 + (codepoint >> 10),
            56320 + (codepoint & 1023)
          );
          codepoint = 0;
          last = percentPosition + 3;
          percentPosition = startOfOctets = uri.indexOf("%", last);
        } else if (state === UTF8_REJECT) {
          return null;
        } else {
          percentPosition += 3;
          if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
            continue;
          return null;
        }
      }
      return decoded + uri.slice(last);
    }
    var HEX = {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "a": 10,
      "A": 10,
      "b": 11,
      "B": 11,
      "c": 12,
      "C": 12,
      "d": 13,
      "D": 13,
      "e": 14,
      "E": 14,
      "f": 15,
      "F": 15
    };
    function hexCodeToInt(c, shift) {
      var i = HEX[c];
      return i === void 0 ? 255 : i << shift;
    }
    module.exports = decodeURIComponent2;
  }
});

// node_modules/escape-html/index.js
var require_escape_html = __commonJS({
  "node_modules/escape-html/index.js"(exports, module) {
    "use strict";
    var matchHtmlRegExp = /["'&<>]/;
    module.exports = escapeHtml;
    function escapeHtml(string) {
      var str = "" + string;
      var match = matchHtmlRegExp.exec(str);
      if (!match) {
        return str;
      }
      var escape;
      var html = "";
      var index = 0;
      var lastIndex = 0;
      for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
  }
});

// node_modules/@lukeed/ms/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@lukeed/ms/dist/index.js"(exports) {
    "use strict";
    var RGX = /^(-?(?:\d+)?\.?\d+) *(m(?:illiseconds?|s(?:ecs?)?))?(s(?:ec(?:onds?|s)?)?)?(m(?:in(?:utes?|s)?)?)?(h(?:ours?|rs?)?)?(d(?:ays?)?)?(w(?:eeks?|ks?)?)?(y(?:ears?|rs?)?)?$/;
    var SEC = 1e3;
    var MIN = SEC * 60;
    var HOUR = MIN * 60;
    var DAY = HOUR * 24;
    var YEAR = DAY * 365.25;
    function parse(val) {
      var num, arr = val.toLowerCase().match(RGX);
      if (arr != null && (num = parseFloat(arr[1]))) {
        if (arr[3] != null)
          return num * SEC;
        if (arr[4] != null)
          return num * MIN;
        if (arr[5] != null)
          return num * HOUR;
        if (arr[6] != null)
          return num * DAY;
        if (arr[7] != null)
          return num * DAY * 7;
        if (arr[8] != null)
          return num * YEAR;
        return num;
      }
    }
    function fmt(val, pfx, str, long) {
      var num = (val | 0) === val ? val : ~~(val + 0.5);
      return pfx + num + (long ? " " + str + (num != 1 ? "s" : "") : str[0]);
    }
    function format(num, long) {
      var pfx = num < 0 ? "-" : "", abs = num < 0 ? -num : num;
      if (abs < SEC)
        return num + (long ? " ms" : "ms");
      if (abs < MIN)
        return fmt(abs / SEC, pfx, "second", long);
      if (abs < HOUR)
        return fmt(abs / MIN, pfx, "minute", long);
      if (abs < DAY)
        return fmt(abs / HOUR, pfx, "hour", long);
      if (abs < YEAR)
        return fmt(abs / DAY, pfx, "day", long);
      return fmt(abs / YEAR, pfx, "year", long);
    }
    exports.format = format;
    exports.parse = parse;
  }
});

// node_modules/@fastify/send/lib/clearHeaders.js
var require_clearHeaders = __commonJS({
  "node_modules/@fastify/send/lib/clearHeaders.js"(exports) {
    "use strict";
    function clearHeaders(res) {
      const headers = res.getHeaderNames();
      for (let i = 0; i < headers.length; i++) {
        res.removeHeader(headers[i]);
      }
    }
    exports.clearHeaders = clearHeaders;
  }
});

// node_modules/@fastify/send/lib/collapseLeadingSlashes.js
var require_collapseLeadingSlashes = __commonJS({
  "node_modules/@fastify/send/lib/collapseLeadingSlashes.js"(exports, module) {
    "use strict";
    function collapseLeadingSlashes(str) {
      if (str[0] !== "/" || str[1] !== "/") {
        return str;
      }
      for (let i = 2, il = str.length; i < il; ++i) {
        if (str[i] !== "/") {
          return str.slice(i - 1);
        }
      }
    }
    module.exports.collapseLeadingSlashes = collapseLeadingSlashes;
  }
});

// node_modules/@fastify/send/lib/containsDotFile.js
var require_containsDotFile = __commonJS({
  "node_modules/@fastify/send/lib/containsDotFile.js"(exports, module) {
    "use strict";
    function containsDotFile(parts) {
      for (let i = 0, il = parts.length; i < il; ++i) {
        if (parts[i].length !== 1 && parts[i][0] === ".") {
          return true;
        }
      }
      return false;
    }
    module.exports.containsDotFile = containsDotFile;
  }
});

// node_modules/@fastify/send/lib/contentRange.js
var require_contentRange = __commonJS({
  "node_modules/@fastify/send/lib/contentRange.js"(exports) {
    "use strict";
    function contentRange(type, size, range) {
      return type + " " + (range ? range.start + "-" + range.end : "*") + "/" + size;
    }
    exports.contentRange = contentRange;
  }
});

// node_modules/@fastify/send/lib/createHtmlDocument.js
var require_createHtmlDocument = __commonJS({
  "node_modules/@fastify/send/lib/createHtmlDocument.js"(exports) {
    "use strict";
    function createHtmlDocument(title, body) {
      const html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>' + title + "</title>\n</head>\n<body>\n<pre>" + body + "</pre>\n</body>\n</html>\n";
      return [html, Buffer.byteLength(html)];
    }
    exports.createHtmlDocument = createHtmlDocument;
  }
});

// node_modules/depd/index.js
var require_depd = __commonJS({
  "node_modules/depd/index.js"(exports, module) {
    "use strict";
    var relative = __require("path").relative;
    module.exports = depd;
    var basePath = process.cwd();
    function containsNamespace(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i = 0; i < vals.length; i++) {
        var val = vals[i];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor(obj, prop, message) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString(arity) {
      var str = "";
      for (var i = 0; i < arity; i++) {
        str += ", arg" + i;
      }
      return str.substr(2);
    }
    function createStackString(stack) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i = 0; i < stack.length; i++) {
        str += "\n    at " + stack[i].toString();
      }
      return str;
    }
    function depd(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      var file = site[0];
      function deprecate(message) {
        log.call(deprecate, message);
      }
      deprecate._file = file;
      deprecate._ignored = isignored(namespace);
      deprecate._namespace = namespace;
      deprecate._traced = istraced(namespace);
      deprecate._warned = /* @__PURE__ */ Object.create(null);
      deprecate.function = wrapfunction;
      deprecate.property = wrapproperty;
      return deprecate;
    }
    function eehaslisteners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function isignored(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function istraced(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function log(message, site) {
      var haslisteners = eehaslisteners(process, "deprecation");
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i = 0;
      var seen = false;
      var stack = getStack();
      var file = this._file;
      if (site) {
        depSite = site;
        callSite = callSiteLocation(stack[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i = 2;
        depSite = callSiteLocation(stack[i]);
        callSite = depSite;
      }
      for (; i < stack.length; i++) {
        caller = callSiteLocation(stack[i]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError(this._namespace, msg, stack.slice(i));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor : formatPlain;
      var output = format.call(this, msg, caller, stack.slice(i));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site = [file, line, colm];
      site.callSite = callSite;
      site.name = callSite.getFunctionName();
      return site;
    }
    function defaultMessage(site) {
      var callSite = site.callSite;
      var funcName = site.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation(site) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain(msg, caller, stack) {
      var timestamp = (/* @__PURE__ */ new Date()).toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    at " + stack[i].toString();
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation(caller);
      }
      return formatted;
    }
    function formatColor(msg, caller, stack) {
      var formatted = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + msg + "\x1B[39m";
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    \x1B[36mat " + stack[i].toString() + "\x1B[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " \x1B[36m" + formatLocation(caller) + "\x1B[39m";
      }
      return formatted;
    }
    function formatLocation(callSite) {
      return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack;
    }
    function prepareObjectStackTrace(obj, stack) {
      return stack;
    }
    function wrapfunction(fn, message) {
      if (typeof fn !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args = createArgumentsString(fn.length);
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = fn.name;
      var deprecatedfn = new Function(
        "fn",
        "log",
        "deprecate",
        "message",
        "site",
        '"use strict"\nreturn function (' + args + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}"
      )(fn, log, this, message, site);
      return deprecatedfn;
    }
    function wrapproperty(obj, prop, message) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate = this;
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor(obj, prop, message);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log.call(deprecate, message, site);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log.call(deprecate, message, site);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError(namespace, message, stack) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString.call(this, stack);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/setprototypeof/index.js
var require_setprototypeof = __commonJS({
  "node_modules/setprototypeof/index.js"(exports, module) {
    "use strict";
    module.exports = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
    function setProtoOf(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    }
    function mixinProperties(obj, proto) {
      for (var prop in proto) {
        if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
          obj[prop] = proto[prop];
        }
      }
      return obj;
    }
  }
});

// node_modules/statuses/codes.json
var require_codes = __commonJS({
  "node_modules/statuses/codes.json"(exports, module) {
    module.exports = {
      "100": "Continue",
      "101": "Switching Protocols",
      "102": "Processing",
      "103": "Early Hints",
      "200": "OK",
      "201": "Created",
      "202": "Accepted",
      "203": "Non-Authoritative Information",
      "204": "No Content",
      "205": "Reset Content",
      "206": "Partial Content",
      "207": "Multi-Status",
      "208": "Already Reported",
      "226": "IM Used",
      "300": "Multiple Choices",
      "301": "Moved Permanently",
      "302": "Found",
      "303": "See Other",
      "304": "Not Modified",
      "305": "Use Proxy",
      "307": "Temporary Redirect",
      "308": "Permanent Redirect",
      "400": "Bad Request",
      "401": "Unauthorized",
      "402": "Payment Required",
      "403": "Forbidden",
      "404": "Not Found",
      "405": "Method Not Allowed",
      "406": "Not Acceptable",
      "407": "Proxy Authentication Required",
      "408": "Request Timeout",
      "409": "Conflict",
      "410": "Gone",
      "411": "Length Required",
      "412": "Precondition Failed",
      "413": "Payload Too Large",
      "414": "URI Too Long",
      "415": "Unsupported Media Type",
      "416": "Range Not Satisfiable",
      "417": "Expectation Failed",
      "418": "I'm a Teapot",
      "421": "Misdirected Request",
      "422": "Unprocessable Entity",
      "423": "Locked",
      "424": "Failed Dependency",
      "425": "Too Early",
      "426": "Upgrade Required",
      "428": "Precondition Required",
      "429": "Too Many Requests",
      "431": "Request Header Fields Too Large",
      "451": "Unavailable For Legal Reasons",
      "500": "Internal Server Error",
      "501": "Not Implemented",
      "502": "Bad Gateway",
      "503": "Service Unavailable",
      "504": "Gateway Timeout",
      "505": "HTTP Version Not Supported",
      "506": "Variant Also Negotiates",
      "507": "Insufficient Storage",
      "508": "Loop Detected",
      "509": "Bandwidth Limit Exceeded",
      "510": "Not Extended",
      "511": "Network Authentication Required"
    };
  }
});

// node_modules/statuses/index.js
var require_statuses = __commonJS({
  "node_modules/statuses/index.js"(exports, module) {
    "use strict";
    var codes = require_codes();
    module.exports = status;
    status.message = codes;
    status.code = createMessageToStatusCodeMap(codes);
    status.codes = createStatusCodeList(codes);
    status.redirect = {
      300: true,
      301: true,
      302: true,
      303: true,
      305: true,
      307: true,
      308: true
    };
    status.empty = {
      204: true,
      205: true,
      304: true
    };
    status.retry = {
      502: true,
      503: true,
      504: true
    };
    function createMessageToStatusCodeMap(codes2) {
      var map = {};
      Object.keys(codes2).forEach(function forEachCode(code) {
        var message = codes2[code];
        var status2 = Number(code);
        map[message.toLowerCase()] = status2;
      });
      return map;
    }
    function createStatusCodeList(codes2) {
      return Object.keys(codes2).map(function mapCode(code) {
        return Number(code);
      });
    }
    function getStatusCode(message) {
      var msg = message.toLowerCase();
      if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
        throw new Error('invalid status message: "' + message + '"');
      }
      return status.code[msg];
    }
    function getStatusMessage(code) {
      if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
        throw new Error("invalid status code: " + code);
      }
      return status.message[code];
    }
    function status(code) {
      if (typeof code === "number") {
        return getStatusMessage(code);
      }
      if (typeof code !== "string") {
        throw new TypeError("code must be a number or string");
      }
      var n = parseInt(code, 10);
      if (!isNaN(n)) {
        return getStatusMessage(n);
      }
      return getStatusCode(code);
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module) {
    "use strict";
    if (typeof Object.create === "function") {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module) {
    "use strict";
    try {
      util = __require("util");
      if (typeof util.inherits !== "function")
        throw "";
      module.exports = util.inherits;
    } catch (e) {
      module.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/toidentifier/index.js
var require_toidentifier = __commonJS({
  "node_modules/toidentifier/index.js"(exports, module) {
    "use strict";
    module.exports = toIdentifier;
    function toIdentifier(str) {
      return str.split(" ").map(function(token) {
        return token.slice(0, 1).toUpperCase() + token.slice(1);
      }).join("").replace(/[^ _0-9a-z]/gi, "");
    }
  }
});

// node_modules/http-errors/index.js
var require_http_errors = __commonJS({
  "node_modules/http-errors/index.js"(exports, module) {
    "use strict";
    var deprecate = require_depd()("http-errors");
    var setPrototypeOf = require_setprototypeof();
    var statuses = require_statuses();
    var inherits = require_inherits();
    var toIdentifier = require_toidentifier();
    module.exports = createError;
    module.exports.HttpError = createHttpErrorConstructor();
    module.exports.isHttpError = createIsHttpErrorFunction(module.exports.HttpError);
    populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError);
    function codeClass(status) {
      return Number(String(status).charAt(0) + "00");
    }
    function createError() {
      var err;
      var msg;
      var status = 500;
      var props = {};
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var type = typeof arg;
        if (type === "object" && arg instanceof Error) {
          err = arg;
          status = err.status || err.statusCode || status;
        } else if (type === "number" && i === 0) {
          status = arg;
        } else if (type === "string") {
          msg = arg;
        } else if (type === "object") {
          props = arg;
        } else {
          throw new TypeError("argument #" + (i + 1) + " unsupported type " + type);
        }
      }
      if (typeof status === "number" && (status < 400 || status >= 600)) {
        deprecate("non-error status code; use only 4xx or 5xx status codes");
      }
      if (typeof status !== "number" || !statuses.message[status] && (status < 400 || status >= 600)) {
        status = 500;
      }
      var HttpError = createError[status] || createError[codeClass(status)];
      if (!err) {
        err = HttpError ? new HttpError(msg) : new Error(msg || statuses.message[status]);
        Error.captureStackTrace(err, createError);
      }
      if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
        err.expose = status < 500;
        err.status = err.statusCode = status;
      }
      for (var key in props) {
        if (key !== "status" && key !== "statusCode") {
          err[key] = props[key];
        }
      }
      return err;
    }
    function createHttpErrorConstructor() {
      function HttpError() {
        throw new TypeError("cannot construct abstract class");
      }
      inherits(HttpError, Error);
      return HttpError;
    }
    function createClientErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ClientError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ClientError);
        setPrototypeOf(err, ClientError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ClientError, HttpError);
      nameFunc(ClientError, className);
      ClientError.prototype.status = code;
      ClientError.prototype.statusCode = code;
      ClientError.prototype.expose = true;
      return ClientError;
    }
    function createIsHttpErrorFunction(HttpError) {
      return function isHttpError(val) {
        if (!val || typeof val !== "object") {
          return false;
        }
        if (val instanceof HttpError) {
          return true;
        }
        return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
      };
    }
    function createServerErrorConstructor(HttpError, name, code) {
      var className = toClassName(name);
      function ServerError(message) {
        var msg = message != null ? message : statuses.message[code];
        var err = new Error(msg);
        Error.captureStackTrace(err, ServerError);
        setPrototypeOf(err, ServerError.prototype);
        Object.defineProperty(err, "message", {
          enumerable: true,
          configurable: true,
          value: msg,
          writable: true
        });
        Object.defineProperty(err, "name", {
          enumerable: false,
          configurable: true,
          value: className,
          writable: true
        });
        return err;
      }
      inherits(ServerError, HttpError);
      nameFunc(ServerError, className);
      ServerError.prototype.status = code;
      ServerError.prototype.statusCode = code;
      ServerError.prototype.expose = false;
      return ServerError;
    }
    function nameFunc(func, name) {
      var desc = Object.getOwnPropertyDescriptor(func, "name");
      if (desc && desc.configurable) {
        desc.value = name;
        Object.defineProperty(func, "name", desc);
      }
    }
    function populateConstructorExports(exports2, codes, HttpError) {
      codes.forEach(function forEachCode(code) {
        var CodeError;
        var name = toIdentifier(statuses.message[code]);
        switch (codeClass(code)) {
          case 400:
            CodeError = createClientErrorConstructor(HttpError, name, code);
            break;
          case 500:
            CodeError = createServerErrorConstructor(HttpError, name, code);
            break;
        }
        if (CodeError) {
          exports2[code] = CodeError;
          exports2[name] = CodeError;
        }
      });
    }
    function toClassName(name) {
      return name.substr(-5) !== "Error" ? name + "Error" : name;
    }
  }
});

// node_modules/@fastify/send/lib/createHttpError.js
var require_createHttpError = __commonJS({
  "node_modules/@fastify/send/lib/createHttpError.js"(exports, module) {
    "use strict";
    var createError = require_http_errors();
    function createHttpError(status, err) {
      if (!err) {
        return createError(status);
      }
      return err instanceof Error ? createError(status, err, { expose: false }) : createError(status, err);
    }
    module.exports.createHttpError = createHttpError;
  }
});

// node_modules/@fastify/send/lib/normalizeList.js
var require_normalizeList = __commonJS({
  "node_modules/@fastify/send/lib/normalizeList.js"(exports, module) {
    "use strict";
    function normalizeList(val, name) {
      if (typeof val === "string") {
        return [val];
      } else if (val === false) {
        return [];
      } else if (Array.isArray(val)) {
        for (let i = 0, il = val.length; i < il; ++i) {
          if (typeof val[i] !== "string") {
            throw new TypeError(name + " must be array of strings or false");
          }
        }
        return val;
      } else {
        throw new TypeError(name + " must be array of strings or false");
      }
    }
    module.exports.normalizeList = normalizeList;
  }
});

// node_modules/@fastify/send/lib/parseBytesRange.js
var require_parseBytesRange = __commonJS({
  "node_modules/@fastify/send/lib/parseBytesRange.js"(exports, module) {
    "use strict";
    function parseBytesRange(size, str) {
      const values = str.slice(str.indexOf("=") + 1);
      const ranges = [];
      const len = values.length;
      let i = 0;
      let il = 0;
      let j = 0;
      let start;
      let end;
      let commaIdx = values.indexOf(",");
      let dashIdx = values.indexOf("-");
      let prevIdx = -1;
      while (true) {
        commaIdx === -1 && (commaIdx = len);
        start = parseInt(values.slice(prevIdx + 1, dashIdx), 10);
        end = parseInt(values.slice(dashIdx + 1, commaIdx), 10);
        if (start !== start) {
          start = size - end;
          end = size - 1;
        } else if (end !== end) {
          end = size - 1;
        } else if (end > size - 1) {
          end = size - 1;
        }
        if (
          // eslint-disable-next-line no-self-compare
          start === start && // fast path of isNaN(number)
          // eslint-disable-next-line no-self-compare
          end === end && // fast path of isNaN(number)
          start > -1 && start <= end
        ) {
          ranges.push({
            start,
            end,
            index: j++
          });
        }
        if (commaIdx === len) {
          break;
        }
        prevIdx = commaIdx++;
        dashIdx = values.indexOf("-", commaIdx);
        commaIdx = values.indexOf(",", commaIdx);
      }
      if (j < 2) {
        return ranges;
      }
      ranges.sort(sortByRangeStart);
      il = j;
      j = 0;
      i = 1;
      while (i < il) {
        const range = ranges[i++];
        const current = ranges[j];
        if (range.start > current.end + 1) {
          ranges[++j] = range;
        } else if (range.end > current.end) {
          current.end = range.end;
          current.index > range.index && (current.index = range.index);
        }
      }
      ranges.length = j + 1;
      ranges.sort(sortByRangeIndex);
      return ranges;
    }
    function sortByRangeIndex(a, b) {
      return a.index - b.index;
    }
    function sortByRangeStart(a, b) {
      return a.start - b.start;
    }
    module.exports.parseBytesRange = parseBytesRange;
  }
});

// node_modules/@fastify/send/lib/parseTokenList.js
var require_parseTokenList = __commonJS({
  "node_modules/@fastify/send/lib/parseTokenList.js"(exports, module) {
    "use strict";
    var slice = String.prototype.slice;
    function parseTokenList(str, cb) {
      let end = 0;
      let start = 0;
      let result;
      for (let i = 0, len = str.length; i < len; i++) {
        switch (str.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            if (start !== end) {
              result = cb(slice.call(str, start, end));
              if (result !== void 0) {
                return result;
              }
            }
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      if (start !== end) {
        return cb(slice.call(str, start, end));
      }
    }
    module.exports.parseTokenList = parseTokenList;
  }
});

// node_modules/@fastify/send/lib/setHeaders.js
var require_setHeaders = __commonJS({
  "node_modules/@fastify/send/lib/setHeaders.js"(exports, module) {
    "use strict";
    function setHeaders(res, headers) {
      const keys = Object.keys(headers);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        res.setHeader(key, headers[key]);
      }
    }
    module.exports.setHeaders = setHeaders;
  }
});

// node_modules/@fastify/send/lib/SendStream.js
var require_SendStream = __commonJS({
  "node_modules/@fastify/send/lib/SendStream.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var path = __require("path");
    var Stream = __require("stream");
    var util = __require("util");
    var debug = __require("util").debuglog("send");
    var decode = require_fast_decode_uri_component();
    var escapeHtml = require_escape_html();
    var mime = require_mime();
    var ms = require_dist2();
    var { clearHeaders } = require_clearHeaders();
    var { collapseLeadingSlashes } = require_collapseLeadingSlashes();
    var { containsDotFile } = require_containsDotFile();
    var { contentRange } = require_contentRange();
    var { createHtmlDocument } = require_createHtmlDocument();
    var { createHttpError } = require_createHttpError();
    var { isUtf8MimeType } = require_isUtf8MimeType();
    var { normalizeList } = require_normalizeList();
    var { parseBytesRange } = require_parseBytesRange();
    var { parseTokenList } = require_parseTokenList();
    var { setHeaders } = require_setHeaders();
    var extname = path.extname;
    var join = path.join;
    var normalize = path.normalize;
    var resolve = path.resolve;
    var sep = path.sep;
    var BYTES_RANGE_REGEXP = /^ *bytes=/;
    var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1e3;
    var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
    var ERROR_RESPONSES = {
      400: createHtmlDocument("Error", "Bad Request"),
      403: createHtmlDocument("Error", "Forbidden"),
      404: createHtmlDocument("Error", "Not Found"),
      412: createHtmlDocument("Error", "Precondition Failed"),
      416: createHtmlDocument("Error", "Range Not Satisfiable"),
      500: createHtmlDocument("Error", "Internal Server Error")
    };
    var validDotFilesOptions = [
      "allow",
      "ignore",
      "deny"
    ];
    function SendStream(req, path2, options) {
      if (!new.target) {
        return new SendStream(req, path2, options);
      }
      Stream.call(this);
      const opts = options || {};
      this.options = opts;
      this.path = path2;
      this.req = req;
      this._acceptRanges = opts.acceptRanges !== void 0 ? Boolean(opts.acceptRanges) : true;
      this._cacheControl = opts.cacheControl !== void 0 ? Boolean(opts.cacheControl) : true;
      this._etag = opts.etag !== void 0 ? Boolean(opts.etag) : true;
      this._dotfiles = opts.dotfiles !== void 0 ? validDotFilesOptions.indexOf(opts.dotfiles) : 1;
      if (this._dotfiles === -1) {
        throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"');
      }
      this._extensions = opts.extensions !== void 0 ? normalizeList(opts.extensions, "extensions option") : [];
      this._immutable = opts.immutable !== void 0 ? Boolean(opts.immutable) : false;
      this._index = opts.index !== void 0 ? normalizeList(opts.index, "index option") : ["index.html"];
      this._lastModified = opts.lastModified !== void 0 ? Boolean(opts.lastModified) : true;
      this._maxage = opts.maxAge || opts.maxage;
      this._maxage = typeof this._maxage === "string" ? ms.parse(this._maxage) : Number(this._maxage);
      this._maxage = this._maxage === this._maxage ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE) : 0;
      this._root = opts.root ? resolve(opts.root) : null;
    }
    util.inherits(SendStream, Stream);
    SendStream.prototype.root = function root(path2) {
      this._root = resolve(String(path2));
      debug("root %s", this._root);
      return this;
    };
    SendStream.prototype.error = function error(status, err) {
      if (this.listenerCount("error") > 0) {
        return this.emit("error", createHttpError(status, err));
      }
      const res = this.res;
      clearHeaders(res);
      if (err && err.headers) {
        setHeaders(res, err.headers);
      }
      const doc = ERROR_RESPONSES[status];
      res.statusCode = status;
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.setHeader("Content-Length", doc[1]);
      res.setHeader("Content-Security-Policy", "default-src 'none'");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.end(doc[0]);
    };
    SendStream.prototype.hasTrailingSlash = function hasTrailingSlash() {
      return this.path[this.path.length - 1] === "/";
    };
    SendStream.prototype.isConditionalGET = function isConditionalGET() {
      return this.req.headers["if-match"] || this.req.headers["if-unmodified-since"] || this.req.headers["if-none-match"] || this.req.headers["if-modified-since"];
    };
    SendStream.prototype.isNotModifiedFailure = function isNotModifiedFailure() {
      const req = this.req;
      const res = this.res;
      if ("cache-control" in req.headers && req.headers["cache-control"].indexOf("no-cache") !== -1) {
        return false;
      }
      if ("if-none-match" in req.headers) {
        const ifNoneMatch = req.headers["if-none-match"];
        if (ifNoneMatch === "*") {
          return true;
        }
        const etag = res.getHeader("etag");
        if (typeof etag !== "string") {
          return false;
        }
        const etagL = etag.length;
        const isMatching = parseTokenList(ifNoneMatch, function(match) {
          const mL = match.length;
          if (etagL === mL && match === etag || etagL > mL && "W/" + match === etag) {
            return true;
          }
        });
        if (isMatching) {
          return true;
        }
        return false;
      }
      if ("if-modified-since" in req.headers) {
        const ifModifiedSince = req.headers["if-modified-since"];
        const lastModified = res.getHeader("last-modified");
        if (!lastModified || Date.parse(lastModified) <= Date.parse(ifModifiedSince)) {
          return true;
        }
      }
      return false;
    };
    SendStream.prototype.isPreconditionFailure = function isPreconditionFailure() {
      const req = this.req;
      const res = this.res;
      const ifMatch = req.headers["if-match"];
      if (ifMatch) {
        const etag = res.getHeader("ETag");
        if (ifMatch !== "*") {
          const isMatching = parseTokenList(ifMatch, function(match) {
            if (match === etag || "W/" + match === etag) {
              return true;
            }
          }) || false;
          if (isMatching !== true) {
            return true;
          }
        }
      }
      if ("if-unmodified-since" in req.headers) {
        const ifUnmodifiedSince = req.headers["if-unmodified-since"];
        const unmodifiedSince = Date.parse(ifUnmodifiedSince);
        if (unmodifiedSince === unmodifiedSince) {
          const lastModified = Date.parse(res.getHeader("Last-Modified"));
          if (
            // eslint-disable-next-line no-self-compare
            lastModified !== lastModified || // fast path of isNaN(number)
            lastModified > unmodifiedSince
          ) {
            return true;
          }
        }
      }
      return false;
    };
    SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields() {
      const res = this.res;
      res.removeHeader("Content-Encoding");
      res.removeHeader("Content-Language");
      res.removeHeader("Content-Length");
      res.removeHeader("Content-Range");
      res.removeHeader("Content-Type");
    };
    SendStream.prototype.notModified = function notModified() {
      const res = this.res;
      debug("not modified");
      this.removeContentHeaderFields();
      res.statusCode = 304;
      res.end();
    };
    SendStream.prototype.headersAlreadySent = function headersAlreadySent() {
      const err = new Error("Can't set headers after they are sent.");
      debug("headers already sent");
      this.error(500, err);
    };
    SendStream.prototype.isCachable = function isCachable() {
      const statusCode = this.res.statusCode;
      return statusCode >= 200 && statusCode < 300 || statusCode === 304;
    };
    SendStream.prototype.onStatError = function onStatError(error) {
      switch (error.code) {
        case "ENAMETOOLONG":
        case "ENOTDIR":
        case "ENOENT":
          this.error(404, error);
          break;
        default:
          this.error(500, error);
          break;
      }
    };
    SendStream.prototype.isRangeFresh = function isRangeFresh() {
      if (!("if-range" in this.req.headers)) {
        return true;
      }
      const ifRange = this.req.headers["if-range"];
      if (ifRange.indexOf('"') !== -1) {
        const etag = this.res.getHeader("ETag");
        return etag && ifRange.indexOf(etag) !== -1 || false;
      }
      const ifRangeTimestamp = Date.parse(ifRange);
      if (ifRangeTimestamp !== ifRangeTimestamp) {
        return false;
      }
      const lastModified = Date.parse(this.res.getHeader("Last-Modified"));
      return (
        // eslint-disable-next-line no-self-compare
        lastModified !== lastModified || // fast path of isNaN(number)
        lastModified <= ifRangeTimestamp
      );
    };
    SendStream.prototype.redirect = function redirect(path2) {
      const res = this.res;
      if (this.listenerCount("directory") > 0) {
        this.emit("directory", res, path2);
        return;
      }
      if (this.hasTrailingSlash()) {
        this.error(403);
        return;
      }
      const loc = encodeURI(collapseLeadingSlashes(this.path + "/"));
      const doc = createHtmlDocument("Redirecting", 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + "</a>");
      res.statusCode = 301;
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.setHeader("Content-Length", doc[1]);
      res.setHeader("Content-Security-Policy", "default-src 'none'");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Location", loc);
      res.end(doc[0]);
    };
    SendStream.prototype.pipe = function pipe(res) {
      const root = this._root;
      this.res = res;
      let path2 = decode(this.path);
      if (path2 === null) {
        this.error(400);
        return res;
      }
      if (~path2.indexOf("\0")) {
        this.error(400);
        return res;
      }
      let parts;
      if (root !== null) {
        if (path2) {
          path2 = normalize("." + sep + path2);
        }
        if (UP_PATH_REGEXP.test(path2)) {
          debug('malicious path "%s"', path2);
          this.error(403);
          return res;
        }
        parts = path2.split(sep);
        path2 = normalize(join(root, path2));
      } else {
        if (UP_PATH_REGEXP.test(path2)) {
          debug('malicious path "%s"', path2);
          this.error(403);
          return res;
        }
        parts = normalize(path2).split(sep);
        path2 = resolve(path2);
      }
      if ((debug.enabled || // if debugging is enabled, then check for all cases to log allow case
      this._dotfiles !== 0) && containsDotFile(parts)) {
        switch (this._dotfiles) {
          case 0:
            debug('allow dotfile "%s"', path2);
            break;
          case 2:
            debug('deny dotfile "%s"', path2);
            this.error(403);
            return res;
          case 1:
          default:
            debug('ignore dotfile "%s"', path2);
            this.error(404);
            return res;
        }
      }
      if (this._index.length && this.hasTrailingSlash()) {
        this.sendIndex(path2);
        return res;
      }
      this.sendFile(path2);
      return res;
    };
    SendStream.prototype.send = function send(path2, stat) {
      let len = stat.size;
      const options = this.options;
      const opts = {};
      const res = this.res;
      const req = this.req;
      let offset = options.start || 0;
      if (res.headersSent) {
        this.headersAlreadySent();
        return;
      }
      debug('pipe "%s"', path2);
      this.setHeader(path2, stat);
      this.type(path2);
      if (this.isConditionalGET()) {
        if (this.isPreconditionFailure()) {
          this.error(412);
          return;
        }
        if (this.isCachable() && this.isNotModifiedFailure()) {
          this.notModified();
          return;
        }
      }
      len = Math.max(0, len - offset);
      if (options.end !== void 0) {
        const bytes = options.end - offset + 1;
        if (len > bytes)
          len = bytes;
      }
      if (this._acceptRanges) {
        const rangeHeader = req.headers.range;
        if (rangeHeader !== void 0 && BYTES_RANGE_REGEXP.test(rangeHeader)) {
          if (this.isRangeFresh()) {
            const ranges = parseBytesRange(len, rangeHeader);
            if (ranges.length === 0) {
              debug("range unsatisfiable");
              res.setHeader("Content-Range", contentRange("bytes", len));
              return this.error(416, {
                headers: { "Content-Range": res.getHeader("Content-Range") }
              });
            } else if (ranges.length === 1) {
              debug("range %j", ranges);
              res.statusCode = 206;
              res.setHeader("Content-Range", contentRange("bytes", len, ranges[0]));
              offset += ranges[0].start;
              len = ranges[0].end - ranges[0].start + 1;
            }
          } else {
            debug("range stale");
          }
        }
      }
      for (const prop in options) {
        opts[prop] = options[prop];
      }
      opts.start = offset;
      opts.end = Math.max(offset, offset + len - 1);
      res.setHeader("Content-Length", len);
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      this.stream(path2, opts);
    };
    SendStream.prototype.sendFile = function sendFile(path2) {
      let i = 0;
      const self = this;
      debug('stat "%s"', path2);
      fs.stat(path2, function onstat(err, stat) {
        if (err && err.code === "ENOENT" && !extname(path2) && path2[path2.length - 1] !== sep) {
          return next(err);
        }
        if (err)
          return self.onStatError(err);
        if (stat.isDirectory())
          return self.redirect(path2);
        self.emit("file", path2, stat);
        self.send(path2, stat);
      });
      function next(err) {
        if (self._extensions.length <= i) {
          return err ? self.onStatError(err) : self.error(404);
        }
        const p = path2 + "." + self._extensions[i++];
        debug('stat "%s"', p);
        fs.stat(p, function(err2, stat) {
          if (err2)
            return next(err2);
          if (stat.isDirectory())
            return next();
          self.emit("file", p, stat);
          self.send(p, stat);
        });
      }
    };
    SendStream.prototype.sendIndex = function sendIndex(path2) {
      let i = -1;
      const self = this;
      function next(err) {
        if (++i >= self._index.length) {
          if (err)
            return self.onStatError(err);
          return self.error(404);
        }
        const p = join(path2, self._index[i]);
        debug('stat "%s"', p);
        fs.stat(p, function(err2, stat) {
          if (err2)
            return next(err2);
          if (stat.isDirectory())
            return next();
          self.emit("file", p, stat);
          self.send(p, stat);
        });
      }
      next();
    };
    SendStream.prototype.stream = function stream(path2, options) {
      const self = this;
      const res = this.res;
      const stream2 = fs.createReadStream(path2, options);
      this.emit("stream", stream2);
      stream2.pipe(res);
      let destroyed = false;
      function destroy() {
        if (destroyed) {
          return;
        }
        destroyed = true;
        stream2.destroy();
      }
      res.once("finish", destroy);
      stream2.on("error", function onerror(err) {
        destroy();
        self.onStatError(err);
      });
      stream2.on("end", function onend() {
        self.emit("end");
      });
    };
    SendStream.prototype.type = function type(path2) {
      const res = this.res;
      if (res.getHeader("Content-Type"))
        return;
      const type2 = mime.getType(path2) || mime.default_type;
      if (!type2) {
        debug("no content-type");
        return;
      }
      debug("content-type %s", type2);
      if (isUtf8MimeType(type2)) {
        res.setHeader("Content-Type", type2 + "; charset=UTF-8");
      } else {
        res.setHeader("Content-Type", type2);
      }
    };
    SendStream.prototype.setHeader = function setHeader(path2, stat) {
      const res = this.res;
      this.emit("headers", res, path2, stat);
      if (this._acceptRanges && !res.getHeader("Accept-Ranges")) {
        debug("accept ranges");
        res.setHeader("Accept-Ranges", "bytes");
      }
      if (this._cacheControl && !res.getHeader("Cache-Control")) {
        let cacheControl = "public, max-age=" + Math.floor(this._maxage / 1e3);
        if (this._immutable) {
          cacheControl += ", immutable";
        }
        debug("cache-control %s", cacheControl);
        res.setHeader("Cache-Control", cacheControl);
      }
      if (this._lastModified && !res.getHeader("Last-Modified")) {
        const modified = stat.mtime.toUTCString();
        debug("modified %s", modified);
        res.setHeader("Last-Modified", modified);
      }
      if (this._etag && !res.getHeader("ETag")) {
        const etag = 'W/"' + stat.size.toString(16) + "-" + stat.mtime.getTime().toString(16) + '"';
        debug("etag %s", etag);
        res.setHeader("ETag", etag);
      }
    };
    module.exports = SendStream;
  }
});

// node_modules/@fastify/send/index.js
var require_send = __commonJS({
  "node_modules/@fastify/send/index.js"(exports, module) {
    "use strict";
    var isUtf8MimeType = require_isUtf8MimeType().isUtf8MimeType;
    var mime = require_mime();
    var SendStream = require_SendStream();
    function send(req, path, options) {
      return new SendStream(req, path, options);
    }
    module.exports = send;
    module.exports.default = send;
    module.exports.send = send;
    module.exports.SendStream = SendStream;
    module.exports.isUtf8MimeType = isUtf8MimeType;
    module.exports.mime = mime;
  }
});

// node_modules/@fastify/accept-negotiator/index.js
var require_accept_negotiator = __commonJS({
  "node_modules/@fastify/accept-negotiator/index.js"(exports, module) {
    "use strict";
    function Negotiator(options) {
      if (!new.target) {
        return new Negotiator(options);
      }
      const {
        supportedValues = [],
        cache
      } = options && typeof options === "object" && options || {};
      this.supportedValues = supportedValues;
      this.cache = cache;
    }
    Negotiator.prototype.negotiate = function(header) {
      if (typeof header !== "string") {
        return null;
      }
      if (!this.cache) {
        return negotiate(header, this.supportedValues);
      }
      if (!this.cache.has(header)) {
        this.cache.set(header, negotiate(header, this.supportedValues));
      }
      return this.cache.get(header);
    };
    function negotiate(header, supportedValues) {
      if (!header || !Array.isArray(supportedValues) || supportedValues.length === 0) {
        return null;
      }
      if (header === "*") {
        return supportedValues[0];
      }
      let preferredEncoding = null;
      let preferredEncodingPriority = Infinity;
      let preferredEncodingQuality = 0;
      function processMatch(enc, quality) {
        if (quality === 0 || preferredEncodingQuality > quality) {
          return false;
        }
        const encoding = enc === "*" && supportedValues[0] || enc;
        const priority = supportedValues.indexOf(encoding);
        if (priority === -1) {
          return false;
        }
        if (priority === 0 && quality === 1) {
          preferredEncoding = encoding;
          return true;
        } else if (preferredEncodingQuality < quality) {
          preferredEncoding = encoding;
          preferredEncodingPriority = priority;
          preferredEncodingQuality = quality;
        } else if (preferredEncodingPriority > priority) {
          preferredEncoding = encoding;
          preferredEncodingPriority = priority;
          preferredEncodingQuality = quality;
        }
        return false;
      }
      parse(header, processMatch);
      return preferredEncoding;
    }
    var BEGIN = 0;
    var TOKEN = 1;
    var QUALITY = 2;
    var END = 3;
    function parse(header, processMatch) {
      let str = "";
      let quality;
      let state = BEGIN;
      for (let i = 0, il = header.length; i < il; ++i) {
        const char = header[i];
        if (char === " " || char === "	") {
          continue;
        } else if (char === ";") {
          if (state === TOKEN) {
            state = QUALITY;
            quality = "";
          }
          continue;
        } else if (char === ",") {
          if (state === TOKEN) {
            if (processMatch(str, 1)) {
              state = END;
              break;
            }
            state = BEGIN;
            str = "";
          } else if (state === QUALITY) {
            if (processMatch(str, parseFloat(quality) || 0)) {
              state = END;
              break;
            }
            state = BEGIN;
            str = "";
            quality = "";
          }
          continue;
        } else if (state === QUALITY) {
          if (char === "q" || char === "=") {
            continue;
          } else if (char === "." || char === "1" || char === "0" || char === "2" || char === "3" || char === "4" || char === "5" || char === "6" || char === "7" || char === "8" || char === "9") {
            quality += char;
            continue;
          }
        } else if (state === BEGIN) {
          state = TOKEN;
          str += char;
          continue;
        }
        if (state === TOKEN) {
          const prevChar = header[i - 1];
          if (prevChar === " " || prevChar === "	") {
            str = "";
          }
          str += char;
          continue;
        }
        if (processMatch(str, parseFloat(quality) || 0)) {
          state = END;
          break;
        }
        state = BEGIN;
        str = char;
        quality = "";
      }
      if (state === TOKEN) {
        processMatch(str, 1);
      } else if (state === QUALITY) {
        processMatch(str, parseFloat(quality) || 0);
      }
    }
    module.exports = negotiate;
    module.exports.default = negotiate;
    module.exports.negotiate = negotiate;
    module.exports.Negotiator = Negotiator;
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    "use strict";
    var buffer = __require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/content-disposition/index.js
var require_content_disposition = __commonJS({
  "node_modules/content-disposition/index.js"(exports, module) {
    "use strict";
    module.exports = contentDisposition;
    module.exports.parse = parse;
    var basename = __require("path").basename;
    var Buffer2 = require_safe_buffer().Buffer;
    var ENCODE_URL_ATTR_CHAR_REGEXP = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g;
    var HEX_ESCAPE_REGEXP = /%[0-9A-Fa-f]{2}/;
    var HEX_ESCAPE_REPLACE_REGEXP = /%([0-9A-Fa-f]{2})/g;
    var NON_LATIN1_REGEXP = /[^\x20-\x7e\xa0-\xff]/g;
    var QESC_REGEXP = /\\([\u0000-\u007f])/g;
    var QUOTE_REGEXP = /([\\"])/g;
    var PARAM_REGEXP = /;[\x09\x20]*([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*=[\x09\x20]*("(?:[\x20!\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*/g;
    var TEXT_REGEXP = /^[\x20-\x7e\x80-\xff]+$/;
    var TOKEN_REGEXP = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
    var EXT_VALUE_REGEXP = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+.^_`|~-])+)$/;
    var DISPOSITION_TYPE_REGEXP = /^([!#$%&'*+.0-9A-Z^_`a-z|~-]+)[\x09\x20]*(?:$|;)/;
    function contentDisposition(filename, options) {
      var opts = options || {};
      var type = opts.type || "attachment";
      var params = createparams(filename, opts.fallback);
      return format(new ContentDisposition(type, params));
    }
    function createparams(filename, fallback) {
      if (filename === void 0) {
        return;
      }
      var params = {};
      if (typeof filename !== "string") {
        throw new TypeError("filename must be a string");
      }
      if (fallback === void 0) {
        fallback = true;
      }
      if (typeof fallback !== "string" && typeof fallback !== "boolean") {
        throw new TypeError("fallback must be a string or boolean");
      }
      if (typeof fallback === "string" && NON_LATIN1_REGEXP.test(fallback)) {
        throw new TypeError("fallback must be ISO-8859-1 string");
      }
      var name = basename(filename);
      var isQuotedString = TEXT_REGEXP.test(name);
      var fallbackName = typeof fallback !== "string" ? fallback && getlatin1(name) : basename(fallback);
      var hasFallback = typeof fallbackName === "string" && fallbackName !== name;
      if (hasFallback || !isQuotedString || HEX_ESCAPE_REGEXP.test(name)) {
        params["filename*"] = name;
      }
      if (isQuotedString || hasFallback) {
        params.filename = hasFallback ? fallbackName : name;
      }
      return params;
    }
    function format(obj) {
      var parameters = obj.parameters;
      var type = obj.type;
      if (!type || typeof type !== "string" || !TOKEN_REGEXP.test(type)) {
        throw new TypeError("invalid type");
      }
      var string = String(type).toLowerCase();
      if (parameters && typeof parameters === "object") {
        var param;
        var params = Object.keys(parameters).sort();
        for (var i = 0; i < params.length; i++) {
          param = params[i];
          var val = param.substr(-1) === "*" ? ustring(parameters[param]) : qstring(parameters[param]);
          string += "; " + param + "=" + val;
        }
      }
      return string;
    }
    function decodefield(str) {
      var match = EXT_VALUE_REGEXP.exec(str);
      if (!match) {
        throw new TypeError("invalid extended field value");
      }
      var charset = match[1].toLowerCase();
      var encoded = match[2];
      var value;
      var binary = encoded.replace(HEX_ESCAPE_REPLACE_REGEXP, pdecode);
      switch (charset) {
        case "iso-8859-1":
          value = getlatin1(binary);
          break;
        case "utf-8":
          value = Buffer2.from(binary, "binary").toString("utf8");
          break;
        default:
          throw new TypeError("unsupported charset in extended field");
      }
      return value;
    }
    function getlatin1(val) {
      return String(val).replace(NON_LATIN1_REGEXP, "?");
    }
    function parse(string) {
      if (!string || typeof string !== "string") {
        throw new TypeError("argument string is required");
      }
      var match = DISPOSITION_TYPE_REGEXP.exec(string);
      if (!match) {
        throw new TypeError("invalid type format");
      }
      var index = match[0].length;
      var type = match[1].toLowerCase();
      var key;
      var names = [];
      var params = {};
      var value;
      index = PARAM_REGEXP.lastIndex = match[0].substr(-1) === ";" ? index - 1 : index;
      while (match = PARAM_REGEXP.exec(string)) {
        if (match.index !== index) {
          throw new TypeError("invalid parameter format");
        }
        index += match[0].length;
        key = match[1].toLowerCase();
        value = match[2];
        if (names.indexOf(key) !== -1) {
          throw new TypeError("invalid duplicate parameter");
        }
        names.push(key);
        if (key.indexOf("*") + 1 === key.length) {
          key = key.slice(0, -1);
          value = decodefield(value);
          params[key] = value;
          continue;
        }
        if (typeof params[key] === "string") {
          continue;
        }
        if (value[0] === '"') {
          value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");
        }
        params[key] = value;
      }
      if (index !== -1 && index !== string.length) {
        throw new TypeError("invalid parameter format");
      }
      return new ContentDisposition(type, params);
    }
    function pdecode(str, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    }
    function pencode(char) {
      return "%" + String(char).charCodeAt(0).toString(16).toUpperCase();
    }
    function qstring(val) {
      var str = String(val);
      return '"' + str.replace(QUOTE_REGEXP, "\\$1") + '"';
    }
    function ustring(val) {
      var str = String(val);
      var encoded = encodeURIComponent(str).replace(ENCODE_URL_ATTR_CHAR_REGEXP, pencode);
      return "UTF-8''" + encoded;
    }
    function ContentDisposition(type, parameters) {
      this.type = type;
      this.parameters = parameters;
    }
  }
});

// node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  "node_modules/reusify/reusify.js"(exports, module) {
    "use strict";
    function reusify(Constructor) {
      var head = new Constructor();
      var tail = head;
      function get() {
        var current = head;
        if (current.next) {
          head = current.next;
        } else {
          head = new Constructor();
          tail = head;
        }
        current.next = null;
        return current;
      }
      function release(obj) {
        tail.next = obj;
        tail = obj;
      }
      return {
        get,
        release
      };
    }
    module.exports = reusify;
  }
});

// node_modules/fastq/queue.js
var require_queue = __commonJS({
  "node_modules/fastq/queue.js"(exports, module) {
    "use strict";
    var reusify = require_reusify();
    function fastqueue(context, worker, _concurrency) {
      if (typeof context === "function") {
        _concurrency = worker;
        worker = context;
        context = null;
      }
      if (!(_concurrency >= 1)) {
        throw new Error("fastqueue concurrency must be equal to or greater than 1");
      }
      var cache = reusify(Task);
      var queueHead = null;
      var queueTail = null;
      var _running = 0;
      var errorHandler2 = null;
      var self = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: false,
        get concurrency() {
          return _concurrency;
        },
        set concurrency(value) {
          if (!(value >= 1)) {
            throw new Error("fastqueue concurrency must be equal to or greater than 1");
          }
          _concurrency = value;
          if (self.paused)
            return;
          for (; queueHead && _running < _concurrency; ) {
            _running++;
            release();
          }
        },
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error
      };
      return self;
      function running() {
        return _running;
      }
      function pause() {
        self.paused = true;
      }
      function length() {
        var current = queueHead;
        var counter = 0;
        while (current) {
          current = current.next;
          counter++;
        }
        return counter;
      }
      function getQueue() {
        var current = queueHead;
        var tasks = [];
        while (current) {
          tasks.push(current.value);
          current = current.next;
        }
        return tasks;
      }
      function resume() {
        if (!self.paused)
          return;
        self.paused = false;
        if (queueHead === null) {
          _running++;
          release();
          return;
        }
        for (; queueHead && _running < _concurrency; ) {
          _running++;
          release();
        }
      }
      function idle() {
        return _running === 0 && self.length() === 0;
      }
      function push(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop;
        current.errorHandler = errorHandler2;
        if (_running >= _concurrency || self.paused) {
          if (queueTail) {
            queueTail.next = current;
            queueTail = current;
          } else {
            queueHead = current;
            queueTail = current;
            self.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function unshift(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop;
        current.errorHandler = errorHandler2;
        if (_running >= _concurrency || self.paused) {
          if (queueHead) {
            current.next = queueHead;
            queueHead = current;
          } else {
            queueHead = current;
            queueTail = current;
            self.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder);
        }
        var next = queueHead;
        if (next && _running <= _concurrency) {
          if (!self.paused) {
            if (queueTail === queueHead) {
              queueTail = null;
            }
            queueHead = next.next;
            next.next = null;
            worker.call(context, next.value, next.worked);
            if (queueTail === null) {
              self.empty();
            }
          } else {
            _running--;
          }
        } else if (--_running === 0) {
          self.drain();
        }
      }
      function kill() {
        queueHead = null;
        queueTail = null;
        self.drain = noop;
      }
      function killAndDrain() {
        queueHead = null;
        queueTail = null;
        self.drain();
        self.drain = noop;
      }
      function error(handler) {
        errorHandler2 = handler;
      }
    }
    function noop() {
    }
    function Task() {
      this.value = null;
      this.callback = noop;
      this.next = null;
      this.release = noop;
      this.context = null;
      this.errorHandler = null;
      var self = this;
      this.worked = function worked(err, result) {
        var callback = self.callback;
        var errorHandler2 = self.errorHandler;
        var val = self.value;
        self.value = null;
        self.callback = noop;
        if (self.errorHandler) {
          errorHandler2(err, val);
        }
        callback.call(self.context, err, result);
        self.release(self);
      };
    }
    function queueAsPromised(context, worker, _concurrency) {
      if (typeof context === "function") {
        _concurrency = worker;
        worker = context;
        context = null;
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function(res) {
          cb(null, res);
        }, cb);
      }
      var queue = fastqueue(context, asyncWrapper, _concurrency);
      var pushCb = queue.push;
      var unshiftCb = queue.unshift;
      queue.push = push;
      queue.unshift = unshift;
      queue.drained = drained;
      return queue;
      function push(value) {
        var p = new Promise(function(resolve, reject) {
          pushCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop);
        return p;
      }
      function unshift(value) {
        var p = new Promise(function(resolve, reject) {
          unshiftCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop);
        return p;
      }
      function drained() {
        if (queue.idle()) {
          return new Promise(function(resolve) {
            resolve();
          });
        }
        var previousDrain = queue.drain;
        var p = new Promise(function(resolve) {
          queue.drain = function() {
            previousDrain();
            resolve();
          };
        });
        return p;
      }
    }
    module.exports = fastqueue;
    module.exports.promise = queueAsPromised;
  }
});

// node_modules/@fastify/static/lib/dirList.js
var require_dirList = __commonJS({
  "node_modules/@fastify/static/lib/dirList.js"(exports, module) {
    "use strict";
    var os = __require("os");
    var path = __require("path");
    var fs = __require("fs/promises");
    var fastq = require_queue();
    var fastqConcurrency = Math.max(1, os.cpus().length - 1);
    var dirList = {
      _getExtendedInfo: async function(dir, info) {
        const depth = dir.split(path.sep).length;
        const files = await fs.readdir(dir);
        const worker = async (filename) => {
          const filePath = path.join(dir, filename);
          let stats;
          try {
            stats = await fs.stat(filePath);
          } catch {
            return;
          }
          if (stats.isDirectory()) {
            info.totalFolderCount++;
            filePath.split(path.sep).length === depth + 1 && info.folderCount++;
            await dirList._getExtendedInfo(filePath, info);
          } else {
            info.totalSize += stats.size;
            info.totalFileCount++;
            filePath.split(path.sep).length === depth + 1 && info.fileCount++;
            info.lastModified = Math.max(info.lastModified, stats.mtimeMs);
          }
        };
        const queue = fastq.promise(worker, fastqConcurrency);
        await Promise.all(files.map((filename) => queue.push(filename)));
      },
      /**
       * get extended info about a folder
       * @param {string} folderPath full path fs dir
       * @return {Promise<ExtendedInfo>}
       */
      getExtendedInfo: async function(folderPath) {
        const info = {
          totalSize: 0,
          fileCount: 0,
          totalFileCount: 0,
          folderCount: 0,
          totalFolderCount: 0,
          lastModified: 0
        };
        await dirList._getExtendedInfo(folderPath, info);
        return info;
      },
      /**
       * get files and dirs from dir, or error
       * @param {string} dir full path fs dir
       * @param {(boolean | ListOptionsJsonFormat | ListOptionsHtmlFormat)} options
       * @param {string} dotfiles
       * note: can't use glob because don't get error on non existing dir
       */
      list: async function(dir, options, dotfiles) {
        const entries = { dirs: [], files: [] };
        let files = await fs.readdir(dir);
        if (dotfiles === "deny" || dotfiles === "ignore") {
          files = files.filter((file) => file.charAt(0) !== ".");
        }
        if (files.length < 1) {
          return entries;
        }
        const worker = async (filename) => {
          let stats;
          try {
            stats = await fs.stat(path.join(dir, filename));
          } catch {
            return;
          }
          const entry = { name: filename, stats };
          if (stats.isDirectory()) {
            if (options.extendedFolderInfo) {
              entry.extendedInfo = await dirList.getExtendedInfo(path.join(dir, filename));
            }
            entries.dirs.push(entry);
          } else {
            entries.files.push(entry);
          }
        };
        const queue = fastq.promise(worker, fastqConcurrency);
        await Promise.all(files.map((filename) => queue.push(filename)));
        entries.dirs.sort((a, b) => a.name.localeCompare(b.name));
        entries.files.sort((a, b) => a.name.localeCompare(b.name));
        return entries;
      },
      /**
       * send dir list content, or 404 on error
       * @param {Fastify.Reply} reply
       * @param {string} dir full path fs dir
       * @param {(boolean | ListOptionsJsonFormat | ListOptionsHtmlFormat)} options
       * @param {string} route request route
       * @param {string} dotfiles
       */
      send: async function({ reply, dir, options, route, prefix, dotfiles }) {
        if (reply.request.query.format === "html" && typeof options.render !== "function") {
          throw new Error("The `list.render` option must be a function and is required with the URL parameter `format=html`");
        }
        let entries;
        try {
          entries = await dirList.list(dir, options, dotfiles);
        } catch {
          return reply.callNotFound();
        }
        const format = reply.request.query.format || options.format;
        if (format !== "html") {
          if (options.jsonFormat !== "extended") {
            const nameEntries = { dirs: [], files: [] };
            entries.dirs.forEach((entry) => nameEntries.dirs.push(entry.name));
            entries.files.forEach((entry) => nameEntries.files.push(entry.name));
            reply.send(nameEntries);
          } else {
            reply.send(entries);
          }
          return;
        }
        const html = options.render(
          entries.dirs.map((entry) => dirList.htmlInfo(entry, route, prefix, options)),
          entries.files.map((entry) => dirList.htmlInfo(entry, route, prefix, options))
        );
        reply.type("text/html").send(html);
      },
      /**
       * provide the html information about entry and route, to get name and full route
       * @param entry file or dir name and stats
       * @param {string} route request route
       * @return {ListFile}
       */
      htmlInfo: function(entry, route, prefix, options) {
        if (options.names?.includes(path.basename(route))) {
          route = path.normalize(path.join(route, ".."));
        }
        return {
          href: path.join(prefix, route, entry.name).replace(/\\/gu, "/"),
          name: entry.name,
          stats: entry.stats,
          extendedInfo: entry.extendedInfo
        };
      },
      /**
       * say if the route can be handled by dir list or not
       * @param {string} route request route
       * @param {(boolean | ListOptionsJsonFormat | ListOptionsHtmlFormat)} options
       * @return {boolean}
       */
      handle: function(route, options) {
        return options.names?.includes(path.basename(route)) || // match trailing slash
        ((options.names?.includes("/") && route[route.length - 1] === "/") ?? false);
      },
      /**
       * get path from route and fs root paths, considering trailing slash
       * @param {string} root fs root path
       * @param {string} route request route
       */
      path: function(root, route) {
        const _route = route[route.length - 1] === "/" ? route + "none" : route;
        return path.dirname(path.join(root, _route));
      },
      /**
       * validate options
       * @return {Error}
       */
      validateOptions: function(options) {
        if (!options.list) {
          return;
        }
        if (Array.isArray(options.root)) {
          return new TypeError("multi-root with list option is not supported");
        }
        if (options.list.format && options.list.format !== "json" && options.list.format !== "html") {
          return new TypeError("The `list.format` option must be json or html");
        }
        if (options.list.names && !Array.isArray(options.list.names)) {
          return new TypeError("The `list.names` option must be an array");
        }
        if (options.list.jsonFormat != null && options.list.jsonFormat !== "names" && options.list.jsonFormat !== "extended") {
          return new TypeError("The `list.jsonFormat` option must be name or extended");
        }
        if (options.list.format === "html" && typeof options.list.render !== "function") {
          return new TypeError("The `list.render` option must be a function and is required with html format");
        }
      }
    };
    module.exports = dirList;
  }
});

// node_modules/@fastify/static/index.js
var require_static2 = __commonJS({
  "node_modules/@fastify/static/index.js"(exports, module) {
    "use strict";
    var { PassThrough } = __require("stream");
    var path = __require("path");
    var { fileURLToPath } = __require("url");
    var { statSync } = __require("fs");
    var { glob } = require_commonjs5();
    var fp = require_plugin();
    var send = require_send();
    var encodingNegotiator = require_accept_negotiator();
    var contentDisposition = require_content_disposition();
    var dirList = require_dirList();
    var endForwardSlashRegex = /\/$/u;
    var asteriskRegex = /\*/gu;
    var supportedEncodings = ["br", "gzip", "deflate"];
    send.mime.default_type = "application/octet-stream";
    async function fastifyStatic(fastify2, opts) {
      opts.root = normalizeRoot(opts.root);
      checkRootPathForErrors(fastify2, opts.root);
      const setHeaders = opts.setHeaders;
      if (setHeaders !== void 0 && typeof setHeaders !== "function") {
        throw new TypeError("The `setHeaders` option must be a function");
      }
      const invalidDirListOpts = dirList.validateOptions(opts);
      if (invalidDirListOpts) {
        throw invalidDirListOpts;
      }
      if (opts.dotfiles === void 0) {
        opts.dotfiles = "allow";
      }
      const sendOptions = {
        root: opts.root,
        acceptRanges: opts.acceptRanges,
        cacheControl: opts.cacheControl,
        dotfiles: opts.dotfiles,
        etag: opts.etag,
        extensions: opts.extensions,
        immutable: opts.immutable,
        index: opts.index,
        lastModified: opts.lastModified,
        maxAge: opts.maxAge
      };
      let prefix = opts.prefix ?? (opts.prefix = "/");
      if (!opts.prefixAvoidTrailingSlash) {
        prefix = prefix[prefix.length - 1] === "/" ? prefix : prefix + "/";
      }
      const routeOpts = {
        constraints: opts.constraints,
        schema: {
          hide: opts.schemaHide !== void 0 ? opts.schemaHide : true
        },
        errorHandler(error, request, reply) {
          if (error?.code === "ERR_STREAM_PREMATURE_CLOSE") {
            reply.request.raw.destroy();
            return;
          }
          fastify2.errorHandler(error, request, reply);
        }
      };
      if (opts.decorateReply !== false) {
        fastify2.decorateReply("sendFile", function(filePath, rootPath, options) {
          const opts2 = typeof rootPath === "object" ? rootPath : options;
          const root = typeof rootPath === "string" ? rootPath : opts2 && opts2.root;
          pumpSendToReply(
            this.request,
            this,
            filePath,
            root || sendOptions.root,
            0,
            opts2
          );
          return this;
        });
        fastify2.decorateReply(
          "download",
          function(filePath, fileName, options = {}) {
            const { root, ...opts2 } = typeof fileName === "object" ? fileName : options;
            fileName = typeof fileName === "string" ? fileName : filePath;
            this.header("content-disposition", contentDisposition(fileName));
            pumpSendToReply(this.request, this, filePath, root, 0, opts2);
            return this;
          }
        );
      }
      if (opts.serve !== false) {
        if (opts.wildcard && typeof opts.wildcard !== "boolean") {
          throw new Error('"wildcard" option must be a boolean');
        }
        if (opts.wildcard === void 0 || opts.wildcard === true) {
          fastify2.route({
            ...routeOpts,
            method: ["HEAD", "GET"],
            path: prefix + "*",
            handler(req, reply) {
              pumpSendToReply(req, reply, "/" + req.params["*"], sendOptions.root);
            }
          });
          if (opts.redirect === true && prefix !== opts.prefix) {
            fastify2.get(opts.prefix, routeOpts, (req, reply) => {
              reply.redirect(301, getRedirectUrl(req.raw.url));
            });
          }
        } else {
          const indexes = opts.index === void 0 ? ["index.html"] : [].concat(opts.index);
          const indexDirs = /* @__PURE__ */ new Map();
          const routes = /* @__PURE__ */ new Set();
          const roots = Array.isArray(sendOptions.root) ? sendOptions.root : [sendOptions.root];
          for (let rootPath of roots) {
            rootPath = rootPath.split(path.win32.sep).join(path.posix.sep);
            !rootPath.endsWith("/") && (rootPath += "/");
            const files = await glob("**/**", {
              cwd: rootPath,
              absolute: false,
              follow: true,
              nodir: true,
              dot: opts.serveDotFiles
            });
            for (let file of files) {
              file = file.split(path.win32.sep).join(path.posix.sep);
              const route = prefix + file;
              if (routes.has(route)) {
                continue;
              }
              routes.add(route);
              setUpHeadAndGet(routeOpts, route, `/${file}`, rootPath);
              const key = path.posix.basename(route);
              if (indexes.includes(key) && !indexDirs.has(key)) {
                indexDirs.set(path.posix.dirname(route), rootPath);
              }
            }
          }
          for (const [dirname, rootPath] of indexDirs.entries()) {
            const pathname = dirname + (dirname.endsWith("/") ? "" : "/");
            const file = "/" + pathname.replace(prefix, "");
            setUpHeadAndGet(routeOpts, pathname, file, rootPath);
            if (opts.redirect === true) {
              setUpHeadAndGet(routeOpts, pathname.replace(endForwardSlashRegex, ""), file.replace(endForwardSlashRegex, ""), rootPath);
            }
          }
        }
      }
      const allowedPath = opts.allowedPath;
      function pumpSendToReply(request, reply, pathname, rootPath, rootPathOffset = 0, pumpOptions, checkedEncodings) {
        const pathnameOrig = pathname;
        const options = Object.assign({}, sendOptions, pumpOptions);
        if (rootPath) {
          if (Array.isArray(rootPath)) {
            options.root = rootPath[rootPathOffset];
          } else {
            options.root = rootPath;
          }
        }
        if (allowedPath && !allowedPath(pathname, options.root, request)) {
          return reply.callNotFound();
        }
        let encoding;
        let pathnameForSend = pathname;
        if (opts.preCompressed) {
          if (!checkedEncodings) {
            checkedEncodings = /* @__PURE__ */ new Set();
          }
          encoding = getEncodingHeader(request.headers, checkedEncodings);
          if (encoding) {
            if (pathname.endsWith("/")) {
              pathname = findIndexFile(pathname, options.root, options.index);
              if (!pathname) {
                return reply.callNotFound();
              }
              pathnameForSend = pathnameForSend + pathname + "." + getEncodingExtension(encoding);
            } else {
              pathnameForSend = pathname + "." + getEncodingExtension(encoding);
            }
          }
        }
        const stream = send(request.raw, pathnameForSend, options);
        let resolvedFilename;
        stream.on("file", function(file) {
          resolvedFilename = file;
        });
        const wrap = new PassThrough({
          flush(cb) {
            this.finished = true;
            if (reply.raw.statusCode === 304) {
              reply.send("");
            }
            cb();
          }
        });
        wrap.getHeader = reply.getHeader.bind(reply);
        wrap.setHeader = reply.header.bind(reply);
        wrap.removeHeader = () => {
        };
        wrap.finished = false;
        Object.defineProperty(wrap, "filename", {
          get() {
            return resolvedFilename;
          }
        });
        Object.defineProperty(wrap, "statusCode", {
          get() {
            return reply.raw.statusCode;
          },
          set(code) {
            reply.code(code);
          }
        });
        if (request.method === "HEAD") {
          wrap.on("finish", reply.send.bind(reply));
        } else {
          wrap.on("pipe", function() {
            if (encoding) {
              reply.header("content-type", getContentType(pathname));
              reply.header("content-encoding", encoding);
            }
            reply.send(wrap);
          });
        }
        if (setHeaders !== void 0) {
          stream.on("headers", setHeaders);
        }
        stream.on("directory", function(_, path2) {
          if (opts.list) {
            dirList.send({
              reply,
              dir: path2,
              options: opts.list,
              route: pathname,
              prefix,
              dotfiles: opts.dotfiles
            }).catch((err) => reply.send(err));
            return;
          }
          if (opts.redirect === true) {
            try {
              reply.redirect(301, getRedirectUrl(request.raw.url));
            } catch (error) {
              reply.send(error);
            }
          } else {
            if (!pathname.endsWith("/") && findIndexFile(pathname, options.root, options.index)) {
              return pumpSendToReply(
                request,
                reply,
                pathname + "/",
                rootPath,
                void 0,
                void 0,
                checkedEncodings
              );
            }
            reply.callNotFound();
          }
        });
        stream.on("error", function(err) {
          if (err.code === "ENOENT") {
            if (opts.preCompressed && encoding) {
              const indexPathname = findIndexFile(pathname, options.root, options.index);
              if (indexPathname) {
                return pumpSendToReply(
                  request,
                  reply,
                  pathname + "/",
                  rootPath,
                  void 0,
                  void 0,
                  checkedEncodings
                );
              }
            }
            if (opts.list && dirList.handle(pathname, opts.list)) {
              dirList.send({
                reply,
                dir: dirList.path(opts.root, pathname),
                options: opts.list,
                route: pathname,
                prefix,
                dotfiles: opts.dotfiles
              }).catch((err2) => reply.send(err2));
              return;
            }
            if (Array.isArray(rootPath) && rootPathOffset < rootPath.length - 1) {
              return pumpSendToReply(request, reply, pathname, rootPath, rootPathOffset + 1);
            }
            if (opts.preCompressed && !checkedEncodings.has(encoding)) {
              checkedEncodings.add(encoding);
              return pumpSendToReply(
                request,
                reply,
                pathnameOrig,
                rootPath,
                rootPathOffset,
                void 0,
                checkedEncodings
              );
            }
            return reply.callNotFound();
          }
          if (err.status === 404) {
            return reply.callNotFound();
          }
          reply.send(err);
        });
        stream.pipe(wrap);
      }
      function setUpHeadAndGet(routeOpts2, route, file, rootPath) {
        const toSetUp = Object.assign({}, routeOpts2, {
          method: ["HEAD", "GET"],
          url: route,
          handler: serveFileHandler
        });
        toSetUp.config = toSetUp.config || {};
        toSetUp.config.file = file;
        toSetUp.config.rootPath = rootPath;
        fastify2.route(toSetUp);
      }
      function serveFileHandler(req, reply) {
        const routeConfig = req.routeOptions?.config || req.routeConfig;
        pumpSendToReply(req, reply, routeConfig.file, routeConfig.rootPath);
      }
    }
    function normalizeRoot(root) {
      if (root === void 0) {
        return root;
      }
      if (root instanceof URL && root.protocol === "file:") {
        return fileURLToPath(root);
      }
      if (Array.isArray(root)) {
        const result = [];
        for (let i = 0, il = root.length; i < il; ++i) {
          if (root[i] instanceof URL && root[i].protocol === "file:") {
            result.push(fileURLToPath(root[i]));
          } else {
            result.push(root[i]);
          }
        }
        return result;
      }
      return root;
    }
    function checkRootPathForErrors(fastify2, rootPath) {
      if (rootPath === void 0) {
        throw new Error('"root" option is required');
      }
      if (Array.isArray(rootPath)) {
        if (!rootPath.length) {
          throw new Error('"root" option array requires one or more paths');
        }
        if (new Set(rootPath).size !== rootPath.length) {
          throw new Error(
            '"root" option array contains one or more duplicate paths'
          );
        }
        rootPath.map((path2) => checkPath(fastify2, path2));
        return;
      }
      if (typeof rootPath === "string") {
        return checkPath(fastify2, rootPath);
      }
      throw new Error('"root" option must be a string or array of strings');
    }
    function checkPath(fastify2, rootPath) {
      if (typeof rootPath !== "string") {
        throw new Error('"root" option must be a string');
      }
      if (path.isAbsolute(rootPath) === false) {
        throw new Error('"root" option must be an absolute path');
      }
      let pathStat;
      try {
        pathStat = statSync(rootPath);
      } catch (e) {
        if (e.code === "ENOENT") {
          fastify2.log.warn(`"root" path "${rootPath}" must exist`);
          return;
        }
        throw e;
      }
      if (pathStat.isDirectory() === false) {
        throw new Error('"root" option must point to a directory');
      }
    }
    function getContentType(path2) {
      const type = send.mime.getType(path2) || send.mime.default_type;
      if (!send.isUtf8MimeType(type)) {
        return type;
      }
      return `${type}; charset=UTF-8`;
    }
    function findIndexFile(pathname, root, indexFiles = ["index.html"]) {
      if (Array.isArray(indexFiles)) {
        return indexFiles.find((filename) => {
          const p = path.join(root, pathname, filename);
          try {
            const stats = statSync(p);
            return !stats.isDirectory();
          } catch {
            return false;
          }
        });
      }
      return false;
    }
    function getEncodingHeader(headers, checked) {
      if (!("accept-encoding" in headers))
        return;
      const header = headers["accept-encoding"].toLowerCase().replace(asteriskRegex, "gzip");
      return encodingNegotiator.negotiate(
        header,
        supportedEncodings.filter((enc) => !checked.has(enc))
      );
    }
    function getEncodingExtension(encoding) {
      switch (encoding) {
        case "br":
          return "br";
        case "gzip":
          return "gz";
      }
    }
    function getRedirectUrl(url) {
      let i = 0;
      for (; i < url.length; ++i) {
        if (url[i] !== "/" && url[i] !== "\\")
          break;
      }
      url = "/" + url.substr(i);
      try {
        const parsed = new URL(url, "http://localhost.com/");
        const parsedPathname = parsed.pathname;
        return parsedPathname + (parsedPathname[parsedPathname.length - 1] !== "/" ? "/" : "") + (parsed.search || "");
      } catch {
        const err = new Error(`Invalid redirect URL: ${url}`);
        err.statusCode = 400;
        throw err;
      }
    }
    module.exports = fp(fastifyStatic, {
      fastify: "4.x",
      name: "@fastify/static"
    });
    module.exports.default = fastifyStatic;
    module.exports.fastifyStatic = fastifyStatic;
  }
});

// node_modules/@fastify/swagger-ui/lib/serialize.js
var require_serialize = __commonJS({
  "node_modules/@fastify/swagger-ui/lib/serialize.js"(exports, module) {
    "use strict";
    function serialize(value) {
      switch (typeof value) {
        case "bigint":
          return value.toString() + "n";
        case "boolean":
          return value ? "true" : "false";
        case "function":
          return value.toString();
        case "number":
          return "" + value;
        case "object":
          if (value === null) {
            return "null";
          } else if (Array.isArray(value)) {
            return serializeArray(value);
          } else if (value instanceof RegExp) {
            return `/${value.source}/${value.flags}`;
          } else if (value instanceof Date) {
            return `new Date(${value.getTime()})`;
          } else if (value instanceof Set) {
            return `new Set(${serializeArray(Array.from(value))})`;
          } else if (value instanceof Map) {
            return `new Map(${serializeArray(Array.from(value))})`;
          } else {
            return serializeObject(value);
          }
        case "string":
          return JSON.stringify(value);
        case "symbol":
          return serializeSymbol(value);
        case "undefined":
          return "undefined";
      }
    }
    var symbolRE = /Symbol\((.+)\)/;
    function serializeSymbol(value) {
      return symbolRE.test(value.toString()) ? `Symbol("${value.toString().match(symbolRE)[1]}")` : "Symbol()";
    }
    function serializeArray(value) {
      let result = "[";
      const il = value.length;
      const last = il - 1;
      for (let i = 0; i < il; ++i) {
        result += serialize(value[i]);
        i !== last && (result += ",");
      }
      return result + "]";
    }
    function serializeObject(value) {
      let result = "{";
      const keys = Object.keys(value);
      let i = 0;
      const il = keys.length;
      const last = il - 1;
      for (; i < il; ++i) {
        const key = keys[i];
        result += `"${key}":${serialize(value[key])}`;
        i !== last && (result += ",");
      }
      return result + "}";
    }
    module.exports = serialize;
  }
});

// node_modules/@fastify/swagger-ui/lib/swagger-initializer.js
var require_swagger_initializer = __commonJS({
  "node_modules/@fastify/swagger-ui/lib/swagger-initializer.js"(exports, module) {
    "use strict";
    var serialize = require_serialize();
    function swaggerInitializer(opts) {
      const logoBase64 = Buffer.from(opts.logo.content).toString("base64");
      const logoData = `data:${opts.logo.type};base64,${logoBase64}`;
      return `window.onload = function () {
    function waitForElement(selector) {
      return new Promise(resolve => {
          if (document.querySelector(selector)) {
              return resolve(document.querySelector(selector));
          }
  
          const observer = new MutationObserver(mutations => {
              if (document.querySelector(selector)) {
                  observer.disconnect();
                  resolve(document.querySelector(selector));
              }
          });
  
          // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
          observer.observe(document.body, {
              childList: true,
              subtree: true
          });
      });
    }
    function resolveUrl(url) {
      const anchor = document.createElement('a')
      anchor.href = url
      return anchor.href
    }

    const config = ${serialize(opts.uiConfig)}
    const resConfig = Object.assign({}, {
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout",
      validatorUrl: ${serialize(opts.validatorUrl || null)},
    }, config, {
      url: resolveUrl('./json').replace('static/json', 'json'),
      oauth2RedirectUrl: resolveUrl('./oauth2-redirect.html')
    });

    const ui = SwaggerUIBundle(resConfig)
    const logoData = '${logoData}'

    if (logoData && resConfig.layout === 'StandaloneLayout') {
      waitForElement('#swagger-ui > section > div.topbar > div > div > a').then((link) => {
        const img = document.createElement('img')
        img.height = 40
        img.src = logoData
        link.innerHTML = ''
        link.appendChild(img)
      })
    }

    ui.initOAuth(${serialize(opts.initOAuth)})
  }`;
    }
    module.exports = swaggerInitializer;
  }
});

// node_modules/@fastify/swagger-ui/lib/index-html.js
var require_index_html = __commonJS({
  "node_modules/@fastify/swagger-ui/lib/index-html.js"(exports, module) {
    "use strict";
    function indexHtml(opts) {
      return `<!-- HTML for static distribution bundle build -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>${opts.theme?.title || "Swagger UI"}</title>
  <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
  <link rel="stylesheet" type="text/css" href="./index.css" />
  ${opts.theme && opts.theme.css ? opts.theme.css.map((css) => `<link rel="stylesheet" type="text/css" href="./theme/${css.filename}" />
`).join("") : ""}
  ${opts.theme && opts.theme.favicon ? opts.theme.favicon.map((favicon) => `<link rel="${favicon.rel}" type="${favicon.type}" href="./theme/${favicon.filename}" sizes="${favicon.sizes}" />
`).join("") : `
  <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
  `}
  </head>
  
  <body>
  <div id="swagger-ui"></div>
  <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
  <script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
  <script src="./swagger-initializer.js" charset="UTF-8"> </script>
  ${opts.theme && opts.theme.js ? opts.theme.js.map((js) => `<script src="./theme/${js.filename}" charset="UTF-8"> </script>
`).join("") : ""}
  </body>
  </html>
  `;
    }
    module.exports = indexHtml;
  }
});

// node_modules/@fastify/swagger-ui/lib/routes.js
var require_routes = __commonJS({
  "node_modules/@fastify/swagger-ui/lib/routes.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var yaml = require_dist();
    var fastifyStatic = require_static2();
    var rfdc = require_rfdc()();
    var swaggerInitializer = require_swagger_initializer();
    var indexHtml = require_index_html();
    var staticPrefix = "/static";
    function getRedirectPathForTheRootRoute(url) {
      let redirectPath;
      if (url.length !== 0 && url[url.length - 1] === "/") {
        redirectPath = `.${staticPrefix}/index.html`;
      } else {
        const urlPathParts = url.split("/");
        redirectPath = `./${urlPathParts[urlPathParts.length - 1]}${staticPrefix}/index.html`;
      }
      return redirectPath;
    }
    function fastifySwagger2(fastify2, opts, done) {
      let staticCSP = false;
      if (opts.staticCSP === true) {
        const csp = fastify2.swaggerCSP;
        staticCSP = `default-src 'self'; base-uri 'self'; font-src 'self' https: data:; frame-ancestors 'self'; img-src 'self' data: validator.swagger.io; object-src 'none'; script-src 'self' ${csp.script.join(" ")}; script-src-attr 'none'; style-src 'self' https: ${csp.style.join(" ")}; upgrade-insecure-requests;`;
      }
      if (typeof opts.staticCSP === "string") {
        staticCSP = opts.staticCSP;
      }
      if (typeof opts.staticCSP === "object" && opts.staticCSP !== null) {
        staticCSP = "";
        Object.keys(opts.staticCSP).forEach(function(key) {
          const value = Array.isArray(opts.staticCSP[key]) ? opts.staticCSP[key].join(" ") : opts.staticCSP[key];
          staticCSP += `${key.toLowerCase()} ${value}; `;
        });
      }
      if (typeof staticCSP === "string" || typeof opts.transformStaticCSP === "function") {
        fastify2.addHook("onSend", function(request, reply, payload, done2) {
          if (typeof staticCSP === "string") {
            reply.header("content-security-policy", staticCSP.trim());
          }
          const header = reply.getHeader("content-security-policy");
          if (header && typeof opts.transformStaticCSP === "function") {
            reply.header("content-security-policy", opts.transformStaticCSP(header));
          }
          done2();
        });
      }
      const hooks = /* @__PURE__ */ Object.create(null);
      if (opts.hooks) {
        const additionalHooks = [
          "onRequest",
          "preHandler"
        ];
        for (const hook of additionalHooks) {
          hooks[hook] = opts.hooks[hook];
        }
      }
      fastify2.route({
        url: "/",
        method: "GET",
        schema: { hide: true },
        ...hooks,
        handler: (req, reply) => {
          reply.redirect(getRedirectPathForTheRootRoute(req.raw.url));
        }
      });
      if (opts.theme) {
        const themePrefix = `${staticPrefix}/theme`;
        if (opts.theme.css) {
          for (const cssFile of opts.theme.css) {
            fastify2.route({
              url: `${themePrefix}/${cssFile.filename}`,
              method: "GET",
              schema: { hide: true },
              ...hooks,
              handler: (req, reply) => {
                reply.header("content-type", "text/css; charset=UTF-8").send(cssFile.content);
              }
            });
          }
        }
        if (opts.theme.js) {
          for (const jsFile of opts.theme.js) {
            fastify2.route({
              url: `${themePrefix}/${jsFile.filename}`,
              method: "GET",
              schema: { hide: true },
              ...hooks,
              handler: (req, reply) => {
                reply.header("content-type", "application/javascript; charset=utf-8").send(jsFile.content);
              }
            });
          }
        }
        if (opts.theme.favicon) {
          for (const favicon of opts.theme.favicon) {
            fastify2.route({
              url: `${themePrefix}/${favicon.filename}`,
              method: "GET",
              schema: { hide: true },
              ...hooks,
              handler: (req, reply) => {
                reply.header("content-type", favicon.type).send(favicon.content);
              }
            });
          }
        }
      }
      const indexHtmlContent = indexHtml(opts);
      fastify2.route({
        url: `${staticPrefix}/index.html`,
        method: "GET",
        schema: { hide: true },
        ...hooks,
        handler: (req, reply) => {
          reply.header("content-type", "text/html; charset=utf-8").send(indexHtmlContent);
        }
      });
      const swaggerInitializerContent = swaggerInitializer(opts);
      fastify2.route({
        url: `${staticPrefix}/swagger-initializer.js`,
        method: "GET",
        schema: { hide: true },
        ...hooks,
        handler: (req, reply) => {
          reply.header("content-type", "application/javascript; charset=utf-8").send(swaggerInitializerContent);
        }
      });
      const hasTransformSpecificationFn = typeof opts.transformSpecification === "function";
      const shouldCloneSwaggerObject = opts.transformSpecificationClone ?? true;
      const transformSpecification = opts.transformSpecification;
      fastify2.route({
        url: "/json",
        method: "GET",
        schema: { hide: true },
        ...hooks,
        handler: hasTransformSpecificationFn ? shouldCloneSwaggerObject ? function(req, reply) {
          reply.send(transformSpecification(rfdc(fastify2.swagger()), req, reply));
        } : function(req, reply) {
          reply.send(transformSpecification(fastify2.swagger(), req, reply));
        } : function(req, reply) {
          reply.send(fastify2.swagger());
        }
      });
      fastify2.route({
        url: "/yaml",
        method: "GET",
        schema: { hide: true },
        ...hooks,
        handler: hasTransformSpecificationFn ? shouldCloneSwaggerObject ? function(req, reply) {
          reply.type("application/x-yaml").send(yaml.stringify(transformSpecification(rfdc(fastify2.swagger()), req, reply)));
        } : function(req, reply) {
          reply.type("application/x-yaml").send(yaml.stringify(transformSpecification(fastify2.swagger(), req, reply)));
        } : function(req, reply) {
          reply.type("application/x-yaml").send(fastify2.swagger({ yaml: true }));
        }
      });
      fastify2.register(fastifyStatic, {
        root: opts.baseDir || path.join(__dirname, "..", "static"),
        prefix: staticPrefix,
        decorateReply: false
      });
      if (opts.baseDir) {
        fastify2.register(fastifyStatic, {
          root: opts.baseDir,
          serve: false
        });
        fastify2.route({
          url: "/*",
          method: "GET",
          schema: { hide: true },
          ...hooks,
          handler: function(req, reply) {
            const file = req.params["*"];
            reply.sendFile(file);
          }
        });
      }
      done();
    }
    module.exports = fastifySwagger2;
  }
});

// node_modules/@fastify/swagger-ui/index.js
var require_swagger_ui = __commonJS({
  "node_modules/@fastify/swagger-ui/index.js"(exports, module) {
    "use strict";
    var fsPromises = __require("fs/promises");
    var path = __require("path");
    var fp = require_plugin();
    var csp = require_csp();
    async function fastifySwaggerUi(fastify2, opts) {
      const logoContent = await fsPromises.readFile(path.join(__dirname, "./static/logo.svg"));
      fastify2.decorate("swaggerCSP", csp);
      await fastify2.register(require_routes(), {
        prefix: opts.routePrefix || "/documentation",
        uiConfig: opts.uiConfig || {},
        initOAuth: opts.initOAuth || {},
        hooks: opts.uiHooks,
        theme: opts.theme || {},
        logo: opts.logo || { type: "image/svg+xml", content: logoContent },
        ...opts
      });
    }
    module.exports = fp(fastifySwaggerUi, {
      fastify: "4.x",
      name: "@fastify/swagger-ui",
      dependencies: ["@fastify/swagger"]
    });
    module.exports.default = fastifySwaggerUi;
    module.exports.fastifySwaggerUi = fastifySwaggerUi;
  }
});

// node_modules/obliterator/iterator.js
var require_iterator = __commonJS({
  "node_modules/obliterator/iterator.js"(exports, module) {
    "use strict";
    function Iterator(next) {
      if (typeof next !== "function")
        throw new Error("obliterator/iterator: expecting a function!");
      this.next = next;
    }
    if (typeof Symbol !== "undefined")
      Iterator.prototype[Symbol.iterator] = function() {
        return this;
      };
    Iterator.of = function() {
      var args = arguments, l = args.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: args[i++] };
      });
    };
    Iterator.empty = function() {
      var iterator = new Iterator(function() {
        return { done: true };
      });
      return iterator;
    };
    Iterator.fromSequence = function(sequence) {
      var i = 0, l = sequence.length;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: sequence[i++] };
      });
    };
    Iterator.is = function(value) {
      if (value instanceof Iterator)
        return true;
      return typeof value === "object" && value !== null && typeof value.next === "function";
    };
    module.exports = Iterator;
  }
});

// node_modules/obliterator/support.js
var require_support = __commonJS({
  "node_modules/obliterator/support.js"(exports) {
    "use strict";
    exports.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined";
    exports.SYMBOL_SUPPORT = typeof Symbol !== "undefined";
  }
});

// node_modules/obliterator/foreach.js
var require_foreach = __commonJS({
  "node_modules/obliterator/foreach.js"(exports, module) {
    "use strict";
    var support = require_support();
    var ARRAY_BUFFER_SUPPORT = support.ARRAY_BUFFER_SUPPORT;
    var SYMBOL_SUPPORT = support.SYMBOL_SUPPORT;
    module.exports = function forEach(iterable, callback) {
      var iterator, k, i, l, s;
      if (!iterable)
        throw new Error("obliterator/forEach: invalid iterable.");
      if (typeof callback !== "function")
        throw new Error("obliterator/forEach: expecting a callback.");
      if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
        for (i = 0, l = iterable.length; i < l; i++)
          callback(iterable[i], i);
        return;
      }
      if (typeof iterable.forEach === "function") {
        iterable.forEach(callback);
        return;
      }
      if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") {
        iterable = iterable[Symbol.iterator]();
      }
      if (typeof iterable.next === "function") {
        iterator = iterable;
        i = 0;
        while (s = iterator.next(), s.done !== true) {
          callback(s.value, i);
          i++;
        }
        return;
      }
      for (k in iterable) {
        if (iterable.hasOwnProperty(k)) {
          callback(iterable[k], k);
        }
      }
      return;
    };
  }
});

// node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = __commonJS({
  "node_modules/mnemonist/utils/typed-arrays.js"(exports) {
    "use strict";
    var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1;
    var MAX_16BIT_INTEGER = Math.pow(2, 16) - 1;
    var MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
    var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1;
    var MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1;
    var MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
    exports.getPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;
      if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;
      if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;
      throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
    };
    exports.getSignedPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
        return Int8Array;
      if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
        return Int16Array;
      if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
        return Int32Array;
      return Float64Array;
    };
    exports.getNumberType = function(value) {
      if (value === (value | 0)) {
        if (Math.sign(value) === -1) {
          if (value <= 127 && value >= -128)
            return Int8Array;
          if (value <= 32767 && value >= -32768)
            return Int16Array;
          return Int32Array;
        } else {
          if (value <= 255)
            return Uint8Array;
          if (value <= 65535)
            return Uint16Array;
          return Uint32Array;
        }
      }
      return Float64Array;
    };
    var TYPE_PRIORITY = {
      Uint8Array: 1,
      Int8Array: 2,
      Uint16Array: 3,
      Int16Array: 4,
      Uint32Array: 5,
      Int32Array: 6,
      Float32Array: 7,
      Float64Array: 8
    };
    exports.getMinimalRepresentation = function(array, getter) {
      var maxType = null, maxPriority = 0, p, t, v, i, l;
      for (i = 0, l = array.length; i < l; i++) {
        v = getter ? getter(array[i]) : array[i];
        t = exports.getNumberType(v);
        p = TYPE_PRIORITY[t.name];
        if (p > maxPriority) {
          maxPriority = p;
          maxType = t;
        }
      }
      return maxType;
    };
    exports.isTypedArray = function(value) {
      return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
    };
    exports.concat = function() {
      var length = 0, i, o, l;
      for (i = 0, l = arguments.length; i < l; i++)
        length += arguments[i].length;
      var array = new arguments[0].constructor(length);
      for (i = 0, o = 0; i < l; i++) {
        array.set(arguments[i], o);
        o += arguments[i].length;
      }
      return array;
    };
    exports.indices = function(length) {
      var PointerArray = exports.getPointerArray(length);
      var array = new PointerArray(length);
      for (var i = 0; i < length; i++)
        array[i] = i;
      return array;
    };
  }
});

// node_modules/mnemonist/utils/iterables.js
var require_iterables = __commonJS({
  "node_modules/mnemonist/utils/iterables.js"(exports) {
    "use strict";
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    function isArrayLike(target) {
      return Array.isArray(target) || typed.isTypedArray(target);
    }
    function guessLength(target) {
      if (typeof target.length === "number")
        return target.length;
      if (typeof target.size === "number")
        return target.size;
      return;
    }
    function toArray(target) {
      var l = guessLength(target);
      var array = typeof l === "number" ? new Array(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i++] = value;
      });
      return array;
    }
    function toArrayWithIndices(target) {
      var l = guessLength(target);
      var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
      var array = typeof l === "number" ? new Array(l) : [];
      var indices = typeof l === "number" ? new IndexArray(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i] = value;
        indices[i] = i++;
      });
      return [array, indices];
    }
    exports.isArrayLike = isArrayLike;
    exports.guessLength = guessLength;
    exports.toArray = toArray;
    exports.toArrayWithIndices = toArrayWithIndices;
  }
});

// node_modules/mnemonist/lru-cache.js
var require_lru_cache = __commonJS({
  "node_modules/mnemonist/lru-cache.js"(exports, module) {
    "use strict";
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCache(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-cache: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    LRUCache.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    };
    LRUCache.prototype.splayOnTop = function(pointer) {
      var oldHead = this.head;
      if (this.head === pointer)
        return this;
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.tail === pointer) {
        this.tail = previous;
      } else {
        this.backward[next] = previous;
      }
      this.forward[previous] = next;
      this.backward[oldHead] = pointer;
      this.head = pointer;
      this.forward[pointer] = oldHead;
      return this;
    };
    LRUCache.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCache.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCache.prototype.has = function(key) {
      return key in this.items;
    };
    LRUCache.prototype.get = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUCache.prototype.peek = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUCache.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      while (i < l) {
        callback.call(scope, values[pointer], keys[pointer], this);
        pointer = forward[pointer];
        i++;
      }
    };
    LRUCache.prototype.keys = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: key
        };
      });
    };
    LRUCache.prototype.values = function() {
      var i = 0, l = this.size;
      var pointer = this.head, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value
        };
      });
    };
    LRUCache.prototype.entries = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer], value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: [key, value]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
    LRUCache.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      var iterator = this.entries(), step;
      while (step = iterator.next(), !step.done)
        proxy.set(step.value[0], step.value[1]);
      Object.defineProperty(proxy, "constructor", {
        value: LRUCache,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
    LRUCache.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCache(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUCache;
  }
});

// node_modules/@fastify/cors/vary.js
var require_vary = __commonJS({
  "node_modules/@fastify/cors/vary.js"(exports, module) {
    "use strict";
    var LRUCache = require_lru_cache();
    var validFieldnameRE = /^[!#$%&'*+\-.^\w`|~]+$/u;
    function validateFieldname(fieldname) {
      if (validFieldnameRE.test(fieldname) === false) {
        throw new TypeError("Fieldname contains invalid characters.");
      }
    }
    function parse(header) {
      header = header.trim().toLowerCase();
      const result = [];
      if (header.length === 0) {
      } else if (header.indexOf(",") === -1) {
        result.push(header);
      } else {
        const il = header.length;
        let i = 0;
        let pos = 0;
        let char;
        for (i = 0; i < il; ++i) {
          char = header[i];
          if (char === " ") {
            pos = i + 1;
          } else if (char === ",") {
            if (pos !== i) {
              result.push(header.slice(pos, i));
            }
            pos = i + 1;
          }
        }
        if (pos !== i) {
          result.push(header.slice(pos, i));
        }
      }
      return result;
    }
    function createAddFieldnameToVary(fieldname) {
      const headerCache = new LRUCache(1e3);
      validateFieldname(fieldname);
      return function(reply) {
        let header = reply.getHeader("Vary");
        if (!header) {
          reply.header("Vary", fieldname);
          return;
        }
        if (header === "*") {
          return;
        }
        if (fieldname === "*") {
          reply.header("Vary", "*");
          return;
        }
        if (Array.isArray(header)) {
          header = header.join(", ");
        }
        if (!headerCache.has(header)) {
          const vals = parse(header);
          if (vals.indexOf("*") !== -1) {
            headerCache.set(header, "*");
          } else if (vals.indexOf(fieldname.toLowerCase()) === -1) {
            headerCache.set(header, header + ", " + fieldname);
          } else {
            headerCache.set(header, null);
          }
        }
        const cached = headerCache.get(header);
        if (cached !== null) {
          reply.header("Vary", cached);
        }
      };
    }
    module.exports.createAddFieldnameToVary = createAddFieldnameToVary;
    module.exports.addOriginToVaryHeader = createAddFieldnameToVary("Origin");
    module.exports.addAccessControlRequestHeadersToVaryHeader = createAddFieldnameToVary("Access-Control-Request-Headers");
    module.exports.parse = parse;
  }
});

// node_modules/@fastify/cors/index.js
var require_cors = __commonJS({
  "node_modules/@fastify/cors/index.js"(exports, module) {
    "use strict";
    var fp = require_plugin();
    var {
      addAccessControlRequestHeadersToVaryHeader,
      addOriginToVaryHeader
    } = require_vary();
    var defaultOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      hook: "onRequest",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: false,
      exposedHeaders: null,
      allowedHeaders: null,
      maxAge: null,
      preflight: true,
      strictPreflight: true
    };
    var validHooks = [
      "onRequest",
      "preParsing",
      "preValidation",
      "preHandler",
      "preSerialization",
      "onSend"
    ];
    var hookWithPayload = [
      "preSerialization",
      "preParsing",
      "onSend"
    ];
    function validateHook(value, next) {
      if (validHooks.indexOf(value) !== -1) {
        return;
      }
      next(new TypeError("@fastify/cors: Invalid hook option provided."));
    }
    function fastifyCors2(fastify2, opts, next) {
      fastify2.decorateRequest("corsPreflightEnabled", false);
      let hideOptionsRoute = true;
      if (typeof opts === "function") {
        handleCorsOptionsDelegator(opts, fastify2, { hook: defaultOptions.hook }, next);
      } else if (opts.delegator) {
        const { delegator, ...options } = opts;
        handleCorsOptionsDelegator(delegator, fastify2, options, next);
      } else {
        if (opts.hideOptionsRoute !== void 0)
          hideOptionsRoute = opts.hideOptionsRoute;
        const corsOptions = normalizeCorsOptions(opts);
        validateHook(corsOptions.hook, next);
        if (hookWithPayload.indexOf(corsOptions.hook) !== -1) {
          fastify2.addHook(corsOptions.hook, function handleCors(req, reply, payload, next2) {
            addCorsHeadersHandler(fastify2, corsOptions, req, reply, next2);
          });
        } else {
          fastify2.addHook(corsOptions.hook, function handleCors(req, reply, next2) {
            addCorsHeadersHandler(fastify2, corsOptions, req, reply, next2);
          });
        }
      }
      fastify2.options("*", { schema: { hide: hideOptionsRoute } }, (req, reply) => {
        if (!req.corsPreflightEnabled) {
          reply.callNotFound();
          return;
        }
        reply.send();
      });
      next();
    }
    function handleCorsOptionsDelegator(optionsResolver, fastify2, opts, next) {
      const hook = opts && opts.hook || defaultOptions.hook;
      validateHook(hook, next);
      if (optionsResolver.length === 2) {
        if (hookWithPayload.indexOf(hook) !== -1) {
          fastify2.addHook(hook, function handleCors(req, reply, payload, next2) {
            handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next2);
          });
        } else {
          fastify2.addHook(hook, function handleCors(req, reply, next2) {
            handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next2);
          });
        }
      } else {
        if (hookWithPayload.indexOf(hook) !== -1) {
          fastify2.addHook(hook, function handleCors(req, reply, payload, next2) {
            const ret = optionsResolver(req);
            if (ret && typeof ret.then === "function") {
              ret.then((options) => addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next2)).catch(next2);
              return;
            }
            next2(new Error("Invalid CORS origin option"));
          });
        } else {
          fastify2.addHook(hook, function handleCors(req, reply, next2) {
            const ret = optionsResolver(req);
            if (ret && typeof ret.then === "function") {
              ret.then((options) => addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next2)).catch(next2);
              return;
            }
            next2(new Error("Invalid CORS origin option"));
          });
        }
      }
    }
    function handleCorsOptionsCallbackDelegator(optionsResolver, fastify2, req, reply, next) {
      optionsResolver(req, (err, options) => {
        if (err) {
          next(err);
        } else {
          addCorsHeadersHandler(fastify2, normalizeCorsOptions(options, true), req, reply, next);
        }
      });
    }
    function normalizeCorsOptions(opts, dynamic) {
      const corsOptions = { ...defaultOptions, ...opts };
      if (Array.isArray(opts.origin) && opts.origin.indexOf("*") !== -1) {
        corsOptions.origin = "*";
      }
      if (Number.isInteger(corsOptions.cacheControl)) {
        corsOptions.cacheControl = `max-age=${corsOptions.cacheControl}`;
      } else if (typeof corsOptions.cacheControl !== "string") {
        corsOptions.cacheControl = null;
      }
      corsOptions.dynamic = dynamic || false;
      return corsOptions;
    }
    function addCorsHeadersHandler(fastify2, options, req, reply, next) {
      if (typeof options.origin !== "string" && options.origin !== false || options.dynamic) {
        addOriginToVaryHeader(reply);
      }
      const resolveOriginOption = typeof options.origin === "function" ? resolveOriginWrapper(fastify2, options.origin) : (_, cb) => cb(null, options.origin);
      resolveOriginOption(req, (error, resolvedOriginOption) => {
        if (error !== null) {
          return next(error);
        }
        if (resolvedOriginOption === false) {
          return next();
        }
        if (!resolvedOriginOption) {
          return next(new Error("Invalid CORS origin option"));
        }
        addCorsHeaders(req, reply, resolvedOriginOption, options);
        if (req.raw.method === "OPTIONS" && options.preflight === true) {
          if (options.strictPreflight === true && (!req.headers.origin || !req.headers["access-control-request-method"])) {
            reply.status(400).type("text/plain").send("Invalid Preflight Request");
            return;
          }
          req.corsPreflightEnabled = true;
          addPreflightHeaders(req, reply, options);
          if (!options.preflightContinue) {
            reply.code(options.optionsSuccessStatus).header("Content-Length", "0").send();
            return;
          }
        }
        return next();
      });
    }
    function addCorsHeaders(req, reply, originOption, corsOptions) {
      const origin = getAccessControlAllowOriginHeader(req.headers.origin, originOption);
      if (origin) {
        reply.header("Access-Control-Allow-Origin", origin);
      }
      if (corsOptions.credentials) {
        reply.header("Access-Control-Allow-Credentials", "true");
      }
      if (corsOptions.exposedHeaders !== null) {
        reply.header(
          "Access-Control-Expose-Headers",
          Array.isArray(corsOptions.exposedHeaders) ? corsOptions.exposedHeaders.join(", ") : corsOptions.exposedHeaders
        );
      }
    }
    function addPreflightHeaders(req, reply, corsOptions) {
      reply.header(
        "Access-Control-Allow-Methods",
        Array.isArray(corsOptions.methods) ? corsOptions.methods.join(", ") : corsOptions.methods
      );
      if (corsOptions.allowedHeaders === null) {
        addAccessControlRequestHeadersToVaryHeader(reply);
        const reqAllowedHeaders = req.headers["access-control-request-headers"];
        if (reqAllowedHeaders !== void 0) {
          reply.header("Access-Control-Allow-Headers", reqAllowedHeaders);
        }
      } else {
        reply.header(
          "Access-Control-Allow-Headers",
          Array.isArray(corsOptions.allowedHeaders) ? corsOptions.allowedHeaders.join(", ") : corsOptions.allowedHeaders
        );
      }
      if (corsOptions.maxAge !== null) {
        reply.header("Access-Control-Max-Age", String(corsOptions.maxAge));
      }
      if (corsOptions.cacheControl) {
        reply.header("Cache-Control", corsOptions.cacheControl);
      }
    }
    function resolveOriginWrapper(fastify2, origin) {
      return function(req, cb) {
        const result = origin.call(fastify2, req.headers.origin, cb);
        if (result && typeof result.then === "function") {
          result.then((res) => cb(null, res), cb);
        }
      };
    }
    function getAccessControlAllowOriginHeader(reqOrigin, originOption) {
      if (typeof originOption === "string") {
        return originOption;
      }
      return isRequestOriginAllowed(reqOrigin, originOption) ? reqOrigin : false;
    }
    function isRequestOriginAllowed(reqOrigin, allowedOrigin) {
      if (Array.isArray(allowedOrigin)) {
        for (let i = 0; i < allowedOrigin.length; ++i) {
          if (isRequestOriginAllowed(reqOrigin, allowedOrigin[i])) {
            return true;
          }
        }
        return false;
      } else if (typeof allowedOrigin === "string") {
        return reqOrigin === allowedOrigin;
      } else if (allowedOrigin instanceof RegExp) {
        allowedOrigin.lastIndex = 0;
        return allowedOrigin.test(reqOrigin);
      } else {
        return !!allowedOrigin;
      }
    }
    var _fastifyCors = fp(fastifyCors2, {
      fastify: "4.x",
      name: "@fastify/cors"
    });
    module.exports = _fastifyCors;
    module.exports.fastifyCors = _fastifyCors;
    module.exports.default = _fastifyCors;
  }
});

// src/server.ts
var import_swagger = __toESM(require_swagger2());
var import_swagger_ui = __toESM(require_swagger_ui());
var import_cors = __toESM(require_cors());
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(import_cors.default, {
  origin: "*"
});
app.register(import_swagger.default, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in constru\xEDda durante o NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!");
});
/*! Bundled license information:

uri-js/dist/es5/uri.all.js:
  (** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js *)

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)

@fastify/send/lib/clearHeaders.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/lib/containsDotFile.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/lib/contentRange.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/lib/createHtmlDocument.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

depd/index.js:
  (*!
   * depd
   * Copyright(c) 2014-2018 Douglas Christopher Wilson
   * MIT Licensed
   *)

statuses/index.js:
  (*!
   * statuses
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

toidentifier/index.js:
  (*!
   * toidentifier
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

http-errors/index.js:
  (*!
   * http-errors
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/lib/parseBytesRange.js:
  (*!
   * Based on range-parser
   *
   * Copyright(c) 2012-2014 TJ Holowaychuk
   * Copyright(c) 2015-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/lib/SendStream.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

@fastify/send/index.js:
  (*!
   * send
   * Copyright(c) 2012 TJ Holowaychuk
   * Copyright(c) 2014-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

content-disposition/index.js:
  (*!
   * content-disposition
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
