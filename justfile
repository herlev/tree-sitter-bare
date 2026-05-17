gen:
    tree-sitter generate --abi 14
    tree-sitter build --wasm
    hx --grammar build

test: gen
    tree-sitter test

play: gen
    tree-sitter pg -q
