/**
 * @file BARE (Binary Application Record Encoding) grammar for tree-sitter
 * @author herlev
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

// https://www.ietf.org/archive/id/draft-devault-bare-15.html#name-abnf-grammar

export default grammar({
  name: "bare",

  extras: ($) => [$.comment],

  supertypes: ($) => [$.primitive_type],

  conflicts: ($) => [[$.enum_value], [$.type]],

  rules: {
    source_file: ($) =>
      seq(optional($._WS), sep_list($.type_def, $._WS), optional($._WS)),

    type_def: ($) => seq("type", $._WS, $.type_ident, $._WS, $.type),
    type_ident: () => /[A-Z][a-zA-Z0-9]*/,
    primitive_type: () =>
      choice(
        "uint",
        "u8",
        "u16",
        "u32",
        "u64",
        "int",
        "i8",
        "i16",
        "i32",
        "i64",
        "f32",
        "f64",
        "bool",
        "str",
        "void",
      ),
    type: ($) =>
      choice(
        $.primitive_type,
        seq("data", optional($.length)),
        seq("optional", $.type_param),
        seq("list", $.type_param, optional($.length)),
        seq("map", $.type_param, $.type_param),
        $.enum,
        $.union,
        $.struct,
        $.type_ident,
      ),

    type_param: ($) =>
      seq(optional($._WS), "<", optional($._WS), $.type, optional($._WS), ">"),

    length: ($) =>
      seq(
        optional($._WS),
        "[",
        optional($._WS),
        $.integer,
        optional($._WS),
        "]",
      ),
    integer: () => /[0-9]+/,

    enum: ($) =>
      seq(
        "enum",
        optional($._WS),
        "{",
        optional($._WS),
        sep_list($.enum_value, $._WS),
        optional($._WS),
        "}",
      ),
    enum_value: ($) =>
      seq(
        /[A-Z][A-Z0-9_]*/,
        optional(seq(optional($._WS), "=", optional($._WS), $.integer)),
      ),

    union: ($) =>
      seq(
        "union",
        optional($._WS),
        "{",
        optional(seq(optional($._WS), "|")),
        optional($._WS),
        sep_list(
          seq(
            $.type,
            optional(seq(optional($._WS), "=", optional($._WS), $.integer)),
          ),
          seq(optional($._WS), "|", optional($._WS)),
        ),
        optional($._WS),
        optional(seq("|", optional($._WS))),
        "}",
      ),

    struct: ($) =>
      seq(
        "struct",
        optional($._WS),
        "{",
        optional($._WS),
        sep_list(
          seq(
            $.struct_field_name,
            optional($._WS),
            ":",
            optional($._WS),
            $.type,
          ),
          $._WS,
        ),
        optional($._WS),
        "}",
      ),
    struct_field_name: (_) => /[a-z][a-zA-Z0-9_]*/,

    _WS: () => repeat1(/[\n\t ]/),
    comment: (_) => token(seq("#", /.*/)),
  },
});

function sep_list(rule, sep) {
  return seq(rule, repeat(seq(sep, rule)));
}

function sep_list_opt(rule, sep) {
  return optional(sep_list(rule, sep));
}
