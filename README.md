# ffxiv-submarine-voyage-result-reader

## Getting started

Clone the repository and node-machina-ffxiv

```
git clone https://github.com/shambarick/ffxiv-submarine-voyage-result-reader.git
cd ffxiv-submarine-voyage-result-reader
git clone https://github.com/karashiiro/node-machina-ffxiv.git
```

Listen for voyage results

```
node index.js
```

Note: 

By default, it uses `WinPCap`. If you don't want to use it, then remove it from `index.js`, don't forget to run the scrip as Administration in that case. For more information, check https://github.com/karashiiro/node-machina-ffxiv/wiki/Constructor
