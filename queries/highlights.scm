(comment) @comment
("type") @keyword
(type_ident) @type
(primitive_type) @type.builtin

("struct") @keyword.storage.type
(struct_field_name) @variable.other.member

("enum") @keyword.storage.type
(enum_value) @type.enum.variant
(integer) @constant.numeric.integer

("union") @keyword.storage.type

("list") @type.builtin
("map") @type.builtin
("data") @type.builtin
("optional") @type.builtin

("=") @operator
