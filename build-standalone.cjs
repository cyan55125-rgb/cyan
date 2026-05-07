const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

async function main() {
  console.log('📦 开始构建最终单文件版本...');

  // 1. 读取并清理 Tailwind CSS (移除 Google Fonts @import)
  let tailwindCSS = fs.readFileSync('./dist/tailwind-full.css', 'utf-8');
  tailwindCSS = tailwindCSS.replace(/@import\s+url\([^)]*\)\s*;?/g, '');

  // 2. 用 esbuild 打包应用代码 (React/ReactDOM 为外部依赖)
  const result = await build({
    entryPoints: ['./src/main.tsx'],
    bundle: true,
    format: 'iife',
    globalName: 'SalesTeamApp',
    minify: true,
    sourcemap: false,
    target: ['chrome90', 'firefox88', 'safari14', 'edge90'],
    external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    loader: {
      '.ts': 'tsx',
      '.css': 'text',
      '.svg': 'text',
    },
    jsx: 'automatic',
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    write: false,
  });

  const jsCode = result.outputFiles[0].text;

  // 3. 组装完整的单文件 HTML
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>销售团队管理系统</title>
<style>${tailwindCSS}</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"><\/script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"><\/script>
<script src="https://unpkg.com/clsx@2.1.1/dist/clsx.min.js"><\/script>
</head>
<body>
<div id="root"></div>
<script>
${jsCode}
<\/script>
</body>
</html>`;

  const outPath = './dist/sales-team-final.html';
  fs.writeFileSync(outPath, html);

  const sizeKB = (html.length / 1024).toFixed(0);
  console.log(`✅ 构建完成! 文件大小: ${sizeKB}KB`);
  console.log(`   输出路径: ${outPath}`);
  console.log(`   包含: React(CDN) + ReactDOM(CDN) + clsx(CDN) + Tailwind CSS + 应用代码`);
}

main().catch((e) => {
  console.error('❌ 构建失败:', e);
  process.exit(1);
});
