$NodeDir = "C:\Users\Mikey\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
$Node = Join-Path $NodeDir "node.exe"
$Npm = ".\.tools\package\bin\npm-cli.js"

$env:Path = "$NodeDir;$env:Path"
& $Node $Npm run dev
