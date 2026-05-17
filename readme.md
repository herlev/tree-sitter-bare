A tree-sitter grammar for the [BARE](https://baremessages.org/) schema DSL.

## Helix configuration

Add the following to `~/.config/helix/languages.toml`

```toml
[[language]]
name = "bare"
scope = "source.bare"
file-types = ["bare"]
comment-token = "#"
indent = { tab-width = 2, unit = "  " }

[[grammar]]
name = "bare"
source = { git = "https://github.com/herlev/tree-sitter-bare", rev = "main"}
```

Then copy [highlights.scm](./queries/highlights.scm) to `~/.config/helix/runtime/queries/bare/highlights.scm` and run `hx --grammar fetch && hx --grammar build`.

## Neovim configuration

Using [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter), add the following to your Neovim config:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.bare = {
  install_info = {
    url = "https://github.com/herlev/tree-sitter-bare",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "bare",
}

vim.filetype.add({
  extension = {
    bare = "bare",
  },
})
```

Then run `:TSInstall bare` and copy [highlights.scm](./queries/highlights.scm) to `~/.config/nvim/queries/bare/highlights.scm`.
